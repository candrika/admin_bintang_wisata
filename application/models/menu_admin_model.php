<?php

class menu_admin_model extends CI_Model{
	
	function getTreeMenu($PARENT){
            $gid = $this->session->userdata('group_id');
            
            $sql = "SELECT a.*
                     FROM sys_menu a
                     JOIN sys_group_menu b ON a.sys_menu_id = b.sys_menu_id
                     WHERE b.group_id = $gid AND a.parent =  '$PARENT' and (a.display is null)
                     ORDER BY a.sort";
           // echo $sql;
            $query = $this->db->query($sql);
        return $query;
    }
}

?>