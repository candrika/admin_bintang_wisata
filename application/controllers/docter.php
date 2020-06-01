<?php

if (!defined('BASEPATH'))exit('No direct script access allowed');

class docter extends MY_Controller {

    public function index() {
        
    }

    function update_photo_docter(){
        
        // $file    = base64_decode($this->post('file_name'));
        $this->db->trans_begin();

        $id      = $this->input->post('id');
        $user_id = $this->session->userdata('userid');

        $config['upload_path']          = './upload/';
        $config['allowed_types']        = 'gif|jpg|jpeg|png|bmp';
        $config['max_size']             = 1000;
        $config['max_width']            = 1500;
        $config['max_height']           = 900;

        $this->load->library('upload', $config);

        if ( ! $this->upload->do_upload('staff_photo'))
        {
            // echo $this->upload->display_errors();
            $data = array('success'=>false,'message'=>$this->upload->display_errors());  
            echo json_encode($data); 
            return false;                     
        }
        else
        {
            $file_name = $this->upload->data()['file_name'];
            
            //defined dimension
            $width_tumbnail  = 80;
            // $height_tumbnail = 50;

            $tmp = move_uploaded_file($this->upload->data()['orig_name'], $this->upload->data()['file_name']);

            $tumbnail_name = $this->upload->data()['file_path'].$this->upload->data()['raw_name'].'_tumbnail'.$this->upload->data()['file_ext'];
            $insert_tumbnail_name = $this->upload->data()['raw_name'].'_tumbnail'.$this->upload->data()['file_ext'];
            
            //get dimension
            list($width,$height) = getimagesize($this->upload->data()['full_path']);

            //divine width and height
            $div_width_tumbnail  = $width/$width_tumbnail;
            $div_height_tumbnail = $height/$width_tumbnail;

            //set new width and height
            $new_width_tumbnail = $width/$div_width_tumbnail;
            $new_height_tumbnail = $height/$div_height_tumbnail;
            
            $thumb    = imagecreatetruecolor($new_width_tumbnail, $new_height_tumbnail);
            // $fullsize = imagecreatetruecolor($new_width_fullsize, $new_height_fullsize);
            
            if($this->upload->data()['file_ext']=='.gif'){
                $source   = imagecreatefromgif($this->upload->data()['full_path']);
            }elseif ($this->upload->data()['file_ext']=='.bmp') {
                $source   = imagecreatefromwbmp($this->upload->data()['full_path']);         
            }elseif ($this->upload->data()['file_ext']=='.png') {
                $source   = imagecreatefrompng($this->upload->data()['full_path']);    
            }else{
                $source   = imagecreatefromjpeg($this->upload->data()['full_path']);
            }

            //resize image
            imagecopyresized($thumb,$source ,  0, 0, 0, 0, $new_width_tumbnail, $new_height_tumbnail, $width, $height);

            if($this->upload->data()['file_ext']=='.gif'){

                imagegif($thumb,  $tumbnail_name);
                // imagegif($fullsize, $fullsize_name);

            }elseif ($this->upload->data()['file_ext']=='.bmp') {

                imagewbmp($thumb,  $tumbnail_name);
                // imagewbmp($fullsize, $fullsize_name);

            }elseif($this->upload->data()['file_ext']=='.png'){
                
                imagepng($thumb,  $tumbnail_name);
                // imagepng($fullsize, $fullsize_name);
            
            }else{
                
                imagejpeg($thumb,  $tumbnail_name);
                // imagejpeg($fullsize, $fullsize_name);

            }
       
            imagedestroy($thumb);

            $data=array(
               "deleted" => 0,
               "staff_photo"=>$insert_tumbnail_name,
               "group_id"=>5
            );

            if($id == ''){

                $data['staff_id'] = $this->m_data->getPrimaryID2(null,'staff','staff_id');
                $this->db->insert('patient',$data);

            }else{
                
                $data['staff_id'] = $id;
                
                $this->db->where(array('staff_id'=>$id,'group_id'=>5));
                $this->db->update('staff',$data);
            }    

            if($this->db->trans_status()===false){
                $this->db->trans_rollback();
               
                $message = array('success'=>false,'message'=>'Gambar gagal disimpan');
                echo json_encode($message); 
                // return false; 
            }else{
                $this->db->trans_commit();

                $message = array('success'=>true,'message'=>'Gambar berhasil disimpan','data'=>$data);
                echo json_encode($message); 
                // return t; 
            }                    
        }

    }

