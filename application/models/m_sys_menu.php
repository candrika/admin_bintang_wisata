<?php

class m_sys_menu extends CI_Model {

    function tableName() {
        return 'sys_menu';
    }

    function pkField() {
        return 'sys_menu_id';
    }

    function query() {
        $query = "select * 
        from sys_menu a 
        join sys_menu_group b ON a.id_group = b.sys_menu_group_id
        where type!=0";
        return $query;
    }

    function selectField() {
        return array('sys_menu_id', 'parent', 'menu_name', 'menu_link', 'group_name', 'icon', 'group_name');
    }

    function searchField() {
        return array('menu_name', 'menu_link', 'group_name', 'icon', 'group_name');
    }

    function orderBy() {
        return "";
    }

    function updateField($row) {
        foreach ($view as $key => $row) {
            $data = array(
                'sys_menu_id' => $row->sys_menu_id,
                'menu_name' => $row->menu_name,
                'menu_link' => $row->menu_link,
                'parent' => $row->parent,
                'id_group' => $this->get_cat_id($row->group_name),
                'status' => 1,
                'icon' => $row->icon
            );
        }
        return $data;
    }

    function get_cat_id($name) {
        $q = $this->db->get_where('sys_menu_group', array('group_name' => $name))->row();
        return $q->sys_menu_group_id;
    }

}

?>
