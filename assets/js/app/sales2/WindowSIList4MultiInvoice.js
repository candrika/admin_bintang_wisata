

// var WindowEntryPOReturn = Ext.create(dir_sys + 'sales2.WindowEntryPOReturn');
// var ContainerPurchaseReturn = Ext.create(dir_sys+'sales2.ContainerPurchaseReturn');

Ext.define('GridItemSalesMultiInvoiceModel', {
  extend: 'Ext.data.Model',
    fields: [
       'sales_invoice_id', 'no_sales_order','namecustomer','customer_name','date_sales',  'totalamount','invoice_date',  'noinvoice','noinvoice'
    ],
    idProperty: 'id'
});

Ext.define('GridSIListMultiInvoiceModel', {
    extend: 'Ext.data.Model',
    fields: [
       'sales_invoice_id', 'idcustomer','idsales','idjournal','customer_name', 'no_sales_order', 'subtotal', 'freight', 'date_sales', 'tax', 'disc', 'totalamount', 'paidtoday', 'balance', 'comments', 'noinvoice', 'ddays', 'eomddays', 'percentagedisc', 'daydisc', 'notes_si', 'nocustomer', 'namecustomer', 'idpayment', 'invoice_status', 'invoice_date', 'term', 'due_date', 'no_faktur','no_do','unpaid_amount'
    ],
    idProperty: 'id'
});

var storeGridSIListMultiInvoice = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSIListMultiInvoiceModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'sales/invoice',
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
        property: 'code',
        direction: 'ASC'
    }]
});


storeGridSIListMultiInvoice.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'option': 'unpaid',
        'key':key,
        'password':password,
        'idunit':idunit
    };
});

Ext.define('MY.searchGridSIListMultiInvoice', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSIListMultiInvoice',
    store: storeGridSIListMultiInvoice,
    width: 180
});

var smGridSIListMultiInvoice = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'MULTI',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridSIListMultiInvoice.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('multiSelectionpaymentsales').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('multiSelectionpaymentsales').enable();
        }
    }
});

Ext.define('GridSIListMultiInvoice', {
    itemId: 'GridSIListMultiInvoice',
    id: 'GridSIListMultiInvoice',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSIListMultiInvoice',
    store: storeGridSIListMultiInvoice,
    selModel:smGridSIListMultiInvoice,
    loadMask: true,
    columns: [{
        text: 'Pilih',
        width: 55,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {

           var grid = Ext.getCmp('GridItemEntrySalesMultiInvoice');

             var rec = new GridItemSalesMultiInvoiceModel({
                    idsales: selectedRecord.get('idsales'),
                    noinvoice: selectedRecord.get('noinvoice'),
                    qty: selectedRecord.get('qty'),
                    namecustomer: selectedRecord.get('namecustomer'),
                    invoice_date: selectedRecord.get('invoice_date'),
                    unpaid_amount: selectedRecord.get('unpaid_amount'),
                    pay_amount:selectedRecord.get('unpaid_amount'),
                    total_payment:0,
                    balance: selectedRecord.get('unpaid_amount')
            });

            grid.getStore().insert(0, rec);

            update_total_bayar_multi_sales_invoice();


            Ext.getCmp('WindowSIList4MultiInvoice').hide();           
        }
    },{
            header: 'sales_invoice_id',
            dataIndex: 'sales_invoice_id',
            hidden: true
        },{
            header: 'idsales',
            dataIndex: 'idsales',
            hidden: true
        },{
            header: 'idjournal',
            dataIndex: 'idjournal',
            hidden: true
        },
         {
            header: 'No Invoice',
            dataIndex: 'noinvoice',
            // hidden: true
        }, 
        {
            header: 'No Sales',
            dataIndex: 'no_sales_order',
            // hidden: true
        },{
            header: 'Kepada',
            dataIndex: 'customer_name',
            minWidth: 200,
        },
        {
            header: 'Tgl Invoice',
            dataIndex: 'invoice_date',
            minWidth: 150,
            xtype: 'datecolumn',
            format: 'd-m-Y'
        },

        {
            header: 'Jatuh Tempo',
            xtype: 'datecolumn',
            format: 'd-m-Y',
            dataIndex: 'due_date',
            minWidth: 150,
        },

        {
            header: 'Sub Total',
            dataIndex: 'subtotal',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Total Diskon',
            dataIndex: 'disc',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Biaya Kirim',
            dataIndex: 'freight',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Total Pajak',
            dataIndex: 'tax',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
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
            minWidth: 180,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Status',
            dataIndex: 'invoice_status',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right',
            renderer: function(value) {
                return customColumnStatus(ArrSalesStatus, value);
            }
        }],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    text:'Tambah',
                    id:'multiSelectionpaymentsales',
                    handler:function(){
                        var grid = Ext.getCmp('GridSIListMultiInvoice');
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var sm =grid.getSelectionModel();
                        var data=grid.getSelectionModel().getSelection();

                        var grid_SalesMultiInvoice = Ext.getCmp('GridItemEntrySalesMultiInvoice');
                        var i=0;
                        Ext.each(data,function(obj){
                        console.log(obj.data);

                            var rec = new GridItemSalesMultiInvoiceModel({
                                idsales: obj.data.idsales,
                                noinvoice: obj.data.noinvoice,
                                qty: obj.data.qty,
                                namecustomer: obj.data.namecustomer,
                                invoice_date: obj.data.invoice_date,
                                unpaid_amount: obj.data.unpaid_amount,
                                pay_amount:obj.data.unpaid_amount,
                                total_payment:0,
                                balance: obj.data.unpaid_amount
                            });

                            grid_SalesMultiInvoice.getStore().insert(i, rec);

                            update_total_bayar_multi_sales_invoice();

                            Ext.getCmp('WindowSIList4MultiInvoice').hide(); 
                        });
                    }    
                },'->',
                'Searching: ', ' ',
                {
                    xtype: 'searchGridSIListMultiInvoice',
                    text: 'Left Button',
                    placeHolder: 'Customer Name...'
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: storeGridSIListMultiInvoice, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSIListMultiInvoice.load();
            }
        }
    }
});


Ext.define(dir_sys + 'sales2.WindowSIList4MultiInvoice', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowSIList4MultiInvoice',
    id: 'WindowSIList4MultiInvoice',
    title: 'Pilih Invoice',
    // header: {
    //     titlePosition: 2,
    //     titleAlign: 'center'
    // },
    closable: true,
    autoDestroy: false,
    modal: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: panelW,
    height: sizeH - 100,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridSIListMultiInvoice'
    }],
    listeners: {
        show: function() {
            // this.el.setStyle('top', '');
        }
    }
});