<?php

class m_masterbom extends CI_Model {

    function tableName() {
        return 'bom';
    }

    function pkField() {
        return 'bom_id';
    }

    function searchField() {
        $field = "bom_name,bom_code";
        return explode(",", $field);
    }

    function selectField() {
        return "bom_id,a.idunit,a.qty_out,a.measurement_id,bom_name,bom_desc,bom_code,short_desc as measurement_name,price";
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
                    from " . $this->tableName()." a 
                    join productmeasurement b ON a.measurement_id = b.measurement_id";

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
            'bom_id' => $this->m_data->getPrimaryID($this->input->post('bom_id'),'bom', 'bom_id', $this->session->userdata('idunit')),
            'idunit' => $this->input->post('idunit'),
            'qty_out' => $this->input->post('qty_out'),
            'price' => str_replace('.', '', $this->input->post('price')),
            'measurement_id' => $this->input->post('measurement_id'),
            'bom_name' => $this->input->post('bom_name'),
            'bom_desc' => $this->input->post('bom_desc'),
            'bom_code' => $this->input->post('bom_code')
        );
        return $data;
    }

}

?>