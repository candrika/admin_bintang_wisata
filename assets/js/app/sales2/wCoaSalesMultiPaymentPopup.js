//acc list
Ext.define('GridCOAMultiPaymentSales ', {
    extend: 'Ext.data.Model',
    fields: ['idaccount','idunit','idaccounttype','accnumber','accname','balance','description','namaunit','acctypename'],
    idProperty: 'id'
});

var storeGridCOAMultiPaymentSales = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridCOAMultiPaymentSales ',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_account/gridaccount/account',
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
})

Ext.define('MY.searchGridCOAMultiPaymentSales', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridCOAMultiPaymentSales',
    store: storeGridCOAMultiPaymentSales,
    width: 180
});

Ext.define('GridCOAMultiPaymentSalesPopup', {
    itemId: 'GridCOAMultiPaymentSalesPopup',
    id: 'GridCOAMultiPaymentSalesPopup',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridCOAMultiPaymentSalesPopup',
    store: storeGridCOAMultiPaymentSales,
    loadMask: true,
    columns: [{
            text: 'Edit',
            width: 55,
            // menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: 'Pilih Akun Ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                setValueAcc(selectedRecord, 'wCoaSalesMultiPaymentPopup', '_coa_multipaymentsales');
            }
        },
        { header: 'idaccount', dataIndex: 'idaccount', hidden: true },
        { header: 'idunit', dataIndex: 'idunit', hidden: true },
        { header: 'No Akun', dataIndex: 'accnumber', },
        { header: 'Nama Akun', dataIndex: 'accname', minWidth: 150, flex: 1 },
        { header: 'Saldo', dataIndex: 'balance', minWidth: 150, xtype: 'numbercolumn', align: 'right', hidden: true },
        { header: 'Tipe Akun', dataIndex: 'acctypename', minWidth: 170 },
        // {header: 'Deskripsi', dataIndex: 'description', minWidth: 250},
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            '->',
            'Pencarian: ', ' ',
            {
                xtype: 'searchGridCOAMultiPaymentSales',
                text: 'Left Button'
            }

        ]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridCOAMultiPaymentSales, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
            // pageSize:20
    }]
});

Ext.define(dir_sys + 'sales2.wCoaSalesMultiPaymentPopup', {
    extend: 'Ext.window.Window',
    id: 'wCoaSalesMultiPaymentPopup',
    alias: 'widget.wCoaSalesMultiPaymentPopup',
    title: 'Pilih Akun',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: 660,
    height: panelHeight,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridCOAMultiPaymentSalesPopup'
    }]
});