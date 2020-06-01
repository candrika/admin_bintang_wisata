var TabMasterClinic = Ext.create(dir_sys + 'master.TabMasterClinic');

Ext.define(dir_sys + 'master.ClinicConfigWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.ClinicConfigWindow',
    title:'Pengaturan Klinik',
    header: {
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
    items: [TabMasterClinic]
});