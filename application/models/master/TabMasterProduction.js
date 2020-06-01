Ext.define('TabMasterProduction', {
    extend: 'Ext.tab.Panel',
    id: 'TabMasterProduction',
    alias: 'widget.TabMasterProduction',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype: 'GridMasterMachine'
        },
        {
            xtype:'GridMasterMachineType'
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