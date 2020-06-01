var GridTransferStockDetail = Ext.create(dir_sys + 'inventory.GridTransferStockDetail');

Ext.define('EntryTransferStock', {
    extend: 'Ext.form.Panel',
    alias: 'widget.EntryTransferStock',
    id: 'EntryTransferStock',
    bodyStyle: 'padding:5px',
    forceFit: true,
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 120,
        width: 395
    },
    bodyPadding: 5,
    width: 600,
    defaults: {
        anchor: '100%'
    },

    items: [{
            xtype: 'hiddenfield',
            name: 'transfer_stock_id',
            id: 'transfer_stock_id'
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'fieldcontainer',
                flex: 1,
                items: [
                    {
                        xtype: 'textfield',
                        labelWidth: 205,
                        name:'transfer_stock_no',
                        id: 'transfer_stock_no',
                        Width:350,
                        fieldLabel: 'No Referensi',
                        readOnly: true,
                        // fieldStyle:'140%',
                        listeners: {
                            render: function(component) {
                                component.getEl().on('click', function(event, el) {
                                    Ext.getCmp('GridTransferStockDetailID').getStore().removeAt();
                                    setNoArticle(idunit, 'transfer_stock_id', 'transfer_stock_no', 'transfer_stock', 'transfer_stock_no','TS');

                                });
                            }
                        }
                    },
                    {
                        xtype: 'datefield',
                        labelWidth: 205,
                        Width:450,
                        name:'transfer_stock_date',
                        id: 'transfer_stock_date',
                        format: 'd-m-Y',
                        fieldLabel: 'Tanggal',
                        allowBlank: false,
                    },
                    {
                        xtype:'comboxBusinessTransferUnit',
                        labelWidth: 205,
                        id:'business_id_origin',
                        // name:'business_id',
                        // fieldLabel:'Unit Asal',
                        allowBlank:false,            
                    },
                    {
                        xtype:'comboxBusinessTransferUnit',
                        labelWidth: 205,
                        // width:400,
                        id:'business_id_destination',
                        // name:'business_id',
                        fieldLabel:'Unit Tujuan',
                        allowBlank:false,
                        // value:1
                    }
                ]
            }, {
                xtype: 'fieldcontainer',
                flex: 1,
                layout: 'vbox',
                items: [{
                    xtype: 'textarea',
                    fieldLabel:'Catatan',
                    name:'transfer_stock_notes',
                    id: 'transfer_stock_notes',
                }]
            }]
        },
        {
            xtype: 'GridTransferStockDetail'
        },
        // {
        //     xtype: 'container',
        //     layout: 'hbox',
        //     items: [{
        //         xtype: 'fieldcontainer',
        //         flex: 1,
        //         layout: 'vbox',
        //         items: [
        //             {
        //                 xtype: 'textfield',
        //                 id: 'total_interest_amount',
        //                 name: 'total_interest_amount',
        //                 fieldLabel: 'Total Perhitungan Bunga',
        //                 labelWidth: 150,
        //                 Width:350,
        //                 fieldStyle:'text-align:right',
        //             },
        //         ]
        //     }]
        // }
    ]
});

// Height
Ext.define(dir_sys + 'inventory.WindowEntryTransferStock', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowEntryTransferStock',
    id: 'WindowEntryTransferStock',
    title: 'Transfer Stok',
    header: {

        titleAlign: 'center'
    },
    maximizable: true,
    closable: true,
    autoDestroy: false,
    modal: true,
    closeAction: 'hide',
    width: panelW,
    height: panelH,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'EntryTransferStock'
    }],
    listeners: {
        'show': function() {
            // Ext.getCmp('GridTransferStockDetailID').getStore().load();
            // Ext.getCmp('GridTransferStockDetailID').getStore().removeAt();
        }
    },
    buttons: [{
        text: 'Batal',
        handler: function() {
            // this.up('form').getForm().reset();
            var form = Ext.getCmp('EntryTransferStock').getForm();
            form.reset();
            // var i =0; 

            //reset grid
            var store = Ext.getCmp('GridTransferStockDetailID').getStore();
            store.removeAll();
            
            Ext.getCmp('WindowEntryTransferStock').hide();
        }
    }, {
        text: 'Simpan',
        id: 'btnRecordEntryTransferStock',
        itemId:'btnRecordEntryTransferStock',
        handler: function(button, event, options) {

            var form = Ext.getCmp('EntryTransferStock').getForm();
            if (form.isValid()) {

                var json = Ext.encode(Ext.pluck(Ext.getCmp('GridTransferStockDetailID').getStore().data.items, 'data'));
                console.log(json);
                Ext.Ajax.request({
                    url: CLINIC_API  + 'inventory/insert_trans_stock',
                    method: 'POST',
                    params: {
                        key:key,
                        password:password,
                        idunit,
                        user_id:userid,
                        transfer_stock_id: Ext.getCmp('transfer_stock_id').getValue(),
                        business_id_origin: Ext.getCmp('business_id_origin').getValue(),
                        business_id_destination: Ext.getCmp('business_id_destination').getValue(),
                        transfer_stock_no: Ext.getCmp('transfer_stock_no').getValue(),
                        transfer_stock_notes: Ext.getCmp('transfer_stock_notes').getValue(),
                        transfer_stock_date: Ext.getCmp('transfer_stock_date').getValue(),
                        transfer_stock_detail: json
                    },
                    success: function(form, action) {

                        var d = Ext.decode(form.responseText);

                        Ext.Msg.alert('Success', d.message);
                        Ext.getCmp('WindowEntryTransferStock').hide();
                        
                        Ext.getCmp('EntryTransferStock').getForm().reset(); 
                        var store = Ext.getCmp('GridTransferStockDetailID').getStore();
                        Ext.each(store.data.items, function(obj, i) {
                                store.removeAt(i);
                        });
                        Ext.getCmp('GridTransferStockID').getStore().load();
                       
                        
                    },
                    failure: function(form, action) {
                        var d = Ext.decode(form.responseText);

                        Ext.Msg.alert('Failed', d ? d.message : 'No response');

                        // Ext.getCmp('btnRecordPurchaseOrder').setDisabled(false);
                    }
                });

            }else{
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});