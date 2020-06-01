

// var WindowEntryPOReturn = Ext.create(dir_sys + 'Purchase2.WindowEntryPOReturn');
// var ContainerPurchaseReturn = Ext.create(dir_sys+'Purchase2.ContainerPurchaseReturn');

Ext.define('GridItemPurchaseReturnModel', {
  extend: 'Ext.data.Model',
  fields: ['purchase_return_item_id','purchase_return_id','purchase_item_id','purchase_id', 'product_id','desc', 'product_name', 'price', 'no_barcode', 'idunit', 'no_sku', 'qty_purchase', 'disc', 'total', 'rate','qty_retur','total_return','notes'],
  idProperty: 'id'
});

Ext.define('GridPurchaseReturnListModel', {
    extend: 'Ext.data.Model',
    fields: [
         "purchase_id","idpayment","idtax","idcustomer","subtotal","freight","tax","disc","totalamount","paidtoday","balance","comments","Sales","userin","datein","status","idunit","date_purchase","no_purchase_order","invoice_no","include_tax","total_dpp","pos_payment_type_id","id_member","namepayment","namecustomer","namaunit","payment_type_name","namecustomer","no_member","other_fee","invoice_status","unpaid_amount"
    ],
    idProperty: 'id'
});

var storeGridPurchaseReturnList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPurchaseReturnListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API  + '/Purchase/data_purchase_list',
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


storeGridPurchaseReturnList.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        // 'option': 'unpaid',
        'key':key,
        'password':password,
        'idunit':idunit
    };
});

Ext.define('MY.searchGridPurchaseReturnList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPurchaseReturnList',
    store: storeGridPurchaseReturnList,
    width: 180
});
// var smGridPurchaseReturnList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridPurchaseReturnList.getSelection().length;
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

Ext.define('GridPurchaseReturnList', {
    itemId: 'GridPurchaseReturnList',
    id: 'GridPurchaseReturnList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPurchaseReturnList',
    store: storeGridPurchaseReturnList,
    loadMask: true,
    columns: [{
        text: 'Pilih',
        width: 55,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {

            var form = Ext.getCmp('EntryPurchaseReturn').getForm();
            form.findField('Purchase_id').setValue(selectedRecord.get('purchase_id')*1);
            form.findField('no_purchase_order').setValue(selectedRecord.get('no_purchase_order'));
            form.findField('customer_name_po').setValue(selectedRecord.get('namecustomer'));
            form.findField('date_purchase').setValue(selectedRecord.get('date_purchase'));
           

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

            //set Purchase item
            var grid = Ext.getCmp('GridItemEntryPurchaseReturn');

            Ext.Ajax.request({
                url: CLINIC_API  + 'Purchase/data_purchase_item_list',
                method: 'GET',
                params: {
                    id: selectedRecord.get('purchase_id')*1,
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
                        //GridPurchaseItemReturnListModel
                        var rec = new GridItemPurchaseReturnModel({
                                purchase_return_item_id: null,
                                purchase_item_id: obj.purchase_item_id*1,
                                product_id: obj.product_id*1,
                                no_sku: obj.no_sku,
                                product_name: obj.product_name,
                                price:obj.price*1,
                                desc: obj.description,
                                total: obj.total*1,
                                qty_purchase: obj.qty*1,
                                qty_retur: 0,
                                total_return:0
                        });

                        grid.getStore().insert(i, rec);
                    });

                    update_summary_purchace_return();
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
            
            // form.findField('due_date').setValue(selectedRecord.get('due_date'));
            // form.findField('due_date').setValue(selectedRecord.get('due_date'));
            // form.findField('due_date').setValue(selectedRecord.get('due_date'));

           

          

            // update_total_bayar_multi_invoice();


            Ext.getCmp('WindowPurchase4ReturnList').hide();           
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
        },{
            header: 'No Invoice',
            dataIndex: 'invoice_no',
            minWidth: 150
        },  {
            header: 'Status',
            dataIndex: 'invoice_status',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'center',
            renderer: function(value) {
                return customColumnStatus(ArrPurchaseInvStatus, value);
            }
        }, 
        {
            header: 'Pemasok',
            flex: 1,
            dataIndex: 'namecustomer',
            minWidth: 150
        },
         {
            xtype: 'datecolumn',
            format: 'd-m-Y',
            align: 'center',
            header: 'Tanggal',
            dataIndex: 'date_purchase',
            minWidth: 150
        },
        {
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
        },
        {
            header: 'Total Diskon',
            // hidden:true,
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
            header: 'Grand Total',
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
            header: 'Total Belum Terbayar',
            dataIndex: 'unpaid_amount',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                // '->',
                'Searching: ', ' ',
                {
                    xtype: 'searchGridPurchaseReturnList',
                    text: 'Left Button',
                    placeHolder: 'Customer Name...'
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: storeGridPurchaseReturnList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPurchaseReturnList.load();
            }
        }
    }
});


Ext.define(dir_sys + 'purchasing.WindowPurchase4ReturnList', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowPurchase4ReturnList',
    id: 'WindowPurchase4ReturnList',
    title: 'Pilih Data Penerimaan',
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
        xtype: 'GridPurchaseReturnList'
    }],
    listeners: {
        show: function() {
            // this.el.setStyle('top', '');
        }
    }
});


function update_summary_purchace_return(){
    var form = Ext.getCmp('EntryPurchaseReturn').getForm();
    var store = Ext.getCmp('GridItemEntryPurchaseReturn').getStore();
    var total_qty = 0;
    var total_return = 0;
    Ext.each(store.data.items, function(obj, i) {
        console.log(obj)

        var total_per_row = obj.data.price*obj.data.qty_retur;
        total_qty+=obj.data.qty_retur;
        total_return+=total_per_row;

        obj.set('total_return', total_per_row);
    });

    form.findField('total_qty_return').setValue(number_format(total_qty));
    form.findField('total_amount_return').setValue(number_format(total_return));
}