<?php

class m_masterthickness extends CI_Model {

    function tableName() {
        return 'thickness';
    }

    function pkField() {
        return 'thickness_id';
    }

    function searchField() {
        $field = "thickness_name";
        return explode(",", $field);
    }

    function selectField() {
        return "thickness_id,a.item_thickness_tct,a.item_thickness_bmt,a.status";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'item_thickness_tct'=>'Item Thickness TCT',
          'item_thickness_bmt'=>'Item Thickness BMT'  
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
            'thickness_id' => $this->m_data->getPrimaryID($this->input->post('thickness_id'),'thickness', 'thickness_id', $this->session->userdata('idunit')),
            'item_thickness_tct' => $this->input->post('item_thickness_tct'),
            'item_thickness_bmt' => $this->input->post('item_thickness_bmt'),
            'status' => $this->input->post('status'),
            'idunit' => $this->session->userdata('idunit'),
        );
        return $data;
    }

}

?>