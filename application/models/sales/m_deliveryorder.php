<?php

class m_deliveryorder extends CI_Model {

    function tableName() {
        return 'delivery_order';
    }

    function pkField() {
        return 'idsales';
    }

    function searchField() {
        $field = "no_sales_order,z.no_do,namecustomer";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idsales,
                a.idemployee,
                z.no_faktur,
                a.idjournal,
                a.idtax,
                a.idcustomer,
                a.date_sales,
                a.no_sales_order,
                a.subtotal,
                a.freight,
                a.tax,
                a.disc,
                a.totalamount,
                a.comments,
                a.userin,
                a.datein,
                a.status,
                a.idcurrency,
                a.idcustomer,
                l.noinvoice,
                l.invoice_status,
                a.idpayment,
                a.ddays,
                a.eomddays,
                a.percentagedisc,
                a.daydisc,
                a.dmax,
                a.shipaddress,
                a.idunit,
                a.paidtoday,
                a.balance,
                a.delivery_date as delivery_date_sales,
                a.idsales_quote,
                a.salesman_id,
                a.include_tax,
                a.shipaddress,
                a.total_dpp,
                b.namepayment,
                c.namecurr,
                d.firstname,
                d.lastname,
                f.namecustomer,
                f.nocustomer,
                f.address as address_customer,
                f.telephone as telephone_customer,
                f.handphone as handphone_customer,
                z.no_do,
                z.delivery_date,
                z.status as status_do,
                totalitem,
                total_qty_order,
                total_qty_kirim,
                ((total_qty_order - COALESCE(total_qty_kirim, 0))) as sisakirim,
                z.delivery_order_id,
                i.no_sales_quote as no_sales_order_quote,
                i.idsales as idsales_quote,
                i.date_quote as date_sales_quote,
                j.rate,
                k.job_order_id,
                k.status as statuswo";
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
        $query = "select distinct " . $this->selectField() . "
                    from " . $this->tableName()." z
                    join sales a ON z.idsales = a.idsales
                    left join payment b ON a.idpayment = b.idpayment
                    left join currency c ON a.idcurrency = c.idcurrency
                    left join employee d ON a.idemployee = d.idemployee
                    left join (select idsales,count(*) as totalitem
                        from salesitem
                        group by idsales) e ON a.idsales = e.idsales
                    left join customer f ON a.idcustomer = f.idcustomer
                    left join tax j ON a.idtax = j.idtax
                    left join(select
                            idsales,
                            sum(qty_kirim) as totalitemkirim
                        from salesitem
                        group by idsales) h ON a .idsales = h.idsales
                    left join (select no_sales_quote,idsales,date_quote
                        from sales ) i ON a.idsales_quote = i.idsales
                    LEFT JOIN job_order k ON k.idsales = a.idsales
                    LEFT JOIN sales_invoice l ON z.delivery_order_id = l.delivery_order_id  
                    left join(select
                        delivery_order_id,
                        sum(b.qty) as total_qty_order,
                        sum(a.qty_kirim) as total_qty_kirim
                    from deliver_order_item a
                    join salesitem b ON a.idsalesitem = b.idsalesitem
                    group by delivery_order_id) m ON z .delivery_order_id = m.delivery_order_id";

        return $query;
    }

    function whereQuery() {
        $wer = null;
        // if($this->input->post('option')=='delivery_order'){
        //     $wer .= ' and a.status > 2';
        // } else if($this->input->post('option')=='entry_wo'){
        //     $wer .= ' and k.idsales IS NULL';
        // }

        $sd = substr($this->input->post('startdate'),0,10);
        $nd = substr($this->input->post('enddate'),0,10);
        if($sd != null && $nd != null)
            $wer .= " AND z.delivery_date BETWEEN '$sd' AND '$nd'";

        return " z.status is not null and a.display is null $wer and a.id_sales_source is null and z.deleted = 0";
    }

