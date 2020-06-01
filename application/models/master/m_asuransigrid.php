<?php

class m_asuransigrid extends CI_Model {

    function tableName() {
        return 'asuransi';
    }

    function pkField() {
        return 'idasuransi';
    }

    function searchField() {
        $field = "namapremi,deskripsi";
        return explode(",", $field);
    }

    function selectField() {
        return "idasuransi,a.namapremi,a.deskripsi,a.percentemployee,a.percentcompany";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'code'=>'Kode Pegawai'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a "
                . "join asuransipaytype b ON a.idasuransipaytype = b.idasuransipaytype";

        return $query;
    }

    function whereQuery() {
        return null;
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            'idasuransi' => $this->input->post('idasuransi'),
            'idasuransipaytype' => $this->m_data->getID('nametype', 'nametype', 'idasuransipaytype', $this->input->post('nametype')),
            'namapremi' => $this->input->post('namapremi'),
            'deskripsi' => $this->input->post('deskripsi'),
            'percentemployee' => $this->input->post('percentemployee'),
            'percentcompany' => $this->input->post('percentcompany')
        );
        return $data;
    }

}

?>