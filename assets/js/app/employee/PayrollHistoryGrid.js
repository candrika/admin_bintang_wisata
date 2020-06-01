Ext.define('PayrollHistoryGridModel', {
   extend: 'Ext.data.Model',
    fields: ['idemployee','norek','penambahangaji','namabank','idemployeetype','premiinsurance','idaccount','idaccountpayroll','accname','accname','firstname','lastname','namaunit','nametype','jumlahjam','jumlahkehadiran','totalgaji','totaltunjangan','pph21','totalpotongan','totalpembayaran','payname','userin','code','jenispph21','month','year','idunit','idpayroll'],
    idProperty: 'id'
});

var storePayrollHistoryGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'PayrollHistoryGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/griddatagaji/payroll',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        }
    },
    sorters: [{
            property: 'menu_name',
            direction: 'DESC'
        }]
});



Ext.define('MY.searchPayrollHistoryGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchPayrollHistoryGrid',
    store: storePayrollHistoryGrid,
    width: 180
});

var smPayrollHistoryGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smPayrollHistoryGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteReceiveMoneySiswa').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteReceiveMoneySiswa').enable();
        }
    }
});

Ext.define(dir_sys + 'employee.PayrollHistoryGrid', {
    title: 'Riwayat Pembayaran Gaji',
    itemId: 'PayrollHistoryGridID',
    id: 'PayrollHistoryGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.PayrollHistoryGrid',
    store: storePayrollHistoryGrid,
    loadMask: true,
    columns: [
         {header: 'idemployee', dataIndex: 'idemployee',hidden:true},
        {header: 'idprosesgaji', dataIndex: 'idprosesgaji',hidden:true},
        {header: 'month', dataIndex: 'month',hidden:true},
        {header: 'year', dataIndex: 'year',hidden:true},
        {header: 'Jenis Pembayaran', dataIndex: 'payname', minWidth: 150},
        {header: 'Jumlah Jam', dataIndex: 'jumlahjam', minWidth: 150},
        {header: 'Jumlah Kehadiran', dataIndex: 'jumlahkehadiran', minWidth: 150},       
        {header: 'Gaji', dataIndex: 'totalgaji', xtype:'numbercolumn', align:'right',  minWidth: 150},
        {header: 'Penambahan Gaji', dataIndex: 'penambahangaji', xtype:'numbercolumn', align:'right',  minWidth: 150},
        {header: 'Total Tunjangan', dataIndex: 'totaltunjangan',  xtype:'numbercolumn', align:'right', minWidth: 150},
        {header: 'Total Potongan', dataIndex: 'totalpotongan',  xtype:'numbercolumn', align:'right', minWidth: 150},
        {header: 'Jenis PPH', dataIndex: 'jenispph21', minWidth: 50},
        {header: 'PPH21', dataIndex: 'pph21', xtype:'numbercolumn', align:'right',  minWidth: 150},
        {header: 'Total pembayaran', dataIndex: 'totalpembayaran', xtype:'numbercolumn', align:'right', Width: 200},
        {header: 'No rekening', dataIndex: 'norek', minWidth: 150},
        {header: 'Nama bank', dataIndex: 'namabank', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'datefield',
                    format: 'F, Y',
                    labelWidth: 120,
                    allowBlank: false,
                    value: new Date(),
                    fieldLabel: 'Periode Penggajian',
                    name: 'PayrollHistoryPeriod',
                    id: 'PayrollHistoryPeriod',
                    // maxValue : new Date(),
                    listeners: {
                        'change': function (field, newValue, oldValue) {
                           storePayrollHistoryGrid.load();
                        }
                    }
                }, 
                {
                    itemId: 'filterPayrollHistory',
                    text: 'Cetak Slip Gaji',
                    iconCls: 'print-icon',
                    handler: function () {
                        var periodepenggajian = Ext.getCmp('PayrollHistoryPeriod').getSubmitValue();
                        // alert(periodepenggajian)
                        if (periodepenggajian == null || periodepenggajian == '')
                        {
                            Ext.Msg.alert('Failure', 'Pilih periode penggajian!');
                        } else {
                            var grid = Ext.ComponentQuery.query('PayrollHistoryGrid')[0];
                            var selectedRecord = grid.getSelectionModel().getSelection()[0];
                            var data = grid.getSelectionModel().getSelection();
                            if (data.length == 0)
                            {
                                Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                            } else {
                                WindowCetakGaji(selectedRecord.get('idemployee'), selectedRecord.get('month'), selectedRecord.get('year'), 4)
                            }
                        }



                    }
                }, {
                    itemId: 'delPayrollHistory',
                    id: 'delPayrollHistory',
                    text: 'Hapus Gaji',
                    iconCls: 'delete-icon',
//                    disabled: true,
                    handler: function (btn) {

                        var grid = Ext.ComponentQuery.query('PayrollHistoryGrid')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            Ext.MessageBox.confirm('Konfirmasi',
                                    'Apakah anda yakin untuk menghapus gaji pada data terpilih', prosesGajiKsoBtn);
                        }
                    }
                },
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchPayrollHistoryGrid',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storePayrollHistoryGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storePayrollHistoryGrid.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

        }
    }
});