<?php

class m_sysmenuakses extends CI_Model {

    function tableName() {
        return 'sys_menu';
    }

    function pkField() {
        return 'sys_menu_id';
    }

    function searchField() {
        $field = "menu_name";
        return explode(",", $field);
    }

    function selectField() {
        return "a.sys_menu_id,a.menu_name,a.menu_link,a.parent,a.sort,a.icon,a.description,b.menu_name as menuinduk,b.sys_menu_id as sys_menu_id_induk,view,add,edit,delete";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'sys_menu_id'=>'sys_menu_id'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    left join sys_menu b ON a.parent = b.sys_menu_id
                    left join hakakses c ON c.group_id = ".$this->input->post('group_id')." and c.sys_menu_id = a.sys_menu_id";

        return $query;
    }

    function whereQuery() {
        return "a.display is null and a.menu_link!=''";
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