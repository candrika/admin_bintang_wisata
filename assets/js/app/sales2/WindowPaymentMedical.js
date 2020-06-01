var TabmedicalRecordPaymenDetail = Ext.create(dir_sys +'sales2.TabmedicalRecordPaymenDetail');

Ext.define('PaymentMedical', {
    extend: 'Ext.form.Panel',
    alias: 'widget.PaymentMedical',
    id: 'PaymentMedical',
    // width: 760,
    // title: 'Detail',
    // height: 410,
    url: SITE_URL + 'sales/save_medic_payment',
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
        // layout:
    },

    items: [{
            xtype: 'hiddenfield',
            name: 'sales_id',
            id: 'sales_id_payment'
        },
        {
            xtype: 'hiddenfield',
            name: 'medical_record_id',
            id: 'medical_record_id_payment'
        },
        {
            xtype: 'hiddenfield',
            name: 'member_id',
            id: 'member_id_payment'
        },
        {
            xtype: 'hiddenfield',
            name: 'patient_id',
            id: 'patient_id_payment'
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
                        xtype: 'displayfield',
                        labelWidth: 170,
                        id: 'medical_record_no_payment',
                        name:'medical_record_no',
                        fieldLabel: 'No Rekam Medis'
                        
                    },
                    {
                        xtype: 'displayfield',
                        name:'receipt_number',
                        id: 'receipt_number_payment',
                        labelWidth: 170,
                        fieldLabel: 'No Resep',
                        
                    },
                    {
                        xtype: 'displayfield',
                        labelWidth: 170,
                        id: 'patient_name_payment',
                        name:'patient_name_payment',
                        fieldLabel: 'Nama patient',
                        // readOnly: true,
                        
                    },
                    {
                        xtype: 'displayfield',
                        name:'patient_type',
                        id: 'patient_type_payment',
                        labelWidth: 170,
                        fieldLabel: 'Jenis Pasien',
                        
                    },
                    {
                        xtype: 'displayfield',
                        name:'member_name',
                        id: 'member_name_payment',
                        labelWidth: 170,
                        fieldLabel: 'Nama Anggota/Karyawan',
                        
                    }
                ]
            }, {
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [
                    {
                        xtype: 'displayfield',
                        labelWidth: 150,
                        name:'medical_record_date',
                        id: 'medical_record_date_payment',
                        // format: 'd-m-Y',
                        fieldLabel: 'Tanggal Diagnosa'
                    },
                    {
                        xtype: 'displayfield',
                        labelWidth: 150,
                        name:'medical_record_desc',
                        id: 'medical_record_desc_payment',
                        // format: 'd-m-Y',
                        fieldLabel: 'Catatan Diagnosa'
                    },{
                        xtype: 'displayfield',
                        labelWidth: 150,
                        name:'due_date',
                        id: 'duedate_payment',
                        // format: 'd-m-Y',
                        fieldLabel: 'Tanggal Pelunasan'
                    }
                ]
            }]
        },
        {
            xtype: 'TabmedicalRecordPaymenDetail'
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
                        xtype: 'radiogroup',
                        fieldLabel: 'Metode Bayar',
                        labelWidth: 150,
                        id:'medical_diagnosis_payment',
                        columns: 3,
                        allowBlank: false,
                        items: [
                            { boxLabel: 'Plafon Anggota', name: 'payment_methode', inputValue: 1,id:'plafon',width:130,allowBlank: false},
                            { boxLabel: 'Tunai', name: 'payment_methode', inputValue: 2,width:70,id:'cash_payment',allowBlank: false},
                            { boxLabel: 'Kredit', name: 'payment_methode', inputValue: 3,width:70,id:'kas_bon',allowBlank: false}],
                        listeners:{
                            change: function (field, newValue, oldValue) {

                                switch (parseInt(newValue['payment_methode'])) {
                                    case 1:
                                            Ext.getCmp('loan_plafon_payment').show();
                                            Ext.getCmp('invoice_status_payment').setValue(2);
                                            Ext.getCmp('invoice_status_payment').setReadOnly(true);
                                            medical_credit_payment(Ext.getCmp('member_id_payment').getValue());
                                         break;

                                    case 2:
                                            Ext.getCmp('invoice_status_payment').getStore().load();
                                            Ext.getCmp('invoice_status_payment').setValue(1);
                                            Ext.getCmp('invoice_status_payment').setReadOnly(false);
                                            Ext.getCmp('loan_plafon_payment').setValue(null);
                                            Ext.getCmp('loan_plafon_payment').hide();
                                         break; 
                                    case 3:
                                            Ext.getCmp('invoice_status_payment').setValue(2);
                                            Ext.getCmp('invoice_status_payment').setReadOnly(true);
                                            Ext.getCmp('loan_plafon_payment').hide();
                                         break;          
                                }       
                            }
                        }
                    },
                    {
                        xtype: 'displayfield',
                        labelWidth: 150,
                        name:'loan_plafon',
                        id: 'loan_plafon_payment',
                        fieldLabel: 'Sisa Plafon Angsuran'
                    },
                    {
                        xtype:'comboxmedicalPayment',
                        labelWidth: 150,
                        name:'status_payment',
                        id: 'invoice_status_payment',
                        fieldLabel:'Status Pembayaran',
                        // readOnly:false,
                    },
                    {
                        xtype: 'datefield',
                        labelWidth: 150,
                        name:'date_payment',
                        id: 'date_payment_payment',
                        format: 'd-m-Y',
                        fieldLabel: 'Tanggal Pembayaran'
                    },
                    {
                        xtype: 'textarea',
                        name:'memo',
                        width: 450,
                        labelWidth: 150,
                        value: 'Sales Order',
                        id: 'memoDiagnosapayment',
                        fieldLabel: 'Memo'
                    },
                ]
            }, 
            {
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [

                    
                ]
            }, 
            {
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [{
                        xtype: 'displayfield',
                        align: 'right',
                        readOnly: true,
                        labelWidth: 150,
                        id: 'subtotalpayment',
                        fieldLabel: 'Subtotal',
                        fieldStyle: 'text-align: right;'
                    },
                    {
                        xtype: 'textfield',
                        align: 'right',
                        // readOnly: true,
                        labelWidth: 150,
                        id: 'diskonpayment',
                        fieldLabel: 'Diskon (-)',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            'blur': function() {
                                this.setRawValue(renderNomor(this.getValue()));
                                get_culc();
                            }
                        },
                    },
                    {
                        xtype: 'textfield',
                        align: 'right',
                        labelWidth: 150,
                        id: 'shipping_fee_payment',
                        fieldLabel: 'Biaya Kirim (+)',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            'blur': function() {
                                this.setRawValue(renderNomor(this.getValue()));
                                get_culc();
                            }
                        },
                        // minValue:0
                    },
                    {
                        xtype: 'displayfield',
                        align: 'right',
                        readOnly: true,
                        labelWidth: 150,
                        id: 'totalpayment',
                        fieldLabel: 'Grand Total',
                        fieldStyle: 'text-align: right;'
                    }
                ]
            }]
        }
    ]
});


