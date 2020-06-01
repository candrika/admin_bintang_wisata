<?php

if (!defined('BASEPATH'))exit('No direct script access allowed');

class sales extends MY_Controller {

    public function index() {
        
    }

    function print_sales($idsales){
        $d['data'] = $this->m_data->company_data();

        //request data sales 
        $response  = $this->rest_client->get('sales/datas?id='.$idsales.'&idunit='.$this->session->userdata('idunit'),[
            'auth'=>[$this->session->userdata('api_key'),''],
            'http_errors'=>false
        ]); 

        
        $body = json_decode($response->getBody());
        $d['data']['d'] = $body->{'rows'}[0];
        // print_r($d['data']['d']);

        if($d['data']['d']->{'status'}==5){
            $d['status']='Lunas';
        }

          
        if($d['data']['d']->{'invoice_status'}==3){
            $d['status']='Belum Lunas';
        }else if($d['data']['d']->{'invoice_status'}==4){
            $d['status']='Partially Paid';
        }else if($d['data']['d']->{'invoice_status'}==5){
            $d['status']='Lunas';
        }
        
        //request data sales items 
        $resps  = $this->rest_client->get('sales/item_datas?id='.$idsales.'&idunit='.$this->session->userdata('idunit'),[
            'auth'=>[$this->session->userdata('api_key'),''],
            'http_errors'=>false
        ]);    

        $body1 =json_decode($resps->getBody());
        $d['data']['d1']=$body1->{'rows'};

        $d['title']="Penjualan Cash";
        $this->load->view('tplcetak/pos_receipt',$d);
    }

    function print_sales_inv($id,$print=0){

        //get data koperasi model m_data 
        $d['coop_data'] = $this->m_data->company_data();
        $d['coop_data']['logo'] = base_url().'/assets/images/'.$this->session->userdata('logo');
        
        //query data koperasi
        $d['company'] =$this->db->get_where('unit',array('idunit'=>$this->session->userdata('idunit')))->result_array()[0];

        //request data sales items 
        $response  = $this->rest_client->get('sales/datas?id='.$id.'&idunit='.$this->session->userdata('idunit'),[
            'auth'=>[$this->session->userdata('api_key'),''],
            'http_errors'=>false
        ]); 
        
        $body = json_decode($response->getBody());
        $d['data']['d'] = $body->{'rows'}[0];
        // print_r($d['data']['d']);
        
        $d['data']['grand_total']=  $d['data']['d']->{'subtotal'}-$d['data']['d']->{'disc'}+$d['data']['d']->{'freight'}+$d['data']['d']->{'tax'};

        //defined sales inv status
        if($d['data']['d']->{'invoice_status'}==3 || $d['data']['d']->{'invoice_status'}==0){
            $d['status']='Belum Lunas';
        }else if($d['data']['d']->{'invoice_status'}==4){
            $d['status']='Partially Paid';
        }else if($d['data']['d']->{'invoice_status'}==5){
            $d['status']='Lunas';
        }

        //defined term payment
        if($d['data']['d']->{'id_payment_term'}==1){
            $d['payment_term']='Net 7';
        }else if($d['data']['d']->{'id_payment_term'}==2){
            $d['payment_term']='Net 15';
        }else if($d['data']['d']->{'id_payment_term'}==3){
            $d['payment_term']='Net 30';
        }else if($d['data']['d']->{'id_payment_term'}==4){
            $d['payment_term']='Net 60';
        }else if($d['data']['d']->{'id_payment_term'}==5    ){
            $d['payment_term']='Lainnya atau custom';
        }        

        $d['date_sales'] =  $this->convert_full_date($d['data']['d']->{'date_sales'});
        $d['due_date'] =  $this->convert_full_date($d['data']['d']->{'due_date'});

        //request data sales items 
        $resp = $this->rest_client->get('sales/item_datas?id='.$id.'&idunit='.$this->session->userdata('idunit'),[
            'auth'=>[$this->session->userdata('api_key'),''],
            'http_errors'=>false
        ]);    

        $body1 =json_decode($resp->getBody());
        $d['data']['d1']=$body1->{'rows'};
        
        //query customer
        if($d['data']['d']->customer_type==1){
           
           $d['data']['alamat'] = $d['data']['d']->{'address'};
           $d['data']['email'] = $d['data']['d']->{'email'};
            
        }else if($d['data']['d']->customer_type==2){
           
           $d['data']['alamat'] = $d['data']['d']->{'address'};
           $d['data']['email'] = $d['data']['d']->{'email'};
        }

        /*
    
        */
        
        $resp1 = $this->rest_coop->post('sales/calc_sales_invoice_recap',[
            'auth'=>[COOP_APIKEY,''],
            'form_params' =>['include_tax'=>$d['data']['d']->{'include_tax'},
                              'shipping_cost'=>$d['data']['d']->{'freight'},
                              'sales_item'=>json_encode($d['data']['d1']),
                              'tax_id'=>$d['data']['d']->{'tax_id'}],
            'http_errors'=>true
        ]);

        $body2 = $resp1->getBody();
        $d['sales_recap']=json_decode($body2);
        
        $d['print'] = $print;
        $d['title']="Invoice Penjualan #.".$d['data']['d']->{'noinvoice'};
        $this->load->view('tplcetak/sales_invoice3',$d);
    }

