
/////

var formInputQtyItemStockTransferGrid = Ext.create('Ext.form.Panel', {
    id: 'formInputQtyItemStockTransferGrid',
    // width: 740,
    autoWidth:true,
    autoHeight:true,
    bodyStyle: 'padding:5px',
    // height: 370,
    // url: SITE_URL + 'backend/saveform/InputQtyItemStockTransfer/master',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 130,
        width: 400
    },
    items: [
        {
            xtype:'hiddenfield',
            name:'idinventory',
            id:'idinventory_transfer_stock_form'
        },
        {
            xtype:'hiddenfield',
            name:'sku_no',
            id:'sku_no_transfer_stock'
        },
        {
            xtype:'hiddenfield',
            name:'invno',
            id:'invno_transfer_stock'
        },
        {
            xtype:'hiddenfield',
            name:'nameinventory',
            id:'nameinventory_transfer_stock'
        },
        {
            xtype:'hiddenfield',
            name:'warehouse_code',
            id:'warehouse_code_transfer_stock'
        },
        {
            xtype:'hiddenfield',
            name:'max_transfer_stock',
            id:'max_transfer_stock'
        },
        {
            xtype: 'numericfield',
            fieldLabel: 'Qty',
            minValue:1,
            allowBlank: false,
            name: 'qty_transfer_stock'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Notes',
            name: 'note'
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupInputQtyItemStockTransferGrid');
            Ext.getCmp('formInputQtyItemStockTransferGrid').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnInputQtyItemStockTransferGridSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                var max = form.findField("max_transfer_stock").getValue()*1;
                var qty_trans = form.findField("qty_transfer_stock").getValue()*1;

                if(qty_trans>max){
                    Ext.Msg.alert("Error!", "Qty transfer stok melebihi stok yang ada");
                } else {                    
                     console.log(form.findField("max_transfer_stock").getValue())
                     var recPO = new GridInventoryTransferPopUpModel({
                            idinventory:form.findField("idinventory").getValue(),
                            sku_no: form.findField("sku_no").getValue(),
                            invno: form.findField("invno").getValue(),
                            nameinventory: form.findField("nameinventory").getValue(),
                            warehouse_code: form.findField("warehouse_code").getValue(),
                            qty_transfer: form.findField("qty_transfer_stock").getValue(),
                            note: form.findField("note").getValue()
                        });

                        var gridPO = Ext.getCmp('GridInventoryTransferPopUp');
                        gridPO.getStore().insert(0, recPO);
                }


                Ext.getCmp('windowPopupInputQtyItemStockTransferGrid').hide();
                Ext.getCmp('wItemInventoryTransferPopup').hide();

                form.findField("note").setValue(null);
                form.findField("qty_transfer_stock").setValue(null);
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wInputQtyItemStockTransferGrid = Ext.create('widget.window', {
    id: 'windowPopupInputQtyItemStockTransferGrid',
    title: 'Input Qty Transfer',
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
    items: [formInputQtyItemStockTransferGrid]
});
//////////////////////

Ext.define('GridItemInventoryTransferPopupModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory','invno','sku_no','warehouse_code','nameinventory','cost','sellingprice','qtystock','idunit','assetaccount','totalstock','stock_kedua','satuan_pertama','satuan_kedua'],
    idProperty: 'id'
});

var storeGridItemInventoryTransferPopup = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemInventoryTransferPopupModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/inventory_bywhs/inventory/',
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

// storeGridItemInventoryTransferPopup.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     // 'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
//                   };
//               });
              
Ext.define('MY.searchGridItemInventoryTransferPopup', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridItemInventoryTransferPopup',
    store: storeGridItemInventoryTransferPopup,
    width: 180
});

var smGridItemInventoryTransferPopup = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemInventoryTransferPopup.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteItemInventoryTransferPopup').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteItemInventoryTransferPopup').enable();
        }
    }
});

