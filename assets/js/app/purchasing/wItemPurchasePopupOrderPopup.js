

Ext.define('GridItemPurchasePopupOrderModel', {
    extend: 'Ext.data.Model',
    fields: ['product_id','product_name','product_no','product_description','cost_price','buy_price','retail_price_member','retail_price','stock_available','stock_commited','stock_incoming','stock_max_online','status','available_on_pos','only_for_member','no_sku','no_barcode','no_supplier','is_purchasable','is_sellable','product_type_name','namesupplier','brand_name'],
  	idProperty: 'id'
});

var storeGridItemPurchasePopupOrder = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemPurchasePopupOrderModel',
    remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'inventory/products',
         actionMethods: {
                read: 'GET'
            },
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

storeGridItemPurchasePopupOrder.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
    	'idunit': idunit,
        'key': key,
        'password':password,
        'is_purchasable':'2'
    };
});

Ext.define('MY.searchGridItemPurchasePopupOrder', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridItemPurchasePopupOrder',
    store: storeGridItemPurchasePopupOrder,
    width: 180
});

var smGridItemPurchasePopupOrder = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemPurchasePopupOrder.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                // Ext.getCmp('btnDeleteItemSalesPopupOrder').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteItemSalesPopupOrder').enable();
        }
    }
});

Ext.define(dir_sys + 'purchasing.GridItemPurchasePopupOrder', {
    itemId: 'GridItemPurchasePopupOrderID',
    id: 'GridItemPurchasePopupOrderID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridItemPurchasePopupOrder',
    store: storeGridItemPurchasePopupOrder,
    loadMask: true,
    columns: [{
            text: 'Pilih',
            width: 55,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {

                  // retail_price: selectedRecord.get('retail_price'),
                    // retail_price_member: selectedRecord.get('retail_price_member'),
                var price = selectedRecord.get('buy_price');

                var recPO = new GridItemEntryPurchaseOrderModel({
                    product_id: selectedRecord.get('product_id'),
                    product_name: selectedRecord.get('product_name'),
                    price : price,
                    no_barcode: selectedRecord.get('no_barcode'),
                    idunit: idunit,
                    no_sku: selectedRecord.get('no_sku'),
                    qty: 1,
                    disc: 0,
                    total: selectedRecord.get('retail_price_member')*1,
                    rate: 0
                });
                console.log(recPO);
                var gridPO = Ext.getCmp('GridItemEntryPurchaseOrder');
                gridPO.getStore().insert(0, recPO);
                // updateGridSalesOrderv3();
                updateGridPurchaseOrderv3();

                Ext.getCmp('wItemPurchasePopupOrderPopup').hide();

            }
        },
       {
      header: 'product_id',
      dataIndex: 'product_id',
      hidden: true
    },
    {
      header: 'No SKU',
      dataIndex: 'no_sku',
      minWidth: 220
    },

    {
      header: 'Product Name',
      dataIndex: 'product_name',
      minWidth: 150,
      flex: 1
    },
    {
      header: 'Stok Tersedia',
      dataIndex: 'stock_available',
      minWidth: 150,
      xtype: 'numbercolumn',
      align: 'right'
    },
    {
      header: 'Harga Beli',
      dataIndex: 'buy_price',
      minWidth: 200,
      xtype: 'numbercolumn',
      align: 'right'
    },
    {
      header: 'Harga Non Anggota',
      dataIndex: 'retail_price',
      hidden:true,
      minWidth: 200,
      xtype: 'numbercolumn',
      align: 'right'
    },
    {
      header: 'Status',
      hidden:true,
      dataIndex: 'status',
      minWidth: 100,
            renderer: function(value) {
                return customColumnStatus(ArrProductStatus, value);
            }
    }
    ],
    dockedItems: [
        // {
        //     xtype: 'toolbar',
        //     dock: 'top',
        //     items: [{
        //             xtype: 'comboxinventorycat'
        //         },
        //         // {
        //         //     xtype:'comboxunit',
        //         //     valueField:'idunit',
        //         //     // id:'cbUnitInvAll',
        //         //     listeners: {
        //         //         'change': function(field, newValue, oldValue) {
        //         //             storeGridInventoryAll.load({
        //         //                 params: {
        //         //                   'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitInvAll').getValue()
        //         //                 }
        //         //             });
        //         //         }
        //         //     }
        //         // },
        //         {
        //             xtype: 'comboxbrand'
        //         }
        //     ]
        // },
        {
            xtype: 'toolbar',
            // hidden: true,
            dock: 'top',
            items: [
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridItemPurchasePopupOrder',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridItemPurchasePopupOrder, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        refresh : function (dataview) {
            // console.log(dataview);
            // Ext.each(dataview.panel.columns, function (column) {
            //  if (column.autoSizeColumn === true)
            //   column.autoSize();
            //   console.log(column);
            // });
        },
        render: {
            scope: this,
            fn: function(grid) {
                // var grd = Ext.getCmp('GridItemSalesPopupOrderID');
                // grd.getView().autoSizeColumn(grd.columns[0]);
                // grid.columns[0].autoSize();
                // grid.autoSizeColumn(grid.columns[1]);
                // grid.getView().autoSizeColumn(2);
                // console.log(grid);
                // Ext.each(grid.columns, function (column) {
                // //     // console.log(column);
                //     if (column.autoSizeColumn === true)
                //     //  column.autoSize();
                //     dataview.panel.columns[0].autoSize();
                //      console.log(column);
                //    });
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            //            var formItemSalesPopupOrder = Ext.getCmp('formItemSalesPopupOrder');
            //            wItemSalesPopupOrder.show();
            //
            //            formItemSalesPopupOrder.getForm().load({
            //                url: SITE_URL + 'backend/loadFormData/ItemSalesPopupOrder/1/setup',
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
            //            Ext.getCmp('statusformItemSalesPopupOrder').setValue('edit');
        }
    }
});

Ext.define(dir_sys + 'purchasing.wItemPurchasePopupOrderPopup',{
    extend: 'Ext.window.Window',
    alias: 'widget.wItemPurchasePopupOrderPopup',
// var wItemPurchasePopupOrderPopup = Ext.create('widget.window', {
    id: 'wItemPurchasePopupOrderPopup',
    title: 'Choose Item',
    // header: {
    //     titlePosition: 2,
    //     titleAlign: 'center'
    // },
    closable: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: panelW-100,
    modal: true,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridItemPurchasePopupOrder'
    }]
});

