headerweb = new Ext.Component({
     // xtype: 'box',
            // margins: '5 5 5 5',
            // region: 'west',
           fieldLabel: 'Photo',
            width: 200,
            height: 100,
    autoEl: { tag: 'img', width:10, height:50,src: BASE_URL+"/upload/staff.png"}
});
headerslip = new Ext.Component({
     // xtype: 'box',
            // margins: '5 5 5 5',
            // region: 'west',
           fieldLabel: 'Photo',
            width: 200,
            height: 100,
    autoEl: { tag: 'img', width:10, height:50,src: BASE_URL+"/upload/staff.png"}
});

Ext.define('formPengaturan', {
    extend: 'Ext.form.Panel',
    alias: 'widget.formPengaturan',
    id:'formPengaturan',
    autoHeight: true,
    url: SITE_URL+'pengaturan/savePengaturan/',
    autoScroll:true,
        width   : 600,
        bodyPadding: 10,
        defaults: {
            // anchor: '100%',
            labelWidth: 200
        },
       items: [ {
                xtype: 'fieldset',
                title: 'Kehadiran',
                collapsible: true,
                defaults: {
                   labelWidth: 200,
                    // anchor: '100%',
                    layout: {
                        type: 'hbox',
                        defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                    }
                },
                items: [{
                        xtype: 'fieldcontainer',
                        fieldLabel:'Toleransi Keterlambatan',
                        combineErrors: false,
                        defaults: {
                            hideLabel: true
                        },
                        items: [
                           {
                               name : 'absentoleransi',
                               xtype: 'numberfield',
                               width: 50,
                               allowBlank: false
                           },
                           {
                               xtype: 'displayfield',
                               value: 'menit'
                           }
                        ]
                    },{
                        fieldLabel:'Kuota Cuti Tahunan',
                        xtype:'numberfield',
                        name:'kuotacutisetahun'
                    }]
                }
//
//
//                 ,{
//                        xtype: 'fieldset',
//                        title: 'Iuran Pensiun',
//                        collapsible: true,
//                        defaults: {
//                           labelWidth: 200,
//                            // anchor: '100%',
//                            layout: {
//                                type: 'hbox',
//                                defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
//                            }
//                        },
//                        items: [
//                            {
//                            fieldLabel:'Persentase IP',
//                            xtype:'textfield',
//                            name:'persenip'
//                        }, {
//                            fieldLabel:'Persentase IPK',
//                            xtype:'textfield',
//                            name:'persenipk'
//                        }]
//                },
//
//                {
//                        xtype: 'fieldset',
//                        title: 'Asuransi',
//                        collapsible: true,
//                        defaults: {
//                           labelWidth: 200,
//                            // anchor: '100%',
//                            layout: {
//                                type: 'hbox',
//                                defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
//                            }
//                        },
//                        items: [
//                            {
//                            fieldLabel:'Persentase JHT',
//                            xtype:'textfield',
//                            name:'jht'
//                        }, {
//                            fieldLabel:'Persentase JPK',
//                            xtype:'textfield',
//                            name:'jpk'
//                        }, {
//                            fieldLabel:'Persentase JKK',
//                            xtype:'textfield',
//                            name:'jkk'
//                        }, {
//                            fieldLabel:'Persentase JK',
//                            xtype:'textfield',
//                            name:'jk'
//                        }, {
//                            fieldLabel:'Persentase BPJS Kesehatan',
//                            xtype:'textfield',
//                            name:'bpjsk'
//                        }]
//                },
,
                {
                        xtype: 'fieldset',
                        title: 'Nomor Rekening',
                        collapsible: true,
                        defaults: {
                           labelWidth: 200,
                            // anchor: '100%',
                            layout: {
                                type: 'hbox',
                                defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                            }
                        },
                        items: [
                            {
                            fieldLabel:'PT Haleyora Power',
                            xtype:'textfield',
                            name:'norekpthp'
                        }, {
                            fieldLabel:'DANA PENSIUN PLN',
                            xtype:'textfield',
                            name:'norekdpp'
                        }, {
                            fieldLabel:'PLN',
                            xtype:'textfield',
                            name:'norekpln'
                        }]
                }

                ],
        buttons: [{
                    text: 'Simpan Pengaturan',
                    handler: function() {
                        var form = this.up('form').getForm();
                        if (form.isValid()) {
                            form.submit({
                                success: function(form, action) {
//                                    console.log(action)
                                    Ext.Msg.alert('Success', action.result.message);
//                                    storeGridPengaturan.load();
//                                    Ext.getCmp('formPengaturan').getForm().reset();
//                                    Ext.getCmp('windowPopupPengaturan').hide();
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                                     storeGridPengaturan.load();
                                }
                            });
                        } else {
                            Ext.Msg.alert( "Error!", "Your form is invalid!" );
                        }
                    }
                }]
    ,listeners : {
       afterrender: {
           fn : function(){
                // Ext.getCmp('formLembur').getForm().reset();
             var form = Ext.getCmp('formPengaturan').getForm();
              form.load({
                        url: SITE_URL+'pengaturan/loadpengaturan',
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
           }
       }
    }
});