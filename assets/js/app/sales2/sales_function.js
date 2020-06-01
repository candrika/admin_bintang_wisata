
function set_member_buyer_pos(){
    // var no_member = Ext.getCmp('no_member').getValue();
    // var grid_trx = Ext.getCmp('GridTransactionPOSID').getStore();
    // var disc = 0;
    // var total = 0;
    // var total_w_disc = 0;

    // Ext.each(grid_trx.data.items, function(obj, i) {
    //     var price = str_replace(".00", "",obj.data.price)*1;
    //     var retail_price_member = str_replace(".00", "",obj.data.retail_price_member)*1;
        
    //     // console.log(price+' '+retail_price_member)
    //     var get_record = grid_trx.getAt(i);
    //     var new_qty = obj.data.qty;

    //     if(no_member!=null && no_member!=''){
    //         console.log(price+' '+retail_price_member)
    //         disc = price-retail_price_member;
    //     } else {
    //         disc = 0;
    //     }
    //     console.log('('+price+'-'+disc+')*'+new_qty+')');

    //     var total = (price-disc)*new_qty;
    //     get_record.set("qty",new_qty);
    //     get_record.set("disc",disc*new_qty);
    //     get_record.set("total",total);

    //     total+=total;
    //     total_w_disc+=total;
    // });
}

function setHeaderSalesSummary(){
     if (Ext.isDefined(Ext.getCmp('startdate_grdso'))) {
        var sd = convertDate3(Ext.getCmp('startdate_grdso').getSubmitValue());
        var nd = convertDate3(Ext.getCmp('enddate_grdso').getSubmitValue());
    } else {
        var sd = null
        var nd = null;
    }

    if(sd!=null && nd!=null){
        Ext.Ajax.request({
            url: CLINIC_API + 'sales/summary',
            method: 'GET',
            // headers: {
            //     'Access-Control-Allow-Origin': '*',
            //     //'Access-Control-Allow-Credentials': true,
            //     //'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
            //     //'Access-Control-Allow-Headers': 'Content-Type, Authorization,Content-Length, X-Requested-With'
            // },
            params: {
                key: key,
                password:password,
                idunit:idunit,
                startdate: sd,
                enddate: nd
            },
            // headers : { Authorization : auth },
            success: function(form, action) {
                var d = Ext.decode(form.responseText);
                Ext.getCmp('total_request_order').update('<center><h2><span style=color:red>'+ renderNomor2(d.total_sales_requisition) + '</span></h2>');
                Ext.getCmp('total_sales_summary').update('<center><h2><span style=color:#00ce0a>Rp. ' + renderNomor2(d.total_amount_sales) + '</span></h2>');
                // Ext.getCmp('total_itemsold_summary').update('<center><h2><span style=color:#7f73d8>' + renderNomor2(d.total_qty_sales) + '</span></h2>');

                // Ext.getCmp('total_invoice').update('<center><h2><span style=color:#0079d2>' + renderNomor2(d.total_invoice) + '</span></h2>');
                Ext.getCmp('total_invoice_paid').update('<center><h2><span style=color:#15c377>Rp. ' + renderNomor2(d.total_invoice_paid) + '</span></h2>');
                Ext.getCmp('total_invoice_unpaid').update('<center><h2><span style=color:#f96197>Rp. ' + renderNomor2(d.total_invoice_unpaid) + '</span></h2>');
                // Ext.getCmp('total_dueloan_summary').update('<center><h2><span style=color:#d50000>' + d.total_overdue_amount + '</span></h2>');
                // storeGridWindowSalesPayment.load();
            },
            failure: function(form, action) {
                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
            }
        });
    }
    
}

// function insert_tax_rate_so(id){
//     Ext.Ajax.request({
//         url: CLINIC_API + 'tax/data',
//         method: 'GET',
//         params: {
//            id:id
//         },
//         success: function(form, action) {
//             var d = Ext.decode(form.responseText);
//             Ext.getCmp('tax_rate_so').setValue(d.data.tax_rate);
//         },
//         failure: function(form, action) {
//             Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//         }
//     });
// }

