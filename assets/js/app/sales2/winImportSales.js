var formImportRowSales= Ext.create('Ext.form.Panel', {
        id: 'formImportRowSales',
        width: 750,
        height: 250,
        url: SITE_URL + 'sales/import_sales',
        bodyStyle: 'padding:5px',
        labelAlign: 'top',
        autoScroll: true,
        fieldDefaults: {
            msgTarget: 'side',
            blankText: 'Tidak Boleh Kosong',
            labelWidth: 150
            // width: 400
        },
        items: [
          {
            xtype: 'datefield',
            fieldLabel: 'Tanggal Jual',
            name: 'datesales',
            format:'d/m/Y',
            // id: 'filexlsxImportPegawaiXlsx',
            anchor: '50%'
        },{
            xtype: 'filefield',
            fieldLabel: 'File xlsx',
            name: 'filexlsx',
            // id: 'filexlsxImportPegawaiXlsx',
            anchor: '60%'
        },
        {
            xtype:'button',
            text: 'Download file template',
            handler: function() {
               window.location = BASE_URL+"assets/xlsx/template_import_penjualan.xlsx";
            }
        },
         Ext.panel.Panel({
            // title:'Informasi',
            html: '<br>Petunjuk Import:<br><li>Isi sesuai urutan kolom sesuai dengan file template yang telah disediakan</li><li>Kode Barang adalah kode yang digunakan untuk mengindetifikasi Barang atau Jasa yang dijual . Kode Barang dapat dilihat di menu Product pada kolom Kode Barang</li><li>Pastikan kolom Qty dan kolom Total Penjualan diisi sebelum melakukan proses import.</li><li>Format tanggal yang dapat diterima aplikasi adalah dd.mm.yyyy dan dipisahkan menggunakan tanda titik (.)</li>'        
        })],
        buttons: [
       '->',
        {
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('winImportSales');
                Ext.getCmp('formImportRowSales').getForm().reset();
                win.hide();
            }
        }, {
            text: 'Import',
            handler: function() {
                var msg = Ext.MessageBox.wait('Sedang memproses...');
                var form = this.up('form').getForm();
                if (form.isValid()) {
                        form.submit({
                            // params: {idunit:Ext.getCmp('idunitDataPegawai').getValue()},
                            success: function(form, action) {
                                // msg.hide();
                                var win = Ext.getCmp('winImportSales');
                                Ext.getCmp('formImportRowSales').getForm().reset();
                                Ext.Msg.alert('Import Penjualan', action.result.message);
                                Ext.getCmp('SalesGridID').getStore().load();
                                    // Ext.getCmp('LoanProposedGrid').getStore().load();
                                setHeaderSalesSummary();
                                win.hide();
                                // storeGridPegawaiGrid.load();
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('Import Penjualan', action.result ? action.result.message : 'No response');
                            }

                        });
                    } else {
                        Ext.Msg.alert("Error!", "Your form is invalid!");
                    }
            }
        }]
});

var winImportSales = Ext.create('widget.window', {
    id: 'winImportSales',
    title: 'Import Penjualan',
    header: {
        titlePosition: 2,
        titleAlign: 'left'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formImportRowSales]
})