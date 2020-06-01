
Ext.define('PurchaseReceiveGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        "purchase_receipt_id","purchase_id","purchase_receipt_no","status_purchase_receipt","no_purchase_order","date_purchase","receipt_date,idcustomer","customer_type","id_member","namesupplier","memo","receipt_date","total_qty_received","total_rest_qty","total_received"
    ],
    idProperty: 'id'
});
var storePurchaseReceiveGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'PurchaseReceiveGridModel',
    remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API  + '/Purchase/data_purchase_receipt',
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

storePurchaseReceiveGrid.on('beforeload', function(store, operation) {
    operation.params = {
        'key':key,
        'password':password,
        'idunit':idunit,
        'startdate': Ext.getCmp('startdate_grdporeceipt').getValue(),
        'enddate':  Ext.getCmp('enddate_grdporeceipt').getValue(),
    }
})



Ext.define('MY.searchPurchaseReceiveGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchPurchaseReceiveGrid',
    store: storePurchaseReceiveGrid,
    width: 180
});
var smPurchaseReceiveGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smPurchaseReceiveGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                // Ext.getCmp('btnDeletePurchaseOrderGrid').disable();
            }
        },
        select: function(model, record, index) {
            // Ext.getCmp('btnDeletePurchaseOrderGrid').enable();
        }
    }
});
Ext.define(dir_sys + 'purchasing.PurchaseReceiveGrid', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smPurchaseReceiveGrid,
    title: 'Penerimaan',
    // selModel:smPurchaseReceiveGrid,
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'PurchaseReceiveGridID',
    id: 'PurchaseReceiveGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.PurchaseReceiveGrid',
    store: storePurchaseReceiveGrid,
    loadMask: true,
    columns: [{
            dataIndex: 'purchase_receipt_id',
            hidden: true,
            header: 'purchase_receipt_id'
        },{
            dataIndex: 'purchase_id',
            hidden: true,
            header: 'purchase_id'
        },{
            header: 'No Penerimaan',
            dataIndex: 'purchase_receipt_no',
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
        },{
            header: 'Status Penerimaan',
            // hidden:true,
            dataIndex: 'status_purchase_receipt',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'center',
            renderer: function(value) {
                return customColumnStatus(ArrPurchaseReceiptStatus, value);
            }
        },{
            header: 'Memo',
            dataIndex: 'memo',
            minWidth: 250
        },
        {
            header: 'Tgl Beli',
            dataIndex: 'date_purchase',
            minWidth: 150
        },{
            header: 'Tgl Penerimaan',
            dataIndex: 'receipt_date',
            minWidth: 150
        },
        {
            header: 'Total Qty Terima',
            dataIndex: 'total_qty_received',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Total Penerimaan',
            dataIndex: 'total_received',
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
                    id: 'startdate_grdporeceipt',
                    format: 'd/m/Y',
                    // value: datenow(),
                    fieldLabel: 'Periode',
                },
                ' to ',
                {
                    xtype: 'datefield',
                    id: 'enddate_grdporeceipt',
                    format: 'd/m/Y',
                    // value: datenow(),
                    hideLabel: true
                    // fieldLabel: 'Date Order',
                },
                // {
                //     xtype: 'comboxunit',
                //     hidden:true,
                //     id: 'idunit_grdpoReceive',
                // },
                {
                    text: 'Search',
                    handler: function() {
                        storePurchaseReceiveGrid.load();
                    }
                },
                {
                    text: 'Clear Filter',
                    handler: function() {
                        Ext.getCmp('startdate_grdporeceipt').setValue();
                        Ext.getCmp('enddate_grdporeceipt').setValue();
                        storePurchaseReceiveGrid.load();
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
            // {
            //     text: 'Buat Baru',
            //     iconCls: 'add-icon',
            //     handler: function() {
            //        create_new_purchase_Receive()
            //     }
            // }, 
            {
                text: 'Cetak',
                // hidden:true,
                iconCls: 'print-icon',
                handler: function() {
                    var grid = Ext.getCmp('PurchaseReceiveGridID');
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var data = grid.getSelectionModel().getSelection();
                    if (data.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                    } else {

                        Ext.create('Ext.window.Window', {
                            title: 'Preview',
                            modal: true,
                            maximizable: true,
                            width: 850,
                            height: panelH - 20,
                            items: [{
                                xtype: 'component',
                                html: '<iframe src="' + SITE_URL + 'purchase/print_purchase_receipt/' + selectedRecord.data.purchase_id + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
                            }],
                            buttons: [{
                                text: 'Print',
                                iconCls: 'print-icon',
                                handler: function() {
                                    window.open(SITE_URL + 'purchase/print_purchase_receipt/' + selectedRecord.data.purchase_id + '/1', '_blank');
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
                               var grid = Ext.getCmp('PurchaseReceiveGridID');
                                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                var data = grid.getSelectionModel().getSelection();
                                // console.log(selectedRecord.data.Purchase_Receive_id)
                                Ext.Ajax.request({
                                    url: CLINIC_API  + 'Purchase/remove_purchase_receipt',
                                    method: 'POST',
                                    params: {
                                        id: selectedRecord.data.purchase_receipt_id,
                                        key: key,
                                        password:password
                                    },
                                    success: function(form, action) {
                                        var d = Ext.decode(form.responseText);
                                        Ext.Msg.alert('Informasi', d.message);
                                        storePurchaseReceiveGrid.load();
                                        Ext.getCmp('PurchasingGridID').getStore().load();
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
                xtype: 'searchPurchaseReceiveGrid',
                text: 'Left Button'
            }]
        }, {
            xtype: 'pagingtoolbar',
            store: storePurchaseReceiveGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
            // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storePurchaseReceiveGrid.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // alert('xxxxx')
            console.log(record.data)
            data_purchase_receipt_items(record.data.purchase_id,record.data.status_purchase_receipt);
        }
    }
});

function update_summary_purchace_receipt(){
    var form = Ext.getCmp('EntryPurchaseReceive').getForm();
    var store = Ext.getCmp('GridItemEntryPurchaseReceive').getStore();
    var qty_received = 0;
    var total_received = 0;
    var total_rest_qty = 0;
    
    Ext.each(store.data.items, function(obj, i) {
        console.log(obj.data.status_receipt)

        var total_per_row = obj.data.price*obj.data.qty_received;
        
        if(obj.data.receipt_status==3){
            // alert('alert')
            var rest_qty=obj.data.qty_received-obj.data.qty_received;
        }else{
            var rest_qty=obj.data.qty-obj.data.qty_received;
        }
        
        qty_received+=obj.data.qty_received*1;
        total_received+=total_per_row;
        
        total_rest_qty+=rest_qty;

        obj.set('total_received', total_per_row);
    });

    form.findField('total_qty_receive').setValue(number_format(qty_received));
    form.findField('total_rest_qty').setValue(number_format(total_rest_qty));
}

function data_purchase_receipt_items(purchase_id,status_purchase_receipt) {
    


    if (!Ext.isDefined(Ext.getCmp('windowPurchaseReceive'))) {
        var windowPurchaseReceive = Ext.create(dir_sys + 'purchasing.windowPurchaseReceive');
    } else {
        var windowPurchaseReceive = Ext.getCmp('windowPurchaseReceive');
    }

    windowPurchaseReceive.show();
    var form = Ext.getCmp('EntryPurchaseReceive').getForm();
    
    if(status_purchase_receipt==3){
        Ext.getCmp('windowPurchaseReceivesave').disable()
    }else{
        Ext.getCmp('windowPurchaseReceivesave').enable()

    }
    // data_purchase_receipt_items
    Ext.getCmp('statusform_receive').setValue('edit');
    Ext.Ajax.request({
         url:CLINIC_API  + 'purchase/data_form_receipt',
        method:'GET',
        params:{
            key:key,
            id:purchase_id,
            idunit:idunit
        },success:function(form,action){
            var d =Ext.decode(form.responseText)
            var form = Ext.getCmp('EntryPurchaseReceive').getForm();
            console.log(d)
            form.findField('receive_date').setValue(new Date());
            form.findField('purchase_id').setValue(purchase_id);
            
       
            Ext.each(d.rows,function(obj){
                console.log(obj)
                form.findField('purchase_receive_id').setValue(obj.purchase_receipt_id);
                form.findField('no_purchase_receipt').setValue(obj.no_purchase_receipt);
                form.findField('no_Purchase_order').setValue(obj.no_purchase_order);
                form.findField('date_Purchase').setValue(obj.date_purchase);
                form.findField('suppier').setValue(obj.suppier_name);
                form.findField('memo').setValue(obj.memo_receipt);
                form.findField('receive_date').setValue(obj.receipt_date);
                // total_qty_receive
           
            })
            if(d.success==true){
                

            }else{
                Ext.Msg.alert('Failed', d.message);
            }

        },failure:function(form,action){

        }
    });

    var storeGridItemEntryPurchaseReceive = Ext.getCmp('GridItemEntryPurchaseReceive').getStore();
      
    storeGridItemEntryPurchaseReceive.on('beforeload', function(store, operation) {
        operation.params = {
            'key':key,           
            'id':purchase_id,
            'idunit':idunit
        }    
    });

    storeGridItemEntryPurchaseReceive.load();

    Ext.Ajax.request({
        url:CLINIC_API  + 'purchase/data_purchase_receipt_items',
        method:'GET',
        params:{
            key:key,
            id:purchase_id,
            idunit:idunit
        },success:function(form,action){
            var d = Ext.decode(form.responseText)
            
            var items_receipt = d.rows;
            
            var qty_recepit = 0;
            var total_received = 0;
            var total_received = 0;
            var total_rest_qty = 0;
            var status_receipt = 0;
            
            Ext.each(items_receipt, function(obj, i) {
            
                var total_per_row = obj.price*obj.qty_recepit;
                // var rest_qty=obj.qty-obj.qty_recepit;
               
                total_received+=total_per_row;
                
                // total_rest_qty+=rest_qty;
                status_receipt =obj.status_receipt*1;

                if(status_receipt==2){
                    qty_recepit+=rest_qty;
                    var rest_qty=obj.qty-obj.qty_recepit;
                    total_rest_qty+=rest_qty;
                }else{
                    qty_recepit+=obj.qty_recepit*1;
                    var rest_qty=obj.qty_recepit-obj.qty_recepit;
                    total_rest_qty+=rest_qty;
                }               
                console.log(obj.qty_recepit)
                // obj.set('total_received', total_per_row);
            });


            Ext.getCmp('total_qty_receive').setValue(number_format(qty_recepit));
            Ext.getCmp('total_rest_qty').setValue(number_format(total_rest_qty));

            update_summary_purchace_receipt();
        },failure:function(form,action){

        }
    })

}