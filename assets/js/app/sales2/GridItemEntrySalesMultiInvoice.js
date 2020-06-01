var WindowSIList4MultiInvoice = Ext.create(dir_sys + 'sales2.WindowSIList4MultiInvoice');

// var WindowPengurangReturSI = Ext.create(dir_sys + 'sales.WindowPengurangReturSI');
// var GridPengurangReturSIListStore = Ext.getCmp('GridPengurangReturSIList').getStore();


Ext.define('GridItemSalesMultiInvoiceModel', {
  extend: 'Ext.data.Model',
    fields: [
       'idsales', 'no_sales_order','namecustomer', 'date_sales', 'customer_name', 'unpaid_amount','invoice_date',  'no_faktur','noinvoice','pay_amount','pengurang_retur','subtotal','balance'
    ],
    idProperty: 'id'
});

var storeGridItemSalesMultiInvoice = Ext.create('Ext.data.Store', {
  pageSize: 100,
  model: 'GridItemSalesMultiInvoiceModel',
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

Ext.define(dir_sys + 'sales2.GridItemEntrySalesMultiInvoice', {
    extend: 'Ext.grid.Panel',
    id: 'GridItemEntrySalesMultiInvoice',
    alias: 'widget.GridItemEntrySalesMultiInvoice',
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
            store: storeGridItemSalesMultiInvoice,
            columns: [{
                    dataIndex: 'idsales',
                    hidden: true,
                    header: 'idsales'
                },{
                    header: 'No Invoice',
                    dataIndex: 'noinvoice',
                    minWidth: 150
                },  {
                    header: 'Pembeli',
                    flex: 1,
                    dataIndex: 'customer_name',
                    minWidth: 150
                }, {
                    xtype: 'datecolumn',
                    format: 'd-m-Y',
                    align: 'center',
                    header: 'Tgl Invoice',
                    dataIndex: 'invoice_date',
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
                        text: 'Tambah Invoice',
                        handler: function() {
                            // WindowDOList4MultiInvoice.show();
                            WindowSIList4MultiInvoice.show();
                             var GridSIListMultiInvoiceStore = Ext.getCmp('GridSIListMultiInvoice').getStore();

                            GridSIListMultiInvoiceStore.load();
                        },
                    }]
                },
                {
                    xtype: 'pagingtoolbar',
                    store: storeGridItemSalesMultiInvoice, // same store GridPanel is using
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
                update_total_bayar_multi_sales_invoice();
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordSalesMultiInvoice: function(button, event, mode) {

        if (validasiSalesMultiInvoice()) {
            var aftertax = str_replace(',', '', Ext.getCmp('totalSalesMultiInvoice_si').getValue()) * 1;
            var biayaangkut = str_replace(',', '', Ext.getCmp('angkutSalesMultiInvoice_si').getValue()) * 1;

            Ext.Ajax.request({
                url: SITE_URL + 'sales/save_sales_invoice',
                method: 'POST',
                params: {
                    idsales: Ext.getCmp('id_sales_order_si').getValue(),
                    delivery_order_id: Ext.getCmp('delivery_order_id_si').getValue(),
                    noinvoice: Ext.getCmp('nojurnalSalesMultiInvoice_si').getValue(),
                    idpayment: Ext.getCmp('comboxpaymentterm_si').getValue(),
                    memo: Ext.getCmp('memoSalesMultiInvoice_si').getValue(),
                    ddays: Ext.getCmp('ddaysSalesMultiInvoice').getValue(),
                    eomddays: Ext.getCmp('eomddaysSalesMultiInvoice').getValue(),
                    percentagedisc: Ext.getCmp('percentagediscSalesMultiInvoice').getValue(),
                    daydisc: Ext.getCmp('daysdiscSalesMultiInvoice').getValue(),
                    notes_si: Ext.getCmp('notes_si').getValue(),
                    pembayaran: Ext.getCmp('pembayaranSalesMultiInvoice_si').getValue(),
                    sisa_bayar: Ext.getCmp('sisaBayarSalesMultiInvoice_si').getValue(),
                    total_pajak: Ext.getCmp('totalPajakSalesMultiInvoice_si').getValue(),
                    total_amount: aftertax + biayaangkut,
                    idunit: Ext.getCmp('cbUnitGridItemEntrySalesMultiInvoice').getValue(),
                    invoice_date: Ext.getCmp('invoice_date_si').getSubmitValue(),
                    diskon: Ext.getCmp('discountSalesMultiInvoice_si').getValue(),
                    subtotal: Ext.getCmp('discountSalesMultiInvoice_si').getValue(),
                    total_dpp: Ext.getCmp('dppSalesMultiInvoice_si').getValue(),
                    total_tax: Ext.getCmp('totalPajakSalesMultiInvoice_si').getValue(),
                    total_amount: Ext.getCmp('totalSalesMultiInvoice_si').getValue(),
                    biayaangkut: biayaangkut
                    // datagrid: json
                },
                success: function(form, action) {

                    var d = Ext.decode(form.responseText);
                    if (!d.success) {
                        Ext.Msg.alert('Peringatan', d.message);
                    } else {
                        Ext.Msg.alert('Success', d.message);

                        Ext.getCmp('WindowGridItemEntrySalesMultiInvoice').hide();
                    }

                    setHeaderInvoice();

                    Ext.getCmp('deliveryOrderGrid').getStore().load();

                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }


        // }


    },
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
        update_total_bayar_multi_sales_invoice();
        // updateGridSalesMultiInvoice('general')
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});
