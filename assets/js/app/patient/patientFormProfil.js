var windowUploadPhotoPatient = Ext.create(dir_sys + 'patient.windowUploadPhotoPatient');
// var windowStaffProfileMember = Ext.create(dir_sys + 'member.windowStaffProfileMember');

Ext.define(dir_sys + 'patient.patientFormProfil', {
    extend: 'Ext.form.Panel',
    alias: 'widget.patientFormProfil',
    id: 'patientFormProfil',
    // width: 760,
    title: 'Profil',
    // height: 430,
    // url: SITE_URL + 'backend/saveform/member',
    bodyStyle: 'padding:5px',
    forceFit: true,
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        //        padding: '5 40 5 5',
        labelWidth: 150,
        // anchor:'100%'
        width: 380
    },
    layout: 'hbox',
    defaults: {
        padding: '5 10 5 5',
    },
    items: [{
        items: [
            {
                xtype: 'hiddenfield',
                name:'key',
                value:key
                // id:'user_id_frm_member'
            },{
                xtype: 'hiddenfield',
                name:'user_id',
                id:'user_id_frm_member',
                value:userid 
            },
            {
                xtype: 'hiddenfield',
                name: 'patient_id',
                id: 'patient_id'
            }, 
            {
                xtype: 'hiddenfield',
                name: 'statuspatientFormProfil',
                id: 'statuspatientFormProfil'
            }, 
            {
                xtype: 'textfield',
                fieldLabel: 'Divisi/Organisasi',
                name:'division',
                id:'division'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'No Identitas',
                allowBlank: false,
                name: 'no_id',
                id: 'no_id'
            },
            {
                xtype: 'comboxGenderType',
                name:'gender_type',   
                id:'gender_type',   
            },
            {
                xtype: 'textfield',
                allowBlank: false,
                fieldLabel: 'No Handphone',
                name: 'no_tlp',
                id: 'no_tlp'
            },
            {
                xtype: 'textfield',
                allowBlank: false,
                fieldLabel: 'No Whatsapp',
                name: 'no_mobile',
                id: 'no_mobile'
            },
            {
                xtype: 'textfield',
                allowBlank: false,
                fieldLabel: 'Email',
                name: 'email',
                id: 'email'
            },
        ]
    }, {
        items: [
            {
                xtype:'datefield',
                format:'d/m/Y',
                fieldLabel:'Tanggal Lahir',
                name: 'birthday_date',
                id: 'birthday_date'
            },{
                xtype: 'textarea',
                fieldLabel: 'Alamat',
                // allowBlank: false,
                name: 'address',
                id: 'address'
            },
            {
                xtype: 'textarea',
                fieldLabel: 'Catatan',
                name: 'remarks',
                id: 'remarks'
            }
        ]
    }],
    buttons: [
    {
        xtype:'button',
        text:'Unggah Foto Pasien',
        id:'photoPatientupload',
        handler: function (){
            windowUploadPhotoPatient.show();
        }
    },'->',{
        text: 'Tutup',
        handler: function() {
            var win = Ext.getCmp('WindowPasien');
            
            Ext.getCmp('patientFormProfil').getForm().reset();
            Ext.getCmp('patient_name').setValue(); 
            Ext.getCmp('patient_type_id').setValue(); 
            Ext.getCmp('member_id').setValue();
            Ext.getCmp('np_number').setValue();
            Ext.getCmp('status_patient').setValue();
            
            win.hide();
        }
    }, {
        id: 'BtnPatientGridSimpan',
        text: 'Simpan',
        handler: function() {
            var form = Ext.getCmp('patientFormProfil').getForm();
            if(form.isValid()) {
                form.submit({
                    url: CLINIC_API + 'patient/save_patient',
                    method:'POST',
                    params: {
                        patient_name: Ext.getCmp('patient_name').getValue(),
                        status: Ext.getCmp('status_patient').getValue(),
                        idunit: idunit,
                        key:key,
                        id_member: Ext.getCmp('member_id').getValue(),
                        patient_no: Ext.getCmp('patient_no').getValue(),
                        patient_type_id: Ext.getCmp('patient_type_id').getValue(),
                        np_number:Ext.getCmp('np_number').getValue(),
                        business_id:Ext.getCmp('business_id_patient').getValue()
                    },
                    success: function(form, action) {
                        
                        Ext.Msg.alert('Success', action.result.message);
                        form.reset();
                        // Ext.getCmp('memberFormDetailID').getForm().reset();
                        Ext.getCmp('WindowPasien').hide();
                        Ext.getCmp('GridPatientID').getStore().load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        form.reset();
                        // Ext.getCmp('WindowPasien').hide();
                        Ext.getCmp('GridPatientID').getStore().load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});