Ext.define('GridCustomerPriceModel', {
    extend: 'Ext.data.Model',
    fields: ['idsupplier', 'code', 'namesupplier', 'companyaddress', 'companyaddress2', 'companyaddress3', 'shipaddress', 'billaddress', 'telephone', 'handphone', 'fax', 'email', 'website', 'city', 'state', 'postcode', 'country', 'highestpo', 'avgdaypay', 'lastpayment', 'lastpurchase', 'expenseaccount', 'notes'],
    idProperty: 'id'
});
var storeGridCustomerPrice = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridCustomerPriceModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/CustomerPrice/master',
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

var formCustomerPrice = Ext.create('Ext.form.Panel', {
    id: 'formCustomerPrice',
    width: 740,
    // autoWidth:true,
    height: 370,
    url: SITE_URL + 'backend/saveform/CustomerPrice/master',
    baseParams: {idmenu:24},
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    layout: 'hbox',
    defaults: {
        padding: '5 10 5 5',
    },
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 160,
        anchor:'100%'
        // width: 380
    },
    items: [
    {
        items: [{
            xtype: 'hiddenfield',
            name: 'idsupplier',
            id: 'idsupplier'
        }, {
            xtype: 'hiddenfield',
            name: 'statusformCustomerPrice',
            id: 'statusformCustomerPrice'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Supplierx',
            allowBlank: false,
            name: 'code'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Supplier',
            allowBlank: false,
            name: 'namesupplier'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Alamat',
            allowBlank: false,
            name: 'companyaddress'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Alamat Pengiriman',
            name: 'shipaddress'
        },{
            xtype: 'textfield',
            fieldLabel: 'No Telepon',
            allowBlank: false,
            name: 'telephone'
        },{
            xtype: 'textfield',
            fieldLabel: 'No Handphone',
            name: 'handphone'
        }]
    }, {
        items: [{
            xtype: 'textfield',
            fieldLabel: 'No Fax',
            name: 'fax'
        },{
            xtype: 'textfield',
            fieldLabel: 'Email',
            name: 'email'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Website',
            name: 'website'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kota',
            name: 'city'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Provinsi',
            name: 'state'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode POS',
            name: 'postcode'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Negara',
            name: 'country'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Catatan',
            name: 'notes'
        }]
    }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupCustomerPrice');
            Ext.getCmp('formCustomerPrice').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnCustomerPriceSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formCustomerPrice').getForm().reset();
                        Ext.getCmp('windowPopupCustomerPrice').hide();
                        storeGridCustomerPrice.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridCustomerPrice.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wCustomerPrice = Ext.create('widget.window', {
    id: 'windowPopupCustomerPrice',
    title: 'Data Supplier',
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
    items: [formCustomerPrice]
});


// var formCustomerPrice = Ext.create('Ext.form.Panel', {
//     id: 'formCustomerPrice',
//     width: 660,
//     title: 'Profil',
//     height: 390,
//     url: SITE_URL + 'backend/saveform/CustomerPrice',
//     bodyStyle: 'padding:5px',
//     //    autoWidth:true,
//     forceFit: true,
//     autoScroll: true,
//     fieldDefaults: {
//         msgTarget: 'side',
//         blankText: 'Tidak Boleh Kosong',
//         //        padding: '5 40 5 5',
//         labelWidth: 120,
//         width: 300
//     },
//     layout: 'hbox',
//     defaults: {
//         padding: '5 10 5 5',
//     },
//     items: [{
//         items: [{
//             xtype: 'hiddenfield',
//             name: 'idsupplier',
//             id: 'idsupplier'
//         }, {
//             xtype: 'hiddenfield',
//             name: 'statusformCustomerPrice',
//             id: 'statusformCustomerPrice'
//         }, {
//             xtype: 'textfield',
//             fieldLabel: 'Kode Supplier',
//             allowBlank: false,
//             name: 'code'
//         }, {
//             xtype: 'textfield',
//             fieldLabel: 'Nama Supplier',
//             allowBlank: false,
//             name: 'namesupplier'
//         }, {
//             xtype: 'textarea',
//             fieldLabel: 'Alamat',
//             allowBlank: false,
//             name: 'companyaddress'
//         }, {
//             xtype: 'textarea',
//             fieldLabel: 'Alamat Pengiriman',
//             name: 'shipaddress'
//         },{
//             xtype: 'textfield',
//             fieldLabel: 'No Telepon',
//             allowBlank: false,
//             name: 'telephone'
//         },{
//             xtype: 'textfield',
//             fieldLabel: 'No Handphone',
//             name: 'handphone'
//         }]
//     }, {
//         items: [{
//             xtype: 'textfield',
//             fieldLabel: 'No Fax',
//             name: 'fax'
//         },{
//             xtype: 'textfield',
//             fieldLabel: 'Email',
//             name: 'email'
//         }, {
//             xtype: 'textfield',
//             fieldLabel: 'Website',
//             name: 'website'
//         }, {
//             xtype: 'textfield',
//             fieldLabel: 'Kota',
//             name: 'city'
//         }, {
//             xtype: 'textfield',
//             fieldLabel: 'Provinsi',
//             name: 'state'
//         }, {
//             xtype: 'textfield',
//             fieldLabel: 'Kode POS',
//             name: 'postcode'
//         }, {
//             xtype: 'textfield',
//             fieldLabel: 'Negara',
//             name: 'country'
//         }, {
//             xtype: 'textarea',
//             fieldLabel: 'Catatan',
//             name: 'notes'
//         }]
//     }]
// });
// Ext.define('TabSupplier', {
//     extend: 'Ext.tab.Panel',
//     id: 'TabSupplier',
//     alias: 'widget.TabSupplier',
//     activeTab: 0,
//     autoWidth: '100%',
//     autoScroll: true,
//      defaults: {
//         // autoScroll: true,
//         // bodyPadding: '1 0 15 0'
//     },
//     items: [
//         formCustomerPrice
//         // , {
//         //     xtype: 'GridInventorySupplier',
//         //     listeners: {
//         //         activate: function() {
//         //             storeGridInventorySupplier.load();
//         //         }
//         //     }
//         // }
//     ]
// });
// var wCustomerPrice = Ext.create('widget.window', {
//     id: 'windowPopupCustomerPrice',
//     title: 'Data Supplier',
//     header: {
//         titlePosition: 2,
//         titleAlign: 'center'
//     },
//     closable: true,
//     closeAction: 'hide',
//     //    autoWidth: true,
//     width: 670,
//     minHeight:440,
//     // autoHeight: true,
//     layout: 'fit',
//     border: false,
//     items: [{
//         xtype: 'TabSupplier'
//     }],
//     buttons: [{
//         text: 'Batal',
//         handler: function() {
//             var win = Ext.getCmp('windowPopupCustomerPrice');
//             Ext.getCmp('formCustomerPrice').getForm().reset();
//             win.hide();
//         }
//     }, {
//         id: 'BtnCustomerPriceSimpan',
//         text: 'Simpan',
//         handler: function() {
//             var form =Ext.getCmp('formCustomerPrice').getForm();
//             if (form.isValid()) {
//                 form.submit({
//                     success: function(form, action) {
//                         Ext.Msg.alert('Success', action.result.message);
//                         Ext.getCmp('formCustomerPrice').getForm().reset();
//                         Ext.getCmp('windowPopupCustomerPrice').hide();
//                         storeGridCustomerPrice.load();
//                     },
//                     failure: function(form, action) {
//                         Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                         //                            storeGridCustomerPrice.load();
//                     }
//                 });
//             } else {
//                 Ext.Msg.alert("Error!", "Your form is invalid!");
//             }
//         }
//     }]
// });


Ext.define('MY.searchGridCustomerPrice', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridCustomerPrice',
    store: storeGridCustomerPrice,
    width: 180
});
var smGridCustomerPrice = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridCustomerPrice.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteCustomerPrice').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteCustomerPrice').enable();
        }
    }
});
Ext.define('GridCustomerPrice', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridCustomerPrice,
    title: 'Customer Price',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridCustomerPriceID',
    id: 'GridCustomerPriceID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridCustomerPrice',
    store: storeGridCustomerPrice,
    loadMask: true,
    columns: [{
        header: 'idsupplier',
        dataIndex: 'idsupplier',
        hidden: true
    }, {
        header: 'code',
        dataIndex: 'code',
        minWidth: 150
    }, {
        header: 'namesupplier',
        dataIndex: 'namesupplier',
        minWidth: 150
    }, {
        header: 'telephone',
        dataIndex: 'namaayah',
        minWidth: 150
    }, {
        header: 'handphone',
        dataIndex: 'handphone',
        minWidth: 150
    }, {
        header: 'fax',
        dataIndex: 'fax',
        minWidth: 150
    }, {
        header: 'email',
        dataIndex: 'email',
        minWidth: 150
    }, {
        header: 'website',
        dataIndex: 'website',
        minWidth: 150
    }, {
        header: 'city',
        dataIndex: 'city',
        minWidth: 150
    }, {
        header: 'state',
        dataIndex: 'state',
        minWidth: 150
    }, {
        header: 'postcode',
        dataIndex: 'postcode',
        minWidth: 150
    }, {
        header: 'country',
        dataIndex: 'country',
        minWidth: 150
    }, {
        header: 'notes',
        dataIndex: 'notes',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addCustomerPrice',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wCustomerPrice.show();
                Ext.getCmp('statusformCustomerPrice').setValue('input');
            }
        }, {
            itemId: 'editCustomerPrice',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridCustomerPrice')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formCustomerPrice = Ext.getCmp('formCustomerPrice');
                    formCustomerPrice.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/CustomerPrice/1',
                        params: {
                            extraparams: 'a.idsupplier:' + selectedRecord.data.idsupplier
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wCustomerPrice.show();
                    Ext.getCmp('statusformCustomerPrice').setValue('edit');
                    Ext.getCmp('TabSupplier').setActiveTab(0);
                }
            }
        }, {
            id: 'btnDeleteCustomerPrice',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridCustomerPrice')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/CustomerPrice',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    idmenu:24
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (!d.success) {
                                        Ext.Msg.alert('Informasi', d.message);
                                    } else {
                                        storeGridCustomerPrice.load();
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
            xtype: 'searchGridCustomerPrice',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridCustomerPrice, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridCustomerPrice.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formCustomerPrice = Ext.getCmp('formCustomerPrice');
            wCustomerPrice.show();
            formCustomerPrice.getForm().load({
                url: SITE_URL + 'backend/loadFormData/CustomerPrice/1',
                params: {
                    extraparams: 'a.idsupplier:' + record.data.idsupplier
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
            Ext.getCmp('statusformCustomerPrice').setValue('edit');

            Ext.getCmp('TabSupplier').setActiveTab(0);
        }
    }
});