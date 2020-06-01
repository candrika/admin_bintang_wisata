var formRefInventoryCat = Ext.create('Ext.form.Panel', {
    id: 'formRefInventoryCat',
    // width: 540,
    // height: 430,
    autoWidth:true,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/InventoryCat/reference',
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
        id: 'statusformRefInventoryCat'
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'idinventorycat',
        name: 'idinventorycat'
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
            var win = Ext.getCmp('windowPopupRefInventoryCat');
            Ext.getCmp('formRefInventoryCat').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnRefInventoryCatSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formRefInventoryCat').getForm().reset();
                        Ext.getCmp('windowPopupRefInventoryCat').hide();
                        storeGridRefInventoryCat.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridRefInventoryCat.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
var wRefInventoryCat = Ext.create('widget.window', {
    id: 'windowPopupRefInventoryCat',
    title: 'Form Kategori Persediaan',
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
    items: [formRefInventoryCat]
});
Ext.define('GridRefInventoryCatModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventorycat','namecat','description','userin','datein'],
    idProperty: 'id'
});
var storeGridRefInventoryCat = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridRefInventoryCatModel',
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
Ext.define('MY.searchGridRefInventoryCat', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridRefInventoryCat',
    store: storeGridRefInventoryCat,
    width: 180
});
var smGridRefInventoryCat = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridRefInventoryCat.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteRefInventoryCat').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteRefInventoryCat').enable();
        }
    }
});
Ext.define('GridRefInventoryCat', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridRefInventoryCat,
    title: 'Kategori Persediaan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridRefInventoryCatID',
    id: 'GridRefInventoryCatID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridRefInventoryCat',
    store: storeGridRefInventoryCat,
    loadMask: true,
    columns: [{
        header: 'Kode Kategori',
        dataIndex: 'idinventorycat',
        minWidth: 150
    }, {
        header: 'Nama Kategori',
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
            itemId: 'addRefInventoryCat',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wRefInventoryCat.show();
                Ext.getCmp('statusformRefInventoryCat').setValue('input');
            }
        }, {
            itemId: 'editRefInventoryCat',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridRefInventoryCat')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formRefInventoryCat = Ext.getCmp('formRefInventoryCat');
                    formRefInventoryCat.getForm().load({
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
                    wRefInventoryCat.show();
                    Ext.getCmp('statusformRefInventoryCat').setValue('edit');
                }
            }
        }, {
            id: 'btnDeleteRefInventoryCat',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridRefInventoryCat')[0];
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
                                        storeGridRefInventoryCat.load();
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
            xtype: 'searchGridRefInventoryCat',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridRefInventoryCat, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridRefInventoryCat.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formRefInventoryCat = Ext.getCmp('formRefInventoryCat');
            wRefInventoryCat.show();
            formRefInventoryCat.getForm().load({
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
            Ext.getCmp('statusformRefInventoryCat').setValue('edit');
        }
    }
});