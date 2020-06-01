Ext.define('GridMasterProductDataModel', {
    extend: 'Ext.data.Model',
    fields: ['product_id','product_code','product_name','product_desc', 'basic_uom', 'second_uom', 'supplier_id', 'grade', 'prodict_type_id', 'namesupplier','basic_uom_name','second_uom_name', 'product_type_name', 'gradename', 'brand_id', 'brand_name', 'thickness_id', 'item_thickness_tct', 'status'],
    idProperty: 'id'
});
var storeGridMasterProductData = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridMasterProductDataModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/MasterProductData/master',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'product_name',
        direction: 'ASC'
    }]
});

var formMasterProductData = Ext.create('Ext.form.Panel', {
    id: 'formMasterProductData',
    // width: 740,
    autoWidth:true,
    // height: 370,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/MasterProductData/master',
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
            name: 'product_id',
            id: 'product_id'
        }, {
            xtype: 'hiddenfield',
            name: 'statusformMasterProductData',
            id: 'statusformMasterProductData'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Product Code',
            allowBlank: false,
            name: 'product_code'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Product Name',
            allowBlank: false,
            name: 'product_name'
        }, {
            xtype: 'comboxproducttype',
        }, {
            xtype: 'comboxmeasurement',
            fieldLabel: 'Basic UoM',
            allowBlank: false,
            name: 'basic_uom'
        }, {
            xtype: 'comboxmeasurement',
            fieldLabel: 'Second UoM',
            allowBlank: false,
            name: 'second_uom'
        }, {
            xtype: 'comboxidsupplier',
            allowBlank: false,
        }, {
            xtype: 'comboxbrand',
            allowBlank: false,
        }, {
            xtype: 'comboxthickness',
            allowBlank: false,
        }, {
            xtype: 'comboxproductgrade',
            allowBlank: false,
        }, {
            xtype: 'comboxswitch',
            allowBlank:false,
            fieldLabel: 'status',
            name: 'status',
        }, {
            xtype: 'textarea',
            fieldLabel: 'Description',
            allowBlank: true,
            name: 'product_desc'
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupMasterProductData');
            Ext.getCmp('formMasterProductData').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnMasterProductDataSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formMasterProductData').getForm().reset();
                        Ext.getCmp('windowPopupMasterProductData').hide();
                        storeGridMasterProductData.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //storeGridMasterProductData.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wMasterProductData = Ext.create('widget.window', {
    id: 'windowPopupMasterProductData',
    title: 'Product Master Data',
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
    items: [formMasterProductData]
});


Ext.define('MY.searchGridMasterProductData', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridMasterProductData',
    store: storeGridMasterProductData,
    width: 180
});
var smGridMasterProductData = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridMasterProductData.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteMasterProductData').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteMasterProductData').enable();
        }
    }
});
Ext.define(dir_sys + 'master.GridMasterProductData', {
    title: 'Product Master Data',
    itemId: 'GridMasterProductDataID',
    id: 'GridMasterProductDataID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridMasterProductData',
    store: storeGridMasterProductData,
    loadMask: true,
    columns: [{
        header: 'product_id',
        dataIndex: 'product_id',
        hidden: true
    }, {
        header: 'Product Code',
        dataIndex: 'product_code',
        minWidth: 150
    }, {
        header: 'Product Name',
        dataIndex: 'product_name',
        minWidth: 150
    }, {
        header: 'Type',
        dataIndex: 'product_type_name',
        minWidth: 150
    }, {
        header: 'Basic UoM',
        dataIndex: 'basic_uom_name',
        minWidth: 150
    }, {
        header: 'Second UoM',
        dataIndex: 'second_uom_name',
        minWidth: 150
    }, {
        header: 'Supplier',
        dataIndex: 'namesupplier',
        minWidth: 150
    }, {
        header: 'Grade',
        dataIndex: 'gradename',
        minWidth: 150
    }, {
        header: 'Brand',
        dataIndex: 'brand_name',
        minWidth: 150
    }, {
        header: 'Thickness',
        dataIndex: 'item_thickness_tct',
        minWidth: 150
    }, {
        header: 'Status',
        dataIndex: 'status',
    }, {
        header: 'Description',
        flex:1,
        dataIndex: 'product_desc',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addMasterProductData',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wMasterProductData.show();
                Ext.getCmp('statusformMasterProductData').setValue('input');
            }
        }, {
            itemId: 'editMasterProductData',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridMasterProductData')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formMasterProductData = Ext.getCmp('formMasterProductData');
                    formMasterProductData.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/MasterProductData/1/master',
                        params: {
                            extraparams: 'a.product_id:' + selectedRecord.data.product_id
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wMasterProductData.show();
                    Ext.getCmp('statusformMasterProductData').setValue('edit');
                    Ext.getCmp('TabSupplier').setActiveTab(0);
                }
            }
        }, {
            id: 'btnDeleteMasterProductData',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridMasterProductData')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/MasterProductData/master',
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
                                        storeGridMasterProductData.load();
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
            xtype: 'searchGridMasterProductData',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridMasterProductData, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridMasterProductData.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formMasterProductData = Ext.getCmp('formMasterProductData');
            wMasterProductData.show();
            formMasterProductData.getForm().load({
                url: SITE_URL + 'backend/loadFormData/MasterProductData/1/master',
                params: {
                    extraparams: 'a.product_id:' + record.data.product_id
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
            Ext.getCmp('statusformMasterProductData').setValue('edit');

            Ext.getCmp('TabSupplier').setActiveTab(0);
        }
    }
});