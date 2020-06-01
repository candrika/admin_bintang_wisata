Ext.create(dir_sys + 'report.ReportBill');

Ext.define(dir_sys + 'report.WindowReportBill', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowReportBill',
    id: 'WindowReportBill',
    title: 'Laporan Rekaputilasi Tagihan',
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
    width: panelW+50,
    height: sizeH + 100,
    layout: 'fit',
    border: false,
    items: [{
        xtype:'ReportBill'
    }],
    listeners: {
        'show': function() {
            // storeGridSalesOrderGrid.load();
        }
    },
    buttons: [{
        text: 'Tutup',
        handler: function() {
            Ext.getCmp('ReportBill').hide();
        }
    }]
});
