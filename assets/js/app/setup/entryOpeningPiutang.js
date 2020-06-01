Ext.define('GridRegOpeningPiutangModel', {
    extend: 'Ext.data.Model',
    fields: ['idregistrasipiutang', 'idaccount', 'namecustomer','accnamepiutang', 'tglpiutang', 'accname', 'bulan', 'tahun', 'description', 'jumlah', 'sisapiutang', 'accnumberlink', 'accnamelink', 'namaunit'],
    idProperty: 'id'
});
var storeGridRegOpeningPiutang = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridRegOpeningPiutangModel',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/regPiutang/account',
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
// Ext.define('GridAkunPiutangModel', {
//     extend: 'Ext.data.Model',
//     fields: ['idregistrasiPiutang', 'idunit', 'jumlah', 'idsupplier', 'namesupplier', 'sisaPiutang', 'idjournal', 'memo', 'userin', 'datein', 'month', 'year', 'accPiutang', 'acckenaPiutang', 'namaunit', 'mulaiPiutang', 'jatuhtempo'],
//     idProperty: 'id'
// });
// var storeGridAkunPiutang = Ext.create('Ext.data.Store', {
//     pageSize: 100,
//     model: 'GridAkunPiutangModel',
//     proxy: {
//         type: 'ajax',
//         url: SITE_URL + 'backend/ext_get_all/AkunHutang/hutangpiutang',
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
// Ext.define('MY.searchGridAkunPiutang', {
//     extend: 'Ext.ux.form.SearchField',
//     alias: 'widget.searchGridAkunPiutang',
//     store: storeGridAkunPiutang,
//     width: 180
// });
// var smGridAkunPiutang = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridAkunPiutang.getSelection().length;
//             if (selectedLen == 0) {
//                 console.log(selectedLen);
//                 Ext.getCmp('btnDeleteAkunPiutang').disable();
//             }
//         },
//         select: function(model, record, index) {
//             Ext.getCmp('btnDeleteAkunPiutang').enable();
//         }
//     }
// });
Ext.define('GridAkunPiutang', {
    title: 'Daftar Akun Piutang',
    itemId: 'GridAkunPiutangID',
    id: 'GridAkunPiutangID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAkunPiutang',
    store: storeOpeningBal,
    loadMask: true,
    columns: [{
        header: 'idaccount',
        dataIndex: 'idaccount',
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
        header: 'Akun Piutang',
        dataIndex: 'accname',
        minWidth: 350
    }, {
        header: 'Saldo Akun Piutang',
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
                id: 'sisaSaldoOpeningPiutangField'
            }, {
                xtype: 'comboxunit',
                valueField: 'idunit',
                id: 'cbUnitOpeningPiutang',
                listeners: {
                    'change': function(field, newValue, oldValue) {
                       loadCoaPiutang()
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
                        loadCoaPiutang()
                    }
                }]
        },
        Ext.panel.Panel({
            html: '<p>Daftar Akun Piutang dibawah ini adalah saldo Piutang yang sebelumnya telah diisi pada menu Saldo Awal Akun</p>'
        }), {
            xtype: 'toolbar',
            dock: 'top',
            items: []
        }, {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [{
                xtype: 'displayfield',
                labelWidth: 330,
                fieldLabel: 'Sisa Saldo Piutang Yang Harus Disesuaikan Sejumlah',
                id: 'sisaSaldoOpeningPiutang'
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
                // storeGridAkunPiutang.load();
                loadCoaPiutang();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {}
    }
});
////////////////////////////////////////////////////////////////////////////////////////
Ext.define('MY.searchGridRegOpeningPiutang', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridRegOpeningPiutang',
    store: storeGridRegOpeningPiutang,
    width: 180
});
var smGridRegOpeningPiutang = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridRegOpeningPiutang.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteRegOpeningPiutang').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteRegOpeningPiutang').enable();
        }
    }
});
Ext.define('GridRegOpeningPiutang', {
    title: 'Registrasi Saldo Awal Piutang',
    itemId: 'GridRegOpeningPiutangID',
    id: 'GridRegOpeningPiutangID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridRegOpeningPiutang',
    store: storeGridRegOpeningPiutang,
    loadMask: true,
    columns: [{
            header: 'idregistrasipiutang',
            dataIndex: 'idregistrasipiutang',
            hidden: true
        }, {
            header: 'idaccount',
            dataIndex: 'idaccount',
            hidden: true
        },
        {header: 'Customer', dataIndex: 'namecustomer', minWidth: 150},
        {
            header: 'Akun Piutang',
            dataIndex: 'accnamepiutang',
            minWidth: 150
        }, {
            header: 'Akun Penerimaan Piutang',
            dataIndex: 'accname',
            minWidth: 190
        }, {
            header: 'Tgl piutang',
            dataIndex: 'tglpiutang',
            minWidth: 150
        }, {
            header: 'Jumlah Piutang',
            dataIndex: 'jumlah',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        }, {
            header: 'Sisa Piutang',
            dataIndex: 'sisapiutang',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        }, {
            header: 'Keterangan',
            dataIndex: 'description',
            minWidth: 550
        }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                var idunit = Ext.getCmp('cbUnitOpeningPiutang').getValue();
                if (idunit == null) {
                    Ext.Msg.alert('Failure', 'Pilih Unit terlebih dahulu!');
                } else {
                    wregPiutangOpening.show();
                    Ext.getCmp('statusformRegPiutangOpening').setValue('input');
                    Ext.getCmp('idunitRegPiutangOpening').setValue(idunit);
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
                            var grid = Ext.ComponentQuery.query('GridRegOpeningPiutang')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'setup/delOpeningPiutang',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected)
                                }
                            });
                            updateSaldoOpeningPiutang();
                            storeGridRegOpeningPiutang.remove(sm.getSelection());
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
            id: 'totalOpeningPiutang',
            value: '<font color=red>Saldo Piutang Belum Balance</font>'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridRegOpeningPiutang, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // storeGridRegOpeningPiutang.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {}
    }
});
Ext.define('OpeningPiutangPanel', {
    extend: 'Ext.panel.Panel',
    id: 'OpeningPiutangPanel',
    alias: 'widget.OpeningPiutangPanel',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [{
        xtype: 'GridAkunPiutang',
        height: heightPort + 30
    }, {
        xtype: 'GridRegOpeningPiutang',
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

function updateSaldoOpeningPiutang() {
    console.log('updateSaldoOpeningPiutang')
    Ext.Ajax.request({
        url: SITE_URL + 'setup/getTotalPiutang',
        method: 'POST',
        params: {
            idunit: Ext.getCmp('cbUnitOpeningPiutang').getValue()
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            var totalPiutang = 0;
            Ext.each(storeOpeningBal.data.items, function(obj, i) {
                console.log(obj.data.balance);
                totalPiutang += obj.data.balance * 1;
            });
            totalPiutang -= d.balance * 1;
            if (totalPiutang == 0) {
                Ext.getCmp('totalOpeningPiutang').setValue('<font color=green>Saldo Piutang Sudah Balance</font>')
            } else {
                Ext.getCmp('totalOpeningPiutang').setValue('<font color=red>Saldo Piutang Belum Balance</font>')
            }
            Ext.getCmp('sisaSaldoOpeningPiutang').setValue('<b>' + renderNomor(totalPiutang) + '</b>');
            Ext.getCmp('sisaSaldoOpeningPiutangField').setValue(renderNomor(totalPiutang));
        }
    });
}

function loadCoaPiutang(){
     storeOpeningBal.load({
            params: {
                'idunit': Ext.getCmp('cbUnitOpeningPiutang').getValue(),
                'idaccounttype': '2'
            },
            callback: function(r, options, success) {
                updateSaldoOpeningPiutang();
            }
        });
        storeGridRegOpeningPiutang.load({
            params: {
                'extraparams': 'a.idunit:' + Ext.getCmp('cbUnitOpeningPiutang').getValue()
            }
        });
}