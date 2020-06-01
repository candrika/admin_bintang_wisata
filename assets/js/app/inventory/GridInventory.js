  if(!Ext.isDefined(Ext.getCmp('formInventory'))){
  
    var formInventory = Ext.create(dir_sys + 'inventory.v2.formInventory');
}

if(!Ext.isDefined(Ext.getCmp('windowPopupImportProduct'))){
    var windowPopupImportProduct = Ext.create(dir_sys + 'inventory.windowPopupImportProduct');
}

Ext.define('GridInventoryModel', {
  extend: 'Ext.data.Model',
  fields: ['product_id','product_name','product_no','product_description','cost_price','buy_price','wholesale_price','retail_price','weight','product_image','stock_available','stock_commited','stock_incoming','stock_max_online','status','available_on_pos','only_for_member','no_sku','no_barcode','no_supplier','is_purchasable','is_sellable','namecat','namesupplier','brand_name','idinventorycat','inventory_class_id','retail_price_member','inventory_class_name','business_name','product_balance','location_name'],
  idProperty: 'id'
});

var storeGridInventory = Ext.create('Ext.data.Store', {
  pageSize: 100,
  model: 'GridInventoryModel',
  remoteSort: true,
  // autoload:true,
  proxy: {
    type: 'ajax',
    url:  CLINIC_API + 'inventory/products',
    actionMethods: {
        read: 'GET',
    },
    reader: {
      root: 'rows',
      totalProperty: 'results'
    }
  },
  sorters: [{
    property: 'product_id',
    direction: 'DESC'
  }]
});

storeGridInventory.on('beforeload', function(store, operation, eOpts) {
  operation.params = {
    // 'inventory_class_id': Ext.getCmp('inventory_class_id_GridInventory').getValue(),
    'key':key,
    'business_id': Ext.getCmp('business_id_grid').getValue(),
    'product_location_id':Ext.getCmp('product_location_id_grid').getValue(),
    'idinventorycat':Ext.getCmp('idinventorycat_GridInventory').getValue(),
    'idunit':Ext.getCmp('idunitDaftarPersediaan').getValue()
  };
});

Ext.define('MY.searchGridInventory', {
  extend: 'Ext.ux.form.SearchField',
  alias: 'widget.searchGridInventory',
  store: storeGridInventory,
  width: 180
});

var smGridInventory = Ext.create('Ext.selection.CheckboxModel', {
  allowDeselect: true,
  mode: 'MULTI',
  listeners: {
    deselect: function(model, record, index) {
      var selectedLen = smGridInventory.getSelection().length;
      if (selectedLen == 0) {
        console.log(selectedLen);
        Ext.getCmp('btnDeleteInventoryAllBySku').disable();
      }
    },
    select: function(model, record, index) {
      Ext.getCmp('btnDeleteInventoryAllBySku').enable();
    }
  }
});


