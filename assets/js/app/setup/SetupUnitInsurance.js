var formlinkedaccUnitInsurancex = Ext.create('Ext.form.Panel', {
    id: 'formlinkedaccUnitInsurance',
    width: 480,
    height: 170,
    url: SITE_URL + 'account/saveLinkUnitInsurance',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 260,
        width: 450
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'idasuransi',
        id: 'idasuransiAccUnitInsurance'
    }, {
        xtype: 'hiddenfield',
        name: 'idunit',
        id: 'idUnitInsuranceAccUnitInsurance'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Unit',
        name:'namaunit',
        id: 'namaUnitInsuranceAccUnitInsurance',
        readOnly: true
    }, 
    {
            xtype: 'hiddenfield',
            name: 'idaccountemp',
            id: 'idaccountempSetup'
        },{
            xtype: 'textfield',
            fieldLabel: 'Akun Premi Tanggungan Karyawan (K)',
            allowBlank: false,
            name: 'accnameemp',
            id: 'accnameInsuranceSetupE',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        windowPopupAccInsuranceEmp.show();
                        // storeAccountAktive.load();
                        storeAccountAktive.load({
                            params: {
                                'idunit': Ext.getCmp('idUnitInsuranceAccUnitInsurance').getValue(),
                                'idaccounttype': '18,9,10'
                            }
                        });
                    });
                }
            }
        },{
            xtype: 'hiddenfield',
            name: 'idaccountcomp',
            id: 'idaccountcompSetup'
        },{
            xtype: 'textfield',
            fieldLabel: 'Akun Premi Tanggungan Perusahaan (D)',
            allowBlank: false,
            name: 'accnamecomp',
            id: 'accnameInsuranceSetupC',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        windowPopupAccInsuranceCmp.show();
                        storeAccountAktive.load({
                            params: {
                                 'idunit': Ext.getCmp('idUnitInsuranceAccUnitInsurance').getValue(),
                                 'idaccounttype': '14,15'
                            }
                        });
                    });
                }
            }
        }
    
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            this.up('form').getForm().reset();
            Ext.getCmp('wformlinkedaccUnitInsurance').hide();
        }
    }, {
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        storeGridSetupUnitLinkInsurance.load({
                            params: {
                                'extraparams': 'a.idasuransi:'+Ext.getCmp('idasuransiAccUnitInsurance').getValue()
                            }
                        });

                        Ext.Msg.alert('Success', action.result.message);
                        // this.up('form').getForm().reset();
                        Ext.getCmp('wformlinkedaccUnitInsurance').hide();
                        Ext.getCmp('windowPopuplinkedacc').hide();
                        // storeGridSetupUnitInsuranceLink.load();
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

var wformlinkedaccUnitInsurancex = Ext.create('widget.window', {
    id: 'wformlinkedaccUnitInsurance',
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
    items: [formlinkedaccUnitInsurancex]
});
///////////////////////// END FORM LINK UNIT INSURANCE//////////////////////////////////////

Ext.define('GridSetupUnitLinkInsuranceModel', {
    extend: 'Ext.data.Model',
    fields: ['idasuransi','idunit','namaunit','idlinked','namelinked','idaccount','accname','accnumber','accanemecmp','accnameemp'],
    idProperty: 'id'
});

var storeGridSetupUnitLinkInsurance = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSetupUnitLinkInsuranceModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/unitcompanylinkinsurance/setup',
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

// var formlinkedaccUnitInsurance = Ext.create('Ext.form.Panel', {
//     id: 'formlinkedaccUnitInsurance',
//     width: 450,
//     height: 150,
//     url: SITE_URL + 'account/saveLinkUnitInsurance',
//     bodyStyle: 'padding:5px',
//     labelAlign: 'top',
//     autoScroll: true,
//     fieldDefaults: {
//         msgTarget: 'side',
//         blankText: 'Tidak Boleh Kosong',
//         labelWidth: 130,
//         width: 400
//     },
//     items: [{
//         xtype: 'hiddenfield',
//         name: 'idasuransi',
//         id: 'idasuransiAccUnitInsurance'
//     }, {
//         xtype: 'hiddenfield',
//         name: 'idaccount',
//         id: 'idaccountAccUnitInsurance'
//     }, {
//         xtype: 'hiddenfield',
//         name: 'idUnitInsurance',
//         id: 'idUnitInsuranceAccUnitInsurance'
//     }, {
//         xtype: 'textfield',
//         fieldLabel: 'UnitInsurance',
//         name:'namaUnitInsurance',
//         id: 'namaUnitInsuranceAccUnitInsurance',
//         readOnly: true
//     }, {
//         xtype: 'textfield',
//         fieldLabel: 'Akun',
//         allowBlank: false,
//         name: 'accname',
//         id: 'accUnitInsuranceSetup',
//         listeners: {
//             render: function(component) {
//                 component.getEl().on('click', function(event, el) {
//                     winAccUnitInsurance.show();
//                     storeAccountAktive.load({
//                         params: {
//                             'idUnitInsurance': Ext.getCmp('idUnitInsuranceAccUnitInsurance').getValue()
//                         }
//                     });
//                 });
//             }
//         }
//     }, {
//         xtype: 'textfield',
//         fieldLabel: 'No Akun',
//         name:'accnumber',
//         id: 'accnumberUnitInsuranceSetup',
//         readOnly: true
//     }],
//     buttons: [{
//         text: 'Batal',
//         handler: function() {
//             this.up('form').getForm().reset();
//             Ext.getCmp('wformlinkedaccUnitInsurance').hide();
//         }
//     }, {
//         text: 'Simpan',
//         handler: function() {
//             var form = this.up('form').getForm();
//             if (form.isValid()) {
//                 form.submit({
//                     success: function(form, action) {
//                         Ext.Msg.alert('Success', action.result.message);
//                         // this.up('form').getForm().reset();
//                         Ext.getCmp('wformlinkedaccUnitInsurance').hide();
//                         Ext.getCmp('windowPopuplinkedacc').hide();
//                         // storeGridSetupUnitInsuranceLink.load();
//                     },
//                     failure: function(form, action) {
//                         Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                         storeGridSetupUnitInsuranceLink.load();
//                     }
//                 });
//             } else {
//                 Ext.Msg.alert("Error!", "Your form is invalid!");
//             }
//         }
//     }]
// });

// var wformlinkedaccUnitInsurance = Ext.create('widget.window', {
//     id: 'wformlinkedaccUnitInsurance',
//     title: 'Hubungkan Akun',
//     header: {
//         titlePosition: 2,
//         titleAlign: 'center'
//     },
//     closable: true,
//     closeAction: 'hide',
//     autoWidth: true,
//     // minWidth: 450,
//     // height: 450,
//     autoHeight: true,
//     layout: 'fit',
//     border: false,
//     items: [formlinkedaccUnitInsurance]
// });

///////////////////////////////////////////////////

var forminsuranceacc = Ext.create('Ext.form.Panel', {
    id: 'forminsuranceacc',
    width: 660,
    height: 310,
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    url: SITE_URL + 'backend/saveform/unitinsurance/setup',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 230,
        width:550
        // width: '100%'
    },
    items: [{
            xtype: 'hiddenfield',
            name: 'statusformunitinsurance',
            id: 'statusformunitinsurance'
        }, {
            xtype: 'textfield',
            allowBlank: false,
            fieldLabel: 'Nama Premi',
            name: 'namapremi',
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idasuransi',
            name: 'idasuransi',
            id:'idinsuranceSetup',
            readOnly: true
        }, {
            xtype: 'textarea',
            fieldLabel: 'Deskripsi',
            allowBlank: false,
            name: 'deskripsi',
        }, 
         {
                xtype: 'fieldcontainer',
                fieldLabel: 'Potongan Karyawan (%)',
                combineErrors: true,
                msgTarget : 'side',
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    hideLabel: true
                },
                items: [
                    {
                        xtype     : 'textfield',
                        name: 'percentemployee',
                        margin: '0 5 0 0',
                        allowBlank: false
                    },
                    {
                        xtype: 'checkbox',
                        fieldLabel: ' ',
                        boxLabel  :'Tampilkan Di Slip Gaji',
                        name: 'tampilemp'
                    }
                ]
            },
             {
                xtype: 'fieldcontainer',
                fieldLabel: 'Tanggungan Perusahaan (%)',
                combineErrors: true,
                msgTarget : 'side',
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    hideLabel: true
                },
                items: [
                    {
                        xtype     : 'textfield',
                        // fieldLabel: 'Potongan Karyawan (%)',
                        minWidth:10,
                        name: 'percentcompany',
                        margin: '0 5 0 0',
                        allowBlank: false
                    },
                    {
                        xtype: 'checkbox',
                        // fieldLabel: ' ',
                        boxLabel  :'Tampilkan Di Slip Gaji',
                        name: 'tampilcmp'
                    }
                ]
            },
        //     {
        //     xtype: 'textfield',
        //     allowBlank: false,
        //     fieldLabel: 'Potongan Karyawan (%)',
        //     name: 'percentemployee',
        // },
        //  {
        //     xtype: 'checkbox',
        //     fieldLabel: ' ',
        //     boxLabel  :'Tampilkan Di Slip Gaji',
        //     name: 'tampilemp'
        // },
        // {
        //     xtype: 'textfield',
        //     fieldLabel: 'Tanggungan Perusahaan (%)',
        //     allowBlank: false,
        //     name: 'percentcompany',
        // },{
        //     xtype: 'checkbox',
        //     fieldLabel: ' ',
        //     boxLabel  :'Tampilkan Di Slip Gaji',
        //     name: 'tampilcmp'
        // },


       
        {
            xtype: 'gridpanel',
            id: 'GridLinkedAccInsurance',
            // title: 'Hubungkan ',
            store: storeGridSetupUnitLinkInsurance,
            height: 150,
            columns: [
            {
                text: 'Edit',
                width: 45,
                // menuDisabled: true,
                xtype: 'actioncolumn',
                tooltip: 'Ubah Data',
                align: 'center',
                icon: BASE_URL + 'assets/icons/fam/pencil.png',
                handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                    // console.log(record.data);
                    var formlinkedaccUnitInsurance = Ext.getCmp('formlinkedaccUnitInsurance');
                    wformlinkedaccUnitInsurancex.show();
                    formlinkedaccUnitInsurance.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/unitcompanylinkinsurance/1/setup',
                        params: {
                            extraparams: 'a.idunit:' + record.get('idunit') + ',' + 'a.idasuransi:' + record.get('idasuransi')
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                            var d = Ext.decode(action.response.responseText);
                                                // console.log(d.data.namaunit)a
                                            // alert(record.get('idasuransi'));
                            Ext.getCmp('idasuransiAccUnitInsurance').setValue(record.get('idasuransi'));
                            Ext.getCmp('idUnitInsuranceAccUnitInsurance').setValue(record.get('idunit'));
                            Ext.getCmp('namaUnitInsuranceAccUnitInsurance').setValue(record.get('namaunit'));
                            Ext.getCmp('idaccountempSetup').setValue(record.get('idaccountemp'));
                            Ext.getCmp('accnameInsuranceSetupE').setValue(record.get('accnameemp'));
                            Ext.getCmp('idaccountcompSetup').setValue(record.get('idaccountcomp'));
                            Ext.getCmp('accnameInsuranceSetupC').setValue(record.get('accanemecmp'));
                        },
                        failure: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    // var formlinkedacc = Ext.getCmp('formlinkedaccUnit');
                    // wformlinkedaccUnit.show();
                    // formlinkedacc.getForm().load({
                    //     url: SITE_URL + 'backend/loadFormData/linkedaccUnit/1/setup',
                    //     params: {
                    //         extraparams: 'a.idunit:' + record.get('idunit') + ',' + 'a.idaccount:' + record.get('idaccount') + ',' + 'a.idlinked:' + Ext.getCmp('idlinkedSetup').getValue()
                    //     },
                    //     success: function(form, action) {
                    //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
                    //     },
                    //     failure: function(form, action) {
                    //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
                    //     }
                    // })
                    // // Ext.getCmp('GridLinkedAcc').setTitle('Hubungkan Akun '+record.data.namelinked+' ke setiap Unit');
                    // // console.log(Ext.getCmp('idlinkedSetup').getValue());           
                    // Ext.getCmp('namaunitAccUnit').setValue(record.get('namaunit'));
                    // Ext.getCmp('idlinkedAccUnit').setValue(Ext.getCmp('idlinkedSetup').getValue());
                    // Ext.getCmp('idunitAccUnit').setValue(record.get('idunit'));
                }
            },
            {
                header: 'idasuransi',
                dataIndex: 'idasuransi',
                hidden: true
            }, 
            {
                header: 'idunit',
                dataIndex: 'idunit',
                hidden: true
            }, {
                header: 'idaccount',
                dataIndex: 'idaccount',
                hidden: true
            }, {
                header: 'Nama Unit',
                dataIndex: 'namaunit',
                minWidth: 90,
            }, {
                header: 'Akun Beban Karyawan',
                dataIndex: 'accanemecmp',
                minWidth: 250
            }, {
                header: 'Akun Beban Perusahaan',
                dataIndex: 'accnameemp',
                minWidth: 250
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
                    var formlinkedaccUnitInsurance = Ext.getCmp('formlinkedaccUnitInsurance');
                    wformlinkedaccUnitInsurancex.show();
                    formlinkedaccUnitInsurance.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/unitcompanylinkinsurance/1/setup',
                        params: {
                            extraparams: 'a.idunit:' + record.data.idunit + ',' + 'a.idasuransi:' + record.data.idasuransi
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                            var d = Ext.decode(action.response.responseText);
                                                // console.log(d.data.namaunit)
                            Ext.getCmp('idasuransiAccUnitInsurance').setValue(d.data.idasuransi);
                            Ext.getCmp('idUnitInsuranceAccUnitInsurance').setValue(d.data.idunit);
                            Ext.getCmp('namaUnitInsuranceAccUnitInsurance').setValue(d.data.namaunit);
                            Ext.getCmp('idaccountempSetup').setValue(d.data.idaccountemp);
                            Ext.getCmp('accnameInsuranceSetupE').setValue(d.data.accnameemp);
                            Ext.getCmp('idaccountcompSetup').setValue(d.data.idaccountcomp);
                            Ext.getCmp('accnameInsuranceSetupC').setValue(d.data.accanemecmp);
                        },
                        failure: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    // Ext.getCmp('GridLinkedAcc').setTitle('Hubungkan Akun '+record.data.namelinked+' ke setiap Unit');
                    // console.log(Ext.getCmp('idlinkedSetup').getValue());           
                    // Ext.getCmp('namaunitAccUnit').setValue(record.data.namaunit);
                    // Ext.getCmp('idlinkedAccUnit').setValue(Ext.getCmp('idlinkedSetup').getValue());
                    // Ext.getCmp('idunitAccUnit').setValue(record.data.idunit);
                    // Ext.getCmp('namaunitAccUnit').formlinkedaccUnit
                }
            }
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupinsuranceacc');
            Ext.getCmp('forminsuranceacc').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtninsuranceaccSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('forminsuranceacc').getForm().reset();
                        Ext.getCmp('windowPopupinsuranceacc').hide();
                        storeGridinsuranceacc.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        storeGridinsuranceacc.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var winsuranceacc = Ext.create('widget.window', {
    id: 'windowPopupinsuranceacc',
    title: 'Ubah Detail Jenis Asuransi',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    // minWidth: 450,
    height: 450,
    // autoHeight: true,
    layout: 'fit',
    border: false,
    items: [forminsuranceacc]
});

Ext.define('GridinsuranceaccModel', {
    extend: 'Ext.data.Model',
    fields: ['idasuransi','namapremi','deskripsi','tampilemp','tampilcmp','percentemployee','percentcompany','idaccountemp','idaccountcomp','accnameemp','accnamecomp'],
    idProperty: 'id'
});

var storeGridinsuranceacc = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridinsuranceaccModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/unitinsurance/setup',
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
Ext.define('MY.searchGridinsuranceacc', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridinsuranceacc',
    store: storeGridinsuranceacc,
    width: 180
});

