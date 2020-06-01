var GridItemEntryPurchaseOrder = Ext.create(dir_sys + 'purchasing.GridItemEntryPurchaseOrder');
var wSuppierPurchasePopupOrderPopup = Ext.create(dir_sys + 'purchasing.wSuppierPurchasePopupOrderPopup');
var storeGridItemEntryPurchaseOrder = Ext.getCmp('GridItemEntryPurchaseOrder').getStore();
var loadingtxt = "Loading...";

Ext.define('EntryPurchaseOrder', {
    extend: 'Ext.form.Panel',
    alias: 'widget.EntryPurchaseOrder',
    id: 'EntryPurchaseOrder',
    // width: 760,
    // title: 'Detail',
    // height: 410,
    url: CLINIC_API  + 'sales/create',
    bodyStyle: 'padding:5px',
    forceFit: true,
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 120,
        width: 340
    },
    bodyPadding: 5,
    width: 600,
    defaults: {
        anchor: '100%'
    },

    items: [{
            xtype: 'hiddenfield',
            name: 'purchase_id',
            id: 'purchase_id_po'
        },
        {
            xtype: 'hiddenfield',
            name: 'statusFrom',
            id: 'statusFrom_po'
        },
        {
            xtype: 'hiddenfield',
            name: 'customer_type',
            id: 'customer_type_po'
        },
         {
            xtype: 'hiddenfield',
            name: 'idcustomer',
            id: 'idcustomer'
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [
                    {
                        xtype: 'textfield',
                        labelWidth: 120,
                        name:'noPurchasOrder',
                        id: 'noPurchasOrder',
                        fieldLabel: 'No Puchase #',
                        readOnly: true,
                        listeners: {
                            render: function(component) {
                                component.getEl().on('click', function(event, el) {
                                    setNoArticle(idunit, 'purchase_id', 'no_purchase_order', 'purchase', 'noPurchasOrder', 'PO');

                                });
                            }
                        }
                    },
                    {
                        xtype: 'textfield',
                        labelWidth: 120,
                        id: 'noinvoicePurchasOrder',
                        name:'noinvoicePurchasOrder',
                        fieldLabel: 'No Invoice #',
                        value:'PINV'
                        // listeners: {
                        //     render: function(component) {
                        //         component.getEl().on('click', function(event, el) {
                        //             setNoArticle(idunit, 'purchase_id', 'no_purchase_order', 'purchase', 'noinvoicePurchasOrder', 'PINV');
                        //             // insertNoID(4, Ext.getCmp('cbUnitEntrySalesOrder').getValue(), 'idsales', 'sales', 'nojurnalSalesOrder', 'SO');
                        //             // insertNoRef(4, Ext.getCmp('cbUnitEntrySalesOrder').getValue(), 'nojurnalSalesOrder','SO');
                        //         });
                        //     }
                        // }
                    },
                    {
                        xtype: 'textfield',
                        name:'no_purchase_quote',
                        id: 'namesupplierPurchaseOrder',
                        labelWidth: 120,
                        fieldLabel: 'Pemasok',
                        listeners: {
                            render: function(component) {
                                component.getEl().on('click', function(event, el) {
                                    // ChooserListCustomer.target = Ext.getCmp('EntrySalesOrder');
                                    wSuppierPurchasePopupOrderPopup.show();
                                    Ext.getCmp('GridSuppierPurchasePopupOrderID').getStore().load();
                                });
                            }
                        }
                    }
                ]
            }, {
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [
                    {
                        xtype: 'datefield',
                        labelWidth: 120,
                        name:'invoice_date',
                        id: 'purchasedate_po',
                        format: 'd-m-Y',
                        fieldLabel: 'Tgl Beli',
                        allowBlank: false,
                    },
                    {
                        xtype: 'datefield',
                        labelWidth: 120,
                        name:'due_date',
                        id: 'duedate_po',
                        format: 'd-m-Y',
                        fieldLabel: 'Tgl Penulasan',
                        allowblank:false,
                    }
                ]
            }, {
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [
                    // {
                    //     xtype: 'textfield',
                    //     fieldLabel: 'Sales Person',
                    //     labelWidth: 120,
                    //     name: 'salesman_name',
                    //     id: 'salesman_name_po',
                    //     listeners: {
                    //         render: function(component) {
                    //             component.getEl().on('click', function(event, el) {
                    //                 wSalesmanSOPopupPopup.show();

                    //                 storeGridSalesmanSOPopup.on('beforeload', function(store, operation, eOpts) {
                    //                     operation.params = {
                    //                         'extraparams': 'a.status:' + 1
                    //                     };
                    //                 });
                    //                 storeGridSalesmanSOPopup.load();

                    //             });
                    //         }
                    //     }
                    // },
                    {
                        xtype: 'comboxPurchaseInvStatus',
                        name:'status',
                        labelWidth: 150,
                        id: 'cb_purchase_invoice_status',
                        value:3,
                        readOnly:true,
                    },
                    {
                        xtype: 'checkbox',
                        labelWidth: 150,
                        fieldLabel: 'Harga Termasuk Pajak',
                        boxLabel: 'Ya',
                        name: 'include_tax',
                        id: 'include_tax_po',
                        inputValue: 1,
                        listeners: {
                            change: function(field, newValue, oldValue, eOpts) {
                                updateGridPurchasev3();
                            }
                        }
                    }
                ]
            }]
        },
        
        {
            xtype: 'GridItemEntryPurchaseOrder'
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [
                    // {
                    //     xtype: 'comboxtaxtype',
                    //     labelWidth: 120,
                    //     displayField: 'nametax',
                    //     name: 'idtax',
                    //     id: 'cb_tax_id_po',
                    //     listeners: {
                    //         select: function(combo, record, index) {
                    //             // alert(combo.getValue()); // Return Unitad States and no USA
                    //             updateGridSalesOrder();
                    //         }
                    //     }
                    // },
                    //  {
                    //     xtype: 'comboxpaymentterm',
                    //     id: 'comboxpaymentSalesOrder',
                    //     // cls:'my-mandatory-field',
                    //     name: 'idpayment',
                    //     // margin: {
                    //     //     right: 10
                    //     // },
                    //     labelWidth: 120,
                    //     valueField: 'value',
                    //     listeners: {
                    //         select: function() {
                    //             Ext.getCmp('ddaysSalesOrder').setDisabled(true);
                    //             Ext.getCmp('eomddaysSalesOrder').setDisabled(true);
                    //             Ext.getCmp('percentagediscSalesOrder').setDisabled(true);
                    //             Ext.getCmp('daysdiscSalesOrder').setDisabled(true);
                    //             Ext.getCmp('dmaxSalesOrder').setDisabled(true);

                    //             Ext.getCmp('ddaysSalesOrder').setVisible(false);
                    //             Ext.getCmp('eomddaysSalesOrder').setVisible(false);
                    //             Ext.getCmp('percentagediscSalesOrder').setVisible(false);
                    //             Ext.getCmp('daysdiscSalesOrder').setVisible(false);
                    //             Ext.getCmp('dmaxSalesOrder').setVisible(false);

                    //             switch (this.getValue()) {
                    //                 case '3':
                    //                     Ext.getCmp('ddaysSalesOrder').setDisabled(false);
                    //                     Ext.getCmp('ddaysSalesOrder').setVisible(true);
                    //                     break;
                    //                 case '4':
                    //                     Ext.getCmp('eomddaysSalesOrder').setDisabled(false);
                    //                     Ext.getCmp('eomddaysSalesOrder').setVisible(true);
                    //                     break;
                    //                 case '5':
                    //                     Ext.getCmp('percentagediscSalesOrder').setDisabled(false);
                    //                     Ext.getCmp('daysdiscSalesOrder').setDisabled(false);
                    //                     Ext.getCmp('dmaxSalesOrder').setDisabled(false);
                    //                     Ext.getCmp('percentagediscSalesOrder').setVisible(true);
                    //                     Ext.getCmp('daysdiscSalesOrder').setVisible(true);
                    //                     Ext.getCmp('dmaxSalesOrder').setVisible(true);
                    //                     break;
                    //             }
                    //         }
                    //     }
                    // },
                     {
                        xtype:'comboxtaxtype',
                        name:'tax_id_po',
                        labelWidth: 120,
                        id:'cb_tax_id_po',
                        listeners: {
                            select: function(combo, record, index) {
                                updateGridPurchasev3();
                                console.log(record[0].data.nametax)
                                
                                if(record[0].data.nametax=='Non Pajak'){
                                    // alert('halo')
                                    Ext.getCmp('include_tax_po').hide()
                                    Ext.getCmp('totalPajakPurchaseOrder').hide()
                                    
                                }else if(record[0].data.nametax=='Pph Pasal 23'){
                                    Ext.getCmp('include_tax_po').hide();
                                    Ext.getCmp('totalPajakPurchaseOrder').show()
                                
                                }else{
                                    Ext.getCmp('include_tax_po').show()
                                    Ext.getCmp('totalPajakPurchaseOrder').show()

                                }


                                // insert_tax_rate_so(record[0].data.idtax*1)
                            }
                        }
                    },
                    {
                        xtype: 'textarea',
                        width: 600,
                        labelWidth: 120,
                        value: 'Purchase Order',
                        id: 'memoPurchaseOrder',
                        fieldLabel: 'Memo'
                    },
                    // {
                    //     xtype: 'textarea',
                    //     name: 'ship_address',
                    //     id: 'shipaddressSalesOrder',
                    //     labelWidth: 120,
                    //     width: 600,
                    //     fieldLabel: 'Alamat Pengiriman',
                    // },

                   
                    
                    
                    {
                        xtype: 'hiddenfield',
                        name: 'purchaseman_id',
                        id: 'salesman_id_po',
                    },
                    {
                        xtype: 'hiddenfield',
                        name: 'idcustomer',
                        id: 'customerPurchaseOrder',
                    },
                    {
                        xtype: 'hiddenfield',
                        id: 'id_sales_quote_Order',
                        name: 'purchase_id_quote'
                    },
                    {
                        xtype: 'hiddenfield',
                        id: 'idsales_order',
                        name: 'idsales'
                    },
                    {
                        xtype: 'hiddenfield',
                        id: 'statusformSalesOrderGrid',
                        name: 'statusFormSalesOrder'
                    }

                ]
            }, {
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [

                    
                ]
            }, {
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [{
                        xtype: 'textfield',
                        align: 'right',
                        readOnly: true,
                        labelWidth: 150,
                        id: 'subtotalPurchaseOrder',
                        fieldLabel: 'Subtotal',
                        fieldStyle: 'text-align: right;'
                    },
                    {
                        xtype: 'textfield',
                        align: 'right',
                        readOnly: true,
                        labelWidth: 150,
                        id: 'diskonPurchaseOrder',
                        fieldLabel: 'Diskon (-)',
                        fieldStyle: 'text-align: right;'
                    },
                    {
                        xtype: 'textfield',
                        align: 'right',
                        labelWidth: 150,
                        id: 'freightPurchaseOrder',
                        fieldLabel: 'Biaya Kirim (+)',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            'blur': function() {
                                this.setRawValue(renderNomor4(this.getValue()));
                                updateGridPurchaseOrderv2();
                            }
                        }
                    },
                    {
                        xtype: 'textfield',
                        align: 'right',
                        readOnly: true,
                        labelWidth: 150,
                        id: 'totalPurchaseOrder_1',
                        fieldLabel: 'Total',
                        fieldStyle: 'text-align: right;'
                    },
                    // {
                    //     xtype: 'textfield',
                    //     align: 'right',
                    //     readOnly: true,
                    //     labelWidth: 150,
                    //     id: 'dppSalesOrder',
                    //     fieldLabel: 'Dasar Pengenaan Pajak',
                    //     fieldStyle: 'text-align: right;'
                    // },
                    {
                        xtype: 'textfield',
                        align: 'right',
                        name: 'totalPajak',
                        readOnly: true,
                        labelWidth: 150,
                        id: 'totalPajakPurchaseOrder',
                        fieldLabel: 'Pajak',
                        fieldStyle: 'text-align: right;'
                    },
                    {
                        xtype: 'textfield',
                        align: 'right',
                        readOnly: true,
                        labelWidth: 150,
                        id: 'totalPurchaseOrder',
                        fieldLabel: 'Grand Total',
                        fieldStyle: 'text-align: right;'
                    }
                ]
            }]
        }
    ]
});


