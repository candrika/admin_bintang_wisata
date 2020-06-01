<?php

class m_member_occupation extends CI_Model {

    function tableName() {
        return 'member_occupation';
    }

    function pkField() {
        return 'id_occupation';
    }

    function searchField() {
        $field = "company_name";
        return explode(",", $field);
    }


    function selectField() {
        return "id_occupation,a.id_member,a.job_role,company_name,a.company_type,a.company_address,a.company_phone,a.startdate,a.enddate,a.sallary";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'company_name'=>'company_name'
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a ";

        return $query;
    }

    function whereQuery() {
        return "a.deleted = 0";
    }

    function orderBy() {
        return "a.datein asc";
    }

    function updateField() {

        $data = array(
            'id_occupation' => $this->input->post('id_occupation') == '' ? $this->m_data->getPrimaryID($this->input->post('id_occupation'),'member_occupation','id_occupation') : $this->input->post('id_occupation'),
            'id_member' =>$this->input->post('id_member'),
            'job_role' => $this->input->post('job_role'),
            'company_name' => $this->input->post('company_name'),
            'company_type' => $this->input->post('company_type'),
            'company_address' => $this->input->post('company_address'),
            'company_phone' => $this->input->post('company_phone'),
            'startdate' => $this->input->post('startdate') == '' ? null : backdate2($this->input->post('startdate')),
            'enddate' => $this->input->post('enddate') == '' ? null : backdate2($this->input->post('enddate')),
            'sallary' => $this->input->post('sallary') == '' ? null : $this->input->post('sallary')
        );
        return $data;
    }

}

?>
