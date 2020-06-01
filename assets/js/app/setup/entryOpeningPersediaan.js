Ext.define('GridRegOpeningPersediaanModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory', 'invno', 'nameinventory', 'saldopersediaan','description', 'isinventory', 'issell', 'isbuy', 'cosaccount',
        'incomeaccount', 'assetaccount', 'qtystock', 'images', 'cost', 'unitmeasure', 'numperunit', 'minstock', 'idprimarysupplier',
        'sellingprice', 'idselingtax', 'unitmeasuresell', 'numperunitsell', 'notes', 'display', 'namesupplier', 'yearbuy', 'monthbuy', 'datebuy','namaunit'],
    idProperty: 'id'
});
var storeGridRegOpeningPersediaan = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridRegOpeningPersediaanModel',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/InventoryAll/inventory',
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
//////////////////////////////////////////////////////////////////////////////////////////////
// Ext.define('GridAkunPersediaanModel', {
//     extend: 'Ext.data.Model',
//     fields: ['idregistrasiPersediaan', 'idunit', 'jumlah', 'idsupplier', 'namesupplier', 'sisaPersediaan', 'idjournal', 'memo', 'userin', 'datein', 'month', 'year', 'accPersediaan', 'acckenaPersediaan', 'namaunit', 'mulaiPersediaan', 'jatuhtempo'],
//     idProperty: 'id'
// });
// var storeGridAkunPersediaan = Ext.create('Ext.data.Store', {
//     pageSize: 100,
//     model: 'GridAkunPersediaanModel',
//     proxy: {
//         type: 'ajax',
//         url: SITE_URL + 'backend/ext_get_all/AkunHutang/hutangPersediaan',
//         actionMethods: 'POST',
//         reader: {
//             root: 'rows',
//             totalProperty: 'results'
//         },
//         //simpleSortMode: true
//     },
//     sorters: [{
//         property: 'menu_name',
//         direction: 'DESC'
//     }]
// });
// Ext.define('MY.searchGridAkunPersediaan', {
//     extend: 'Ext.ux.form.SearchField',
//     alias: 'widget.searchGridAkunPersediaan',
//     store: storeGridAkunPersediaan,
//     width: 180
// });
// var smGridAkunPersediaan = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridAkunPersediaan.getSelection().length;
//             if (selectedLen == 0) {
//                 console.log(selectedLen);
//                 Ext.getCmp('btnDeleteAkunPersediaan').disable();
//             }
//         },
//         select: function(model, record, index) {
//             Ext.getCmp('btnDeleteAkunPersediaan').enable();
//         }
//     }
// });
Ext.define('GridAkunPersediaan', {
    title: 'Daftar Akun Persediaan',
    itemId: 'GridAkunPersediaanID',
    id: 'GridAkunPersediaanID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAkunPersediaan',
    store: storeOpeningBal,
    loadMask: true,
    columns: [{
        header: 'idaccount',
        dataIndex: 'idaccount',
        hidden: true
    },{
        header: 'idunit',
        dataIndex: 'idunit',
        hidden: true
    }, {
        header: 'Unit',
        hidden: true,
        dataIndex: 'namaunit',
        minWidth: 250
    },{
        header: 'No Akun',
        dataIndex: 'accnumber',
        minWidth: 150
    }, {
        header: 'Nama Akun',
        dataIndex: 'accname',
        minWidth: 450
    }, {
        header: 'Saldo Akun Persediaan',
        dataIndex: 'balance',
        flex: 1,
        minWidth: 350,
        xtype: 'numbercolumn',
        align: 'right'
    }],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'hiddenfield',
                id: 'sisaSaldoOpeningPersediaanField'
            }, {
                xtype: 'comboxunit',
                valueField: 'idunit',
                id: 'cbUnitOpeningPersediaan',
                listeners: {
                    'change': function(field, newValue, oldValue) {
                        loadCoaPersediaan()
                        
                        //       
                        // Ext.Ajax.request({
                        //     url: SITE_URL + 'setup/getLastPeriode',
                        //     method: 'POST',
                        //     params: {
                        //         idunit: Ext.getCmp('cbUnitEntryOpeningBalance').getValue()
                        //     },
                        //     success: function(form, action) {
                        //         var d = Ext.decode(form.responseText);
                        //         if(d.udahinput)
                        //         {
                        //             Ext.Msg.alert('Perhatian', d.msg);
                        //         }
                        //         Ext.getCmp('openingdate').setValue('<b>' + d.date + '</b>');
                        //         Ext.getCmp('prevmonth').setValue(d.date2);
                        //     }
                        // });
                    }
                }
            },
                {
                    text: 'Refresh Akun',
                    handler: function(v){
                        loadCoaPersediaan()
                    }
                }
            ]
        },
        Ext.panel.Panel({
            html: '<p>Daftar Akun Persediaan dibawah ini adalah saldo Persediaan yang sebelumnya telah diisi pada menu Saldo Awal Akun</p>'
        }), {
            xtype: 'toolbar',
            dock: 'top',
            items: []
        }, {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [{
                xtype: 'displayfield',
                labelWidth: 360,
                fieldLabel: 'Sisa Saldo Persediaan Yang Harus Disesuaikan Sejumlah',
                id: 'sisaSaldoOpeningPersediaan'
            }]
        }
        // , {
        //     xtype: 'pagingtoolbar',
        //     store: storeOpeningBal, // same store GridPanel is using
        //     dock: 'bottom',
        //     displayInfo: true
        //     // pageSize:20
        // }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                loadCoaPersediaan();
                // storeGridAkunPersediaan.load();
            }
        },
        itemclick: function(dv, record, item, index, e) {
            // console.log(record.data.payname)
                storeGridRegOpeningPersediaan.load({
                    params: {
                        'extraparams': 'a.assetaccount:' + record.data.idaccount+','+'a.idunit:' + record.data.idunit
                    }
                });

                Ext.getCmp('GridRegOpeningPersediaanID').setTitle('Registrasi Saldo Awal '+record.data.accname);
            }
    }
});
////////////////////////////////////////////////////////////////////////////////////////
Ext.define('MY.searchGridRegOpeningPersediaan', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridRegOpeningPersediaan',
    store: storeGridRegOpeningPersediaan,
    width: 180
});
var smGridRegOpeningPersediaan = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridRegOpeningPersediaan.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteRegOpeningPersediaan').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteRegOpeningPersediaan').enable();
        }
    }
});
Ext.define('GridRegOpeningPersediaan', {
    title: 'Registrasi Saldo Awal Persediaan',
    itemId: 'GridRegOpeningPersediaanID',
    id: 'GridRegOpeningPersediaanID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridRegOpeningPersediaan',
    store: storeGridRegOpeningPersediaan,
    loadMask: true,
    columns: [ {header: 'idinventory', dataIndex: 'idinventory', hidden: true},
        {header: 'No Barang', dataIndex: 'invno', minWidth: 100},
        // {header: 'Unit', dataIndex: 'namaunit', minWidth: 100},
        {header: 'Nama', dataIndex: 'nameinventory', minWidth: 300},
        {header: 'Qty', dataIndex: 'qtystock', minWidth: 150, align: 'right'},
        // {header: 'Satuan', dataIndex: 'unitmeasure', minWidth: 100},
        {header: 'Harga Beli', dataIndex: 'cost', minWidth: 180, xtype: 'numbercolumn', align: 'right'},
        {header: 'Saldo Persediaan', dataIndex: 'saldopersediaan', minWidth: 180, xtype: 'numbercolumn', align: 'right'},
        // {header: 'Harga Jual', dataIndex: 'sellingprice', minWidth: 100, xtype: 'numbercolumn', align: 'right'},
        // {header: 'Stok Minimum', dataIndex: 'minstock', minWidth: 110},
        // {header: 'Tahun Pembelian', dataIndex: 'yearbuy', minWidth: 130}
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Tambah Persediaan',
            iconCls: 'add-icon',
            handler: function() {
                var idunit = Ext.getCmp('cbUnitOpeningPersediaan').getValue();
                if (idunit == null) {
                    Ext.Msg.alert('Failure', 'Pilih Unit terlebih dahulu!');
                } else {
                     var grid = Ext.ComponentQuery.query('GridAkunPersediaan')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Akun Persediaan terlebih dahulu!');
                        } else {

                            // showEditInv(selectedRecord.data.idinventory);
                            // if(selectedRecord.data.qtystock==null)
                            // {
                            //     Ext.getCmp('formInventoryV2').getForm().findField('cbpersediaan').hide();
                            //     Ext.getCmp('fieldsetInvPersediaan').hide();
                            //     Ext.getCmp('TabItemInventory').items.getAt(1).setDisabled(false);
                            // } else {
                            //     Ext.getCmp('formInventoryV2').getForm().findField('cbpersediaan').show();
                            //     Ext.getCmp('fieldsetInvPersediaan').show();
                            //     Ext.getCmp('TabItemInventory').items.getAt(1).setDisabled(false);
                            // }
                            
                            // // Ext.getCmp('statusformInventory').setValue('edit');
                            // storeGridAccInv.load({
                            //     params: {
                            //       'extraparams': 'idinventory:'+selectedRecord.data.idinventory
                            //     }
                            // });
                            if(selectedRecord.data.balance==0)
                            {
                                Ext.Msg.alert('Informasi', 'Tidak bisa input persediaan karena Akun <b>'+selectedRecord.data.accname+'</b> sudah bernilai 0');
                            } else {
                                Ext.Ajax.request({
                                    url: SITE_URL + 'setup/getNamaUnit',
                                    method: 'POST',
                                    params: {
                                        idunit: idunit
                                    },
                                    success: function(form, action) {
                                        var d = Ext.decode(form.responseText);
                                        WindowInventoryOpening.show();
                                        Ext.getCmp('assetaccountOpening').setValue(selectedRecord.data.idaccount);
                                        Ext.getCmp('accnameAssetOpening').setValue(selectedRecord.data.accname);
                                        var iValues = []; 
                                        iValues.push(d.namaunit); 
                                        Ext.getCmp('namaunitFormInvXOpening').setValue(iValues);
                                    }
                                });
                               
                            }
                            
                        }
                    
                    // console.log('wregPersediaanOpening')
                    // wregPersediaanOpening.show();
                    // Ext.getCmp('statusformRegPersediaanOpening').setValue('input');
                    // Ext.getCmp('idunitRegPersediaanOpening').setValue(idunit);
                }
            }
        }, {
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridRegOpeningPersediaan')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'setup/delOpeningPersediaan',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected)
                                }
                            });
                            updateSaldoOpeningPersediaan();
                            storeGridRegOpeningPersediaan.remove(sm.getSelection());
                            sm.select(0);
                        }
                    }
                });
            },
            //                    disabled: true
        }]
    }, {
        xtype: 'toolbar',
        dock: 'bottom',
        items: [{
            xtype: 'displayfield',
            labelWidth: 40,
            fieldLabel: 'Status',
            id: 'totalOpeningPersediaan',
            value: '<font color=red>Saldo Persediaan Belum Balance</font>'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridRegOpeningPersediaan, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // storeGridRegOpeningPersediaan.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {}
    }
});
Ext.define('OpeningPersediaanPanel', {
    extend: 'Ext.panel.Panel',
    id: 'OpeningPersediaanPanel',
    alias: 'widget.OpeningPersediaanPanel',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [{
        xtype: 'GridAkunPersediaan',
        height: heightPort + 30
    }, {
        xtype: 'GridRegOpeningPersediaan',
        height: heightPort + 30
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // disableUnitInventory();
            }
        }
    }
});

