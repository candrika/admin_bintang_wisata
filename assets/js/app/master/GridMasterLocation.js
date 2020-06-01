Ext.define('GridMasterLocationModel', {
    extend: 'Ext.data.Model',
    fields: ['product_location_id','location_name','notes','location_address','status', 'deleted','userin','userin','datein', 'usermod','datemod','idunit'],
    idProperty: 'id'
});

var storeGridMasterLocation = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridMasterLocationModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'get/datas?model=masterproductlocation',
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

storeGridMasterLocation.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'key':key,
        'password':password,
        'idunit':idunit,
        'userid':userid
    };
});

var formMasterLocation = Ext.create('Ext.form.Panel', {
    id: 'formMasterLocation',
    // width: 740,
    autoWidth:true,
    // height: 370,
    autoHeight:true,
    url: CLINIC_API + 'form/save/MasterProductLocation',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 130,
        width: 500
    },
    items: [
    {
            xtype: 'hiddenfield',
            name: 'key',
            fieldLabel:'key',
            id: 'key',
            value:key
        },{
            xtype: 'hiddenfield',
            name: 'password',
            fieldLabel:'password',
            id: 'password',
            value:password
        },{
            xtype: 'hiddenfield',
            name: 'statusformMasterLocation',
            fieldLabel:'statusformMasterLocation',
            id: 'statusformMasterLocation',
            // value:password 
        },{
            xtype: 'hiddenfield',
            name: 'model',
            // fieldLabel:'key',
            id: 'model',
            value:'masterproductlocation'
        }, {
            xtype: 'hiddenfield',
            name: 'product_location_id',
            fieldLabel:'product_location_id',
            id: 'product_location_id'
        }, 
        {
            xtype: 'hiddenfield',
            name: 'idunit',
            id: 'idunit',
            value:idunit
        }, 
        {
            xtype: 'textfield',
            fieldLabel: 'Nama Lokasi',
            allowBlank: false,
            name: 'location_name'
        }, 
        {
            xtype: 'comboxswitch',
            name: 'status',
            fieldLabel: 'Status',
            hidden:true,
            value:1
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Deskripsi',
            allowBlank: true,
            name: 'notes',
        },
        // {
        //     xtype: 'textarea',
        //     fieldLabel: 'Alamat',
        //     allowBlank: true,
        //     name: 'location_address'
        // }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupMasterLocation');
            Ext.getCmp('formMasterLocation').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnMasterLocationSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formMasterLocation').getForm().reset();
                        Ext.getCmp('windowPopupMasterLocation').hide();
                        storeGridMasterLocation.load();
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

var wMasterLocation = Ext.create('widget.window', {
    id: 'windowPopupMasterLocation',
    title: 'Lokasi',
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
    items: [formMasterLocation]
});

Ext.define('MY.searchGridMasterLocation', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridMasterLocation',
    store: storeGridMasterLocation,
    width: 180
});
var smGridMasterLocation = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridMasterLocation.getSelection().length;
            if (selectedLen == 0) {
                // Ext.getCmp('btnDelete.GridMasterLocation').disable();
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
Ext.define(dir_sys + 'master.GridMasterLocation', {
    title: 'Lokasi',
    itemId: 'GridMasterLocation',
    id: 'GridMasterLocation',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridMasterLocation',
    store: storeGridMasterLocation,
    // selModel: smGridMasterLocation,
    loadMask: true,
    columns: [
        {
            header: 'product_location_id',
            dataIndex: 'product_location_id',
            hidden: true
        },
        {
            header: 'Nama Lokasi/Rak',
            
            dataIndex: 'location_name',
            minWidth: 150
        },
        {
            hidden:true,
            header: 'Status',
            dataIndex: 'status',
            minWidth: 150,
            renderer: function(value){
                return togglearr.map(function(val){return val[1]})[value];
            }
            // hidden:true,
        },
        {
            header: 'Deskripsi',
            dataIndex: 'notes',
            minWidth: 170,
            flex:1
        },  
        // {
        //     header: 'Alamat',
        //     flex: 1,
        //     dataIndex: 'location_address',
        //     minWidth: 250
        // }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addMasterLocation',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wMasterLocation.show();
                Ext.getCmp('statusformMasterLocation').setValue('input');
            }
        }, {
            itemId: 'editMasterLocation',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridMasterLocation')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formInventoryCat = Ext.getCmp('formMasterLocation');
                    formInventoryCat.getForm().load({
                        url: CLINIC_API + 'inventory/form_location',
                        method:'GET',
                        params: {
                            extraparams: 'a.product_location_id=' + selectedRecord.data.product_location_id,
                            idunit:idunit,
                            key:key,
                            password:password
                        },
                        success: function(form, action) {
                            var d = Ext.decode(form.responseText);
                            console.log(d);
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wMasterLocation.show();
                    Ext.getCmp('statusformMasterLocation').setValue('edit');
                }
            }
        }, {
            id: 'btnDeleteMasterLocation',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridMasterLocation')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: CLINIC_API + 'inventory/delete_produck_location',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    // idunit:idunit,
                                    key:key,
                                    password:password
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (d.success==false) {
                                        Ext.Msg.alert('Informasi', d.message);
                                    } else {
                                        Ext.Msg.alert('Informasi', d.message);
                                        storeGridMasterLocation.load();
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
            xtype: 'searchGridMasterLocation',
            text: 'Left Button'
        }]
    }, 
    {
        xtype: 'pagingtoolbar',
        store: storeGridMasterLocation, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridMasterLocation.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // loadTransactionGrid(record.data.id_saving_trx)
        }
    }
});
