<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Setup extends MY_Controller {

    function index() {
        
    }

    function getlastperiode() {
        $msg = null;
        $id = $this->input->post('idunit');
        $q = $this->db->get_where('unit', array('idunit' => $id))->row();

        $tgl = $q->curfinanceyear . '-' . $q->conversionmonth;
        $prevmonth = date("Y-m", mktime(0, 0, 0, date("m", strtotime($tgl)) - 1, 1, date("Y", strtotime($tgl))));

        $prevmonthArr = explode("-", $prevmonth);
        $num = cal_days_in_month(CAL_GREGORIAN, $prevmonthArr[1], $prevmonthArr[0]);

        $lastperiode = explode("-", $prevmonth);

        //cek udah input saldo awal apa belum
        $qcek = $this->db->get_where('clossing', array('idunit' => $id, 'year' => $lastperiode[0], 'month' => $lastperiode[1]));
        if ($qcek->num_rows() > 0) {
            $udahinput = true;
            $msg = 'Anda sudah melakukan input saldo awal akun sebelumnya. Jika diteruskan saldo awal akun sebelumnya akan terhapus dan diganti dengan saldo awal akun yang baru.';
        } else {
            $udahinput = false;
        }
        echo json_encode(array('success' => true, 'udahinput' => $udahinput, 'msg' => $msg, 'date' => $num . ' ' . ambilBulan($lastperiode[1]) . ' ' . $lastperiode[0], 'date2' => $lastperiode[0] . '-' . $lastperiode[1] . '-' . $num));
    }

    function recordOpeningBalance() {

        $this->db->trans_begin();

        $datagrid = json_decode($this->input->post('datagrid'));
        $prevmonth = $this->input->post('prevmonth');
        $prevmonthArr = explode("-", $prevmonth);

        $totalsaldo = 0;

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 1, //umum
            'nojournal' => '001',
//                    name character varying(225),
            'datejournal' => $prevmonth,
            'memo' => 'Saldo Awal',
            'totaldebit' => $this->input->post('pembayaranPurchase'),
            'totalcredit' => $this->input->post('pembayaranPurchase'),
//                    'totaltax' double precision,
//                    isrecuring boolean,
            'year' => $prevmonthArr[0],
            'month' => $prevmonthArr[1],
//                    display integer,
            'userin' => $this->session->userdata('username'),
            'usermod' => $this->session->userdata('username'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'idunit' => $this->input->post('idunit'),
            // 'idcurrency' => $this->input->post('idcurrency')
        );

        $this->db->insert('journal', $d);


        foreach ($datagrid as $key => $value) {
            $qacc = $this->db->get_where('account', array('idaccount' => $value->idaccount))->row();
            // $d = array(
            //     'idaccounttype' => $qacc->idaccounttype,
            //     'idaccount' => $qacc->idaccount,
            //     'idclassificationcf' => $qacc->idclassificationcf,
            //     'idlinked' => $qacc->idlinked,
            //     'idparent' => $qacc->idparent,
            //     'accnumber' => $qacc->accnumber,
            //     'accname' => $qacc->accname,
            //     'balance' => $value->balance,
            //     'display' => $qacc->display,
            //     'description' => $qacc->description,
            //     'userin' => $this->session->userdata('username'),
            //     'usermod' => $this->session->userdata('username'),
            //     'datein' => date('Y-m-d H:m:s'),
            //     'datemod' => date('Y-m-d H:m:s'),
            //     'active' => $qacc->active,
            //     'credit' => $value->credit,
            //     'debit' => $value->debit,
            //     'idunit' => $qacc->idunit,
            //     'dateclose' => $prevmonth,
            //     'month' => $prevmonthArr[1],
            //     'year' => $prevmonthArr[0]
            // );

            if($qacc->idaccounttype==1 || $qacc->idaccounttype==4 || $qacc->idaccounttype==19 || $qacc->idaccounttype==20 || $qacc->idaccounttype==2 || $qacc->idaccounttype==3)
            {
                // kas, bank, piutang, persediaan, aktiva tetap bersaldo debit
                $log['debit'] =$value->balance;
                $log['credit'] = 0;
                $totalsaldo+=$value->balance;
            } else if($qacc->idaccounttype==9 || $qacc->idaccounttype==18 || $qacc->idaccounttype==10)
            {
                //Akun-akun kelompok kewajiban (utang) bersaldo kredit.
                $log['credit'] =$value->balance;
                $log['debit'] = 0;
                $totalsaldo-=$value->balance;
            } else if($qacc->idaccounttype==11 || $qacc->idaccounttype==21)
            {
                //Akun kelompok ekuitas pemilik (modal, laba ditahan) bersaldo kredit..
                $log['credit'] =$value->balance;
                $log['debit'] = 0;
                $totalsaldo-=$value->balance;
            } else if($qacc->idaccounttype==12 || $qacc->idaccounttype==16)
            {
                //Akun pendapatan bersaldo kredit.
                $log['credit'] =$value->balance;
                $log['debit'] = 0;
                $totalsaldo-=$value->balance;
            } else
            if($qacc->idaccounttype==14 || $qacc->idaccounttype==15 || $qacc->idaccounttype==9 || $qacc->idaccounttype==10)
            {
                //AAkun biaya bersaldo debit.
                $log['debit'] =$value->balance;
                $log['credit'] = 0;
                $totalsaldo+=$value->balance;
            } else {
                $log['debit'] = 0;
                $log['credit'] = 0;
            }

            $this->db->where('idunit', $value->idunit);
            $this->db->where('idaccount', $qacc->idaccount);
            $this->db->update('account', array('balance' => $value->balance));

            // $log = array(
            //         'credit'=>$value->credit,
            //         'debit'=>$value->debit
            //     );
            //cek dulu
            // "idaccount", "tanggal", "idjournal", "userid", "idunit"
            $arrWer = array(
                    'idunit'=>$value->idunit,
                    'idaccount'=>$value->idaccount,
                    'tanggal'=>$prevmonth,
                    'userid'=>$this->session->userdata('userid')
                );
            $qcek = $this->db->get_where('accountlog',$arrWer);
            $log['idaccount'] = $value->idaccount;
            $log['tanggal'] = $prevmonth;
            $log['datein'] = date('Y-m-d H:m:s');
            $log['userid'] = $this->session->userdata('userid');
            $log['idunit'] =$value->idunit;
            if($qcek->num_rows()>0)
            {
                $this->db->where($arrWer);
                $this->db->update('accountlog',$log);
            } else {
                $log['idjournal'] = $qseq->id;
                $this->db->insert('accountlog',$log);
            }
           
            

//             $wer = array('idunit' => $qacc->idunit, 'year' => $prevmonthArr[0], 'month' => $prevmonthArr[1], 'idaccount' => $qacc->idaccount);
//             $qcek = $this->db->get_where('clossing', $wer);
//             if ($qcek->num_rows() > 0) {
//                 $this->db->where($wer);
//                 $this->db->update('clossing', $d);
//             } else {
//                 $this->db->insert('clossing', $d);
//             }

// //            echo $this->db->last_query();
//             $this->db->where('idunit', $value->idunit);
//             $this->db->where('idaccount', $qacc->idaccount);
//             $this->db->update('account', array('balance' => $value->balance));

//            exit;
//            $qacc->free_result();
        }

        $this->db->where(array('idjournal'=>$qseq->id,'idunit'=>$this->input->post('idunit')));
        $this->db->update('journal',array('totaldebit'=>$totalsaldo,'totalcredit'=>$totalsaldo));   

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Input saldo awal gagal');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Input saldo awal sukses');
        }

        echo json_encode($json);
    }

    function tes() {
        $year = !empty($_GET['year']) ? $_GET['year'] : date('Y');
        $month = !empty($_GET['month']) ? $_GET['month'] : date('m');
        $previous = date("Y/m", strtotime($year . "-" . $month . "-01 -1 months"));
        $next = date("Y/m", strtotime($year . "-" . $month . "-01 +1 months"));
        echo $next;
    }

    function resetdata($idunit)
    {
        $this->db->trans_begin();

        
        $this->deleteUnitProses($idunit);

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'hapus data gagal');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'hapus data berhasil');
        }

        $this->db->where('idunit',$idunit);
        $this->db->update('account',array('balance'=>0));
        
            print_r($json);
    }

    function deleteUnit()
    {
        $idmenu = $this->input->post('idmenu');
        if($idmenu!='')
        {
            $retAkses = $this->cekAksesUser($idmenu,'delete');
            if(!$retAkses['success'])
            {
                echo json_encode($retAkses);
                exit;
            }
        }
        
        $this->db->trans_begin();

        $postdata = json_decode($this->input->post('postdata'));
        foreach ($postdata as $id) {
            $this->deleteUnitProses($id);
            $this->db->where('idunit',$id);
            $this->db->delete('account');
            $this->db->where('idunit',$id);
            $this->db->delete('userunit');
            $this->db->where('idunit',$id);
            $this->db->delete('employee');
            $this->db->where('idunit',$id);
            $this->db->delete('employeetype');
            $this->db->where('idunit',$id);
            $this->db->delete('linkedaccunit');
            $this->db->where('idunitbak',$id);
            $this->db->delete('sys_user');
            $this->db->where('idunit',$id);
            $this->db->delete('siswa');
            $this->db->where('idunit',$id);
            $this->db->delete('asuransiunit');
            $this->db->where('idunit',$id);
            $this->db->delete('taxlinkunit');

            $q = $this->db->get_where('inventoryunit',array('idunit'=>$id));
            foreach ($q->result() as $r) {
                $arrWer = array(
                        'idinventory'=>$r->idinventory,
                        'idunit'=>$id
                    );
                $this->db->where('idunit',$id);
                $this->db->delete('inventorydeprecitem');

                $this->db->where('idunit',$id);
                $this->db->delete('inventory');
            }

            $this->db->where('idunit',$id);
            $this->db->delete('inventorydeprec');

            $this->db->where('idunit',$id);
            $this->db->delete('unit');
        }

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'hapus data gagal');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'hapus data berhasil');
        }
        echo json_encode($json);
    }

    function deleteUnitProses($idunit)
    {
        $this->db->where('idunit',$idunit);
        $this->db->delete('clossing');

        $q = $this->db->get_where('account',array('idunit'=>$idunit));
        // echo $this->db->last_query();
        foreach ($q->result() as $r) {
            $this->db->where('idaccount',$r->idaccount);
            $this->db->delete('accounthistory');
        }

        //asuransi employee
        $q = $this->db->get_where('employee',array('idunit'=>$idunit));
        foreach ($q->result() as $r) {
            $this->db->where('idemployee',$r->idemployee);
            $this->db->delete('asuransiemp');

            $this->db->where('idemployee',$r->idemployee);
            $this->db->delete('asuransipayhistory');
        }
        //asuransi employee

        // $this->db->where('idunit',$idunit);
        // $this->db->delete('disbursment');

        //potonganhistory
        $q = $this->db->get_where('employee',array('idunit'=>$idunit));
        foreach ($q->result() as $r) {
            $this->db->where('idemployee',$r->idemployee);
            $this->db->delete('potonganhistory');
        }
        //potonganhistory

        //prosesgaji & tunjangan
        $q = $this->db->get_where('employee',array('idunit'=>$idunit));
        foreach ($q->result() as $r) {
            $this->db->where('idemployee',$r->idemployee);
            $this->db->delete('prosesgaji');

            $this->db->where('idemployee',$r->idemployee);
            $this->db->delete('prosesgaji_tmp');   

             $q = $this->db->get_where('tunjangan',array('idemployee'=>$r->idemployee));
            foreach ($q->result() as $r) {
                $this->db->where('idtunjangan',$r->idtunjangan);
                $this->db->delete('tunjanganhistory');
            }         
        }
        //prosesgaji

        $q = $this->db->get_where('purchase',array('idunit'=>$idunit));
        foreach ($q->result() as $r) {
            $this->db->where('idpurchase',$r->idpurchase);
            $this->db->delete('purchaseitem');

            $this->db->where('idpurchase',$r->idpurchase);
            $this->db->delete('disbursment');
            
        }
        $this->db->where('idunit',$idunit);
        $this->db->delete('purchase');

        $q = $this->db->get_where('receivemoney',array('idunit'=>$idunit));
        foreach ($q->result() as $r) {
            $this->db->where('idreceivemoney',$r->idreceivemoney);
            $this->db->delete('receivemoneyitem');
        }
        $this->db->where('idunit',$idunit);
        $this->db->delete('receivemoney');

        $this->db->where('idunit',$idunit);
        $this->db->delete('receivemoneyimport');

        $this->db->where('idunit',$idunit);
        $this->db->delete('reconcile');

        //pembayaran siswa
         $q = $this->db->get_where('siswa',array('idunit'=>$idunit));
        foreach ($q->result() as $r) {
            $this->db->where('idsiswa',$r->idsiswa);
            $this->db->delete('riwayatpembsiswa');

            $this->db->where('idsiswa',$r->idsiswa);
            $this->db->delete('siswapembayaran');
        }
        //pembayaran siswa

        $q = $this->db->get_where('spendmoney',array('idunit'=>$idunit));
        foreach ($q->result() as $r) {
            $this->db->where('idspendmoney',$r->idspendmoney);
            $this->db->delete('spendmoneyitem');
        }
        $this->db->where('idunit',$idunit);
        $this->db->delete('spendmoney');

        //piutang
        $q = $this->db->get_where('registrasipiutang',array('idunit'=>$idunit));
        foreach ($q->result() as $r) {
            $this->db->where('idregistrasipiutang',$r->idregistrasipiutang);
            $this->db->delete('piutanghistory');
        }
        
        $this->db->where('idunit',$idunit);
        $this->db->delete('registrasipiutang');
        //end piutang

        $this->db->where('idunit',$idunit);
        $this->db->delete('pelanggan');

        //hutang
        $q = $this->db->get_where('registrasihutang',array('idunit'=>$idunit));
        foreach ($q->result() as $r) {
            $this->db->where('idregistrasihutang',$r->idregistrasihutang);
            $this->db->delete('disbursment');
        }
        $this->db->where('idunit',$idunit);
        $this->db->delete('registrasihutang');
        //end hutang

        $q = $this->db->get_where('thr',array('idunit'=>$idunit));
        foreach ($q->result() as $r) {
            $this->db->where('idthr',$r->idthr);
            $this->db->delete('thrlist');
        }
        $this->db->where('idunit',$idunit);
        $this->db->delete('thr');

        $q = $this->db->get_where('journal',array('idunit'=>$idunit));
        foreach ($q->result() as $r) {
            $this->db->where('idjournal',$r->idjournal);
            $this->db->delete('disbursment');
            
            $this->db->where('idjournal',$r->idjournal);
            $this->db->delete('journalitem');
        }
        $this->db->where('idunit',$idunit);
        $this->db->delete('journal');

        $this->db->where('idunit',$idunit);
        $this->db->delete('clossing');

        $q = $this->db->get_where('payroll',array('idunit'=>$idunit));
        foreach ($q->result() as $r) {
            $this->db->where('idpayroll',$r->idpayroll);
            $this->db->delete('payrollproceed');
        }
        $this->db->where('idunit',$idunit);
        $this->db->delete('payroll');

        $this->db->where('idunit',$idunit);
        $this->db->delete('accountlog');

        $q = $this->db->get_where('inventoryunit',array('idunit'=>$idunit));
        foreach ($q->result() as $r) {
            $this->db->where('idinventory',$r->idinventory);
            $this->db->where('idunit',$idunit);
            $this->db->delete('inventorydeprecitem');           
        }
        $this->db->where('idunit',$idunit);
        $this->db->delete('inventorydeprec');

        $this->db->where('idunit',$idunit);
        $this->db->delete('inventoryunit');

        $this->db->where('idunit',$idunit);
        $this->db->delete('transferkas');

        //retur
        $q = $this->db->get_where('return',array('idunit'=>$idunit));
        foreach ($q->result() as $r) {
            $this->db->where('idreturn',$r->idreturn);
            $this->db->delete('returnitem');
        }
        // $this->db->where('idunit',$idunit);
        // $this->db->delete('return');
    }

    function getUnitUser()
    {
        $user_id = $this->input->post('user_id');
        // $q = $this->db->get_where('inventoryunit',array('idinventory'=>$idinventory));
        $sql = "select namaunit 
                from userunit a
                join unit b ON a.idunit = b.idunit
                where user_id=$user_id";
        $q = $this->db->query($sql);
        $d = array();
        $num = $q->num_rows();
        $i=1;
        $str = null;
        foreach ($q->result() as $r) {
            $str.=$r->namaunit;
            if($i!=$num)
            {
                $str.=",";
            }
            $i++;
            // $d[] = $r->namaunit;
        }
        // echo json_encode($d);
        echo $str;
    }

    function getNoRecord($model, $dir=null, $digit=3){
        $modelfile = $dir . '/m_' . $model;
        $this->load->model($modelfile, 'datamodel');
        $lastid = $this->datamodel->getLastRecord($this->input->get('idunit'));
        if($lastid== 10 ** $digit -1) $digit += 1;
        echo json_encode(array('success'=>true,'norec'=>sprintf("%0".$digit."d", $lastid)));
    }

    function getNextNoArticle(){ // << kalau request dari ajax pakai ini
        $nextval = 0;
        $digit = 4;
        $prefix = $this->input->get('prefix');
        $fieldpk = $this->input->get('fieldpk');
        $fieldname = $this->input->get('fieldname');
        $table = $this->input->get('table');
        $extraparams = $this->input->get('extraparams');
        $idunit = $this->input->get('idunit');
        
        $y = date('y');
        $m = date('m');

        $sql = "select $fieldname 
                from $table where true 
                $extraparams and $fieldname like '%$y$m%' 
                order by $fieldpk desc
                limit 1";
        
        $q = $this->db->query($sql);
        if($q->num_rows() > 0)
            $nextval = (int) str_replace($prefix.$y.$m, '', $q->row()->$fieldname);
        
        if($nextval == 999)
            $digit = 4;

        $nextval += 1;
        $nextval = sprintf("%0".$digit."d", $nextval);
        echo json_encode(array('success'=>true,'nextval'=>$prefix.$y.$m.$nextval));
    }

    function getNextNoArticle2($params){ // << kalau request dari php pakai ini
        $nextval = 0;
        $digit = 4;
        $prefix = $params['prefix'];
        $fieldpk = $params['fieldpk'];
        $fieldname = $params['fieldname'];
        $table = $params['table'];
        $extraparams = $params['extraparams'];
        $idunit = $params['idunit'];
        
        $y = date('y');
        $m = date('m');

        $sql = "select $fieldname 
                from $table where true 
                $extraparams and $fieldname like '%$y$m%' 
                order by $fieldpk desc
                limit 1";
        
        $q = $this->db->query($sql);
        if($q->num_rows() > 0)
            $nextval = (int) str_replace($prefix.$y.$m, '', $q->row()->$fieldname);
        
        if($nextval == 999)
            $digit = 4; 

        $nextval += 1;
        $nextval = sprintf("%0".$digit."d", $nextval);

        $q->free_result(); //relese memory
        // return $prefix.$y.$m.$nextval;
        
        //cek udah ada yg make apa blum
        // if($this->check_exists($prefix.$y.$m.$nextval,$table,$fieldname)){
            return $prefix.$y.$m.$nextval;
        // } else {
        //     return $this->next_loop($params);
        // }
       
        //echo json_encode(array('success'=>true,'nextval'=>$prefix.$y.$m.$nextval));
    }

    function check_exists($no,$table,$fieldname){
        $q = $this->db->get_where($table,array($fieldname=>$no));
        if($q->num_rows()>0){
            $q->free_result();
            return false;
        } else {
            $q->free_result();
            return true;
        }
    }

    function next_loop($params){
        return $this->getNextNoArticle2($params);
    }   

    function getseq($date=null)
    {
        // $datearr = explode("-", $date);
        $idunit = $this->input->get('idunit');
        $type = $this->input->get('type');

        $query2 = "SELECT sequence FROM sequence where idunit=$idunit ORDER BY sequence DESC LIMIT 1";
        $q = $this->db->query($query2);
        if($q->num_rows()>0)
        {

        } else {
            $this->db->insert('sequence',array('sequence'=>1,'idunit'=>$idunit));
            $query2 = "SELECT sequence FROM sequence where idunit=$idunit ORDER BY sequence DESC LIMIT 1";
            $q = $this->db->query($query2);
        }
        // $result2 = mysql_query($query2);
        $row = $q->result_array();

        $last_id = $row[0]['sequence'];
        $rest = substr("$last_id", -3);  
        $insert_id = "$rest" + 1;
        // echo $insert_id;

        if($last_id==9999)
        {
            $digit=6;
        } else {
           $digit=4;
        }

        ///update
         $ars = sprintf("%0".$digit."d", $insert_id);
        $ref = 111;
        $emp_id = $ars;
        // $emp_id = $ref.'-'.$ars;
        $query= "update sequence set sequence='$emp_id' where idunit=$idunit";
        $this->db->query($query);
        //////////////////////

     
        
         $num = sprintf("%0".$digit."d", $insert_id);
         echo json_encode(array('success'=>true,'noref'=>$type.$idunit.$num));
       
        // $result=mysql_query($query)or die(mysql_error());
    }

    function getseqpk(){
        $idunit = $this->input->get('idunit');
        $type = $this->input->get('type');
        $table = $this->input->get('table');
        $fieldpk = $this->input->get('fieldpk');

        $q = $this->db->query("select max($fieldpk) from $table where to_char(datein, 'MMYY') = '".date('my')."'");
        $row = $q->result_array();

        $last_id = $row[0]['max'];
        $rest = substr("$last_id", -3);  
        $insert_id = "$rest" + 1;
        //////////////////////

        if($last_id==9999)
        {
            $digit=6;
        } else {
           $digit=4;
        }
        
         $num = sprintf("%0".$digit."d", $insert_id);
         echo json_encode(array('success'=>true, 'noref'=>date('ym').$num));
    }

    function saveLinkTaxUnit()
    {
        $idtax = $this->input->post('idtax');
        $idunit = $this->input->post('idunit');
        // namaunit:Unit 1
        $idacccollected = $this->input->post('idacccollected');
        // acccollected:Biaya Angkut Pembelian
        $idaccpaid = $this->input->post('idaccpaid');
        // accpaid:SPP

//         CREATE TABLE "public"."taxlinkunit" (
// "idtax" int4,
// "idunit" int4,
// "acccollectedtax" int4,
// "acctaxpaid" int4
// )
        $this->db->trans_begin();

        $this->db->where(array('idtax'=>$idtax,'idunit'=>$idunit));
        $this->db->update('taxlinkunit',array('acccollectedtax'=>$idacccollected,'acctaxpaid'=>$idaccpaid));

          if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Data gagal disimpan');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Data berhasil disimpan');
        }

        echo json_encode($json);
    }

    function saveLinkUnitTHR()
    {
        $this->db->trans_begin();

        $idemployeetype = $this->input->post('idemployeetype');
        $idunit = $this->input->post('idunit');
        // namaunit:SMIP
        // idaccount:681
        // accnamekas:1-1100 Kas Utama
        // idaccountpayroll:654

        $d = array(
                    // "idemployeetype" int4,
                    "idaccountpaythr" => $this->input->post('idaccountpaythr'),
                    "idaccountthr" => $this->input->post('idaccountthr')
                    // "idaccountpaythr" int4,
                    // "idaccountthr" int4,
                    // "idunit" int4
                );

        $this->db->where(array('idemployeetype'=>$idemployeetype,'idunit'=>$idunit));
        $this->db->update('employeetypeakunlink',$d);

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Data gagal disimpan');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Data berhasil disimpan');
        }

        echo json_encode($json);
    }

    function saveLinkUnitPayroll()
    {
         $this->db->trans_begin();

        $idemployeetype = $this->input->post('idemployeetype');
        $idunit = $this->input->post('idunit');
        // namaunit:SMIP
        // idaccount:681
        // accnamekas:1-1100 Kas Utama
        // idaccountpayroll:654

        $d = array(
                    // "idemployeetype" int4,
                    "idaccountpayroll" => $this->input->post('idaccountpayroll'),
                    "idaccount" => $this->input->post('idaccount')
                    // "idaccountpaythr" int4,
                    // "idaccountthr" int4,
                    // "idunit" int4
                );

        $this->db->where(array('idemployeetype'=>$idemployeetype,'idunit'=>$idunit));
        $this->db->update('employeetypeakunlink',$d);

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Data gagal disimpan');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Data berhasil disimpan');
        }

        echo json_encode($json);
    }

    function calculateLeftAmount()
    {
        $data = json_decode($this->input->post('data'));
        // print_r($data);
        // var_dump($data);
        $totalsaldo = 0;
        foreach ($data as $key => $value) {
            $json = json_decode($value);
            if($json->idaccounttype==1 || $json->idaccounttype==4 || $json->idaccounttype==19 || $json->idaccounttype==20 || $json->idaccounttype==2 || $json->idaccounttype==3)
            {
                // kas, piutang, persediaan, aktiva tetap bersaldo debit
                $totalsaldo+=$json->balance;
            }

             if($json->idaccounttype==9 || $json->idaccounttype==18 || $json->idaccounttype==10)
            {
                //Akun-akun kelompok kewajiban (utang) bersaldo kredit.
                $totalsaldo-=$json->balance;
            }

             if($json->idaccounttype==11 || $json->idaccounttype==21)
            {
                //Akun kelompok ekuitas pemilik (modal, laba ditahan) bersaldo kredit..
                $totalsaldo-=$json->balance;
            }

             if($json->idaccounttype==12 || $json->idaccounttype==16)
            {
                //Akun pendapatan bersaldo kredit.
                $totalsaldo-=$json->balance;
            }
// a.idaccounttype=14 OR a.idaccounttype=15 OR a.idaccounttype=9 OR a.idaccounttype=10
            if($json->idaccounttype==14 || $json->idaccounttype==15 || $json->idaccounttype==9 || $json->idaccounttype==10)
            {
                //AAkun biaya bersaldo debit.
                $totalsaldo+=$json->balance;
            }

             if($json->idaccounttype==13)
            {
                //Akun kelompok Cost of Sales
                $totalsaldo-=$json->balance;
            }
        }
        // $totalsaldo = 0;
        if($totalsaldo==0)
        {
            $json = array('success' => true,'balance'=>true, 'message' => '<b>Sisa Saldo: '.number_format($totalsaldo).'</b>');
        } else {
            $json = array('success' => true,'balance'=>false, 'message' => '<b><font color=red>Sisa Saldo: '.number_format($totalsaldo).'</font></b>');
        }
        
        echo json_encode($json);
    }

    function getTotalHutang()
    {
        $idunit = $this->input->post('idunit');
        $sql = "select
                        sum(a .sisahutang)  as total
                    from
                        registrasihutang a
                    join unit b ON a .idunit = b.idunit
                    join account c ON a .idacchutang = c .idaccount and a .idunit = c .idunit
                    left join account d ON a .idacckenahutang = d.idaccount and a .idunit = d.idunit
                    left join supplier e ON a .idsupplier = e.idsupplier
                    WHERE
                        TRUE and a.idunit = $idunit ";
        $q = $this->db->query($sql);
        // $q = $this->db->query("select sum(sisahutang) as total from registrasihutang where idunit=$idunit");
        if($q->num_rows()>0)
        {
            $r = $q->row();
            $json = array('success' => true,'balance'=>$r->total);
        } else {
            $json = array('success' => true,'balance'=>0);
        }
        echo json_encode($json);
    }

    function delOpeningHutang()
    {
        $records = json_decode($this->input->post('postdata'));
        foreach ($records as $id) {
            $this->db->where('idregistrasihutang',$id);
            $this->db->delete('registrasihutang');
        }
    }

    function saveOpeningHutang()
    {
        $this->db->trans_begin();

        $idregistrasihutang = $this->input->post('idregistrasihutang') == '' ? $this->m_data->getSeqVal('seq_registrasihutang') : $this->input->post('idregistrasihutang');
        $jumlah = str_replace(".", "", $this->input->post('jumlah'));
        $idunit = $this->input->post('idunit');

         $data = array(
            'idregistrasihutang' => $idregistrasihutang,
            'idacchutang' => $this->input->post('idacchutang'),
            'idacckenahutang' => $this->input->post('idacckenahutang'),
            'jumlah' => $jumlah,
            'sisahutang' => $jumlah,
            'memo' => $this->input->post('memo'),
            'idsupplier' => $this->input->post('idsupplier'),
            // 'bulan' => ambilNoBulan($this->input->post('namabulan')),
            // 'tahun' => $this->input->post('tahun'),
            // 'description' => $this->input->post('description'),
            'mulaihutang' => backdate2($this->input->post('mulaihutang')),
            'jatuhtempo' => backdate2($this->input->post('jatuhtempo')),
            'idunit' => $this->input->post('idunit')
        );
         $this->db->insert('registrasihutang',$data);

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Data gagal disimpan');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Data berhasil disimpan');
        }

        echo json_encode($json);
    }

    function savePiutangOpening()
    {
        $this->db->trans_begin();

          $data = array(
            'idregistrasipiutang' => $this->input->post('idregistrasiPiutangOpening') == '' ? $this->m_data->getSeqVal('seq_registrasipiutang') : $this->input->post('idregistrasiPiutangOpening'),
            'idcustomer' => $this->input->post('idcustomer'),
            'idaccount' => $this->input->post('idaccount'),
            // 'bulan' => ambilNoBulan($this->input->post('namabulan')),
            // 'tahun' => $this->input->post('tahun'),
            'idaccountlink' => $this->input->post('idaccountlink'),
            'tglpiutang' => $this->input->post('tglPiutangOpening'),
            'description' => $this->input->post('description'),
            'jumlah' => str_replace(".", "", $this->input->post('jumlah')),
            'sisapiutang' => str_replace(".", "", $this->input->post('jumlah')),
            'idunit' => $this->input->post('idunit')
        );
          $this->db->insert('registrasipiutang',$data);

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Data gagal disimpan');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Data berhasil disimpan');
        }

        echo json_encode($json);
    }

    function getTotalPiutang()
    {
        $idunit = $this->input->post('idunit');
        $sql = "select sum(sisapiutang) as total from registrasipiutang where display is null and idunit=$idunit";
        // $idunit = $this->input->post('idunit');
        $q = $this->db->query($sql);
        if($q->num_rows()>0)
        {
            $r = $q->row();
            $json = array('success' => true,'balance'=>$r->total);
        } else {
            $json = array('success' => true,'balance'=>0);
        }
        echo json_encode($json);
    }

    function delOpeningPiutang()
    {
        $records = json_decode($this->input->post('postdata'));
        foreach ($records as $id) {
            $this->db->where('idregistrasipiutang',$id);
            $this->db->delete('registrasipiutang');
        }
    }

    function getTotalPersediaan()
    {
        $idunit = $this->input->post('idunit');
        $sql = "select idaccount from account where display is null and (idaccounttype=20 OR idaccounttype=4) and idunit=$idunit";
        // $idunit = $this->input->post('idunit');
        $q = $this->db->query($sql);
        $totalPersediaan=0;
        foreach ($q->result() as $r) {
            $qinvunit = $this->db->get_where('inventoryunit',array('idunit'=>$idunit,'assetaccount'=>$r->idaccount));
            foreach ($qinvunit->result() as $rr) {
                $qinv = $this->db->get_where('inventory',array('idinventory'=>$rr->idinventory));
                if($qinv->num_rows()>0)
                {
                    $rinv = $qinv->row();
                    $saldo = $rinv->qtystock*$rinv->cost;
                } else {
                    $saldo = 0;
                }
                $totalPersediaan+=$saldo;
            }
        }

        if($q->num_rows()>0)
        {
            $r = $q->row();
            $json = array('success' => true,'balance'=>$totalPersediaan);
        } else {
            $json = array('success' => true,'balance'=>0);
        }
        echo json_encode($json);
    }

    function delOpeningPersediaan()
    {
        $records = json_decode($this->input->post('postdata'));
        foreach ($records as $id) {
            $this->db->where('idinventory',$id);
            $this->db->delete('inventoryunit');

            $this->db->where('idinventory',$id);
            $this->db->delete('inventory');
        }
    }

    function getlogo()
    {
        $this->db->select('logo');
        $q = $this->db->get_where('company',array('idcompany'=>1));
        if($q->num_rows()>0)
        {
            $r = $q->row();
           echo "{success:true, logoheader:'".$r->logo."'}";            
        }
    }

    function hapuslogo()
    {
        $this->db->update('company',array('logo'=>null));
    }

    function SaveInventoryOpening()
    {

    }

    function getNamaUnit()
    {
        $q = $this->db->get_where('unit',array('idunit'=>$this->input->post('idunit')))->row();
        $json = array("success" => true,"namaunit"=>$q->namaunit);
        echo json_encode($json);
    }

    function xyz($idcompany)
    {
        $q = $this->db->get_where('employeetype',array('idcompany'=>$idcompany));
        foreach ($q->result() as $r) {
            $qq = $this->db->get_where('unit',array('idcompany'=>$idcompany));
            foreach ($qq->result() as $rr) {
                    $this->db->insert('employeetypeakunlink',array('idemployeetype'=>$r->idemployeetype,'idunit'=>$rr->idunit));
                }
        }
    }

    function reset_transaction(){
        $this->db->empty_table('accountlog');
        $this->db->empty_table('delivery_order');
        $this->db->empty_table('goodsreceipt');
        $this->db->empty_table('goodsreceived');
        $this->db->empty_table('inventorydeprecitem');
        $this->db->empty_table('inventorydeprec');
        $this->db->empty_table('job_item');
        $this->db->empty_table('job_order_cost');
        $this->db->empty_table('prod_material');
        $this->db->empty_table('job_order');
        $this->db->empty_table('journalitem');
        $this->db->empty_table('journal');
        $this->db->empty_table('loginlog');
        $this->db->empty_table('payrollproceed');
        $this->db->empty_table('payroll');
        $this->db->empty_table('piutangpayhistory');
        $this->db->empty_table('piutanghistory');        
        $this->db->empty_table('prosesgaji_tmp');
        $this->db->empty_table('prosesgaji');
        $this->db->empty_table('purchase_payment');
        $this->db->empty_table('purchase_returnitem');
        $this->db->empty_table('purchaseitem');
        $this->db->empty_table('purchaseitem_batch');
        $this->db->empty_table('purchase_return');
        $this->db->empty_table('purchase');
        $this->db->empty_table('sales_payment');
        $this->db->empty_table('sales_return_item');
        $this->db->empty_table('salesitem');
        $this->db->empty_table('sales');
        $this->db->empty_table('stock_history');
    }

    function inserlinkunit()
    {
        $qunit = $this->db->get('unit');
        foreach ($qunit->result() as $runit) {
            $q = $this->db->get('linkedacc');
            foreach ($q->result() as $r) {
                $qcek = $this->db->get_where('linkedaccunit',array('idunit'=>$runit->idunit,'idlinked'=>$r->idlinked));
                if($qcek->num_rows()>0)
                {

                } else {
                    $this->db->insert('linkedaccunit',array('idunit'=>$runit->idunit,'idlinked'=>$r->idlinked));
                }
                
            }
        }
    }

    function insert_new_menu($menu_id){
        $qunit = $this->db->get('unit');
         // print_r($qunit->result_array()); die;
        foreach ($qunit->result() as $r) {

            $q2 = $this->db->get_where('sys_group',array('deleted'=>0));
            // if($r->idunit==67){
            //     echo $this->db->last_query();
            //     print_r($q2->result_array()); die;
            // }
            foreach ($q2->result() as $r2) {
                $cek = $this->db->get_where('sys_group_menu',array('sys_menu_id'=>$menu_id,'group_id'=>$r2->group_id));
                if($cek->num_rows()>0){
                    echo $r->namaunit.' '.$r2->group_name.' already exists<br>';
                } else {
                    $this->db->insert('sys_group_menu',array('sys_menu_id'=>$menu_id,'group_id'=>$r2->group_id));
                }
            }
        }
       
    }

}

?>