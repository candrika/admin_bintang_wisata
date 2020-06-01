var formImportRowDataTunjangan = Ext.create('Ext.form.Panel', {
        id: 'formImportRowDataTunjangan',
        width: 550,
        height: 220,
        url: SITE_URL + 'penggajian/importTunjangan',
        bodyStyle: 'padding:5px',
        labelAlign: 'top',
        autoScroll: true,
        fieldDefaults: {
            msgTarget: 'side',
            blankText: 'Tidak Boleh Kosong',
            labelWidth: 150,
            width: 400
        },
        items: [
        {
            xtype: 'filefield',
            fieldLabel: 'File xlsx',
            name: 'filexlsx',
            // id: 'filexlsxImportTunjanganXlsx',
            anchor: '100%'
        },
        {
            xtype:'button',
            text: 'Download file template',
            handler: function() {
               window.location = BASE_URL+"assets/xlsx/tempate_import_tunjangan.xlsx";
            }
        },
         Ext.panel.Panel({
            // title:'Informasi',
            html: '<br>Petunjuk Import Data Tunjangan:<br><li>Isi sesuai urutan kolom sesuai dengan file template yang telah disediakan</li><li>Kode Tunjangan adalah jenis tunjangan yang akan diberikan. Kode Tunjangan yang terdaftar dapat dilihat pada menu Pengaturan->Referensi->Jenis Tunjangan </li><li>Format tanggal yang dapat diterima aplikasi adalah dd.mm.yyyy dan dipisahkan menggunakan tanda titik (.)</li>'
        })],
        buttons: [
       '->',
        {
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupImportRowDataTunjangan');
                Ext.getCmp('formImportRowDataTunjangan').getForm().reset();
                win.hide();
            }
        }, {
            text: 'Import',
            handler: function() {
                var msg = Ext.MessageBox.wait('Sedang memproses...');
                var form = this.up('form').getForm();
                if (form.isValid()) {
                        form.submit({
                            // params: {idunit:Ext.getCmp('idunitDataTunjangan').getValue()},
                            success: function(form, action) {
                                // msg.hide();
                                var win = Ext.getCmp('windowPopupImportRowDataTunjangan');
                                Ext.getCmp('formImportRowDataTunjangan').getForm().reset();
                                Ext.Msg.alert('Import Data Tunjangan', action.result.message);
                                win.hide();
                                storeGridTunjanganGrid.load();
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('Import Data Gagal', action.result ? action.result.message : 'No response');
                                // msg.hide();
                //                            storeGridSetupTax.load();
                            }

                        });
                    } else {
                        Ext.Msg.alert("Error!", "Your form is invalid!");
                    }
            }
        }]
});

var winImportTunjangan = Ext.create('widget.window', {
    id: 'windowPopupImportRowDataTunjangan',
    title: 'Import Tunjangan Pegawai',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formImportRowDataTunjangan]
})