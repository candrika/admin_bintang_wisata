<?php

class m_masterwarehouse extends CI_Model {

    function tableName() {
        return 'warehouse';
    }

    function pkField() {
        return 'warehouse_id';
    }

    function searchField() {
        $field = "warehouse_code";
        return explode(",", $field);
    }

    function selectField() {
        return "warehouse_id,a.warehouse_code,a.warehouse_address,a.warehouse_cogs_standard,a.warehouse_type,a.warehouse_desc,a.status";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'warehouse_code'=>'Warehouse Code'  
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
            'warehouse_id' => $this->m_data->getPrimaryID($this->input->post('warehouse_id'),'warehouse', 'warehouse_id', $this->session->userdata('idunit')),
            'warehouse_code' => $this->input->post('warehouse_code'),
            'warehouse_address' => $this->input->post('warehouse_address'),
            'warehouse_cogs_standard' => $this->input->post('warehouse_cogs_standard'),
            'warehouse_type' => $this->input->post('warehouse_type'),
            'warehouse_desc' => $this->input->post('warehouse_desc'),
            'status'=>$this->input->post('status'),
            'idunit' => $this->session->userdata('idunit')
        );
        return $data;
    }

}

?>