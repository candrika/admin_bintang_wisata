var wItemPurchasePopupOrderPopup = Ext.create(dir_sys + 'purchasing.wItemPurchasePopupOrderPopup');

Ext.define('GridItemEntryPurchaseOrderModel', {
    extend: 'Ext.data.Model',
    fields: ['purchase_item_id','purchase_id', 'product_id','desc', 'product_name', 'price', 'no_barcode', 'idunit', 'no_sku', 'qty', 'disc', 'total', 'rate'],
    idProperty: 'id'
});

var storeGridItemEntryPurchaseOrder = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemEntryPurchaseOrderModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API  + 'purchase/purchase_item',
        actionMethods:{read:'GET'},
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

storeGridItemEntryPurchaseOrder.on('beforeload', function(store, operation) {
    operation.params = {
        'key':key,
        'password':password,
        'idunit':idunit,
        'id':Ext.getCmp('purchase_id_po').getValue()
        // 'status':Ext.getCmp('purchase_status').getValue(),
        // 'startdate': Ext.getCmp('startdate_grdpo').getValue(),
        // 'enddate': Ext.getCmp('enddate_grdpo').getValue(),
    }    
});

Ext.define(dir_sys + 'purchasing.GridItemEntryPurchaseOrder', {
    extend: 'Ext.grid.Panel',
    id: 'GridItemEntryPurchaseOrder',
    alias: 'widget.GridItemEntryPurchaseOrder',
    xtype: 'cell-editing',
    // title: 'Input Purchases Order',
    //    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: panelW,
            height: sizeH-300,
            forceFit: true,
            plugins: [this.cellEditing],
            store: storeGridItemEntryPurchaseOrder,
            columns: [{
                    header: 'purchase_item_id',
                    hidden: true,
                    dataIndex: 'purchase_item_id',
                    //                    id: 'idinventory'
                },{
                    header: 'purchase_id',
                    hidden: true,
                    dataIndex: 'purchase_id',
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
                    header: 'Nama Barang',
                    dataIndex: 'product_name',
                    width: 150,
                    //                    id: 'nameinventory'
                },
                {
                    header: 'Deskripsi',
                    dataIndex: 'desc',
                    width: 150,
                    // align: 'right',
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
                        minValue: 1,
                        handler:this.edit
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
                // {
                //     header: 'Pajak (%)',
                //     width: 170,
                //     // hidden:true,
                //     xtype: 'gridcolumn',
                //     dataIndex: 'rate',
                //     // editor: {
                //     //     xtype:'comboxStatusTrx'
                //     // }
                //     editor: {
                //         xtype: 'combobox',
                //         editable: false,
                //         displayField: 'nametax',
                //         valueField: 'rate',
                //         queryMmode: 'remote',
                //         store: new Ext.data.JsonStore({
                //             proxy: {
                //                 type: 'ajax',
                //                 url: SITE_URL + 'backend/combox/tax',
                //                 reader: {
                //                     type: 'json',
                //                     root: 'dat',
                //                     idProperty: 'idtax'
                //                 }
                //             },
                //             autoLoad: true,
                //             fields: [
                //                 {type: 'integer', name: 'idtax'},
                //                 {type: 'string', name: 'nametax'},
                //                 {type: 'string', name: 'rate'}
                //             ]
                //         })

                //     }
                    // editor: {
                    //     xtype: 'comboxtaxtype',
                    //     hideLabel: true,
                    //     displayField: 'nametax',
                    //     valueField: 'idtax',
                    //     labelWidth: 40
                    // }
                // }, 
                {
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
                        text: 'Tambah Barang',
                        iconCls: 'add-icon',
                        id: 'btnAddItemPurchaseOrder',
                        scope: this,
                        handler: this.onAddClick
                    }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    store: storeGridItemEntryPurchaseOrder, // same store GridPanel is using
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
                        // disableGridItemEntryPurchaseOrder();
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
                updateGridPurchaseOrderv3();
            }
        });

        this.on('selectCustomer', this.onSelectCustomer, this);
    },
    onAfterEdit: function(o) {
        // handle after edit
        // updateGridPurchaseOrderv3();
        console.log('after edit');
    },
    onSelectCustomer: function(data) {
        Ext.getCmp('namecustomerPurchasesOrder').setValue(data.namecustomer);
        Ext.getCmp('customerPurchasesOrder').setValue(data.idcustomer);
    },
    recordPurchasesOrder: function(button, event, mode) {
    },
    saveRecurr: function() {
        if (validasiPurchasesOrder()) {
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
        //        console.log(Ext.getCmp('customerPurchasesOrder').getValue())
        //        Ext.getCmp('idaccount').setValue('sad');
        //        // Create a model instance
        //        Ext.getCmp('formAddRowJurnal').getForm().reset();
        wItemPurchasePopupOrderPopup.show();
        // storeGridItemPurchasesPopupOrder.load();
        Ext.getCmp('GridItemPurchasePopupOrderID').getStore().load();
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
        updateGridPurchaseOrderv3()
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});

// function updateGridPurchaseOrderv3() {

//     var angkutPurchaseOrder = str_replace(",", "", Ext.getCmp('freightPurchaseOrder').getValue()) * 1;
//     var isIncludeTax = Ext.getCmp('include_tax_po').getValue() * 1;

//     var storeGridItemPurchaseOrder = Ext.getCmp('GridItemEntryPurchaseOrder').getStore();
//     storeGridItemPurchaseOrder.clearFilter();
//     var json = Ext.encode(Ext.pluck(storeGridItemPurchaseOrder.data.items, 'data'));

//     Ext.each(storeGridItemPurchaseOrder.data.items, function(obj, i) {
//         var total = obj.data.qty * (obj.data.price);
//         var diskon = (total / 100) * obj.data.disc;
//         var tax = total*(obj.data.rate*1/100);

//         if(isIncludeTax){
//             //include tax
//             var total_per_row = (total - diskon);
//         } else {
//             var total_per_row = (total - diskon)+tax;
//         }

//        obj.set('total', total_per_row);
//     });

//     //calculate summary footer at backend
//     Ext.Ajax.request({
//         url: CLINIC_API  + 'Purchase/summary_purchase_inv',
//         method: 'POST',
//         params: {
//             include_tax: isIncludeTax,
//             shipping_cost: angkutPurchaseOrder,
//             Purchase_item: json,
//              tax_id:Ext.getCmp('cb_tax_id_po').getValue()*1,
//             key: key
//         },
//         success: function(form, action) {
//             var d = Ext.decode(form.responseText);
//             Ext.getCmp('subtotalPurchaseOrder').setValue(number_format(d.sub_total)); 

//              Ext.getCmp('diskonPurchaseOrder').setValue(number_format(d.total_disc));

//             // var total = (subtotalPurchaseOrder-total_diskon)+angkutPurchaseOrder;
//             Ext.getCmp('totalPurchaseOrder_1').setValue(number_format(d.total)); //total


//             Ext.getCmp('totalPajakPurchaseOrder').setValue(number_format(Math.ceil(d.total_tax)));

//             Ext.getCmp('totalPurchaseOrder').setValue(number_format(d.grand_total));
//         },
//         failure: function(form, action) {
//             Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//         }
//     });

// }