
var nurseFormProfil = Ext.create(dir_sys + 'nurse.nurseFormProfil');

Ext.define('Tabperawat', {
    extend: 'Ext.tab.Panel',
    plain: true,
    id: 'Tabperawat',
    alias: 'widget.Tabperawat',
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
            xtype: 'nurseFormProfil',
            // listeners: {
            //     activate: function() {
            //          // var status = Ext.getCmp('comboxStatusMember_frm_member').getValue();
            //         // console.log(status)
            //         // if(status==4){
            //             // Ext.getCmp('BtnPerawatGridSimpan').setDisabled(true);
            //         // } else {
            //             // Ext.getCmp('BtnPerawatGridSimpan').setDisabled(false);
            //         // }
            //         // storeGridMemberSavingGrid.load();
            //         // Ext.getCmp('GridMemberLoanGridID').getStore().load();
            //     }
            // }
        }
    ]
});
var wPerawatGrid = Ext.create('widget.window', {
    id: 'windowPopupperawattGrid',
    title: 'Data perawat',
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
        xtype: 'Tabperawat'
    }],
    buttons: [{
        text: 'Tutup',
        handler: function() {
            // patientFormProfil
            var win = Ext.getCmp('windowPopupperawattGrid');
            Ext.getCmp('patientFormProfil').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnperawatGridSimpan',
        text: 'Simpan',
        handler: function() {
        
            var formDetail = Ext.getCmp('memberFormDetailID').getValues();
            var form = Ext.getCmp('formPerawatGrid').getForm();
            if(form.isValid()) {
                form.submit({
                    // url: SITE_URL + 'backend/saveform/PerawatGrid/member',
                    // params: formDetail,
                    success: function(form, action) {
                        // Ext.Msg.alert('Success', action.result.message);
                        // form.reset();
                        // Ext.getCmp('memberFormDetailID').getForm().reset();
                        // Ext.getCmp('WindowPerawat').hide();
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
Ext.define('fotoperawatthumb', {
    extend: 'Ext.Component',
    // id:'formpegdata',
    alias: 'widget.fotoperawatthumb',
    fieldLabel: 'Foto',
    autoEl: {
        tag: 'img',
        width: 80,
        height: 50
    }
});

Ext.define(dir_sys + 'nurse.Windowperawat', {
    width: 850,
    extend: 'Ext.window.Window',
    modal: true,
    title: 'Data perawat',
    id: 'Windowperawat',
    alias: 'widget.Windowperawat',
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
                xtype: 'fotoperawatthumb',
                id: 'fotoperawatthumb',
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
                fieldLabel: 'No perawat',
                allowBlank: false,
                id: 'staff_number',
                name: 'staff_number',
                anchor: '100%',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            setNumberNurse();        
                        });
                    }
                }
            },{
                fieldLabel: 'Nama perawat',
                // afterLabelTextTpl: required,
                allowBlank: false,
                id: 'staff_name',
                name: 'staff_name',
                anchor: '100%'
            },
            ,
            {
                xtype: 'comboxswitch',
                id: 'status_nurse',
                fieldLabel:'Status',
                name:'status',
                allowBlank: false,
                anchor: '100%'

            }
            // {
            //     xtype: 'comboxperawattype',
            //     name:'staff_type_id',
            //     id: 'staff_type_id',
            //     allowBlank: false,
            //     anchor: '100%'
            // }
            ]
        }, {
            xtype: 'container',
            flex: 1,
            layout: 'anchor',
            defaultType: 'textfield',
            items: [

            {
                xtype: 'fieldcontainer',
                id:'container_perawat',
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
                        xtype: 'comboxlocation',
                        fieldLabel:'Lokasi',
                        // name:'location_id',
                        id:'location_id',
                        allowBlank: false,
                        anchor: '100%'

                    },
                    {
                        xtype: 'comboxpolytype',
                        fieldLabel:'Poli',
                        // name:'polytpe_id',
                        id:'polytpe_id',
                        allowBlank: false,
                        anchor: '100%'

                    }
                ]
            },
            
            ]
        }]
    }, {
        xtype: 'Tabperawat'
    }]
});