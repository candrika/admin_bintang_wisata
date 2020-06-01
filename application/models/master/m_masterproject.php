<?php

class m_masterproject extends CI_Model {

    function tableName() {
        return 'project';
    }

    function pkField() {
        return 'project_id';
    }

    function searchField() {
        $field = "project_name";
        return explode(",", $field);
    }

    function selectField() {
        return "a.project_id,a.project_name,a.description,a.startdate,a.enddate,a.idunit,a.idcustomer,a.idtax,a.idcurrency,a.status,a.idunit,a.idcustomer,b.nocustomer,b.namecustomer,c.namaunit,a.budget,a.expense,a.realization,a.profit,d.code as taxcode,e.namecurr";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'project_name'=>'Project Name'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    left join customer b on b.idcustomer = a.idcustomer
                    left join unit c on c.idunit = a.idunit 
                    left join tax d on d.idtax = a.idtax
                    left join currency e on e.idcurrency = a.idcurrency";

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
            'project_id' => $this->m_data->getPrimaryID($this->input->post('project_id'),'project', 'project_id', $this->session->userdata('idunit')),
            'project_name' => $this->input->post('project_name'),
            'description' => $this->input->post('description'),
            'budget' => $this->input->post('budget'),
            'expense' => $this->input->post('expense'),
            'realization' => $this->input->post('realization'),
            'profit' => $this->input->post('profit'),
            'status' => $this->input->post('status'),
            'startdate'=>$this->input->post('startdate'),
            'enddate'=>$this->input->post('enddate'),
            'idcustomer' => $this->input->post('idcustomer'),
            'idunit' => $this->session->userdata('idunit'),
            'idtax' => $this->input->post('idtax'),
            'idcurrency' => $this->input->post('idcurrency'),
        );
        return $data;
    }

}

?>