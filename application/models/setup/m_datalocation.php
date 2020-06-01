<?php

class m_datalocation extends CI_Model {

    function tableName() {
        return 'location';
    }

    function pkField() {
        return 'idlocation';
    }

    function searchField() {
        $field = "location_name";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idlocation,a.location_name,a.location_code,a.status";
    }
    
    function fieldCek()
    {
        return false;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a";

        return $query;
    }

    function whereQuery() {
        return " a.deleted = 0";
    }

    function orderBy() {
        return "";
    }

    function updateField() {
        $data = array(
            'idlocation'=>$this->m_data->getPrimaryID($this->input->post('idlocation'),'location', 'idlocation',$this->session->userdata('idunit')),
            // 'idlocation' => $this->input->post('idlocation') == '' ? $this->m_data->getSeqVal('seq_location') : $this->input->post('idlocation'),
//            'idbussinestype' => $this->m_data->getID('bussinestype', 'namebussines', 'idbussinestype', $this->input->post('namebussines')),
           'location_name'=>$this->input->post('location_name'),
           'idunit'=>$this->session->userdata('idunit'),
           'location_code'=>$this->input->post('location_code'),
           'status'=>$this->input->post('status'),
        );
        return $data;
    }

}

?>