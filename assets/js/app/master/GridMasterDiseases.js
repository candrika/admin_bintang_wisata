Ext.define('GridMasterDiseasesModel', {
    extend: 'Ext.data.Model',
    fields: ['disease_id','disease_code','disease_name','disease_desc', 'deleted','userin','datein', 'usermod','datemod'],
    idProperty: 'id'
});

var storeGridMasterDiseases = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridMasterDiseasesModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'get/datas?model=diseases',
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

storeGridMasterDiseases.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'key':key,
        'password':password,
        'idunit':idunit,
        'userid':userid
    };
});

var formMasterDiseases = Ext.create('Ext.form.Panel', {
    id: 'formMasterDiseases',
    autoWidth:true,
    autoHeight:true,
    url: CLINIC_API + 'form/save/diseases',
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
            name: 'statusformMasterDiseases',
            fieldLabel:'statusformMasterDiseases',
            id: 'statusformMasterDiseases',
            // value:password 
        },
        // {
        //     xtype: 'hiddenfield',
        //     name: 'model',
        //     id: 'model',
        //     value:'diseases'
        // }, 
        {
            xtype: 'hiddenfield',
            name: 'disease_id',
            fieldLabel:'disease_id',
            id: 'disease_id'
        }, 
        {
            xtype: 'textfield',
            fieldLabel: 'Kode',
            allowBlank: false,
            name: 'disease_code',
            // listeners:{
            //     renderer:function(){

            //     }
            // }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Diagnosa',
            allowBlank: false,
            name: 'disease_name',
        }, 
        {
            xtype: 'textarea',
            fieldLabel: 'Deskripsi',
            allowBlank: true,
            name: 'disease_desc',
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupMasterDiseases');
            Ext.getCmp('formMasterDiseases').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnMasterDiseasesSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    params:{
                        model:'diseases'
                    },
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formMasterDiseases').getForm().reset();
                        Ext.getCmp('windowPopupMasterDiseases').hide();
                        storeGridMasterDiseases.load();
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

var wMasterDiseases = Ext.create('widget.window', {
    id: 'windowPopupMasterDiseases',
    title: 'Entry Classification of Diseases (ICD-10)',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formMasterDiseases]
});

Ext.define('MY.searchGridMasterDiseases', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridMasterDiseases',
    store: storeGridMasterDiseases,
    width: 180
});
var smGridMasterDiseases = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridMasterDiseases.getSelection().length;
            if (selectedLen == 0) {
                // Ext.getCmp('btnDelete.GridMasterDiseases').disable();
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
Ext.define(dir_sys + 'master.GridMasterDiseases', {
    title: 'Classification of Diseases (ICD-10)',
    itemId: 'GridMasterDiseases',
    id: 'GridMasterDiseases',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridMasterDiseases',
    store: storeGridMasterDiseases,
    loadMask: true,
    columns: [
        {
            header: 'disease_id',
            dataIndex: 'disease_id',
            hidden: true
        },
        {
            header: 'Kode',      
            dataIndex: 'disease_code',
            minWidth: 150,
            // flex:1
        },
        {
            header: 'Diagnosa',      
            dataIndex: 'disease_name',
            minWidth: 150,
            // flex:1
        },
        {
            header: 'Deskripsi',
            dataIndex: 'disease_desc',
            minWidth: 170,
            flex:1
        }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addMasterDiseases',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wMasterDiseases.show();
                Ext.getCmp('formMasterDiseases').getForm().reset();
                
                Ext.getCmp('statusformMasterDiseases').setValue('input');
            }
        }, {
            itemId: 'editMasterDiseases',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridMasterDiseases')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjang').setReadOnly(false);
                    var formInventoryCat = Ext.getCmp('formMasterDiseases');
                    formInventoryCat.getForm().load({
                        url: CLINIC_API + 'master/form_loader',
                        method:'GET',
                        params: {
                            extraparams: 'a.disease_id=' + selectedRecord.data.disease_id,
                            model:'diseases',
                            key:key,
                            // password:password
                        },
                        success: function(form, action) {
                            var d = Ext.decode(form.responseText);
                            console.log(d);
                            Ext.getCmp('status_MasterDiseases').getStore().load();

                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wMasterDiseases.show();
                    Ext.getCmp('statusformMasterDiseases').setValue('edit');
                }
            }
        }, {
            id: 'btnDeleteMasterDiseases',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridMasterDiseases')[0];
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
                                    model:'diseases',
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (d.success==false) {
                                        Ext.Msg.alert('Informasi', d.message);
                                        storeGridMasterDiseases.load();
                                        
                                    } else {
                                        Ext.Msg.alert('Informasi', d.message);
                                        storeGridMasterDiseases.load();
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
            xtype: 'searchGridMasterDiseases',
            text: 'Left Button'
        }]
    }, 
    {
        xtype: 'pagingtoolbar',
        store: storeGridMasterDiseases, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridMasterDiseases.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // loadTransactionGrid(record.data.id_saving_trx)
        }
    }
});