    function medic_record_receipt($id_diagnosis){

        $company_data = $this->m_data->company_data();
        
        $data['company_logo'] = $company_data['company_logo'];
        $data['company_name'] = $company_data['company_name'];
        $data['company_address'] = $company_data['company_address'];
        
        $response1 = $this->rest_client->get('docter/medical_record?id='.$id_diagnosis,[
            'auth'=>[$this->session->userdata('api_key'),''],
            'http_errors'=>false
        ]); 

        $body1    = json_decode($response1->getBody());
        
        $diagnosis = $body1->rows[0];
       
        $data['medical_record_no'] = $diagnosis->{'medical_record_no'};
        $data['medical_record_date'] = $diagnosis->{'medical_record_date'};
        $data['doctor_name'] = $diagnosis->{'doctor_name'};

        $datein   = explode(' ', $diagnosis->{'datein'});
        
        $data['datein']=backdate2($datein[0]).' '.$datein[1];
        $data['medical_record_desc']=$diagnosis->{'medical_record_desc'};

        $data['patient_name'] = $diagnosis->{'patient_name'};
        $data['patient_type'] = $diagnosis->{'patient_type'};
        
        if(isset($diagnosis->{'birthday_date'})){
            $data['birthday_date'] = backdate2($diagnosis->{'birthday_date'});

            $data['umur'] = diff_two_dates2($diagnosis->{'birthday_date'},date('Y-m-d'));
           
            $data['usia'] = $data['umur']['years'];
        }


        $response2 = $this->rest_client->get('docter/medical_disease?medical_record_id='.$id_diagnosis,[
            'auth'=>[$this->session->userdata('api_key'),''],
            'http_errors'=>false
        ]); 

        $body2    = json_decode($response2->getBody());
        
        $diseases = $body2->rows;
        
        if(isset($diseases)){
            $data['penyakit'] = $diseases;
        }
        
        $response3 = $this->rest_client->get('docter/medical_action?medical_record_id='.$id_diagnosis,[
            'auth'=>[$this->session->userdata('api_key'),''],
            'http_errors'=>false
        ]); 

        $body3    = json_decode($response3->getBody());
        
        $action = $body3->rows;

        if(isset($action)){
            $data['tindakan'] = $action;

        }

        $response4 = $this->rest_client->get('docter/medical_drug?medical_record_id='.$id_diagnosis,[
            'auth'=>[$this->session->userdata('api_key'),''],
            'http_errors'=>false
        ]); 

        $body4    = json_decode($response4->getBody());
        
        $drug = $body4->rows;
        
        $data['resep']=null;

        if(count($drug)>0){
            $i=0;
            foreach ($drug as $key => $v) {
                # code...
                $data['resep'][$i]=$v;
                $i++;
            }
        }
        
        // $response5 = $this->rest_client->get('docter/medical_drugAlkes?medical_record_id='.$id_diagnosis,[
        //     'auth'=>[$this->session->userdata('api_key'),''],
        //     'http_errors'=>false
        // ]); 

        // $body5    = json_decode($response5->getBody());
        // $drug_alkes = $body5->rows;
        
        // if(count($drug_alkes)>0){
        //     $j=1;
        //     foreach ($drug_alkes as $key => $v1) {
        //         # code...
        //         $data['resep'][$j]=$v1;
        //         $j++;
        //     }    
        // }
        

        $this->load->view('tplcetak/medic_record_receipt',$data);
    }

