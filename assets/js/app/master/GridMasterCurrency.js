Ext.define('GridMasterCurrencyModel', {
    extend: 'Ext.data.Model',
    fields: ['idcurrency','namecurr','symbol','description','rate'],
    idProperty: 'id'
});
var storeGridMasterCurrency = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridMasterCurrencyModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/MasterCurrency/master',
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

var formMasterCurrency = Ext.create('Ext.form.Panel', {
    id: 'formMasterCurrency',
    // width: 740,
    autoWidth:true,
    // height: 370,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/MasterCurrency/master',
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
            name: 'idcurrency',
            id: 'idcurrency'
        }, {
            xtype: 'hiddenfield',
            name: 'statusformMasterCurrency',
            id: 'statusformMasterCurrency'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Currency Name',
            allowBlank: false,
            name: 'namecurr'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Symbol',
            allowBlank: false,
            name: 'symbol'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Rate',
            allowBlank: false,
            name: 'rate'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Description',
            allowBlank: false,
            name: 'description'
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupMasterCurrency');
            Ext.getCmp('formMasterCurrency').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnMasterCurrencySimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formMasterCurrency').getForm().reset();
                        Ext.getCmp('windowPopupMasterCurrency').hide();
                        storeGridMasterCurrency.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridMasterCurrency.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wMasterCurrency = Ext.create('widget.window', {
    id: 'windowPopupMasterCurrency',
    title: 'Data Supplier',
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
    items: [formMasterCurrency]
});


Ext.define('MY.searchGridMasterCurrency', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridMasterCurrency',
    store: storeGridMasterCurrency,
    width: 180
});
var smGridMasterCurrency = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridMasterCurrency.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteMasterCurrency').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteMasterCurrency').enable();
        }
    }
});
Ext.define(dir_sys + 'master.GridMasterCurrency', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridMasterCurrency,
    title: 'Currency',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridMasterCurrencyID',
    id: 'GridMasterCurrencyID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridMasterCurrency',
    store: storeGridMasterCurrency,
    loadMask: true,
    columns: [{
        header: 'idcurrency',
        dataIndex: 'idcurrency',
        hidden: true
    }, {
        header: 'Currency Name',
        dataIndex: 'namecurr',
        minWidth: 150
    }, {
        header: 'Symbol',
        dataIndex: 'symbol',
        minWidth: 150
    },
    {
        header: 'Rate',
        dataIndex: 'rate',
        minWidth: 150
    }, {
        header: 'Description',
        flex:1,
        dataIndex: 'description',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addMasterCurrency',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wMasterCurrency.show();
                Ext.getCmp('statusformMasterCurrency').setValue('input');
            }
        }, {
            itemId: 'editMasterCurrency',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridMasterCurrency')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formMasterCurrency = Ext.getCmp('formMasterCurrency');
                    formMasterCurrency.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/MasterCurrency/1/master',
                        params: {
                            extraparams: 'a.idcurrency:' + selectedRecord.data.idcurrency
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wMasterCurrency.show();
                    Ext.getCmp('statusformMasterCurrency').setValue('edit');
                    Ext.getCmp('TabSupplier').setActiveTab(0);
                }
            }
        }, {
            id: 'btnDeleteMasterCurrency',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridMasterCurrency')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/MasterCurrency/master',
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
                                        storeGridMasterCurrency.load();
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
            xtype: 'searchGridMasterCurrency',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridMasterCurrency, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridMasterCurrency.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formMasterCurrency = Ext.getCmp('formMasterCurrency');
            wMasterCurrency.show();
            formMasterCurrency.getForm().load({
                url: SITE_URL + 'backend/loadFormData/MasterCurrency/1/master',
                params: {
                    extraparams: 'a.idcurrency:' + record.data.idcurrency
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
            Ext.getCmp('statusformMasterCurrency').setValue('edit');

            Ext.getCmp('TabSupplier').setActiveTab(0);
        }
    }
});