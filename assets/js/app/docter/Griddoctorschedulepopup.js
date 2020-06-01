Ext.define('GriddoctorschedulepopupModel', {
    extend: 'Ext.data.Model',
    fields: ['schedule_id','doctor_id','day_id','day_name','Shift_1','Shift_2','Shift_3','Shift_4','status'],
    idProperty: 'id'
});

var storeGriddoctorschedulepopup = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GriddoctorschedulepopupModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'docter/schedule_datas',
        actionMethods: {
            read:'GET',
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

storeGriddoctorschedulepopup.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'key':key,
        // 'doctor_id':Ext.getCmp('staff_id').getValue()
    };
});

Ext.define('MY.searchGriddoctorschedulepopup', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGriddoctorschedulepopup',
    store: storeGriddoctorschedulepopup,
    width: 180
});

Ext.define(dir_sys + 'docter.Griddoctorschedulepopup', {
    title: 'Jadwal',
    width: 350,
    itemId: 'Griddoctorschedulepopup',
    id: 'Griddoctorschedulepopup',
    extend: 'Ext.grid.Panel',
    alias: 'widget.Griddoctorschedulepopup',
    store: storeGriddoctorschedulepopup,
    loadMask: true,
    columns: [
        {
            header: 'schedule_id',
            dataIndex: 'schedule_id',
            hidden: true
        },
        {
            header: 'doctor_id',      
            dataIndex: 'doctor_id',
            hidden: true
        },
        {
            header: 'Hari',      
            dataIndex: 'day_name',
            minWidth: 150,
        },
        {
            header: 'Jam I',      
            dataIndex: 'Shift_1',
            minWidth: 170,
        },
        {
            header: 'Jam II',      
            dataIndex: 'Shift_2',
            minWidth: 170,
        },        
        {
            header: 'Jam III',      
            dataIndex: 'Shift_3',
            minWidth: 170,
        },
        {
            header: 'Jam IV',      
            dataIndex: 'Shift_4',
            minWidth: 170,
        },
        {
            header: 'Status',
            dataIndex: 'status',
            minWidth: 150,
            renderer: function(value){
                return togglearr.map(function(val){return val[1]})[value];
            },
            flex:1,
        }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addSchedule',
            text: 'Tambah',
            // hidden:true,
            iconCls: 'add-icon',
            handler: function() {
                wSchedule.show();
                Ext.getCmp('statusformSchedule').setValue('input');
            }
        }, {
            itemId: 'editSchedule',
            text: 'Ubah',
            hidden:true,
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('Griddoctorschedulepopup')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    show_form_schedule(selectedRecord.data.schedule_id);
                }
            }
        }, {
            id: 'btnDeleteSchedule',
            text: 'Hapus',
            hidden:true,
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('Griddoctorschedulepopup')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: CLINIC_API + 'master/delete',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    // idunit:idunit,
                                    key:key,
                                    model:'Schedule',
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (d.success==false) {
                                        Ext.Msg.alert('Informasi', d.message);
                                        storeGriddoctorschedulepopup.load();
                                        
                                    } else {
                                        Ext.Msg.alert('Informasi', d.message);
                                        storeGriddoctorschedulepopup.load();
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
            //                    disabled: true
        }
        // , '->', 'Pencarian: ', ' ', {
        //     xtype: 'searchGriddoctorschedulepopup',
        //     text: 'Left Button'
        // }
        ]
    }, 
    {
        xtype: 'pagingtoolbar',
        store: storeGriddoctorschedulepopup, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGriddoctorschedulepopup.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // loadTransactionGrid(record.data.id_saving_trx)
        }
    }
});