    function pharmacy_receipt($id){
        $company_data = $this->m_data->company_data();

        $data['company_logo'] = $company_data['company_logo'];
        $data['company_name'] = $company_data['company_name'];
        $data['company_address'] = $company_data['company_address'];
        
        $response1 = $this->rest_client->get('docter/medical_record?medical_record_id='.$id,[
            'auth'=>[$this->session->userdata('api_key'),''],
            'http_errors'=>false
        ]); 

        $body1    = json_decode($response1->getBody());
        
        $diagnosis = $body1->rows[0];
       
        $data['medical_record_no'] = $diagnosis->{'medical_record_no'};
        $data['receipt_number'] = $diagnosis->{'receipt_number'};
        $data['medical_record_date'] = $diagnosis->{'medical_record_date'};
        $data['doctor_name'] = $diagnosis->{'doctor_name'};

        $datein   = explode(' ', $diagnosis->{'datein'});
        
        $data['datein']=backdate2($datein[0]).' '.$datein[1];
        $data['medical_record_desc']=$diagnosis->{'medical_record_desc'};

        $data['patient_name'] = $diagnosis->{'patient_name'};
        $data['patient_type'] = $diagnosis->{'patient_type'};
        
        if(isset($diagnosis->{'birthday_date'})){
            $data['birthday_date'] = backdate2($diagnosis->{'birthday_date'});

            $data['umur'] = diff_two_dates2($diagnosis->{'birthday_date'},date('Y-m-d'));
           
            $data['usia'] = $data['umur']['years'];
        }

        $response2 = $this->rest_client->get('docter/medical_drug?medical_record_id='.$id,[
            'auth'=>[$this->session->userdata('api_key'),''],
            'http_errors'=>false
        ]); 

        $body2    = json_decode($response2->getBody());
        
        $drug = $body2->rows;
        
        $data['resep']=null;

        if(count($drug)>0){ 
            $i=0;
            foreach ($drug as $key => $v) {
                # code...
                $data['resep'][$i]=$v;
                $i++;
            }
        }
        
        // $response3 = $this->rest_client->get('docter/medical_drugAlkes?medical_record_id='.$id,[
        //     'auth'=>[$this->session->userdata('api_key'),''],
        //     'http_errors'=>false
        // ]); 

        // $body3    = json_decode($response3->getBody());
        // $drug_alkes = $body3->rows;
        
        // if(count($drug_alkes)>0){
        //     $j=1;
        //     foreach ($drug_alkes as $key => $v1) {
        //         # code...
        //         $data['resep'][$j]=$v1;
        //         $j++;
        //     }    
        // }

        $this->load->view('tplcetak/pharmacy_receipt',$data);
    }

