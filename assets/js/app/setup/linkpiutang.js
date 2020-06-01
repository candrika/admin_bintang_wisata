Ext.define('GridTreeAccLinkPiutang', {
    // title: 'Daftar Akun',
    // selModel : smGridIP,   
    itemId: 'GridTreeAccLinkPiutang',
    id: 'GridTreeAccLinkPiutang',
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeAccLinkPiutang',
    xtype: 'tree-grid',
    store: storeAccountByType,
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
                        var grid = Ext.ComponentQuery.query('GridTreeAccLinkPiutang')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                        } else {
                            console.log(selectedRecord);
                            Ext.getCmp('accnamelinkpiutang').setValue(selectedRecord.get('text'));
                            Ext.getCmp('idacclinkpiutang').setValue(selectedRecord.get('id'));
                            // Ext.getCmp('linkedidaccountdisplay').setValue(selectedRecord.get('accnumber'));

                            Ext.getCmp('windowPopupAccLinkPiutang').hide();
                        }


                    }
                }, '->',
                {
                    xtype: 'textfield',
                    id: 'searchAccLinkPiutang',
                    blankText: 'Cari akun disini',
                    listeners: {
                        specialkey: function(f, e) {
                            if (e.getKey() == e.ENTER) {
                                storeAccountByType.load({
                                    params: {
                                        'accname': Ext.getCmp('searchAccLinkPiutang').getValue(),
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
                                'accname': Ext.getCmp('searchAccLinkPiutang').getValue(),
                            }
                        });
                    }
                }, '-', {
                    itemId: 'reloadDataAccLinkPiutang',
                    text: 'Refresh',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.getCmp('GridTreeAccLinkPiutang');
                        grid.getView().refresh();
                        storeAccountByType.load();
                        Ext.getCmp('searchAccLinkPiutang').setValue(null)
                    }
                }]
        }
    ]
    , listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                Ext.getCmp('GridTreeAccLinkPiutang').expandAll();
            }
        }
    }
});

var windowPopupAccLinkPiutang = Ext.create('widget.window', {
    title: 'Daftar Akun',
    id: 'windowPopupAccLinkPiutang',
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
                    xtype: 'GridTreeAccLinkPiutang'
                }]
        })
    ],
    buttons: [{
            text: 'Tutup',
            handler: function() {
                var windowPopupAccLinkPiutang = Ext.getCmp('windowPopupAccLinkPiutang');
                windowPopupAccLinkPiutang.hide();
            }
        }]
});

Ext.define('GridTreeAccLinkPenerimaan', {
    // title: 'Pilih Akun Penerimaan',
    // selModel : smGridIP,   
    itemId: 'GridTreeAccLinkPenerimaan',
    id: 'GridTreeAccLinkPenerimaan',
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeAccLinkPenerimaan',
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
                        var grid = Ext.ComponentQuery.query('GridTreeAccLinkPenerimaan')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                        } else {
                            console.log(selectedRecord);
                            Ext.getCmp('accnamelinkpenerimaan').setValue(selectedRecord.get('text'));
                            Ext.getCmp('idacclinkpenerimaan').setValue(selectedRecord.get('id'));
                            // Ext.getCmp('linkedidaccountdisplay').setValue(selectedRecord.get('accnumber'));

                            Ext.getCmp('windowPopupAccLinkPenerimaan').hide();
                        }


                    }
                }, '->',
                {
                    xtype: 'textfield',
                    id: 'searchAccLinkPenerimaan',
                    blankText: 'Cari akun disini',
                    listeners: {
                        specialkey: function(f, e) {
                            if (e.getKey() == e.ENTER) {
                                storeAccountAktive.load({
                                    params: {
                                        'accname': Ext.getCmp('searchAccLinkPenerimaan').getValue(),
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
                                'accname': Ext.getCmp('searchAccLinkPenerimaan').getValue(),
                            }
                        });
                    }
                }, '-', {
                    itemId: 'reloadDataAccLinkPenerimaan',
                    text: 'Refresh',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.getCmp('GridTreeAccLinkPenerimaan');
                        grid.getView().refresh();
                        storeAccountAktive.load();
                        Ext.getCmp('searchAccLinkPenerimaan').setValue(null)
                    }
                }]
        }
    ]
    , listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                Ext.getCmp('GridTreeAccLinkPenerimaan').expandAll();
            }
        }
    }
});

