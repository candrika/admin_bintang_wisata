Ext.create(dir_sys + 'sales2.GridBuyerMemberPOS');
Ext.create(dir_sys + 'sales2.GridBuyerNonMemberPOS');

Ext.define('TabBuyerPOS', {
    itemId: 'TabBuyerPOS',
    id: 'TabBuyerPOS',
    alias: 'widget.TabBuyerPOS',
    extend: 'Ext.tab.Panel',
    id: 'TabBuyerPOS',
    alias: 'widget.TabBuyerPOS',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    plain:true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype: 'GridBuyerMemberPOS',
            listeners: {
                activate: function() {
                     Ext.getCmp('GridBuyerMemberPOS').getStore().load();
                }
            }
        },
        {
            xtype:'GridBuyerNonMemberPOS',
            listeners: {
                activate: function() {
                     Ext.getCmp('GridBuyerNonMemberPOS').getStore().load();
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

Ext.define(dir_sys + 'sales2.windowBuyerPOS', {
     extend: 'Ext.window.Window',
     alias: 'widget.windowBuyerPOS',
    id: 'windowBuyerPOS',
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
            xtype:'TabBuyerPOS'
    }]
});