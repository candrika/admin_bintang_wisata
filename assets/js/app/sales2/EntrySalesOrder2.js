Ext.define('GridItemSalesOrderModel', {
    extend: 'Ext.data.Model',
    fields: ['idsalesitem', 'idinventory', 'invno', 'nameinventory', 'cost', 'sellingprice', 'qtystock', 'idunit', 'assetaccount', 'brand_name', 'sku_no', 'price', 'qty', 'total', 'ratetax', 'disc', 'short_desc', 'sku_no', 'size', 'warehouse_code', 'size_measurement', 'deleted'],
    idProperty: 'id'
});

var storeGridItemSalesOrder = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemSalesOrderModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ItemSalesOrder/sales',
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

//end store head

var wItemSalesPopupOrderPopup = Ext.create(dir_sys + 'sales2.wItemSalesPopupOrderPopup');
var wCustomerSalesPopupOrderPopup = Ext.create(dir_sys + 'sales2.wCustomerSalesPopupOrderPopup');

// load_js_file('sales/GridSalesmanSOPopup.js');

// Ext.require([
//     dir_sys + 'sales2.GridSalesmanSOPopup'
// ]);

Ext.define(dir_sys + 'sales2.EntrySalesOrder2', {
    extend: 'Ext.grid.Panel',
    id: 'EntrySalesOrder2',
    alias: 'widget.EntrySalesOrder2',
    xtype: 'cell-editing',
    // title: 'Input Sales Order',
    //    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: panelW,
            height: sizeH,
            forceFit: true,
            plugins: [this.cellEditing],
            store: storeGridItemSalesOrder,
            columns: [{
                    header: 'idinventory',
                    hidden: true,
                    dataIndex: 'idinventory',
                    //                    id: 'idinventory'
                },
                {
                    header: 'idunit',
                    hidden: true,
                    dataIndex: 'idunit'
                },
                {
                    header: 'assetaccount',
                    hidden: true,
                    dataIndex: 'assetaccount'
                },
                {
                    header: 'No SKU',
                    dataIndex: 'sku_no',
                    //                    id: 'invno',
                    width: 100
                },
                {
                    header: 'Nama Barang',
                    dataIndex: 'nameinventory',
                    width: 150,
                    //                    id: 'nameinventory'
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
                }, {
                    xtype: 'numbercolumn',
                    header: 'Total',
                    dataIndex: 'total',
                    width: 150,
                    align: 'right'
                },
                {
                    header: 'Pajak',
                    hidden: true,
                    //                    width:50,
                    dataIndex: 'ratetax',
                    editor: {
                        xtype: 'comboxtax',
                        hideLabel: true,
                        valueField: 'rate',
                        labelWidth: 40
                    }
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
                        id: 'btnAddItemSalesOrder',
                        scope: this,
                        handler: this.onAddClick
                    }, '->', {
                        xtype: 'textfield',
                        hidden: true,
                        fieldLabel: 'No Invoice',
                        name: 'noinvoice',
                        id: 'noinvoiceSalesOrder'
                    }]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                            xtype: 'textfield',
                            labelWidth: 120,
                            id: 'nojurnalSalesOrder',
                            fieldLabel: 'NO SO #',
                            readOnly: true,
                            emptyText: 'Autogenerate',
                            // listeners: {
                            //     render: function(component) {
                            //         component.getEl().on('click', function(event, el) {
                            //             setNoArticle(idunit, 'idsales', 'no_sales_order', 'sales', 'nojurnalSalesOrder', 'SO');
                            //             // insertNoID(4, Ext.getCmp('cbUnitEntrySalesOrder2').getValue(), 'idsales', 'sales', 'nojurnalSalesOrder', 'SO');
                            //             // insertNoRef(4, Ext.getCmp('cbUnitEntrySalesOrder2').getValue(), 'nojurnalSalesOrder','SO');
                            //         });
                            //     }
                            // }
                        },
                        {
                            xtype: 'datefield',
                            labelWidth: 100,
                            id: 'delivery_date_SalesOrder',
                            format: 'd/m/Y',
                            fieldLabel: 'Tanggal'
                        },
                        {
                            xtype: 'comboxunit',
                            valueField: 'idunit',
                            labelWidth: 100,
                            valueField: 'idunit',
                            id: 'cbUnitEntrySalesOrder2'
                                //                            ,multiSelect:true
                        },
                        // {
                        //     xtype: 'comboxtaxtype',
                        //     labelWidth: 100,
                        //     displayField: 'nametax',
                        //     valueField: 'rate',
                        //     name: 'idtax',
                        //     id: 'cb_tax_id_so',
                        //     listeners: {
                        //         select: function(combo, record, index) {
                        //             // alert(combo.getValue()); // Return Unitad States and no USA
                        //             updateGridSalesOrder();
                        //         }
                        //     }
                        // },
                        {
                            xtype: 'checkbox',
                            boxLabel: 'Include Tax',
                            name: 'include_tax',
                            id: 'include_tax_so',
                            inputValue: 1,
                            listeners: {
                                change: function(field, newValue, oldValue, eOpts) {
                                    updateGridSalesOrder();
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                            xtype: 'hiddenfield',
                            id: 'customerSalesOrder',
                        },
                        {
                            xtype: 'textfield',
                            id: 'namecustomerSalesOrder',
                            labelWidth: 120,
                            fieldLabel: 'Customer',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        // ChooserListCustomer.target = Ext.getCmp('EntrySalesOrder2');
                                        wCustomerSalesPopupOrderPopup.show();
                                        Ext.getCmp('GridCustomerSalesPopupOrderID').getStore().load();
                                    });
                                }
                            }
                        },

                        // {
                        //     xtype: 'textfield',
                        //     fieldLabel: 'Customer',
                        //     name: 'namecustomer',
                        //     id: 'customerSalesOrder',
                        //     listeners: {
                        //         render: function(component) {
                        //             component.getEl().on('click', function(event, el) {

                        //                     wGridSupplierListPopup.show();

                        //                     storeGridSupplierList.on('beforeload',function(store, operation,eOpts){
                        //                         operation.params={
                        //                                     'idunit': Ext.getCmp('idunitRequisition').getValue(),
                        //                                     'status': '1'
                        //                         };
                        //                     });
                        //                     storeGridSupplierList.load();
                        //             });
                        //         }
                        //     }
                        // },
                        {
                            xtype: 'comboxpayment',
                            labelWidth: 100,
                            id: 'paymentSalesOrder',
                            valueField: 'idpayment'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 150,
                            id: 'totalSalesOrder',
                            fieldLabel: 'Setelah Pajak',
                            fieldStyle: 'text-align: right;'
                        },
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        '->',
                        {
                            itemId: 'recordPayment',
                            id: 'btnRecordSalesOrder',
                            text: 'Simpan',
                            iconCls: 'disk',
                            handler: Ext.bind(this.recordSalesOrder, this, 'noprint', true)
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            name: 'totalPajak',
                            readOnly: true,
                            labelWidth: 150,
                            id: 'totalPajakSalesOrder',
                            fieldLabel: 'Pajak',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 150,
                            id: 'dppSalesOrder',
                            fieldLabel: 'Dasar Pengenaan Pajak',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'ddaysSalesOrder',
                            name: 'ddays',
                            width: 120,
                            inputWidth: 60,
                            afterSubTpl: ' days',
                            maskRe: /[0-9]/,
                            hidden: true,
                            disabled: true,
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        if (!Number.isNaN(parseInt(this.getValue())))
                                            this.setValue(parseInt(this.getValue()));
                                        else
                                            this.setValue(0);
                                    }, c)

                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: 'eomddaysSalesOrder',
                            name: 'eomddays',
                            width: 180,
                            inputWidth: 60,
                            beforeSubTpl: 'EOM ',
                            afterSubTpl: ' days',
                            maskRe: /[0-9]/,
                            hidden: true,
                            disabled: true,
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        if (!Number.isNaN(parseInt(this.getValue())))
                                            this.setValue(parseInt(this.getValue()));
                                        else
                                            this.setValue(0);
                                    }, c)

                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: 'percentagediscSalesOrder',
                            name: 'percentagedisc',
                            width: 90,
                            inputWidth: 60,
                            afterSubTpl: ' % /',
                            maskRe: /[0-9.]/,
                            hidden: true,
                            disabled: true,
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        if (this.getValue().substr(-1) == ".")
                                            return true;

                                        if (!Number.isNaN(parseFloat(this.getValue())))
                                            this.setValue(parseFloat(this.getValue()));
                                        else
                                            this.setValue(0);
                                    }, c)

                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: 'daysdiscSalesOrder',
                            name: 'daydisc',
                            width: 120,
                            inputWidth: 60,
                            maskRe: /[0-9]/,
                            hidden: true,
                            disabled: true,
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        if (!Number.isNaN(parseInt(this.getValue())))
                                            this.setValue(parseInt(this.getValue()));
                                        else
                                            this.setValue(0);
                                    }, c)

                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: 'dmaxSalesOrder',
                            name: 'dmax',
                            labelWidth: 50,
                            inputWidth: 60,
                            fieldLabel: 'NET ',
                            maskRe: /[0-9]/,
                            hidden: true,
                            disabled: true,
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        if (!Number.isNaN(parseInt(this.getValue())))
                                            this.setValue(parseInt(this.getValue()));
                                        else
                                            this.setValue(0);
                                    }, c)

                                }
                            }
                        },
                        '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 150,
                            id: 'diskonSalesOrder',
                            fieldLabel: 'Diskon',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 150,
                            id: 'subtotalSalesOrder',
                            fieldLabel: 'Subtotal',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },

            ],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {},
                render: {
                    scope: this,
                    fn: function(grid) {
                        // disableEntrySalesOrder2();
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
                updateGridSalesOrder('general');
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
        // console.log(Ext.getCmp('idaccountSalesOrder').getValue())
        if (validasiSalesOrder()) {
            storeGridItemSalesOrder.clearFilter();
            var json = Ext.encode(Ext.pluck(storeGridItemSalesOrder.data.items, 'data'));
            //            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitEntrySalesOrder2').getValue());
            storeGridItemSalesOrder.filter([function(item) { return item.get('deleted') != "1" }]);

            Ext.Ajax.request({
                url: SITE_URL + 'sales/saveSalesOrder',
                method: 'POST',
                params: {
                    statusform: Ext.getCmp('statusformSalesOrderGrid').getValue(),
                    idsales: Ext.getCmp('idsales_order').getValue(),
                    idsales_quote: Ext.getCmp('id_sales_quote_SalesOrder').getValue(),
                    salesman_id: Ext.getCmp('salesman_id_so').getValue(),
                    customerSalesOrder: Ext.getCmp('customerSalesOrder').getValue(),
                    delivery_date: Ext.getCmp('delivery_date_SalesOrder').getValue(),
                    shipaddress: Ext.getCmp('shipaddressSalesOrder').getValue(),
                    idpayment: Ext.getCmp('comboxpaymentSalesOrder').getValue(),
                    ddays: Ext.getCmp('ddaysSalesOrder').getValue(),
                    eomddays: Ext.getCmp('eomddaysSalesOrder').getValue(),
                    percentagedisc: Ext.getCmp('percentagediscSalesOrder').getValue(),
                    daydisc: Ext.getCmp('daysdiscSalesOrder').getValue(),
                    dmax: Ext.getCmp('dmaxSalesOrder').getValue(),

                    nojurnalSalesOrder: Ext.getCmp('nojurnalSalesOrder').getValue(),
                    memoSalesOrder: Ext.getCmp('memoSalesOrder').getValue(),
                    unit: Ext.getCmp('cbUnitEntrySalesOrder2').getValue(),
                    customerSalesOrder: Ext.getCmp('customerSalesOrder').getValue(),
                    include_tax: Ext.getCmp('include_tax_so').getValue(),
                    sales_order_status: Ext.getCmp('cb_sales_order_status').getValue(),

                    subtotalSalesOrder: Ext.getCmp('subtotalSalesOrder').getValue(),
                    discSalesOrder: Ext.getCmp('diskonSalesOrder').getValue(),
                    dppSalesOrder: Ext.getCmp('dppSalesOrder').getValue(),
                    freight: Ext.getCmp('freightSalesOrder').getValue(),
                    totalPajak: Ext.getCmp('totalPajakSalesOrder').getValue(),
                    totalSalesOrder: Ext.getCmp('totalSalesOrder').getValue(),
                    // ratetax: Ext.getCmp('cb_tax_id_so').getValue(),
                    datagrid: json
                },
                success: function(form, action) {

                    var d = Ext.decode(form.responseText);
                    if (!d.success) {
                        Ext.Msg.alert('Peringatan', d.message);
                    } else {
                        Ext.Msg.alert('Success', d.message);
                        clearFormSO();
                        updateGridSalesOrder('general');
                        Ext.getCmp('windowPopupSalesOrderGrid').hide();
                        Ext.getCmp('GridSalesOrderGridID').getStore().load();
                    }

                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }


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
        this.getStore().getRange()[rowIndex].data['deleted'] = 1;
        this.getStore().clearFilter();
        this.getStore().filter([function(item) { return item.get('deleted') != "1" }]);
        // this.getStore().removeAt(rowIndex);
        updateGridSalesOrder('general')
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});

// function updateGridSalesOrder(tipe) {
//     console.log('update run');
//     var addprefix = 'SalesOrder';

//     var subtotalSalesOrder = 0 * 1;
//     var dppSalesOrder = 0 * 1;
//     var totalSalesOrder = 0 * 1;
//     var totalPajak = 0 * 1;
//     var angkutSalesOrder = str_replace(",", "", Ext.getCmp('freightSalesOrder').getValue()) * 1;
//     // var pembayaranSalesOrder = Ext.getCmp('pembayaranSalesOrder').getValue();
//     var sisaBayarSalesOrder = 0 * 1;
//     var taxrate = Ext.getCmp('cb_tax_id_so').getValue() * 1;
//     var isIncludeTax = Ext.getCmp('include_tax_so').getValue() * 1;
//     var total_diskon = 0;

//     Ext.each(storeGridItemSalesOrder.data.items, function(obj, i) {
//         var total = obj.data.qty * (obj.data.price * obj.data.size);
//         var diskon = (total / 100) * obj.data.disc;
//         total_diskon += diskon;

//         var net = total - diskon;
//         console.log(total + ' - ' + diskon);

//         subtotalSalesOrder += net;
//         // totalPajak += (net / 100) * (taxrate * 1);
//         obj.set('ratetax', taxrate);
//         obj.set('total', net);
//     });

//     dppSalesOrder = isIncludeTax ? (subtotalSalesOrder + total_diskon) / 1.1 : subtotalSalesOrder;
//     totalPajak += (dppSalesOrder) * (taxrate * 1 / 100);
//     totalSalesOrder = dppSalesOrder + totalPajak + angkutSalesOrder;

//     // var dppPurchaseOrder = (subtotalSalesOrder + total_diskon) / 1.1;
//     // totalPajak = dppPurchaseOrder * (taxrate * 1 / 100);
//     // //     console.log(subtotalSalesOrder);
//     // totalSalesOrder = subtotalSalesOrder;
//     // //     console.log(totalSalesOrder+' '+totalPajak);
//     // if (include_tax * 1 != 1) {
//     //     //include tax
//     //     totalSalesOrder = dppPurchaseOrder;
//     // } else {
//     //     totalSalesOrder = dppPurchaseOrder + totalPajak;
//     // }
//     // console.log(angkutSalesOrder);
//     // console.log(totalSalesOrder);

//     // totalSalesOrder = totalSalesOrder + angkutSalesOrder * 1;
//     // console.log(totalSalesOrder);

//     //     console.log(totalSalesOrder);
//     // sisaBayarSalesOrder = totalSalesOrder - pembayaranSalesOrder;
//     // alert(totalPajak);
//     Ext.getCmp('subtotal' + addprefix).setValue(subtotalSalesOrder.toLocaleString('null', { maximumFractionDigits: 2 }));
//     Ext.getCmp('total' + addprefix).setValue(totalSalesOrder.toLocaleString('null', { maximumFractionDigits: 2 }));
//     Ext.getCmp('totalPajak' + addprefix).setValue(totalPajak.toLocaleString('null', { maximumFractionDigits: 2 }));
//     Ext.getCmp('diskonSalesOrder').setValue(total_diskon.toLocaleString('null', { maximumFractionDigits: 2 }));
//     Ext.getCmp('dppSalesOrder').setValue(dppSalesOrder.toLocaleString('null', { maximumFractionDigits: 2 }));
//     // Ext.getCmp('pembayaran').setValue(pembayaranSalesOrder.toLocaleString('null', {minimumFractionDigits: 2}));
//     // Ext.getCmp('sisaBayarSalesOrder').setValue(sisaBayarSalesOrder.toLocaleString('null', {minimumFractionDigits: 2}));

// }

// function validasiSalesOrder() {
//     //    alert(Ext.getCmp('comboxcurrencySalesOrder').getValue());   

//     // if (Ext.getCmp('nojurnalSalesOrder').getValue() == null) {
//     //     Ext.Msg.alert('Failed', 'Tentukan No SO #');
//     // } else 
//     if (Ext.getCmp('delivery_date_SalesOrder').getValue() == null) {
//         Ext.Msg.alert('Failed', 'Masukkan tanggal Delivery Date');
//     } else if (Ext.getCmp('cb_tax_id_so').getValue() == null) {
//         Ext.Msg.alert('Failed', 'Tentukan Jenis Pajak');
//     } else if (Ext.getCmp('customerSalesOrder').getValue() == null || Ext.getCmp('customerSalesOrder').getValue() == '') {
//         Ext.Msg.alert('Failed', 'Tentukan konsumen');
//     } else if (Ext.getCmp('shipaddressSalesOrder').getValue() == null) {
//         Ext.Msg.alert('Failed', 'Tentukan Alamat Pengiriman');
//     } else if (Ext.getCmp('memoSalesOrder').getValue() == null) {
//         Ext.Msg.alert('Failed', 'Masukkan memo Sales Order');
//     } else if (Ext.getCmp('EntrySalesOrder2').getStore().getRange().length == 0) {
//         Ext.Msg.alert('Failed', 'Msukkan barang terlebih dahulu');
//     } else {
//         return true;
//     }
// }