Ext.define('GridLocationModel', {
    extend: 'Ext.data.Model',
    fields: ['location_id','location_name','notes','status', 'deleted','userin','datein', 'usermod','datemod'],
    idProperty: 'id'
});

var storeGridLocation = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridLocationModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'get/datas?model=location',
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

storeGridLocation.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'key':key,
        'password':password,
        'idunit':idunit,
        'userid':userid
    };
});

var formLocation = Ext.create('Ext.form.Panel', {
    id: 'formLocation',
    // width: 740,
    autoWidth:true,
    // height: 370,
    autoHeight:true,
    url: CLINIC_API + 'form/save/Location',
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
        },
        {
            xtype: 'hiddenfield',
            name: 'idunit',
            value:idunit
        },
        {
            xtype: 'hiddenfield',
            name: 'userid',
            value:userid
        },
        {
            xtype: 'hiddenfield',
            name: 'statusformLocation',
            fieldLabel:'statusformLocation',
            id: 'statusformLocation',
            // value:password 
        },
        {
            xtype: 'hiddenfield',
            name: 'model',
            // fieldLabel:'key',
            id: 'model',
            value:'location'
        }, 
        {
            xtype: 'hiddenfield',
            name: 'location_id',
            fieldLabel:'location_id',
            id: 'location_id'
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
            id: 'status_location',
            fieldLabel: 'Status',
            // hidden:true,
            // value:1
        },
        // {
        //     xtype: 'textarea',
        //     fieldLabel: 'Deskripsi',
        //     allowBlank: true,
        //     name: 'notes',
        // },
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
            var win = Ext.getCmp('windowPopupLocation');
            Ext.getCmp('formLocation').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnLocationSimpan',
        text: 'Simpan',
        handler: function() {
            var form = Ext.getCmp('formLocation').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formLocation').getForm().reset();
                        Ext.getCmp('windowPopupLocation').hide();
                        storeGridLocation.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridBrand.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wLocation = Ext.create('widget.window', {
    id: 'windowPopupLocation',
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
    items: [formLocation]
});

Ext.define('MY.searchGridLocation', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridLocation',
    store: storeGridLocation,
    width: 180
});
var smGridLocation = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridLocation.getSelection().length;
            if (selectedLen == 0) {
                // Ext.getCmp('btnDelete.GridLocation').disable();
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
Ext.define(dir_sys + 'master.GridLocation', {
    title: 'Lokasi',
    itemId: 'GridLocation',
    id: 'GridLocation',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridLocation',
    store: storeGridLocation,
    // selModel: smGridLocation,
    loadMask: true,
    columns: [
        {
            header: 'location_id',
            dataIndex: 'location_id',
            hidden: true
        },
        {
            header: 'Nama Lokasi',      
            dataIndex: 'location_name',
            minWidth: 150,
            flex:1
        },
        {
            // hidden:true,
            header: 'Status',
            dataIndex: 'status',
            minWidth: 150,
            renderer: function(value){
                return togglearr.map(function(val){return val[1]})[value];
            }
            // hidden:true,
        },
        // {
        //     header: 'Deskripsi',
        //     dataIndex: 'notes',
        //     minWidth: 170,
        //     flex:1
        // },  
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
            itemId: 'addLocation',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wLocation.show();
                Ext.getCmp('formLocation').getForm().reset();
                Ext.getCmp('statusformLocation').setValue('input');
            }
        }, {
            itemId: 'editLocation',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridLocation')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjang').setReadOnly(false);
                    var formInventoryCat = Ext.getCmp('formLocation');
                    formInventoryCat.getForm().load({
                        url: CLINIC_API + 'master/form_loader',
                        method:'GET',
                        params: {
                            extraparams: 'a.location_id=' + selectedRecord.data.location_id,
                            model:'location',
                            key:key,
                            // password:password
                        },
                        success: function(form, action) {
                            var d = Ext.decode(form.responseText);
                            console.log(d);
                            Ext.getCmp('status_location').getStore().load();

                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wLocation.show();
                    Ext.getCmp('statusformLocation').setValue('edit');
                }
            }
        }, {
            id: 'btnDeleteLocation',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridLocation')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: CLINIC_API + 'master/delete',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    // idunit:idunit,
                                    key:key,
                                    model:'location',
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (d.success==false) {
                                        Ext.Msg.alert('Informasi', d.message);
                                        storeGridLocation.load();
                                        
                                    } else {
                                        Ext.Msg.alert('Informasi', d.message);
                                        storeGridLocation.load();
                                    }
                                },
                                failure: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    Ext.Msg.alert('Failed', d ? d.message: 'No response');
                                }
                            });
                            
                        }
                    }
                });
            },
            //                    disabled: true
        }, '->', 'Pencarian: ', ' ', {
            xtype: 'searchGridLocation',
            text: 'Left Button'
        }]
    }, 
    {
        xtype: 'pagingtoolbar',
        store: storeGridLocation, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridLocation.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // loadTransactionGrid(record.data.id_saving_trx)
        }
    }
});
