var formRefPotonganType = Ext.create('Ext.form.Panel', {
    id: 'formRefPotonganType',
    // width: 540,
    // height: 430,
    autoWidth:true,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/Potongantype/reference',
    baseParams: {idmenu:100},
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
        name: 'statusformPotongantype',
        id: 'statusformRefPotonganType'
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'idpotongantype',
        name: 'idpotongantype'
    },{
        xtype: 'textfield',
        fieldLabel: 'Nama Potongan',
        allowBlank: false,
        name: 'namepotongan'
    }, {
        xtype: 'textarea',
        fieldLabel: 'Deskripsi',
        name: 'descpotongan'
    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupRefPotonganType');
            Ext.getCmp('formRefPotonganType').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnRefPotonganTypeSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formRefPotonganType').getForm().reset();
                        Ext.getCmp('windowPopupRefPotonganType').hide();
                        storeGridRefPotonganType.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridRefPotonganType.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
var wRefPotonganType = Ext.create('widget.window', {
    id: 'windowPopupRefPotonganType',
    title: 'Form Jenis Potongan',
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
    items: [formRefPotonganType]
});
Ext.define('GridRefPotonganTypeModel', {
    extend: 'Ext.data.Model',
    fields: ['idpotongantype', 'namepotongan','descpotongan', 'userin', 'datein'],
    idProperty: 'id'
});
var storeGridRefPotonganType = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridRefPotonganTypeModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Potongantype/reference',
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
Ext.define('MY.searchGridRefPotonganType', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridRefPotonganType',
    store: storeGridRefPotonganType,
    width: 180
});
var smGridRefPotonganType = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridRefPotonganType.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteRefPotonganType').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteRefPotonganType').enable();
        }
    }
});
Ext.define('GridRefPotonganType', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridRefPotonganType,
    title: 'Jenis Potongan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridRefPotonganTypeID',
    id: 'GridRefPotonganTypeID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridRefPotonganType',
    store: storeGridRefPotonganType,
    loadMask: true,
    columns: [{
        header: 'Kode Potongan',
        dataIndex: 'idpotongantype',
        minWidth: 150
    }, {
        header: 'Nama Potongan',
        dataIndex: 'namepotongan',
        minWidth: 260
    }, {
        header: 'Deskripsi',
        flex:1,
        dataIndex: 'descpotongan',
        minWidth: 250
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addRefPotonganType',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wRefPotonganType.show();
                Ext.getCmp('statusformRefPotonganType').setValue('input');
            }
        }, {
            itemId: 'editRefPotonganType',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridRefPotonganType')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formRefPotonganType = Ext.getCmp('formRefPotonganType');
                    formRefPotonganType.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/Potongantype/1/reference',
                        params: {
                            extraparams: 'a.idpotongantype:' + selectedRecord.data.idpotongantype
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wRefPotonganType.show();
                    Ext.getCmp('statusformRefPotonganType').setValue('edit');
                }
            }
        }, {
            id: 'btnDeleteRefPotonganType',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridRefPotonganType')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/Potongantype/reference',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    idmenu:100
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (!d.success) {
                                        Ext.Msg.alert('Informasi', d.message);
                                    } else {
                                        storeGridRefPotonganType.load();
                                    }
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                }
                            });
                            // storeGridRefPotonganType.load();
                        }
                    }
                });
            },
            //                    disabled: true
        }, '->', 'Pencarian: ', ' ', {
            xtype: 'searchGridRefPotonganType',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridRefPotonganType, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridRefPotonganType.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formRefPotonganType = Ext.getCmp('formRefPotonganType');
            wRefPotonganType.show();
            formRefPotonganType.getForm().load({
                url: SITE_URL + 'backend/loadFormData/Potongantype/1/reference',
                params: {
                    extraparams: 'a.idpotongantype:' + record.data.idpotongantype
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })
            Ext.getCmp('statusformRefPotonganType').setValue('edit');
        }
    }
});