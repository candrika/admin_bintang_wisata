<?php

class m_itemsalesquotation extends CI_Model {

    function tableName() {
        return 'v_inventory';
    }

    function pkField() {
        return 'idinventory';
    }

    function searchField() {
        $field = "nameinventory,a.invno,a.sku_no,b.brand_name";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idunit,a.idinventory,brand_name,a.sku_no,a.invno,a.nameinventory,a.description,a.isinventory,a.issell,
            a.isbuy,a.cosaccount,a.incomeaccount,a.assetaccount,a.qtystock,a.images,a.cost,
            a.unitmeasure,a.numperunit,a.minstock,a.idprimarysupplier,a.sellingprice,a.idselingtax,
            a.unitmeasuresell,a.numperunitsell,a.notes,a.display,a.namesupplier,a.deleted,yearbuy,monthbuy,datebuy,a.namecat,saldopersediaan,a.short_desc";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'invno'=>'Kode Inventory'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a ";

        return $query;
    }

    function whereQuery() {
        return "a.display is null";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            'idtax' => $this->input->post('idtax') == '' ? $this->m_data->getSeqVal('seq_tax') : $this->input->post('idtax'),
            'idtaxtype' => $this->m_data->getID('taxtype', 'nametypetax', 'idtaxtype', $this->input->post('nametypetax')),
            'code' => $this->input->post('code'),
            'nametax' => $this->input->post('nametax'),
            'description' => $this->input->post('description'),
            'rate' => $this->input->post('rate'),
            'acccollectedtax' => $this->input->post('idacccollected'),
            'acctaxpaid' => $this->input->post('idaccpaid'),
            'sku_no'=> $this->input->psot('sku_no'),
        );
        return $data;
    }

}

?>