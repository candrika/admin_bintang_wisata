Ext.define('GridTreeAccRegHutangOpening', {
    // title: 'Daftar Akun',
    // selModel : smGridIP,   
    itemId: 'GridTreeAccRegHutangOpening',
    id: 'GridTreeAccRegHutangOpening',
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeAccRegHutangOpening',
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
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Pilih Akun',
            iconCls: 'add-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridTreeAccRegHutangOpening')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                } else {
                    console.log(selectedRecord);
                    Ext.getCmp('accnameRegHutangOpening').setValue(selectedRecord.get('text'));
                    Ext.getCmp('idaccRegHutangOpening').setValue(selectedRecord.get('id'));
                    // Ext.getCmp('linkedidaccountdisplay').setValue(selectedRecord.get('accnumber'));
                    Ext.getCmp('windowPopupAccRegHutangOpening').hide();
                }
            }
        }, '->', {
            xtype: 'textfield',
            id: 'searchAccRegHutangOpening',
            blankText: 'Cari akun disini',
            listeners: {
                specialkey: function(f, e) {
                    if (e.getKey() == e.ENTER) {
                        storeAccountAktive.load({
                            params: {
                                'accname': Ext.getCmp('searchAccRegHutangOpening').getValue(),
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
                        'accname': Ext.getCmp('searchAccRegHutangOpening').getValue(),
                    }
                });
            }
        }, '-', {
            itemId: 'reloadDataAccRegHutangOpening',
            text: 'Refresh',
            iconCls: 'add-icon',
            handler: function() {
                var grid = Ext.getCmp('GridTreeAccRegHutangOpening');
                grid.getView().refresh();
                storeAccountAktive.load();
                Ext.getCmp('searchAccRegHutangOpening').setValue(null)
            }
        }]
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // Ext.getCmp('GridTreeAccRegHutangOpening').expandAll();
            }
        }
    }
});
var windowPopupAccRegHutangOpening = Ext.create('widget.window', {
    title: 'Pilih Akun Hutang',
    id: 'windowPopupAccRegHutangOpening',
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
                xtype: 'GridTreeAccRegHutangOpening'
            }]
        })
    ],
    buttons: [{
        text: 'Tutup',
        handler: function() {
            var windowPopupAccRegHutangOpening = Ext.getCmp('windowPopupAccRegHutangOpening');
            windowPopupAccRegHutangOpening.hide();
        }
    }]
});
////////////////////////////////////////////////
Ext.define('GridTreeAccRegKenaHutangOpening', {
    // title: 'Daftar Akun',
    // selModel : smGridIP,   
    // itemId: 'GridTreeAccRegKenaHutang',
    id: 'GridTreeAccRegKenaHutangOpening',
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeAccRegKenaHutangOpening',
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
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Pilih Akun',
            iconCls: 'add-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridTreeAccRegKenaHutangOpening')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                } else {
                    console.log(selectedRecord);
                    Ext.getCmp('accnameRegKenaHutangOpening').setValue(selectedRecord.get('text'));
                    Ext.getCmp('idaccRegKenaHutangOpening').setValue(selectedRecord.get('id'));
                    // Ext.getCmp('linkedidaccountdisplay').setValue(selectedRecord.get('accnumber'));
                    Ext.getCmp('windowPopupAccRegKenaHutangOpening').hide();
                }
            }
        }, '->', {
            xtype: 'textfield',
            id: 'searchAccRegKenaHutangOpening',
            blankText: 'Cari akun disini',
            listeners: {
                specialkey: function(f, e) {
                    if (e.getKey() == e.ENTER) {
                        storeAccountAktive.load({
                            params: {
                                'accname': Ext.getCmp('searchAccRegKenaHutangOpening').getValue(),
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
                        'accname': Ext.getCmp('searchAccRegKenaHutangOpening').getValue(),
                    }
                });
            }
        }, '-', {
            // itemId: 'reloadDataAccRegKenaHutang',
            text: 'Refresh',
            iconCls: 'add-icon',
            handler: function() {
                var grid = Ext.getCmp('GridTreeAccRegKenaHutangOpening');
                grid.getView().refresh();
                storeAccountAktive.load();
                Ext.getCmp('searchAccRegKenaHutangOpening').setValue(null)
            }
        }]
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // Ext.getCmp('GridTreeAccRegKenaHutang').expandAll();
            }
        }
    }
});
var windowPopupAccRegKenaHutangOpening = Ext.create('widget.window', {
    title: 'Pilih Akun Kena Hutang',
    id: 'windowPopupAccRegKenaHutangOpening',
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
                xtype: 'GridTreeAccRegKenaHutangOpening'
            }]
        })
    ],
    buttons: [{
        text: 'Tutup',
        handler: function() {
            var windowPopupAccRegKenaHutang = Ext.getCmp('windowPopupAccRegKenaHutang');
            windowPopupAccRegKenaHutang.hide();
        }
    }]
});