Ext.define(dir_sys + 'purchasing.WindowEntryPurchasingOrder', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowEntryPurchasingOrder',
    id: 'WindowEntryPurchasingOrder',
    title: 'Form Pembelian',
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
    width: panelW-180,
    // height: sizeH + 100,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'EntryPurchaseOrder'
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
            var form = Ext.getCmp('EntryPurchaseOrder').getForm();
            form.reset();
            
            //reset grid
            var store = Ext.getCmp('GridItemEntryPurchaseOrder').getStore();
            Ext.each(store.data.items, function(obj, i) {
                store.removeAt(i);
            });

            Ext.getCmp('WindowEntryPurchasingOrder').hide();
        }
    }, {
        text: 'Simpan Pembelian',
        id: 'btnRecordPurchaseOrder',
        itemId:'btnRecordPurchaseOrder',
        handler: function(button, event, options) {
            var msg = Ext.MessageBox.wait(loadingtxt);
            // Ext.getCmp('btnRecordSalesOrder').setDisabled(true);

             if (validasiPurchaseOrder()) {
                storeGridItemEntryPurchaseOrder.clearFilter();
                var json = Ext.encode(Ext.pluck(storeGridItemEntryPurchaseOrder.data.items, 'data'));
                //            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitEntrySalesOrder').getValue());
                // storeGridItemSalesOrder.filter([function(item) { return item.get('deleted') != "1" }]);
                // console.log(Ext.getCmp('freightPurchaseOrder').getValue());
                Ext.Ajax.request({
                    url: CLINIC_API  + 'purchase/save_purchasing',
                    method: 'POST',
                    params: {
                        key:key,
                        password:password,
                        idunit:idunit,
                        user_id:userid,
                        purchase_id_po: Ext.getCmp('purchase_id_po').getValue(),
                        invoice_no: Ext.getCmp('noinvoicePurchasOrder').getValue(),
                        customer_id: Ext.getCmp('idcustomer').getValue(),
                        customerPurchaseOrder: Ext.getCmp('namesupplierPurchaseOrder').getValue(),
                        invoice_date: Ext.getCmp('purchasedate_po').getSubmitValue(),
                        due_date: Ext.getCmp('duedate_po').getSubmitValue(),
                        status: Ext.getCmp('cb_purchase_invoice_status').getValue(),
                        memo: Ext.getCmp('memoPurchaseOrder').getValue(),
                        include_tax: Ext.getCmp('include_tax_po').getValue()*1,
                        freight: Ext.getCmp('freightPurchaseOrder').getValue(),
                        customer_type: Ext.getCmp('customer_type_po').getValue(),
                        noinvoicePurchasOrder:Ext.getCmp('noinvoicePurchasOrder').getValue(),
                        tax_id: Ext.getCmp('cb_tax_id_po').getValue(),
                        purchase_item: json
                    },
                    success: function(form, action) {
                        // console.log(freight);
                        // msg.hide()
                        var d = Ext.decode(form.responseText);
                        if (!d.success) {
                            Ext.Msg.alert('Peringatan', d.message);
                        } else {
                            Ext.Msg.alert('Success', d.message);
                            // clearFormSO();
                            Ext.getCmp('EntryPurchaseOrder').getForm().reset();
                            var store = Ext.getCmp('GridItemEntryPurchaseOrder').getStore();
                            Ext.each(store.data.items, function(obj, i) {
                                store.removeAt(i);
                            });
                            Ext.getCmp('WindowEntryPurchasingOrder').hide();
                            Ext.getCmp('PurchasingGridID').getStore().load();
                        }

                         // updateGridSalesOrderv3();
                        setHeaderPurchaseSummary();


                        Ext.getCmp('btnRecordPurchaseOrder').setDisabled(false);
                    },
                    failure: function(form, action) {
                        // msg.hide()
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');

                        Ext.getCmp('btnRecordPurchaseOrder').setDisabled(false);
                    }
                });
            } else {
                 Ext.getCmp('btnRecordPurchaseOrder').setDisabled(false);
            }

        }
    }]
});