var smGridinsuranceacc = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridinsuranceacc.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteinsuranceacc').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteinsuranceacc').enable();
        }
    }
});

Ext.define('Gridinsuranceacc', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridinsuranceacc,
    title: 'Jenis Asuransi',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridinsuranceaccID',
    id: 'GridinsuranceaccID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.Gridinsuranceacc',
    store: storeGridinsuranceacc,
    loadMask: true,
    columns: [{
            header: 'idasuransi',
            dataIndex: 'idasuransi',
            hidden: true
        }, {
            header: 'Nama Premi',
            dataIndex: 'namapremi',
            minWidth: 100
        },
         {
            header: 'Deskripsi',
            dataIndex: 'deskripsi',
            minWidth: 350
        },
        // {
        //     header: 'fixamount',
        //     dataIndex: 'fixamount',
        //     minWidth: 150
        // },
        {
            header: 'Persentase Potongan Karyawan',
            dataIndex: 'percentemployee',
            minWidth: 250
        },
        {
            header: 'Persentase Tanggungan Perusahaan',
            dataIndex: 'percentcompany',
            minWidth: 250
        },
        // {
        //     header: 'Akun Premi Tanggungan Karyawan',
        //     dataIndex: 'accnameemp',
        //     minWidth: 250
        // },
        // {
        //     header: 'Akun Premi Tanggungan Perusahaan',
        //     dataIndex: 'accnamecomp',
        //     minWidth: 250
        // }
    ],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                itemId: 'addinsuranceacc',
                text: 'Tambah Data',
                iconCls: 'edit-icon',
                handler: function() {
                    //                        Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    winsuranceacc.show();
                    Ext.getCmp('statusformunitinsurance').setValue('input');
                }
            }, '->', 'Search: ', ' ', {
                xtype: 'searchGridinsuranceacc',
                text: 'Left Button'
            }]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridinsuranceacc, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
            // pageSize:20
        }
        // , {
        //     xtype: 'toolbar',
        //     dock: 'top',
        //     items: [{
        //         itemId: 'addinsuranceacc',
        //         text: 'Tambah Data',
        //         iconCls: 'add-icon',
        //         handler: function () {
        //             // WindowKaryawan('Input Karyawan Baru','input');
        //             winsuranceacc.show();
        //         }
        //     }]
        // }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridinsuranceacc.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var forminsuranceacc = Ext.getCmp('forminsuranceacc');
            winsuranceacc.show();       

            forminsuranceacc.getForm().load({
                url: SITE_URL + 'backend/loadFormData/unitinsurance/1/setup',
                params: {
                    extraparams: 'a.idasuransi:' + record.data.idasuransi
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.message);
                }
            })
            // Ext.getCmp('GridinsuranceAcc').setTitle('Hubungkan Akun ' + record.data.nameinsurance + ' ke setiap Unit');
            // console.log(record.data.idinsurance)
            // Ext.getCmp('idinsuranceSetup').setValue(record.data.idinsurance);
            //            
            //            Ext.getCmp('kddaerahS').setReadOnly(true);
            //            Ext.getCmp('kdtgktunitS').setReadOnly(true);
            //            Ext.getCmp('kodesubunitS').setReadOnly(true);
            //            Ext.getCmp('kodejenjangmaster').setReadOnly(true);
            storeGridSetupUnitLinkInsurance.load({
                        params: {
                            'extraparams': 'a.idasuransi:'+record.data.idasuransi
                        }
                    });

            Ext.getCmp('GridLinkedAccInsurance').setTitle('Hubungkan Akun Pencatatan ' + record.data.namapremi + ' ke setiap Unit');

            Ext.getCmp('statusformunitinsurance').setValue('edit');
        }
    }
});