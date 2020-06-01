var formImportRowDataPotongan = Ext.create('Ext.form.Panel', {
        id: 'formImportRowDataPotongan',
        width: 550,
        height: 220,
        url: SITE_URL + 'penggajian/importPotongan',
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
            // id: 'filexlsxImportPotonganXlsx',
            anchor: '100%'
        },
        {
            xtype:'button',
            text: 'Download file template',
            handler: function() {
               window.location = BASE_URL+"assets/xlsx/tempate_import_potongan.xlsx";
            }
        },
         Ext.panel.Panel({
            // title:'Informasi',
            html: '<br>Petunjuk Import Data Potongan:<br><li>Isi sesuai urutan kolom sesuai dengan file template yang telah disediakan</li><li>Kode Potongan adalah jenis Potongan yang akan diberikan. Kode Potongan yang terdaftar dapat dilihat pada menu Pengaturan->Referensi->Jenis Potongan </li><li>Format tanggal yang dapat diterima aplikasi adalah dd.mm.yyyy dan dipisahkan menggunakan tanda titik (.)</li>'
        })],
        buttons: [
       '->',
        {
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupImportRowDataPotongan');
                Ext.getCmp('formImportRowDataPotongan').getForm().reset();
                win.hide();
            }
        }, {
            text: 'Import',
            handler: function() {
                var msg = Ext.MessageBox.wait('Sedang memproses...');
                var form = this.up('form').getForm();
                if (form.isValid()) {
                        form.submit({
                            // params: {idunit:Ext.getCmp('idunitDataPotongan').getValue()},
                            success: function(form, action) {
                                // msg.hide();
                                var win = Ext.getCmp('windowPopupImportRowDataPotongan');
                                Ext.getCmp('formImportRowDataPotongan').getForm().reset();
                                Ext.Msg.alert('Import Data Potongan', action.result.message);
                                win.hide();
                                storeGridPotonganGrid.load();
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

var winImportPotongan = Ext.create('widget.window', {
    id: 'windowPopupImportRowDataPotongan',
    title: 'Import Potongan Pegawai',
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
    items: [formImportRowDataPotongan]
})