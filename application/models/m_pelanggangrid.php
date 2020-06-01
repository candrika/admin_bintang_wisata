<?php

class m_pelanggangrid extends CI_Model {

    function tableName() {
        return 'pelanggan';
    }

    function pkField() {
        return 'idpelanggan';
    }

    function searchField() {
        $field = "nama,namaperusahaan";
        return explode(",", $field);
    }

    function selectField() {
        return "idpelanggan,nama,pelanggantype,namaperusahaan,jabatan,a.npwp,telpon1,telpon2,a.fax,hp,a.email,a.website,a.alamat,kota,kodepos,pengiriman,negara,foto,catatan,namaunit";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'code'=>'Kode Supplier'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    join unit b ON a.idunit = b.idunit
                    join pelanggantype c ON a.idpelanggantype = c.idpelanggantype";

        return $query;
    }

    function whereQuery() {
        return "a.display is null";
    }

    function orderBy() {
        return "a.datein";
    }

    function updateField() { 
        $data = array(
            'idpelanggan' => $this->input->post('idpelanggan') == '' ? $this->m_data->getSeqVal('seq_pelanggan') : $this->input->post('idpelanggan'),
            'idpelanggantype' => $this->m_data->getID('pelanggantype', 'pelanggantype', 'idpelanggantype', $this->input->post('pelanggantype')),
            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'nama' => $this->input->post('nama')=='' ? null : $this->input->post('nama'),
            'namaperusahaan' => $this->input->post('namaperusahaan')=='' ? null : $this->input->post('namaperusahaan'),
            'jabatan' => $this->input->post('jabatan')=='' ? null : $this->input->post('jabatan'),
            'npwp' => $this->input->post('npwp')=='' ? null : $this->input->post('npwp'),
            'telpon1' => $this->input->post('telpon1')=='' ? null : $this->input->post('telpon1'),
            'telpon2' => $this->input->post('telpon2')=='' ? null : $this->input->post('telpon2'),
            'fax' => $this->input->post('fax')=='' ? null : $this->input->post('fax'),
            'hp' => $this->input->post('hp')=='' ? null : $this->input->post('hp'),
            'email' => $this->input->post('email')=='' ? null : $this->input->post('email'),
            'website' => $this->input->post('website')=='' ? null : $this->input->post('website'),
            'alamat' => $this->input->post('alamat')=='' ? null : $this->input->post('alamat'),
            'kota' => $this->input->post('kota')=='' ? null : $this->input->post('kota'),
            'kodepos' => $this->input->post('kodepos')=='' ? null : $this->input->post('kodepos'),
            'pengiriman' => $this->input->post('pengiriman')=='' ? null : $this->input->post('pengiriman'),
            // 'postcode' => $this->input->post('postcode'),
            'negara' => $this->input->post('negara')=='' ? null : $this->input->post('negara'),
            'catatan' => $this->input->post('catatan')=='' ? null : $this->input->post('catatan')
        );
        return $data;
    }

}

?>