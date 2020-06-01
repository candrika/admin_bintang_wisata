<?php

class m_user extends CI_Model {

    function cekUser($id, $pass, $absen = false) {
        //2 kali cek:
        //1. sys_user 
        //2. ms_pegawai
        $q = $this->db->query("select a.*,c.group_name,e.address,d.firstname,e.city
                            from sys_user a
                            join sys_group c ON a.group_id = c.group_id
                            left join employee d ON d.user_id=a.user_id
                            left join business e on e.business_id=d.business_id
                            where (a.username = '".$id."') and a.password = '".$pass."' and a.deleted=0 and a.display is null");
        // echo $this->db->last_query();
        if ($q->num_rows() > 0) {
            $r = $q->row();
            // print($r->password);
            // if($r->idcompany==null)
            // {
            //     return array('success' => false, 'msg' => 'ID atau Password Salah');
            //     exit;
            // }
            
            $qgroup = $this->db->get_where('sys_group',array('group_id'=>$r->group_id))->row();
            // $qunit = $this->db->get_where('unit',array('idunit'=>$r->idunit))->row();
            $qunit = false;
            if($r->group_id==99)
            {
                ///superuser
                $periode = null;
                $unit=null;
            } else if($r->group_id==1){
                    //administrtor       
                    $qunit = $this->db->get_where('unit',array('idunit'=>12))->row();

                    $quunit = $this->db->get_where('userunit',array('user_id'=>$r->user_id))->row(); 
                    $qunit = $this->db->get_where('unit',array('idunit'=>$qunit->idunit))->row(); 
                    $unit = $qunit->namaunit;
                    $logo = $qunit->logo;
                    $periode =  ambilBulan($qunit->conversionmonth).' '.$qunit->curfinanceyear;
                    $curfinanceyear = $qunit->curfinanceyear;
                    $conversionmonth = $qunit->conversionmonth;
            } else {
                    // print_r($qgroup);
                    $qunit = $this->db->get_where('unit',array('idunit'=>12))->row();

                    $quunit = $this->db->get_where('userunit',array('user_id'=>$r->user_id))->row(); 
                    $qunit = $this->db->get_where('unit',array('idunit'=>$qunit->idunit))->row(); 
                    $unit = $qunit->namaunit;
                    $logo = $qunit->logo;
                    $periode =  ambilBulan($qunit->conversionmonth).' '.$qunit->curfinanceyear;
                    $curfinanceyear = $qunit->curfinanceyear;
                    $conversionmonth = $qunit->conversionmonth;
            }
            
            if(isset($r->address)){
                // echo $r->address;
                $alamat = $r->address;
            }else{
                
                $alamat = $qunit->alamat;
            }

            if(isset($r->realname)){
                $realname = $r->realname;
            }else{
                $realname = $r->firstname;
            }

            if(isset($r->city)){
                $city = $r->city;
            }else{
                $city = 'Karawang';
            }

            $dataSession = array(
                'userid' => $r->user_id,
                'idcompany' => $r->idcompany,
                'clientid' => $r->clientid,
                'username' => $r->username,
                'api_key' => base64_encode($r->username.':'.$r->password),
                'password' => $r->password,
                'realname' => $realname,
                'group_id' => $r->group_id,
                'logo' => $logo,
                'alamat'=>$alamat,
                'kota'=>$city,
                'usergroup' => $r->group_id == 99 ? 'Super User' : $qgroup->group_name,
                'unit'=> $unit,
                'idunit'=> $qunit==true ? $qunit->idunit : 'null',
                'conversionmonth'=>$conversionmonth,
                'curfinanceyear'=>$curfinanceyear,
                'periode'=> $periode,
                'logged' => true
            );
            $this->session->set_userdata($dataSession);
            $this->saveLogin($r->user_id, $r->username);

            $this->db->where('user_id', $r->user_id);
            $this->db->update('sys_user', array('laslogin' => date('Y-m-d H:m:s')));
            return array('success' => true, 'msg' => '');
        } else {
           return array('success' => false, 'msg' => 'ID atau Password Salah');
        }
    }

    function saveAbsenData($id, $n, $keterlambatan,$dendaketerlambatan) {
        $this->cekAbsenSebelumnya($id, date('m'), date('Y'));

        $this->load->library('user_agent');
        $ip = getenv('HTTP_CLIENT_IP')? :
                getenv('HTTP_X_FORWARDED_FOR')? :
                        getenv('HTTP_X_FORWARDED')? :
                                getenv('HTTP_FORWARDED_FOR')? :
                                        getenv('HTTP_FORWARDED')? :
                                                getenv('REMOTE_ADDR');
        $d = array(
            'pegawainid' => $id,
            'kodeabsensitipe' => 2,
            'jammasuk' => $this->jamsekarang(),
            'tanggal' => date('Y-m-d'),
            'bulan' => date('m'),
            'tahun' => date('Y'),
            'is_referral' => $this->agent->is_referral(),
            'browser' => $this->agent->browser(),
            'version' => $this->agent->version(),
            'mobile' => $this->agent->mobile(),
            'robot' => $this->agent->robot(),
            'referrer' => $this->agent->referrer(),
            'agent_string' => $this->agent->agent_string(),
            'userin' => $n,
            'usermod' => $n,
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'terlambatmenit' => $keterlambatan,
            'ipaddress' => $ip
        );
        if($dendaketerlambatan==1)
        {
            $this->db->insert('absensi', $d);
        }
    }

    function saveLogin($id, $nama) {
//        $this->cekAbsenSebelumnya($id, date('m'), date('Y'));

        $this->load->library('user_agent');
        $ip = getenv('HTTP_CLIENT_IP')? :
                getenv('HTTP_X_FORWARDED_FOR')? :
                        getenv('HTTP_X_FORWARDED')? :
                                getenv('HTTP_FORWARDED_FOR')? :
                                        getenv('HTTP_FORWARDED')? :
                                                getenv('REMOTE_ADDR');

        date_default_timezone_set('Asia/Jakarta');
        
        $d = array(
            'pegawainid' => $id,
            'username' => $nama,
            'jammasuk' => date("H:m:s"),
            'tanggal' => date('Y-m-d'),
            'bulan' => date('m'),
            'tahun' => date('Y'),
            'is_referral' => $this->agent->is_referral(),
            'browser' => $this->agent->browser(),
            'version' => $this->agent->version(),
            'mobile' => $this->agent->mobile(),
            'robot' => $this->agent->robot(),
            'referrer' => $this->agent->referrer(),
            'agent_string' => $this->agent->agent_string(),
//				'userin' => $n,
//				'usermod' => $n,
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
//				'terlambatmenit'=>$keterlambatan,
            'ipaddress' => $ip
        );
        $this->db->insert('loginlog', $d);
    }

    function cekAbsen($id) {
        $datenow = date('Y-m-d');
        $q = $this->db->get_where('absensi', array('tanggal' => $datenow, 'pegawainid' => $id));
        if ($q->num_rows() > 0) {
            //udah absen
            return false;
        } else {
            return true;
        }
    }

    function cekAbsenSebelumnya($pegawainid, $bulan, $tahun) {
        $lastabsen = $this->db->query("SELECT tanggal from absensi
											where pegawainid = '$pegawainid' AND tahun='$tahun'
											ORDER BY tanggal desc limit 1");

        $q = $this->db->get_where('harilibur', array('status' => 1));
        foreach ($q->result() as $r) {
            $tgl_libur[] = date('Y') . '-' . $r->tanggal;
        }

        foreach ($tgl_libur as & $harilibur) {
            $harilibur = strtotime($harilibur);
        }

        if ($lastabsen->num_rows() > 0) {
            $r = $lastabsen->row();
            // var_dump($r);
            $lastAbsen = strtotime($r->tanggal);
            // echo $lastAbsen;
            $dlastAbsen = explode("-", $r->tanggal);
            $dateNow = strtotime(date('Y-m-d'));

            $jumharikerja = 0;
            // echo $lastAbsen." <= ".$dateNow ;
            while ($lastAbsen <= $dateNow) {
                // echo date('Y-m-d',$lastAbsen)." <= ".date('Y-m-d',$dateNow)."<br>";
                $hari_temp = date('D', $lastAbsen);
                if (!( $hari_temp == 'Sun' ) && !( $hari_temp == 'Sat' ) && !in_array($lastAbsen, $tgl_libur)) {

                    $hari_temp = date('d', $lastAbsen);
                    $jumharikerja++;

                    $q = $this->db->get_where('absensi', array('pegawainid' => $pegawainid, 'tanggal' => date('Y-m-d', $lastAbsen)));
                    if ($q->num_rows() > 0) {
                        // echo date('Y-m-d',$lastAbsen)." <= ".date('Y-m-d',$dateNow)." ABSEN <br>";
                    } else {
                        // echo date('Y-m-d',$lastAbsen)." <= ".date('Y-m-d',$dateNow)." ALPHA <br>";
                        $d = array(
                            'pegawainid' => $pegawainid,
                            'jammasuk' => '00:00:00',
                            'tanggal' => date('Y-m-d', $lastAbsen),
                            'bulan' => date('m', $lastAbsen),
                            'tahun' => $tahun,
                            'datein' => date('Y-m-d'),
                            'terlambatmenit' => 999,
                        );
                        if(date('Y-m-d', $lastAbsen)!=date('Y-m-d'))
                        {
                            $this->db->insert('absensi', $d);
                        }
                        
                        // echo $this->db->last_query()."<br>";
                    }
                }


                $lastAbsen = strtotime('+1 day', $lastAbsen);
            }
            // $jumharikerja-=1;
        } else {
            return false;
        }
        // echo $jumharikerja;
    }
    
    function tglsekarang()
    {
        $datestring = "%Y-%m-%d %H:%i:%s";
        $time = time();
        $jamsekarang = mdate($datestring, $time);
        return $jamsekarang;
    }
    
    function jamsekarang()
    {
        $datestring = "%H:%i:%s";
        $time = time();
        $jamsekarang = mdate($datestring, $time);
        return $jamsekarang;
    }

    function keterlambatan($id = null) {
        // $timenow = date('Y-m-d 09:00:00');
        $q = $this->db->get('pengaturan')->row();

        $this->load->helper('date');
        // $datestring = "%h:%i";
//        $datestring = "%Y-%m-%d %H:%i:%s";
        $time = time();

        // echo mdate($datestring, $time);
        $jammasuk = date("Y-m-d " . $q->jammasuk);
        // $jammasuk = date("Y-m-d 02:00:00");
        $jamsekarang = $this->jamsekarang();
        // echo $jammasuk.' '.$jamsekarang.'<br/>';

        $waktusekarang = mdate("%H:%i:%s", $time);
        $waktumasuk = $q->jammasuk;
        // $waktumasuk = "02:00:00";

        $arrjammasuk = explode(":", $waktumasuk);
        $arrjamsekarang = explode(":", $waktusekarang);

        //cek kelebihan apa kekurangan
        // echo (int)$arrjamsekarang[0]." < ".(int)$arrjammasuk[0].'<br/>';
        $selisih = (int) $arrjammasuk[0] - (int) $arrjamsekarang[0];
        if ($selisih > 5) {
            // echo "belum waktunya untuk absen";
            return array('terlambat' => false, 'keterlambatan' => 0, 'msg' => 'Maaf, belum waktunya untuk absen');
        } else {

            $start_date = new DateTime($jammasuk);
            $since_start = $start_date->diff(new DateTime($this->tglsekarang()));
            // echo $since_start->days.' days total<br>';
            // echo $since_start->y.' years<br>';
            // echo $since_start->m.' months<br>';
            // echo $since_start->d.' days<br>';
//            echo $since_start->h . ' hours<br>';
            // echo $since_start->i.' minutes<br>';
            // echo $since_start->s.' seconds<br>';

            $keterlambatan = ($since_start->h * 60) + $since_start->i;
//            echo ($since_start->h*60)." ".$since_start->i;
//            if ($since_start->h == 0) {
//                return array('terlambat' => true, 'keterlambatan' => 0, 'msg' => null);
//            } else
                if ($keterlambatan > $q->absentoleransi) {
                    //terlambat
                    // -$q->absentoleransi
                    // echo "total menit keterlambatan : ".$keterlambatan." menit<br>";
                    return array('terlambat' => true, 'keterlambatan' => $keterlambatan, 'msg' => null);
                } else {
                    $keterlambatan = $keterlambatan - $q->absentoleransi;
                    // echo "tidak terlambat";
                    // echo "total menit keterlambatan : ".$keterlambatan." menit<br>";
                    return array('terlambat' => false, 'keterlambatan' => $keterlambatan, 'msg' => null);
                }
        }
    }

}

?>