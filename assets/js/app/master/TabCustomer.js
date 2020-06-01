Ext.create(dir_sys + 'master.GridCustomer');
// Ext.create(dir_sys + 'master.GridCustomerType');

Ext.define(dir_sys + 'master.TabCustomer', {
    extend: 'Ext.tab.Panel',
    id: 'TabCustomer',
    alias: 'widget.TabCustomer',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    plain:true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype: 'GridCustomer'
        },
        // {
        //     xtype:'GridCustomerType'
        // }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // disableUnitCustomer();
            }
        }
    }
});