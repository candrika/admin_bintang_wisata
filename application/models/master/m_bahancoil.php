<?php

class m_bahancoil extends CI_Model {

    function tableName() {
        return 'bahan_coil';
    }

    function pkField() {
        return 'bahan_coil_id';
    }

    function searchField() {
        $field = "namecat,produk_nama,keterangan";
        return explode(",", $field);
    }

    function selectField() {
        return "a.bahan_coil_id,a.az_z,a.lebar,a.tebal,a.berat,a.keterangan,a.produk_nama,a.idunit,a.idinventorycat,b.namecat";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'rack_name'=>'Rack Name'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    join inventorycat b ON a.idinventorycat = b.idinventorycat";

        return $query;
    }

    function whereQuery() {
        return " a.deleted = 0";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 

        // print_r( $this->session->userdata('user_id')); die;
        $data = array(
            'bahan_coil_id' => $this->m_data->getPrimaryID($this->input->post('bahan_coil_id'),'bahan_coil', 'bahan_coil_id', $this->session->userdata('idunit')),
            'idinventorycat' => $this->input->post('idinventorycat'),
            'az_z' => $this->input->post('az_z') == '-' ? null : $this->input->post('az_z'),
            'lebar' => $this->input->post('lebar'),
            'tebal'=>$this->input->post('tebal'),
            'berat'=>$this->input->post('berat'),
            'produk_nama'=>$this->input->post('produk_nama'),
            'keterangan'=>$this->input->post('keterangan'),
            'idunit' => $this->session->userdata('idunit')
        );
        return $data;
    }

}

?>