<?php

class m_deliveryordergrid extends CI_Model {

    function tableName() {
        return 'delivery_order';
    }

    function pkField() {
        return 'delivery_order_id';
    }

    function searchField() {
        $field = "no_sales_order";
        return explode(",", $field);
    }

    function selectField() {
        return "a.delivery_order_id,no_do,a.delivery_date,a.idunit,a.date_created,a.idsales,a.remarks,a.userin,a.status,b.totalamount,b.tax,b.disc,b.freight,b.paidtoday,b.balance,b.date_sales,b.no_sales_order,c.namecustomer,b.noinvoice,qtyorder,qtykirim, c.address as address_customer, c.telephone as telephone_customer, c.handphone as handphone_customer,nocustomer,b.no_faktur,ship_address,vehicle_number,driver_name,a.notes";
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
                    left join sales b ON a.idsales = b.idsales
                    join customer c ON b.idcustomer = c.idcustomer
                    left join (select idsales,sum(qty) as qtyorder,sum(qty_kirim) as qtykirim
                                from salesitem
                                group by idsales) d ON a.idsales = d.idsales";

        return $query;
    }

    function whereQuery() {
        return " a.deleted = 0";
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
            'acctaxpaid' => $this->input->post('idaccpaid')
        );
        return $data;
    }

    function cetak_do($delivery_order_id){

        $dtcetak = array();

        $sql = $this->query();
        $sql.= " WHERE a.delivery_order_id=$delivery_order_id";
        // echo $sql;
        $q = $this->db->query($sql);
        if($q->num_rows()>0)
        {
            $r = $q->row();
            //detail pembayaran
            $i=0;
            $total=0;
            
            $dtcetak['header'] = $q->result_array()[0];

            // $dtcetak['customer']['namecustomer'] = $r->namecustomer;
            // $dtcetak['customer']['nocustomer'] = $r->nocustomer;
            // $dtcetak['customer']['address'] = $r->address_customer;
            // $dtcetak['customer']['telephone'] = $r->telephone_customer;
            // $dtcetak['customer']['handphone'] = $r->handphone_customer;

            $this->load->model('sales/m_salesorder');
            $dtcetak['detail'] = $this->m_salesorder->query_itemsales_do($delivery_order_id);
            $dtcetak['detailtotal'] = 0;

            $dtcetak['no'] = $r->no_sales_order;
            $dtcetak['no_do'] = $r->no_do;
            $dtcetak['delivery_date'] = $r->delivery_date;
            $dtcetak['no_faktur'] = $r->no_faktur ?: ' - ';


            // //get receivefrom,total,memo,tax
            $dtcetak['dp'] = $r->paidtoday;
            $dtcetak['freigthcost'] = $r->freight;
            // $dtcetak['receivefrom'] = $r->userin;
            $dtcetak['totaltax'] = $r->tax;
            $dtcetak['total'] = $r->totalamount;
            $dtcetak['terbilang'] = terbilang($r->totalamount);
            $dtcetak['totalowed'] = $r->balance;
            $dtcetak['memo'] = $r->remarks;
            $dtcetak['datetrans'] = $r->delivery_date;
            $dtcetak['vehicle_number'] = $r->vehicle_number;
            $dtcetak['driver_name'] = $r->driver_name;

            // $dtcetak['receivedby'] = $r->userin;
            //get logo,address,namaunit
            $runit = $this->m_data->dataunit($r->idunit);
            $dtcetak['logo'] = $runit['logo'];
            $dtcetak['namaunit'] = $runit['namaunit'];
            $dtcetak['alamat'] = $runit['alamat'];
            $dtcetak['telp'] = $runit['telp'];
            $dtcetak['fax'] = $runit['fax'];

            $driver_name = $r->driver_name?: "-";
            $vehicle_number = $r->vehicle_number?: "-";

            $dtcetak['notes'] = array(
                $r->notes,
                'No SO #'.$r->no_sales_order,
                'Alamat Pengiriman: '.$dtcetak['header']['ship_address'],
                'No Kendaraan: '.$vehicle_number,
                'Supir: '. $driver_name,
                'Barang yang sudah diterima tidak dapat ditukar atau dikembalikan'
            );
        }
        return $dtcetak;

    }

}

?>