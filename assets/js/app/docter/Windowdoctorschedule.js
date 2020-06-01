var Griddoctorschedule = Ext.create(dir_sys + 'docter.Griddoctorschedule');

Ext.define(dir_sys + 'docter.Windowdoctorschedule', {
    width: 850,
    extend: 'Ext.window.Window',
    modal: true,
    title: 'Daftar Jadwal',
    id: 'Windowdoctorschedule',
    alias: 'widget.Windowdoctorschedule',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    listeners: {
        'close': function(win) {
            // Ext.getCmp('btnUbahNilaiUT').hide();
        },
        'hide': function(win) {
            // Ext.getCmp('btnUbahNilaiUT').hide();
        }
    },
    border: false,
    autoScroll: true,
    bodyStyle: 'padding-right: 0px',
    items: [{     
        xtype: 'Griddoctorschedule'
    }]
});