//acc list
Ext.define('COAMultiPaymentPurchasePopupModel', {
    extend: 'Ext.data.Model',
    fields: ['idaccount','idunit','idaccounttype','accnumber','accname','balance','description','namaunit','acctypename'],
    idProperty: 'id'
});

var storeCOAMultiPaymentPurchasePopup = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'COAMultiPaymentPurchasePopupModel',
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

Ext.define('MY.searchCOAMultiPaymentPurchasePopup', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchCOAMultiPaymentPurchasePopup',
    store: storeCOAMultiPaymentPurchasePopup,
    width: 180
})

Ext.define('GridCOAMultiPaymentPurchasePopup', {
    itemId: 'GridCOAMultiPaymentPurchasePopup',
    id: 'GridCOAMultiPaymentPurchasePopup',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridCOAMultiPaymentPurchasePopup',
    store: storeCOAMultiPaymentPurchasePopup,
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
                setValueAcc(selectedRecord, 'wCoaPurchaseMultiPaymentPopup', '_coa_multipaymentpurchase');
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
                xtype: 'searchCOAMultiPaymentPurchasePopup',
                text: 'Left Button'
            }

        ]
    }, {
        xtype: 'pagingtoolbar',
        store: storeCOAMultiPaymentPurchasePopup, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
            // pageSize:20
    }]
});

Ext.define(dir_sys + 'purchasing.wCoaPurchaseMultiPaymentPopup', {
    extend: 'Ext.window.Window',
    id: 'wCoaPurchaseMultiPaymentPopup',
    alias: 'widget.wCoaPurchaseMultiPaymentPopup',
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
        xtype: 'GridCOAMultiPaymentPurchasePopup'
    }]
});