Ext.define(dir_sys + 'inventory.GridInventory', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.GridInventory',
  // title: 'Daftar Produk',
  selModel:smGridInventory,
  remoteSort:false,
  // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
  itemId: 'GridInventoryID',
  id: 'GridInventoryID',
  store: storeGridInventory,
  loadMask: true,
  columns: [{
      header: 'product_id',
      dataIndex: 'product_id',
      hidden: true
    },
    {
      header: 'Kode Barang',
      dataIndex: 'no_sku',
      minWidth: 150
    },
    {
      header: 'No. Barcode',
      dataIndex: 'no_barcode',
      minWidth: 150
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
    {
      header: 'Unit Usaha',
      dataIndex: 'business_name',
      minWidth: 150
    },
    {
      header: 'Lokasi',
      dataIndex: 'location_name',
      minWidth: 150
    },    
    // {
    //   header: 'Jenis',
    //   dataIndex: 'inventory_class_name',
    //   minWidth: 110
    // },
    {
      header: 'Stok',
      dataIndex: 'stock_available',
      minWidth: 110,
      xtype: 'numbercolumn',
      align: 'right'
    },
    {
      // hidden:true,
      header: 'Harga Modal',
      dataIndex: 'buy_price',
      minWidth: 160,
      xtype: 'numbercolumn',
      align: 'right'
    },
    {
      header: 'Nilai Persediaan',
      dataIndex: 'product_balance',
      minWidth: 160,
      xtype: 'numbercolumn',
      align: 'right'
    },
    {
      hidden:true,
      header: 'Harga Jual Non Anggota',
      dataIndex: 'retail_price',
      minWidth: 160,
      xtype: 'numbercolumn',
      align: 'right'
    },
    {
      // hidden:true,
      header: 'Harga Jual',
      dataIndex: 'retail_price_member',
      minWidth: 160,
      xtype: 'numbercolumn',
      align: 'right'
    },
    // {
    //   header: 'Kategori',
    //   dataIndex: 'namecat',
    //   minWidth: 200,
    //   hidden:true
    // },
    // {
    //   header: 'Merek',
    //   dataIndex: 'brand_name',
    //   minWidth: 200,
    //   hidden:true
    // },
    // {
    //   header: 'Buy Price',
    //   dataIndex: 'buy_price',
    //   minWidth: 120,
    //   xtype: 'numbercolumn',
    //   align: 'right'
    // },

    {
      header: 'Status',
      dataIndex: 'status',
      minWidth: 100,
            renderer: function(value) {
                return customColumnStatus(ArrProductStatus, value);
            }
    }
  ],
  dockedItems: [
  {
      xtype: 'toolbar',
      dock: 'top',
      items: [
       
        {
          xtype: 'comboxBusinessTransferUnit',
          fieldLabel:'Unit',
          // valueField: 'business_id',
          id: 'business_id_grid',
          labelWidth: 50,
          width:225,
          listeners:{
            render:function(){
              Ext.getCmp('business_id_grid').getStore().load();
            }
          }
        },
        {
          xtype: 'comboxproductlocation',
          // hidden:true,
          width:200,
          valueField: 'product_location_id',
          labelWidth: 50,
          id: 'product_location_id_grid'
        },
        {
          xtype: 'comboxunit',
          hidden:true,
          width:290,
          valueField: 'idunit',
          labelWidth: 50,
          id: 'idunitDaftarPersediaan'
        },
        {
          xtype: 'comboxinventorycat',
          fieldLabel:'Kategori',
          width:200,
          id: 'idinventorycat_GridInventory',
          labelWidth: 50,
        },
        {
          text: 'Search',
          handler: function() {
            storeGridInventory.load();
          }
        }, 
        {
          text: 'Clear Filter',
          handler: function() {
            Ext.getCmp('business_id_grid').setValue();
            Ext.getCmp('product_location_id_grid').setValue();
            Ext.getCmp('idinventorycat_GridInventory').setValue();
            storeGridInventory.load();
          }
        },
        '->',
        {
            text:'Import',
            iconCls:'page_excel',
            handler:function(){
               windowPopupImportProduct.show()
            }

        },
        {
            text:'Eksport',
            iconCls:'page_excel',
            handler:function(){
               var grid = Ext.getCmp('GridInventoryID');
               var sm = grid.getSelectionModel();
               // var selectedRecord = grid.getSelectionModel().getSelection()[0];
               var data = grid.getSelectionModel().getSelection();
               // if (data.length == 0) {
               //     Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
               // } else {
               //    var selected=[];
                  
               //    Ext.each(sm.getSelection(), function(item) {
               //        selected.push(item.data[Object.keys(item.data)[0]]);
               //    });
               //    console.log(selected);

                  Ext.Ajax.request({
                    url:CLINIC_API  +'inventory/export_product',
                    method:'GET',
                    params:{
                      // product_id:Ext.encode(selected),
                      key:key,
                      idunit:idunit
                    },
                    success:function(form,action){
                      var d = Ext.decode(form.responseText);
                      var win = window.open(d.excel_url, '_blank');
                      win.focus();
                      console.log(d)
                    },
                    failure:function(form,action){

                    }
                  })
               // }
            }

        }, 
        {
          text: 'Pengaturan',
          iconCls:'pengaturan-icon',
          handler: function() {
            if (!Ext.isDefined(Ext.getCmp('ProductConfigWindow'))) {
                var ProductConfigWindow = Ext.create(dir_sys + 'inventory.ProductConfigWindow');
            } else {
                var ProductConfigWindow = Ext.create(dir_sys + 'inventory.ProductConfigWindow');
            }

            ProductConfigWindow.show();

          }
      }
      ]
    },
    {
      xtype: 'toolbar',
      dock: 'top',
      items: [
      {
          itemId: 'addInventoryAllBySku',
          text: 'Tambah',
          iconCls: 'add-icon',
          handler: function() {
            formInventory.show();
            // Ext.getCmp('formInventory_v2').setTitle('Tambah Produk Baru');

            // Ext.getCmp("fotoProductThumb").el.dom.src = BASE_URL+'/upload/not-available.png';

            var form = Ext.getCmp('formInventory_v2').getForm();
            form.reset();

            Ext.getCmp('ProductView').getStore().removeAll()
            Ext.getCmp('GridProductComposition').getStore().removeAll()
            
            form.findField('product_unit_id').getStore().load();
            form.findField('product_location_id').getStore().load();
            form.findField('idinventorycat').getStore().load();
            form.findField('idbrand').getStore().load();
            Ext.getCmp('inventory_business_id').getStore().load();

            // ctrl_is_consign(true) //disable consign option
            ctrl_is_sell(true) //disable selling option
            ctrl_is_purchase(true) //disable purchase option
          }
        },
        {
          itemId: 'editInventoryAllBySku',
          text: 'Detail',
          iconCls: 'edit-icon',
          handler: function() {
            var grid = Ext.ComponentQuery.query('GridInventory')[0];
            var selectedRecord = grid.getSelectionModel().getSelection()[0];
            var data = grid.getSelectionModel().getSelection();
            if (data.length == 0) {
              Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
            } else {
              formInventory.show();

              var form = Ext.getCmp('formInventory_v2').getForm();
              form.reset();

              load_image_grid(selectedRecord.data.product_id);
              showWindowProduct(selectedRecord.data, Ext.getCmp('idunitDaftarPersediaan').getValue());

              // var form = Ext.getCmp('formInventory_v2').getForm();
              // form.findField('idsupplier').getStore().load();
              // form.findField('idinventorycat').getStore().load();
              // form.findField('idbrand').getStore().load();

              // form.load({
              //     url: CLINIC_API  + 'inventory/product?idunit='+idunit+'&id='+ selectedRecord.data.product_id,
              //     method:'GET',
              //     // params: {
              //     //     extraparams: 'a.product_id:' + selectedRecord.data.product_id
              //     // },
              //     success: function(form, action) {
              //         var obj = Ext.decode(action.response.responseText);
              //         // console.log(obj);
              //         form.findField("status").setValue(obj.data.status * 1);
              //     },
              //     failure: function(form, action) {
              //         Ext.Msg.alert("Load failed", action.result.errorMessage);
              //     }
              // });
            }
          }
        }, {
          id: 'btnDeleteInventoryAllBySku',
          text: 'Hapus',
          iconCls: 'delete-icon',
          handler: function() {
              Ext.Msg.show({
                title: 'Confirm',
                msg: 'Delete Selected ?',
                buttons: Ext.Msg.YESNO,
                fn: function(btn) {
                  if (btn == 'yes') {
                    var grid = Ext.ComponentQuery.query('GridInventory')[0];
                    var sm = grid.getSelectionModel();
                    selected = [];
                    Ext.each(sm.getSelection(), function(item) {
                      selected.push(item.data[Object.keys(item.data)[0]]);
                    }); 

                    Ext.Ajax.request({
                        url: CLINIC_API + 'inventory/hapus',
                        method: 'POST',
                        params: {
                                  postdata: Ext.encode(selected),
                                  key:key,
                                  password:password
                        },
                        success: function(form, action) {
                          var d = Ext.decode(form.responseText);
                          if (!d.success) {
                            Ext.Msg.alert('Informasi', d.message);
                          } else {
                            storeGridInventory.load();
                          }
                        },
                        failure: function(form, action) {
                          Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        }
                    });
                  }
                }
              });
            }
            //                    disabled: true
        }, '->',
        'Pencarian: ', ' ',
        {
          xtype: 'searchGridInventory',
          text: 'Left Button'
        }

      ]
    }, {
      xtype: 'pagingtoolbar',
      store: storeGridInventory, // same store GridPanel is using
      dock: 'bottom',
      displayInfo: true
        // pageSize:20
    }
  ],
  listeners: {
    render: {
      scope: this,
      fn: function(grid) {
        storeGridInventory.load();
        // Ext.getCmp('idsupplierDaftarPersediaan').getStore().load();
      }
    },
    itemdblclick: function(dv, record, item, index, e) {
      load_image_grid(record.data.product_id);
      showWindowProduct(record.data,Ext.getCmp('idunitDaftarPersediaan').getValue());
    }
  }
});

function load_image_grid(product_id){

  var store_image = Ext.getCmp('ProductView').getStore();

  store_image.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
      'product_id': product_id,
      'key':key,
      'password':password,
      'idunit':idunit
    };
  });

  store_image.load();

}