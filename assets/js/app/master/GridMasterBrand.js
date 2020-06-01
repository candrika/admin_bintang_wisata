Ext.define('GridMasterBrandModel', {
    extend: 'Ext.data.Model',
    fields: ['brand_id','brand_name','brand_desc','status'],
    idProperty: 'id'
});
var storeGridMasterBrand = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridMasterBrandModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/MasterBrand/master',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'brand_name',
        direction: 'DESC'
    }]
});

var formMasterBrand = Ext.create('Ext.form.Panel', {
    id: 'formMasterBrand',
    // width: 740,
    autoWidth:true,
    // height: 370,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/MasterBrand/master',
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
            name: 'brand_id',
            fieldLabel:'brand_id',
            id: 'brand_id'
        }, {
            xtype: 'hiddenfield',
            name: 'statusformMasterBrand',
            id: 'statusformMasterBrand'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Brand Name',
            allowBlank: false,
            name: 'brand_name'
        }, {
            xtype: 'comboxswitch',
            name: 'status',
            fieldLabel: 'Status',
        }, {
            xtype: 'textarea',
            fieldLabel: 'Description',
            allowBlank: true,
            name: 'brand_desc'
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupMasterBrand');
            Ext.getCmp('formMasterBrand').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnMasterBrandSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formMasterBrand').getForm().reset();
                        Ext.getCmp('windowPopupMasterBrand').hide();
                        storeGridMasterBrand.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridMasterBrand.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wMasterBrand = Ext.create('widget.window', {
    id: 'windowPopupMasterBrand',
    title: 'Brand',
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
    items: [formMasterBrand]
});


Ext.define('MY.searchGridMasterBrand', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridMasterBrand',
    store: storeGridMasterBrand,
    width: 180
});
var smGridMasterBrand = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridMasterBrand.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteMasterBrand').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteMasterBrand').enable();
        }
    }
});
Ext.define(dir_sys + 'master.GridMasterBrand', {
    title: 'Brand',
    itemId: 'GridMasterBrandID',
    id: 'GridMasterBrandID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridMasterBrand',
    store: storeGridMasterBrand,
    loadMask: true,
    columns: [{
        header: 'ID Brand',
        dataIndex: 'brand_id',
        hidden: true
    }, {
        header: 'Brand Name',
        dataIndex: 'brand_name',
        minWidth: 150
    }, {
        header:'Status', dataIndex:'status', minWidth: 100, renderer: function(value){
            return togglearr.map(function(val){return val[1]})[value];
        }
    }, {
        header: 'Description',
        flex:1,
        dataIndex: 'brand_desc',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addMasterBrand',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wMasterBrand.show();
                Ext.getCmp('statusformMasterBrand').setValue('input');
            }
        }, {
            itemId: 'editMasterBrand',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridMasterBrand')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formMasterBrand = Ext.getCmp('formMasterBrand');
                    formMasterBrand.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/MasterBrand/1/master',
                        params: {
                            extraparams: 'a.brand_id:' + selectedRecord.data.brand_id
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wMasterBrand.show();
                    Ext.getCmp('statusformMasterBrand').setValue('edit');
                    Ext.getCmp('TabSupplier').setActiveTab(0);
                }
            }
        }, {
            id: 'btnDeleteMasterBrand',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridMasterBrand')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/MasterBrand/master',
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
                                        storeGridMasterBrand.load();
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
            xtype: 'searchGridMasterBrand',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridMasterBrand, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridMasterBrand.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formMasterBrand = Ext.getCmp('formMasterBrand');
            wMasterBrand.show();
            formMasterBrand.getForm().load({
                url: SITE_URL + 'backend/loadFormData/MasterBrand/1/master',
                params: {
                    extraparams: 'a.supplier_type_id:' + record.data.supplier_type_id
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
            Ext.getCmp('statusformMasterBrand').setValue('edit');

            Ext.getCmp('TabSupplier').setActiveTab(0);
        }
    }
});