Ext.define('GridTreeAccPaidSetup2', {
    // title: 'Pilih akun untuk menyimpan pajak keluaran',
    // selModel : smGridIP,   
    itemId: 'GridTreeAccPaidSetup2',
    id: 'GridTreeAccPaidSetup2',
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeAccPaidSetup2',
    xtype: 'tree-grid',
    store: storeAccountAktive,
    loadMask: true,
    // height: 300,
    useArrows: true,
    rootVisible: false,
    multiSelect: true,
    singleExpand: true,
    expanded: true,
    columns: [{
            xtype: 'treecolumn',
            text: 'accnumber',
//                    autoWidth:true,
            minWidth: 250,
            sortable: true,
            dataIndex: 'accnumber'
        }, {
            xtype: 'treecolumn', //this is so we know which column will show the tree
            text: 'Nama Akun',
            // flex: 2,
            minWidth: 300,
            sortable: true,
            dataIndex: 'text'
        }, {
            text: 'description',
            minWidth: 200,
            sortable: true,
            dataIndex: 'description'
        }, {
            xtype: 'numbercolumn', align: 'right',
            text: 'balance',
            sortable: true,
            minWidth: 170,
            dataIndex: 'balance'
        }
    ]
    , dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'PilihAccTaxPaid',
                    text: 'Pilih Akun',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridTreeAccPaidSetup2')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                        } else {

                            Ext.getCmp('accpaidSetup').setValue(selectedRecord.get('text'));
                            Ext.getCmp('idaccpaidSetup').setValue(selectedRecord.get('id'));

                            Ext.getCmp('windowPopupAccPaidSetup2').hide();
                        }


                    }
                }, '->',
                {
                    xtype: 'textfield',
                    id: 'searchAccPaidSetup2',
                    blankText: 'Cari akun disini',
                    listeners: {
                        specialkey: function(f, e) {
                            if (e.getKey() == e.ENTER) {
                                storeAccountAktive.load({
                                    params: {
                                        'accname': Ext.getCmp('searchAccPaidSetup2').getValue()
                                    }
                                });
                            }
                        }
                    }
                }, {
                    //                        itemId: 'reloadDataAcc',
                    text: 'Cari',
                    iconCls: 'add-icon'
                    , handler: function() {
                        storeAccountAktive.load({
                            params: {
                                'accname': Ext.getCmp('searchAccPaidSetup2').getValue()
                            }
                        });
                    }
                }, '-', {
                    itemId: 'reloadDataAccPaidSetup2',
                    text: 'Refresh',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.getCmp('GridTreeAccPaidSetup2');
                        grid.getView().refresh();
                        storeAccountAktive.load();
                        Ext.getCmp('searchAccPaidSetup2').setValue(null)
                    }
                }]
        }
    ]
    , listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                Ext.getCmp('GridTreeAccPaidSetup2').expandAll();
            }
        }
    }
});

var panelGridTreeAccPaidSetup2 = Ext.create('Ext.panel.Panel', {
            bodyPadding: 5, // Don't want content to crunch against the borders
            width: 500,
            height: 300,
            layout: 'fit',
            items: [{
                    xtype: 'GridTreeAccPaidSetup2'
                }]
        })

var winAccPaid = Ext.create('widget.window', {
    id: 'windowPopupAccPaidSetup2',
    title: 'Pilih akun untuk menyimpan pajak masukan',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    minWidth: 750,
    height: 550,
    x: 300,
    y: 50,
    layout: 'fit',
    border: false,
    items: [
        panelGridTreeAccPaidSetup2
    ],
    buttons: [{
            text: 'Tutup',
            handler: function() {
                var windowPopupAccPaidSetup2 = Ext.getCmp('windowPopupAccPaidSetup2');
                windowPopupAccPaidSetup2.hide();
            }
        }]
});