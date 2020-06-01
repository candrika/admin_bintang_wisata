Ext.define('ItemProductPopupGridModel', {
    extend: 'Ext.data.Model',
    fields: ['product_id','product_name','product_no','product_description','cost_price','buy_price','retail_price_member','retail_price','stock_available','stock_commited','stock_incoming','stock_max_online','status','available_on_pos','only_for_member','no_sku','no_barcode','no_supplier','is_purchasable','is_sellable','product_type_name','namesupplier','brand_name'],
  	idProperty: 'id'
});

var storeItemProductPopupGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'ItemProductPopupGridModel',
    proxy: {
        type: 'ajax',
        url: CLINIC_API  + 'inventory/products',
        actionMethods: {
            read: 'GET'
        },
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
    },
    sorters: [{
        property: 'menu_name',
        direction: 'DESC'
    }]
});

storeItemProductPopupGrid.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
    	// 'idunit': idunit,
        'key': key,
        'inventory_class_id':null,
        bussiness_id:Ext.getCmp('business_id_origin').getValue()
    };
});

Ext.define('MY.searchItemProductPopupGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchItemProductPopupGrid',
    store: storeItemProductPopupGrid,
    width: 180
});

var smwItemProductPopupGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smwItemProductPopupGrid.getSelection().length;
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

Ext.define('ItemProductPopupGridGrid', {
    itemId: 'ItemProductPopupGrid',
    id: 'ItemProductPopupGrid',
    extend: 'Ext.grid.Panel',
    alias: 'widget.ItemProductPopupGrid',
    store: storeItemProductPopupGrid,
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

                var rec = new GridTransferStockDetailModel({
                    product_id: selectedRecord.get('product_id'),
                    product_name: selectedRecord.get('product_name'),
                    price : price,
                    no_barcode: selectedRecord.get('no_barcode'),
                    idunit: idunit,
                    no_sku: selectedRecord.get('no_sku'),
                    current_qty: selectedRecord.get('stock_available'),
                    disc: 0,
                    total: selectedRecord.get('retail_price_member')*1,
                    rate: 0
                });
                // console.log(rec);
                var grid = Ext.getCmp('GridTransferStockDetailID');
                grid.getStore().insert(0, rec);
                // updateGridSalesOrderv3();

                Ext.getCmp('wItemProductPopup').hide();

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
        {
            xtype: 'toolbar',
            // hidden: true,
            dock: 'top',
            items: [
                'Pencarian: ', ' ',
                {
                    xtype: 'searchItemProductPopupGrid',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeItemProductPopupGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        refresh : function (dataview) {
        
        },
        render: {
            scope: this,
            fn: function(grid) {

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

        }
    }
});

Ext.define(dir_sys + 'inventory.wItemProductPopup',{
    extend: 'Ext.window.Window',
    alias: 'widget.wItemProductPopup',
    id: 'wItemProductPopup',
    title: 'Choose Item',
    closable: true,
    closeAction: 'hide',
    width: panelW-100,
    modal: true,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'ItemProductPopupGrid'
    }]
});