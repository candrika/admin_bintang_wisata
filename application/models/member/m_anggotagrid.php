<?php

class m_AnggotaGrid extends CI_Model {

    function tableName() {
        return 'member';
    }

    function pkField() {
        return 'id_member';
    }

    function searchField() {
        $field = "no_member,a.no_id,member_name";
        return explode(",", $field);
    }


    function selectField() {
        return "id_member,a.business_id,a.id_member_type,a.idunit,no_member,b.namaunit,id_type,a.no_id,member_name,a.address,a.telephone,a.handphone,a.email,a.website,a.alamat_ibu_kandung,
                a.postcode,a.birth_location,a.birth_date,pin,photo_image,sign_image,a.notes,a.marital_status,nama_ibu_kandung,nama_ahli_waris,no_id_ahli_waris,lahir_ahli_waris,hubungan_ahli_waris,notlp_ahli_waris,no_rekening,nama_rekening,nama_bank,approved_by,activated_date,a.status,is_staff,a.datein,a.city,a.country,a.notes,
                c.member_type_name,case when is_staff = 1 then 'Ya' when is_staff = 2 then 'Tidak' end as staff_koperasi,case when is_staff = 1 then 'Ya' when is_staff = 2 then 'Tidak' end as staff_koperasi,user_staff_id,d.realname as staff_name,a.tgl_lahir_ibukandung,a.user_id,online_access,a.idemployee";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'member_name'=>'member_name',
          'no_member'=>'no_member',
          'no_id'=>'no_id'    
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    left join unit b ON a.idunit = b.idunit
                    left join member_type c ON a.id_member_type = c.id_member_type
                    left join sys_user d ON a.user_staff_id = d.user_id
                    left join business f ON A.business_id=f.business_id
                    ";

        return $query;
    }

    function whereQuery() {
        $wer = null;

        if($this->session->userdata('group_id')!=99 && $this->session->userdata('group_id')!=1)
        {
            $wer = " and a.idunit = ".$this->session->userdata('idunit')." ";
        } 

        if($this->input->post('status') != null){
            $wer .=" and a.status=".$this->input->post('status');
        }

        //error saat $this->session->userdata('business_id') kosong tapi pada saat menambahkan anggota menyertakan bussiness id
        // echo $this->session->userdata('business_id');
        if($this->session->userdata('business_id')!=''){
            $wer .= " and a.business_id = ".$this->session->userdata('business_id')." ";
        }
//         else{
//             $wer .= " and a.business_id is null";
// // 
//         }

        return "a.display is null and a.deleted=0 $wer";
    }

    function orderBy() {
        return "a.datein desc";
    }

