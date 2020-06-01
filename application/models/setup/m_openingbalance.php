<?php

class m_openingbalance extends CI_Model {

    function tableName() {
        return 'account';
    }

    function pkField() {
        return 'idaccount';
    }

    function searchField() {
        $field = "accname";
        return explode(",", $field);
    }

    function selectField() {
        return "idunit,idaccount,accnumber,accname,balance,idaccounttype";
    }
    
    function fieldCek()
    {
        return false;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a";

        return $query;
    }

    function whereQuery() {
        if($this->session->userdata('group_id')!=99)
        {
            if($this->input->post('idunit')!='')
            {
                $idunit = $this->input->post('idunit');
                $wer = " a.idunit = ".$idunit."";
                
            } else {
                $idunit = $this->session->userdata('idunit');
                $wer = " a.idunit = ".$idunit."";
            }
            
        } else {
            if($this->input->post('idunit')!='')
            {
                 $idunit = $this->input->post('idunit');
                $wer = " a.idunit = ".$idunit."";
            } else {
                $wer = null;
            }            
        }

        $idaccounttype = null;
        if($this->input->post('idaccounttype')!='')
        {
            $idaccounttype.=" AND (";
            $idacctype = explode(",",$this->input->post('idaccounttype'));
//            echo count($idacctype);
            $i=1;
            foreach ($idacctype as $value) {
                $idaccounttype.=" a.idaccounttype=$value";
                if($i!=count($idacctype))
                {
                    $idaccounttype.=" OR";
                }
                $i++;
            }
            $idaccounttype.=")";
        }
        
        $wer .= " AND idunit = $idunit and idparent<>0 AND
                idaccount not in(select idparent from account where idunit = $idunit) $idaccounttype and display is null";
        return $wer;
    }

    function orderBy() {
        return " accnumber";
    }

    function updateField() {
        $data = array(
            'idcompany' => 1,
            'idbussinestype' => $this->m_data->getID('bussinestype', 'namebussines', 'idbussinestype', $this->input->post('namebussines')),
            'companyname' => $this->input->post('companyname'),
            'companyaddress' => $this->input->post('companyaddress'),
            'companyaddress2' => $this->input->post('companyaddress2'),
            'companyaddress3' => $this->input->post('companyaddress3'),
            'telp' => $this->input->post('telp'),
            'fax' => $this->input->post('fax'),
            'email' => $this->input->post('email'),
            'website' => $this->input->post('website'),
            'npwp' => $this->input->post('npwp'),
            'curfinanceyear' => $this->input->post('curfinanceyear'),
            'lastmonthfinanceyear' => ambilNoBulan($this->input->post('lastmonthfinanceyear')),
            'conversionmonth' => ambilNoBulan($this->input->post('conversionmonth')),
            'numaccperiod' => $this->input->post('numaccperiod')
        );
        return $data;
    }

}

?>