function updateSaldoOpeningPersediaan() {
    // console.log('updateSaldoOpeningPersediaan')
    Ext.Ajax.request({
        url: SITE_URL + 'setup/getTotalPersediaan',
        method: 'POST',
        params: {
            idunit: Ext.getCmp('cbUnitOpeningPersediaan').getValue()
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            var totalPersediaan = 0;
            
            // console.log(storeOpeningBal.data.items)

            Ext.each(storeOpeningBal.data.items, function(obj, i) {
                // console.log('totalPersediaan'+totalPersediaan);
                totalPersediaan += obj.data.balance * 1;
            });
            totalPersediaan -= d.balance * 1;
            // console.log('akhir'+totalPersediaan);
            if (totalPersediaan == 0) {
                Ext.getCmp('totalOpeningPersediaan').setValue('<font color=green>Saldo Persediaan Sudah Balance</font>')
            } else {
                Ext.getCmp('totalOpeningPersediaan').setValue('<font color=red>Saldo Persediaan Belum Balance</font>')
            }
            Ext.getCmp('sisaSaldoOpeningPersediaan').setValue('<b>' + renderNomor(totalPersediaan) + '</b>');
            Ext.getCmp('sisaSaldoOpeningPersediaanField').setValue(renderNomor(totalPersediaan));
        }
    });
}

function loadCoaPersediaan(){
    storeOpeningBal.load({
                            params: {
                                'idunit': Ext.getCmp('cbUnitOpeningPersediaan').getValue(),
                                'idaccounttype': '20,4'
                            },
                            callback: function(r, options, success) {
                                updateSaldoOpeningPersediaan();
                            }
                        });
}