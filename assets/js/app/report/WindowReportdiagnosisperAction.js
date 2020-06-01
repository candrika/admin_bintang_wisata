Ext.create(dir_sys + 'report.ReportSummarydiagnosisperAction');

Ext.define(dir_sys + 'report.WindowReportdiagnosisperAction', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowReportdiagnosisperAction',
    id: 'WindowReportdiagnosisperAction',
    title: 'Rekapitulasi Diagnosa Per Tindakan',
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
        xtype:'ReportSummarydiagnosisperAction'
    }],
    listeners: {
        'show': function() {
            // storeGridSalesOrderGrid.load();
        }
    },
    buttons: [{
        text: 'Tutup',
        handler: function() {
            Ext.getCmp('WindowReportdiagnosisperAction').hide();
        }
    }]
});
