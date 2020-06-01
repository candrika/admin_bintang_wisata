Ext.define('GriddoctorscheduleModel', {
    extend: 'Ext.data.Model',
    fields: ['schedule_id','doctor_id','day_id','day_name','Shift_1','Shift_2','Shift_3','Shift_4','status'],
    idProperty: 'id'
});

var storeGriddoctorschedule = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GriddoctorscheduleModel',
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

storeGriddoctorschedule.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'key':key,
        'doctor_id':Ext.getCmp('doctor_id_Schedule').getValue()
        // 'password':password,
        // 'idunit':idunit,
        // 'userid':userid
    };
});

var formSchedule = Ext.create('Ext.form.Panel', {
    id: 'formSchedule',
    autoWidth:true,
    autoHeight:true,
    url: CLINIC_API + 'docter/save_schedule',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 130,
        width: 350
    },
    items: [
    {
            xtype: 'hiddenfield',
            name: 'key',
            fieldLabel:'key',
            id: 'key',
            value:key
        },
        {
            xtype: 'hiddenfield',
            name: 'statusformSchedule',
            fieldLabel:'statusformSchedule',
            id: 'statusformSchedule',
        },
        {
            xtype: 'hiddenfield',
            name: 'model',
            id: 'model',
            value:'Schedule'
        }, 
        {
            xtype: 'hiddenfield',
            name: 'doctor_id',
            id: 'doctor_id_Schedule'
        }, 
        {
            xtype: 'hiddenfield',
            name: 'schedule_id',
            id: 'schedule_id'
        },
        {
            xtype:'comboxdayname',
            name:'day_id',
            id:'day_id'
        }, 
        {
            xtype: 'timefield',
            fieldLabel: 'Shift 1',
            name: 'timesheet_1_start',
            id: 'timesheet_1_start',
            increment: 30,
            format: 'H:i:s',
            altFormats:'H:i:s',
            width:350
        },
        {
            xtype: 'timefield',
            fieldLabel: 'Shift 2',
            name: 'timesheet_2_start',
            id: 'timesheet_2_start',
            increment: 30,
            format: 'H:i:s',
            altFormats:'H:i:s',
            width:350
        },  
        {
            xtype: 'timefield',
            fieldLabel: 'Shift 3',
            name: 'timesheet_3_start',
            id: 'timesheet_3_start',
            increment: 30,
            format: 'H:i:s',
            altFormats:'H:i:s',
            width:350
        },  
        {
            xtype: 'timefield',
            fieldLabel: 'Shift 4',
            name: 'timesheet_4_start',
            id: 'timesheet_4_start',
            increment: 30,
            format: 'H:i:s',
            altFormats:'H:i:s',
            width:350
        },  
        {
            xtype: 'comboxswitch',
            name: 'status',
            id: 'status_Schedule',
            fieldLabel: 'Status',
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowSchedule');
            Ext.getCmp('formSchedule').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnScheduleSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        reset_form();
                        Ext.getCmp('windowSchedule').hide();
                        storeGriddoctorschedule.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridBrand.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wSchedule = Ext.create('widget.window', {
    id: 'windowSchedule',
    title: 'Form Jadwal',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formSchedule]
});

Ext.define('MY.searchGriddoctorschedule', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGriddoctorschedule',
    store: storeGriddoctorschedule,
    width: 180
});
var smGriddoctorschedule = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGriddoctorschedule.getSelection().length;
            if (selectedLen == 0) {
                // Ext.getCmp('btnDelete.Griddoctorschedule').disable();
            }
        },
        select: function(model, record, index) {
            // if (record.data.status == '2') {
            //     //sudah completed tidakbisa ubah status                
            //     Ext.getCmp('btnCompletedSavingTrx').disable();
            //     Ext.getCmp('btnPendingSavingTrx').disable();
            //     Ext.getCmp('btnRejectSavingTrx').disable();
                
            // } else {
            //    Ext.getCmp('btnCompletedSavingTrx').enable();
            //    Ext.getCmp('btnPendingSavingTrx').enable();
            //    Ext.getCmp('btnRejectSavingTrx').enable();
               
            // }
        }
    }
});
Ext.define(dir_sys + 'docter.Griddoctorschedule', {
    itemId: 'Griddoctorschedule',
    id: 'Griddoctorschedule',
    extend: 'Ext.grid.Panel',
    title: 'Daftar Jadwal',
    alias: 'widget.Griddoctorschedule',
    store: storeGriddoctorschedule,
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
            minWidth: 100,
        },
        {
            header: 'Jam I',      
            dataIndex: 'Shift_1',
            minWidth: 150,
        },
        {
            header: 'Jam II',      
            dataIndex: 'Shift_2',
            minWidth: 150,
        },        
        {
            header: 'Jam III',      
            dataIndex: 'Shift_3',
            minWidth: 150,
        },
        {
            header: 'Jam IV',      
            dataIndex: 'Shift_4',
            minWidth: 125,
        },
        {
            header: 'Status',
            dataIndex: 'status',
            minWidth: 120,
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
            itemId: 'btnadddoctorSchedule',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wSchedule.show();
                reset_form();
                Ext.getCmp('statusformSchedule').setValue('input');
            }
        }, {
            itemId: 'btneditdoctorSchedule',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('Griddoctorschedule')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    show_form_schedule(selectedRecord.data.doctor_id,selectedRecord.data.schedule_id);
                }
            }
        }, {
            id: 'btnDeletedoctorSchedule',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('Griddoctorschedule')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: CLINIC_API + 'docter/delete_schedule',
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
                                        storeGriddoctorschedule.load();
                                        
                                    } else {
                                        Ext.Msg.alert('Informasi', d.message);
                                        storeGriddoctorschedule.load();
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
        }, '->', 'Pencarian: ', ' ', {
            xtype: 'searchGriddoctorschedule',
            text: 'Left Button'
        }]
    }, 
    {
        xtype: 'pagingtoolbar',
        store: storeGriddoctorschedule, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGriddoctorschedule.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            show_form_schedule(record.data.doctor_id,record.data.schedule_id)
            // loadTransactionGrid(record.data.id_saving_trx)
        }
    }
});

function reset_form(){

   var form = Ext.getCmp('formSchedule').getForm();

   form.findField('schedule_id').setValue();
   form.findField('day_id').setValue();
   form.findField('timesheet_1_start').setValue();
   form.findField('timesheet_2_start').setValue();
   form.findField('timesheet_3_start').setValue();
   form.findField('timesheet_4_start').setValue();
   Ext.getCmp('status_Schedule').setValue();
}