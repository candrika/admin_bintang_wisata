Ext.define('GridPurchasemanPOPopupModel', {
    extend: 'Ext.data.Model',
    fields: ['idcustomer','nocustomer','namecustomer','address'],
    idProperty: 'id'
});

var storeGridPurchasemanPOPopup = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPurchasemanPOPopupModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/salesman/sales/',
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

// storeGridPurchasemanPOPopup.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     // 'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
//                   };
//               });
              
Ext.define('MY.searchGridPurchasemanPOPopup', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPurchasemanPOPopup',
    store: storeGridPurchasemanPOPopup,
    width: 180
});

var smGridPurchasemanPOPopup = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPurchasemanPOPopup.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletePurchasemanPOPopup').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletePurchasemanPOPopup').enable();
        }
    }
});

Ext.define(dir_sys + 'purchasing.GridPurchasemanPOPopup', {
    itemId: 'GridPurchasemanPOPopupID',
    id: 'GridPurchasemanPOPopupID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPurchasemanPOPopup',
    store: storeGridPurchasemanPOPopup,
    loadMask: true,
    columns: [
        {
            text: 'Pilih',
            width: 55,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                
                Ext.getCmp('salesman_id_so').setValue(selectedRecord.get('idcustomer'));
                Ext.getCmp('salesman_name_so').setValue(selectedRecord.get('namecustomer'));
                Ext.getCmp('wPurchasemanPOPopupPopup').hide();
                
            }
        },
        {header: 'idcustomer', dataIndex: 'idemployee',hidden:true},
        // {header: 'user_id', dataIndex: 'user_id',hidden:true},
        {header: 'Personil Code', dataIndex: 'nocustomer',minWidth:130},
        {header: 'Name', dataIndex: 'namecustomer',minWidth:250,flex:1}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridPurchasemanPOPopup',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridPurchasemanPOPopup, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridPurchasemanPOPopup.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {
        }
    }
});

// Ext.define(dir_sys + 'sales.GridPurchasemanPOPopup', {
//      extend: 'widget.window',
// });
var wPurchasemanPOPopupPopup = Ext.create('widget.window', {
    id: 'wPurchasemanPOPopupPopup',
    title: 'Sales Person List',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 870,
    modal:true,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridPurchasemanPOPopup'
    }]
});