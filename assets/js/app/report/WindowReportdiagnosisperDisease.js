Ext.create(dir_sys + 'report.ReportSummarydiagnosisperDisease');

Ext.define(dir_sys + 'report.WindowReportdiagnosisperDisease', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowReportdiagnosisperDisease',
    id: 'WindowReportdiagnosisperDisease',
    title: 'Rekapitulasi Diagnosa Per Penyakit',
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
        xtype:'ReportSummarydiagnosisperDisease'
    }],
    listeners: {
        'show': function() {
            // storeGridSalesOrderGrid.load();
        }
    },
    buttons: [{
        text: 'Tutup',
        handler: function() {
            Ext.getCmp('WindowReportdiagnosisperDisease').hide();
        }
    }]
});
