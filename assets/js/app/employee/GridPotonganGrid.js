
Ext.define('GridPotonganGridModel', {
    extend: 'Ext.data.Model',
    fields: ['idpotongan','namepotongan','amounttype','namasiklus','jenispotongan','idemployee','startdate','enddate','totalpotongan','sisapotongan','jumlahpotongan','idemployee','jumlahangsuran','keterangan'],
    idProperty: 'id'
});
var storeGridPotonganGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPotonganGridModel',
    remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/PotonganGrid/employee',
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


var formPotonganGrid = Ext.create('Ext.form.Panel', {
    id: 'formPotonganGrid',
    autoWidth: true,
    autoHeight: true,
    url: SITE_URL + 'backend/saveform/PotonganGrid/employee',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 160,
        width: 400
    },
    items: [{
            xtype: 'hiddenfield',
            name: 'statusformPotonganGrid',
            id: 'statusformPotonganGrid'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idpotongan',
            name: 'idpotongan'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idemployee',
            name: 'idemployee',
            id: 'idemployeePotonganGrid'
        },
        {
            xtype: 'comboxpotongantype',
            name:'idpotongantype',
            listeners: {
                change: function(field, value) {
                     Ext.getCmp('totalpotongan').setFieldLabel('Jumlah Potongan');

                                Ext.getCmp('jumlahangsuran').hide();
                                Ext.getCmp('jumlahpotongan').hide();
                                Ext.getCmp('jumlahpotongan').hide();

                                Ext.getCmp('akhirpotongan').show();
                                Ext.getCmp('sikluspotongan').show();
                    // alert(value)
                    // Ext.Ajax.request({
                    //     url: SITE_URL + 'masterdata/getjenispotongan',
                    //     method: 'GET',
                    //     params: {
                    //         potongantype: value
                    //     },
                    //     success: function (res) {
                    //         var res = Ext.JSON.decode(res.responseText);
                    //         if(res.jenispotongan=='Pinjaman')
                    //         {
                    //             Ext.getCmp('totalpotongan').setFieldLabel('Jumlah Pinjaman');

                    //             Ext.getCmp('jumlahangsuran').show();
                    //             Ext.getCmp('jumlahpotongan').show();
                    //             Ext.getCmp('jumlahpotongan').show();

                    //             Ext.getCmp('akhirpotongan').hide();
                    //             Ext.getCmp('sikluspotongan').hide();
                                
                    //         } else {
                    //             Ext.getCmp('totalpotongan').setFieldLabel('Jumlah Potongan');

                    //             Ext.getCmp('jumlahangsuran').hide();
                    //             Ext.getCmp('jumlahpotongan').hide();
                    //             Ext.getCmp('jumlahpotongan').hide();

                    //             Ext.getCmp('akhirpotongan').show();
                    //             Ext.getCmp('sikluspotongan').show();
                    //         }
                    //     },
                    //     failure: function (res) {
                    //         // Ext.Msg.alert('Proses Gaji Gagal', res.message);
                    //     }
                    // });
                }
            }
        },
        {
            xtype: 'comboxsiklus',
            id:'sikluspotongan'
        },
        {
            xtype: 'numberfield',
            fieldLabel: 'Jumlah Potongan',
            allowBlank: false,
            name: 'totalpotongan',
            id:'totalpotongan',
            listeners: {
                change: function(field, value) {
                    count();
                }
            }
        },
        {
            xtype: 'numberfield',
            fieldLabel: 'Jumlah Angsuran',
            allowBlank: false,
            value: 1,
            name: 'jumlahangsuran',
            id: 'jumlahangsuran',
            listeners: {
                change: function(field, value) {
                   count();
                }
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Potongan per angsuran',
            readOnly:true,
            id: 'jumlahpotongan',
            name: 'jumlahpotongan'
        },
        {
            xtype: 'datefield',
            name: 'startdate',
            id:'mulaipotongan',
            format: 'd/m/Y',
            fieldLabel: 'Mulai Potongan'
        },
        {
            xtype: 'datefield',
            name: 'enddate',
            id:'akhirpotongan',
            format: 'd/m/Y',
            fieldLabel: 'Selesai Potongan'
        }, 
//        {
//            xtype: 'datefield',
//            name: 'enddate',
//            format: 'd/m/Y',
//            readOnly:true,
//            fieldLabel: 'Akhir Potongan'
//        },
        {
            xtype: 'textarea',
            fieldLabel: 'Keterangan',
            // allowBlank: false,
            name: 'keterangan'
        }
    ],
    buttons: [{
            text: 'Batal',
            handler: function () {
                var win = Ext.getCmp('windowPopupPotonganGrid');
                Ext.getCmp('formPotonganGrid').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnPotonganGridSimpan',
            text: 'Simpan',
            handler: function () {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function (form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formPotonganGrid').getForm().reset();
                            Ext.getCmp('windowPopupPotonganGrid').hide();
                            storeGridPotonganGrid.load();
                        },
                        failure: function (form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridPotonganGrid.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wPotonganGrid = Ext.create('widget.window', {
    id: 'windowPopupPotonganGrid',
    title: 'Data Potongan',
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
    items: [formPotonganGrid]
});


Ext.define('MY.searchGridPotonganGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPotonganGrid',
    store: storeGridPotonganGrid,
    width: 180
});
var smGridPotonganGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function (model, record, index) {
            var selectedLen = smGridPotonganGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletePotonganGrid').disable();
            }
        },
        select: function (model, record, index) {
            Ext.getCmp('btnDeletePotonganGrid').enable();
        }
    }
});
Ext.define(dir_sys + 'employee.GridPotonganGrid', {
    width:panelW-300,
    height:panelH-300,
    title: 'Potongan',
    sm: smGridPotonganGrid,
    // itemId: 'GridPotonganGrid',
    id: 'GridPotonganGrid',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPotonganGrid',
    store: storeGridPotonganGrid,
    loadMask: true,
    columns: [
//'namepotongan','amounttype','namasiklus','idemployee','startdate','enddate','totalpotongan','sisapotongan','jumlahpotongan','idpotongan','idemployee','jumlahangsuran','keterangan'
        {header: 'idpotongan', dataIndex: 'idpotongan', hidden: true},
        {header: 'idemployee', dataIndex: 'idemployee', minWidth: 150, hidden: true},
        {header: 'Nama potongan', dataIndex: 'namepotongan', minWidth: 150},
        {header: 'Jenis', dataIndex: 'jenispotongan', minWidth: 150},
        {header: 'Siklus Potongan', dataIndex: 'namasiklus', minWidth: 150},
        {header: 'Mulai Potongan', dataIndex: 'startdate', minWidth: 150},
        {header: 'Akhir Potongan', dataIndex: 'enddate', minWidth: 150},
        {header: 'Total Potongan', dataIndex: 'totalpotongan', minWidth: 150,xtype:'numbercolumn',align:'right',hidden:true},
        {header: 'Jumlah Angsuran',minWidth: 150, dataIndex: 'jumlahangsuran', hidden:true},
        {header: 'Jumlah Potongan', dataIndex: 'jumlahpotongan', minWidth: 150,xtype:'numbercolumn',align:'right'},
        {header: 'Sisa potongan', dataIndex: 'sisapotongan', minWidth: 150,xtype:'numbercolumn',align:'right', hidden:true},
        {header: 'keterangan', dataIndex: 'keterangan', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'addPotonganGrid',
                    text: 'Tambah',
                    iconCls: 'add-icon',
                    handler: function () {
                        wPotonganGrid.show();
                        Ext.getCmp('statusformPotonganGrid').setValue('input');
                        console.log(Ext.getCmp('idemployee').getValue());
                        Ext.getCmp('idemployeePotonganGrid').setValue(Ext.getCmp('idemployee').getValue());
                        potongantypeStore.load();
                        siklusStore.load();
                    }
                },
                // {
                //     itemId: 'editPotonganGrid',
                //     text: 'Ubah',
                //     iconCls: 'edit-icon',
                //     handler: function () {
                //         var grid = Ext.getCmp('GridPotonganGridID');
                //         var selectedRecord = grid.getSelectionModel().getSelection()[0];
                //         var data = grid.getSelectionModel().getSelection();
                //         console.log(selectedRecord)
                //         if (data.length == 0)
                //         {
                //             Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                //         } else {
                //             //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                //             var formPotonganGrid = Ext.getCmp('formPotonganGrid');
                //             formPotonganGrid.getForm().load({
                //                 url: SITE_URL + 'backend/loadFormData/PotonganGrid/1/employee',
                //                 params: {
                //                     extraparams: 'a.idpotongan:' + selectedRecord.data.idpotongan
                //                 },
                //                 success: function (form, action) {
                //                     // Ext.Msg.alert("Load failed", action.result.errorMessage);
                //                 },
                //                 failure: function (form, action) {
                //                     Ext.Msg.alert("Load failed", action.result.errorMessage);
                //                 }
                //             })

                //             wPotonganGrid.show();
                //             Ext.getCmp('statusformPotonganGrid').setValue('edit');
                //         }

                //     }
                // }, 
                {
                    // id: 'btnDeletePotonganGrid',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function () {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function (btn) {
                                if (btn == 'yes') {
                                    // var grid = Ext.ComponentQuery.query('GridPotonganGrid')[0];
                                    // var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    // var data = grid.getSelectionModel().getSelection();
                                    // if (data.length == 0) {
                                    //     Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                    // } else {
                                    //    console.log(selectedRecord)
                                    // }
                                    var grid = Ext.ComponentQuery.query('GridPotonganGrid')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function (item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/PotonganGrid/employee',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)}
                                    });
                                    storeGridPotonganGrid.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridPotonganGrid',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridPotonganGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function (grid) {
                // storeGridPotonganGrid.load();
            }
        },
        itemdblclick: function (dv, record, item, index, e) {

            Ext.getCmp('statusformPotonganGrid').setValue('edit');
            potongantypeStore.load();
            siklusStore.load();

            // var formAgama = Ext.create('formAgama');
            var formPotonganGrid = Ext.getCmp('formPotonganGrid');
            wPotonganGrid.show();
            formPotonganGrid.getForm().load({
                url: SITE_URL + 'backend/loadFormData/PotonganGrid/1/employee',
                params: {
                    extraparams: 'a.idpotongan:' + record.data.idpotongan
                },
                success: function (form, action) {                   
                    var res = Ext.JSON.decode(action.response.responseText);
                     console.log(res)

                     // formPotonganGrid.findField('idpotongantype').setValue(res.data.)
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);

                    // Ext.Ajax.request({
                    //     url: SITE_URL + 'masterdata/getjenispotongan',
                    //     method: 'GET',
                    //     params: {
                    //         potongantype: Ext.getCmp('potongantype')
                    //     },
                    //     success: function (res) {
                    //         var res = Ext.JSON.decode(res.responseText);
                    //         if(res.jenispotongan=='Angsuran')
                    //         {
                    //             Ext.getCmp('jumlahangsuran').show();
                    //             Ext.getCmp('jumlahpotongan').show();
                    //             Ext.getCmp('jumlahpotongan').show();

                    //             Ext.getCmp('akhirpotongan').hide();
                    //             Ext.getCmp('sikluspotongan').hide();
                                
                    //         } else {
                    //             Ext.getCmp('jumlahangsuran').hide();
                    //             Ext.getCmp('jumlahpotongan').hide();
                    //             Ext.getCmp('jumlahpotongan').hide();

                    //             Ext.getCmp('akhirpotongan').show();
                    //             Ext.getCmp('sikluspotongan').show();
                    //         }
                    //     },
                    //     failure: function (res) {
                    //         // Ext.Msg.alert('Proses Gaji Gagal', res.message);
                    //     }
                    // });
                },
                failure: function (form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

//            
//            Ext.getCmp('kddaerahS').setReadOnly(true);
            Ext.getCmp('statusformPotonganGrid').setValue('edit');
        }
    }
});

function count()
{
    var jumlahangsuran = Ext.getCmp('jumlahangsuran').getValue();
    var jumlahpotongan = Ext.getCmp('jumlahpotongan');
    var totalpotongan = Ext.getCmp('totalpotongan').getValue();
    console.log(totalpotongan)
    var angsuran = totalpotongan*1 / jumlahangsuran*1;
    console.log('angsuran '+angsuran);
    // jumlahpotongan.setValue(Ext.util.Format.Currency(angsuran));
    jumlahpotongan.setValue(angsuran.toLocaleString('null', {minimumFractionDigits: 2}));
}