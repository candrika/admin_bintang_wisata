<?php

class m_masterproducttype extends CI_Model {

    function tableName() {
        return 'product_type';
    }

    function pkField() {
        return 'product_type_id';
    }

    function searchField() {
        $field = "product_type_name";
        return explode(",", $field);
    }

    function selectField() {
        return "product_type_id,a.product_type_name,a.product_type_desc,a.status";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'product_type_name'=>'product_type Name'  
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
            'product_type_id' => $this->m_data->getPrimaryID($this->input->post('product_type_id'),'product_type', 'product_type_id', $this->session->userdata('idunit')),
            'product_type_name' => $this->input->post('product_type_name'),
            'product_type_desc' => $this->input->post('product_type_desc'),
            'status'=>$this->input->post('status'),
            'idunit' => $this->session->userdata('idunit')
        );
        return $data;
    }

}

?>