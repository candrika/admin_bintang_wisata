Ext.define('GridMasterCoilModel', {
    extend: 'Ext.data.Model',
    fields: ['bahan_coil_id','az_z','lebar','tebal','berat','keterangan','produk_nama','idunit','idinventorycat','namecat'],
    idProperty: 'id'
});
var storeGridMasterCoil = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridMasterCoilModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/BahanCoil/master',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'rack_name',
        direction: 'ASC'
    }]
});

var formBahanCoil = Ext.create('Ext.form.Panel', {
    id: 'formBahanCoil',
    // width: 740,
    autoWidth:true,
    // height: 370,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/BahanCoil/master',
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
            name: 'bahan_coil_id',
            id: 'bahan_coil_id'
        }, {
            xtype: 'hiddenfield',
            name: 'statusformBahanCoil',
            id: 'statusformBahanCoil'
        }, {
            xtype: 'comboxinventorycat',
            fieldLabel: 'Jenis Bahan',
            allowBlank: false,
            valueField:'idinventorycat',
            name: 'idinventorycat'
        }, {
            xtype: 'textfield',
            fieldLabel: 'AZ/Z',
            allowBlank: false,
            name: 'az_z'
        },  {
            xtype: 'textfield',
            fieldLabel: 'Lebar',
            allowBlank: false,
            name: 'lebar'
        },  {
            xtype: 'textfield',
            fieldLabel: 'Tebal',
            allowBlank: false,
            name: 'tebal'
        },  {
            xtype: 'textfield',
            fieldLabel: 'Berat',
            allowBlank: false,
            name: 'berat'
        },  {
            xtype: 'textfield',
            fieldLabel: 'Nama Produk',
            allowBlank: false,
            name: 'produk_nama'
        }, 
         {
            xtype: 'textarea',
            fieldLabel: 'Keterangan',
            allowBlank: true,
            name: 'keterangan'
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupBahanCoil');
            Ext.getCmp('formBahanCoil').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnBahanCoilSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formBahanCoil').getForm().reset();
                        Ext.getCmp('windowPopupBahanCoil').hide();
                        storeGridMasterCoil.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridMasterCoil.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wBahanCoil = Ext.create('widget.window', {
    id: 'windowPopupBahanCoil',
    title: 'Coil',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    modal:true,
    layout: 'fit',
    border: false,
    items: [formBahanCoil]
});


Ext.define('MY.searchGridMasterCoil', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridMasterCoil',
    store: storeGridMasterCoil,
    width: 180
});
var smGridMasterCoil = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridMasterCoil.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteBahanCoil').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteBahanCoil').enable();
        }
    }
});
Ext.define(dir_sys+'master.GridMasterCoil', {
    title: 'Coil Conversion',
    itemId: 'GridMasterCoilID',
    id: 'GridMasterCoilID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridMasterCoil',
    store: storeGridMasterCoil,
    loadMask: true,
    columns: [{
        header: 'bahan_coil_id',
        dataIndex: 'bahan_coil_id',
        hidden: true
    }, {
        header: 'Jenis Bahan',
        minWidth: 150,
        dataIndex: 'namecat',
    }, {
        header: 'AZ/Z',
        dataIndex: 'az_z',
        minWidth: 150
    }, {
        header: 'Lebar',
        dataIndex: 'lebar',
        minWidth: 150
    }, {
        header: 'Tebal',
        dataIndex: 'tebal',
    },  {
        header: 'Berat',
        dataIndex: 'berat',
    },  {
        header: 'Nama Produk',
        dataIndex: 'produk_nama',
    },  {
        header: 'Keterangan',
        dataIndex: 'keterangan',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addBahanCoil',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wBahanCoil.show();
                Ext.getCmp('statusformBahanCoil').setValue('input');
            }
        }, {
            itemId: 'editBahanCoil',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridMasterCoil')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formBahanCoil = Ext.getCmp('formBahanCoil');
                    formBahanCoil.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/BahanCoil/1/master',
                        params: {
                            extraparams: 'a.bahan_coil_id:' + selectedRecord.data.bahan_coil_id
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wBahanCoil.show();
                    Ext.getCmp('statusformBahanCoil').setValue('edit');
                    // Ext.getCmp('TabSupplier').setActiveTab(0);
                }
            }
        }, {
            id: 'btnDeleteBahanCoil',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridMasterCoil')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/BahanCoil/master',
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
                                        storeGridMasterCoil.load();
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
            xtype: 'searchGridMasterCoil',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridMasterCoil, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridMasterCoil.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formBahanCoil = Ext.getCmp('formBahanCoil');
            wBahanCoil.show();
            formBahanCoil.getForm().load({
                url: SITE_URL + 'backend/loadFormData/BahanCoil/1/master',
                params: {
                    extraparams: 'a.rack_id:' + record.data.rack_id
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
            Ext.getCmp('statusformBahanCoil').setValue('edit');

            Ext.getCmp('TabSupplier').setActiveTab(0);
        }
    }
});