<?php

class m_masterrack extends CI_Model {

    function tableName() {
        return 'rack';
    }

    function pkField() {
        return 'rack_id';
    }

    function searchField() {
        $field = "rack_name";
        return explode(",", $field);
    }

    function selectField() {
        return "a.rack_id,a.rack_name,a.rack_type,a.rack_desc,a.status";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'rack_name'=>'Rack Name'  
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
            'rack_id' => $this->m_data->getPrimaryID($this->input->post('rack_id'),'rack', 'rack_id', $this->session->userdata('idunit')),
            'rack_name' => $this->input->post('rack_name'),
            'rack_type' => $this->input->post('rack_type'),
            'rack_desc' => $this->input->post('rack_desc'),
            'status'=>$this->input->post('status'),
            'idunit' => $this->session->userdata('idunit')
        );
        return $data;
    }

}

?>