Ext.create(dir_sys + 'sales2.EntryTransactionPOS');
var windowPOSPayment = Ext.create(dir_sys + 'sales2.windowPOSPayment');

Ext.define('GridTransactionPOSModel', {
    extend: 'Ext.data.Model',
    fields: ['product_id','product_name','price','retail_price_member','qty','disc','total'],
    idProperty: 'id'
});

// var storeGridTransactionPOSDetil = Ext.getCmp('GridTransactionPOSID').getStore();

Ext.define('storeGridProductChooserModel', {
    extend: 'Ext.data.Model',
    fields: ['product_id','product_name','product_name_with_code','product_no','product_description','no_sku','no_barcode','price','retail_price_member','stock_available'],
    idProperty: 'id'
});
var storeGridProductChooser = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'storeGridProductChooserModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'inventory/products?key='+key,
         actionMethods: {
           read: 'GET'   
        },
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'menu_name',
        direction: 'DESC'
    }]
});
storeGridProductChooser.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'key':key,
        'password':password,
        'idunit': idunit,
        'is_sellable':2
        // 'extraparams': 'a.idunit:' + Ext.getCmp('idunitJGeneral').getValue() + ',' + 'a.idjournaltype:' + Ext.getCmp('idjournaltype').getValue()
    }
});



storeGridProductChooser.on('load', function(store, operation, eOpts) {

    var search_pos_field = Ext.getCmp('search_pos');
    search_pos_field.setValue(null);
    search_pos_field.focus();
        
    var store_trx = Ext.getCmp('GridProductChooserID').getStore();
    var json_trx = Ext.pluck(store_trx.data.items, 'data');
    if(json_trx.length==1){
        // console.log(store_trx.data.items[0])
        click_to_basket(store_trx.data.items[0])
        //insert to transaction automaticly
    }
});
Ext.define('MY.searchGridProductChooser', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridProductChooser',
    store: storeGridProductChooser,
    width: 180
});
Ext.define('GridProductChooser', {
    // itemId: 'GridProductChooserID',
    // multiSelect:true,
    title: 'Pilih Produk',
    id: 'GridProductChooserID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridProductChooser',
    store: storeGridProductChooser,
    loadMask: true,
    columns: [{
            header: 'product_id',
            dataIndex: 'product_id',
            hidden: true
        },
        {
            header: 'Kode Barang/SKU',
            hidden:true,
            dataIndex: 'no_sku',
            minWidth: 130
        },
        {
            header: 'No. Barcode',
            dataIndex: 'no_barcode',
            minWidth: 130
        }, {
            header: 'Nama Produk',
            flex: 1,
            dataIndex: 'product_name_with_code',
            minWidth: 280
        },
        {
            header: 'Harga',
            xtype: 'numbercolumn',
            align: 'right',
            dataIndex: 'price',
            minWidth: 130
        },
        {
            header: 'Harga Anggota',
            xtype: 'numbercolumn',
            align: 'right',
            dataIndex: 'retail_price_member',
            hidden:true,
            minWidth: 130
        },
        {
            header: 'Stok',
            hidden:true,
            xtype: 'numbercolumn',
            align: 'right',
            dataIndex: 'stock_available',
            minWidth: 100
        }
    ],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                // 'Pencarian: ', 
                {
                    xtype: 'searchGridProductChooser',
                    fieldLabel: 'Pencarian',
                    id:'search_pos',
                    labelWidth: 100,
                    width: 450,
                    text: 'Left Button',
                }
            ]
        },{
            xtype: 'pagingtoolbar',
            store: storeGridProductChooser, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
            // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridProductChooser.load();
                tahunPayrollStore.load();
            }
        },
        itemclick: function(dv, record, item, index, e) {
            // console.log(record);

            // click_to_basket(record)

        },
        itemdblclick: function(dv, record, item, index, e) {
            console.log(record);

            click_to_basket(record)
        }
    }
});
Ext.define(dir_sys + 'sales2.PanelPOS', {
    extend: 'Ext.Panel',
    alias: 'widget.PanelPOS',
    layout: 'border',
    bodyStyle: 'padding:5px',
    defaults: {},
    items: [{
            region: 'east',
            flex: 1,
            split: true,
            xtype: 'EntryTransactionPOS'
        },
        {
            region: 'center',
            xtype: 'GridProductChooser'
        }
    ]
});


