<?php

class m_grouprules extends CI_Model {

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
        return "a.rule_id,a.rule_name,a.button_action,a.sys_menu_id,b.menu_name,c.grantaccess,c.group_id";
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
                    join sys_menu b ON a.sys_menu_id = b.sys_menu_id
					join sys_group_rules c ON a.rule_id = c.rule_id";

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
            'sys_menu_id' => $this->input->post('sys_menu_id') == '' ? $this->m_data->getSeqVal('seq_sys_menu') : $this->input->post('sys_menu_id'),
            // 'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'menu_name' => $this->input->post('menu_name'),
            'menu_link' => $this->input->post('menu_link'),
            'parent' => $this->input->post('parent'),
            'sort' => $this->input->post('sort'),
            'icon' => $this->input->post('icon'),
            'description' => $this->input->post('description')
        );
        return $data;
    }

}

?>