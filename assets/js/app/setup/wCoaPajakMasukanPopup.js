//START PAJAK KELUAR

//acc list
Ext.define('GridCOAPajakMasukanPopup', {
    itemId: 'GridCOAPajakMasukanPopup',
    id: 'GridCOAPajakMasukanPopup',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridCOAPajakMasukanPopup',
    store: storeGridAccount,
    loadMask: true,
    columns: [
    {
            text: 'Edit',
            width: 45,
            // menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: 'Pilih Akun Ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
               // setValueAcc(selectedRecord,'wCoaPajakMasukanPopup','_coa_hutang_pi');
                 Ext.getCmp('idaccpaidSetup').setValue(selectedRecord.data.idaccount);
               Ext.getCmp('accpaidSetup').setValue(selectedRecord.data.accname);
               Ext.getCmp('wCoaPajakMasukanPopup').hide();
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
                '->',
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

Ext.define(dir_sys + 'setup.wCoaPajakMasukanPopup', {
    extend: 'Ext.window.Window',
    id: 'wCoaPajakMasukanPopup',
    alias: 'widget.wCoaPajakMasukanPopup',
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
            xtype:'GridCOAPajakMasukanPopup'
    }]
});

// var wCoaPajakMasukanPopup = Ext.create('wCoaPajakMasukanPopup');
//END PAJAK KELUAR