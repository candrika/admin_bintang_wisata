var wCoaPajakKeluaranPopup = Ext.create(dir_sys+'setup.wCoaPajakKeluaranPopup');
var wCoaPajakMasukanPopup = Ext.create(dir_sys+'setup.wCoaPajakMasukanPopup');

///////////////////////////////////////////////////////////////
Ext.define('storeGridLinkedAccTaxModel', {
    extend: 'Ext.data.Model',
    fields: ['idtax','acccollectedtax','acctaxpaid','idunit','namaunit','accpaid','acccollected'],
    idProperty: 'id'
});

var storeGridLinkedAccTax = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'storeGridLinkedAccTaxModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/setuptaxlink/setup',
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
///////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////

var formlinkedaccTaxUnit = Ext.create('Ext.form.Panel', {
    id: 'formlinkedaccTaxUnit',
    width: 450,
    height: 150,
    url: SITE_URL + 'setup/saveLinkTaxUnit',
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
        id:'idtaxLinkSetup',
        name: 'idtax'
    }, {
        xtype: 'hiddenfield',
        name: 'idunit',
        id: 'idunitAccTaxUnit'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Unit',
        name: 'namaunit',
        id: 'namaunitAccTaxUnit',
        readOnly: true
    }, 
    // {
    //     xtype: 'hiddenfield',
    //     name: 'idacccollected',
    //     id: 'idacccollectedSetup',
    // }, {
    //     xtype: 'textfield',
    //     fieldLabel: 'Akun Pajak Keluaran',
    //     allowBlank: false,
    //     name: 'acccollected',
    //     id: 'acccollectedSetup',
    //     listeners: {
    //         render: function(component) {
    //             component.getEl().on('click', function(event, el) {
    //                 winAccCollected.show();
    //                 storeAccountAktive.load({
    //                     params: {
    //                         'idunit': Ext.getCmp('idunitAccTaxUnit').getValue()
    //                     }
    //                 });
    //             });
    //         }
    //     }
    // }, {
    //     xtype: 'hiddenfield',
    //     name: 'idaccpaid',
    //     id: 'idaccpaidSetup',
    // }, {
    //     xtype: 'textfield',
    //     fieldLabel: 'Akun Pajak Masukan',
    //     allowBlank: false,
    //     name: 'accpaid',
    //     id: 'accpaidSetup',
    //     listeners: {
    //         render: function(component) {
    //             component.getEl().on('click', function(event, el) {
    //                 winAccPaid.show();
    //                 storeAccountAktive.load({
    //                     params: {
    //                         'idunit': Ext.getCmp('idunitAccTaxUnit').getValue()
    //                     }
    //                 });
    //             });
    //         }
    //     }
    // }, 
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            this.up('form').getForm().reset();
            Ext.getCmp('wformlinkedaccTaxUnit').hide();
        }
    }, {
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        // this.up('form').getForm().reset();
                        Ext.getCmp('wformlinkedaccTaxUnit').hide();
                        Ext.getCmp('windowPopuplinkedacc').hide();

                        storeGridLinkedAccTax.load({
                            params: {
                                'extraparams':'a.idtax:' + Ext.getCmp('idtaxLinkSetup').getValue()
                            }
                        });

                        // storeGridSetupUnitLink.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        storeGridLinkedAccTax.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
var wformlinkedaccTaxUnit = Ext.create('widget.window', {
    id: 'wformlinkedaccTaxUnit',
    title: 'Hubungkan Akun',
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
    items: [formlinkedaccTaxUnit]
});

//////////////////////////////////////////////////////////////////

var formSetupTax = Ext.create('Ext.form.Panel', {
    id: 'formSetupTax',
    width: 540,
    // height: 430,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/SetupTax/setup',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 160,
        width: '100%'
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'statusformSetupTax',
        id: 'statusformSetupTax'
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'idtax',
        name: 'idtax'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Kode Pajak',
        allowBlank: false,
        name: 'code'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Nama Pajak',
        id:'nametaxsetup',
        allowBlank: false,
        name: 'nametax'
    }, {
        xtype: 'comboxtaxtype',
        hidden:true,
        // allowBlank: false,
        name: 'nametypetax'
    }, {
        xtype: 'textarea',
        fieldLabel: 'Deskripsi',
        name: 'description'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Rate (%)',
        allowBlank: false,
        name: 'rate'
    },
    {
        xtype: 'hiddenfield',
        name: 'idacccollected',
        id: 'idacccollectedSetup',
    }, {
        xtype: 'textfield',
        fieldLabel: 'Akun Pajak Keluaran',
        allowBlank: false,
        name: 'acccollected',
        id: 'acccollectedSetup',
        listeners: {
            render: function(component) {
                component.getEl().on('click', function(event, el) {
                    wCoaPajakKeluaranPopup.show();
                    // storeAccountAktive.load({
                    //     params: {
                    //         'idunit': Ext.getCmp('idunitAccTaxUnit').getValue()
                    //     }
                    // });
                        storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                                    operation.params={
                                                                'idunit': idunit,
                                                                // 'idaccounttype': '17,18'
                                                    };
                                                });
                        storeGridAccount.load();
                });
            }
        }
    }, {
        xtype: 'hiddenfield',
        name: 'idaccpaid',
        id: 'idaccpaidSetup',
    }, {
        xtype: 'textfield',
        fieldLabel: 'Akun Pajak Masukan',
        allowBlank: false,
        name: 'accpaid',
        id: 'accpaidSetup',
        listeners: {
            render: function(component) {
                component.getEl().on('click', function(event, el) {
                    wCoaPajakMasukanPopup.show();
                    // storeAccountAktive.load({
                    //     params: {
                    //         'idunit': Ext.getCmp('idunitAccTaxUnit').getValue()
                    //     }
                    // });
                        storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                                    operation.params={
                                                                'idunit': idunit
                                                                // 'idaccounttype': '17,18'
                                                    };
                                                });
                        storeGridAccount.load();
                });
            }
        }
    }
    // {
    //     xtype: 'gridpanel',
    //     id: 'GridLinkedAccTax',
    //     // title: 'Hubungkan ',
    //     store: storeGridLinkedAccTax,
    //     height: 150,
    //     columns: [{
    //         header: 'idtax',
    //         dataIndex: 'idtax',
    //         hidden: true
    //     }, {
    //         header: 'acccollectedtax',
    //         dataIndex: 'acccollectedtax',
    //         hidden: true
    //     }, {
    //         header: 'acctaxpaid',
    //         dataIndex: 'acctaxpaid',
    //         hidden: true
    //     },{
    //         header: 'Nama Unit',
    //         dataIndex: 'namaunit',
    //         minWidth: 150,
    //         flex: 1
    //     }, {
    //         header: 'Akun Pajak Masukan',
    //         dataIndex: 'accpaid',
    //         minWidth: 150,
    //         flex: 1
    //     }, {
    //         header: 'Akun Pajak Keluaran',
    //         dataIndex: 'acccollected',
    //         flex: 1,
    //         minWidth: 150
    //     }, {
    //         text: 'Edit',
    //         width: 45,
    //         // menuDisabled: true,
    //         xtype: 'actioncolumn',
    //         tooltip: 'Ubah Data',
    //         align: 'center',
    //         icon: BASE_URL + 'assets/icons/fam/pencil.png',
    //         handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
    //             var formlinkedaccTaxUnit = Ext.getCmp('formlinkedaccTaxUnit');
    //             wformlinkedaccTaxUnit.show();
    //             formlinkedaccTaxUnit.getForm().load({
    //                 url: SITE_URL + 'backend/loadFormData/setuptaxlink/1/setup',
    //                 params: {
    //                     extraparams: 'a.idunit:' + record.get('idunit') + ',' + 'a.idtax:' + record.get('idtax')
    //                 },
    //                 success: function(form, action) {
    //                     // Ext.Msg.alert("Load failed", action.result.errorMessage);
    //                 },
    //                 failure: function(form, action) {
    //                     // Ext.Msg.alert("Load failed", action.result.errorMessage);
    //                 }
    //             })
    //             // Ext.getCmp('GridLinkedAcc').setTitle('Hubungkan Akun '+Ext.getCmp('nametaxsetup').getValue()+' ke setiap Unit');
    //             // console.log(Ext.getCmp('idlinkedSetup').getValue());           
    //             // Ext.getCmp('namaunitAccTaxUnit').setValue(record.get('namaunit'));
    //             // Ext.getCmp('idlinkedAccTaxUnit').setValue(Ext.getCmp('idlinkedSetup').getValue());
    //             // Ext.getCmp('idunitAccTaxUnit').setValue(record.get('idunit'));
    //         }
    //     }
        ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupSetupTax');
            Ext.getCmp('formSetupTax').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnSetupTaxSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formSetupTax').getForm().reset();
                        Ext.getCmp('windowPopupSetupTax').hide();
                        storeGridSetupTax.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridSetupTax.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
