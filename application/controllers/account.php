<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class account extends MY_Controller {

    public function index() {
        
    }

    function getprefix($id) {
        $d = str_replace('%20', ' ', $id);
        $q = $this->db->get_where('classificationcf', array('classname' => $d))->row();
        echo json_encode(array('success' => true, 'prefix' => $q->prefixno, 'idclassificationcf' => $q->idclassificationcf));
    }

    function loaddata($id,$idunit=null) {
        if ($id != 0) {
            $sql = "SELECT a.idpos,a.idpos,g.namepos,a.idunit,a.idaccount,a.idclassificationcf,a.idparent,a.accnumber,a.tax,a.active,a.accname,a.balance,a.description,b.acctypename,c.classname,f.accname as accnameinduk
                        from account a
                        left join accounttype b ON a.idaccounttype = b.idaccounttype
                        left join classificationcf c ON a.idclassificationcf = c.idclassificationcf
                        left join account f On a.idparent = f.idaccount
                        left join accountpos g ON a.idpos = g.idpos
                        where a.display is null and a.idaccount = '$id'";
                        // if($idunit!=null)
                        // {
                            $sql.=" and a.idunit=".$this->session->userdata('idunit')."";
                        // }
           // echo $sql;
            $q = $this->db->query($sql);

            //         $q = $this->db->get_where('account', array('idaccount' => $id));
            if ($q->num_rows() > 0) {
                $r = $q->row();
                $json = "{
                                success: true,
                                data: {";

                $accnum = explode("-", $r->accnumber);

                $json .="idaccount: \"" . $r->idaccount . "\",";
                $json .="idparent: \"" . $r->idparent . "\",";
                $json .="idclassificationcf: \"" . $r->idclassificationcf . "\",";
                $json .="prefixno: \"" . $accnum[0] . "\",";
                $json .="accnumber: \"" . $accnum[1] . "\",";
                $json .="accname: \"" . $r->accname . "\",";
                $json .="tax: \"" . $r->tax . "\",";
                $json .="balance: \"" . $r->balance . "\",";
                $json .="description: \"" . $r->description . "\",";
                $json .="acctypename: \"" . $r->acctypename . "\",";
                $json .="classname: \"" . $r->classname . "\",";
                $json .="active: \"" . $r->active . "\",";
                $json .="idunit: \"" . $r->idunit . "\",";
                $json .="accnameinduk: \"" . $r->accnameinduk . "\",";
                $json .="namepos: \"" . $r->namepos . "\",";
                $json .="idpos: \"" . $r->idpos . "\",";

                $json .="}}";
            } else {
                echo "{
                                success: false,
                                message:'Data tidak ditemukan',
                                data: {}
                        }";
            }
        } else {
            $json = "{
                                success: true,
                                data: {";
            $json .="id: \"" . 0 . "\"";
            $json .="}}";
        }

        echo $json;
    }

    function getTreeMenu($PARENT) {
        $sql = "select a.display,a.idclassificationcf,a.idaccounttype,a.idparent,a.idaccount,a.accname,a.accnumber,a.balance,a.description,b.classname,c.acctypename,b.prefixno,active
                from account a
                left join classificationcf b ON a.idclassificationcf = b.idclassificationcf
                left join accounttype c ON a.idaccounttype = c.idaccounttype ";

        $accname = $this->input->get('accname');
        if ($accname != null) {
            $sql .="WHERE a.accnumber =  '" . $accname . "'
                    OR  a.accname  LIKE '%" . $accname . "%' ESCAPE '!'";
        } else {
            $sql.="WHERE a.idparent=$PARENT AND a.display is null";
        }
        $sql.=" ORDER BY a.idaccount";
        $query = $this->db->query($sql);
//        echo $this->db->last_query();
        return $query;
    }

    function getTree($idparent = null) {
        // $this->load->model('menu_admin_model');
        $this->load->library('JsonCI');


        if ($idparent != null && $_GET['node'] == 0) {
            $idnode = $idparent;
        } else {
            $idnode = $_GET['node'];
        }

        $arr_value = Array();
        if ($_GET['node'] == 'root') {
            $result = $this->getTreeMenu($idnode);
            foreach ($result->result_array() as $row) {
                
            }
        } else {
            $result = $this->getTreeMenu($idnode);

            foreach ($result->result_array() as $row) {
                $cek = $this->cekChildMenu($row['idaccount']);

                if ($row['idaccount'] != $idnode) {

                    $arr_value[] = array(
                        'id' => $row['idaccount'],
                        'idaccount' => $row['idaccount'],
                        'idaccounttype' => $row['idaccounttype'],
                        'accnumber' => $row['accnumber'],
                        'accname' => $row['accname'],
                        'text' => $row['accname'],
                        'balance' => $row['balance'],
                        'description' => $row['description'],
                        'classname' => $row['classname'],
                        'acctypename' => $row['acctypename'],
                        'prefixno' => $row['prefixno'],
                        'idclassificationcf' => $row['idclassificationcf'],
                        'leaf' => $cek,
                        'display' => $row['display'],
                        'idparent' => $row['idparent'],
                        'active' => $row['active']
                        , 'expanded' => true
                    );
                }
            }
        }
        $this->jsonci->sendJSON($arr_value);
    }

    function cekChildMenu($id) {
        $q = $this->db->get_where('account', array('idparent' => $id));
        if ($q->num_rows() > 0) {
            return false;
        } else {
            return true;
        }
    }

    function cekChildMenu2($id) {
        //kalo bukan superuser pake idunit
        if ($this->session->userdata('group_id') == 99) {
            if ($this->input->get('extraparams') != '') {
                $xtraparam = explode(":", $this->input->get('extraparams'));

                //buang alias
                $pecah = explode(".", $xtraparam[0]);
                if (count($pecah) > 1) {
                    $field = $pecah[1];
                } else {
                    //gak pake alias
                    $field = $xtraparam[0];
                }
                //

                $q = $this->db->get_where('account', array('display'=>null,'idparent' => $id, 'idunit' => 99, $field => $xtraparam[1]));
            } else {
                $q = $this->db->get_where('account', array('display'=>null,'idparent' => $id, 'idunit' => 99));
            }
        } else {
            if ($this->input->get('extraparams') != '') {
                $xtraparam = explode(":", $this->input->get('extraparams'));

                //buang alias
                $pecah = explode(".", $xtraparam[0]);
                if (count($pecah) > 1) {
                    $field = $pecah[1];
                } else {
                    //gak pake alias
                    $field = $xtraparam[0];
                }
                //

                $q = $this->db->get_where('account', array('display'=>null,'idparent' => $id, 'idunit' => 99, $field => $xtraparam[1]));
            } else 
                {
                    if($this->session->userdata('group_id')==1)
                    {
                        //administrator
                        $q = $this->db->get_where('account', array('display'=>null,'idparent' => $id, 'idunit' => $this->input->post('idunit')));
                    } else {
                        $q = $this->db->get_where('account', array('display'=>null,'idparent' => $id, 'idunit' => $this->session->userdata('idunit')));
                    }
                    
                }
        }

        if ($this->input->get('idunit') != '') {
            //rekues dari input pembelian
//             echo $this->db->last_query();
            $q = $this->db->get_where('account', array('display'=>null,'idparent' => $id, 'idunit' => $this->input->get('idunit')));
        } else if($this->input->get('namaunit')!='')
        {
            $qunit = $this->db->get_where('unit',array('display'=>null,'namaunit'=>$this->input->get('namaunit')))->row();
            $q = $this->db->get_where('account', array('display'=>null,'idparent' => $id, 'idunit' => $qunit->idunit));
        } else {
            $q = $this->db->get_where('account', array('display'=>null,'idparent' => $id));
        }

        if ($q->num_rows() > 0) {
            return 'false';
        } else {
            return 'true';
        }
    }

    function saveLink() {
        /*
         * cek akun sudah terhubung dengan yang lain, 
         * jika sudah hubungkan dengn akun baru dan pindahkan balancenya
         */
        $idaccount = $this->input->post('idaccount');
        $idlinked = $this->input->post('idlinked');
        $q = $this->db->get_where('linkedacc', array('idaccount' => $idaccount));

        $this->db->trans_begin();

        if ($q->num_rows() > 0) {
            //sudah ada
            $r = $q->row();

            //ambil balance
            $qacc = $q = $this->db->get_where('account', array('idaccount' => $r->idaccount))->row();

            $this->db->where('idlinked', $idlinked);
            $this->db->update('linkedacc', array('idaccount' => $idaccount));

            //pindahin balance lama->baru
            $this->db->where('idaccount', $idaccount);
            $this->db->update('account', array('balance' => $qacc->balance));

            $this->db->where('idaccount', $r->idaccount);
            $this->db->update('account', array('balance' => 0));
        } else {
            //belum ada langsung set
            $this->db->where('idlinked', $idlinked);
            $this->db->update('linkedacc', array('idaccount' => $idaccount));
        }

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            echo json_encode(array('success' => false, 'message' => 'Data Gagal Disimpan'));
        } else {
            $this->db->trans_commit();
            echo json_encode(array('success' => true, 'message' => 'Data Berhasil Disimpan'));
        }
    }

    function saveAccount() {
        $statusform = $this->input->post('stateformacc');
        $display = $this->input->post('display') == 'on' ? null : 1;
        $noakun = $this->input->post('prefixno') . '-' . $this->input->post('accnumber');
        $accname = $this->input->post('accname');
        $idaccount = $this->input->post('idaccount');
        $idunit = $this->input->post('idunit');

        $idmenu = $this->input->post('idmenu');
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

        //cek nomor & nama akun
        if ($idaccount == '') {
//            $q = $this->db->query(" 
//                        SELECT idaccount
//                       FROM account
//                       WHERE accnumber =  '$accname'
//                       AND idaccount !=  $idaccount");
            $q = $this->db->get_where('account', array('accnumber' => $noakun,'display'=>null, 'idunit' => $idunit));
//            echo $this->db->last_query();
            if ($q->num_rows() > 0) {
                $json = array('success' => false, 'message' => 'Nomor akun ' . $noakun . ' sudah ada di dalam database');
                echo json_encode($json);
                exit;
            }
        }
        
        $q = $this->db->get_where('account', array('accname' => $accname,'display'=>null,'idunit'=>$idunit));
        // echo $this->db->last_query();
        if ($q->num_rows() > 0 && $statusform == 'input') {
            $json = array('success' => false, 'message' => 'Nama akun ' . $accname . ' sudah ada di dalam database');
            echo json_encode($json);
            exit;
        }
        //end cek

        $balance = $this->input->post('balance');
        if ($balance != '') {
            $balance = str_replace(".", "", str_replace(",", "", $balance));
        } else {
            $balance = 0;
        }

        $idparent = $this->input->post('idparent');
        $idpos = $this->m_data->getID('accountpos', 'namepos', 'idpos', $this->input->post('namepos'));
        $d = array(
            'idaccounttype' => $this->m_data->getID('accounttype', 'acctypename', 'idaccounttype', $this->input->post('acctypename')),
//                'idaccount' bigint NOT NULL DEFAULT nextval('seq_account'::regclass),
            'idclassificationcf' => $this->input->post('idclassificationcf') == '' ? null : $this->input->post('idclassificationcf'),
//                'idlinked' =>$this->input->post('description')
            'idparent' => $idparent,
            'idpos' => $idpos,
            'accnumber' => $noakun,
            'accname' => $accname,
//                'tax' =>$this->input->post('description')
            'balance' => $balance,
            'active' => $this->input->post('active') == 'on' ? 'TRUE' : 'FALSE',
            'description' => $this->input->post('description'),
            'idunit' => $idunit
        );

        if ($statusform == 'edit') {
            //update balance : jumlahkan seluruh balance dari berdasarkan idparent (kalo main akun)
            
            if($idpos==1)
            {
                $d['balance'] = $this->sumBalanceByParent($this->input->post('idaccount'));
            }
            
            $d['usermod'] = $this->session->userdata('username');
            $d['datemod'] = date('Y-m-d H:m:s');
            $d['display'] = null;

            $arrWer = array(
                'idaccount' => $this->input->post('idaccount'),
                'display' => null,
                'idunit' => $idunit
            );
//            print_r($d);
            $this->db->where($arrWer);
            $this->db->update('account', $d);
           // echo $this->db->last_query();
            if ($this->db->affected_rows() > 0) {
                $json = array('success' => true, 'message' => 'Data berhasil disimpan');
            } else {
                $json = array('success' => false, 'message' => 'Data gagal disimpan');
            }
        } else {
            $d['userin'] = $this->session->userdata('username');
            $d['datein'] = date('Y-m-d H:m:s');
            $d['usermod'] = $this->session->userdata('username');
            $d['datemod'] = date('Y-m-d H:m:s');

            $this->db->insert('account', $d);
            if ($this->db->affected_rows() > 0) {
                $json = array('success' => true, 'message' => 'Data berhasil disimpan');
            } else {
                $json = array('success' => false, 'message' => 'Data gagal disimpan');
            }
        }
//        echo $this->db->last_query();
        echo json_encode($json);
    }

    function hapus() {
        //hapus akun
        $records = json_decode($this->input->post('postdata'));


        //cek dulu apakah akun tersebut masih terkait dengan default setup akun di tabel linkedacc
        $idhapusarr = array();
        foreach ($records as $id) {
            $idhapusarr[] = $id;
            $b = $this->subProsesCek($id);
            if ($b) {
                //true
            }
        }

        //hapus akun sampe ke akar-akarnya
        foreach ($records as $id) {
            if ($this->cekSubAkun($id)) {
                $this->db->where('idparent', $id);
            }
        }


        echo json_encode($jsondata);
    }

    function subProsesCek($id) {
        $q = $this->db->get_where('account', array('idparent' => $id));
        foreach ($q->result() as $r) {
            
        }
    }

    function prosesCek($id) {
        if ($this->cekSubAkun($id)) {
//            $this->subProsesCek($id);
//            $getdata = $this->db->get_where('account',array('idaccount'=>$id))->row();
//            
//            $q = $this->db->get_where('linkedacc',array('idaccount'=>$id));
//            if($q->num_rows()>0)
//            {
//                $r = $q->row();
//                //masih ada
//                $jsondata = array('success'=>false,'message'=>'Maaf, Akun <b>'.$getdata->accname.' ('.$getdata->accnumber.')</b>'.' tidak bisa dihapus karena masih terhubung dengan Linked Account <b>'.$r->namelinked.'</b> ');
//                echo json_encode($jsondata);
//                exit;
//            } else {
//                $this->subProsesCek($id);
//            }
        } else {
            return true;
        }
    }

    function cekSubAkun($id) {
        $q = $this->db->get_where('account', array('idparent' => $id));
        if ($q->num_rows() > 0) {
            //ada
            return true;
        } else {
            return false;
        }
    }

    function getTreeData($id, $active = null) {
        $jsontree = "{
                        \"text\": \".\",
                        \"children\": [" . $this->createMenu($id, $active) . "]}";
        echo $jsontree;
    }

    function createMenu($PARENT, $active) {

        $sql = "select a.idpos,d.namepos,a.lock,a.display,a.idclassificationcf,a.idaccounttype,a.idparent,a.idaccount,a.accname,a.accnumber,a.balance,a.description,b.classname,c.acctypename,b.prefixno,active
                from account a
                left join accounttype c ON a.idaccounttype = c.idaccounttype 
                left join classificationcf b ON c.idclassificationcf = b.idclassificationcf
                left join accountpos d ON a.idpos = d.idpos ";

        $accname = $this->input->get('accname');
        if ($accname != null) {
            $sql .="WHERE (a.accnumber LIKE  '" . strtolower($accname) . "' OR a.accnumber LIKE '" . strtoupper($accname) . "') 
                    OR (a.accname  LIKE '%" . strtolower($accname) . "%' OR a.accname  LIKE '%" . strtoupper($accname) . "%') 
                    OR (a.accname  LIKE '%" . ucwords($accname)."%' )";
                     // ESCAPE '!'
        } else if($active =='ByType') {
            //kalo windo popup akunnnya dicari berdasarkan idaccounttype
            $sql.="WHERE a.display is null";
        } else {
            $sql.="WHERE a.idparent=$PARENT AND a.display is null";
        }

        if ($active != null) {
            $sql.=" AND a.active='t'";
        }

        //kalo bukan superuser pake idunit
        if ($this->session->userdata('group_id') != 99 && $this->session->userdata('group_id') != 1) {
            $sql.=" AND a.idunit='" . $this->session->userdata('idunit') . "'";
        }

        if ($this->input->get('extraparams') != '') {
            $xtraparam = explode(":", $this->input->get('extraparams'));
            if ($xtraparam[1] != 'null') {
                $sql.=" AND $xtraparam[0]='" . $xtraparam[1] . "'";
            }
        }

        if ($this->input->get('idunit') != '') {
            //rekues dari input pembelian
            $sql.=" AND a.idunit='" . $this->input->get('idunit') . "'";
        }

        if ($this->input->get('namaunit') != '') {
            $qunit = $this->db->get_where('unit',array('namaunit'=>$this->input->get('namaunit')))->row();
            $sql.=" AND a.idunit='" . $qunit->idunit . "'";
        }

        if($this->input->get('idaccounttype')!='' && $PARENT!=0)
        {
            $sql.=" AND (";
            $idacctype = explode(",",$this->input->get('idaccounttype'));
//            echo count($idacctype);
            $i=1;
            foreach ($idacctype as $value) {
                $sql.=" a.idaccounttype=$value";
                if($i!=count($idacctype))
                {
                    $sql.=" OR";
                }
                $i++;
            }
            $sql.=")";

            // $sql.=" AND a.idpos=2";
        }

        if($this->input->get('notshowacctype')!='' && $PARENT!=0)
        {
            $sql.=" AND (";
            $idacctype = explode(",",$this->input->get('notshowacctype'));
//            echo count($idacctype);
            $i=1;
            foreach ($idacctype as $value) {
                $sql.=" a.idaccounttype!=$value";
                if($i!=count($idacctype))
                {
                    $sql.=" OR";
                }
                $i++;
            }
            $sql.=")";

            // $sql.=" AND a.idpos=2";
        // echo $sql;
        // exit;
        }

        // $sql.=" AND a.idunit!=99";
        if (strpos($sql,'a.idunit') === false) {
            exit;
        }

        $sql.=" ORDER BY a.idaccount";
        // echo $sql;
        $query = $this->db->query($sql);


        $menu = "";
        foreach ($query->result() as $r) {
            $leaf = $this->cekChildMenu2($r->idaccount);

            $menu .= "{";
            $menu .= "\"id\": \"$r->idaccount\",
                    \"text\": \"$r->accname\",
                    \"accnumber\": \"$r->accnumber\",
                    \"acctypename\": \"$r->acctypename\",
                    \"description\": \"$r->description\",
                    \"balance\": \"$r->balance\",
                    \"namepos\": \"$r->namepos\",
                    \"idparent\": \"$r->idparent\",
                    \"classname\": \"$r->classname\",
                    \"prefixno\": \"$r->prefixno\",
                    \"display\": \"$r->display\",
                    \"idaccount\": \"$r->idaccount\",
                    \"idclassificationcf\": \"$r->idclassificationcf\",
                    \"active\": \"$r->active\",
                    \"expanded\": false,
                    \"iconCls\": \"settings\",
                    \"lock\": \"$r->lock\",
                    \"leaf\": $leaf";
//            echo $leaf;
            if ($leaf == 'false') {
                if($this->input->get('node')!=0){
                    $menu .=",\"children\": [" . $this->makeSubMenu($r->idaccount, $active) . "]";
                }
            }

            $menu .="},";
        }
        return $menu;
    }

    function makeSubMenu($parent, $active) {
        return $this->createMenu($parent, $active);
    }

    function tesJsonTree($parent, $active = null) {

        $json = "{
                    \"text\": \".\",
                    \"children\": [
                        " . $this->createMenu($this->input->get('node'), $active) . "
                    ]
                }";
        echo $json;
    }

    function cekAccount() {
        //cek account sudah ada apa belum
        // if ($this->session->userdata('group_id') != 99) {
        if($this->session->userdata('idunit')!='null' && $this->input->post('idunit')=='')
        { 
            $q = $this->db->get_where('account', array('idunit' => $this->session->userdata('idunit')));
            if ($q->num_rows() > 0) {
                $j = array('success' => true);
            } else {
                $j = array('success' => false);
            }
        } else if($this->input->post('idunit')!='')
        {
            $q = $this->db->get_where('account', array('idunit' => $this->input->post('idunit')));
            if ($q->num_rows() > 0) {
                $j = array('success' => true);
            } else {
                $j = array('success' => false);
            }
        } else {
            $j = array('success' => true);
        }
        // } else {
        //     $j = array('success' => true);
        // }
        echo json_encode($j);
    }

    function createDefaultAkun() {

        $idunit = $this->input->post('idunit');
        $idunittemplate = $this->input->post('idunittemplate');
        if($idunittemplate=='')
        {
            $idunittemplate = 99;
        }

        $this->db->trans_begin();

        //create default akun untuk user baru dari idunit=99/template
        $q = $this->db->get_where('account', array('idunit' => $idunittemplate, 'active' => 'TRUE','display'=>null));
        foreach ($q->result() as $r) {
            // $qid = $this->db->query("select nextval('seq_account') as id")->row();

            $d = array(
                'idaccount' => $r->idaccount,
                'idaccounttype' => $r->idaccounttype,
                'idaccounttmp' => $r->idaccount,
                'idclassificationcf' => $r->idclassificationcf,
//                'idaccount' bigint NOT NULL DEFAULT nextval('seq_account'::regclass),
                'idaccounttype' => $r->idaccounttype,
//                'idlinked' =>$this->input->post('description')
                'idparent' => $r->idparent,
                'accnumber' => $r->accnumber,
                'accname' => $r->accname,
//                'tax' =>$this->input->post('description')
                'balance' => 0,
                'active' => $r->active,
                'description' => $r->description,
                'idpos' => $r->idpos,
                'lock' => $r->lock,
                'permanent' => $r->permanent,
                'idunit' => $idunit
            );
            $d['userin'] = 'systemwizard';
            $d['datein'] = date('Y-m-d H:m:s');
            $d['usermod'] = 'systemwizard';
            $d['datemod'] = date('Y-m-d H:m:s');

            $this->db->insert('account', $d);

            $dl = array(
                    'idaccount'=>$r->idaccount,
                    'idunit'=>$idunit
            );

            // biaya angkut pembelian
            if($r->idaccount==52)
            {
                
                $qcek = $this->db->get_where('linkedaccunit',$dl);
                if($qcek->num_rows()>0)
                {                    
                    $this->db->where($dl);
                    $dl['idlinked'] = 17;
                    $this->db->update('linkedaccunit',$dl);
                } else {
                    $dl['idlinked'] = 17;
                    $this->db->insert('linkedaccunit',$dl);
                }
                
            }
            // hutang usaha
            if($r->idaccount==32)
            {
                $qcek = $this->db->get_where('linkedaccunit',$dl);
                if($qcek->num_rows()>0)
                {                    
                    $this->db->where($dl);
                    $dl['idlinked'] = 14;
                    $this->db->update('linkedaccunit',$dl);
                } else {
                    $dl['idlinked'] = 14;
                    $this->db->insert('linkedaccunit',$dl);
                }
            }
            // kas
            if($r->idaccount==6)
            {
                $qcek = $this->db->get_where('linkedaccunit',$dl);
                if($qcek->num_rows()>0)
                {                    
                    $this->db->where($dl);
                    $dl['idlinked'] = 15;
                    $this->db->update('linkedaccunit',$dl);
                } else {
                    $dl['idlinked'] = 15;
                    $this->db->insert('linkedaccunit',$dl);
                }
            }
            // laba ditahan
            if($r->idaccount==42)
            {
                $qcek = $this->db->get_where('linkedaccunit',$dl);
                if($qcek->num_rows()>0)
                {                    
                    $this->db->where($dl);
                    $dl['idlinked'] = 3;
                    $this->db->update('linkedaccunit',$dl);
                } else {
                    $dl['idlinked'] = 3;
                    $this->db->insert('linkedaccunit',$dl);
                }
            }
            // laba periode berjalan
            if($r->idaccount==43)
            {
                $qcek = $this->db->get_where('linkedaccunit',$dl);
                if($qcek->num_rows()>0)
                {                    
                    $this->db->where($dl);
                    $dl['idlinked'] = 4;
                    $this->db->update('linkedaccunit',$dl);
                } else {
                    $dl['idlinked'] = 4;
                    $this->db->insert('linkedaccunit',$dl);
                }
            }
            // pph21
            if($r->idaccount==717)
            {
                $qcek = $this->db->get_where('linkedaccunit',$dl);
                if($qcek->num_rows()>0)
                {                    
                    $this->db->where($dl);
                     $dl['idlinked'] = 22;
                    $this->db->update('linkedaccunit',$dl);
                } else {
                     $dl['idlinked'] = 22;
                    $this->db->insert('linkedaccunit',$dl);
                }
            }
        }

//         //update id parent
//         $qparent = $this->db->get_where('account', array('idunit' => $idunit));
// //        echo $this->db->last_query();
//         foreach ($qparent->result() as $r) {
//             $q = $this->db->get_where('account', array('idaccounttmp' => $r->idparent, 'idunit' => $idunit))->row();

//             $update = $this->db->get_where('account', array('idparent' => $r->idparent, 'idunit' => $idunit));
//             foreach ($update->result() as $rr) {
//                 $this->db->where('idunit', $idunit);
//                 $this->db->where('idparent', $r->idparent);
//                 $this->db->where('idaccount', $rr->idaccount);
//                 if ($r->idparent == 0) {
//                     $this->db->update('account', array('idparent' => 0));
//                 } else {
//                     $this->db->update('account', array('idparent' => $q->idaccount));
//                 }
//             }
// //            echo '1 ';
// //            $q2 = $this->db->get_where('account',array('idaccounttmp'=>$r->idparent,'idunit'=>$this->session->userdata('idunit')))->row();
//         }


        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Rekening perkiraan gagal dibuat');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Rekening perkiraan berhasil dibuat');
        }

        echo json_encode($json);
    }

    function insertlinklagi()
    {
        $q=$this->db->get_where('unit',array('display'=>null));
        foreach ($q->result() as $r) {
            $qlink = $this->db->get('linkedacc');
            foreach ($qlink->result() as $rlink) {
                $qacc = $this->db->get_where('account',array('idunit'=>$r->idunit,'display'=>null));
                if($qacc->num_rows()>0)
                {
                    foreach ($qacc->result() as $racc) {
                        $dl = array(
                                'idaccount'=>$racc->idaccount,
                                'idunit'=>$r->idunit
                        );

                        // biaya angkut pembelian
                        if($racc->idaccount==52)
                        {
                            
                            $qcek = $this->db->get_where('linkedaccunit',$dl);
                            if($qcek->num_rows()>0)
                            {                    
                                $this->db->where($dl);
                                $dl['idlinked'] = 17;
                                $this->db->update('linkedaccunit',$dl);
                            } else {
                                $dl['idlinked'] = 17;
                                $this->db->insert('linkedaccunit',$dl);
                            }
                            
                        }
                        // hutang usaha
                        if($racc->idaccount==32)
                        {
                            $qcek = $this->db->get_where('linkedaccunit',$dl);
                            if($qcek->num_rows()>0)
                            {                    
                                $this->db->where($dl);
                                $dl['idlinked'] = 14;
                                $this->db->update('linkedaccunit',$dl);
                            } else {
                                $dl['idlinked'] = 14;
                                $this->db->insert('linkedaccunit',$dl);
                            }
                        }
                        // kas
                        if($racc->idaccount==6)
                        {
                            $qcek = $this->db->get_where('linkedaccunit',$dl);
                            if($qcek->num_rows()>0)
                            {                    
                                $this->db->where($dl);
                                $dl['idlinked'] = 15;
                                $this->db->update('linkedaccunit',$dl);
                            } else {
                                $dl['idlinked'] = 15;
                                $this->db->insert('linkedaccunit',$dl);
                            }
                        }
                        // laba ditahan
                        if($racc->idaccount==42)
                        {
                            $qcek = $this->db->get_where('linkedaccunit',$dl);
                            if($qcek->num_rows()>0)
                            {                    
                                $this->db->where($dl);
                                $dl['idlinked'] = 3;
                                $this->db->update('linkedaccunit',$dl);
                            } else {
                                $dl['idlinked'] = 3;
                                $this->db->insert('linkedaccunit',$dl);
                            }
                        }
                        // laba periode berjalan
                        if($racc->idaccount==43)
                        {
                            $qcek = $this->db->get_where('linkedaccunit',$dl);
                            if($qcek->num_rows()>0)
                            {                    
                                $this->db->where($dl);
                                $dl['idlinked'] = 4;
                                $this->db->update('linkedaccunit',$dl);
                            } else {
                                $dl['idlinked'] = 4;
                                $this->db->insert('linkedaccunit',$dl);
                            }
                        }
                        // pph21
                        if($racc->idaccount==717)
                        {
                            $qcek = $this->db->get_where('linkedaccunit',$dl);
                            if($qcek->num_rows()>0)
                            {                    
                                $this->db->where($dl);
                                 $dl['idlinked'] = 22;
                                $this->db->update('linkedaccunit',$dl);
                            } else {
                                 $dl['idlinked'] = 22;
                                $this->db->insert('linkedaccunit',$dl);
                            }
                        }
                    }
                } else {
                    $dl = array(
                                'idunit'=>$r->idunit
                        );
                    $dl['idlinked'] = $rlink->idlinked;
                    $this->db->insert('linkedaccunit',$dl);
                }                
            }
        }
    }

    function hapusakun2()
    {
        $retAkses = $this->cekAksesUser(8,'delete');
        if(!$retAkses['success'])
        {
            echo json_encode($retAkses);
            exit;
        }

        $this->db->trans_begin();

        $idaccount = $this->input->post('idaccount');
        $idunit = $this->input->post('idunit');
        $this->db->where(array('idaccount'=>$idaccount,'idunit'=>$idunit));
        $this->db->update('account',array('display'=>1));

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Akun gagal dihapus. Silahkan coba beberapa saat lagi.');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Akun berhasil dihapus');
        }

        echo json_encode($json);
    }

    function hapusakun()
    {
        $idaccount = $this->input->post('idaccount');
        $idunit = $this->input->post('idunit');
        // if ($this->db->trans_status() === FALSE) {
        //     $this->db->trans_rollback();
        //     $json = array('success' => false, 'message' => 'Rekening perkiraan gagal dibuat');
        // } else {
        //     $this->db->trans_commit();
        // account
        // accounthistory
        // accountlog
        // clossing
        // disbursment
        // asuransi //1

        $q = $this->db->get_where('inventorydeprecitem',array('idaccount'=>$idaccount,'idunit'=>$idunit));
        foreach ($q->result() as $r) {
            $this->db->delete('inventorydeprecitem',array('idaccount'=>$idaccount,'idunit'=>$idunit));
            $this->db->delete('inventorydeprec',array('iddepreciation'=>$r->iddepreciation,'idunit'=>$idunit));
        }

        $this->db->delete('inventoryunit',array('assetaccount'=>$idaccount,'idunit'=>$idunit));
        $this->db->delete('inventoryunit',array('akumpenyusutaccount'=>$idaccount,'idunit'=>$idunit));
        $this->db->delete('inventoryunit',array('depresiasiaccount'=>$idaccount,'idunit'=>$idunit));

// DELETE posts.*,projects.* 
// FROM posts
// INNER JOIN projects ON projects.project_id = posts.project_id
// WHERE projects.client_id = :client_id;

       $this->db->query("
            DELETE journalitem.*,journal.* 
            FROM journalitem
            INNER JOIN journal ON journal.idjournal = journalitem.idjournal
            WHERE journal.idunit = $idunit AND journalitem.idaccount=$idaccount;
        ");

       $this->db->where('idunit',$idunit);
       $this->db->where('idaccount',$idaccount);
       $this->db->update('linkedaccunit',array('idaccount'=>null));

       $this->db->delete('linkpiutang',array('idaccount'=>$idaccount,'idunit'=>$idunit));

       // piutangpayhistory
       // registrasipiutang

        // $this->db->query('delete from inventorydeprec a
        //                     join inventorydeprecitem b ON a.iddepreciation = b.iddepreciation
        //                     where b.idaccount=$idaccount and a.idunit=$idunit');

            $json = array('success' => true, 'message' => 'Rekening perkiraan berhasil dibuat');
        // }

        echo json_encode($json);
    }
    
    function refreshSaldo($idunit=null,$idparent=null)
    {
        if($idunit==null)
        {
            $idunit= $this->input->post('idunit');
        }

        if($idparent==null)
        {
            //update semua
            $q = $this->db->get_where('account',array('idunit'=>$idunit,'display'=>null));
            foreach ($q->result() as $r) {
                echo $r->accname.' <br>';
                $saldo = $this->sumBalanceByParent($r->idaccount);
                // echo 'saldo '.$saldo.' <br>';
                $this->db->where(array('idunit'=>$idunit,'idaccount'=>$r->idaccount));
                $this->db->update('account',array('balance'=>$saldo));
            }
        } else {
             $q = $this->db->get_where('account',array('idunit'=>$idunit,'display'=>null,'idparent'=>$idparent));
             // echo $this->db->last_query();
            foreach ($q->result() as $r) {
                // echo $r->accname.' ';
                $saldo = $this->sumBalanceByParent($r->idaccount);
                // echo 'saldo '.$saldo.' <br>';
                $this->db->where(array('idunit'=>$idunit,'idaccount'=>$r->idaccount));
                $this->db->update('account',array('balance'=>$saldo));
            }
        }
    }

    function cekPunyaGak($id)
    {
        $q = $this->db->get_where('account',array('idparent'=>$id));
        if($q->num_rows()>0)
        {
            return true;
        } else {
            return false;
        }
    }

    function sumBalanceByParent($idparent)
    {
        $balance = 0;
         //update balance : jumlahkan seluruh balance dari berdasarkan idparent
        $q = $this->db->get_where('account',array('idparent'=>$idparent));
        if($q->num_rows()>0)
        {

            foreach ($q->result() as $r)
            {
               // echo number_format($balance).' '.$r->accname.':'.number_format($r->balance).' <br>';
    //            echo number_format($balance).'<br>';
                $balance+=$r->balance;
                // if(!$this->cekPunyaGak($r->idaccount))
                // {
                $sumChild = $this->sumBalanceChild($r->idaccount,$balance);
                // echo 'idpos '.$r->idpos.' ';
                // if($r->idpos==1)
                // {

                // } else {
                $balance+=$sumChild;
                    // }
                // }
                
    //            echo ' sumChild: '.number_format($sumChild).' <br>';
                
    //            $balance+=$this->sumBalanceChild($r->idaccount,$balance);
            }
        } else {
            $q = $this->db->get_where('account',array('idaccount'=>$idparent));
            foreach ($q->result() as $r)
            {
                // echo $r->accname;
                $balance+=$r->balance;
            }
            
        }
        return $balance;
    }
    
    function sumBalanceChild($idparent,$balance)
    {
        $q = $this->db->get_where('account',array('idparent'=>$idparent));
        $total=0;
        if($q->num_rows()>0)
        {
            foreach ($q->result() as $r)
            {
                $total+=$r->balance;
//                echo number_format($balance).'+ <b>'.$r->accname.'</b>:'.number_format($r->balance).' ';
//                echo number_format($balance).'<br>';
                $balance+=$r->balance;
//               echo number_format($balance).'<br>';
                
                $balance+=$this->recurrChild($r->idaccount,$total);
            }
            return $total;
        } else {
            return 0;
        }
        
        
    }

    function deleteRegPiutang()
    {
        $this->db->trans_begin();

        $records = json_decode($this->input->post('postdata'));

        foreach ($records as $id) {
            $qpiutang = $this->db->get_where('registrasipiutang',array('idregistrasipiutang'=>$id))->row();
// echo $this->db->last_query();
            $qacc = $this->db->get_where('account',array('idaccount'=>$qpiutang->idaccount))->row();
            $newsaldo = $qacc->balance - $qpiutang->sisapiutang;

            $this->db->where('idregistrasipiutang',$id);
            $this->db->delete('registrasipiutang');

            $this->db->where('idaccount',$qpiutang->idaccount);
            $this->db->update('account',array('balance'=>$newsaldo));
        }

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Registrasi piutang gagal dihapus');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Registrasi piutang sukses dihapus');
        }

        echo json_encode($json);        
    }
    
    function recurrChild($idparent,$balance)
    {
//        echo " (recuring $balance) ";
        return $this->sumBalanceChild($idparent, $balance);
    }

    function saveLinkUnit()
    {
        $idlinked = $this->input->post('idlinked');
        $idaccount = $this->input->post('idaccount');
        $idunit = $this->input->post('idunit');

        $d = array(
            "idlinked" =>$idlinked,
            "idaccount" =>$idaccount,
            "idunit" =>$idunit
        );

        $wer = array('idlinked'=>$idlinked,'idunit'=>$idunit);
        $qcek = $this->db->get_where('linkedaccunit',$wer);

        $this->db->trans_begin();

        if($qcek->num_rows()>0)
        {
            $this->db->where($wer);
            $this->db->update('linkedaccunit',$d);
        } else {
            $this->db->insert('linkedaccunit',$d);
        }

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Gagal menyimpan data');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Data berhasil disimpan');
        }

        echo json_encode($json);  

    }

    function cekAccAsuransi()
    {
        //cek akun link ke idasuransi terkait sudah ada apa belum
        $idunit = $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit'));
        $idasuransi = $this->input->post('idasuransi');
        $q = $this->db->get_where('asuransiunit',array('idasuransi'=>$idasuransi,'idunit'=>$idunit));
        // echo $this->db->last_query();
        if($q->num_rows()>0)
        {
            $r = $q->row();

            if ($r->idaccountemp==null || $r->idaccountcomp==null) {
                $json = array('success' => false, 'message' => 'Akun Link(penghubung) beban premi belum terdefinisi. <br><br> Menu pengaturan akun link beban premi ada di menu: <br> <b>Pengaturan->Asuransi</b>');
            } else {
                $json = array('success' => true, 'message' => '');
            }

        } else {
             $json = array('success' => false, 'message' => 'asuransiunit undefined');
        }
       
        echo json_encode($json);
    }

    function saveLinkUnitInsurance()
    {
        $this->db->trans_begin();
        $arrwer = array(
                'idasuransi'=>$this->input->post('idasuransi'),
                'idunit'=>$this->input->post('idunit')
            );
        $arrUpdate = array(
                "idaccountemp" => $this->input->post('idaccountemp'),
                "idaccountcomp" => $this->input->post('idaccountcomp')
            );
        $this->db->where($arrwer);
        $this->db->update('asuransiunit',$arrUpdate);

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Gagal menyimpan data');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Data berhasil disimpan');
        }

        echo json_encode($json);  
    }

    function insertunitasuransi()
    {
        $q = $this->db->get('asuransi');
        foreach ($q->result() as $r) {
            # code...
            $q1 = $this->db->get('unit');
            foreach ($q1->result() as $r1) {
                $this->db->insert('asuransiunit',array('idasuransi'=>$r->idasuransi,'idunit'=>$r1->idunit));
            }
        }
    }

   

    function tesBalance($idparent){
       echo "<b>". number_format($this->sumBalanceByParent($idparent))."</b>";
    }

    function set_parent(){
        $q = $this->db->get_where('account',array('idunit'=>12));
        foreach($q->result() as $r){
            $q2 = $this->db->get_where('account',array('accnumber'=>$r->accnumber_parent,'idunit'=>12));
            if($q2->num_rows()>0){
                $r2 = $q2->row();
               $idparent = $r2->idaccount;
            } else {
                $idparent = 0;
            }

            $this->db->where('idaccount',$r->idaccount);
            $this->db->update('account',array('idparent'=>$idparent));
        }
    }

    function reset_coa_balance($idunit){
        //mereset saldo coa ke posisi saldo awal dari tabel accounthistory
        $qcoa = $this->db->get_where('account',array('idunit'=>$idunit));
        foreach($qcoa->result() as $rcoa){

            $qbalance = $this->db->query("select balance,idaccount
                                            from accounthistory
                                            where idunit = $idunit and idaccount = ".$rcoa->idaccount."
                                            order by datein asc
                                            limit 1");
            if($qbalance->num_rows()>0){
                $rbalance = $qbalance->row();

                $qlog = $this->db->query("select a.credit,b.memo
                                            from accountlog a
                                            join journal b ON a.idjournal = b.idjournal
                                            where a.idunit = $idunit and a.idaccount =  ".$rcoa->idaccount."
                                            order by a.datein asc
                                            limit 1");
                if($qlog->num_rows()>0){
                    $rqlog = $qlog->row();

                    $saldo = $rbalance->balance+$rqlog->credit;

                    //update
                    $this->db->where(array(
                        'idunit'=>$idunit,
                        'idaccount'=>$rcoa->idaccount
                    ));
                    $this->db->update('account',array(
                        'balance'=>$saldo
                    ));

                    //delete log
                    $this->db->query("delete
                        from accountlog a
                        where a.idunit = $idunit and a.idaccount =  ".$rcoa->idaccount."");

                    //delete history
                    $this->db->query("delete
                                            from accounthistory
                                            where idunit = $idunit and idaccount = ".$rcoa->idaccount."");
                }
            }
        }

    }

}

?>