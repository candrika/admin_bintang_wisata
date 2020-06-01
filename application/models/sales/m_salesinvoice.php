<?php

class m_salesinvoice extends CI_Model {

    function tableName() {
        return 'sales_invoice';
    }

    function pkField() {
        return 'sales_invoice_id';
    }

    function searchField() {
        $field = "no_sales_order,z.noinvoice,b.nocustomer,b.namecustomer,c.no_faktur,c.no_do";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idsales,
                z.sales_invoice_id,
                z.delivery_order_id,
                a.no_sales_order,
                z.idjournal,
                a.idunit,
                z.subtotal,
                z.freight,
                a.date_sales,
                z.tax,
                z.disc,
                z.totalamount,
                z.paidtoday,
                z.balance,
                a.comments,
                z.noinvoice,
                z.ddays,
                z.eomddays,
                z.percentagedisc,
                z.daydisc,
                z.dmax,
                z.notes_si,
                b.nocustomer,
                b.namecustomer,
                z.idpayment,
                z.invoice_status,
                z.invoice_date,
                z.duedate,
                z.total_dpp,
                c.ship_address,
                c.no_faktur,
                case z.idpayment
                    when 1 then '-'
                    when 2 then '-'
                    when 3 then z.ddays::text
                    when 4 then z.eomddays::text
                    when 5 then z.percentagedisc::text || '/' || z.daydisc::text || 'NET ' || z.dmax::text
                end as term,
                b.address as address_customer,
                b.telephone as telephone_customer,
                b.handphone as handphone_customer,
                c.no_do";
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
                    from " . $this->tableName()." z
                    join sales a ON a.idsales = z.idsales
                    join customer b ON a.idcustomer = b.idcustomer
                    left join delivery_order c on c.idsales = a.idsales and z.delivery_order_id = c.delivery_order_id";

        return $query;
    }

    function whereQuery() {
        $wer = null;
        switch ($this->input->post('option')){
            case 'unpaid':
                $wer .= " and z.paidtoday < z.totalamount  and (z.duedate >= now() or z.duedate is null) and z.invoice_status != 5";
                break;
            case 'paid':
                $wer .= " and z.paidtoday > 0  and (z.duedate >= now() or z.duedate is null)";
                break;
            case 'overdue':
                $wer .= " and z.paidtoday < z.totalamount and z.duedate < now()";
                break;
            case 'canceled':
                $wer .= " and z.invoice_status = 5";
                break;
        }
        // if($this->input->post('invoice_status')=='1,4')
        // {
        //     $wer = " and (a.invoice_status = 1 OR a.invoice_status = 4)";
        // } else {
        //     $wer = null;
        // }

        $sd = substr($this->input->post('startdate'),0,10);
        $nd = substr($this->input->post('enddate'),0,10);
        if($sd != null && $nd != null)
            $wer .= " AND z.invoice_date BETWEEN '$sd' AND '$nd'";

        return " z.display is null $wer";
    }

