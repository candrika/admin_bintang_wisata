// Ext.require([ 
//     dir_sys+'inventory.TabInventorySpecs'
// ]);


var TabInventorySpecs = Ext.create(dir_sys + 'inventory.TabInventorySpecs');
var GridStockInventoryTab = Ext.create(dir_sys + 'inventory.GridStockInventoryTab');

Ext.define('TabItemInventory', {
    extend: 'Ext.tab.Panel',
    id: 'TabItemInventory',
    alias: 'widget.TabItemInventory',
    activeTab: 0,
    plain: true,
    // autoWidth: '90%',
    // autoScroll: true,
    // defaults: {
    // autoScroll: true,
    // bodyPadding: '1 0 15 0'
    // },
    plugins: [{
        ptype: 'tabscrollermenu',
        maxText: 15,
        pageSize: 20
    }],
    listeners: {
        render: function() {
            this.items.each(function(i) {
                i.tab.on('click', function() {
                    var grid = Ext.ComponentQuery.query('GridInventoryAllBySku')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    if (i.title == 'Akun Persediaan') {
                        storeGridAccInv.load({
                            params: {
                                'extraparams': 'idinventory:' + selectedRecord.data.idinventory
                            }
                        });
                    } else if (i.title == 'Riwayat Penyusutan') {
                        storeGridDepresiasiInventory.on('beforeload', function(store, operation, eOpts) {
                            operation.params = {
                                'extraparams': 'idinventory:' + selectedRecord.data.idinventory
                            };
                        });

                        storeGridDepresiasiInventory.load();
                    } else if (i.title == 'Stock') {
                        var GridStockInventoryTabStore = Ext.getCmp('GridStockInventoryTab').getStore();
                        GridStockInventoryTabStore.on('beforeload', function(store, operation, eOpts) {
                            operation.params = {
                                'extraparams': 'a.idinventory:' + selectedRecord.data.idinventory
                            };
                        });
                        GridStockInventoryTabStore.load();
                    }
                });
            });
        }
    },
    items: [
        formInventoryV2, {
            xtype: 'GridAccInventoryTab'
        }, {
            xtype: 'GridDepresiasiInventoryTab'
        },
        {
            xtype: 'TabInventorySpecs'
        }
        // ,
        // {
        //     xtype: 'GridStockInventoryTab'
        // }
        // {
        //     xtype: 'FormBuy',
        //     id: 'idFormBuy'
        // },
        // {
        //     xtype: 'FormSell',
        //     id: 'idFormSell'
        // },
        // {            
        //     xtype: 'FormInventoried',
        //     id: 'idFormInventoried'
        // }
        //        ,
        //        {
        //            xtype:'TabItemInventoryHistory',
        //            id:'idTabItemInventoryHistory'
        //        }
    ]
});
Ext.define('WindowInventory', {
    extend: 'Ext.window.Window',
    title: 'Data Persediaan',
    id: 'WindowInventory',
    modal: true,
    alias: 'widget.WindowInventory',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    width: 898,
    // autoWidth:true,
    // minWidth: 650,
    height: 580,
    //    maximizable: true,
    border: false,
    autoScroll: true,
    bodyPadding: 5,
    // bodyStyle: 'padding-right: 0px',
    items: [{
        xtype: 'TabItemInventory'
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        fixed: true,
        items: ['->',
            {
                text: 'Tutup',
                handler: function() {
                    var win = Ext.getCmp('WindowInventory');
                    Ext.getCmp('formInventoryV2').getForm().reset();
                    win.hide();
                }
            }, {
                id: 'BtnInventoryV2Simpan',
                text: 'Simpan',
                handler: function() {
                    var form = Ext.getCmp('formInventoryV2').getForm();
                    var inputdaripurchase = form.findField('inputdaripurchase').getValue();


                    if (form.isValid()) {
                        form.submit({
                            params: Ext.getCmp('TabInventorySpecs').getForm().getFieldValues(true),
                            success: function(form, action) {
                                if (!action.result.success) {
                                    Ext.Msg.alert('Info', action.result.message);
                                } else {
                                    Ext.Msg.alert('Success', action.result.message);
                                    Ext.getCmp('formInventoryV2').getForm().reset();
                                    Ext.getCmp('WindowInventory').hide();
                                    // console.log(form)
                                    // alert(inputdaripurchase)
                                    if (inputdaripurchase == 'true') {
                                        storeGridItemPurchase.on('beforeload', function(store, operation, eOpts) {
                                            operation.params = {
                                                'extraparams': 'b.namesupplier:' + Ext.getCmp('supplierPurchase').getValue()
                                            };
                                        });
                                        storeGridItemPurchase.load();
                                    } else {
                                        storeGridInventoryAllBySku.load();
                                    }

                                }

                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                //                            storeGridInventoryV2.load();
                            }
                        });
                    } else {
                        Ext.Msg.alert("Error!", "Your form is invalid!");
                    }

                    //start form specs
                    // var form_specs = Ext.getCmp("TabInventorySpecs").getForm();
                    //   if (form_specs.isValid()) {
                    //     form_specs.submit({
                    //         params:{
                    //             idinventory: Ext.getCmp('idinventoryInv').getValue()
                    //         },
                    //         success: function(form, action) {


                    //         },
                    //         failure: function(form, action) {
                    //             Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                    //         }
                    //     });
                    // } else {
                    //     Ext.Msg.alert("Error!", "Your form is invalid!");
                    // }
                }
            }
        ]
    }]
});