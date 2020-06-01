Ext.define('GridSalesmanSOPopupModel', {
    extend: 'Ext.data.Model',
    fields: ['idcustomer','nocustomer','namecustomer','address'],
    idProperty: 'id'
});

var storeGridSalesmanSOPopup = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSalesmanSOPopupModel',
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

// storeGridSalesmanSOPopup.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     // 'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
//                   };
//               });
              
Ext.define('MY.searchGridSalesmanSOPopup', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSalesmanSOPopup',
    store: storeGridSalesmanSOPopup,
    width: 180
});

var smGridSalesmanSOPopup = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridSalesmanSOPopup.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteSalesmanSOPopup').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteSalesmanSOPopup').enable();
        }
    }
});

Ext.define(dir_sys + 'sales2.GridSalesmanSOPopup', {
    itemId: 'GridSalesmanSOPopupID',
    id: 'GridSalesmanSOPopupID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSalesmanSOPopup',
    store: storeGridSalesmanSOPopup,
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
                Ext.getCmp('wSalesmanSOPopupPopup').hide();
                
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
                    xtype: 'searchGridSalesmanSOPopup',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridSalesmanSOPopup, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridSalesmanSOPopup.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {
        }
    }
});

// Ext.define(dir_sys + 'sales.GridSalesmanSOPopup', {
//      extend: 'widget.window',
// });
var wSalesmanSOPopupPopup = Ext.create('widget.window', {
    id: 'wSalesmanSOPopupPopup',
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
            xtype:'GridSalesmanSOPopup'
    }]
});