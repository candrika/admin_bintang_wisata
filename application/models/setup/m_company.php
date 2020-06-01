<?php

class m_company extends CI_Model {

    function tableName() {
        return 'company';
    }

    function pkField() {
        return 'idcompany';
    }

    function searchField() {
        $field = "companyname,companyaddress,namebussines";
        return explode(",", $field);
    }

    function selectField() {
        return "idcompany,a.idbussinestype,namebussines,companyname,companyaddress,companyaddress2,companyaddress3,companyaddress4,companyaddress5,telp,fax,email,website,country,npwp,curfinanceyear,lastmonthfinanceyear,conversionmonth,numaccperiod,a.idlocation,a.type";
    }
    
    function fieldCek()
    {
        return false;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a"
                . " join bussinestype b ON a.idbussinestype = b.idbussinestype";

        return $query;
    }

    function whereQuery() {
        return null;
    }

    function orderBy() {
        return "";
    }

    function updateField() {
        $config['upload_path'] = './upload/';
        $config['allowed_types'] = 'gif|jpg|png';
        $config['max_size'] = '10000';
        $config['max_width']  = '1024';
        $config['max_height']  = '768';

        $this->load->library('upload', $config);

        if ( ! $this->upload->do_upload('logoheader'))
        {
            // $error = $this->upload->display_errors();
            // // echo $error;
            // if($error!='<p>You did not select a file to upload.</p>')
            // {
            //     echo "{success:false, message:'".$error."'}";
            // } else {
            //     // echo "{success:false, message:'simpan prosess'}";
            //     $this->prosesSaveKepegawaian(null,$input);
            // }
            $logo = null;
        }
        else
        {
             // $this->prosesSaveKepegawaian($this->upload->data()['orig_name'],$input);
            $logo = $this->upload->data()['orig_name'];
        }

        $data = array(
            'idcompany' => 1,
            'idbussinestype' => $this->m_data->getID('bussinestype', 'namebussines', 'idbussinestype', $this->input->post('namebussines')),
            'companyname' => $this->input->post('companyname'),
            'companyaddress' => $this->input->post('companyaddress'),
            'companyaddress2' => $this->input->post('companyaddress2'),
            'companyaddress3' => $this->input->post('companyaddress3'),
            'telp' => $this->input->post('telp'),
            'fax' => $this->input->post('fax'),
            'email' => $this->input->post('email'),
            'website' => $this->input->post('website'),
            'npwp' => $this->input->post('npwp'),
            'logo'=>$logo,
            'idlocation'=>$this->input->post('idlocation')=='' ? null : $this->input->post('idlocation'),
            'type' => $this->input->post('type')=='' ? null : $this->input->post('type'),
            // 'curfinanceyear' => $this->input->post('curfinanceyear'),
            // 'lastmonthfinanceyear' => ambilNoBulan($this->input->post('lastmonthfinanceyear')),
            // 'conversionmonth' => ambilNoBulan($this->input->post('conversionmonth')),
            // 'numaccperiod' => $this->input->post('numaccperiod')
        );
        return $data;
    }

}

?>