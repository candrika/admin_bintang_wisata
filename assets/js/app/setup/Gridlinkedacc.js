var winAccUnit = Ext.create(dir_sys + 'setup.windowPopupAccUnitSetup');

Ext.define('GridSetupUnitLinkModel', {
    extend: 'Ext.data.Model',
    fields: ['idunit', 'namaunit', 'idlinked', 'namelinked', 'idaccount', 'accname', 'accnumber'],
    idProperty: 'id'
});
var storeGridSetupUnitLink = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSetupUnitLinkModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/unitcompanylink/setup',
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
var formlinkedaccUnit = Ext.create('Ext.form.Panel', {
    id: 'formlinkedaccUnit',
    // width: 450,
    // height: 150,
    url: SITE_URL + 'account/saveLinkUnit',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 130,
        width: 400
    },
    items: [
    {
        xtype: 'hiddenfield',
        name: 'statusformmlinkedacc',
        id: 'statusformmlinkedacc'
    },{
        xtype: 'hiddenfield',
        name: 'idlinked',
        id: 'idlinkedAccUnit'
    }, {
        xtype: 'hiddenfield',
        name: 'idaccount',
        id: 'idaccountAccUnit'
    }, {
        xtype: 'hiddenfield',
        name: 'idunit',
        id: 'idunitAccUnit'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Unit',
        name: 'namaunit',
        hidden:true,
        id: 'namaunitAccUnit',
        readOnly: true
    }, {
        xtype: 'textfield',
        fieldLabel: 'Akun',
        allowBlank: false,
        name: 'accname',
        id: 'accUnitSetup',
        listeners: {
            render: function(component) {
                component.getEl().on('click', function(event, el) {
                    winAccUnit.show();
                    storeGridAccount.on('beforeload', function(store, operation, eOpts) {
                        operation.params = {
                            'idunit': idunit
                        };
                    });
                    storeGridAccount.load();
                });
            }
        }
        // listeners: {
        //     render: function(component) {
        //         component.getEl().on('click', function(event, el) {
        //             winAccUnit.show();
        //             storeAccountAktive.load({
        //                 params: {
        //                     'idunit': Ext.getCmp('idunitAccUnit').getValue()
        //                 }
        //             });
        //         });
        //     }
        // }
    }, {
        xtype: 'textfield',
        fieldLabel: 'No Akun',
        name: 'accnumber',
        id: 'accnumberUnitSetup',
        readOnly: true
    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            this.up('form').getForm().reset();
            Ext.getCmp('wformlinkedaccUnit').hide();
        }
    }, {
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        // this.up('form').getForm().reset();
                        Ext.getCmp('wformlinkedaccUnit').hide();
                        Ext.getCmp('windowPopuplinkedacc').hide();
                        // storeGridSetupUnitLink.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        storeGridSetupUnitLink.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
var wformlinkedaccUnit = Ext.create('widget.window', {
    id: 'wformlinkedaccUnit',
    title: 'Hubungkan Akun',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    // minWidth: 450,
    // height: 450,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formlinkedaccUnit]
});

var formlinkedacc = Ext.create('Ext.form.Panel', {
    id: 'formlinkedacc',
    width: 550,
    height: 340,
    url: SITE_URL + 'account/saveLink',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 130,
        width: 400
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'statusformlinkedacc',
        id: 'statusformlinkedacc'
    }, {
        xtype: 'displayfield',
        fieldLabel: 'Nama Link',
        name: 'namelinked',
        readOnly: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'idlinked',
        name: 'idlinked',
        id: 'idlinkedSetup',
        readOnly: true
    }, {
        xtype: 'displayfield',
        width: '100%',
        fieldLabel: 'Deskripsi',
        name: 'description',
        readOnly: true
    }, {
        xtype: 'gridpanel',
        id: 'GridLinkedAcc',
        // title: 'Hubungkan ',
        store: storeGridSetupUnitLink,
        height: 230,
        columns: [{
            header: 'idunit',
            dataIndex: 'idunit',
            hidden: true
        }, {
            header: 'idaccount',
            dataIndex: 'idaccount',
            hidden: true
        }, {
            header: 'Nama Unit',
            hidden:true,
            dataIndex: 'namaunit',
            minWidth: 150,
            flex: 1
        }, {
            header: 'Akun',
            dataIndex: 'accname',
            minWidth: 150,
            flex: 1
        }, {
            header: 'No Akun',
            dataIndex: 'accnumber',
            minWidth: 150
        }, {
            text: 'Edit',
            width: 45,
            // menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: 'Ubah Data',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/pencil.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                var formlinkedacc = Ext.getCmp('formlinkedaccUnit');
                formlinkedacc.getForm().reset();
                wformlinkedaccUnit.show();
                formlinkedacc.getForm().load({
                    url: SITE_URL + 'backend/loadFormData/linkedaccUnit/1/setup',
                    params: {
                        extraparams: 'a.idunit:' + record.get('idunit') + ',' + 'a.idaccount:' + record.get('idaccount') + ',' + 'a.idlinked:' + Ext.getCmp('idlinkedSetup').getValue()
                    },
                    success: function(form, action) {
                        // Ext.Msg.alert("Load failed", action.result.errorMessage);
                    },
                    failure: function(form, action) {
                        // Ext.Msg.alert("Load failed", action.result.errorMessage);
                    }
                })
                // Ext.getCmp('GridLinkedAcc').setTitle('Hubungkan Akun '+record.data.namelinked+' ke setiap Unit');
                // console.log(Ext.getCmp('idlinkedSetup').getValue());           
                Ext.getCmp('namaunitAccUnit').setValue(record.get('namaunit'));
                Ext.getCmp('idlinkedAccUnit').setValue(Ext.getCmp('idlinkedSetup').getValue());
                Ext.getCmp('idunitAccUnit').setValue(record.get('idunit'));
            }
        }],
        listeners: {
            render: {
                scope: this,
                fn: function(grid) {
                    // storeGridlinkedacc.load();
                }
            },
            itemdblclick: function(dv, record, item, index, e) {
                // var formAgama = Ext.create('formAgama');
                var formlinkedacc = Ext.getCmp('formlinkedaccUnit');
                wformlinkedaccUnit.show();
                formlinkedacc.getForm().load({
                    url: SITE_URL + 'backend/loadFormData/linkedaccUnit/1/setup',
                    params: {
                        extraparams: 'a.idunit:' + record.data.idunit + ',' + 'a.idaccount:' + record.data.idaccount + ',' + 'a.idlinked:' + Ext.getCmp('idlinkedSetup').getValue()
                    },
                    success: function(form, action) {
                        // Ext.Msg.alert("Load failed", action.result.errorMessage);
                    },
                    failure: function(form, action) {
                        // Ext.Msg.alert("Load failed", action.result.errorMessage);
                    }
                })
                // Ext.getCmp('GridLinkedAcc').setTitle('Hubungkan Akun '+record.data.namelinked+' ke setiap Unit');
                // console.log(Ext.getCmp('idlinkedSetup').getValue());           
                Ext.getCmp('namaunitAccUnit').setValue(record.data.namaunit);
                Ext.getCmp('idlinkedAccUnit').setValue(Ext.getCmp('idlinkedSetup').getValue());
                Ext.getCmp('idunitAccUnit').setValue(record.data.idunit);
                // Ext.getCmp('namaunitAccUnit').formlinkedaccUnit
            }
        }
    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopuplinkedacc');
            Ext.getCmp('formlinkedacc').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnlinkedaccSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formlinkedacc').getForm().reset();
                        Ext.getCmp('windowPopuplinkedacc').hide();
                        storeGridlinkedacc.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        storeGridlinkedacc.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
var wlinkedacc = Ext.create('widget.window', {
    id: 'windowPopuplinkedacc',
    title: 'Linked Account',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    // minWidth: 450,
    // height: 450,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formlinkedacc]
});
Ext.define('GridlinkedaccModel', {
    extend: 'Ext.data.Model',
    fields: ['idlinked', 'accname', 'accnumber,', 'idlinked', 'idaccounttype', 'namelinked', 'description', 'idaccount'],
    idProperty: 'id'
});
var storeGridlinkedacc = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridlinkedaccModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/linkedacc/setup',
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
Ext.define('MY.searchGridlinkedacc', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridlinkedacc',
    store: storeGridlinkedacc,
    width: 180
});
var smGridlinkedacc = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridlinkedacc.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletelinkedacc').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletelinkedacc').enable();
        }
    }
});
Ext.define(dir_sys + 'setup.Gridlinkedacc', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridlinkedacc,
    title: 'Linked Account',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridlinkedaccID',
    id: 'GridlinkedaccID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.Gridlinkedacc',
    store: storeGridlinkedacc,
    loadMask: true,
    columns: [{
            header: 'idlinked',
            dataIndex: 'idlinked',
            hidden: true
        }, {
            header: 'Nama Link',
            dataIndex: 'namelinked',
            minWidth: 350
        },
        //  {
        //     header: 'Akun',
        //     dataIndex: 'accname',
        //     minWidth: 150
        // },
        //        {header: 'Nomor Akun', dataIndex: 'accnumber', minWidth: 150},
        {
            header: 'Deskripsi',
            flex: 1,
            dataIndex: 'description',
            minWidth: 550
        }
    ],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                itemId: 'addlinkedacc',
                hidden:true,
                text: 'Ubah',
                iconCls: 'edit-icon',
                handler: function() {
                    //                        Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    wlinkedacc.show();
                    Ext.getCmp('statusformmlinkedacc').setValue('input');
                }
            }, 
            // '->', 
            'Search: ', ' ', {
                xtype: 'searchGridlinkedacc',
                text: 'Left Button'
            }]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridlinkedacc, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
            // pageSize:20
        }
        // , {
        //     xtype: 'toolbar',
        //     dock: 'top',
        //     items: [{
        //         itemId: 'addlinkedacc',
        //         text: 'Tambah Data',
        //         iconCls: 'add-icon',
        //         handler: function () {
        //             // WindowKaryawan('Input Karyawan Baru','input');
        //             wlinkedacc.show();
        //         }
        //     }]
        // }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridlinkedacc.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formlinkedacc = Ext.getCmp('formlinkedacc');
            wlinkedacc.show();
            storeGridSetupUnitLink.load({
                params: {
                    'extraparams': 'b.idlinked:' + record.data.idlinked
                }
            });

            formlinkedacc.getForm().load({
                url: SITE_URL + 'backend/loadFormData/linkedacc/1/setup',
                params: {
                    extraparams: 'a.idlinked:' + record.data.idlinked
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })
            Ext.getCmp('GridLinkedAcc').setTitle('Hubungkan Akun ' + record.data.namelinked + ' ke setiap Unit');
            Ext.getCmp('statusformlinkedacc').setValue('edit');
        }
    }
});