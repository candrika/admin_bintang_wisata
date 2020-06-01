
// Ext.create(dir_sys + 'sales.EntrySalesOrder');
var WindowEntrySalesOrder = Ext.create(dir_sys + 'sales2.WindowEntrySalesOrder');

// load_js_file('sales2/winImportSales.js');
var date = new Date(); 

Ext.define('SalesGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        "idsales","idpayment","idtax","idcustomer","noinvoice","subtotal","freight","tax","disc","totalamount","paidtoday","unpaid_amount","comments","Sales","userin","datein","status","idunit","date_sales","no_sales_order","include_tax","total_dpp","pos_payment_type_id","id_member","namepayment","namecustomer","namaunit","payment_type_name","member_name",
        "no_member","other_fee","buyer_name","order_status","receipt_number","patient_type","polis_name"
    ],
    idProperty: 'id'
});
var storeSalesGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'SalesGridModel',
    remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + '/sales/datas',
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

storeSalesGrid.on('beforeload', function(store, operation) {
    operation.params = {
        'key':key,
        'password':password,
        'idunit':idunit,
        'status':Ext.getCmp('sales_status').getValue(),
        'customer_type':Ext.getCmp('customer_type').getValue(),
        'startdate': Ext.getCmp('startdate_grdso').getValue(),
        'enddate': Ext.getCmp('enddate_grdso').getValue(),
        'is_order_request':Ext.getCmp('cb_sales_requisition_status').getValue()
    }
})



Ext.define('MY.searchSalesGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchSalesGrid',
    store: storeSalesGrid,
    width: 180
});
var smSalesGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smSalesGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteSalesOrderGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteSalesOrderGrid').enable();
        }
    }
});

var contextMenu = Ext.create('Ext.menu.Menu', {
    // width: 200,
    items: [{
        iconCls: 'refresh',
        text: 'Buat invoice berulang',
        handler: function() {
            var grid = Ext.getCmp('SalesGridID');
            var selectedRecord = grid.getSelectionModel().getSelection()[0];
            var data = grid.getSelectionModel().getSelection();
            console.log(selectedRecord.data.noinvoice)
            if (data.length == 0) {
                Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
            } else {
                    create_recurring_invoice(selectedRecord.data.idsales)               
            }
            
        }
    }]
});

