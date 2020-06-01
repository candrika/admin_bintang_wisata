<?php

class m_setuptaxlink extends CI_Model {

    function tableName() {
        return 'taxlinkunit';
    }

    function pkField() {
        return 'idtax';
    }

    function searchField() {
        $field = "namaunit";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idtax,a.acccollectedtax,a.acctaxpaid,a.idunit,c.namaunit,d.accname as acccollected,e.accname as accpaid";
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a "
                . "join tax b ON a.idtax = b.idtax
                    join unit c oN a.idunit = c.idunit
                    left join account d ON a.acccollectedtax = d.idaccount and a.idunit = d.idunit
                    left join account e ON a.acctaxpaid = e.idaccount and a.idunit = e.idunit";

        return $query;
    }

    function whereQuery() {
        return null;
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