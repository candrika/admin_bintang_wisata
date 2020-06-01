<?php

class m_salesquotation extends CI_Model {

    function tableName() {
        return 'sales';
    }

    function pkField() {
        return 'idsales';
    }

    function searchField() {
        $field = "no_sales_quote";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idsales,h.idsales_quote,a.idpayment,a.idemployee,a.idjournal,a.idcustomer,a.date_quote,a.no_sales_quote,a.subtotal,a.freight,a.tax,a.disc,a.totalamount,a.comments,a.userin,a.datein,a.status,a.idcurrency,c.namecurr,b.namepayment,d.firstname,d.lastname,e.totalitem,namecustomer,a.idcustomer,a.idunit,a.idtax,g.rate,comments,a.expireddate,f.nocustomer,f.address as address_customer,f.telephone as telephone_customer,f.handphone as handphone_customer";
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
                    left join payment b ON a.idpayment = b.idpayment
                    left join currency c ON a.idcurrency = c.idcurrency
                    left join employee d ON a.idemployee = d.idemployee
                    left join (select idsales,count(*) as totalitem
                            from salesitem
                            group by idsales) e ON a.idsales = e.idsales
                    left join customer f ON a.idcustomer = f.idcustomer
                    join tax g ON a.idtax = g.idtax
                    left join (select idsales_quote from sales where type = 2) h ON a.idsales = h.idsales_quote";

        return $query;
    }

    function whereQuery() {
        $wer = null;
        if($this->input->post('option')=='not_in_salesorder'){
            // $wer = " and a.status = 2 and a.idsales not in (select idsales_quote from sales where type = 2) ";
            $wer = " and a.status = 2 ";
        }
        $sd = substr($this->input->post('startdate'),0,10);
        $nd = substr($this->input->post('enddate'),0,10);
        if($sd != null && $nd != null)
            $wer .= " AND a.date_quote BETWEEN '$sd' AND '$nd'";

        return " a.type = 1 and a.display is null $wer
         group by a.idsales,h.idsales_quote,a.idpayment,a.idemployee,a.idjournal,a.idcustomer,a.date_quote,a.no_sales_quote,a.subtotal,a.freight,a.tax,a.disc,a.totalamount,a.comments,a.userin,a.datein,a.status,a.idcurrency,c.namecurr,b.namepayment,d.firstname,d.lastname,namecustomer,a.idcustomer,a.idunit,a.idtaxcomments,a.expireddate,f.nocustomer,f.address,f.telephone,f.handphone,e.totalitem,a.idtax,g.rate";
    }

    function orderBy() {
        return " a.datein desc";
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
            'expireddate' => $this->input->post('expireddate'),
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

        $q = $this->db->query("select a.idsalesitem,a.idinventory,b.sku_no,a.idsales,a.qty,a.price,a.disc,a.total,a.measurement_id,a.ratetax,a.size,a.measurement_id,a.measurement_id_size
                                ,b.invno,b.nameinventory,c.short_desc,d.warehouse_code,e.short_desc as size_measurement,qty_kirim,sum(qty-qty_kirim) as qtysisakirim
                                from salesitem a
                                join inventory b ON a.idinventory = b.idinventory
                                left join productmeasurement c ON c.measurement_id = a.measurement_id
                                left join warehouse d ON d.warehouse_id = a.warehouse_id
                                left join productmeasurement e ON a.measurement_id_size = e.measurement_id
                                where idsales = $idsales $wer
                                group by a.idsalesitem,a.idinventory,a.idsales,a.qty,a.price,a.disc,a.total,a.measurement_id,a.qty_kirim,a.ratetax,a.size,a.measurement_id,a.measurement_id_size,b.invno,b.sku_no,b.nameinventory,c.short_desc,d.warehouse_code,a.size,size_measurement");

        return $q->result_array();
    }
    
    function cetak_quote($idsales){
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

            $dtcetak['no'] = $r->no_sales_quote;
            $dtcetak['date_quote'] = $r->date_quote;
            $dtcetak['expired_date'] = $r->expireddate ? $r->expireddate : '-';

            // //get receivefrom,total,memo,tax
            // $dtcetak['receivefrom'] = $r->userin;
            $dtcetak['totaltax'] = $r->tax;
            $dtcetak['total'] = $r->totalamount;
            $dtcetak['terbilang'] = terbilang($r->totalamount);
            $dtcetak['memo'] = $r->comments;

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