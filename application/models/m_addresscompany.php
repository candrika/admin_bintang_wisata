<?php

class m_addresscompany extends CI_Model {

    function tableName() {
        if ($this->session->userdata('group_id') != 99) {
            return 'unit';
        } else {
            return 'company';
        }
    }

    function pkField() {
        return 'idcompany';
    }

    function searchField() {
        $field = "companyname,companyaddress,companyaddress2,companyaddress3";

        return explode(",", $field);
    }

    function selectField() {
        if ($this->session->userdata('group_id') != 99) {
            return "idunit as idcompany,namaunit as companyname,alamat as companyaddress,alamat2 as companyaddress2,alamat3 as companyaddress3";
        } else {
            return "idcompany,companyname,companyaddress,companyaddress2,companyaddress3";
        }
    }

    function fieldCek() {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
            'nocustomer' => 'Kode Konsumen'
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName() . " a ";

        return $query;
    }

    function whereQuery() {
        if ($this->session->userdata('group_id') != 99) {
            return " idunit=".$this->session->userdata('idunit');
        } else {
            return null;
        }
        
    }

    function orderBy() {
        return "";
    }

    function updateField() {
        $data = array(
            'idcustomer' => $this->input->post('idcustomer') == '' ? $this->m_data->getSeqVal('seq_customer') : $this->input->post('idcustomer'),
            'idcustomertype' => $this->m_data->getID('customertype', 'namecustype', 'idcustomertype', $this->input->post('namecustype')),
            'nocustomer' => $this->input->post('nocustomer'),
            'namecustomer' => $this->input->post('namecustomer'),
            'address' => $this->input->post('address'),
            'shipaddress' => $this->input->post('shipaddress'),
            'billaddress' => $this->input->post('billaddress'),
            'telephone' => $this->input->post('telephone'),
            'handphone' => $this->input->post('handphone'),
            'fax' => $this->input->post('fax'),
            'email' => $this->input->post('email'),
            'website' => $this->input->post('website'),
            'city' => $this->input->post('city'),
            'state' => $this->input->post('state'),
            'postcode' => $this->input->post('postcode'),
            'country' => $this->input->post('country'),
            'notes' => $this->input->post('notes')
        );
        return $data;
    }

}

?>