function submit_pos_data(){
    var store_trx = Ext.getCmp('GridTransactionPOSID').getStore();
    var json_trx = Ext.encode(Ext.pluck(store_trx.data.items, 'data'));
    var form = Ext.getCmp('EntryTransactionPOS').getForm();
    var form_payment = Ext.getCmp('formPaymentPOS').getForm();

    if(Ext.getCmp('cash').getValue()==true){

        var payment_method = Ext.getCmp('cash').inputValue;
        var payment_amount = form_payment.findField("payment_amount").getValue();
        var change_amount  = form_payment.findField("change_amount").getValue();

    }else if(Ext.getCmp('credit').getValue()==true){
        
        var payment_method = Ext.getCmp('credit').inputValue;
        var payment_amount = form_payment.findField("sisa_plafon").getValue();
        var paidtoday      = form.findField("total_amount").getValue()
        var change_amount  = str_replace('.','',payment_amount) - str_replace('.','',paidtoday); 
    }



    //calculate items
    var num = 0;
    Ext.each(store_trx.data.items, function(obj, i) {
        num++;
    });

    if(num==0){
        Ext.Msg.alert('Informasi', 'Masukkan barang terlebih dahulu!');
        return false;
    }

    if (form.isValid()) {
        form.submit({
            url: CLINIC_API+'sales/new',
            params: { 
                key: key,
                password:password,
                item_sales: json_trx,
                idunit:idunit,
                payment_type: payment_method,
                subtotal: Ext.getCmp('footer_subtotal_pos').getValue(),
                discount: Ext.getCmp('footer_discount_pos').getValue(),
                paidtoday: form.findField("total_amount").getValue(),
                payment_amount:payment_amount,
                change_amount: change_amount
            },
            success: function(form, action) {
                console.log(action.response);
                var d = JSON.parse(action.response.responseText);
                if (!d.success) {
                    Ext.Msg.alert('Peringatan', d.message);
                } else {
                    Ext.Msg.alert('Informasi', d.message);
                   
                    clear_form_pos();
                    setHeaderSalesSummary();
                    Ext.getCmp('payment_method').disable();
                    Ext.getCmp('btnPaymentPOS').setDisabled(true);

                    window.open(SITE_URL + 'sales/print_sales/' + d.id + '/print', '_blank');
                    // Ext.create('Ext.window.Window', {
                    //     title: 'Cetak Struk',
                    //     modal: true,
                    //     width: 600,
                    //     height:500,
                    //     items: [{
                    //         xtype: 'component',
                    //         html: '<iframe src="' + CLINIC_API + 'sales/print_sales/' + d.id + '/print"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
                    //     }],
                    //     buttons: [{
                    //         text: 'Print',
                    //         iconCls: 'print-icon',
                    //         handler: function() {
                    //             window.open(CLINIC_API + 'sales/print_sales/' + d.id + '/print', '_blank');
                    //         }
                    //     }]
                    // }).show();
                    if (Ext.isDefined(Ext.getCmp('SalesGridID'))) {
                        Ext.getCmp('SalesGridID').getStore().load();
                    }
                     
                    set_focus_searchbar_pos();
                }
            },
            failure: function(form, action) {
                var d = JSON.parse(action.response.responseText);
                Ext.Msg.alert('Failed', d.message);
                set_focus_searchbar_pos();
                //                            storeGridWindowFormDeposit.load();
            }
        });
    } else {
        Ext.Msg.alert("Error!", "Your form is invalid!");
    }
}

function window_pos(){
    // var WindowPOS = Ext.create(dir_sys + 'sales2.WindowPOS');
    if (!Ext.isDefined(Ext.getCmp('windowPopupWindowPOS'))) {
        var WindowPOS = Ext.create(dir_sys + 'sales2.WindowPOS');
    } else {
        var WindowPOS = Ext.getCmp('windowPopupWindowPOS');
    }

    WindowPOS.show();   
    set_focus_searchbar_pos();

    var store=Ext.getCmp('GridProductChooserID').getStore();
    store.getProxy().extraParams={};
    store.load();
}

function set_focus_searchbar_pos(){
    var search_pos_field = Ext.getCmp('search_pos');
    search_pos_field.setValue(null);
    search_pos_field.focus();
}