// updateGridPurchaseOrderv3()
// function updateGridPurchaseOrderv3() {

//     var angkutPurchaseOrder = str_replace(",", "", Ext.getCmp('freightPurchaseOrder').getValue()) * 1;
//     var isIncludeTax = Ext.getCmp('include_tax_po').getValue() * 1;

//     var storeGridItemPurchaseOrder = Ext.getCmp('GridItemEntryPurchaseOrder').getStore();
//     storeGridItemPurchaseOrder.clearFilter();
//     var json = Ext.encode(Ext.pluck(storeGridItemPurchaseOrder.data.items, 'data'));

//     Ext.each(storeGridItemPurchaseOrder.data.items, function(obj, i) {
//         var total = obj.data.qty * (obj.data.price);
//         var diskon = (total / 100) * obj.data.disc;
//         var tax = total*(obj.data.rate*1/100);

//         if(isIncludeTax){
//             //include tax
//              var total_per_row = (total - diskon);
//         } else {
//             var total_per_row = (total - diskon)+tax;
//         }

//        obj.set('total', total_per_row);
//     });

//     //calculate summary footer at backend
//     Ext.Ajax.request({
//         url: CLINIC_API + 'Purchase/summary_purchase_inv',
//         method: 'POST',
//         params: {
//             include_tax: isIncludeTax,
//             shipping_cost: angkutPurchaseOrder,
//             Purchase_item: json,
//             key: key
//         },
//         success: function(form, action) {
//             var d = Ext.decode(form.responseText);
//             Ext.getCmp('subtotalPurchaseOrder').setValue(number_format(d.sub_total)); 

//             Ext.getCmp('diskonPurchaseOrder').setValue(number_format(d.total_disc));

//             // var total = (subtotalPurchaseOrder-total_diskon)+angkutPurchaseOrder;
//             Ext.getCmp('totalPurchaseOrder_1').setValue(number_format(d.total)); //total


//             Ext.getCmp('totalPajakPurchaseOrder').setValue(number_format(Math.ceil(d.total_tax)));

//             Ext.getCmp('totalPurchaseOrder').setValue(number_format(d.grand_total));
//         },
//         failure: function(form, action) {
//             Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//         }
//     });

// }