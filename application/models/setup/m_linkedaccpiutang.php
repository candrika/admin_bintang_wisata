<?php

class m_linkedaccpiutang extends CI_Model {

    function tableName() {
        return 'linkpiutang';
    }

    function pkField() {
        return 'idlinkpiutang';
    }

    function searchField() {
        $field = "description";
        return explode(",", $field);
    }

    function selectField() {
        return "idlinkpiutang,idaccountpiutang as idacclinkpiutang,c.accname as accnamelinkpiutang,a.idaccount as idacclinkpenerimaan,d.accname as accnamelinkpenerimaan,a.description,a.idunit,b.namaunit";
    }

     function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'idlinkpiutang'=>'idlinkpiutang'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    join unit b ON a.idunit = b.idunit
                    join account c ON a.idaccountpiutang = c.idaccount
                    join account d ON a.idaccount = d.idaccount";

        return $query;
    }

    function whereQuery() {
        return null;
    }

    function orderBy() {
        return "idlinkpiutang";
    }

    function updateField() {
        $data = array(
            'idlinkpiutang' => $this->input->post('idlinkpiutang') == '' ? $this->m_data->getSeqVal('seq_linkpiutang') : $this->input->post('idlinkpiutang'),
            'idaccountpiutang' => $this->input->post('idacclinkpiutang'),
            'idaccount' => $this->input->post('idacclinkpenerimaan'),
            'description' => $this->input->post('description'),
            'idunit' => $this->input->post('idunit')
        );
        return $data;
    }

}

?>