function updateGridSalesOrderv3() {

    var angkutSalesOrder = str_replace(",", "", Ext.getCmp('freightSalesOrder').getValue()) * 1;
    var isIncludeTax = Ext.getCmp('include_tax_so').getValue() * 1;

    var storeGridItemSalesOrder = Ext.getCmp('GridItemEntrySalesOrder').getStore();
    storeGridItemSalesOrder.clearFilter();
    console.log(storeGridItemSalesOrder.data.items);
    var json = Ext.encode(Ext.pluck(storeGridItemSalesOrder.data.items, 'data'));
    // var tax_rate = Ext.getCmp('tax_rate_so').getValue()*1;

    Ext.each(storeGridItemSalesOrder.data.items, function(obj, i) {
        var total = obj.data.qty * (obj.data.price);
        var diskon = (total / 100) * obj.data.disc;
        // var tax = total*(obj.data.rate*1/100);
        // var tax = total*(tax_rate*1/100);
        var tax = 0;

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
        url: CLINIC_API + 'sales/calc_sales_invoice_recap',
        method: 'POST',
        params: {
            include_tax: isIncludeTax,
            shipping_cost: angkutSalesOrder,
            sales_item: json,
            tax_id: Ext.getCmp('cb_tax_id_so').getValue()*1,
            key: key,
            password:password
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            // console.log(d);
            
            if(d.is_tax_pph23*1==1 && d.is_tax_ppn*1==1){
                Ext.getCmp('include_tax_so').show()
                Ext.getCmp('totalPajakSalesOrder').show()
            }else if(d.is_tax_pph23*1==1 && d.is_tax_ppn*1==0){
                Ext.getCmp('include_tax_so').hide();
                Ext.getCmp('totalPajakSalesOrder').show()

            }else if(d.is_tax_pph23*1==0 && d.is_tax_ppn*1==1){
                Ext.getCmp('include_tax_so').show()
                Ext.getCmp('totalPajakSalesOrder').show()

            }else if(d.is_tax_pph23*1==0 && d.is_tax_ppn*1==0){
                Ext.getCmp('include_tax_so').hide()
                Ext.getCmp('totalPajakSalesOrder').hide()

            }else if(d.is_tax_pph23*1==null && d.is_tax_ppn*1==null){
                Ext.getCmp('include_tax_so').show()
                Ext.getCmp('totalPajakSalesOrder').show()

            }

            Ext.getCmp('subtotalSalesOrder').setValue(number_format(d.sub_total));             

            Ext.getCmp('diskonSalesOrder').setValue(number_format(d.total_disc));

            // var total = (subtotalSalesOrder-total_diskon)+angkutSalesOrder;
            Ext.getCmp('totalSalesOrder_1').setValue(number_format(d.total)); //total

            Ext.getCmp('totalPajakSalesOrder').setValue(number_format(d.total_tax));

            Ext.getCmp('totalSalesOrder').setValue(number_format(d.grand_total));
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });

}

function updateGridSalesOrderv2() {

    var storeGridItemSalesOrder = Ext.getCmp('GridItemEntrySalesOrder').getStore();

    var subtotalSalesOrder = 0 * 1;
    var dppSalesOrder = 0 * 1;
    var totalSalesOrder = 0 * 1;
    var totalPajak = 0 * 1;
    var angkutSalesOrder = str_replace(",", "", Ext.getCmp('freightSalesOrder').getValue()) * 1;

    var isIncludeTax = Ext.getCmp('include_tax_so').getValue() * 1;
    var total_diskon = 0;

    Ext.each(storeGridItemSalesOrder.data.items, function(obj, i) {
        var total = obj.data.qty * (obj.data.price);
        var diskon = (total / 100) * obj.data.disc;
        var tax = total*(obj.data.rate*1/100);

        total_diskon += diskon;
        totalPajak += tax;       
        subtotalSalesOrder += total;

        if(isIncludeTax){
            //include tax
             var total_per_row = (total - diskon);
        } else {
            var total_per_row = (total - diskon)+tax;
        }

       obj.set('total', total_per_row);
    });

    // var grandTotal = 
    
    Ext.getCmp('subtotalSalesOrder').setValue(renderNomor(subtotalSalesOrder)); 

     Ext.getCmp('diskonSalesOrder').setValue(renderNomor(total_diskon));

    var total = (subtotalSalesOrder-total_diskon)+angkutSalesOrder;
    Ext.getCmp('totalSalesOrder_1').setValue(renderNomor(total)); //total


    Ext.getCmp('totalPajak' + addprefix).setValue(renderNomor(Math.ceil(totalPajak*1)));
   
    if(isIncludeTax){
        //include tax
         var grand_total = (total);
    } else {
        var grand_total = (total+totalPajak);
    }

    Ext.getCmp('totalSalesOrder').setValue(renderNomor(grand_total));

}

function updateGridSalesOrder(tipe) {

    var storeGridItemSalesOrder = Ext.getCmp('GridItemEntrySalesOrder').getStore();

    // console.log('update run');
    var addprefix = 'SalesOrder';

    var subtotalSalesOrder = 0 * 1;
    var dppSalesOrder = 0 * 1;
    var totalSalesOrder = 0 * 1;
    var totalPajak = 0 * 1;
    var angkutSalesOrder = str_replace(",", "", Ext.getCmp('freightSalesOrder').getValue()) * 1;
    console.log('form:'+angkutSalesOrder);
    // var pembayaranSalesOrder = Ext.getCmp('pembayaranSalesOrder').getValue();
    var sisaBayarSalesOrder = 0 * 1;
    var taxrate = Ext.getCmp('cb_tax_id_so').getValue() * 1;
    var isIncludeTax = Ext.getCmp('include_tax_so').getValue() * 1;
    var total_diskon = 0;

    if(taxrate=='1'){
        taxrate = 10;
    }

    Ext.each(storeGridItemSalesOrder.data.items, function(obj, i) {
        var total = obj.data.qty * (obj.data.price);
        var diskon = (total / 100) * obj.data.disc;
        total_diskon += diskon;

        var net = total - diskon;
        console.log(total + ' - ' + diskon);

        subtotalSalesOrder += net;
        // totalPajak += (net / 100) * (taxrate * 1);
        obj.set('ratetax', taxrate);
        obj.set('total', net);
    });

    dppSalesOrder = isIncludeTax ? ((subtotalSalesOrder + total_diskon) / 1.1)+angkutSalesOrder : (subtotalSalesOrder+angkutSalesOrder);
    totalPajak += (dppSalesOrder) * (taxrate * 1 / 100);
    console.log('1:'+totalPajak)
    // totalSalesOrder = dppSalesOrder + totalPajak;
    totalSalesOrder = dppSalesOrder;

    console.log(Math.ceil(totalPajak*1)+ ' '+ Math.ceil(dppSalesOrder*1))

    Ext.getCmp('subtotal' + addprefix).setValue(renderNomor(subtotalSalesOrder));


      if(isIncludeTax){
        var total = (subtotalSalesOrder*1)+angkutSalesOrder*1;
        var grandTotal = total;
        var dppSalesOrder = total/1.1;
        var totalPajak = dppSalesOrder * (taxrate * 1 / 100);
        // var grandTotal = Math.ceil(dppSalesOrder*1)+angkutSalesOrder*1;
    } else {
        // var total = totalSalesOrder*1-Math.ceil(totalPajak*1);
        var total = (subtotalSalesOrder*1)+angkutSalesOrder*1;
        var grandTotal = Math.ceil(dppSalesOrder*1)+Math.ceil(totalPajak*1);
    }
    
    console.log('2:'+totalPajak)
    Ext.getCmp('total' + addprefix).setValue(renderNomor(grandTotal)); //grand total

    Ext.getCmp('totalSalesOrder_1').setValue(renderNomor(total)); //total

    Ext.getCmp('totalPajak' + addprefix).setValue(renderNomor(Math.ceil(totalPajak*1)));
    Ext.getCmp('diskonSalesOrder').setValue(renderNomor(total_diskon));
    Ext.getCmp('dppSalesOrder').setValue(renderNomor(dppSalesOrder));


    // Ext.getCmp('pembayaran').setValue(pembayaranSalesOrder.toLocaleString('null', {minimumFractionDigits: 2}));
    // Ext.getCmp('sisaBayarSalesOrder').setValue(sisaBayarSalesOrder.toLocaleString('null', {minimumFractionDigits: 2}));

}

function validasiSalesOrder() {
    //    alert(Ext.getCmp('comboxcurrencySalesOrder').getValue());   

    // if (Ext.getCmp('nojurnalSalesOrder').getValue() == null) {
    //     Ext.Msg.alert('Failed', 'Tentukan No SO #');
    // } else 
   // if (Ext.getCmp('cb_tax_id_so').getValue() == null) {
   //      Ext.Msg.alert('Failed', 'Tentukan Jenis Pajak');
   //  } else 
    if (Ext.getCmp('customerSalesOrder').getValue() == null || Ext.getCmp('customerSalesOrder').getValue() == '') {
        Ext.Msg.alert('Failed', 'Tentukan kolom tujuan penagihan');
    } else if (Ext.getCmp('memoSalesOrder').getValue() == null) {
        Ext.Msg.alert('Failed', 'Masukkan memo ');
    } else if (Ext.getCmp('GridItemEntrySalesOrder').getStore().getRange().length == 0) {
        Ext.Msg.alert('Failed', 'Masukkan barang terlebih dahulu');
    } else {
        return true;
    }
}

function windowSalesMultiPayment() {
    
    if (!Ext.isDefined(Ext.getCmp('windowPopupSalesMultiPayment'))) {
        var windowPopupSalesMultiPayment = Ext.create(dir_sys + 'sales2.windowPopupSalesMultiPayment');
    } else {
        var windowPopupSalesMultiPayment = Ext.getCmp('windowPopupSalesMultiPayment');
    }

    windowPopupSalesMultiPayment.show();
}

function update_total_bayar_multi_sales_invoice() {
  var total = 0;
  var total_bayar = 0;
  var Store = Ext.getCmp('GridItemEntrySalesMultiInvoice').getStore();
  Ext.each(Store.data.items, function(obj, i) {
    // console.log(obj.data.totalamount)    
    total += obj.data.unpaid_amount * 1;

    var sales_invoice_id = obj.data.sales_invoice_id;
    
    
     obj.set('pay_amount', obj.data.pay_amount);  

     var subtotal = obj.data.pay_amount*1;
     obj.set('subtotal', subtotal);      

     total_bayar += subtotal;
    // total_bayar += total_return*1-obj.data.pay_amount * 1;
     // obj.set('subtotal', subtotal);

     obj.set('balance', obj.data.unpaid_amount*1 - subtotal*1);
     
  });
  Ext.getCmp('amount_SalesMultiPayment').setValue(renderNomor(total_bayar));
  Ext.getCmp('totalpayment_multipaymentsales').setValue(renderNomor(total));
  Ext.getCmp('balance_multipaymentsales').setValue(renderNomor(total - total_bayar));
}

function create_new_sales_return() {
    
    if (!Ext.isDefined(Ext.getCmp('windowSalesReturn'))) {
        var windowSalesReturn = Ext.create(dir_sys + 'sales2.windowSalesReturn');
    } else {
        var windowSalesReturn = Ext.getCmp('windowSalesReturn');
    }

    windowSalesReturn.show();
    var form = Ext.getCmp('EntrySalesReturn').getForm();
    form.reset();
    form.findField('date_return').setValue(new Date());

    Ext.getCmp('GridItemEntrySalesReturn').getStore().removeAll();//clear all data on grid
}

function update_summary_salesreturn(){
    var form = Ext.getCmp('EntrySalesReturn').getForm();
    var store = Ext.getCmp('GridItemEntrySalesReturn').getStore();
    var total_qty = 0;
    var total_return = 0;
    Ext.each(store.data.items, function(obj, i) {
        console.log(obj)

        var total_per_row = obj.data.price*obj.data.qty_retur;
        total_qty+=obj.data.qty_retur;
        total_return+=total_per_row;

        obj.set('total_return', total_per_row);
    });

    form.findField('total_qty_return').setValue(renderNomor(total_qty));
    form.findField('total_amount_return').setValue(renderNomor(total_return));
}

function cash_method(){

    //set allowBlank true
    Ext.getCmp('btnPaymentPOS').enable()

    Ext.getCmp('sisa_plafonSales').setValue(null)
    Ext.getCmp('loan_product').allowBlank = true;
    Ext.getCmp('sisa_plafonSales').allowBlank = true;
    Ext.getCmp('tenor').allowBlank = true;
                                   
    Ext.getCmp('payment_amount').show()
    Ext.getCmp('change_amount').show()
    Ext.getCmp('sisa_plafonSales').hide()
    Ext.getCmp('loan_product').hide()
    Ext.getCmp('tenor').hide()
    Ext.getCmp('info_text').hide()
    Ext.getCmp('credit').setValue(false)
}

function credit_method(){

    //set allowBlank true
    Ext.getCmp('btnPaymentPOS').enable()
    Ext.getCmp('payment_amount').allowBlank = true;
    Ext.getCmp('change_amount').allowBlank = true;
    console.log(Ext.getCmp('credit').inputValue)
    
    Ext.fly('tenor-triggerWrap').set({ 'style': 'margin-left:235px' });                       
    Ext.getCmp('tenor').getEl('tenor-tenor-labelCell').dom.style.marginLeft = '0px';                                
    
    Ext.getCmp('payment_amount').hide()
    Ext.getCmp('change_amount').hide()
    Ext.getCmp('loan_product').show()
    Ext.getCmp('sisa_plafonSales').show()
    Ext.getCmp('tenor').show()
    Ext.getCmp('info_text').hide()
    Ext.getCmp('cash').setValue(false) 

}   

function defaults(member_id){

    Ext.getCmp('payment_method').enable();
    Ext.getCmp('sisa_plafonSales').setValue(null)
    Ext.getCmp('cash').setValue(true);
    Ext.getCmp('credit').setValue(false);

    if(member_id!=''){
        // alert('xxxx')
        if(Ext.getCmp('cash').getValue()==true){
            
            Ext.getCmp('loan_product').allowBlank = true;
            Ext.getCmp('sisa_plafonSales').allowBlank = true;
            Ext.getCmp('tenor').allowBlank = true;

        }else if(Ext.getCmp('credit').getValue()==true){

            Ext.getCmp('payment_amount').allowBlank = true;
            Ext.getCmp('change_amount').allowBlank = true;
        }

    }else if(member_id==''){
        // alert('aaaa')

        Ext.getCmp('loan_product').allowBlank = true;
        Ext.getCmp('sisa_plafonSales').allowBlank = true;
        Ext.getCmp('tenor').allowBlank = true;
    }
  
    Ext.getCmp('loan_product').hide()
    Ext.getCmp('info_text').hide()
    Ext.getCmp('tenor').hide()
    Ext.getCmp('sisa_plafonSales').hide()
    Ext.getCmp('payment_amount').show()
    Ext.getCmp('change_amount').show()
}

function newLoan(member_id,id_loan_type,proposed_amount,length_loan){
    Ext.Ajax.request({
        url:SITE_URL+'member/loan_propose',
        method:'POST',
        params:{
            key:coop_key,
            member_id:member_id,
            loan_type_id:id_loan_type,
            proposed_amount:proposed_amount,
            length_loan:length_loan
        },
        success:function(form,action){
           var decode = Ext.decode(form.responseText)
           if(decode.success==false){
                Ext.Msg.alert('Info',decode.message);
           }else{
              submit_pos_data();
           }
        },
        failure:function(form,action){
            var decode = Ext.decode(form.responseText)
            Ext.Msg.alert('Info',decode.message);
        }
    })
}

function medical_credit_payment(member_id){

    Ext.Ajax.request({
        url:COOP_API +'member/loan_summary',
        method:'GET',
        params:{
            key:coop_key ,
            mid:member_id
        },
        success:function(form,action){
            var d = Ext.decode(form.responseText);
            console.log(d.data.sisa_plafon);
            Ext.getCmp('loan_plafon_payment').setValue(d.data.sisa_plafon)
        },
        failure:function(form,action){

        }
    })
}

function get_culc(){
    
    var diskonpayment = str_replace('.','',Ext.getCmp('diskonpayment').getValue());
    var shipping_fee_payment = str_replace('.','',Ext.getCmp('shipping_fee_payment').getValue());
    var subtotal      = str_replace('.','',Ext.getCmp('subtotalpayment').getValue());

    var grand_total = subtotal*1-diskonpayment*1+shipping_fee_payment*1;

    Ext.getCmp('totalpayment').setValue(renderNomor(grand_total));
}