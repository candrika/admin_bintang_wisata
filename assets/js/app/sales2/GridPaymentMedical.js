// Ext.define(dir_sys + 'sales2.WindowPaymentMedical'
if(!Ext.isDefined(Ext.getCmp('WindowPaymentMedical'))){
    var WindowPaymentMedical = Ext.create(dir_sys + 'sales2.WindowPaymentMedical')
}else{
    var WindowPaymentMedical    = Ext.getCmp('WindowPaymentMedical');
}

Ext.define('GridPaymentMedicalModel', {
    extend: 'Ext.data.Model',
    fields: ['medical_record_id','member_id','sales_id','patient_id','medical_record_no','receipt_number','patient_name','date_sales','paidtoday','unpaid_amount','memo','payment_method_id','payment_status_id','patient_type'],
    idProperty: 'id'
});

var storeGridPaymentMedical = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPaymentMedicalModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'sales/paymet_medical',
        actionMethods: {
            read: 'GET',
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

storeGridPaymentMedical.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'key':key,
        startdate:Ext.getCmp('payment_startdate').getValue(),
        enddate:Ext.getCmp('payment_enddate').getValue(),
        payment_status:Ext.getCmp('payment_medical_status').getValue().status
    };
});

var smGridPaymentMedical = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'MULTI',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPaymentMedical.getSelection().length;
            if (selectedLen == 0) {
                Ext.getCmp('GridPaymentMedicalID').queryById('btnpaymentmedicalprint').setDisabled(true);
                Ext.getCmp('GridPaymentMedicalID').queryById('btnDelete').setDisabled(true);
                Ext.getCmp('GridPaymentMedicalID').queryById('btnpaymentmedicalstruckprint').setDisabled(true);
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('GridPaymentMedicalID').queryById('btnpaymentmedicalprint').setDisabled(false);
            Ext.getCmp('GridPaymentMedicalID').queryById('btnDelete').setDisabled(false);
            Ext.getCmp('GridPaymentMedicalID').queryById('btnpaymentmedicalstruckprint').setDisabled(false);

        }
    }
});

Ext.define('MY.searchGridPaymentMedical', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPaymentMedical',
    store: storeGridPaymentMedical,
    width: 180
});

