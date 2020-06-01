<?php

class m_salesitemreturn extends CI_Model {

    function tableName() {
        return 'sales_return_item';
    }

    function pkField() {
        return 'idsalesitem';
    }

    function searchField() {
        $field = "memo";
        return explode(",", $field);
    }

    function selectField() {
        return "a.sales_return_id,a.idsalesitem,a.idinventory,a.qty_return,a.resend,a.notes,a.warehouse_id,b.qty,b.price,b.disc,b.total,b.ratetax,b.size,b.measurement_id_size,b.qty_kirim,c.invno,c.nameinventory,c.sku_no,c.measurement_id_one,d.short_desc,e.short_desc as size_measurement,f.warehouse_code";
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
                    join salesitem b ON a.idsalesitem = b.idsalesitem
                    join inventory c ON b.idinventory = c.idinventory
                    left join productmeasurement d ON c.measurement_id_one = d.measurement_id
                    left join productmeasurement e ON b.measurement_id_size = e.measurement_id
                    join warehouse f ON a.warehouse_id = f.warehouse_id";

        return $query;
    }

    function whereQuery() {
        return null;
    }

    function orderBy() {
        return " a.sales_return_id desc";
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
            'acctaxpaid' => $this->input->post('idaccpaid')
        );
        return $data;
    }

}

?>