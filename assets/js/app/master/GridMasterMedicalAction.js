Ext.define('GridMasterMedicalActionModel', {
    extend: 'Ext.data.Model',
    fields: ['medical_action_id','medical_action_name','medical_action_desc', 'deleted','userin','datein', 'usermod','datemod','service_fee'],
    idProperty: 'id'
});

var storeGridMasterMedicalAction = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridMasterMedicalActionModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'get/datas?model=medical_action',
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

storeGridMasterMedicalAction.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'key':key,
        'password':password,
        'idunit':idunit,
        'userid':userid
    };
});

var formMasterMedicalAction = Ext.create('Ext.form.Panel', {
    id: 'formMasterMedicalAction',
    autoWidth:true,
    autoHeight:true,
    url: CLINIC_API + 'form/save/medical_action',
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
            name: 'statusformMasterMedicalAction',
            fieldLabel:'statusformMasterMedicalAction',
            id: 'statusformMasterMedicalAction',
            // value:password 
        },
        // {
        //     xtype: 'hiddenfield',
        //     name: 'model',
        //     id: 'model',
        //     value:'medical_action'
        // }, 
        {
            xtype: 'hiddenfield',
            name: 'medical_action_id',
            fieldLabel:'medical_action_id',
            id: 'medical_action_id'
        }, 
        {
            xtype: 'textfield',
            fieldLabel: 'Kode',
            allowBlank: false,
            name: 'medical_action_name',
            // listeners:{
            //     renderer:function(){

            //     }
            // }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Biaya',
            allowBlank: false,
            name: 'service_fee',
            id: 'service_fee',
            fieldStyle:'text-align: right;',
            listeners:{
                'render': function(c) {
                    c.getEl().on('keyup', function() {
                        this.setRawValue(renderNomor(this.getValue()));
                        calcChangeAmount();
                    }, c);
                }
            }
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Deskripsi',
            allowBlank: true,
            name: 'medical_action_desc',
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupMasterMedicalAction');
            Ext.getCmp('formMasterMedicalAction').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnMasterMedicalActionSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    params:{
                        model:'medical_action'
                    },
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formMasterMedicalAction').getForm().reset();
                        Ext.getCmp('windowPopupMasterMedicalAction').hide();
                        storeGridMasterMedicalAction.load();
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

var wMasterMedicalAction = Ext.create('widget.window', {
    id: 'windowPopupMasterMedicalAction',
    title: 'Entry Jenis Tindakan',
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
    items: [formMasterMedicalAction]
});

Ext.define('MY.searchGridMasterMedicalAction', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridMasterMedicalAction',
    store: storeGridMasterMedicalAction,
    width: 180
});
var smGridMasterMedicalAction = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridMasterMedicalAction.getSelection().length;
            if (selectedLen == 0) {
                // Ext.getCmp('btnDelete.GridMasterMedicalAction').disable();
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
Ext.define(dir_sys + 'master.GridMasterMedicalAction', {
    title: 'Jenis Tindakan Medis',
    itemId: 'GridMasterMedicalAction',
    id: 'GridMasterMedicalAction',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridMasterMedicalAction',
    store: storeGridMasterMedicalAction,
    loadMask: true,
    columns: [
        {
            header: 'medical_action_id',
            dataIndex: 'medical_action_id',
            hidden: true
        },
        {
            header: 'Tindakan',      
            dataIndex: 'medical_action_name',
            minWidth: 150,
            // flex:1
        },
        {
            header: 'Deskripsi',
            dataIndex: 'medical_action_desc',
            minWidth: 170,
            flex:1
        },
        {
            header:'Biaya Tindakan',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right',
            dataIndex:'service_fee'
        }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addMasterMedicalAction',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wMasterMedicalAction.show();
                Ext.getCmp('formMasterDiseases').getForm().reset();
                
                Ext.getCmp('statusformMasterMedicalAction').setValue('input');
            }
        }, {
            itemId: 'editMasterMedicalAction',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridMasterMedicalAction')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjang').setReadOnly(false);
                    var formInventoryCat = Ext.getCmp('formMasterMedicalAction');
                    formInventoryCat.getForm().load({
                        url: CLINIC_API + 'master/form_loader',
                        method:'GET',
                        params: {
                            extraparams: 'a.medical_action_id=' + selectedRecord.data.medical_action_id,
                            model:'medical_action',
                            key:key,
                            // password:password
                        },
                        success: function(form, action) {
                            var d =action.result;
                            console.log(d);
                            Ext.getCmp('service_fee').setValue(renderNomor(d.data.service_fee*1));

                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wMasterMedicalAction.show();
                    Ext.getCmp('statusformMasterMedicalAction').setValue('edit');
                }
            }
        }, {
            id: 'btnDeleteMasterMedicalAction',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridMasterMedicalAction')[0];
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
                                    model:'medical_action',
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (d.success==false) {
                                        Ext.Msg.alert('Informasi', d.message);
                                        storeGridMasterMedicalAction.load();
                                        
                                    } else {
                                        Ext.Msg.alert('Informasi', d.message);
                                        storeGridMasterMedicalAction.load();
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
            xtype: 'searchGridMasterMedicalAction',
            text: 'Left Button'
        }]
    }, 
    {
        xtype: 'pagingtoolbar',
        store: storeGridMasterMedicalAction, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridMasterMedicalAction.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // loadTransactionGrid(record.data.id_saving_trx)
        }
    }
});
