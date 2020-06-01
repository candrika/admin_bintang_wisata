 if (!Ext.isDefined(Ext.getCmp('WindowEntryPurchasingOrder'))) {
    var WindowEntryPurchasingOrder = Ext.create(dir_sys + 'purchasing.WindowEntryPurchasingOrder');
}else {
    var WindowEntryPurchasingOrder = Ext.getCmp('WindowEntryPurchasingOrder');
}

function create_recurring_po(data){
    WindowEntryPurchasingOrder.show();

    Ext.getCmp('EntryPurchaseOrder').getForm().reset();
    Ext.getCmp('freightPurchaseOrder').setValue(data.freight);

    load_data_purchase(data.purchase_id,'recurring');


    // Ext.getCmp('btnRecordSalesOrder').setDisabled(false);

    //generate number
    Ext.Ajax.request({
        url: CLINIC_API + '/purchase/generate_no_po',
        method: 'GET',
        params: {
            key: key,
            password:password,
        },
        success: function(formx, action) {
            var d = Ext.decode(formx.responseText);
           Ext.getCmp('noPurchasOrder').setValue(d.doc_number);
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });
}

function view_PO_data(purchase_id){
    WindowEntryPurchasingOrder.show();

    load_data_purchase(purchase_id); 
}

function load_data_purchase(purchase_id,opt) {
    // body...
    WindowEntryPurchasingOrder.show()
    Ext.Ajax.request({
        url: CLINIC_API + '/purchase/data',
        // async:false,
        method: 'GET',
        params: {
            purchase_id: purchase_id,
            key: key,
            password:password,
            idunit:idunit

        },success:function(form,action) {
            // body...
            var d = Ext.decode(form.responseText);
            var data_purchase = d.rows[0];
            console.log(data_purchase)
            var form = Ext.getCmp('EntryPurchaseOrder').getForm();

            if(opt=='recurring'){
                    // var purchaseitem_id = null;
                Ext.getCmp('purchase_id_po').setValue(null);
                //form.findField('status').setValue(data_purchase.invoice_status*1);
            } else {
                    // var purchaseitem_id = item.purchase_item_id*1;
                Ext.getCmp('purchase_id_po').setValue(data_purchase.purchase_id*1);
                // var start_date = new Date();
                // // var end_date  = start_date.setMonth(start_date.getMonth()+1);
                // Ext.getCmp('purchasedate_po').setValue(start_date);
                // Ext.getCmp('duedate_po').setValue(new Date().addDays(7))
            }

            form.findField('customer_type').setValue(data_purchase.customer_type*1);
            form.findField('idcustomer').setValue(data_purchase.idcustomer*1);
            Ext.getCmp('noPurchasOrder').setValue(data_purchase.no_purchase_order);
            Ext.getCmp('noinvoicePurchasOrder').setValue(data_purchase.invoice_no);
            Ext.getCmp('namesupplierPurchaseOrder').setValue(data_purchase.namecustomer);
            form.findField('invoice_date').setValue(data_purchase.date_purchase);
            form.findField('due_date').setValue(data_purchase.due_date);
            Ext.getCmp('cb_tax_id_po').getStore().load()
            Ext.getCmp('cb_tax_id_po').setValue(data_purchase.idtax);
            Ext.getCmp('memoPurchaseOrder').setValue(data_purchase.comments);
            // Ext.getCmp('memoPurchaseOrder').setValue(data_purchase.);
            if(data_purchase.include_tax == 0){
                // alert('hai');
                Ext.getCmp('include_tax_po').setValue(0);
            } else {
                Ext.getCmp('include_tax_po').setValue(1);
            }

            if(opt=='recurring'){
                
                form.findField('status').setValue(3);
                
            } else {
                
                form.findField('status').setValue(data_purchase.invoice_status*1);
            }
           


        },failure:function(form,action){

        }
    })
    //
    var grid = Ext.getCmp('GridItemEntryPurchaseOrder');
    
    grid.getStore().removeAll();

    Ext.Ajax.request({
        url: CLINIC_API + '/purchase/purchase_item',
        // async:false,
        method: 'GET',
        params: {
            id: purchase_id,
            key: key,
            password:password,
            idunit:idunit
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            // grid.getStore().sync();

            var i = 0;
            Ext.each(d.rows, function(item) {
                console.log(item)
                
                if(opt=='recurring'){
                    var purchaseitem_id = null;
                } else {
                    var purchaseitem_id = item.purchase_item_id*1;
                }

                var rec = new GridItemEntryPurchaseOrderModel({
                        purchase_item_id: purchaseitem_id,
                        // purchase_id: item.purchase_id*1,
                        product_id:item.product_id*1,
                        no_sku: item.no_sku,
                        product_name: item.product_name,
                        price: item.price*1,
                        desc: item.description,
                        total: item.total*1,
                        qty: item.qty*1,
                        disc: item.disc*1,
                        rate: item.ratetax,
                        qty_retur: 0,
                        total_return:0
                });
                grid.getStore().insert(i, rec);

                i++;
            });

            updateGridPurchasev3();
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });    
    
  
}

function windowPurchaseMultiPayment() {
    
    if (!Ext.isDefined(Ext.getCmp('windowPopupPurchaseMultiPayment'))) {
        var windowPopupPurchaseMultiPayment = Ext.create(dir_sys + 'purchasing.windowPopupPurchaseMultiPayment');
    } else {
        var windowPopupPurchaseMultiPayment = Ext.getCmp('windowPopupPurchaseMultiPayment');
    }
    
    Ext.getCmp('GridItemEntryPurchaseMultiInvoice').getStore().removeAll();
    Ext.getCmp('form_PurchaseMultiPayment').getForm().reset();              
    windowPopupPurchaseMultiPayment.show();

}

function updateGridPurchasev3() {

    var angkutPurchaseOrder = str_replace(",", "", Ext.getCmp('freightPurchaseOrder').getValue()) * 1;
   
    angkutPurchaseOrder; 
    
    
    var isIncludeTax = Ext.getCmp('include_tax_po').getValue()*1;
    console.log(isIncludeTax)
    var storeGridItemPurchaseOrder = Ext.getCmp('GridItemEntryPurchaseOrder').getStore();
    storeGridItemPurchaseOrder.clearFilter();
    var json = Ext.encode(Ext.pluck(storeGridItemPurchaseOrder.data.items, 'data'));

    Ext.each(storeGridItemPurchaseOrder.data.items, function(obj, i) {
        var total = obj.data.qty * (obj.data.price);
        var diskon = (total / 100) * obj.data.disc;
        var tax = total*(obj.data.rate*1/100);

        if(isIncludeTax){
            //include tax
             var total_per_row = (total - diskon);
        } else {
            var total_per_row = (total - diskon)+tax;
        }

       obj.set('total', total_per_row);
    });

    //calculate summary footer at backend
    Ext.Ajax.request({
        url: CLINIC_API + 'Purchase/summary_purchase_inv',
        method: 'POST',
        params: {
            include_tax: isIncludeTax,
            shipping_cost: angkutPurchaseOrder,
            Purchase_item: json,
            tax_id:Ext.getCmp('cb_tax_id_po').getValue()*1,
            key: key,
            password:password
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            Ext.getCmp('subtotalPurchaseOrder').setValue(number_format(d.sub_total)); 

            Ext.getCmp('diskonPurchaseOrder').setValue(number_format(d.total_disc));

            // var total = (subtotalPurchaseOrder-total_diskon)+angkutPurchaseOrder;
            Ext.getCmp('totalPurchaseOrder_1').setValue(number_format(d.total)); //total


            Ext.getCmp('totalPajakPurchaseOrder').setValue(number_format(d.total_tax));

            Ext.getCmp('totalPurchaseOrder').setValue(number_format(d.grand_total));
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });

}

// function update_summary_purchace_receipt(){
//     var form = Ext.getCmp('EntryPurchaseReceive').getForm();
//     var store = Ext.getCmp('GridItemEntryPurchaseReceive').getStore();
//     var qty_recepit = 0;
//     var total_received = 0;
//     var total_rest_qty = 0;
    
//     Ext.each(store.data.items, function(obj, i) {
//         console.log(obj.data.status_receipt)

//         var total_per_row = obj.data.price*obj.data.qty_received;
        
//         if(obj.data.receipt_status==2){
//             // alert('alert')
//             var rest_qty=obj.data.qty_received-obj.data.qty_received;
//         }else{
//             var rest_qty=obj.data.qty-obj.data.qty_received;
//         }
        
//         qty_recepit+=obj.data.qty_received*1;
//         total_received+=total_per_row;
        
//         total_rest_qty+=rest_qty;

//         obj.set('total_received', total_per_row);
//     });
//         console.log(qty_recepit);    

//     form.findField('total_qty_receive').setValue(qty_recepit.toLocaleString('null', {
//         maximumFractionDigits: 2
//     }));
//     form.findField('total_rest_qty').setValue(total_rest_qty.toLocaleString('null', {
//         maximumFractionDigits: 2
//     }));
// }

function create_new_purchase_receive(purchase_id,status_purchase_receipt,purchase_receipt_id) {
    
    if (!Ext.isDefined(Ext.getCmp('windowPurchaseReceive'))) {
        var windowPurchaseReceive = Ext.create(dir_sys + 'purchasing.windowPurchaseReceive');
    } else {
        var windowPurchaseReceive = Ext.getCmp('windowPurchaseReceive');
    }

    if(status_purchase_receipt==3 && status_purchase_receipt!=''){
        Ext.getCmp('windowPurchaseReceivesave').disable();
    }else{
        Ext.getCmp('windowPurchaseReceivesave').enable();

    }
    
    Ext.getCmp('EntryPurchaseReceive').getForm().reset();
    Ext.getCmp('statusform_receive').setValue('input');
    Ext.Ajax.request({
        url:CLINIC_API + 'purchase/data_form_receipt',
        method:'GET',
        params:{
            key:key,
            password:password,
            idunit:idunit,
            id:purchase_id,
        },success:function(form,action){
            var d =Ext.decode(form.responseText)
            var form = Ext.getCmp('EntryPurchaseReceive').getForm();
            console.log(d.success)
            form.findField('receive_date').setValue(new Date());
            form.findField('purchase_id').setValue(purchase_id);
            form.findField('purchase_receive_id').setValue(purchase_receipt_id);
       
            Ext.each(d.rows,function(obj){
                console.log(obj)
                form.findField('no_purchase_receipt').setValue(obj.no_purchase_receipt);
                form.findField('no_Purchase_order').setValue(obj.no_purchase_order);
                form.findField('date_Purchase').setValue(obj.date_purchase);
                form.findField('suppier').setValue(obj.suppier_name);
                // form.findField('total_qty_receive').setValue(obj.suppier_name);
                // total_qty_receive
           
            })
            if(d.success==true){
                

            }else{
                Ext.Msg.alert('Failed', d.message);
            }

        },failure:function(form,action){

        }
    });
    
    windowPurchaseReceive.show();
    
    var storeGridItemEntryPurchaseReceive = Ext.getCmp('GridItemEntryPurchaseReceive').getStore();
      
    storeGridItemEntryPurchaseReceive.on('beforeload', function(store, operation) {
        operation.params = {
            'key':key,
            'password':password,
            'idunit':idunit,           
            'id':purchase_id,
        }    
    });

    storeGridItemEntryPurchaseReceive.load();

    Ext.Ajax.request({
        url:CLINIC_API + 'purchase/data_purchase_receipt_items',
        method:'GET',
        params:{
            key:key,
            password:password,
            idunit:idunit,
            id:purchase_id,
        },success:function(form,action){
            var d = Ext.decode(form.responseText)
            
            var items_receipt = d.rows;
            
            var qty_received = 0;
            var total_received = 0;
            var total_received = 0;
            var total_rest_qty = 0;
            var status_receipt = 0;
            
            Ext.each(items_receipt, function(obj, i) {
            
                var total_per_row = obj.price*obj.qty_received;
                
                total_received+=total_per_row;
                
                status_receipt =obj.status_receipt*1;

                qty_received+=obj.qty_received*1;
                var rest_qty=obj.qty-obj.qty_received;
                total_rest_qty+=rest_qty;
                            
                console.log(obj.qty_received)
                // obj.set('total_received', total_per_row);
            });


            Ext.getCmp('total_qty_receive').setValue(qty_received);
            Ext.getCmp('total_rest_qty').setValue(total_rest_qty);

            // update_summary_purchace_receipt();
        },failure:function(form,action){

        }
    })
    
}

function validasiPurchaseOrder() {

    if (Ext.getCmp('namesupplierPurchaseOrder').getValue() == null || Ext.getCmp('namesupplierPurchaseOrder').getValue() == '') {
        Ext.Msg.alert('Failed', 'Tentukan kolom Pemasok');
    } else if (Ext.getCmp('memoPurchaseOrder').getValue() == null) {
        Ext.Msg.alert('Failed', 'Masukkan memo ');
    } else if (Ext.getCmp('GridItemEntryPurchaseOrder').getStore().getRange().length == 0) {
        Ext.Msg.alert('Failed', 'Masukkan barang terlebih dahulu');
    }else if (Ext.getCmp('purchasedate_po').getValue() == null || Ext.getCmp('purchasedate_po').getValue() == '') {
        Ext.Msg.alert('Failed', 'Masukkan tgl beli terebih dahulu dahulu');
    }else if (Ext.getCmp('duedate_po').getValue() == null || Ext.getCmp('duedate_po').getValue() == '') {
        Ext.Msg.alert('Failed', 'Masukkan tgl penulasan terebih dahulu dahulu');
    } else {
        return true;
    }
}

function updateGridPurchaseOrderv3() {

    var angkutPurchaseOrder = str_replace(",", "", Ext.getCmp('freightPurchaseOrder').getValue()) * 1;
    var isIncludeTax = Ext.getCmp('include_tax_po').getValue() * 1;

    var storeGridItemPurchaseOrder = Ext.getCmp('GridItemEntryPurchaseOrder').getStore();
    storeGridItemPurchaseOrder.clearFilter();
    var json = Ext.encode(Ext.pluck(storeGridItemPurchaseOrder.data.items, 'data'));

    Ext.each(storeGridItemPurchaseOrder.data.items, function(obj, i) {
        var total = obj.data.qty * (obj.data.price);
        var diskon = (total / 100) * obj.data.disc;
        var tax = total*(obj.data.rate*1/100);

        if(isIncludeTax){
            //include tax
             var total_per_row = (total - diskon);
        } else {
            var total_per_row = (total - diskon)+tax;
        }

       obj.set('total', total_per_row);
    });

    //calculate summary footer at backend
    Ext.Ajax.request({
        url: CLINIC_API + 'Purchase/summary_purchase_inv',
        method: 'POST',
        params: {
            include_tax: isIncludeTax,
            shipping_cost: angkutPurchaseOrder,
            Purchase_item: json,
            tax_id:Ext.getCmp('cb_tax_id_po').getValue()*1,
            key: key,
            password:password
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            Ext.getCmp('subtotalPurchaseOrder').setValue(number_format(d.sub_total)); 

            Ext.getCmp('diskonPurchaseOrder').setValue(number_format(d.total_disc));

            // var total = (subtotalPurchaseOrder-total_diskon)+angkutPurchaseOrder;
            Ext.getCmp('totalPurchaseOrder_1').setValue(number_format(d.total)); //total


            Ext.getCmp('totalPajakPurchaseOrder').setValue(number_format(Math.ceil(d.total_tax)));

            Ext.getCmp('totalPurchaseOrder').setValue(number_format(d.grand_total));
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });

}


function updateGridPurchaseOrderv2() {

    var storeGridItemPurchaseOrder = Ext.getCmp('GridItemEntryPurchaseOrder').getStore();
    var addprefix = 'PurchaseOrder'; 
    var subtotalPurchaseOrder = 0 * 1;
    var dppPurchaseOrder = 0 * 1;
    var totalPurchaseOrder = 0 * 1;
    var totalPajak = 0 * 1;
    var angkutPurchaseOrder = str_replace(",", "", Ext.getCmp('freightPurchaseOrder').getValue()) * 1;

    var isIncludeTax = Ext.getCmp('include_tax_po').getValue() * 1;
    var total_diskon = 0;
    var json = Ext.encode(Ext.pluck(storeGridItemPurchaseOrder.data.items, 'data'));

    Ext.each(storeGridItemPurchaseOrder.data.items, function(obj, i) {
        var total = obj.data.qty * (obj.data.price);
        var diskon = (total / 100) * obj.data.disc;
        var tax = total*(obj.data.rate*1/100);

        total_diskon += diskon;
        totalPajak += tax;       
        subtotalPurchaseOrder += total;

        if(isIncludeTax){
            //include tax
            var total_per_row = (total - diskon);
        } else {
            var total_per_row = (total - diskon)+tax;
        }

       obj.set('total', total_per_row);
    });

    //calculate summary footer at backend
    Ext.Ajax.request({
        url: CLINIC_API + 'Purchase/summary_purchase_inv',
        method: 'POST',
        params: {
            include_tax: isIncludeTax,
            shipping_cost: angkutPurchaseOrder,
            Purchase_item: json,
            tax_id:Ext.getCmp('cb_tax_id_po').getValue()*1,
            key: key,
            password:password
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            Ext.getCmp('subtotalPurchaseOrder').setValue(number_format(d.sub_total)); 

            Ext.getCmp('diskonPurchaseOrder').setValue(number_format(d.total_disc));

            Ext.getCmp('totalPurchaseOrder_1').setValue(number_format(d.total)); //total

            Ext.getCmp('totalPajakPurchaseOrder').setValue(number_format(Math.ceil(d.total_tax)));

            Ext.getCmp('totalPurchaseOrder').setValue(number_format(d.grand_total));
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });

}