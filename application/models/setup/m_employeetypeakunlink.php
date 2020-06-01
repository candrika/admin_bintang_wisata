<?php

class m_employeetypeakunlink extends MY_Model {

    function tableName() {
        return 'employeetypeakunlink';
    }

    function pkField() {
        return 'idemployeetype,idunit';
    }

    function searchField() {
        $field = "nametype";
        return explode(",", $field);
    }

    function selectField() {
        return "idemployeetype,a.idaccountpayroll,d.idaccount,b.accname as accnamepayroll,d.accname as accnamekas,namaunit,a.idunit,f.accname as accnamepaythr,g.accname as accnamethr,a.idaccountpaythr,a.idaccountthr";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'code'=>'Kode Pajak'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a "
                 . "left join account b ON a.idaccountpayroll = b.idaccount and a.idunit = b.idunit
                    left join unit c ON a.idunit = c.idunit 
                    left join account d ON a.idaccount = d.idaccount and a.idunit = d.idunit
                    left join account f ON f.idaccount = a.idaccountpaythr and a.idunit = f.idunit
                    left join account g ON g.idaccount = a.idaccountthr  and a.idunit = g.idunit";

        return $query;
    }

    function whereQuery() {
        if($this->input->post('extraparams')=='')
        {
            return $this->where_unit("a.idunit");
        } else {
            return null;
        }
    }

    function orderBy() {
        return "";
    }

    function updateField() { 

        if($this->input->post('statusformemployeetype')=='input')
        {
            $idunit = $this->input->post('namaunit');
        } else {
            $idunit = $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit'));
        }
        $data = array(
            'idemployeetype' => $this->input->post('idemployeetype') == '' ? $this->m_data->getSeqVal('seq_employeetype') : $this->input->post('idemployeetype'),
            'idunit' => $idunit,
            'idaccountpayroll' => $this->input->post('idaccountpayroll'),
            'idaccount' => $this->input->post('idaccount'),
            'nametype' => $this->input->post('nametype'),
            'description' => $this->input->post('description'),
            'payrolltypeid' => $this->m_data->getID('payrolltype', 'payname', 'payrolltypeid', $this->input->post('payname')),
            'fare' => $this->input->post('fare'),
            'idaccountpaythr' => $this->input->post('idaccountpaythr'),
            'idaccountthr' => $this->input->post('idaccountthr')
        );
        return $data;
    }

}

?>