Ext.define(dir_sys + 'sales2.GridPaymentMedical', {
    // title: 'Pasient',
    itemId: 'GridPaymentMedicalID',
    id: 'GridPaymentMedicalID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPaymentMedical',
    store: storeGridPaymentMedical,
    selModel: smGridPaymentMedical,
    loadMask: true,
    columns: [
        {header: 'sales_id', dataIndex:'sales_id', hidden:true},
        {header: 'medical_record_id', dataIndex:'medical_record_id', hidden:true},
        {header: 'patient_id', dataIndex:'patient_id', hidden:true},
        {header: 'member_id', dataIndex:'member_id', hidden:true},
        {header: 'No Diagnosa', minWidth: 150, dataIndex: 'medical_record_no'},
        {header: 'No Resep', minWidth: 150, dataIndex: 'receipt_number' },
        {header: 'Nama Pasien', minWidth: 150, dataIndex: 'patient_name'},
        {header: 'Jenis Konsumen', dataIndex:'patient_type', minWidth: 150},
        {header: 'Tanggal Penjualan', minWidth: 150, dataIndex: 'date_sales'},
        {header: 'Total Bayar', minWidth: 175, dataIndex: 'paidtoday',xtype: 'numbercolumn',align: 'right'},
        {header: 'Total Belum Bayar', minWidth: 175, dataIndex: 'unpaid_amount',xtype: 'numbercolumn',align: 'right'},
        {header: 'Keterangan', minWidth: 175, dataIndex: 'memo' },
        {header: 'Jenis Bayar', minWidth: 150, dataIndex: 'payment_method_id'},
        {header: 'Status', dataIndex:'payment_status_id', minWidth: 150}
    ],  
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype:'datefield',
                fieldLabel: 'Tanggal',
                format:'d/m/Y',
                id:'payment_startdate',
                labelWidth: 50,
                width:160
            },
            's/d'
            ,{
                xtype:'datefield',
                name:'record_enddate',
                format:'d/m/Y',
                id:'payment_enddate',
                width:100
            },
                        ,
            {
                text:'Cari',
                handler:function(){
                    storeGridPaymentMedical.load();
                }
            },
            {
                text:'Hapus',
                handler:function(){
                    Ext.getCmp('payment_startdate').setValue();
                    Ext.getCmp('payment_enddate').setValue();
                    storeGridPaymentMedical.load();
                }
            },{
                xtype: 'radiogroup',
                fieldLabel: 'Status Bayar',
                labelWidth: 100,
                id:'payment_medical_status',
                columns: 7,
                items: [
                    { boxLabel: 'Semua', name: 'status', inputValue: '0',checked: true,id:'all',width:70},
                    { boxLabel: 'Lunas', name: 'status', inputValue: '2',width:70},
                    { boxLabel: 'Belum Lunas', name: 'status', inputValue: '1',width:120},
                    { boxLabel: 'Dibatalkan', name: 'status', inputValue: '3',width:120}],
                listeners:{
                    change: function (field, newValue, oldValue) {
                       Ext.getCmp('GridPaymentMedicalID').getStore().load()
                    }
                }
            }]
        },
        // {
        //     xtype: 'toolbar',
        //     dock: 'top',
        //     items: [{
        //         xtype: 'radiogroup',
        //         fieldLabel: 'Status Bayar',
        //         labelWidth: 50,
        //         id:'payment_medical_status',
        //         columns: 7,
        //         items: [
        //             { boxLabel: 'Semua', name: 'status', inputValue: '0',checked: true,id:'semua',width:70},
        //             { boxLabel: 'Lunas', name: 'status', inputValue: '1',width:175},
        //             { boxLabel: 'Belum Lunas', name: 'status', inputValue: '2',width:135},
        //             { boxLabel: 'Dibatalkan', name: 'status', inputValue: '3',width:120}],
        //         listeners:{
        //             change: function (field, newValue, oldValue) {
        //                Ext.getCmp('GridPaymentMedicalID').getStore().load()
        //             }
        //         }
        //     }]
        // }
        ,{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                itemId: 'btnpaymentmedicalprint',
                text: 'Cetak',
                iconCls: 'print-icon',
                disabled: true,
                // hidden:true,
                handler: function() {
                    var grid = Ext.ComponentQuery.query('GridPaymentMedical')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var rows = grid.getSelectionModel().getSelection();
                    if (rows.length == 0) {
                        Ext.Msg.alert('Failure', 'Data not seleted!');
                    } else {
                        Ext.create('Ext.window.Window', {
                            title: 'Cetak Bukti Berobat',
                            modal: true,
                            width: 950,
                            height:500,
                            items: [{
                                xtype: 'component',
                                html: '<iframe src="' + SITE_URL + 'docter/medical_receipt/' + selectedRecord.data.medical_record_id + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
                            }],
                            buttons: [{
                                text: 'Print',
                                iconCls: 'print-icon',
                                handler: function() {
                                    window.open(SITE_URL + 'docter/medical_receipt/' + selectedRecord.data.medical_record_id + '/print', '_blank');
                                }
                            }]
                        }).show();
                    }
                }
            },
            {
                itemId: 'btnpaymentmedicalstruckprint',
                text: 'Cetak Struk',
                iconCls: 'print-icon',
                disabled: true,
                // hidden:true,
                handler: function() {
                    var grid = Ext.ComponentQuery.query('GridPaymentMedical')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var rows = grid.getSelectionModel().getSelection();
                    if (rows.length == 0) {
                        Ext.Msg.alert('Failure', 'Data not seleted!');
                    } else {
                        Ext.create('Ext.window.Window', {
                            title: 'Cetak Struk',
                            modal: true,
                            width: 600,
                            height:500,
                            items: [{
                                xtype: 'component',
                                html: '<iframe src="' + SITE_URL + 'sales/kasir_pasien/' + selectedRecord.data.medical_record_id + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
                            }],
                            buttons: [{
                                text: 'Print',
                                iconCls: 'print-icon',
                                handler: function() {
                                    window.open(SITE_URL + 'sales/kasir_pasien/' + selectedRecord.data.medical_record_id + '/print', '_blank');
                                }
                            }]
                        }).show();
                    }
                }
            },
            {

                itemId: 'btnPaymentMedical',
                text: 'Pembayaran',
                // iconCls: 'delete-icon',
                // disabled: true,
                id:'btnPaymentMedical',
                handler: function() {
                    var grid = Ext.ComponentQuery.query('GridPaymentMedical')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var rows = grid.getSelectionModel().getSelection();

                    if (rows.length == 0) {
                        Ext.Msg.alert('Failure', 'Data not seleted!');
                        // Ext.Msg.alert('Failure', 'Brand is not set!');
                    } else {
                        Ext.getCmp('invoice_status_payment').getStore().load()
                        Ext.getCmp('invoice_status_payment').setValue('1');
                        Ext.getCmp('invoice_status_payment').enable(true);
                        Ext.getCmp('btnSaveMedicalPayment').show();
                        form_diagnosis_payment(selectedRecord.data.sales_id,selectedRecord.data.medical_record_id);
                    }
                }
            },
            {
                itemId: 'btnDelete',
                text: 'Hapus',
                iconCls: 'delete-icon',
                // disabled: true,
                id:'btnDeletepaymentmedical',
                handler: function() {
                    Ext.Msg.show({
                        title: 'Confirm',
                        msg: 'Data pasien akan dihapus ?',
                        buttons: Ext.Msg.YESNO,
                        fn: function(btn) {
                            if (btn == 'yes') {
                                var grid = Ext.ComponentQuery.query('GridPaymentMedical')[0];
                                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                var rows = grid.getSelectionModel().getSelection();
                                
                                console.log(selectedRecord.data.sales_id);
                                Ext.Ajax.request({
                                    url: CLINIC_API + 'sales/remove',
                                    method: 'POST',
                                    params: {
                                        id: selectedRecord.data.sales_id,
                                        key:key,
                                        idmenu:24
                                    },
                                    success: function(form, action) {
                                        var d = Ext.decode(form.responseText);
                                        if (!d.success) {
                                            Ext.Msg.alert('Informasi', d.message);
                                            storeGridPaymentMedical.load();       
                                        } else {
                                            storeGridPaymentMedical.load();
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
            }, 
            '->', 
            'Pencarian: ', 
            ' ', 
            {
                xtype: 'searchGridPaymentMedical',
                text: 'Left Button',
            }
        ],
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridPaymentMedical, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPaymentMedical.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            console.log(record.data.sales_id,record.data.medical_record_id);
            
            // Ext.getCmp('invoice_status_payment').setValue(1);
            Ext.getCmp('invoice_status_payment').disable(true);
            Ext.getCmp('btnSaveMedicalPayment').hide();

            form_diagnosis_payment(record.data.sales_id,record.data.medical_record_id);
        }
    }
});


function form_diagnosis_payment(sales_id,medical_record_id){

    WindowPaymentMedical.show();
    var form = Ext.getCmp('PaymentMedical').getForm();

    Ext.getCmp('invoice_status_payment').getStore().load();
    
    form.reset();

    Ext.Ajax.request({
        url:CLINIC_API + 'sales/paymet_medical',
        method:'GET',
        params:{
            medical_record_id:medical_record_id,
            id:sales_id,
            key
        },
        success:function(form,action){
            var d =Ext.decode(form.responseText);
            var data = d.rows[0];
            
            //set value 
            Ext.getCmp('sales_id_payment').setValue(data.sales_id*1);
            Ext.getCmp('medical_record_id_payment').setValue(data.medical_record_id*1);
            Ext.getCmp('patient_id_payment').setValue(data.patient_id*1);
            Ext.getCmp('member_id_payment').setValue(data.member_id*1);
            Ext.getCmp('receipt_number_payment').setValue(data.receipt_number);
            Ext.getCmp('patient_name_payment').setValue(data.patient_name);
            Ext.getCmp('medical_record_no_payment').setValue(data.medical_record_no);
            Ext.getCmp('medical_record_desc_payment').setValue(data.medical_record_desc);
            Ext.getCmp('duedate_payment').setValue(data.due_date);
            Ext.getCmp('medical_record_date_payment').setValue(data.medical_record_date);
            Ext.getCmp('patient_type_payment').setValue(data.patient_type);
            Ext.getCmp('diskonpayment').setValue(renderNomor(data.discount_amount*1));
            Ext.getCmp('shipping_fee_payment').setValue(renderNomor(data.shpping_fee*1));
            Ext.getCmp('member_name_payment').setValue(data.member_name);
            Ext.getCmp('subtotalpayment').setValue(renderNomor(data.total*1));

            //calculate 
            var diskonpayment =  str_replace('.','',Ext.getCmp('diskonpayment').getValue());
            var shipping_fee_payment = str_replace('.','',Ext.getCmp('shipping_fee_payment').getValue());
            var subtotal = str_replace('.','',Ext.getCmp('subtotalpayment').getValue());

            var grand_total = subtotal*1-diskonpayment*1+shipping_fee_payment*1;

            Ext.getCmp('totalpayment').setValue(renderNomor(grand_total));
            
            //validate patient type
            if(Ext.getCmp('member_id_payment').getValue()*1 == '' && Ext.getCmp('member_name_payment').getValue() == ''){
                
                Ext.getCmp('loan_plafon_payment').hide();
                Ext.getCmp('date_payment_payment').show();
                
                Ext.getCmp('plafon').disable();
                Ext.getCmp('kas_bon').disable();
                Ext.getCmp('cash_payment').setValue(true);

            }else{    

                
                Ext.getCmp('plafon').enable();
                Ext.getCmp('kas_bon').enable();
                Ext.getCmp('loan_plafon_payment').show();   
                Ext.getCmp('date_payment_payment').hide();
            }

            /////
            if(data.payment_status*1==2){
                Ext.getCmp('btnSaveMedicalPayment').disable();
                // Ext.getCmp('invoice_status_payment').setReadOnly(true);
            }else{
                Ext.getCmp('btnSaveMedicalPayment').enable();
                // Ext.getCmp('invoice_status_payment').setReadOnly(false);
            }

            if(data.payment_method*1==1){
                Ext.getCmp('plafon').setValue(true);
                // Ext.getCmp('invoice_status_payment').setValue(data.payment_status*1);    

            }

            if(data.payment_method*1==2){
                
               Ext.getCmp('cash_payment').setValue(true);  
               Ext.getCmp('invoice_status_payment').setValue(data.payment_status*1);    

            }

            if(data.payment_method*1==3){
                Ext.getCmp('kas_bon').setValue(true);
            }

            Ext.getCmp('memoDiagnosapayment').setValue(data.memo);
            Ext.getCmp('date_payment_payment').setValue(data.paid_date);
            
        },
        failure:function(form,action){

        }
    })

    var action = Ext.getCmp('GridrecordactionPaymenDetail').getStore();

    action.on('beforeload', function(store, operation, eOpts) {
        operation.params = {
            'key':key,
            'medical_record_id':medical_record_id
        };
    });    

    action.load();
   
    var drug = Ext.getCmp('GridrecorddrugPaymenDetail').getStore();
    drug.on('beforeload', function(store, operation, eOpts) {
        operation.params = {
            'key':key,
            'medical_record_id':medical_record_id,
            'business_id':'10,12'
        };
    });

    drug.load();

    var drug_alkes = Ext.getCmp('GridrecorddrugAlkesPaymenDetail').getStore();
    drug_alkes.on('beforeload', function(store, operation, eOpts) {
        operation.params = {
            'key':key,
            'medical_record_id':medical_record_id,
            'business_id':'13,15'
        };
    });

    drug_alkes.load();

    // get_culc();
}