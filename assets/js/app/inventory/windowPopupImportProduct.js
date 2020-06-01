var formImportProduct = Ext.create('Ext.form.Panel', {
    id: 'formImportProduct',
    // width: 950,
    // height: 250,
    url: SITE_URL + 'inventory/import_data',
    baseParams: {
        key: key
    },
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 150
            // width: 400
    },
    items: [{
            xtype:'hiddenfield',
            id:'stock_opnameImport_id',
            name:'stock_opname'
        },{
            xtype:'hiddenfield',
            name:'key',
            value:key
        },{
            xtype: 'filefield',
            fieldLabel: 'File xlsx',
            name: 'filexlsx',
            // id: 'filexlsxImportPegawaiXlsx',
            anchor: '50%'
        }, {
            xtype: 'button',
            text: 'Download file template',
            handler: function() {
                window.location = BASE_URL + "assets/xlsx/format_import_produk.xlsx";
            }
        },
        Ext.panel.Panel({
            // title:'Informasi',
            html: '<br>Petunjuk Import Produk:<br><li>Kode Unit Usaha diambil dari Kode Unit yang ada pada menu Unit Usaha</li><li>Jenis Produk: 1. Barang 2. Jasa</li><li>Kode Akun Pembelian dan Kode Akun Penjualan adalah Akun perkiraan untuk pencatatan. <br>Kode Akun diambil dari menu Keuangan->Pengaturan Keuangan</li>'
        })
    ],
    buttons: ['->', {
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupImportProduct');
            Ext.getCmp('formImportProduct').getForm().reset();
            win.hide();
        }
    }, {
        text: 'Import',
        handler: function() {
            var msg = Ext.MessageBox.wait('Sedang memproses...');
            Ext.getCmp('GridInventoryID').getStore()
            var form = this.up('form').getForm();
            if(form.isValid()) {
                form.submit({
                    // params: key:key,
                    success: function(form, action) {
                        // msg.hide();
                        var win = Ext.getCmp('windowPopupImportRowDataSaving');
                        Ext.getCmp('formImportProduct').getForm().reset();
                        Ext.Msg.alert('Import Data', action.result.message);
                        Ext.getCmp('windowPopupImportProduct').hide();
                        Ext.getCmp('GridInventoryID').getStore().load();
                    },
                    failure: function(form, action) {
                        // Ext.Msg.alert('Import Data Gagal', action.result ? action.result.message : 'No response');
                        // msg.hide();
                        // var win = Ext.getCmp('windowPopupImportRowDataSaving');
                        Ext.Msg.alert('Import Data', action.result ? action.result.message : 'No response');
                        // win.hide();
                        Ext.getCmp('GridInventoryID').getStore().load();
                        //                            storeGridSetupTax.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
Ext.define(dir_sys + 'inventory.windowPopupImportProduct', {
    extend: 'Ext.window.Window',
    alias: 'widget.windowPopupImportProduct',
    id: 'windowPopupImportProduct',
    title: 'Import Produk',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    modal: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formImportProduct]
})