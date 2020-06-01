

// var WindowEntryPOReturn = Ext.create(dir_sys + 'sales2.WindowEntryPOReturn');
// var ContainerPurchaseReturn = Ext.create(dir_sys+'sales2.ContainerPurchaseReturn');

Ext.define('GridItemSalesReturnModel', {
  extend: 'Ext.data.Model',
  fields: ['sales_return_item_id','idsalesitem', 'product_id','desc', 'product_name', 'price', 'no_barcode', 'idunit', 'no_sku', 'qty_sale', 'disc', 'total', 'rate','qty_retur','total_return','notes'],
  idProperty: 'id'
});

Ext.define('GridSalesReturnListModel', {
    extend: 'Ext.data.Model',
    fields: [
        "idsales","idpayment","idtax","idcustomer","noinvoice","subtotal","freight","tax","disc","totalamount","paidtoday","unpaid_amount","comments","Sales","userin","datein","status","idunit","date_sales","no_sales_order","include_tax","total_dpp","pos_payment_type_id","id_member","namepayment","namecustomer","namaunit","payment_type_name","member_name","no_member","other_fee","buyer_name"
    ],
    idProperty: 'id'
});

var storeGridSalesReturnList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSalesReturnListModel',
    //remoteSort: true,
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
        property: 'code',
        direction: 'ASC'
    }]
});


storeGridSalesReturnList.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'option': 'unpaid',
        'key':key,
        'password':password,
        'idunit':idunit
    };
});

Ext.define('MY.searchGridSalesReturnList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSalesReturnList',
    store: storeGridSalesReturnList,
    width: 180
});
// var smGridSalesReturnList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridSalesReturnList.getSelection().length;
//             if (selectedLen == 0) {
//                 console.log(selectedLen);
//                 Ext.getCmp('btnDeleteMasterSupplierData').disable();
//             }
//         },
//         select: function(model, record, index) {
//             Ext.getCmp('btnDeleteMasterSupplierData').enable();
//         }
//     }
// });

Ext.define('GridSalesReturnList', {
    itemId: 'GridSalesReturnList',
    id: 'GridSalesReturnList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSalesReturnList',
    store: storeGridSalesReturnList,
    loadMask: true,
    columns: [{
        text: 'Pilih',
        width: 55,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {

            var form = Ext.getCmp('EntrySalesReturn').getForm();
            form.findField('sales_id').setValue(selectedRecord.get('idsales')*1);
            form.findField('no_sales_order').setValue(selectedRecord.get('no_sales_order'));
            form.findField('customer_name_so').setValue(selectedRecord.get('buyer_name'));
            form.findField('date_sales').setValue(selectedRecord.get('date_sales'));
           

            if(selectedRecord.get('due_date')==null){
                form.findField('due_date').hide();
            } else {
                form.findField('due_date').show();
                form.findField('due_date').setValue(selectedRecord.get('due_date'));
            }

            if(selectedRecord.get('include_tax')==null){
                form.findField('include_tax').hide();
            } else {
                form.findField('include_tax').show();
                if(selectedRecord.get('include_tax')=='1'){
                    form.findField('include_tax').setValue('Ya');
                } else {
                    form.findField('include_tax').setValue('Tidak');
                }
                
            }

            //set sales item 
            var grid = Ext.getCmp('GridItemEntrySalesReturn');
            grid.getStore().removeAll();

            Ext.Ajax.request({
                url: CLINIC_API + 'sales/item_datas',
                method: 'GET',
                params: {
                    id: selectedRecord.get('idsales')*1,
                    key: key,
                    password:password,
                    idunit:idunit
                },
                success: function(form, action) {
                    var d = Ext.decode(form.responseText);
                    // console.log(d)
                    Ext.each(d.rows, function(obj, i) {
                        console.log(i)
                        console.log(obj)
                        var rec = new GridItemSalesReturnModel({
                                sales_return_item_id: null,
                                idsalesitem: obj.idsalesitem*1,
                                product_id: obj.product_id*1,
                                no_sku: obj.no_sku,
                                product_name: obj.product_name,
                                price:obj.price*1,
                                desc: obj.description,
                                total: obj.total*1,
                                qty_sale: obj.qty*1,
                                qty_retur: 0,
                                total_return:0
                        });

                        grid.getStore().insert(i, rec);
                    });

                    update_summary_salesreturn();
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
            
            // form.findField('due_date').setValue(selectedRecord.get('due_date'));
            // form.findField('due_date').setValue(selectedRecord.get('due_date'));
            // form.findField('due_date').setValue(selectedRecord.get('due_date'));

           

          

            // update_total_bayar_multi_invoice();


            Ext.getCmp('WindowSales4ReturnList').hide();           
        }
    },{
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
        }, {
            header: 'No Order',
            dataIndex: 'no_sales_order',
            minWidth: 150
        },{
            header: 'No Invoice',
            dataIndex: 'noinvoice',
            minWidth: 150
        },  {
            header: 'Status',
            dataIndex: 'status',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'center',
            renderer: function(value) {
                return customColumnStatus(ArrSalesStatus, value);
            }
        }, 
        {
            header: 'Pembeli',
            flex: 1,
            dataIndex: 'buyer_name',
            minWidth: 150
        },
         {
            xtype: 'datecolumn',
            format: 'd-m-Y',
            align: 'center',
            header: 'Tanggal',
            dataIndex: 'date_sales',
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
            header: 'Biaya Lain',
            dataIndex: 'other_fee',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },{
            header: 'Diskon',
            dataIndex: 'disc',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        }, {
            header: 'Pajak',
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
        }],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                // '->',
                'Searching: ', ' ',
                {
                    xtype: 'searchGridSalesReturnList',
                    text: 'Left Button',
                    placeHolder: 'Customer Name...'
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: storeGridSalesReturnList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSalesReturnList.load();
            }
        }
    }
});


Ext.define(dir_sys + 'sales2.WindowSales4ReturnList', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowSales4ReturnList',
    id: 'WindowSales4ReturnList',
    title: 'Pilih Data Penjualan',
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
        xtype: 'GridSalesReturnList'
    }],
    listeners: {
        show: function() {
            // this.el.setStyle('top', '');
        }
    }
});