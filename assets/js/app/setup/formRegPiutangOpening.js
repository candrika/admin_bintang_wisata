var WindowGridCustomerOpeningARPopup = Ext.create(dir_sys + 'setup.WindowGridCustomerOpeningARPopup');

Ext.define('GridTreeAccRegPiutangOpening', {
    // title: 'Daftar Akun',
    // selModel : smGridIP,   
    itemId: 'GridTreeAccRegPiutangOpening',
    id: 'GridTreeAccRegPiutangOpening',
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeAccRegPiutangOpening',
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
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Pilih Akun',
            iconCls: 'add-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridTreeAccRegPiutangOpening')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                } else {
                    console.log(selectedRecord);
                    Ext.getCmp('accnameRegPiutangOpening').setValue(selectedRecord.get('text'));
                    Ext.getCmp('idaccRegPiutangOpening').setValue(selectedRecord.get('id'));
                    // Ext.getCmp('linkedidaccountdisplay').setValue(selectedRecord.get('accnumber'));
                    Ext.getCmp('windowPopupAccRegPiutangOpening').hide();
                }
            }
        }, '->', {
            xtype: 'textfield',
            id: 'searchAccRegPiutangOpening',
            blankText: 'Cari akun disini',
            listeners: {
                specialkey: function(f, e) {
                    if (e.getKey() == e.ENTER) {
                        storeAccountAktive.load({
                            params: {
                                'accname': Ext.getCmp('searchAccRegPiutangOpening').getValue(),
                            }
                        });
                    }
                }
            }
        }, {
            //                        itemId: 'reloadDataAcc',
            text: 'Cari',
            iconCls: 'add-icon',
            handler: function() {
                storeAccount.load({
                    params: {
                        'accname': Ext.getCmp('searchAccRegPiutangOpening').getValue(),
                    }
                });
            }
        }, '-', {
            itemId: 'reloadDataAccRegPiutangOpening',
            text: 'Refresh',
            iconCls: 'add-icon',
            handler: function() {
                var grid = Ext.getCmp('GridTreeAccRegPiutangOpening');
                grid.getView().refresh();
                storeAccountAktive.load();
                Ext.getCmp('searchAccRegPiutangOpening').setValue(null)
            }
        }]
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // Ext.getCmp('GridTreeAccRegPiutangOpening').expandAll();
            }
        }
    }
});
var windowPopupAccRegPiutangOpening = Ext.create('widget.window', {
    title: 'Pilih Akun Piutang',
    id: 'windowPopupAccRegPiutangOpening',
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
        Ext.create('Ext.panel.Panel', {
            bodyPadding: 5, // Don't want content to crunch against the borders
            width: 500,
            height: 300,
            layout: 'fit',
            items: [{
                xtype: 'GridTreeAccRegPiutangOpening'
            }]
        })
    ],
    buttons: [{
        text: 'Tutup',
        handler: function() {
            var windowPopupAccRegPiutangOpening = Ext.getCmp('windowPopupAccRegPiutangOpening');
            windowPopupAccRegPiutangOpening.hide();
        }
    }]
});
//////////////GRID LIST ACC RECEIVE PiutangOpening
Ext.define('GridTreeAccRegReceivePiutangOpening', {
    // title: 'Daftar Akun',
    // selModel : smGridIP,   
    itemId: 'GridTreeAccRegReceivePiutangOpening',
    id: 'GridTreeAccRegReceivePiutangOpening',
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeAccRegReceivePiutangOpening',
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
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Pilih Akun',
            iconCls: 'add-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridTreeAccRegReceivePiutangOpening')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                } else {
                    console.log(selectedRecord);
                    Ext.getCmp('accnameRegReceivePiutangOpening').setValue(selectedRecord.get('text'));
                    Ext.getCmp('idaccRegReceivePiutangOpening').setValue(selectedRecord.get('id'));
                    // Ext.getCmp('linkedidaccountdisplay').setValue(selectedRecord.get('accnumber'));
                    Ext.getCmp('windowPopupAccRegReceivePiutangOpening').hide();
                }
            }
        }, '->', {
            xtype: 'textfield',
            id: 'searchAccRegReceivePiutangOpening',
            blankText: 'Cari akun disini',
            listeners: {
                specialkey: function(f, e) {
                    if (e.getKey() == e.ENTER) {
                        storeAccountAktive.load({
                            params: {
                                'accname': Ext.getCmp('searchAccRegReceivePiutangOpening').getValue(),
                            }
                        });
                    }
                }
            }
        }, {
            //                        itemId: 'reloadDataAcc',
            text: 'Cari',
            iconCls: 'add-icon',
            handler: function() {
                storeAccount.load({
                    params: {
                        'accname': Ext.getCmp('searchAccRegReceivePiutangOpening').getValue(),
                    }
                });
            }
        }, '-', {
            itemId: 'reloadDataAccRegReceivePiutangOpening',
            text: 'Refresh',
            iconCls: 'add-icon',
            handler: function() {
                var grid = Ext.getCmp('GridTreeAccRegReceivePiutangOpening');
                grid.getView().refresh();
                storeAccountAktive.load();
                Ext.getCmp('searchAccRegReceivePiutangOpening').setValue(null)
            }
        }]
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // Ext.getCmp('GridTreeAccRegReceivePiutangOpening').expandAll();
            }
        }
    }
});
var windowPopupAccRegReceivePiutangOpening = Ext.create('widget.window', {
    title: 'Pilih Akun Penerimaan Piutang',
    id: 'windowPopupAccRegReceivePiutangOpening',
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
        Ext.create('Ext.panel.Panel', {
            bodyPadding: 5, // Don't want content to crunch against the borders
            width: 500,
            height: 300,
            layout: 'fit',
            items: [{
                xtype: 'GridTreeAccRegReceivePiutangOpening'
            }]
        })
    ],
    buttons: [{
        text: 'Tutup',
        handler: function() {
            var windowPopupAccRegReceivePiutangOpening = Ext.getCmp('windowPopupAccRegReceivePiutangOpening');
            windowPopupAccRegReceivePiutangOpening.hide();
        }
    }]
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
var formregPiutangOpening = Ext.create('Ext.form.Panel', {
    id: 'formregPiutangOpening',
    width: 450,
    height: 250,
    url: SITE_URL + 'setup/savePiutangOpening',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 180,
        width: 400
    },
    items: [{
            xtype: 'hiddenfield',
            name: 'statusformregPiutangOpening',
            id: 'statusformRegPiutangOpening'
        }, {
            xtype: 'hiddenfield',
            name: 'idunit',
            id: 'idunitRegPiutangOpening',
        }, {
            xtype: 'hiddenfield',
            name: 'idregistrasiPiutangOpening',
            id: 'idregistrasiPiutangOpening'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Customer',
            name: 'customer_name',
            id: 'customer_name_regap',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                            WindowGridCustomerOpeningARPopup.show();

                            var GridCustomerOpeningARPopupIDStore = Ext.getCmp('GridCustomerOpeningARPopupID').getStore();
                            GridCustomerOpeningARPopupIDStore.load();

                    });
                }
            }
        },
        {
            xtype:'hiddenfield',
            name: 'idcustomer',
            id: 'idcustomer_regap',
        },
        // {
        //     xtype:'textfield',
        //     fieldLabel:'Unit',
        //     id:'namaunitinkPiutangOpening',
        //     name:'namaunit',
        // },
        {
            xtype: 'textfield',
            fieldLabel: 'Akun Piutang',
            name: 'accnamePiutangOpening',
            id: 'accnameRegPiutangOpening',
            allowBlank: false,
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        windowPopupAccRegPiutangOpening.show();
                        storeAccountAktive.reload({
                            params: {
                                'idunit': Ext.getCmp('cbUnitOpeningPiutang').getValue(),
                                'idaccounttype': '2,17'
                            }
                        });
                    });
                }
            }
        }, {
            xtype: 'textfield',
            fieldLabel: 'Akun Pendapatan',
            name: 'accname',
            id: 'accnameRegReceivePiutangOpening',
            allowBlank: false,
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        windowPopupAccRegReceivePiutangOpening.show();
                        storeAccountAktive.reload({
                            params: {
                                'idunit': Ext.getCmp('cbUnitOpeningPiutang').getValue(),
                                'idaccounttype': '12,16'
                            }
                        });
                    });
                }
            }
        }, {
            xtype: 'textfield',
            allowBlank: false,
            fieldLabel: 'Jumlah Piutang',
            id: 'jumlahregPiutangOpening',
            name: 'jumlah',
            listeners: {
                change: function(txt, The, eOpts) {
                    this.setRawValue(renderNomor(this.getValue()));
                }
            },
        }, {
            xtype: 'datefield',
            id: 'tglPiutangOpening',
            name: 'tglPiutangOpening',
            format: 'Y-m-d',
            fieldLabel: 'Tanggal Mulai Piutang'
        },
        // {tglPiutangOpening
        //     xtype:'comboxbulan'
        // },
        // {
        //     xtype:'numberfield',
        //     fieldLabel:'Tahun',
        //     id:'tahunregPiutangOpening',
        //     name:'tahun'
        // },
        {
            xtype: 'hiddenfield',
            fieldLabel: 'idaccPiutangOpening',
            name: 'idaccount',
            id: 'idaccRegPiutangOpening'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idaccountlink',
            name: 'idaccountlink',
            id: 'idaccRegReceivePiutangOpening'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Keterangan',
            name: 'description'
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupregPiutangOpening');
            Ext.getCmp('formregPiutangOpening').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnregPiutangOpeningSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formregPiutangOpening').getForm().reset();
                        Ext.getCmp('windowPopupregPiutangOpening').hide();
                        storeGridRegOpeningPiutang.load({
                            params: {
                                'extraparams': 'a.idunit:' + Ext.getCmp('cbUnitOpeningPiutang').getValue()
                            }
                        });
                        updateSaldoOpeningPiutang();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        storeGridregPiutangOpening.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
var wregPiutangOpening = Ext.create('widget.window', {
    id: 'windowPopupregPiutangOpening',
    title: 'Registrasi Piutang',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    // minWidth: 450,
    // height: 450,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formregPiutangOpening]
});