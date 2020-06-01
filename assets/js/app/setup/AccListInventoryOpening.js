Ext.define('GridTreeAccLinkedInventoryOpeningAsset', {
            // title: 'Daftar Akun',
            // selModel : smGridIP,   
            itemId: 'GridTreeAccLinkedInventoryOpeningAsset',
            id: 'GridTreeAccLinkedInventoryOpeningAsset',
            extend: 'Ext.tree.Panel',
            alias: 'widget.GridTreeAccLinkedInventoryOpeningAsset',
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
                            text: 'Pilih Akun',
                            iconCls: 'add-icon',
                            handler: function() {
                                var grid = Ext.ComponentQuery.query('GridTreeAccLinkedInventoryOpeningAsset')[0];
                                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                var data = grid.getSelectionModel().getSelection();
                                if (data.length == 0)
                                {
                                    Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                                } else {
                                    console.log(selectedRecord);
                                    Ext.getCmp('accnameAssetOpening').setValue(selectedRecord.get('text')+' '+selectedRecord.get('accnumber'));
                                    Ext.getCmp('assetaccountOpening').setValue(selectedRecord.get('id'));
                                    // Ext.getCmp('linkedidaccountdisplay').setValue(selectedRecord.get('accnumber'));

                                    Ext.getCmp('windowPopupAccLinkedInventoryOpeningAsset').hide();
                                }


                            }
                        }, '->',
                        {
                            xtype: 'textfield',
                            id: 'searchAccLinkedInventoryOpeningAsset',
                            blankText: 'Cari akun disini',
                            listeners: {
                                specialkey: function(f, e) {
                                    if (e.getKey() == e.ENTER) {
                                        storeAccountAktive.load({
                                            params: {
                                                'accname': Ext.getCmp('searchAccLinkedInventoryOpeningAsset').getValue(),
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
                                        'accname': Ext.getCmp('searchAccLinkedInventoryOpeningAsset').getValue(),
                                    }
                                });
                            }
                        }, '-', {
                            itemId: 'reloadDataAccLinkedInventoryOpeningAsset',
                            text: 'Refresh',
                            iconCls: 'add-icon',
                            handler: function() {
                                var grid = Ext.getCmp('GridTreeAccLinkedInventoryOpeningAsset');
                                grid.getView().refresh();
                                storeAccountAktive.load();
                                Ext.getCmp('searchAccLinkedInventoryOpeningAsset').setValue(null)
                            }
                        }]
                }
            ]
            , listeners: {
                render: {
                    scope: this,
                    fn: function(grid) {
                        // Ext.getCmp('GridTreeAccLinkedInventoryOpeningAsset').expandAll();
                    }
                }
            }
        });

       var  AccLinkedInventoryOpeningAsset = Ext.create('widget.window', {
            id: 'windowPopupAccLinkedInventoryOpeningAsset',
            header: {
                titlePosition: 2,
                titleAlign: 'center'
            },
            closable: true,
            closeAction: 'hide',
            autoWidth: true,
            title: 'Daftar Akun',
            minWidth: 750,
            height: 550,
            x: 300,
            y: 50,
            layout: 'fit',
            border: false,
            items: [
                Ext.create('Ext.panel.Panel', {
                    bodyPadding: 5, // Don't want content to crunch against the borders
                    width: 500,
                    height: 300,
                    layout: 'fit',
                    items: [{
                            xtype: 'GridTreeAccLinkedInventoryOpeningAsset'
                        }]
                })
            ],
            buttons: [{
                    text: 'Tutup',
                    handler: function() {
                        var windowPopupAccLinkedInventoryOpeningAsset = Ext.getCmp('windowPopupAccLinkedInventoryOpeningAsset');
                        windowPopupAccLinkedInventoryOpeningAsset.hide();
                    }
                }]
        });

// 