// function updateGridPurchasev3() {

//     var angkutPurchaseOrder = str_replace(",", "", Ext.getCmp('freightPurchaseOrder').getValue()) * 1;
//     var isIncludeTax = Ext.getCmp('include_tax_po').getValue() * 1;

//     var storeGridItemPurchaseOrder = Ext.getCmp('GridItemEntryPurchaseOrder').getStore();
//     storeGridItemPurchaseOrder.clearFilter();
//     var json = Ext.encode(Ext.pluck(storeGridItemPurchaseOrder.data.items, 'data'));

//     Ext.each(storeGridItemPurchaseOrder.data.items, function(obj, i) {
//         var total = obj.data.qty * (obj.data.price);
//         var diskon = (total / 100) * obj.data.disc;
//         var tax = total*(obj.data.rate*1/100);

//         if(isIncludeTax){
//             //include tax
//              var total_per_row = (total - diskon);
//         } else {
//             var total_per_row = (total - diskon)+tax;
//         }

//        obj.set('total', total_per_row);
//     });

//     //calculate summary footer at backend
//     Ext.Ajax.request({
//         url: CLINIC_API  + 'Purchase/summary_purchase_inv',
//         method: 'POST',
//         params: {
//             include_tax: isIncludeTax,
//             shipping_cost: angkutPurchaseOrder,
//             Purchase_item: json,
//             tax_id:Ext.getCmp('cb_tax_id_po').getValue()*1,
//             key: key
//         },
//         success: function(form, action) {
//             var d = Ext.decode(form.responseText);
//             Ext.getCmp('subtotalPurchaseOrder').setValue(number_format(d.sub_total)); 

