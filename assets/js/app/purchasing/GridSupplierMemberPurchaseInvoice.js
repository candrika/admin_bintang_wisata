Ext.define('GridSupplierMemberPurchaseInvoiceModel', {
    extend: 'Ext.data.Model',
    fields: ['idcustomer', 'idcustomertype', 'nocustomer', 'namecustomer', 'address', 'shipaddress', 'billaddress', 'telephone', 'handphone', 'fax', 'email', 'website', 'city', 'state', 'postcode', 'country', 'highestpayment', 'avgdaypayment', 'lastpayment', 'lastsales', 'incomeaccount', 'notes', 'display', 'userin', 'usermod', 'datein', 'datemod', 'status', 'deleted', 'idunit', 'namecustype'],
    idProperty: 'id'
});

var storeGridSupplierMemberPurchaseInvoice = Ext.create('Ext.data.Store', {
    pageSize: 100,
    // pageSize: 100,
    model: 'GridSupplierMemberPurchaseInvoiceModel',
    proxy: {
        type: 'ajax',
        url: COOP_API + 'contact/contacts?key='+coop_key,
        actionMethods:{read:'GET'},
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

// storeGridBuyerMemberSalesInvoice.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     // 'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
//                   };
//               });
              
Ext.define('MY.searchGridSupplierMemberPurchaseInvoice', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSupplierMemberPurchaseInvoice',
    store: storeGridSupplierMemberPurchaseInvoice,
    width: 180
});

var smGridSupplierMemberPurchaseInvoice = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridSupplierMemberPurchaseInvoice.getSelection().length;
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

Ext.define(dir_sys + 'purchasing.GridSupplierMemberPurchaseInvoice', {
    itemId: 'GridSupplierMemberPurchaseInvoice',
    id: 'GridSupplierMemberPurchaseInvoice',
    extend: 'Ext.grid.Panel',
    title: 'Pemasok',
    alias: 'widget.GridSupplierMemberPurchaseInvoice',
    store: storeGridSupplierMemberPurchaseInvoice,
    loadMask: true,
    columns: [
        {
            text: 'Pilih',
            width: 65,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                var form = Ext.getCmp('EntryPurchaseOrder').getForm();
                form.findField("no_purchase_quote").setValue(selectedRecord.get('namecustomer')+ ' #' +selectedRecord.get('nocustomer'));
                form.findField("idcustomer").setValue(selectedRecord.get('idcustomer'));
                form.findField("customer_type").setValue(selectedRecord.get('namecustype'));
                Ext.getCmp('windowSupplierPurchaseInvoice').hide();
                
            }
        },
        {header: 'idcustomer', dataIndex:'idcustomer', hidden:true},
        {header: 'No', xtype:'rownumberer', sortable:false, width: 50},
        {header: 'No Customer', minWidth: 150, dataIndex: 'nocustomer' },
        {header: 'Name', minWidth: 250, dataIndex: 'namecustomer' },
        {header: 'Type', minWidth: 100, dataIndex: 'namecustype' },
        {header: 'Address', minWidth: 200, dataIndex: 'address' },
        {header: 'Shipping Address', minWidth: 200, dataIndex: 'shipaddress' },
        {header: 'Bill Address', minWidth: 200, dataIndex: 'billaddress' },
        {header: 'No. Telp.', minWidth: 200, dataIndex: 'telephone' },
        {header: 'No. HP', minWidth: 100, dataIndex: 'handphone' },
        {header: 'Fax', minWidth: 100, dataIndex: 'fax' },
        {header: 'Email', minWidth: 100, dataIndex: 'email' },
        {header: 'Website', minWidth: 100, dataIndex: 'website' },
        {header: 'City', minWidth: 150, dataIndex: 'city' },
        {header: 'State', minWidth: 150, dataIndex: 'state' },
        {header: 'Post Code', minWidth: 150, dataIndex: 'postcode' },
        {header: 'Country', minWidth: 150, dataIndex: 'country' },
        {header: 'Notes', minWidth: 250, dataIndex: 'notes', flex:1 },
        {header: 'Status', dataIndex:'status', minWidth: 100, renderer: function(value){
            return togglearr.map(function(val){return val[1]})[value];
        }},
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                // '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridSupplierMemberPurchaseInvoice',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridSupplierMemberPurchaseInvoice, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridBuyerMemberSalesInvoice.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {
        }
    }
});