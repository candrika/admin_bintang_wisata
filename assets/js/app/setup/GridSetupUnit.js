var formSetupunit = Ext.create('Ext.form.Panel', {
    id: 'formSetupunit',
    width: 450,
    height: 330,
    url: SITE_URL + 'backend/saveform/unitcompany/setup',
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
            xtype: 'fieldset',
//            height: 296,
            title: 'Data Units',
            defaults: {
                anchor: '100%',
                labelWidth: 160
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    anchor: '100%',
                    fieldLabel: 'statusformunitcompany',
                    name: 'statusformunitcompany',
                    id: 'statusformunitcompany'
                },
                {
                    xtype: 'hiddenfield',
                    anchor: '100%',
                    fieldLabel: 'idunit',
                    name: 'idunit'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nama Unit',
                    name: 'namaunit',
                    allowBlank: false
                }, {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'telp',
                    name: 'telp'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'fax',
                    name: 'fax'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'email',
                    name: 'email'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'website',
                    name: 'website'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'SIUP/TDP',
                    name: 'npwp'
                },
                {
                    xtype: 'textareafield',
                    anchor: '100%',
                    fieldLabel: 'Alamat',
                    name: 'alamat',
                    allowBlank: false
                },
                {
                    xtype: 'textareafield',
                    anchor: '100%',
                    fieldLabel: 'Alamat 2',
                    name: 'alamat2'
                },
                {
                    xtype: 'textareafield',
                    anchor: '100%',
                    fieldLabel: 'Alamat 3',
                    name: 'alamat3'
                }]
        },
        {
            xtype: 'fieldset',
            defaults: {
                anchor: '100%',
                labelWidth: 160
            },
            title: 'Data Akuntansi',
            items: [
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    allowBlank:false,
                    fieldLabel: 'Tahun Mulai Pembukuan',
                    name: 'curfinanceyear'
                },
                {
                    xtype: 'comboxbulan',
                    anchor: '100%',
                    allowBlank:false,
                    fieldLabel: 'Bulan Tutup Buku',
                    name: 'lastmonthfinanceyear',
                    value: 'Desember'
                },
                {
                    xtype: 'comboxbulan',
                    anchor: '100%',
                    allowBlank:false,
                    fieldLabel: 'Bulan Awal Pembukuan',
                    name: 'conversionmonth',
                    value: 'Januari'
                },
                {
                    xtype: 'numberfield',
                    anchor: '100%',
                    allowBlank:false,
                    fieldLabel: 'Jumlah Periode Akuntansi',
                    name: 'numaccperiod',
                    minValue: 12,
                    value: 12,
                    maxValue: 13
                }
            ]
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupSetupUnit');
                Ext.getCmp('formSetupunit').getForm().reset();
                win.hide();
            }
        }, {
            // id: 'BtnSetupTaxSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);

                            Ext.getCmp('formSetupunit').getForm().reset();
                            Ext.getCmp('windowPopupSetupUnit').hide();

                            storeGridSetupUnit.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridSetupTax.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]

});

var wSetupUnit = Ext.create('widget.window', {
    id: 'windowPopupSetupUnit',
    title: 'Data Unit Perusahaan',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
//    autoHeight: true,
    height: 400,
    width: 600,
    layout: 'fit',
    border: false,
    items: [formSetupunit]
});

Ext.define('GridSetupUnitModel', {
    extend: 'Ext.data.Model',
    fields: ['idunit', 'namaunit', 'deskripsi', 'alamat', 'display', 'userin', 'usermod', 'datein', 'datemod', 'alamat2', 'alamat3', 'telp', 'fax', 'email', 'website', 'country', 'npwp', 'curfinanceyear', 'lastmonthfinanceyear', 'conversionmonth', 'numaccperiod'],
    idProperty: 'id'
});

var storeGridSetupUnit = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSetupUnitModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/unitcompany/setup',
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

// storeGridSetupUnit.on('beforeload',function() { alert('as'); });
                                        
