Ext.define('GridItemPurchaseReceiveModel', {
  extend: 'Ext.data.Model',
  fields: ['Purchase_Receive_item_id','idPurchaseitem', 'product_id','desc', 'product_name', 'price', 'no_barcode','qty', 'idunit', 'no_sku', 'qty_sale', 'disc', 'total', 'rate','qty_retur','total_Receive','notes'],
  idProperty: 'id'
});

Ext.define('GridPurchaseItemReceiveListModel', {
    extend: 'Ext.data.Model',
    fields: ['idPurchaseitem', 'product_id','desc', 'product_name', 'price', 'no_barcode', 'idunit', 'no_sku', 'qty', 'disc', 'total', 'rate'],
    idProperty: 'id'
});

var storeGridPurchaseItemReceiveList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPurchaseItemReceiveListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'Purchase/item_datas',
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


Ext.define('MY.searchGridPurchaseItemReceiveList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPurchaseItemReceiveList',
    store: storeGridPurchaseItemReceiveList,
    width: 180
});
// var smGridPurchaseItemReceiveList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridPurchaseItemReceiveList.getSelection().length;
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

Ext.define('GridPurchaseItemReceiveList', {
    itemId: 'GridPurchaseItemReceiveList',
    id: 'GridPurchaseItemReceiveList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPurchaseItemReceiveList',
    store: storeGridPurchaseItemReceiveList,
    loadMask: true,
    columns: [{
        text: 'Pilih',
        width: 55,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {

            var grid = Ext.getCmp('GridItemEntryPurchaseReceive');
            var rec = new GridItemPurchaseReceiveModel({
                    Purchase_Receive_item_id: null,
                    idPurchaseitem: selectedRecord.get('idPurchaseitem')*1,
                    product_id: selectedRecord.get('product_id')*1,
                    no_sku: selectedRecord.get('no_sku'),
                    product_name: selectedRecord.get('product_name'),
                    price: selectedRecord.get('price')*1,
                    desc: selectedRecord.get('description'),
                    total: selectedRecord.get('total')*1,
                    qty_sale: selectedRecord.get('qty')*1,
                    qty_retur: 0,
                    total_Receive:0
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

            Ext.getCmp('WindowPurchaseItem4ReceiveList').hide();           
        }
    },

        {
            header: 'idPurchaseitem',
            hidden: true,
            dataIndex: 'idPurchaseitem',
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
                    xtype: 'searchGridPurchaseItemReceiveList',
                    text: 'Left Button',
                    placeHolder: 'Customer Name...'
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: storeGridPurchaseItemReceiveList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // storeGridPurchaseItemReceiveList.load();
            }
        }
    }
});


Ext.define(dir_sys + 'purchasing.WindowPurchaseItem4ReceiveList', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowPurchaseItem4ReceiveList',
    id: 'WindowPurchaseItem4ReceiveList',
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
        xtype: 'GridPurchaseItemReceiveList'
    }],
    listeners: {
        show: function() {
            // this.el.setStyle('top', '');
        }
    }
});