    function updateField() {

        // $photo_image = null;
        // $sign_image = null;
        //get group id member
        $q = $this->db->get_where('sys_group',array('idunit'=>$this->session->userdata('idunit'),'member_group'=>1))->row();
        $group_id = $q->group_id;

        //validate email
        $id_member = $this->input->post('id_member');
        if($id_member==null){
            //new member
            $q = $this->db->get_where('member',array('deleted'=>0,'email'=>$this->input->post('email')));
            if($q->num_rows()>0){
                echo json_encode(array('success'=>false,'message'=>'Email sudah terdaftar'));
                exit;
            }
        } else {
            //existing member
            $this->db->where('id_member !=', $id_member);
             $q = $this->db->get_where('member',array('deleted'=>0,'email'=>$this->input->post('email')));
            if($q->num_rows()>0){
                echo json_encode(array('success'=>false,'message'=>'Email sudah terdaftar'));
                exit;
            }
        }
        //end validate email

         if($this->input->post('online_access')==1){
            if($id_member==null){
                 //new member
                if($this->input->post('member_password')==''){
                    echo json_encode(array('success'=>false,'message'=>'Masukkan kata kunci'));
                    exit;
                }
            }

            if($this->input->post('user_id')==''){
                //create user
                // $user_id = $this->m_data->getSeqVal('seq_user_id');
                $user_id = $this->m_data->getPrimaryID2($this->input->post('user_id'),'sys_user','user_id');

                $data = array(
                        'user_id' => $user_id,
                        'email' => $this->input->post('email'),
                        'phone' => $this->input->post('handphone'),
                        'idunit'  => $this->input->post('idunit'),
                        // 'group_id'  => $group_id,
                        'phone'  => $this->input->post('phone')
                );

                if($this->input->post('is_staff')!=''){
                    //kalo member sekaligus pengurus ga update group_idnya
                } else {
                    $data['group_id'] = $group_id;
                }

                 if($this->input->post('member_password')!=''){
                    $data['password'] = $this->input->post('member_password');
                }
                $data['api_key'] = 'KPR_API'.generateRandomString(25).base64_encode(date('YmdHms'));
                $this->db->insert('sys_user',$data);
            } else {
                $user_id = $this->input->post('user_id');

                  $data = array(
                        'email' => $this->input->post('email'),
                        'phone' => $this->input->post('handphone'),                        
                        'idunit'  => $this->input->post('idunit'),
                        // 'group_id'  => $group_id,
                        'phone'  => $this->input->post('phone')
                );

                if($this->input->post('is_staff')!=''){
                    //kalo member sekaligus pengurus ga update group_idnya
                } else {
                    $data['group_id'] = $group_id;
                }

                if($this->input->post('member_password')!=''){
                    $data['password'] = $this->input->post('member_password');
                }

                $this->db->where('user_id',$user_id);
                $this->db->update('sys_user',$data);
            }
        } else {
            $user_id = null;
        }

        $data = array(
            'id_member' => $this->m_data->getPrimaryID($this->input->post('id_member'),'member','id_member') ,
            'idunit' =>$this->input->post('idunit'),
            'user_staff_id' =>$this->input->post('user_staff_id')=='' ? null : $this->input->post('user_staff_id'),
            'id_member_type' => $this->input->post('id_member_type')=='' ? null : $this->input->post('id_member_type'),
            'no_member' => $this->input->post('no_member'),
            'business_id' => $this->input->post('business_id') == '' ? null : $this->input->post('business_id'),
            'no_id' => $this->input->post('no_id'),
            'member_name' => $this->input->post('member_name'),
            'address' => $this->input->post('address'),
            'city'=>$this->input->post('city'),
            'telephone' => $this->input->post('telephone'),
            'handphone' => $this->input->post('handphone'),
            'email' => $this->input->post('email'),
            'website' => $this->input->post('website'),
            'postcode' => $this->input->post('postcode'),
            'country' => $this->input->post('country'),
            'birth_location' => $this->input->post('birth_location'),
            'birth_date' => $this->input->post('birth_date')!='' ? backdate2($this->input->post('birth_date')) : null,
            'pin' => $this->input->post('pin') == '' ? null : $this->input->post('pin'),
            'notes' => $this->input->post('notes'),
            'marital_status' => $this->input->post('marital_status') == '' ? null : $this->input->post('marital_status'),
            // 'photo_image' => $photo_image,
            // 'sign_image' => $sign_image,
            'nama_ibu_kandung' => $this->input->post('nama_ibu_kandung'),
            'nama_ahli_waris' => $this->input->post('nama_ahli_waris'),
            'no_id_ahli_waris' => $this->input->post('no_id_ahli_waris'),
            'lahir_ahli_waris' => $this->input->post('lahir_ahli_waris')!='' ? backdate2($this->input->post('lahir_ahli_waris')) : null,
            'hubungan_ahli_waris' => $this->input->post('hubungan_ahli_waris'),
            'notlp_ahli_waris' => $this->input->post('notlp_ahli_waris'),
            'no_rekening' => $this->input->post('no_rekening'),
            'nama_rekening' => $this->input->post('nama_rekening'),
            'activated_date' => $this->input->post('activated_date')!='' ? backdate2($this->input->post('activated_date')) : null,
            'is_staff' => $this->input->post('is_staff') == 'true' ? 1 : 2,
            'online_access' => $this->input->post('online_access'),
            'status' => $this->input->post('status'),
            'user_id'=>$user_id,
            'idemployee'=>$this->input->post('idemployee') != '' ? $this->input->post('idemployee') : null        
        );

       
        return $data;
    }

}

?>
