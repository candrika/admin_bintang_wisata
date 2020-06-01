Ext.define('PurchasingGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        "purchase_id","purchase_receipt_id","idpayment","idtax","idcustomer","subtotal","freight","tax","disc","totalamount","paidtoday","balance","comments","Sales","userin","datein","status","idunit","date_purchase","no_purchase_order","invoice_no","include_tax","total_dpp","pos_payment_type_id","id_member","namepayment","namesupplier","namaunit","payment_type_name","no_member","other_fee","invoice_status","unpaid_amount","status_purchase_receipt"
    ],
    idProperty: 'id'
});
var storePurchasingGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'PurchasingGridModel',
    remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API  + '/purchase/data',
        actionMethods: {
           read: 'GET'   
        },
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

storePurchasingGrid.on('beforeload', function(store, operation) {
    operation.params = {
        'key':key,
        'password':password,
        'idunit':idunit,
        'status':Ext.getCmp('purchase_status').getValue(),
        'startdate': Ext.getCmp('startdate_grdpo').getValue(),
        'enddate': Ext.getCmp('enddate_grdpo').getValue(),
    }    
});

Ext.define('MY.searchPurchasingGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searcPurchasingGrid',
    store: storePurchasingGrid,
    width: 180
});
var smPurchasingGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smPurchasingGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletePurchaseOrderGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletePurchaseOrderGrid').enable();
        }
    }
});

var contextMenu = Ext.create('Ext.menu.Menu', {
    // width: 200,
    items: [{
        iconCls: 'refresh',
        text: 'Buat Pembelian berulang',
        handler: function() {
            var grid = Ext.getCmp('PurchasingGridID');
            var selectedRecord = grid.getSelectionModel().getSelection()[0];
            var data = grid.getSelectionModel().getSelection();
            console.log(selectedRecord.data.noinvoice)
            if (data.length == 0) {
                Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
            } else {
                    create_recurring_po(selectedRecord.data)               
            }
            
        }
    }]
});

