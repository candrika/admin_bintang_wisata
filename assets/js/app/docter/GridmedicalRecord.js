if(!Ext.isDefined(Ext.getCmp('Windowdiagnosis'))){
    var Windowdiagnosis = Ext.create(dir_sys + 'docter.Windowdiagnosis')
}else{
    var Windowdiagnosis    = Ext.getCmp('Windowdiagnosis');
}

Ext.define('GridmedicalRecordModel', {
    extend: 'Ext.data.Model',
    fields: ['medical_record_id','patient_id','medical_record_desc','medical_action_name','medical_record_no','medical_record_date','doctor_id','nurse_id','medical_status','payment_status','receipt_number','medicine_status','patient_name','datein','patient_type','doctor_name','member_name'],
    idProperty: 'id'
});

var storeGridmedicalRecord = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridmedicalRecordModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'docter/medical_record',
        actionMethods: {
            read: 'GET',
        },
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'menu_name',
        direction: 'DESC'
    }]
});

storeGridmedicalRecord.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'key':key,
         startdate:Ext.getCmp('record_startdate').getValue(),
         enddate:Ext.getCmp('record_enddate').getValue(),
    };
});

var smGridmedicalRecord = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'MULTI',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridmedicalRecord.getSelection().length;
            if (selectedLen == 0) {
                Ext.getCmp('GridmedicalRecordID').queryById('btnmedicalrecordprint').setDisabled(true);
                Ext.getCmp('GridmedicalRecordID').queryById('btnDelete').setDisabled(true);
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('GridmedicalRecordID').queryById('btnmedicalrecordprint') .setDisabled(false);
            Ext.getCmp('GridmedicalRecordID').queryById('btnDelete') .setDisabled(false);
        }
    }
});

Ext.define('MY.searchGridmedicalRecordDiagnosis', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridmedicalRecord',
    store: storeGridmedicalRecord,
    width: 180
});

