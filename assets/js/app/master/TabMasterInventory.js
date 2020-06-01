Ext.create(dir_sys + 'master.GridMasterBrand');
// Ext.create(dir_sys + 'master.GridMasterProductData');
// Ext.create(dir_sys + 'master.GridMasterProductMeasurements');
// Ext.create(dir_sys + 'master.GridMasterProductType');
// Ext.create(dir_sys + 'master.GridMasterThickness');
// Ext.create(dir_sys + 'master.GridMasterWarehouse');
// Ext.create(dir_sys + 'master.GridMasterRack');
Ext.create(dir_sys + 'master.GridInventoryCat');
// Ext.create(dir_sys + 'master.TabSupplier');
Ext.create(dir_sys + 'master.GridMasterProductUnit');
Ext.create(dir_sys + 'master.GridMasterLocation');

Ext.define(dir_sys + 'master.TabMasterInventory', {
    extend: 'Ext.tab.Panel',
    id: 'TabMasterInventory',
    alias: 'widget.TabMasterInventory',
    activeTab: 0,
    plain:true,
    height:400,
    width:800,
    bodyStyle: 'padding:5px',
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype: 'GridMasterBrand'
        },
        // {
        //     xtype:'GridMasterThickness'
        // },
        // {
        //     xtype:'GridMasterProductType'
        // },
        // {
        //     xtype:'GridMasterProductMeasurements'
        // },
        // {
        //     xtype:'GridMasterProductData'
        // },
        // {
        //     xtype:'GridMasterWarehouse'
        // },
        // {
        //     xtype:'GridMasterRack'
        // },
        {
            xtype: 'GridInventoryCat'
        },
        {
            xtype:'GridMasterProductUnit'
        },
        {
            xtype:'GridMasterLocation'
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