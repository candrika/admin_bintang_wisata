Ext.create(dir_sys + 'report.ReportSummarySalesunpaid');

Ext.define(dir_sys + 'report.WindowReportsalesunpaid', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowReportsalesunpaid',
    id: 'WindowReportsalesunpaid',
    title: 'Rekapitulasi Penjualan Obat Belum Lunas',
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
    width: panelW,
    height: sizeH + 100,
    layout: 'fit',
    border: false,
    items: [{
        xtype:'ReportSummarySalesunpaid'
    }],
    listeners: {
        'show': function() {
            // storeGridSalesOrderGrid.load();
        }
    },
    buttons: [{
        text: 'Tutup',
        handler: function() {
            Ext.getCmp('WindowReportsalesunpaid').hide();
        }
    }]
});
