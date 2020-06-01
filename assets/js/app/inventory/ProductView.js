
var WindowProductimage = Ext.create(dir_sys + 'inventory.WindowProductimage')

Ext.define('ProductViewModel', {
  extend: 'Ext.data.Model',
  fields: ['product_image_id','product_id','image_thumbnail','image_fullsize','image_caption','order_by'],
  idProperty: 'id'
});

var storeProductView = Ext.create('Ext.data.Store', {
  pageSize: 100,
  model: 'ProductViewModel',
  remoteSort: true,
  autoload:true,
  proxy: {
    type: 'ajax',
    url: CLINIC_API  + 'inventory/product_image?key='+key,
    actionMethods: {
        read: 'GET'
    },
    reader: {
      root: 'rows',
      totalProperty: 'results'
    }
  },
  sorters: [{
    property: 'nameinventory',
    direction: 'ASC'
  }]
});

// storeProductView.on('beforeload', function(store, operation, eOpts) {
//   operation.params = {
//     'product_id': Ext.getCmp('product_id_formInventory_v2').getValue(),
    
//   };
// });

Ext.define('MY.searchProductView', {
  extend: 'Ext.ux.form.SearchField',
  alias: 'widget.searchProductView',
  store: storeProductView,
  width: 180
});

var smProductView = Ext.create('Ext.selection.CheckboxModel', {
  allowDeselect: true,
  mode: 'MULTI',
  listeners: {
    deselect: function(model, record, index) {
      var selectedLen = smProductView.getSelection().length;
      if (selectedLen == 0) {
        console.log(selectedLen);
        // Ext.getCmp('btnDeleteInventoryAllBySku').disable();
      }
    },
    select: function(model, record, index) {
      //    Ext.getCmp('btnDeleteInventoryAllBySku').enable();
    }
  }
});

