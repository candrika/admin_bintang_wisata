<?php

class m_unitcompanylinkinsurance extends CI_Model {

    function tableName() {
        return 'asuransiunit';
    }

    function pkField() {
        return 'a.idasuransi,a.idaccountcomp,a.idaccountemp,a.idunit';
    }

    function searchField() {
        $field = "namelinked";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idasuransi,a.idaccountcomp,a.idaccountemp,a.idunit,b.namaunit,c.accname as accanemecmp,d.accname as accnameemp";
    }

    function query() {
        $query = "select distinct " . $this->selectField() . "
                    from " . $this->tableName()." a "
                . "join unit b ON a.idunit = b.idunit
                    left join account c ON a.idaccountcomp = c.idaccount and a.idunit = c.idunit
                    left join account d ON a.idaccountemp = d.idaccount and a.idunit = d.idunit";

        return $query;
    }

    function whereQuery() {
        return " a.idunit!=99";
    }

    function orderBy() {
        return " namaunit";
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