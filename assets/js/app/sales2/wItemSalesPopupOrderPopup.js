

Ext.define('GridItemSalesPopupOrderModel', {
    extend: 'Ext.data.Model',
    fields: ['product_id','product_name','product_no','product_description','cost_price','buy_price','retail_price_member','retail_price','stock_available','stock_commited','stock_incoming','stock_max_online','status','available_on_pos','only_for_member','no_sku','no_barcode','no_supplier','is_purchasable','is_sellable','product_type_name','namesupplier','brand_name'],
  	idProperty: 'id'
});

var storeGridItemSalesPopupOrder = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemSalesPopupOrderModel',
    //remoteSort: true,
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

storeGridItemSalesPopupOrder.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
    	'idunit': idunit,
        'key': key,
        'password':password,
        'is_sellable':'2'
    };
});

Ext.define('MY.searchGridItemSalesPopupOrder', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridItemSalesPopupOrder',
    store: storeGridItemSalesPopupOrder,
    width: 180
});

var smGridItemSalesPopupOrder = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemSalesPopupOrder.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteItemSalesPopupOrder').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteItemSalesPopupOrder').enable();
        }
    }
});

Ext.define(dir_sys + 'sales2.GridItemSalesPopupOrder', {
    itemId: 'GridItemSalesPopupOrderID',
    id: 'GridItemSalesPopupOrderID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridItemSalesPopupOrder',
    store: storeGridItemSalesPopupOrder,
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
                var price = selectedRecord.get('retail_price');

                var recPO = new GridItemSalesOrderModel({
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
                var gridPO = Ext.getCmp('GridItemEntrySalesOrder');
                gridPO.getStore().insert(0, recPO);
                updateGridSalesOrderv3();

                Ext.getCmp('wItemSalesPopupOrderPopup').hide();

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
      header: 'Harga Anggota',
      dataIndex: 'retail_price_member',
      minWidth: 200,
      xtype: 'numbercolumn',
      align: 'right'
    },
    {
      header: 'Harga Non Anggota',
      dataIndex: 'retail_price',
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
                    xtype: 'searchGridItemSalesPopupOrder',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridItemSalesPopupOrder, // same store GridPanel is using
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

Ext.define(dir_sys + 'sales2.wItemSalesPopupOrderPopup',{
    extend: 'Ext.window.Window',
    alias: 'widget.wItemSalesPopupOrderPopup',
// var wItemSalesPopupOrderPopup = Ext.create('widget.window', {
    id: 'wItemSalesPopupOrderPopup',
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
        xtype: 'GridItemSalesPopupOrder'
    }]
});