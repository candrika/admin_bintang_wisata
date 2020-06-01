<?php

class m_data extends CI_Model {

    function getPrimaryID($post_id_data,$table, $kolom, $idunit)
    {
        if($post_id_data==null)
        {
            //input baru
             $q = $this->db->query("select max($kolom) as id from $table where idunit = $idunit");
             // echo $this->db->last_query(); 
            if($q->num_rows()>0)
            {
                $r = $q->row();
                return $r->id+1;
            } else {
                return 1;
            }
        } else {
            //edit
            return $post_id_data;
        }
       
    }

    function getPrimaryID2($post_id_data,$table, $kolom)
    {
        if($post_id_data==null)
        {
            //input baru
             $q = $this->db->query("select max($kolom) as id from $table");
            if($q->num_rows()>0)
            {
                $r = $q->row();
                return $r->id+1;
            } else {
                return 1;
            }
        } else {
            //edit
            return $post_id_data;
        }
       
    }

    function getID($table, $kolom, $vkolom, $id) {
        if ($id == '0') {
            return null;
        } else {
            $q = $this->db->get_where($table, array($kolom => $id));
            // echo $this->db->last_query();
            if ($q->num_rows() > 0) {
                $r = $q->row();
                return $r->$vkolom;
            } else {
                return null;
            }
        }
        $q->free_result();
    }
    
    function getSeqVal($nameSeq)
    {
        $q = $this->db->query("select nextval('".$nameSeq."') as id")->row();
        return $q->id;
        $q->free_result();
    }
    
    function getIdAccount($idlinked,$idunit)
    {
        
        //ambil idaccount dari tabel linkedaccunit
        $q = $this->db->get_where('linkedaccunit',array('idlinked'=>$idlinked,'idunit'=>$idunit));
       // echo $this->db->last_query();
        $qacc = $this->db->get_where('linkedacc',array('idlinked'=>$idlinked));
        $racc = $qacc->row(0);

        if($q->num_rows()>0)
        {
            $r = $q->row();
           if($r->idaccount==null)
           {
               echo json_encode(array('success'=>false,'message'=>"Link akun <b>$racc->namelinked</b> belum ditentukan<br><br> Menu pengaturan link akun:<br> Pengaturan > Link Akun"));
               $q->free_result();
               exit;
           } else {
                return $r->idaccount;
           }
        } else {
             
             echo json_encode(array('success'=>false,'message'=>"Link akun <b>$racc->namelinked</b> belum ditentukan<br><br> Menu pengaturan link akun:<br> Pengaturan > Link Akun"));
             $q->free_result();
             exit;
        }
    }
    
    function getCurrBalance($idaccount)
    {
        $q = $this->db->get_where('account',array('idaccount'=>$idaccount));
        if($q->num_rows()>0)
        {
            $r = $r->row();
            return $r->balance;
        } else {
            return false;
        }
        $q->free_result();
    }

     function insertTaxHistory($idtax,$taxval,$rate,$datein,$idjournal,$type)
    {
        $d = array(
                "idtax" =>$idtax,
                "taxval" =>$taxval,
                "rate" =>$rate,
                "datein" =>$datein,
                "idjournal" =>$idjournal,
                "type"=>$type
            );
        $this->db->insert('taxhistory',$d);
    }

    function getMeasurement($short_desc,$idunit){
        $qmeasurement = $this->db->query("select measurement_id from productmeasurement where short_desc = '".$short_desc."' and idunit = ".$idunit." ");
            if($qmeasurement->num_rows()>0)
            {
                $rMeasurement = $qmeasurement->row();
                $measure = $rMeasurement->measurement_id;
            } else {
                $measure = null;
            }

            return intval($measure);
    }
    
    function getIDmaster($value_field,$value,$primary_key,$table,$idunit){

        if($value=='' || $value==null){
            return null;
        } 

        $q = $this->db->query("select $primary_key from $table where $value_field = '".$value."' and idunit = ".$idunit." ");
            if($q->num_rows()>0)
            {
                $r = $q->row();
                $v = $r->$primary_key;
            } else {
                $v = null;
            }
            return intval($v);
    }

    function getIdTax($rate){
        //mendapatkan idtax berdasarkan rate(%)
        $q = $this->db->query("select idtax
                                from tax
                                where rate = $rate")->row();
        return $q->idtax;
    }

    function dataunit($idunit){
        $dtunit = array();
        $qunit = $this->db->get_where('unit',array('idunit'=>$idunit));
        if($qunit->num_rows()>0)
        {
            $runit = $qunit->row();
            $dtunit['logo'] = $runit->logo==null ? 'logo_aktiva2.png' : $runit->logo;
            $dtunit['namaunit'] = $runit->namaunit;
            $dtunit['alamat'] = $runit->alamat;
            $dtunit['alamat3'] = $runit->alamat3;
            $dtunit['telp'] = $runit->telp;
            $dtunit['fax'] = $runit->fax;
        } else {

        }

        return $dtunit;
    }
    
    function getNextNoArticle($params){ // << kalau request dari php pakai ini
        $nextval = 0;
        $digit = 4;
        $prefix = $params['prefix'];
        $fieldpk = $params['fieldpk'];
        $fieldname = $params['fieldname'];
        $table = $params['table'];
        $extraparams = $params['extraparams'];
        $idunit = $params['idunit'];
        
        $y = date('y');
        $m = date('m');

        $sql = "select $fieldname 
                from $table where true 
                $extraparams and $fieldname like '%$y$m%' 
                order by $fieldpk desc
                limit 1";
        
        $q = $this->db->query($sql);
        if($q->num_rows() > 0)
            $nextval = (int) str_replace($prefix.$y.$m, '', $q->row()->$fieldname);
        
        if($nextval == 999)
            $digit = 4; 

        $nextval += 1;
        $nextval = sprintf("%0".$digit."d", $nextval);

        $q->free_result(); //relese memory
        // return $prefix.$y.$m.$nextval;
        
        //cek udah ada yg make apa blum
        // if($this->check_exists($prefix.$y.$m.$nextval,$table,$fieldname)){
            return $prefix.$y.$m.$nextval;
        // } else {
        //     return $this->next_loop($params);
        // }
       
        //echo json_encode(array('success'=>true,'nextval'=>$prefix.$y.$m.$nextval));
    }

    function company_data(){
        $data = array();
        $qunit = $this->db->get_where('unit',array('idunit'=>$this->session->userdata('idunit')));
        if($qunit->num_rows()>0)
        {
            $runit = $qunit->row();
            $data['company_logo'] = $runit->logo==null ? base_url().'/assets/images/logo_kodi.jpeg' : base_url().'/upload/'.$runit->logo;
            $data['company_name'] = $runit->namaunit;
            $data['company_address'] = $runit->alamat;
        }

        return $data;
    }
}

?>