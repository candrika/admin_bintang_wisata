
Ext.define('GridTunjanganGridModel', {
    extend: 'Ext.data.Model',
    fields: ['idtunjangan', 'idemployee', 'namatunjangan', 'jenisnilai','persen','startdate', 'enddate', 'jumlah', 'nametunj', 'amounttype', 'namasiklus','amounttype_name'],
    idProperty: 'id'
});
var storeGridTunjanganGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridTunjanganGridModel',
    remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/TunjanganGrid/employee',
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



var formTunjanganGrid = Ext.create('Ext.form.Panel', {
    id: 'formTunjanganGrid',
    // width: 450,
    // height: 330,
    url: SITE_URL + 'backend/saveform/TunjanganGrid/employee',
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
            name: 'statusformTunjanganGrid',
            id: 'statusformTunjanganGrid'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idtunjangan',
            name: 'idtunjangan'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idemployee',
            name: 'idemployee',
            id: 'idemployeeTunjanganGrid'
        },
        {
            xtype: 'textfield',
            fieldLabel:'Nama Tunjangan',
            name:'namatunjangan',
            allowBlank:false
        },
//        {
//            xtype: 'comboxunit',
//            listeners: {
//                select: {
//                    fn: function (combo, value) {
//                        storetunjangan.load({
//                            param: {
//                                'extraparams': 'a.idunit:' + combo.getValue()
//                            }
//                        });
//                    }
//                }
//            }
//        },
        // {
        //     xtype: 'comboxtunjangantype'
        // },
        {
            xtype: 'comboxsiklus'
        },
        Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Jenis Nilai',
            displayField: 'amounttype_name',
            queryMode: 'local',
            id: 'idamounttype',
            name: 'idamounttype',
            editable:false,
            triggerAction: 'all',
            valueField: 'idamounttype',
            allowBlank: false,
            store: Ext.create('Ext.data.Store', {
                fields: ['idamounttype', 'amounttype_name'],
                data: [
                    {"amounttype_name": "Prosentase","idamounttype": 1},
                    {"amounttype_name": "Nilai Tetap","idamounttype": 2}
                ]
            }),
            listeners: {
                'change': function(field, newValue, oldValue) {
                    console.log(newValue)
                    if(newValue==1)
                    {
                        Ext.getCmp('jumlahTunjangan').setDisabled(true);
                        Ext.getCmp('multiplier_percentage_tunjangan').setDisabled(false);
                        Ext.getCmp('persenTunjangan').setDisabled(false);
                    } else {
                        Ext.getCmp('jumlahTunjangan').setDisabled(false);
                        Ext.getCmp('multiplier_percentage_tunjangan').setDisabled(true);
                        Ext.getCmp('persenTunjangan').setDisabled(true);
                    }
                }
            }
        }),
        {
            xtype: 'textfield',
            fieldLabel: 'Persen (%)',
            // allowBlank: false,
            id:'persenTunjangan',
            name: 'persen'
        },
        {
            xtype:'comboxTipeGaji',
            fieldLabel:'Pengali',
            id:'multiplier_percentage_tunjangan',
            name:'multiplier_id'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Jumlah Tunjangan',
            allowBlank: false,
            id:'jumlahTunjangan',
            listeners: {
                'render': function(c) {
                    c.getEl().on('keyup', function() {
                        this.setRawValue(renderNomor(this.getValue()));
                    }, c);
                }
            },
            name: 'jumlah'
        },
        {
            xtype: 'datefield',
            name: 'startdate',
            format: 'd/m/Y',
            allowBlank: false,
            fieldLabel: 'Mulai Pembayaran'
        }, {
            xtype: 'datefield',
            name: 'enddate',
            format: 'd/m/Y',
            allowBlank: false,
            fieldLabel: 'Akhir Pembayaran'
        }
    ],
    buttons: [{
            text: 'Batal',
            handler: function () {
                var win = Ext.getCmp('windowPopupTunjanganGrid');
                Ext.getCmp('formTunjanganGrid').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnTunjanganGridSimpan',
            text: 'Simpan',
            handler: function () {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function (form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formTunjanganGrid').getForm().reset();
                            Ext.getCmp('windowPopupTunjanganGrid').hide();
                            storeGridTunjanganGrid.load();
                        },
                        failure: function (form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridTunjanganGrid.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wTunjanganGrid = Ext.create('widget.window', {
    id: 'windowPopupTunjanganGrid',
    title: 'Data Tunjangan',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    modal:true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formTunjanganGrid]
});


Ext.define('MY.searchGridTunjanganGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridTunjanganGrid',
    store: storeGridTunjanganGrid,
    width: 180
});
var smGridTunjanganGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function (model, record, index) {
            var selectedLen = smGridTunjanganGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteTunjanganGrid').disable();
            }
        },
        select: function (model, record, index) {
            Ext.getCmp('btnDeleteTunjanganGrid').enable();
        }
    }
});
Ext.define(dir_sys + 'employee.GridTunjanganGrid', {
   width:panelW-300,
    height:panelH-300,
    title: 'Tunjangan',
    selModel: smGridTunjanganGrid,
    itemId: 'GridTunjanganGridID',
    id: 'GridTunjanganGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridTunjanganGrid',
    store: storeGridTunjanganGrid,
    loadMask: true,
    columns: [
//        'idtunjangan','idemployee','namatunjangan','startdate','enddate','jumlah','nametunj','amounttype','namasiklus'
        {header: 'idtunjangan', dataIndex: 'idtunjangan', hidden: true},
        {header: 'idemployee', dataIndex: 'idemployee', minWidth: 150, hidden: true},
        // {header: 'namatunjangan', dataIndex: 'namatunjangan', minWidth: 150},
        {header: 'Nama Tunjangan', dataIndex: 'namatunjangan', minWidth: 250},
        {header: 'Mulai pembayaran', dataIndex: 'startdate', minWidth: 150},
        {header: 'Akhir Pembayaran', dataIndex: 'enddate', minWidth: 150},        
        // {header: 'amounttype', dataIndex: 'amounttype', minWidth: 150},
        {header: 'Siklus Pembayaran', dataIndex: 'namasiklus', minWidth: 150},
        {header: 'Jenis Nilai', dataIndex: 'amounttype_name', minWidth: 150},
        {header: 'Persentase', dataIndex: 'persen', minWidth: 150},
        {header: 'Jumlah', dataIndex: 'jumlah', minWidth: 150,xtype:'numbercolumn',align:'right'}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'addTunjanganGrid',
                    text: 'Tambah',
                    iconCls: 'add-icon',
                    handler: function () {
                        wTunjanganGrid.show();
                        var idemployee = Ext.getCmp('idemployee').getValue();

                        Ext.getCmp('statusformTunjanganGrid').setValue('input');
                        // console.log(Ext.getCmp('idemployee').getValue(idemployee);
                        Ext.getCmp('idemployeeTunjanganGrid').setValue(idemployee);
                        storetunjangan.load();
                        siklusStore.load();

                        storeTipeGaji.load({
                            params: { idemployee: idemployee }
                        });
                    }
                },
                {
                    itemId: 'editTunjanganGrid',
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function () {
                        var grid = Ext.ComponentQuery.query('GridTunjanganGrid')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                           load_tunjangan_emp(selectedRecord);
                        }

                    }
                }, {
                    id: 'btnDeleteTunjanganGrid',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function () {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function (btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridTunjanganGrid')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function (item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/TunjanganGrid/employee',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)}
                                    });
                                    storeGridTunjanganGrid.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridTunjanganGrid',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridTunjanganGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function (grid) {
                // storeGridTunjanganGrid.load();
            }
        },
        itemdblclick: function (dv, selectedRecord, item, index, e) {
            load_tunjangan_emp(selectedRecord);
        }
    }
});

function load_tunjangan_emp(selectedRecord){
     //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
        var form = Ext.getCmp('formTunjanganGrid').getForm();

        form.findField('idsiklus').getStore().load();
        form.findField('multiplier_id').getStore().load({
                            params: { idemployee: Ext.getCmp('idemployee').getValue() }
                        });

        form.load({
            url: API_URL + 'employee/allowance',
            params: {
                id: selectedRecord.data.idtunjangan,
                key:key
            },
            method: 'GET',
            success: function (f, action) {
                 var d = Ext.decode(action.response.responseText);
                 form.findField('idamounttype').setValue(d.data.idamounttype*1);
                 
                // Ext.Msg.alert("Load failed", action.result.errorMessage);
            },
            failure: function (f, action) {
                Ext.Msg.alert("Load failed", action.result.errorMessage);
            }
        })

        wTunjanganGrid.show();
        Ext.getCmp('statusformTunjanganGrid').setValue('edit');
}