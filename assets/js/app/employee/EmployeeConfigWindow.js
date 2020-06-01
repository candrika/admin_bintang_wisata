// var TabMasterInventory = Ext.create(dir_sys + 'master.TabMasterInventory');

Ext.define(dir_sys + 'employee.EmployeeConfigTab', {
    extend: 'Ext.tab.Panel',
    id: 'EmployeeConfigTab',
    alias: 'widget.EmployeeConfigTab',
    activeTab: 0,
    autoWidth: '100%',
    // autoScroll: true,
    height:400,
    width:800,
    plain:true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype: 'GridSysGroup',
            title:'Jabatan'
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // disableUnitCustomer();
            }
        }
    }
});

Ext.define(dir_sys + 'employee.EmployeeConfigWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.EmployeeConfigWindow',
    // id: 'EmployeeConfigWindow',
    title:'Pengaturan Pengurus',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    modal: true,    
    bodyStyle: 'padding:5px',
    maximizable: false,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [
        {
            xtype:'EmployeeConfigTab'
        }
    ]
});