Ext.define(dir_sys + 'sales2.SalesGrid', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smSalesGrid,
    title: 'Jual',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'SalesGridID',
    id: 'SalesGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.SalesGrid',
    // selType: 'cellmodel',
    // plugins: [
    //     Ext.create('Ext.grid.plugin.CellEditing', {
    //         clicksToEdit: 1
    //     })
    // ],
    store: storeSalesGrid,
    loadMask: true,
    columns: [{
            dataIndex: 'idsales',
            hidden: true,
            header: 'idsales'
        }, {
            dataIndex: 'idunit',
            hidden: true,
            header: 'idunit'
        }, {
            dataIndex: 'comments',
            hidden: true,
            header: 'comments'
        },
        {
            header: 'No Order',
            dataIndex: 'no_sales_order',
            minWidth: 120
        },
        {
             header: 'No Resep',
            dataIndex: 'receipt_number',
            minWidth: 120
        },
        {
            header: 'No Invoice',
            dataIndex: 'noinvoice',
            minWidth: 120
        },
        {   
            // text:'Status Pesanan',
            // xtype: 'comboxsalesRequisitionStatus',
            header: 'Status Pesanan',
            dataIndex: 'order_status',
            minWidth: 160,
            align: 'center',
            // editor:{
                // xtype: 'comboxsalesRequisitionStatus',
                // id:'salesRequisitionStatusCollumns',
                // hideLabel:true,
                
            // },
            renderer: function(value) {
                return customColumnStatus2(ArrsalesRequisitionStatus, value);
            },
            // listeners:{
            //     change:function(){

            //     }
            // }
        },   {
            header: 'Status Pembayaran',
            dataIndex: 'status',
            minWidth: 150,
            align: 'center',
            renderer: function(value) {
                return customColumnStatus(ArrSalesStatus, value);
            }
        }, 
         
        {
            header: 'Pasien',
            flex: 1,
            dataIndex: 'buyer_name',
            minWidth: 150
        },
        {
            header:'Nama Anggota',
            dataIndex:'polis_name',
            minWidth:150
        },
        {
            header:'Jenis Pasien',
            dataIndex:'patient_type',
            minWidth:150
        },
        {
            xtype: 'datecolumn',
            format: 'd-m-Y',
            align: 'center',
            header: 'Tanggal',
            dataIndex: 'date_sales',
            minWidth: 120
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
            hidden:true,
            dataIndex: 'subtotal',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },{
            header: 'Biaya Lain',
            hidden:true,
            dataIndex: 'other_fee',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },{
            header: 'Diskon',
            hidden:true,
            dataIndex: 'disc',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        }, {
            header: 'Pajak',
            hidden:true,
            dataIndex: 'tax',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },  {
            header: 'Total Penjualan',
            dataIndex: 'totalamount',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },
         {
            header: 'Total Terbayar',
            dataIndex: 'paidtoday',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },
         {
            header: 'Total Belum Dibayar',
            dataIndex: 'unpaid_amount',
            minWidth: 200,
            xtype: 'numbercolumn',
            align: 'right'
        }
        // ,
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
                    id: 'startdate_grdso',
                    format: 'd/m/Y',
                    labelWidth: 60,
                    width:170,
                    value: new Date(date.getFullYear(), date.getMonth(), 1),
                    fieldLabel: 'Periode',
                },
                ' to ',
                {
                    xtype: 'datefield',
                    id: 'enddate_grdso',
                    format: 'd/m/Y',
                    width:100,
                    value: new Date(date.getFullYear(), date.getMonth() + 1, 0),
                    hideLabel: true
                    // fieldLabel: 'Date Order',
                },
                {
                    xtype: 'comboxunit',
                    hidden:true,
                    id: 'idunit_grdso',
                },
                {
                    xtype: 'checkbox',
                    labelWidth: 60,
                    // width:200,
                    allowBlank: false,
                    fieldLabel: 'Pesanan',
                    id:'cb_sales_requisition_status',
                    // fieldStyle:'margin-left: -28px;',
                    columns: 2,
                    // items: [
                    //     { name: 'order_status'},
                    // ],
                    listeners: {
                        change: function (field, newValue, oldValue) {
                            storeSalesGrid.load();
                            setHeaderSalesSummary();
                        }
                    }
                },
                {
                    xtype: 'radiogroup',
                    id:'sales_status',
                    labelWidth: 80,
                    width:370,
                    allowBlank: false,
                    fieldLabel: 'Status Bayar',
                    columns: 3,
                    items: [
                        { boxLabel: 'Semua', name: 'status', inputValue: 0,checked:true,id:'All_sales',width:100},
                        { boxLabel: 'Lunas', name: 'status', inputValue:5,width:100,id:'Paid_sales',fieldStyle:'margin-left: -30px;'},
                        { boxLabel: 'Belum Lunas', name: 'status', inputValue: 3, width:100,id:'Unpaid_sales',fieldStyle:'margin-left: -67px;'},      
                    ],
                    // listeners: {
                    //     change: function (field, newValue, oldValue) {
                    //         console.log(Ext.getCmp('sales_status').getValue().status)

                    //         if(Ext.getCmp('sales_status').getValue().status*1==5){
                    //             Ext.getCmp('PurchasingGridID').getStore().load()
                    //         }else if(Ext.getCmp('sales_status').getValue().status*1==3){
                    //             Ext.getCmp('PurchasingGridID').getStore().load()
                    //         }else if(Ext.getCmp('sales_status').getValue().status*1==0){
                    //             Ext.getCmp('PurchasingGridID').getStore().load()
                    //         }
                    //     }
                    // }
                }

            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'radiogroup',
                    id:'customer_type',
                    labelWidth: 100,
                    width:300,
                    allowBlank: false,
                    fieldLabel: 'Pembeli',
                    fieldStyle:'margin-left: -28px;',
                    columns: 2,
                    items: [
                        { boxLabel: 'Anggota', name: 'customer_type', inputValue: 1,id:'member',fieldStyle:'margin-left: -49px;'},
                        { boxLabel: 'Non Anggota', name: 'customer_type', inputValue:2,  width:100,id:'non_member',fieldStyle:'margin-left:-56px;'},
                        // { boxLabel: 'Belum Lunas', name: 'status', inputValue: 3, width:100,id:'Unpaid_sales',fieldStyle:'margin-left: -37px;'},      
                    ],
                    // listeners: {
                    //     change: function (field, newValue, oldValue) {
                    //         console.log(Ext.getCmp('sales_status').getValue().status)

                    //         if(Ext.getCmp('sales_status').getValue().status*1==5){
                    //             Ext.getCmp('PurchasingGridID').getStore().load()
                    //         }else if(Ext.getCmp('sales_status').getValue().status*1==3){
                    //             Ext.getCmp('PurchasingGridID').getStore().load()
                    //         }else if(Ext.getCmp('sales_status').getValue().status*1==0){
                    //             Ext.getCmp('PurchasingGridID').getStore().load()
                    //         }
                    //     }
                    // }
                },
                
                {
                    text: 'Search',
                    handler: function() {
                        storeSalesGrid.load();
                        setHeaderSalesSummary();
                    }
                },
                {
                    text: 'Clear Filter',
                    handler: function() {
                        Ext.getCmp('startdate_grdso').setValue();
                        Ext.getCmp('enddate_grdso').setValue();
                        
                        if(Ext.getCmp('Paid_sales').getValue()==true){
                            Ext.getCmp('All_sales').setValue(true);

                        }if(Ext.getCmp('Unpaid_sales').getValue()==true){
                            Ext.getCmp('All_sales').setValue(true);

                        }

                        if(Ext.getCmp('member').getValue()==true){
                            Ext.getCmp('member').setValue(false);

                        }if(Ext.getCmp('non_member').getValue()==true){
                            Ext.getCmp('non_member').setValue(false);

                        }

                        if(Ext.getCmp('cb_sales_requisition_status').getValue().order_status=='on'){
                            Ext.getCmp('cb_sales_requisition_status').setValue();

                        }

                        storeSalesGrid.load();
                        setHeaderSalesSummary();
                    }
                }

            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                itemId: 'addSalesOrderGrid',
                text: 'Input Penjualan',
                iconCls: 'add-icon',
                menu: [{
                    text: 'Buka Kasir',
                    iconCls:'jual',
                    handler: function() {
                            window_pos();
                            Ext.getCmp('BtnWindowForminputsale').setDisabled(false);
                        }
                    },{
                        text: 'Import Penjualan',
                        //disabled:true,
                        iconCls:'page_excel',
                        handler: function() {
                            winImportSales.show();
                        }
                    }
                ]

                // handler: function() {
                //     WindowPOS.show();

                //      Ext.getCmp('search_pos').focus();
                // }
            },
            {
                text: 'Buat Invoice',
                iconCls: 'add-icon',
                handler: function() {
                    WindowEntrySalesOrder.show();

                    var form = Ext.getCmp('EntrySalesOrder').getForm();
                    form.reset();
                    // form.findField('business_id').getStore().load();
                    form.findField('status').setValue(3);
                    form.findField('status').setReadOnly(true);
                    form.findField('order_status').hide();
                    //order_status
                    Ext.getCmp('freightSalesOrder').setValue(0);

                    var start_date = new Date();
                    var end_date = new Date().addDays(7);
                    // var end_date  = start_date.setMonth(start_date.getMonth()+1);
                    console.log(start_date+' '+end_date)
                    Ext.getCmp('salesdate_so').setValue(start_date);
                    Ext.getCmp('duedate_so').setValue(end_date);

                    Ext.getCmp('btnRecordSalesOrder').setDisabled(false);

                    Ext.getCmp('comboxpaymentSalesOrder').getStore().load();
                    Ext.getCmp('comboxpaymentSalesOrder').setValue('5');

                    //generate number
                    Ext.Ajax.request({
                        url: CLINIC_API + 'sales/generate_no_invoice',
                        method: 'GET',
                        params: {
                            key: key,
                            password:password,
                            idunit:idunit
                        },
                        success: function(formx, action) {
                            var d = Ext.decode(formx.responseText);
                            form.findField('noinvoice_sales').setValue(d.doc_number);
                        },
                        failure: function(formx, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        }
                    });

                    Ext.getCmp('GridItemEntrySalesOrder').getStore().removeAll();
                }
            },
            {
                text: 'Pembayaran',
                iconCls: 'add-icon',
                handler: function() {
                     windowSalesMultiPayment();
                    
                     Ext.getCmp('namereceivemoney_SalesMultiPayment').hide();
                     Ext.getCmp('amount_multireceivemoney').hide();

                     Ext.getCmp('GridItemEntrySalesMultiInvoice').getStore().removeAll();
                     Ext.getCmp('form_SalesMultiPayment').getForm().reset();

                     Ext.getCmp('date_payment_sales').setValue(new Date());  
                }
            }, {
                text: 'Cetak',
                // hidden:true,
                iconCls: 'print-icon',
                handler: function() {
                    var grid = Ext.getCmp('SalesGridID');
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var data = grid.getSelectionModel().getSelection();
                    if (data.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                    } else {
                        if(selectedRecord.data.noinvoice==null){
                            Ext.create('Ext.window.Window', {
                                title: 'Cetak Penjualan',
                                modal: true,
                                width: 600,
                                height:500,
                                items: [{
                                    xtype: 'component',
                                    html: '<iframe src="' + SITE_URL + 'sales/print_sales/' + selectedRecord.data.idsales + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
                                }],
                                buttons: [{
                                    text: 'Print',
                                    iconCls: 'print-icon',
                                    handler: function() {
                                        window.open(SITE_URL + 'sales/print_sales/' + selectedRecord.data.idsales + '/print', '_blank');
                                    }
                                }]
                            }).show();
                        }else{
                            Ext.create('Ext.window.Window', {
                                title: 'Cetak Invoice Penjualan',
                                modal: true,
                                width: 850,
                                height:500,
                                items: [{
                                    xtype: 'component',
                                    html: '<iframe src="' + SITE_URL + 'sales/print_sales_inv/' + selectedRecord.data.idsales + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
                                }],
                                buttons: [{
                                    text: 'Print',
                                    iconCls: 'print-icon',
                                    handler: function() {
                                        window.open(SITE_URL + 'sales/print_sales_inv/' + selectedRecord.data.idsales + '/1', '_blank');
                                    }
                                }]
                            }).show();
                        }
                        
                    }
                }
            }, {
                id: 'btnDeleteSalesOrderGrid',
                text: 'Hapus',
                iconCls: 'delete-icon',
                handler: function() {
                    Ext.Msg.show({
                        title: 'Confirm',
                        msg: 'Delete Selected ?',
                        buttons: Ext.Msg.YESNO,
                        fn: function(btn) {
                            if (btn == 'yes') {
                               var grid = Ext.getCmp('SalesGridID');
                                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                var data = grid.getSelectionModel().getSelection();
                                Ext.Ajax.request({
                                    url: CLINIC_API + 'sales/remove',
                                    method: 'POST',
                                    params: {
                                        id: selectedRecord.data.idsales,
                                        key: key,
                                        password
                                    },
                                    success: function(form, action) {
                                        var d = Ext.decode(form.responseText);
                                        if (!d.success) {
                                            Ext.Msg.alert('Informasi', d.message);
                                        } else {
                                            Ext.Msg.alert('Informasi', d.message);
                                            storeSalesGrid.load();
                                        }

                                        setHeaderSalesSummary();
                                    },
                                    failure: function(form, action) {
                                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                    }
                                });

                            }
                        }
                    });
                },
                //                    disabled: true
            }, '->', 'Searching: ', ' ', {
                xtype: 'searchSalesGrid',
                text: 'Left Button'
            }]
        }, {
            xtype: 'pagingtoolbar',
            store: storeSalesGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
            // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeSalesGrid.load();
                // Ext.getCmp('cb_tax_id_so').getStore().load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            if(record.data.noinvoice!=null){
                view_invoice_sales(record.data.idsales)
            }else{
                view_input_sales(record.data.idsales)
            }
            console.log(record.data.order_status);
            
            if(record.data.order_status*1!=0){
                Ext.getCmp('cb_sales_requisition').show()
                
                if(Ext.getCmp('cb_sales_requisition').getValue()==6){
                    Ext.getCmp('cb_sales_requisition').setReadOnly(true)
                }
                
            }else{
                Ext.getCmp('cb_sales_requisition').hide()

            }


        },
        itemcontextmenu: function(grid, record, item, index, e) {
            e.stopEvent();
            if(record.data.noinvoice!=null){
                 contextMenu.showAt(e.getXY());
            }
           
        }
    }, onRemoveClick: function(grid, rowIndex) {
        alert('xxx')
    },
});

