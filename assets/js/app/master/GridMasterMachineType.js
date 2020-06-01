Ext.define('GridMasterMachineTypeModel', {
    extend: 'Ext.data.Model',
    fields: ['machine_type_id','machine_type_name','machine_type_desc','status'],
    idProperty: 'id'
});
var storeGridMasterMachineType = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridMasterMachineTypeModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/MasterMachineType/master',
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

var formMasterMachineType = Ext.create('Ext.form.Panel', {
    id: 'formMasterMachineType',
    // width: 740,
    autoWidth:true,
    // height: 370,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/MasterMachineType/master',
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
            name: 'machine_type_id',
            id: 'machine_type_id'
        }, {
            xtype: 'hiddenfield',
            name: 'statusformMasterMachineType',
            id: 'statusformMasterMachineType'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Type Name',
            allowBlank: false,
            name: 'machine_type_name'
        }, {
            xtype: 'comboxswitch',
            fieldLabel: 'Status',
            allowBlank: false,
            name: 'status',
        }, {
            xtype: 'textarea',
            fieldLabel: 'Description',
            allowBlank: false,
            name: 'machine_type_desc'
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupMasterMachineType');
            Ext.getCmp('formMasterMachineType').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnMasterMachineTypeSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formMasterMachineType').getForm().reset();
                        Ext.getCmp('windowPopupMasterMachineType').hide();
                        storeGridMasterMachineType.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridMasterMachineType.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wMasterMachineType = Ext.create('widget.window', {
    id: 'windowPopupMasterMachineType',
    title: 'Machine Type',
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
    items: [formMasterMachineType]
});


Ext.define('MY.searchGridMasterMachineType', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridMasterMachineType',
    store: storeGridMasterMachineType,
    width: 180
});
var smGridMasterMachineType = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridMasterMachineType.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteMasterMachineType').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteMasterMachineType').enable();
        }
    }
});
Ext.define(dir_sys + 'master.GridMasterMachineType', {
    title: 'Machine Type',
    itemId: 'GridMasterMachineTypeID',
    id: 'GridMasterMachineTypeID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridMasterMachineType',
    store: storeGridMasterMachineType,
    loadMask: true,
    columns: [{
        header: 'machine_type_id',
        dataIndex: 'machine_type_id',
        hidden: true
    }, {
        header: 'Type Name',
        dataIndex: 'machine_type_name',
        minWidth: 250
    }, {
        header: 'Status',
        dataIndex: 'status',
    }, {
        header: 'Description',
        flex:1,
        dataIndex: 'machine_type_desc',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addMasterMachineType',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wMasterMachineType.show();
                Ext.getCmp('statusformMasterMachineType').setValue('input');
            }
        }, {
            itemId: 'editMasterMachineType',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridMasterMachineType')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formMasterMachineType = Ext.getCmp('formMasterMachineType');
                    formMasterMachineType.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/MasterMachineType/1/master',
                        params: {
                            extraparams: 'a.machine_type_id:' + selectedRecord.data.machine_type_id
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wMasterMachineType.show();
                    Ext.getCmp('statusformMasterMachineType').setValue('edit');
                    Ext.getCmp('TabSupplier').setActiveTab(0);
                }
            }
        }, {
            id: 'btnDeleteMasterMachineType',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridMasterMachineType')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/MasterMachineType/master',
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
                                        storeGridMasterMachineType.load();
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
            xtype: 'searchGridMasterMachineType',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridMasterMachineType, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridMasterMachineType.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formMasterMachineType = Ext.getCmp('formMasterMachineType');
            wMasterMachineType.show();
            formMasterMachineType.getForm().load({
                url: SITE_URL + 'backend/loadFormData/MasterMachineType/1/master',
                params: {
                    extraparams: 'a.machine_type_id:' + record.data.machine_type_id
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
            Ext.getCmp('statusformMasterMachineType').setValue('edit');

            Ext.getCmp('TabSupplier').setActiveTab(0);
        }
    }
});