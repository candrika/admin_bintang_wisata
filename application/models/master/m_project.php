<?php

class m_project extends CI_Model {

    function tableName() {
        return 'project';
    }

    function pkField() {
        return 'idproject';
    }

    function searchField() {
        $field = "projectname";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idproject,a.projectname,a.description,a.startdate,a.enddate,a.idunit,a.idcustomer,a.idtax,a.idcurrency,a.status,a.idunit,a.idcustomer,b.nocustomer,b.namecustomer,c.namaunit,a.budget,a.expense,a.realization,a.profit,d.code as taxcode,e.namecurr";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'projectname'=>'Project Name'  
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
            'idproject' => $this->m_data->getPrimaryID($this->input->post('idproject'),'project', 'idproject', $this->session->userdata('idunit')),
            'projectname' => $this->input->post('projectname'),
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