<?php

class m_linkedaccunit extends CI_Model {

    function tableName() {
        return 'linkedaccunit';
    }

    function pkField() {
        return 'a.idlinked,a.idaccount,a.idunit';
    }

    function searchField() {
        $field = "namelinked";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idlinked,a.idaccount,a.idunit,b.accname,b.accnumber,c.namaunit";
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a "
                . "join account b ON a.idaccount = b.idaccount
                    join unit c ON a.idunit = c.idunit";

        return $query;
    }

    function whereQuery() {
        return null;
    }

    function orderBy() {
        return " namelinked";
    }

    function updateField() {
        $data = array(
            'idcompany' => 1,
            'idbussinestype' => $this->m_data->getID('bussinestype', 'namebussines', 'idbussinestype', $this->input->post('namebussines')),
            'companyname' => $this->input->post('companyname'),
            'companyaddress' => $this->input->post('companyaddress'),
            'companyaddress2' => $this->input->post('companyaddress2'),
            'companyaddress3' => $this->input->post('companyaddress3'),
            'telp' => $this->input->post('telp'),
            'fax' => $this->input->post('fax'),
            'email' => $this->input->post('email'),
            'website' => $this->input->post('website'),
            'npwp' => $this->input->post('npwp')
        );
        return $data;
    }

}

?>