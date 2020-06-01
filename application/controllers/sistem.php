<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class sistem extends MY_Controller {

    public function index() {
        
    }
    
    function sysmenudata($parent, $expanded=false)
    {
        // echo 'asds'.$expanded;
        $node = $this->input->get('node');
        if($node!=''){
            $parent = $node;
        }

        $json = "{
                    \"text\": \".\",
                    \"children\": [
                        " . $this->createMenu($parent, $expanded) . "
                    ]
                }";
       echo $json;
    }
    
    function createMenu($PARENT,$expanded) {
        $sql = "SELECT a.sys_menu_id,a.menu_name,a.menu_link,a.parent,a.sort,a.icon,a.description,b.menu_name as menuinduk,b.sys_menu_id as sys_menu_id_induk,c.view,c.add,c.edit,c.delete
                from sys_menu a
                left join sys_menu b ON a.parent = b.sys_menu_id
                left join hakakses c ON c.group_id = ".$this->session->userdata('group_id')." and c.sys_menu_id = a.sys_menu_id";

        if($expanded!=false)
            {
                $sql .=" where a.display is null and a.menu_link!=''";
            } else {
                $sql .=" where a.display is null and a.parent=$PARENT";
            }

            // if($expanded!=false)
            // {
                // $sql.=" ORDER BY a.menu_name asc";
            // } else {
                $sql.=" ORDER BY a.sort asc";
            // }
        // echo $sql;
        $query = $this->db->query($sql);
        // echo $this->db->last_query();

        $menu = "";
        foreach ($query->result() as $r) {
            if($expanded!=false)
            {
                $leaf = 'true';
            } else {
                $leaf = $this->cekChildMenu($r->sys_menu_id);
            }
            
            $this->db->select('menu_name');
            $qinduk = $this->db->get_where('sys_menu',array('sys_menu_id'=>$r->parent,'display'=>null));
            if($qinduk->num_rows()>0)
            {
                $rinduk = $qinduk->row();
                $menu_name = $rinduk->menu_name." <img src='./assets/icons/fam/arrow_right.png'> ".$r->menu_name;
            } else {
                $menu_name = $r->menu_name;
            }

            $icon = $r->icon==null ? 'open-folder' : $r->icon;
            $menu .= "{";
            $menu .= "\"id\": \"$r->sys_menu_id\",
                    \"text\": \"$menu_name\",
                    \"menu_link\": \"$r->menu_link\",
                    \"sys_menu_id\": \"$r->sys_menu_id\",
                    \"menuinduk\": \"$r->menuinduk\",
                    \"sys_menu_id_induk\": \"$r->sys_menu_id_induk\",
                    \"parent\": \"$r->parent\",
                    \"sort\": \"$r->sort\",
                    \"iconCls\": \"$icon\",
                    \"icon\": \"$r->icon\",
                    \"view\": \"$r->view\",
                    \"add\": \"$r->add\",
                    \"edit\": \"$r->edit\",
                    \"delete\": \"$r->delete\",
                    \"description\": \"$r->description\",
                    \"leaf\": $leaf";
//            echo $leaf;

            // if($expanded!=false)
            // {
            //     $menu .=",\"expanded\": \"true\"";
            // }

            if ($leaf == 'false') {
                if($this->input->get('node')!=0){
                    $menu .=",\"children\": [" . $this->makeSubMenu($r->sys_menu_id,$expanded) . "]";
                }                
            }

            $menu .="},";
        }
        return $menu;
    }
    
    function cekChildMenu($id) {
        $q = $this->db->get_where('sys_menu', array('parent' => $id));

        if ($q->num_rows() > 0) {
            return 'false';
        } else {
            return 'true';
        }
    }
    
    function makeSubMenu($parent, $expanded) {
        return $this->createMenu($parent, $expanded);
    }
    
    function getaksesmenuunit()
    {
        $idmenu = $this->input->post('idmenu');
        $qunit = $this->db->get_where('unit',array('display'=>null));
       return $this->fetchJsonAksesMenu($qunit,array('idunit','namaunit','checked'),$idmenu);
    }
    
    function getaksesmenu()
    {
        $id = $this->input->post('id');
        $this->db->join('sys_group','sys_group.group_id = sys_group_menu.group_id');
        $q  = $this->db->get_where('sys_group_menu',array('sys_menu_id'=>$id));
        $v = null;
        foreach($q->result() as $r)
        {
            $v.=$r->group_name.',';
        }
        $v = substr($v, 0, -1);;
        echo $v;
    }
    
    function fetchJsonAksesMenu($q, $field,$idmenu) {
        // echo $this->db->last_query();
        $num = $q->num_rows();
        if ($num > 0) {
            $success = 'true';

            //bikin data array
            $i = 0;
            foreach ($q->result_array() as $r) {
                for ($if = 0; $if < count($field); $if++) {
					if($field[$if]=='checked')
					{
                        $qcek = $this->db->get_where('sys_menu_unit',array('idunit'=>$r['idunit'],'sys_menu_id'=>$idmenu));
                        if($qcek->num_rows()>0)
                        {
                            $rcek = $qcek->row();
                            if($rcek->sys_menu_id==null)
                            {
                                $d[$i][$field[$if]] = false;  
                            } else {
                                $d[$i][$field[$if]] = true;  
                            }
                        } else {
                            $d[$i][$field[$if]] = false;    
                        }
						
					} else {
						$d[$i][$field[$if]] = $r[$field[$if]];	
					}
                    
                }
                $i++;
            }
        } else {
            $success = 'false';
        }

        //bikin notasi json dari data array diatas
        $json = "{
                \"success\": $success,
                \"data\": [";
//           $json = "[";
        // $i=0;
        $j = 1;
        for ($i = 0; $i < $num; $i++) {
            $json .= "{";

            for ($if = 0; $if < count($field); $if++) {
                # code...
//                echo $d[$i][$field[$if]].' ';
                $json .="" . $field[$if] . ": '" . $d[$i][$field[$if]] . "'";

                $c = count($field);
                $c--;
//                echo $if." < ".$c." ";
                if ($if != $c) {
                    $json .=",";
                }
            }

            if ($j == $num) {
                $json .= "}";
            } else {
                $json .= "},";
            }
            $j++;
        }

//        $json .="]";
        $json .="]}";
//         $json = str_replace(" ", "", $json);
        echo $json;
    }
    
    function getUnit()
    {
        // $q = $this->db->get_where('inventoryunit',array('idinventory'=>$idinventory));
        $sql = "select idunit,namaunit 
                from unit
                where display is null";
        $q = $this->db->query($sql);
        $d = array();
        $num = $q->num_rows();
        $i=1;
        $str = null;
        foreach ($q->result() as $r) {
//            $str.=$r->namaunit;
            if($i!=$num)
            {
                $str.="[$r->idunit,$r->namaunit],";
            }
            $i++;
            // $d[] = $r->namaunit;
        }
        // echo json_encode($d);
        echo $str;
    }
	
    function hapusmenu()
    {
        $retAkses = $this->cekAksesUser(102,'delete');
        if(!$retAkses['success'])
        {
            echo json_encode($retAkses);
            exit;
        }

//        $records = json_decode($this->input->post('postdata'));
//        foreach ($records as $id) {
//        }
        $this->db->trans_begin();
        
        $id = $this->input->post('id');
        $q = $this->db->get_where('sys_menu',array('parent'=>$id));
        foreach($q->result() as $r)
        {
            $this->hapussubmenu($r->sys_menu_id);
        }        
        $this->db->where('sys_menu_id',$id);
        $this->db->delete('sys_group_menu');
        
        $this->db->where('sys_menu_id',$id);
        $this->db->delete('sys_menu');
        
        
        
         if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Hapus menu gagal');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Hapus menu berhasil');
        }

        echo json_encode($json);
    }
    
    function hapussubmenu($id)
    {
        $q = $this->db->get_where('sys_menu',array('parent'=>$id));
        foreach($q->result() as $r)
        {
            $this->recHapusMenu($r->sys_menu_id);
            $this->db->where('sys_menu_id',$r->sys_menu_id);
            $this->db->delete('sys_menu');
        }        
        $this->db->where('sys_menu_id',$id);
        $this->db->delete('sys_menu');
    }
    
    function recHapusMenu($id)
    {
        $retAkses = $this->cekAksesUser(102,'delete');
        if(!$retAkses['success'])
        {
            echo json_encode($retAkses);
            exit;
        }
        $this->hapussubmenu($id);
    }
    
    function cekakses()
    {
        $group_id = $this->session->userdata('group_id');
        $roleid = $this->input->get('roleid');

        $q = $this->db->query("select a.rolename,b.status
                                from roles a
                                left join role_menu b ON a.roleid = b.roleid and b.group_id=$group_id
                                where a.roleid=$roleid");
        if($q->num_rows()>0)
        {
            $r = $q->row();
            if($r->status=='YES' || $r->status==null)
            {
                $json = array('success' => true, 'message' => '');
            } else {
                $json = array('success' => false, 'message' => 'Insufficient rights for <b>'.$r->rolename.'</b>');
            }
        } else {
            $json = array('success' => false, 'message' => '');
        }
       // echo $this->db->last_query();
        echo json_encode($json);
    }
    
    function saveRuleChange()
    {
        $this->db->trans_begin();
        
        $group_id = $this->input->post('group_id');
        $rule_id = $this->input->post('rule_id');
        $grantaccess = $this->input->post('grantaccess');
        $this->db->where(array('group_id'=>$group_id,'rule_id'=>$rule_id));
        $this->db->update('sys_group_rules',array('grantaccess'=>$grantaccess));
        
         if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Gagal');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Berhasil');
        }

        echo json_encode($json);
    }

    function updateHakAkses()
    {
        $option = $this->input->post('option');
        $checked = $this->input->post('checked');
        $index = $this->input->post('index');
        $id = $this->input->post('id');
        $group_id = $this->input->post('group_id');

        $data = array(
            "sys_menu_id" => $id,
            "group_id" => $group_id,
            // "view" bool,
            // "edit" bool,
            // "delete" bool,
            // "add" bool,
            "usermod" => $this->session->userdata('username'),
            "datemod" => date('Y-m-d'),
        );
        $data[$option] = $checked=='false' ? null : $checked;

        $q = $this->db->get_where('hakakses',array('sys_menu_id'=>$id,'group_id'=>$group_id));
        if($q->num_rows()>0)
        {
            $this->db->where(array('sys_menu_id'=>$id,'group_id'=>$group_id));
            $this->db->update('hakakses',$data);
        } else {
            $this->db->insert('hakakses',$data);
        }

    }

    function cekHakAkses()
    {
        // $id = $this->input->post('idmenu');
        // $this->db->select('view');
        // $q = $this->db->get_where('hakakses',array('sys_menu_id'=>$id,'group_id'=>$this->session->userdata('group_id')));
        // if($q->num_rows()>0)
        // {
        //     $r = $q->row();
        //     if($r->view==null)
        //     {
        //         $json = array('success' => false);
        //     } else {
        //         $json = array('success' => true);
        //     }
        // } else {
        //      $json = array('success' => false);
        // }
        // echo $this->db->last_query();
        $json = array('success' => true);
        echo json_encode($json);
    }

    function reset_data($idunit)
    {
        $this->db->trans_begin();

        $this->db->where('idunit',$idunit);
        $this->db->delete('accounthistory');

        $this->db->where('idunit',$idunit);
        $this->db->delete('accountlog');

        $this->db->where('idunit',$idunit);
        $this->db->delete('clossing');

        $this->db->where('idunit',$idunit);
        $this->db->update('account',array('balance'=>0));

     

         //
        $this->db->where('idunit',$idunit);
        $this->db->delete('inventoryunit');

         $this->db->where('idunit',$idunit);
        $this->db->delete('linkpiutang');

        //  $this->db->where('idunit',$idunit);
        // $this->db->delete('pelanggan');
       
        $this->db->where('idunit',$idunit);
        $this->db->update('account',array('balance'=>0));

        $q = $this->db->get_where('spendmoney',array('idunit'=>$idunit));
        foreach ($q->result() as $r) {
            $this->db->where('idspendmoney',$r->idspendmoney);
            $this->db->delete('spendmoneyitem');          
        }
        $this->db->where('idunit',$idunit);
        $this->db->delete('spendmoney');

        $q = $this->db->get_where('receivemoney',array('idunit'=>$idunit));
        foreach ($q->result() as $r) {
            $this->db->where('idreceivemoney',$r->idreceivemoney);
            $this->db->delete('receivemoneyitem');          
        }
        $this->db->where('idunit',$idunit);
        $this->db->delete('receivemoney');

        $this->db->where('idunit',$idunit);
        $this->db->delete('transferkas');

        ///
        $q = $this->db->get_where('inventory_count',array('idunit'=>$idunit));
        foreach ($q->result() as $r) {
            $this->db->where('inventory_count_id',$r->inventory_count_id);
            $this->db->delete('inventory_count_items');    
        }        
        $this->db->where('idunit',$idunit);
        $this->db->delete('inventory_count');

        $q = $this->db->get_where('inventory_transfer',array('idunit'=>$idunit));
        foreach ($q->result() as $r) {
            $this->db->where('transfer_stock_id',$r->transfer_stock_id);
            $this->db->delete('inventory_transfer_item');    
        }        
        $this->db->where('idunit',$idunit);
        $this->db->delete('inventory_transfer');

        $q = $this->db->get_where('inventoryadjusment',array('idunit'=>$idunit));
        foreach ($q->result() as $r) {
            $this->db->where('idinvadjusment',$r->idinvadjusment);
            $this->db->delete('inventoryadjitem');    
        }        
        $this->db->where('idunit',$idunit);
        $this->db->delete('inventoryadjusment');

        // $q = $this->db->get_where('inventoryunit',array('idunit'=>$idunit));
        // foreach ($q->result() as $r) {
        //     $this->db->where('idinventory',$r->idinventory);
        //     $this->db->delete('inventory_supplier');  

        //     $this->db->where('idinventory',$r->idinventory);
        //     $this->db->delete('inventory');  
        // }        
        // $this->db->where('idunit',$idunit);
        // $this->db->delete('inventoryunit');

        // $this->db->where('idunit',$idunit);
        // $this->db->delete('stock_history');

        $this->db->where('idunit',$idunit);
        $this->db->update('warehouse_stock',array('stock'=>0));
        ////

        $this->db->where('idunit',$idunit);
        $this->db->delete('inventory_hpp_history');

        $this->db->where('idunit',$idunit);
        $this->db->delete('registrasihutang');

        $this->db->where('idunit',$idunit);
        $this->db->delete('registrasipiutang');

        $q = $this->db->get_where('business',array('idunit'=>$idunit));
        foreach ($q->result() as $r) {
            $this->db->where('business_id',$r->business_id);
            $this->db->delete('business_content');  

            $q = $this->db->get_where('business_object',array('business_id'=>$r->business_id));
            foreach ($q->result() as $r2) {
                $this->db->where('bussiness_risk_id',$r2->bussiness_risk_id);
                $this->db->delete('business_object_attr'); 
            }        
            $this->db->where('business_id',$r->business_id);
            $this->db->delete('business_object');

            $this->db->where('business_id',$r->business_id);
            $this->db->delete('business_term_payment');  

            $q = $this->db->get_where('business_placing',array('business_id'=>$r->business_id));
            foreach ($q->result() as $r2) {
                $this->db->where('business_placing_id',$r2->business_placing_id);
                $this->db->delete('business_vendor'); 

                $this->db->where('business_placing_id',$r2->business_placing_id);
                $this->db->delete('finance_note'); 
            }        
            $this->db->where('business_id',$r->business_id);
            $this->db->delete('business_placing');

            $q = $this->db->get_where('claim',array('business_id'=>$r->business_id));
            foreach ($q->result() as $r2) {
                $this->db->where('claim_id',$r2->claim_id);
                $this->db->delete('claim_document'); 
            }        
            $this->db->where('business_id',$r->business_id);
            $this->db->delete('claim');

            $q = $this->db->get_where('endorsement',array('business_id'=>$r->business_id));
            foreach ($q->result() as $r2) {
                $this->db->where('endorsement_id',$r2->endorsement_id);
                $this->db->delete('endorsement_vendor'); 
            }

            $this->db->where('business_id',$r->business_id);
            $this->db->delete('endorsement');

            // $q = $this->db->get_where('business_field_val',array('business_id'=>$r->business_id));
            // foreach ($q->result() as $r2) {
            //     $this->db->where('endorsement_id',$r2->endorsement_id);
            //     $this->db->delete('endorsement_vendor'); 
            // }

            $this->db->where('business_id',$r->business_id);
            $this->db->delete('business_field_val');

        }        
        $this->db->where('idunit',$idunit);
        $this->db->delete('business');

           //
        $q = $this->db->get_where('journal',array('idunit'=>$idunit));
        foreach ($q->result() as $r) {
            $this->db->where('idjournal',$r->idjournal);
            $this->db->delete('disbursment');

            $this->db->where('idjournal',$r->idjournal);
            $this->db->delete('journalitem');

            
            $this->db->where('idjournal',$r->idjournal);
            $this->db->delete('piutanghistory');

            $this->db->where('idjournal',$r->idjournal);
            $this->db->delete('piutangpayhistory');
        }
         $this->db->where('idunit',$idunit);
        $this->db->delete('journal');
        //
        $this->db->query('delete from finance_note');

        if ($this->db->trans_status() === FALSE)
        {
                $this->db->trans_rollback();
        }
        else
        {
                $this->db->trans_commit();
        }
    }

    function testis()
    {
        $qgrup = $this->db->get_where('sys_group',array('display'=>null));
        foreach ($qgrup->result() as $rg) {
            $qmenu = $this->db->get_where('sys_menu',array('display'=>null));
            foreach ($qmenu->result() as $r) {
                    $datam = array(
                        "sys_menu_id" => $r->sys_menu_id,
                        "group_id" => $rg->group_id,
                        "view" => 'TRUE',
                        "edit" => 'TRUE',
                        "delete" => 'TRUE',
                        // "usermod" varchar(20),
                        // "datemod" timestamp(6),
                        "add" => 'TRUE'
                    );
                    $this->db->insert('hakakses',$datam);
            }
        }
        
    }

    function insert_link_acc($idunit){
        $q = $this->db->get('linkedacc');
        foreach($q->result() as $r){
            $qcek = $this->db->get_where('linkedaccunit',array('idunit'=>$idunit,'idlinked'=>$r->idlinked));
            if($qcek->num_rows()>0){

            } else {
                $this->db->insert('linkedaccunit',array('idunit'=>$idunit,'idlinked'=>$r->idlinked));
            }
        }
        
    }

      function savevisible()
    {
        $data = array(
                'group_id'=>$this->input->post('sys_group_role'),
                'sys_menu_id'=>$this->input->post('sys_menu_id')
            );
        $qcek = $this->db->get_where('sys_group_menu',$data);
        if($qcek->num_rows()>0)
        {
            $this->db->where($data);
            $this->db->update('sys_group_menu',$data);
        } else {
            $this->db->insert('sys_group_menu',$data);
        }
    }

     function getvisible(){
        $data = array(
                'group_id'=>$this->input->post('sys_group_role'),
                'sys_menu_id'=>$this->input->post('sys_menu_id')
            );
        $qcek = $this->db->get_where('sys_group_menu',$data);
        if($qcek->num_rows()>0)
        {
            $json = array('success' => true, 'value' => true);
        } else {
            $json = array('success' => true, 'value' => false);
        }
        echo json_encode($json);
    }
	
    function deletevisible(){
        $data = array(
                'group_id'=>$this->input->post('sys_group_role'),
                'sys_menu_id'=>$this->input->post('sys_menu_id')
            );
       $this->db->where($data);
       $this->db->delete('sys_group_menu');
    }

    function saveRoleMenu() {
        $dataGrid = json_decode($this->input->post('dataGrid'));
        $group_id = $this->input->post('group_id');
        foreach ($dataGrid as $key => $value) {
            $q = $this->db->get_where('role_menu',array('group_id'=>$group_id,'roleid'=>$value->roleid));
            if($q->num_rows()>0)
            {
                $this->db->where('roleid',$value->roleid);
                $this->db->where('group_id',$group_id);
                $this->db->update('role_menu',array('status'=>$value->status));
            } else {
                $this->db->insert('role_menu',array(
                        'status'=>$value->status,
                        'group_id'=>$group_id,
                        'roleid'=>$value->roleid
                    ));
            }
            // echo $this->db->last_query().'<br>';
        }

    }

}
?>