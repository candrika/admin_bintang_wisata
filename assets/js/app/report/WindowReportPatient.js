Ext.create(dir_sys + 'report.ReportSummarypatient');

Ext.define(dir_sys + 'report.WindowReportPatient', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowReportPatient',
    id: 'WindowReportPatient',
    title: 'Rekapitulasi Pasien',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    bodyStyle: 'padding:5px',
    maximizable: true,
    closable: true,
    autoDestroy: false,
    modal: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: panelW-180,
    height: sizeH + 100,
    layout: 'fit',
    border: false,
    items: [{
        xtype:'ReportSummarypatient'
    }],
    listeners: {
        'show': function() {
            // storeGridSalesOrderGrid.load();
        }
    },
    buttons: [{
        text: 'Tutup',
        handler: function() {
            Ext.getCmp('WindowReportPatient').hide();
        }
    }]
});
