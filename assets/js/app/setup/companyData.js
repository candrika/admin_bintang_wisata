Ext.define('logoheaderthumb', {
    extend: 'Ext.Component',
    // id:'formpegdata',
    alias: 'widget.logoheaderthumb',
    fieldLabel: 'Photo',
    autoEl: {tag: 'img', width: 80, height: 50}
});

Ext.define(dir_sys + 'setup.companyData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.companyData',
    id: 'formSetupCompany',
    autoScroll: true,
    url: SITE_URL + 'backend/saveform/company/setup',
    autoHeight: true,
    autoWidth:true,
    layoutFit:true,
//    height: 492,
//    width: '90%',
    bodyPadding: 10,
    title: 'Profil Pengguna',
    defaults: {
        anchor: '100%',
        labelWidth: 160
    },
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong'
    },
    items: [
        {
            xtype: 'fieldset',
//            height: 296,
            // title: 'Profil Pengguna',
            defaults: {
                anchor: '100%',
                labelWidth: 160
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nama Klien',
                    name: 'companyname',
                    allowBlank: false
                },{
                    xtype: 'comboxdatalocation',
                    valueField:'idlocation',
                    name:'idlocation',
                    isplayField: 'location_name',
                    editable: false,
                    allowBlank: false
                },
                {  
                    xtype: 'comboxcompanytype',
                    editable: false,
                    value:1,
                    hidden:true
                    // readOnly:true,
                    // allowBlank: false
                },
                {
                    xtype: 'comboxbussinestype',
                    editable: false,
                    triggerAction: 'all',
                    fieldLabel: 'Tipe Perusahaan',
                    allowBlank: false,
                    valueField: 'namebussines',
                    name: 'namebussines'
                }, {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'telp',
                    name: 'telp'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'fax',
                    name: 'fax'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'email',
                    name: 'email'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'website',
                    name: 'website'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    hidden:true,
                    fieldLabel: 'SIUP/TDP',
                    name: 'npwp'
                },
                {
                    xtype: 'textareafield',
                    anchor: '100%',
                    fieldLabel: 'Alamat',
                    name: 'companyaddress',
                    allowBlank: false
                },
                {
                    xtype: 'textareafield',
                    anchor: '100%',
                    fieldLabel: 'Alamat 2',
                    name: 'companyaddress2'
                },
                {
                    xtype: 'textareafield',
                    anchor: '100%',
                    fieldLabel: 'Alamat 3',
                    name: 'companyaddress3'
                },
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Logo Header',
                        combineErrors: true,
                        msgTarget : 'side',
                        layout: 'hbox',
                        defaults: {
                            flex: 1,
                            hideLabel: true
                        },
                        items: [
                                {
                                    xtype: 'filefield',
                                    margin: '0 15 0 0',
                                    emptyText: 'Upload Logo',
                                    fieldLabel: 'Logo',
                                    name: 'logoheader',
                                    buttonText: '',
                                    buttonConfig: {
                                        iconCls: 'imgupload-icon'
                                    }
                                },
                             {
                                xtype: 'logoheaderthumb',
                                id: 'logoheaderthumb',
                                fieldLabel: 'Logo',
                                anchor:'20%',
                                width: 87,
                                height: 100,
                            }
                        ]
                    },
                            {
                                xtype: 'button',
                                align:'right',
                                // bodyStyle:'float:right;',
                                margin: '0 0 20 165',
                                anchor:'40%',
                                text:'Hapus Logo',
                                handler: function() {
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'setup/hapuslogo',
                                        method: 'POST',
                                        success: function(form, action) {
                                            Ext.getCmp('logoheaderthumb').el.dom.src = BASE_URL + "/upload/" + null;
                                        },
                                        failure: function(form, action) {
                                            // Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                        }
                                    });
                                }
                            }
                ]
        }
//        ,
//        {
//            xtype: 'fieldset',
//            defaults: {
//                anchor: '100%',
//                labelWidth: 160
//            },
//            title: 'Data Akuntansi',
//            items: [
//                {
//                    xtype: 'textfield',
//                    anchor: '100%',
//                    fieldLabel: 'Tahun Tutup Buku',
//                    name: 'curfinanceyear'
//                },
//                {
//                    xtype: 'comboxbulan',
//                    anchor: '100%',
//                    fieldLabel: 'Bulan Tutup Buku',
//                    name: 'lastmonthfinanceyear',
//                    value:'Desember'
//                },
//                {
//                    xtype: 'comboxbulan',
//                    anchor: '100%',
//                    fieldLabel: 'Bulan Awal Pembukuan',
//                    name: 'conversionmonth',
//                    value:'Januari'
//                },
//                {
//                    xtype: 'numberfield',
//                    anchor: '100%',
//                    fieldLabel: 'Jumlah Periode Akuntansi',
//                    name: 'numaccperiod',
//                    minValue:12,
//                    value:12,
//                    maxValue:13
//                }
//            ]
//        }
    ],
    buttons: [{
//            id:'simpanCompanyBtn',
            text: 'Simpan Pengaturan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                                    form.submit({
                                        success: function(form, action) {
                //                                    console.log(action)
                                            Ext.Msg.alert('Success', action.result.message);
                                            getLogo();
                                        },
                                        failure: function(form, action) {
                                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                //                                     storeGridPengaturan.load();
                                        }
                                    });
                                } else {
                                    Ext.Msg.alert("Error!", "Your form is invalid!");
                                }
                
                // Ext.Ajax.request({
                //     url: SITE_URL + 'sistem/cekAkses',
                //     params: {
                //         rule_id: 47,
                //     },
                //     success: function(response){
                //          if(response.responseText=='TIDAK')
                //          {
                //               Ext.Msg.alert('Hak Akses', 'Maaf, anda tidak mempunyai hak akses untuk melanjutkan proses ini.');
                //          } else {
                               
                //                 if (form.isValid()) {
                //                     form.submit({
                //                         success: function(form, action) {
                // //                                    console.log(action)
                //                             Ext.Msg.alert('Success', action.result.message);
                //                             getLogo();
                //                         },
                //                         failure: function(form, action) {
                //                             Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                // //                                     storeGridPengaturan.load();
                //                         }
                //                     });
                //                 } else {
                //                     Ext.Msg.alert("Error!", "Your form is invalid!");
                //                 }
                //          }
                //      },
                //     failure: function(form, action) {
                //         Ext.Msg.alert('Hak Akses', 'Cek Hak Akses Gagal, Silahkan coba lagi.');
                //     }
                // });
    
               
            }
        }]
    , listeners: {
        afterrender: {
            fn: function() {
                // Ext.getCmp('formLembur').getForm().reset();
                var form = Ext.getCmp('formSetupCompany').getForm();
                form.load({
                    url: SITE_URL + 'backend/loadFormData/company/1/setup',
                    failure: function(form, action) {
                        Ext.Msg.alert("Load failed", action.result.errorMessage);
                    }
                })

                getLogo();
            }
        }
    }

});

function getLogo()
{
    Ext.Ajax.request({
        url: SITE_URL + 'setup/getlogo',
        method: 'POST',
        // params: {
        //     pegawainid: pegawainid
        // },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            Ext.getCmp('logoheaderthumb').el.dom.src = BASE_URL + "/upload/" + d.logoheader;
        },
        failure: function(form, action) {
            // Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });
}