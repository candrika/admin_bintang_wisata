

Ext.define('KitchenSink.view.grid.EntryOpeningBalance', {
    extend: 'Ext.grid.Panel',
    id: 'EntryOpeningBalance',
    alias: 'widget.EntryOpeningBalance',
    xtype: 'cell-editing',
    title: 'Input Penerimaan',
//    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: 840,
            height: 500,
            forceFit: true,
            plugins: [this.cellEditing],
            store: storeAccountAktive,
            columns: [
                {
                    header: 'idaccount',
                    hidden: true,
                    dataIndex: 'idaccount'
                },
                {
                    header: 'No Akun',
                    dataIndex: 'accnumber',
                    width: 100
                },
                {
                    header: 'Nama Akun',
                    dataIndex: 'accname',
                    width: 150
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Jumlah',
                    width: 100,
                    dataIndex: 'amount',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0
                    }
                },
                {
                    header: 'Pajak (%)',
//                    width:50,
                    dataIndex: 'ratetax',
                    editor: {
                        xtype: 'comboxtax',
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
                    items: [
                        {
                            xtype:'comboxunit',
                            id:'idunitReceive',
                            labelWidth: 150,
                            name:'idunit',
                            valueField:'idunit'
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'idaccountReceive',
                            name: 'idaccount',
                            readOnly: true
                        },  {
                            xtype: 'displayfield',
                            name: 'accnumber',
                            id: 'accnumberReceive',
                            readOnly: true
                        },  '->',
                        {
                            xtype: 'textfield',
                            fieldLabel: 'No Ref',
                            name: 'notrans',
                            id:'notransReceive'
                        }
                    ]
                }, {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Akun Penerimaan Kas',
                            labelWidth: 150,
                            name: 'accname',
                            id: 'accnameReceive',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        
                                        if(Ext.getCmp('idunitReceive').getValue()==null)
                                        {
                                            Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
                                        } else {
                                            windowPopupAccListReceive.show();
                                            storeAccountAktive.load({
                                                params: {
                                                    'idunit': Ext.getCmp('idunitReceive').getValue()
                                                }
                                            });
                                        }
                                        

                                    });
                                }
                            }
                        }, '->',
                          {
                            xtype: 'datefield',
                            id: 'tanggalReceive',
                            format: 'd/m/Y',
                            fieldLabel: 'Tanggal'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                       {
                            xtype: 'textfield',
                            width: 500,
                            labelWidth: 150,
                            id: 'memoReceive',
                            fieldLabel: 'Memo'
                        },'->',
                        {
                            xtype: 'textfield',
                            id: 'receiveFrom',
                            fieldLabel: 'Diterima Dari'
                        }
                    ]
                },
                 {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'Tambah Item',
                            iconCls: 'add-icon',
                            scope: this,
                            handler: this.onAddClick
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            itemId: 'recordPayment',
                            text: 'Rekam Penerimaan Kas',
                            iconCls: 'disk',
                            handler: this.recordReceive
                        },'->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'totalReceive',
                            fieldLabel: 'Total Penerimaan',
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
                            labelWidth: 120,
                            id: 'taxReceive',
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
                            labelWidth: 120,
                            id: 'subtotalReceive',
                            fieldLabel: 'Subtotal',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                }
            ],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {
                },
                render: {
                    scope: this,
                    fn: function(grid) {
//                        disableEntryOpeningBalance();
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
                updateGridReceive();
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordReceive: function()
    {
        if (validasiReceive())
        {
            var json = Ext.encode(Ext.pluck(ReceiveGridStore.data.items, 'data'));
//            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitEntryOpeningBalance').getValue());

            Ext.Ajax.request({
                url: SITE_URL + 'money/recordReceive',
                method: 'POST',
                params: {
                    idaccountReceive: Ext.getCmp('idaccountReceive').getValue(),
                    notransReceive: Ext.getCmp('notransReceive').getValue(),
                    receiveFrom: Ext.getCmp('receiveFrom').getValue(),
                    tanggalReceive: Ext.getCmp('tanggalReceive').getValue(),
                    memoReceive: Ext.getCmp('memoReceive').getValue(),
                    totalReceive: Ext.getCmp('totalReceive').getValue(),
                    taxReceive: Ext.getCmp('taxReceive').getValue(),
                    subtotalReceive: Ext.getCmp('subtotalReceive').getValue(),
                    idunitReceive : Ext.getCmp('idunitReceive').getValue(),
                    dataGrid:json
                },
                success: function(form, action) {

                    var d = Ext.decode(form.responseText);
                    if (!d.success)
                    {
                        Ext.Msg.alert('Peringatan', d.message);
                    } else {
                        Ext.Msg.alert('Success', d.message);
//                        
                        Ext.getCmp('accnameReceive').setValue(null);
                        Ext.getCmp('idaccountReceive').setValue(null);
                        Ext.getCmp('accnumberReceive').setValue(null);
                        Ext.getCmp('notransReceive').setValue(null);
                        Ext.getCmp('receiveFrom').setValue(null);
                        Ext.getCmp('tanggalReceive').setValue(null);
                        Ext.getCmp('memoReceive').setValue(null);
                        Ext.getCmp('totalReceive').setValue(null);
                        Ext.getCmp('taxReceive').setValue(null);
                        Ext.getCmp('subtotalReceive').setValue(null);
//                        Ext.getCmp('idunitReceive').setValue(null);

                        ReceiveGridStore.removeAll();
                        ReceiveGridStore.sync();
                        updateGridReceive();
                    }

                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }


    },
    saveRecurr: function() {
        if (validasiPayment())
        {
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
        
        if(Ext.getCmp('idunitReceive').getValue()==null)
        {
            Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
        } else {
            Ext.getCmp('formAddRowReceive').getForm().reset();
        
            wAddRowReceive.show();
        }
        
    },
    onRemoveClick: function(grid, rowIndex) {
        this.getStore().removeAt(rowIndex);
        updateGridReceive();
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});

function updateGridReceive()
{    
    var subtotalReceive = 0 * 1;
    var totalPajak = 0 * 1;
    var totalReceive = 0 * 1;

    Ext.each(ReceiveGridStore.data.items, function(obj, i) {
        var pajak = (obj.data.amount*1 / 100) * obj.data.ratetax;
        totalPajak += pajak;
        subtotalReceive += obj.data.amount*1;
    });

    totalReceive = subtotalReceive*1-totalPajak*1;

    Ext.getCmp('subtotalReceive').setValue(subtotalReceive.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('taxReceive').setValue(totalPajak.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('totalReceive').setValue(totalReceive.toLocaleString('null', {minimumFractionDigits: 2}));

}

function validasiReceive()
{
//    alert(Ext.getCmp('comboxcurrencyPayment').getValue());
    if (Ext.getCmp('accnameReceive').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Akun penerimaan kas belum diinput');

    } else if (Ext.getCmp('notransReceive').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Masukkan no transaksi');
    } else if (Ext.getCmp('tanggalReceive').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Masukkan tanggal penerimaan');
    } else if (Ext.getCmp('memoReceive').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Masukkan memo penerimaan');
    }  else if (Ext.getCmp('subtotalReceive').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Masukkan item penerimaan');
    } else {
        return true;
    }
}

var wEntryOpeningBalance = Ext.create('widget.window', {
    id: 'wEntryOpeningBalance',
    title: 'Input Pembayaran',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [{
            xtype: 'EntryOpeningBalance'
        }]
});
