var formRefTambahanGaji = Ext.create('Ext.form.Panel', {
    id: 'formRefTambahanGaji',
    // width: 540,
    // height: 430,
    autoWidth:true,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/tambahangajitype/reference',
    baseParams: {idmenu:98},
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
        name: 'statusformtambahangajitype',
        id: 'statusformRefTambahanGaji'
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'idtambahangajitype',
        name: 'idtambahangajitype'
    },{
        xtype:'comboxunit'        
    }, {
        xtype: 'textfield',
        fieldLabel: 'Nama Tambahan Gaji',
        allowBlank: false,
        name: 'tambahantype'
    }, {
        xtype: 'textarea',
        fieldLabel: 'Deskripsi',
        name: 'deskripsi'
    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupRefTambahanGaji');
            Ext.getCmp('formRefTambahanGaji').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnRefTambahanGajiSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formRefTambahanGaji').getForm().reset();
                        Ext.getCmp('windowPopupRefTambahanGaji').hide();
                        storeGridRefTambahanGaji.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridRefTambahanGaji.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
var wRefTambahanGaji = Ext.create('widget.window', {
    id: 'windowPopupRefTambahanGaji',
    title: 'Form Jenis Tambahan Gaji',
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
    items: [formRefTambahanGaji]
});
Ext.define('GridRefTambahanGajiModel', {
    extend: 'Ext.data.Model',
    fields: ['idtambahangajitype', 'idunit', 'tambahantype', 'namaunit','deskripsi', 'userin', 'datein'],
    idProperty: 'id'
});
var storeGridRefTambahanGaji = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridRefTambahanGajiModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/tambahangajitype/reference',
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
Ext.define('MY.searchGridRefTambahanGaji', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridRefTambahanGaji',
    store: storeGridRefTambahanGaji,
    width: 180
});
var smGridRefTambahanGaji = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridRefTambahanGaji.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteRefTambahanGaji').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteRefTambahanGaji').enable();
        }
    }
});
Ext.define('GridRefTambahanGaji', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridRefTambahanGaji,
    title: 'Jenis Tambahan Gaji',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridRefTambahanGajiID',
    id: 'GridRefTambahanGajiID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridRefTambahanGaji',
    store: storeGridRefTambahanGaji,
    loadMask: true,
    columns: [{
        header: 'idtambahangajitype',
        dataIndex: 'idtambahangajitype',
        hidden: true
    }, {
        header: 'Nama Tambahan Gaji',
        dataIndex: 'tambahantype',
        minWidth: 200
    },{
        header: 'Unit',
        dataIndex: 'namaunit',
        minWidth: 250
    },  {
        header: 'Deskripsi',
        flex:1,
        dataIndex: 'deskripsi',
        minWidth: 250
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addRefTambahanGaji',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wRefTambahanGaji.show();
                Ext.getCmp('statusformRefTambahanGaji').setValue('input');
            }
        }, {
            itemId: 'editRefTambahanGaji',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridRefTambahanGaji')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formRefTambahanGaji = Ext.getCmp('formRefTambahanGaji');
                    formRefTambahanGaji.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/tambahangajitype/1/reference',
                        params: {
                            extraparams: 'a.idtambahangajitype:' + selectedRecord.data.idtambahangajitype
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wRefTambahanGaji.show();
                    Ext.getCmp('statusformRefTambahanGaji').setValue('edit');
                }
            }
        }, {
            id: 'btnDeleteRefTambahanGaji',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridRefTambahanGaji')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/tambahangajitype/reference',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    idmenu:98
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (!d.success) {
                                        Ext.Msg.alert('Informasi', d.message);
                                    } else {
                                        storeGridRefTambahanGaji.load();
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
            xtype: 'searchGridRefTambahanGaji',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridRefTambahanGaji, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridRefTambahanGaji.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formRefTambahanGaji = Ext.getCmp('formRefTambahanGaji');
            wRefTambahanGaji.show();
            formRefTambahanGaji.getForm().load({
                url: SITE_URL + 'backend/loadFormData/tambahangajitype/1/reference',
                params: {
                    extraparams: 'a.idtambahangajitype:' + record.data.idtambahangajitype
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })
            Ext.getCmp('statusformRefTambahanGaji').setValue('edit');
        }
    }
});