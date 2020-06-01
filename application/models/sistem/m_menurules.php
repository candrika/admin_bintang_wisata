<?php

class m_menurules extends CI_Model {

    function tableName() {
        return 'sys_menu_rules';
    }

    function pkField() {
        return 'rule_id';
    }

    function searchField() {
        $field = "rule_name";
        return explode(",", $field);
    }

    function selectField() {
        return "a.rule_id,a.rule_name,a.button_action,a.sys_menu_id,b.menu_name";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'rule_id'=>'rule_id'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    join sys_menu b ON a.sys_menu_id = b.sys_menu_id";

        return $query;
    }

    function whereQuery() {
        return "";
    }

    function orderBy() {
        return "";
    }

    function updateField() {         
        
        
        $data = array(
            'rule_id' => $this->input->post('rule_id') == '' ? $this->m_data->getSeqVal('seq_master') : $this->input->post('rule_id'),
            // 'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'rule_name' => $this->input->post('rule_name'),
            'sys_menu_id' => $this->input->post('sys_menu_id')
        );
        return $data;
    }

}

?>