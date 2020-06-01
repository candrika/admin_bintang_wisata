<?php

class m_gridaccount extends CI_Model {

    function tableName() {
        return 'account';
    }

    function pkField() {
        return 'idaccount,idunit';
    }

    function searchField() {
        $field = "accnumber,accname";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idaccount,a.idunit,a.idaccounttype,a.accnumber,a.accname,a.balance,a.description,b.namaunit,c.acctypename,a.idparent";
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
                    join accounttype c ON a.idaccounttype = c.idaccounttype";

        return $query;
    }

    function whereQuery() {
        return " a.idpos=2 and a.active=true and a.display is null";
    }

    function orderBy() {
        return "accnumber";
    }

    function updateField() { 
        $data = array(
            'idsupplier' => $this->input->post('idsupplier') == '' ? $this->m_data->getSeqVal('seq_supplier') : $this->input->post('idsupplier'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'code' => $this->input->post('code'),
            'namesupplier' => $this->input->post('namesupplier'),
            'companyaddress' => $this->input->post('companyaddress'),
            'companyaddress2' => $this->input->post('companyaddress2'),
            'companyaddress3' => $this->input->post('companyaddress3'),
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