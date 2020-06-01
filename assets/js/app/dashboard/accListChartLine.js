Ext.define('GridTreeAccListDashboard', {
//    title: 'Daftar Akun',
    // selModel : smGridIP,   
    itemId: 'GridTreeAccListDashboard',
    id: 'GridTreeAccListDashboard',
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeAccListDashboard',
    xtype: 'tree-grid',
    store: storeAccountAktive,
    loadMask: true,
    // height: 300,
    useArrows: true,
    rootVisible: false,
    multiSelect: true,
    // singleExpand: true,
    expanded: true,
    columns: [{
            //we must use the templateheader component so we can use a custom tpl
            xtype: 'treecolumn',
            text: 'accnumber',
            minWidth: 200,
            sortable: true,
            dataIndex: 'accnumber'
        }, {
            xtype: 'treecolumn', //this is so we know which column will show the tree
            text: 'Nama Akun',
            // flex: 2,
            minWidth: 300,
            flex: 1,
            sortable: true,
            dataIndex: 'text'
        }
    ]
    , dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'PilihAccLink',
                    text: 'Pilih Akun',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridTreeAccListDashboard')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                        } else {
                            console.log(selectedRecord);

                            Ext.getCmp('accnameDashboard').setValue(selectedRecord.get('text'));
                            Ext.getCmp('idaccountDashboard').setValue(selectedRecord.get('id'));
                            Ext.getCmp('accnumberDashboard').setValue(selectedRecord.get('accnumber'));

                            
                            Ext.getCmp('akunChartTitle').setTitle(judul + ' ' + selectedRecord.get('text') + ' ' + Ext.getCmp('tahunOption').getSubmitValue());
                            Ext.getCmp('windowPopupAccListDashboard').hide();
                            
                            store1.loadData(generateData(12, selectedRecord.get('id'),Ext.getCmp('tahunOption').getSubmitValue(),Ext.getCmp('idunitOption').getSubmitValue()));
                        }


                    }
                }, '->',
                {
                    xtype: 'textfield',
                    id: 'searchAccListDashboard',
                    blankText: 'Cari akun disini',
                    listeners: {
                        specialkey: function(f, e) {
                            if (e.getKey() == e.ENTER) {
                                storeAccountAktive.load({
                                    params: {
                                        'accname': Ext.getCmp('searchAccListDashboard').getValue(),
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
                                'accname': Ext.getCmp('searchAccListDashboard').getValue(),
                            }
                        });
                    }
                }, '-', {
                    itemId: 'reloadDataAccListDashboard',
                    text: 'Refresh',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.getCmp('GridTreeAccListDashboard');
                        grid.getView().refresh();
                        storeAccountAktive.load();
                        Ext.getCmp('searchAccListDashboard').setValue(null)
                    }
                }]
        }
    ]
    , listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                Ext.getCmp('GridTreeAccListDashboard').expandAll();
            }
        }
    }
});

var windowPopupAccListDashboard = Ext.create('widget.window', {
    id: 'windowPopupAccListDashboard',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    minWidth: 550,
    height: 450,
    x: 20,
    y: 50,
    layout: 'fit',
    border: false,
    title: 'Daftar Akun',
    items: [
        Ext.create('Ext.panel.Panel', {
            bodyPadding: 5, // Don't want content to crunch against the borders
            width: 500,
            height: 300,
            layout: 'fit',
//            id: 'tabAccTreeLinked',
            items: [{
                    xtype: 'GridTreeAccListDashboard'
                }]
        })
    ],
    buttons: [{
            text: 'Tutup',
            handler: function() {
                var windowPopupAccListDashboard = Ext.getCmp('windowPopupAccListDashboard');
                windowPopupAccListDashboard.hide();
            }
        }]
});