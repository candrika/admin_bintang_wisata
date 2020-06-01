<?php

class m_so_deliveryorder extends CI_Model {

    function tableName() {
        return 'sales';
    }

    function pkField() {
        return 'idsales';
    }

    function searchField() {
        $field = "no_sales_order,namecustomer";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idsales,a.idpayment,a.idtax,a.idemployee,a.idjournal,a.idcustomer,a.date_sales,a.no_sales_order,a.subtotal,a.freight,a.tax,a.disc,a.totalamount,a.comments,a.userin,a.datein,a.status,a.idcurrency,c.namecurr,b.namepayment,d.firstname,d.lastname,e.totalitem,namecustomer,a.idcustomer,a.idunit,a.paidtoday,a.balance,g.rate,g.nametax";
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
                    left join tax g ON a.idtax = g.idtax";

        return $query;
    }

    function whereQuery() {
        return " a.type = 2 and a.display is null and a.noinvoice is null and (a.idsales not in (select idsales from delivery_order))";
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

}

?>