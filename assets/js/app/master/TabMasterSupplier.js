Ext.define('TabMasterSupplier', {
    extend: 'Ext.tab.Panel',
    id: 'TabMasterSupplier',
    alias: 'widget.TabMasterSupplier',
    activeTab: 0,
    plain:true,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype: 'GridsupplierGrid'
        },
        {
            xtype:'GridMasterSupplierType'
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