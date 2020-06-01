Ext.define('GridMasterProductMeasurementsModel', {
    extend: 'Ext.data.Model',
    fields: ['measurement_id','short_desc','long_desc', 'status'],
    idProperty: 'id'
});
var storeGridMasterProductMeasurements = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridMasterProductMeasurementsModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/MasterProductMeasurements/master',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'short_desc',
        direction: 'ASC'
    }]
});

var formMasterProductMeasurements = Ext.create('Ext.form.Panel', {
    id: 'formMasterProductMeasurements',
    // width: 740,
    autoWidth:true,
    // height: 370,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/MasterProductMeasurements/master',
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
            name: 'measurement_id',
            id: 'measurement_id'
        }, {
            xtype: 'hiddenfield',
            name: 'statusformMasterProductMeasurements',
            id: 'statusformMasterProductMeasurements'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Short Description',
            allowBlank: false,
            name: 'short_desc'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Long Description',
            allowBlank: true,
            name: 'long_desc'
        }, {
            xtype: 'comboxswitch',
            fieldLabel: 'Status',
            name: 'status',
            allowBlank: false,
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupMasterProductMeasurements');
            Ext.getCmp('formMasterProductMeasurements').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnMasterProductMeasurementsSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formMasterProductMeasurements').getForm().reset();
                        Ext.getCmp('windowPopupMasterProductMeasurements').hide();
                        storeGridMasterProductMeasurements.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridMasterProductMeasurements.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wMasterProductMeasurements = Ext.create('widget.window', {
    id: 'windowPopupMasterProductMeasurements',
    title: 'Product Measurements',
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
    items: [formMasterProductMeasurements]
});


Ext.define('MY.searchGridMasterProductMeasurements', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridMasterProductMeasurements',
    store: storeGridMasterProductMeasurements,
    width: 180
});
var smGridMasterProductMeasurements = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridMasterProductMeasurements.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteMasterProductMeasurements').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteMasterProductMeasurements').enable();
        }
    }
});
Ext.define(dir_sys + 'master.GridMasterProductMeasurements', {
    title: 'Product Measurements',
    itemId: 'GridMasterProductMeasurementsID',
    id: 'GridMasterProductMeasurementsID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridMasterProductMeasurements',
    store: storeGridMasterProductMeasurements,
    loadMask: true,
    columns: [{
        header: 'measurement_id',
        dataIndex: 'measurement_id',
        hidden: true
    }, {
        header: 'Short Description',
        dataIndex: 'short_desc',
        minWidth: 150
    }, {
        header: 'Long Description',
        dataIndex: 'long_desc',
        minWidth: 150
    }, {
        header: 'Status',
        dataIndex: 'status',
        flex:1,
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addMasterProductMeasurements',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wMasterProductMeasurements.show();
                Ext.getCmp('statusformMasterProductMeasurements').setValue('input');
            }
        }, {
            itemId: 'editMasterProductMeasurements',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridMasterProductMeasurements')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formMasterProductMeasurements = Ext.getCmp('formMasterProductMeasurements');
                    formMasterProductMeasurements.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/MasterProductMeasurements/1/master',
                        params: {
                            extraparams: 'a.measurement_id:' + selectedRecord.data.measurement_id
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wMasterProductMeasurements.show();
                    Ext.getCmp('statusformMasterProductMeasurements').setValue('edit');
                    Ext.getCmp('TabSupplier').setActiveTab(0);
                }
            }
        }, {
            id: 'btnDeleteMasterProductMeasurements',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridMasterProductMeasurements')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/MasterProductMeasurements/master',
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
                                        storeGridMasterProductMeasurements.load();
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
            xtype: 'searchGridMasterProductMeasurements',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridMasterProductMeasurements, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridMasterProductMeasurements.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formMasterProductMeasurements = Ext.getCmp('formMasterProductMeasurements');
            wMasterProductMeasurements.show();
            formMasterProductMeasurements.getForm().load({
                url: SITE_URL + 'backend/loadFormData/MasterProductMeasurements/1/master',
                params: {
                    extraparams: 'a.measurement_id:' + record.data.measurement_id
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
            Ext.getCmp('statusformMasterProductMeasurements').setValue('edit');

            Ext.getCmp('TabSupplier').setActiveTab(0);
        }
    }
});