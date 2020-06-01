<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class report extends MY_Controller {

    public function index() {
        
    }

    function ar(){
        //account receivable - piutang
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');
        $customer_id = $this->input->get('customer_id');

        /*
            1 : 0 <= 30
            2 : 30 >= 60
            3 : 60 >= 90
            4 : >90
        */
        $aging = $this->input->get('aging');
        $wer_aging = null;
        if($aging==1){
            $wer_aging = "and (current_date::date - invoice_date::date) <= 30";
        } else if($aging==2){
            $wer_aging = "and ((current_date::date - invoice_date::date) between 31 and 60)";
        } else if($aging==3){
            $wer_aging = "and ((current_date::date - invoice_date::date) between 61 and 90)";
        } else if($aging==4){
            $wer_aging = "and (current_date::date - invoice_date::date) > 90";
        }

        $wer_period = null;
        if($startdate!=null && $enddate!=null){
            $wer_period = "and (invoice_date between '".$startdate."' and '".$enddate."')";
        }

        $wer_customer = null;
        if($customer_id!=null){
            $wer_customer = "and a.idcustomer = ".$customer_id."";
        }

        $sql = "select
                a .idsales,
                a .no_sales_order,
                a .idunit,
                a .subtotal,
                a .freight,
                a .date_sales,
                a .tax,
                a .disc,
                a .totalamount,
                a .paidtoday,
                a .balance,
                a .comments,
                a .noinvoice,
                a .ddays,
                a .no_faktur,
                a .eomddays,
                a .percentagedisc,
                a .daydisc,
                a .notes_si,
                a.idcustomer,
                b.nocustomer,
                b.namecustomer,
                a .idpayment,
                a .invoice_status,
                a .invoice_date,
                b.address as address_customer,
                b.telephone as telephone_customer,
                b.handphone as handphone_customer,
                (current_date::date - invoice_date::date) as aging	
            from
                sales a
            join customer b ON a .idcustomer = b.idcustomer
            WHERE
                TRUE
            AND a .idunit = ".$idunit."
            AND a .display is null
            and noinvoice is not null
            and(
                a .invoice_status = 1
                OR a .invoice_status = 4
            )
            $wer_aging
            $wer_period
            $wer_customer
            ORDER BY
                a .date_sales desc";

        $q = $this->db->query($sql);
        return $q->result_array();
        // echo '{success:true,numrow:' .$q->num_rows() . ',results:' . $q->num_rows() .',rows:' . json_encode($q->result_array()) . ' }';
    }

    function ar_outstanding(){
        //account receivable - piutang
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');
        $customer_id = $this->input->get('idcustomer');

        $wer_period = null;
        if($startdate!=null && $enddate!=null){
            $wer_period = "and (invoice_date between '".$startdate."' and '".$enddate."')";
        }

        $wer_customer = null;
        if($customer_id!=''){
            $wer_customer = "and a.idcustomer = ".$customer_id."";
        }

        $sql = "select
                    a .idsales,
                    a .no_sales_order,
                    a .idunit,
                    a .subtotal,
                    a .freight,
                    a .date_sales,
                    a .tax,
                    a .disc,
                    a .totalamount,
                    a .paidtoday,
                    a .balance,
                    a .comments,
                    a .noinvoice,                    
                    a .eomddays,
                    a .percentagedisc,	
                    a .notes_si,
                    a.idcustomer,
                    b.nocustomer,
                    b.namecustomer,
                    a .idpayment,
                    a .invoice_status,
                    a .invoice_date,
                    b.address as address_customer,
                    b.telephone as telephone_customer,
                    b.handphone as handphone_customer,
                    a .daydisc,
                    a .ddays,
                    (current_date::date - invoice_date::date) as aging	
                from
                    sales a
                join customer b ON a .idcustomer = b.idcustomer
                WHERE
                    TRUE
                AND a .idunit = ".$idunit."
                AND a .display is null
                and noinvoice is not null
                and ddays is not null
                and(
                    a .invoice_status = 1
                    OR a .invoice_status = 4
                )
                and (current_date::date - invoice_date::date) > ddays
                $wer_period
                $wer_customer
                ORDER BY
                    a .date_sales desc";

        $q = $this->db->query($sql);
        return $q->result_array();
        // echo '{success:true,numrow:' .$q->num_rows() . ',results:' . $q->num_rows() .',rows:' . json_encode($q->result_array()) . ' }';
    }

    function sales(){
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');
        $customer_id = $this->input->get('customer_id');

        $wer_period = null;
        if($startdate!=''){
            $wer_period = "and (date_sales between '".$startdate."' and '".$enddate."')";
        }
        $wer_customer = null;
        if($customer_id!=null){
            $wer_customer = "and a.idcustomer = ".$customer_id."";
        }
        // echo $wer_customer;

        $sql = "select
                    g .no_do,
                    g .delivery_date,
                    a .date_sales,
                    a .no_sales_order,
                    a .subtotal,
                    a .freight,
                    a .tax,
                    a .disc,
                    a .totalamount,
                    a .comments,
                    a .userin,
                    a .datein,
                    a .status,
                    c .namecurr,
                    b.namepayment,
                    d.firstname,
                    d.lastname,
                    e.totalitem,
                    namecustomer,
                    nocustomer,
                    a .noinvoice,
                    a .invoice_status,
                    f.address as address_customer,
                    f.telephone as telephone_customer,
                    f.handphone as handphone_customer,
                    a .paidtoday,
                    a .balance,
                    a .delivery_date,
                    totalitem,
                    COALESCE(totalitemkirim, 0) as totalitemkirim,
                    (
                        (
                            e.totalitem - COALESCE(totalitemkirim, 0)
                        )
                    ) as sisakirim,
                    i.no_sales_quote as no_sales_order_quote,
                    i.date_quote as date_sales_quote,
                    j.rate,
                    k .status as statuswo,
                    j.nametax,
                    case 
                    when a.status = 1 then 'Open'
                    when a.status = 2 then 'Canceled'
                    when a.status = 3 then 'Confirmed'
                    when a.status = 4 then 'Closed'
                    when a.status = 5 then 'Picking Up'
                    when a.status = 6 then 'Partial Delivering'
                    when a.status = 7 then 'Delivering'
                    when a.status = 8 then 'Invoiced'
                    end as statusname,
                    l.namaunit,
                    case
                    when include_tax = 1 then 'Kena Pajak'
                    else 'Tdk Kena Pajak'
                    end as kenapajak
                from
                    sales a
                left join payment b ON a .idpayment = b.idpayment
                left join currency c ON a .idcurrency = c .idcurrency
                left join employee d ON a .idemployee = d.idemployee
                left join(
                    select
                        idsales,
                        count(*) as totalitem
                    from
                        salesitem
                    group by
                        idsales
                ) e ON a .idsales = e.idsales
                left join customer f ON a .idcustomer = f.idcustomer
                left join delivery_order g ON a .idsales = g .idsales
                left join tax j ON a .idtax = j.idtax
                left join(
                    select
                        idsales,
                        sum(qty_kirim) as totalitemkirim
                    from
                        salesitem
                    group by
                        idsales
                ) h ON a .idsales = h.idsales
                left join(
                    select
                        no_sales_quote,
                        idsales,
                        date_quote
                    from
                        sales
                ) i ON a .idsales_quote = i.idsales
                LEFT JOIN job_order k ON k .idsales = a .idsales
                join unit l ON a.idunit = l.idunit  
                    WHERE TRUE AND a.idunit=".$idunit."  
                    $wer_period
                    $wer_customer
                    AND a.type = 2 and a.display is null  and a.status > 2  
                    ORDER BY a.datein desc";

        $q = $this->db->query($sql);
        echo '{success:true,numrow:' .$q->num_rows() . ',results:' . $q->num_rows() .',rows:' . json_encode($q->result_array()) . ' }';
    }

    function sales_order_detail(){
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');
        $customer_id = $this->input->get('idcustomer');
        $idemployee = $this->input->get('idemployee');
        $skuno = $this->input->get('skuno');
        $status = $this->input->get('status');

        $wer_period = null;
        if($startdate!=''){
            $wer_period = "and (date_sales between '".$startdate."' and '".$enddate."')";
        }
        
        $wer_customer = null;
        if($customer_id!=null){
            $wer_customer = "and b.idcustomer = ".$customer_id."";
        }
        
        $wer_employee = null;
        if($idemployee!=null){
            $wer_employee = "and b.salesman_id = ".$idemployee."";
        }

        $wer_inventory = null;
        if($skuno!=null){
            $wer_inventory = "and c.sku_no = '".$skuno."'";
        }

        $wer_sales = null;
        if($status!="null"){
            $wer_sales = "and b.status = ".$status."";
        }else{
            $wer_sales = "and b.status > 2";
        }
        
        $sql = "select 
                    b.no_sales_order, 
                    b.date_sales, 
                    c.sku_no,
                    b.noinvoice,
                    e.namecustomer,
                    case 
                    when b.status = 1 then 'Open'
                    when b.status = 2 then 'Canceled'
                    when b.status = 3 then 'Confirmed'
                    when b.status = 4 then 'Closed'
                    when b.status = 5 then 'Picking Up'
                    when b.status = 6 then 'Partial Delivering'
                    when b.status = 7 then 'Delivering'
                    when b.status = 8 then 'Invoiced'
                    end as status,
                    c.nameinventory,
                    d.short_desc as measurement,
                    a.qty as qty_order,
                    (a.qty * a.price * size * (100 - a.disc) / 100) as value_order,
                    a.qty_kirim,
                    (a.qty_kirim * a.price * size *(100 - a.disc) / 100) as value_kirim,
                    a.qty - a.qty_kirim as qty_sisa,
                    ((qty-qty_kirim) * a.price * size * (100 - a.disc) / 100) as value_sisa
                from salesitem a
                left join sales b on b.idsales = a.idsales
                left join inventory c on c.idinventory = a.idinventory
                left join productmeasurement d on d.measurement_id = a.measurement_id
                left join customer e on e.idcustomer = b.idcustomer
                where true 
                and b.idunit = $idunit
                $wer_period
                $wer_customer
                $wer_employee
                $wer_inventory
                $wer_sales
                and b.type = 2
                order by value_order desc"; 

                $q = $this->db->query($sql);
                return $q->result_array();
    }

    function sales_by_item(){
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');
        $invtype = $this->input->get('invtype');
        $brand = $this->input->get('brand');
        $whcode = $this->input->get('whcode');

        $wer_period = null;
        if($startdate!=''){
            $wer_period = "and (date_sales between '".$startdate."' and '".$enddate."')";
        }
        
        $wer_invtype = null;
        if($invtype!="null"){
            $wer_invtype = "and a.inventory_type = ".$invtype."";
        }

        $wer_brand = null;
        if($brand!="null"){
            $wer_brand = "and a.brand_id = ".$brand."";
        }

        $wer_whcode = null;
        if($whcode!="null"){
            $wer_whcode = "and e.warehouse_code = '".$whcode."'";
        }
        $sql = "select 
                    a.sku_no,
                    a.nameinventory,
                    sum(b.qty) as qty,
                    b.measurement,
                    sum(b.total) as sales
                from inventory a 
                join (
                    select sku_no, a.*, c.short_desc as measurement from salesitem a
                    join inventory b on a.idinventory = b.idinventory
                    join productmeasurement c on c.measurement_id = a.measurement_id
                ) b on a.sku_no = b.sku_no
                join sales c on c.idsales = b.idsales
                left join warehouse_stock d on d.idinventory = a.idinventory
                left join warehouse e on e.warehouse_id = d.warehouse_id
                where true 
                and c.idunit = $idunit
                and c.type = 2
                and c.status > 2
                $wer_period
                $wer_invtype
                $wer_brand
                $wer_whcode
                group by a.sku_no, a.nameinventory, b.measurement";

        $q = $this->db->query($sql);
        return $q->result_array();
    }

    function sales_by_customer(){
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');
        $custtype = $this->input->get('custtype');

        $wer_period = null;
        if($startdate!=''){
            $wer_period = "and (date_sales between '".$startdate."' and '".$enddate."')";
        }

        $wer_custtype = null;
        if($custtype!="null"){
            $wer_custtype = "and a.idcustomertype = ".$custtype."";
        }

        $sql = "select 
                    a.nocustomer,
                    a.namecustomer,
                    c.namecustype,
                    sum(b.subtotal) as subtotal,
                    sum(b.tax) as tax,
                    sum(totalamount) as total,
                    sum(b.paidtoday) as totalpaid,
                    sum(b.balance) as balance
                from customer a
                join sales b on b.idcustomer = a.idcustomer
                left join customertype c on c.idcustomertype = a.idcustomertype
                where true
                $wer_period
                and a.idunit = 12
                and a.deleted = 0
                and b.type = 2
                and b.status > 2
                $wer_custtype
                group by a.namecustomer, a.nocustomer, c.namecustype
                order by namecustomer";
        
        $q = $this->db->query($sql);
        return $q->result_array();
    }

    function sales_by_salesman(){
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');

        $wer_period = null;
        if($startdate!=''){
            $wer_period = "and (date_sales between '".$startdate."' and '".$enddate."')";
        }

        $sql = "select 
                    a.code,
                    a.firstname || ' ' || a.lastname as name,
                    sum(b.subtotal) as subtotal,
                    sum(
                        case b.include_tax
                            when 1 then (b.subtotal + b.disc) / 1.1
                            when 0 then 0
                        end
                    ) as dpp, 
                    sum(b.tax) as tax,
                    sum(totalamount) as total,
                    sum(b.paidtoday) as totalpaid,
                    sum(b.balance) as balance
                from employee a
                join sales b on b.salesman_id = a.idemployee
                where true
                $wer_period
                and a.idunit = $idunit
                and a.deleted = 0
                and b.type = 2
                and b.status > 2
                group by b.salesman_id, a.code, a.firstname, a.lastname
                order by a.firstname";
        
        $q = $this->db->query($sql);
        return $q->result_array();
    }

    function sales_book(){
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');

        $wer_period = null;
        if($startdate!=''){
            $wer_period = "and (date_sales between '".$startdate."' and '".$enddate."')";
        }

        $sql = "select 
                    c.sku_no,
                    c.nameinventory,
                    d.short_desc,
                    a.qty,
                    a.qty_kirim,
                    a.qty_return,
                    a.price
                from salesitem a
                join sales b on b.idsales = a.idsales
                join inventory c on c.idinventory = a.idinventory
                left join productmeasurement d on d.measurement_id = a.measurement_id
                where true
                and b.idunit = $idunit
                $wer_period
                and b.type = 2
                and b.status > 2";
        
        $q = $this->db->query($sql);
        return $q->result_array();
    }
    // function sales_by_item(){
    //     $idunit = $this->input->get('idunit');
    //     $startdate = $this->input->get('startdate');
    //     $enddate = $this->input->get('enddate');
    //     $customer_id = $this->input->get('customer_id');
    //     $sku_no = $this->input->get('sku_no');
    //     $salesman_id = $this->input->get('salesman_id');

    //     $wer_customer = null;
    //     if($customer_id!=null){
    //         $wer_customer = "and b.idcustomer = ".$customer_id."";
    //     }

    //     $wer_inventory = null;
    //     if($sku_no!=null){
    //         $wer_inventory = "and a.sku_no = ".$sku_no."";
    //     }

    //     $wer_salesman = null;
    //     if($salesman_id!=null){
    //         $wer_salesman = "and b.salesman_id = ".$salesman_id."";
    //     }

    //     $qinv = $this->db->query("select a.idinventory,a.invno,a.nameinventory,cost,a.idinventorycat,a.idunit,a.status,a.deleted,a.sku_no,brand_id,a.inventory_type
    //                                 from inventory a
    //                                 where TRUE
    //                                 and idinventory in(select idinventory from inventoryunit
	// 		                        where idunit = $idunit)
    //                                 $wer_inventory");

    //     $data = array();
    //     $i=0;
    //     foreach($qinv->result_array() as $r){
    //         $data[$i] = $r;

    //         $qtrans = $this->db->query("select a.qty,a.price,a.disc,a.total,a.ratetax,a.size,b.noinvoice,b.no_sales_order,c.short_desc as satuan,d.short_desc as satuan_ukuran,b.date_sales
    //                                     from salesitem a
    //                                     join sales b ON a.idsales = b.idsales
    //                                     join productmeasurement c ON a.measurement_id = c.measurement_id
    //                                     join productmeasurement d ON a.measurement_id_size = d.measurement_id
    //                                     where a.idinventory = ".$r['idinventory']." $wer_customer $wer_salesman");
    //         if($qtrans->num_rows()>0){
    //             $data[$i]['trans'] = $qtrans->result_array();
    //         } else {
    //             $data[$i]['trans'] = FALSE;
    //         }
            
    //         $i++;
    //     }
    //      echo '{success:true,totalitem:' .$qinv->num_rows() . ',rows:' . json_encode($data) . ' }';
    // }

    function sales_return(){
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');
        $customer_id = $this->input->get('customer_id');
        $idinventory = $this->input->get('idinventory');

        $wer_customer = null;
        if($customer_id!=null){
            $wer_customer = "and b.idcustomer = ".$customer_id."";
        }

        $wer_inventory = null;
        if($idinventory!=null){
            $wer_inventory = "and a.idinventory = ".$idinventory."";
        }

        $qinv = $this->db->query("select a.idinventory,a.invno,a.nameinventory,cost,a.idinventorycat,a.idunit,a.status,a.deleted,a.sku_no,brand_id,a.inventory_type,a.measurement_id_one,a.measurement_id_two,a.measurement_id_tre
                                    from inventory a
                                    where a.idinventory in (select idinventory 
                                                    from sales_return_item a
                                                    join sales_return b ON a.sales_return_id = b.sales_return_id
                                                    where b.idunit = $idunit $wer_customer
                                                )");

        $data = array();
        $i=0;
        foreach($qinv->result_array() as $r){
            $data[$i] = $r;

            $qtrans = $this->db->query("select a.qty_return,a.resend,a.notes,a.warehouse_id,a.qty_sent,c.warehouse_code
                                        from sales_return_item a
                                        join sales_return b ON a.sales_return_id = b.sales_return_id
                                        join warehouse c ON a.warehouse_id = c.warehouse_id
                                        where a.idinventory = ".$r['idinventory']."");
            if($qtrans->num_rows()>0){
                $data[$i]['trans'] = $qtrans->result_array();
            } else {
                $data[$i]['trans'] = FALSE;
            }
            
            $i++;
        }
        return $data;
        //  echo '{success:true,totalitem:' .$qinv->num_rows() . ',rows:' . json_encode($data) . ' }';
    }

    function payable(){
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');
        $idsupplier = $this->input->get('idsupplier');
        $jatuh_tempo = $this->input->get('jatuh_tempo');

        $wer_supplier = null;
        if($idsupplier!=null){
            $wer_supplier = "and a.idsupplier = ".$idsupplier."";
        }

        $wer_period = null;
        if($startdate!='' && $enddate!=''){
            $wer_period = "and (mulaihutang between '".$startdate."' and '".$enddate."')";
        }

        $wer_tempo = null;
        if(strtoupper($jatuh_tempo)=='YA'){
            $wer_tempo = "and (a.jatuhtempo::date<=current_date)";
        }

        $q = $this->db->query("select 
                                a.idsupplier,
                                a.jumlah,
                                a.sisahutang,
                                a.memo,
                                a.mulaihutang,
                                a.jatuhtempo,
                                b.namesupplier,
                                c.accname as accnamehutang,
                                c.accnumber as accnumberhutang,
                                d.accname as accnamekenahutang,
                                d.accnumber as accnumberkenahutang
                                from registrasihutang a
                                join supplier b ON a.idsupplier = b.idsupplier
                                join account c ON a.idacchutang = c.idaccount
                                join account d ON a.idacckenahutang = d.idaccount
                                where a.idunit = $idunit  $wer_period
                               $wer_supplier
                               $wer_tempo");
        // echo '{success:true,numrow:' .$q->num_rows() . ',results:' . $q->num_rows() .',rows:' . json_encode($q->result_array()) . ' }';
        return $q->result_array();
    }

    function payable_purchase(){
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');
        $idsupplier = $this->input->get('idsupplier');
        // $jatuh_tempo = $this->input->get('jatuh_tempo');

        $wer_supplier = null;
        if($idsupplier!=null){
            $wer_supplier = "and a.idsupplier = ".$idsupplier."";
        }

        $wer_period = null;
        if($startdate!='' && $enddate!=''){
            $wer_period = "and (a.date between '".$startdate."' and '".$enddate."')";
        }

        // $wer_tempo = null;
        // if(strtoupper($jatuh_tempo)=='YA'){
        //     $wer_tempo = "and (a.jatuhtempo::date<=current_date)";
        // }

        $sql = "select
                        a . date,
                        a .requestdate,
                        a .tax,
                        a .totalamount,
                        a .memo,
                        a .datein,
                        a .idunit,
                        a .idcurrency,
                        x .subtotal,
                        x .dpp as total_dpp,
                        x .tax,
                        x .totalamount,
                        a .nopurchase,
                        a .idsupplier,
                        c .nametax,
                        c .rate,
                        e.namesupplier,
                        a .discount as disc,
                        a .notes_receipt,
                        a .delivereddate,
                        f.firstname,
                        f.lastname,
                        x .balance,
                        x .no_invoice,
                        x .paidtoday,
                        totalorder,
                        totalreceived,
                        sisa,
                        b. name as idpurchasestatusname,
                        CASE
                            when a.idpayment = 1 then 'Cash in Advance'
                            when a.idpayment = 2 then 'Cash in Delivery'
                            when a.idpayment = 3 then 'NET d days'
                            when a.idpayment = 4 then 'NET EOM d days'
                            when a.idpayment = 5 then 'Discount'
                            ELSE 'Undefined'
                        END as payment_term
                        from
                        goods_receipt x
                    join purchase a ON a.idpurchase = x.idpurchase
                    join purchasestatus b ON a .idpurchasestatus = b.idpurchasestatus
                    left join tax c ON a .idtax = c .idtax
                    left join payment d ON a .idpayment = d.idpayment
                    left join supplier e ON a .idsupplier = e.idsupplier
                    left join employee f ON a .receivedby_id = f.idemployee
                    join(
                        select
                            idpurchase,
                            sum(qty) as totalorder,
                            sum(qty_received) as totalreceived,
                            (sum(qty_received) - sum(qty)) as sisa
                        from
                            purchaseitem
                        group by
                            idpurchase
                    ) g ON a .idpurchase = g .idpurchase
                    left join(
                        select
                            nopurchase,
                            idpurchase,
                            date
                        from
                            purchase
                    ) h ON a .idpurchase_req = h.idpurchase
                    WHERE
                        TRUE
                    AND idpurchasetype = 2
                    and a .deleted = 0
                    $wer_supplier
                    and a.idunit = $idunit
                    $wer_period
                    and(
                        x .status_inv = 1
                       OR x .status_inv = 4
                    )
                    ORDER BY
                        a .datein desc";

        $q = $this->db->query($sql);
        return $q->result_array();

        // echo '{success:true,numrow:' .$q->num_rows() . ',results:' . $q->num_rows() .',rows:' . json_encode($q->result_array()) . ' }';
    }

    function receivable(){
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');
        $idcustomer = $this->input->get('idcustomer');

        $wer_customer = null;
        if($idcustomer!=null){
            $wer_customer = "and a.idcustomer = ".$idcustomer."";
        }

        $wer_period = null;
        if($startdate!='' && $enddate!=''){
            $wer_period = "and (a.tglpiutang between '".$startdate."' and '".$enddate."')";
        }

        $sql = "select 
                    a.description,
                    b.accname as accnamepiutang,
                    c.accname as accname_terimapiutang,
                    a.jumlah,
                    a.sisapiutang,
                    a.tglpiutang,
                    d.namecustomer
                from registrasipiutang a
                join account b ON a.idaccount = b.idaccount
                join account c ON a.idaccountlink = c.idaccount
                join customer d ON a.idcustomer = d.idcustomer
                where true and a.display is null and a.idunit = $idunit $wer_customer
                $wer_period";
        
        $q = $this->db->query($sql);
        // echo '{success:true,numrow:' .$q->num_rows() . ',results:' . $q->num_rows() .',rows:' . json_encode($q->result_array()) . ' }';
        return $q->result_array();
    }

    function receivable_sales(){
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');
        $idcustomer = $this->input->get('idcustomer');
        $jatuh_tempo = $this->input->get('jatuh_tempo');

        $wer_customer = null;
        if($idcustomer!=null){
            $wer_customer = "and a.idcustomer = ".$idcustomer."";
        }

        $wer_period = null;
        if($startdate!='' && $enddate!=''){
            $wer_period = "and (a.invoice_date between '".$startdate."' and '".$enddate."')";
        }

        $sql = "select
                    a .no_sales_order,
                    a .subtotal,
                    a .freight,
                    a .date_sales,
                    a .tax,
                    a .disc,
                    a .totalamount,
                    a .paidtoday,
                    a .balance,
                    a .comments,
                    a .noinvoice,	
                    a .notes_si,
                    a .total_dpp,
                    b.nocustomer,
                    b.namecustomer,
                    a .invoice_date,
                    b.address as address_customer,
                    b.telephone as telephone_customer,
                    b.handphone as handphone_customer,
                    a.idpayment,
                    CASE
                        when a.idpayment = 1 then 'Cash in Advance'
                        when a.idpayment = 2 then 'Cash in Delivery'
                        when a.idpayment = 3 then 'NET d days'
                        when a.idpayment = 4 then 'NET EOM d days'
                        when a.idpayment = 5 then 'Discount'
                        ELSE 'Undefined'
                    END as payment_term,
                    a .ddays,
                    a .eomddays,
                    a .percentagedisc,
                    a .daydisc,
                    CASE	
                        when a.invoice_status = 1 then 'Unpaid'
                        when a.invoice_status = 2 then 'Paid'
                        when a.invoice_status = 3 then 'Overdue'
                        when a.invoice_status = 4 then 'Partially Paid'
                        when a.invoice_status = 5 then 'Canceled'
                    ELSE 'Undefined'
                    END as invoice_status
                from
                    sales a
                join customer b ON a .idcustomer = b.idcustomer
                WHERE
                    TRUE
                AND a .idunit = $idunit
                AND a .display is null
                and noinvoice is not null
                and(
                    a .invoice_status = 1
                    OR a .invoice_status = 4
                )
                $wer_period
                $wer_customer
                ORDER BY
                    a .date_sales desc";

        $q = $this->db->query($sql);
        $data = array();
        $i=0;
        foreach($q->result_array() as $r){
            $data[$i] = $r;
            // if($r[''])
            $i++;
        }
        // echo '{success:true,numrow:' .$q->num_rows() . ',results:' . $q->num_rows() .',rows:' . json_encode($q->result_array()) . ' }';
        return $q->result_array();
    }

    function inventory(){
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate') ?: date('Y-m-d', strtotime('2017-01-01'));
        $enddate = $this->input->get('enddate') ?: date('Y-m-d');
        $brand = $this->input->get('brand');
        $invcat = $this->input->get('invcat');
        $invtype = $this->input->get('invtype');
        $idinventory = $this->input->get('idinventory');
        
        $wer_brand = null;
        if($brand!="null"){
            $wer_brand = "and a.brand_id = ".$brand."";
        }
        
        $wer_invcat = null;
        if($invcat!="null"){
            $wer_invcat = "and a.idinventorycat = ".$invcat."";
        }

        $wer_invtype = null;
        if($invtype!="null"){
            $wer_invtype = "and a.inventory_type = ".$invtype."";
        }

        $wer_idinventory = null;
        if($idinventory!=null){
            $wer_idinventory = "and a.idinventory = ".$idinventory."";
        }

        $sql = "select 
                a.idinventory,
                a.invno,
                a.sku_no,
                a.nameinventory,
                g.nameinventory as nameinventory_parent,
                g.invno as invno_parent,
                g.sku_no as sku_no_parent,            
                brand_name,
                a.cost,
                stock,
                c.short_desc as satuan,
                case 
                    when e.bahan_coil_id is not null then round((stock/ e.berat)::numeric, 2)
                    when e.bahan_coil_id is null and a.inventory_type = 2 then 0
                    else null
                end as stock_kedua,
                case 
                    when a.inventory_type = 2 then d.short_desc 
                    else null
                end as satuan_kedua
                from inventoryx a
                left join inventory g ON a.idinventory_parent = g.idinventory
                inner join (
                    select 
                    a.idinventory,sum(stock) as stock
                    from warehouse_stock a
                    left join inventory b on b.idinventory = a.idinventory
                    group by a.idinventory
                ) b on a.idinventory = b.idinventory
                left join productmeasurement c on c.measurement_id = a.measurement_id_one
                left join productmeasurement d on d.measurement_id = a.measurement_id_two
                left join bahan_coil e on e.bahan_coil_id = a.bahan_coil_id
                left join brand f on f.brand_id = a.brand_id
                and a.idunit = $idunit
                $wer_brand
                $wer_invcat
                $wer_invtype
                $wer_idinventory
                order by a.idinventory";
                // echo $sql; die;
        $q = $this->db->query($sql);
        return $q->result_array();
    }

    function inventoryStockCard(){
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate') ?: date('Y-m-d', strtotime('2017-01-01'));
        $enddate = $this->input->get('enddate') ?: date('Y-m-d');
        $brand = $this->input->get('brand');
        $invcat = $this->input->get('invcat');
        $invtype = $this->input->get('invtype');
        $skuno = $this->input->get('skuno');
        
        $wer_period = null;
        if($startdate!=null && $enddate!=null){
            $wer_period = "and (datein between '".$startdate."' and '".$enddate."')";
        }
        
        $wer_brand = null;
        if($brand!="null"){
            $wer_brand = "and a.brand_id = ".$brand."";
        }
        
        $wer_invcat = null;
        if($invcat!="null"){
            $wer_invcat = "and a.idinventorycat = ".$invcat."";
        }

        $wer_invtype = null;
        if($invtype!="null"){
            $wer_invtype = "and a.inventory_type = ".$invtype."";
        }

        $wer_skuno = null;
        if($skuno!=null){
            $wer_skuno = "and a.sku_no = '".$skuno."'";
        }

        $sql = "select 
                    a.invno,
                    a.sku_no,
                    a.nameinventory,
                    c.short_desc as satuan,
                    b.old_qty,
                    case
                        when type_adjustment in (1,2,3,4,6,9,10,12) then b.qty_transaction
                        else null
                    end as in,
                    case
                        when type_adjustment in (5,7,8,11,14,15) then b.qty_transaction
                        else null
                    end as out,
                    b.balance,
                    b.datein,
                    case
                        when type_adjustment = 1 then 'Order (+)'
                        when type_adjustment = 2 then 'Stock In By PO (+)'
                        when type_adjustment = 3 then 'Stock In By Cash  (+)'
                        when type_adjustment = 4 then 'Stock Opname Plus (+)'
                        when type_adjustment = 5 then 'Stock Opname Minus (-)'
                        when type_adjustment = 6 then 'Sales Return (+)'
                        when type_adjustment = 7 then 'Purchase Return (-)'
                        when type_adjustment = 8 then 'Sales (-)'
                        when type_adjustment = 9 then 'Opening Balance (+)'
                        when type_adjustment = 10 then 'Stock In By Transfer (+)'
                        when type_adjustment = 11 then 'Stock Out By Transfer (-)'
                        when type_adjustment = 12 then 'Stock In By Received Material From Production (+)'
                        when type_adjustment = 13 then 'Stock In By Received Return PO (+)'
                        when type_adjustment = 14 then 'Delivery Sales Return (-)'
                        when type_adjustment = 15 then 'Stock Out From Production (-)'
                    end as type_adjustment,
                    b.notes
                from inventory a 
                join (
                    select * from stock_history 
                    where true 
                    $wer_period
                )b on b.idinventory = a.idinventory
                left join productmeasurement c on c.measurement_id = a.measurement_id_one
                where true
                and a.idunit = $idunit
                $wer_brand
                $wer_invcat
                $wer_invtype
                $wer_skuno
                and a.deleted = 0
                and a.status = 1";

        $q = $this->db->query($sql);
        return $q->result_array();
    }
}
?>