Ext.define(dir_sys + 'sales2.WindowPaymentMedical', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowPaymentMedical',
    id: 'WindowPaymentMedical',
    title: 'Pembayaran Diagnosa',
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
        xtype: 'PaymentMedical'
    }],
    listeners: {
        'show': function() {
            // storeGridSalesOrderGrid.load();
        }
    },
    buttons: [{
        text: 'Batal',
        handler: function() {
            var form = Ext.getCmp('PaymentMedical').getForm();
            form.reset();
            
            Ext.getCmp('WindowPaymentMedical').hide();
        }
    }, {
        text: 'Simpan',
        id: 'btnSaveMedicalPayment',
        handler: function(button, event, options) {
            console.log(Ext.getCmp('medical_diagnosis_payment').getValue().payment_methode)
            var form = Ext.getCmp('PaymentMedical').getForm();
            if(form.isValid()){
            Ext.Ajax.request({
                url: SITE_URL + 'sales/save_medic_payment',
                method: 'POST',
                params: {
                    key:key,
                    password:password,
                    idunit:idunit,
                    member_id:Ext.getCmp('member_id_payment').getValue(),
                    medical_record_id:Ext.getCmp('medical_record_id_payment').getValue(),
                    sales_id:Ext.getCmp('sales_id_payment').getValue(),
                    payment_methode:Ext.getCmp('medical_diagnosis_payment').getValue().payment_methode,
                    loan_plafon_payment:Ext.getCmp('loan_plafon_payment').getValue(),
                    date_payment_payment:Ext.getCmp('date_payment_payment').getValue(),
                    memoDiagnosapayment:Ext.getCmp('memoDiagnosapayment').getValue(),
                    subtotalpayment:Ext.getCmp('subtotalpayment').getValue(),
                    diskonpayment:Ext.getCmp('diskonpayment').getValue(),
                    shipping_fee:Ext.getCmp('shipping_fee_payment').getValue(),
                    totalpayment:Ext.getCmp('totalpayment').getValue(),
                    status_payment:Ext.getCmp('invoice_status_payment').getValue()
                },
                success: function(form, action) {

                    var d = Ext.decode(form.responseText);
                    if (!d.success) {
                        Ext.Msg.alert('Success', d.message);
                        Ext.getCmp('WindowPaymentMedical').hide();
                        Ext.getCmp('GridPaymentMedicalID').getStore().load();

                    } else {
                        Ext.Msg.alert('Success', d.message);
                            
                        Ext.getCmp('WindowPaymentMedical').hide();
                        
                    }        
                },
                failure: function(form, action) {
                    var d = Ext.decode(form.responseText);
                    Ext.Msg.alert('Peringatan', d.message);

                    Ext.getCmp('btnRecordSalesOrder').setDisabled(false);
                }
            });
            }else{

            }
        }
    }]
});