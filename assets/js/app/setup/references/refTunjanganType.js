var formRefTunjanganType = Ext.create('Ext.form.Panel', {
    id: 'formRefTunjanganType',
    // width: 540,
    // height: 430,
    autoWidth:true,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/tunjangantype/reference',
    baseParams: {idmenu:99},
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
        name: 'statusformtunjangantype',
        id: 'statusformRefTunjanganType'
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'idtunjtype',
        name: 'idtunjtype'
    },{
        xtype: 'textfield',
        fieldLabel: 'Nama Tunjangan',
        allowBlank: false,
        name: 'nametunj'
    }, {
        xtype: 'textarea',
        fieldLabel: 'Deskripsi',
        name: 'desctunj'
    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupRefTunjanganType');
            Ext.getCmp('formRefTunjanganType').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnRefTunjanganTypeSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formRefTunjanganType').getForm().reset();
                        Ext.getCmp('windowPopupRefTunjanganType').hide();
                        storeGridRefTunjanganType.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridRefTunjanganType.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
var wRefTunjanganType = Ext.create('widget.window', {
    id: 'windowPopupRefTunjanganType',
    title: 'Form Jenis Tunjangan',
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
    items: [formRefTunjanganType]
});
Ext.define('GridRefTunjanganTypeModel', {
    extend: 'Ext.data.Model',
    fields: ['idtunjtype', 'idunit', 'nametunj', 'namaunit','desctunj', 'userin', 'datein'],
    idProperty: 'id'
});
var storeGridRefTunjanganType = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridRefTunjanganTypeModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/tunjangantype/reference',
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
Ext.define('MY.searchGridRefTunjanganType', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridRefTunjanganType',
    store: storeGridRefTunjanganType,
    width: 180
});
var smGridRefTunjanganType = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridRefTunjanganType.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteRefTunjanganType').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteRefTunjanganType').enable();
        }
    }
});
Ext.define('GridRefTunjanganType', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridRefTunjanganType,
    title: 'Jenis Tunjangan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridRefTunjanganTypeID',
    id: 'GridRefTunjanganTypeID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridRefTunjanganType',
    store: storeGridRefTunjanganType,
    loadMask: true,
    columns: [{
        header: 'Kode Tunjangan',
        dataIndex: 'idtunjtype',
        minWidth: 150
    }, {
        header: 'Nama Tunjangan',
        dataIndex: 'nametunj',
        minWidth: 260
    }, {
        header: 'Deskripsi',
        flex:1,
        dataIndex: 'desctunj',
        minWidth: 250
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addRefTunjanganType',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wRefTunjanganType.show();
                Ext.getCmp('statusformRefTunjanganType').setValue('input');
            }
        }, {
            itemId: 'editRefTunjanganType',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridRefTunjanganType')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formRefTunjanganType = Ext.getCmp('formRefTunjanganType');
                    formRefTunjanganType.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/tunjangantype/1/reference',
                        params: {
                            extraparams: 'a.idtunjtype:' + selectedRecord.data.idtunjtype
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wRefTunjanganType.show();
                    Ext.getCmp('statusformRefTunjanganType').setValue('edit');
                }
            }
        }, {
            id: 'btnDeleteRefTunjanganType',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridRefTunjanganType')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/tunjangantype/reference',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    idmenu:99
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (!d.success) {
                                        Ext.Msg.alert('Informasi', d.message);
                                    } else {
                                        storeGridRefTunjanganType.load();
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
            xtype: 'searchGridRefTunjanganType',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridRefTunjanganType, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridRefTunjanganType.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formRefTunjanganType = Ext.getCmp('formRefTunjanganType');
            wRefTunjanganType.show();
            formRefTunjanganType.getForm().load({
                url: SITE_URL + 'backend/loadFormData/tunjangantype/1/reference',
                params: {
                    extraparams: 'a.idtunjtype:' + record.data.idtunjtype
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })
            Ext.getCmp('statusformRefTunjanganType').setValue('edit');
        }
    }
});