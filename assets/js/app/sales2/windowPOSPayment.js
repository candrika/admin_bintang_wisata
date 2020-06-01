var formPaymentPOS = Ext.create('Ext.form.Panel', {
    autoWidth:true,
    id:'formPaymentPOS',
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/CustomerType/master',
    baseParams: {idmenu:24},
    bodyStyle: 'padding:5px',
   
    autoScroll: true,
    defaults: {
        padding: '5 10 5 5',
    },
    fieldDefaults: {
        msgTarget: 'side',
         labelAlign: 'top',
        blankText: 'is required',
        labelWidth: 160,
        anchor:'100%',
        width: 300
    },
    items: [
        {xtype: 'hiddenfield', id: 'member_idSale', name: 'member_id'},
        {xtype: 'displayfield', name: 'total_sales', fieldLabel:'Total Pembelian',fieldStyle: 'text-align: right;', allowBlank: false,labelCls: 'biggertext_wbg',fieldCls:'biggertext_wbg'},
        {
            xtype      : 'fieldcontainer',
            id:'payment_method',
            fieldLabel : 'Metode Bayar',
            defaultType: 'radiofield',
            defaults: {
                flex: 1,
                
            },
            layout: 'hbox',
            items: [
                {
                    boxLabel  : 'Uang Tunai',
                    name      : 'cash',
                    inputValue: 1,
                    id        : 'cash',
                    style:{
                        marginLeft:'91px'
                    },
                    listeners:{
                        render: function(component) {
                            component.getEl().on('click', function(event, el) {
                               
                               if(Ext.getCmp('cash').getValue()==true){

                                   cash_method()
                                }
                            });
                        }
                    }

                }, {
                    boxLabel  : 'Kredit',
                    name      : 'credit',
                    inputValue: 2,
                    id        : 'credit',
                    listeners:{
                        render: function(component) {
                            component.getEl().on('click', function(event, el) {
                                //
                                // get_plafon(Ext.getCmp('member_idSale').getValue());
                                if(Ext.getCmp('credit').getValue()==true){
                                    
                                    credit_method();   
                                    
                                    get_loan_summary(Ext.getCmp('member_idSale').getValue());
                                    
                                }
                                

                            });
                        }
                    }
                },
                
            ]
        },
        {xtype: 'displayfield', name: 'sisa_plafon',id: 'sisa_plafonSales', fieldLabel:'Sisa Angsuran Plafon',fieldStyle: 'text-align: right;', allowBlank: false,labelCls: 'biggertext_wbg',fieldCls:'biggertext_wbg'},
        {xtype: 'comboxloanproduct', name: 'id_loan_type', labelCls: 'biggertext_wbg'},
        {xtype: 'numberfield', name: 'tenor', id: 'tenor', fieldLabel:'Tenor',fieldStyle: 'text-align: left:251px',allowBlank: false,labelCls: 'biggertext_wbg',fieldCls:'biggertext_wbg',width:70},
        Ext.panel.Panel({
            // title:'Informasi',
            id:'info_text',
            html: '<p><center>Maaf, Anda tidak bisa mengunakan<center></p><p><center>pembayaran dengan Kredit, karena sisa plafon</center></p><center>anda tidak mencukupi</center></p>'
        }),
        {xtype: 'textfield', name: 'payment_amount',id: 'payment_amount', fieldLabel:'Pembayaran',fieldStyle: 'text-align: right;', allowBlank: false,labelCls: 'biggertext_wbg',fieldCls:'biggertext_wbg',
            listeners: {
                'render': function(c) {
                    c.getEl().on('keyup', function() {
                        this.setRawValue(renderNomor(this.getValue()));
                        calcChangeAmount();
                    }, c);
                },
                'specialkey': function(e,f){
                    if (f.getKey() == f.ENTER) {
                        if (formPaymentPOS.isValid()) {
                                // alert('xxx');

                            var form = formPaymentPOS.getForm();
                            
                            if(str_replace('.','',form.findField('sisa_plafon').getValue())*1 != ''){
                                console.log(form.findField('sisa_plafon').getValue())
                                if(str_replace('.','',form.findField('sisa_plafon').getValue())*1 > str_replace('.','',form.findField('total_sales').getValue())*1){
                                   newLoan(form.findField('member_id').getValue(),form.findField('id_loan_type').getValue(),form.findField('total_sales').getValue(),form.findField('tenor').getValue()) 
                                }

                            }else if(form.findField('payment_amount').getValue()=='0'){
                                Ext.Msg.alert("Penjualan", "Tentukan jumlah pembayaran terlebih dahulu.");
                            } else {
                                submit_pos_data();
                            }

                        } else {
                            Ext.Msg.alert("Error!", "Your form is invalid!");
                        }
                    }
                }
            }},
        {xtype: 'displayfield', name: 'change_amount',id: 'change_amount', fieldLabel:'Uang Kembalian',fieldStyle: 'text-align: right;',labelCls: 'biggertext_wbg',fieldCls:'biggertext_wbg'},
    ],
    buttons: [{
        text: 'Bayar',
        id:'btnPaymentPOS',
        handler: function() {
            var form = formPaymentPOS.getForm();
            if (formPaymentPOS.isValid()) {

                if(form.findField('sisa_plafon').getValue()!=''){
                    if(str_replace('.','',form.findField('sisa_plafon').getValue())*1 > str_replace('.','',form.findField('total_sales').getValue())*1){
                        newLoan(form.findField('member_id').getValue(),form.findField('id_loan_type').getValue(),form.findField('total_sales').getValue(),form.findField('tenor').getValue()) 
                    }
                    
                }

                else if(form.findField('payment_amount').getValue()=='0'){
                    Ext.Msg.alert("Penjualan", "Tentukan jumlah pembayaran terlebih dahulu.");
                } else {
                    submit_pos_data();
                }
                

            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

function calcChangeAmount(){
     var form = Ext.getCmp('EntryTransactionPOS').getForm();
     var total = str_replace('.','',form.findField("grandtotal").getValue())*1;

     var form_payment = Ext.getCmp('formPaymentPOS').getForm();
     var payment_amount = str_replace('.','',form_payment.findField("payment_amount").getValue())*1;
     console.log(total+ ' '+payment_amount)
     var change_amount = payment_amount-total;
     form_payment.findField("change_amount").setValue(renderNomor(change_amount));
     if(change_amount<0){
        Ext.getCmp('btnPaymentPOS').setDisabled(true);
     } else {
        Ext.getCmp('btnPaymentPOS').setDisabled(false);
     }
}

Ext.define(dir_sys + 'sales2.windowPOSPayment', {
     extend: 'Ext.window.Window',
     alias: 'widget.windowPOSPayment',
    id: 'windowPOSPayment',
    title: 'Pembayaran',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    // width: 870,
    modal:true,
    // height: 450,
    layout: 'fit',
    border: false,
    items: [formPaymentPOS]
}); 

function get_loan_summary(member_id){

    Ext.Ajax.request({
        url:COOP_API +'member/loan_summary',
        method:'GET',
        params:{
            key:coop_key ,
            mid:member_id
        },
        success:function(form,action){
            
            var date = new Date();
            console.log(date);

            var d = Ext.decode(form.responseText);
            console.log(d.data.sisa_plafon)

            var form_payments = Ext.getCmp('formPaymentPOS').getForm();
            var sisa_plafon = d.data.sisa_plafon.replace(/,/g, "");
            
            console.log(str_replace(',','',d.data.sisa_plafon)*1)
            console.log(str_replace('.','',form_payments.findField('total_sales').getValue())*1)

            Ext.getCmp('sisa_plafonSales').setValue(renderNomor(sisa_plafon));

            if(str_replace('.','',Ext.getCmp('sisa_plafonSales').getValue())*1 < str_replace('.','',form_payments.findField('total_sales').getValue())*1){
                
               Ext.getCmp('info_text').show(); 

               Ext.getCmp('loan_product').hide();
               Ext.getCmp('tenor').hide();  
               
               Ext.getCmp('btnPaymentPOS').disable()

            
            }else{
              
              Ext.getCmp('loan_product').show();
              Ext.getCmp('tenor').show();   
              Ext.getCmp('info_text').hide(); 

            }
        },
        failure:function(form,action){

        }
    })
}