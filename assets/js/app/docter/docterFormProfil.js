var windowUploadPhotodocter = Ext.create(dir_sys + 'docter.windowUploadPhotodocter');
var DocterChangePassWindow = Ext.create(dir_sys + 'docter.DocterChangePassWindow');

Ext.define(dir_sys + 'docter.docterFormProfil', {
    extend: 'Ext.form.Panel',
    alias: 'widget.docterFormProfil',
    id: 'docterFormProfil',
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
                name: 'staff_user_id',
                id: 'staff_user_id'
            },
            {
                xtype: 'hiddenfield',
                name: 'staff_id',
                id: 'staff_id'
            }, 
            {
                xtype: 'hiddenfield',
                name: 'statusdocterFormProfil',
                id: 'statusdocterFormProfil'
            }, 
            {
                xtype: 'textfield',
                fieldLabel: 'No Identitas',
                allowBlank: false,
                name: 'no_identity',
                id: 'docter_no_identity'
            }, 
            {
                xtype: 'textfield',
                // allowBlank: false,
                fieldLabel: 'No Handphone',
                name: 'staff_mobilephone',
                id: 'docter_staff_mobilephone'
            },
            {
                xtype: 'textfield',
                allowBlank: false,
                fieldLabel: 'No Whatsapp',
                name: 'staff_whatsapp',
                id: 'docter_staff_whatsapp'
            },
            {
                xtype: 'textfield',
                allowBlank: false,
                fieldLabel: 'Email',
                name: 'staff_email',
                id: 'docter_staff_email'
            },
            {
                xtype: 'textfield',
                id:'password_docter',
                inputType: 'password',
                fieldLabel: 'Kata Kunci',
                name: 'password'
            },
            {
                xtype: 'textarea',
                fieldLabel: 'Alamat',
                // allowBlank: false,
                name: 'staff_address',
                // labelWidth: 170,
                id: 'docter_staff_address'
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
                id: 'docter_account_number'
            },
            {
                xtype: 'textfield',
                allowBlank: false,
                fieldLabel: 'Nama Pemegang Rekening',
                labelWidth: 170,
                name: 'account_name',
                id: 'docter_account_name'
            },{
                xtype: 'textfield',
                allowBlank: false,
                fieldLabel: 'Nama Bank',
                // widthLabel: 450,
                labelWidth: 170,
                name: 'bank_name',
                id: 'docter_bank_name'  
            },{
                xtype: 'textfield',
                allowBlank: false,
                fieldLabel: 'Biaya Konsultasi',
                labelWidth: 170,
                name: 'fee_per_patient',
                id: 'fee_per_patient',
                fieldStyle:'text-align: right;',
                listeners:{
                    'render': function(c) {
                        c.getEl().on('keyup', function() {
                            this.setRawValue(renderNomor(this.getValue()));
                            calcChangeAmount();
                        }, c);
                    }
                }  
            }
        ]
    }],
    buttons: [
    {
        xtype:'button',
        text:'Unggah Foto',
        id:'photodocterupload',
        handler: function (){
            windowUploadPhotodocter.show();
        }
    },{
        xtype:'button',
        text:'Ganti Password',
        id:'docterchagepassword',
        handler: function (){
            DocterChangePassWindow.show();
        } 
    },'->',{
        text: 'Tutup',
        handler: function() {
            var win = Ext.getCmp('Windowdokter');
            
            Ext.getCmp('docterFormProfil').getForm().reset();
            
            Ext.getCmp('docter_staff_name').setValue(); 
            Ext.getCmp('status_docter').setValue(); 
            Ext.getCmp('docter_polytpe_id').setValue();
            Ext.getCmp('docter_location_id').setValue();
            
            win.hide();
        }
    }, {
        id: 'BtndocterGridSimpan',
        text: 'Simpan',
        handler: function() {
            var form = Ext.getCmp('docterFormProfil').getForm();
            if(form.isValid()) {
                form.submit({
                    url: CLINIC_API + 'docter/save_docter',
                    method:'POST',
                    params: {
                        key:key, 
                        staff_name: Ext.getCmp('docter_staff_name').getValue(),
                        status: Ext.getCmp('status_docter').getValue(),
                        staff_number: Ext.getCmp('docter_staff_number').getValue(),
                        location_id: Ext.getCmp('docter_location_id').getValue(),
                        polytpe_id: Ext.getCmp('docter_polytpe_id').getValue(),
                        staff_type_id:Ext.getCmp('docter_type_id').getValue(),
                    },
                    success: function(form, action) {
                        
                        Ext.Msg.alert('Success', action.result.message);
                        form.reset();
                        // Ext.getCmp('memberFormDetailID').getForm().reset();
                        Ext.getCmp('Windowdokter').hide();
                        storeGridDocter.load();
                    },
                    failure: function(form, action) {
                        // var d = Ext.decode(form.responseText);
                        // console.log(action.result.message)
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        // form.reset();
                        // Ext.getCmp('Windowperawat').hide();
                        storeGridDocter.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});