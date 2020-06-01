var formImportRowDataPegawai = Ext.create('Ext.form.Panel', {
        id: 'formImportRowDataPegawai',
        width: 950,
        height: 250,
        url: SITE_URL + 'pegawai/importPegawai',
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
            xtype: 'filefield',
            fieldLabel: 'File xlsx',
            name: 'filexlsx',
            // id: 'filexlsxImportPegawaiXlsx',
            anchor: '50%'
        },
        {
            xtype:'button',
            text: 'Download file template',
            handler: function() {
               window.location = BASE_URL+"assets/xlsx/tempate_import_pegawai.xlsx";
            }
        },
         Ext.panel.Panel({
            // title:'Informasi',
            html: '<br>Petunjuk Import Data Pegawai:<br><li>Isi sesuai urutan kolom sesuai dengan file template yang telah disediakan</li><li>Kode Unit adalah kode unit dimana pegawai tersebut di tugaskan. Untuk mengetahui kode unit dapat dilihat pada menu : Pengaturan->Data Perusahaan->Unit Perusahaan </li><li>Kode Jabatan adalah kode jabatan yang sesuai dengan profil pegawai tersebut. Untuk mengetahui kode jabatan dapat dilihat pada menu: Kepegawaian->Jabatan Pegawai</li> <li>Kode PTKP adalah jenis tarif penghasilan tidak kena pajak. Untuk mengetahui kode ptkp dapat dilihat pada menu: Pengaturan->Referensi->Jenis PTKP</li> <li>Format tanggal yang dapat diterima aplikasi adalah dd.mm.yyyy dan dipisahkan menggunakan tanda titik (.)</li>'
        })],
        buttons: [
       '->',
        {
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupImportRowDataPegawai');
                Ext.getCmp('formImportRowDataPegawai').getForm().reset();
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
                                var win = Ext.getCmp('windowPopupImportRowDataPegawai');
                                Ext.getCmp('formImportRowDataPegawai').getForm().reset();
                                Ext.Msg.alert('Import Data Pegawai', action.result.message);
                                win.hide();
                                storeGridPegawaiGrid.load();
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

var winImportPegawai = Ext.create('widget.window', {
    id: 'windowPopupImportRowDataPegawai',
    title: 'Import Pegawai',
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
    items: [formImportRowDataPegawai]
})