Ext.define(dir_sys + 'purchasing.PurchasingGrid', {
    title: 'Pembelian',
    itemId: 'PurchasingGridID',
    id: 'PurchasingGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.PurchasingGrid',
    store: storePurchasingGrid,
    loadMask: true,
    columns: [{
            dataIndex: 'purchase_id',
            hidden: true,
            header: 'purchase_id'
        },{
            dataIndex: 'purchase_receipt_id',
            hidden: true,
            header: 'purchase_receipt_id'
        }, {
            dataIndex: 'idunit',
            hidden: true,
            header: 'idunit'
        }, {
            dataIndex: 'comments',
            hidden: true,
            header: 'comments'
        }, {
            header: 'No Pembelian',
            dataIndex: 'no_purchase_order',
            minWidth: 150
        }, {
            header: 'No Invoice',
            dataIndex: 'invoice_no',
            minWidth: 150
        }, {
            header: 'Status',
            // hidden:true,
            dataIndex: 'invoice_status',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'center',
            renderer: function(value) {
                return customColumnStatus(ArrPurchaseInvStatus, value);
            }
        },{
            header: 'Status Penerimaan',
            // hidden:true,
            dataIndex: 'status_purchase_receipt',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'center',
            renderer: function(value) {
                return customColumnStatus(ArrPurchaseReceiptStatus, value);
            }
        },{
            header: 'Pemasok',
            flex: 1,
            dataIndex: 'namesupplier',
            minWidth: 150
        }, {
            xtype: 'datecolumn',
            format: 'd-m-Y',
            align: 'center',
            header: 'Tanggal Pembelian',
            dataIndex: 'date_purchase',
            minWidth: 150
        }, {
            header: 'Total Item',
            hidden:true,
            dataIndex: 'totalitem',
            minWidth: 80,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Subtotal',
            dataIndex: 'subtotal',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },{
            header: 'Total Diskon',
            // hidden:true,
            dataIndex: 'disc',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },{
            header: 'Biaya Kirim',
            dataIndex: 'freight',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },{
            header: 'Total Pajak',
            dataIndex: 'tax',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        }, {
            header: 'Grand Total',
            dataIndex: 'totalamount',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },{
            header: 'Total Terbayar',
            dataIndex: 'paidtoday',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },{
            header: 'Total Belum Terbayar',
            dataIndex: 'unpaid_amount',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },
        // {
        //     header: 'Pembayaran',
        //     dataIndex: 'payment_type_name',
        //     minWidth: 150
        // }
    ],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'datefield',
                    id: 'startdate_grdpo',
                    format: 'd/m/Y',
                    // value: datenow(),
                    fieldLabel: 'Periode',
                },
                ' to ',
                {
                    xtype: 'datefield',
                    id: 'enddate_grdpo',
                    format: 'd/m/Y',
                    // value: datenow(),
                    hideLabel: true
                    // fieldLabel: 'Date Order',
                },
                {
                xtype: 'radiogroup',
                id:'purchase_status',
                labelWidth: 50,
                width:350,
                allowBlank: false,
                fieldLabel: 'Status',
                columns: 3,
                style:{
                    paddingRight:'10px'
                },
                items: [
                    { boxLabel: 'Semua', name: 'status', inputValue: 0,checked:true,width:100,id:'All_Purchase'},
                    { boxLabel: 'Lunas', name: 'status', inputValue:5,width:100,id:'Paid_Purchase',fieldStyle:'margin-left: -17px;'},
                    { boxLabel: 'Belum Lunas', name: 'status', inputValue: 3,width:170,id:'Unpaid_Purchase',fieldStyle:'margin-left: -37px;'},      
                ],
                // listeners: {
                //     change: function (field, newValue, oldValue) {
                //         console.log(Ext.getCmp('purchase_status').getValue().status)

                //         if(Ext.getCmp('purchase_status').getValue().status*1==5){
                //             Ext.getCmp('PurchasingGridID').getStore().load()
                //         }else if(Ext.getCmp('purchase_status').getValue().status*1==3){
                //             Ext.getCmp('PurchasingGridID').getStore().load()
                //         }else if(Ext.getCmp('purchase_status').getValue().status*1==0){
                //             Ext.getCmp('PurchasingGridID').getStore().load()
                //         }
                //     }
                // }
            },{
                    text: 'Search',
                    left:'860px',
                    handler: function() {
                        storePurchasingGrid.load();
                    }
                },
                {
                    text: 'Clear Filter',
                    handler: function() {
                        Ext.getCmp('startdate_grdpo').setValue();
                        Ext.getCmp('enddate_grdpo').setValue();
                        
                        if(Ext.getCmp('Paid_Purchase').getValue()==true){
                            Ext.getCmp('All_Purchase').setValue(true);

                        }if(Ext.getCmp('Unpaid_Purchase').getValue()==true){
                            Ext.getCmp('All_Purchase').setValue(true);

                        }   
                        storePurchasingGrid.load();
                    }
                
            }]
        },
        // {
        //     xtype: 'toolbar',
        //     dock: 'top',
        //     items: [}]
        // },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                itemId: 'addPurchasingOrderGrid',
                text: 'Pembelian Baru',
                iconCls: 'add-icon',
                handler: function() {
                    var form = Ext.getCmp('EntryPurchaseOrder').getForm();

                    WindowEntryPurchasingOrder.show();
                    form.reset();
                   
                    Ext.getCmp('GridItemEntryPurchaseOrder').getStore().removeAll();
                    Ext.getCmp('freightPurchaseOrder').setValue(0);                    
                    
                    var start_date = new Date();
                    // var end_date  = start_date.setMonth(start_date.getMonth()+1);
                    Ext.getCmp('purchasedate_po').setValue(start_date);
                    Ext.getCmp('duedate_po').setValue(new Date().addDays(7));

                    Ext.Ajax.request({
                        url: CLINIC_API  + '/purchase/generate_no_po',
                        method: 'GET',
                        params: {
                            key: key,
                            password:password,
                            idunit:idunit
                        },
                        success: function(formx, action) {
                            var d = Ext.decode(formx.responseText);
                            Ext.getCmp('noPurchasOrder').setValue(d.doc_number);
                        },
                        failure: function(formx, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        }
                    });

                    // Ext.Ajax.request({
                    //     url:CLINIC_API  + 'preferences/tax_default',
                    //     method:'GET',
                    //     params:{
                    //         key:key,     
                    //     },
                    //     success:function(form,action){
                    //         var d = Ext.decode(form.responseText)
                    //         console.log(d.tax_sales_id*1)
                    //         // tax_sales_id
                    //         Ext.getCmp('cb_tax_id_po').setValue(d.tax_sales_id*1);
                    //         taxStore.load()
                    //     },
                    //     failure:function(form,action){

                    //     }
                    // })
                }
            },{
                text: 'Pembayaran',
                // hidden:true,
                iconCls: 'add-icon',
                handler: function() {
                     
                    windowPurchaseMultiPayment();

                }
            }, {
                text: 'Penerimaan Barang',
                // hidden:true,
                 iconCls: 'add-icon',
                handler: function() {
                    var grid = Ext.getCmp('PurchasingGridID');
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var data = grid.getSelectionModel().getSelection();
                    if (data.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                    } else {
                        create_new_purchase_receive(selectedRecord.data.purchase_id,selectedRecord.data.status_purchase_receipt,selectedRecord.data.purchase_receipt_id)
                    }
                }
            },{
                text: 'Cetak',
                // hidden:true,
                iconCls: 'print-icon',
                handler: function() {
                    var grid = Ext.getCmp('PurchasingGridID');
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var data = grid.getSelectionModel().getSelection();
                    if (data.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                    } else {

                        Ext.create('Ext.window.Window', {
                            title: 'Preview Purchase Order',
                            maximizable: true,
                            modal: true,
                            width: 850,
                            height: panelH-20,
                            items: [{
                                xtype: 'component',
                                html: '<iframe src="' + SITE_URL + 'purchase/print_purchase/' + selectedRecord.data.purchase_id + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
                            }],
                            buttons: [{
                                text: 'Print',
                                iconCls: 'print-icon',
                                handler: function() {
                                    window.open(SITE_URL + 'purchase/print_purchase/' + selectedRecord.data.purchase_id + '/print', '_blank');
                                }
                            }]
                        }).show();
                    }
                }
            }, {
                id: 'btnDeletePurchasingOrderGrid',
                text: 'Delete',
                iconCls: 'delete-icon',
                handler: function() {
                    Ext.Msg.show({
                        title: 'Confirm',
                        msg: 'Delete Selected ?',
                        buttons: Ext.Msg.YESNO,
                        fn: function(btn) {
                            if (btn == 'yes') {
                               var grid = Ext.getCmp('PurchasingGridID');
                                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                var data = grid.getSelectionModel().getSelection();
                                Ext.Ajax.request({
                                    url: CLINIC_API  + 'purchase/remove',
                                    method: 'POST',
                                    params: {
                                        id: selectedRecord.data.purchase_id,
                                        key: key,
                                        password:password,
                                        idunit:idunit,
                                        user_id:userid
                                    },
                                    success: function(form, action) {
                                        var d = Ext.decode(form.responseText);
                                        if (!d.success) {
                                            Ext.Msg.alert('Informasi', d.message);
                                        } else {
                                            Ext.Msg.alert('Informasi', d.message);
                                            storePurchasingGrid.load();
                                            Ext.getCmp('PurchaseReceiveGridID').getStore().load();
                                            Ext.getCmp('PurchaseReturnGridID').getStore().load();
                                        }
                                        setHeaderPurchaseSummary();
                                    },
                                    failure: function(form, action) {
                                        var d = Ext.decode(form.responseText);
                                        
                                        Ext.Msg.alert('Failed', d ? d.message : 'No response');
                                    }
                                });

                            }
                        }
                    });
                },
                //                    disabled: true
            }, '->', 'Searching: ', ' ', {
                xtype: 'searcPurchasingGrid',
                text: 'Left Button'
            }]
        }, {
            xtype: 'pagingtoolbar',
            store: storePurchasingGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
            // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storePurchasingGrid.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            view_PO_data(record.data.purchase_id);
            console.log(record.data.purchase_id)
            Ext.getCmp('statusFrom_po').setValue('view_data');
            Ext.getCmp('freightPurchaseOrder').setValue(record.data.freight);
        },
        itemcontextmenu: function(grid, record, item, index, e) {
            e.stopEvent();
           contextMenu.showAt(e.getXY());
        }
    }
});



