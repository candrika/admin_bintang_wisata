var GridItemEntryPurchaseReceive = Ext.create(dir_sys + 'purchasing.GridItemEntryPurchaseReceive');
// var wSuppierPurchasePopupOrderPopup = Ext.create(dir_sys + 'purchasing.wSuppierPurchasePopupOrderPopup');
// var WindowPurchase4ReturnList = Ext.create(dir_sys + 'purchasing.WindowPurchase4ReturnList');

// load_js_file('purchasing/GridPurchasemanPOPopup.js');
var loadingtxt = "Loading...";

Ext.define('EntryPurchaseReceive', {
    extend: 'Ext.form.Panel',
    alias: 'widget.EntryPurchaseReceive',
    id: 'EntryPurchaseReceive',
    // width: 760,
    // title: 'Detail',
    // height: 410,
    // url: CLINIC_API  + 'Purchase/create_return',
    bodyStyle: 'padding:5px',
    forceFit: true,
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 120,
        width: 340
    },
    bodyPadding: 5,
    width: 600,
    defaults: {
        anchor: '100%'
    },

    items: [{
            xtype: 'hiddenfield',
            name: 'statusform_receive',
            id: 'statusform_receive'
        },{
            xtype: 'hiddenfield',
            name: 'purchase_receive_id'
        },{
            xtype: 'hiddenfield',
            name: 'purchase_id',
            id:'purchase_id_grdreceipt',
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [
                    {
                        xtype: 'textfield',
                        labelWidth: 150,
                        name:'no_purchase_receipt',
                        fieldLabel: 'NO Penerimaan #',
                        readOnly: true,
                        // emptyText: 'Autogenerate',
                        // listeners: {
                        //     render: function(component) {
                        //         component.getEl().on('click', function(event, el) {
                      
                        //         });
                        //     }
                        // }
                    },
                    {
                        xtype: 'datefield',
                        name: 'receive_date',
                        labelWidth: 150,
                        format: 'd-m-Y',
                        fieldLabel: 'Tanggal Penerimaan'
                    },
                    // {
                    //     xtype: 'displayfield',
                    //     name:'customer_name_so',
                    //     labelWidth: 120,
                    //     fieldLabel: 'Pemasok'
                    // }
                ]
            }, {
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [
                    {
                        xtype: 'displayfield',
                        labelWidth: 120,
                        name:'no_Purchase_order',
                        fieldLabel: 'No Pembelian'
                    },
                    {
                        xtype: 'displayfield',
                        labelWidth: 120,
                        name:'date_Purchase',
                        fieldLabel: 'Tgl Pembelian'
                    }
                ]
            }, {
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [
                    {
                        xtype: 'displayfield',
                        name:'suppier',
                        fieldLabel: 'Pemasok',
                        labelWidth: 150
                    }
                ]
            }]
        },
        // {
        //     xtype:'label',
        //     text:'Daftar Barang',
        //     style:{
        //         fontSize:'16pt',
        //         fontWeigth:'bold'
        //     }
        // },        
        {
            xtype: 'GridItemEntryPurchaseReceive'
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [
                    {
                        xtype: 'textarea',
                        width: 600,
                        name:'memo',
                        labelWidth: 120,
                        value: 'Goods Receipt',
                        fieldLabel: 'Memo'
                    },
                    {
                        xtype: 'hiddenfield',
                        name: 'Purchaseman_id',
                        id: 'Purchaseman_id_so',
                    },
                    {
                        xtype: 'hiddenfield',
                        name: 'idcustomer',
                        id: 'customerPurchaseOrder',
                    },
                    {
                        xtype: 'hiddenfield',
                        id: 'id_Purchase_quote_PurchaseOrder',
                        name: 'idPurchase_quote'
                    },
                    {
                        xtype: 'hiddenfield',
                        id: 'idPurchase_order',
                        name: 'idPurchase'
                    },
                    {
                        xtype: 'hiddenfield',
                        id: 'statusformPurchaseOrderGrid',
                        name: 'statusFormPurchaseOrder'
                    }

                ]
            }, {
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [

                    
                ]
            }, {
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [{
                        xtype: 'textfield',
                        align: 'right',
                        readOnly: true,
                        labelWidth: 150,
                        name:'total_qty_receive',
                        id:'total_qty_receive',
                        fieldLabel: 'Total Qty Terima',
                        fieldStyle: 'text-align: right;'
                    },
                    {
                        xtype: 'textfield',
                        align: 'right',
                        readOnly: true,
                        labelWidth: 150,
                        name:'total_rest_qty',
                        id:'total_rest_qty',
                        fieldLabel: 'Total Qty Sisa',
                        fieldStyle: 'text-align: right;'
                    },
                ]
            }]
        }
    ]
});


