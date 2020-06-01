var wItemSalesPopupOrderPopup = Ext.create(dir_sys + 'sales2.wItemSalesPopupOrderPopup');

Ext.define('GridItemSalesOrderModel', {
    extend: 'Ext.data.Model',
    fields: ['idsalesitem', 'product_id','desc', 'product_name', 'price', 'no_barcode', 'idunit', 'no_sku', 'qty', 'disc', 'total', 'rate'],
    idProperty: 'id'
});

var storeGridItemSalesOrder = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemSalesOrderModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + '/sales/item_datas',
        actionMethods: {
           read: 'GET'   
        },
        // params:{
        //     key:key,
        //     password:password,
        //     idunit:idunit
        // },
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

storeGridItemSalesOrder.on('beforeload', function(store, operation) {
    operation.params = {
        'key':key,
        'password':password,
        'idunit':idunit,
        'sales_id':Ext.getCmp('sales_id_so').getValue(),
        // 'customer_type':Ext.getCmp('customer_type').getValue(),
        // 'startdate': Ext.getCmp('startdate_grdso').getValue(),
        // 'enddate': Ext.getCmp('enddate_grdso').getValue(),
        // 'is_order_request':Ext.getCmp('cb_sales_requisition_status').getValue()
    }
})

//end store head

Ext.define(dir_sys + 'sales2.GridItemEntrySalesOrder', {
    extend: 'Ext.grid.Panel',
    id: 'GridItemEntrySalesOrder',
    alias: 'widget.GridItemEntrySalesOrder',
    xtype: 'cell-editing',
    // title: 'Input Sales Order',
    //    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: panelW,
            height: sizeH-200,
            forceFit: true,
            plugins: [this.cellEditing],
            store: storeGridItemSalesOrder,
            columns: [{
                    header: 'idsalesitem',
                    hidden: true,
                    dataIndex: 'idsalesitem',
                    //                    id: 'idinventory'
                },{
                    header: 'product_id',
                    hidden: true,
                    dataIndex: 'product_id',
                    //                    id: 'idinventory'
                },
                {
                    header: 'idunit',
                    hidden: true,
                    dataIndex: 'idunit'
                },
                {
                    header: 'No SKU',
                    hidden:true,
                    dataIndex: 'no_sku',
                    //                    id: 'invno',
                    width: 100
                },
                {
                    header: 'Barang/Jasa',
                    dataIndex: 'product_name',
                    width: 150,
                    //                    id: 'nameinventory'
                },
                {
                    header: 'Deskripsi',
                    dataIndex: 'desc',
                    width: 150,
                    align: 'right',
                    editor: {
                        xtype: 'textfield'
                    }
                },
                {
                    header: 'Warehouse',
                    hidden: true,
                    dataIndex: 'warehouse_code',
                    editor: {
                        xtype: 'comboxWarehouse',
                        hideLabel: true,
                        valueField: 'warehouse_code',
                        displayField: 'warehouse_code',
                        labelWidth: 100
                    }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Harga',
                    dataIndex: 'price',
                    width: 150,
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 1
                    }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Qty',
                    width: 70,
                    dataIndex: 'qty',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 1
                    }
                },
                {
                    header: 'Satuan',
                    hidden:true,
                    dataIndex: 'short_desc',
                    editor: {
                        xtype: 'comboxmeasurement',
                        hideLabel: true,
                        valueField: 'short_desc',
                        displayField: 'short_desc',
                        labelWidth: 100
                    }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Disc (%)',
                    width: 70,
                    dataIndex: 'disc',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0
                    }
                },
                {
                    header: 'Pajak (%)',
                    width: 170,
                    hidden:true,
                    xtype: 'gridcolumn',
                    dataIndex: 'rate',
                    // editor: {
                    //     xtype:'comboxStatusTrx'
                    // }
                    editor: {
                        xtype: 'combobox',
                        editable: false,
                        displayField: 'nametax',
                        valueField: 'rate',
                        queryMmode: 'remote',
                        store: new Ext.data.JsonStore({
                            proxy: {
                                type: 'ajax',
                                url: SITE_URL + 'backend/combox/tax',
                                reader: {
                                    type: 'json',
                                    root: 'dat',
                                    idProperty: 'idtax'
                                }
                            },
                            autoLoad: true,
                            fields: [
                                {type: 'integer', name: 'idtax'},
                                {type: 'string', name: 'nametax'},
                                {type: 'string', name: 'rate'}
                            ]
                        })

                    }
                    // editor: {
                    //     xtype: 'comboxtaxtype',
                    //     hideLabel: true,
                    //     displayField: 'nametax',
                    //     valueField: 'idtax',
                    //     labelWidth: 40
                    // }
                }, {
                    xtype: 'numbercolumn',
                    header: 'Total',
                    dataIndex: 'total',
                    width: 150,
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
                        text: 'Tambah Barang/Jasa',
                        iconCls: 'add-icon',
                        id: 'btnAddItemSalesOrder',
                        scope: this,
                        handler: this.onAddClick
                    }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    store: storeGridItemSalesOrder, // same store GridPanel is using
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
                        // disableGridItemEntrySalesOrder();
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
                updateGridSalesOrderv3();
            }
        });

        this.on('selectCustomer', this.onSelectCustomer, this);
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    onSelectCustomer: function(data) {
        Ext.getCmp('namecustomerSalesOrder').setValue(data.namecustomer);
        Ext.getCmp('customerSalesOrder').setValue(data.idcustomer);
    },
    recordSalesOrder: function(button, event, mode) {
    },
    saveRecurr: function() {
        if (validasiSalesOrder()) {
            Ext.getCmp('formformRecc').getForm().reset();
            wformRecc.show();
        }
    },
    loadStore: function() {},
    onStoreLoad: function() {
        //        Ext.Msg.show({
        //            title: 'Store Load Callback',
        //            msg: 'store was loaded, data available for processing',
        //            icon: Ext.Msg.INFO,
        //            buttons: Ext.Msg.OK
        //        });
    },
    onAddClick: function() {
        //        console.log(Ext.getCmp('customerSalesOrder').getValue())
        //        Ext.getCmp('idaccount').setValue('sad');
        //        // Create a model instance
        //        Ext.getCmp('formAddRowJurnal').getForm().reset();
        wItemSalesPopupOrderPopup.show();
        // storeGridItemSalesPopupOrder.load();
        Ext.getCmp('GridItemSalesPopupOrderID').getStore().load();
        //        var rec = new JournalStore({
        //            idaccount: null,
        //            accname: null,
        //            accnumber: null,
        //            debit: null,
        //            credit: null
        //        });
        //
        //        this.getStore().insert(0, rec);
        //        this.cellEditing.startEditByPosition({
        //            row: 0,
        //            column: 0
        //        });
    },
    onRemoveClick: function(grid, rowIndex) {
        // this.getStore().getRange()[rowIndex].data['deleted'] = 1;
        // this.getStore().clearFilter();
        // this.getStore().filter([function(item) { return item.get('deleted') != "1" }]);
        this.getStore().removeAt(rowIndex);
        updateGridSalesOrderv3()
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});