//              Ext.getCmp('diskonPurchaseOrder').setValue(number_format(d.total_disc));

//             // var total = (subtotalPurchaseOrder-total_diskon)+angkutPurchaseOrder;
//             Ext.getCmp('totalPurchaseOrder_1').setValue(number_format(d.total)); //total


//             Ext.getCmp('totalPajakPurchaseOrder').setValue(number_format(d.total_tax));

//             Ext.getCmp('totalPurchaseOrder').setValue(number_format(d.grand_total));
//         },
//         failure: function(form, action) {
//             Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//         }
//     });

// }



// function updateGridPurchaseOrder(tipe) {

//     var storeGridItemPurchaseOrder = Ext.getCmp('GridItemEntryPurchaseOrder').getStore();

//     // console.log('update run');
//     var addprefix = 'PurchaseOrder';

//     var subtotalPurchaseOrder = 0 * 1;
//     var dppPurchaseOrder = 0 * 1;
//     var totalPurchaseOrder = 0 * 1;
//     var totalPajak = 0 * 1;
//     var angkutPurchaseOrder = str_replace(",", "", Ext.getCmp('freightPurchaseOrder').getValue()) * 1;
//     console.log('form:'+angkutPurchaseOrder);
//     // var pembayaranPurchaseOrder = Ext.getCmp('pembayaranPurchaseOrder').getValue();
//     var sisaBayarPurchaseOrder = 0 * 1;
//     var taxrate = Ext.getCmp('cb_tax_id_po').getValue() * 1;
//     var isIncludeTax = Ext.getCmp('include_tax_po').getValue() * 1;
//     var total_diskon = 0;