    function orderBy() {
        return " z.delivery_order_id desc";
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

     function query_itemsales($idsales,$item_selector_sr=false,$token=null){
        
        if($item_selector_sr==true){
            // $token = $this->input->get('token');

            $wer = " and a.idsalesitem not in (select idsalesitem from sales_return_tmp where token = '$token')";
        } else {
            $wer = null;
        }

        $q = $this->db->query("select a.idsalesitem,a.idinventory,b.sku_no,a.idsales,a.qty,a.price,a.disc,a.total,a.measurement_id,a.ratetax,a.size,a.measurement_id,a.measurement_id_size,a.deleted
                                ,b.invno,b.nameinventory,c.short_desc,d.warehouse_code,e.short_desc as size_measurement,qty_kirim,sum(qty-qty_kirim) as qtysisakirim
                                from salesitem a
                                join inventory b ON a.idinventory = b.idinventory
                                left join productmeasurement c ON c.measurement_id = a.measurement_id
                                left join warehouse d ON d.warehouse_id = a.warehouse_id
                                left join productmeasurement e ON a.measurement_id_size = e.measurement_id
                                where idsales = $idsales $wer
                                group by a.deleted,a.idsalesitem,a.idinventory,a.idsales,a.qty,a.price,a.disc,a.total,a.measurement_id,a.qty_kirim,a.ratetax,a.size,a.measurement_id,a.measurement_id_size,b.invno,b.sku_no,b.nameinventory,c.short_desc,d.warehouse_code,a.size,size_measurement
                                order by a.idsalesitem desc");

        return $q->result_array();
    }

    function query_itemsales_do($delivery_order_id,$item_selector_sr=false,$token=null){
         if($item_selector_sr==true){
            // $token = $this->input->get('token');

            $wer = " and a.idsalesitem not in (select idsalesitem from sales_return_tmp where token = '$token')";
        } else {
            $wer = null;
        }

        $q = $this->db->query("select a.idsalesitem,a.idinventory,b.sku_no,a.idsales,a.qty,a.price,a.disc,a.total,a.measurement_id,a.ratetax,a.size,a.measurement_id,a.measurement_id_size,a.deleted
                                ,b.invno,b.nameinventory,c.short_desc,d.warehouse_code,e.short_desc as size_measurement,z.qty_kirim,sum(qty-z.qty_kirim) as qtysisakirim
                                from deliver_order_item z
                                join salesitem a ON a.idsalesitem = z.idsalesitem
                                join inventory b ON a.idinventory = b.idinventory
                                left join productmeasurement c ON c.measurement_id = a.measurement_id
                                left join warehouse d ON d.warehouse_id = a.warehouse_id
                                left join productmeasurement e ON a.measurement_id_size = e.measurement_id
                                where z.delivery_order_id = $delivery_order_id $wer
                                group by a.deleted,a.idsalesitem,a.idinventory,a.idsales,a.qty,a.price,a.disc,a.total,a.measurement_id,z.qty_kirim,a.ratetax,a.size,a.measurement_id,a.measurement_id_size,b.invno,b.sku_no,b.nameinventory,c.short_desc,d.warehouse_code,a.size,size_measurement
                                order by a.idsalesitem desc");

        return $q->result_array();
    }

    function cetak_so($idsales){
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
            // foreach ($this->query_itempurchase($r->idpurchase) as $ritem) {
            //     $detail[$i] = $ritem;
            //     $i++;
            // }

            $dtcetak['customer']['namecustomer'] = $r->namecustomer;
            $dtcetak['customer']['nocustomer'] = $r->nocustomer;
            $dtcetak['customer']['address'] = $r->address_customer;
            $dtcetak['customer']['telephone'] = $r->telephone_customer;
            $dtcetak['customer']['handphone'] = $r->handphone_customer;

            $dtcetak['detail'] = $this->query_itemsales($r->idsales);
            $dtcetak['detailtotal'] = number_format($r->subtotal);

            $dtcetak['no'] = $r->no_sales_order;


            // //get receivefrom,total,memo,tax
            $dtcetak['dp'] = $r->paidtoday;
            $dtcetak['freigthcost'] = $r->freight;
            // $dtcetak['receivefrom'] = $r->userin;
            $dtcetak['totaltax'] = $r->tax;
            $dtcetak['total'] = $r->totalamount;
            $dtcetak['terbilang'] = terbilang($r->totalamount);
            $dtcetak['totalowed'] = $r->balance;
            $dtcetak['memo'] = $r->comments;
            $dtcetak['datetrans'] = $r->date_sales;
            $dtcetak['total_dpp'] = $r->total_dpp;
            $dtcetak['dmax'] = $r->dmax;
            $dtcetak['ddays'] = $r->ddays;
            $dtcetak['eomddays'] = $r->eomddays;
            $dtcetak['daydisc'] = $r->daydisc;
            $dtcetak['shipaddress'] = $r->shipaddress;
            $dtcetak['delivery_date_sales'] = $r->delivery_date_sales;
            $dtcetak['payment_term'] = payment_term_sales($r->idpayment,$r->dmax,$r->ddays,$r->eomddays,$r->daydisc);

            // $dtcetak['receivedby'] = $r->userin;
            //get logo,address,namaunit
            $runit = $this->m_data->dataunit($r->idunit);
            $dtcetak['logo'] = $runit['logo'];
            $dtcetak['namaunit'] = $runit['namaunit'];
            $dtcetak['alamat'] = $runit['alamat'];
            $dtcetak['telp'] = $runit['telp'];
            $dtcetak['fax'] = $runit['fax'];

            $dtcetak['notes'] = array(
                $r->comments,
                'Pembayaran dengan Cek/Giro atau transfer ke Rek. BCA ac. 601.001.5888 an. PT. ALFA PRIMA SENTOSA',
                'Setelah disetujui mohon ditandatangani dan dikirim kembali via fax/email ke: sales.alfasteel@gmail.com',
            );

        }
        return $dtcetak;
    }


}

?>