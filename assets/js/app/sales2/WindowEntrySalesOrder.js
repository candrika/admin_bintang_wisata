var GridItemEntrySalesOrder = Ext.create(dir_sys + 'sales2.GridItemEntrySalesOrder');

var wCustomerSalesPopupOrderPopup = Ext.create(dir_sys + 'sales2.wCustomerSalesPopupOrderPopup');

var windowBuyerSalesInvoice = Ext.create(dir_sys + 'sales2.windowBuyerSalesInvoice');

load_js_file('sales2/GridSalesmanSOPopup.js');

var storeGridItemSalesOrder = Ext.getCmp('GridItemEntrySalesOrder').getStore();

Ext.define('EntrySalesOrder', {
    extend: 'Ext.form.Panel',
    alias: 'widget.EntrySalesOrder',
    id: 'EntrySalesOrder',
    // width: 760,
    // title: 'Detail',
    // height: 410,
    url: SITE_URL + 'sales/create_post',
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
            name: 'sales_id',
            id: 'sales_id_so'
        },
        {
            xtype: 'hiddenfield',
            name: 'customer_type',
            id: 'customer_type_so'
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
                        id: 'noinvoiceSalesOrder',
                        name:'noinvoice_sales',
                        fieldLabel: 'NO Invoice #',
                        readOnly: true,
                        // emptyText: 'Autogenerate',
                        listeners: {
                            render: function(component) {
                                component.getEl().on('click', function(event, el) {
                                    setNoArticle(idunit, 'idsales', 'no_sales_order', 'sales', 'noinvoiceSalesOrder', 'INV');
                                   
                                });
                            }
                        }
                    },

                    {
                        xtype: 'textfield',
                        name:'buyer_name',
                        id: 'namecustomerSalesOrder',
                        labelWidth: 120,
                        fieldLabel: 'Ditagihkan Kepada',
                        listeners: {
                            render: function(component) {
                                component.getEl().on('click', function(event, el) {
                                    // ChooserListCustomer.target = Ext.getCmp('EntrySalesOrder');
                                    windowBuyerSalesInvoice.show();
                                    Ext.getCmp('GridCustomerSalesPopupOrderID').getStore().load();
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
                        id: 'salesdate_so',
                        format: 'd-m-Y',
                        fieldLabel: 'Tgl Invoice'
                    },
                    {
                        xtype: 'comboxpaymentterm',
                        name:'id_payment_term',
                        id:'comboxpaymentSalesOrder',
                        listeners: {
                            'change': function(field, newValue, oldValue) {
                                
                                console.log(newValue);
                                var startdate = Ext.getCmp('salesdate_so').getValue();
                                Ext.getCmp('duedate_so').setValue(startdate);
                                console.log(startdate);

                                Ext.getCmp('duedate_so').setReadOnly(true);
                                if(newValue=='1'){
                                    var numdays = 7;
                                } else if(newValue=='2'){
                                    var numdays = 15;
                                } else if(newValue=='3'){
                                    var numdays = 30;
                                } else if(newValue=='4'){
                                    var numdays = 60;
                                } else if(newValue=='5'){
                                   var numdays = 1;
                                   Ext.getCmp('duedate_so').setReadOnly(false);
                                }

                                var stdate      = new Date(startdate);
                                var duedate_so = new Date(stdate.setDate(stdate.getDate() + (numdays-1)));

                                // var duedate_so = 
                                // Ext.getCmp('duedate_so').setValue(new Date().addDays(numdays));
                                Ext.getCmp('duedate_so').setValue(duedate_so);
                            }
                        }
                    }
                    // {
                    //     xtype: 'comboxpaymentterm',
                    //     id: 'comboxpaymentSalesOrder',
                    //     // cls:'my-mandatory-field',
                    //     name: 'id_payment_term',
                    //     // margin: {
                    //     //     right: 10
                    //     // },
                    //     labelWidth: 120,
                    //     valueField: 'value',
                    //     listeners: {
                    //         change: function(field, newValue, oldValue) {
                    //             console.log(newValue);
                    //             var startdate = Ext.getCmp('salesdate_so').getValue();
                    //             console.log(startdate);
                    //             console.log(new Date().addDays(7));
                    //         }
                    //     }
                    // }
                ]
            }, {
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [
                    {
                        xtype: 'datefield',
                        labelWidth: 120,
                        name:'due_date',
                        id: 'duedate_so',
                        format: 'd-m-Y',
                        fieldLabel: 'Tgl Jatuh Tempo'
                    },
                     {
                        xtype: 'comboxSalesStatus',
                        name:'status',
                        labelWidth: 120,
                        id: 'cb_sales_order_status'
                    }
                    // {
                    //     xtype: 'textfield',
                    //     fieldLabel: 'Sales Person',
                    //     labelWidth: 120,
                    //     name: 'salesman_name',
                    //     id: 'salesman_name_so',
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
                    
                ]
            }]
        },

        {
            xtype: 'GridItemEntrySalesOrder'
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
                    //     id: 'cb_tax_id_so',
                    //     listeners: {
                    //         select: function(combo, record, index) {
                    //             // alert(combo.getValue()); // Return Unitad States and no USA
                    //             updateGridSalesOrder();
                    //         }
                    //     }
                    // },
                   
                   
                    {
                        xtype:'comboxtaxtype',
                        name:'tax_id_so',
                        labelWidth: 150,
                        id:'cb_tax_id_so',
                        listeners: {
                            select: function(combo, record, index) {
                                updateGridSalesOrderv3();
                                console.log(record[0].data)
                                // if(record[0].data.nametax=='Non Pajak'){
                                //     // alert('halo')
                                //     Ext.getCmp('include_tax_so').hide()
                                //     Ext.getCmp('totalPajakSalesOrder').hide()
                                    
                                // }else if(record[0].data.nametax=='Pph Pasal 23'){
                                //     Ext.getCmp('include_tax_so').hide();
                                //     Ext.getCmp('totalPajakSalesOrder').show()
                                
                                // }else{
                                //     Ext.getCmp('include_tax_so').show()
                                //     Ext.getCmp('totalPajakSalesOrder').show()

                                // }
                                // console.log(updateGridSalesOrderv3())
                                // // insert_tax_rate_so(record[0].data.idtax*1)
                            }
                        }
                    },
                    {
                        xtype:'comboxsalesRequisitionStatus',
                        fieldLabel:'Status Pesanan',
                        labelWidth: 150,
                        id:'cb_sales_requisition',
                        name:'order_status',
                        listeners: {
                            'change': function(field, newValue, oldValue) {
                                console.log(Ext.getCmp('cb_sales_requisition').getValue());
                                console.log(Ext.getCmp('sales_id_so').getValue());

                                Ext.Ajax.request({
                                    url:CLINIC_API + 'sales/set_orderStatus',
                                    method:'POST',
                                    params:{
                                        order_status:Ext.getCmp('cb_sales_requisition').getValue(),
                                        idsales:Ext.getCmp('sales_id_so').getValue(),
                                        key:key
                                    },
                                    success:function(form,action){
                                        // alert('nasi');
                                        Ext.getCmp('SalesGridID').getStore().load();
                                        var raw = Ext.getCmp('SalesGridID').getStore().data.items[0].raw;

                                    },
                                    failure:function(form,action){
                                        // var d = Ext.decode(form.responseText)
                                        // Ext.Msg.alert('Failure', d.message);
                                        // Ext.getCmp('SalesGridID').getStore().load();
                                    }
                                })

                            }
                        }
                    },
                    {
                        xtype: 'checkbox',
                        labelWidth: 150,
                        fieldLabel: 'Harga Termasuk Pajak',
                        boxLabel: 'Ya',
                        name: 'include_tax',
                        id: 'include_tax_so',
                        inputValue: 1,
                        listeners: {
                            change: function(field, newValue, oldValue, eOpts) {
                                updateGridSalesOrderv3();
                            }
                        }
                    },
                    {
                        xtype: 'textarea',
                        name:'memo',
                        width: 600,
                        labelWidth: 150,
                        value: 'Sales Order',
                        id: 'memoSalesOrder',
                        fieldLabel: 'Memo'
                    },
                    // {
                    //     xtype: 'hiddenfield',
                    //     name: 'tax_rate',
                    //     id: 'tax_rate_so',
                    // },
                    {
                        xtype: 'hiddenfield',
                        name: 'idcustomer',
                        id: 'customerSalesOrder',
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
                        id: 'subtotalSalesOrder',
                        fieldLabel: 'Subtotal',
                        fieldStyle: 'text-align: right;'
                    },
                    {
                        xtype: 'textfield',
                        align: 'right',
                        readOnly: true,
                        labelWidth: 150,
                        id: 'diskonSalesOrder',
                        fieldLabel: 'Diskon (-)',
                        fieldStyle: 'text-align: right;'
                    },
                    {
                        xtype: 'textfield',
                        align: 'right',
                        labelWidth: 150,
                        id: 'freightSalesOrder',
                        fieldLabel: 'Biaya Kirim (+)',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            'blur': function() {
                                this.setRawValue(renderNomor4(this.getValue()));
                                updateGridSalesOrderv2();
                            }
                        }
                    },
                    {
                        xtype: 'textfield',
                        align: 'right',
                        readOnly: true,
                        labelWidth: 150,
                        id: 'totalSalesOrder_1',
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
                        id: 'totalPajakSalesOrder',
                        fieldLabel: 'Pajak',
                        fieldStyle: 'text-align: right;'
                    },
                    // {
                    //     xtype:'comboxsalesRequisitionStatus',
                    //     label:'Status Pesanan',
                    // },
                    {
                        xtype: 'textfield',
                        align: 'right',
                        readOnly: true,
                        labelWidth: 150,
                        id: 'totalSalesOrder',
                        fieldLabel: 'Grand Total',
                        fieldStyle: 'text-align: right;'
                    }
                ]
            }]
        }
    ]
});


