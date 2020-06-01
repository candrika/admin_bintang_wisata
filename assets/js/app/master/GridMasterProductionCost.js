Ext.define('GridMasterProductionCostModel', {
    extend: 'Ext.data.Model',
    fields: ['prod_cost_id','cost_code','cost_name','standard_hour','standard_cost','cost_desc'],
    idProperty: 'id'
});
var storeGridMasterProductionCost = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridMasterProductionCostModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/MasterProductionCost/production',
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

var formMasterProductionCost = Ext.create('Ext.form.Panel', {
    id: 'formMasterProductionCost',
    // width: 740,
    autoWidth:true,
    // height: 370,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/MasterProductionCost/production',
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
            name: 'prod_cost_id',
            id: 'prod_cost_id'
        }, {
            xtype: 'hiddenfield',
            name: 'statusformMasterProductionCost',
            id: 'statusformMasterProductionCost'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Cost Name',
            allowBlank: false,
            name: 'cost_name'
        },  {
            xtype: 'textfield',
            fieldLabel: 'Cost Code',
            allowBlank: false,
            name: 'cost_code'
        },  {
            xtype: 'textfield',
            fieldLabel: 'Standard Hour',
            allowBlank: false,
            name: 'standard_hour'
        },  {
            xtype: 'textfield',
            fieldLabel: 'Standard Cost',
            allowBlank: false,
            name: 'standard_cost'
        },  {
            xtype: 'textfield',
            fieldLabel: 'Description',
            allowBlank: false,
            name: 'cost_desc'
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupMasterProductionCost');
            Ext.getCmp('formMasterProductionCost').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnMasterProductionCostSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formMasterProductionCost').getForm().reset();
                        Ext.getCmp('windowPopupMasterProductionCost').hide();
                        storeGridMasterProductionCost.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridMasterProductionCost.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wMasterProductionCost = Ext.create('widget.window', {
    id: 'windowPopupMasterProductionCost',
    title: 'Production Cost',
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
    items: [formMasterProductionCost]
});


Ext.define('MY.searchGridMasterProductionCost', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridMasterProductionCost',
    store: storeGridMasterProductionCost,
    width: 180
});
var smGridMasterProductionCost = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridMasterProductionCost.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteMasterProductionCost').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteMasterProductionCost').enable();
        }
    }
});

Ext.define(dir_sys + 'master.GridMasterProductionCost', {
    title: 'Production Cost',
    itemId: 'GridMasterProductionCostID',
    id: 'GridMasterProductionCostID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridMasterProductionCost',
    store: storeGridMasterProductionCost,
    loadMask: true,
    columns: [{
        header: 'prod_cost_id',
        dataIndex: 'prod_cost_id',
        hidden: true
    }, {
        header: 'Cost Code',
        dataIndex: 'cost_code',
        minWidth: 150
    }, {
        header: 'Cost Name',
        dataIndex: 'cost_name',
    }, {
        header: 'Standard Hour',
        dataIndex: 'standard_hour',
        minWidth: 150
    }, {
        header: 'Standard Cost',
        dataIndex: 'standard_cost',
        minWidth: 150
    }, {
        header: 'Description',
        dataIndex: 'cost_desc',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addMasterProductionCost',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wMasterProductionCost.show();
                Ext.getCmp('statusformMasterProductionCost').setValue('input');
            }
        }, {
            itemId: 'editMasterProductionCost',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridMasterProductionCost')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formMasterProductionCost = Ext.getCmp('formMasterProductionCost');
                    formMasterProductionCost.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/MasterProductionCost/1/production',
                        params: {
                            extraparams: 'a.prod_cost_id:' + selectedRecord.data.prod_cost_id
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wMasterProductionCost.show();
                    Ext.getCmp('statusformMasterProductionCost').setValue('edit');
                    // Ext.getCmp('TabSupplier').setActiveTab(0);
                }
            }
        }, {
            id: 'btnDeleteMasterProductionCost',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridMasterProductionCost')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/MasterProductionCost/production',
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
                                        storeGridMasterProductionCost.load();
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
            xtype: 'searchGridMasterProductionCost',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridMasterProductionCost, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridMasterProductionCost.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formMasterProductionCost = Ext.getCmp('formMasterProductionCost');
            wMasterProductionCost.show();
            formMasterProductionCost.getForm().load({
                url: SITE_URL + 'backend/loadFormData/MasterProductionCost/1/production',
                params: {
                    extraparams: 'a.prod_cost_id:' + record.data.prod_cost_id
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
            Ext.getCmp('statusformMasterProductionCost').setValue('edit');

            Ext.getCmp('TabSupplier').setActiveTab(0);
        }
    }
});