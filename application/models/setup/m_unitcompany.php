<?php

class m_unitcompany extends CI_Model {

    function tableName() {
        return 'unit';
    }

    function pkField() {
        return 'idunit';
    }

    function searchField() {
        $field = "namaunit";
        return explode(",", $field);
    }

    function selectField() {
        return "idunit,namaunit,deskripsi,alamat,display,userin,usermod,datein,datemod,alamat2,alamat3,telp,fax,email,website,country,npwp,curfinanceyear,lastmonthfinanceyear,conversionmonth,numaccperiod";
    }
    
    function fieldCek()
    {
        return false;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a";

        return $query;
    }

    function whereQuery() {
        return " display is null";
    }

    function orderBy() {
        return "";
    }

    function updateField() {
        $data = array(
            'idunit' => $this->input->post('idunit') == '' ? $this->m_data->getSeqVal('seq_unit') : $this->input->post('idunit'),
//            'idbussinestype' => $this->m_data->getID('bussinestype', 'namebussines', 'idbussinestype', $this->input->post('namebussines')),
            'namaunit' => $this->input->post('namaunit'),
            'deskripsi' => $this->input->post('deskripsi'),
            'alamat' => $this->input->post('alamat'),
            'alamat2' => $this->input->post('alamat2'),
            'alamat3' => $this->input->post('alamat3'),
            'telp' => $this->input->post('telp'),
            'fax' => $this->input->post('fax'),
            'email' => $this->input->post('email'),
            'website' => $this->input->post('website'),
            'idcompany' => $this->session->userdata('idcompany'),
            'npwp' => $this->input->post('npwp'),
            'curfinanceyear' => $this->input->post('curfinanceyear'),
            'lastmonthfinanceyear' => ambilNoBulan($this->input->post('lastmonthfinanceyear')),
            'conversionmonth' => ambilNoBulan($this->input->post('conversionmonth')),
            'numaccperiod' => $this->input->post('numaccperiod')
        );
        return $data;
    }

}

?>