Ext.define('GridTreeAccLinkedInventoryOpeningAkumulasi', {
            // title: 'Daftar Akun',
            // selModel : smGridIP,   
            itemId: 'GridTreeAccLinkedInventoryOpeningAkumulasi',
            id: 'GridTreeAccLinkedInventoryOpeningAkumulasi',
            extend: 'Ext.tree.Panel',
            alias: 'widget.GridTreeAccLinkedInventoryOpeningAkumulasi',
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
                            text: 'Pilih Akun',
                            iconCls: 'add-icon',
                            handler: function() {
                                var grid = Ext.ComponentQuery.query('GridTreeAccLinkedInventoryOpeningAkumulasi')[0];
                                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                var data = grid.getSelectionModel().getSelection();
                                if (data.length == 0)
                                {
                                    Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                                } else {
                                    console.log(selectedRecord);
                                    Ext.getCmp('accnamePenyusutanOpening').setValue(selectedRecord.get('text')+' '+selectedRecord.get('accnumber'));
                                    Ext.getCmp('akumpenyusutaccountOpening').setValue(selectedRecord.get('id'));
                                    // Ext.getCmp('linkedidaccountdisplay').setValue(selectedRecord.get('accnumber'));

                                    Ext.getCmp('windowPopupAccLinkedInventoryOpeningAkumulasi').hide();
                                }


                            }
                        }, '->',
                        {
                            xtype: 'textfield',
                            id: 'searchAccLinkedInventoryOpeningAkumulasi',
                            blankText: 'Cari akun disini',
                            listeners: {
                                specialkey: function(f, e) {
                                    if (e.getKey() == e.ENTER) {
                                        storeAccountAktive.load({
                                            params: {
                                                'accname': Ext.getCmp('searchAccLinkedInventoryOpeningAkumulasi').getValue(),
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
                                        'accname': Ext.getCmp('searchAccLinkedInventoryOpeningAkumulasi').getValue(),
                                    }
                                });
                            }
                        }, '-', {
                            itemId: 'reloadDataAccLinkedInventoryOpeningAkumulasi',
                            text: 'Refresh',
                            iconCls: 'add-icon',
                            handler: function() {
                                var grid = Ext.getCmp('GridTreeAccLinkedInventoryOpeningAkumulasi');
                                grid.getView().refresh();
                                storeAccountAktive.load();
                                Ext.getCmp('searchAccLinkedInventoryOpeningAkumulasi').setValue(null)
                            }
                        }]
                }
            ]
            , listeners: {
                render: {
                    scope: this,
                    fn: function(grid) {
                        // Ext.getCmp('GridTreeAccLinkedInventoryOpeningAkumulasi').expandAll();
                    }
                }
            }
        });

       var  AccLinkedInventoryOpeningAkumulasi = Ext.create('widget.window', {
            id: 'windowPopupAccLinkedInventoryOpeningAkumulasi',
            header: {
                titlePosition: 2,
                titleAlign: 'center'
            },
            closable: true,
            closeAction: 'hide',
            autoWidth: true,
            title: 'Daftar Akun',
            minWidth: 750,
            height: 550,
            x: 300,
            y: 50,
            layout: 'fit',
            border: false,
            items: [
                Ext.create('Ext.panel.Panel', {
                    bodyPadding: 5, // Don't want content to crunch against the borders
                    width: 500,
                    height: 300,
                    layout: 'fit',
                    items: [{
                            xtype: 'GridTreeAccLinkedInventoryOpeningAkumulasi'
                        }]
                })
            ],
            buttons: [{
                    text: 'Tutup',
                    handler: function() {
                        var windowPopupAccLinkedInventoryOpeningAkumulasi = Ext.getCmp('windowPopupAccLinkedInventoryOpeningAkumulasi');
                        windowPopupAccLinkedInventoryOpeningAkumulasi.hide();
                    }
                }]
        });


// 

Ext.define('GridTreeAccLinkedInventoryOpeningBeban', {
            // title: 'Daftar Akun',
            // selModel : smGridIP,   
            itemId: 'GridTreeAccLinkedInventoryOpeningBeban',
            id: 'GridTreeAccLinkedInventoryOpeningBeban',
            extend: 'Ext.tree.Panel',
            alias: 'widget.GridTreeAccLinkedInventoryOpeningBeban',
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
                            text: 'Pilih Akun',
                            iconCls: 'add-icon',
                            handler: function() {
                                var grid = Ext.ComponentQuery.query('GridTreeAccLinkedInventoryOpeningBeban')[0];
                                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                var data = grid.getSelectionModel().getSelection();
                                if (data.length == 0)
                                {
                                    Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                                } else {
                                    console.log(selectedRecord);
                                    Ext.getCmp('accnameDepresiasiOpening').setValue(selectedRecord.get('text')+' '+selectedRecord.get('accnumber'));
                                    Ext.getCmp('depresiasiaccountOpening').setValue(selectedRecord.get('id'));
                                    // Ext.getCmp('linkedidaccountdisplay').setValue(selectedRecord.get('accnumber'));

                                    Ext.getCmp('windowPopupAccLinkedInventoryOpeningBeban').hide();
                                }


                            }
                        }, '->',
                        {
                            xtype: 'textfield',
                            id: 'searchAccLinkedInventoryOpeningBeban',
                            blankText: 'Cari akun disini',
                            listeners: {
                                specialkey: function(f, e) {
                                    if (e.getKey() == e.ENTER) {
                                        storeAccountAktive.load({
                                            params: {
                                                'accname': Ext.getCmp('searchAccLinkedInventoryOpeningBeban').getValue(),
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
                                        'accname': Ext.getCmp('searchAccLinkedInventoryOpeningBeban').getValue(),
                                    }
                                });
                            }
                        }, '-', {
                            itemId: 'reloadDataAccLinkedInventoryOpeningBeban',
                            text: 'Refresh',
                            iconCls: 'add-icon',
                            handler: function() {
                                var grid = Ext.getCmp('GridTreeAccLinkedInventoryOpeningBeban');
                                grid.getView().refresh();
                                storeAccountAktive.load();
                                Ext.getCmp('searchAccLinkedInventoryOpeningBeban').setValue(null)
                            }
                        }]
                }
            ]
            , listeners: {
                render: {
                    scope: this,
                    fn: function(grid) {
                        // Ext.getCmp('GridTreeAccLinkedInventoryOpeningBeban').expandAll();
                    }
                }
            }
        });

       var  AccLinkedInventoryOpeningBeban = Ext.create('widget.window', {
            id: 'windowPopupAccLinkedInventoryOpeningBeban',
            header: {
                titlePosition: 2,
                titleAlign: 'center'
            },
            closable: true,
            closeAction: 'hide',
            autoWidth: true,
            title: 'Daftar Akun',
            minWidth: 750,
            height: 550,
            x: 300,
            y: 50,
            layout: 'fit',
            border: false,
            items: [
                Ext.create('Ext.panel.Panel', {
                    bodyPadding: 5, // Don't want content to crunch against the borders
                    width: 500,
                    height: 300,
                    layout: 'fit',
                    items: [{
                            xtype: 'GridTreeAccLinkedInventoryOpeningBeban'
                        }]
                })
            ],
            buttons: [{
                    text: 'Tutup',
                    handler: function() {
                        var windowPopupAccLinkedInventoryOpeningBeban = Ext.getCmp('windowPopupAccLinkedInventoryOpeningBeban');
                        windowPopupAccLinkedInventoryOpeningBeban.hide();
                    }
                }]
        });