Ext.define(dir_sys + 'docter.GridmedicalRecord', {
    // title: 'Pasient',
    itemId: 'GridmedicalRecordID',
    id: 'GridmedicalRecordID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridmedicalRecord',
    store: storeGridmedicalRecord,
    selModel: smGridmedicalRecord,
    loadMask: true,
    columns: [
        {header: 'medical_record_id', dataIndex:'medical_record_id', hidden:true},
        {header: 'patient_id', dataIndex:'patient_id', hidden:true},
        {header: 'doctor_id', dataIndex:'doctor_id', hidden:true},
        {header: 'nurse_id', dataIndex:'nurse_id', hidden:true},
        {header: 'No Referensi', minWidth: 150, dataIndex: 'medical_record_no' },
        {header: 'Nama Pasien', minWidth: 150, dataIndex: 'patient_name'},
        {header: 'Nama Anggota', minWidth: 150, dataIndex: 'member_name'},
        {header: 'Jenis', dataIndex:'patient_type', minWidth: 150},
        {header: 'Dokter', minWidth: 150, dataIndex: 'doctor_name'},
        {header: 'Tanggal Masuk', minWidth: 200, dataIndex: 'datein' },
        {header: 'Tanggal Diagnosa', minWidth: 200, dataIndex: 'medical_record_date' },
        // {header: 'Jenis', dataIndex:'patient_type', minWidth: 100},
        {header: 'Status', dataIndex:'medical_status', minWidth: 100,  
            renderer: function(value) {
               return customColumnStatus(ArrmedicalStatus,value);
            },
            flex:1
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype:'datefield',
                fieldLabel: 'Tanggal Diagnosa',
                id:'record_startdate',
                format:'d/m/Y',
                labelWidth: 170,
            },
            's/d'
            ,{
                xtype:'datefield',
                name:'record_enddate',
                id:'record_enddate',
                format:'d/m/Y',
            },{
                text:'Cari',
                handler:function(){
                    storeGridmedicalRecord.load();
                }
            },{
                text:'Hapus',
                handler:function(){
                    Ext.getCmp('medical_record_startdate').setValue();
                    Ext.getCmp('medical_record_enddate').setValue();
                    storeGridmedicalRecord.load();
                }
            }]
        },{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                itemId: 'btnmedicalrecordAdd',
                text: 'Buat Diagnosa',
                iconCls: 'add-icon',
                hidden:true,
                handler: function() {
                    Windowdiagnosis.show();
                    var form = Ext.getCmp('Formdiagnosa').getForm();
                    form.reset();

                    Ext.getCmp('Gridrecordaction').getStore().removeAll();
                    Ext.getCmp('Gridrecorddisease').getStore().removeAll();
                    Ext.getCmp('Gridrecorddrug').getStore().removeAll();
                                        
                    
                }
            },{
                itemId: 'btnmedicalreceptprint',
                iconCls: 'print-icon',
                text:'Bukti Berobat',
                handler: function() {
                    var grid = Ext.ComponentQuery.query('GridmedicalRecord')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var rows = grid.getSelectionModel().getSelection();
                    if (rows.length == 0) {
                        Ext.Msg.alert('Failure', 'Brand is not set!');
                    } else {
                        Ext.create('Ext.window.Window', {
                            title: 'Bukti Berobat',
                            modal: true,
                            width: 950,
                            height:500,
                            items: [{
                                xtype: 'component',
                                html: '<iframe src="' + SITE_URL + 'docter/medical_receipt/' + selectedRecord.data.medical_record_id + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
                            }],
                            buttons: [{
                                text: 'Print',
                                iconCls: 'print-icon',
                                handler: function() {
                                        window.open(SITE_URL + 'docter/medical_receipt/' + selectedRecord.data.medical_record_id + '/print', '_blank');
                                }
                            }]
                        }).show();
                    }
                }
            },{
                itemId: 'btnmedicalrecordprint',
                text: 'Cetak',
                iconCls: 'print-icon',
                disabled: true,
                // hidden:true,
                handler: function() {
                    var grid = Ext.ComponentQuery.query('GridmedicalRecord')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var rows = grid.getSelectionModel().getSelection();
                    if (rows.length == 0) {
                        Ext.Msg.alert('Failure', 'Brand is not set!');
                    } else {
                        Ext.create('Ext.window.Window', {
                            title: 'Cetak Diagnosa',
                            modal: true,
                            width: 950,
                            height:500,
                            items: [{
                                xtype: 'component',
                                html: '<iframe src="' + SITE_URL + 'docter/medic_record_receipt/' + selectedRecord.data.medical_record_id + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
                            }],
                            buttons: [{
                                text: 'Print',
                                iconCls: 'print-icon',
                                handler: function() {
                                        window.open(SITE_URL + 'docter/medic_record_receipt/' + selectedRecord.data.medical_record_id + '/print', '_blank');
                                }
                            }]
                        }).show();
                    }
                }
            },{
                itemId: 'btnreceiptprint',
                text: 'Cetak Resep',
                iconCls: 'print-icon',
                disabled: true,
                hidden:true,
                handler: function() {
                    var grid = Ext.ComponentQuery.query('GridmedicalRecord')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var rows = grid.getSelectionModel().getSelection();
                    if (rows.length == 0) {
                        Ext.Msg.alert('Failure', 'Brand is not set!');
                    } else {
                       
                    }
                }
            }, {
                itemId: 'btnocdprint',
                text: 'Cetak OCD',
                iconCls: 'print-icon',
                disabled: true,
                hidden:true,
                handler: function() {
                    var grid = Ext.ComponentQuery.query('GridmedicalRecord')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var rows = grid.getSelectionModel().getSelection();
                    if (rows.length == 0) {
                        Ext.Msg.alert('Failure', 'Brand is not set!');
                    } else {
                       
                    }
                }
            },{
                itemId: 'btnDelete',
                text: 'Hapus',
                iconCls: 'delete-icon',
                disabled: true,
                id:'btnDeletemedicalrecord',
                handler: function() {
                    Ext.Msg.show({
                        title: 'Confirm',
                        msg: 'Data pasien akan dihapus ?',
                        buttons: Ext.Msg.YESNO,
                        fn: function(btn) {
                            if (btn == 'yes') {
                                var grid = Ext.ComponentQuery.query('GridmedicalRecord')[0];
                                var sm = grid.getSelectionModel();
                                selected = [];
                                Ext.each(sm.getSelection(), function(item) {
                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                    
                                });
                                console.log(selected);
                                Ext.Ajax.request({
                                    url: CLINIC_API + 'docter/delete_medical',
                                    method: 'POST',
                                    params: {
                                        postdata: Ext.encode(selected),
                                        key:key,
                                        idmenu:24
                                    },
                                    success: function(form, action) {
                                        var d = Ext.decode(form.responseText);
                                        if (!d.success) {
                                            Ext.Msg.alert('Informasi', d.message);
                                            storeGridmedicalRecord.load();       
                                        } else {
                                            storeGridmedicalRecord.load();
                                        }
                                    },
                                    failure: function(form, action) {
                                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                    }
                                });
                                
                            }
                        }
                    });
                },
            }, 
            '->', 
            'Pencarian: ', 
            ' ', 
            {
                xtype: 'searchGridmedicalRecord',
                text: 'Left Button',
            }
        ],
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridmedicalRecord, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridmedicalRecord.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            console.log(record.data.medical_record_id);
            load_diagnosis(record.data.medical_record_id);
            Ext.getCmp('BtndignosaGridSimpan').disable()
        }
    }
});
