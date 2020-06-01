Ext.create(dir_sys + 'report.ReportSummarySalescash');

Ext.define(dir_sys + 'report.WindowReportsalescash', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowReportsalescash',
    id: 'WindowReportsalescash',
    title: 'Rekapitulasi Penjualan Obat Tunai',
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
        xtype:'ReportSummarySalescash'
    }],
    listeners: {
        'show': function() {
            // storeGridSalesOrderGrid.load();
        }
    },
    buttons: [{
        text: 'Tutup',
        handler: function() {
            Ext.getCmp('WindowReportsalescash').hide();
        }
    }]
});
