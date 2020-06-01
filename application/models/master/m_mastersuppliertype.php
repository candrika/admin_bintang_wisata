<?php

class m_mastersuppliertype extends CI_Model {

    function tableName() {
        return 'supplier_type';
    }

    function pkField() {
        return 'supplier_type_id';
    }

    function searchField() {
        $field = "supplier_type_name";
        return explode(",", $field);
    }

    function selectField() {
        return "supplier_type_id,a.supplier_type_name,a.supplier_type_desc,a.status";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'supplier_type_name'=>'Type Name'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a ";

        return $query;
    }

    function whereQuery() {
        return null;
    }

    function orderBy() {
        return "";
    }

    function updateField() { 

        // print_r( $this->session->userdata('user_id')); die;
        $data = array(
            'supplier_type_id' => $this->m_data->getPrimaryID($this->input->post('supplier_type_id'),'supplier_type', 'supplier_type_id', $this->session->userdata('idunit')),
            'supplier_type_name' => $this->input->post('supplier_type_name'),
            'supplier_type_desc' => $this->input->post('supplier_type_desc'),
            'status'=>$this->input->post('status'),
            'idunit' => $this->session->userdata('idunit')
        );
        return $data;
    }

}

?>