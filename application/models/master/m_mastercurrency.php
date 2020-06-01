<?php

class m_mastercurrency extends CI_Model {

    function tableName() {
        return 'currency';
    }

    function pkField() {
        return 'idcurrency';
    }

    function searchField() {
        $field = "namecurr,symbol,description";
        return explode(",", $field);
    }

    function selectField() {
        return "idcurrency,namecurr,rate,symbol,description";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'namecurr'=>'Currency Name'  
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
            'idcurrency' => $this->m_data->getPrimaryID($this->input->post('idcurrency'),'currency', 'idcurrency', $this->session->userdata('idunit')),
            'namecurr' => $this->input->post('namecurr'),
            'symbol' => $this->input->post('symbol'),
            'rate' => $this->input->post('rate'),
            'description' => $this->input->post('description'),
            'idunit' => $this->session->userdata('idunit')
        );
        return $data;
    }

}

?>