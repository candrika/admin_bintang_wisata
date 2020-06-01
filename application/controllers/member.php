<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class member extends MY_Controller {

    public function index() {
        
	}

	function card($id_member){
		$q = $this->db->get_where('member',array('id_member'=>$id_member))->row();

		$qunit =  $this->db->get_where('unit',array('idunit'=>$q->idunit))->row();
		$data['d'] = $q;
		$data['coop'] = $qunit;
		$this->load->view('member/card_view',$data);
	}

	function set_status(){
		$this->db->trans_begin();

		$status = $this->input->post('status');
		$id_member = $this->input->post('id_member');

		$this->db->where('id_member',$id_member);
		$this->db->update('member',array(
				'status'=>$status,
				'usermod'=>$this->session->userdata('userid'),
				'datemod'=>date('Y-m-d H:m:s')
			));

		 if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Gagal menyimpan data');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Sukses menyimpan data');

            if($status==2){
            	$this->activated_member($id_member);
            }
        }

        echo json_encode($json);
	}

	function activated_member($id_member){
		$q = $this->db->query("select handphone from member where id_member = ".$id_member." ")->row();
		$handphone = $q->handphone;

		$msg = "Status keanggotaan Koperasi Digital telah aktif. Klik link berikut untuk melanjutkan. ".MOBILE_URL.'/index.php/register/activation/'.$id_member;
// echo $msg; die;
		$token = $this->token();

		$postfield = 'msisdn='.$handphone.'&content='.$msg;
		// echo $postfield; die;
		// echo $token; die;
		// $token = '5a114ee2427615094fa8add44af77260';

		$curl = curl_init();
			// Set some options - we are passing in a useragent too here
			curl_setopt_array($curl, array(
			    CURLOPT_RETURNTRANSFER => 1,
			    CURLOPT_URL => 'https://api.mainapi.net/smsnotification/1.0.0/messages',
			    // CURLOPT_USERAGENT => 'Codular Sample cURL Request',
			    CURLOPT_POST => 1,
			    CURLOPT_HTTPHEADER => array(
			    	'Content-Type: application/x-www-form-urlencoded',
			    	'Accept: application/json',
			    	'Authorization: Bearer '.$token
			    ),
			    CURLOPT_POSTFIELDS => $postfield
			));
			// Send the request & save response to $resp
			$resp = json_decode(curl_exec($curl));
			// var_dump($resp);
			// echo $resp;
			// $val =  $resp->access_token;
			// Close request to clear up some resources
			curl_close($curl);
	}

	function status_type(){
		$opt = $this->input->get('opt') == '' ? null : $this->input->get('opt');

		$row_data[0] = array(
			'status'=>1,
			'member_status_name'=>'Dalam Persetujuan'
		);
		$row_data[1] = array(
			'status'=>2,
			'member_status_name'=>'Aktif'
		);
		$row_data[2] = array(
			'status'=>3,
			'member_status_name'=>'Non Aktif'
		);		
		$row_data[3] = array(
			'status'=>4,
			'member_status_name'=>'Berhenti'
		);

		// if($opt==null){
		// 	//all status
		// } else {
		// 	unset($row_data[3]);
		// }

		$data = array(
			'success'=>true,
			'dat'=>$row_data
		);
		echo json_encode($data);
	}

	function import_data(){


		$config['upload_path'] = './upload/xlsx';
        $config['allowed_types'] = 'xlsx';
        $config['max_size'] = '10000';

        $this->load->library('upload', $config);

        if (!$this->upload->do_upload('filexlsx')) {
        	// echo "string";
            $error = $this->upload->display_errors();
            echo "{success:false, message:'" . $error . "'}";
        } else {
        	$file = $this->upload->data()['full_path'];
        	$ori_name = $this->upload->data()['orig_name'];

        	require_once DOCUMENTROOT . "/application/libraries/simplexlsx.class.php";
            $xlsx = new SimpleXLSX($file);
            $getWorksheetName = $xlsx->getWorksheetName();

            $val = $xlsx->rows(1);
            // print_r($val[1]);
            // die;
            if(count($val[0])!=6){

                $status = false;
                $message = 'Format template file import tidak sesuai/salah';
                $valid = array('status' => $status, 'message' => $message);
                $body  = json_encode($valid);
                echo $body;
                exit;
            }

            $i=1;$x=0;

            while(isset($val[$i])){
            	$d = $val[$i];

            	$valid=$this->validasi_import_data($d,$i);

            	if($valid['status']){
            		$ok=true;
            	}else{
            		$ok=false;
            		break;
            	}

                $end_row = count($val);
                // print_r($val[$end_row]);
                if($val[$end_row]==''){
                    break;
                }
            	$i++;
            }

            
          	if($ok){
          		
          		$i=1;$x=0;	
	          	while (isset($val[$i])) {
	          		# code...
	          		$d =$val[$i];
                    if($d==''){
                        break;
                    }

                    $q = $this->db->query("SELECT * FROM employee WHERE user_id=".$this->session->userdata('userid')." and idunit=".$this->session->userdata('idunit'))->row();
                    
                    if(isset($q->business_id) and $q->business_id!=''){
                        $business_id=$q->business_id;
                    
                        // echo $business_id;

                    }else{
                        $business_id=null;
                        
                        // echo $business_id;

                    }
                    // die;
                    $response = $this->rest_client->post('member/save_import_data',[
		          				'auth'=>[$this->session->userdata('api_key'),''],
		          				'form_params'=>array(
		          					"idunit"=>$this->session->userdata("idunit"),
		          					"id_member"=>$this->m_data->getPrimaryID2(null,'member','id_member'),
		          					"no_member" =>$d['0'],
		          					"member_name"=>$d['1'] ,
									"email"=>$d['2'] ,
									"handphone"=>$d['3'] ,
									"address"=>$d['4'] ,
									"password"=>$d['5'] ,
                                    "business_id"=>$business_id,
                                    "userin"=>$this->session->userdata('userid')
		          				),
		          				'http_errors'=>false,
		          	]);

		          	$body = $response->getBody();

                    $i++;  
	        	}
	        	$i-=1;
				echo ($body);

          	}else{
        		echo json_encode($valid);
        	}
    	}
          
	}

	function validasi_import_data($d,$i){

		$status = true;
        $message = 'valid';
        // print_r($d);
        // if($d[count($d)] ==''){

        // }else{

            if(isset($d[0])&&$d[0]!='')
            {
                $q = $this->db->query("select no_member from member where no_member='".$d[0]."' and idunit=".$this->session->userdata('idunit')." and display is null");

                if($q->num_rows () >0){
                    $status = false;
                    $message = 'Error data pada baris ke ' . $i . ':  No member sudah terdaftar di database';   
                }
                
            }else{

                $status = false;
                $message = 'Error data pada baris ke ' . $i . ': Kolom Kode Anggota tidak boleh kosong';
            }
           
            /////////////////////////////////////////

            if(isset($d[1]) && $d[1]!='')
            {
                
            }else{
                $status = false;
                $message = 'Error data pada baris ke ' . $i . ': Kolom Nama Anggota tidak boleh kosong';
            } 
           
            /////////////////////////////////////////

            if(isset($d[2]) && $d[2]!=''){
                
                $q = $this->db->query("select email from member where email='".$d[2]."'  and display is null");
                
                if($q->num_rows() >0){
                    $status = false;
                    $message = 'Error data pada baris ke ' . $i . ': Alamat Email sudah terdaftar';             
                }
                
                $q1 = $this->db->query("SELECT a.email from sys_user a
                                        inner join member b on b.user_id=a.user_id 
                                        where a.email='".$d[2]."'  and b.display is null");  

                if($q1->num_rows() >0){
                    $status = false;
                    $message = 'Error data pada baris ke ' . $i . ': Alamat Email sudah terdaftar';             
                }
                

            }else{
                $status = false;
                $message = 'Error data pada baris ke ' . $i . ': Kolom Alamat Email tidak boleh kosong';
            }

            /////////////////////////////////////////

            if(isset($d[3]) && $d[3]!=''){
                
                $q1 = $this->db->query("select handphone from member where handphone='".$d[3]."' and display is null"); 

                if($q1->num_rows() >0){
                    $status = false;
                    $message = 'Error data pada baris ke ' . $i . ': No Handphone sudah terdaftar';  
                }
                

            }else{
                $status = false;
                $message = 'Error data pada baris ke ' . $i . ': Kolom No Hand Phone tidak boleh kosong';
            }
            

            /////////////////////////////////////////

            // if(isset($d[4]) && $d[4]!=''){
                
            // }else{
            //  $status = false;
            //     $message = 'Error data pada baris ke ' . $i . ': Kolom Alamat tidak boleh kosong';


            // }

            /////////////////////////////////////////

            if(isset($d['5']) && $d['5']!=""){
                

            }else{
                $status = false;
                $message = 'Error data pada baris ke ' . $i . ': Kolom Password tidak boleh kosong';
            }    
        // }
		 
        
        return array('status' => $status, 'message' => $message);       
	}

    function create_password(){
        $token = $this->input->get('pid');
        
        $data['token'] = $token; 
        $data['page_title'] = 'Create New Password'; 

        if($_POST){
            $token = $this->input->post('token');
            $q = $this->db->get_where('forgot_pass',array('token'=>$token,'status'=>1));
            if($q->num_rows()>0){
                $r = $q->row();

                $password = $this->input->post('password');
                $password_conf = $this->input->post('password-conf');

                if($password!=$password_conf){
                     $this->session->set_flashdata(array(
                        'notif_type'=>'danger',
                        'notif_message'=>'Password baru tidak sama'
                    ));
                              
                } else {
                    $data = array(
                            // 'user_id'=>$r->user_id,
                            'password'=>$password
                        );
                    $this->db->where('user_id',$r->user_id);
                    $this->db->update('sys_user',$data);

                    $this->db->where('user_id',$r->user_id);
                    $this->db->update('forgot_pass',array('status'=>2));

                    $this->session->set_flashdata(array(
                        'notif_type'=>'success',
                        'notif_message'=>"Password berhasil diubah. Anda dapat login kembali <a href='".MOBILE_URL."login'>disini</a>"
                    ));
                    // redirect(MOBILE_URL.'login','refresh');
                }

                redirect(site_url().'member/create_password?pid='.$token,'refresh');          
                   
            } else {
                   $this->session->set_flashdata(array(
                            'notif_type'=>'danger',
                            'notif_message'=>'Request was expired or invalid'
                        ));
                 redirect(site_url().'member/create_password?pid='.$token,'refresh');             
            }

            
        } else {

                if($token==null){
                    exit;
                }

            // $this->smarty->display('new_password_member.tpl'); 
            $this->load->view('member/change_member_password',$data);
        }
    }

    public function loan_propose(){

        $key=$this->input->post('key');
        $member_id=$this->input->post('member_id');
        $loan_type_id=$this->input->post('loan_type_id');
        $proposed_amount=str_replace('.', '', $this->input->post('proposed_amount'));
        $length_loan=$this->input->post('length_loan');

        $response = $this->rest_coop->post('loan/new',[
            'auth'=>[$key,''],
            'form_params'=>array('key'=>$key,
                                 'member_id'=>$member_id,
                                 'loan_type_id'=>$loan_type_id,
                                 'proposed_amount'=>$proposed_amount,
                                 'length_loan'=>$length_loan,
                                 'proposed_date'=>date('Y-m-d'),
                                 'remarks'=>'Pengajuan Pinjaman Toko',
                                 'auto_approved'=>'yes'
            ),
            'http_errors' => false
        ]);

        $body=$response->getBody();
        
        echo $body;
    }
}
?>