    function convert_full_date($d){
        $arr = explode('-', $d);
        return $arr[2].' '.ambilBulan($arr[1]).' '.$arr[0];
    }

    function save_medic_payment(){

        $member_id = $this->input->post('member_id');
        $medical_record_id = $this->input->post('medical_record_id');
        $sales_id = $this->input->post('sales_id');
        $payment_methode = $this->input->post('payment_methode');
        $loan_plafon_payment = $this->input->post('loan_plafon_payment');
        $date_payment = $this->input->post('date_payment_payment');
        $memo = $this->input->post('memoDiagnosapayment');
        $subtotal = $this->input->post('subtotalpayment');
        $shipping_fee = $this->input->post('shipping_fee');
        $diskon = $this->input->post('diskonpayment');
        $total  = $this->input->post('totalpayment');
        $status = $this->input->post('status_payment');

        //check sisa angsuran
        if($payment_methode*1 ==1){

            if(str_replace(',', '', $loan_plafon_payment) < cleardot($total)){

                $json = array('success'=>false,'message'=>'Sisa plafon anda tidak cukup');
                echo json_encode($json);
                return false;
            }

            $payment_amount = str_replace(',', '', $loan_plafon_payment);
        }else{
            $payment_amount = cleardot($total);
            
        }

        if($status*1==1){
           
            $invoice_status = 3;

        }else if($status*1==2){

            $invoice_status = 5;

        }else if($status*1==3){
            
            $invoice_status = 2;
        }

        //update ke tabel medical record
        $medic = $this->rest_client->put('docter/medical_record',[
            'auth'=>[$this->session->userdata('api_key'),''],
            'form_params'=>array(
                'medical_record_id'=>$medical_record_id,
                'payment_methode'=>$payment_methode,
                'loan_plafon'=>$loan_plafon_payment,
                'date_payment'=>$date_payment !=''? $date_payment:null,
                'memo'=>$memo,
                'subtotal'=>$subtotal,
                'shipping_fee'=>$shipping_fee,
                'diskon'=>$diskon,
                'total'=>$total,
                'payment_status' =>$status,
                'payment_amount' =>$payment_amount
            ),
            'http_errors'=>false
        ]);

        $body = json_decode($medic->getBody());

        //update ke tabel sales
        $sales = $this->rest_client->put('sales/upddate_medic_payment',[
            'auth'=>[$this->session->userdata('api_key'),''],
            'form_params'=>array(
                'sales_id'=>$sales_id,
                'payment_methode'=>$payment_methode,
                'date_payment'=>$date_payment !=''? $date_payment:null,
                'memo'=>$memo,
                'subtotal'=>$subtotal,
                'shipping_fee'=>$shipping_fee,
                'diskon'=>$diskon,
                'total'=>$total,
                'invoice_status'=>$invoice_status
            ),
            'http_errors'=>false
        ]);

        $b =$sales->getBody();
        echo $b;
        
        if($payment_methode==1){
            // echo "string";
            //buat hutang pembelian baru
            $resp = $this->rest_coop->post('loan/new',[
                'auth'=>[COOP_APIKEY,''],
                'form_params'=>array('key'=>COOP_APIKEY,
                                     'member_id'=>$member_id,
                                     'loan_type_id'=>(int)125,
                                     'proposed_amount'=>str_replace('.','',$total),
                                     'length_loan'=>1,
                                     'proposed_date'=>date('Y-m-d'),
                                     'remarks'=>'Pembayaran Berobat',
                                     'auto_approved'=>'yes'
                ),
                'http_errors' => false
            ]);

        //     echo $resp->getBody();
        }
    }

