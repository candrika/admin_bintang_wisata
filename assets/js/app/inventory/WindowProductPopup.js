Ext.define('ProductPopupModel', {
    extend: 'Ext.data.Model',
    fields: ['product_id','product_name','product_no','product_description','cost_price','buy_price','wholesale_price','retail_price','weight','product_image','stock_available','stock_commited','stock_incoming','stock_max_online','status','available_on_pos','only_for_member','no_sku','no_barcode','no_supplier','is_purchasable','is_sellable','namecat','namesupplier','brand_name','idinventorycat','inventory_class_id','retail_price_member','inventory_class_name','business_name'],
    idProperty: 'id'
});
var storeProductPopup= Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'ProductPopupModel',
    //remoteSort: true,
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

storeProductPopup.on('beforeload',function(store, operation,eOpts){
    operation.params={
                   'key':key, 
                   'extraparams': 'a.idunit:'+idunit
    };
});

Ext.define('MY.searchProductPopup', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchProductPopup',
    store: storeProductPopup,
    width: 180
});

Ext.define('ProductPopup', {
    extend: 'Ext.grid.Panel',
    id:'ProductPopup',
    alias: 'widget.ProductPopup',
    store: storeProductPopup,
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

                      
                // var form = Ext.getCmp('FormEntryDispose').getForm();

                Ext.getCmp('product_id').setValue(selectedRecord.data.product_id);
                // Ext.getCmp('accnumber_coa_ar').setValue(selectedRecord.data.accnumber);
                Ext.getCmp('product_name_input').setValue(selectedRecord.data.product_name);

                Ext.getCmp('WindowProductPopup').hide();
                
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
      minWidth: 220
    },

    {
      header: 'Serial Number',
      hidden:true,
      dataIndex: 'product_no',
      minWidth: 150
    },
    // {header: 'Unit', dataIndex: 'namaunit', minWidth: 100},
    {
      header: 'Nama Persediaan',
      dataIndex: 'product_name',
      minWidth: 250,
      flex: 1
    },
    // {
    //   header: 'Unit Usaha',
    //   dataIndex: 'business_name',
    //   minWidth: 150
    // },    
    {
      header: 'Jenis',
      dataIndex: 'inventory_class_name',
      minWidth: 150
    },
    {
      header: 'Stok',
      dataIndex: 'stock_available',
      minWidth: 150,
      xtype: 'numbercolumn',
      align: 'right'
    },
    // {
    //   header: 'Harga Modal',
    //   dataIndex: 'cost_price',
    //   minWidth: 200,
    //   xtype: 'numbercolumn',
    //   align: 'right'
    // },
    // {
    //   header: 'Harga Jual Non Anggota',
    //   dataIndex: 'retail_price',
    //   minWidth: 200,
    //   xtype: 'numbercolumn',
    //   align: 'right'
    // },
    // {
    //   header: 'Harga Jual Anggota',
    //   dataIndex: 'retail_price_member',
    //   minWidth: 200,
    //   xtype: 'numbercolumn',
    //   align: 'right'
    // },
    {
      header: 'Kategori',
      dataIndex: 'namecat',
      minWidth: 200
    },
    {
      header: 'Merek',
      dataIndex: 'brand_name',
      minWidth: 200
    },],
    listeners: {
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
                'Pencarian: ', ' ',
                {
                    xtype: 'searchProductPopup',
                    text: 'right Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeProductPopup, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

Ext.define(dir_sys+'inventory.WindowProductPopup', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowProductPopup',
    id:'WindowProductPopup',
    title: 'Daftar Produk',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    autoDestroy:false,
    closeAction: 'hide',
    // autoWidth: true,
    width: 1200,
    height: sizeH,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'ProductPopup'
    }]
});