

// var WindowEntryPOReturn = Ext.create(dir_sys + 'sales2.WindowEntryPOReturn');
// var ContainerPurchaseReturn = Ext.create(dir_sys+'sales2.ContainerPurchaseReturn');

Ext.define('GridItemPurchaseMultiInvoiceModel', {
  extend: 'Ext.data.Model',
    fields: [
        "purchase_id","idpayment","idtax","idcustomer","subtotal","freight","tax","disc","totalamount","paidtoday","balance","comments","Sales","userin","datein","status","idunit","date_purchase","no_purchase_order","invoice_no","include_tax","total_dpp","pos_payment_type_id","id_member","namepayment","namecustomer","namaunit","payment_type_name","namecustomer","no_member","other_fee","invoice_status","unpaid_amount"
    ],
    idProperty: 'id'
});

Ext.define('GridPIListMultiInvoiceModel', {
    extend: 'Ext.data.Model',
    fields: [
     "purchase_id","idpayment","idtax","idcustomer","subtotal","freight","tax","disc","totalamount","paidtoday","balance","comments","Sales","userin","datein","status","idunit","date_purchase","no_purchase_order","invoice_no","include_tax","total_dpp","pos_payment_type_id","id_member","namepayment","namecustomer","namaunit","payment_type_name","namecustomer","no_member","other_fee","invoice_status","unpaid_amount"
    ],
    idProperty: 'id'
});

var storeGridPIListMultiInvoice = Ext.create('Ext.data.Store', {
    pagePIze: 100,
    model: 'GridPIListMultiInvoiceModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API  + 'purchase/data',
        actionMethods: {
           read: 'GET'   
        },
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //PImpleSortMode: true
    },
    sorters: [{
        property: 'code',
        direction: 'ASC'
    }]
});


storeGridPIListMultiInvoice.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'option': 'unpaid',
        'key':key,
        'password':password,
        'idunit':idunit
    };
});

Ext.define('MY.searchGridPIListMultiInvoice', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPIListMultiInvoice',
    store: storeGridPIListMultiInvoice,
    width: 180
});

var smGridPIListMultiInvoice = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'MULTI',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPIListMultiInvoice.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('multiSelectionpayment').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('multiSelectionpayment').enable();
        }
    }
});

Ext.define('GridPIListMultiInvoice', {
    itemId: 'GridPIListMultiInvoice',
    id: 'GridPIListMultiInvoice',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPIListMultiInvoice',
    store: storeGridPIListMultiInvoice,
    selModel:smGridPIListMultiInvoice,
    loadMask: true,
    columns: [{
        text: 'Pilih',
        width: 55,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {

            var grid = Ext.getCmp('GridItemEntryPurchaseMultiInvoice');

             var rec = new GridItemPurchaseMultiInvoiceModel({
                    purchase_id: selectedRecord.get('purchase_id'),
                    no_purchase_order: selectedRecord.get('no_purchase_order'),
                    qty: selectedRecord.get('qty'),
                    namecustomer: selectedRecord.get('namecustomer'),
                    date_purchase: selectedRecord.get('date_purchase'),
                    unpaid_amount: selectedRecord.get('unpaid_amount'),
                    pay_amount:selectedRecord.get('unpaid_amount'),
                    total_payment:0,
                    balance: selectedRecord.get('unpaid_amount')
            });

            grid.getStore().insert(0, rec);

            update_total_bayar_multi_invoice();


            Ext.getCmp('WindowPIList4MultiInvoice').hide();           
        }
    },{
            dataIndex: 'purchase_id',
            hidden: true,
            header: 'purchase_id'
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
        }, {
            header: 'Kepada',
            flex: 1,
            dataIndex: 'namecustomer',
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
        },],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{

                    text:'Tambah',
                    itemId:'multiSelectionpayment',
                    id:'multiSelectionpayment',
                    handler:function(){
                        var grid = Ext.getCmp('GridPIListMultiInvoice');
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var sm =grid.getSelectionModel();
                        var data=grid.getSelectionModel().getSelection();
                        
                        // console.log(data);
                        var GridMultiPurchase = Ext.getCmp('GridItemEntryPurchaseMultiInvoice');
                        var i=0;
                        Ext.each(data,function(obj){
                        console.log(obj.data);

                            var rec = new GridItemPurchaseMultiInvoiceModel({
                                    purchase_id: obj.data.purchase_id,
                                    no_purchase_order: obj.data.no_purchase_order,
                                    qty: obj.data.qty,
                                    namecustomer: obj.data.namecustomer,
                                    date_purchase: obj.data.date_purchase,
                                    unpaid_amount: obj.data.unpaid_amount,
                                    pay_amount:obj.data.unpaid_amount,
                                    total_payment:0,
                                    balance: obj.data.unpaid_amount
                            });

                            GridMultiPurchase.getStore().insert(i, rec);

                            update_total_bayar_multi_invoice();


                            Ext.getCmp('WindowPIList4MultiInvoice').hide(); 
                        });
                    }
                },'->',
                'Searching: ', ' ',
                {
                    xtype: 'searchGridPIListMultiInvoice',
                    text: 'Left Button',
                    placeHolder: 'Customer Name...'
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: storeGridPIListMultiInvoice, // same store GridPanel is uPIng
            dock: 'bottom',
            displayInfo: true
                // pagePIze:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPIListMultiInvoice.load();
            }
        }
    }
});


Ext.define(dir_sys + 'purchasing.WindowPIList4MultiInvoice', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowPIList4MultiInvoice',
    id: 'WindowPIList4MultiInvoice',
    title: 'Pilih Purchase Invoice',
    // header: {
    //     titlePoPItion: 2,
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
        xtype: 'GridPIListMultiInvoice'
    }],
    listeners: {
        show: function() {
            // this.el.setStyle('top', '');
        }
    }
});

function update_total_bayar_multi_invoice() {
  var total = 0;
  var total_bayar = 0;
  var Store = Ext.getCmp('GridItemEntryPurchaseMultiInvoice').getStore();
  Ext.each(Store.data.items, function(obj, i) {
    // console.log(obj.data.totalamount)    
    total += obj.data.unpaid_amount * 1;

    var purchase_id = obj.data.purchase_id;
    
    
     obj.set('pay_amount', obj.data.pay_amount);  

     var subtotal = obj.data.pay_amount*1;
     obj.set('subtotal', subtotal);      

     total_bayar += subtotal;
    // total_bayar += total_return*1-obj.data.pay_amount * 1;
     // obj.set('subtotal', subtotal);

     obj.set('balance', obj.data.unpaid_amount*1 - subtotal*1);
     
  });
  Ext.getCmp('amount_purchaseMultiPayment').setValue(renderNomor(total_bayar));
  Ext.getCmp('totalpayment_multipaymentpurchase').setValue(renderNomor(total));
  Ext.getCmp('balance_multipaymentpurchase').setValue(renderNomor(total - total_bayar));
}