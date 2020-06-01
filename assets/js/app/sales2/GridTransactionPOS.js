var windowBuyerPOS = Ext.create(dir_sys + 'sales2.windowBuyerPOS');
var WindowPopUpDiscount = Ext.create(dir_sys + 'sales2.WindowPopUpDiscount');
var WindowPopUpAdditionalFee = Ext.create(dir_sys + 'sales2.WindowPopUpAdditionalFee');

Ext.define('GridTransactionPOSModel', {
    extend: 'Ext.data.Model',
    fields: ['product_id', 'product_name', 'price','retail_price_member', 'qty', 'disc', 'total'],
    idProperty: 'id'
});

var storeGridTransactionPOS = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridTransactionPOSModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        // url: SITE_URL + 'backend/ext_get_all/jurnalitem/money',
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



Ext.define('MY.searchGridTransactionPOS', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridTransactionPOS',
    store: storeGridTransactionPOS,
    width: 180
});

var smGridTransactionPOS = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'MULTI',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridTransactionPOS.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('prosesGridTransactionPOS').disable();
            }
        },
        select: function(model, record, index) {
            // console.log(selectedLen);
            Ext.getCmp('prosesGridTransactionPOS').enable();
        }
    }
});

Ext.define(dir_sys + 'sales2.GridTransactionPOS', {
    // title: 'Transaksi',
    alias: 'widget.GridTransactionPOS',
    itemId: 'GridTransactionPOSID',
    id: 'GridTransactionPOSID',
    // height:windowH-370,
    extend: 'Ext.grid.Panel',
    xtype: 'cell-editing',
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            // height: 666 - 250,
            // width: (panelW/2)-100,
            // height: sizeH,
            // height:sizeH-30,
            // minHeight:sizeH-300,
            forceFit: true,
            plugins: [this.cellEditing],
            store: storeGridTransactionPOS,
            viewConfig: {
                markDirty: false
            },
            columns: [{
                    header: 'product_id',
                    dataIndex: 'product_id',
                    hidden: true
                },
                {
                    header: 'Nama Produk',
                    dataIndex: 'product_name',
                    minWidth: 120,
                    flex: 1
                },
                {
                    header: 'Qty',
                    dataIndex: 'qty',
                    xtype: 'numbercolumn',
                    align: 'right',
                    width: 60,
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 1
                    }
                },
                {header: 'Price', dataIndex: 'price',  xtype:'numbercolumn', align:'right', minWidth: 125, hidden:true},
                {header: 'Member Price', dataIndex: 'retail_price_member',  xtype:'numbercolumn', align:'right', minWidth: 125, hidden:true},
                {header: 'Diskon', dataIndex: 'disc',  xtype:'numbercolumn', align:'right', minWidth: 125},            
                {
                    header: 'Total',
                    dataIndex: 'total',
                    xtype: 'numbercolumn',
                    align: 'right',
                    minWidth: 125
                },
                {
                    text: 'Hapus',
                    width: 65,
                    xtype: 'actioncolumn',
                    tooltip: 'Hapus',
                    align: 'center',
                    icon: BASE_URL + 'assets/icons/fam/cancel.png',
                    handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                        storeGridTransactionPOS.removeAt(rowIndex);
                        update_pos_footer();
                    }
                },
            ],
            selModel: {
                selType: 'cellmodel'
            },
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {

                },
                render: {
                    scope: this,
                    fn: function(grid) {
                        // disableEntrySalesOrder();
                    }
                }
            },
            dockedItems: [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                items: [  
                    {
                        xtype: 'displayfield',
                        id:'footer_subtotal_pos',
                        fieldLabel: 'Subtotal',
                        labelWidth:80,
                        width:197,
                        value:0
                    },                                          
                     {
                        xtype: 'displayfield',
                        id:'footer_discount_pos',
                        fieldLabel: 'Total Diskon',
                        width:197,
                        labelWidth:80,
                        value:0
                    }
                ]
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    '->',
                     {
                        xtype: 'displayfield',
                        labelWidth: 200,
                        value:0,
                        width:380,
                        name: 'grandtotal',
                        fieldLabel: 'Grand Total',
                        fieldStyle: 'text-align: right;',
                        labelCls: 'biggertext',
                        fieldCls:'biggertext'
                    }
                ]
            },
             {
                xtype: 'toolbar',
                hidden:true,
                dock: 'top',
                items: [
                                            
                     {
                        text: 'Tambah Biaya',
                        width:107,
                        handler: function() {
                           WindowPopUpAdditionalFee.show();
                        }
                    }, 
                    {
                        text: 'Hapus',
                        handler: function() {
                            Ext.getCmp('other_fee_amount_poswindow').setValue(0);
                            update_pos_footer();
                            set_member_buyer_pos();
                        }
                    },  
                    '->',
                     {
                        xtype: 'displayfield',
                        labelWidth: 200,
                        value:0,
                        width:370,
                        id:'other_fee_amount_poswindow',
                        name: 'other_fee',
                        fieldLabel: 'Biaya Lain',
                        fieldStyle: 'text-align: right;',
                        // listeners: {
                        //         'render': function(c) {
                        //             c.getEl().on('keyup', function() {
                        //                  this.setRawValue(renderNomor(this.getValue()));
                        //                     update_pos_footer();
                        //             }, c)

                        //         }
                        // }
                    },
                ]
            },
            {
                xtype: 'toolbar',
                hidden:true,
                dock: 'top',
                items: [
                    {
                        text: 'Tambah Diskon',
                        width:107,
                        handler: function() {
                            WindowPopUpDiscount.show();
                        }
                    },   
                    {
                        text: 'Hapus',
                        handler: function() {
                            Ext.getCmp('discount_amount_poswindow').setValue(0);
                            update_pos_footer();
                        }
                    },  
                    '->',
                    {
                        xtype: 'displayfield',
                        id:'discount_amount_poswindow',
                        labelWidth: 200,
                        width:370,
                        value:0,
                        name: 'total_disc',
                        fieldStyle: 'text-align: right;',
                        fieldLabel: 'Diskon',
                        // listeners: {
                        //         'render': function(c) {
                        //             c.getEl().on('keyup', function() {
                        //                  this.setRawValue(renderNomor(this.getValue()));
                        //                     update_pos_footer();
                        //             }, c)

                        //         }
                        // }
                    }
                ]
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                hidden:true,
                items: [
                    '->',
                    {
                        xtype: 'displayfield',
                        labelWidth: 200,
                        value:0,
                        width:370,
                        // id: 'df_subtotal',
                        readOnly:true,
                        name: 'subtotal',
                        fieldLabel: 'Subtotal',
                        fieldStyle: 'text-align: right;'
                    },
                ]
            },
            
            
            {
                xtype: 'toolbar',
                // hidden:true,
                dock: 'top',
                items: [
                    {
                        xtype: 'textfield',
                        width:350,
                        fieldLabel: 'Pembeli',
                        labelWidth: 100,
                        name: 'no_member',
                        id: 'no_member',
                        listeners: {
                            render: function(component) {
                                component.getEl().on('click', function(event, el) {
                                    windowBuyerPOS.show();
                                    var store = Ext.getCmp('GridBuyerMemberPOS').getStore();
                                    store.on('beforeload', function(store, operation, eOpts) {
                                        operation.params = {
                                            'idunit': idunit
                                        };
                                    });
                                    store.load();

                                });
                            }
                        }
                    },{
                        text: 'Hapus',
                        handler: function() {
                            Ext.getCmp('no_member').setValue(null);
                            var form = Ext.getCmp('EntryTransactionPOS').getForm();
                            form.findField('id_member').setValue(null);
                            update_pos_footer();
                            // alert('aaaa');

                            // set_member_buyer_pos();
                        }
                    },'->'          
                    
                ]
            },
            
         
           
            // {
            //     xtype: 'pagingtoolbar',
            //     store: storeGridTransactionPOS, // same store GridPanel is using
            //     dock: 'bottom',
            //     displayInfo: true
            //     // pageSize:20
            // }
            ]
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
                update_pos_footer()
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordSalesOrder: function(button, event, mode) {


    },
    saveRecurr: function() {
        alert('s')
    },
    loadStore: function() {
    },
    onStoreLoad: function() {
    },
    onAddClick: function() {},
    onRemoveClick: function(grid, rowIndex) {},
    onEdit: function(editor, e) {
        e.record.commit();
    }
});