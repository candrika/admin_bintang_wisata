Ext.define('GridItemSalesReturnModel', {
  extend: 'Ext.data.Model',
  fields: ['sales_return_item_id','idsalesitem', 'product_id','desc', 'product_name', 'price', 'no_barcode','qty', 'idunit', 'no_sku', 'qty_sale', 'disc', 'total', 'rate','qty_retur','total_return','notes'],
  idProperty: 'id'
});

Ext.define('GridSalesItemReturnListModel', {
    extend: 'Ext.data.Model',
    fields: ['idsalesitem', 'product_id','desc', 'product_name', 'price', 'no_barcode', 'idunit', 'no_sku', 'qty', 'disc', 'total', 'rate'],
    idProperty: 'id'
});

var storeGridSalesItemReturnList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSalesItemReturnListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'sales/item_datas',
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

storeGridSalesItemReturnList.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'option': 'unpaid',
        'key':key,
        'password':password,
        'idunit':idunit
    };
});

Ext.define('MY.searchGridSalesItemReturnList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSalesItemReturnList',
    store: storeGridSalesItemReturnList,
    width: 180
});
// var smGridSalesItemReturnList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridSalesItemReturnList.getSelection().length;
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

Ext.define('GridSalesItemReturnList', {
    itemId: 'GridSalesItemReturnList',
    id: 'GridSalesItemReturnList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSalesItemReturnList',
    store: storeGridSalesItemReturnList,
    loadMask: true,
    columns: [{
        text: 'Pilih',
        width: 55,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {

            var grid = Ext.getCmp('GridItemEntrySalesReturn');
            var rec = new GridItemSalesReturnModel({
                    sales_return_item_id: null,
                    idsalesitem: selectedRecord.get('idsalesitem')*1,
                    product_id: selectedRecord.get('product_id')*1,
                    no_sku: selectedRecord.get('no_sku'),
                    product_name: selectedRecord.get('product_name'),
                    price: selectedRecord.get('price')*1,
                    desc: selectedRecord.get('description'),
                    total: selectedRecord.get('total')*1,
                    qty_sale: selectedRecord.get('qty')*1,
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

            Ext.getCmp('WindowSalesItem4ReturnList').hide();           
        }
    },

        {
            header: 'idsalesitem',
            hidden: true,
            dataIndex: 'idsalesitem',
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
                    xtype: 'searchGridSalesItemReturnList',
                    text: 'Left Button',
                    placeHolder: 'Customer Name...'
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: storeGridSalesItemReturnList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // storeGridSalesItemReturnList.load();
            }
        }
    }
});


Ext.define(dir_sys + 'sales2.WindowSalesItem4ReturnList', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowSalesItem4ReturnList',
    id: 'WindowSalesItem4ReturnList',
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
        xtype: 'GridSalesItemReturnList'
    }],
    listeners: {
        show: function() {
            // this.el.setStyle('top', '');
        }
    }
});