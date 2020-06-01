Ext.define('GridStaffTypeModel', {
    extend: 'Ext.data.Model',
    fields: ['staff_type_id','staff_type_name','deleted','userin','datein','usermod','datemod','status'],
    idProperty: 'id'
});

var storeGridStaffType = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridStaffTypeModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'get/datas?model=staff_type',
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

storeGridStaffType.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'key':key,
        'password':password,
        'idunit':idunit,
        'userid':userid
    };
});

var formStaffType = Ext.create('Ext.form.Panel', {
    id: 'formStaffType',
    // width: 740,
    autoWidth:true,
    // height: 370,
    autoHeight:true,
    url: CLINIC_API + 'form/save/StaffType',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 130,
        width: 500
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
            name: 'statusformStaffType',
            fieldLabel:'statusformStaffType',
            id: 'statusformStaffType',
            // value:password 
        },
        // {
        //     xtype: 'hiddenfield',
        //     name: 'model',
        //     // fieldLabel:'key',
        //     id: 'model',
        //     value:'staff_type'
        // }, 
        // {
        //     xtype: 'hiddenfield',
        //     name: 'StaffType_id',
        //     fieldLabel:'StaffType_id',
        //     id: 'StaffType_id'
        // }, 
        {
            xtype: 'textfield',
            fieldLabel: 'Jenis Dokter',
            allowBlank: false,
            name: 'staff_type_name'
        }, 
        {
            xtype: 'comboxswitch',
            name: 'status',
            id: 'status_StaffType',
            fieldLabel: 'Status',
            // hidden:true,
            // value:1
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupStaffType');
            Ext.getCmp('formStaffType').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnStaffTypeSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    params:{
                        model:'staff_type'
                    },
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formStaffType').getForm().reset();
                        Ext.getCmp('windowPopupStaffType').hide();
                        storeGridStaffType.load();
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

var wStaffType = Ext.create('widget.window', {
    id: 'windowPopupStaffType',
    title: 'Jenis Dokter',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formStaffType]
});

Ext.define('MY.searchGridStaffType', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridStaffType',
    store: storeGridStaffType,
    width: 180
});
var smGridStaffType = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridStaffType.getSelection().length;
            if (selectedLen == 0) {
                // Ext.getCmp('btnDelete.GridStaffType').disable();
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
Ext.define(dir_sys + 'master.GridStaffType', {
    title: 'Jenis Dokter',
    itemId: 'GridStaffType',
    id: 'GridStaffType',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridStaffType',
    store: storeGridStaffType,
    // selModel: smGridStaffType,
    loadMask: true,
    columns: [
        {
            header: 'StaffType_id',
            dataIndex: 'staff_type_id',
            hidden: true
        },
        {
            header: 'Jenis Dokter',      
            dataIndex: 'staff_type_name',
            minWidth: 150,
            flex:1
        },
        {
            // hidden:true,
            header: 'Status',
            dataIndex: 'status',
            minWidth: 150,
            renderer: function(value){
                return togglearr.map(function(val){return val[1]})[value];
            }
            // hidden:true,
        },
        // {
        //     header: 'Deskripsi',
        //     dataIndex: 'notes',
        //     minWidth: 170,
        //     flex:1
        // },  
        // {
        //     header: 'Alamat',
        //     flex: 1,
        //     dataIndex: 'StaffType_address',
        //     minWidth: 250
        // }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addStaffType',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wStaffType.show();
                Ext.getCmp('formPoliType').getForm().reset();
                Ext.getCmp('statusformStaffType').setValue('input');
            }
        }, {
            itemId: 'editStaffType',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('formStaffType')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjang').setReadOnly(false);
                    var formInventoryCat = Ext.getCmp('formStaffType');
                    formInventoryCat.getForm().load({
                        url: CLINIC_API + 'master/form_StaffType',
                        method:'GET',
                        params: {
                            extraparams: 'a.StaffType_id=' + selectedRecord.data.StaffType_id,
                            model:'staff_type',
                            key:key,
                            // password:password
                        },
                        success: function(form, action) {
                            var d = Ext.decode(form.responseText);
                            console.log(d);
                            Ext.getCmp('status_StaffType').getStore().load();

                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wStaffType.show();
                    Ext.getCmp('statusformStaffType').setValue('edit');
                }
            }
        }, {
            id: 'btnDeleteStaffType',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridStaffType')[0];
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
                                    model:'staff_type',
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (d.success==false) {
                                        Ext.Msg.alert('Informasi', d.message);
                                        storeGridStaffType.load();
                                        
                                    } else {
                                        Ext.Msg.alert('Informasi', d.message);
                                        storeGridStaffType.load();
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
            xtype: 'searchGridStaffType',
            text: 'Left Button'
        }]
    }, 
    {
        xtype: 'pagingtoolbar',
        store: storeGridStaffType, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridStaffType.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // loadTransactionGrid(record.data.id_saving_trx)
        }
    }
});
