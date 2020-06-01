var docterFormProfil = Ext.create(dir_sys + 'docter.docterFormProfil');
var Griddoctorschedulepopup = Ext.create(dir_sys + 'docter.Griddoctorschedulepopup');


Ext.define('Tabdokter', {
    extend: 'Ext.tab.Panel',
    plain: true,
    id: 'Tabdokter',
    alias: 'widget.Tabdokter',
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
            xtype: 'docterFormProfil',
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
        },{
            xtype:'Griddoctorschedulepopup',
            listeners:{
                activate:function(){
                    var Griddoctorschedulepopup = Ext.getCmp('Griddoctorschedulepopup').getStore();

                    Griddoctorschedulepopup.on('beforeload', function(store, operation, eOpts) {
                        operation.params = {
                            key:key,
                            docter_id:Ext.getCmp('staff_id').getValue()
                        };
                    });

                    Griddoctorschedulepopup.load();
                }
            }
        }
    ]
});

Ext.define('fotodokterthumb', {
    extend: 'Ext.Component',
    // id:'formpegdata',
    alias: 'widget.fotodokterthumb',
    fieldLabel: 'Foto',
    autoEl: {
        tag: 'img',
        width: 80,
        height: 50
    }
});

Ext.define(dir_sys + 'docter.Windowdokter', {
    width: 850,
    extend: 'Ext.window.Window',
    modal: true,
    title: 'Data Dokter',
    id: 'Windowdokter',
    alias: 'widget.Windowdokter',
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
                xtype: 'fotodokterthumb',
                id: 'fotodokterthumb',
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
                fieldLabel: 'No Dokter',
                allowBlank: false,
                id: 'docter_staff_number',
                name: 'staff_number',
                anchor: '100%',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            setNumberDoctor(); 
                        });
                    }
                }
            },{
                fieldLabel: 'Nama Dokter',
                // afterLabelTextTpl: required,
                allowBlank: false,
                id: 'docter_staff_name',
                name: 'staff_name',
                anchor: '100%'
            },
            {
                xtype: 'comboxstafftype',
                name:'staff_type_id',
                id: 'docter_type_id',
                allowBlank: false,
                anchor: '100%'
            }
            ]
        }, {
            xtype: 'container',
            flex: 1,
            layout: 'anchor',
            defaultType: 'textfield',
            items: [

            {
                xtype: 'fieldcontainer',
                id:'container_docket',
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
                        id:'docter_location_id',
                        allowBlank: false,
                        anchor: '100%'

                    },
                    {
                        xtype: 'comboxpolytype',
                        fieldLabel:'Poli',
                        name:'polytpe_id',
                        id:'docter_polytpe_id',
                        allowBlank: false,
                        anchor: '100%'

                    },
                    {
                        xtype: 'comboxswitch',
                        id: 'status_docter',
                        fieldLabel:'Status',
                        name:'status',
                        allowBlank: false,
                        anchor: '100%'

                    }
                ]
            },
            
            ]
        }]
    }, {
        xtype: 'Tabdokter'
    }]
});