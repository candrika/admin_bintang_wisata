
Ext.define('PurchaseReturnGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        "purchase_return_id","purchase_id","status","memo","date_return","total_qty_return","total_amount_return","datein","userin","no_return","idunit","invoice_no","no_purchase_order","date_purchase","namesupplier"
    ],
    idProperty: 'id'
});
var storePurchaseReturnGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'PurchaseReturnGridModel',
    remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API  + '/Purchase/data_purchase_return',
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

storePurchaseReturnGrid.on('beforeload', function(store, operation) {
    operation.params = {
        'key':key,
        'password':password,
        'idunit':idunit,
        'startdate': Ext.getCmp('startdate_grdporeturn').getValue(),
        'enddate': Ext.getCmp('enddate_grdporeturn').getValue(),
    }
})



Ext.define('MY.searchPurchaseReturnGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchPurchaseReturnGrid',
    store: storePurchaseReturnGrid,
    width: 180
});
var smPurchaseReturnGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smPurchaseReturnGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletePurchaseOrderGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletePurchaseOrderGrid').enable();
        }
    }
});
Ext.define(dir_sys + 'purchasing.PurchaseReturnGrid', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smPurchaseReturnGrid,
    title: 'Retur',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'PurchaseReturnGridID',
    id: 'PurchaseReturnGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.PurchaseReturnGrid',
    store: storePurchaseReturnGrid,
    loadMask: true,
    columns: [{
            dataIndex: 'purchase_return_id',
            hidden: true,
            header: 'purchase_return_id'
        },{
            header: 'No Retur',
            dataIndex: 'no_return',
            minWidth: 150
        }, {
            header: 'No Pembelian',
            dataIndex: 'no_purchase_order',
            minWidth: 150
        },{
            header: 'Pemasok',
            flex: 1,
            dataIndex: 'namesupplier',
            minWidth: 150
        },  {
            header: 'Memo',
            dataIndex: 'memo',
            minWidth: 250
        },
        {
            header: 'Tgl Beli',
            dataIndex: 'date_purchase',
            minWidth: 150
        },{
            header: 'Tgl Retur',
            dataIndex: 'date_return',
            minWidth: 150
        },
        {
            header: 'Total Qty Retur',
            dataIndex: 'total_qty_return',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Total Retur',
            dataIndex: 'total_amount_return',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        }
    ],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'datefield',
                    id: 'startdate_grdporeturn',
                    format: 'd/m/Y',
                    // value: datenow(),
                    fieldLabel: 'Periode',
                },
                ' to ',
                {
                    xtype: 'datefield',
                    id: 'enddate_grdporeturn',
                    format: 'd/m/Y',
                    // value: datenow(),
                    hideLabel: true
                    // fieldLabel: 'Date Order',
                },
                {
                    xtype: 'comboxunit',
                    hidden:true,
                    id: 'idunit_grdporeturn',
                },
                {
                    text: 'Search',
                    handler: function() {
                        storePurchaseReturnGrid.load();
                    }
                },
                {
                    text: 'Clear Filter',
                    handler: function() {
                        Ext.getCmp('startdate_grdporeturn').setValue();
                        Ext.getCmp('enddate_grdporeturn').setValue();
                        storePurchaseReturnGrid.load();
                    }
                }
            ]
        },
        // {
        //     xtype: 'toolbar',
        //     dock: 'top',
        //     items: [
        //     ]
        // },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                text: 'Buat Baru',
                iconCls: 'add-icon',
                handler: function() {
                   create_new_purchase_return()
                }
            }, {
                text: 'Cetak',
                // hidden:true,
                iconCls: 'print-icon',
                handler: function() {
                    var grid = Ext.getCmp('PurchaseReturnGridID');
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var data = grid.getSelectionModel().getSelection();
                    if (data.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                    } else {

                        Ext.create('Ext.window.Window', {
                            title: 'Preview',
                            maximizable: true,
                            modal: true,
                            width: 850,
                            height: panelH - 20,
                            items: [{
                                xtype: 'component',
                                html: '<iframe src="' + SITE_URL + 'purchase/print_purchase_return/' + selectedRecord.data.purchase_return_id + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
                            }],
                            buttons: [{
                                text: 'Print',
                                iconCls: 'print-icon',
                                handler: function() {
                                    window.open(SITE_URL + 'purchase/print_purchase_return/' + selectedRecord.data.purchase_return_id + '/1', '_blank');
                                }
                            }]
                        }).show();
                    }
                }
            }, {
                text: 'Hapus',
                iconCls: 'delete-icon',
                handler: function() {
                    Ext.Msg.show({
                        title: 'Confirm',
                        msg: 'Delete Selected ?',
                        buttons: Ext.Msg.YESNO,
                        fn: function(btn) {
                            if (btn == 'yes') {
                               var grid = Ext.getCmp('PurchaseReturnGridID');
                                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                var data = grid.getSelectionModel().getSelection();
                                // console.log(selectedRecord.data.Purchase_return_id)
                                Ext.Ajax.request({
                                    url: CLINIC_API  + 'Purchase/remove_purchase_return',
                                    method: 'POST',
                                    params: {
                                        id: selectedRecord.data.purchase_return_id,
                                        key: key,
                                        password,
                                        idunit:idunit
                                    },
                                    success: function(form, action) {
                                        var d = Ext.decode(form.responseText);
                                        Ext.Msg.alert('Informasi', d.message);
                                        storePurchaseReturnGrid.load();
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
                xtype: 'searchPurchaseReturnGrid',
                text: 'Left Button'
            }]
        }, {
            xtype: 'pagingtoolbar',
            store: storePurchaseReturnGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
            // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storePurchaseReturnGrid.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            showPurchaseReturnData(record.data);
        }
    }
});

function create_new_purchase_return() {
    
    if (!Ext.isDefined(Ext.getCmp('windowPurchaseReturn'))) {
        var windowPurchaseReturn = Ext.create(dir_sys + 'purchasing.windowPurchaseReturn');
    } else {
        var windowPurchaseReturn = Ext.getCmp('windowPurchaseReturn');
    }

    windowPurchaseReturn.show();
    var form = Ext.getCmp('EntryPurchaseReturn').getForm();
    form.reset();
    form.findField('statusform_return').setValue('input');
    form.findField('date_return').setValue(new Date());

    var store = Ext.getCmp('GridItemEntryPurchaseReturn').getStore();
    Ext.each(store.data.items, function(obj, i) {
        store.removeAt(i);
    });
    // Ext.getCmp('EntryPurchaseReceive').getForm().reset();
}

function update_summary_purchace_return(){
    var form = Ext.getCmp('EntryPurchaseReturn').getForm();
    var store = Ext.getCmp('GridItemEntryPurchaseReturn').getStore();
    var total_qty = 0;
    var total_return = 0;
    Ext.each(store.data.items, function(obj, i) {
        console.log(obj)

        var total_per_row = obj.data.price*obj.data.qty_retur;
        total_qty+=obj.data.qty_retur*1;
        total_return+=total_per_row;

        obj.set('total_return', total_per_row);
    });

    form.findField('total_qty_return').setValue(number_format(total_qty));
    form.findField('total_amount_return').setValue(number_format(total_return));
}

function showPurchaseReturnData(data){
    if (!Ext.isDefined(Ext.getCmp('windowPurchaseReturn'))) {
        var windowPurchaseReturn = Ext.create(dir_sys + 'purchasing.windowPurchaseReturn');
    } else {
        var windowPurchaseReturn = Ext.getCmp('windowPurchaseReturn');
    }

    windowPurchaseReturn.show();

    Ext.Ajax.request({
        method:'GET',
        url:CLINIC_API  +'purchase/form_data_return',
        params:{
            id:data.purchase_return_id,
            key:key,
            idunit:idunit

        },success:function(form,action){
            
            var d    = Ext.decode(form.responseText);
            var data = d.rows[0];
            // console.log(data);

            Ext.each(data,function(obj,i){
                console.log(obj);
                var form = Ext.getCmp('EntryPurchaseReturn').getForm();

                form.findField('Purchase_return_id').setValue(obj.purchase_return_id);
                form.findField('Purchase_id').setValue(obj.purchase_id);
                form.findField('no_purchase_order').setValue(obj.no_purchase_order);
                form.findField('date_return').setValue(obj.date_return);
                form.findField('date_purchase').setValue(obj.date_purchase);
                form.findField('due_date').setValue(obj.due_date);
                form.findField('customer_name_po').setValue(obj.suppier_name);
                form.findField('statusform_return').setValue('edit');
                
                if(obj.include_tax=='0'){
                    form.findField('include_tax').setValue('No');
                } else {
                    form.findField('include_tax').setValue('Yes');
                }
            });
            
        },failure:function(form,action){

        }
    })

    var grid = Ext.getCmp('GridItemEntryPurchaseReturn');
    grid.getStore().removeAll();
    // grid.getStore().load({
    //     params:{
    //         'key':key,
    //         'id':0
    //     }
    // });

    // storeGridItemPurchaseReturn.load();

    Ext.Ajax.request({
        url: CLINIC_API  + 'purchase/purchase_return_items',
        // async:false,
        method: 'GET',
        params: {
            id: data.purchase_return_id,
            key: key,
            password:password,
            idunit:idunit
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            // grid.getStore().sync();

            var i = 0;
            Ext.each(d.rows, function(item) {
                console.log(item)
                
                // if(opt=='recurring'){
                //     var purchase_return_item_id = null;
                // } else {
                //     var purchase_return_item_id = item.purchase_return_item_id*1;
                // }

                var rec = new GridItemPurchaseReturnModel({
                        purchase_return_item_id:item.purchase_return_item_id*1,
                        purchase_return_id:item.purchase_return_id*1,
                        purchase_item_id: item.purchase_item_id*1,
                        purchase_id: item.purchase_id*1,
                        product_id:item.product_id*1,
                        no_sku: item.no_sku,
                        product_name: item.product_name,
                        price: item.price*1,
                        desc: item.description,
                        total: item.total*1,
                        qty_purchase: item.qty_purchase*1,
                        disc: item.disc*1,
                        rate: item.ratetax,
                        qty_retur: item.qty_retur,
                        total_return:item.total_retur
                });
                grid.getStore().insert(i, rec);

                i++;
            });

            // updateGridPurchasev3();
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });

    update_summary_purchace_return();

    Ext.Ajax.request({
        url:CLINIC_API  + 'purchase/purchase_return_items',
        method:'GET',
        params:{
            key:key,
            password:password,
            idunit:idunit,
            id:data.purchase_return_id,
        },success:function(form,action){
            var d = Ext.decode(form.responseText)
            
            var items_receipt = d.rows;
            
            var qty_recepit = 0;
            var total_return = 0;
            var total_return_qty = 0;
            
            Ext.each(items_receipt, function(obj, i) {
            
                var total_per_row = obj.price*obj.qty_retur;
               
                total_return+=total_per_row;
                total_return_qty+=obj.qty_retur*1;
            });


            Ext.getCmp('total_qty_return').setValue(number_format(total_return_qty));
            Ext.getCmp('total_amount_return').setValue(number_format(total_return));

            update_summary_purchace_return();
        },failure:function(form,action){

        }
    })

}