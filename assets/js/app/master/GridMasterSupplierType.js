Ext.define('GridMasterSupplierTypeModel', {
    extend: 'Ext.data.Model',
    fields: ['supplier_type_id','supplier_type_name','supplier_type_desc','status'],
    idProperty: 'id'
});
var storeGridMasterSupplierType = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridMasterSupplierTypeModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/MasterSupplierType/master',
        actionMethods: 'POST',
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

var formMasterSupplierType = Ext.create('Ext.form.Panel', {
    id: 'formMasterSupplierType',
    // width: 740,
    autoWidth:true,
    // height: 370,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/MasterSupplierType/master',
     bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 130,
        width: 400
    },
    items: [
    {
            xtype: 'hiddenfield',
            name: 'supplier_type_id',
            id: 'supplier_type_id'
        }, {
            xtype: 'hiddenfield',
            name: 'statusformMasterSupplierType',
            id: 'statusformMasterSupplierType'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Type Name',
            allowBlank: false,
            name: 'supplier_type_name'
        }, {
            xtype: 'comboxswitch',
            fieldLabel: 'Status',
            allowBlank: false,
            name: 'status',
        },{
            xtype: 'textarea',
            fieldLabel: 'Description',
            allowBlank: false,
            name: 'supplier_type_desc'
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupMasterSupplierType');
            Ext.getCmp('formMasterSupplierType').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnMasterSupplierTypeSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formMasterSupplierType').getForm().reset();
                        Ext.getCmp('windowPopupMasterSupplierType').hide();
                        storeGridMasterSupplierType.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridMasterSupplierType.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wMasterSupplierType = Ext.create('widget.window', {
    id: 'windowPopupMasterSupplierType',
    title: 'Supplier Type',
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
    items: [formMasterSupplierType]
});


Ext.define('MY.searchGridMasterSupplierType', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridMasterSupplierType',
    store: storeGridMasterSupplierType,
    width: 180
});
var smGridMasterSupplierType = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridMasterSupplierType.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteMasterSupplierType').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteMasterSupplierType').enable();
        }
    }
});
Ext.define(dir_sys + 'master.GridMasterSupplierType', {
    title: 'Supplier Type',
    itemId: 'GridMasterSupplierTypeID',
    id: 'GridMasterSupplierTypeID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridMasterSupplierType',
    store: storeGridMasterSupplierType,
    loadMask: true,
    columns: [{
        header: 'supplier_type_id',
        dataIndex: 'supplier_type_id',
        hidden: true
    }, {
        header: 'Type Name',
        dataIndex: 'supplier_type_name',
        minWidth: 150
    }, {
        header: 'Status',
        dataIndex: 'status',
    }, {
        header: 'Description',
        flex:1,
        dataIndex: 'supplier_type_desc',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addMasterSupplierType',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wMasterSupplierType.show();
                Ext.getCmp('statusformMasterSupplierType').setValue('input');
            }
        }, {
            itemId: 'editMasterSupplierType',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridMasterSupplierType')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formMasterSupplierType = Ext.getCmp('formMasterSupplierType');
                    formMasterSupplierType.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/MasterSupplierType/1/master',
                        params: {
                            extraparams: 'a.supplier_type_id:' + selectedRecord.data.supplier_type_id
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wMasterSupplierType.show();
                    Ext.getCmp('statusformMasterSupplierType').setValue('edit');
                    Ext.getCmp('TabSupplier').setActiveTab(0);
                }
            }
        }, {
            id: 'btnDeleteMasterSupplierType',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridMasterSupplierType')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/MasterSupplierType/master',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    idmenu:24
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (!d.success) {
                                        Ext.Msg.alert('Informasi', d.message);
                                    } else {
                                        storeGridMasterSupplierType.load();
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
            xtype: 'searchGridMasterSupplierType',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridMasterSupplierType, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridMasterSupplierType.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formMasterSupplierType = Ext.getCmp('formMasterSupplierType');
            wMasterSupplierType.show();
            formMasterSupplierType.getForm().load({
                url: SITE_URL + 'backend/loadFormData/MasterSupplierType/1/master',
                params: {
                    extraparams: 'a.supplier_type_id:' + record.data.supplier_type_id
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
            Ext.getCmp('statusformMasterSupplierType').setValue('edit');

            Ext.getCmp('TabSupplier').setActiveTab(0);
        }
    }
});