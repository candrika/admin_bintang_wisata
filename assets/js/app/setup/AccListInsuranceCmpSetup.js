Ext.define('GridTreeAccInsuranceCmp', {
    // title: 'Pilih Akun Premi Tanggungan Karyawan',
    // selModel : smGridIP,   
    itemId: 'GridTreeAccInsuranceCmp',
    id: 'GridTreeAccInsuranceCmp',
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeAccInsuranceCmp',
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
            //we must use the tCmplateheader component so we can use a custom tpl
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
            sortable: true,
            dataIndex: 'text'
        },  {
            //we must use the tCmplateheader component so we can use a custom tpl
            xtype: 'numbercolumn',
            text: 'balance',
            align:'right',
            sortable: true,
            minWidth: 100,
            dataIndex: 'balance'
        }
    ]
    , dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'PilihAccInsuranceCmp',
                    text: 'Pilih Akun',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridTreeAccInsuranceCmp')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                        } else {
//                            console.log(selectedRecord);
                            Ext.getCmp('accnameInsuranceSetupC').setValue(selectedRecord.get('text'));
                            Ext.getCmp('idaccountcompSetup').setValue(selectedRecord.get('id'));
                            // Ext.getCmp('accnumberInsuranceCmpAdd').setValue(selectedRecord.get('accnumber'));

                            Ext.getCmp('windowPopupAccInsuranceCmp').hide();
                        }


                    }
                },'->',
                {
                    xtype: 'textfield',
                    id: 'searchAccInsuranceCmp',
                    blankText:'Cari akun disini',
                    listeners: {
                        specialkey: function(f, e) {
                            if (e.getKey() == e.ENTER) {
                                storeAccountAktive.load({
                                    params: {
                                        'accname': Ext.getCmp('searchAccInsuranceCmp').getValue(),
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
                                'accname': Ext.getCmp('searchAccInsuranceCmp').getValue(),
                            }
                        });
                    }
                }, '-', {
                    itemId: 'reloadDataAccInsuranceCmp',
                    text: 'Refresh',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.getCmp('GridTreeAccInsuranceCmp');
                        grid.getView().refresh();
                        storeAccountAktive.load();
                        Ext.getCmp('searchAccInsuranceCmp').setValue(null)
                    }
                }]
        }
    ]
    , listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                Ext.getCmp('GridTreeAccInsuranceCmp').expandAll();
            }
        }
    }
});

var windowPopupAccInsuranceCmp = Ext.create('widget.window', {
    id: 'windowPopupAccInsuranceCmp',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    title: 'Pilih Akun Premi Tanggungan Perusahaan',
    closeAction: 'hide',
    autoWidth: true,
    minWidth: 650,
    height: 450,
    x: 300,
    y: 50,
    layout: 'fit',
    border: false,
    items: [
        Ext.create('Ext.panel.Panel', {
            bodyPadding: 5,  // Don't want content to crunch against the borders
            width: 500,
            height: 300,
            layout:'fit',
            id: 'tabAccTreeInsuranceCmp',
            items: [{
                xtype: 'GridTreeAccInsuranceCmp'
            }]
        })
    ],
    buttons: [{
            text: 'Tutup',
            handler: function() {
                var windowPopupAccInsuranceCmp = Ext.getCmp('windowPopupAccInsuranceCmp');
                windowPopupAccInsuranceCmp.hide();
            }
        }]
});