Ext.define(dir_sys + 'sales2.WindowEntrySalesOrder', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowEntrySalesOrder',
    id: 'WindowEntrySalesOrder',
    title: 'Invoice Penjualan',
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
        xtype: 'EntrySalesOrder'
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
            var form = Ext.getCmp('EntrySalesOrder').getForm();
            form.reset();
            
            //reset grid
            var store = Ext.getCmp('GridItemEntrySalesOrder').getStore();
            Ext.each(store.data.items, function(obj, i) {
                store.removeAt(i);
            });

            Ext.getCmp('WindowEntrySalesOrder').hide();
        }
    }, {
        text: 'Simpan Invoice Penjualan',
        id: 'btnRecordSalesOrder',
        handler: function(button, event, options) {

            // Ext.getCmp('btnRecordSalesOrder').setDisabled(true);

             if (validasiSalesOrder()) {
                storeGridItemSalesOrder.clearFilter();
                var json = Ext.encode(Ext.pluck(storeGridItemSalesOrder.data.items, 'data'));
                var invoice_date = Ext.getCmp('salesdate_so').getSubmitValue();
                
                Ext.Ajax.request({
                    url: CLINIC_API + 'sales/save_invoice',
                    method: 'POST',
                    params: {
                        key:key,
                        password:password,
                        idunit:idunit,
                        order_status:Ext.getCmp('cb_sales_requisition').getValue(),
                        sales_id: Ext.getCmp('sales_id_so').getValue(),
                        invoice_no: Ext.getCmp('noinvoiceSalesOrder').getValue(),
                        customer_id: Ext.getCmp('customerSalesOrder').getValue(),
                        invoice_date: invoice_date,
                        id_payment_term: Ext.getCmp('comboxpaymentSalesOrder').getValue(),
                        due_date: Ext.getCmp('duedate_so').getSubmitValue(),
                        status: Ext.getCmp('cb_sales_order_status').getValue(),
                        memo: Ext.getCmp('memoSalesOrder').getValue(),
                        include_tax: Ext.getCmp('include_tax_so').getValue(),
                        freight: Ext.getCmp('freightSalesOrder').getValue(),
                        customer_type: Ext.getCmp('customer_type_so').getValue(),
                        tax_id: Ext.getCmp('cb_tax_id_so').getValue(),
                        sales_item: json
                    },
                    success: function(form, action) {

                        var d = Ext.decode(form.responseText);
                        if (!d.success) {
                            Ext.Msg.alert('Peringatan', d.message);
                        } else {
                            Ext.Msg.alert('Success', d.message);
                            // clearFormSO();
                           
                            Ext.getCmp('WindowEntrySalesOrder').hide();
                            Ext.getCmp('SalesGridID').getStore().load();

                            updateGridSalesOrderv3();
                            setHeaderSalesSummary();

                            Ext.getCmp('btnRecordSalesOrder').setDisabled(false);

                            var form = Ext.getCmp('EntrySalesOrder').getForm();
                            form.reset();

                            var grid = Ext.getCmp('GridItemEntrySalesOrder');
    
                            grid.getStore().load({
                                params:{
                                    'key':key,
                                    'id':0
                                }
                            });
                        }

                        
                    },
                    failure: function(form, action) {
                        var d = Ext.decode(form.responseText);
                        Ext.Msg.alert('Peringatan', d.message);

                        Ext.getCmp('btnRecordSalesOrder').setDisabled(false);
                    }
                });
            } else {
                 Ext.getCmp('btnRecordSalesOrder').setDisabled(false);
            }

        }
    }]
});