    function medical_receipt($id){
        $company_data = $this->m_data->company_data();

        $data['company_logo'] = $company_data['company_logo'];
        $data['company_name'] = $company_data['company_name'];
        $data['company_address'] = $company_data['company_address'];
        
        $response1 = $this->rest_client->get('docter/medical_record?medical_record_id='.$id,[
            'auth'=>[$this->session->userdata('api_key'),''],
            'http_errors'=>false
        ]); 

        $body1    = json_decode($response1->getBody());
        
        $diagnosis = $body1->rows[0];
       
        $data['medical_record_no'] = $diagnosis->{'medical_record_no'};
        $data['receipt_number'] = $diagnosis->{'receipt_number'};
        $data['medical_record_date'] = $diagnosis->{'medical_record_date'};
        $data['doctor_name'] = $diagnosis->{'doctor_name'};
        $data['patient_address'] = $diagnosis->{'address'};
        $data['no_tlp'] = $diagnosis->{'no_tlp'};
        $data['no_mobile'] = $diagnosis->{'no_mobile'};
        
        if(isset($diagnosis->{'business_name'})){
            $data['business_name'] = $diagnosis->{'business_name'};

        }else{
            
            $data['business_name'] ='Umum';
        }
        
        $data['np_number'] = $diagnosis->{'np_number'};
        
        if(isset($diagnosis->{'divisi'})){
            $data['divisi'] = $diagnosis->{'divisi'};
        }else{
            $data['divisi'] = null;
        }
        
        $datein   = explode(' ', $diagnosis->{'datein'});
        
        $data['datein']=backdate2($datein[0]).' '.$datein[1];
        $data['medical_record_desc']=$diagnosis->{'medical_record_desc'};

        $data['member_name'] = $diagnosis->{'member_name'};
        $data['patient_name'] = $diagnosis->{'patient_name'};
        $data['patient_type'] = $diagnosis->{'patient_type'};
        $data['provider'] = $diagnosis->{'benefit_id'};
        
        if(isset($diagnosis->{'birthday_date'})){
            $data['birthday_date'] = backdate2($diagnosis->{'birthday_date'});

            $data['umur'] = diff_two_dates2($diagnosis->{'birthday_date'},date('Y-m-d'));
           
            $data['usia'] = $data['umur']['years'];
        }

        $resp = $this->rest_coop->get('member/member_family?no_member='.$diagnosis->{'np_number'}.'&family_name='.$diagnosis->{'patient_name'},[
            'auth'=>[COOP_APIKEY,''],
            'http_errors'=>false
        ]);

        $b1    = json_decode($resp->getBody());
        
        // print_r($b1);
        if($b1!=''){
            $rows1 = $b1->rows;

        }
        
        if(isset($rows1[0])){

            $data['relationship_type'] = $rows1[0]->{'relationship'};
        }else{
            $data['relationship_type'] = null;
        }

        $x=0;
        
        $data['medical_fee'][$x]['fee']=$diagnosis->service_amount;
        $data['medical_fee'][$x]['keterangan']='Pemeriksaan Dokter';
        
        $response3 = $this->rest_client->get('docter/medical_action?medical_record_id='.$id,[
            'auth'=>[$this->session->userdata('api_key'),''],
            'http_errors'=>false
        ]); 

        $body3    = json_decode($response3->getBody());
        
        $action = $body3->rows;
        $z=$x+1;
        
        if(isset($action)){
            foreach ($action as  $v2) {
                # code...
                
                $data['medical_fee'][$z]['fee']=$v2->service_fee;
                $data['medical_fee'][$z]['keterangan']=$v2->medical_action_desc;
                $z++;
            }
            
        }

        $response4 = $this->rest_client->get('docter/medical_drug?medical_record_id='.$id,[
            'auth'=>[$this->session->userdata('api_key'),''],
            'http_errors'=>false
        ]); 

        $body4    = json_decode($response4->getBody());
        
        $drug = $body4->rows;
        
        $data['resep']=null;
        $i=$z+1;

        if(count($drug)>0){
            foreach ($drug as $v) {
                # code...
                // print_r($v);
                $data['medical_fee'][$i]['fee']=$v->subtotal*($v->qty*1);
                $data['medical_fee'][$i]['keterangan']=$v->product_name.'&nbsp;'.($v->qty*1).'&nbsp;'.$v->product_unit_code.'&nbsp;@&nbsp;Rp&nbsp;'.number_format($v->subtotal);
                $i++;
            }
        }

        // $response5 = $this->rest_client->get('docter/medical_drugAlkes?medical_record_id='.$id,[
        //     'auth'=>[$this->session->userdata('api_key'),''],
        //     'http_errors'=>false
        // ]); 

        // $body5    = json_decode($response5->getBody());
        // $drug_alkes = $body5->rows;
        
        // $j=$i+1;

        // if(count($drug_alkes)>0){
        //     foreach ($drug_alkes as $v1) {
        //         # code...
        //         $data['medical_fee'][$j]['fee']=$v1->subtotal*($v1->qty*1);
        //         $data['medical_fee'][$j]['keterangan']=$v1->product_name.'&nbsp;'.($v1->qty*1).'&nbsp;'.$v1->product_unit_code.'&nbsp;@&nbsp;Rp&nbsp;'.number_format($v1->subtotal);
        //         // $data['resep'][$j]=$v1;
        //         $j++;
        //     }    
        // }

        $this->load->view('tplcetak/medical_receipt',$data);
    }
}
?>    