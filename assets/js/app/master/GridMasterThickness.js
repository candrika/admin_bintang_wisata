Ext.define('GridMasterThicknessModel', {
    extend: 'Ext.data.Model',
    fields: ['thickness_id','item_thickness_tct','item_thickness_bmt','status'],
    idProperty: 'id'
});
var storeGridMasterThickness = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridMasterThicknessModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/MasterThickness/master',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'thickness_id',
        direction: 'DESC'
    }]
});

var formMasterThickness = Ext.create('Ext.form.Panel', {
    id: 'formMasterThickness',
    // width: 740,
    autoWidth:true,
    // height: 370,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/MasterThickness/master',
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
            name: 'thickness_id',
            id: 'thickness_id'
        }, {
            xtype: 'hiddenfield',
            name: 'statusformMasterThickness',
            id: 'statusformMasterThickness'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Item Thickness TCT',
            allowBlank: false,
            name: 'item_thickness_tct'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Item Thickness BMT',
            allowBlank: false,
            name: 'item_thickness_bmt'
        }, {
            xtype: 'comboxswitch',
            fieldLabel: 'Status',
            allowBlank: false,
            name: 'status'

        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupMasterThickness');
            Ext.getCmp('formMasterThickness').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnMasterThicknessSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formMasterThickness').getForm().reset();
                        Ext.getCmp('windowPopupMasterThickness').hide();
                        storeGridMasterThickness.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridMasterThickness.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wMasterThickness = Ext.create('widget.window', {
    id: 'windowPopupMasterThickness',
    title: 'Thickness',
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
    items: [formMasterThickness]
});


Ext.define('MY.searchGridMasterThickness', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridMasterThickness',
    store: storeGridMasterThickness,
    width: 180
});
var smGridMasterThickness = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridMasterThickness.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteMasterThickness').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteMasterThickness').enable();
        }
    }
});

Ext.define(dir_sys + 'master.GridMasterThickness', {
    title: 'Thickness',
    itemId: 'GridMasterThicknessID',
    id: 'GridMasterThicknessID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridMasterThickness',
    store: storeGridMasterThickness,
    loadMask: true,
    columns: [{
        header: 'thickness_id',
        dataIndex: 'thickness_id',
        hidden: true
    }, {
        header: 'Item Thickness TCT',
        dataIndex: 'item_thickness_tct',
        minWidth: 150
    }, {
        header: 'Item Thicness BMT',
        dataIndex: 'item_thickness_bmt',
        minWidth: 150
    }, {
        header: 'Status',
        flex:1,
        dataIndex: 'status',
        minWidth: 150        
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addMasterThickness',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wMasterThickness.show();
                Ext.getCmp('statusformMasterThickness').setValue('input');
            }
        }, {
            itemId: 'editMasterThickness',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridMasterThickness')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formMasterThickness = Ext.getCmp('formMasterThickness');
                    formMasterThickness.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/MasterThickness/1/master',
                        params: {
                            extraparams: 'a.thickness_id:' + selectedRecord.data.thickness_id
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wMasterThickness.show();
                    Ext.getCmp('statusformMasterThickness').setValue('edit');
                    Ext.getCmp('TabSupplier').setActiveTab(0);
                }
            }
        }, {
            id: 'btnDeleteMasterThickness',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridMasterThickness')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/MasterThickness/master',
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
                                        storeGridMasterThickness.load();
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
            xtype: 'searchGridMasterThickness',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridMasterThickness, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridMasterThickness.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formMasterThickness = Ext.getCmp('formMasterThickness');
            wMasterThickness.show();
            formMasterThickness.getForm().load({
                url: SITE_URL + 'backend/loadFormData/MasterThickness/1/master',
                params: {
                    extraparams: 'a.thickness_id:' + record.data.thickness_id
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
            Ext.getCmp('statusformMasterThickness').setValue('edit');

            Ext.getCmp('TabSupplier').setActiveTab(0);
        }
    }
});