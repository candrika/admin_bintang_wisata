
var patientFormProfil = Ext.create(dir_sys + 'patient.patientFormProfil');

Ext.define('Tabpasien', {
    extend: 'Ext.tab.Panel',
    plain: true,
    id: 'Tabpasien',
    alias: 'widget.Tabpasien',
    activeTab: 0,
    autoWidth: '100%',
    bodyPadding: 5,
    autoScroll: false,
    defaults: {
        // autoScroll: true,
        // bodyPadding: '1 0 15 0'
    },
    items: [
        // MemberDashboard,
        {
            xtype: 'patientFormProfil',
            // listeners: {
            //     activate: function() {
            //          // var status = Ext.getCmp('comboxStatusMember_frm_member').getValue();
            //         // console.log(status)
            //         // if(status==4){
            //             // Ext.getCmp('BtnAnggotaGridSimpan').setDisabled(true);
            //         // } else {
            //             // Ext.getCmp('BtnAnggotaGridSimpan').setDisabled(false);
            //         // }
            //         // storeGridMemberSavingGrid.load();
            //         // Ext.getCmp('GridMemberLoanGridID').getStore().load();
            //     }
            // }
        }
    ]
});
var wAnggotaGrid = Ext.create('widget.window', {
    id: 'windowPopupPasientGrid',
    title: 'Data pasien',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: 850,
    height: sizeH,
    modal: true,
    // autoHeight: true,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'Tabpasien'
    }],
    buttons: [{
        text: 'Tutup',
        handler: function() {
            // patientFormProfil
            var win = Ext.getCmp('windowPopupPasientGrid');
            Ext.getCmp('patientFormProfil').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnPasienGridSimpan',
        text: 'Simpan',
        handler: function() {
        
            var formDetail = Ext.getCmp('memberFormDetailID').getValues();
            var form = Ext.getCmp('formAnggotaGrid').getForm();
            if(form.isValid()) {
                form.submit({
                    // url: SITE_URL + 'backend/saveform/AnggotaGrid/member',
                    // params: formDetail,
                    success: function(form, action) {
                        // Ext.Msg.alert('Success', action.result.message);
                        // form.reset();
                        // Ext.getCmp('memberFormDetailID').getForm().reset();
                        // Ext.getCmp('WindowAnggota').hide();
                        // Ext.getCmp('GridPatientID').getStore().load();
                    },
                    failure: function(form, action) {
                        // Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGrifrm_memberGrid.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
Ext.define('fotoPasienthumb', {
    extend: 'Ext.Component',
    // id:'formpegdata',
    alias: 'widget.fotoPasienthumb',
    fieldLabel: 'Foto',
    autoEl: {
        tag: 'img',
        width: 80,
        height: 50
    }
});
Ext.define(dir_sys + 'patient.WindowPasien', {
    width: 850,
    extend: 'Ext.window.Window',
    modal: true,
    title: 'Data Pasien',
    id: 'WindowPasien',
    alias: 'widget.WindowPasien',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    listeners: {
        'close': function(win) {
            // Ext.getCmp('btnUbahNilaiUT').hide();
        },
        'hide': function(win) {
            // Ext.getCmp('btnUbahNilaiUT').hide();
        }
    },
    // width: 750,
    // minWidth: 650,
    // height: 580,
    //    maximizable: true,
    border: false,
    autoScroll: true,
    bodyStyle: 'padding-right: 0px',
    items: [{
        // id:'patientForm',
        xtype: 'container',
        layout: 'hbox',
        defaults: {
            padding: '5 10 5 5',
        },
        items: [{
            xtype: 'container',
            // flex: 1,
            border: false,
            layout: 'anchor',
            defaultType: 'textfield',
            items: [{
                xtype: 'fotoPasienthumb',
                id: 'fotoPasienthumb',
                fieldLabel: 'Foto',
                anchor: '40%',
                width: 87,
                height: 100,
            }]
        },
         {
            xtype: 'container',
            flex: 1,
            layout: 'anchor',
            defaultType: 'textfield',
            defaults: {
                // padding: '5 10 5 5',
                labelWidth: 120,
                width: 450
            },
            items: [
            {
                fieldLabel: 'No Pasien',
                allowBlank: false,
                id: 'patient_no',
                name: 'patient_no',
                anchor: '100%',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            setNoArticle(idunit, 'patient_id', 'patient_no', 'patient', 'patient_no', 'PSN');
                                   
                        });
                    }
                }
            },{
                fieldLabel: 'Nama Pasien',
                // afterLabelTextTpl: required,
                allowBlank: false,
                id: 'patient_name',
                name: 'patient_name',
                anchor: '100%'
            },
            {
                xtype: 'comboxpasientype',
                name:'patient_type_id',
                id: 'patient_type_id',
                allowBlank: false,
                anchor: '100%'
            },            
            {
                xtype: 'hiddenfield',
                name: 'id_member',
                id: 'member_id'
            }]
        }, {
            xtype: 'container',
            flex: 1,
            layout: 'anchor',
            defaultType: 'textfield',
            items: [

            {
                xtype: 'fieldcontainer',
                id:'container_pasien',
                // fieldLabel: 'Kode Pengurus',
                combineErrors: true,
                labelWidth:120,
                msgTarget: 'side',
                layout: 'vbox',
                defaults: {
                    // flex: 1,
                    // hideLabel: true
                },
                items: [
                    {
                        xtype:'textfield',
                        fieldLabel:'Nomor NP',
                        id:'np_number',
                        name:'np_number',
                        // allowBlank: false,
                        anchor: '100%'
                        
                    },
                    {
                        xtype: 'comboxpatientStatus',
                        id: 'status_patient',
                        fieldLabel:'Status',
                        name:'status',
                        allowBlank: false,
                        anchor: '100%'

                    },
                    {
                        xtype:'comboxBusinessUnitpatient',
                        name:'business_id',
                        id:'business_id_patient'
                    }
                ]
            },
            
            ]
        }]
    }, {
        xtype: 'Tabpasien'
    }]
});