    function orderBy() {
        return " a.date_sales desc";
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

    function query_itemsales($idsales){
        //query item sales by idsales
         $qItem = $this->db->query("select a.idsalesitem,a.idinventory,a.warehouse_id,a.qty,a.measurement_id,a.price,a.disc,a.ratetax,a.size,a.measurement_id_size,a.total,
                                        b.invno,b.nameinventory,b.sku_no,c.warehouse_desc,c.warehouse_code,d.short_desc,e.short_desc as size_measurement
                                        from salesitem a
                                        join inventory b ON a.idinventory = b.idinventory
                                        left join warehouse c ON a.warehouse_id = c.warehouse_id
                                        left join productmeasurement d ON a.measurement_id = d.measurement_id
                                        left join productmeasurement e ON a.measurement_id_size = e.measurement_id
                                        where a.idsales = $idsales");

         return $qItem->result_array();
    }

    function query_item_do($delivery_order_id){
         $q = $this->db->query("select a.idsalesitem,a.idinventory,b.sku_no,a.idsales,a.qty,a.price,a.disc,z.total_amount as total,a.measurement_id,a.ratetax,a.size,a.measurement_id,a.measurement_id_size,a.deleted
                                ,b.invno,b.nameinventory,c.short_desc,d.warehouse_code,e.short_desc as size_measurement,z.qty_kirim,sum(qty-z.qty_kirim) as qtysisakirim
                                from deliver_order_item z
                                join salesitem a ON a.idsalesitem = z.idsalesitem
                                join inventory b ON a.idinventory = b.idinventory
                                left join productmeasurement c ON c.measurement_id = a.measurement_id
                                left join warehouse d ON d.warehouse_id = a.warehouse_id
                                left join productmeasurement e ON a.measurement_id_size = e.measurement_id
                                where z.delivery_order_id = $delivery_order_id
                                group by a.deleted,a.idsalesitem,a.idinventory,a.idsales,a.qty,a.price,a.disc,z.total_amount,a.measurement_id,z.qty_kirim,a.ratetax,a.size,a.measurement_id,a.measurement_id_size,b.invno,b.sku_no,b.nameinventory,c.short_desc,d.warehouse_code,a.size,size_measurement
                                order by a.idsalesitem desc");

        return $q->result_array();
    }

    function cetak_invoice($sales_invoice_id) {

        $q = $this->db->query("select idsales,delivery_order_id from sales_invoice where sales_invoice_id = $sales_invoice_id")->row();
        $delivery_order_id = $q->delivery_order_id;
        $idsales = $q->idsales;
          //generate data buat keperluan cetak
        $dtcetak = array();

        $sql = $this->query();
        $sql.= " WHERE z.sales_invoice_id=$sales_invoice_id";
        // echo $sql;
        $q = $this->db->query($sql);
        if($q->num_rows()>0)
        {
            $r = $q->row();
            //detail pembayaran
            $i=0;
            $total=0;

            //build item sales data
            foreach ($this->query_item_do($delivery_order_id) as $ritem) {
                $detail[$i] = $ritem;
                $i++;
            }

            $dtcetak['customer']['namecustomer'] = $r->namecustomer;
            $dtcetak['customer']['nocustomer'] = $r->nocustomer;
            $dtcetak['customer']['address'] = $r->address_customer;
            $dtcetak['customer']['telephone'] = $r->telephone_customer;
            $dtcetak['customer']['handphone'] = $r->handphone_customer;
            $dtcetak['shipaddress'] = $r->ship_address;

            $dtcetak['detail'] = $detail;
            $dtcetak['detailtotal'] = number_format($r->subtotal);

            $dtcetak['no_si'] = $r->noinvoice;
            $dtcetak['no_so'] = $r->no_sales_order;
            $dtcetak['no_do'] = $r->no_do;
            $dtcetak['no_faktur'] = $r->no_faktur;

            // //get receivefrom,total,memo,tax
            $dtcetak['dp'] = $r->paidtoday;
            $dtcetak['freigthcost'] = $r->freight;
            // $dtcetak['receivefrom'] = $r->userin;
            $dtcetak['totaltax'] = $r->tax;
            $dtcetak['total'] = $r->totalamount - $r->freight;
            $dtcetak['terbilang'] = terbilang($r->totalamount - $r->freight);
            $dtcetak['totalowed'] = $r->balance - $r->freight;
            $dtcetak['memo'] = $r->notes_si;
            $dtcetak['datetrans'] = $r->date_sales;
            $dtcetak['invoice_date'] = $r->invoice_date;
            $dtcetak['total_dpp'] = $r->total_dpp;

            // $dtcetak['receivedby'] = $r->userin;
            //get logo,address,namaunit
            $runit = $this->m_data->dataunit($r->idunit);
            $dtcetak['logo'] = $runit['logo'];
            $dtcetak['namaunit'] = $runit['namaunit'];
            $dtcetak['alamat'] = $runit['alamat'];
            $dtcetak['telp'] = $runit['telp'];
            $dtcetak['fax'] = $runit['fax'];

            //payment term
            $dtcetak['dmax'] = null;//$r->dmax;
            $dtcetak['ddays'] = $r->ddays;
            $dtcetak['eomddays'] = $r->eomddays;
            $dtcetak['daydisc'] = $r->daydisc;
            $dtcetak['shipaddress'] = $r->ship_address;
            $dtcetak['payment_term'] = payment_term_sales($r->idpayment,null,$r->ddays,$r->eomddays,$r->daydisc);
            
            $dtcetak['notes'] = array(
                $r->comments,
                'No SO #'.$r->no_sales_order,
                'No DO #'.$r->no_do,
                'Pembayaran dengan Cek/Giro atau transfer ke Rek. BCA ac. 601.001.5888 an. PT. ALFA PRIMA SENTOSA',
            );
        }
        $q->free_result();
        return $dtcetak;
    }

     function cetak($idsales)
    {        
        //generate data buat keperluan cetak
        $dtcetak = array();

        $sql = $this->query();
        $sql.= " WHERE a.idsales=$idsales";
        // echo $sql;
        $q = $this->db->query($sql);
        if($q->num_rows()>0)
        {
            $r = $q->row();
            //detail pembayaran
            $i=0;
            $total=0;

            //build item sales data
            foreach ($this->query_itemsales($r->idsales) as $ritem) {
                $detail[$i] = $ritem;
                $i++;
            }

            $dtcetak['customer']['namecustomer'] = $r->namecustomer;
            $dtcetak['customer']['nocustomer'] = $r->nocustomer;
            $dtcetak['customer']['address'] = $r->address_customer;
            $dtcetak['customer']['telephone'] = $r->telephone_customer;
            $dtcetak['customer']['handphone'] = $r->handphone_customer;
            $dtcetak['shipaddress'] = $r->shipaddress;

            $dtcetak['detail'] = $detail;
            $dtcetak['detailtotal'] = number_format($r->subtotal);

            $dtcetak['no_si'] = $r->noinvoice;
            $dtcetak['no_so'] = $r->no_sales_order;
            $dtcetak['no_do'] = $r->no_do;
            $dtcetak['no_faktur'] = $r->no_faktur;

            // //get receivefrom,total,memo,tax
            $dtcetak['dp'] = $r->paidtoday;
            $dtcetak['freigthcost'] = $r->freight;
            // $dtcetak['receivefrom'] = $r->userin;
            $dtcetak['totaltax'] = $r->tax;
            $dtcetak['total'] = $r->totalamount - $r->freight;
            $dtcetak['terbilang'] = terbilang($r->totalamount - $r->freight);
            $dtcetak['totalowed'] = $r->balance - $r->freight;
            $dtcetak['memo'] = $r->notes_si;
            $dtcetak['datetrans'] = $r->date_sales;
            $dtcetak['invoice_date'] = $r->invoice_date;
            $dtcetak['total_dpp'] = $r->total_dpp;

            // $dtcetak['receivedby'] = $r->userin;
            //get logo,address,namaunit
            $runit = $this->m_data->dataunit($r->idunit);
            $dtcetak['logo'] = $runit['logo'];
            $dtcetak['namaunit'] = $runit['namaunit'];
            $dtcetak['alamat'] = $runit['alamat'];
            $dtcetak['telp'] = $runit['telp'];
            $dtcetak['fax'] = $runit['fax'];

            //payment term
            $dtcetak['dmax'] = null;//$r->dmax;
            $dtcetak['ddays'] = $r->ddays;
            $dtcetak['eomddays'] = $r->eomddays;
            $dtcetak['daydisc'] = $r->daydisc;
            $dtcetak['shipaddress'] = $r->shipaddress;
            $dtcetak['payment_term'] = payment_term_sales($r->idpayment,null,$r->ddays,$r->eomddays,$r->daydisc);
            
            $dtcetak['notes'] = array(
                $r->comments,
                'No SO #'.$r->no_sales_order,
                'No DO #'.$r->no_do,
                'Pembayaran dengan Cek/Giro atau transfer ke Rek. BCA ac. 601.001.5888 an. PT. ALFA PRIMA SENTOSA',
            );
        }
        $q->free_result();
        return $dtcetak;
    }

}

?>
