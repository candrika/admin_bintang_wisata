

function WindowCetakTHR(pegid, idthr, debug)
{
    var periodepenggajian = str_replace(" ", "", periodepenggajian);
    var periodepenggajian = explode(",", periodepenggajian);

    var cmp = Ext.create('Ext.Component', {
        border: false,
        xtype: "component",
        autoEl: {
            tag: "iframe",
            src: SITE_URL + "penggajian/cetakTHR/" + idthr + "/" + pegid + '/' + debug
        }

    });

    var WindowCetakTHR = Ext.create('widget.window', {
        title: 'Slip THR',
        header: {
            titlePosition: 2,
            titleAlign: 'center'
        },
        closable: true,
        closeAction: 'hide',
        width: 900,
        minWidth: 450,
        height: sizeH,
        layout: 'fit',
        maximizable: true,
        border: false,
        items: [cmp]
        , listeners: {
            maximize: function(window, opts) {
                var the_iframe = cmp.getEl().dom;
                the_iframe.contentWindow.location.reload();
            },
            restore: function(window, opts) {
                var the_iframe = cmp.getEl().dom;
                the_iframe.contentWindow.location.reload();
            }
        }
    }).show();

}

Ext.define('GridDataTHRModel', {
    extend: 'Ext.data.Model',
    fields: ['idthr','idemployee','pengali','totalpendapatan','nametype','jumlahthr','thrtambahan','totalthr','code','lastname','namaunit'],
    idProperty: 'id'
});

var storeGridDataTHR = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridDataTHRModel',
    remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/griddataTHR/payroll',
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

storeGridDataTHR.on('beforeload', function (store, operation, eOpts) {
    operation.params = {
        'bulantahunpenggajian': convertDate(Ext.getCmp('periodepenggajianDataTHR').getSubmitValue())+','+convertDate(Ext.getCmp('periodepenggajianDataTHRend').getSubmitValue()),
        'extraparams': 'd.idunit:' + Ext.getCmp('idunitDataTHR').getValue() + ','
                + 'e.idemployeetype:' + Ext.getCmp('idemployeetypeDataTHR').getValue()
    }
});

Ext.define('MY.searchGridDataTHR', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridDataTHR',
    store: storeGridDataTHR,
    width: 180
});

var smGridDataTHR = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'MULTI',
    listeners: {
        deselect: function (model, record, index) {
            var selectedLen = smGridDataTHR.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('prosesGridDataTHR').disable();
            }
        },
        select: function (model, record, index) {
            // console.log(selectedLen);
            Ext.getCmp('prosesGridDataTHR').enable();
        }
    }
});

Ext.define(dir_sys + 'employee.GridDataTHR', {
    // renderTo:'mytabpanel',
    // layout:'fit',
//    selModel: smGridDataTHR,
    title: 'Data THR Karyawan',
    multiSelect: true,
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridDataTHRID',
    id: 'GridDataTHRID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridDataTHR',
    store: storeGridDataTHR,
    loadMask: true,
    columns: [
        {
            header: 'No',
            xtype: 'rownumberer',
            width: 30,
            sortable: false
        },
        {header: 'idemployee', dataIndex: 'idemployee',hidden:true},
        {header: 'idpayroll', dataIndex: 'idpayroll',hidden:true},
        {header: 'NIPEG', dataIndex: 'code', minWidth: 150},
        {header: 'Nama', dataIndex: 'lastname', minWidth: 150},
        {header: 'Jenis Pegawai', dataIndex: 'nametype', minWidth: 150},
        {header: 'Unit', dataIndex: 'namaunit', minWidth: 150},
        {header: 'totalpendapatan', dataIndex: 'totalpendapatan', xtype:'numbercolumn', align:'right',  minWidth: 150},
        {header: 'THR', dataIndex: 'jumlahthr', xtype:'numbercolumn', align:'right',  minWidth: 150},
        {header: 'Penambahan THR', dataIndex: 'thrtambahan', xtype:'numbercolumn', align:'right',  minWidth: 150},
        {header: 'Total THR', dataIndex: 'totalthr',  xtype:'numbercolumn', align:'right', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'comboxunit',
                    id: 'idunitDataTHR',
                    name: 'idunit',
                    labelWidth:60,
                    valueField: 'idunit',
                    displayField: 'namaunit',
                    listeners: {
                        select: function (combo, record, index) {
                            var aktifitaskodepenggajianGrid = combo.getValue();
                            storeGridDataTHR.load();
                        }
                    }
                }, {
                    xtype: 'comboxemployee',
                    id: 'idemployeetypeDataTHR',
                    name: 'idemployeetype',
                    valueField: 'idemployeetype',
                    displayField: 'nametype',
                    listeners: {
                        select: function (combo, record, index) {
                            var aktifitaskodepenggajianGrid = combo.getValue();
                            storeGridDataTHR.load();
                        }
                    }
                }, {
                    xtype: 'button',
                    text: 'Clear Filter',
                    tooltip: 'Clear Filter',
                    listeners: {
                        click: function () {
                            Ext.getCmp('idunitDataTHR').clearValue();
                            Ext.getCmp('idemployeetypeDataTHR').clearValue();
                            Ext.getCmp('namapegawaiTHRGrid').setValue(null);
                            Ext.getCmp('periodepenggajianDataTHR').setValue(null);
                            storeGridDataTHR.load();
                        }}
                },
               '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridDataTHR',
                    text: 'Left Button'
                }
            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridDataTHR, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }, {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'datefield',
                    format: 'd-m-Y',
                    labelWidth: 120,
                    allowBlank: false,
                    value: new Date(),
                    fieldLabel: 'Periode THR',
                    name: 'periodepenggajian',
                    id: 'periodepenggajianDataTHR',
                    // maxValue : new Date(),
                    listeners: {
                        'change': function (field, newValue, oldValue) {
                           storeGridDataTHR.load();
                        }
                    }
                },'s/d',
                {
                    xtype: 'datefield',
                    format: 'd-m-Y',
                    labelWidth: 120,
                    allowBlank: false,
                    value: new Date(),
                    name: 'periodepenggajianend',
                    id: 'periodepenggajianDataTHRend',
                    // maxValue : new Date(),
                    listeners: {
                        'change': function (field, newValue, oldValue) {
                           storeGridDataTHR.load();
                        }
                    }
                }                 
            ]
        },
         {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'filterGridDataTHR',
                    text: 'Cetak Slip THR',
                    iconCls: 'print-icon',
                    handler: function () {
                        var periodepenggajian = Ext.getCmp('periodepenggajianDataTHR').getSubmitValue();
                        // alert(periodepenggajian)
                        if (periodepenggajian == null || periodepenggajian == '')
                        {
                            Ext.Msg.alert('Failure', 'Pilih periode penggajian!');
                        } else {
                            var grid = Ext.ComponentQuery.query('GridDataTHR')[0];
                            var selectedRecord = grid.getSelectionModel().getSelection()[0];
                            var data = grid.getSelectionModel().getSelection();
                            if (data.length == 0)
                            {
                                Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                            } else {
                                WindowCetakTHR(selectedRecord.get('idemployee'), selectedRecord.get('idthr'), 4)
                            }
                        }



                    }
                }
