Ext.define('GridMasterWarehouseModel', {
    extend: 'Ext.data.Model',
    fields: ['warehouse_id', 'warehouse_code', 'warehouse_address', 'warehouse_cogs_standard', 'warehouse_type', 'warehouse_desc', 'status'],
    idProperty: 'id'
});
var storeGridMasterWarehouse = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridMasterWarehouseModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/MasterWarehouse/master',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'warehouse_code',
        direction: 'ASC'
    }]
});

var formMasterWarehouse = Ext.create('Ext.form.Panel', {
    id: 'formMasterWarehouse',
    // width: 740,
    autoWidth: true,
    // height: 370,
    autoHeight: true,
    url: SITE_URL + 'backend/saveform/MasterWarehouse/master',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 130,
        width: 400
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'warehouse_id',
        id: 'warehouse_id'
    }, {
        xtype: 'hiddenfield',
        name: 'statusformMasterWarehouse',
        id: 'statusformMasterWarehouse'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Code',
        allowBlank: false,
        name: 'warehouse_code'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Name',
        allowBlank: false,
        name: 'warehouse_type'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Address',
        allowBlank: false,
        name: 'warehouse_address'
    }, {
        xtype: 'textfield',
        fieldLabel: 'COGS Standard',
        allowBlank: false,
        name: 'warehouse_cogs_standard'
    }, {
        xtype: 'comboxswitch',
        name: 'status',
        fieldLabel: 'Status',
        allowBlank: false,
    }, {
        xtype: 'textarea',
        fieldLabel: 'Description',
        allowBlank: true,
        name: 'warehouse_desc'
    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupMasterWarehouse');
            Ext.getCmp('formMasterWarehouse').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnMasterWarehouseSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formMasterWarehouse').getForm().reset();
                        Ext.getCmp('windowPopupMasterWarehouse').hide();
                        storeGridMasterWarehouse.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridMasterWarehouse.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wMasterWarehouse = Ext.create('widget.window', {
    id: 'windowPopupMasterWarehouse',
    title: 'Warehouse',
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
    items: [formMasterWarehouse]
});


Ext.define('MY.searchGridMasterWarehouse', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridMasterWarehouse',
    store: storeGridMasterWarehouse,
    width: 180
});
var smGridMasterWarehouse = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridMasterWarehouse.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteMasterWarehouse').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteMasterWarehouse').enable();
        }
    }
});
Ext.define(dir_sys + 'master.GridMasterWarehouse', {
    title: 'Warehouse',
    itemId: 'GridMasterWarehouseID',
    id: 'GridMasterWarehouseID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridMasterWarehouse',
    store: storeGridMasterWarehouse,
    loadMask: true,
    columns: [{
        header: 'warehouse_id',
        dataIndex: 'warehouse_id',
        hidden: true
    }, {
        header: 'Code',
        dataIndex: 'warehouse_code',
        minWidth: 150
    }, {
        header: 'Name',
        dataIndex: 'warehouse_type',
        minWidth: 150
    }, {
        header: 'Address',
        flex: 1,
        dataIndex: 'warehouse_address',
        minWidth: 150
    }, {
        header: 'COGS Standard',
        dataIndex: 'warehouse_cogs_standard',
        minWidth: 150
    }, {
        header: 'Status',
        dataIndex: 'status',
    }, {
        header: 'Description',
        flex: 1,
        dataIndex: 'warehouse_desc',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addMasterWarehouse',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wMasterWarehouse.show();
                Ext.getCmp('statusformMasterWarehouse').setValue('input');
            }
        }, {
            itemId: 'editMasterWarehouse',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridMasterWarehouse')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formMasterWarehouse = Ext.getCmp('formMasterWarehouse');
                    formMasterWarehouse.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/MasterWarehouse/1/master',
                        params: {
                            extraparams: 'a.warehouse_id:' + selectedRecord.data.warehouse_id
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wMasterWarehouse.show();
                    Ext.getCmp('statusformMasterWarehouse').setValue('edit');
                    Ext.getCmp('TabSupplier').setActiveTab(0);
                }
            }
        }, {
            id: 'btnDeleteMasterWarehouse',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridMasterWarehouse')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/MasterWarehouse/master',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    idmenu: 24
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (!d.success) {
                                        Ext.Msg.alert('Informasi', d.message);
                                    } else {
                                        storeGridMasterWarehouse.load();
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
            xtype: 'searchGridMasterWarehouse',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridMasterWarehouse, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
            // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridMasterWarehouse.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formMasterWarehouse = Ext.getCmp('formMasterWarehouse');
            wMasterWarehouse.show();
            formMasterWarehouse.getForm().load({
                    url: SITE_URL + 'backend/loadFormData/MasterWarehouse/1/master',
                    params: {
                        extraparams: 'a.warehouse_id:' + record.data.warehouse_id
                    },
                    success: function(form, action) {
                        // Ext.Msg.alert("Load failed", action.result.errorMessage);
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert("Load failed", action.result.errorMessage);
                    }
                })
                //            
                //            Ext.getCmp('kddaerahS').setReadOnly(true);
            Ext.getCmp('statusformMasterWarehouse').setValue('edit');

            Ext.getCmp('TabSupplier').setActiveTab(0);
        }
    }
});