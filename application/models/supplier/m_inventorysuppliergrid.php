<?php

class m_inventorysuppliergrid extends CI_Model {

    function tableName() {
        return 'inventory';
    }

    function pkField() {
        return 'idinventory';
    }

    function searchField() {
        $field = "nameinventory,a.description";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idunit,a.idinventory,a.invno,a.nameinventory,a.description,a.isinventory,a.issell,
            a.isbuy,a.cosaccount,a.incomeaccount,a.assetaccount,a.qtystock,a.images,a.cost,
            a.unitmeasure,a.numperunit,a.minstock,a.idprimarysupplier,a.sellingprice,
            a.idselingtax,a.unitmeasuresell,a.numperunitsell,a.notes,a.display,b.namesupplier,
            yearbuy,monthbuy,datebuy,c.namecat";
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
                    from " . $this->tableName()." a "
                 . "left join supplier b ON a.idprimarysupplier = b.idsupplier"
                . " join inventorycat c ON a.idinventorycat = c.idinventorycat";

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
            'idinventory'=>$this->input->post('idinventory') == '' ? $this->m_data->getSeqVal('seq_inventory') : $this->input->post('idinventory'),
            'invno'=>$this->input->post('invno'),
            'idprimarysupplier'=>$this->input->post('idprimarysupplier'),
            'nameinventory'=>$this->input->post('nameinventory'),
            'idinventorycat' => $this->m_data->getID('inventorycat', 'namecat', 'idinventorycat', $this->input->post('namecat')),
            'description'=>$this->input->post('description'),
            'cost'=>$this->input->post('cost'),
            'unitmeasure'=>$this->input->post('unitmeasure'),
            'umur' => $this->input->post('umur'),
            'residu' => str_replace(",", "", cleardot2($this->input->post('residu')))
            // 'idtax' => $this->input->post('idtax') == '' ? $this->m_data->getSeqVal('seq_tax') : $this->input->post('idtax'),
            // 'idtaxtype' => $this->m_data->getID('taxtype', 'nametypetax', 'idtaxtype', $this->input->post('nametypetax')),
            // 'code' => $this->input->post('code'),
            // 'nametax' => $this->input->post('nametax'),
            // 'description' => $this->input->post('description'),
            // 'rate' => $this->input->post('rate'),
            // 'acccollectedtax' => $this->input->post('idacccollected'),
            // 'acctaxpaid' => $this->input->post('idaccpaid')
        );
        return $data;
    }

}

?>