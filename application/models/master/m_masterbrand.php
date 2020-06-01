<?php

class m_masterbrand extends CI_Model {

    function tableName() {
        return 'brand';
    }

    function pkField() {
        return 'brand_id';
    }

    function searchField() {
        $field = "brand_name";
        return explode(",", $field);
    }

    function selectField() {
        return "brand_id,a.brand_name,a.brand_desc,a.status";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'brand_name'=>'Brand Name'  
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
            'brand_id' => $this->m_data->getPrimaryID($this->input->post('brand_id'),'brand', 'brand_id', $this->session->userdata('idunit')),
            'brand_name' => $this->input->post('brand_name'),
            'brand_desc' => $this->input->post('brand_desc'),
            'status' => $this->input->post('status'),
            'idunit' => $this->session->userdata('idunit'),
        );
        return $data;
    }

}

?>