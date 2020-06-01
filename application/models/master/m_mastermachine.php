<?php

class m_mastermachine extends CI_Model {

    function tableName() {
        return 'machine';
    }

    function pkField() {
        return 'machine_id';
    }

    function searchField() {
        $field = "a.machine_name,a.machine_description,width_material,machine_type_id,idunit,brand,serial_no,machine_result,manufacturer";
        return explode(",", $field);
    }

    function selectField() {
        return "machine_id,a.machine_name,a.machine_description,width_material,machine_type_id,idunit,brand,serial_no,machine_result,manufacturer,status";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'machine_name'=>'Machine Name'  
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
            'machine_id' => $this->m_data->getPrimaryID($this->input->post('machine_id'),'machine', 'machine_id', $this->session->userdata('idunit')),
            'machine_name' => $this->input->post('machine_name'),
            'machine_description' => $this->input->post('machine_description'),
            'machine_type_id' => $this->input->post('machine_type_id'),
            'width_material' => $this->input->post('width_material'),
            'brand' => $this->input->post('brand'),
            'serial_no' => $this->input->post('serial_no'),
            'machine_result' => $this->input->post('machine_result'),
            'manufacturer' => $this->input->post('manufacturer'),
            'status'=> $this->input->post('status'),
            'idunit' => $this->session->userdata('idunit')
        );
        return $data;
    }

}

?>