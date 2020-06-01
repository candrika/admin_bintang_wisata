<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class masterdata extends MY_Controller {

    public function index() {
        
    }

    function save($model) {
        $this->load->model('master/m_' . $model, 'datamodel');
        $field = $this->datamodel->formUpdateField();
        // $arrField = explode(",", $field);
        // echo $arrField;
        foreach ($field as $key => $value) {
            if ($value != 'userin' && $value != 'usermod' && $value != 'datein' && $value != 'datemod') {
                $v = explode(".", $value);
                // echo print_r($v)." ";
                if (count($v) > 1) {
                    //pk nya banyak
                    $upfield[$v[1]] = $this->input->post($v[1]);
                } else {
                    $upfield[$value] = $this->input->post($value);
                }
            }
        }
        // print_r($upfield);

        $v = explode(",", $this->datamodel->pkField());
        if (count($v) > 1) {
            //pk nya banyak
            foreach ($v as $key => $vv) {
                // print_r($vv);
                $werfield[$vv] = $this->input->post($vv);
            }
        } else {
            $werfield[$this->datamodel->pkField()] = $this->input->post($this->datamodel->pkField());
        }

        $pkfieldPost = $this->input->post($this->datamodel->pkField());
        if ($pkfieldPost == null) {
            //posdata kosong, langsung insert insert
            $upfield['userin'] = $this->session->userdata('username');
            $upfield['datein'] = date('Y-m-d H:m:s');
            $this->db->insert($this->datamodel->tableName(), $upfield);
        } else {
            // //cek
            $qcek = $this->db->get_where($this->datamodel->tableName(), $werfield);

            if ($qcek->num_rows() > 0) {
                //update
                $upfield['usermod'] = $this->session->userdata('username');
                $upfield['datemod'] = date('Y-m-d H:m:s');
                $this->db->where($werfield);
                $this->db->update($this->datamodel->tableName(), $upfield);
            } else {
                $upfield['userin'] = $this->session->userdata('username');
                $upfield['datein'] = date('Y-m-d H:m:s');
                $this->db->insert($this->datamodel->tableName(), $upfield);
            }
            // echo $this->db->last_query();
        }

        if ($this->db->affected_rows() > 0) {
            $jsondata = array('success' => true, 'message' => 'Success');
        } else {
            $jsondata = array('success' => false, 'message' => 'failed');
        }

        echo json_encode($jsondata);
    }

    function loadFormData($model, $id = null) {
        $this->load->model('master/m_' . $model, 'datamodel');
        $this->load->model('m_ms_pegawai');



        $field = $this->datamodel->selectField();

        $sql = $this->datamodel->query();

        if ($this->datamodel->whereUriQuery($id) != '') {
            $sql.=" WHERE " . $this->datamodel->whereUriQuery($id);
        }
        
        $q = $this->db->query($sql);

        // print_r($field);
        if ($q->num_rows() > 0) {

            $dArr = $this->m_ms_pegawai->fetchingdata($field, $q);
        } else {
            $dArr = false;
        }

        $data = "";
        foreach ($dArr as $key => $value) {
            $data .="$key:\"$value\",";
        }


        if ($q->num_rows() > 0) {
            $json = "{
	                   success: true,
	                   data: {";
            $json .=$data;
            $json .="}}";
        } else {
            $json = "{
	                    success: false,
	                    data: {}
	               	}";
        }
        echo $json;
    }

    function saveAnggaranKso() {
//            noanggaran integer NOT NULL DEFAULT nextval('seq_noanggaran'::regclass),
//        $tgl = $this->input->post('tanggal');
//        $arrtgl = explode('-', $tgl);
        $d = array(
            'noregion' => $this->m_data->getID('region', 'namaregion', 'noregion', $this->input->post('namaregion')),
            'nomor' => $this->input->post('nomor'),
//            'tanggal' => $tgl,
//            'tahun' => $arrtgl[0],
            'keterangan' => $this->input->post('keterangan'),
            'userin' => $this->session->userdata('username'),
            'usermod' => $this->session->userdata('username'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'tglmulaikontrak'=>$this->input->post('tglmulaikontrak'),
            'tglakhirkontrak'=>$this->input->post('tglakhirkontrak')
        );
        $noanggaran = $this->input->post('noanggaran');
        if ($noanggaran == null) {
            $this->db->insert('anggaran', $d);
        } else {

            $this->db->where('noanggaran', $noanggaran);
            $this->db->update('anggaran', $d);
        }

        if ($this->db->affected_rows() > 0) {
            echo "{success: true, message:'Data berhasil diinput'}";
        } else {
            echo "{success: false, message:'Data gagal diinput'}";
        }
    }

    function saveAnggaranKsoDetail() {
        $d = array(
            'noanggaran'  => $this->input->post('noanggaran'),
            'nojabatankso' => $this->m_data->getID('jabatankso', 'namajabkso', 'nojabatankso', $this->input->post('namajabkso')),
            'nosatuan' => $this->m_data->getID('anggaransatuan', 'namasatuan', 'nosatuan', $this->input->post('namasatuan')),
            'upahpokok' => $this->input->post('upahpokok'),
            'tunapresiasi' => $this->input->post('tunapresiasi'),
            'thr' => $this->input->post('thr'),
            'jamsostek' => $this->input->post('jamsostek'),
            'pakaian' => $this->input->post('pakaian'),
            'pembinaan' => $this->input->post('pembinaan'),
            'pesangon' => $this->input->post('pesangon'),
            'transport' => $this->input->post('transport'),
            'kinerja' => $this->input->post('kinerja'),
            'premi' => $this->input->post('premi')
        );
        $noanggarandetail = $this->input->post('noanggarandetail');
        if ($noanggarandetail == null) {
            $d['datein'] = date('Y-m-d H:m:s');
            $d['userin'] = $this->session->userdata('username');
            $this->db->insert('anggarandetail', $d);
        } else {
            $d['usermod'] = $this->session->userdata('username');
            $d['datemod'] = date('Y-m-d H:m:s');
            $this->db->where('noanggarandetail', $noanggarandetail);
            $this->db->update('anggarandetail', $d);
        }

        if ($this->db->affected_rows() > 0) {
            echo "{success: true, message:'Data berhasil diinput'}";
        } else {
            echo "{success: false, message:'Data gagal diinput'}";
        }
    }

    function getjenispotongan()
    {
        $jenpot = $this->input->get('potongantype');
        $jenispotongan = $this->m_data->getID('potongantype', 'namepotongan', 'jenispotongan', $jenpot);
        echo "{success: true, jenispotongan:'$jenispotongan'}";
    }

}

?>