Ext.define('ProductinputPopupModel', {
    extend: 'Ext.data.Model',
    fields: ['product_id','product_name','location_name','no_sku','no_barcode','product_description','cost_price','buy_price','wholesale_price','retail_price','weight','product_image','stock_available','stock_commited','stock_incoming','stock_max_online','status','available_on_pos','only_for_member','no_sku','product_no','no_supplier','is_purchasable','is_sellable','namecat','namesupplier','brand_name','idinventorycat','inventory_class_id','buy_price','inventory_class_name','business_name','product_balance'],
    idProperty: 'id'
});


var storeProductinputPopup= Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'ProductinputPopupModel',
    remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API  + 'inventory/products?key='+key,
        actionMethods:{
            read:'GET'
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

storeProductinputPopup.on('beforeload',function(store, operation,eOpts){
    operation.params={
                   'key':key,
                   'password':password, 
                   'idunit':idunit,
                   // 'stock_opname_id':Ext.getCmp('stock_opname_id').getValue(),
                   'inventory_class_id':1
    };
});

Ext.define('MY.searchProductinputPopup', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchProductinputPopup',
    store: storeProductinputPopup,
    width: 180
});

Ext.define('ProductinputPopup', {
    extend: 'Ext.grid.Panel',
    id:'ProductinputPopup',
    alias: 'widget.ProductinputPopup',
    store: storeProductinputPopup,
    loadMask: true,
    columns: [
     {
            text: 'Pilih',
            width: 50,
            // menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: 'Pilih Akun Ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                // product_id_filter
                Ext.getCmp('product_name_filter').setValue(selectedRecord.get('product_name'));
                Ext.getCmp('product_id_filter').setValue(selectedRecord.get('product_id'));

                Ext.getCmp('WindowProductinputPopup').hide()
            }
    },
    {
      header: 'product_id',
      dataIndex: 'product_id',
      hidden: true
    },
    {
      header: 'No SKU',
      dataIndex: 'no_sku',
      minWidth: 150
    },

    {
      header: 'No Barcode',
      // hidden:true,
      dataIndex: 'no_barcode',
      minWidth: 150
    },
    {
      header: 'Nama Persediaan',
      dataIndex: 'product_name',
      minWidth: 250,
      flex: 1
    },    
    {
      header: 'Lokasi',
      dataIndex: 'location_name',
      minWidth: 150
    },
    {
      header: 'Stok',
      dataIndex: 'stock_available',
      minWidth: 120,
      xtype: 'numbercolumn',
      align: 'right'
    },
    {
      header: 'Harga Modal',
      dataIndex: 'buy_price',
      minWidth: 200,
      xtype: 'numbercolumn',
      align: 'right'
    },
    {
      header: 'Nilai Persediaan',
      dataIndex: 'product_balance',
      minWidth: 200,
      xtype: 'numbercolumn',
      align: 'right'
    },
    // {
    //   header: 'Merek',
    //   dataIndex: 'brand_name',
    //   minWidth: 200
    // },
    ],
    listeners: {
        render: {
        scope: this,
          fn: function(grid) {
            // storeProductinputPopup.load();

          }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // setValueAcc2(record.data.accname,record.data.accnumber,record.data.idaccount,'WindowCoaGridCoaFixAccount','_interestDebitSavingTypeGrid')
           // 
        }
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                'Cari Kode Barang/No Barcode: ', ' ',
                {
                    xtype: 'searchProductinputPopup',
                    text: 'right Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeProductinputPopup, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

Ext.define(dir_sys+'report.WindowProductinputPopup', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowProductinputPopup',
    id:'WindowProductinputPopup',
    title: 'Masukkan Barang',
    header: {
        titleAlign: 'center'
    },
    maximizable: true,
    closable: true,
    autoDestroy:false,
    closeAction: 'hide',
    width: 1325,
    height: sizeH,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'ProductinputPopup'
    }]
});