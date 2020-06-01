<?php

if (!defined('BASEPATH'))exit('No direct script access allowed');

class nurse extends MY_Controller {

    public function index() {
        
    }

    function update_photo_nurse(){
        
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
               "group_id"=>4
            );
            
            if($id == ''){

                $data['staff_id'] = $this->m_data->getPrimaryID2(null,'staff','staff_id');
                // $data["datein"] = date('Y-m-d');
                // $data["userin"] = $user_id;
                $this->db->insert('staff',$data);

            }else{
                
                $data['staff_id'] = $id;
                // $data["datemod"] = date('Y-m-d');
                // $data["usermod"] = $user_id;

                $this->db->where(array('staff_id'=>$id,'group_id'=>4));
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
}
?>    