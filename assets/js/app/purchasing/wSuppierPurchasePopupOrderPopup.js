Ext.define('GridSuppierPurchasePopupOrderModel', {
    extend: 'Ext.data.Model',
    fields: ['idsupplier', 'idpayment', 'idshipping', 'code', 'namesupplier', 'companyaddress', 'companyaddress2', 'companyaddress3', 'companyaddress4', 'shipaddress', 'billaddress', 'telephone', 'handphone', 'fax', 'email', 'website', 'city', 'state', 'postcode', 'country', 'highestpo', 'avgdaypay', 'lastpayment', 'lastpurchase', 'expenseaccount', 'notes', 'userin', 'usermod', 'datein', 'datemod', 'idunit', 'supplier_type_id', 'status', 'deleted', 'typename'],
    //fields: ['idinventory', 'invno', 'sku_no', 'nameinventory', 'cost', 'sellingprice', 'qtystock', 'idunit', 'assetaccount', 'totalstock', 'stock_kedua', 'satuan_pertama', 'satuan_kedua'],
    idProperty: 'id'
});
var storeGridSuppierPurchasePopupOrder = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSuppierPurchasePopupOrderModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'get/datas?model=supplier',
        actionMethods:{
            read:'GET'
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
storeGridSuppierPurchasePopupOrder.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        extraparams: 'a.deleted: 0, a.idunit:' + idunit,
        key:key
    };
});
Ext.define('MY.searchGridSuppierPurchasePopupOrder', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSuppierPurchasePopupOrder',
    store: storeGridSuppierPurchasePopupOrder,
    width: 180
});
var smGridSuppierPurchasePopupOrder = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridSuppierPurchasePopupOrder.getSelection().length;
            if(selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteSuppierPurchasePopupOrder').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteSuppierPurchasePopupOrder').enable();
        }
    }
});
Ext.define(dir_sys + 'purchasing.GridSuppierPurchasePopupOrder', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridSuppierPurchasePopupOrder,
    //    title: 'Daftar Barang',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridSuppierPurchasePopupOrderID',
    id: 'GridSuppierPurchasePopupOrderID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSuppierPurchasePopupOrder',
    store: storeGridSuppierPurchasePopupOrder,
    loadMask: true,
    columns: [{
            text: 'Pilih',
            width: 55,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                var form = Ext.getCmp('EntryPurchaseOrder').getForm();
                form.findField("no_purchase_quote").setValue(selectedRecord.get('namesupplier')+ ' #' +selectedRecord.get('code'));
                form.findField("idcustomer").setValue(selectedRecord.get('idsupplier'));
                form.findField("customer_type").setValue(selectedRecord.get('supplier_type_id'));
               
                Ext.getCmp('wSuppierPurchasePopupOrderPopup').hide();
            }
        },
        { header: 'idsupplier', dataIndex: 'idsupplier', hidden: true },
        { header: 'Kode', dataIndex: 'code', minWidth: 100 },
        { header: 'Nama', dataIndex: 'namesupplier', minWidth: 200,flex:1 },
        { header: 'Jenis Kontak', dataIndex: 'supplier_type_id', minWidth: 150 }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            // hidden: true,
            dock: 'top',
            items: [
                '->', 'Pencarian: ', ' ', {
                xtype: 'searchGridSuppierPurchasePopupOrder',
                text: 'Left Button'
            }]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridSuppierPurchasePopupOrder, // same store GridPanel is using
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
Ext.define(dir_sys + 'purchasing.wSuppierPurchasePopupOrderPopup', {
    extend: 'Ext.window.Window',
    alias: 'widget.wSuppierPurchasePopupOrderPopup',
    // var wSuppierPurchasePopupOrderPopup = Ext.create('widget.window', {
    id: 'wSuppierPurchasePopupOrderPopup',
    title: 'Pilih Pemasok',
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
        xtype: 'GridSuppierPurchasePopupOrder'
    }]
});