//     if(taxrate=='1'){
//         taxrate = 10;
//     }

//     Ext.each(storeGridItemPurchaseOrder.data.items, function(obj, i) {
//         var total = obj.data.qty * (obj.data.price);
//         var diskon = (total / 100) * obj.data.disc;
//         total_diskon += diskon;

//         var net = total - diskon;
//         console.log(total + ' - ' + diskon);

//         subtotalPurchaseOrder += net;
//         // totalPajak += (net / 100) * (taxrate * 1);
//         obj.set('ratetax', taxrate);
//         obj.set('total', net);
//     });

//     dppPurchaseOrder = isIncludeTax ? ((subtotalPurchaseOrder + total_diskon) / 1.1)+angkutPurchaseOrder : (subtotalPurchaseOrder+angkutPurchaseOrder);
//     totalPajak += (dppPurchaseOrder) * (taxrate * 1 / 100);
//     console.log('1:'+totalPajak)
//     // totalPurchaseOrder = dppPurchaseOrder + totalPajak;
//     totalPurchaseOrder = dppPurchaseOrder;

//     console.log(Math.ceil(totalPajak*1)+ ' '+ Math.ceil(dppPurchaseOrder*1))

//     Ext.getCmp('subtotal' + addprefix).setValue(number_format(subtotalPurchaseOrder));


