Ext.define('GridRegOpeningHutangModel', {
    extend: 'Ext.data.Model',
    fields: ['idregistrasihutang', 'idunit', 'jumlah', 'idsupplier', 'namesupplier', 'sisahutang', 'idjournal', 'memo', 'userin', 'datein', 'month', 'year', 'acchutang', 'acckenahutang', 'namaunit', 'mulaihutang', 'jatuhtempo'],
    idProperty: 'id'
});
var storeGridRegOpeningHutang = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridRegOpeningHutangModel',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/RegHutang/hutangpiutang',
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

Ext.define('GridAkunHutangModel', {
    extend: 'Ext.data.Model',
    fields: ['idregistrasihutang', 'idunit', 'jumlah', 'idsupplier', 'namesupplier', 'sisahutang', 'idjournal', 'memo', 'userin', 'datein', 'month', 'year', 'acchutang', 'acckenahutang', 'namaunit', 'mulaihutang', 'jatuhtempo'],
    idProperty: 'id'
});
var storeGridAkunHutang = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridAkunHutangModel',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/AkunHutang/hutangpiutang',
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
Ext.define('MY.searchGridAkunHutang', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridAkunHutang',
    store: storeGridAkunHutang,
    width: 180
});
var smGridAkunHutang = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridAkunHutang.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteAkunHutang').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteAkunHutang').enable();
        }
    }
});
Ext.define('GridAkunHutang', {
    title: 'Daftar Akun Hutang',
    itemId: 'GridAkunHutangID',
    id: 'GridAkunHutangID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAkunHutang',
    store: storeOpeningBal,
    loadMask: true,
    columns: [{
        header: 'idaccount',
        dataIndex: 'idaccount',
        hidden: true
    }, {
        header: 'Unit',
        hidden:true,
        dataIndex: 'namaunit',
        minWidth: 250
    }, {
        header: 'Akun Hutang',
        dataIndex: 'accname',
        minWidth: 350
    }, {
        header: 'Saldo Akun Hutang',
        dataIndex: 'balance',
        flex: 1,
        minWidth: 350,
        xtype: 'numbercolumn',
        align: 'right'
    }],
    dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype:'hiddenfield',
                            id:'sisaSaldoOpeningHutangField'
                        },
                        {
                            xtype: 'comboxunit',
                            valueField: 'idunit',
                            id: 'cbUnitOpeningHutang',
                            listeners: {
                                'change': function(field, newValue, oldValue) {

                //       
                                    loadCoaHutang()
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
                                loadCoaHutang()
                            }
                        }
                    ]
                },
        Ext.panel.Panel({
            html: '<p>Daftar Akun Hutang dibawah ini adalah saldo hutang yang sebelumnya telah diisi pada menu Saldo Awal Akun</p>'
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
                fieldLabel: 'Sisa Saldo Hutang Yang Harus Disesuaikan Sejumlah',
                id: 'sisaSaldoOpeningHutang'
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
                storeGridAkunHutang.load();
                loadCoaHutang()
            }
        },
        itemdblclick: function(dv, record, item, index, e) {}
    }
});
////////////////////////////////////////////////////////////////////////////////////////

