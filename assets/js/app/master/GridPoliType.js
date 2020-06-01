Ext.define('GridPoliTypeModel', {
    extend: 'Ext.data.Model',
    fields: ['polytpe_id','polytpe_name','polytpe_desc','status', 'deleted','userin','datein', 'usermod','datemod','location_id','location_name'],
    idProperty: 'id'
});

var storeGridPoliType = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPoliTypeModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'get/datas?model=polytype',
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

storeGridPoliType.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'key':key,
        'password':password,
        'idunit':idunit,
        'userid':userid
    };
});

var formPoliType = Ext.create('Ext.form.Panel', {
    id: 'formPoliType',
    // width: 740,
    autoWidth:true,
    // height: 370,
    autoHeight:true,
    url: CLINIC_API + 'form/save/PoliType',
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
            name: 'statusformwPoliType',
            fieldLabel:'statusformwPoliType',
            id: 'statusformwPoliType',
            // value:password 
        },
        // {
        //     xtype: 'hiddenfield',
        //     name: 'model',
        //     id: 'model',
        //     value:'polytype'
        // },
        {
            xtype: 'hiddenfield',
            name: 'location_id',
            fieldLabel:'location_id',
            // id: 'Masterlocation_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'polytpe_id',
            fieldLabel:'polytpe_id',
            // id: 'Masterpolytpe_id'
        }, 
        {
            xtype: 'hiddenfield',
            name: 'idunit',
            id: 'idunit',
            value:idunit
        }, 
        {
            xtype: 'textfield',
            fieldLabel: 'Nama Poli',
            allowBlank: false,
            name: 'polytpe_name'
        }, 
        {
            xtype: 'comboxswitch',
            name: 'status',
            id: 'status_poli',
            fieldLabel: 'Status',
            // hidden:true,
            // value:1
        },
        {
            xtype: 'comboxlocation',
            allowBlank: true,
            id: 'polytpe_location',
            name: 'location_id',
        },   
        {
            xtype: 'textarea',
            fieldLabel: 'Deskripsi',
            allowBlank: true,
            name: 'polytpe_desc',
        },
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupPoliType');
            Ext.getCmp('formPoliType').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnPoliTypeSimpan',
        text: 'Simpan',
        handler: function() {
            var form =Ext.getCmp('formPoliType').getForm();
            if (form.isValid()) {
                form.submit({
                    params:{
                        model:'polytype',
                    },
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formPoliType').getForm().reset();
                        Ext.getCmp('windowPopupPoliType').hide();
                        storeGridPoliType.load();
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

var wPoliType = Ext.create('widget.window', {
    id: 'windowPopupPoliType',
    title: 'Form Poli',
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
    items: [formPoliType]
});

Ext.define('MY.searchGridPoliType', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPoliType',
    store: storeGridPoliType,
    width: 180
});
var smGridPoliType = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPoliType.getSelection().length;
            if (selectedLen == 0) {
                // Ext.getCmp('btnDelete.GridPoliType').disable();
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
Ext.define(dir_sys + 'master.GridPoliType', {
    title: 'Jenis Poli',
    itemId: 'GridPoliType',
    id: 'GridPoliType',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPoliType',
    store: storeGridPoliType,
    // selModel: smGridPoliType,
    loadMask: true,
    columns: [
        {
            header: 'location_id',
            dataIndex: 'location_id',
            hidden: true
        },
        {
            header: 'polytpe_id',
            dataIndex: 'polytpe_id',
            hidden: true
        },
        {
            header: 'Nama Poli',          
            dataIndex: 'polytpe_name',
            minWidth: 150
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
        {
            header: 'Deskripsi',
            dataIndex: 'polytpe_desc',
            minWidth: 170,
            flex:1
        },{
            header: 'Lokasi',
            dataIndex: 'location_name',
            minWidth: 170,
            // flex:1 
        }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addwPoliType',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wPoliType.show();
                Ext.getCmp('formPoliType').getForm().reset();
                Ext.getCmp('status_poli').getStore().load();
                Ext.getCmp('polytpe_location').getStore().load();

                Ext.getCmp('status_poli').setValue('1');
                Ext.getCmp('polytpe_location').setValue('1');
                
                Ext.getCmp('statusformwPoliType').setValue('input');
            }
        }, {
            itemId: 'editwPoliType',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridPoliType')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjang').setReadOnly(false);
                    var form = Ext.getCmp('formPoliType');
                    form.getForm().load({
                        url: CLINIC_API + 'master/form_loader',
                        method:'GET',
                        params: {
                            extraparams: 'a.polytpe_id=' + selectedRecord.data.polytpe_id,
                            model:'polytype',
                            key:key,
                            // password:password
                        },
                        success: function(form, action) {
                            var d = action.result;
                            Ext.getCmp('polytpe_location').getStore().load();
                            Ext.getCmp('polytpe_location').setValue(d.data.location_id);
                            Ext.getCmp('status_poli').getStore().load();
                            Ext.getCmp('status_poli').setValue(d.data.status);
                           
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wPoliType.show();
                    Ext.getCmp('statusformwPoliType').setValue('edit');
                }
            }
        }, {
            id: 'btnDeletePoliType',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridPoliType')[0];
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
                                    // idunit:null,
                                    key:key,
                                    model:'polytype',
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (d.success==false) {
                                        Ext.Msg.alert('Informasi', d.message);
                                        storeGridPoliType.load();
                                        
                                    } else {
                                        Ext.Msg.alert('Informasi', d.message);
                                        storeGridPoliType.load();
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
            xtype: 'searchGridPoliType',
            text: 'Left Button'
        }]
    }, 
    {
        xtype: 'pagingtoolbar',
        store: storeGridPoliType, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPoliType.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // loadTransactionGrid(record.data.id_saving_trx)
        }
    }
});