var windowPopupAccLinkPenerimaan = Ext.create('widget.window', {
    id: 'windowPopupAccLinkPenerimaan',
    title: 'Pilih Akun Penerimaan',
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
                    xtype: 'GridTreeAccLinkPenerimaan'
                }]
        })
    ],
    buttons: [{
            text: 'Tutup',
            handler: function() {
                var windowPopupAccLinkPenerimaan = Ext.getCmp('windowPopupAccLinkPenerimaan');
                windowPopupAccLinkPenerimaan.hide();
            }
        }]
});

var formlinkedaccPiutang = Ext.create('Ext.form.Panel', {
    id: 'formlinkedaccPiutang',
    width: 480,
    height: 230,
    url: SITE_URL + 'backend/saveform/linkedaccPiutang/setup',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 130,
        width: 400
    },
      items: [{
            xtype: 'hiddenfield',
            name: 'statusformlinkedaccPiutang',
            id: 'statusformlinkedaccPiutang'
        },
        {
            xtype:'hiddenfield',
            name:'idunit',
            id:'idunitlinkpiutang',
        }, {
            xtype:'hiddenfield',
            name:'idlinkpiutang',
            id:'idlinkpiutang'
        },
        // {
        //     xtype:'textfield',
        //     fieldLabel:'Unit',
        //     id:'namaunitinkpiutang',
        //     name:'namaunit',
        // },
        {
            xtype: 'textfield',
            fieldLabel: 'Akun Piutang',
            name: 'accnamelinkpiutang',
            id: 'accnamelinkpiutang',
            allowBlank:false,
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        windowPopupAccLinkPiutang.show();

                         storeAccountByType.reload({
                                    params: {
                                        'idunit': Ext.getCmp('cbUnitAccPiutang').getValue(),
                                        'extraparams': 'a.idaccounttype:' + 2
                                    }
                                });
                    });
                }
            }
        },
        {
            xtype: 'hiddenfield',
            fieldLabel: 'idaccPiutang',
            name: 'idacclinkpiutang',
            id: 'idacclinkpiutang'
        },{
            xtype: 'textfield',
            fieldLabel: 'Akun Penerimaan',
            name: 'accnamelinkpenerimaan',
            id: 'accnamelinkpenerimaan',   
            allowBlank:false,
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        windowPopupAccLinkPenerimaan.show();

                        storeAccountAktive.reload({
                                    params: {
                                        'idunit': Ext.getCmp('cbUnitAccPiutang').getValue()
                                    }
                                });
                    });
                }
            }
        },
        {
            xtype: 'hiddenfield',
            fieldLabel: 'idaccPenerimaan',
            name: 'idacclinkpenerimaan',
            id: 'idacclinkpenerimaan'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Keterangan',
            name: 'description'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopuplinkedaccPiutang');
                Ext.getCmp('formlinkedaccPiutang').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnlinkedaccPiutangSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {
                            Ext.Msg.alert('Success', action.result.message);

                            Ext.getCmp('formlinkedaccPiutang').getForm().reset();
                            Ext.getCmp('windowPopuplinkedaccPiutang').hide();

                            storeGridlinkedaccPiutang.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            storeGridlinkedaccPiutang.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});

var wlinkedaccPiutang = Ext.create('widget.window', {
    id: 'windowPopuplinkedaccPiutang',
    title: 'Link Akun Piutang',
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
    items: [formlinkedaccPiutang]
});

Ext.define('GridlinkedaccPiutangModel', {
    extend: 'Ext.data.Model',
    fields: ['idlinkpiutang','idacclinkpiutang','accnamelinkpiutang','idacclinkpenerimaan','accnamelinkpenerimaan','description','idunit','namaunit'],
    idProperty: 'id'
});

