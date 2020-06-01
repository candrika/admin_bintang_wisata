// Ext.create(dir_sys + 'setup.companyData');
// Ext.create(dir_sys + 'setup.GridSetupDataLocation');
Ext.create(dir_sys + 'setup.GridSetupUnit');

Ext.define(dir_sys + 'setup.TabSetupCompany', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.TabSetupCompany',
    activeTab: 0,
    items: [
        {
            xtype: 'GridSetupUnit'
        },
        // {
        //     xtype: 'companyData'
        // },
        // {
        //     xtype: 'GridSetupDataLocation',
        // }
    ]
});