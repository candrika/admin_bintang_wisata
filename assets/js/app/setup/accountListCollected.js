Ext.define('GridTreeAccCollectedSetup', {
    // title: 'Pilih akun untuk menyimpan pajak keluaran',
    // selModel : smGridIP,   
    itemId: 'GridTreeAccCollectedSetup',
    id: 'GridTreeAccCollectedSetup',
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeAccCollectedSetup',
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
                    itemId: 'PilihAccTaxCollected',
                    text: 'Pilih Akun',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridTreeAccCollectedSetup')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                        } else {

                            Ext.getCmp('acccollectedSetup').setValue(selectedRecord.get('text'));
                            // console.log(selectedRecord.get('text'))
                            Ext.getCmp('idacccollectedSetup').setValue(selectedRecord.get('id'));

                            Ext.getCmp('windowPopupAccCollectedSetup').hide();
                        }


                    }
                }, '->',
                {
                    xtype: 'textfield',
                    id: 'searchAccCollectedSetup',
                    blankText: 'Cari akun disini',
                    listeners: {
                        specialkey: function(f, e) {
                            if (e.getKey() == e.ENTER) {
                                storeAccountAktive.load({
                                    params: {
                                        'accname': Ext.getCmp('searchAccCollectedSetup').getValue()
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
                                'accname': Ext.getCmp('searchAccCollectedSetup').getValue()
                            }
                        });
                    }
                }, '-', {
                    itemId: 'reloadDataAccCollectedSetup',
                    text: 'Refresh',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.getCmp('GridTreeAccCollectedSetup');
                        grid.getView().refresh();
                        storeAccountAktive.load();
                        Ext.getCmp('searchAccCollectedSetup').setValue(null)
                    }
                }]
        }
    ]
    , listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                Ext.getCmp('GridTreeAccCollectedSetup').expandAll();
            }
        }
    }
});

var panelAccTaxCollected = Ext.create('Ext.panel.Panel', {
            bodyPadding: 5, // Don't want content to crunch against the borders
            width: 500,
            height: 300,
            layout: 'fit',
            items: [{
                    xtype: 'GridTreeAccCollectedSetup'
                }]
});

var winAccCollected = Ext.create('widget.window', {
    id: 'windowPopupAccCollectedSetup',
     title: 'Pilih akun untuk menyimpan pajak keluaran',
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
        panelAccTaxCollected
    ],
    buttons: [{
            text: 'Tutup',
            handler: function() {
                var windowPopupAccCollectedSetup = Ext.getCmp('windowPopupAccCollectedSetup');
                windowPopupAccCollectedSetup.hide();
            }
        }]
});