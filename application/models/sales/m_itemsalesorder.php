<?php

class m_itemsalesorder extends CI_Model {

    function tableName() {
        return 'salesitem';
    }

    function pkField() {
        return 'idsalesitem';
    }

    function searchField() {
        $field = "nameinventory,a.invno,a.sku_no,b.brand_name";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idsalesitem,a.idinventory,b.sku_no,a.idsales,a.qty,a.price,a.disc,a.total,a.measurement_id,a.ratetax,a.size,a.measurement_id,a.measurement_id_size,a.deleted
        ,b.invno,b.nameinventory,c.short_desc,d.warehouse_code,e.short_desc as size_measurement,qty_kirim,sum(qty-qty_kirim) as qtysisakirim";
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
                    from " . $this->tableName()." a 
                    join inventory b ON a.idinventory = b.idinventory
                    left join productmeasurement c ON c.measurement_id = a.measurement_id
                    left join warehouse d ON d.warehouse_id = a.warehouse_id
                    left join productmeasurement e ON a.measurement_id_size = e.measurement_id
                    ";

        return $query;
    }

    function whereQuery() {
        return " a.deleted = 0
        group by a.deleted,a.idsalesitem,a.idinventory,a.idsales,a.qty,a.price,a.disc,a.total,a.measurement_id,a.qty_kirim,a.ratetax,a.size,a.measurement_id,a.measurement_id_size,b.invno,b.sku_no,b.nameinventory,c.short_desc,d.warehouse_code,a.size,size_measurement";
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