// function create_recurring_po(id){
//     WindowEntryPurchasingOrder.show();

//     Ext.getCmp('EntryPurchaseOrder').getForm().reset();

//     load_data_purchase(id,'recurring');


//     // Ext.getCmp('btnRecordSalesOrder').setDisabled(false);

//     //generate number
//     Ext.Ajax.request({
//         url: CLINIC_API  + '/purchase/generate_no_po',
//         method: 'GET',
//         params: {
//             key: key
//         },
//         success: function(formx, action) {
//             var d = Ext.decode(formx.responseText);
//            Ext.getCmp('noPurchasOrder').setValue(d.doc_number);
//         },
//         failure: function(form, action) {
//             Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//         }
//     });
// }

// function view_PO_data(purchase_id){
//     WindowEntryPurchasingOrder.show();

//      load_data_purchase(purchase_id); 
// }

// function load_data_purchase(purchase_id,opt) {
//     // body...
//     WindowEntryPurchasingOrder.show()
//     Ext.Ajax.request({
//         url: CLINIC_API  + '/purchase/data',
//         // async:false,
//         method: 'GET',
//         params: {
//             purchase_id: purchase_id,
//             key: key
//         },success:function(form,action) {
//             // body...
//             var d = Ext.decode(form.responseText);
//             var data_purchase = d.rows[0];
//             console.log(data_purchase)
//             var form = Ext.getCmp('EntryPurchaseOrder').getForm();