    function kasir_pasien($id){
        $company_data = $this->m_data->company_data();

        $data['data']['company_logo'] = $company_data['company_logo'];
        $data['data']['company_name'] = $company_data['company_name'];
        
        $data['data']['company_address'] = $this->session->userdata('alamat');
        
        $response1 = $this->rest_client->get('sales/paymet_medical?medical_record_id='.$id,[
            'auth'=>[$this->session->userdata('api_key'),''],
            'http_errors'=>false
        ]); 

        $body1    = json_decode($response1->getBody());
        
        $diagnosis = $body1->rows[0];
       
        $data['data']['medical_record_no'] = $diagnosis->{'medical_record_no'};
        $data['data']['no_sales_order'] = $diagnosis->{'no_sales_order'};
        $data['data']['receipt_number'] = $diagnosis->{'receipt_number'};
        $data['data']['medical_record_date'] = $diagnosis->{'medical_record_date'};
        $data['data']['doctor_name'] = $diagnosis->{'doctor_name'};
        $data['data']['patient_address'] = $diagnosis->{'address'};
        $data['data']['no_tlp'] = $diagnosis->{'no_tlp'};
        $data['data']['no_mobile'] = $diagnosis->{'no_mobile'};
        $data['data']['discount_amount'] = $diagnosis->{'discount_amount'};
        $data['data']['shpping_fee'] = $diagnosis->{'shpping_fee'};
        
        $data['data']['paidtoday'] = $diagnosis->{'grand_total'};
        $data['data']['payment_amount'] = $diagnosis->{'payment_amount'};
        $data['data']['payment_method'] = $diagnosis->{'payment_method'};
        
        if(isset($diagnosis->{'business_name'})){
            $data['data']['business_name'] = $diagnosis->{'business_name'};

        }else{
            
            $data['data']['business_name'] ='Umum';
        }
        
        $data['data']['np_number'] = $diagnosis->{'np_number'};
        
        if(isset($diagnosis->{'divisi'})){
            $data['data']['divisi'] = $diagnosis->{'divisi'};
        }else{
            $data['data']['divisi'] = null;
        }
        
        $datein   = explode(' ', $diagnosis->{'datein'});
        
        $data['data']['datein']=backdate2($datein[0]).' '.$datein[1];
        $data['data']['medical_record_desc']=$diagnosis->{'medical_record_desc'};

        if(isset($diagnosis->{'member_name'})){
            $data['data']['member_name'] = $diagnosis->{'member_name'};
        }

        $data['data']['patient_name'] = $diagnosis->{'patient_name'};
        $data['data']['patient_type'] = $diagnosis->{'patient_type'};
        $data['data']['provider'] = $diagnosis->{'benefit_id'};
        
        if(isset($diagnosis->{'birthday_date'})){
            $data['data']['birthday_date'] = backdate2($diagnosis->{'birthday_date'});

            $data['data']['umur'] = diff_two_dates2($diagnosis->{'birthday_date'},date('Y-m-d'));
           
            $data['data']['usia'] = $data['data']['umur']['years'];
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

            $data['data']['relationship_type'] = $rows1[0]->{'relationship'};
        }else{
            $data['data']['relationship_type'] = null;
        }

        $x=0;
        
        $data['data']['medical_fee'][$x]['fee']=$diagnosis->service_amount;
        $data['data']['medical_fee'][$x]['keterangan']='Pemeriksaan Dokter';
        
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
                
                $data['data']['medical_fee'][$z]['fee']=$v2->service_fee;
                $data['data']['medical_fee'][$z]['keterangan']=$v2->medical_action_desc;
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
                $data['data']['medical_fee'][$i]['fee']=$v->subtotal*($v->qty*1);
                $data['data']['medical_fee'][$i]['keterangan']=$v->product_name.'&nbsp;'.($v->qty*1).'&nbsp;'.$v->product_unit_code.'&nbsp;@&nbsp;Rp&nbsp;'.number_format($v->subtotal);
                $i++;
            }
        }
        // print_r($data['data']['medical_fee']);
        $data['title'] = 'Kasir Pasien';
        $this->load->view('tplcetak/cetak_kasir_pasien',$data);   
    }
}
?>