Ext.define('MY.searchGridSetupUnit', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSetupUnit',
    store: storeGridSetupUnit,
    width: 180
});

var smGridSetupUnit = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridSetupUnit.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteSetupUnit').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteSetupUnit').enable();
        }
    }
});

Ext.define(dir_sys + 'setup.GridSetupUnit', {
    title: 'Unit Usaha',
    itemId: 'GridSetupUnitID',
    id: 'GridSetupUnitID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSetupUnit',
    store: storeGridSetupUnit,
    loadMask: true,
    columns: [
        {
            header: 'No',
            xtype: 'rownumberer',
            width: 30,
            sortable: false
        },
        {header: 'No Unit', dataIndex: 'idunit'},
        {header: 'Nama unit', dataIndex: 'namaunit', minWidth: 200},
        {header: 'Deskripsi', dataIndex: 'deskripsi', minWidth: 150},
        {header: 'Alamat', dataIndex: 'alamat', minWidth: 250},
        {header: 'Telp', dataIndex: 'telp', minWidth: 150},
        {header: 'Fax', dataIndex: 'fax', minWidth: 150},
        {header: 'Email', dataIndex: 'email', minWidth: 150},
        {header: 'Website', dataIndex: 'website', minWidth: 150},
        {header: 'Negara', dataIndex: 'country', minWidth: 150},
        {header: 'NPWP', dataIndex: 'npwp', minWidth: 150},
        {header: 'Tahun Berjalan', dataIndex: 'curfinanceyear', minWidth: 150},{header: 'Bulan Berjalan', dataIndex: 'conversionmonth', minWidth: 150},
        {header: 'Bulan Akhir Pembukuan', dataIndex: 'lastmonthfinanceyear', minWidth: 150},
        
//        {header: 'numaccperiod', dataIndex: 'numaccperiod', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'addSetupUnit',
                    text: 'Tambah',
                    iconCls: 'add-icon',
                    handler: function() {
                        wSetupUnit.show();
                        Ext.getCmp('statusformunitcompany').setValue('input');
                        Ext.getCmp('formSetupunit').getForm().reset();
                    }
                },
                {
                    itemId: 'editSetupUnit',
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridSetupUnit')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formSetupUnit = Ext.getCmp('formSetupunit');

                            formSetupUnit.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/unitcompany/1/setup',
                                params: {
                                    extraparams: 'a.idunit:' + selectedRecord.data.idunit
                                },
                                success: function(form, action) {
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wSetupUnit.show();
                            Ext.getCmp('statusformunitcompany').setValue('edit');
                        }

                    }
                }, {
                    id: 'btnDeleteSetupUnit',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Konfirmasi',
                            msg: 'Menghapus unit akan menghapus semua referensi data yang terkait beserta laporan-laporan yang telah dihasilkan. Lanjut ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridSetupUnit')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'setup/deleteUnit',
                                        method: 'POST',
                                        params: {
                                            postdata: Ext.encode(selected),
                                            idmenu:3
                                        },
                                        success: function(form, action) {
                                            var d = Ext.decode(form.responseText);
                                            if (!d.success) {
                                                Ext.Msg.alert('Informasi', d.message);
                                            }
                                        },
                                        failure: function(form, action) {
                                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                        }
                                    });
                                    storeGridSetupUnit.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridSetupUnit',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridSetupUnit, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSetupUnit.load({
                    callback: function(records, operation, success) {
                        // alert(success)
                        // if (success) {
                        //     alert(success)
                        // } else {
                        //    alert(success)
                        // }
                    }
                });

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formSetupUnit = Ext.getCmp('formSetupunit');
            wSetupUnit.show();

            formSetupUnit.getForm().load({
                url: SITE_URL + 'backend/loadFormData/unitcompany/1/setup',
                params: {
                    extraparams: 'a.idunit:' + record.data.idunit
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

//            
//            Ext.getCmp('kddaerahS').setReadOnly(true);
            Ext.getCmp('statusformunitcompany').setValue('edit');
        }
    }
});