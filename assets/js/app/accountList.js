function accountList(param)
{
        Ext.define('GridTreeAccLinked', {
            title: 'Daftar Akun',
            // selModel : smGridIP,   
            itemId: 'GridTreeAccLinked',
            id: 'GridTreeAccLinked',
            extend: 'Ext.tree.Panel',
            alias: 'widget.GridTreeAccLinked',
            xtype: 'tree-grid',
            store: storeAccount,
            loadMask: true,
            // height: 300,
            useArrows: true,
            rootVisible: false,
            multiSelect: true,
            singleExpand: true,
            // expanded: true,
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
                    minWidth: 400,
                    sortable: true,
                    dataIndex: 'text'
                }, {
                    //we must use the templateheader component so we can use a custom tpl
                    xtype: 'treecolumn',
                    text: 'description',
                    minWidth: 200,
                    sortable: true,
                    dataIndex: 'description'
                }, {
                    //we must use the templateheader component so we can use a custom tpl
                    xtype: 'treecolumn',
                    text: 'balance',
                    sortable: true,
                    minWidth: 200,
                    dataIndex: 'id'
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
                                var grid = Ext.ComponentQuery.query('GridTreeAccLinked')[0];
                                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                var data = grid.getSelectionModel().getSelection();
                                if (data.length == 0)
                                {
                                    Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                                } else {
                                    
                                    if(param=='linkedaccount')
                                    {
                                        Ext.getCmp('accnameSetup').setValue(selectedRecord.get('text'));
                                        Ext.getCmp('linkedidaccount').setValue(selectedRecord.get('id'));
                                        Ext.getCmp('linkedidaccountdisplay').setValue(selectedRecord.get('accnumber'));                                       
                                    } else if(param=='acccollected')
                                    {
                                        Ext.getCmp('acccollected').setValue(selectedRecord.get('text'));
                                        Ext.getCmp('idacccollected').setValue(selectedRecord.get('id'));
                                    } else if(param=='accpaid')
                                    {
                                        Ext.getCmp('accpaid').setValue(selectedRecord.get('text'));
                                        Ext.getCmp('idaccpaid').setValue(selectedRecord.get('id'));
                                    }
                                    
                                    Ext.getCmp('windowPopupAccLinked').hide();
                                }


                            }
                        },'->',
                        {
                            xtype: 'textfield',
                            id: 'searchAccLinked',
                            blankText:'Cari akun disini',
                            listeners: {
                                specialkey: function(f, e) {
                                    if (e.getKey() == e.ENTER) {
                                        storeAccount.load({
                                            params: {
                                                'accname': Ext.getCmp('searchAccLinked').getValue(),
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
                                storeAccount.load({
                                    params: {
                                        'accname': Ext.getCmp('searchAccLinked').getValue(),
                                    }
                                });
                            }
                        }, '-', {
                            itemId: 'reloadDataAccLinked',
                            text: 'Refresh',
                            iconCls: 'add-icon',
                            handler: function() {
                                var grid = Ext.getCmp('GridTreeAccLinked');
                                grid.getView().refresh();
                                storeAccount.load();
                                Ext.getCmp('searchAccLinked').setValue(null)
                            }
                        }]
                }
            ]
            , listeners: {
                render: {
                    scope: this,
                    fn: function(grid) {
                        // Ext.getCmp('GridTreeAccLinked').expandAll();
                    }
                }
            }
        });

        Ext.create('widget.window', {
            id: 'windowPopupAccLinked',
            header: {
                titlePosition: 2,
                titleAlign: 'center'
            },
            closable: true,
            closeAction: 'hide',
            autoWidth: true,
            minWidth: 350,
            height: 350,
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
                    id: 'tabAccTreeLinked',
                    items: [{
                        xtype: 'GridTreeAccLinked'
                    }]
                })
            ],
            buttons: [{
                    text: 'Tutup',
                    handler: function() {
                        var windowPopupAccLinked = Ext.getCmp('windowPopupAccLinked');
                        windowPopupAccLinked.hide();
                    }
                }]
        }).show();
}