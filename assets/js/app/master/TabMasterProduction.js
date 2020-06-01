Ext.create(dir_sys + 'master.GridMasterProductionCost');
Ext.create(dir_sys + 'master.GridMasterMachineType');
Ext.create(dir_sys + 'master.GridMasterProductionCost');
Ext.create(dir_sys + 'master.GridMasterMachine');

Ext.define(dir_sys + 'master.TabMasterProduction', {
    extend: 'Ext.tab.Panel',
    id: 'TabMasterProduction',
    alias: 'widget.TabMasterProduction',
    activeTab: 0,
    plain:true,
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
        },
        {
            xtype:'GridMasterProductionCost'
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