function view_invoice_sales(id){
    WindowEntrySalesOrder.show();

   load_sales_invoice_data(id)
}

function  view_input_sales(idsales){
     if (!Ext.isDefined(Ext.getCmp('windowPopupWindowPOS'))) {
        var WindowPOS = Ext.create(dir_sys + 'sales2.WindowPOS');
    } else {
        var WindowPOS = Ext.getCmp('windowPopupWindowPOS');
    }
    WindowPOS.show();
    load_sales_data(idsales)
}

function create_recurring_invoice(id){
     WindowEntrySalesOrder.show();

    var form = Ext.getCmp('EntrySalesOrder').getForm();
    form.reset();

    load_sales_invoice_data(id,'recurring');

    // form.findField('business_id').getStore().load();
    form.findField('status').setValue(3);
    form.findField('status').setReadOnly(false);

    var start_date = new Date();
    // var end_date  = start_date.setMonth(start_date.getMonth()+1);
    Ext.getCmp('salesdate_so').setValue(start_date);
    Ext.getCmp('duedate_so').setValue(new Date().addDays(7));

    Ext.getCmp('btnRecordSalesOrder').setDisabled(false);

    //generate number
    Ext.Ajax.request({
        url: CLINIC_API + '/sales/generate_no_invoice',
        method: 'GET',
        params: {
            key: key,
            password:password,
            idunit:idunit
        },
        success: function(formx, action) {
            var d = Ext.decode(formx.responseText);
            form.findField('noinvoice_sales').setValue(d.doc_number);
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });

    form.findField('sales_id').setValue(null);
}

function load_sales_invoice_data(id,opt){

     //load form data
    Ext.Ajax.request({
        url: CLINIC_API + '/sales/datas',
        method: 'GET',
        async:false,
        params: {
            id: id,
            key: key,
            password:password,
            idunit:idunit
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            var data = d.rows[0];
            // console.log(data)
            var form = Ext.getCmp('EntrySalesOrder').getForm();
            form.findField('sales_id').setValue(data.idsales*1);
            form.findField('customer_type').setValue(data.customer_type*1);
            form.findField('noinvoice_sales').setValue(data.noinvoice);
            form.findField('buyer_name').setValue(data.buyer_name);
            form.findField('invoice_date').setValue(data.date_sales);
            form.findField('cb_tax_id_so').setValue(data.tax_id);

            Ext.getCmp('freightSalesOrder').setValue(data.freight*1);

            form.findField('due_date').setValue(data.due_date);
            form.findField('status').setValue(data.status*1);
            
            Ext.getCmp('cb_sales_requisition').setValue(data.order_status*1);
            
            // var cb_sales_requisition =  Ext.getCmp('cb_sales_requisition').setValue(data.order_status);
            
            // if(cb_sales_requisition!=0){
            //     Ext.getCmp('cb_sales_requisition').show()
                
            //     if(Ext.getCmp('cb_sales_requisition').getValue()==6){
            //         Ext.getCmp('cb_sales_requisition').setReadOnly(true)
            //     }
                
            // }else{
                
            //     Ext.getCmp('cb_sales_requisition').hide()

            // }

            form.findField('id_payment_term').getStore().load();
            form.findField('id_payment_term').setValue(data.id_payment_term);

            if(data.include_tax=='0'){
                form.findField('include_tax').setValue(0);
            } else {
                form.findField('include_tax').setValue(1);
            }
            
            form.findField('memo').setValue(data.memo);
            form.findField('idcustomer').setValue(data.idcustomer*1);

            if(data.status=='5'){
                //paid
                Ext.getCmp('btnRecordSalesOrder').setDisabled(true);
            } else {
                Ext.getCmp('btnRecordSalesOrder').setDisabled(false);
            }

            load_sales_item_data(id,opt);


            // form.findField('sales_id').setValue(null);
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });

   
}

function load_sales_data(idsales){
     Ext.getCmp('BtnWindowForminputsale').disable()
     Ext.Ajax.request({
        url: CLINIC_API + '/sales/datas',
        method: 'GET',
        params: {
            id: idsales,
            key: key,
            password:password,
            idunit:idunit
        },success:function(form,action){
            var d = Ext.decode(form.responseText);

            var form =Ext.getCmp('EntryTransactionPOS').getForm();

            console.log(d)
            Ext.each(d.rows[0],function(obj,i){
                form.findField('id_member').setValue(obj.id_member);
                form.findField('customer_id').setValue(obj.customer_id);
                form.findField('customer_type').setValue(obj.customer_type);
                form.findField('subtotal').setValue(renderNomor(obj.subtotal));
                form.findField('other_fee').setValue(renderNomor(obj.other_fee));
                form.findField('total_disc').setValue(renderNomor(obj.disc));
                form.findField('grandtotal').setValue(renderNomor(obj.totalamount));
                // subtotal
                Ext.getCmp('no_member').setValue(obj.buyer_name);

            })
        },failure:function(form,action){

        }
    });

    var store_item = Ext.getCmp('GridTransactionPOSID');

    store_item.getStore().removeAll();

    Ext.Ajax.request({
        url: CLINIC_API + '/sales/item_datas',
        method: 'GET',
        params: {
            id: idsales,
            key: key,
            password:password,
            idunit:idunit
        },
        success: function(form, action) {
            var data = Ext.decode(form.responseText);

            var row =data.rows;
            var i = 0;

            Ext.each(row,function(v){
                console.log(v)
                var record = new GridTransactionPOSModel({
                    product_id:v.product_id,
                    product_name:v.product_name,
                    qty:v.qty,
                    total:v.total
                })
                store_item.getStore().insert(i, record);

                i++;
            });
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });

}

function load_sales_item_data(id,opt){
     //load item
    var grid = Ext.getCmp('GridItemEntrySalesOrder');
    grid.getStore().removeAll();
    
    // grid.getStore().load({
    //     params:{
    //         'key':key,
    //         'id':0
    //     }
    // });

    Ext.Ajax.request({
        url: CLINIC_API + '/sales/item_datas',
        method: 'GET',
        params: {
            id: id,
            key: key,
            password:password,
            idunit:idunit
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            // grid.getStore().sync();

            var i = 0;
            Ext.each(d.rows, function(item) {
                // console.log(item)
                if(opt=='recurring'){
                    var idsalesitem = null;
                } else {
                    var idsalesitem = item.idsalesitem*1;
                }

                var rec = new GridItemSalesOrderModel({
                        idsalesitem: idsalesitem,
                        product_id: item.product_id*1,
                        no_sku: item.no_sku,
                        product_name: item.product_name,
                        price: item.price*1,
                        desc: item.description,
                        total: item.total*1,
                        qty: item.qty*1,
                        disc: item.disc*1,
                        rate: item.rate*1,
                        qty_retur: 0,
                        total_return:0
                });
                grid.getStore().insert(i, rec);

                i++;
            });

           
            updateGridSalesOrderv3();
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });
}

function customColumnStatus2(arrStatus, value) {
    for (var i = 0; i < arrStatus.length; i++) {
        if (arrStatus[i][0] == value) return arrStatus[i][1];
    }
    return '';
}