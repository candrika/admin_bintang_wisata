Ext.create(dir_sys + 'report.ReportSummarypharmacyreceipt');

Ext.define(dir_sys + 'report.WindowReportpharmacyreceipt', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowReportpharmacyreceipt',
    id: 'WindowReportpharmacyreceipt',
    title: 'Rekapitulasi Penerimaan Resep',
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
        xtype:'ReportSummarypharmacyreceipt'
    }],
    listeners: {
        'show': function() {
            // storeGridSalesOrderGrid.load();
        }
    },
    buttons: [{
        text: 'Tutup',
        handler: function() {
            Ext.getCmp('WindowReportpharmacyreceipt').hide();
        }
    }]
});
