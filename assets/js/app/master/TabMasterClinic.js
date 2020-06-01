Ext.create(dir_sys + 'master.GridLocation');
Ext.create(dir_sys + 'master.GridPoliType');
Ext.create(dir_sys + 'master.GridStaffType');
Ext.create(dir_sys + 'master.GridMasterDiseases');
Ext.create(dir_sys + 'master.GridMasterMedicalAction');
Ext.create(dir_sys + 'master.TabSupplier');

Ext.define(dir_sys + 'master.TabMasterClinic', {
    extend: 'Ext.tab.Panel',
    id: 'TabMasterClinic',
    alias: 'widget.TabMasterClinic',
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
            xtype: 'GridLocation'
        },
        {
            xtype: 'GridPoliType'
        },
        {
            xtype:'GridStaffType'
        },
        {
            xtype:'GridMasterDiseases'
        },
        {
            xtype:'GridMasterMedicalAction'
        },
        {
            xtype:'TabSupplier'
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