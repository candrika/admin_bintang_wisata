
Ext.define('AsuransiEmpGridModel', {
    extend: 'Ext.data.Model',
    fields: ['idasuransiemp','idasuransi','idemployee','namapremi','deskripsi','percentcompany','percentemployee'],
    idProperty: 'id'
});
var storeAsuransiEmpGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'AsuransiEmpGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/AsuransiEmpGrid/employee',
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



var formAsuransiEmpGrid = Ext.create('Ext.form.Panel', {
    id: 'formAsuransiEmpGrid',
    width: 450,
    height: 100,
    url: SITE_URL + 'backend/saveform/AsuransiEmpGrid/employee',
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
            name: 'statusformAsuransiEmpGrid',
            id: 'statusformAsuransiEmpGrid'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idasuransiemp',
            name: 'idasuransiemp'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idemployee',
            name: 'idemployee',
            id: 'idemployeeAsuransiEmpGrid'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idasuransi',
            name: 'idasuransi',
            id: 'idasuransiEmp'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Pilih Asuransi',
            name: 'deskripsi',
            id: 'deskripsiEmp',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        wGridAsuransiPopup.show();
                        var store = Ext.getCmp('GridAsuransiPopup').getStore();
                        store.on('beforeload', function(store, operation) {
                            operation.params = {
                                'extraparams':'a.idunit:'+idunit
                            }
                        })

                        store.load();
                    });
                }
            }
        }
    ],
    buttons: [{
            text: 'Batal',
            handler: function () {
                var win = Ext.getCmp('windowPopupAsuransiEmpGrid');
                Ext.getCmp('formAsuransiEmpGrid').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnAsuransiEmpGridSimpan',
            text: 'Simpan',
            handler: function () {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function (form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formAsuransiEmpGrid').getForm().reset();
                            Ext.getCmp('windowPopupAsuransiEmpGrid').hide();
                            storeAsuransiEmpGrid.load();
                        },
                        failure: function (form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeAsuransiEmpGrid.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wAsuransiEmpGrid = Ext.create('widget.window', {
    id: 'windowPopupAsuransiEmpGrid',
    title: 'Pilih Asuransi',
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
    items: [formAsuransiEmpGrid]
});


Ext.define('MY.searchAsuransiEmpGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchAsuransiEmpGrid',
    store: storeAsuransiEmpGrid,
    width: 180
});
var smAsuransiEmpGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function (model, record, index) {
            var selectedLen = smAsuransiEmpGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteAsuransiEmpGrid').disable();
            }
        },
        select: function (model, record, index) {
            Ext.getCmp('btnDeleteAsuransiEmpGrid').enable();
        }
    }
});
Ext.define(dir_sys + 'employee.AsuransiEmpGrid', {
    width:panelW-300,
    height:panelH-300,
    title: 'Asuransi',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'AsuransiEmpGridID',
    id: 'AsuransiEmpGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.AsuransiEmpGrid',
    store: storeAsuransiEmpGrid,
    loadMask: true,
    columns: [
        {header: 'idasuransiemp', dataIndex: 'idasuransiemp', hidden: true},
        {header: 'idemployee', dataIndex: 'idemployee', minWidth: 150, hidden: true},
        {header: 'Nama Tunjangan', dataIndex: 'namapremi', minWidth: 150, flex:1},
        {header: 'Deskripsi', dataIndex: 'deskripsi', minWidth: 250},
        {header: 'Potongan Karyawan (%)', dataIndex: 'percentemployee', minWidth: 170},
        {header: 'Tanggungan Perusahaan (%)', dataIndex: 'percentcompany', minWidth: 200}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'addAsuransiEmpGrid',
                    text: 'Tambah',
                    iconCls: 'add-icon',
                    handler: function () {
                        wAsuransiEmpGrid.show();
                        Ext.getCmp('statusformAsuransiEmpGrid').setValue('input');
                        console.log(Ext.getCmp('idemployee').getValue());
                        Ext.getCmp('idemployeeAsuransiEmpGrid').setValue(Ext.getCmp('idemployee').getValue());
                    }
                },
                {
                    itemId: 'editAsuransiEmpGrid',
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function () {
                        var grid = Ext.ComponentQuery.query('AsuransiEmpGrid')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data pajak terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formAsuransiEmpGrid = Ext.getCmp('formAsuransiEmpGrid');
                            formAsuransiEmpGrid.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/AsuransiEmpGrid/1/employee',
                                params: {
                                    extraparams: 'a.idtunjangan:' + selectedRecord.data.idtunjangan
                                },
                                success: function (form, action) {
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function (form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wAsuransiEmpGrid.show();
                            Ext.getCmp('statusformAsuransiEmpGrid').setValue('edit');
                        }

                    }
                }, {
                    id: 'btnDeleteAsuransiEmpGrid',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function () {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function (btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('AsuransiEmpGrid')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function (item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/AsuransiEmpGrid/employee',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)}
                                    });
                                    storeAsuransiEmpGrid.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchAsuransiEmpGrid',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeAsuransiEmpGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function (grid) {
                // storeAsuransiEmpGrid.load();
            }
        },
        itemdblclick: function (dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formAsuransiEmpGrid = Ext.getCmp('formAsuransiEmpGrid');
            wAsuransiEmpGrid.show();
            formAsuransiEmpGrid.getForm().load({
                url: SITE_URL + 'backend/loadFormData/AsuransiEmpGrid/1/employee',
                params: {
                    extraparams: 'a.idtunjangan:' + record.data.idtunjangan
                },
                success: function (form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function (form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

//            
//            Ext.getCmp('kddaerahS').setReadOnly(true);
            Ext.getCmp('statusformAsuransiEmpGrid').setValue('edit');
        }
    }
});