Ext.define('GridMasterProductTypeModel', {
    extend: 'Ext.data.Model',
    fields: ['product_type_id','product_type_name','product_type_desc','status'],
    idProperty: 'id'
});
var storeGridMasterProductType = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridMasterProductTypeModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/MasterProductType/master',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'product_type_name',
        direction: 'DESC'
    }]
});

var formMasterProductType = Ext.create('Ext.form.Panel', {
    id: 'formMasterProductType',
    // width: 740,
    autoWidth:true,
    // height: 370,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/MasterProductType/master',
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
            name: 'product_type_id',
            id: 'product_type_id'
        }, {
            xtype: 'hiddenfield',
            name: 'statusformMasterProductType',
            id: 'statusformMasterProductType'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Type Name',
            allowBlank: false,
            name: 'product_type_name'
        }, {
            xtype: 'comboxswitch',
            fieldLabel: 'Status',
            name: 'status'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Description',
            allowBlank: true,
            name: 'product_type_desc'
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupMasterProductType');
            Ext.getCmp('formMasterProductType').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnMasterProductTypeSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formMasterProductType').getForm().reset();
                        Ext.getCmp('windowPopupMasterProductType').hide();
                        storeGridMasterProductType.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridMasterProductType.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wMasterProductType = Ext.create('widget.window', {
    id: 'windowPopupMasterProductType',
    title: 'Product Type',
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
    items: [formMasterProductType]
});


Ext.define('MY.searchGridMasterProductType', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridMasterProductType',
    store: storeGridMasterProductType,
    width: 180
});
var smGridMasterProductType = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridMasterProductType.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteMasterProductType').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteMasterProductType').enable();
        }
    }
});
Ext.define(dir_sys + 'master.GridMasterProductType', {
    title: 'Product Type',
    itemId: 'GridMasterProductTypeID',
    id: 'GridMasterProductTypeID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridMasterProductType',
    store: storeGridMasterProductType,
    loadMask: true,
    columns: [{
        header: 'product_type_id',
        dataIndex: 'product_type_id',
        hidden: true
    }, {
        header: 'Type Name',
        dataIndex: 'product_type_name',
        minWidth: 150
    }, {
        header: 'Status',
        dataIndex: 'status',
    }, {
        header: 'Description',
        flex:1,
        dataIndex: 'product_type_desc',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addMasterProductType',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wMasterProductType.show();
                Ext.getCmp('statusformMasterProductType').setValue('input');
            }
        }, {
            itemId: 'editMasterProductType',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridMasterProductType')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formMasterProductType = Ext.getCmp('formMasterProductType');
                    formMasterProductType.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/MasterProductType/1/master',
                        params: {
                            extraparams: 'a.product_type_id:' + selectedRecord.data.product_type_id
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wMasterProductType.show();
                    Ext.getCmp('statusformMasterProductType').setValue('edit');
                    Ext.getCmp('Tabproduct').setActiveTab(0);
                }
            }
        }, {
            id: 'btnDeleteMasterProductType',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridMasterProductType')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/MasterProductType/master',
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
                                        storeGridMasterProductType.load();
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
            xtype: 'searchGridMasterProductType',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridMasterProductType, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridMasterProductType.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formMasterProductType = Ext.getCmp('formMasterProductType');
            wMasterProductType.show();
            formMasterProductType.getForm().load({
                url: SITE_URL + 'backend/loadFormData/MasterProductType/1/master',
                params: {
                    extraparams: 'a.product_type_id:' + record.data.product_type_id
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
            Ext.getCmp('statusformMasterProductType').setValue('edit');

            Ext.getCmp('Tabproduct').setActiveTab(0);
        }
    }
});