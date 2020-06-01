<?php

class m_unitinsurance extends CI_Model {

    function tableName() {
        return 'asuransi';
    }

    function pkField() {
        return 'idasuransi';
    }

    function fieldCek()
    {
        return false;
    }

    function searchField() {
        $field = "namapremi,deskripsi";
        return explode(",", $field);
    }

    function selectField() {
        return "tampilemp,tampilcmp,idasuransi,namapremi,deskripsi,percentemployee,percentcompany";
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a ";

        return $query;
    }

    function whereQuery() {
        return null;
    }

    function orderBy() {
        return " namapremi";
    }

    function updateField() {
         $data = array(
            'idasuransi' => $this->input->post('idasuransi') == '' ? $this->m_data->getSeqVal('seq_asuransi') : $this->input->post('idasuransi'),
            // 'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'namapremi' => $this->input->post('namapremi'),
            'deskripsi' => $this->input->post('deskripsi'),
            // 'percentemployee' => $this->input->post('percentemployee'),
            // 'percentcompany' => $this->input->post('percentcompany'),
            // 'idaccountemp' => $this->input->post('idaccountemp'),
            'tampilemp'=>$this->input->post('tampilemp')=='' ? null : 'on',
            'tampilcmp'=>$this->input->post('tampilcmp')=='' ? null : 'on'
            // 'idaccountcomp' => $this->input->post('idaccountcomp')
        );
        return $data;
    }

}

?>