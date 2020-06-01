Ext.create(dir_sys + 'sales2.GridBuyerMemberSalesInvoice');
Ext.create(dir_sys + 'sales2.GridBuyerNonMemberSalesInvoice');

Ext.define('TabBuyerSalesInvoice', {
    itemId: 'TabBuyerSalesInvoice',
    id: 'TabBuyerSalesInvoice',
    alias: 'widget.TabBuyerSalesInvoice',
    extend: 'Ext.tab.Panel',
    id: 'TabBuyerSalesInvoice',
    alias: 'widget.TabBuyerSalesInvoice',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    plain:true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype: 'GridBuyerMemberSalesInvoice',
            listeners: {
                activate: function() {
                     Ext.getCmp('GridBuyerMemberSalesInvoice').getStore().load();
                }
            }
        }
        ,
        {
            xtype:'GridBuyerNonMemberSalesInvoice',
            listeners: {
                activate: function() {
                     Ext.getCmp('GridBuyerNonMemberSalesInvoice').getStore().load();
                }
            }
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // Ext.getCmp('GridCustomerID').getStore().load();
                // disableUnitMasterCustomer();
            }
        }
    }
});

Ext.define(dir_sys + 'sales2.windowBuyerSalesInvoice', {
    extend: 'Ext.window.Window',
    alias: 'widget.windowBuyerSalesInvoice',
    id: 'windowBuyerSalesInvoice',
    title: 'Pilih Pembeli',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 870,
    modal:true,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'TabBuyerSalesInvoice'
    }]
});