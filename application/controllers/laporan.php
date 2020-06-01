<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class laporan extends MY_Controller {

    public function index() {
        
    }

    function patient_summary($option,$s=null,$n=null){

    	$data['title'] = 'Rekapitulasi Pasien'; 
        $data['unit'] = $this->session->userdata('namaunit');
        
        if($s!='null' && $n!='null'){
            $data['periode'] = date("d F Y", strtotime($s)).' s/d '.date("d F Y", strtotime($n)); 

        }else{
            $data['periode'] =null;
        }
        
        $data['option'] = $option;
        $data['lineheight'] = 24;

        
        $resp = $this->rest_client->get('patient/summary?startdate='.$s.'&enddate='.$n,[
    		'auth'=>[$this->session->userdata('api_key'),''],
    		'htpp_errors'=>false
    	]);
        
    	$b    = json_decode($resp->getBody());
    	
    	if(isset($b->rows)){
    		$data['rekap_pasien'] = $b->rows;
    	}else{
    		$data['rekap_pasien'] = null;
    	}

    	if($option=='print')
        {
            $data['fontsize'] = 9;
        } else {
            $data['fontsize'] = 12;
        }
        if($option=='excel')
        {
            // echo $option;
            $html = $this->load->view('report/patient_summary',$data,true);
            $filename = "rekap_pasien_".$s."_s/d_".$n.".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/patient_summary',$data);
        }
    }

    function disease_summary($s=null,$n=null,$option){

        $data['title'] = 'Rekapitulasi Diagnosa Per Penyakit'; 
        $data['unit'] = $this->session->userdata('namaunit');

        if($s!='null' && $n!='null'){
            $data['periode'] = date("d F Y", strtotime($s)).' s/d '.date("d F Y", strtotime($n)); 

        }else{
            $data['periode'] =null;
        }
        
        $data['option'] = $option;
        $data['lineheight'] = 24;
        
        // echo $s;
        // echo $n;
        
        $resp = $this->rest_client->get('docter/medical_disease_summary?startdate='.$s.'&enddate='.$n,[
            'auth'=>[$this->session->userdata('api_key'),''],
            'htpp_errors'=>false
        ]);

        $b    = json_decode($resp->getBody());
        
        if(isset($b->rows)){
            $data['disease_summary'] = $b->rows;
        }else{
            $data['disease_summary'] = null;
        }

        if($option=='print')
        {
            $data['fontsize'] = 9;
        } else {
            $data['fontsize'] = 12;
        }
        if($option=='excel')
        {
            // echo $option;
            $html = $this->load->view('report/disease_summary',$data,true);
            $filename = "rekap_pasien_".$s."_s/d_".$n.".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/disease_summary',$data);
        }

    }  

    function action_summary($s=null,$n=null,$option){

        $data['title'] = 'Rekapitulasi Diagnosa Per Tindakan'; 
        $data['unit'] = $this->session->userdata('namaunit');

        if($s!='null' && $n!='null'){
            $data['periode'] = date("d F Y", strtotime($s)).' s/d '.date("d F Y", strtotime($n)); 

        }else{
            $data['periode'] =null;
        } 
        
        $data['option'] = $option;
        $data['lineheight'] = 24;

        $resp = $this->rest_client->get('docter/medical_action_summary?startdate='.$s.'&enddate='.$n,[
            'auth'=>[$this->session->userdata('api_key'),''],
            'htpp_errors'=>false
        ]);
        
        // echo $resp->getBody();

        $b    = json_decode($resp->getBody());

        if(isset($b->rows)){
            $data['action_summary'] = $b->rows;
        }else{
            $data['action_summary'] = null;
        }

        if($option=='print')
        {
            $data['fontsize'] = 9;
        } else {
            $data['fontsize'] = 12;
        }
        if($option=='excel')
        {
            // echo $option;
            $html = $this->load->view('report/action_summary',$data,true);
            $filename = "rekap_pasien_".$s."_s/d_".$n.".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/action_summary',$data);
        }

    } 

    function drug_usage_summary($option,$s=null,$n=null,$product_id=null){

        $data['title'] = 'Rekapitulasi Penggunaan Obat'; 
        $data['unit'] = $this->session->userdata('namaunit');
        $data['periode'] = date("d F Y", strtotime($s)).' s/d '.date("d F Y", strtotime($n)); 
        $data['option'] = $option;
        $data['lineheight'] = 24;

        $resp = $this->rest_client->get('inventory/data_stock?startdate='.$s.'&enddate='.$n.'&idunit=12'.'&product_id='.$product_id,[
            'auth'=>[$this->session->userdata('api_key'),''],
            'htpp_errors'=>false
        ]);
        
        $b    = json_decode($resp->getBody());
        
        if(($b->rows)){
            $data['drug_usage'] = $b->rows;
        }else{
            $data['drug_usage'] = null;
        }

        if($option=='print')
        {
            $data['fontsize'] = 9;
        } else {
            $data['fontsize'] = 12;
        }
        if($option=='excel')
        {
            // echo $option;
            $html = $this->load->view('report/drug_usage',$data,true);
            $filename = "rekap_pasien_".$s."_s/d_".$n.".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/drug_usage',$data);
        }
    }

    function pharmacy_receipt_summary($s=null,$n=null,$option){

        $data['title'] = 'Rekapitulasi Penggunaan Obat'; 
        $data['unit'] = $this->session->userdata('namaunit');
        $data['periode'] = date("d F Y", strtotime($s)).' s/d '.date("d F Y", strtotime($n)); 
        $data['option'] = $option;
        $data['lineheight'] = 24;

        $resp = $this->rest_client->get('docter/pharmacy_receipt_summary?startdate='.$s.'&enddate='.$n,[
            'auth'=>[$this->session->userdata('api_key'),''],
            'htpp_errors'=>false
        ]);
        
        $b    = json_decode($resp->getBody());
        
        if(count($b->rows) >0){
            $data['pharmacy_receipt'] = $b->rows;
        }else{
            $data['pharmacy_receipt'] = null;
        }

        if($option=='print')
        {
            $data['fontsize'] = 9;
        } else {
            $data['fontsize'] = 12;
        }
        if($option=='excel')
        {
            // echo $option;
            $html = $this->load->view('report/pharmacy_receipt',$data,true);
            $filename = "rekap_pasien_".$s."_s/d_".$n.".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/pharmacy_receipt',$data);
        }
    }

    function sales_cash_summary($option,$s=null,$n=null){

        $data['title'] = 'Rekapitulasi Penjualan Obat Tunai'; 
        $data['unit'] = $this->session->userdata('namaunit');
        
        if($s!=null && $n!=null){
            $data['periode'] = date("d F Y", strtotime($s)).' s/d '.date("d F Y", strtotime($n)); 
        }else{
            $data['periode'] = '<br>';
        } 
        
        $data['option'] = $option;
        $data['lineheight'] = 24;
 
        $sales_paid = 0;
        
        $resp1 = $this->rest_client->get('sales/sales_cash_detail?startdate='.$s.'&enddate='.$n,[
            'auth'=>[$this->session->userdata('api_key'),''],
            'htpp_errors'=>false
        ]);
        
        $b1    = json_decode($resp1->getBody());
        
        foreach ($b1->rows as $key => $value) {
            # code...
            // print_r($value);
            $sales_paid +=$value->{'total_price'}+$value->{'tax'}*1-$value->{'disc'}*1; 
        }

        if(isset($b1->rows)){
            $data['sales_cash'] = $sales_paid;
            $data['sales_cash_detail'] = $b1->rows;
        }else{
            $data['sales_cash'] = null;
            $data['sales_cash_detail'] =null;       
        }

        if($option=='print')
        {
            $data['fontsize'] = 9;
        } else {
            $data['fontsize'] = 12;
        }
        if($option=='excel')
        {
            // echo $option;
            $html = $this->load->view('report/sales/sales_cash',$data,true);
            $filename = "rekap_pasien_".$s."_s/d_".$n.".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/sales/sales_cash',$data);
        }
    }

    function sales_unpaid_summary($option,$s=null,$n=null){

        $data['title'] = 'Rekapitulasi Penjualan Obat Belum Lunas'; 
        $data['unit'] = $this->session->userdata('namaunit');
        
        if($s!=null && $n!=null){
            $data['periode'] = date("d F Y", strtotime($s)).' s/d '.date("d F Y", strtotime($n)); 
        }else{
            $data['periode'] = '<br>';
        }
        
        $data['option'] = $option;
        $data['lineheight'] = 24;
        $sales_unpaid = null;

        $resp1 = $this->rest_client->get('sales/sales_unpaid_detail?startdate='.$s.'&enddate='.$n,[
            'auth'=>[$this->session->userdata('api_key'),''],
            'htpp_errors'=>true
        ]);
                
        $b1    = json_decode($resp1->getBody());
        
        foreach ($b1->rows as $key => $value) {
            # code...
            $sales_unpaid += $value->{'grand_total'};
        }

        if(count($b1->rows)){
            $data['sales_unpaid'] = $sales_unpaid;
            $data['sales_unpaid_detail'] = $b1->rows;
        }else{
           
            $data['sales_unpaid_detail'] =null;
        }

        if($option=='print')
        {
            $data['fontsize'] = 9;
        } else {
            $data['fontsize'] = 12;
        }
        if($option=='excel')
        {
            // echo $option;
            $html = $this->load->view('report/sales/sales_unpaid',$data,true);
            $filename = "rekap_pasien_".$s."_s/d_".$n.".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/sales/sales_unpaid',$data);
        }
    }

    function pharmacy_put($option,$s=null,$n=null,$business_id=0,$benefit_id=0){

        if($business_id!=0){
            $q = $this->db->get_where('business',array('business_id'=>$business_id))->row();

            $business_name = '&nbsp;'.$q->{'business_name'};
            $file_atth =$q->{'business_name'}."_";
        }else{
            $business_name = null;
            $file_atth     =null;
        }    
        
        if($benefit_id!=0){
            // echo "string";
            if($benefit_id == 1){

                $subtitle = "Asuransi Umum";
            }else if ($benefit_id == 2) {
                
                $subtitle = "Admedika";
            }else if ($benefit_id == 3) {
                
                $subtitle = "BPJS";
            }else if ($benefit_id == 4) {
                
                $subtitle = "Kopetri";
            }

        }else{
            $subtitle = null;
        }
            
        $data['title'] = 'Daftar Pengambilan Obat'.$business_name; 
        $data['unit'] = $this->session->userdata('namaunit');
        
        if($s!=null && $n!=null){
            $data['periode'] = $subtitle." ".date("d F Y", strtotime($s)).' s/d '.date("d F Y", strtotime($n)); 
        }else{
            $data['periode'] = '<br>';
        }
        
        $data['option'] = $option;
        $data['lineheight'] = 24;
        
        $resp1 = $this->rest_client->get('docter/pharmacy_reports?startdate='.$s.'&enddate='.$n.'&business_id='.$business_id.'&benefit_id='.$benefit_id,[
            'auth'=>[$this->session->userdata('api_key'),''],
            'htpp_errors'=>true
        ]);
        
        $b = json_decode($resp1->getBody());
        

        if(isset($b->rows) > 0){
            $data['pharmacy_put'] = $b->rows;
            // $data['sales_unpaid_detail'] = $b1->rows;
        }else{
            // echo "string";
            $data['pharmacy_put'] = null;
            $data['subtitle'] ='Tidak data pengambilan obat';
        }

        if($option=='print')
        {
            $data['fontsize'] = 9;
        } else {
            $data['fontsize'] = 12;
        }
        if($option=='excel')
        {
            // echo $option;
            $html = $this->load->view('report/pharmacy_put',$data,true);
            $filename = "laporan_pengambilan_obat_$file_atth".$s."_s/d_".$n.".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/pharmacy_put',$data);
        }
    }

    function medical_billing_report($option,$s=null,$n=null,$business_id=0,$benefit_id=0){

        if($business_id!=0){
            $q = $this->db->get_where('business',array('business_id'=>$business_id))->row();

            $business_name = '&nbsp;'.$q->{'business_name'};
            $file_atth =$q->{'business_name'}."_";
        }else{
            $business_name = null;
            $file_atth     =null;
        }    
        
        // echo $benefit_id;

        if($benefit_id!=0){
            // echo "string";
            if($benefit_id == 1){

                $subtitle = "Asuransi Umum";
            }else if ($benefit_id == 2) {
                
                $subtitle = "Admedika";
            }else if ($benefit_id == 3) {
                
                $subtitle = "BPJS";
            }else if ($benefit_id == 4) {
                
                $subtitle = "Kopetri";
            }

        }else{
            $subtitle = null;
        }
            
        $data['title'] = strtoupper('Rekapitulasi Tagihan').'&nbsp;'.$business_name; 
        $data['unit'] = $this->session->userdata('namaunit');
        
        if($s!=null && $n!=null){
            $data['periode'] = $subtitle." ".date("d F Y", strtotime($s)).' s/d '.date("d F Y", strtotime($n)); 
        }else{
            $data['periode'] = '<br>';
        }
        
        $response = $this->rest_client->get('patient/billing_report_summary?startdate='.$s.'&enddate='.$n.'&business_id='.$business_id.'&provider='.$benefit_id,[
            'auth'=>[$this->session->userdata('api_key'),''],
            'htpp_errors'=>true
        ]);

        $body = json_decode($response->getBody());

        $grand_total = 0;

        foreach ($body->rows as $key => $b) {
            // print_r($b);
            $grand_total +=$b->{'total_medical_amount'};
        }

        $data['grand_total']=$grand_total;

        if(isset($body->rows)){

            $data['bill'] =$body->rows;
        }

        $data['option'] = $option;
        $data['lineheight'] = 24;

        if($option=='print')
        {
            $data['fontsize'] = 9;
        } else {
            $data['fontsize'] = 12;
        }
        
        if($option=='excel')
        {
            // echo $option;
            $html = $this->load->view('report/bill_report_summary',$data,true);
            $filename = "laporan_rekapitulasi_tagihan_$file_atth".$s."_s/d_".$n.".xls";
            header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
            header("Content-type:   application/x-msexcel; charset=utf-8");
            header("Content-Disposition: attachment;filename=".$filename); //tell browser what's the file name
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("Cache-Control: max-age=0");
            echo $html;
        } else {
            $this->load->view('report/bill_report_summary',$data);
        }
    }
}
?>    