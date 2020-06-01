Ext.create(dir_sys + 'inventory.GridInventoryOwnerMember');
Ext.create(dir_sys + 'inventory.GridInventoryOwnerNonMember');

Ext.define('TabWindowInventoryOwner', {
    itemId: 'TabWindowInventoryOwner',
    id: 'TabWindowInventoryOwner',
    alias: 'widget.TabWindowInventoryOwner',
    extend: 'Ext.tab.Panel',
    id: 'TabWindowInventoryOwner',
    alias: 'widget.TabWindowInventoryOwner',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    plain:true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype: 'GridInventoryOwnerMember',
            listeners: {
                activate: function() {
                     Ext.getCmp('GridInventoryOwnerMember').getStore().load();
                }
            }
        }
        ,
        {
            xtype:'GridInventoryOwnerNonMember',
            listeners: {
                activate: function() {
                     Ext.getCmp('GridInventoryOwnerNonMember').getStore().load();
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

Ext.define(dir_sys + 'inventory.windowInventoryOwner', {
    extend: 'Ext.window.Window',
    alias: 'widget.windowInventoryOwner',
    id: 'windowInventoryOwner',
    title: 'Pilih Konsinyor',
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
            xtype:'TabWindowInventoryOwner'
    }]
});