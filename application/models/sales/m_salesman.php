<?php

class m_salesman extends CI_Model {

   function tableName() {
        return 'customer';
    }

    function pkField() {
        return 'idcustomer';
    }

    function searchField() {
        $field = "namecustomer,nocustomer";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idcustomer,a.idcustomertype,a.idunit,a.nocustomer,a.namecustomer,a.address,a.shipaddress,a.billaddress,a.telephone,a.handphone,a.fax,a.email,a.website,a.city,a.state,a.postcode,a.country,a.highestpayment,a.avgdaypayment,a.lastpayment,a.lastsales,a.incomeaccount,a.notes,a.display,a.userin,a.usermod,a.datein,a.datemod,a.status,a.deleted,b.namecustype";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'nocustomer'=>'No Customer'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                left join customertype b ON a.idcustomertype = b.idcustomertype";

        return $query;
    }

    function whereQuery() {
        return " a.deleted = 0  and a.idunit = ".$this->session->userdata('idunit')." ";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            // 'idcustomer' => $this->input->post('idcustomer') == '' ? $this->m_data->getSeqVal('seq_customer') : $this->input->post('idcustomer'),
            'idcustomer'=>$this->m_data->getPrimaryID2($this->input->post('idcustomer'),'customer', 'idcustomer', $this->session->userdata('idunit')),
            'idcustomertype' => $this->input->post('idcustomertype'),
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
            'highestpayment' => $this->input->post('highestpayment'),
            'avgdaypayment'=> $this->input->post('avgdaypayment'),
            'incomeaccount'=> $this->input->post('incomeaccount'),
            'country' => $this->input->post('country'),
            'notes' => $this->input->post('notes'),
            'status'=>$this->input->post('status'),
            'deleted'=>$this->input->post('deleted'),
            'idunit' => $this->session->userdata('idunit'),
        );
        if($this->input->post('lastpayment') !== FALSE) $data['lastpayment'] = $this->input->post('lastpayment');
        if($this->input->post('lastsales') !== FALSE) $data['lastsales'] = $this->input->post('lastsales');
        return $data;
    }

}

?>