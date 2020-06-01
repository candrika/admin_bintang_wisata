var formInventoryOpening = Ext.create('Ext.form.Panel', {
    id: 'formInventoryOpening',
    // width: 750,
    // title: 'Data Persediaan',
    // height: 330,
    url: SITE_URL + 'inventory/SaveInventoryV2',
    bodyStyle: 'padding:5px',
    //    autoWidth:true,
    forceFit: true,
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        //        padding: '5 40 5 5',
        labelWidth: 190,
        width: 365
    },
    // layout: 'hbox',
    defaults: {
        // padding: '5 5 5 5',
        anchor: '100%'
    },
    items: [{
        xtype: 'container',
        layout: 'hbox',
        items: [{
                xtype: 'container',
                flex: 1,
                border: false,
                layout: 'anchor',
                defaultType: 'textfield',
                items: [
                {
                    xtype:'hiddenfield',
                    name:'persediaanawal',
                    value:'true'
                },{
                    xtype: 'fieldset',
                    title: 'Profil',
                    // collapsible: true,
                    items: [{
                        xtype: 'hiddenfield',
                        name: 'idInventoryOpening',
                        id: 'idInventoryOpeningInv'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'No Barang',
                        anchor: '100%',
                        allowBlank: false,
                        name: 'invno'
                    }, {
                        xtype: 'comboxunit',
                        readOnly:true,
                        allowBlank: false,
                        // labelWidth:230,
                        // width:500,
                        anchor: '100%',
                        multiSelect: true,
                        id: 'namaunitFormInvXOpening',
                        name: 'namaunit2[]'
                        // ,value: 'Unit 1, SMIP'
                        // ,value: ["Unit 1","SMIP"]
                        // value: 'Unit 1,SMIP'
                    }, {
                        xtype: 'textfield',
                        anchor: '100%',
                        fieldLabel: 'Nama Barang',
                        allowBlank: false,
                        name: 'nameinventory',
                        id: 'nameInventoryOpening'
                    }, {
                        xtype: 'comboxinventorycat',
                        anchor: '100%',
                        allowBlank: false,
                        name: 'namecat'
                    }, {
                        xtype: 'textareafield',
                        fieldLabel: 'Deskripsi',
                        anchor: '100%',
                        name: 'description'
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Status Persediaan'
                    }, {
                        xtype: 'checkboxgroup',
                        anchor: '100%',
                        columns: 2,
                        items: [{
                            xtype: 'checkboxfield',
                            name: 'cbdijual',
                            id: 'cbdijualOpening',
                            boxLabel: 'Untuk Dijual',
                            listeners: {
                                change: function() {
                                    if (this.getValue()) {
                                        Ext.getCmp('fieldsetInvSellOpening').setDisabled(false);
                                    } else {
                                        Ext.getCmp('fieldsetInvSellOpening').setDisabled(true);
                                    }
                                }
                            }
                        }, {
                            xtype: 'checkboxfield',
                            name: 'cbdibeli',
                            id: 'cbdibeliOpening',
                            padding: '0 0 0 -120',
                            boxLabel: 'Dibeli',
                            listeners: {
                                change: function() {
                                    // var val = Ext.getCmp('cbdibeliOpening').getValue();
                                    if (this.getValue()) {
                                        Ext.getCmp('fieldsetInvBuyOpening').setDisabled(false);
                                    } else {
                                        Ext.getCmp('fieldsetInvBuyOpening').setDisabled(true);
                                    }
                                }
                            }
                        }, {
                            xtype: 'checkboxfield',
                            name: 'cbpersediaan',
                            id: 'cbpersediaanOpening',
                            boxLabel: 'Untuk Persediaan',
                            listeners: {
                                change: function() {
                                    // var val = Ext.getCmp('cbpersediaanOpening').getValue();
                                    if (this.getValue()) {
                                        Ext.getCmp('fieldsetInvPersediaanOpening').setDisabled(false);
                                    } else {
                                        Ext.getCmp('fieldsetInvPersediaanOpening').setDisabled(true);
                                    }
                                }
                            }
                        }, {
                            xtype: 'checkboxfield',
                            name: 'nonaktif',
                            id: 'nonaktifOpening',
                            padding: '0 0 0 -120',
                            boxLabel: 'Tidak Aktif',
                            listeners: {
                                change: function() {}
                            }
                        }]
                    }]
                }, {
                    xtype: 'fieldset',
                    id: 'fieldsetInvSellOpening',
                    title: 'Penjualan',
                    // collapsible: true,
                    items: [{
                        xtype: 'hiddenfield',
                        name: 'incomeaccount',
                        id: 'incomeaccountSellIDOpening'
                    }, {
                        xtype: 'textfield',
                        anchor: '100%',
                        fieldLabel: 'Harga Dasar Penjualan',
                        name: 'sellingprice'
                    }, {
                        xtype: 'comboxtax',
                        anchor: '100%',
                        name: 'nametax',
                        fieldLabel: 'Pajak Penjualan'
                    }, {
                        xtype: 'textfield',
                        anchor: '100%',
                        fieldLabel: 'Satuan',
                        name: 'unitmeasuresell'
                    }]
                }] //end item container
            } //end xtype:container
            , {
                xtype: 'container',
                flex: 1,
                padding: '0 0 0 10',
                layout: 'anchor',
                defaultType: 'textfield',
                items: [{
                    xtype: 'fieldset',
                    id: 'fieldsetInvBuyOpening',
                    title: 'Pembelian',
                    // collapsible: true,
                    items: [{
                        xtype: 'hiddenfield',
                        name: 'cosaccount',
                        id: 'cosaccountBuyOpening'
                    }, {
                        xtype: 'textfield',
                        anchor: '100%',
                        fieldLabel: 'Harga Beli',
                        id: 'costInventoryOpening',
                        name: 'cost',
                        listeners: {
                            'render': function(c) {
                                c.getEl().on('keyup', function() {
                                    CalcPenyusutan('Opening');
                                }, c);
                            }
                        },
                    }, {
                        xtype: 'textfield',
                        anchor: '100%',
                        fieldLabel: 'Satuan',
                        name: 'unitmeasure'
                    }, {
                        xtype: 'comboxtax',
                        anchor: '100%',
                        name: 'nametaxbuy',
                        fieldLabel: 'Pajak Pembelian'
                    },
                    {
                        xtype:'textfield',
                        anchor: '100%',
                        fieldLabel: 'Supplier',
                        name:'namesupplier',
                        id:'namesupplierInventoryOpening',
                        listeners: {
                            render: function(component) {
                                component.getEl().on('click', function(event, el) {
                                    wSupplierInvOpeningPopup.show();
                                    storeGridSupplierInvOpening.load();
                                });
                            }
                        }
                    },
                    // {
                    //     xtype: 'comboxsupplier',
                    //     anchor: '100%'
                    // },
                     {
                        xtype: 'datefield',
                        anchor: '100%',
                        format: 'd/m/Y',
                        fieldLabel: 'Tgl Beli',
                        id: 'datebuyOpening',
                        name: 'datebuy'
                    }]
                }, {
                    xtype: 'fieldset',
                    title: 'Persediaan',
                    id: 'fieldsetInvPersediaanOpening',
                    // collapsible: true,
                    items: [{
                        xtype: 'numberfield',
                        anchor: '100%',
                        fieldLabel: 'Jumlah Stok',
                        id: 'qtystockInvOpening',
                        name: 'qtystock'
                    }, {
                        xtype: 'numberfield',
                        anchor: '100%',
                        fieldLabel: 'Nilai Residu',
                        listeners: {
                            'render': function(c) {
                                c.getEl().on('keyup', function() {
                                    CalcPenyusutan('Opening');
                                }, c);
                            }
                        },
                        id: 'residuOpening',
                        name: 'residu'
                    }, {
                        xtype: 'numberfield',
                        anchor: '100%',
                        fieldLabel: 'Umur Ekonomis (tahun)',
                        allowBlank: false,
                        id: 'umurEkonomisOpening',
                        name: 'umur',
                        listeners: {
                            'render': function(c) {
                                c.getEl().on('keyup', function() {
                                    CalcPenyusutan('Opening');
                                }, c);
                            },
                            change: function(txt, The, eOpts) {
                                CalcPenyusutan('Opening');
                            }
                        },
                    }, {
                        xtype: 'textfield',
                        style: 'text-align: right',
                        anchor: '98%',
                        hidden:true,
                        labelStyle: 'text-align:left',
                        // anchor: '9',
                        fieldLabel: 'Akumulasi Beban Berjalan',
                        id: 'akumulasibebanOpening',
                        allowBlank: false,
                        name: 'akumulasibeban',
                        // listeners: {
                        //     change: function(txt, The, eOpts){
                        //       this.setRawValue(renderNomor(this.getValue()));
                        //     }
                        // }
                    }, {
                        xtype: 'textfield',
                        hidden:true,
                        anchor: '98%',
                        style: 'text-align: right',
                        labelStyle: 'text-align:left',
                        fieldLabel: 'Beban Tahun Berjalan',
                        id: 'bebanberjalanOpening',
                        allowBlank: false,
                        name: 'bebanberjalan'
                    }, {
                        xtype: 'textfield',
                        hidden:true,
                        anchor: '98%',
                        style: 'text-align: right',
                        labelStyle: 'text-align:left',
                        fieldLabel: 'Nilai Buku Berjalan',
                        id: 'nilaibukuOpening',
                        readOnly: true,
                        allowBlank: false,
                        name: 'nilaibuku'
                    }, {
                        xtype: 'textfield',
                        hidden:true,
                        anchor: '98%',
                        style: 'text-align: right',
                        labelStyle: 'text-align:left',
                        fieldLabel: 'Beban Perbulan',
                        id: 'bebanperbulanOpening',
                        allowBlank: false,
                        readOnly: true,
                        name: 'bebanperbulan'
                    }, {
                        xtype: 'textfield',
                        hidden:true,
                        anchor: '98%',
                        style: 'text-align: right',
                        labelStyle: 'text-align:left',
                        fieldLabel: 'Penyusutan Setelah Habis Usia',
                        id: 'akumulasiAkhirOpening',
                        allowBlank: false,
                        readOnly: true,
                        name: 'akumulasiakhir'
                    }]
                },
                {
                    xtype: 'fieldset',
                    title: 'Akun Persediaan',
                    id: 'fieldsetInvAkunPersediaanOpening',
                    items: [
                            {
                                xtype: 'hiddenfield',
                                id: 'assetaccountOpening',
                                name: 'assetaccount',
                                readOnly: true
                            }, {
                                xtype: 'textfield',
                                anchor: '100%',
                                allowBlank: false,
                                readOnly:true,
                                fieldLabel: 'Akun Asset (Harta)',
                                name: 'accname',
                                id: 'accnameAssetOpening',
                                listeners: {
                                    render: function(component) {
                                        // component.getEl().on('click', function(event, el) {
                                        //     AccLinkedInventoryOpeningAsset.show();
                                        //     storeAccountAktive.load({
                                        //         params: {
                                        //             'idunit': Ext.getCmp('cbUnitOpeningPersediaan').getValue()
                                        //         }
                                        //     });
                                        // });
                                    }
                                }
                            }, {
                                xtype: 'hiddenfield',
                                id: 'akumpenyusutaccountOpening',
                                name: 'akumpenyusutaccount',
                                readOnly: true
                            }, {
                                xtype: 'textfield',
                                anchor: '100%',
                                allowBlank: false,
                                fieldLabel: 'Akun Akumulasi Depresiasi',
                                name: 'accnamePenyusutan',
                                id: 'accnamePenyusutanOpening',
                                listeners: {
                                    render: function(component) {
                                        component.getEl().on('click', function(event, el) {
                                            AccLinkedInventoryOpeningAkumulasi.show();
                                            storeAccountAktive.load({
                                                params: {
                                                    'idunit': Ext.getCmp('cbUnitOpeningPersediaan').getValue()
                                                }
                                            });
                                        });
                                    }
                                }
                            }, {
                                xtype: 'hiddenfield',
                                id: 'depresiasiaccountOpening',
                                name: 'depresiasiaccount',
                                readOnly: true
                            }, {
                                xtype: 'textfield',
                                anchor: '100%',
                                allowBlank: false,
                                fieldLabel: 'Akun Beban Depresiasi',
                                name: 'accnameDepresiasi',
                                id: 'accnameDepresiasiOpening',
                                listeners: {
                                    render: function(component) {
                                        component.getEl().on('click', function(event, el) {
                                            AccLinkedInventoryOpeningBeban.show();
                                            storeAccountAktive.load({
                                                params: {
                                                    'idunit': Ext.getCmp('cbUnitOpeningPersediaan').getValue()
                                                }
                                            });
                                        });
                                    }
                                }
                            }
                    ]
                }
                ]
            }
        ]
    }]
});
Ext.define('TabItemInventoryOpening', {
    extend: 'Ext.panel.Panel',
    id: 'TabItemInventoryOpening',
    alias: 'widget.TabItemInventoryOpening',
    activeTab: 0,
    // autoWidth: '90%',
    autoScroll: true,
    defaults: {
        autoScroll: true,
        // bodyPadding: '1 0 15 0'
    },
    items: [
        formInventoryOpening
    ]
});
Ext.define('WindowInventoryOpening', {
    extend: 'Ext.window.Window',
    title: 'Data Persediaan',
    id: 'WindowInventoryOpening',
    alias: 'widget.WindowInventoryOpening',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    width: 850,
    // minWidth: 650,
    height: 520,
    //    maximizable: true,
    border: false,
    autoScroll: true,
    bodyStyle: 'padding-right: 0px',
    items: [{
        xtype: 'TabItemInventoryOpening'
    }],
    buttons: [{
        text: 'Tutup',
        handler: function() {
            var win = Ext.getCmp('WindowInventoryOpening');
            Ext.getCmp('formInventoryOpening').getForm().reset();
            win.hide();
        }
    }, {
        text: 'Simpan',
        handler: function() {
            var form = Ext.getCmp('formInventoryOpening').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        if (!action.result.success) {
                            Ext.Msg.alert('Info', action.result.message);
                        } else {
                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formInventoryOpening').getForm().reset();
                            Ext.getCmp('WindowInventoryOpening').hide();

                            var grid = Ext.ComponentQuery.query('GridAkunPersediaan')[0];
                            var selectedRecord = grid.getSelectionModel().getSelection()[0];
                            var data = grid.getSelectionModel().getSelection();
                            storeGridRegOpeningPersediaan.load({
                                params: {
                                     'extraparams': 'a.assetaccount:' + selectedRecord.data.idaccount+','+'a.idunit:' + selectedRecord.data.idunit
                                }
                            });
                            updateSaldoOpeningPersediaan();
                        }
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridInventoryV2.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
var WindowInventoryOpening = Ext.create('WindowInventoryOpening');