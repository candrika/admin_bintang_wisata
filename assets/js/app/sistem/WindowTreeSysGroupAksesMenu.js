Ext.create(dir_sys + 'sistem.GridTreeSysGroupAksesMenu');

Ext.define(dir_sys + 'sistem.WindowTreeSysGroupAksesMenu', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowTreeSysGroupAksesMenu',
    id:'WindowTreeSysGroupAksesMenu',
    title:'Hak Akses',
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
            xtype:'GridTreeSysGroupAksesMenu'
        }
    ]
});