//             if(opt=='recurring'){
//                     // var purchaseitem_id = null;
//                 Ext.getCmp('purchase_id_po').setValue(null);
//                 //form.findField('status').setValue(data_purchase.invoice_status*1);
//             } else {
//                     // var purchaseitem_id = item.purchase_item_id*1;
//                 Ext.getCmp('purchase_id_po').setValue(data_purchase.purchase_id*1);
//                 // var start_date = new Date();
//                 // // var end_date  = start_date.setMonth(start_date.getMonth()+1);
//                 // Ext.getCmp('purchasedate_po').setValue(start_date);
//                 // Ext.getCmp('duedate_po').setValue(new Date().addDays(7))
//             }

//             form.findField('customer_type').setValue(data_purchase.customer_type*1);
//             form.findField('idcustomer').setValue(data_purchase.idcustomer*1);
//             Ext.getCmp('noPurchasOrder').setValue(data_purchase.no_purchase_order);
//             Ext.getCmp('noinvoicePurchasOrder').setValue(data_purchase.invoice_no);
//             Ext.getCmp('namesupplierPurchaseOrder').setValue(data_purchase.namecustomer);
//             form.findField('invoice_date').setValue(data_purchase.date_purchase);
//             form.findField('due_date').setValue(data_purchase.due_date);
//             Ext.getCmp('cb_tax_id_po').getStore().load()
//             Ext.getCmp('cb_tax_id_po').setValue(data_purchase.idtax);
//             Ext.getCmp('memoPurchaseOrder').setValue(data_purchase.comments);
//             // Ext.getCmp('memoPurchaseOrder').setValue(data_purchase.);
//             if(data_purchase.include_tax == 0){
//                 // alert('hai');
//                 Ext.getCmp('include_tax_po').setValue(0);
//             } else {
//                 Ext.getCmp('include_tax_po').setValue(1);
//             }

//             if(opt=='recurring'){
//                     // Ext.getCmp('cb_purchase_invoice_status').setValue(1);
//                     // Ext.getCmp('cb_purchase_invoice_status').setReadOnly(false);
//                 form.findField('status').setValue(1);
//             } else {
//                  form.findField('status').setValue(data_purchase.invoice_status*1);
//             }
           


//         },failure:function(form,action){

