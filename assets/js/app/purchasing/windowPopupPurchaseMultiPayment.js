if (!Ext.isDefined(Ext.getCmp('GridItemEntryPurchaseMultiInvoice'))) {
    var GridItemEntryPurchaseMultiInvoice = Ext.create(dir_sys + 'purchasing.GridItemEntryPurchaseMultiInvoice');
} else {
    var GridItemEntryPurchaseMultiInvoice = Ext.getCmp('GridItemEntryPurchaseMultiInvoice');
}

if (!Ext.isDefined(Ext.getCmp('receiveMultiCashListWindow'))) {
    var receiveMultiCashListWindow = Ext.create(dir_sys + 'purchasing.receiveMultiCashListWindow');
} else {
    var receiveMultiCashListWindow = Ext.getCmp('receiveMultiCashListWindow');
}

if (!Ext.isDefined(Ext.getCmp('wCoaPurchaseMultiPaymentPopup'))) {
    var wCoaPurchaseMultiPaymentPopup = Ext.create(dir_sys + 'purchasing.wCoaPurchaseMultiPaymentPopup');
} else {
    var wCoaPurchaseMultiPaymentPopup = Ext.getCmp('wCoaPurchaseMultiPaymentPopup');
}

Ext.define(dir_sys + 'purchasing.windowPopupPurchaseMultiPayment', {
    extend: 'Ext.window.Window',
    alias: 'widget.windowPopupPurchaseMultiPayment',
    id: 'windowPopupPurchaseMultiPayment',
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
        id: 'form_PurchaseMultiPayment',
        autoWidth: true,
        url: CLINIC_API  + 'purchase/save_payment',
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
            id: 'idcustomer_multipaymentpurchase'            
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
            xtype:'GridItemEntryPurchaseMultiInvoice'
        },
        {
            xtype: 'textfield',
            readOnly: true,
             anchor: '50%',
            name:'total_billed',
            id: 'totalpayment_multipaymentpurchase',
            fieldStyle: 'text-align: right;',
            fieldLabel: 'Jumlah Tagihan'
        },
        // {
        //     xtype: 'radiogroup',
        //     hidden:true,
        //     id: 'is_from_cash_multisi',
        //     labelWidth: 180,
        //     fieldLabel: 'Ambil Dari Penerimaan Kas?',
        //     // columns: 2,
        //     vertical: true,
        //     items: [
        //         { boxLabel: 'Ya', name: 'is_from_cash', inputValue: 1, width: 50 },
        //         { boxLabel: 'Tidak', name: 'is_from_cash', inputValue: 2, checked: true, width: 70 }
        //     ],
        //     listeners: {
        //         change: function(radiogroup, radio) {
        //             if (radio.is_from_cash == 2) {
        //                 Ext.getCmp('amount_purchaseMultiPayment').show();
        //                 Ext.getCmp('namereceivemoney_purchaseMultiPayment').hide();
        //                 Ext.getCmp('accname_coa_multipaymentpurchase').show();

        //                 Ext.getCmp('idreceivemoney_purchaseMultiPayment').setValue(null);
        //                 Ext.getCmp('balance_multipaymentpurchase').setValue(null);
        //                 Ext.getCmp('namereceivemoney_purchaseMultiPayment').setValue(null);
        //                 Ext.getCmp('amount_multireceivemoney').hide();
        //             } else {
        //                 Ext.getCmp('amount_purchaseMultiPayment').hide();
        //                 Ext.getCmp('namereceivemoney_purchaseMultiPayment').show();
        //                 Ext.getCmp('accname_coa_multipaymentpurchase').hide();
        //                 Ext.getCmp('amount_multireceivemoney').show();
                        
        //             }
        //         }
        //     }
        // },
        // {
        //     xtype:'hiddenfield',
        //     id:'idreceivemoney_purchaseMultiPayment',
        //     name:'idreceivemoney'
        // },
        // {
        //     xtype: 'textfield',
        //     hidden:true,
        //     fieldLabel: 'Pembayaran Dari Kas',
        //     emptyText:'Pilih data penerimaan...',
        //     name: 'name_receivemoney',
        //     id: 'namereceivemoney_purchaseMultiPayment',
        //     listeners: {
        //         render: function(component) {
        //             component.getEl().on('click', function(event, el) {

        //                 var GridReceiveCashStore = Ext.getCmp('GridReceiveCash').getStore();
        //                 receiveMultiCashListWindow.show();

        //                 GridReceiveCashStore.on('beforeload',function(store, operation,eOpts){
        //                     operation.params={
        //                                 'extraparams': 'a.idcustomer:' + Ext.getCmp('idcustomer_multipaymentpurchase').getValue()
        //                     };
        //                 });
        //                 GridReceiveCashStore.load();

        //             });
        //         }
        //     }
        // },
        //dari penerimaan di kas
        // {
        //     xtype:'textfield',
        //     fieldLabel:'Jumlah Bayar',
        //     readOnly:true,
        //     hidden:true,
        //     fieldStyle: 'text-align: right;',
        //     id:'amount_multireceivemoney',
        //     name:'amount_multireceivemoney',
        //     listeners: {
        //         'render': function(c) {
        //             c.getEl().on('keyup', function() {
        //                 this.setRawValue(renderNomor(this.getValue()));
        //                 updateSelisihpurchaseMultiPayment();
        //             }, c);
        //         }
        //     }
        // }, 
        {
            xtype: 'textfield',
            readOnly:true,
            anchor: '50%',
            // cls: 'my-mandatory-field',
            // allowBlank: false,
            name: 'amount',
            // maxValue:data.balance*1,
            // minValue: 0,
            id: 'amount_purchaseMultiPayment',
            fieldLabel: 'Jumlah Bayar',
            fieldStyle: 'text-align: right;',
            listeners: {
                'render': function(c) {
                    c.getEl().on('keyup', function() {
                        this.setRawValue(renderNomor(this.getValue()));
                        updateSelisihpurchaseMultiPayment();
                    }, c);
                }
            }
        }, {
            xtype: 'textfield',
            readOnly: true,
            anchor: '50%',
            name:'balance_purchase',
            id: 'balance_multipaymentpurchase',
            fieldLabel: 'Sisa Tagihan',
            fieldStyle: 'text-align: right;',
        }, {
            xtype: 'datefield',
            format: 'd-m-Y',
            anchor: '50%',
            allowBlank: false,
            id: 'date_payment_purchase',
            name: 'date_payment',
            fieldLabel: 'Tgl Pembayaran',
        },
        // {
        //     xtype: 'textfield',
        //     anchor: '50%',
        //     allowBlank: false,
        //     fieldLabel: 'Akun Kas/Bank',
        //     // allowBlank: false,
        //     name: 'accnametujuan',
        //     id: 'accname_coa_multipaymentpurchase',
        //     listeners: {
        //         render: function(component) {
        //             component.getEl().on('click', function(event, el) {
        //                 wCoaPurchaseMultiPaymentPopup.show();
        //                 var GridCOAMultiPayment = Ext.getCmp('GridCOAMultiPaymentPurchasePopup').getStore();
        //                 GridCOAMultiPayment.getProxy().extraparams={};
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
        // },{
        //     xtype: 'hiddenfield',
        //     name: 'idaccount',
        //     id: 'idaccount_coa_multipaymentpurchase',
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
            // storeGridpurchaseOrderGrid.load();
        }
    },
    buttons: [{
        text: 'Batal',
        handler: function() {
            Ext.getCmp('form_PurchaseMultiPayment').getForm().reset();
            Ext.getCmp('GridItemEntryPurchaseMultiInvoice').getStore().removeAll();
            Ext.getCmp('windowPopupPurchaseMultiPayment').hide();
        }
    }, {
        text: 'Simpan Pembayaran',
        id:'savePaymentbtn',
        // itemId:''
        handler: function(button, event, options) {

            var selisih = Ext.getCmp('balance_multipaymentpurchase').getValue() * 1;
            if (selisih< 0) {
                Ext.Msg.alert("Error!", "Payment exceeds the outstanding balance");
            } else {
                var GridItemEntryPurchaseMultiInvoiceStore = Ext.getCmp('GridItemEntryPurchaseMultiInvoice').getStore();

                var json = Ext.encode(Ext.pluck(GridItemEntryPurchaseMultiInvoiceStore.data.items, 'data'));

                var form = Ext.getCmp('form_PurchaseMultiPayment').getForm();
                if (form.isValid()) {
                    form.submit({
                        params: {
                            datagrid: json
                        },
                        success: function(form, action) {
                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('form_PurchaseMultiPayment').getForm().reset();
                            Ext.getCmp('windowPopupPurchaseMultiPayment').hide();
                            
                            setHeaderPurchaseSummary();

                          	
                          	Ext.getCmp('PurchasingGridID').getStore().load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Success', action.result ? action.result.message : 'No response');
                            Ext.getCmp('form_PurchaseMultiPayment').getForm().reset();
                            Ext.getCmp('windowPopupPurchaseMultiPayment').hide();
                            setHeaderPurchaseSummary();

                            
                            Ext.getCmp('PurchasingGridID').getStore().load();
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


