var GridItemEntrySalesReturn = Ext.create(dir_sys + 'sales2.GridItemEntrySalesReturn');
var wCustomerSalesPopupOrderPopup = Ext.create(dir_sys + 'sales2.wCustomerSalesPopupOrderPopup');
var WindowSales4ReturnList = Ext.create(dir_sys + 'sales2.WindowSales4ReturnList');

load_js_file('sales2/GridSalesmanSOPopup.js');

var storeGridItemSalesOrder = Ext.getCmp('GridItemEntrySalesReturn').getStore();

Ext.define('EntrySalesReturn', {
    extend: 'Ext.form.Panel',
    alias: 'widget.EntrySalesReturn',
    id: 'EntrySalesReturn',
    // width: 760,
    // title: 'Detail',
    // height: 410,
    // url: CLINIC_API + 'sales/create_return',
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
            name: 'sales_return_id'
        },{
            xtype: 'hiddenfield',
            name: 'sales_id'
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
                        name:'no_sales_order',
                        fieldLabel: 'NO Order #',
                        readOnly: true,
                        // emptyText: 'Autogenerate',
                        listeners: {
                            render: function(component) {
                                component.getEl().on('click', function(event, el) {
                                	WindowSales4ReturnList.show();
                                	Ext.getCmp('GridSalesReturnList').getStore().load();
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
                        name:'customer_name_so',
                        labelWidth: 120,
                        fieldLabel: 'Pembeli'
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
                        name:'date_sales',
                        fieldLabel: 'Tgl Penjualan'
                    },
                    {
                        xtype: 'displayfield',
                        labelWidth: 120,
                        name:'due_date',
                        fieldLabel: 'Tgl Jatuh Tempo'
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
            xtype: 'GridItemEntrySalesReturn'
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
                        value: 'Sales Return',
                        fieldLabel: 'Memo'
                    },
                    {
                        xtype: 'hiddenfield',
                        name: 'salesman_id',
                        id: 'salesman_id_so',
                    },
                    {
                        xtype: 'hiddenfield',
                        name: 'idcustomer',
                        id: 'customerSalesOrder',
                    },
                    {
                        xtype: 'hiddenfield',
                        id: 'id_sales_quote_SalesOrder',
                        name: 'idsales_quote'
                    },
                    {
                        xtype: 'hiddenfield',
                        id: 'idsales_order',
                        name: 'idsales'
                    },
                    {
                        xtype: 'hiddenfield',
                        id: 'statusformSalesOrderGrid',
                        name: 'statusFormSalesOrder'
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
                        fieldLabel: 'Total Qty Retur',
                        fieldStyle: 'text-align: right;'
                    },
                    {
                        xtype: 'textfield',
                        align: 'right',
                        readOnly: true,
                        labelWidth: 150,
                        name:'total_amount_return',
                        fieldLabel: 'Total Jumlah Retur',
                        fieldStyle: 'text-align: right;'
                    },
                ]
            }]
        }
    ]
});


Ext.define(dir_sys + 'sales2.windowSalesReturn', {
    extend: 'Ext.window.Window',
    alias: 'widget.windowSalesReturn',
    id: 'windowSalesReturn',
    title: 'Retur Penjualan',
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
        xtype: 'EntrySalesReturn'
    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            // this.up('form').getForm().reset();
            Ext.getCmp('windowSalesReturn').hide();
            var store = Ext.getCmp('GridItemEntrySalesReturn').getStore();
            Ext.each(store.data.items, function(obj, i) {
                store.removeAt(i);
            });
            Ext.getCmp('EntrySalesReturn').getForm().reset();
        }
    }, {
        text: 'Simpan Retur Penjualan',
        handler: function(button, event, options) {

            // Ext.getCmp('btnRecordSalesOrder').setDisabled(true);

             if (validasiSalesReturn()) {
             	var form = Ext.getCmp('EntrySalesReturn').getForm();
             	var store = Ext.getCmp('GridItemEntrySalesReturn').getStore();
                var json = Ext.encode(Ext.pluck(store.data.items, 'data'));

                Ext.Ajax.request({
                    url: CLINIC_API + 'sales/save_return',
                    method: 'POST',
                    params: {
                        key: key,
                        password:password,
                        idunit:idunit,
                        memo: form.findField('memo').getValue(),
                        sales_return_id: form.findField('sales_return_id').getValue()*1,
                        sales_id: form.findField('sales_id').getValue()*1,
                        return_date: form.findField('date_return').getSubmitValue(),
                        return_item: json
                    },
                    success: function(form, action) {

                        var d = Ext.decode(form.responseText);
                        if (!d.success) {
                            Ext.Msg.alert('Peringatan', d.message);
                        } else {
                            Ext.Msg.alert('Success', d.message);
                            Ext.getCmp('windowSalesReturn').hide();
                            Ext.getCmp('SalesReturnGridID').getStore().load();

                            var store = Ext.getCmp('GridItemEntrySalesReturn').getStore();
				            Ext.each(store.data.items, function(obj, i) {
				                store.removeAt(i);
				            });
                            Ext.getCmp('EntrySalesReturn').getForm().reset();
                        }
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');

                        Ext.getCmp('btnRecordSalesOrder').setDisabled(false);
                    }
                });
            } else {
                 Ext.getCmp('btnRecordSalesOrder').setDisabled(false);
            }

        }
    }]
});

function validasiSalesReturn(){
	var form = Ext.getCmp('EntrySalesReturn').getForm();
	var total_rtr = form.findField('total_qty_return').getValue()*1;
	if(total_rtr<=0){
		Ext.Msg.alert('Failed', 'Tentukan barang yang akan diretur');
		return false;
	} 

	if(form.findField('no_sales_order').getValue()==''){
		Ext.Msg.alert('Failed', 'Tentukan No Order yang akan diretur');
		return false;
	} 
	return true;
}

