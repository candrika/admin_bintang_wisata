// Ext.define(dir_sys + 'inventory.WindowtopupExport'
var WindowtopupExport = Ext.create(dir_sys + 'inventory.WindowtopupExport');

if(!Ext.isDefined(Ext.getCmp('WindowStockOpnameItemPopup'))){
    var WindowStockOpnameItemPopup = Ext.create(dir_sys + 'inventory.WindowStockOpnameItemPopup');
}

Ext.define('GridStockOpnameModel', {
  extend: 'Ext.data.Model',
  fields: ['stock_opname_id','opname_number','product_name','current_stock','adjustment_stock','variance','userin','approved_by','status','datein','firstname','userin_name','approved_name'],
  idProperty: 'id'
});

var storeGridStockOpname = Ext.create('Ext.data.Store', {
  pageSize: 100,
  model: 'GridStockOpnameModel',
  remoteSort: true,
  // autoload:true,
  proxy: {
    type: 'ajax',
    url: CLINIC_API  + 'inventory/stock_opname',
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

storeGridStockOpname.on('beforeload', function(store, operation, eOpts) {
  operation.params = {
    'key':key,
    'password':password,
    'idunit':idunit,
    'deleted':0,
    'startdate':Ext.getCmp('startdate_stockopname').getValue(),
    'enddate':Ext.getCmp('enddate_stockopname').getValue()
  };
});

Ext.define('MY.searchGridStockOpname', {
  extend: 'Ext.ux.form.SearchField',
  alias: 'widget.searchGridStockOpname',
  store: storeGridStockOpname,
  width: 180
});

var smGridStockOpname = Ext.create('Ext.selection.CheckboxModel', {
  allowDeselect: true,
  mode: 'MULTI',
  listeners: {
    deselect: function(model, record, index) {
      var selectedLen = smGridStockOpname.getSelection().length;
      if (selectedLen == 0) {
        console.log(selectedLen);
        Ext.getCmp('btnDeleteStockOpname').disable();
      }
    },
    select: function(model, record, index) {
      Ext.getCmp('btnDeleteStockOpname').enable();
    }
  }
});


Ext.define(dir_sys + 'inventory.GridStockOpname', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.GridStockOpname',
  selModel:smGridStockOpname,
  itemId: 'GridStockOpname',
  id: 'GridStockOpname',
  store: storeGridStockOpname,
  loadMask: true,
  columns: [{
      header: 'stock_opname_id',
      dataIndex: 'stock_opname_id',
      hidden: true
    },
    // {
    //   header: 'product_id',
    //   dataIndex: 'product_id',
    //   hidden: true
    // },
    {
      header: 'No. Opname',
      dataIndex: 'opname_number',
      minWidth: 150
    },
    {
      header: 'Tanggal Opname',
      dataIndex: 'datein',
      minWidth: 125,
      flex: 1
    },  
    {
      header: 'Stok Terhitung',
      dataIndex: 'adjustment_stock',
      minWidth: 150,
      xtype: 'numbercolumn',
      align: 'right'
    },
    {
      header: 'Selisih Stok',
      dataIndex: 'variance',
      minWidth: 150,
      xtype: 'numbercolumn',
      align: 'right'
    },
    {
      header: 'Dibuat Oleh',
      dataIndex: 'userin_name',
      minWidth: 150,
      // xtype: 'numbercolumn',
      // align: 'right'
    },
    {
      header: 'Disetujui Oleh',
      dataIndex: 'approved_name',
      minWidth: 150,
      // xtype: 'numbercolumn',
      // align: 'right'
    },
    {
      header: 'Status',
      dataIndex: 'status',
      minWidth: 150,
            renderer: function(value) {
                return customColumnStatus(ArrStockOpnameStatus, value);
            }
    }
  ],
  dockedItems: [
  {
      xtype: 'toolbar',
      dock: 'top',
      items: [{
              xtype: 'datefield',
              labelWidth: 120,
              // name:'stock_date',
              id: 'startdate_stockopname',
              format: 'd/m/Y',
              fieldLabel: 'Periode'
        },
        's/d',
        {
             xtype: 'datefield',
             labelWidth: 120,
             // name:'stock_date',
             id: 'enddate_stockopname',
             format: 'd/m/Y',
             // fieldLabel: 'Periode'
        }, 
        {
          text: 'Search',
          handler: function() {
            storeGridStockOpname.load();
          }
        }, {
          text: 'Clear Filter',
          handler: function() {
            Ext.getCmp('startdate_stockopname').setValue();
            Ext.getCmp('enddate_stockopname').setValue();
          
            storeGridStockOpname.load();
          }
        }
        
      ]
    },
    {
      xtype: 'toolbar',
      dock: 'top',
      items: [
      {
          itemId: 'addStockOpname',
          text: 'Tambah',
          iconCls: 'add-icon',
          handler: function() {
            // 'Stok Opname Baru'
            // coa_costsales_name
            // Ext.getCmp('coa_costsales_name').hide();

            Ext.getCmp('WindowStockOpnameItemPopup').setTitle('Stok Opname Baru');

            Ext.getCmp('btnRecordOpnameItem').enable();
            WindowStockOpnameItemPopup.show();
            Ext.getCmp('EntryStockOpnameItemPopup').getForm().reset();
            // StockOpnameItemPopup
            Ext.getCmp('StockOpnameItemPopup').getStore().removeAll();

            Ext.getCmp('StockOpnameStatus').setValue(1);
            Ext.getCmp('StockOpnameStatus').setReadOnly(true);
            var start_date = new Date();
            Ext.getCmp('date_stockopname').setValue(start_date);
          }
        },
        {
          itemId: 'approvalStockOpname',
          text: 'Persetujuan',
          // iconCls: 'edit-icon',
          handler: function() {
            // Ext.getCmp('coa_costsales_name').show();

            var grid = Ext.ComponentQuery.query('GridStockOpname')[0];
            var selectedRecord = grid.getSelectionModel().getSelection()[0];
            var data = grid.getSelectionModel().getSelection();
            if (data.length == 0) {
              Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
            } else {
              console.log(selectedRecord.data);
              Ext.getCmp('WindowStockOpnameItemPopup').setTitle('Data Stok Opname '+selectedRecord.data.opname_number);
              
              if(data.status==2){
                Ext.getCmp('btnRecordOpnameItem').disable();
                  
              }else{
                Ext.getCmp('btnRecordOpnameItem').enable();

              }
              
              WindowStockOpnameItemPopup.show();
              
              Ext.getCmp('StockOpnameStatus').setReadOnly(false);
              Ext.getCmp('date_stockopname').setValue(selectedRecord.data.datein);
              Ext.getCmp('stock_opname_id').setValue(selectedRecord.data.stock_opname_id);
              
              //request ke backends
              Ext.Ajax.request({
                url:CLINIC_API  + 'inventory/stock_opnameItems',
                method:'GET',
                params:{
                    key:key,
                    stock_opname_id:selectedRecord.data.stock_opname_id,
                    idunit:idunit
                },
                success:function(form,action){
                    var d = Ext.decode(form.responseText)
                    console.log(d)
                    var i=0;
                    Ext.getCmp('StockOpnameItemPopup').getStore().removeAll();

                    Ext.each(d.rows,function(item){
                          var rec_stock = new StockOpnameItemPopupModel({
                              stock_opname_id:item.stock_opname_id,
                              product_id:item.product_id,
                              retail_price:item.retail_price,
                              no_sku:item.no_sku,
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
                failure:function(form,action){

                }
              
            });
          }}
        },{
          id:'btnExportProduct',
          text:'Export Produk Stok Opname',
          // hidden:true,
          handler:function(){
            Ext.getCmp('bussiness_id_stockOpname').getStore().load();
            Ext.getCmp('bussiness_id_stockOpname').setValue();
            WindowtopupExport.show();
          }
        }, {
          id: 'btnDeleteStockOpname',
          text: 'Hapus',
          iconCls: 'delete-icon',
          handler: function() {
              Ext.Msg.show({
                title: 'Confirm',
                msg: 'Delete Selected ?',
                buttons: Ext.Msg.YESNO,
                fn: function(btn) {
                  if (btn == 'yes') {
                    var grid = Ext.getCmp('GridStockOpname');
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var sm =grid.getSelectionModel();
                    var data=grid.getSelectionModel().getSelection();

                    var selected =[];

                    Ext.each(data, function(item) {
                        selected.push(item.data[Object.keys(item.data)[0]]);
                    });
                    
                    console.log(selected)

                    Ext.Ajax.request({
                        url: CLINIC_API  + 'inventory/remove_stockOpname',
                        method: 'POST',
                        params: {key:key,postdata: Ext.encode(selected)},
                        success: function(form, action) {
                          var d = Ext.decode(form.responseText);
                          if (!d.success) {
                            Ext.Msg.alert('Informasi', d.message);
                          } else {
                            Ext.Msg.alert('Informasi', d.message);
                            storeGridStockOpname.load();
                          }
                        },
                        failure: function(form, action) {
                          var d = Ext.decode(form.responseText);

                          Ext.Msg.alert('Failed', d ? d.message : 'No response');
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
          xtype: 'searchGridStockOpname',
          text: 'Left Button'
        }

      ]
    }, {
      xtype: 'pagingtoolbar',
      store: storeGridStockOpname, // same store GridPanel is using
      dock: 'bottom',
      displayInfo: true
        // pageSize:20
    }
  ],
  listeners: {
    render: {
      scope: this,
      fn: function(grid) {
        storeGridStockOpname.load();
        // Ext.getCmp('idsupplierDaftarPersediaan').getStore().load();
      }
    },
    itemdblclick: function(dv, record, item, index, e) {
      showWindowSOItem(record.data);
      
    }
  }
});

function showWindowSOItem(data){
  // Ext.getCmp('coa_costsales_name').hide();
  Ext.getCmp('WindowStockOpnameItemPopup').setTitle('Data Stok Opname '+data.opname_number);
  Ext.getCmp('StockOpnameItemPopup').getStore().removeAll();

  WindowStockOpnameItemPopup.show();
  Ext.getCmp('EntryStockOpnameItemPopup').getForm();
  
  Ext.getCmp('stock_opname_id').setValue(data.stock_opname_id);
  Ext.getCmp('StockOpnameStatus').setValue(data.status*1);
  Ext.getCmp('StockOpnameStatus').setReadOnly(true);
  Ext.getCmp('stock_opname_id').setValue(data.stock_opname_id);
  Ext.getCmp('date_stockopname').setValue(data.datein);

  Ext.Ajax.request({
      url:CLINIC_API  + 'inventory/stock_opnameItems',
      method:'GET',
      params:{
          key:key,
          password:password,
          idunit:idunit,
          stock_opname_id:data.stock_opname_id
      },
      success:function(form,action){
          var d = Ext.decode(form.responseText)
          console.log(d)
          var i=0;

          Ext.each(d.rows,function(item){
                var rec_stock = new StockOpnameItemPopupModel({
                    stock_opname_id:item.stock_opname_id,
                    product_id:item.product_id,
                    retail_price:item.retail_price,
                    no_sku:item.no_sku,
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
      failure:function(form,action){

      }
  })

  if(data.status==2){
    Ext.getCmp('btnRecordOpnameItem').disable();
    
  }else{
    Ext.getCmp('btnRecordOpnameItem').enable();

  }
}