//                 , {
//                     itemId: 'prosesGridDataTHR',
//                     id: 'prosesGridDataTHR',
//                     text: 'Hapus THR',
//                     iconCls: 'delete-icon',
// //                    disabled: true,
//                     handler: function (btn) {

//                         var grid = Ext.ComponentQuery.query('GridDataTHR')[0];
//                         var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                         var data = grid.getSelectionModel().getSelection();
//                         if (data.length == 0)
//                         {
//                             Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
//                         } else {
//                             Ext.MessageBox.confirm('Konfirmasi',
//                                     'Apakah anda yakin untuk menghapus THR pada data terpilih', prosesTHRKsoBtn);
//                         }
//                     }
//                 }
            ]
        }
    ]
    , listeners: {
        render: {
            scope: this,
            fn: function (grid) {
                storeGridDataTHR.load();
            }
        }
        // ,itemdblclick: function(dv, record, item, index, e) {
        //      console.log('itemdblclick'+record.data.idemployee)
        //      // WindowKaryawan(record.data.firstname,record.data.idemployee);
        //  }
        //  ,select: function(model, record, index) {
        //          console.log('selected'+record.data.idemployee);
        //          Ext.getCmp('prosesGridDataTHR').enable();
        //  }
        // ,rowclick: function(grid, idx){
        //     Ext.getCmp('prosesGridDataTHR').enable();
        // }
    }
});

function prosesTHRKsoBtn(btn) {
    var periodepenggajian = Ext.getCmp('periodepenggajian').getSubmitValue();

    if (periodepenggajian == null || periodepenggajian == '')
    {
        Ext.Msg.alert('Failure', 'Pilih periode penggajian!');
    } else {
        var grid = Ext.ComponentQuery.query('GridDataTHR')[0];
        var selectedRecord = grid.getSelectionModel().getSelection()[0];
        var data = grid.getSelectionModel().getSelection();
        if (data.length == 0)
        {
            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
        } else {
            if (btn == 'yes')
            {
//                WindowCetakTHR(selectedRecord.get('idemployee'), periodepenggajian, 3)
                var sm = grid.getSelectionModel();
                selected = [];
                Ext.each(sm.getSelection(), function (item) {
                    selected.push(item.data);
                });
//                             console.log(selected)

                Ext.Ajax.request({
                    url: SITE_URL + 'penggajian/proses',
                    method: 'POST',
                    params: {
                        prosesTHR: 1,
                        postdata: Ext.encode(selected),
                        bulantahun: Ext.getCmp('periodepenggajian').getValue()
//                        idunit: Ext.getCmp('idunit').getValue(),
//                        idemployeetype: Ext.getCmp('idemployeetype').getValue()
                    },
                    success: function (res) {
                        var res = Ext.JSON.decode(res.responseText);
                        Ext.Msg.alert('Proses THR', res.message);

                        storeGridDataTHR.load();
                    },
                    failure: function (res) {
                        Ext.Msg.alert('Proses THR Gagal', res.message);
                        box.hide();

                        storeGridDataTHR.load();
                    }
                });
            }
        }
    }

}