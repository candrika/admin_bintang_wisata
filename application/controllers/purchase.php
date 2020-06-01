<?php

if (!defined('BASEPATH'))exit('No direct script access allowed');

class purchase extends MY_Controller {

    public function index() {
        
    }

    function print_purchase($id,$print=0){
        
        $data['coop_data'] = $this->db->get_where('unit',array('idunit'=>$this->session->userdata('idunit')))->result_array()[0];
        
        //get data purchase 
        // $d['coop_data']['logo'] = base_url().'/assets/images/'.$this->session->userdata('logo');

        $data['coop_data']['logo']= base_url().'/assets/images/'.$this->session->userdata('logo');

        $response=$this->rest_client->get('purchase/data?purchase_id='.$id.'&idunit='.$this->session->userdata('idunit').'&key='.$this->session->userdata('api_key').'&password='.$this->session->userdata('password'),[
              'auth'=>[$this->session->userdata('api_key'),''],
              'http_errors' => false
        ]);

        $body = json_decode($response->getBody());
        $data['data']['d']=$body->rows[0];
        // print_r($data['data']['d']);
        
        if($data['data']['d']->{'invoice_status'}==3){
            $data['status_bayar'] = "Belum Lunas";
        }

        if ($data['data']['d']->{'invoice_status'}==4) {
            $data['status_bayar'] = "Lunas Sebagian";
            
        }

        if ($data['data']['d']->{'invoice_status'}==5) {
            $data['status_bayar'] = "Lunas";
            
        }

        //get data purchase items
        $data['invoice_date']=$this->convert_full_date($data['data']['d']->{'invoice_date'});
        $data['due_date']=$this->convert_full_date($data['data']['d']->{'due_date'});

        $response_2=$this->rest_client->get('purchase/purchase_item?id='.$id.'&idunit='.$this->session->userdata('idunit').'&key='.$this->session->userdata('api_key').'&password='.$this->session->userdata('password'),[
              'auth'=>[$this->session->userdata('api_key'),''],
              'http_errors' => false
        ]);
        $body2 = json_decode($response_2->getBody());
        $data['data']['d2']=$body2->rows;
        
        //get data customers
        // $qcustomer = $this->db->get_where('customer',array('idcustomer'=>$data['data']['d']->{'idcustomer'}))->result();
        // $data['customer']=$qcustomer;
        

        $response_3 = $this->rest_coop->post('purchase/summary_purchase_inv',[
            'auth'=>[COOP_APIKEY,''],
            'form_params' =>['include_tax'=>$data['data']['d']->{'include_tax'},
                              'shipping_cost'=>$data['data']['d']->{'freight'},
                              'Purchase_item'=>json_encode($data['data']['d2']),
                              'tax_id'=>$data['data']['d']->{'idtax'}],
            'http_errors'=>false
        ]);

        $body3 = $response_3->getBody();
        
        $data['print'] = $print;
        $data['data']['d3']=json_decode($body3);
        $data['tax'] = $data['data']['d3'];  
        

        $this->load->view('tplcetak/purchase2',$data);
    }

    function print_purchase_receipt($id,$print=0){
        
        $data['coop_data'] =$this->db->get_where('unit',array('idunit'=>$this->session->userdata('idunit')))->result_array()[0];
        
        //get data purchase 
        $data['coop_data']['logo']= base_url().'/assets/images/'.$this->session->userdata('logo');
        $response=$this->rest_client->get('purchase/data_purchase_receipt?purchase_id='.$id.'&idunit='.$this->session->userdata('idunit').'&key='.$this->session->userdata('api_key').'&password='.$this->session->userdata('password'),[
              'auth'=>[$this->session->userdata('api_key'),''],
              'http_errors' => false
        ]);

        $body = json_decode($response->getBody());
        $data['data']['d']=$body->rows[0];
        
        if($data['data']['d']->{'status_purchase_receipt'}==1){
            $data['status_purchase_receipt'] = "Belum Lunas";
        }

        if ($data['data']['d']->{'status_purchase_receipt'}==2) {
            $data['status_purchase_receipt'] = "Terima Sebagian";
            
        }

        if ($data['data']['d']->{'status_purchase_receipt'}==3) {
            $data['status_purchase_receipt'] = "Terima secara penuh";
            
        }

        if ($data['data']['d']->{'status_purchase_receipt'}==4) {
            $data['status_purchase_receipt'] = "Dibatalkan";
            
        }
        

        //get data purchase items
        $data['date_purchase']=$this->convert_full_date($data['data']['d']->{'date_purchase'});
        $data['receipt_date']=$this->convert_full_date($data['data']['d']->{'receipt_date'});

        $response_2=$this->rest_client->get('purchase/data_purchase_receipt_items?id='.$id.'&idunit='.$this->session->userdata('idunit').'&key='.$this->session->userdata('api_key').'&password='.$this->session->userdata('password'),[
              'auth'=>[$this->session->userdata('api_key'),''],
              'http_errors' => false
        ]);

        $body2 = json_decode($response_2->getBody());
        $data['data']['d2']=$body2->rows;
        $data['data']['receipt_items'] = $data['data']['d2'];
        // print_r($data['data']['d2']);
        $data['print'] = $print;
        $this->load->view('tplcetak/purchase_receipt2',$data);
    }

    function print_purchase_return($id,$print=0){
        
        $data['coop_data'] =$this->db->get_where('unit',array('idunit'=>$this->session->userdata('idunit')))->result_array()[0];
        
        //get data purchase 
        $data['coop_data']['logo']= base_url().'/assets/images/'.$this->session->userdata('logo');
        $data['coop_data']['namaunit'] = $this->session->userdata('unit');
        $data['coop_data']['alamat'] = $this->session->userdata('alamat');

        $response=$this->rest_client->get('purchase/data_purchase_return?purchase_return_id='.$id.'&idunit='.$this->session->userdata('idunit').'&key='.$this->session->userdata('api_key').'&password='.$this->session->userdata('password'),[
              'auth'=>[$this->session->userdata('api_key'),''],
              'http_errors' => false
        ]);

        $body = json_decode($response->getBody());
        $data['coop_data']['d']=$body->rows[0];
        
        //get data purchase items
        $data['date_purchase']=$this->convert_full_date($data['coop_data']['d']->{'date_purchase'});
        $data['date_return']=$this->convert_full_date($data['coop_data']['d']->{'date_return'});

        $response_2=$this->rest_client->get('purchase/purchase_return_items?id='.$id.'&idunit='.$this->session->userdata('idunit').'&key='.$this->session->userdata('api_key').'&password='.$this->session->userdata('password'),[
              'auth'=>[$this->session->userdata('api_key'),''],
              'http_errors' => false
        ]);
        $body2 = json_decode($response_2->getBody());
        $data['data']['return_items']=$body2->rows;
        $data['print']=$print;        
        $this->load->view('tplcetak/purchase_return2',$data);
    }

    function convert_full_date($d){
        $arr = explode('-', $d);
        return $arr[2].' '.ambilBulan($arr[1]).' '.$arr[0];
    }

}
?>    