///////////////////////////////////////////////
var formRegHutangOpening = Ext.create('Ext.form.Panel', {
    id: 'formRegHutangOpening',
    width: 460,
    height: 300,
    url: SITE_URL + 'setup/saveOpeningHutang',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 200,
        anchor: '100%'
        // width: '90%'
    },
    items: [{
            xtype: 'hiddenfield',
            name: 'statusformRegHutangOpening',
            id: 'statusformRegHutangOpening'
        }, {
            xtype: 'hiddenfield',
            name: 'idunit',
            id: 'idunitRegHutangOpening',
        }, {
            xtype: 'hiddenfield',
            name: 'idregistrasihutang',
            id: 'idregistrasihutang'
        },
        // {
        //     xtype:'textfield',
        //     fieldLabel:'Unit',
        //     id:'namaunitinkhutang',
        //     name:'namaunit',
        // },
        {
            xtype: 'hiddenfield',
            name: 'idsupplier',
            id: 'idsupplierRegHutangOpening',
        }, {
            xtype: 'textfield',
            fieldLabel: 'Supplier',
            name: 'namesupplier',
            id: 'namesupplierRegHutangOpening',
            allowBlank: false,
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        wpopupSupplierOpeningHutang.show();
                        // showPopupSupplier('RegHutangOpening');
                        storeGridpopupSupplierHutang.load();
                    });
                }
            }
        }, {
            xtype: 'textfield',
            fieldLabel: 'Akun Hutang (kredit)',
            name: 'acchutang',
            id: 'accnameRegHutangOpening',
            allowBlank: false,
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        windowPopupAccRegHutangOpening.show();
                        storeAccountAktive.reload({
                            params: {
                                'idunit': Ext.getCmp('cbUnitOpeningHutang').getValue(),
                                'idaccounttype': '9,18'
                            }
                        });
                    });
                }
            }
        }, {
            xtype: 'hiddenfield',
            name: 'idacchutang',
            id: 'idaccRegHutangOpening'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Akun Beban Hutang (debit)',
            name: 'acckenahutang',
            id: 'accnameRegKenaHutangOpening',
            allowBlank:false,
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        windowPopupAccRegKenaHutangOpening.show();

                         storeAccountAktive.reload({
                                    params: {
                                        'idunit': Ext.getCmp('cbUnitOpeningHutang').getValue()
                                    }
                                });
                    });
                }
            }
        },
        {
            xtype: 'hiddenfield',
            name: 'idacckenahutang',
            id: 'idaccRegKenaHutangOpening'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Jumlah Hutang',
            allowBlank: false,
            id: 'jumlahRegHutangOpening',
            listeners: {
                // blur: function(txt, The, eOpts) {
                //     this.setRawValue(renderNomor(this.getValue()));
                // }
                // ,
                change: function(txt, The, eOpts) {
                    this.setRawValue(renderNomor(this.getValue()));
                }
            },
            name: 'jumlah'
        },
        // {
        //     xtype:'displayfield',
        //     fieldLabel:'Sisa Hutang',
        //     id:'sisahutangRegHutangOpening',
        //     renderer: renderNomor,
        //     name:'sisahutang'
        // },
        // {
        //     xtype:'comboxbulan'
        // },
        // {
        //     xtype:'numberfield',
        //     fieldLabel:'Tahun',
        //     id:'tahunRegHutangOpening',
        //     name:'tahun'
        // },
        {
            xtype: 'datefield',
            format: 'd-m-Y',
            name: 'mulaihutang',
            allowBlank: false,
            fieldLabel: 'Tgl Mulai Hutang'
        }, {
            xtype: 'datefield',
            name: 'jatuhtempo',
            allowBlank: false,
            format: 'd-m-Y',
            fieldLabel: 'Tgl Jatuh Tempo'
        }, {
            xtype: 'textarea',
            allowBlank: false,
            fieldLabel: 'Memo',
            name: 'memo'
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupRegHutangOpening');
            Ext.getCmp('formRegHutangOpening').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnRegHutangOpeningSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formRegHutangOpening').getForm().reset();
                        Ext.getCmp('windowPopupRegHutangOpening').hide();
                        storeGridRegOpeningHutang.load({
                            params: {
                                'extraparams': 'a.idunit:' + Ext.getCmp('cbUnitOpeningHutang').getValue()
                            }
                        });
                        updateSaldoOpeningHutang();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        storeGridRegHutangOpening.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
var wRegHutangOpening = Ext.create('widget.window', {
    id: 'windowPopupRegHutangOpening',
    title: 'Registrasi Hutang',
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
    items: [formRegHutangOpening]
});