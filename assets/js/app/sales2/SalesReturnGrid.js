
Ext.define('SalesReturnGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        "sales_return_id","sales_id","status","memo","date_return","total_qty_return","total_amount_return","datein","userin","no_return","idunit","noinvoice","no_sales_order","date_sales","buyer_name"
    ],
    idProperty: 'id'
});
var storeSalesReturnGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'SalesReturnGridModel',
    remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + '/sales/return_datas',
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

storeSalesReturnGrid.on('beforeload', function(store, operation) {
    operation.params = {
        'key':key,
        'password':password,
        'idunit':idunit,
        'startdate': Ext.getCmp('startdate_grdsoreturn').getValue(),
        'enddate': Ext.getCmp('enddate_grdsoreturn').getValue(),
    }
})



Ext.define('MY.searchSalesReturnGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchSalesReturnGrid',
    store: storeSalesReturnGrid,
    width: 180
});
var smSalesReturnGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smSalesReturnGrid.getSelection().length;
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
Ext.define(dir_sys + 'sales2.SalesReturnGrid', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smSalesReturnGrid,
    title: 'Retur',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'SalesReturnGridID',
    id: 'SalesReturnGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.SalesReturnGrid',
    store: storeSalesReturnGrid,
    loadMask: true,
    columns: [{
            dataIndex: 'sales_return_id',
            hidden: true,
            header: 'sales_return_id'
        },{
            header: 'No Retur',
            dataIndex: 'no_return',
            minWidth: 150
        }, {
            header: 'No Order',
            dataIndex: 'no_sales_order',
            minWidth: 150
        },{
            header: 'Pembeli',
            flex: 1,
            dataIndex: 'buyer_name',
            minWidth: 150
        },  {
            header: 'Memo',
            dataIndex: 'memo',
            minWidth: 250
        },
        {
            header: 'Tgl Penjualan',
            dataIndex: 'date_sales',
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
                    id: 'startdate_grdsoreturn',
                    format: 'd/m/Y',
                    // value: datenow(),
                    fieldLabel: 'Periode',
                },
                ' to ',
                {
                    xtype: 'datefield',
                    id: 'enddate_grdsoreturn',
                    format: 'd/m/Y',
                    // value: datenow(),
                    hideLabel: true
                    // fieldLabel: 'Date Order',
                },
                {
                    xtype: 'comboxunit',
                    hidden:true,
                    id: 'idunit_grdsoreturn',
                },
                {
                    text: 'Search',
                    handler: function() {
                        storeSalesReturnGrid.load();
                    }
                },
                {
                    text: 'Clear Filter',
                    handler: function() {
                        Ext.getCmp('startdate_grdsoreturn').setValue();
                        Ext.getCmp('enddate_grdsoreturn').setValue();
                        // Ext.getCmp('idunit_grdsoreturn').setValue();
                        // Ext.getCmp('idcustomer_grdsoreturn').setValue();
                        // Ext.getCmp('namepayment_grdsoreturn').setValue();
                        // Ext.getCmp('status_grdsoreturn').setValue();
                        storeSalesReturnGrid.load();
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
                   create_new_sales_return()
                }
            }, {
                text: 'Cetak',
                hidden:true,
                iconCls: 'print-icon',
                handler: function() {
                    var grid = Ext.getCmp('SalesReturnGridID');
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var data = grid.getSelectionModel().getSelection();
                    if (data.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                    } else {

                        Ext.create('Ext.window.Window', {
                            title: 'Preview',
                            modal: true,
                            width: panelW - 100,
                            height: panelH - 200,
                            items: [{
                                xtype: 'component',
                                html: '<iframe src="' + SITE_URL + 'sales/print_so/' + selectedRecord.data.idsales + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
                            }],
                            buttons: [{
                                text: 'Print',
                                iconCls: 'print-icon',
                                handler: function() {
                                    window.open(SITE_URL + 'sales/print_so/' + selectedRecord.data.idsales + '/print', '_blank');
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
                               var grid = Ext.getCmp('SalesReturnGridID');
                                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                var data = grid.getSelectionModel().getSelection();
                                // console.log(selectedRecord.data.sales_return_id)
                                Ext.Ajax.request({
                                    url: CLINIC_API + 'sales/remove_return',
                                    // method: 'DELETE',
                                    method: 'POST',
                                    params: {
                                        id: selectedRecord.data.sales_return_id,
                                        key: key,
                                        password:password,
                                        idunit:idunit,
                                        user_id:userid
                                    },
                                    success: function(form, action) {
                                        var d = Ext.decode(form.responseText);
                                        Ext.Msg.alert('Informasi', d.message);
                                        storeSalesReturnGrid.load();
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
                xtype: 'searchSalesReturnGrid',
                text: 'Left Button'
            }]
        }, {
            xtype: 'pagingtoolbar',
            store: storeSalesReturnGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
            // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeSalesReturnGrid.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            view_sales_return(record.data.sales_return_id);
        }
    }
});

function view_sales_return(id){
     if (!Ext.isDefined(Ext.getCmp('windowSalesReturn'))) {
        var windowSalesReturn = Ext.create(dir_sys + 'sales2.windowSalesReturn');
    } else {
        var windowSalesReturn = Ext.getCmp('windowSalesReturn');
    }

    windowSalesReturn.show();

    var form = Ext.getCmp('EntrySalesReturn').getForm();
    form.reset();
   
    //load data to form
    form.load({
        url: CLINIC_API + 'sales/return_data',
        method: 'GET',
        params: {
            id: id,
            key: key
        },
        success: function(form, action) {
            var d = Ext.decode(action.response.responseText);
            console.log(d)

           load_sales_return_item_data(id) //load item to grid

           if(d.data.due_date==null){
                form.findField('due_date').hide();
            } else {
                form.findField('due_date').show();
                form.findField('due_date').setValue(d.data.due_date);
            }

            if(d.data.include_tax==null){
                form.findField('include_tax').hide();
            } else {
                form.findField('include_tax').show();
                if(d.data.include_tax=='1'){
                    form.findField('include_tax').setValue('Ya');
                } else {
                    form.findField('include_tax').setValue('Tidak');
                }
            }

            if(d.data.customer_type=='1'){
                form.findField('customer_name_so').setValue(d.data.member_name);
            } else {
                form.findField('customer_name_so').setValue(d.data.namecustomer);
            }
            
        },
        failure: function(form, action) {
            Ext.Msg.alert("Load failed", action.result.errorMessage);
        }
    });
}

function load_sales_return_item_data(id){
    Ext.define('GridItemSalesReturnModel', {
        extend: 'Ext.data.Model',
        fields: ['sales_return_item_id','idsalesitem', 'product_id','desc', 'qty','product_name', 'price', 'no_barcode', 'idunit', 'no_sku', 'qty_sale', 'disc', 'total', 'rate','qty_retur','total_return','notes'],
        idProperty: 'id'
    });

    var grid = Ext.getCmp('GridItemEntrySalesReturn');
    grid.getStore().removeAll();

    Ext.Ajax.request({
        url: CLINIC_API + 'sales/item_return_datas',
        method: 'GET',
        params: {
            id: id,
            key: key
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            console.log(d)
            Ext.each(d.rows, function(obj, i) {
                var rec = new GridItemSalesReturnModel({
                        sales_return_item_id: obj.sales_return_item_id*1,
                        idsalesitem: obj.sales_item_id*1,
                        product_id: obj.product_id*1,
                        no_sku: obj.no_sku,
                        product_name: obj.product_name,
                        price:obj.price*1,
                        desc: obj.description,
                        total: obj.total*1,
                        qty_sale: obj.qty_sale*1,
                        qty_retur: obj.qty_retur*1,
                        total_return:obj.total_amount_return*1,
                        notes:obj.notes
                });

                grid.getStore().insert(i, rec);
            });

            update_summary_salesreturn();
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });

}

