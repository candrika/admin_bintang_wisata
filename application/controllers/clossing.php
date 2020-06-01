<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class clossing extends MY_Controller {

    public function index() {
        echo date('m');
    }
    
    function getPeriode()
    {
        $idunit = $this->input->post('idunit');
        
        $q = $this->db->get_where('unit',array('idunit'=>$idunit));

        if($q->num_rows()>0)
        {
            $r = $q->row();

            //cek apakah bulan sekarang sudah sama dengan bulan tutup buku tahunan,
            // jika sama maka disable tombol simpan dan beri peringatan untuk memproses clossing tahunan
            // echo $r->conversionmonth;
            $cm = intval($r->conversionmonth);
            // echo ambilBulan($r->conversionmonth);
            // echo $cm;
            if($cm==0)
            {
                //baru mulai clossing
                $monthBefore = null;
                $r->conversionmonth = '01';
            } else 
            {
                // echo $cm;
                if($cm!=1)
                {
                    $cm-=1;
                } 
               
                // echo $cm;
                if($cm<10)
                {
                    $cm = '0'.$cm;
                    // echo $cm;
                } 
                // echo $cm;
                $monthBefore = ambilBulan($cm).' '.$r->curfinanceyear;
            }

            if($monthBefore==ambilBulan($r->conversionmonth).' '.$r->curfinanceyear)
            {
                $monthBeforeBtn = true;
            } else {
                $qcek = $this->db->get_where('closebook',array('idunit'=>$idunit));
                if($qcek->num_rows()>0)
                {
                    //baru mulai clossing
                    $monthBeforeBtn = false;
                } else {
                    $monthBeforeBtn = true;
                }
                
            }
            
            if($r->lastmonthfinanceyear==$r->conversionmonth)
            {
                $arr = array('success'=>true,'message'=>'Periode akuntansi telah mencapai akhir masa periode, harap melakukan clossing tahunan','monthBeforeBtn'=>$monthBeforeBtn,'monthBefore'=>$monthBefore,'fulldate'=>ambilBulan($r->conversionmonth).' '.$r->curfinanceyear,'date'=>$r->curfinanceyear.'-'.$r->conversionmonth,'disable'=>true);
            } else {
                $arr = array('success'=>true,'message'=>null,'monthBeforeBtn'=>$monthBeforeBtn,'monthBefore'=>$monthBefore,'fulldate'=>ambilBulan($r->conversionmonth).' '.$r->curfinanceyear,'date'=>$r->curfinanceyear.'-'.$r->conversionmonth,'disable'=>false);
            }
        } else {
            $arr = array('success'=>false,'msg'=>'gagal');
        }
        echo json_encode($arr);
    }

    function cancelClossing()
    {
        $idunit = $this->input->post('idunit');
        $date = explode("-", $this->input->post('date'));
        $y = $date[0];
        $m = intval($date[1]);
        $m-=1;
        if($m<10)
        {            
            $convm = '0'.$m;
        } else {
            $convm = $m;
        }

        $d = array(
                'conversionmonth'=>$convm
        );

        $this->db->trans_begin();

        $this->db->where('idunit',$idunit);
        $this->db->update('unit',$d);

        $this->db->where('idunit',$idunit);
        $this->db->where('month',$convm);
        $this->db->where('year',$date[0]);
        $this->db->delete('clossing');
        // echo $this->db->last_query();

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Pembatalan clossing gagal');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Pembatalan clossing berhasil');
        }

        echo json_encode($json);
    }
    
    function jurnalPenutup($idunit,$tglclossing)
    {
        $this->load->model('m_laporan');
        $this->load->model('m_journal');

        $tgl = explode("-", $tglclossing);
        $startdate = $tgl[0].'-'.$tgl[1].'-01';
        $enddate = $tgl[0].'-'.$tgl[1].'-'.lastday($tgl[1], $tgl[0]);

        $pendapatan[0] = $this->m_laporan->getDataNeraca($idunit, $startdate, $enddate, 12);
        $pendapatan[1] = $this->m_laporan->getDataNeraca($idunit, $startdate, $enddate, 16); //pendapatan lain
        $this->m_journal->savePenutupanPendapatan($tglclossing,$pendapatan,$idunit);


    }

    function closebook($tahunbulan=null,$tgl=null,$idunit=null)
    {
        $tgl = $tgl == null ? $this->input->post('periode') : $tgl;
        $tanggalclossing = $this->input->post('tanggalclossing');        
        $idunit = $idunit == null ? $this->input->post('namaunit') : $idunit;
        
        if($tahunbulan=='tahun')
         {
             //
             $qunit = $this->db->get_where('unit',array('idunit'=>$idunit))->row();
             $tgl = $qunit->curfinanceyear.'-'.$qunit->conversionmonth.'-'.lastday($qunit->conversionmonth,$qunit->curfinanceyear);
             // $arrCurMonth = explode("-", $tgl);
         } else {
                             
            }
        $arrCurMonth = explode("-", $tgl);   
        $next = date("Y-m", strtotime($arrCurMonth[0] . "-" . $arrCurMonth[1] . "-01 +1 months"));    
        $arrNext = explode("-", $next);
        // print_r($arrNext);

        //cek link accocunt laba berjalan/ditahan
        if($tahunbulan=='tahun')
         {
            $idlinked = 3;
            $namaakun="Laba Ditahan";
         } else {
            $idlinked = 4;
            $namaakun="Laba Berjalan";
         }
        $qlink = $this->db->get_where('linkedaccunit',array('idlinked'=>$idlinked,'idunit'=>$idunit));
        // echo $this->db->last_query();
        // exit;
        if($qlink->num_rows()>0)
        {
            $r = $qlink->row();
            $idaccountLabaDitahan = $r->idaccount;
            if($idaccountLabaDitahan==null)
            {
                $json = array('success' => false, 'message' => 'Tidak dapat melanjutkan proses penutupan buku, karena Link akun '.$namaakun.' belum terdefinisi');
                echo json_encode($json);
                exit();
            }
        } else {
            $json = array('success' => false, 'message' => 'Tidak dapat melanjutkan proses penutupan buku, karena Link akun '.$namaakun.' belum terdefinisi');
            echo json_encode($json);
            exit();
        }

        $this->db->trans_begin();
        
        //update curfinanceyear dan conversionmonth di unit
        $this->db->where('idunit',$idunit);
        $this->db->update('unit',array('curfinanceyear'=>$arrNext[0],'conversionmonth'=>$arrNext[1]));
        
        $this->load->model('m_laporan');
        $this->load->model('m_journal');

        $tglArr = explode("-", $tgl);
        $startdate = $tglArr[0].'-'.$tglArr[1].'-01';
        $enddate = $tglArr[0].'-'.$tglArr[1].'-'.lastday($tglArr[1], $tglArr[0]);

        // $this->jurnalPenutup($idunit,$tgl);

       $qseq = $this->db->query("select nextval('seq_clossing') as id")->row();
       $idclossing = $qseq->id;
       $d = array(
            "idclossing" => $idclossing,
            "tanggal" =>$enddate,
            "idunit" => $idunit,
            "userin" => $this->session->userdata('username'),
            "type" =>$tahunbulan
        );
       $this->db->insert('closebook',$d);

       $this->penyusutanInventory($idunit,$enddate,$idclossing);
       
       /* buat jurnal tutup buku akhir bulan (dikenal sebagai jurnal penutup) sebagai berikut:
            1. Penutupan saldo pendapatan
                [D] Pendapatan
                [K] Ikhtisar Laba/Rugi
        */       
                // echo $startdate.", ".$enddate;
                // $pendapatan[0] = $this->m_laporan->getDataNeraca($idunit, $startdate, $enddate, 12);
                // $pendapatan[0] = $this->m_laporan->getAccBalance($idunit, 12);
                $pendapatan[0] =  $this->m_laporan->getDataNeraca3($idunit, $startdate, $enddate, 12);

                // $pendapatan[1] = $this->m_laporan->getAccBalance($idunit, 16); //pendapatan lain
                $pendapatan[1] =  $this->m_laporan->getDataNeraca3($idunit, $startdate, $enddate, 16);
                $this->m_journal->savePenutupanPendapatan($enddate,$pendapatan,$idunit,$idclossing);
                // print_r($pendapatan);

        /*
            2. Penutupan saldo beban
                [D] Ikhtisar Laba/ Rugi
                [K] Beban
        */
                 // $pengeluaran[0] = $this->m_laporan->getAccBalance($idunit, 14);
                $pengeluaran[0] =  $this->m_laporan->getDataNeraca3($idunit, $startdate, $enddate, 14);
                 // print_r($pengeluaran[0]);
                 // $pengeluaran[1] = $this->m_laporan->getAccBalance($idunit, 13); //biayapendapatan
                 $pengeluaran[1] =  $this->m_laporan->getDataNeraca3($idunit, $startdate, $enddate, 13);
                 // $pengeluaran[2] = $this->m_laporan->getAccBalance($idunit, 15); //pengeluaranlain
                 $pengeluaran[2] =  $this->m_laporan->getDataNeraca3($idunit, $startdate, $enddate, 15);
                 $this->m_journal->savePenutupanPengeluaran($enddate,$pengeluaran,$idunit,$idclossing);
                 // print_r($pengeluaran);
        
         /*   3. Penutupan ikhtisar laba/ rugi
                [D] Ikhtisar Laba/ Rugi
                [K] ModalModal ini dapat berupa laba tahun berjalan di mana nilainya berasal dari 
                    profit/loss yang terbentuk dari laporan laba/rugi.*/
        
                $labarugi = ($pendapatan[0]['total']+$pendapatan[1]['total'])-($pengeluaran[0]['total']+$pengeluaran[1]['total']+$pengeluaran[2]['total']);
                // echo 'labarugi:'.$labarugi.'<br>';
                $this->m_journal->savePenutupanLabaRugi($enddate,$labarugi,$idunit,$tahunbulan,$idclossing);

        ///
                // echo 'run penyusutanInventory ';
                
        // if($tahunbulan=='tahun')
        //  {
        //     // Laba Tahun Berjalan ini harus dibalik ke akun Laba Ditahan

        //     $qLinkLabaBerjalan = $this->db->get_where('linkedaccunit',array('idlinked'=>4,'idunit'=>$idunit))->row();
        //     $qLabaBerjalan = $this->db->get_where('account',array('idaccount'=>$qLinkLabaBerjalan->idaccount,'idunit'=>$idunit))->row();
        //     echo $this->db->last_query().'           ';
        //     $lababerjalan = $qLabaBerjalan->balance;

        //     $this->db->where(array('idunit'=>$idunit,'idaccount'=>$idaccountLabaDitahan));
        //     $this->db->update('account',array('balance'=>$lababerjalan));
        //     echo $this->db->last_query();

        //     $this->db->where(array('idaccount'=>$qLinkLabaBerjalan->idaccount,'idunit'=>$idunit));
        //     $this->db->update('account',array('balance'=>0));
        //  } else {

        //  }

         /* account-account temporary yang harus ditutup diakhir periode ke rekening “Retained Earning (Laba Ditahan)”, 
         yang meliputi:
        - Cost & Expense accounts (Cost & Biaya)
        - Income Tax
        - Revenue accounts (Pendapatan)
        */
        $sql = "update account
                set balance=0
                where idunit=$idunit and(idaccounttype=14 OR idaccounttype=15 OR idaccounttype=12 or idaccounttype=16)";
        $qTutupBal = $this->db->query($sql);



//         $qacc = $this->db->get_where('account', array('idunit' => $idunit));
        
//         foreach ($qacc->result() as $r) {
// //            $qacc = $this->db->get_where('account', array('idaccount' => $value->idaccount))->row();
            
//             //ambil saldo bulan sebelumnya
//             $monthint = intval($arrCurMonth[1]);
//             $yearint = intval($arrCurMonth[0]);

//             $monthbefore = $monthint-1;
//             if($monthbefore<10)
//             {
//                 $monthbefore = $monthint.'0';
//             } else {
//                 $monthbefore = $monthint;
//             }
//             // $qbalance = $this->db->get_where('clossing',array('month'=>$monthbefore,'year'=>$arrCurMonth[0],'idaccount'=>$r->idaccount));
//             // $qbalance = $this->getAccJournalVal($r->idaccount,$monthbefore,$arrCurMonth[0]);

//             $d = array(
//                 'idaccounttype' => $r->idaccounttype,
//                 'idaccount' => $r->idaccount,
//                 'idclassificationcf' => $r->idclassificationcf,
//                 'idlinked' => $r->idlinked,
//                 'idparent' => $r->idparent,
//                 'accnumber' => $r->accnumber,
//                 'accname' => $r->accname,
//                 // 'balance' => $qbalance['saldo'],
//                 'balance' => $r->balance,
//                 'idpos' => $r->idpos,
//                 'display' => $r->display,
//                 'description' => $r->description,
//                 'userin' => $this->session->userdata('username'),
//                 'usermod' => $this->session->userdata('username'),
//                 'datein' => date('Y-m-d H:m:s'),
//                 'datemod' => date('Y-m-d H:m:s'),
//                 'active' => $r->active,
//                 'idunit' => $r->idunit,
//                 'dateclose'  => $arrCurMonth[0].'-'.$arrCurMonth[1].'-'.date('d'),
//                 'month'  => $arrCurMonth[1],
//                 'year' => $arrCurMonth[0]
//             );
            
//            // $this->db->insert('clossing',$d);

//              /*Nominal Account: adalah account-account temporary yang harus ditutup diakhir periode ke rekening 
//             “Retained Earning (Laba Ditahan)”, yang meliputi:  
//             - Cost & Expense accounts (Cost & Biaya)
//             - Income Tax
//             - Revenue accounts (Pendapatan)*/
               
//             if($r->idaccounttype==14 || $r->idaccounttype==15 || $r->idaccounttype==12 || $r->idaccounttype==14 || $r->idaccounttype==16)
//             {
//                 //Cost & Expense accounts (Cost & Biaya) & Revenue accounts (Pendapatan)
//                 // echo 'Cost & Expense accounts (Cost & Biaya) & Revenue accounts (Pendapatan):'.$r->accname.' <br>';
//                 $this->db->where(array('idaccount'=>$r->idaccount,'idunit'=>$r->idunit));
//                 $this->db->update('account',array('balance'=>0));
//             } else {

//                 if($this->checkIncomeTax($r->idaccount,$idunit))
//                 {
//                     //income tax
//                     // echo 'income tax:'.$r->accname.' <br>';
//                     $this->db->where(array('idaccount'=>$r->idaccount,'idunit'=>$r->idunit));
//                     $this->db->update('account',array('balance'=>0));
//                 } else {
//                     //real account tidak dihapus karena akan di rollup ke periode berikutnya
//                     // echo 'real account:'.$r->accname.' <br>';
//                     // $this->db->where(array('idaccount'=>$r->idaccount,'idunit'=>$r->idunit));
//                     // $this->db->update('account',array('balance'=>$balance));
//                 }

//             }
//         }
        // print_r($d);
        //ubah periode aktif
        $periode =  ambilBulan($arrNext[1]).' '.$arrNext[0];
        $this->session->set_userdata(array('periode'=>$periode,'conversionmonth'=>$arrNext[1]));
        //end ubah periode aktif

         if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Tutup buku akhir bulan gagal');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Tutup buku akhir bulan sukses','periode'=>$periode);
        }

        echo json_encode($json);
    }

    function ceklinkakun()
    {
        $idlinked = $this->input->post('idlinked');
        $idunit = $this->input->post('idunit');
        $qlink = $this->db->get_where('linkedaccunit',array('idlinked'=>$idlinked,'idunit'=>$idunit));
        // echo $this->db->last_query();
        $namalink = $idlinked==4 ? 'Akun Laba Berjalan' : 'Akun Laba Ditahan';
        $msg = 'Link <b>'.$namalink.'</b> Belum Ditentukan. <br><br> Lokasi Pengaturan Link Akun: Pengaturan->Link Akun';
         if($qlink->num_rows()>0)
         {
             $r = $qlink->row();
             if($r->idaccount==null)
             {
                $arr = array('success'=>false,'message'=>$msg);
             } else {
               $arr = array('success'=>true,'message'=>''); 
             }
             
         } else {
             $arr = array('success'=>false,'message'=>$msg);
        }
        echo json_encode($arr);
    }

    function ceklinkakunpersediaan()
    {
        $idunit = $this->input->post('idunit');
        $sql = "select a.idinventory,invno,nameinventory,b.assetaccount,b.akumpenyusutaccount,b.depresiasiaccount
        from inventory a
        join inventoryunit b ON a.idinventory = b.idinventory
        where clossed is null and qtystock >=1 and b.idunit = $idunit";
        $q = $this->db->query($sql);
        foreach ($q->result() as $r) {
            if($r->assetaccount==null || $r->akumpenyusutaccount==null || $r->depresiasiaccount==null)
            {
                echo json_encode(array('success'=>false,'message'=>'Akun Persediaaan <b>'.$r->invno.' '.$r->nameinventory.'</b> Belum Terdefinisi'));
                exit;
            } else if($r->assetaccount==0 || $r->akumpenyusutaccount==0 || $r->depresiasiaccount==0)
            {
                echo json_encode(array('success'=>false,'message'=>'Akun Persediaaan <b>'.$r->invno.' '.$r->nameinventory.'</b> Belum Terdefinisi'));
                exit;
            } else {
                // $obj->status = 'true';

            }
        }
         echo json_encode(array('success'=>true,'message'=>null));
    }

    function penyusutanInventory($idunit,$date,$idclossing)
    {
        // echo 'in penyusutanInventory ';
        $tgl = explode("-", $date);

        $sql = "select a.idinventory,a.akumulasiakhir,b.penyusutanberjalan,a.bebanperbulan,b.idunit,b.clossed,b.akumpenyusutaccount,b.depresiasiaccount
                from inventory a
                JOIN inventoryunit b ON a.idinventory = b.idinventory
                where b.idunit=$idunit and b.clossed is null and a.qtystock>=1";
                // echo $sql;
        $q = $this->db->query($sql);

        if($q->num_rows()>0)
        {
            $qseq = $this->db->query("select nextval('seq_inventoryadjusment') as id")->row();
            $iddepreciation = $qseq->id;

            $d = array(
                    "iddepreciation" => $iddepreciation,
                    // "nojournal" varchar(30),
                    // "memo" varchar(225),
                    // "display" int4,
                    "userin" => $this->session->userdata('username'),
                    "usermod" => $this->session->userdata('username'),
                    "datein" => date('Y-m-d H:m:s'),
                    "datemod" => date('Y-m-d H:m:s'),
                    "idunit" => $idunit,
                    "dateadj" => $date,
                    "month" => $tgl[1],
                    "year" => $tgl[0],
                    "idclossing"=>$idclossing
                    // "penyusutanbulan" float8,
                    // "bebanberjalan" float8,
                    // "akumulasipenyusutan" float8,
                    // "nilaibuku" float8,
                    // "bulanpenyusutan" int4,
                );
            $this->db->insert('inventorydeprec',$d);
            $depresiasiArr = array();
            $i=0;
            foreach ($q->result() as $r) {
                $penyusutanberjalan = $r->penyusutanberjalan+$r->bebanperbulan;

                if($r->akumulasiakhir==$r->penyusutanberjalan)
                {
                    //closing
                    $clossed=1;
                } else {
                    $clossed=null;
                }
                $this->db->where('idinventory',$r->idinventory);
                $this->db->where('idunit',$idunit);
                $this->db->update('inventoryunit',array('penyusutanberjalan'=>$penyusutanberjalan,'clossed'=>$clossed));

                $qmax = $this->db->query("select max(bulanpenyusutan) as bulan from inventorydeprecitem where idunit=$idunit and idinventory=$r->idinventory");
                if($qmax->num_rows()>0)
                {
                    $rmax = $qmax->row();
                    $bulanpenyusutan = $rmax->bulan;
                } else {
                    $bulanpenyusutan = 1;
                }

                $d = array(
                        "iddepreciation" => $iddepreciation,
                       "idinventory" => $r->idinventory,
                        // "idaccount" int8,
                        // "onhand" int4,
                        // "counted" int4,
                        // "qty" int4,
                        // "unitcost" float8,
                        // "amount" float8,
                        // "memo" varchar(225),
                        // "diference" char(50),
                        "month" => $tgl[1],
                        "year" => $tgl[0],
                        "penyusutan" => $r->bebanperbulan,
                        "bulanpenyusutan" => $bulanpenyusutan,
                        "idunit" => $idunit
                    );
                $this->db->insert('inventorydeprecitem',$d);

                $qtmp = $this->db->get_where('tmpdepresiasi',array('akumpenyusutaccount'=>$r->akumpenyusutaccount,'depresiasi'=>$r->depresiasiaccount));
                if($qtmp->num_rows()>0)
                {
                    $rr = $qtmp->row();
                    $this->db->where(array(
                        'iddepreciation' => $iddepreciation,
                        'akumpenyusutaccount'=>$r->akumpenyusutaccount,
                        'depresiasi'=>$r->depresiasiaccount));
                    $d = array(
                            'bebanperbulan'=>$rr->bebanperbulan+$r->bebanperbulan
                        );
                    $this->db->update('tmpdepresiasi',$d);
                } else {
                    $d = array(
                        'iddepreciation' => $iddepreciation,
                        'akumpenyusutaccount'=>$r->akumpenyusutaccount,
                        'depresiasi'=>$r->depresiasiaccount,
                        'bebanperbulan'=>$r->bebanperbulan);
                    $this->db->insert('tmpdepresiasi',$d);
                }
                // $this->db->insert('inventorydeprecitem',$d);
                // $depresiasiArr[$i]['akumpenyusutaccount'] = $r->akumpenyusutaccount;
                // $depresiasiArr[$i]['depresiasi'] = $r->depresiasiaccount;
                // $depresiasiArr[$i]['idinventory'] = $r->idinventory;
                // $depresiasiArr[$i]['bebanperbulan'] = $r->bebanperbulan;
                $i++;
            }
            // print_r($depresiasiArr);
            //bikin jounal
            // $jurnalArr=array();
            // $i=0;
            // foreach ($depresiasiArr as $key => $value) {

            //     if($i>0)
            //     {
            //         // $before=$i--;
            //         // if($value[$i]['akumpenyusutaccount']==$value[$i]['akumpenyusutaccount'])
            //         //cek udah ada apa belom
            //         foreach ($jurnalArr as $key2 => $value2) {
            //             $jurnalArr[$i]['idinventory']=$value['idinventory'];
            //             $jurnalArr[$i]['beban']=$value['bebanperbulan'];
            //             if($value['akumpenyusutaccount']==$value2['idpenyusutancredit'])
            //             {
            //                 echo 'udah ada';
            //             } else {
            //                 $jurnalArr[$i]['idpenyusutancredit']=$value['akumpenyusutaccount'];
            //             }

            //             if($value['depresiasi']==$value2['iddepresiasidebit'])
            //             {
            //                 echo 'iddepresiasi udah ada';
            //             } else {
            //                 $jurnalArr[$i]['iddepresiasidebit']=$value['depresiasi'];
            //             }
            //         }
            //     } else {
            //         $jurnalArr[$i]['idinventory']=$value['idinventory'];
            //         $jurnalArr[$i]['beban']=$value['bebanperbulan'];
            //         $jurnalArr[$i]['idpenyusutancredit']=$value['akumpenyusutaccount'];
            //         $jurnalArr[$i]['iddepresiasidebit']=$value['depresiasi'];
            //     }
                
            //     $i++;
            // }
            // print_r($jurnalArr);
            $this->m_journal->savePenyusutan($idunit,$iddepreciation,$date,$idclossing);

            $this->db->where('iddepreciation',$iddepreciation);
            $this->db->delete('tmpdepresiasi');
        } else {

        }

        
    }

    function checkIncomeTax($idaccount,$idunit)
    {
        $q = $this->db->query("select acctaxpaid
                            from tax a
                            join account b ON a.acctaxpaid = b.idaccount
                            where acctaxpaid=$idaccount and b.idunit=$idunit");
        if($q->num_rows()>0)
        {
            return true;
        } else {
            return false;
        }
    }

    function updatedateclose()
    {
        $q = $this->db->get('clossing');
        foreach ($q->result() as $r) {
            $this->db->where('idclossing',$r->idclossing);
            $this->db->update('clossing',array('dateclose'=>$r->year.'-'.$r->month.'-'.lastday($r->month, $r->year)));
        }
    }

    function getPeriodeYear()
    {
        $idunit = $this->input->post('idunit');

        //cek apakah sudah mencapai bulan closing atau belum
        $q = $this->db->get_where('unit',array('idunit'=>$idunit));
        if($q->num_rows()>0)
        {
            $r = $q->row();
            if($r->lastmonthfinanceyear=='')
            {
                $json = array('success' => false, 'message' => 'Bulan tutup buku belum di input');
            } else if($r->lastmonthfinanceyear!=$r->conversionmonth)
            {
                $json = array('success' => false, 'message' => 'Periode berjalan belum mencapai periode tutup buku');
            } 
            // else if($r->curfinanceyear!=$r->conversionmonth)
            // {
            //     $json = array('success' => false, 'message' => 'Tutup buku akhir bulan gagal');
            // }
             else {
                $json = array('success' => true, 'message' => $r->curfinanceyear);
            }
        } else {
            $json = array('success' => false, 'message' => 'Unit tidak ada');
        }
        echo json_encode($json);
    }

    function getAccJournalVal($idaccount,$m,$y)
    {
        $sql = "select b.* from journal a
        join journalitem b ON a.idjournal = b.idjournal
        where month='$m' and year=$y and b.idaccount=$idaccount";
        $q = $this->db->query($sql);
        $d['credit'] = 0;
        $d['debit'] =0;

        $qacc = $this->db->get_where('account',array('idaccount'=>$idaccount))->row();
        $d['idclassificationcf'] = $qacc->idclassificationcf;
        $d['idaccounttype'] = $qacc->idaccounttype;
        
        foreach ($q->result() as $r) {
            $d['credit'] += $r->credit;
            $d['debit'] += $r->debit;
        }
// echo $r->debit;
         if($qacc->idaccounttype==1 || $qacc->idaccounttype==19 || $qacc->idaccounttype==4 || $qacc->idaccounttype==5 || $qacc->idaccounttype==17)
        {
            //bank,kas,harta tetap,harta lain,harta lancar
            $d['tipeakun'] = 'harta';
            $d['saldo'] = $d['debit'];
        } else {
            $d['saldo'] = $d['credit'];
        }
        return $d;
    }

    function backClossing()
    {
        $q = $this->db->get_where('journalitem',array('idjournal'=>357));
        foreach ($q->result() as $r) {
            $arr = array('idaccount'=>$r->idaccount);
            $qlog = $this->db->get_where('accountlog',$arr)->row();
            echo $qlog->credit;

            $this->db->where($arr);
            // $this->db->update('accountlog',array('credit'=>$qlog->credit-$r->credit));
            // echo $r->debit.'<br>';
        }
           
    }

    function testgl()
    {
         $arrCurMonth = explode("-", '2015-12-30');
                $next = date("Y-m-d", strtotime($arrCurMonth[0] . "-" . $arrCurMonth[1] . "-01 +1 months"));
                echo $next;
    }
    
}
?>