Ext.define('MY.searchGridRegOpeningHutang', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridRegOpeningHutang',
    store: storeGridRegOpeningHutang,
    width: 180
});
var smGridRegOpeningHutang = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridRegOpeningHutang.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteRegOpeningHutang').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteRegOpeningHutang').enable();
        }
    }
});
Ext.define('GridRegOpeningHutang', {
    title: 'Registrasi Saldo Awal Hutang',
    itemId: 'GridRegOpeningHutangID',
    id: 'GridRegOpeningHutangID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridRegOpeningHutang',
    store: storeGridRegOpeningHutang,
    loadMask: true,
    columns: [{
        header: 'idregistrasihutang',
        dataIndex: 'idregistrasihutang',
        hidden: true
    }, {
        header: 'idaccount',
        dataIndex: 'idaccount',
        hidden: true
    }, {
        header: 'Unit',
        dataIndex: 'namaunit',
        minWidth: 150
    }, {
        header: 'Supplier',
        dataIndex: 'namesupplier',
        minWidth: 150
    }, {
        header: 'Memo',
        dataIndex: 'memo',
        minWidth: 150
    }, {
        header: 'Akun Hutang',
        dataIndex: 'acchutang',
        minWidth: 150
    },{
        header: 'Akun Kena Hutang',
        dataIndex: 'acckenahutang',
        minWidth: 150
    }, {
        header: 'Jumlah Hutang',
        dataIndex: 'jumlah',
        minWidth: 150,
        xtype: 'numbercolumn',
        align: 'right'
    }, {
        header: 'Mulai Hutang',
        dataIndex: 'mulaihutang',
        minWidth: 150
    }, {
        header: 'Jatuh Tempo',
        dataIndex: 'jatuhtempo',
        minWidth: 150
    }, ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
               var idunit = Ext.getCmp('cbUnitOpeningHutang').getValue();
                if (idunit==null)
                {
                    Ext.Msg.alert('Failure', 'Pilih Unit terlebih dahulu!');
                } else {
                    wRegHutangOpening.show();
                    Ext.getCmp('statusformRegHutangOpening').setValue('input');
                    Ext.getCmp('idunitRegHutangOpening').setValue(idunit);

                    
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
                            var grid = Ext.ComponentQuery.query('GridRegOpeningHutang')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'setup/delOpeningHutang',
                                method: 'POST',
                                params: {postdata: Ext.encode(selected)}
                            });
                            updateSaldoOpeningHutang();
                            storeGridRegOpeningHutang.remove(sm.getSelection());
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
            id: 'totalOpeningHutang',
            value:'<font color=red>Saldo Hutang Belum Balance</font>'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridRegOpeningHutang, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // storeGridRegOpeningHutang.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {}
    }
});
Ext.define('OpeningHutangPanel', {
    extend: 'Ext.panel.Panel',
    id: 'OpeningHutangPanel',
    alias: 'widget.OpeningHutangPanel',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [{
        xtype: 'GridAkunHutang',
        height: heightPort + 30
    }, {
        xtype: 'GridRegOpeningHutang',
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

function updateSaldoOpeningHutang()
{
    // console.log('updateSaldoOpeningHutang')
     Ext.Ajax.request({
            url: SITE_URL + 'setup/getTotalHutang',
            method: 'POST',
            params: {
                idunit: Ext.getCmp('cbUnitOpeningHutang').getValue()
            },
            success: function(form, action) {

                var d = Ext.decode(form.responseText);

                var totalHutang=0;
                Ext.each(storeOpeningBal.data.items, function(obj, i) {
                    console.log(obj.data.balance);
                    totalHutang += obj.data.balance * 1;
                });
                
                totalHutang-=d.balance*1;
                if(totalHutang==0)
                {
                    Ext.getCmp('totalOpeningHutang').setValue('<font color=green>Saldo Hutang Sudah Balance</font>')
                } else {
                    Ext.getCmp('totalOpeningHutang').setValue('<font color=red>Saldo Hutang Belum Balance</font>')
                }
                Ext.getCmp('sisaSaldoOpeningHutang').setValue('<b>'+renderNomor(totalHutang)+'</b>');
                Ext.getCmp('sisaSaldoOpeningHutangField').setValue(renderNomor(totalHutang));
            }
        });
}

function loadCoaHutang(){

        storeOpeningBal.load({
            params: {
                'idunit': Ext.getCmp('cbUnitOpeningHutang').getValue(),
                'idaccounttype': '9,18'
            },
            callback : function(r, options, success) {
               updateSaldoOpeningHutang();
              
            }
        });

        storeGridRegOpeningHutang.load({
            params: {
                'extraparams':'a.idunit:'+Ext.getCmp('cbUnitOpeningHutang').getValue()
            }
        });
}