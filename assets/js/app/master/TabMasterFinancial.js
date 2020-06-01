Ext.create(dir_sys + 'master.GridMasterBank');
Ext.create(dir_sys + 'master.GridMasterCurrency');

Ext.define(dir_sys + 'master.TabMasterFinancial', {
    extend: 'Ext.tab.Panel',
    id: 'TabMasterFinancial',
    alias: 'widget.TabMasterFinancial',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    plain:true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype: 'GridTreeAcc2'
        },
        {
            xtype:'GridMasterBank'
        },
        {
            xtype:'GridMasterCurrency'
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // disableUnitMasterCustomer();
            }
        }
    }
});