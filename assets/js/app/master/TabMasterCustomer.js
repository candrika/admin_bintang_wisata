Ext.define('TabMasterCustomer', {
    extend: 'Ext.tab.Panel',
    id: 'TabMasterCustomer',
    alias: 'widget.TabMasterCustomer',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    plain:true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype: 'GridcustomerGrid'
        },
        // {
        //     xtype:'GridCustomerType'
        // }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // disableUnitMasterCustomer();
            }
        }
    }
});