var wSetupTax = Ext.create('widget.window', {
    id: 'windowPopupSetupTax',
    title: 'Taxation',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formSetupTax]
});
Ext.define('GridSetupTaxModel', {
    extend: 'Ext.data.Model',
    fields: ['idtax', 'code', 'nametax', 'description', 'rate', 'nametypetax', 'acccollected', 'idacccollected', 'accnumbercollected', 'accpaid', 'idaccpaid', 'accnumberpaid'],
    idProperty: 'id'
});
var storeGridSetupTax = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSetupTaxModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/SetupTax/setup',
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
Ext.define('MY.searchGridSetupTax', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSetupTax',
    store: storeGridSetupTax,
    width: 180
});
var smGridSetupTax = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridSetupTax.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteSetupTax').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteSetupTax').enable();
        }
    }
});
Ext.define('GridSetupTax', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridSetupTax,
    title: 'Kode Pajak',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridSetupTaxID',
    id: 'GridSetupTaxID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSetupTax',
    store: storeGridSetupTax,
    loadMask: true,
    columns: [{
        header: 'idtax',
        dataIndex: 'idtax',
        hidden: true
    }, {
        header: 'Kode Pajak',
        dataIndex: 'code',
        minWidth: 150
    }, {
        header: 'Nama Pajak',
        dataIndex: 'nametax',
        minWidth: 200
    }, {
        header: 'Deskripsi',
        flex:1,
        dataIndex: 'description',
        minWidth: 250
    },  {
        header: 'Tipe Pajak',
        hidden:true,
        dataIndex: 'nametypetax',
        minWidth: 150
    },{
        header: 'Rate (%)',
        dataIndex: 'rate',
        minWidth: 50
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addSetupTax',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wSetupTax.show();
                Ext.getCmp('statusformSetupTax').setValue('input');
            }
        }, {
            itemId: 'editSetupTax',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridSetupTax')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formSetupTax = Ext.getCmp('formSetupTax');
                    formSetupTax.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/SetupTax/1/setup',
                        params: {
                            extraparams: 'a.idtax:' + selectedRecord.data.idtax
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wSetupTax.show();
                    Ext.getCmp('statusformSetupTax').setValue('edit');
                }
            }
        }, {
            id: 'btnDeleteSetupTax',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridSetupTax')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/SetupTax/setup',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    idmenu:5
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (!d.success) {
                                        Ext.Msg.alert('Informasi', d.message);
                                    }
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                }
                            });
                            storeGridSetupTax.load();
                            // storeGridSetupTax.remove(sm.getSelection());
                            // sm.select(0);
                        }
                    }
                });
            },
            //                    disabled: true
        }, '->', 'Pencarian: ', ' ', {
            xtype: 'searchGridSetupTax',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridSetupTax, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSetupTax.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formSetupTax = Ext.getCmp('formSetupTax');
            wSetupTax.show();
            formSetupTax.getForm().load({
                url: SITE_URL + 'backend/loadFormData/SetupTax/1/setup',
                params: {
                    extraparams: 'a.idtax:' + record.data.idtax
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })
            
            storeGridLinkedAccTax.load({
                        params: {
                            'extraparams':'a.idtax:' + record.data.idtax
                        }
                    });

            Ext.getCmp('GridLinkedAccTax').setTitle('Hubungkan Akun Pencatatan '+record.data.nametax+' ke setiap Unit');
            Ext.getCmp('statusformSetupTax').setValue('edit');
        }
    }
});