Ext.define(dir_sys + 'sales2.WindowPOS', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowPOS',
    id: 'windowPopupWindowPOS',
    title: 'Kasir Penjualan',
    // header: {
    //     titlePosition: 2,
    //     titleAlign: 'center'
    // },
    closable: true,
    modal: true,
    closeAction: 'hide',
    maximizable: true,
    // autoWidth: true,
    // autoHeight: true,
    height:panelH,
    width:panelW,
    layout: 'fit',
    border: false,
    items: [{
        xtype:'PanelPOS'
    }],
    buttons: [
    {
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupWindowPOS');
            Ext.getCmp('EntryTransactionPOS').getForm().reset();
            var store = Ext.getCmp('GridTransactionPOSID').getStore();
            Ext.each(store.data.items, function(obj, i) {
                store.removeAt(i);
            });
            win.hide();
        }
    }, 
    {
        id: 'BtnWindowForminputsale',
        text: 'Bayar',
        handler: function() {
            var form_payment = Ext.getCmp('formPaymentPOS').getForm();

            // submit_pos_data();
            var form = Ext.getCmp('EntryTransactionPOS').getForm();
            var total = str_replace('.','',form.findField("grandtotal").getValue())*1;
// alert(total)
            Ext.getCmp('btnPaymentPOS').enable();    
            if(total>0){

                var form_trx = Ext.getCmp('EntryTransactionPOS').getForm();
                console.log(form_trx.findField('id_member').getValue());

                if(form_trx.findField('id_member').getValue() !==''){

                    Ext.getCmp('payment_method').show();
                    defaults(form_trx.findField('id_member').getValue());
                    Ext.getCmp('member_idSale').setValue(form_trx.findField('id_member').getValue())
                
                }else{
                    Ext.getCmp('payment_method').hide()   
                    defaults(form_trx.findField('id_member').getValue());

                }

                windowPOSPayment.show();

                var form_payment = Ext.getCmp('formPaymentPOS').getForm();
                form_payment.findField("total_sales").setValue(renderNomor(total));
                form_payment.findField("payment_amount").setValue(0);
                form_payment.findField("change_amount").setValue(0);
                // var search_pos_field = Ext.getCmp('search_pos');
                // search_pos_field.setValue(null);
                form_payment.findField("payment_amount").focus();
            } else {
                Ext.Msg.alert('Bayar', 'Tentukan produk terlebih dahulu');
            }

           
        }
    }]
});

function click_to_basket(record){
    var grid_trx = Ext.getCmp('GridTransactionPOSID').getStore();
    var no_member = Ext.getCmp('no_member').getValue();
    var disc = 0;
    var price = record.data.price*1;
    var price_member = record.data.retail_price_member*1;

    if(grid_trx.getCount()==0){
        if(no_member!=null && no_member!=''){
            disc = price-price_member;
        }
        var total = price-disc;
        var rec = new GridTransactionPOSModel({
            product_id: record.data.product_id,
            product_name: record.data.product_name,
            price: price,
            retail_price_member: price_member,
            qty: 1,
            disc: disc,
            total: total
        });
        // console.log(rec);
        // var grid = Ext.getCmp('GridTransactionPOSID');
        grid_trx.insert(0, rec);
    } else {

        // var store = Ext.data.StoreManager.lookup('bookmarks');
        var match = grid_trx.find('product_id',record.data.product_id);
        console.log(match)
        if(match == -1) {
            // ...add the bookmark
            // alert('ga ada');
            if(no_member!=null && no_member!=''){
                disc = price-price_member;
            }
            var total = price-disc;

            var rec = new GridTransactionPOSModel({
                    product_id: record.data.product_id,
                    product_name: record.data.product_name,
                    price: price,
                    retail_price_member: price_member,
                    qty: 1,
                    disc: disc,
                    total: total
                });
            grid_trx.insert(0, rec);
        } else {
            // console.log(match)
             // alert('ada'+match.get('qty'));
                // var get_record = grid_trx.getAt(i);
                // var new_qty = obj.data.qty+1;
                // get_record.set("qty",new_qty);
                // get_record.set("total",new_qty+record.data.price);
            Ext.each(grid_trx.data.items, function(obj, i) {
                console.log(obj.data.product_id+'=='+record.data.product_id)
                if(obj.data.product_id*1==record.data.product_id*1){
                    //udah ada. jadi ditambah qty dan totalnya
                    if(no_member!=null && no_member!=''){
                        disc = (record.data.price*1)-(record.data.price_member*1);
                    }
                    var total = price-disc;
                    // console.log('ada');
                    var get_record = grid_trx.getAt(i);
                    var new_qty = obj.data.qty+1;
                    get_record.set("qty",new_qty);
                    // get_record.set("total",new_qty+record.data.price);
                    get_record.set("total",new_qty+total);
                } 
            });
        }  
    }

    update_pos_footer();
    set_member_buyer_pos();
}
