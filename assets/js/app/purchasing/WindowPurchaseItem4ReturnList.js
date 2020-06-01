Ext.define('GridItemPurchaseReturnModel', {
  extend: 'Ext.data.Model',
  fields: ['Purchase_return_item_id','purchase_item_id', 'product_id','desc', 'product_name', 'price', 'no_barcode','qty', 'idunit', 'no_sku', 'qty_purchase', 'disc', 'total', 'rate','qty_retur','total_return','notes'],
  idProperty: 'id'
});

Ext.define('GridPurchaseItemReturnListModel', {
    extend: 'Ext.data.Model',
    fields: ['purchase_item_id','purchase_id','product_id','desc', 'product_name', 'price', 'no_barcode', 'idunit', 'no_sku', 'qty', 'disc', 'total', 'rate'],
    idProperty: 'id'
});

var storeGridPurchaseItemReturnList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPurchaseItemReturnListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API  + 'Purchase/purchase_item',
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
        property: 'code',
        direction: 'ASC'
    }]
});

storeGridPurchaseItemReturnList.on('beforeload', function(store, operation) {
    operation.params = {
        'key':key,
        'password':password,
        'idunit':idunit,
        // 'startdate': Ext.getCmp('startdate_grdporeturn').getValue(),
        // 'enddate': Ext.getCmp('enddate_grdporeturn').getValue(),
    }
})

Ext.define('MY.searchGridPurchaseItemReturnList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPurchaseItemReturnList',
    store: storeGridPurchaseItemReturnList,
    width: 180
});
// var smGridPurchaseItemReturnList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridPurchaseItemReturnList.getSelection().length;
//             if (selectedLen == 0) {
//                 console.log(selectedLen);
//                 Ext.getCmp('btnDeleteMasterSupplierData').disable();
//             }
//         },
//         select: function(model, record, index) {
//             Ext.getCmp('btnDeleteMasterSupplierData').enable();
//         }
//     }
// });

Ext.define('GridPurchaseItemReturnList', {
    itemId: 'GridPurchaseItemReturnList',
    id: 'GridPurchaseItemReturnList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPurchaseItemReturnList',
    store: storeGridPurchaseItemReturnList,
    loadMask: true,
    columns: [{
        text: 'Pilih',
        width: 55,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {

            var grid = Ext.getCmp('GridItemEntryPurchaseReturn');
            var rec = new GridItemPurchaseReturnModel({
                    Purchase_return_item_id: null,
                    purchase_item_id: selectedRecord.get('purchase_item_id')*1,
                    product_id: selectedRecord.get('product_id')*1,
                    no_sku: selectedRecord.get('no_sku'),
                    product_name: selectedRecord.get('product_name'),
                    price: selectedRecord.get('price')*1,
                    desc: selectedRecord.get('description'),
                    total: selectedRecord.get('total')*1,
                    qty_purchase: selectedRecord.get('qty')*1,
                    qty_retur: 0,
                    total_return:0
            });

            //calculate row number
            var store = grid.getStore();
            var arr = Ext.pluck(store.data.items, 'data');
            var total = 0;
            Ext.each(arr, function(item) {
                total++;
            });

            //insert to grid
            grid.getStore().insert((total), rec);

            Ext.getCmp('WindowPurchaseItem4ReturnList').hide();           
        }
    },

        {
            header: 'purchase_item_id',
            hidden: true,
            dataIndex: 'purchase_item_id',
            //                    id: 'idinventory'
        },{
            header: 'purchase_id',
            hidden: true,
            dataIndex: 'purchase_id',
            //                    id: 'idinventory'
        },{
            header: 'product_id',
            hidden: true,
            dataIndex: 'product_id',
            //                    id: 'idinventory'
        },
        {
            header: 'idunit',
            hidden: true,
            dataIndex: 'idunit'
        },
        {
            header: 'No Barang',
            dataIndex: 'no_sku',
            width: 200
        },
        {
            header: 'Barang',
            flex:1,
            dataIndex: 'product_name',
            width: 250,
            //                    id: 'nameinventory'
        },
        {
            header: 'Deskripsi',
            dataIndex: 'desc',
            width: 300,
            align: 'right'
        },
        {
            header: 'Qty',
            dataIndex: 'qty',
            width: 80,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Total',
            dataIndex: 'total',
            width: 150,
            xtype: 'numbercolumn',
            align: 'right'
        }
    ],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                // '->',
                'Searching: ', ' ',
                {
                    xtype: 'searchGridPurchaseItemReturnList',
                    text: 'Left Button',
                    placeHolder: 'Customer Name...'
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: storeGridPurchaseItemReturnList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // storeGridPurchaseItemReturnList.load();
            }
        }
    }
});


Ext.define(dir_sys + 'purchasing.WindowPurchaseItem4ReturnList', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowPurchaseItem4ReturnList',
    id: 'WindowPurchaseItem4ReturnList',
    title: 'Pilih Barang',
    // header: {
    //     titlePosition: 2,
    //     titleAlign: 'center'
    // },
    closable: true,
    autoDestroy: false,
    modal: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: panelW-300,
    height: sizeH - 100,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridPurchaseItemReturnList'
    }],
    listeners: {
        show: function() {
            // this.el.setStyle('top', '');
        }
    }
});