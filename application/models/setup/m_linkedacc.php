<?php

class m_linkedacc extends CI_Model {

    function tableName() {
        return 'linkedacc';
    }

    function pkField() {
        return 'idcompany';
    }

    function searchField() {
        $field = "namelinked";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idlinked,a.idaccounttype,namelinked,a.description,a.idaccount";
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a ";

        return $query;
    }

    function whereQuery() {
        return "a.display is null";
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