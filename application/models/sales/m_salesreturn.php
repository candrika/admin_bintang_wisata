<?php

class m_salesreturn extends CI_Model {

    function tableName() {
        return 'sales_return';
    }

    function pkField() {
        return 'sales_return_id';
    }

    function searchField() {
        $field = "memo";
        return explode(",", $field);
    }

    function selectField() {
        return "a.sales_return_id,a.idunit,a.return_date,a.noreturn,a.idcustomer,a.memo,a.return_amount,a.idaccount_return,a.userin,a.datein,b.namecustomer,b.nocustomer,b.address as address_customer,b.telephone as telephone_customer,b.handphone as handphone_customer,c.accname,c.accnumber,a.notes,a.totaldisc,a.aftertax,a.totaltax,a.subtotal,d.accname as accnamebank,d.accnumber as accnumberbank,a.idaccount_bank,a.status,e.totalitem,e.totalqtyreturn,e.totalqtysent";
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
                    join customer b ON a.idcustomer = b.idcustomer
                    join account c ON a.idaccount_return = c.idaccount and a.idunit = c.idunit
                    join account d ON a.idaccount_bank = d.idaccount and a.idunit = d.idunit
                    left join (select sales_return_id,count(*) as totalitem,sum(qty_return) as totalqtyreturn,sum(qty_sent) as totalqtysent
                            from sales_return_item
                            group by sales_return_id) e ON a.sales_return_id = e.sales_return_id";

        return $query;
    }

    function whereQuery() {
        $wer = null;
        if($this->input->post('option')=='delivery_order'){
            $wer = ' and (a.status >= 3)';
        }
        $sd = substr($this->input->post('startdate'),0,10);
        $nd = substr($this->input->post('enddate'),0,10);
        if($sd != null && $nd != null)
            $wer .= " AND a.return_date BETWEEN '$sd' AND '$nd'";

        return " a.deleted = 0 $wer";
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

    function query_itemreturn($sales_return_id){
        $q = $this->db->query("select a.sales_return_id,a.idsalesitem,a.idinventory,a.qty_return,a.resend,a.notes,a.warehouse_id,b.qty,b.price,b.disc,b.total,b.ratetax,b.size,b.measurement_id_size,b.qty_kirim,c.invno,c.nameinventory,c.sku_no,c.measurement_id_one,d.short_desc,e.short_desc as size_measurement,f.warehouse_code
                                from sales_return_item a
                                join salesitem b ON a.idsalesitem = b.idsalesitem
                                join inventory c ON b.idinventory = c.idinventory
                                left join productmeasurement d ON c.measurement_id_one = d.measurement_id
                                left join productmeasurement e ON b.measurement_id_size = e.measurement_id
                                join warehouse f ON a.warehouse_id = f.warehouse_id
                                where a.sales_return_id = $sales_return_id");
        return $q->result_array();                                
    }

    function cetak_so_return($sales_return_id){
         //generate data buat keperluan cetak
        $dtcetak = array();

        $sql = $this->query();
        $sql.= " WHERE a.sales_return_id=$sales_return_id";
        // echo $sql;
        $q = $this->db->query($sql);
        if($q->num_rows()>0)
        {
            $r = $q->row();

            $i=0;
            $total=0;

            $dtcetak['customer']['namecustomer'] = $r->namecustomer;
            $dtcetak['customer']['nocustomer'] = $r->nocustomer;
            $dtcetak['customer']['address'] = $r->address_customer;
            $dtcetak['customer']['telephone'] = $r->telephone_customer;
            $dtcetak['customer']['handphone'] = $r->handphone_customer;

            $dtcetak['detail'] = $this->query_itemreturn($r->sales_return_id);
            $dtcetak['detailtotal'] = number_format($r->subtotal);

            $dtcetak['no'] = $r->noreturn;

            // //get receivefrom,total,memo,tax
            $dtcetak['dp'] = null;
            $dtcetak['freigthcost'] = null;
            // $dtcetak['receivefrom'] = $r->userin;
            $dtcetak['totaltax'] = null;
            $dtcetak['total'] = null;
            $dtcetak['terbilang'] = null;
            $dtcetak['totalowed'] = null;
            $dtcetak['memo'] = $r->memo;
            $dtcetak['datetrans'] = $r->return_date;

            // $dtcetak['receivedby'] = $r->userin;
            //get logo,address,namaunit
            $runit = $this->m_data->dataunit($r->idunit);
            $dtcetak['logo'] = $runit['logo'];
            $dtcetak['namaunit'] = $runit['namaunit'];
            $dtcetak['alamat'] = $runit['alamat'];
            $dtcetak['telp'] = $runit['telp'];
            $dtcetak['fax'] = $runit['fax'];
        }
        return $dtcetak;
    }
}

?>