Ext.define(dir_sys + 'purchasing.windowPurchaseReceive', {
    extend: 'Ext.window.Window',
    alias: 'widget.windowPurchaseReceive',
    id: 'windowPurchaseReceive',
    title: 'Form Penerimaan Barang',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    maximizable: true,
    closable: true,
    autoDestroy: false,
    modal: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: panelW-180,
    // height: sizeH + 100,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'EntryPurchaseReceive'
    }],
    listeners: {
        'show': function() {
            // storeGridPurchaseOrderGrid.load();
        }
    },
    buttons: [{
        text: 'Batal',
        handler: function() {
            // this.up('form').getForm().reset();
            Ext.getCmp('windowPurchaseReceive').hide();
            var store = Ext.getCmp('GridItemEntryPurchaseReceive').getStore();
            Ext.each(store.data.items, function(obj, i) {
                store.removeAt(i);
            });
            Ext.getCmp('EntryPurchaseReceive').getForm().reset();
        }
    }, {
        text: 'Simpan',
        id:'windowPurchaseReceivesave',
        handler: function(button, event, options) {
            var msg = Ext.MessageBox.wait(loadingtxt);
            // Ext.getCmp('btnRecordPurchaseOrder').setDisabled(true);

             if (validasiPurchaseReturn()) {
             	var form = Ext.getCmp('EntryPurchaseReceive').getForm();
             	var store = Ext.getCmp('GridItemEntryPurchaseReceive').getStore();
                var json = Ext.encode(Ext.pluck(store.data.items, 'data'));

                Ext.Ajax.request({
                    url: CLINIC_API  + 'purchase/save_purchase_receipt',
                    method: 'POST',
                    params: {
                        key: key,
                        password:password,
                        idunit:idunit,
                        purchase_receive_id: form.findField('purchase_receive_id').getValue(),
                        purchase_id: form.findField('purchase_id').getValue(),
                        no_purchase_receipt: form.findField('no_purchase_receipt').getValue(),
                        receive_date: form.findField('receive_date').getValue(),
                        total_qty_receive: form.findField('total_qty_receive').getValue(),
                        total_rest_qty: form.findField('total_rest_qty').getValue(),
                        statusform_receive:form.findField('statusform_receive').getValue(),
                        receipt_item: json,
                        memo: form.findField('memo').getValue(),
                    },
                    success: function(form, action) {
                        //msg.hide()
                        var d = Ext.decode(form.responseText);
                        if (!d.success) {
                            Ext.Msg.alert('Peringatan', d.message);
                        } else {
                            Ext.Msg.alert('Success', d.message);
                            Ext.getCmp('windowPurchaseReceive').hide();
                            Ext.getCmp('PurchaseReceiveGridID').getStore().load();

                            Ext.getCmp('EntryPurchaseReceive').getForm().reset();
                            var store_purchase = Ext.getCmp('PurchasingGridID').getStore().load();

                            var store = Ext.getCmp('GridItemEntryPurchaseReceive').getStore();
                            Ext.each(store.data.items, function(obj, i) {
                                store.removeAt(i);
                            });
                        }
                    },
                    failure: function(form, action) {
                        //msg.hide()
                        var d = Ext.decode(form.responseText);
                        console.log(d)
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');

                        Ext.getCmp('btnRecordPurchaseOrder').setDisabled(false);
                    }
                });
            } else {
                 Ext.getCmp('btnRecordPurchaseOrder').setDisabled(false);
            }

        }
    }]
});

function validasiPurchaseReturn(){
	var form = Ext.getCmp('EntryPurchaseReceive').getForm();
	var total_rtr = form.findField('total_qty_receive').getValue()*1;
	if(total_rtr<=0){
		Ext.Msg.alert('Failed', 'Tentukan barang yang akan diterima');
		return false;
	} 

	if(form.findField('no_purchase_receipt').getValue()==''){
		Ext.Msg.alert('Failed', 'Tentukan No Order yang akan diretur');
		return false;
	} 
	return true;
}
