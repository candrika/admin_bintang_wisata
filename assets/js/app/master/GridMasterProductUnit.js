Ext.define('GridMasterProductUnitModel', {
    extend: 'Ext.data.Model',
    fields: ['product_unit_id','idunit','product_unit_code','product_unit_name'],
    idProperty: 'id'
});

var storeGridMasterProductUnit = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridMasterProductUnitModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'get/datas?model=masterproductunit&dir=product',
        actionMethods: {
            read:'GET',
        },
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

storeGridMasterProductUnit.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'key':key,
        'password':password,
        'idunit':idunit,
        'userid':userid
    };
});

var formMasterProductUnit = Ext.create('Ext.form.Panel', {
    id: 'formMasterProductUnit',
    // width: 740,
    autoWidth:true,
    // height: 370,
    autoHeight:true,
    url: CLINIC_API + 'form/save',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 130,
        width: 300
    },
    items: [
    	{
            xtype: 'hiddenfield',
            name: 'key',
            fieldLabel:'key',
            value:key
        },
        {
            xtype:'hiddenfield',
            name:'idunit',
            value:idunit
        },
        {
            xtype:'hiddenfield',
            name:'password',
            value:password
        },
        // {
        //     xtype:''
        // },
        {
            xtype:'hiddenfield',
            name:'statusformmasterProductUnit',
            id:'statusformasterProductUnit'
            // value:password
        },
        {
            xtype: 'hiddenfield',
            name: 'dir',
            value:'product'
        },
        {
            xtype: 'hiddenfield',
            name: 'model',
            value:'masterproductunit'
        }, {
            xtype: 'hiddenfield',
            name: 'product_unit_id',
            fieldLabel:'product_unit_id'
        },{
            xtype: 'textfield',
            fieldLabel: 'Kode Satuan',
            allowBlank: false,
            name: 'product_unit_code'
        },{
            xtype: 'textfield',
            fieldLabel: 'Nama Satuan',
            allowBlank: false,
            name: 'product_unit_name'
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupMasterProductUnit');
            Ext.getCmp('formMasterProductUnit').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnMasterProductUnitSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    method:'POST',
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formMasterProductUnit').getForm().reset();
                        Ext.getCmp('windowPopupMasterProductUnit').hide();
                        storeGridMasterProductUnit.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridMasterBrand.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wMasterProductUnit = Ext.create('widget.window', {
    id: 'windowPopupMasterProductUnit',
    title: 'Satuan',
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
    items: [formMasterProductUnit]
});

Ext.define('MY.searchGridMasterProductUnit', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridMasterProductUnit',
    store: storeGridMasterProductUnit,
    width: 180
});
var smGridMasterProductUnit = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridMasterProductUnit.getSelection().length;
            if (selectedLen == 0) {
                // Ext.getCmp('btnDelete.GridMasterProductUnit').disable();
            }
        },
        select: function(model, record, index) {
            // if (record.data.status == '2') {
            //     //sudah completed tidakbisa ubah status                
            //     Ext.getCmp('btnCompletedSavingTrx').disable();
            //     Ext.getCmp('btnPendingSavingTrx').disable();
            //     Ext.getCmp('btnRejectSavingTrx').disable();
                
            // } else {
            //    Ext.getCmp('btnCompletedSavingTrx').enable();
            //    Ext.getCmp('btnPendingSavingTrx').enable();
            //    Ext.getCmp('btnRejectSavingTrx').enable();
               
            // }
        }
    }
});
Ext.define(dir_sys + 'master.GridMasterProductUnit', {
    title: 'Satuan',
    itemId: 'GridMasterProductUnit',
    id: 'GridMasterProductUnit',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridMasterProductUnit',
    store: storeGridMasterProductUnit,
    // selModel: smGridMasterProductUnit,
    loadMask: true,
    columns: [
        {
            header: 'product_unit_id',
            dataIndex: 'product_unit_id',
            hidden: true
        },
        {
            header: 'Kode Satuan',            
            dataIndex: 'product_unit_code',
            minWidth: 150
        },
        {
            header: 'Nama Satuan',
            flex:1,
            dataIndex: 'product_unit_name',
            minWidth: 170
        }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addMasterProductUnit',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wMasterProductUnit.show();
                Ext.getCmp('statusformMasterProductUnit').setValue('input');
            }
        }, {
            itemId: 'editMasterProductUnit',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridMasterProductUnit')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formInventoryCat = Ext.getCmp('formMasterProductUnit');
                    formInventoryCat.getForm().load({
                        url: CLINIC_API + 'get/data?model=masterproductunit&dir=product',
                        method: 'GET',
                        params: {
                            extraparams: 'a.product_unit_id:' + selectedRecord.data.product_unit_id,
                            idunit:idunit,
                            key:key,
                            password:password
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wMasterProductUnit.show();
                    Ext.getCmp('statusformMasterProductUnit').setValue('edit');
                }
            }
        }, {
            id: 'btnDeleteMasterProductUnit',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridMasterProductUnit')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: CLINIC_API + 'remove/data',
                                method: 'POST',
                                params: {
                                	model:'masterproductunit',
                                	dir:'product',
                                	key:key,
                                    password:password,
                                    remove_data: Ext.encode(selected)
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (!d.success) {
                                        Ext.Msg.alert('Informasi', d.message);
                                    } else {
                                        Ext.Msg.alert('Informasi', d.message);
                                        storeGridMasterProductUnit.load();
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
            xtype: 'searchGridMasterProductUnit',
            text: 'Left Button'
        }]
    }, 
    {
        xtype: 'pagingtoolbar',
        store: storeGridMasterProductUnit, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridMasterProductUnit.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // loadTransactionGrid(record.data.id_saving_trx)
        }
    }
});
