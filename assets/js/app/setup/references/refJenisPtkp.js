var formRefJenisPtkp = Ext.create('Ext.form.Panel', {
    id: 'formRefJenisPtkp',
    // width: 540,
    // height: 430,
    autoWidth:true,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/JenisPtkp/reference',
    baseParams: {idmenu:120},
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
        name: 'statusformJenisPtkp',
        id: 'statusformRefJenisPtkp'
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'idjenisptkp',
        name: 'idjenisptkp'
    },{
        xtype: 'textfield',
        fieldLabel: 'Nama PTKP',
        allowBlank: false,
        name: 'namaptkp'
    },{
        xtype: 'numberfield',
        fieldLabel: 'Nilai PTKP',
        allowBlank: false,
        name: 'totalptkp'
    },  {
        xtype: 'textarea',
        fieldLabel: 'Deskripsi',
        name: 'deskripsi'
    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupRefJenisPtkp');
            Ext.getCmp('formRefJenisPtkp').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnRefJenisPtkpSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formRefJenisPtkp').getForm().reset();
                        Ext.getCmp('windowPopupRefJenisPtkp').hide();
                        storeGridRefJenisPtkp.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridRefJenisPtkp.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
var wRefJenisPtkp = Ext.create('widget.window', {
    id: 'windowPopupRefJenisPtkp',
    title: 'Form Jenis PTKP',
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
    items: [formRefJenisPtkp]
});
Ext.define('GridRefJenisPtkpModel', {
    extend: 'Ext.data.Model',
    fields: ['idjenisptkp','namaptkp','deskripsi','totalptkp','userin','datein'],
    idProperty: 'id'
});
var storeGridRefJenisPtkp = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridRefJenisPtkpModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/JenisPtkp/reference',
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
Ext.define('MY.searchGridRefJenisPtkp', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridRefJenisPtkp',
    store: storeGridRefJenisPtkp,
    width: 180
});
var smGridRefJenisPtkp = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridRefJenisPtkp.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteRefJenisPtkp').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteRefJenisPtkp').enable();
        }
    }
});
Ext.define('GridRefJenisPtkp', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridRefJenisPtkp,
    title: 'Jenis PTKP',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridRefJenisPtkpID',
    id: 'GridRefJenisPtkpID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridRefJenisPtkp',
    store: storeGridRefJenisPtkp,
    loadMask: true,
    columns: [
    {
        header: 'Kode PTKP',
        dataIndex: 'idjenisptkp',
        minWidth: 150
    }, {
        header: 'Nama PTKP',
        dataIndex: 'namaptkp',
        minWidth: 260
    },  {
        header: 'Nilai PTKP',
        align:'right',
        xtype:'numbercolumn',
        dataIndex: 'totalptkp',
        minWidth: 260
    }, {
        header: 'Deskripsi',
        flex:1,
        dataIndex: 'deskripsi',
        minWidth: 250
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addRefJenisPtkp',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wRefJenisPtkp.show();
                Ext.getCmp('statusformRefJenisPtkp').setValue('input');
            }
        }, {
            itemId: 'editRefJenisPtkp',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridRefJenisPtkp')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formRefJenisPtkp = Ext.getCmp('formRefJenisPtkp');
                    formRefJenisPtkp.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/JenisPtkp/1/reference',
                        params: {
                            extraparams: 'a.idjenisptkp:' + selectedRecord.data.idjenisptkp
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wRefJenisPtkp.show();
                    Ext.getCmp('statusformRefJenisPtkp').setValue('edit');
                }
            }
        }, {
            id: 'btnDeleteRefJenisPtkp',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridRefJenisPtkp')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/JenisPtkp/reference',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    idmenu:120
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (!d.success) {
                                        Ext.Msg.alert('Informasi', d.message);
                                    } else {
                                        storeGridRefJenisPtkp.load();
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
            xtype: 'searchGridRefJenisPtkp',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridRefJenisPtkp, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridRefJenisPtkp.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formRefJenisPtkp = Ext.getCmp('formRefJenisPtkp');
            wRefJenisPtkp.show();
            formRefJenisPtkp.getForm().load({
                url: SITE_URL + 'backend/loadFormData/JenisPtkp/1/reference',
                params: {
                    extraparams: 'a.idjenisptkp:' + record.data.idjenisptkp
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })
            Ext.getCmp('statusformRefJenisPtkp').setValue('edit');
        }
    }
});