<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class inventory extends MY_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        $this->load->model('m_inventory');
        // $this->load->model('m_masterproductlocation');

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        // $this->methods['users_get']['limit'] = 1000; // 500 requests per hour per user/key
        // $this->methods['users_post']['limit'] = 100; // 100 requests per hour per user/key
        // $this->methods['users_delete']['limit'] = 50; // 50 requests per hour per user/key
    }

    function save_productimage(){

        // $this->db

        //inisiasi variabel
        $product_image_id = $this->input->post('product_image_id');
        $product_id = $this->input->post('products_id');
        $image_fullsize = $this->input->post('image_fullsize');
        $imagethumbnail = $this->input->post('imagethumbnail');
        $image_caption = $this->input->post('image_caption'); 
        $order_by = $this->input->post('order_by');

        // echo $product_id;
        
        $config['upload_path']          = './upload/';
        $config['allowed_types']        = 'gif|jpg|jpeg|png|bmp';
        $config['max_size']             = 1000;
        $config['max_width']            = 1500;
        $config['max_height']           = 900;

        $this->load->library('upload', $config);

        if ( ! $this->upload->do_upload('image_fullsize'))
        {
            // echo $this->upload->display_errors();
            $data = array('success'=>false,'message'=>$this->upload->display_errors());  
            echo json_encode($data); 
            return false;                     
        }
        else
        {
            $file_name = $this->upload->data()['file_name'];

            // print_r($this->upload->data());
            // die;
            
            //defined dimension
            $width_tumbnail  = 100;
            $height_tumbnail = 100;

            $width_fullsize  = 700;
            $height_fullsize = 700;
            
            //defined file locatited
            $tmp = move_uploaded_file($this->upload->data()['orig_name'], $this->upload->data()['file_name']);

            //set new name
            $tumbnail_name = $this->upload->data()['file_path'].$this->upload->data()['raw_name'].'_tumbnail'.$this->upload->data()['file_ext'];
            $fullsize_name = $this->upload->data()['file_path'].$this->upload->data()['raw_name'].'_fullsize'.$this->upload->data()['file_ext'];

            $insert_tumbnail_name = $this->upload->data()['raw_name'].'_tumbnail'.$this->upload->data()['file_ext'];
            $insert_fullsize_name = $this->upload->data()['raw_name'].'_fullsize'.$this->upload->data()['file_ext'];
            
            //get dimension
            list($width,$height) = getimagesize($this->upload->data()['full_path']);

            //divine width and height
            $div_width_tumbnail  = $width/$width_tumbnail;
            $div_height_tumbnail = $height/$height_tumbnail;
            
            $div_width_fullsize  = $width/$width_fullsize;
            $div_height_fullsize = $height/$height_fullsize;

            //set new width and height
            $new_width_tumbnail = $width/$div_width_tumbnail;
            $new_width_fullsize = $width/$div_width_fullsize;
            
            $new_height_tumbnail = $height/$div_height_tumbnail;
            $new_height_fullsize = $height/$div_height_fullsize;
             
            // fungsi untuk membuat image yang baru
            $thumb    = imagecreatetruecolor($new_width_tumbnail, $new_height_tumbnail);
            $fullsize = imagecreatetruecolor($new_width_fullsize, $new_height_fullsize);

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
            imagecopyresized($fullsize,$source,  0, 0, 0, 0, $new_width_fullsize, $new_height_fullsize, $width, $height);

            // menyimpan image yang baru
            // $this->upload->data()['file_ext']
            // gif|jpg|jpeg|png|bmp'
            // imageg
            if($this->upload->data()['file_ext']=='.gif'){

                imagegif($thumb,  $tumbnail_name);
                imagegif($fullsize, $fullsize_name);

            }elseif ($this->upload->data()['file_ext']=='.bmp') {

                imagewbmp($thumb,  $tumbnail_name);
                imagewbmp($fullsize, $fullsize_name);

            }elseif($this->upload->data()['file_ext']=='.png'){
                
                imagepng($thumb,  $tumbnail_name);
                imagepng($fullsize, $fullsize_name);
            
            }else{
                
                imagejpeg($thumb,  $tumbnail_name);
                imagejpeg($fullsize, $fullsize_name);

            }
       
            imagedestroy($thumb);
            imagedestroy($fullsize);
            imagedestroy($source);
            
            $data=array(
                "product_id" =>$product_id,
                "deleted" => 0,
                "image_thumbnail" =>$insert_tumbnail_name,
                "image_fullsize" =>$insert_fullsize_name,
                "image_caption" =>$image_caption,
                "order_by" =>$order_by,
            );
            // print_r($data);
            // // die;

            if($product_image_id == ''){

                $data['product_image_id'] = $this->m_data->getPrimaryID2(null,'product_image','product_image_id');
                $data["datein"] = date('Y-m-d');
                $data["userin"] = $this->session->userdata('user_id');
                $this->db->insert('product_image',$data);

            }else{
                
                $data['product_image_id'] = $product_image_id;
                $data["datemod"] = date('Y-m-d');
                $data["usermod"] = $this->session->userdata('user_id');

                $this->db->where('product_image_id',$product_image_id);
                $this->db->update('product_image',$data);
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

    function hapus(){
        $this->db->trans_begin();
        echo "string";
        $records = json_decode($this->input->post('postdata'));
        foreach ($records as $id) {
            $this->db->where(array(
                'product_id'=>$id
            ));
            $this->db->update('product',array(
                // 'display'=>0,
                'deleted'=>1
            ));
        }

        if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>'An unknown error was occured');
        }else{
            $this->db->trans_commit();
            $json = array('success'=>true,'message'=>'The data has been deleted succsessfully');
        }
        echo json_encode($json);
    }

        function import_data(){
        $config['upload_path']='./upload/xlsx';
        $config['allowed_types']='xlsx';
        $config['max_size']='5000';

        $this->load->library('upload',$config);

        if (!$this->upload->do_upload('filexlsx')) {
            # code...
            $error = $this->upload->display_errors();
            echo "{success:false, message:'" . $error . "'}";

        } else {

            $file=$this->upload->data()['full_path'];
            $orig_name=$this->upload->data()['orig_name'];

            require_once DOCUMENTROOT."/application/libraries/simplexlsx.class.php";
            $xlsx = new SimpleXLSX($file);

            $getWorksheetName = $xlsx->getWorksheetName();

            $val = $xlsx->rows(1);

            $start_row = 1;

            // print_r($val); die;
            if($this->validate_import_product($val,$start_row)){
                $valid = true;
            } else {
                $valid = false;
            }

            if($valid){
                $data_product = array();
                $i=0;
                while (isset($val[$start_row])) {
                    
                    $resp = $this->rest_client->get('inventory/bussiness_unit?business_code='.$val[$start_row][3].'&idunit=64',[
                            'auth'=>[$this->session->userdata('api_key'),''],
                            // 'form_params'=>['business_code'=>$business_code,'idunit'=>64],
                            'http_errors'=>false
                    ]);
                    
                    $b    = $resp->getBody();
                    $q    = json_decode($b);
                    $rows = $q->rows[0];

                    $data_product[$i]['product_no'] = $val[$start_row][0];
                    $data_product[$i]['no_barcode'] = $val[$start_row][1];
                    $data_product[$i]['product_name'] = $val[$start_row][2];
                    $data_product[$i]['business_id'] = $rows->{'business_id'};
                    $data_product[$i]['inventory_class_id'] = $val[$start_row][4];
                    $data_product[$i]['stock_available'] = $val[$start_row][5];
                    $data_product[$i]['buy_price'] = $val[$start_row][6];
                    $data_product[$i]['retail_price'] = $val[$start_row][8];
                    $data_product[$i]['retail_price_member'] = $val[$start_row][9];
                    $data_product[$i]['idunit'] = $this->session->userdata('idunit');
                    $start_row++;
                    $i++;
                }
                $send_data = json_encode($data_product);
                // echo $send_data; die;
                $response = $this->rest_client->post('inventory/multi_product',[
                    'auth'=>[$this->input->post('key'),''],
                    'form_params'=>array('data'=>$send_data),
                    'http_errors'=>false
                ]);

                $body = $response->getBody();
                echo $body;
               
            }
        }
    }

    function validate_import_product($data,$start_row){
        $idunit = $this->session->userdata('idunit');
        $error_message = 'Terjadi kesalahan pada baris ke ';

        while (isset($data[$start_row])) {
            $d = $data[$start_row];
            // print_r($d);
            if(isset($d[0]) && $d[0]!=''){
                $kode = strval($d[0]);
                $q = $this->db->get_where('product',array("no_sku"=>$kode,"deleted"=>0,'idunit'=>$idunit));
                if($q->num_rows()>0){
                    echo json_encode(array('success'=>false,'message'=>$error_message.$start_row.': Kode Produk <b>'.$kode.'</b> sudah ada'));
                    return false;
                }
                // echo $this->db->last_query(); die;               
            } else {
                echo json_encode(array('success'=>false,'message'=>$error_message.$start_row.': Kode Produk tidak boleh kosong'));
                return false;
            }

            ///////

            if(isset($d[2]) && $d[2]!=''){             
            } else {
                echo json_encode(array('success'=>false,'message'=>$error_message.$start_row.': Nama Produk tidak boleh kosong'));
               return false;
            }

            /////

            if(isset($d[3]) && $d[3]!=''){      
                $kode = $d[3];
                // $q = $this->db->get_where('business',array("business_code"=>$kode,"deleted"=>0,"idunit"=>$idunit));
                
                $resp = $this->rest_coop->get('business/datas?business_code='.$d[3].'&idunit=64',[
                            'auth'=>[COOP_APIKEY,''],
                            // 'form_params'=>['business_code'=>$business_code,'idunit'=>64],
                            'http_errors'=>true
                        ]);

                $b = $resp->getBody();
                
                $q = json_decode($b);

                if(count($q->rows) >0){
                    
                    $rows = $q->rows[0];
                    if($rows->{'business_id'}!=''){
                        
                    }   

                }else{
                    echo json_encode(array('success'=>false,'message'=>$error_message.' '.$start_row.': Kode Unit Usaha tidak ditemukan'));
                    return false;
                }
                         

            } else {
                echo json_encode(array('success'=>false,'message'=>$error_message.$start_row.': Kode Unit Usaha tidak boleh kosong'));
               return false;
            }

             /////

            if(isset($d[4]) && $d[4]!=''){      
                $kode = intval($d[4]);
                if($kode!=1 && $kode!=2){
                    echo json_encode(array('success'=>false,'message'=>$error_message.$start_row.': Jenis Produk salah'.$kode));
                    return false;
                }     
            } else {
                echo json_encode(array('success'=>false,'message'=>$error_message.$start_row.': Jenis Produk tidak boleh kosong'));
               return false;
            }


            ///////
            // pembelian
            // if(isset($d[6]) && $d[6]!=''){   
            //     //kalo isi harga pembelian. maka akun pembelian tidak boleh kosong   
            //     // if(isset($d[7]) && $d[7]!=''){  
            //     //     $kode = strval($d[7]); 
            //     //     $q = $this->db->get_where('account',array("accnumber"=>$kode,"deleted"=>0,"idunit"=>$idunit));
            //     //     if($q->num_rows()<=0){
            //     //         echo json_encode(array('success'=>false,'message'=>$error_message.$start_row.': Kode Akun Pembelian tidak ada dalam database'));
            //     //         return false;
            //     //     }     
            //     // } else {
            //     //     echo json_encode(array('success'=>false,'message'=>$error_message.$start_row.': Kode Akun Pembelian tidak boleh kosong'));
            //     //     return false;
            //     // }    
            // } else {
            //     // echo json_encode(array('success'=>false,'message'=>$error_message.$start_row.': Jenis Produk tidak boleh kosong'));
            //    // return false;
            // }

            // ///////
            // // penjualan
            // if(isset($d[8]) && $d[8]!=''){   //harga non anggota
            //     //kalo isi harga penjualan. maka akun penjualan tidak boleh kosong   
            //     // if(isset($d[10]) && $d[10]!=''){   
            //     //     $kode = strval($d[10]); 
            //     //     $q = $this->db->get_where('account',array("accnumber"=>$kode,"deleted"=>0,"idunit"=>$idunit));
            //     //     if($q->num_rows()<=0){
            //     //         echo json_encode(array('success'=>false,'message'=>$error_message.$start_row.': Kode Akun Penjualan tidak ada dalam database'));
            //     //         return false;
            //     //     }     
            //     // } else {
            //     //     echo json_encode(array('success'=>false,'message'=>$error_message.$start_row.': Kode Akun Penjualan tidak boleh kosong'));
            //     //     return false;
            //     // }    
            // } else {
            //     // echo json_encode(array('success'=>false,'message'=>$error_message.$start_row.': Jenis Produk tidak boleh kosong'));
            //    // return false;
            // }

            // if(isset($d[9]) && $d[9]!=''){    //harga anggota
            //     //kalo isi harga penjualan. maka akun penjualan tidak boleh kosong   
            //     // if(isset($d[10]) && $d[10]!=''){   
            //     //     $kode = strval($d[10]); 
            //     //     $q = $this->db->get_where('account',array("accnumber"=>$kode,"deleted"=>0,"idunit"=>$idunit));
            //     //     if($q->num_rows()<=0){
            //     //         echo json_encode(array('success'=>false,'message'=>$error_message.$start_row.': Kode Akun Penjualan tidak ada dalam database'));
            //     //         return false;
            //     //     }     
            //     // } else {
            //     //     echo json_encode(array('success'=>false,'message'=>$error_message.$start_row.': Kode Akun Penjualan tidak boleh kosong'));
            //     //     return false;
            //     // }    
            // } else {
            //     // echo json_encode(array('success'=>false,'message'=>$error_message.$start_row.': Jenis Produk tidak boleh kosong'));
            //    // return false;
            // }

            $start_row++;
        }

        return true;
    }

    function export_productList(){

        $idunit = $this->input->get('idunit');
        $inventory_class_id = $this->input->get('inventory_class_id');

        $response  = $this->rest_client->get('inventory/products?idunit='.$idunit.'&inventory_class_id='.$inventory_class_id,[
                            'auth'=>[$this->session->userdata('api_key'),''],
                            'http_errors'=>false
                        ]); 

        $results = json_decode($response->getBody());
        
        $sheet =$this->PhpSpreadsheet->getActiveSheet();
        $sheet->setTitle('Data Produk Stok Opname');
        $style_header = [ 'borderStyle' => $this->PhpSpreadsheetBorder::BORDER_MEDIUM, 'color' => [ 'rgb' => '0033cc' ] ];
        
        //
        $sheet->setCellvalue('A1','No Barang')->getStyle('A1')->getFont()->getBold(true);
        $sheet->setCellvalue('B1','No Barcode')->getStyle('B1')->getFont()->getBold(true);
        $sheet->setCellvalue('C1','Unit Usaha')->getStyle('B1')->getFont()->getBold(true);
        $sheet->setCellvalue('D1','Nama Barang')->getStyle('C1')->getFont()->getBold(true);
        $sheet->setCellvalue('E1','Lokasi produk/Rak')->getStyle('D1')->getFont()->getBold(true);
        $sheet->setCellvalue('F1','Stock Terhitung')->getStyle('E1')->getFont()->getBold(true);
        $sheet->setCellvalue('G1','Catatan')->getStyle('G1')->getFont()->getBold(true);
        
        $i = 2;
        //generate cell value
        foreach ($results->rows as $key => $d) {
            # code...
            print_r($d);
            if($d->{'location_id'}!=''){
                $rak = $this->db->query("SELECT * FROM product_location WHERE deleted=0 and idunit=".$this->session->userdata('idunit')." and status=1 and product_location_id=".$d->{'location_id'})->row();
                
                if(isset($rak->{'location_name'})){
                    $rack_name = $rak->{'location_name'};
                }else{
                    $rack_name = null;
                }    

            }else{
                $rack_name = null;
            }

            $sheet->setCellvalue('A'.$i,$d->{'no_sku'});
            $sheet->setCellvalue('B'.$i,$d->{'no_barcode'});
            $sheet->setCellvalue('C'.$i,$d->{'business_code'});
            $sheet->setCellvalue('D'.$i,$d->{'product_name'});
            $sheet->setCellvalue('E'.$i,$rack_name);

            // if($d->{'location_id'}!=''){
            //     $sheet->setCellvalue('D'.$i,$rak->{'location_name'});
            // }else{
            //     $sheet->setCellvalue('D'.$i,'');

            // }

            $sheet->setCellvalue('F'.$i,'');
            $sheet->setCellvalue('G'.$i,'');
            
            $i++;
        }

        $file ='data_produk_stok_opname.xlsx';
        $file_url=base_url().'generate_xlsx/'.$file;
        $this->PhpSpreadsheetXlsx->save('generate_xlsx/'.$file); 

        $json =array('success'=>true,'excel_url'=>$file_url);
        echo json_encode($json);
    }

    function import_opname(){

    $config['upload_path']='./upload/xlsx';
    $config['allowed_types']='xlsx';
    $config['max_size']='5000';

    $this->load->library('upload',$config);

    if (!$this->upload->do_upload('filexlsx')) {
            # code...
            $error = $this->upload->display_errors();
            echo "{success:false, message:'" . $error . "'}";

    } else {

        $file=$this->upload->data()['full_path'];
        $orig_name=$this->upload->data()['orig_name'];

        require_once DOCUMENTROOT."/application/libraries/simplexlsx.class.php";
        $xlsx = new SimpleXLSX($file);

        $getWorksheetName = $xlsx->getWorksheetName();

        $val = $xlsx->rows(1);
        // print_r($val);
        $start_row = 1;

        if($this->validate_import_opname($val,$start_row)){
            $valid = true;
        } else {
            $valid = false;
        }

        if($valid){
            $data_opname = array();
            $i=0;
            while (isset($val[$start_row])) {
                $q  = $this->db->query("SELECT * FROM product wHERE no_sku='".$val[$start_row][0]."' and deleted=0 and idunit=".$this->session->userdata('idunit'));
                $rq = $q->row();
                // print_r($val[$start_row]);

                $variance = $val[$start_row]['5'] - $rq->stock_available;

                if(isset($val[$start_row]['3'])){
                    $location_name = $val[$start_row]['3'];
                }else{
                    $location_name = "";
                }

                if(isset($val[$start_row]['6'])){
                    $note = $val[$start_row]['6'];
                }else{
                    $note = "";
                }

                $data_opname[$i]['stock_opname_id'] = $this->input->post('stock_opnameImport_id');
                $data_opname[$i]['product_id'] = $rq->product_id;
                $data_opname[$i]['product_no'] = $val[$start_row]['0'];
                $data_opname[$i]['no_barcode'] = $val[$start_row]['1'];
                $data_opname[$i]['product_name'] = $val[$start_row]['2'];
                $data_opname[$i]['location_name'] = $location_name;
                $data_opname[$i]['current_stock'] = $rq->stock_available;
                $data_opname[$i]['adjustment_stock'] = $val[$start_row]['5'];
                $data_opname[$i]['variance'] = $variance;
                $data_opname[$i]['notes'] = $note;
                
                $start_row++;
                $i++;
            }
            
            $send_data = json_encode(array('success'=>true,'message'=>'Import data stock opname berhasil','data'=>$data_opname));
            echo $send_data;
            // // die;
            // $response = $this->rest_client->post('inventory/import_stockOpname',[
            //     'auth'=>[$this->session->userdata('api_key'),''],
            //     'form_params'=>array('data'=>$send_data),
            //     'http_errors'=>false
            // ]);

            // $body = $response->getBody();
            // echo $body;
        }
    }

}   

    function validate_import_opname($data,$start_row){
        $idunit = $this->session->userdata('idunit');
        $error_message = 'Terjadi kesalahan pada baris ke ';
        
        while(isset($data[$start_row])){
            $d = $data[$start_row];
            
            if(isset($d) && $d['0']!=''){
                $kode = strval($d['0']);
                $q = $this->db->get_where('product',array('no_sku'=>$kode,'deleted'=>0,'idunit'=>$idunit));
                
                if($q->num_rows()<=0){
                    echo json_encode(array('success'=>false,'message'=>$error_message.$start_row.': Kode barang atau kode SKU yang anda masukan salah'));  
                    return false;  
                }

            }else{
                echo json_encode(array('success'=>false,'message'=>$error_message.$start_row.': Kode barang atau kode SKU tidak boleh kosong'));
                return false;
            }

            /////
            if(isset($d) && $d['1']!=''){
                $kode = strval($d['1']);
                $q = $this->db->get_where('product',array('no_barcode'=>$kode,'deleted'=>0,'idunit'=>$idunit));
                
                if($q->num_rows()<=0){
                    echo json_encode(array('success'=>false,'message'=>$error_message.$start_row.': Kode barcode yang anda masukan salah'));
                    return false;    
                }

            }
           
            //////
            // if(isset($d) && $d[3]!=''){
            //     $kode = strval($d[3]);

            // }else{
            //     // echo json_encode(array('success'=>false,'message'=>$error_message.$start_row.': jumlah stok tercatat tidak boleh kosong'));
            //     // return false;
            // }

            //////
            // if(isset($d) && $d[4]!=''){
            //     $kode = strval($d[4]);
                
            // }else{
            //     echo json_encode(array('success'=>false,'message'=>$error_message.$start_row.': jumlah stok fisik tidak boleh kosong'));
            //     return false;
            // }

            if(isset($d) && isset($d['5'])){
                $kode = strval($d['5']);
                
            }else{
                // echo json_encode(array('success'=>false,'message'=>$error_message.$start_row.': jumlah stok fisik tidak boleh kosong'));
                return true;
            }       

            $start_row++; 
        }

        return true;
    }

}
?>