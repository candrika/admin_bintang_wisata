<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Backend extends MY_Controller {

    public function index() {
    }

    function getRateTax($idtax) {
        $q = $this->db->get_where('tax', array('idtax' => $idtax))->row();
        echo json_encode(array('success' => true, 'rate' => $q->rate));
    }

    function getSequence() {
        $seqName = $this->input->post('seqName');
        $seqField = $this->input->post('seqField');
//        $q = $this->db->query("select nextval('$seqName') as noseq")->row();
        $q = $this->db->query("select max($seqField) as noseq from $seqName")->row();
        echo json_encode(array('success' => true, 'message' => $q->noseq + 1));
    }

    function definition($table) {
        
    }


    function check_stock_rm($job_order_id,$prod_material_id){
        $q  = $this->db->query("select a.idinventory,b.idinventory_parent,a.qty,b.sku_no,b.invno,a.job_item_id
                from prod_material a 
                join inventory b ON a.idinventory  = b.idinventory
                where a.job_order_id = ".$job_order_id." and a.prod_material_id = ".$prod_material_id."")->row();

        $q2  = $this->db->query("select job_item_id,size
                from job_item 
                where job_order_id = ".$job_order_id." and job_item_id = ".$q->job_item_id." ")->row();

        $q3 = $this->db->query("SELECT b.stock
                from inventory a 
                join warehouse_stock b ON a.idinventory = b.idinventory
                where a.idinventory = ".$q->idinventory." ");

        if($q3->num_rows()>0){
            $r3 = $q3->row();

            if($r3->stock<$q->qty){
                return 2; //invalid
            } else {
                return 1; //valid
            }
        } else {
            return 2; //invalid
        }
        
    }


    function loadFormData($data, $id = null, $dir = null) {

        if ($dir != null) {
            $dir = $dir . '/';
        }
//        echo $dir;
        $modelfile = $dir . 'm_' . $data;
        $this->load->model($modelfile, 'datamodel');

//        $this->load->model('m_' . $data, 'datamodel');
//        $pkfield = $this->datamodel->pkField();
//        $pkfield = explode(",", $pkfield);

        $arrWer = array();
        $extraparams = $this->input->post('extraparams');
        $arrPerParam = explode(",", $extraparams);

        foreach ($arrPerParam as $value) {
            $p = explode(":", $value);
            if (isset($p[1]))
                $arrWer[$p[0]] = $p[1];
        }

        $arrWer = array();
        if ($extraparams != '') {
            $wer = "";
            $p = explode(',', $extraparams);
            $jum = count($p);
            $i = 1;
            $arrWer = array();
            foreach ($p as $key => $value) {

                $vparam = explode(':', $value);
                if (preg_match('/null/', $vparam[1])) {
                    //null
                } else {
                    $wer .= $vparam[0] . "='$vparam[1]'";
                    if ($vparam[1] != 'undefined') {
                        $arrWer[$vparam[0]] = $vparam[1];
                    }
                }
                $i++;
            }
        } else {
            $wer = null;
        }

        $jum = count($arrWer);
        $i = 1;
        $wer = "";
        foreach ($arrWer as $key => $value) {
            if ($i < $jum) {
                // echo "DISISNI";
                $wer .= "$key='$value' AND ";
            } else {
                // echo 'a';
                $wer .= "$key='$value'";
            }
            $i++;
            # code...
        }


        if ($wer != '') {
            $sql = $this->datamodel->query() . " WHERE " . $wer;
        } else {
            $sql = $this->datamodel->query();
        }


        $q = $this->db->query($sql);
       // echo $this->db->last_query();
        if ($q->num_rows() > 0) {
            $r = $q->row();
//            var_dump($r);
            $field = $this->datamodel->selectField();
            $field = explode(",", $field);
            $json = "{
                                success: true,
                                data: {";
            foreach ($field as $value) {
                $v = explode(".", $value);
                if (count($v) > 1) {
                    //pake alias.. insert array ke 1
                    //apus spasi
                    // $vas = str_replace(" ", "", $v[1]);
                    $vas = $v[1];

                    //detek alias
                    $vas = explode(" as ", $vas);
                    if (count($vas) > 1) {
                        //pake alias
                        $a = $vas[1];
                        $json .="$vas[1]: \"" . str_replace(array("\r\n", "\n", "\r"), ' ',rtrim($r->$a)) . "\",";
                    } else {
                        $a = $v[1];
                        $json .="$v[1]: \"" . str_replace(array("\r\n", "\n", "\r"), ' ',rtrim($r->$a)) . "\",";
                    }
//                    $json .="$v[1]: \"" . $r->$v[1] . "\",";
                } else {
                    //detek alias
                    $vas = explode(" as ", $value);
                    if (count($vas) > 1) {
                        //pake alias
                        $b = rtrim($vas[1]);
                        $json .="$vas[1]: \"" . $r->$b . "\",";
                    } else {
                        if($value=='conversionmonth' || $value=='lastmonthfinanceyear')
                        {
                            if($r->$value!=0)
                            {
                                $json .="$value: \"" . ambilBulan($r->$value) . "\",";
                            } else {
                                $json .="$value: \"" . null . "\",";
                            }
                        } else {
                            $json .="$value: \"" . str_replace(array("\r\n", "\n", "\r"), ' ',$r->$value) . "\",";
                        }
                        
                    }
                }
            }
            $json .="}}";
        } else {
            $json = json_encode(array('success' => false, 'message' => 'Data tidak detemukan'));
        }

        echo $json;
    }

    function saveform($model, $dir = null) {
        if ($dir != null) {
            $dir = $dir . '/';
        }
//        echo $dir;
        $modelfile = $dir . 'm_' . $model;
        $this->load->model($modelfile, 'datamodel');
        $formstate = 'statusform' . $model;
       // echo "formstate:".$formstate." ";
        $statusform = $this->input->post($formstate);
        $idmenu = $this->input->post('idmenu');
        // echo 'statusform:'.$statusform;
        if($idmenu!='')
        {
            // hak akses
            $opsi = $statusform=='input' ? 'add' : $statusform;
            $retAkses = $this->cekAksesUser($idmenu,$opsi);
            // echo $this->db->last_query();
            if(!$retAkses['success'])
            {
                echo json_encode($retAkses);
                exit;
            }
            // hak akses
        }

        $d = $this->datamodel->updateField();
        $fc = $this->datamodel->fieldCek();
//        print_r($d);
        //cek existing data
        $pkfield = $this->datamodel->pkField();
        $pkfield = explode(",", $pkfield);
        $arrWer = array();
        foreach ($d as $key => $value) {
            foreach ($pkfield as $vpk) {
                if ($key == $vpk && $value != null) {
//                    echo $value;
                    $arrWer[$key] = $value;
                }
            }
        }

//        $this->db->where($arrWer);
//        $q = $this->db->get($this->datamodel->tableName());
//        echo count($arrWer)." ".$q->num_rows()." ".$this->db->last_query()."<hr>";
       // echo 's:'.$statusform;
        if ($statusform == 'edit') {
            //kalo display=0 artinya sudah dihapus, dapat diaktifkan kembali lewat proses update
//            $r = $q->row();
//            echo "statusform". $statusform;
//            if ($statusform == 'input' && $r->display == null) {
//                $json = array('success' => false, 'message' => 'Data sudah ada');
//            } else {
//                $d['usermod'] = $this->session->userdata('username');
//                $d['datemod'] = date('Y-m-d H:m:s');
//                $d['display'] = null;
//                $this->db->where($arrWer);
//                $this->db->update($this->datamodel->tableName(), $d);
//                if ($this->db->affected_rows() > 0) {
//                    $json = array('success' => true, 'message' => 'Data berhasil disimpan');
//                } else {
//                    $json = array('success' => false, 'message' => 'Data gagal disimpan');
//                }
//            }
            if($model=='RegHutang')
            {
                //dipindahin ke model

            } else if($model=='regPiutang')
                {
                        $q = $this->db->get_where('registrasipiutang',array('idregistrasipiutang'=>$this->input->post('idregistrasipiutang')))->row();
                        $jumlahSekarang = $q->jumlah;
                        $jumlahBaru = str_replace(".", "", $this->input->post('jumlah'));
                        $idjournal = $q->idjournal;

                        // $qjournal = $this->db->get_where('journalitem',array('idjournal'=>$idjournal))->row();
                        $account = $this->db->get_where('account',array('idaccount'=>$q->idaccount))->row();
                        $accountlink = $this->db->get_where('account',array('idaccount'=>$q->idaccountlink))->row();
                        // echo $this->db->last_query();

                        if($jumlahSekarang!=$jumlahBaru)
                        {
                            if($jumlahSekarang<$jumlahBaru)
                            {
                                //dikurangin
                                $selisih = $jumlahBaru-$jumlahSekarang;

                                //ditambah sisah hutangnya
                                $sisapiutang = $q->sisapiutang+$selisih;

                                $balanceaccount = $account->balance+$selisih;

                                if($accountlink->balance==0)
                                {
                                    $balanceaccountlink = $selisih;
                                } else {
                                    $balanceaccountlink = $accountlink->balance+$selisih;
                                }
                            } else {
                                //ditambah
                                $selisih = $jumlahSekarang-$jumlahBaru;

                                //dikurangin sisa hutangnya
                                $sisapiutang = $q->sisapiutang-$selisih;

                                $balanceaccount = $account->balance-$selisih;

                                if($accountlink->balance==0)
                                {
                                    $balanceaccountlink = 0;
                                } else {
                                    $balanceaccountlink = $accountlink->balance-$selisih;
                                }
                                
                            }

                           
                            $this->db->where(array('idjournal'=>$idjournal,'credit'=>0));
                            $this->db->update('journalitem',array('debit'=>$jumlahBaru));

                            $this->db->where(array('idjournal'=>$idjournal,'debit'=>0));
                            $this->db->update('journalitem',array('credit'=>$jumlahBaru));

                            $this->db->where('idregistrasipiutang',$this->input->post('idregistrasipiutang'));
                            $this->db->update('registrasipiutang',array('jumlah'=>$jumlahBaru,'sisapiutang'=>$sisapiutang));

                            $this->db->where(array('idjournal'=>$idjournal));
                            $this->db->update('journal',array('totaldebit'=>$jumlahBaru,'totalcredit'=>$jumlahBaru));

                            //update saldo akun
                            $this->db->where('idaccount',$q->idaccount);
                            $this->db->update('account',array('balance'=>$balanceaccount));
                            // echo $this->db->last_query();

                            $this->db->where('idaccount',$q->idaccountlink);
                            $this->db->update('account',array('balance'=>$balanceaccountlink));
                            // echo $this->db->last_query();

                        } else {
                            //kalo jumlahnya sama gak usah diupdate
                        }
                }

            $d['usermod'] = $this->session->userdata('userid');
            $d['datemod'] = date('Y-m-d H:m:s');
            $d['display'] = null;

            
             //cek tabel tersebut pakai idunit atau tidak. kalau ada. updetnya melihat idunit
            $qidunit = $this->db->query("SELECT column_name 
                                            FROM information_schema.columns 
                                            WHERE table_name='".$this->datamodel->tableName()."' and column_name='idunit'")->row();

            if(isset($qidunit->column_name))
            {
                if($qidunit->column_name=='idunit')
                {   
                    if($this->input->post('idunit')!=''){
                        $arrWer['idunit'] = $this->input->post('idunit');
                    } else {
                        $arrWer['idunit'] = $this->session->userdata('idunit');
                    }
                    // $arrWer['idunit'] = isset($this->input->post('idunit')) ? $this->input->post('idunit') : $this->session->userdata('idunit');
                    // echo $arrWer['idunit'].' ;idunit:'. $this->input->post('idunit');
                }
            }

            $this->db->where($arrWer);
            $this->db->update($this->datamodel->tableName(), $d);

            echo $this->db->last_query();

            if ($this->db->affected_rows() > 0) {
                $json = array('success' => true, 'message' => 'Data berhasil disimpan');
            } else {
                $json = array('success' => false, 'message' => 'Data gagal disimpan');
            }
        } else {
            $d['userin'] = $this->session->userdata('userid');
            $d['datein'] = date('Y-m-d H:m:s');
            $d['usermod'] = $this->session->userdata('userid');
            $d['datemod'] = date('Y-m-d H:m:s');

            if ($fc !== FALSE) {
                //cek udah ada apa belom
                foreach ($d as $key => $value) {
                    foreach ($fc as $keyfc => $valuefc) {
//                        echo $keyfc."==".$key."<br>";
                        if ($keyfc == $key) {

                              //cek tabel tersebut pakai deleted atau tidak
                            $qdeleted = $this->db->query("SELECT column_name 
                                                            FROM information_schema.columns 
                                                            WHERE table_name='".$this->datamodel->tableName()."' and column_name='deleted'")->row();
                            if(isset($qdeleted->column_name)){
                                if($qdeleted->column_name=='deleted')
                                    {
                                        $deleted = true;
                                    } else {
                                         $deleted = false;
                                    }
                                } else {
                                     $deleted = false;
                                }

                            //cek tabel tersebut pakai idunit atau tidak
                            $qidunit = $this->db->query("SELECT column_name 
                                                            FROM information_schema.columns 
                                                            WHERE table_name='".$this->datamodel->tableName()."' and column_name='idunit'")->row();

                            if(isset($qidunit->column_name))
                            {
                                if($qidunit->column_name=='idunit')
                                {   
                                    $validunit = $this->input->post('idunit') == '' ? $this->session->userdata('idunit') : null;

                                    if($deleted)
                                    {
                                        $wer = array($key => $value,'idunit'=>$validunit,'deleted'=>0);
                                    } else {
                                        $wer = array($key => $value,'idunit'=>$validunit);
                                    }
                                    $qcek = $this->db->get_where($this->datamodel->tableName(), $wer);
                                } else {
                                     if($deleted)
                                    {
                                        $wer = array($key => $value,'deleted'=>0);
                                    } else {
                                        $wer = array($key => $value);
                                    }

                                    $qcek = $this->db->get_where($this->datamodel->tableName(), $wer);
                                }  
                            } else {
                                 $wer = array($key => $value);
                                $qcek = $this->db->get_where($this->datamodel->tableName(), $wer);
                            }

                                                     
                            // echo $this->db->last_query();

                            if ($qcek->num_rows() > 0) {
                                $json = array('success' => false, 'message' => $valuefc . ' <b>' . $value . '</b> sudah ada di dalam database');
                                echo json_encode($json);
                                exit;
                            }
                        }
                    }
                }
            }

            //kalo fieldnya pake diset null,,diisii oleh sequence postgre
//            foreach ($d as $key => $value) {
//                foreach ($pkfield as $pkv) {
//                    
//                }                
//            }
//            print_r($d);

            //khusus modul company, kalo udah ada di database, harus diupdate, jadi dicek dulu
            if ($model == 'company') {
                $q = $this->db->get('company');
                if ($q->num_rows() > 0) {
                    $this->db->update($this->datamodel->tableName(), $d);
                } else {
                    $this->db->insert($this->datamodel->tableName(), $d);
                }
            } else if($model=='regPiutang')
                {
                    //modul registrasi piutang
                    //simpan tabel utama
                    $d['sisapiutang'] = $d['jumlah'];

                    if($this->input->post('statusformregPiutang')=='input')
                    {
                         //bikin jurnal
                        $this->load->model('m_journal');
                        $idjournal = $this->m_journal->saveRegistrasiPiutang($this->input->post('idunit'),$d['idaccount'],$this->input->post('tglpiutang'),str_replace(".", "", $this->input->post('jumlah')),$this->input->post('accnamepiutang'),$this->input->post('idaccountlink'));
                        $d['idjournal'] = $idjournal;
                        
                        $this->db->insert($this->datamodel->tableName(), $d);


                        // $qlink = $this->db->get_where('linkpiutang',array('idaccountpiutang'=>$d['idaccount']))->row();
                        // $idaccountlink = $qlink->idaccount;

                        // $this->db->where('idregistrasipiutang',$d['idregistrasipiutang']);
                        // $this->db->update('registrasipiutang',array('idjournal'=>$idjournal,'idaccountlink'=>$idaccountlink));
                    }
                }  else if($model=='RegHutang')
                    {

                        //modul registrasi hutang
                       
                            //simpan tabel utama
                            $this->db->insert($this->datamodel->tableName(), $d);

                            //bikin jurnal
                            $this->load->model('m_journal');
                            $idjournal = $this->m_journal->saveRegistrasiHutang($this->input->post('idunit'),$d['memo'],$d['idacchutang'],$d['idacckenahutang'],$d['mulaihutang'],$d['jumlah']);

                            $this->db->where('idregistrasihutang',$d['idregistrasihutang']);
                            $this->db->update('registrasihutang',array('idjournal'=>$idjournal));
                        
                    } else {
                            $this->db->insert($this->datamodel->tableName(), $d);
                        }

            if($model=='unitcompany')
            {
            //     //buat unit link
                $idunit = $d['idunit'];
                $q = $this->db->get('linkedacc');
                foreach ($q->result() as $r) {
                    $this->db->insert('linkedaccunit',array('idunit'=>$idunit,'idlinked'=>$r->idlinked));
                }

                //akunk link asuransi
                $q = $this->db->get('asuransi');
                foreach ($q->result() as $r) {
                        $this->db->insert('asuransiunit',array('idasuransi'=>$r->idasuransi,'idunit'=>$d['idunit']));
                }

            //     //link kode pajak
                $q = $this->db->get('tax');
                foreach ($q->result() as $r) {
                        $this->db->insert('taxlinkunit',array('idtax'=>$r->idtax,'idunit'=>$d['idunit']));
                }
            }


            //insert hak akses default untuk kelompok user
            if($model=='SysGroup')
            {
                $qmenu = $this->db->get_where('sys_menu',array('display'=>null));
                foreach ($qmenu->result() as $r) {
                        $datam = array(
                            "sys_menu_id" => $r->sys_menu_id,
                            "group_id" => $d['group_id'],
                            "view" => 'TRUE',
                            "edit" => 'TRUE',
                            "delete" => 'TRUE',
                            // "usermod" varchar(20),
                            // "datemod" timestamp(6),
                            "add" => 'TRUE'
                        );
                        $this->db->insert('hakakses',$datam);
                }
            }

            if ($this->db->affected_rows() > 0) {
                $json = array('success' => true, 'message' => 'Data berhasil disimpan');
            } else {
                $json = array('success' => false, 'message' => 'Data gagal disimpan');
            }
        }
        
        if($model=='SysMenu')
        {
            //buat atur hak akses menu per grup
            
            $sys_menu_id = $this->input->post('sys_menu_id');
            $group_name = $this->input->post('group_name');
            
                 if ($sys_menu_id != null || $sys_menu_id != '') {
//                        $idunitdiremove=null;
                        
                        $this->db->where('sys_menu_id',$sys_menu_id);
                        $this->db->delete('sys_group_menu');
                        
                        foreach ($group_name as $u) {
                            $group = $this->m_data->getID('sys_group', 'group_name', 'group_id', $u);
                            $qcek = $this->db->get_where('sys_group_menu',array('group_id'=>$group,'sys_menu_id'=>$sys_menu_id));
                            if($qcek->num_rows()>0)
                            {
        
                            } else {
                                $this->db->insert('sys_group_menu',array('group_id'=>$group,'sys_menu_id'=>$sys_menu_id));
                            }
                        }
                } else {
                    foreach ($group_name as $u) {
                        $group = $this->m_data->getID('sys_group', 'group_name', 'group_id', $u);
//                        echo $this->db->last_query(); 
                        $this->db->insert('sys_group_menu',array('group_id'=>$group,'sys_menu_id'=>$d['sys_menu_id']));
                    }
                }
        } //end if model=SysMenu
        
       // echo $this->db->last_query(); 
        echo json_encode($json);
    }

    public function ext_get_account($table, $dir = null, $idunit = null) {

        if ($dir != null) {
            // echo $dir.'/m_'.$table;
            $this->load->model($dir . '/m_' . $table, 'datamodel');
        } else {
            $this->load->model('m_' . $table, 'datamodel');
        }


        $extraparams = $this->input->post('extraparams');
//        if($extraparams!='')
//        {
//            $wer = "";
//            $p = explode(',', $extraparams);
//            foreach ($p as $key => $value) {
//                $vparam = explode(':', $value);
//                if($vparam[1]!='null' && $vparam[1]!='undefined')
//                {
//                    $wer .= $vparam[0]."='$vparam[1]'";
//                }                
//            }
//        } else {
//            $wer=null;
//        }
        $arrWer = array();
        if ($extraparams != '') {
            $wer = "";
            $p = explode(',', $extraparams);
            $jum = count($p);
            $i = 1;
            $arrWer = array();
            foreach ($p as $key => $value) {

                $vparam = explode(':', $value);
                if (preg_match('/null/', $vparam[1])) {
                    //null
                } else {
                    $wer .= $vparam[0] . "='$vparam[1]'";
                    if ($vparam[1] != 'undefined') {
                        $arrWer[$vparam[0]] = $vparam[1];
                    }
                }
                $i++;
            }
        } else {
            $wer = null;
        }

//         print_r($arrWer);
        $jum = count($arrWer);
        $i = 1;
        $wer = "";
        foreach ($arrWer as $key => $value) {
            if ($i < $jum) {
                // echo "DISISNI";
                $wer .= "$key='$value' AND ";
            } else {
                // echo 'a';
                $wer .= "$key='$value'";
            }
            $i++;
            # code...
        }

        $start = isset($_POST['start']) ? $_POST['start'] : 0;
        $limit = isset($_POST['limit']) ? $_POST['limit'] : 10;
        $page = $this->input->post('page');


        if ($page > 1) {
            if ($page == 2) {
                //problem saat clear search box, start-nya hilang
                $start = $limit;
            } else {
                $kali = $page - 1;
                $start = $limit * $kali;
            }
        }
// echo $page.' '.$start.' ';

        $w = " WHERE TRUE";

        if (isset($_POST['query'])) {

            $field = 0;

            foreach ($this->datamodel->searchField() as $key => $value) {
                if ($field == 0) {
                    // $w .="(";
                    $w.=" AND ((" . $value . " LIKE '%" . $_POST['query'] . "%') ";
                } else {
                    $w.=" OR (" . $value . " LIKE '%" . $_POST['query'] . "%') ";
                }
                $field++;
            }
            $w .=")";

            if ($extraparams != '' && $wer != '') {
                $w.=" AND $wer ";
            }
        } else if ($extraparams != '' && $wer != '') {
            $w.=" AND $wer ";
        }

        //query tambahan dari model
        if ($this->datamodel->whereQuery() != "") {
            $w.=" AND " . $this->datamodel->whereQuery() . " ";
        }

        ////////////////////////////////
        if($this->input->post('idaccounttype')!='')
        {
            $w.=" AND (";
            $idacctype = explode(",",$this->input->post('idaccounttype'));
//            echo count($idacctype);
            $i=1;
            foreach ($idacctype as $value) {
                $w.=" a.idaccounttype=$value";
                if($i!=count($idacctype))
                {
                    $w.=" OR";
                }
                $i++;
            }
            $w.=")";

            // $sql.=" AND a.idpos=2";
        }

        if($this->input->post('notshowacctype')!='')
        {
            $w.=" AND (";
            $idacctype = explode(",",$this->input->post('notshowacctype'));
//            echo count($idacctype);
            $i=1;
            foreach ($idacctype as $value) {
                $w.=" a.idaccounttype!=$value";
                if($i!=count($idacctype))
                {
                    $w.=" OR";
                }
                $i++;
            }
            $w.=")";

            // $sql.=" AND a.idpos=2";
        // echo $sql;
        // exit;
        }

        if($this->input->post('idunit')!='')
        {
            $w.=" AND a.idunit=".$this->input->post('idunit')." ";
        }

        // $sql.=" AND a.idunit!=99";
        if (strpos($w,'a.idunit') === false) {
            // echo $w;
            exit;
        } 

        /////////////////////////////////////////////


        $orderby = $this->datamodel->orderBy() != "" ? "ORDER BY " . $this->datamodel->orderBy() : null;
        $sql = $this->datamodel->query() . " $w " . $orderby . " LIMIT $limit OFFSET $start";

//        $sql= $this->datamodel->query()." $w LIMIT $limit OFFSET $start";
        // echo $sql;   
        $this->db->limit($start, $limit);
        $query_page = $this->db->query($sql);
        // echo $sql;       
        $arr = array();
        foreach ($query_page->result() as $obj) {
            // var_dump($obj); die;

            if($table=='clossinginvgrid')
            {
                if($obj->assetaccount==null || $obj->akumpenyusutaccount==null || $obj->depresiasiaccount==null)
                {
                    $obj->status = 'akunundefined';
                } else if($obj->assetaccount==0 || $obj->akumpenyusutaccount==0 || $obj->depresiasiaccount==0)
                {
                    $obj->status = 'akunundefined';
                } else if($obj->bebanperbulan==null)
                {
                    $obj->status = 'bebanundefined';
                } else {
                    $obj->status = 'true';
                }
            }

             $skip = false;
            if($obj->idparent!=null){    
                    // if($obj->idparent==756){
                    //     var_dump($obj);
                    // }           
                //cek apakah parent udah di delete
                $qcek = $this->db->query("select display 
                    from account where 
                    idaccount = ".$obj->idparent." ")->row();
                if($qcek->display==1){
                    // if($obj->idparent==756){
                    //     echo $this->db->last_query(); die;
                    // }
                    
                    $skip = true;
                }
            }

            if(!$skip) { 
                $arr[] = $obj;
            }
            
        }

        $query = $this->db->query($this->datamodel->query() . " $w");

        $results = $query->num_rows();
        echo '{success:true,numrow:' . $query->num_rows() . ',results:' . $results .
        ',rows:' . json_encode($arr) . '}';
    }


    public function ext_get_all($table, $dir = null, $idunit = null) {

        if ($dir != null) {
            // echo $dir.'/m_'.$table;
            $this->load->model($dir . '/m_' . $table, 'datamodel');
        } else {
            $this->load->model('m_' . $table, 'datamodel');
        }


        $extraparams = $this->input->post('extraparams');
//        if($extraparams!='')
//        {
//            $wer = "";
//            $p = explode(',', $extraparams);
//            foreach ($p as $key => $value) {
//                $vparam = explode(':', $value);
//                if($vparam[1]!='null' && $vparam[1]!='undefined')
//                {
//                    $wer .= $vparam[0]."='$vparam[1]'";
//                }                
//            }
//        } else {
//            $wer=null;
//        }
        $arrWer = array();
        if ($extraparams != '') {
            $wer = "";
            $p = explode(',', $extraparams);
            $jum = count($p);
            $i = 1;
            $arrWer = array();
            foreach ($p as $key => $value) {

                $vparam = explode(':', $value);
                if (preg_match('/null/', $vparam[1])) {
                    //null
                } else {
                    $wer .= $vparam[0] . "='$vparam[1]'";
                    if ($vparam[1] != 'undefined') {
                        $arrWer[$vparam[0]] = $vparam[1];
                    }
                }
                $i++;
            }
        } else {
            $wer = null;
        }

//         print_r($arrWer);
        $jum = count($arrWer);
        $i = 1;
        $wer = "";
        foreach ($arrWer as $key => $value) {
            if ($i < $jum) {
                // echo "DISISNI";
                $wer .= "$key='$value' AND ";
            } else {
                // echo 'a';
                $wer .= "$key='$value'";
            }
            $i++;
            # code...
        }

        $start = isset($_POST['start']) ? $_POST['start'] : 0;
        $limit = isset($_POST['limit']) ? $_POST['limit'] : 10;
        $page = $this->input->post('page');


        if ($page > 1) {
            if ($page == 2) {
                //problem saat clear search box, start-nya hilang
                $start = $limit;
            } else {
                $kali = $page - 1;
                $start = $limit * $kali;
            }
        }
// echo $page.' '.$start.' ';

        $w = " WHERE TRUE";

        if (isset($_POST['query'])) {

            $field = 0;
            $start = 0;

            foreach ($this->datamodel->searchField() as $key => $value) {
                if ($field == 0) {
                    // $w .="(";
                    $w.=" AND ((" . $value . " LIKE '%" . strtoupper($_POST['query']) . "%') OR (" . $value . " LIKE '%" . strtolower($_POST['query']) . "%')  OR (" . $value . " LIKE '%" . ucwords(strtolower($_POST['query'])) . "%')";
                } else {
                    $w.=" OR (" . $value . " LIKE '%" . strtoupper($_POST['query']) . "%') OR (" . $value . " LIKE '%" . strtolower($_POST['query']) . "%') OR (" . $value . " LIKE '%" . ucwords(strtolower($_POST['query'])) . "%')";
                }
                $field++;
            }
            $w .=")";

            if ($extraparams != '' && $wer != '') {
                $w.=" AND $wer ";
            }
        } else if ($extraparams != '' && $wer != '') {
            $w.=" AND $wer ";
        }

        //query tambahan dari model
        if ($this->datamodel->whereQuery() != "") {
            $w.=" AND " . $this->datamodel->whereQuery() . " ";
        }

        // if ($idunit != null && $idunit != 'null') {
        //     $w.=" AND a.idunit=$idunit ";
        // }

        $orderby = $this->datamodel->orderBy() != "" ? "ORDER BY " . $this->datamodel->orderBy() : null;
        $sql = $this->datamodel->query() . " $w " . $orderby . " LIMIT $limit OFFSET $start";

//        $sql= $this->datamodel->query()." $w LIMIT $limit OFFSET $start";
        // echo $sql;   die;
        $this->db->limit($start, $limit);
        $query_page = $this->db->query($sql);
        // echo $sql;       
        $arr = array();
        foreach ($query_page->result() as $obj) {
                
            // if($table=='ItemMaterialWO'){
            //     $obj->valid = $this->check_stock_rm($obj->job_order_id,$obj->prod_material_id);
            // }

            if($table=='clossinginvgrid')
            {
                if($obj->assetaccount==null || $obj->akumpenyusutaccount==null || $obj->depresiasiaccount==null)
                {
                    $obj->status = 'akunundefined';
                } else if($obj->assetaccount==0 || $obj->akumpenyusutaccount==0 || $obj->depresiasiaccount==0)
                {
                    $obj->status = 'akunundefined';
                } else if($obj->bebanperbulan==null)
                {
                    $obj->status = 'bebanundefined';
                } else {
                    $obj->status = 'true';
                }
            }

            if($table=='gridpayroll')
            {
                $obj->month = ambilBulan($obj->month);
            }

            if($table=='InventoryAll' || $table=='InventoryStock' || $table=='inventory_bywhs')
            {
                if($obj->bahan_coil_id!=null){
                    //ambil ke tabel konversi
                    $qcn = $this->db->query("select berat from bahan_coil where bahan_coil_id = ".$obj->bahan_coil_id."");
                    if($qcn->num_rows()>0){
                        $rqcn = $qcn->row();

                        if(isset($obj->totalstock)){
                            $obj->stock_kedua = $obj->totalstock / $rqcn->berat;
                        } else {
                            // $obj->stock_kedua = $obj->totalstock / $rqcn->berat;
                        }
                        
                    } else {
                        $obj->stock_kedua = 0;
                    }
                    
                } else {
                    $obj->stock_kedua = 0;
                }
            } 

            if($table=='sysmenuakses')
            {
                $this->db->select('menu_name');
                $qinduk = $this->db->get_where('sys_menu',array('sys_menu_id'=>$obj->parent,'display'=>null));
                if($qinduk->num_rows()>0)
                {
                    $rinduk = $qinduk->row();
                    $obj->text = $rinduk->menu_name." <img src='./assets/icons/fam/arrow_right.png'> ".$obj->menu_name;
                } else {
                    $obj->text = $obj->menu_name;
                }
            }

            $arr[] = $obj;
        }

        $query = $this->db->query($this->datamodel->query() . " $w");

        $results = $query->num_rows();
        echo '{success:true,numrow:' . $query->num_rows() . ',results:' . $results .
        ',rows:' . json_encode($arr) . '}';
        
        $query->free_result(); 
        $query_page->free_result(); 
    }

    public function exportxl($table, $tahun, $bulan, $kodebank) {
        // require '/var/www/hrdpay/assets/libs/phpexcel/php-excel.class.php';
        // // create a simple 2-dimensional array
        // $data = array(
        //         1 => array ('Name', 'Surname'),
        //         array('Schwarz', 'Oliver'),
        //         array('Test', 'Peter')
        //         );
        // // generate file (constructor parameters are optional)
        // $xls = new Excel_XML('UTF-8', false, 'My Test Sheet');
        // $xls->addArray($data);
        // $xls->generateXML('my-test');
        // $bulantahun = str_replace("T00:00:00", "", $periodepenggajian);
        // $bulantahun = explode("-", $bulantahun);
        // $bulan = $bulantahun[1];
        // $tahun = $bulantahun[0];
        require '/var/www/hrdpay/assets/libs/phpexport/php-export-data.class.php';
        $exporter = new ExportDataExcel('browser', 'test.xls');

        $exporter->initialize(); // starts streaming data to web browser

        $bank = 1;
        if ($bank == 1) {
            $exporter->addRow(array("No", "NAMA", "NO REKENING", "JUMLAH"));
        } else {
            $exporter->addRow(array("No", "NAMA", "NO REKENING", "JUMLAH"));
        }



        $bulan = ambilNoBulan($bulan);
        $sql = "select a.pegawainid,pegawainama,kodekeljab,nomorrek, nettobulan
                    from ms_pegawai a 
                    join (select nettobulan,pegawainid 
                            from gajibulanan where bulan='$bulan' AND tahun='$tahun') b ON a.pegawainid = b.pegawainid
                    WHERE TRUE AND a.pegawainid in(select pegawainid 
                                                            from gajibulanan where bulan='$bulan' AND tahun='$tahun') ";

        $query_page = $this->db->query($sql);

        $arr = array();
        $i = 1;
        foreach ($query_page->result() as $obj) {
            $arr[] = $obj;
            $exporter->addRow(array($i, $obj->pegawainama, $obj->nomorrek, $obj->nettobulan));
            $i++;
        }



        // $exporter->addRow(array(1, 2, 3, "123-456-7890"));


        $exporter->finalize(); // writes the footer, flushes remaining data to browser.

        exit(); // all done
    }

    public function ext_update($table) {
        $this->load->model('m_' . $table, 'datamodel');

        $view = json_decode($this->input->post('postdata'));

        $data = $this->datamodel->updateField($view);
        // print_r($data);

        if ($view != '') {

            //cek multiple PK
            $pkfield = $this->datamodel->pkField();
            $pkfield = explode(",", $pkfield);
            if (count($pkfield)) {
                //multitple pk id. didefinisikan di model
                $banyakwer = true;
                // $posdata = explode(":", $id);

                $pkarr = array();
                $i = 0;
                foreach ($pkfield as $key => $value) {
                    $pkarr[$value] = $data[$value];
                    $i++;
                }
                $this->db->where($pkarr);
                $q = $this->db->get($this->datamodel->tableName());
            } else {
                $banyakwer = false;
                $q = $this->db->get_where($this->datamodel->tableName(), array($this->datamodel->pkField() => $data[$this->datamodel->pkField()]));
            }
            //end cek
            // echo $this->db->last_query();

            if ($q->num_rows() > 0) {
                if ($banyakwer) {
                    $this->db->where($pkarr);
                } else {
                    $this->db->where($this->datamodel->pkField(), $data[$this->datamodel->pkField()]);
                }

                $this->db->update($this->datamodel->tableName(), $data);
            } else {
                $this->db->insert($this->datamodel->tableName(), $data);
            }
        } else {
            $this->db->insert($this->datamodel->tableName(), $data);
        }
    }

    public function ext_delete($table, $dir = null) {
        
        $idmenu = $this->input->post('idmenu');
        if($idmenu!='')
        {
            $retAkses = $this->cekAksesUser($idmenu,'delete');
            // echo $this->db->last_query();
            if(!$retAkses['success'])
            {
                echo json_encode($retAkses);
                exit;
            }
        }

        if ($dir != null) {
            // echo $dir.'/m_'.$table;
            $this->load->model($dir . '/m_' . $table, 'datamodel');
        } else {
            $this->load->model('m_' . $table, 'datamodel');
        }


        $this->db->trans_begin();

        $records = json_decode($this->input->post('postdata'));
        foreach ($records as $id) {
            $pkfield = $this->datamodel->pkField();
            $pkfield = explode(",", $pkfield);
            if (count($pkfield)) {
                //multitple pk id. didefinisikan di model

                $posdata = explode(":", $id);

                $pkarr = array();
                $i = 0;
                foreach ($pkfield as $key => $value) {
                    $pkarr[str_replace(" ", "", $value)] = $posdata[$i];
                    $i++;
                }
                // print_r($pkarr);
                $this->db->where($pkarr);
            } else {
                $this->db->where($this->datamodel->pkField(), $id);
            }

            if($table=='unitcompany')
            {
                //hapus unit link
                $this->db->where($this->datamodel->pkField(), $id);
                $this->db->delete('linkedaccunit');

                //hapus fk di user terkait
                $this->db->where('idunitbak',$id);
                $this->db->update('sys_user',array('idunitbak'=>null));

                $this->db->where('idunit',$id);
                $this->db->delete('userunit');
            }

            if($table=='SiswaGrid')
            {
                $this->db->where($this->datamodel->pkField(), $id);
                $this->db->delete('siswapembayaran');
            }

            if($table=='SysGroup')
            {
                $this->db->where($this->datamodel->pkField(), $id);
                $this->db->delete('hakakses');
            }

            $this->db->where($this->datamodel->pkField(), $id);



            if ($dir=='reference' || $table == 'TunjanganGrid' || $table == 'PotonganGrid' || $table == 'supplierGrid' || $table=='inventorysuppliergrid') {
                //delete pake display=0
                $this->db->update($this->datamodel->tableName(), array('display' => 0));
            } else if($table=='InventoryAll')
            {
                $this->db->update('inventory', array('display' => 0));
            } else {
                // $this->db->delete($this->datamodel->tableName());
                $this->db->update($this->datamodel->tableName(), array('deleted'=>1));
            }


           // echo $this->db->last_query();
        }

        if ($this->db->affected_rows()>0) {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Berhasil');
        } else {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Gagal');
        }

         echo json_encode($json);
    }

    public function ext_delete_tmp($table, $dir = null) {
        if ($dir != null) {
            // echo $dir.'/m_'.$table;
            $this->load->model($dir . '/m_' . $table, 'datamodel');
        } else {
            $this->load->model('m_' . $table, 'datamodel');
        }



        $records = json_decode($this->input->post('postdata'));
        foreach ($records as $id) {
            $pkfield = $this->datamodel->pkField();
            $pkfield = explode(",", $pkfield);
            if (count($pkfield)) {
                //multitple pk id. didefinisikan di model

                $posdata = explode(":", $id);

                $pkarr = array();
                $i = 0;
                foreach ($pkfield as $key => $value) {
                    $pkarr[str_replace(" ", "", $value)] = $posdata[$i];
                    $i++;
                }
                // print_r($pkarr);
                $this->db->where($pkarr);
                // $this->db->delete('asd');  
            } else {
                $this->db->where($this->datamodel->pkField(), $id);
                // $this->db->delete($this->datamodel->tableName());  
            }

            //delete pake display=0
            $this->db->update($this->datamodel->tableName(), array('display' => 0));
        }
    }

    public function ext_delete2($table, $dir = null) {
        if ($dir != null) {
            // echo $dir.'/m_'.$table;
            $this->load->model($dir . '/m_' . $table, 'datamodel');
        } else {
            $this->load->model('m_' . $table, 'datamodel');
        }



        $records = json_decode($this->input->post('postdata'));
        foreach ($records as $id) {
            echo $id;
            $pkfield = $this->datamodel->pkField();
            $pkfield = explode(",", $pkfield);
            if (count($pkfield)) {
                //multitple pk id. didefinisikan di model

                $posdata = explode(":", $id);

                $pkarr = array();
                $i = 0;
                foreach ($pkfield as $key => $value) {
                    $pkarr[str_replace(" ", "", $value)] = $posdata[$i];
                    $i++;
                }
                // print_r($pkarr);
                $this->db->where($pkarr);
                // $this->db->delete('asd');  
            } else {
                $this->db->where($this->datamodel->pkField(), $id);
                // $this->db->delete($this->datamodel->tableName());  
            }

            if ($table == 'AnggaranKso' || $dir == 'master') {
                //delete pake display=0
                $this->db->update($this->datamodel->tableName(), array('display' => 0));
            } else {
                $this->db->delete($this->datamodel->tableName());
            }
//            echo $this->db->last_query();
        }
    }

    public function ext_delete_batch($table) {
        $this->load->model('m_' . $table, 'datamodel');

        $this->db->trans_start();
// echo $table;
        $records = json_decode($this->input->post('postdata'));
        foreach ($records as $id) {

            //delete FK tabel
            $rel = $this->datamodel->relation();
            $jum = count($rel);
            for ($i = 0; $i < $jum; $i++) {
                // print_r($rel[$i]);
                $this->db->where($rel[$i][1], $id);
                $this->db->delete($rel[$i][0]);
            }
            //tabel master
            $this->db->where($this->datamodel->pkField(), $id);
            $this->db->delete($this->datamodel->tableName());
        }

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            echo json_encode(array('success' => false, 'message' => 'Gagal menghapus data'));
        } else {
            $this->db->trans_commit();
            echo json_encode(array('success' => true, 'message' => 'Sukses menghapus data'));
        }
    }

    public function get_category() {
        $query = $this->db->query("select sys_menu_group_id,group_name from sys_menu_group");
        $json = "{'rows':[";
        foreach ($query->result() as $data) {
            $json .= '{sys_menu_group_id:"' . $data->sys_menu_group_id .
                    '", group_name:"' . $data->group_name . '"},';
        }
        $json .= "]}";
        echo $json;
    }

    public function get_parent() {
        $query = $this->db->query("select sys_menu_id,menu_name from sys_menu where parent=0");
        $json = "{'rows':[";
        foreach ($query->result() as $data) {
            $json .= '{parent:"' . $data->sys_menu_id .
                    '", menu_name:"' . $data->menu_name . '"},';
        }
        $json .= "]}";
        echo $json;
    }

    function store_field($tableName) {
        //buat bikin field di store
        //diambil dari setiap module di model

        $this->load->model('m_' . $tableName, 'datamodel');
        $fields = $this->datamodel->selectField();
        $jsvar = "{ \"fields\": [";
        foreach ($fields as $key => $value) {
            $jsvar .= "{ \"name\": \"$key\"  , \"type\": \"$value\"    },";
        }
        $jsvar .= "]}";
        echo $jsvar;
    }

    function comboOrgInduk() {
        $field = array('kodeorginduk');
        $sql = "select DISTINCT kodeorginduk from org ORDER BY kodeorginduk limit 100 ";
        $q = $this->db->query($sql);

        $this->fetchJson($q, $field);
    }

    function comboJabatan() {
        $field = array('jabatandetail', 'nourutjab');
        $qj = $this->db->get_where('keljab', array('ketkeljab' => $_GET['ketkeljab']))->row();
        $sql = "select jabatandetail,nourutjab from tabjab where kodekeljab = '" . $qj->kodekeljab . "' ORDER BY jabatandetail,nourutjab";
        // echo $sql;
        $q = $this->db->query($sql);
        $this->fetchJson($q, $field);
    }

    function combounit() {
        $field = array('idunit', 'namaunit');
        if($this->session->userdata('group_id')==99)
        {
            // $idunit = $this->session->userdata('idunit');
//             $q = $this->db->get_where($data, array('idunit'=>$this->session->userdata('idunit')));
            $sql = "select idunit,namaunit from unit where idunit <> 99";
        } else
        {
            //administrtor       
            $idcompany = $this->session->userdata('idcompany');
             $quunit = $this->db->get_where('userunit',array('user_id'=>$this->session->userdata('userid'))); 
             // echo $this->db->last_query();
             $unit="";
             foreach ($quunit->result() as $rr) {
                 $qunit = $this->db->get_where('unit',array('idunit'=>$rr->idunit))->row(); 
                 $unit.= " idunit=".$qunit->idunit.' OR';
             }
             $unit=substr($unit, 0, -2);
             if($unit=="")
             {
                $unit=null;
             } else {
               $unit = "AND (".$unit.")"; 
             }
             
             $sql = "select idunit,namaunit from unit where idunit <> 99 $unit AND idcompany=$idcompany";
        }
        
        $q = $this->db->query($sql);
        $this->fetchJson($q, $field);
    }

    function combox($data, $id = null) {

        $param = "";
        $display=false;
        $d = array();
        $where_field = array();
        $orderby=false;
        $orderbyfield=null;
        if ($data == 'bussinestype') {
            $field = array('idbussinestype', 'namebussines');
        } else if ($data == 'sutri') {
            $field = array('nourutsutri', 'namasutri');
        } else if ($data == 'accounttype') {
            $field = array('idaccounttype', 'acctypename');
            $display=true;
            $orderby=true;
            $orderbyfield='acctypename';
        } else if ($data == 'taxtype') {
            $field = array('idtaxtype', 'nametypetax','rate');
        } else if ($data == 'inventorycat') {
            $field = array('idinventorycat', 'namecat');
        } else if ($data == 'supplier') {
            $field = array('idsupplier', 'namesupplier');
             $display=true;
        } else if ($data == 'tax') {
            $field = array('idtax', 'nametax', 'rate');
        } else if ($data == 'classificationcf') {
            $field = array('idclassificationcf', 'classname');
        } else if ($data == 'unit') {
            $field = array('idunit', 'namaunit');
        } else if ($data == 'product') {
            $field = array('product_id', 'product_code');
        } else if ($data == 'customer') {
            $orderby=true;
            $orderbyfield='namecustomer';
            $field = array('idcustomer', 'namecustomer');
            $where_field = array('namecustomer');
        } else if ($data == 'customertype') {
            $field = array('idcustomertype', 'namecustype');
        } else if ($data == 'employeetype') {
            $field = array('idemployeetype', 'nametype');
        } else if ($data == 'sys_user') {
            $field = array('user_id', 'realname');
        } else if ($data == 'scheduletype') {
            $field = array('idscheduletype', 'schname');
        } else if ($data == 'frequency') {
            $field = array('idfrequency', 'namefreq');
        } else if ($data == 'shipping') {
            $field = array('idshipping', 'nameshipping');
        } else if ($data == 'payment') {
            $field = array('idpayment', 'namepayment');
        } else if ($data == 'journaltype') {
            $field = array('idjournaltype', 'namejournal');
        } else if ($data == 'currency') {
            $field = array('idcurrency', 'namecurr', 'symbol');
        } else if ($data == 'accountpos') {
            $field = array('idpos', 'namepos');
        } else if ($data == 'sys_group') {
            $field = array('group_id', 'group_name');
        } else if ($data == 'tunjangantype') {
            $field = array('idtunjtype', 'nametunj');
        } else if ($data == 'siklus') {
            $field = array('idsiklus', 'namasiklus');
        } else if ($data == 'potongantype') {
            $field = array('idpotongantype', 'namepotongan');
        } else if ($data == 'amounttype') {
            $field = array('idamounttype', 'name');
        } else if ($data == 'payrolltype') {
            $field = array('payrolltypeid', 'payname');
        } else if ($data == 'tambahangajitype') {
            $field = array('idtambahangajitype', 'tambahantype');
            $display=true;
        } else if ($data == 'jenisptkp') {
            $field = array('idjenisptkp', 'namaptkp','deskripsi');           
        } else if ($data == 'pelanggantype') {
            $field = array('idpelanggantype', 'pelanggantype');
           
        } else if ($data == 'supplier_type') {
            $field = array('supplier_type_id', 'supplier_type_name');
        } else if ($data == 'machine_type') {
            $field = array('machine_type_id', 'machine_type_name');           
        } else if ($data == 'product_type') {
            $field = array('product_type_id', 'product_type_name');
        } else if ($data == 'productmeasurement') {
            $field = array('measurement_id', 'short_desc', 'long_desc');
        } else if ($data == 'productgrade') {
            $field = array('gradeid', 'name');
        } else if ($data == 'brand') {
            $field = array('brand_id', 'brand_name');
        } else if ($data == 'thickness') {
            $field = array('thickness_id', 'item_thickness_tct');
        } else if ($data == 'shippingaddress') {
            $data = "unit";
            $field = array('alamat', 'alamat2', 'alamat3');
        } else if ($data == 'warehouse') {
            $field = array('warehouse_id', 'warehouse_code','warehouse_desc','warehouse_type');
        } else if ($data == 'product_location') {
            $field = array('product_location_id', 'location_name');
        } else if ($data == 'payment_term') {
            $field = array('id_payment_term', 'term_name');
        }else if ($data == 'business') {
            $field = array('business_id', 'business_name');
        }
        //------------------------------//
          else if ($data == 'purchasestatus') {
            $field = array('idpurchasestatus', 'name');
        } else if ($data == 'purchasetype') {
            $field = array('idpurchasetype', 'namepurchase');
        } else if ($data == 'shipaddress') {
            $data = "unit";
            $field = array('alamat', 'alamat2', 'alamat3');
        } else if ($data == 'project') {
            $field = array('idproject', 'projectname');
        } else if ($data == 'location') {
            $field = array('location_id', 'location_name');
        } else if ($data == 'poly_type') {
            $field = array('polytpe_id', 'polytpe_name');
        } else if ($data == 'staff_type') {
            $field = array('staff_type_id', 'staff_type_name');
        } 

        if($orderby)
        {
            $this->db->order_by($orderbyfield);
        }

        $searchStr = $this->input->get('searchStr');
        if(count($where_field)>0 && $searchStr!=''){
            //remote query search combobox
            

            // if(count($where_field)>0){
                foreach($where_field as $v){
                    // $this->db->where();
                    $this->db->like($v,strtolower($searchStr));
                    $this->db->or_like($v,strtoupper($searchStr));
                    $this->db->or_like($v,ucwords(strtolower($searchStr)));
                }
                // >where('type','staff')
                
            // }
        }

        if (isset($_GET['xtraparam'])) {
            $p = explode('=', $_GET['xtraparam']);
            $this->db->where($p[0], $p[1]);
            // $q = $this->db->get_where($data, array($p[0] => $p[1]));
        } 
        if (isset($_POST['xtraparam'])) {
            $p = explode('=', $_GET['xtraparam']);
            $this->db->where($p[0], $p[1]);
            // $q = $this->db->get_where($data, array($p[0] => $p[1]));
        } 

        if ($data == 'unit') {
            if($this->session->userdata('group_id')!=99){
                $this->db->where('idunit', $this->session->userdata('idunit'));
                // $q = $this->db->get_where($data, array('idunit'=>$this->session->userdata('idunit')));
            } 
            // else {
            //     // super user/admin
            //      $q = $this->db->get($data);
            // }
        } else {

             $qdeleted = $this->db->query("SELECT column_name 
                                                            FROM information_schema.columns 
                                                            WHERE table_name='".$data."' and column_name='deleted'")->row();

             $qdisplay = $this->db->query("SELECT column_name 
                                                            FROM information_schema.columns 
                                                            WHERE table_name='".$data."' and column_name='display'")->row();
            
             if(isset($qdisplay->column_name))
             {
                $col_display = $qdisplay->column_name = 'display' ? true : false;
            } else {
                $col_display = false;
            }
            

            if($qdeleted)
            {
                if($qdeleted->column_name=='deleted')
                {
                    // $deleted = true;
                    if($col_display) { $this->db->where('display',null); }
                    
                    $this->db->where('deleted', 0);
                    $this->db->where('status', 1);
                } else {
                     // $deleted = false;
                     if($col_display)
                    {
                        if($display) $this->db->where('display',null);
                    }
                    if(strpos($data, 'sys_') === false){
                        $this->db->where('deleted', 0);
                        $this->db->where('status', 1);
                    }
                }
            } else {
                if($col_display)
                {
                    if($display) $this->db->where('display',null);
                }

                    if(strpos($data, 'sys_') === false){
                        $this->db->where('deleted', 0);
                        $this->db->where('status', 1);
                    }
            }
            

         
            // $q = $this->db->get($data);
        }

       

        $q = $this->db->get($data);

        // header('Content-Type: text/javascript; charset=UTF-8');

        // header('Access-Control-Allow-Origin: *');
        // header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
        $this->fetchJson($q, $field);
    }

    function cb($werfield,$query){
        // $query = 'query';
        // $wer = array('namecustomer','idcustomer','nocustomer');
        $str = '';
        if(count($werfield)>0){
            foreach($werfield as $v){
                $str.= " and ($v like '%".strtolower($query)."%' OR $v like '%".strtoupper($query)."%' OR $v like '%".ucwords(strtolower($query))."%')";
                // $str.= " and ($v like '%".ucwords(strtolower($query))."%' )";
            }
        }
        return $str;
    }

    function comboxTahunPayroll()
    {
        $field = array('year');
        $q = $this->db->query('select DISTINCT year from payroll');

        header('Content-Type: text/javascript; charset=UTF-8');

        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
        $this->fetchJson($q, $field);
    }

    function feedMonth() {
        $arrMonth = array('01' => 'Januari', '02' => 'Februari', '03' => 'Maret', '04' => 'April', '05' => 'Mei', '06' => 'Juni', '07' => 'Juli', '08' => 'Agustus', '09' => 'September', '10' => 'Oktober', '11' => 'Nopember', '12' => 'Desember');

        $json = "{
                \"success\": true,
                \"dat\": [";

        foreach ($arrMonth as $key => $value) {
            $json .= "{";
            $json .="\"nobulan\": \"" . $key . "\"," . "\"namabulan\": \"" . $value . "\"";
            $json .= "},";
        }

        $json .="]}";
        // $json = str_replace(" ", "", $json);
        echo $json;
    }

    function fetchJson($q, $field) {
        // echo $this->db->last_query();
        $num = $q->num_rows();
        if ($num > 0) {
            $success = 'true';

            //bikin data array
            $i = 0;
            foreach ($q->result_array() as $r) {
                for ($if = 0; $if < count($field); $if++) {
                    $d[$i][$field[$if]] = $r[$field[$if]];
                }
                $i++;
            }
        } else {
            $success = 'false';
        }

        //bikin notasi json dari data array diatas
        $json = "{\"success\": $success,\"dat\": [";
//           $json = "[";
        // $i=0;
        $j = 1;
        for ($i = 0; $i < $num; $i++) {
            $json .= "{";

            for ($if = 0; $if < count($field); $if++) {
                # code...
//                echo $d[$i][$field[$if]].' ';
                $json .="" . $field[$if] . ": '" . $d[$i][$field[$if]] . "'";

                $c = count($field);
                $c--;
//                echo $if." < ".$c." ";
                if ($if != $c) {
                    $json .=",";
                }
            }

            if ($j == $num) {
                $json .= "}";
            } else {
                $json .= "},";
            }
            $j++;
        }

//        $json .="]";
        $json .="]}";
//         $json = str_replace(" ", "", $json);
        echo $json;
    }

    function fetchJson2($q, $field) {
        // echo $this->db->last_query();
        $num = $q->num_rows();
        if ($num > 0) {
            $success = 'true';

            //bikin data array
            $i = 0;
            foreach ($q->result_array() as $r) {
                for ($if = 0; $if < count($field); $if++) {
                    $d[$i][$field[$if]] = $r[$field[$if]];
                }
                $i++;
            }
        } else {
            $success = 'false';
        }

        //bikin notasi json dari data array diatas
//        $json = "{
//                \"success\": $success,
//                \"dat\": [";
        $json = "[";

        // $i=0;
        $j = 1;
        for ($i = 0; $i < $num; $i++) {
            $json .= "{";

            for ($if = 0; $if < count($field); $if++) {
                # code...
                $json .="" . $field[$if] . ": '" . $d[$i][$field[$if]] . "'";

                $c = count($field);
                $c--;
//                echo $if." < ".$c." ";
                if ($if != $c) {
                    $json .=",";
                }
            }

            if ($j == $num) {
                $json .= "}";
            } else {
                $json .= "},";
            }
            $j++;
        }

        $json .="]";
//        $json .="]}";
        // $json = str_replace(" ", "", $json);
        echo $json;
    }

    function cetak($modul,$id)
    {
        // $modul=$this->input->get('modul');
        // $id=$this->input->get('id');
        if($modul=='penerimaansiswa')
        {
            $this->load->model('money/m_historypembayaransiswa','model');
            $d['data'] = $this->model->cetak($id);
            $d['title'] = 'Bukti Pembayaran';
            $this->load->view('tplcetak/penerimaansiswa',$d);
        } else if($modul=='receivemoney')
            {
                $this->load->model('money/m_receivemoney','model');

                $d['data'] = $this->model->cetak($id);
                $d['title'] = 'Bukti Penerimaan';
                  // print_r($d); die;
                $this->load->view('tplcetak/penerimaan',$d);
            } else if($modul=='spendmoney')
            {
                //buat cetak pengeluaran kas
                $this->load->model('money/m_spendmoney','model');
                $d['data'] = $this->model->cetak($id);
                $d['title'] = 'Bukti Pengeluaran';
                $this->load->view('tplcetak/pengeluaran',$d); 
            }  else if($modul=='purchase')
                {
                    $this->load->model('purchase/m_purchaseall','model');
                    $d['data'] = $this->model->cetak($id);
                    $d['title'] = 'FAKTUR PEMBELIAN';
                    $this->load->view('tplcetak/pembelian',$d);
                } else if($modul=='Return')
                    {
                        $this->load->model('purchase/m_return','model');
                        $d['data'] = $this->model->cetak($id);
                        $d['title'] = 'FAKTUR RETUR';
                        $this->load->view('tplcetak/retur',$d);
                    } else if($modul=='piutang_history')
                        {
                            $this->load->model('hutangpiutang/m_piutangbayar','model');
                            $d['data'] = $this->model->cetak($id);
                            $d['title'] = 'KWITANSI PENERIMAAN';
                            $this->load->view('tplcetak/piutang_history',$d);
                        }
    }

    function cmb() {
        echo "{\"success\":true,
                \"dat\":[{\"agamakode\":\"2\",\"agamanama\":\"KRISTEN\"}]}";
    }

    function teslasabsen() {
//         $date = '2011/10/14'; 
// $day = date('D', strtotime($date));
// echo $day;

        $this->load->model('m_user');
        echo $this->m_user->cekAbsenSebelumnya('5171084L', '04', '2014');
    }

    function replacedata() {
        $db = $this->load->database('sipeg', TRUE);
        $q = $db->get('tjabstruktural');
        foreach ($q->result() as $r) {
            $qcek = $this->db->get_where('tjabstruktural', array('kdtgktunit' => $r->kdtgktunit, 'kdjenjang' => $r->kdjenjang, 'kddaerah' => $r->kddaerah, 'kodesubunit' => $r->kodesubunit));
            $d = array(
                'kdjenjang' => $r->kdjenjang,
                'kddaerah' => $r->kddaerah,
                'kodesubunit' => $r->kodesubunit,
                'nilai' => $r->nilai,
                'kdtgktunit' => $r->kdtgktunit,
                'display' => null
            );
            if ($qcek->num_rows() > 0) {
                $this->db->where(array('kdtgktunit' => $r->kdtgktunit, 'kdjenjang' => $r->kdjenjang, 'kddaerah' => $r->kddaerah, 'kodesubunit' => $r->kodesubunit));
                $this->db->update('tjabstruktural', $d);
            } else {
                $this->db->insert('tjabstruktural', $d);
            }
        }
    }

    function abc() {
        $this->db->where('penugasannama !=', '');
        $q = $this->db->get('rtugas');
        foreach ($q->result() as $r) {
            $qq = $this->db->query("select nextval('seq_rtugas'::regclass) as no")->row();
            $this->db->where('penugasannama', $r->penugasannama);
            $this->db->where('pegawainid', $r->pegawainid);
            $this->db->update('rtugas', array('nortugas' => $qq->no));
        }
    }

    function insertmenu() {
        $q = $this->db->get_where('sys_group_menu',array('group_id'=>99));
        // echo $this->db->last_query()."<br>";
        foreach ($q->result() as $r) {
            $this->db->insert('sys_group_menu', array('sys_menu_id' => $r->sys_menu_id, 'group_id' => 2));
            echo $this->db->last_query()."<br>";
        }
    }

    function linkunit()
    {
        $q = $this->db->get('linkedacc');
        foreach ($q->result() as $r) {
            $qu = $this->db->get('unit');
            foreach ($qu->result() as $ru) {
                $qc = $this->db->get_where('linkedaccunit',array('idlinked'=>$r->idlinked,'idunit'=>$ru->idunit));
                if($qc->num_rows()>0)
                {

                } else {
                    $this->db->insert('linkedaccunit',array('idlinked'=>$r->idlinked,'idunit'=>$ru->idunit));
                }
                
            }
        }
    }

    function tesexec()
    {
        $datbaseName = 'aktivadb';
        $userName = 'imm';
        $password = 'imm';
        $timeStampValue = time();
        $saveLocation = "C:\xampp\htdocs\aktiva";

        // $createBackup = "pg_dump -U" . $userName. "-Fp " .$datbaseName. " > " . $saveLocation.$timeStampValue."."."sql";
        echo exec("C:\Program Files (x86)\PostgreSQL\9.1\bin\pg_dump -U imm -Fp aktivadb -f aktivadbexec.backup");
        // echo exec("whoami");
    }

}
