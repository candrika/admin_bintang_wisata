var formImportSoctOpname = Ext.create('Ext.form.Panel', {
        id: 'formImportSoctOpname',
        width: 950,
        height: 250,
        url: SITE_URL + 'inventory/import_opname',
        baseParams:{
            key:key
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
        items: [
        {
            xtype: 'hiddenfield',
            id: 'stock_opnameImport_id',
            name: 'stock_opnameImport_id',   
        },{
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
               window.location = BASE_URL+"assets/xlsx/format_import_stock_opname.xlsx";
            }
        },
         Ext.panel.Panel({
            // title:'Informasi',
            html: '<br>Petunjuk Import Data Stok Opname:<br><li>Isi sesuai urutan kolom sesuai dengan file template yang telah disediakan</li><li>Kode Barang dan No Barcode tidak Boleh Kosong</li><li>Jumlah stock tercatat</li>'
        })],
        buttons: [
       '->',
        {
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('WindowimportStockOpname');
                Ext.getCmp('formImportSoctOpname').getForm().reset();
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
                                var win = Ext.getCmp('WindowimportStockOpname');
                                Ext.getCmp('formImportSoctOpname').getForm().reset();
                                Ext.Msg.alert('Import Data Stock Opname Info', action.result.message);
                                console.log(action.result.data.product_no)
                                win.hide();
                                var i = 0;
                                Ext.each(action.result.data,function(item){
                                    var rec_stock = new StockOpnameItemPopupModel({
                                        stock_opname_id:item.stock_opname_id,
                                        product_id:item.product_id,
                                        retail_price:item.retail_price,
                                        no_sku:item.product_no,
                                        no_barcode:item.no_barcode,
                                        product_name:item.product_name,
                                        location_name:item.location_name,
                                        current_stock:item.current_stock,
                                        adjustment_stock:item.adjustment_stock,
                                        variance:item.variance,
                                        notes:item.notes
                                    })
                                            
                                    var grid_stock = Ext.getCmp('StockOpnameItemPopup');
                                    grid_stock.getStore().insert(i,rec_stock);
                                    i++;
                                });

                            },
                            failure: function(form, action) {
                                console.log(action.result)
                                var d = action.result;
                                console.log(d.data);
                                // Ext.Msg.alert('Import Data Gagal', action.result ? action.result.message : 'No response');
                                // msg.hide();
                                var win = Ext.getCmp('WindowimportStockOpname');
                                Ext.Msg.alert('Import Data Stock Opname Info', d ? d.message : 'No response');
                                // win.hide();
                                // var i=0;
                                // Ext.each(d.data,function(item){
                                //     var rec_stock = new StockOpnameItemPopupModel({
                                //         stock_opname_id:item.stock_opname_id,
                                //         product_id:item.product_id,
                                //         retail_price:item.retail_price,
                                //         no_sku:item.no_sku,
                                //         no_barcode:item.no_barcode,
                                //         product_name:item.product_name,
                                //         current_stock:item.current_stock,
                                //         adjustment_stock:item.adjustment_stock,
                                //         variance:item.variance,
                                //         notes:item.notes
                                //     })
                                            
                                //     var grid_stock = Ext.getCmp('StockOpnameItemPopup');
                                //     grid_stock.getStore().insert(i,rec_stock);
                                //     i++;
                                // });
                                // Ext.getCmp('ProductStockOpnamePopup').getStore().load();
                                // storeGridSetupTax.load();
                            }

                        });
                    } else {
                        Ext.Msg.alert("Error!", "Your form is invalid!");
                    }
            }
        }]
});

Ext.define(dir_sys+'inventory.WindowimportStockOpname',{
    extend:'Ext.window.Window',
    alias:'widget.WindowimportStockOpname', 
    id: 'WindowimportStockOpname',
    title: 'Import Stock Opname',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    modal:true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formImportSoctOpname]
})