var storeGridlinkedaccPiutang = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridlinkedaccPiutangModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/linkedaccPiutang/setup',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
            property: 'menu_name',
            direction: 'DESC'
        }]
});

Ext.define('MY.searchGridlinkedaccPiutang', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridlinkedaccPiutang',
    store: storeGridlinkedaccPiutang,
    width: 180
});

var smGridlinkedaccPiutang = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridlinkedaccPiutang.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletelinkedaccPiutang').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletelinkedaccPiutang').enable();
        }
    }
});

Ext.define('GridlinkedaccPiutang', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridlinkedaccPiutang,
    title: 'Link Akun Piutang',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridlinkedaccPiutangID',
    id: 'GridlinkedaccPiutangID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridlinkedaccPiutang',
    store: storeGridlinkedaccPiutang,
    loadMask: true,
    columns: [
        {header: 'idlinkpiutang', dataIndex: 'idlinkpiutang', hidden: true},
        {header: 'idunit', dataIndex: 'idunit', hidden: true},
        {header: 'Akun Piutang', dataIndex: 'accnamelinkpiutang', minWidth: 350},
        {header: 'Akun Penerimaan', dataIndex: 'accnamelinkpenerimaan', minWidth: 150},
        {header: 'Deskripsi', dataIndex: 'description', minWidth: 550}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'comboxunit',
                    valueField: 'idunit',
                    id: 'cbUnitAccPiutang',
                    listeners: {
                        'change': function(field, newValue, oldValue) {
                            storeGridlinkedaccPiutang.load({
                                params: {
                                    'extraparams': 'a.idunit:' + Ext.getCmp('cbUnitAccPiutang').getValue()
                                }
                            });
                        }
                    }
                }]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
            
                {
                    itemId: 'addlinkedaccPiutang',
                    text: 'Tambah',
                    iconCls: 'add-icon',
                    handler: function() {
                        // var grid = Ext.ComponentQuery.query('GridlinkedaccPiutang')[0];
                        // var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        // var data = grid.getSelectionModel().getSelection();
                        var idunit = Ext.getCmp('cbUnitAccPiutang').getValue();
                        if (idunit==null)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            wlinkedaccPiutang.show();
                            Ext.getCmp('statusformlinkedaccPiutang').setValue('input');
                            // Ext.getCmp('idlinkpiutang').setValue(selectedRecord.data.idlinkpiutang);
                            Ext.getCmp('idunitlinkpiutang').setValue(idunit);

                            
                        }
                       
                    }
                },
                 '->',
                'Search: ', ' ',
                {
                    xtype: 'searchGridlinkedaccPiutang',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridlinkedaccPiutang, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
        // , {
        //     xtype: 'toolbar',
        //     dock: 'top',
        //     items: [{
        //         itemId: 'addlinkedaccPiutang',
        //         text: 'Tambah Data',
        //         iconCls: 'add-icon',
        //         handler: function () {
        //             // WindowKaryawan('Input Karyawan Baru','input');
        //             wlinkedaccPiutang.show();
        //         }
        //     }]
        // }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridlinkedaccPiutang.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formlinkedaccPiutang = Ext.getCmp('formlinkedaccPiutang');
            wlinkedaccPiutang.show();
            storeGridSetupUnit.load();
            
            formlinkedaccPiutang.getForm().load({
                url: SITE_URL + 'backend/loadFormData/linkedaccPiutang/1/setup',
                params: {
                    extraparams: 'a.idlinked:' + record.data.idlinked
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

//            
//            Ext.getCmp('kddaerahS').setReadOnly(true);
//            Ext.getCmp('kdtgktunitS').setReadOnly(true);
//            Ext.getCmp('kodesubunitS').setReadOnly(true);
//            Ext.getCmp('kodejenjangmaster').setReadOnly(true);
            Ext.getCmp('statusformlinkedaccPiutang').setValue('edit');
        }
    }
});