//         }
//     })
//     //
//     var grid = Ext.getCmp('GridItemEntryPurchaseOrder');
    
//     grid.getStore().removeAll();

//     Ext.Ajax.request({
//         url: CLINIC_API  + '/purchase/purchase_item',
//         // async:false,
//         method: 'GET',
//         params: {
//             id: purchase_id,
//             key: key
//         },
//         success: function(form, action) {
//             var d = Ext.decode(form.responseText);
//             // grid.getStore().sync();

//             var i = 0;
//             Ext.each(d.rows, function(item) {
//                 console.log(item)
                
//                 if(opt=='recurring'){
//                     var purchaseitem_id = null;
//                 } else {
//                     var purchaseitem_id = item.purchase_item_id*1;
//                 }

//                 var rec = new GridItemEntryPurchaseOrderModel({
//                         purchase_item_id: purchaseitem_id,
//                         // purchase_id: item.purchase_id*1,
//                         product_id:item.product_id*1,
//                         no_sku: item.no_sku,
//                         product_name: item.product_name,
//                         price: item.price*1,
//                         desc: item.description,
//                         total: item.total*1,
//                         qty: item.qty*1,
//                         disc: item.disc*1,
//                         rate: item.ratetax,
//                         qty_retur: 0,
//                         total_return:0
//                 });
//                 grid.getStore().insert(i, rec);

//                 i++;
//             });

//             updateGridPurchasev3();
//         },
//         failure: function(form, action) {
//             Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//         }
//     });    
    
  
// }

// function windowPurchaseMultiPayment() {
    
//     if (!Ext.isDefined(Ext.getCmp('windowPopupPurchaseMultiPayment'))) {
//         var windowPopupPurchaseMultiPayment = Ext.create(dir_sys + 'purchasing.windowPopupPurchaseMultiPayment');
//     } else {
//         var windowPopupPurchaseMultiPayment = Ext.getCmp('windowPopupPurchaseMultiPayment');
//     }

//     windowPopupPurchaseMultiPayment.show();
//     // if(invoice_status*1==5){
        
//     //     Ext.getCmp('savePaymentbtn').disable();
//     // }
// }

// function updateGridPurchasev3() {

//     var angkutPurchaseOrder = str_replace(",", "", Ext.getCmp('freightPurchaseOrder').getValue()) * 1;
//     var isIncludeTax = Ext.getCmp('include_tax_po').getValue()*1;
//     console.log(isIncludeTax)
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

// // function update_summary_purchace_receipt(){
// //     var form = Ext.getCmp('EntryPurchaseReceive').getForm();
// //     var store = Ext.getCmp('GridItemEntryPurchaseReceive').getStore();
// //     var qty_recepit = 0;
// //     var total_received = 0;
// //     var total_rest_qty = 0;
    
// //     Ext.each(store.data.items, function(obj, i) {
// //         console.log(obj.data.status_receipt)

// //         var total_per_row = obj.data.price*obj.data.qty_received;
        
// //         if(obj.data.receipt_status==2){
// //             // alert('alert')
// //             var rest_qty=obj.data.qty_received-obj.data.qty_received;
// //         }else{
// //             var rest_qty=obj.data.qty-obj.data.qty_received;
// //         }
        
// //         qty_recepit+=obj.data.qty_received*1;
// //         total_received+=total_per_row;
        
// //         total_rest_qty+=rest_qty;

// //         obj.set('total_received', total_per_row);
// //     });
// //         console.log(qty_recepit);    

// //     form.findField('total_qty_receive').setValue(qty_recepit.toLocaleString('null', {
// //         maximumFractionDigits: 2
// //     }));
// //     form.findField('total_rest_qty').setValue(total_rest_qty.toLocaleString('null', {
// //         maximumFractionDigits: 2
// //     }));
// // }

// function create_new_purchase_receive(purchase_id,status_purchase_receipt,purchase_receipt_id) {
    
//     if (!Ext.isDefined(Ext.getCmp('windowPurchaseReceive'))) {
//         var windowPurchaseReceive = Ext.create(dir_sys + 'purchasing.windowPurchaseReceive');
//     } else {
//         var windowPurchaseReceive = Ext.getCmp('windowPurchaseReceive');
//     }

