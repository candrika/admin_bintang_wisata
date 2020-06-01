Ext.define('GridMasterRackModel', {
    extend: 'Ext.data.Model',
    fields: ['rack_id','rack_name','rack_type','rack_desc','status'],
    idProperty: 'id'
});
var storeGridMasterRack = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridMasterRackModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/MasterRack/master',
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

var formMasterRack = Ext.create('Ext.form.Panel', {
    id: 'formMasterRack',
    // width: 740,
    autoWidth:true,
    // height: 370,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/MasterRack/master',
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
            name: 'rack_id',
            id: 'rack_id'
        }, {
            xtype: 'hiddenfield',
            name: 'statusformMasterRack',
            id: 'statusformMasterRack'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Name',
            allowBlank: false,
            name: 'rack_name'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Type',
            allowBlank: false,
            name: 'rack_type'
        }, {
            xtype: 'comboxswitch',
            fieldLabel: 'Status',
            allowBlank: false,
            name: 'status',
        }, {
            xtype: 'textarea',
            fieldLabel: 'Description',
            allowBlank: true,
            name: 'rack_desc'
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupMasterRack');
            Ext.getCmp('formMasterRack').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnMasterRackSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formMasterRack').getForm().reset();
                        Ext.getCmp('windowPopupMasterRack').hide();
                        storeGridMasterRack.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridMasterRack.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wMasterRack = Ext.create('widget.window', {
    id: 'windowPopupMasterRack',
    title: 'Rack',
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
    items: [formMasterRack]
});


Ext.define('MY.searchGridMasterRack', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridMasterRack',
    store: storeGridMasterRack,
    width: 180
});
var smGridMasterRack = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridMasterRack.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteMasterRack').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteMasterRack').enable();
        }
    }
});
Ext.define(dir_sys + 'master.GridMasterRack', {
    title: 'Rack',
    itemId: 'GridMasterRackID',
    id: 'GridMasterRackID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridMasterRack',
    store: storeGridMasterRack,
    loadMask: true,
    columns: [{
        header: 'rack_id',
        dataIndex: 'rack_id',
        hidden: true
    }, {
        header: 'Name',
        dataIndex: 'rack_name',
        minWidth: 150
    }, {
        header: 'Type',
        dataIndex: 'rack_type',
        minWidth: 150
    }, {
        header: 'Status',
        dataIndex: 'status',
    }, {
        header: 'Description',
        flex:1,
        dataIndex: 'rack_desc',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addMasterRack',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wMasterRack.show();
                Ext.getCmp('statusformMasterRack').setValue('input');
            }
        }, {
            itemId: 'editMasterRack',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridMasterRack')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formMasterRack = Ext.getCmp('formMasterRack');
                    formMasterRack.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/MasterRack/1/master',
                        params: {
                            extraparams: 'a.rack_id:' + selectedRecord.data.rack_id
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wMasterRack.show();
                    Ext.getCmp('statusformMasterRack').setValue('edit');
                    Ext.getCmp('TabSupplier').setActiveTab(0);
                }
            }
        }, {
            id: 'btnDeleteMasterRack',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridMasterRack')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/MasterRack/master',
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
                                        storeGridMasterRack.load();
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
            xtype: 'searchGridMasterRack',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridMasterRack, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridMasterRack.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formMasterRack = Ext.getCmp('formMasterRack');
            wMasterRack.show();
            formMasterRack.getForm().load({
                url: SITE_URL + 'backend/loadFormData/MasterRack/1/master',
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
            Ext.getCmp('statusformMasterRack').setValue('edit');

            Ext.getCmp('TabSupplier').setActiveTab(0);
        }
    }
});