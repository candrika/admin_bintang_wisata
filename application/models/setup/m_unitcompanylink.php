<?php

class m_unitcompanylink extends CI_Model {

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
        return "a.idunit,a.namaunit,b.idlinked,c.namelinked,d.idaccount,d.accname,d.accnumber";
    }
    
    function fieldCek()
    {
        return false;
    }

    function query() {
        $query = "select DISTINCT " . $this->selectField() . "
                    from " . $this->tableName()." a
                    left join linkedaccunit b ON a.idunit = b.idunit
                    left join linkedacc c ON b.idlinked = c.idlinked
                    left join (select accnumber,idaccount,idunit,accname from account) d ON b.idaccount = d.idaccount AND b.idunit = d.idunit";

        return $query;
    }

    function whereQuery() {
        return " a.display is null and a.idunit<>99";
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