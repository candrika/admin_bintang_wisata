if (!Ext.isDefined(Ext.getCmp('GridItemEntrySalesMultiInvoice'))) {
    var GridItemEntrySalesMultiInvoice = Ext.create(dir_sys + 'sales2.GridItemEntrySalesMultiInvoice');
} else {
    var GridItemEntrySalesMultiInvoice = Ext.getCmp('GridItemEntrySalesMultiInvoice');
}

if (!Ext.isDefined(Ext.getCmp('receiveMultiCashListWindow'))) {
    var receiveMultiCashListWindow = Ext.create(dir_sys + 'sales2.receiveMultiCashListWindow');
} else {
    var receiveMultiCashListWindow = Ext.getCmp('receiveMultiCashListWindow');
}

if (!Ext.isDefined(Ext.getCmp('wCoaSalesMultiPaymentPopup'))) {
    var wCoaSalesMultiPaymentPopup = Ext.create(dir_sys + 'sales2.wCoaSalesMultiPaymentPopup');
} else {
    var wCoaSalesMultiPaymentPopup = Ext.getCmp('wCoaSalesMultiPaymentPopup');
}

Ext.define(dir_sys + 'sales2.windowPopupSalesMultiPayment', {
    extend: 'Ext.window.Window',
    alias: 'widget.windowPopupSalesMultiPayment',
    id: 'windowPopupSalesMultiPayment',
    title: 'Input Pembayaran',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    maximizable: true,
    closable: true,
    autoDestroy: false,
    modal: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: panelW-100,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'form',
        id: 'form_SalesMultiPayment',
        autoWidth: true,
        url: CLINIC_API + 'sales/save_payment',
        autoHeight: true,
        bodyPadding: 5,
        // width:400,
        defaults: {
            anchor: '100%',
            labelWidth: 190
        },
        fieldDefaults: {
            msgTarget: 'side',
            blankText: 'Tidak Boleh Kosong'
        },
        items: [
        {
            xtype: 'hiddenfield',
            name: 'idcustomer',
            id: 'idcustomer_multipaymentsales'            
        },
        {
            xtype: 'hiddenfield',
            name: 'key',
            value:key
        },
        {
            xtype: 'hiddenfield',
            name: 'password',
            value:password
        },
        {
            xtype: 'hiddenfield',
            name: 'idunit',
            value:idunit  
        },
        {
            xtype:'GridItemEntrySalesMultiInvoice'
        },
        {
            xtype: 'textfield',
            readOnly: true,
             anchor: '50%',
            name:'total_billed',
            id: 'totalpayment_multipaymentsales',
            fieldStyle: 'text-align: right;',
            fieldLabel: 'Jumlah Tagihan'
        },
        {
            xtype: 'radiogroup',
            hidden:true,
            id: 'is_from_cash_multisi',
            labelWidth: 180,
            fieldLabel: 'Ambil Dari Penerimaan Kas?',
            // columns: 2,
            vertical: true,
            items: [
                { boxLabel: 'Ya', name: 'is_from_cash', inputValue: 1, width: 50 },
                { boxLabel: 'Tidak', name: 'is_from_cash', inputValue: 2, checked: true, width: 70 }
            ],
            listeners: {
                change: function(radiogroup, radio) {
                    if (radio.is_from_cash == 2) {
                        Ext.getCmp('amount_SalesMultiPayment').show();
                        Ext.getCmp('namereceivemoney_SalesMultiPayment').hide();
                        Ext.getCmp('accname_coa_multipaymentsales').show();

                        Ext.getCmp('idreceivemoney_SalesMultiPayment').setValue(null);
                        Ext.getCmp('balance_multipaymentsales').setValue(null);
                        Ext.getCmp('namereceivemoney_SalesMultiPayment').setValue(null);
                        Ext.getCmp('amount_multireceivemoney').hide();
                    } else {
                        Ext.getCmp('amount_SalesMultiPayment').hide();
                        Ext.getCmp('namereceivemoney_SalesMultiPayment').show();
                        Ext.getCmp('accname_coa_multipaymentsales').hide();
                        Ext.getCmp('amount_multireceivemoney').show();
                        
                    }
                }
            }
        },
        {
            xtype:'hiddenfield',
            id:'idreceivemoney_SalesMultiPayment',
            name:'idreceivemoney'
        },
        {
            xtype: 'textfield',
            hidden:true,
            fieldLabel: 'Pembayaran Dari Kas',
            emptyText:'Pilih data penerimaan...',
            name: 'name_receivemoney',
            id: 'namereceivemoney_SalesMultiPayment',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {

                        var GridReceiveCashStore = Ext.getCmp('GridReceiveCash').getStore();
                        receiveMultiCashListWindow.show();

                        GridReceiveCashStore.on('beforeload',function(store, operation,eOpts){
                            operation.params={
                                        'extraparams': 'a.idcustomer:' + Ext.getCmp('idcustomer_multipaymentsales').getValue()
                            };
                        });
                        GridReceiveCashStore.load();

                    });
                }
            }
        },
        //dari penerimaan di kas
        {
            xtype:'textfield',
            fieldLabel:'Jumlah Bayar',
            readOnly:true,
            fieldStyle: 'text-align: right;',
            id:'amount_multireceivemoney',
            name:'amount_multireceivemoney',
            listeners: {
                'render': function(c) {
                    c.getEl().on('keyup', function() {
                        this.setRawValue(renderNomor(this.getValue()));
                        updateSelisihSalesMultiPayment();
                    }, c);
                }
            }
        }, 
        {
            xtype: 'textfield',
            readOnly:true,
            anchor: '50%',
            // cls: 'my-mandatory-field',
            // allowBlank: false,
            name: 'amount',
            // maxValue:data.balance*1,
            // minValue: 0,
            id: 'amount_SalesMultiPayment',
            fieldLabel: 'Jumlah Bayar',
            fieldStyle: 'text-align: right;',
            listeners: {
                'render': function(c) {
                    c.getEl().on('keyup', function() {
                        this.setRawValue(renderNomor(this.getValue()));
                        updateSelisihSalesMultiPayment();
                    }, c);
                }
            }
        }, {
            xtype: 'textfield',
            readOnly: true,
            anchor: '50%',
            name:'balance_sales',
            id: 'balance_multipaymentsales',
            fieldLabel: 'Sisa Tagihan',
            fieldStyle: 'text-align: right;',
        }, {
            xtype: 'datefield',
            format: 'd-m-Y',
            anchor: '50%',
            allowBlank: false,
            id: 'date_payment_sales',
            name: 'date_payment',
            fieldLabel: 'Tgl Pembayaran',
        }, 
        // {
        //     xtype: 'textfield',
        //     anchor: '50%',
        //     fieldLabel: 'Akun Kas/Bank',
        //     // allowBlank: false,
        //     name: 'accnametujuan',
        //     id: 'accname_coa_multipaymentsales',
        //     listeners: {
        //         render: function(component) {
        //             component.getEl().on('click', function(event, el) {
        //                 wCoaSalesMultiPaymentPopup.show();
        //                 var GridCOAMultiPayment = Ext.getCmp('GridCOAMultiPaymentSalesPopup').getStore();
        //                 GridCOAMultiPayment.on('beforeload', function(store, operation, eOpts) {
        //                     operation.params = {
        //                         'idunit': idunit,
        //                         'idaccounttype': '1,19'
        //                     };
        //                 });
        //                 GridCOAMultiPayment.load();
        //             });
        //         }
        //     }
        // }, 
        // {
        //     xtype: 'hiddenfield',
        //     name: 'idaccount',
        //     id: 'idaccount_coa_multipaymentsales',
        // }, 
        {
            xtype: 'textarea',
            anchor: '70%',
            fieldLabel: 'Catatan',
            name: 'notes'
        }]
    }],
    listeners: {
        'show': function() {
            // storeGridSalesOrderGrid.load();
        }
    },
    buttons: [{
        text: 'Batal',
        handler: function() {
            // this.up('form').getForm().reset();
            Ext.getCmp('windowPopupSalesMultiPayment').hide();
        }
    }, {
        text: 'Simpan Pembayaran',
        handler: function(button, event, options) {

            var selisih = Ext.getCmp('balance_multipaymentsales').getValue() * 1;
            if (selisih< 0) {
                Ext.Msg.alert("Error!", "Payment exceeds the outstanding balance");
            } else {
                var GridItemEntrySalesMultiInvoiceStore = Ext.getCmp('GridItemEntrySalesMultiInvoice').getStore();

                var json = Ext.encode(Ext.pluck(GridItemEntrySalesMultiInvoiceStore.data.items, 'data'));

                var form = Ext.getCmp('form_SalesMultiPayment').getForm();
                if (form.isValid()) {
                    form.submit({
                        params: {
                            datagrid: json
                        },
                        success: function(form, action) {
                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('form_SalesMultiPayment').getForm().reset();
                            Ext.getCmp('windowPopupSalesMultiPayment').hide();
                            
                            setHeaderSalesSummary();
                          	
                          	Ext.getCmp('SalesGridID').getStore().load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            //                                     storeGridPengaturan.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
         
        }
    }]
});


