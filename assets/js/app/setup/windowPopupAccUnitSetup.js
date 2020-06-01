Ext.define('GridAccReceive', {
    itemId: 'GridAccReceive',
    id: 'GridAccReceive',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAccReceive',
    store: storeGridAccount,
    loadMask: true,
    columns: [
    {
            text: 'Edit',
            width: 55,
            // menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: 'Pilih Akun Ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
               // setValueAcc(selectedRecord,'wAccReceivePopup','Receive');
                Ext.getCmp('accUnitSetup').setValue(selectedRecord.get('accname'));
                            // console.log(selectedRecord.get('text'))
                Ext.getCmp('idaccountAccUnit').setValue(selectedRecord.get('idaccount'));
                Ext.getCmp('accnumberUnitSetup').setValue(selectedRecord.get('accnumber'));
                
                Ext.getCmp('windowPopupAccUnitSetup').hide();
            }
        },
        {header: 'idaccount', dataIndex: 'idaccount', hidden: true},
        {header: 'idunit', dataIndex: 'idunit', hidden: true},
        {header: 'No Akun', dataIndex: 'accnumber',},
        {header: 'Nama Akun', dataIndex: 'accname', minWidth: 150,flex:1},
        {header: 'Saldo', dataIndex: 'balance', minWidth: 150,xtype:'numbercolumn',align:'right',hidden:true},
        {header: 'Tipe Akun', dataIndex: 'acctypename', minWidth: 170},
        // {header: 'Deskripsi', dataIndex: 'description', minWidth: 250},
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridAcc',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridAccount, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

Ext.define(dir_sys + 'setup.windowPopupAccUnitSetup',{
    extend: 'Ext.window.Window',
    alias: 'widget.windowPopupAccUnitSetup',
    modal:true,
    id: 'windowPopupAccUnitSetup',
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
            xtype:'GridAccReceive'
    }]
});