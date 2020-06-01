///////////////////////////////////////////////////////////////////////////////
Ext.define('GridSetupUnitLinkPayrollKasModel', {
    extend: 'Ext.data.Model',
    fields: ['idemployeetype', 'idaccountpayroll', 'idaccount', 'accnamepayroll', 'accnamekas', 'namaunit', 'idunit', 'accnamepaythr', 'accnamethr', 'idaccountpaythr', 'idaccountthr'],
    idProperty: 'id'
});
var storeGridSetupUnitLinkPayrollKas = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSetupUnitLinkPayrollKasModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/employeetypeakunlink/setup',
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
var formlinkedaccUnitPayroll = Ext.create('Ext.form.Panel', {
    id: 'formlinkedaccUnitPayroll',
    width: 480,
    height: 170,
    url: SITE_URL + 'setup/saveLinkUnitPayroll',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 230,
        width: 450
    },
    items: [{
        xtype: 'hiddenfield',
        fieldLabel: 'idemployeetype',
        name: 'idemployeetype',
        id: 'idemployeetypeUnitPayroll'
    }, {
        xtype: 'hiddenfield',
        name: 'idunit',
        id: 'idAccUnitPayroll'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Unit',
        name: 'namaunit',
        id: 'namaunitAccUnitPayroll',
        readOnly: true
    }, {
        xtype: 'hiddenfield',
        name: 'idaccount',
        id: 'idaccountPayrollKas'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Akun Kas Pembayaran Gaji',
        allowBlank: false,
        name: 'accnamekas',
        id: 'accnamePayrollKas',
        listeners: {
            render: function(component) {
                component.getEl().on('click', function(event, el) {
                    windowPopupAccKasListPayroll.show();
                    // storeAccountAktive.load();
                     storeAccountAktive.load({
                                                params: {
                                                    'idunit': Ext.getCmp('idAccUnitPayroll').getValue(),
                                                    'idaccounttype': '19,17,1,11,5,4,21,3'
                                                }
                                            });
                });
            }
        }
    }, {
        xtype: 'hiddenfield',
        name: 'idaccountpayroll',
        id: 'idaccountPayroll'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Akun Pencatatan Beban Gaji',
        allowBlank: false,
        name: 'accnamepayroll',
        id: 'accnamePayroll',
        listeners: {
            render: function(component) {
                component.getEl().on('click', function(event, el) {
                    windowPopupAccListPayroll.show();
                    storeAccountAktive.load({
                            params: {
                                'idunit': Ext.getCmp('idAccUnitPayroll').getValue(),
                                'idaccounttype': '14,15'
                            }
                        });
                });
            }
        }
    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            this.up('form').getForm().reset();
            Ext.getCmp('wformlinkedaccUnitPayroll').hide();
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
                        // Ext.getCmp('wformlinkedaccUnitInsurance').hide();
                        storeGridSetupUnitLinkPayrollKas.load({
                            params: {
                                'extraparams': 'a.idemployeetype:' + Ext.getCmp('idemployeetypeUnitPayroll').getValue()
                            }
                        });

                        Ext.getCmp('wformlinkedaccUnitPayroll').hide();
                        // wformlinkedaccUnitPayroll.load();

                        
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        storeGridSetupUnitInsuranceLink.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
var wformlinkedaccUnitPayroll = Ext.create('widget.window', {
    id: 'wformlinkedaccUnitPayroll',
    title: 'Hubungkan Akun Penggajian',
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
    items: [formlinkedaccUnitPayroll]
});
///////////////////////////////////////////////////////////////////////////////////
var storeGridSetupUnitLinkPayrollTHR = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSetupUnitLinkPayrollKasModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/employeetypeakunlink/setup',
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


var formlinkedaccUnitTHR = Ext.create('Ext.form.Panel', {
    id: 'formlinkedaccUnitTHR',
    width: 480,
    height: 170,
    url: SITE_URL + 'setup/saveLinkUnitTHR',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 230,
        width: 450
    },
    items: [{
        xtype: 'hiddenfield',
        fieldLabel: 'idemployeetype',
        name: 'idemployeetype',
        id: 'idemployeetypeUnitTHR'
    }, {
        xtype: 'hiddenfield',
        name: 'idunit',
        id: 'idAccUnitTHR'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Unit',
        name: 'namaunit',
        id: 'namaunitAccUnitTHR',
        readOnly: true
    }, {
        xtype: 'hiddenfield',
        name: 'idaccountpaythr',
        id: 'idaccountpaythrSetup'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Akun Kas Pembayaran THR',
        allowBlank: false,
        name: 'accnamepaythr',
        id: 'accnamepaythrSetup',
        listeners: {
            render: function(component) {
                component.getEl().on('click', function(event, el) {
                    windowPopupAccListPaythr.show();
                    // storeAccountAktive.load();
                     storeAccountAktive.load({
                                                params: {
                                                    'idunit': Ext.getCmp('idAccUnitTHR').getValue(),
                                                    'idaccounttype': '19,17,1,11,5,4,21,3'
                                                }
                                            });
                });
            }
        }
    }, {
        xtype: 'hiddenfield',
        name: 'idaccountthr',
        id: 'idaccountthrSetup'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Akun Pencatatan Beban THR',
        allowBlank: false,
        name: 'accnamethr',
        id: 'accnamethrSetup',
        listeners: {
            render: function(component) {
                component.getEl().on('click', function(event, el) {
                    windowPopupAccListThr.show();
                    storeAccountAktive.load({
                            params: {
                                'idunit': Ext.getCmp('idAccUnitTHR').getValue(),
                                'idaccounttype': '14,15'
                            }
                        });
                });
            }
        }
    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            this.up('form').getForm().reset();
            Ext.getCmp('wformlinkedaccUnitTHR').hide();
        }
    }, {
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {

                        Ext.Msg.alert('Success', action.result.message);
                        
                        storeGridSetupUnitLinkPayrollTHR.load({
                            params: {
                                'extraparams': 'a.idemployeetype:' + Ext.getCmp('idemployeetypeUnitTHR').getValue()
                            }
                        });

                        Ext.getCmp('wformlinkedaccUnitTHR').hide();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        storeGridSetupUnitInsuranceLink.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
var wformlinkedaccUnitTHR = Ext.create('widget.window', {
    id: 'wformlinkedaccUnitTHR',
    title: 'Hubungkan Akun THR',
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
    items: [formlinkedaccUnitTHR]
});
///////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////
var formEmployeeType = Ext.create('Ext.form.Panel', {
    id: 'formEmployeeType',
    width: 680,
    height: 310,
    url: SITE_URL + 'backend/saveform/employeetype/setup',
    baseParams: {idmenu:72},
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 180,
        anchor: '100%'
        // width: 420
    },
    items: [{
            xtype: 'hiddenfield',
            id: 'idunitemployeetype',
            fieldLabel: 'idunit',
            name: 'idunit'
        }, {
            xtype: 'hiddenfield',
            name: 'statusformemployeetype',
            id: 'statusformemployeetype'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idemployeetype',
            id: 'idemployeetypeSetup',
            name: 'idemployeetype'
        }, {
            xtype: 'comboxunit',
            valueField: 'idunit',
            id: 'idunitEmployeeType',
            allowBlank: false
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Jenis',
            allowBlank: false,
            name: 'nametype'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Deskripsi',
            name: 'description'
        }, {
            xtype: 'comboxpayrolltype',
            id: 'payrolltypeid',
            allowBlank: false
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Jumlah Pembayaran/Gaji',
            allowBlank: false,
            name: 'fare'
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupEmployeeType');
            Ext.getCmp('formEmployeeType').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnEmployeeTypeSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formEmployeeType').getForm().reset();
                        Ext.getCmp('windowPopupEmployeeType').hide();
                        storeGridEmployeeType.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridEmployeeType.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
var wEmployeeType = Ext.create('widget.window', {
    id: 'windowPopupEmployeeType',
    title: 'Form Jenis Pegawai',
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
    items: [formEmployeeType]
});
Ext.define('GridEmployeeTypeModel', {
    extend: 'Ext.data.Model',
    fields: ['idemployeetype', 'nametype', 'description', 'idaccountpayroll', 'idaccount', 'accnamepayroll', 'accnamekas', 'namaunit', 'payrolltypeid', 'payname', 'fare', 'idaccountpaythr', 'idaccountthr'],
    idProperty: 'id'
});
var storeGridEmployeeType = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridEmployeeTypeModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/employeetype/setup',
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
Ext.define('MY.searchGridEmployeeType', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridEmployeeType',
    store: storeGridEmployeeType,
    width: 180
});
var smGridEmployeeType = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridEmployeeType.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteEmployeeType').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteEmployeeType').enable();
        }
    }
});
Ext.define(dir_sys + 'setup.GridEmployeeType', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridEmployeeType,
    title: 'Jenis Jabatan Pegawai',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridEmployeeTypeID',
    id: 'GridEmployeeTypeID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridEmployeeType',
    store: storeGridEmployeeType,
    loadMask: true,
    columns: [{
        header: 'Kode Jabatan',
        dataIndex: 'idemployeetype'
    }, {
        header: 'idunit',
        dataIndex: 'idunit',
        hidden: true
    }, {
        header: 'Nama Jabatan',
        dataIndex: 'nametype',
        minWidth: 150
    }, {
        header: 'Deskripsi',
        dataIndex: 'description',
        minWidth: 250
    }, {
        header: 'ccount payroll',
        dataIndex: 'idaccountpayroll',
        minWidth: 150,
        hidden: true
    }
    // , {
    //     header: 'Akun Kas Pembayaran Gaji',
    //     dataIndex: 'accnamekas',
    //     minWidth: 200
    // }, {
    //     header: 'Akun Pencatatan Gaji',
    //     dataIndex: 'accnamepayroll',
    //     minWidth: 200
    // }
    , {
        header: 'Unit',
        hidden:true,
        dataIndex: 'namaunit',
        minWidth: 150
    }, {
        header: 'Jenis Penggajian',
        dataIndex: 'payname',
        minWidth: 150
    }, {
        header: 'Tarif Gaji/Gaji Pokok',
        dataIndex: 'fare',
        flex:1,
        minWidth: 150,
        align: 'right',
        xtype: 'numbercolumn'
    }, ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            xtype: 'comboxunit',
            valueField: 'idunit',
            hidden:true,
            id: 'cbUnitEmployeeType',
            listeners: {
                'change': function(field, newValue, oldValue) {
                    storeGridEmployeeType.load({
                        params: {
                            'extraparams': 'a.idunit:' + Ext.getCmp('cbUnitEmployeeType').getValue()
                        }
                    });
                }
            }
        }]
    }, {
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addEmployeeType',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wEmployeeType.show();
                Ext.getCmp('statusformemployeetype').setValue('input');
                payrolltypeStore.load();
                //  storeGridSetupUnitLinkPayrollKas.load({
                //         params: {
                //             'extraparams': 'a.idemployeetype:' + null
                //         }
                //     });

                //  storeGridSetupUnitLinkPayrollTHR.load({
                //     params: {
                //         'extraparams': 'a.idemployeetype:'+ null
                //     }
                // });
            }
        }, {
            itemId: 'editEmployeeType',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridEmployeeType')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    payrolltypeStore.load();
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formEmployeeType = Ext.getCmp('formEmployeeType');
                    formEmployeeType.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/EmployeeType/1/setup',
                        params: {
                            extraparams: 'a.idemployeetype:' + selectedRecord.data.idemployeetype
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wEmployeeType.show();
                    Ext.getCmp('statusformemployeetype').setValue('edit');
                }
            }
        }, {
            id: 'btnDeleteEmployeeType',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridEmployeeType')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/EmployeeType/setup',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    idmenu:72
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (!d.success) {
                                        Ext.Msg.alert('Informasi', d.message);
                                    } else {
                                        storeGridEmployeeType.load();
                                    }
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                }
                            });
                        }
                    }
                });
            },
            //                    disabled: true
        }, '->', 'Pencarian: ', ' ', {
            xtype: 'searchGridEmployeeType',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridEmployeeType, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridEmployeeType.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formEmployeeType = Ext.getCmp('formEmployeeType');
            wEmployeeType.show();
            formEmployeeType.getForm().load({
                url: SITE_URL + 'backend/loadFormData/EmployeeType/1/setup',
                params: {
                    extraparams: 'a.idemployeetype:' + record.data.idemployeetype
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
            Ext.getCmp('statusformemployeetype').setValue('edit');
            storeGridSetupUnitLinkPayrollKas.load({
                params: {
                    'extraparams': 'a.idemployeetype:' + record.data.idemployeetype
                }
            });

            storeGridSetupUnitLinkPayrollTHR.load({
                params: {
                    'extraparams': 'a.idemployeetype:' + record.data.idemployeetype
                }
            });
        }
    }
});