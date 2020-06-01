Ext.define('GridMultiReceiveCashModel', {
    extend: 'Ext.data.Model',
       fields: ['idreceivemoney','idjournal','notrans','datetrans','total','memo','userin','datein','idunit','subtotal','accname','namaunit','status','balance'],
    idProperty: 'id'
});

var StoreGridMultiReceiveCash = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridMultiReceiveCashModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ReceiveMoney/money',
        actionMethods: 'POST',
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


// StoreGridMultiReceiveCash.on('beforeload', function(store, operation, eOpts) {
//     operation.params = {
//         'extraparams': 'a.invoice_status:' + null,
//         'option': 'po_not_in_open_return_status'
//     };
// });

Ext.define('MY.searchGridSalesOrderListMultiSI', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSalesOrderListMultiSI',
    store: StoreGridMultiReceiveCash,
    width: 180
});

Ext.define('GridMultiReceiveCash', {
    itemId: 'GridMultiReceiveCash',
    id: 'GridMultiReceiveCash',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridMultiReceiveCash',
    store: StoreGridMultiReceiveCash,
    loadMask: true,
    columns: [
    {
            text: 'Pilih',
            width: 55,
            // menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: 'Pilih Akun Ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                console.log(selectedRecord);
                if(selectedRecord.data.balance<=0){
                     Ext.Msg.alert('Failed', 'Tidak bisa dilanjutkan karena saldo sudah kosong');
                } else {                  
                    
                    Ext.getCmp('idreceivemoney_salesPayment').setValue(selectedRecord.data.idreceivemoney);
                    Ext.getCmp('amount_receivemoney').setValue(selectedRecord.data.balance);
                    Ext.getCmp('namereceivemoney_salesPayment').setValue(selectedRecord.data.memo);
                    
                    //update selisihnya
                    var selisih = str_replace('.', '', Ext.getCmp('balance_sales_paymentsales').getValue()) * 1 - selectedRecord.data.balance * 1
                    Ext.getCmp('balance_paymentsales').setValue(renderNomor(selisih));

                    Ext.getCmp('receiveMultiCashListWindow').hide();
                }
               // setValueAcc(selectedRecord,'wAccReceivePopup','Receive');
            }
        },
    {header: 'idreceivemoney', dataIndex: 'idreceivemoney', hidden: true},
    {header: 'idjournal', dataIndex: 'idjournal', hidden: true},
    // {header: 'no trans', dataIndex: 'notrans', minWidth: 100},
    // {
    //     header: 'Status',
    //     dataIndex: 'status',
    //     minWidth: 150,
    //     renderer: function(value) {
    //      return customColumnStatus(ArrConfirmMoneyStatus, value);
    //     }
    // },
    {header: 'Tanggal', dataIndex: 'datetrans', minWidth: 100},
    {header: 'Memo', dataIndex: 'memo', minWidth: 200,flex:1},
    {header: 'Jumlah Penerimaan', dataIndex: 'total', minWidth: 200, xtype: 'numbercolumn', align: 'right'},
    {header: 'Saldo Tersedia', dataIndex: 'balance', minWidth: 200, xtype: 'numbercolumn', align: 'right'},
    // {header: 'Akun Penerimaan Kas', dataIndex: 'accname', minWidth: 200},
    // {header: 'nama unit', dataIndex: 'namaunit', minWidth: 200},
    // {header: 'user in', dataIndex: 'userin', minWidth: 100},
    // {header: 'date in', dataIndex: 'datein', minWidth: 130}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridSalesOrderListMultiSI',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: StoreGridMultiReceiveCash, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

Ext.define(dir_sys + 'purchasing.receiveMultiCashListWindow',{
    extend: 'Ext.window.Window',
    alias: 'widget.receiveMultiCashListWindow',
// var wAccReceivePopup = Ext.create('widget.window', {
    id: 'receiveMultiCashListWindow',
    title: 'Pilih Data Penerimaan Kas',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 860,
    height: panelHeight,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridMultiReceiveCash'
    }]
});