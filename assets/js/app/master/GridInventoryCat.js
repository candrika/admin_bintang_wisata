var formInventoryCat = Ext.create('Ext.form.Panel', {
    id: 'formInventoryCat',
    // width: 540,
    // height: 430,
    autoWidth:true,
    autoHeight:true,
    // url: CLINIC_API + 'form/save/MasterProductLocation',
    url: CLINIC_API + 'form/save',
    baseParams: {idmenu:101},
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 160,
        width: '100%'
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'statusformInventoryCat',
        id: 'statusformInventoryCat'
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'idinventorycat',
        name: 'idinventorycat'
    },{
        xtype: 'hiddenfield',
        name: 'model',
        id: 'model',
        value:'inventorycat'
    },
    {
        xtype: 'hiddenfield',
        name: 'dir',
        id: 'dir',
        value:'reference'
    },
    {
         xtype: 'hiddenfield',
            name: 'key',
            fieldLabel:'key',
            id: 'key',
            value:key
        },{
            xtype: 'hiddenfield',
            name: 'idunit',
            id: 'idunit',
            value:idunit
        },{
        xtype: 'textfield',
        fieldLabel: 'Nama Kategori',
        allowBlank: false,
        name: 'namecat'
    }, {
        xtype: 'textarea',
        fieldLabel: 'Deskripsi',
        name: 'description'
    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupInventoryCat');
            Ext.getCmp('formInventoryCat').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnInventoryCatSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formInventoryCat').getForm().reset();
                        Ext.getCmp('windowPopupInventoryCat').hide();
                        storeGridInventoryCat.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridInventoryCat.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
var wInventoryCat = Ext.create('widget.window', {
    id: 'windowPopupInventoryCat',
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
    items: [formInventoryCat]
});
Ext.define('GridInventoryCatModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventorycat','namecat','description','userin','datein'],
    idProperty: 'id'
});
var storeGridInventoryCat = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridInventoryCatModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/inventorycat/reference',
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
Ext.define('MY.searchGridInventoryCat', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridInventoryCat',
    store: storeGridInventoryCat,
    width: 180
});
var smGridInventoryCat = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridInventoryCat.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteInventoryCat').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteInventoryCat').enable();
        }
    }
});
Ext.define(dir_sys + 'master.GridInventoryCat', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridInventoryCat,
    title: 'Kategori',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridInventoryCatID',
    id: 'GridInventoryCatID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridInventoryCat',
    store: storeGridInventoryCat,
    loadMask: true,
    columns: [{
        header: 'Code',
        dataIndex: 'idinventorycat',
        minWidth: 150
    }, {
        header: 'Kategori',
        dataIndex: 'namecat',
        minWidth: 260
    }, {
        header: 'Deskripsi',
        flex:1,
        dataIndex: 'description',
        minWidth: 250
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addInventoryCat',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wInventoryCat.show();
                Ext.getCmp('statusformInventoryCat').setValue('input');
            }
        }, {
            itemId: 'editInventoryCat',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridInventoryCat')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formInventoryCat = Ext.getCmp('formInventoryCat');
                    formInventoryCat.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/InventoryCat/1/reference',
                        params: {
                            extraparams: 'a.idinventorycat:' + selectedRecord.data.idinventorycat
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wInventoryCat.show();
                    Ext.getCmp('statusformInventoryCat').setValue('edit');
                }
            }
        }, {
            id: 'btnDeleteInventoryCat',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridInventoryCat')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/InventoryCat/reference',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    idmenu:101
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (!d.success) {
                                        Ext.Msg.alert('Informasi', d.message);
                                    } else {
                                        storeGridInventoryCat.load();
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
            xtype: 'searchGridInventoryCat',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridInventoryCat, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridInventoryCat.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formInventoryCat = Ext.getCmp('formInventoryCat');
            wInventoryCat.show();
            formInventoryCat.getForm().load({
                url: SITE_URL + 'backend/loadFormData/InventoryCat/1/reference',
                params: {
                    extraparams: 'a.idinventorycat:' + record.data.idinventorycat
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })
            Ext.getCmp('statusformInventoryCat').setValue('edit');
        }
    }
});