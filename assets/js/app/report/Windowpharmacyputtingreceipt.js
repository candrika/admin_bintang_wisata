Ext.create(dir_sys + 'report.Pharmacyputtingreceipt');

Ext.define(dir_sys + 'report.Windowpharmacyputtingreceipt', {
    extend: 'Ext.window.Window',
    alias: 'widget.Windowpharmacyputtingreceipt',
    id: 'Windowpharmacyputtingreceipt',
    title: 'Laporan Pengambilan Obat',
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
        xtype:'Pharmacyputtingreceipt'
    }],
    listeners: {
        'show': function() {
            // storeGridSalesOrderGrid.load();
        }
    },
    buttons: [{
        text: 'Tutup',
        handler: function() {
            Ext.getCmp('Pharmacyputtingreceipt').hide();
        }
    }]
});
