<?php

class m_rolesmenu extends CI_Model {

    function tableName() {
        return 'roles';
    }

    function pkField() {
        return 'roleid';
    }

    function searchField() {
        $field = "rule_name";
        return explode(",", $field);
    }

    function selectField() {
        return " a.roleid,a.rolename,a.sys_menu_id, case when b.status is null then 'YES' else b.status end as status";
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
                    left join role_menu b ON a.roleid = b.roleid and b.group_id=".$this->input->post('group_id')."";

        return $query;
    }

    function whereQuery() {
        return "a.deleted = 0 and a.sys_menu_id=".$this->input->post('sys_menu_id')." ";
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