Ext.define('GridItemInventoryTransferPopup', {
    itemId: 'GridItemInventoryTransferPopupID',
    id: 'GridItemInventoryTransferPopupID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridItemInventoryTransferPopup',
    store: storeGridItemInventoryTransferPopup,
    loadMask: true,
    columns: [
        {
            text: 'Pilih Barang',
            width: 105,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                console.log(selectedRecord);
                
                wInputQtyItemStockTransferGrid.show();

                // alert(selectedRecord.data.idinventory);

                Ext.getCmp('max_transfer_stock').setValue(selectedRecord.data.totalstock*1);
               
                Ext.getCmp('nameinventory_transfer_stock').setValue(selectedRecord.data.nameinventory);
                Ext.getCmp('sku_no_transfer_stock').setValue(selectedRecord.data.sku_no);
                Ext.getCmp('invno_transfer_stock').setValue(selectedRecord.data.invno);
                Ext.getCmp('warehouse_code_transfer_stock').setValue(selectedRecord.data.warehouse_code);
                Ext.getCmp('idinventory_transfer_stock_form').setValue(selectedRecord.data.idinventory);
//                  var recPO = new GridItemInventoryTransferOrderModel({
//                         idinventory: selectedRecord.get('idinventory'),
//                         invno: selectedRecord.get('invno'),
//                         nameinventory: selectedRecord.get('nameinventory'),
//                         short_desc: selectedRecord.get('satuan_pertama'),
//                         price: selectedRecord.get('sellingprice'),
//                         idunit:idunit,
//                         assetaccount:selectedRecord.get('assetaccount'),
//                         qty: 1,
//                         size: 1,
//                         disc: 0,
//                         total: selectedRecord.get('sellingprice'),
//                         ratetax: 0
// //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
//                     });

//                     var gridPO = Ext.getCmp('EntryInventoryTransferOrder');
//                     gridPO.getStore().insert(0, recPO);
                    // updateGridInventoryTransferOrder('general');
            
                   // Ext.getCmp('wItemInventoryTransferPopup').hide();
            }
        },
        {header: 'idinventory', dataIndex: 'idinventory', hidden: true},
        {header: 'idunit', dataIndex: 'idunit', hidden: true},
        {header: 'assetaccount', dataIndex: 'assetaccount', hidden: true},
        {header: 'No. SKU', dataIndex: 'sku_no', minWidth: 150},
        {header: 'Kode Barang', dataIndex: 'invno', minWidth: 150},        
        {header: 'Nama Barang', dataIndex: 'nameinventory', minWidth: 150, flex:1},
        {header: 'Gudang', dataIndex: 'warehouse_code', minWidth: 150},        
        {
            header: 'Stock',
            dataIndex: 'totalstock',
            minWidth: 120,
            align: 'right'
        },
        {
            header: 'Satuan',
            dataIndex: 'satuan_pertama',
            minWidth: 100
        },{
            header: 'Stock #2',
            dataIndex: 'stock_kedua',
            minWidth: 70,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Satuan #2',
            dataIndex: 'satuan_kedua',
            minWidth: 100
        },
        // {header: 'Beli', dataIndex: 'cost', minWidth: 130,xtype:'numbercolumn',align:'right'},
        // {header: 'Jual', dataIndex: 'sellingprice', minWidth: 130,xtype:'numbercolumn',align:'right'}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype:'comboxWarehouse',
                    displayField: 'warehouse_code',
                    valueField: 'warehouse_id',
                    name: 'warehouse_id',
                    fieldLabel:'Pilih Gudang',
                        listeners: {
                            'change': function(field, newValue, oldValue) {
                                console.log(newValue)
                                storeGridItemInventoryTransferPopup.on('beforeload',function(store, operation,eOpts){
                                    operation.params={
                                                  'extraparams': 'f.warehouse_id:'+newValue
                                                // 'warehouse_id': newValue
                                              };
                                          });
                                storeGridItemInventoryTransferPopup.load();
                            }
                        }
                },
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridItemInventoryTransferPopup',
                    text: 'Left Button'
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: storeGridItemInventoryTransferPopup, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridItemInventoryTransferPopup.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
//            var formItemInventoryTransferPopup = Ext.getCmp('formItemInventoryTransferPopup');
//            wItemInventoryTransferPopup.show();
//
//            formItemInventoryTransferPopup.getForm().load({
//                url: SITE_URL + 'backend/loadFormData/ItemInventoryTransferPopup/1/setup',
//                params: {
//                    extraparams: 'a.idtax:' + record.data.idtax
//                },
//                success: function(form, action) {
//                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
//                },
//                failure: function(form, action) {
//                    Ext.Msg.alert("Load failed", action.result.errorMessage);
//                }
//            })
//
////            
////            Ext.getCmp('kddaerahS').setReadOnly(true);
//            Ext.getCmp('statusformItemInventoryTransferPopup').setValue('edit');
        }
    }
});

Ext.define(dir_sys + 'inventory.wItemInventoryTransferPopup', {
    extend: 'Ext.window.Window',
    id: 'wItemInventoryTransferPopup',
    title: 'Pilih Barang',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 1270,
    modal:true,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridItemInventoryTransferPopup'
    }]
});