//     if(status_purchase_receipt==3 && status_purchase_receipt!=''){
//         Ext.getCmp('windowPurchaseReceivesave').disable();
//     }else{
//         Ext.getCmp('windowPurchaseReceivesave').enable();

//     }
    
//     Ext.getCmp('EntryPurchaseReceive').getForm().reset();
//     Ext.getCmp('statusform_receive').setValue('input');
//     Ext.Ajax.request({
//         url:CLINIC_API  + 'purchase/data_form_receipt',
//         method:'GET',
//         params:{
//             key:key,
//             id:purchase_id,
//         },success:function(form,action){
//             var d =Ext.decode(form.responseText)
//             var form = Ext.getCmp('EntryPurchaseReceive').getForm();
//             console.log(d.success)
//             form.findField('receive_date').setValue(new Date());
//             form.findField('purchase_id').setValue(purchase_id);
//             form.findField('purchase_receive_id').setValue(purchase_receipt_id);
       
//             Ext.each(d.rows,function(obj){
//                 console.log(obj)
//                 form.findField('no_purchase_receipt').setValue(obj.no_purchase_receipt);
//                 form.findField('no_Purchase_order').setValue(obj.no_purchase_order);
//                 form.findField('date_Purchase').setValue(obj.date_purchase);
//                 form.findField('suppier').setValue(obj.suppier_name);
//                 // form.findField('total_qty_receive').setValue(obj.suppier_name);
//                 // total_qty_receive
           
//             })
//             if(d.success==true){
                

//             }else{
//                 Ext.Msg.alert('Failed', d.message);
//             }

//         },failure:function(form,action){

//         }
//     });
    
//     windowPurchaseReceive.show();
    
//     var storeGridItemEntryPurchaseReceive = Ext.getCmp('GridItemEntryPurchaseReceive').getStore();
      
//     storeGridItemEntryPurchaseReceive.on('beforeload', function(store, operation) {
//         operation.params = {
//             'key':key,           
//             'id':purchase_id,
//         }    
//     });

//     storeGridItemEntryPurchaseReceive.load();

//     Ext.Ajax.request({
//         url:CLINIC_API  + 'purchase/data_purchase_receipt_items',
//         method:'GET',
//         params:{
//             key:key,
//             id:purchase_id,
//         },success:function(form,action){
//             var d = Ext.decode(form.responseText)
            
//             var items_receipt = d.rows;
            
//             var qty_received = 0;
//             var total_received = 0;
//             var total_received = 0;
//             var total_rest_qty = 0;
//             var status_receipt = 0;
            
//             Ext.each(items_receipt, function(obj, i) {
            
//                 var total_per_row = obj.price*obj.qty_received;
                
//                 total_received+=total_per_row;
                
//                 status_receipt =obj.status_receipt*1;

//                 qty_received+=obj.qty_received*1;
//                 var rest_qty=obj.qty-obj.qty_received;
//                 total_rest_qty+=rest_qty;
                            
//                 console.log(obj.qty_received)
//                 // obj.set('total_received', total_per_row);
//             });


//             Ext.getCmp('total_qty_receive').setValue(qty_received);
//             Ext.getCmp('total_rest_qty').setValue(total_rest_qty);

//             // update_summary_purchace_receipt();
//         },failure:function(form,action){

//         }
//     })
    
// }

// function validasiPurchaseOrder() {

//     if (Ext.getCmp('customerPurchaseOrder').getValue() == null || Ext.getCmp('customerPurchaseOrder').getValue() == '') {
//         Ext.Msg.alert('Failed', 'Tentukan kolom tujuan penagihan');
//     } else if (Ext.getCmp('memoPurchaseOrder').getValue() == null) {
//         Ext.Msg.alert('Failed', 'Masukkan memo ');
//     } else if (Ext.getCmp('GridItemEntryPurchaseOrder').getStore().getRange().length == 0) {
//         Ext.Msg.alert('Failed', 'Masukkan barang terlebih dahulu');
//     } else {
//         return true;
//     }
// }

