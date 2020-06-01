<?php

class m_mastermachinetype extends CI_Model {

    function tableName() {
        return 'machine_type';
    }

    function pkField() {
        return 'machine_type_id';
    }

    function searchField() {
        $field = "supplier_type_name";
        return explode(",", $field);
    }

    function selectField() {
        return "machine_type_id,a.machine_type_name,a.machine_type_desc,a.status";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'machine_type_name'=>'Type Name'  
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
            'machine_type_id' => $this->m_data->getPrimaryID($this->input->post('machine_type_id'),'machine_type', 'machine_type_id', $this->session->userdata('idunit')),
            'machine_type_name' => $this->input->post('machine_type_name'),
            'machine_type_desc' => $this->input->post('machine_type_desc'),
            'status' => $this->input->post('status'),
            'idunit' => $this->session->userdata('idunit')
        );
        return $data;
    }

}

?>