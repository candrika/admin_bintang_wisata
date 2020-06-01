<?php

class m_masterbank extends CI_Model {

    function tableName() {
        return 'bank';
    }

    function pkField() {
        return 'bank_id';
    }

    function searchField() {
        $field = "bank_name,branch_name,account_number";
        return explode(",", $field);
    }

    function selectField() {
        return "bank_id,a.bank_name,a.branch_name,address,account_number,account_name";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'bank_name'=>'Bank Name'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a ";

        return $query;
    }

    function whereQuery() {
        return " a.deleted = 0";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 

        // print_r( $this->session->userdata('user_id')); die;
        $data = array(
            'bank_id' => $this->m_data->getPrimaryID($this->input->post('bank_id'),'bank', 'bank_id', $this->session->userdata('idunit')),
            'bank_name' => $this->input->post('bank_name'),
            'branch_name' => $this->input->post('branch_name'),
            'address' => $this->input->post('address'),
            'account_number' => $this->input->post('account_number'),
            'account_name' => $this->input->post('account_name'),
            'idunit' => $this->session->userdata('idunit')
        );
        return $data;
    }

}

?>