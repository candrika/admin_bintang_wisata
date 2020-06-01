var windowUploadPhotonurse = Ext.create(dir_sys + 'nurse.windowUploadPhotonurse');
var NurseChangePassWindow = Ext.create(dir_sys + 'nurse.NurseChangePassWindow');

Ext.define(dir_sys + 'nurse.nurseFormProfil', {
    extend: 'Ext.form.Panel',
    alias: 'widget.nurseFormProfil',
    id: 'nurseFormProfil',
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
            },
            {
                xtype: 'hiddenfield',
                name: 'staff_id',
                id: 'staff_id'
            }, 
            {
                xtype: 'hiddenfield',
                name: 'statusnurseFormProfil',
                id: 'statusnurseFormProfil'
            }, 
            {
                xtype: 'textfield',
                fieldLabel: 'No Identitas',
                allowBlank: false,
                name: 'no_identity',
                id: 'no_identity'
            }, 
            {
                xtype: 'textfield',
                allowBlank: false,
                fieldLabel: 'No Handphone',
                name: 'staff_mobilephone',
                id: 'staff_mobilephone'
            },
            {
                xtype: 'textfield',
                allowBlank: false,
                fieldLabel: 'No Whatsapp',
                name: 'staff_whatsapp',
                id: 'staff_whatsapp'
            },
            {
                xtype: 'textfield',
                allowBlank: false,
                fieldLabel: 'Email',
                name: 'staff_email',
                id: 'staff_email'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Kata Kunci',
                allowBlank: false,
                name: 'password',
                id: 'nurse_password',
                inputType: 'password'
            },
            {
                xtype: 'textarea',
                fieldLabel: 'Alamat',
                name: 'staff_address',
                id: 'staff_address'
            },
        ]
    }, {
        items: [
           
            {
                xtype: 'textfield',
                allowBlank: false,
                fieldLabel: 'No. Rekening',
                labelWidth: 170,
                name: 'account_number',
                id: 'account_number'
            },
            {
                xtype: 'textfield',
                allowBlank: false,
                fieldLabel: 'Nama Pemegang Rekening',
                labelWidth: 170,
                name: 'account_name',
                id: 'account_name'
            },{
                xtype: 'textfield',
                allowBlank: false,
                fieldLabel: 'Nama Bank',
                // widthLabel: 450,
                labelWidth: 170,
                name: 'bank_name',
                id: 'bank_name'  
            }
        ]
    }],
    buttons: [
    {
        xtype:'button',
        text:'Unggah Foto',
        id:'photonurseupload',
        handler: function (){
            windowUploadPhotonurse.show();
        }
    },{
        xtype:'button',
        text:'Ganti Password',
        id:'nursechagepassword',
        handler: function (){
            NurseChangePassWindow.show();
        } 
    },'->',{
        text: 'Tutup',
        handler: function() {
            var win = Ext.getCmp('Windowperawat');
            
            Ext.getCmp('nurseFormProfil').getForm().reset();
            
            Ext.getCmp('staff_name').setValue(); 
            Ext.getCmp('status_nurse').setValue(); 
            Ext.getCmp('polytpe_id').setValue();
            Ext.getCmp('location_id').setValue();
            
            win.hide();
        }
    }, {
        id: 'BtnnurseGridSimpan',
        text: 'Simpan',
        handler: function() {
            var form = Ext.getCmp('nurseFormProfil').getForm();
            if(form.isValid()) {
                form.submit({
                    url: CLINIC_API + 'nurse/save_nurse',
                    method:'POST',
                    params: {
                        key:key, 
                        staff_name: Ext.getCmp('staff_name').getValue(),
                        status: Ext.getCmp('status_nurse').getValue(),
                        staff_number: Ext.getCmp('staff_number').getValue(),
                        location_id: Ext.getCmp('location_id').getValue(),
                        polytpe_id: Ext.getCmp('polytpe_id').getValue(),
                    },
                    success: function(form, action) {
                        
                        Ext.Msg.alert('Success', action.result.message);
                        form.reset();
                        // Ext.getCmp('memberFormDetailID').getForm().reset();
                        Ext.getCmp('Windowperawat').hide();
                        storeGridNurse.load();
                        console.log(storeGridNurse)
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        // form.reset();
                        // Ext.getCmp('Windowperawat').hide();
                        Ext.getCmp('GridnurseID').getStore().load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});