Ext.define(dir_sys + 'inventory.ProductView', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.ProductView',
  title: 'Foto Obat',
  itemConfig: {
    viewModel: true
  },
  width:400,
  itemId: 'ProductView',
  scrollable: 'y',
  id: 'ProductView',
  xtype: 'widgetcell',
  store: storeProductView,
  loadMask: true,
  columns: [{
            header:'product_image_id',
            dataIndex:'product_image_id',
            hidden:true,
        },{
            header:'product_id',
            dataIndex:'product_id',
            hidden:true,
        },{
            text: 'Urutan',
            dataIndex: 'order_by'
        }, {
            text: 'Thumbnail',
            cell: {
              xtype: "widgetcell",
            },
            dataIndex:'image_thumbnail',      
            renderer:function(value){
              return  '<img src="' +SITE_URL+'/upload/'+ value + '"style="text-align:center">'          
            },
            minWidth: 150,
            align: 'center'
        }, {
            text: 'Judul Foto',
            dataIndex: 'image_caption',
            flex: 1,
            minWidth: 250,
        }],
  // renderTo:'GridPanel',     
  dockedItems: [{
      xtype: 'toolbar',
      dock: 'top',
      items: [
      {
          itemId: 'addProductView',
          text: 'Tambah',
          iconCls: 'add-icon',
          handler: function() {
            WindowProductimage.show();
            Ext.getCmp('formWindowProductimage').getForm().reset();
            Ext.getCmp('product_id').setValue(Ext.getCmp('product_id_formInventory_v2').getValue());
            Ext.getCmp('status_form').setValue('input');
            
            Ext.getCmp('WindowProductimage').setTitle('Tambah Foto');
            Ext.getCmp('imagethumbnail').hide();


            console.log(Ext.getCmp('product_id_formInventory_v2').getValue());
          }
        },
        {
          itemId: 'editProductView',
          text: 'Detail',
          iconCls: 'edit-icon',
          handler: function() {
            var grid = Ext.ComponentQuery.query('ProductView')[0];
            var selectedRecord = grid.getSelectionModel().getSelection()[0];
            var data = grid.getSelectionModel().getSelection();
            if (data.length == 0) {
              Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
            } else {
              
              WindowProductimage.show();
              var form = Ext.getCmp('formWindowProductimage').getForm();
              form.reset();
              Ext.getCmp('status_form').setValue('edit');

              Ext.getCmp('WindowProductimage').setTitle('Ubah Foto');
              Ext.getCmp('imagethumbnail').show();  
              
              view_data(selectedRecord.data.product_id,selectedRecord.data.product_image_id);
              
              get_image(selectedRecord.data.product_id,selectedRecord.data.product_image_id);
            }
          }
        }, {
          id: 'btnDeleteProductView',
          text: 'Hapus',
          iconCls: 'delete-icon',
          handler: function() {
              Ext.Msg.show({
                title: 'Confirm',
                msg: 'Delete Selected ?',
                buttons: Ext.Msg.YESNO,
                fn: function(btn) {
                  if (btn == 'yes') {
                    var grid = Ext.ComponentQuery.query('ProductView')[0];
                    var sm = grid.getSelectionModel();
                    selected = [];
                    Ext.each(sm.getSelection(), function(item) {
                      selected.push(item.data[Object.keys(item.data)[0]]);
                    }); 

                    Ext.Ajax.request({
                        url: CLINIC_API  + 'inventory/delete_product_image',
                        method: 'POST',
                        params: {postdata: Ext.encode(selected),key:key},
                        success: function(form, action) {
                          var d = Ext.decode(form.responseText);
                          if (!d.success) {
                            Ext.Msg.alert('Informasi', d.message);
                          } else {
                            storeProductView.load();
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
        // 'Pencarian: ', ' ',
        // {
        //   xtype: 'searchProductView',
        //   text: 'Left Button'
        // }

      ]
    }, {
      xtype: 'pagingtoolbar',
      store: storeProductView, // same store GridPanel is using
      dock: 'bottom',
      displayInfo: true
        // pageSize:20
    }
  ],
  listeners: {
    render: {
      scope: this,
      fn: function(grid) {
        // storeProductView.load();
        // Ext.getCmp('idsupplierDaftarPersediaan').getStore().load();
      }
    },
    itemdblclick: function(dv, record, item, index, e) {

      view_data(record.data.product_id,record.data.product_image_id);
      get_image(record.data.product_id,record.data.product_image_id);
      // showWindowProduct(record.data,Ext.getCmp('idunitDaftarPersediaan').getValue());
    }
  }
});

function get_image(product_id,product_image_id){
    Ext.Ajax.request({
        url: CLINIC_API  + 'inventory/product_image',
        method: 'GET',
        params: {
            product_id:product_id,
            product_image_id:product_image_id,
            key:key,
            password:password,
            idunit:idunit
        },
        // headers : { Authorization : auth },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            if(d.success){
                Ext.getCmp("imagethumbnail").el.dom.src = SITE_URL+'/upload/'+d.rows[0].image_fullsize;
            }
           
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });
}

Ext.define('image_thumbnail', {
    extend: 'Ext.Component',
    alias: 'widget.image_thumbnail',
    autoEl: {
        tag: 'img',
        width: 100,
        height: 150
    }
});

function view_data(product_id,product_image_id){
  
  WindowProductimage.show();
  Ext.getCmp('imagethumbnail').getEl().dom.style.marginLeft = '105px';
  
  var form = Ext.getCmp('formWindowProductimage').getForm();
  form.reset();
  Ext.getCmp('status_form').setValue('edit');

  Ext.getCmp('WindowProductimage').setTitle('Ubah Foto');
  Ext.getCmp('imagethumbnail').show();  


  Ext.Ajax.request({
    url: CLINIC_API  + 'inventory/product_image',
    method:'GET',
    params:{
        key:key,
        password:password,
        idunit:idunit,
        product_image_id:product_image_id,
        product_id:product_id,
                    },   
    success: function(form, action) {
      var obj = Ext.decode(form.responseText);
      console.log(obj.rows[0]);

      Ext.getCmp("product_image_id").setValue(obj.rows[0].product_image_id * 1);
      Ext.getCmp("product_id").setValue(obj.rows[0].product_id * 1);
      Ext.getCmp("image_fullsize").setValue(obj.rows[0].image_fullsize);
      Ext.getCmp("image_caption").setValue(obj.rows[0].image_caption);
      Ext.getCmp("order_by").setValue(obj.rows[0].order_by);
    },
    failure: function(form, action) {
      Ext.Msg.alert("Load failed", action.result.errorMessage);
    }
  });
}