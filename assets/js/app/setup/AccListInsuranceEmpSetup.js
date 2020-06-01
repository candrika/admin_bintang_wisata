Ext.define('GridTreeAccInsuranceEmp', {
    // title: 'Pilih Akun Premi Tanggungan Karyawan',
    // selModel : smGridIP,   
    itemId: 'GridTreeAccInsuranceEmp',
    id: 'GridTreeAccInsuranceEmp',
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeAccInsuranceEmp',
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
            sortable: true,
            dataIndex: 'text'
        },  {
            //we must use the templateheader component so we can use a custom tpl
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
                    itemId: 'PilihAccInsuranceEmp',
                    text: 'Pilih Akun',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridTreeAccInsuranceEmp')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                        } else {
//                            console.log(selectedRecord);
                            Ext.getCmp('accnameInsuranceSetupE').setValue(selectedRecord.get('text'));
                            Ext.getCmp('idaccountempSetup').setValue(selectedRecord.get('id'));
                            // Ext.getCmp('accnumberInsuranceEmpAdd').setValue(selectedRecord.get('accnumber'));

                            Ext.getCmp('windowPopupAccInsuranceEmp').hide();
                        }


                    }
                },'->',
                {
                    xtype: 'textfield',
                    id: 'searchAccInsuranceEmp',
                    blankText:'Cari akun disini',
                    listeners: {
                        specialkey: function(f, e) {
                            if (e.getKey() == e.ENTER) {
                                storeAccountAktive.load({
                                    params: {
                                        'accname': Ext.getCmp('searchAccInsuranceEmp').getValue(),
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
                                'accname': Ext.getCmp('searchAccInsuranceEmp').getValue(),
                            }
                        });
                    }
                }, '-', {
                    itemId: 'reloadDataAccInsuranceEmp',
                    text: 'Refresh',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.getCmp('GridTreeAccInsuranceEmp');
                        grid.getView().refresh();
                        storeAccountAktive.load();
                        Ext.getCmp('searchAccInsuranceEmp').setValue(null)
                    }
                }]
        }
    ]
    , listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                Ext.getCmp('GridTreeAccInsuranceEmp').expandAll();
            }
        }
    }
});

var windowPopupAccInsuranceEmp = Ext.create('widget.window', {
    id: 'windowPopupAccInsuranceEmp',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    title: 'Pilih Akun Premi Tanggungan Karyawan',
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
            id: 'tabAccTreeInsuranceEmp',
            items: [{
                xtype: 'GridTreeAccInsuranceEmp'
            }]
        })
    ],
    buttons: [{
            text: 'Tutup',
            handler: function() {
                var windowPopupAccInsuranceEmp = Ext.getCmp('windowPopupAccInsuranceEmp');
                windowPopupAccInsuranceEmp.hide();
            }
        }]
});