//       if(isIncludeTax){
//         var total = (subtotalPurchaseOrder*1)+angkutPurchaseOrder*1;
//         var grandTotal = total;
//         var dppPurchaseOrder = total/1.1;
//         var totalPajak = dppPurchaseOrder * (taxrate * 1 / 100);
//         // var grandTotal = Math.ceil(dppPurchaseOrder*1)+angkutPurchaseOrder*1;
//     } else {
//         // var total = totalPurchaseOrder*1-Math.ceil(totalPajak*1);
//         var total = (subtotalPurchaseOrder*1)+angkutPurchaseOrder*1;
//         var grandTotal = Math.ceil(dppPurchaseOrder*1)+Math.ceil(totalPajak*1);
//     }
    
//     console.log('2:'+totalPajak)
//     Ext.getCmp('total' + addprefix).setValue(number_format(grandTotal)); //grand total

//     Ext.getCmp('totalPurchaseOrder_1').setValue(number_format(total)); //total

//     Ext.getCmp('totalPajak' + addprefix).setValue(number_format(totalPajak*1));
//     Ext.getCmp('diskonPurchaseOrder').setValue(number_format(total_diskon));
//     Ext.getCmp('dppPurchaseOrder').setValue(number_format(dppPurchaseOrder));


//     // Ext.getCmp('pembayaran').setValue(pembayaranPurchaseOrder.toLocaleString('null', {minimumFractionDigits: 2}));
//     // Ext.getCmp('sisaBayarPurchaseOrder').setValue(sisaBayarPurchaseOrder.toLocaleString('null', {minimumFractionDigits: 2}));

// }

// function validasiPurchaseOrder() {
//     //    alert(Ext.getCmp('comboxcurrencyPurchaseOrder').getValue());   

//     // if (Ext.getCmp('nojurnalPurchaseOrder').getValue() == null) {
//     //     Ext.Msg.alert('Failed', 'Tentukan No SO #');
//     // } else 
//    // if (Ext.getCmp('cb_tax_id_po').getValue() == null) {
//    //      Ext.Msg.alert('Failed', 'Tentukan Jenis Pajak');
//    //  } else 
//     if (Ext.getCmp('namesupplierPurchaseOrder').getValue() == null || Ext.getCmp('namesupplierPurchaseOrder').getValue() == '') {
//         Ext.Msg.alert('Failed', 'Tentukan kolom Pemasok');
//     } else if (Ext.getCmp('memoPurchaseOrder').getValue() == null) {
//         Ext.Msg.alert('Failed', 'Masukkan memo ');
//     } else if (Ext.getCmp('GridItemEntryPurchaseOrder').getStore().getRange().length == 0) {
//         Ext.Msg.alert('Failed', 'Masukkan barang terlebih dahulu');
//     }else if (Ext.getCmp('purchasedate_po').getValue() == null || Ext.getCmp('purchasedate_po').getValue() == '') {
//         Ext.Msg.alert('Failed', 'Masukkan tgl beli terebih dahulu dahulu');
//     }else if (Ext.getCmp('duedate_po').getValue() == null || Ext.getCmp('duedate_po').getValue() == '') {
//         Ext.Msg.alert('Failed', 'Masukkan tgl penulasan terebih dahulu dahulu');
//     } else {
//         return true;
//     }
// }