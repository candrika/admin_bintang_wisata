Ext.create(dir_sys + 'master.GridSupplier');
Ext.create(dir_sys + 'master.GridMasterSupplierType');

Ext.define(dir_sys + 'master.TabSupplier', {
    extend: 'Ext.tab.Panel',
    title:'Pemasok',
    id: 'TabSupplier',
    alias: 'widget.TabSupplier',
    activeTab: 0,
    plain: true,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [{
            xtype: 'GridSupplier'
        },
        {
            xtype: 'GridMasterSupplierType'
        }
    ],
});