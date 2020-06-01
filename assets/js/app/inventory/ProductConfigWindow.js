var TabMasterInventory = Ext.create(dir_sys + 'master.TabMasterInventory');

Ext.define(dir_sys + 'inventory.ProductConfigWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.ProductConfigWindow',
    // id: 'ProductConfigWindow',
    title:'Pengaturan Inventory Obat',
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
    items: [TabMasterInventory]
});