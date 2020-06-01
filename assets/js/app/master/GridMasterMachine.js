Ext.define('GridMasterMachineModel', {
    extend: 'Ext.data.Model',
    fields: ['machine_id','machine_name','machine_description','width_material','machine_type_id','idunit','brand','serial_no','machine_result','manufacturer','status'],
    idProperty: 'id'
});
var storeGridMasterMachine = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridMasterMachineModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/MasterMachine/master',
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

var formMasterMachine = Ext.create('Ext.form.Panel', {
    id: 'formMasterMachine',
    // width: 740,
    autoWidth:true,
    // height: 370,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/MasterMachine/master',
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
            name: 'machine_id',
            id: 'machine_id'
        }, {
            xtype: 'hiddenfield',
            name: 'statusformMasterMachine',
            id: 'statusformMasterMachine'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Machine Name',
            allowBlank: false,
            name: 'machine_name'
        },{
            xtype:'comboxMachineType'
        },{
            xtype: 'textfield',
            fieldLabel: 'Brand',
            name: 'brand'
        },{
            xtype: 'textfield',
            fieldLabel: 'serial_no',
            name: 'serial_no'
        },{
            xtype: 'textfield',
            fieldLabel: 'machine_result',
            name: 'machine_result'
        },{
            xtype: 'textfield',
            fieldLabel: 'manufacturer',
            name: 'manufacturer'
        }, {
            xtype: 'comboxswitch',
            fieldLabel: 'Status',
            allowBlank: false,
            name: 'status',
        }, {
            xtype: 'textarea',
            fieldLabel: 'Description',
            name: 'machine_description'
        },
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupMasterMachine');
            Ext.getCmp('formMasterMachine').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnMasterMachineSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formMasterMachine').getForm().reset();
                        Ext.getCmp('windowPopupMasterMachine').hide();
                        storeGridMasterMachine.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridMasterMachine.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wMasterMachine = Ext.create('widget.window', {
    id: 'windowPopupMasterMachine',
    title: 'Machine',
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
    items: [formMasterMachine]
});


Ext.define('MY.searchGridMasterMachine', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridMasterMachine',
    store: storeGridMasterMachine,
    width: 180
});
var smGridMasterMachine = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridMasterMachine.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteMasterMachine').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteMasterMachine').enable();
        }
    }
});
Ext.define(dir_sys + 'master.GridMasterMachine', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridMasterMachine,
    title: 'Machine Data',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridMasterMachineID',
    id: 'GridMasterMachineID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridMasterMachine',
    store: storeGridMasterMachine,
    loadMask: true,
    columns: [{
        header: 'machine_id',
        dataIndex: 'machine_id',
        hidden: true
    }, {
        header: 'Machine Name',
        dataIndex: 'machine_name',
        minWidth: 150
    }, {
        header: 'Brand',
        dataIndex: 'brand',
        minWidth: 150
    }, {
        header: 'Serial No',
        dataIndex: 'serial_no',
        minWidth: 150
    }, {
        header: 'Machine Result',
        dataIndex: 'machine_result',
        minWidth: 150
    }, {
        header: 'Manufacturer',
        dataIndex: 'manufacturer',
        minWidth: 150
    }, {
        header: 'Status',
        dataIndex: 'status',
    }, {
        header: 'Machine Description',
        flex:1,
        dataIndex: 'machine_description',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addMasterMachine',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wMasterMachine.show();
                MachineTypeStore.load();
                Ext.getCmp('statusformMasterMachine').setValue('input');
            }
        }, {
            itemId: 'editMasterMachine',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridMasterMachine')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formMasterMachine = Ext.getCmp('formMasterMachine');
                    formMasterMachine.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/MasterMachine/1/master',
                        params: {
                            extraparams: 'a.machine_id:' + selectedRecord.data.machine_id
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wMasterMachine.show();
                    Ext.getCmp('statusformMasterMachine').setValue('edit');
                    Ext.getCmp('TabSupplier').setActiveTab(0);
                }
            }
        }, {
            id: 'btnDeleteMasterMachine',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridMasterMachine')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/MasterMachine/master',
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
                                        storeGridMasterMachine.load();
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
            xtype: 'searchGridMasterMachine',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridMasterMachine, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridMasterMachine.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formMasterMachine = Ext.getCmp('formMasterMachine');
            wMasterMachine.show();
            formMasterMachine.getForm().load({
                url: SITE_URL + 'backend/loadFormData/MasterMachine/1/master',
                params: {
                    extraparams: 'a.machine_id:' + record.data.machine_id
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
            Ext.getCmp('statusformMasterMachine').setValue('edit');

            Ext.getCmp('TabSupplier').setActiveTab(0);
        }
    }
});