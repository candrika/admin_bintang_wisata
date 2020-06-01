var WindowPIList4MultiInvoice = Ext.create(dir_sys + 'purchasing.WindowPIList4MultiInvoice');


Ext.define('GridItemPurchaseMultiInvoiceModel', {
  extend: 'Ext.data.Model',
    fields: [
       "purchase_id","idpayment","idtax","idcustomer","subtotal","freight","tax","disc","totalamount","paidtoday","balance","comments","Sales","userin","datein","status","idunit","date_purchase","no_purchase_order","invoice_no","include_tax","total_dpp","pos_payment_type_id","id_member","namepayment","namecustomer","namaunit","payment_type_name","namecustomer","no_member","other_fee","invoice_status","unpaid_amount","pay_amount"
    ],
    idProperty: 'id'
});

var storeGridItemPurchaseMultiInvoice = Ext.create('Ext.data.Store', {
  pageSize: 100,
  model: 'GridItemPurchaseMultiInvoiceModel',
  //remoteSort: true,
  // autoload:true,
  proxy: {
    type: 'ajax',
    url: SITE_URL + 'backend/ext_get_all/salesorder/sales',
    actionMethods: 'POST',
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

Ext.define(dir_sys + 'purchasing.GridItemEntryPurchaseMultiInvoice', {
    extend: 'Ext.grid.Panel',
    id: 'GridItemEntryPurchaseMultiInvoice',
    alias: 'widget.GridItemEntryPurchaseMultiInvoice',
    xtype: 'cell-editing',
    // title: 'Input Sales Order',
    //    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            // width: panelW,
            height: sizeH-300,
            forceFit: true,
            plugins: [this.cellEditing],
            store: storeGridItemPurchaseMultiInvoice,
            columns: [{
                    dataIndex: 'purchase_id',
                    hidden: true,
                    header: 'purchase_id'
                },{
                    header: 'No Pembelian',
                    dataIndex: 'no_purchase_order',
                    minWidth: 150
                },  {
                    header: 'Nama Pemasok',
                    flex: 1,
                    dataIndex: 'namecustomer',
                    minWidth: 150
                }, {
                    xtype: 'datecolumn',
                    format: 'd-m-Y',
                    align: 'center',
                    header: 'Tgl Pembayaran',
                    dataIndex: 'date_purchase',
                    minWidth: 150
                },
                {
                    header: 'Total Tagihan',
                    dataIndex: 'unpaid_amount',
                    minWidth: 150,
                    xtype: 'numbercolumn',
                    align: 'right'
                },
                {
                    header: 'Pembayaran',
                    dataIndex: 'pay_amount',
                    minWidth: 150,
                    xtype: 'numbercolumn',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false
                    }
                },
                {
                    header: 'Sisa Tagihan',
                    dataIndex: 'balance',
                    minWidth: 150,
                    xtype: 'numbercolumn',
                    align: 'right'
                },
                {
                    xtype: 'actioncolumn',
                    width: 30,
                    align: 'center',
                    sortable: false,
                    menuDisabled: true,
                    items: [{
                        icon: BASE_URL + 'assets/icons/fam/cross.gif',
                        tooltip: 'Hapus',
                        scope: this,
                        handler: this.onRemoveClick
                    }]
                }
            ],
            selModel: {
                selType: 'cellmodel'
            },
            dockedItems: [
                {
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                        text: 'Tambah Pembelian',
                        handler: function() {
                            // WindowDOList4MultiInvoice.show();
                            Ext.getCmp('GridPIListMultiInvoice').getStore().load();
                            WindowPIList4MultiInvoice.show();

                        },
                    }]
                },
                {
                    xtype: 'pagingtoolbar',
                    store: storeGridItemPurchaseMultiInvoice, // same store GridPanel is using
                    dock: 'bottom',
                    displayInfo: true
                        // pageSize:20
                }
            ],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {},
                render: {
                    scope: this,
                    fn: function(grid) {
                        console.log(grid)
                         // Ext.getCmp('sales_invoice_id_multipay').setValue(dataRecord.data.sales_invoice_id);
                        // disableGridItemEntrySalesMultiInvoice();
                        // updateSelisih();
                    }
                }
            }
        });

        this.callParent();

        this.on('afterlayout', this.loadStore, this, {
            delay: 1,
            single: true
        });

        this.on('afteredit', this.onAfterEdit, this);

        this.on({
            scope: this,
            edit: function() {
                update_total_bayar_multi_invoice();
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    // recordSalesMultiInvoice: function(button, event, mode) {

    //     if (validasiSalesMultiInvoice()) {
    //         var aftertax = str_replace(',', '', Ext.getCmp('totalSalesMultiInvoice_si').getValue()) * 1;
    //         var biayaangkut = str_replace(',', '', Ext.getCmp('angkutSalesMultiInvoice_si').getValue()) * 1;

    //         Ext.Ajax.request({
    //             url: SITE_URL + 'sales/save_sales_invoice',
    //             method: 'POST',
    //             params: {
    //                 idsales: Ext.getCmp('id_sales_order_si').getValue(),
    //                 delivery_order_id: Ext.getCmp('delivery_order_id_si').getValue(),
    //                 noinvoice: Ext.getCmp('nojurnalSalesMultiInvoice_si').getValue(),
    //                 idpayment: Ext.getCmp('comboxpaymentterm_si').getValue(),
    //                 memo: Ext.getCmp('memoSalesMultiInvoice_si').getValue(),
    //                 ddays: Ext.getCmp('ddaysSalesMultiInvoice').getValue(),
    //                 eomddays: Ext.getCmp('eomddaysSalesMultiInvoice').getValue(),
    //                 percentagedisc: Ext.getCmp('percentagediscSalesMultiInvoice').getValue(),
    //                 daydisc: Ext.getCmp('daysdiscSalesMultiInvoice').getValue(),
    //                 notes_si: Ext.getCmp('notes_si').getValue(),
    //                 pembayaran: Ext.getCmp('pembayaranSalesMultiInvoice_si').getValue(),
    //                 sisa_bayar: Ext.getCmp('sisaBayarSalesMultiInvoice_si').getValue(),
    //                 total_pajak: Ext.getCmp('totalPajakSalesMultiInvoice_si').getValue(),
    //                 total_amount: aftertax + biayaangkut,
    //                 idunit: Ext.getCmp('cbUnitGridItemEntrySalesMultiInvoice').getValue(),
    //                 invoice_date: Ext.getCmp('invoice_date_si').getSubmitValue(),
    //                 diskon: Ext.getCmp('discountSalesMultiInvoice_si').getValue(),
    //                 subtotal: Ext.getCmp('discountSalesMultiInvoice_si').getValue(),
    //                 total_dpp: Ext.getCmp('dppSalesMultiInvoice_si').getValue(),
    //                 total_tax: Ext.getCmp('totalPajakSalesMultiInvoice_si').getValue(),
    //                 total_amount: Ext.getCmp('totalSalesMultiInvoice_si').getValue(),
    //                 biayaangkut: biayaangkut
    //                 // datagrid: json
    //             },
    //             success: function(form, action) {

    //                 var d = Ext.decode(form.responseText);
    //                 if (!d.success) {
    //                     Ext.Msg.alert('Peringatan', d.message);
    //                 } else {
    //                     Ext.Msg.alert('Success', d.message);

    //                     Ext.getCmp('WindowGridItemEntrySalesMultiInvoice').hide();
    //                 }

    //                 setHeaderInvoice();

    //                 Ext.getCmp('deliveryOrderGrid').getStore().load();

    //             },
    //             failure: function(form, action) {
    //                 Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
    //             }
    //         });
    //     }


    //     // }


    // },
    saveRecurr: function() {
        if (validasiSalesMultiInvoice()) {
            Ext.getCmp('formformRecc').getForm().reset();
            wformRecc.show();
        }
    },
    loadStore: function() {


        //        this.getStore().load({
        //            // store loading is asynchronous, use a load listener or callback to handle results
        //            callback: this.onStoreLoad
        //        });
    },
    onStoreLoad: function() {
        //        Ext.Msg.show({
        //            title: 'Store Load Callback',
        //            msg: 'store was loaded, data available for processing',
        //            icon: Ext.Msg.INFO,
        //            buttons: Ext.Msg.OK
        //        });
    },
    onAddClick: function() {
        wItemSalesPopupOrderPopup.show();
        storeGridItemSalesPopupOrder.load();
    },
    onRemoveClick: function(grid, rowIndex) {
        this.getStore().removeAt(rowIndex);
        update_total_bayar_multi_invoice();
        // updateGridSalesMultiInvoice('general')
    },
    onEdit: function(editor, e) {
        e.record.commit();
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
  Ext.getCmp('totalpayment_multipaymentPayment').setValue(renderNomor(total));
  Ext.getCmp('balance_multipaymentpurchase').setValue(renderNomor(total - total_bayar));
}