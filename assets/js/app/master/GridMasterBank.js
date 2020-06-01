Ext.define('GridMasterBankModel', {
    extend: 'Ext.data.Model',
    fields: ['bank_id','bank_name','branch_name','address','account_number','account_name'],
    idProperty: 'id'
});
var storeGridMasterBank = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridMasterBankModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/MasterBank/master',
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

var formMasterBank = Ext.create('Ext.form.Panel', {
    id: 'formMasterBank',
    // width: 740,
    autoWidth:true,
    // height: 370,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/MasterBank/master',
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
            name: 'bank_id',
            id: 'bank_id'
        }, {
            xtype: 'hiddenfield',
            name: 'statusformMasterBank',
            id: 'statusformMasterBank'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Bank Name',
            allowBlank: false,
            name: 'bank_name'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Branch Name',
            allowBlank: false,
            name: 'branch_name'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Address',
            allowBlank: false,
            name: 'address'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Account Number',
            name: 'account_number'
        },{
            xtype: 'textfield',
            fieldLabel: 'Account Name',
            allowBlank: false,
            name: 'account_name'
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupMasterBank');
            Ext.getCmp('formMasterBank').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnMasterBankSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formMasterBank').getForm().reset();
                        Ext.getCmp('windowPopupMasterBank').hide();
                        storeGridMasterBank.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridMasterBank.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wMasterBank = Ext.create('widget.window', {
    id: 'windowPopupMasterBank',
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
    items: [formMasterBank]
});


Ext.define('MY.searchGridMasterBank', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridMasterBank',
    store: storeGridMasterBank,
    width: 180
});
var smGridMasterBank = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridMasterBank.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteMasterBank').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteMasterBank').enable();
        }
    }
});
Ext.define(dir_sys + 'master.GridMasterBank', {
    title: 'Bank Data',
    itemId: 'GridMasterBankID',
    id: 'GridMasterBankID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridMasterBank',
    store: storeGridMasterBank,
    loadMask: true,
    columns: [{
        header: 'bank_id',
        dataIndex: 'bank_id',
        hidden: true
    }, {
        header: 'Bank Name',
        dataIndex: 'bank_name',
        minWidth: 150
    }, {
        header: 'Branch Name',
        dataIndex: 'branch_name',
        minWidth: 150
    }, {
        header: 'Address',
        dataIndex: 'address',
        minWidth: 150
    }, {
        header: 'Account Number',
        dataIndex: 'account_number',
        minWidth: 150
    }, {
        header: 'Account Name',
        dataIndex: 'account_name',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addMasterBank',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wMasterBank.show();
                Ext.getCmp('statusformMasterBank').setValue('input');
            }
        }, {
            itemId: 'editMasterBank',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridMasterBank')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formMasterBank = Ext.getCmp('formMasterBank');
                    formMasterBank.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/MasterBank/1/master',
                        params: {
                            extraparams: 'a.bank_id:' + selectedRecord.data.bank_id
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wMasterBank.show();
                    Ext.getCmp('statusformMasterBank').setValue('edit');
                    Ext.getCmp('TabSupplier').setActiveTab(0);
                }
            }
        }, {
            id: 'btnDeleteMasterBank',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridMasterBank')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/MasterBank/master',
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
                                        storeGridMasterBank.load();
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
            xtype: 'searchGridMasterBank',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridMasterBank, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridMasterBank.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formMasterBank = Ext.getCmp('formMasterBank');
            wMasterBank.show();
            formMasterBank.getForm().load({
                url: SITE_URL + 'backend/loadFormData/MasterBank/1/master',
                params: {
                    extraparams: 'a.bank_id:' + record.data.bank_id
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
            Ext.getCmp('statusformMasterBank').setValue('edit');

            Ext.getCmp('TabSupplier').setActiveTab(0);
        }
    }
});