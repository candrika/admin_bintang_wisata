<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Dashboard extends MY_Controller {

    /**
     * Index Page for this controller.
     *
     * Maps to the following URL
     * 		http://example.com/index.php/welcome
     * 	- or -  
     * 		http://example.com/index.php/welcome/index
     * 	- or -
     * Since this controller is set as the default controller in 
     * config/routes.php, it's displayed at http://example.com/
     *
     * So any other public methods not prefixed with an underscore will
     * map to /index.php/welcome/<method_name>
     * @see http://codeigniter.com/user_guide/general/urls.html
     */
    public function index() {
        $this->smarty->display('dashboard.tpl');
    }

    function page() {
        $this->load->view('/dashboard/dashboard_page');
    }

    function html_page() {
        // $this->load->view('/dashboard/dashboard_html');
    }


    function logout() {
        $this->session->sess_destroy();
        redirect('login');
    }

    function getTreeMenu($idparent = null) {
        $this->load->model('menu_admin_model');
        $this->load->library('JsonCI');


        if ($idparent != null && $_GET['node'] == 0) {
            $idnode = $idparent;
        } else {
            $idnode = $_GET['node'];
        }

        $arr_value = Array();
        if ($_GET['node'] == 'root') {
            $result = $this->menu_admin_model->getTreeMenu($idnode);

            foreach ($result->result_array() as $row) {
                // if($row['type']==0)
                //     $arr_value[] = array(
                //         'id'            => $row['sys_menu_id'],
                //         'text'          => $row['menu_name'],
                //         'iconCls'       => 'icon-folder',
                //         'hrefTarget'       => $row['menu_link'],
                //     );
                // else
                //     $arr_value[] = array(
                //         'id'            => $row['sys_menu_id'],
                //         'text'          => $row['menu_name'],
                //         'iconCls'       => $row['icon'] =='' ? 'open-folder' : $row['icon'],
                //         'hrefTarget'       => $row['menu_link'],
                //         'leaf'          => true
                //     );
                // open-folder
            }
        } else {
            $result = $this->menu_admin_model->getTreeMenu($idnode);

            foreach ($result->result_array() as $row) {
                $cek = $this->cekChildMenu($row['sys_menu_id']);
                if ($cek && $row['icon'] == '') {
                    $icon = 'open-folder';
                } else {
                    $icon = $row['icon'];
                }
                // echo $icon;
                $arr_value[] = array(
                    'id' => $row['sys_menu_id'],
                    'text' => $row['menu_name'],
                    'first_load_store_id' => $row['first_load_store_id'],
                    'iconCls' => $icon, //$cek == true ? 'open-folder' : 'icon-folder', //$row['icon'] =='' ? 'open-folder' : $row['icon'],
                    'hrefTarget' => $row['menu_link'],
                    'qtip' => $row['description'],
                    'leaf' => $cek
                );
            }
        }
        $this->jsonci->sendJSON($arr_value);
    }

    function cekChildMenu($id) {
        $this->db->order_by('sort');
        $q = $this->db->get_where('sys_menu', array('parent' => $id, 'display' => null));
        if ($q->num_rows() > 0) {
            return false;
        } else {
            return true;
        }
    }

    public function ext_get_all() {
        $start = isset($_POST['start']) ? $_POST['start'] : 0;
        $limit = isset($_POST['limit']) ? $_POST['limit'] : 10;

        $w = " WHERE TRUE ";

        if (isset($_POST['query'])) {
            $w.=" AND (menu_name LIKE '%" . $_POST['query'] . "%' ";
            $w.=" OR menu_link LIKE '%" . $_POST['query'] . "%') ";
        }
        $sql = "select * from sys_menu a join sys_menu_group b ON a.id_group = b.sys_menu_group_id $w";
        $this->db->limit($start, $limit);
        $query_page = $this->db->query($sql);
        $arr = array();
        foreach ($query_page->result() as $obj) {
            $arr[] = $obj;
        }
        $query = $this->db->query($sql);
        $results = $query->num_rows();
        echo '{success:true,numrow:' . $query->num_rows() . ',results:' . $results .
        ',rows:' . json_encode($arr) . '}';
    }

    public function ext_update() {
        $view = json_decode($this->input->post('postdata'));
        foreach ($view as $key => $row) {
            $data = array(
                'sys_menu_id' => $row->sys_menu_id,
                'menu_name' => $row->menu_name,
                'menu_link' => $row->menu_link,
                'parent' => $row->parent,
                'id_group' => $this->get_cat_id($row->group_name),
                'status' => 1,
                'icon' => $row->icon
            );
        }
        $q = $this->db->get_where('sys_menu', array('sys_menu_id' => $data['sys_menu_id']));
        if ($q->num_rows() > 0) {
            $this->db->where('sys_menu_id', $data['sys_menu_id']);
            $this->db->update('sys_menu', $data);
        } else {
            $this->db->insert('sys_menu', $data);
        }
    }

    public function ext_delete() {
        $records = json_decode($this->input->post('postdata'));
        foreach ($records as $id) {
            $this->db->where('sys_menu_id', $id);
            $this->db->delete('sys_menu');
        }
    }

    function get_cat_id($name) {
        $q = $this->db->get_where('sys_menu_group', array('group_name' => $name))->row();
        return $q->sys_menu_group_id;
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

    function get_server_load() {

        $serverload = array();

        // DIRECTORY_SEPARATOR checks if running windows
        if (DIRECTORY_SEPARATOR != '\\') {
            if (function_exists("sys_getloadavg")) {
                // sys_getloadavg() will return an array with [0] being load within the last minute.
                $serverload = sys_getloadavg();
                $serverload[0] = round($serverload[0], 4);
            } else if (@file_exists("/proc/loadavg") && $load = @file_get_contents("/proc/loadavg")) {
                $serverload = explode(" ", $load);
                $serverload[0] = round($serverload[0], 4);
            }
            if (!is_numeric($serverload[0])) {
                if (@ini_get('safe_mode') == 'On') {
                    return "Unknown";
                }

                // Suhosin likes to throw a warning if exec is disabled then die - weird
                if ($func_blacklist = @ini_get('suhosin.executor.func.blacklist')) {
                    if (strpos("," . $func_blacklist . ",", 'exec') !== false) {
                        return "Unknown";
                    }
                }
                // PHP disabled functions?
                if ($func_blacklist = @ini_get('disable_functions')) {
                    if (strpos("," . $func_blacklist . ",", 'exec') !== false) {
                        return "Unknown";
                    }
                }

                $load = @exec("uptime");
                $load = explode("load average: ", $load);
                $serverload = explode(",", $load[1]);
                if (!is_array($serverload)) {
                    return "Unknown";
                }
            }
        } else {
            return "Unknown";
        }

        $returnload = trim($serverload[0]);

        return $returnload;
    }

    function printDetails($status) {

        echo "<table border='1'>";

        echo "<tr><td>Memcache Server version:</td><td> " . $status ["version"] . "</td></tr>";
        echo "<tr><td>Process id of this server process </td><td>" . $status ["pid"] . "</td></tr>";
        echo "<tr><td>Number of seconds this server has been running </td><td>" . $status ["uptime"] . "</td></tr>";
        echo "<tr><td>Accumulated user time for this process </td><td>" . $status ["rusage_user"] . " seconds</td></tr>";
        echo "<tr><td>Accumulated system time for this process </td><td>" . $status ["rusage_system"] . " seconds</td></tr>";
        echo "<tr><td>Total number of items stored by this server ever since it started </td><td>" . $status ["total_items"] . "</td></tr>";
        echo "<tr><td>Number of open connections </td><td>" . $status ["curr_connections"] . "</td></tr>";
        echo "<tr><td>Total number of connections opened since the server started running </td><td>" . $status ["total_connections"] . "</td></tr>";
        echo "<tr><td>Number of connection structures allocated by the server </td><td>" . $status ["connection_structures"] . "</td></tr>";
        echo "<tr><td>Cumulative number of retrieval requests </td><td>" . $status ["cmd_get"] . "</td></tr>";
        echo "<tr><td> Cumulative number of storage requests </td><td>" . $status ["cmd_set"] . "</td></tr>";

        $percCacheHit = ((real) $status ["get_hits"] / (real) $status ["cmd_get"] * 100);
        $percCacheHit = round($percCacheHit, 3);
        $percCacheMiss = 100 - $percCacheHit;

        echo "<tr><td>Number of keys that have been requested and found present </td><td>" . $status ["get_hits"] . " ($percCacheHit%)</td></tr>";
        echo "<tr><td>Number of items that have been requested and not found </td><td>" . $status ["get_misses"] . "($percCacheMiss%)</td></tr>";

        $MBRead = (real) $status["bytes_read"] / (1024 * 1024);

        echo "<tr><td>Total number of bytes read by this server from network </td><td>" . $MBRead . " Mega Bytes</td></tr>";
        $MBWrite = (real) $status["bytes_written"] / (1024 * 1024);
        echo "<tr><td>Total number of bytes sent by this server to network </td><td>" . $MBWrite . " Mega Bytes</td></tr>";
        $MBSize = (real) $status["limit_maxbytes"] / (1024 * 1024);
        echo "<tr><td>Number of bytes this server is allowed to use for storage.</td><td>" . $MBSize . " Mega Bytes</td></tr>";
        echo "<tr><td>Number of valid items removed from cache to free memory for new items.</td><td>" . $status ["evictions"] . "</td></tr>";

        echo "</table>";
    }

    function tesget_server_load() {
        $memcache_obj = new Memcache;
        $memcache_obj->addServer('memcache_host', 11211);
        $this->printDetails($memcache_obj->getStats());
    }

    function loadSummaryKeljab() {
        $sql = "select 
                        COUNT(CASE WHEN a.kodekeljab = 1 THEN a.kodekeljab ELSE NULL END) AS jumstruktural,
                        COUNT(CASE WHEN a.kodekeljab = 2 THEN a.kodekeljab ELSE NULL END) AS jumfahli,
                        COUNT(CASE WHEN a.kodekeljab = 3 THEN a.kodekeljab ELSE NULL END) AS jumflain,
                        COUNT(CASE WHEN a.kodekeljab = 4 THEN a.kodekeljab ELSE NULL END) AS jumdekom,
                        COUNT(CASE WHEN a.kodekeljab = 5 THEN a.kodekeljab ELSE NULL END) AS jummanajerial,
                        COUNT(CASE WHEN a.kodekeljab = 6 THEN a.kodekeljab ELSE NULL END) AS jumkepakaran,
                        COUNT(CASE WHEN a.kodekeljab = 7 THEN a.kodekeljab ELSE NULL END) AS jumketeknisan,
                        COUNT(CASE WHEN a.kodekeljab = 8 THEN a.kodekeljab ELSE NULL END) AS jumkonstruksi,
                        COUNT(CASE WHEN a.kodekeljab = 9 THEN a.kodekeljab ELSE NULL END) AS jumpembebasan,
                        COUNT(CASE WHEN a.kodekeljab = 12 THEN a.kodekeljab ELSE NULL END) AS jumdireksi
                        from ms_pegawai a
                        join keljab b ON a.kodekeljab = b.kodekeljab";
        $q = $this->db->query($sql);
        $r = $q->row();
        $json = "{
                                    success: true,
                                    data: {";
        $json .="jumstruktural: \"" . $r->jumstruktural . "\",";
        $json .="jumfahli: \"" . $r->jumfahli . "\",";
        $json .="jumflain: \"" . $r->jumflain . "\",";
        $json .="jumdekom: \"" . $r->jumdekom . "\",";
        $json .="jummanajerial: \"" . $r->jummanajerial . "\",";
        $json .="jumkepakaran: \"" . $r->jumkepakaran . "\",";
        $json .="jumketeknisan: \"" . $r->jumketeknisan . "\",";
        $json .="jumkonstruksi: \"" . $r->jumkonstruksi . "\",";
        $json .="jumpembebasan: \"" . $r->jumpembebasan . "\",";
        $json .="jumdireksi: \"" . $r->jumdireksi . "\",";
        // $json .="foto: \"<img src='".base_url()."upload/".$this->getfoto($id)."'/>\",";              
        $json .="}}";
        echo $json;
    }

    function getDataAkun($bulan, $tahun, $idaccount, $idunit) {
//            $bulan=$bulan-1;
        // if (strpos($idunit,'%20') !== false) {
            // echo 'as';
        $bulanCek = intval($bulan);
        $bulanConversion = intval($this->session->userdata('conversionmonth'));
        // echo $bulanCek.'>'.$bulanConversion;
        if($bulanCek>$bulanConversion)
        {
            // echo '   '.$tahun.'>'.$this->session->userdata('curfinanceyear');
            if($tahun>$this->session->userdata('curfinanceyear'))
            {
                $this->queryDataAkun($bulan, $tahun, $idaccount, $idunit);
            } else {
                echo json_encode(array('success' => true, 'totalbalance' => 0));
            }
            
        } else {
            $this->queryDataAkun($bulan, $tahun, $idaccount, $idunit);
        }
    }

    function queryDataAkun($bulan, $tahun, $idaccount, $idunit)
    {
        $idunit = $this->m_data->getID('unit', 'namaunit', 'idunit', str_replace("%20", " ", $idunit));
        // }

            if (strlen($bulan) <= 1) {
                $bulan = "0" . $bulan;
            }

            $m = $bulan;
            $y = $tahun;
            $d = lastday($m, $tahun);
            $startdate = $y.'-01-01';
            $enddate = $y.'-'.$m.'-'.$d;
            $ds = $y.'-'.$m.'-01';

            // $sql = "select balance as totalbalance
            //     from clossing
            //     where month='$bulan' and year=" . $tahun . " and idaccount = $idaccount and idunit = $idunit"
            //         . " order by datein desc limit 1";
            $sql = "select sum(a.debit-a.credit) balance
                    from accountlog a
                    join account b ON a.idaccount = b.idaccount and a.idunit = b.idunit                    
                    where a.idaccount = $idaccount and a.idunit=$idunit and tanggal BETWEEN '$startdate' and '$enddate'";
               // echo $sql;
            $q = $this->db->query($sql);
            if ($q->num_rows() > 0) {
                $r = $q->row();
                echo json_encode(array('success' => true, 'totalbalance' => $r->balance));
            } else {
                echo json_encode(array('success' => true, 'totalbalance' => 0));
            }
    }

    function randomUnit() {
        $idcompany = $this->session->userdata('idcompany');
        // echo 'sad'.$idcompany;
        if($this->session->userdata('group_id')==99)
        {
         $sql = "SELECT namaunit,idunit FROM unit
                where idcompany=$idcompany
                    ORDER BY RANDOM()
                    LIMIT 1";     
        } else {
            $sql = "SELECT namaunit,idunit FROM unit
                where idcompany=$idcompany AND idunit=".$this->session->userdata('idunit')."
                    LIMIT 1";   
        }
       
        $q = $this->db->query($sql)->row();
        echo json_encode(array('success' => true, 'namaunit' => isset($q->namaunit) ? $q->namaunit : null, 'idunit' => isset($q->idunit) ? $q->idunit : null));
    }

    function getrandomAcc($idunit) {
        $sql = "SELECT idaccount,accname,accnumber FROM account
                    where display is null and idunit = $idunit
                    and (idaccounttype=1 OR idaccounttype=19)
                    AND idaccount NOT IN (select idparent from account where idunit = $idunit)
                    ORDER BY RANDOM()
                    LIMIT 1";
        $q = $this->db->query($sql);
        if ($q->num_rows() > 0) {
            $q = $q->row();
            echo json_encode(array('success' => true, 'idaccount' => $q->idaccount, 'accname' => $q->accname, 'accnumber' => $q->accnumber));
        } else {
            echo json_encode(array('success' => false));
        }
    }

    function getLastClossing()
    {

    }

    function getDataLabaRugi($idunit = null,$month,$year) {

        if ($idunit == 'undefined') {
            $idunit = 2;
        }

        $idunit = $this->m_data->getID('unit', 'namaunit', 'idunit', str_replace("%20", " ", $idunit));
        //get last clossing
        // $qc = $this->db->query("select month,year
        //         from clossing
        //         order by year,month desc
        //         limit 1");
        // if ($qc->num_rows() > 0) {
            // $rc = $qc->row();
            $m = ambilNoBulan($month);
            $y = $year;
            $d = lastday($m, $year);
            $startdate = $y.'-'.$m.'-01';
            $enddate = $y.'-'.$m.'-'.$d;

            $sql = "select totalpendapatan,totalpengeluaran,sum(totalpendapatan-totalpengeluaran) as keuntungan
                        from (
                                        select sum(credit) as totalpendapatan
                                        from accountlog a
                                        join account b ON a.idaccount = b.idaccount and a.idunit = b.idunit
                                        where a.idunit = $idunit and (b.idaccounttype = 12 or b.idaccounttype = 16) and a.tanggal<='$enddate') as pendapatan,
                                    (
                                        select sum(debit) as totalpengeluaran
                                        from accountlog a
                                        join account b ON a.idaccount = b.idaccount and a.idunit = b.idunit
                                        where a.idunit = $idunit and (b.idaccounttype = 14 or b.idaccounttype = 15) and a.tanggal<='$enddate') as pengeluaran
                        group by totalpendapatan,totalpengeluaran";
                        // echo $sql;
            $q = $this->db->query($sql);
            if ($q->num_rows() > 0) {
                $r = $q->row();
                $arr = array('success' => true, 'm' => $m, 'y' => $y, 'totalpendapatan' => $r->totalpendapatan/1000, 'totalpengeluaran' => $r->totalpengeluaran/1000, 'keuntungan' => $r->keuntungan/1000);
            } else {
                $arr = null;
            }
        // } else {
        //     $arr = null;
        // }


        echo json_encode($arr);
    }

    function getDataNeraca($idunit = null,$month,$year) {

        if ($idunit == 'undefined') {
            $idunit = 2;
        }

        $this->load->model('m_laporan');

        $idunit = $this->m_data->getID('unit', 'namaunit', 'idunit', str_replace("%20", " ", $idunit));

        $qu = $this->db->query("select datein from unit where idunit = $idunit")->row();
        $startdate = date('Y-m-d',strtotime($qu->datein));

        $m = ambilNoBulan($month);
        $y = $year;
        $d = lastday($m, $year);
        // $startdate = $y.'-'.$m.'-01';
        $enddate = $y.'-'.$m.'-'.$d;

         $kas = $this->m_laporan->getDataNeraca3($idunit, $startdate, $enddate, 19);
        $bank = $this->m_laporan->getDataNeraca3($idunit, $startdate, $enddate, 1);
        $piutang = $this->m_laporan->getDataNeraca3($idunit, $startdate, $enddate, 2);
        $persediaan = $this->m_laporan->getDataNeraca3($idunit, $startdate, $enddate, 20);
        $hartatetap = $this->m_laporan->getDataNeraca3($idunit, $startdate, $enddate, 4);
        $hutanglancar = $this->m_laporan->getDataNeraca3($idunit, $startdate, $enddate, 18);
        $hutangpanjang = $this->m_laporan->getDataNeraca3($idunit, $startdate, $enddate, 9);
        $kewajibanlain = $this->m_laporan->getDataNeraca3($idunit, $startdate, $enddate, 10);
        $modal = $this->m_laporan->getDataNeraca3($idunit, $startdate, $enddate, 11);

        $data = array(
                    'totalharta'=>$kas['total']+$bank['total']+$piutang['total']+$persediaan['total']+$hartatetap['total'],
                    'totalkewajiban'=>$hutanglancar['total']+$hutangpanjang['total']+$kewajibanlain['total'],
                    'totalmodal'=>$modal['total']
                );

        $arr = array('success' => true, 'm' => $m, 'y' => $y, 'aset' => $data['totalharta']/1000, 'kewajiban' => abs($data['totalkewajiban'])/1000, 'modal' => $data['totalmodal']/1000);
         echo json_encode($arr);
    }

    function getDataNeraca_bak($idunit = null,$month,$year) {

        if ($idunit == 'undefined') {
            $idunit = 2;
        }

        $idunit = $this->m_data->getID('unit', 'namaunit', 'idunit', str_replace("%20", " ", $idunit));
        //get last clossing
        // $qc = $this->db->query("select month,year
        //         from clossing
        //         order by year,month desc
        //         limit 1");
        // if ($qc->num_rows() > 0) {
        //     $rc = $qc->row();
        //     $m = $rc->month;
        //     $y = $rc->year;
        $m = ambilNoBulan($month);
        $y = $year;
        $d = lastday($m, $year);
        $startdate = $y.'-'.$m.'-01';
        $enddate = $y.'-'.$m.'-'.$d;

        $sql = "select totalasset as aset,totalkewajiban as kewajiban,totalmodal as modal
                    from (
                            select sum(a.debit-a.credit) as totalasset
                            from accountlogx a
                            join account b ON a.idaccount = b.idaccount and a.idunit = b.idunit
                            where (idaccounttype = 19 OR idaccounttype = 1 OR idaccounttype = 2 OR idaccounttype = 20 OR idaccounttype = 4) and a.idunit=$idunit and tanggal<='$enddate') as asset,
                        (
                            select sum(a.debit-a.credit) as totalkewajiban
                            from accountlog a
                            join account b ON a.idaccount = b.idaccount and a.idunit = b.idunit
                            where (idaccounttype = 18 OR idaccounttype = 9 OR idaccounttype = 10) and a.idunit=$idunit and tanggal<='$enddate') as kewajiban,
                        (
                            select sum(a.credit-a.debit) as totalmodal
                            from accountlog a
                            join account b ON a.idaccount = b.idaccount and a.idunit = b.idunit
                            where (idaccounttype=11) and a.idunit=$idunit and tanggal<='$enddate') modal";
// echo $sql;

            // $sql = "select aset,kewajiban,modal
            //             from (
            //                     select sum(balance) as aset
            //                     from clossing a
            //                     where idunit = $idunit and (idaccounttype = 19 OR idaccounttype = 1 OR idaccounttype = 2 OR idaccounttype = 20 OR idaccounttype = 4) and month='$m' and year=$y) as aset,
            //                  (
            //                      select sum(balance) as kewajiban
            //                      from clossing a
            //                      where idunit = $idunit and (idaccounttype = 18 OR idaccounttype = 9 OR idaccounttype = 10) and month='$m' and year=$y) as kewajiban,
												// 		  (
            //                      select sum(balance) as modal
            //                      from clossing a
            //                      where idunit = $idunit and (a.idclassificationcf = 3 OR idaccounttype=11) and month='$m' and year=$y) as modal";
            $q = $this->db->query($sql);
           // echo $sql;
            if ($q->num_rows() > 0) {
                $r = $q->row();
                $arr = array('success' => true, 'm' => $m, 'y' => $y, 'aset' => $r->aset/1000, 'kewajiban' => abs($r->kewajiban)/1000, 'modal' => $r->modal/1000);
            } else {
                $arr = null;
            }
        // } else {
        //     $arr = null;
        // }


        echo json_encode($arr);
    }
    
    function getDataPendapatan($idunit = null,$iddistribusi=null,$month,$year) {

        if ($idunit == 'undefined') {
            $idunit = 2;
        }
        if ($iddistribusi == 'undefined') {
            $iddistribusi = 1; //penerimaan
        }

        $idunit = $this->m_data->getID('unit', 'namaunit', 'idunit', str_replace("%20", " ", $idunit));
        //get last clossing
        // $qc = $this->db->query("select month,year
        //         from clossing
        //         order by year,month desc
        //         limit 1");
        
        // if ($qc->num_rows() > 0) {
        //     $rc = $qc->row();
        //     $m = $rc->month;
        //     $y = $rc->year;
        $m = ambilNoBulan($month);
        $y = $year;
        $d = lastday($m, $year);
        $startdate = $y.'-'.$m.'-01';
        $enddate = $y.'-'.$m.'-'.$d;

            if($iddistribusi==1)
            {
                //penerimaan
                // $tabel = "receivemoneyitem";
                 $sql = "select sum(a.credit) as total,b.accname,b.accnumber
                        from accountlog a
                        join account b ON a.idaccount = b.idaccount and a.idunit = b.idunit
                        where a.idunit = $idunit and (b.idaccounttype = 12 or b.idaccounttype = 16) and a.tanggal<='$enddate' and b.display is null GROUP BY b.accname,b.accnumber ORDER BY total desc limit 5";
            } else {
                //pengeluaran
                // $tabel = "spendmoneyitem";
               $sql = "select sum(a.debit) as total,b.accname,b.accnumber
                        from accountlog a
                        join account b ON a.idaccount = b.idaccount and a.idunit = b.idunit
                        where a.idunit = $idunit and (b.idaccounttype = 14 or b.idaccounttype = 15) and a.tanggal<='$enddate' and b.display is null  GROUP BY b.accname,b.accnumber ORDER BY total desc limit 5";
                        // echo $sql;
            }
           
            
             
            $q = $this->db->query($sql);
           // echo $sql;
            if ($q->num_rows() > 0) {
//                $r = $q->row();
//                $arr = array('success' => true, 'm' => $m, 'y' => $y, 'aset' => $r->aset, 'kewajiban' => $r->kewajiban, 'modal' => $r->modal);
//                $arr = array('success' => true);
                $i=0;
                foreach($q->result() as $r)
                {
                    $data[$i]['field'] = $r->accname;
                    $data[$i]['value'] = $r->total/1000;
                    $i++;
                }
                $arr = array('success' => true,'data'=>$data);
            } else {
                $arr = array('success' => false);
            }
        // } else {
        //     $arr = array('success' => false);
        // }


        echo json_encode($arr);
    }

    function getLastClosing($idunit) {
        // $qc = $this->db->query("select month,year
        //         from clossing
        //         order by year,month desc
        //         limit 1");
        if($idunit=='' || $idunit==null)
        {
            $arr = array('success' => false);
        } else {
            $qc = $this->db->query("select max(tanggal) as tanggal
                    from accountlog a
                    where a.idunit = $idunit");

            if ($qc->num_rows() > 0) {
                $rc = $qc->row();
                if($rc->tanggal==null)
                {
                    $arr = array('success' => false);
                } else {
                    $arrmonth = explode("-", $rc->tanggal);            
                    $m = $arrmonth[1];
                    $y = $arrmonth[0];
                    $arr = array('success' => true, 'm' => ambilBulan($m), 'y' => $y);
                }
            } else {
                $arr = array('success' => false);
            }
        }
        echo json_encode($arr);
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
