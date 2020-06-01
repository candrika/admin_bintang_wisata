Ext.define('GridCustomerSalesPopupOrderModel', {
    extend: 'Ext.data.Model',
    fields: ['idcustomer', 'idcustomertype', 'nocustomer', 'namecustomer', 'address', 'shipaddress', 'billaddress', 'telephone', 'handphone', 'fax', 'email', 'website', 'city', 'state', 'postcode', 'country', 'highestpayment', 'avgdaypayment', 'lastpayment', 'lastsales', 'incomeaccount', 'notes', 'display', 'userin', 'usermod', 'datein', 'datemod', 'status', 'deleted', 'idunit', 'namecustype'],
    //fields: ['idinventory', 'invno', 'sku_no', 'nameinventory', 'cost', 'sellingprice', 'qtystock', 'idunit', 'assetaccount', 'totalstock', 'stock_kedua', 'satuan_pertama', 'satuan_kedua'],
    idProperty: 'id'
});
var storeGridCustomerSalesPopupOrder = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridCustomerSalesPopupOrderModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/customer/master',
        actionMethods: 'POST',
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
storeGridCustomerSalesPopupOrder.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        extraparams: 'a.deleted: 0, a.idunit:' + idunit
    };
});
Ext.define('MY.searchGridCustomerSalesPopupOrder', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridCustomerSalesPopupOrder',
    store: storeGridCustomerSalesPopupOrder,
    width: 180
});
var smGridCustomerSalesPopupOrder = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridCustomerSalesPopupOrder.getSelection().length;
            if(selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteCustomerSalesPopupOrder').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteCustomerSalesPopupOrder').enable();
        }
    }
});
Ext.define(dir_sys + 'sales2.GridCustomerSalesPopupOrder', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridCustomerSalesPopupOrder,
    //    title: 'Daftar Barang',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridCustomerSalesPopupOrderID',
    id: 'GridCustomerSalesPopupOrderID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridCustomerSalesPopupOrder',
    store: storeGridCustomerSalesPopupOrder,
    loadMask: true,
    columns: [{
            text: 'Pilih',
            width: 55,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                Ext.getCmp('customerSalesOrder').setValue(selectedRecord.data.idcustomer);
                Ext.getCmp('namecustomerSalesOrder').setValue(selectedRecord.data.namecustomer);
                Ext.getCmp('wCustomerSalesPopupOrderPopup').hide();
            }
        },  { header: 'idcustomer', dataIndex: 'idcustomer', hidden: true },
        // { header: 'No', xtype: 'rownumberer', sortable: false, width: 30 },
        { header: 'Kode', dataIndex: 'nocustomer', minWidth: 100 },
        { header: 'Nama', dataIndex: 'namecustomer', minWidth: 200,flex:1 },
        // { header: 'Address', dataIndex: 'address', minWidth: 120 },
        { header: 'Jenis Kontak', dataIndex: 'namecustype', minWidth: 150 }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            // hidden: true,
            dock: 'top',
            items: [
                '->', 'Pencarian: ', ' ', {
                xtype: 'searchGridCustomerSalesPopupOrder',
                text: 'Left Button'
            }]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridCustomerSalesPopupOrder, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        refresh: function(dataview) {
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
Ext.define(dir_sys + 'sales2.wCustomerSalesPopupOrderPopup', {
    extend: 'Ext.window.Window',
    alias: 'widget.wCustomerSalesPopupOrderPopup',
    // var wCustomerSalesPopupOrderPopup = Ext.create('widget.window', {
    id: 'wCustomerSalesPopupOrderPopup',
    title: 'Choose Customer',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: panelW-400,
    modal: true,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridCustomerSalesPopupOrder'
    }]
});