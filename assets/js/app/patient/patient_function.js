function detail_pasien(patient_id,member_id,patient_no){

    if(member_id==null){
        Ext.getCmp('BtnPatientGridSimpan').setDisabled(false);
    }else{
        Ext.getCmp('BtnPatientGridSimpan').setDisabled(true);
    }

    WindowPasien.show();


    Ext.getCmp('business_id_patient').getStore().load();
    // Ext.getCmp('status_patient').getStore().load();
    
    Ext.Ajax.request({
        url:CLINIC_API+'patient/data',
        method:'GET',
        params:{
            key:key,
            idunit:idunit,
            patient_id:patient_id,
            query:null,
            id_member:member_id,
            patient_no:patient_no
        },
        success:function(form,action){
            var d = Ext.decode(form.responseText)
            console.log(d.rows.status);
            console.log(d.rows.patient_type_id*1);

            // gender_type
            Ext.getCmp("photoPatientupload").enable();
            Ext.getCmp('patient_id').setValue(d.rows.patient_id);
            Ext.getCmp('patient_name').setValue(d.rows.patient_name);
            Ext.getCmp('gender_type').setValue(d.rows.gender_type*1);
            Ext.getCmp('status_patient').setValue(d.rows.status*1);
            Ext.getCmp('member_id').setValue(d.rows.member_id*1);
            Ext.getCmp('business_id_patient').setValue(d.rows.business_id);
            
            if(Ext.getCmp('member_id').getValue()!=null){
                Ext.getCmp('business_id_patient').show();
            }else{
                Ext.getCmp('business_id_patient').hide();
            }

            Ext.getCmp('patient_no').setValue(d.rows.patient_no);
            Ext.getCmp('patient_type_id').setValue(d.rows.patient_type_id*1);
            Ext.getCmp('no_id').setValue(d.rows.no_id);
            Ext.getCmp('no_tlp').setValue(d.rows.no_tlp);
            Ext.getCmp('no_mobile').setValue(d.rows.no_mobile);
            Ext.getCmp('email').setValue(d.rows.email); 
            Ext.getCmp('birthday_date').setValue(d.rows.birthday_date);
            Ext.getCmp('address').setValue(d.rows.address);
            Ext.getCmp('remarks').setValue(d.rows.remarks);
            Ext.getCmp('np_number').setValue(d.rows.np_number);
            Ext.getCmp('division').setValue(d.rows.divisi);
            Ext.getCmp("fotoPasienthumb").el.dom.src = SITE_URL+'/upload/'+d.rows.patient_photo;

            if(d.rows.member_id*1!=null){
                // np_number
                Ext.getCmp('np_number').setValue(d.rows.np_number);
            }
        },
        failure:function(form,action){

        }
    })
}

function show_image(patient_id,member_id){
    Ext.Ajax.request({
        url: CLINIC_API  + 'patient/photo',
        method: 'GET',
        params: {
            patient_id:patient_id,
            member_id:member_id,
            key:key,
            // password:password,
            // idunit:idunit
        },
        // headers : { Authorization : auth },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            if(d.success){
                Ext.getCmp("fotoPasienthumb").el.dom.src = SITE_URL+'/upload/'+d.rows.patient_photo;
            }
           
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });
}