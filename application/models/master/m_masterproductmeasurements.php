<?php

class m_masterproductmeasurements extends CI_Model {

    function tableName() {
        return 'productmeasurement';
    }

    function pkField() {
        return 'measurement_id';
    }

    function searchField() {
        $field = "short_desc,long_desc";
        return explode(",", $field);
    }

    function selectField() {
        return "measurement_id,a.short_desc,a.long_desc,a.status";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'short_desc'=>'Short Description'  
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
            'measurement_id' => $this->m_data->getPrimaryID($this->input->post('measurement_id'),'productmeasurement', 'measurement_id', $this->session->userdata('idunit')),
            'short_desc' => $this->input->post('short_desc'),
            'long_desc' => $this->input->post('long_desc'),
            'status'=>$this->input->post('status'),
            'idunit' => $this->session->userdata('idunit'),
        );
        return $data;
    }

}

?>