var GridItemEntryPurchaseReturn = Ext.create(dir_sys + 'purchasing.GridItemEntryPurchaseReturn');
var wSuppierPurchasePopupOrderPopup = Ext.create(dir_sys + 'purchasing.wSuppierPurchasePopupOrderPopup');
var WindowPurchase4ReturnList = Ext.create(dir_sys + 'purchasing.WindowPurchase4ReturnList');

load_js_file('purchasing/GridPurchasemanPOPopup.js');

var storeGridItemPurchaseOrder = Ext.getCmp('GridItemEntryPurchaseReturn').getStore();
var loadingtxt = "Loading...";

Ext.define('EntryPurchaseReturn', {
    extend: 'Ext.form.Panel',
    alias: 'widget.EntryPurchaseReturn',
    id: 'EntryPurchaseReturn',
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
            name: 'statusform_return',
            id: 'statusform_return'
        },{
            xtype: 'hiddenfield',
            name: 'Purchase_return_id'
        },{
            xtype: 'hiddenfield',
            name: 'Purchase_id'
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
                        labelWidth: 120,
                        name:'no_purchase_order',
                        fieldLabel: 'NO Purchase #',
                        readOnly: true,
                        // emptyText: 'Autogenerate',
                        listeners: {
                            render: function(component) {
                                component.getEl().on('click', function(event, el) {
                                	WindowPurchase4ReturnList.show();
                                	Ext.getCmp('GridPurchaseReturnList').getStore().load();
                                });
                            }
                        }
                    },
                    {
                        xtype: 'datefield',
                        name: 'date_return',
                        format: 'd-m-Y',
                        fieldLabel: 'Tanggal Retur'
                    },
                    {
                        xtype: 'displayfield',
                        name:'customer_name_po',
                        labelWidth: 120,
                        fieldLabel: 'Pemasok'
                    }
                ]
            }, {
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [
                    {
                        xtype: 'displayfield',
                        labelWidth: 120,
                        name:'date_purchase',
                        fieldLabel: 'Tgl Pembelian'
                    },
                    {
                        xtype: 'displayfield',
                        labelWidth: 120,
                        name:'due_date',
                        fieldLabel: 'Tgl Bayar'
                    }
                ]
            }, {
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [
                    {
                        xtype: 'displayfield',
                        name:'include_tax',
                        fieldLabel: 'Harga Termasuk Pajak',
                        labelWidth: 150
                    }
                ]
            }]
        },

        {
            xtype: 'GridItemEntryPurchaseReturn'
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
                        value: 'Purchase Return',
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
                        name:'total_qty_return',
                        id:'total_qty_return',
                        fieldLabel: 'Total Qty Retur',
                        fieldStyle: 'text-align: right;'
                    },
                    {
                        xtype: 'textfield',
                        align: 'right',
                        readOnly: true,
                        labelWidth: 150,
                        name:'total_amount_return',
                        id:'total_amount_return',
                        fieldLabel: 'Total Jumlah Retur',
                        fieldStyle: 'text-align: right;'
                    },
                ]
            }]
        }
    ]
});


Ext.define(dir_sys + 'purchasing.windowPurchaseReturn', {
    extend: 'Ext.window.Window',
    alias: 'widget.windowPurchaseReturn',
    id: 'windowPurchaseReturn',
    title: 'Retur Pembelian',
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
        xtype: 'EntryPurchaseReturn'
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
            Ext.getCmp('windowPurchaseReturn').hide();
            var store = Ext.getCmp('GridItemEntryPurchaseReturn').getStore();
            Ext.each(store.data.items, function(obj, i) {
                store.removeAt(i);
            });
            Ext.getCmp('EntryPurchaseReturn').getForm().reset();
        }
    }, {
        text: 'Simpan Retur Pembelian',
        handler: function(button, event, options) {
            var msg = Ext.MessageBox.wait(loadingtxt);
            // GridItemEntryPurchaseReturn

             if (validasiPurchaseReturn()) {
             	var form = Ext.getCmp('EntryPurchaseReturn').getForm();
             	var store = Ext.getCmp('GridItemEntryPurchaseReturn').getStore();
                var json = Ext.encode(Ext.pluck(store.data.items, 'data'));
                
                Ext.Ajax.request({
                    url: CLINIC_API  + 'Purchase/save_purchase_return',
                    method: 'POST',
                    params: {
                        key: key,
                        password:password,
                        idunit:idunit,
                        Purchase_return_id: form.findField('Purchase_return_id').getValue()*1,
                        Purchase_id: form.findField('Purchase_id').getValue()*1,
                        return_date: form.findField('date_return').getSubmitValue(),
                        memo:form.findField('memo').getValue(),
                        statusform_return:form.findField('statusform_return').getValue(),
                        return_item: json
                    },
                    success: function(form, action) {
                        //msg.hide()
                        var d = Ext.decode(form.responseText);
                        if (!d.success) {
                            Ext.Msg.alert('Peringatan', d.message);
                        } else {
                            Ext.Msg.alert('Success', d.message);
                            Ext.getCmp('windowPurchaseReturn').hide();
                            Ext.getCmp('PurchaseReturnGridID').getStore().load();

                            var store = Ext.getCmp('GridItemEntryPurchaseReturn').getStore();
				            Ext.each(store.data.items, function(obj, i) {
				                store.removeAt(i);
				            });
                            Ext.getCmp('EntryPurchaseReturn').getForm().reset();
                        }
                    },
                    failure: function(form, action) {
                        //msg.hide()
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
	var form = Ext.getCmp('EntryPurchaseReturn').getForm();
	var total_rtr = form.findField('total_qty_return').getValue()*1;
	if(total_rtr<=0){
		Ext.Msg.alert('Failed', 'Tentukan barang yang akan diretur');
		return false;
	} 

	if(form.findField('no_purchase_order').getValue()==''){
		Ext.Msg.alert('Failed', 'Tentukan No Order yang akan diretur');
		return false;
	} 
	return true;
}
