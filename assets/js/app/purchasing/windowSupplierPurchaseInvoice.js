Ext.create(dir_sys + 'purchasing.GridSupplierMemberPurchaseInvoice');
// Ext.create(dir_sys + 'sales2.GridBuyerNonMemberSalesInvoice');

Ext.define('TabSupplierPurchaseInvoice', {
    itemId: 'TabSupplierPurchaseInvoice',
    id: 'TabSupplierPurchaseInvoice',
    alias: 'widget.TabSupplierPurchaseInvoice',
    extend: 'Ext.tab.Panel',
    id: 'TabSupplierPurchaseInvoice',
    alias: 'widget.TabSupplierPurchaseInvoice',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    plain:true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype: 'GridSupplierMemberPurchaseInvoice',
            listeners: {
                activate: function() {
                     Ext.getCmp('GridSupplierMemberPurchaseInvoice').getStore().load();
                }
            }
        }
        // ,
        // {
        //     xtype:'GridBuyerNonMemberSalesInvoice',
        //     listeners: {
        //         activate: function() {
        //              Ext.getCmp('GridBuyerNonMemberSalesInvoice').getStore().load();
        //         }
        //     }
        // }
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

Ext.define(dir_sys + 'purchasing.windowSupplierPurchaseInvoice', {
     extend: 'Ext.window.Window',
     alias: 'widget.windowSupplierPurchaseInvoice',
    id: 'windowSupplierPurchaseInvoice',
    title: 'Pilih Pemasok',
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
            xtype:'TabSupplierPurchaseInvoice'
    }]
});