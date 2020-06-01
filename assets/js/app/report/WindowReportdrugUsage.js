Ext.create(dir_sys + 'report.ReportSummarydrugUsage');

Ext.define(dir_sys + 'report.WindowReportdrugUsage', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowReportdrugUsage',
    id: 'WindowReportdrugUsage',
    title: 'Rekapitulasi Penggunaan Obat',
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
        xtype:'ReportSummarydrugUsage'
    }],
    listeners: {
        'show': function() {
            // storeGridSalesOrderGrid.load();
        }
    },
    buttons: [{
        text: 'Tutup',
        handler: function() {
            Ext.getCmp('WindowReportdrugUsage').hide();
        }
    }]
});
