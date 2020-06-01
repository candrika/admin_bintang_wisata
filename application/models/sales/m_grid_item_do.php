<?php

class m_grid_item_do extends CI_Model {

    function tableName() {
        return 'deliver_order_item';
    }

    function pkField() {
        return 'do_item_id';
    }

    function searchField() {
        $field = "nameinventory,b.invno,b.sku_no";
        return explode(",", $field);
    }

    function selectField() {
        return "a.do_item_id,a.delivery_order_id,a.idsalesitem,b.idinventory,b.invno,b.sku_no,a.qty_order,a.total_amount,f.measurement_id,
        f.ratetax,f.size,f.measurement_id,f.measurement_id_size,f.deleted,b.invno,b.nameinventory,c.short_desc,
        d.warehouse_code,e.short_desc as size_measurement,a.qty_kirim,a.qty_terima,a.qty_retur,a.qty_sisa,a.id_tmp";
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
                    join salesitem f ON a.idsalesitem = f.idsalesitem
                    join inventory b ON f.idinventory = b.idinventory
                    left join productmeasurement c ON c.measurement_id = f.measurement_id
                    left join warehouse d ON d.warehouse_id = a.warehouse_id
                    left join productmeasurement e ON f.measurement_id_size = e.measurement_id
                    ";

        return $query;
    }

    function whereQuery() {
        return " a.do_item_id is not null ";
    }

    function orderBy() {
        return " a.do_item_id desc";
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