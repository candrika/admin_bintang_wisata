
Ext.define('GridTambahanGajiGridModel', {
    extend: 'Ext.data.Model',
    fields: ['idtambahangaji','idemployee','tambahantype','startdate','enddate','jumlah','namasiklus','keterangan'],
    idProperty: 'id'
});
var storeGridTambahanGajiGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridTambahanGajiGridModel',
    remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/TambahanGajiGrid/employee',
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



var formTambahanGajiGrid = Ext.create('Ext.form.Panel', {
    id: 'formTambahanGajiGrid',
    width: 450,
    height: 300,
    url: SITE_URL + 'backend/saveform/TambahanGajiGrid/employee',
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
            name: 'statusformTambahanGajiGrid',
            id: 'statusformTambahanGajiGrid'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idtambahangaji',
            name: 'idtambahangaji'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idemployee',
            name: 'idemployee',
            id: 'idemployeeTambahanGajiGrid'
        },
//        {
//            xtype: 'comboxunit',
//            listeners: {
//                select: {
//                    fn: function (combo, value) {
//                        storeTambahanGaji.load({
//                            param: {
//                                'extraparams': 'a.idunit:' + combo.getValue()
//                            }
//                        });
//                    }
//                }
//            }
//        },
        {
            xtype: 'comboxtambahangajitype'
        },
        {
            xtype: 'comboxsiklus'
        },
        {
            xtype: 'numberfield',
            fieldLabel: 'Jumlah',
            allowBlank: false,
            name: 'jumlah'
        },
        {
            xtype: 'datefield',
            name: 'startdate',
            format: 'd/m/Y',
            fieldLabel: 'Mulai Pembayaran'
        }, {
            xtype: 'datefield',
            name: 'enddate',
            format: 'd/m/Y',
            fieldLabel: 'Akhir Pembayaran'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Keterangan',
            allowBlank: false,
            name: 'keterangan'
        }
    ],
    buttons: [{
            text: 'Batal',
            handler: function () {
                var win = Ext.getCmp('windowPopupTambahanGajiGrid');
                Ext.getCmp('formTambahanGajiGrid').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnTambahanGajiGridSimpan',
            text: 'Simpan',
            handler: function () {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function (form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formTambahanGajiGrid').getForm().reset();
                            Ext.getCmp('windowPopupTambahanGajiGrid').hide();
                            storeGridTambahanGajiGrid.load();
                        },
                        failure: function (form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridTambahanGajiGrid.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wTambahanGajiGrid = Ext.create('widget.window', {
    id: 'windowPopupTambahanGajiGrid',
    title: 'Data Gaji',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formTambahanGajiGrid]
});


Ext.define('MY.searchGridTambahanGajiGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridTambahanGajiGrid',
    store: storeGridTambahanGajiGrid,
    width: 180
});
var smGridTambahanGajiGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function (model, record, index) {
            var selectedLen = smGridTambahanGajiGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteTambahanGajiGrid').disable();
            }
        },
        select: function (model, record, index) {
            Ext.getCmp('btnDeleteTambahanGajiGrid').enable();
        }
    }
});
Ext.define(dir_sys + 'employee.GridTambahanGajiGrid', {
    width:panelW-300,
    height:panelH-300,
    selModel: smGridTambahanGajiGrid,
    title: 'Pendapatan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridTambahanGajiGridID',
    id: 'GridTambahanGajiGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridTambahanGajiGrid',
    store: storeGridTambahanGajiGrid,
    loadMask: true,
    columns: [
//        'idTambahanGaji','idemployee','namaTambahanGaji','startdate','enddate','jumlah','nametunj','amounttype','namasiklus'
        {header: 'idtambahangaji', dataIndex: 'idtambahangaji', hidden: true},
        {header: 'idemployee', dataIndex: 'idemployee', minWidth: 150, hidden: true},
        // {header: 'namaTambahanGaji', dataIndex: 'namaTambahanGaji', minWidth: 150},
        {header: 'Nama Pembayaran', dataIndex: 'tambahantype', minWidth: 150,flex:1},
        {header: 'Mulai pembayaran', dataIndex: 'startdate', minWidth: 150},
        {header: 'Akhir Pembayaran', dataIndex: 'enddate', minWidth: 150},        
        // {header: 'amounttype', dataIndex: 'amounttype', minWidth: 150},
        {header: 'Siklus Pembayaran', dataIndex: 'namasiklus', minWidth: 150},
        {header: 'Jumlah', dataIndex: 'jumlah', minWidth: 150,xtype:'numbercolumn',align:'right'},
        {header: 'Keterangan', dataIndex: 'keterangan', minWidth: 150},
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'addTambahanGajiGrid',
                    text: 'Tambah',
                    iconCls: 'add-icon',
                    handler: function () {
                        wTambahanGajiGrid.show();
                        Ext.getCmp('statusformTambahanGajiGrid').setValue('input');
                        Ext.getCmp('idemployeeTambahanGajiGrid').setValue(Ext.getCmp('idemployee').getValue());
                        tambahangajitypeStore.load();
                        siklusStore.load();
                    }
                },
                {
                    itemId: 'editTambahanGajiGrid',
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function () {
                        var grid = Ext.getCmp('GridTambahanGajiGridID');
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            view_gaji_employee(selectedRecord)
                        }

                    }
                }, {
                    id: 'btnDeleteTambahanGajiGrid',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function () {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function (btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridTambahanGajiGrid')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function (item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/TambahanGajiGrid/employee',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)}
                                    });
                                    storeGridTambahanGajiGrid.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridTambahanGajiGrid',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridTambahanGajiGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function (grid) {
                // storeGridTambahanGajiGrid.load();
            }
        },
        itemdblclick: function (dv, selectedRecord, item, index, e) {
           view_gaji_employee(selectedRecord)
        }
    }
});

function view_gaji_employee(selectedRecord){
    tambahangajitypeStore.load();
    siklusStore.load();

    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
    var formTambahanGajiGrid = Ext.getCmp('formTambahanGajiGrid');
    formTambahanGajiGrid.getForm().load({
        url: SITE_URL + 'backend/loadFormData/TambahanGajiGrid/1/employee',
        params: {
            extraparams: 'a.idtambahangaji:' + selectedRecord.data.idtambahangaji
        },
        success: function (form, action) {
            // Ext.Msg.alert("Load failed", action.result.errorMessage);
        },
        failure: function (form, action) {
            Ext.Msg.alert("Load failed", action.result.errorMessage);
        }
    })

    wTambahanGajiGrid.show();
    Ext.getCmp('statusformTambahanGajiGrid').setValue('edit');
}