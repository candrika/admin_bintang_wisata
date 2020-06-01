<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Pengaturan extends MY_Controller {

    function loadpengaturan() {
        $q = $this->db->query("select * from pengaturan,jamsostekpersen");
        $r = $q->row();
        $json = "{
		    success: true,
		    data: {";
        $json .="jammasuk: \"" . $r->jammasuk . "\",";
        $json .="absentoleransi: \"" . $r->absentoleransi . "\",";
        $json .="persenip: \"" . $r->persenip . "\",";
        $json .="persenipk: \"" . $r->persenipk . "\",";
        $json .="logoheaderslip: \"" . $r->logoheaderslip . "\",";
        $json .="logoheaderweb: \"" . $r->logoheaderweb . "\",";
        $json .="kuotacutisetahun: \"" . $r->kuotacutisetahun . "\",";
        $json .="logoheaderweb: \"" . $r->logoheaderweb . "\",";
        $json .="jht: \"" . $r->jht . "\",";
        $json .="jpk: \"" . $r->jpk . "\",";
        $json .="jkk: \"" . $r->jkk . "\",";
        $json .="jk: \"" . $r->jk . "\",";
        $json .="bpjsk: \"" . $r->bpjsk . "\",";
        $json .="norekpthp: \"" . $r->norekpthp . "\",";
        $json .="norekdpp: \"" . $r->norekdpp . "\",";
        $json .="norekpln: \"" . $r->norekpln . "\"";
        $json .="}}";
        echo $json;
    }

    function loadgambar() {
        $q = $this->db->get('pengaturan');
        if ($q->num_rows() > 0) {
            $r = $q->row();
            if ($r->logoheaderslip == '' || $r->logoheaderweb == '') {
                echo "{success:true, logoheaderslip:'staff.png',logoheaderweb:'staff.png'}";
            } else {
                echo "{success:true, logoheaderslip:'" . $r->logoheaderslip . "',logoheaderweb:'" . $r->logoheaderweb . "'}";
            }
        }
    }
    
    function savePengaturan()
    {
        $d = array(
            'jht' => $this->input->post('jht'),
            'jpk' => $this->input->post('jpk'),
            'jkk' => $this->input->post('jkk'),
            'jk' => $this->input->post('jk'),
            'bpjsk' => $this->input->post('bpjsk'),            
            'usermod' => $this->session->userdata('username'),
            'datemod' => date('Y-m-d H:m:s')
        );
        $this->db->update('jamsostekpersen',$d);
        
        $d = array(
                //jammasuk time without time zone,
                'absentoleransi' => $this->input->post('absentoleransi'),
                'persenip' => $this->input->post('persenip'),
                'persenipk' => $this->input->post('persenipk'),
                //logoheaderslip character varying(100),
                //logoheaderweb character varying,
                'kuotacutisetahun' => $this->input->post('kuotacutisetahun'),
                'norekpthp' => $this->input->post('norekpthp'),
                'norekdpp' => $this->input->post('norekdpp'),
                'norekpln' => $this->input->post('norekpln')
        );
        $this->db->update('pengaturan',$d);
        
        if($this->db->affected_rows()>0)
        {
            echo json_encode(array('success'=>true,'message'=>'Pengaturan berhasil diperbaharui'));
        } else {
             echo json_encode(array('success'=>false,'message'=>'Pengaturan gagal diperbaharui'));
        }
    }

}

?>