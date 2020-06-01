// var Windowdoctorschedule = Ext.create(dir_sys + 'docter.Windowdoctorschedule')

Ext.define('GridscheduleModel', {
    extend: 'Ext.data.Model',
    fields: ['staff_id','group_id','user_id','staff_name','staff_address','staff_address','staff_mobilephone','staff_email','staff_photo','no_identity','polytpe_id','account_number','account_name','bank_name','remarks','status','location_id','staff_number','location_name','polytpe_name'],
    idProperty: 'id'
});

var storeGridschedule = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridscheduleModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'docter/datas',
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

storeGridschedule.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'key':key,
        'group_id':5
    };
});

var smGridschedule = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'MULTI',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridschedule.getSelection().length;
            if (selectedLen == 0) {
                // Ext.getCmp('GridscheduleID').queryById('btnEdit').setDisabled(true);
                Ext.getCmp('GridscheduleID').queryById('btnDelete').setDisabled(true);
            }
        },
        select: function(model, record, index) {
            // Ext.getCmp('GridscheduleID').queryById('btnEdit') .setDisabled(false);
            Ext.getCmp('GridscheduleID').queryById('btnDelete') .setDisabled(false);
        }
    }
});

Ext.define('MY.searchGridschedule', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridschedule',
    store: storeGridschedule,
    width: 130
});

Ext.define(dir_sys + 'docter.Gridschedule', {
    title: 'Dokter',
    width: 150,
    itemId: 'GridscheduleID',
    id: 'GridscheduleID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.Gridschedule',
    store: storeGridschedule,
    selModel: smGridschedule,
    loadMask: true,
    columns: [
        {header: 'staff_id', dataIndex:'staff_id', hidden:true},
        {header: 'group_id', dataIndex:'group_id', hidden:true},
        {header: 'Nama Dokter', width: 150, dataIndex: 'staff_name', flex:1},
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                itemId: 'btnAdd',
                text: 'Dokter',
                hidden:true,
                iconCls: 'add-icon',
                handler: function() {
                    var grid = Ext.ComponentQuery.query('Gridschedule')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var rows = grid.getSelectionModel().getSelection();
                    if (rows.length == 0) {
                        Ext.Msg.alert('Warning', 'Pilih dokter terlebih dahulu');
                    } else {
                        
                        Ext.getCmp('doctor_id').setValue(selectedRecord.data.staff_id);

                        Windowdoctorschedule.show();
                        
                        var store = Ext.getCmp('Griddoctorschedule').getStore();
                        
                        store.removeAll();
                        
                        store.on('beforeload', function(store, operation, eOpts) {
                            operation.params = {
                                key:key,
                                docter_id:selectedRecord.data.staff_id
                            };
                        });

                        store.load();

                    }
                }
            }, {
                itemId: 'btnEdit',
                text: 'Edit',
                iconCls: 'edit-icon',
                disabled: true,
                hidden:true,
                handler: function() {
                    var grid = Ext.ComponentQuery.query('Gridschedule')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var rows = grid.getSelectionModel().getSelection();
                    if (rows.length == 0) {
                        Ext.Msg.alert('Failure', 'Brand is not set!');
                    } else {
                        Formdocter.statusform = 'edit';
                        var data = null;
                        storeGridschedule.getRange().every(function(rec){
                            if(rec.data['iddocter'] == selectedRecord.data['iddocter']){
                                data = rec;
                                return false; 
                            }
                            return true;
                        });
                        formdocter.loadRecord(data);
                        Formdocter.show();
                    }
                }
            }, {
                itemId: 'btnDelete',
                text: 'Hapus',
                iconCls: 'delete-icon',
                disabled: true,
                hidden:true,
                handler: function() {
                    Ext.Msg.show({
                        title: 'Confirm',
                        msg: 'Data pasien akan dihapus ?',
                        buttons: Ext.Msg.YESNO,
                        fn: function(btn) {
                            if (btn == 'yes') {
                                var grid = Ext.ComponentQuery.query('Gridschedule')[0];
                                var sm = grid.getSelectionModel();
                                selected = [];
                                Ext.each(sm.getSelection(), function(item) {
                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                });
                                console.log(selected);
                                Ext.Ajax.request({
                                    url: CLINIC_API + 'docter/delete',
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
                                            storeGridschedule.load();       
                                        } else {
                                            storeGridschedule.load();
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
                xtype: 'searchGridschedule',
                text: 'Left Button',
            }
        ],
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridschedule, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridschedule.load();
            }
        },
        itemclick:function(dv, record, item, index, e){
            var schedule_store = Ext.getCmp('Griddoctorschedule').getStore();
            
            schedule_store.removeAll();
            console.log(record.data.staff_id)
            schedule_store.on('beforeload', function(store, operation, eOpts) {
                operation.params = {
                    key:key,
                    docter_id:record.data.staff_id
                };
            });

            schedule_store.load(); 

            Ext.getCmp('doctor_id_Schedule').setValue(record.data.staff_id);
        },
        // itemdblclick: function(dv, record, item, index, e) {
        //     console.log(record.data.staff_id);
        //     view_schedule(record.data.staff_id);
        // }
    }
});
