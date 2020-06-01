var WindowEntryTransferStock = Ext.create(dir_sys + 'inventory.WindowEntryTransferStock');

Ext.define('GridTransferStockModel', {
  extend: 'Ext.data.Model',
  fields: ['transfer_stock_id','transfer_stock_no','transfer_stock_date','transfer_stock_notes','status','bussiness_origin_id','bussiness_destination_id','product_id','transfer_qty'],
  idProperty: 'id'
});

var storeGridTransferStock = Ext.create('Ext.data.Store', {
  pageSize: 100,
  model: 'GridTransferStockModel',
  remoteSort: true,
  // autoload:true,
  proxy: {
    type: 'ajax',
    url: CLINIC_API  + 'inventory/data_transfer?key='+key,
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
    direction: 'DESC'
  }]
});

storeGridTransferStock.on('beforeload', function(store, operation, eOpts) {
  operation.params = {
    startdate: Ext.getCmp('startdate_GridTransferStockID').getValue(),
    enddate:Ext.getCmp('enddate_GridTransferStockID').getValue(),
    'key':key,
    'password':password,
    'idunit':idunit
  };
});

Ext.define('MY.searchGridTransferStock', {
  extend: 'Ext.ux.form.SearchField',
  alias: 'widget.searchGridTransferStock',
  store: storeGridTransferStock,
  width: 180
});

var smGridTransferStock = Ext.create('Ext.selection.CheckboxModel', {
  allowDeselect: true,
  mode: 'MULTI',
  listeners: {
    deselect: function(model, record, index) {
      var selectedLen = smGridTransferStock.getSelection().length;
      if (selectedLen == 0) {
        console.log(selectedLen);
        Ext.getCmp('btnDeleteGridTransferStockID').disable();
      }
    },
    select: function(model, record, index) {
      Ext.getCmp('btnDeleteGridTransferStockID').enable();
    }
  }
});


Ext.define(dir_sys + 'inventory.GridTransferStock', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.GridTransferStock',
  // title: 'Daftar Produk',
  selModel:smGridTransferStock,
  // remoteSort:true,
  // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
  itemId: 'GridTransferStockID',
  id: 'GridTransferStockID',
  store: storeGridTransferStock,
  loadMask: true,
  columns: [{
      header: 'transfer_stock_id',
      dataIndex: 'transfer_stock_id',
      hidden: true
    },{
      header: 'bussiness_origin_id',
      dataIndex: 'bussiness_origin_id',
      hidden: true
    },{
      header: 'bussiness_destination_id',
      dataIndex: 'bussiness_destination_id',
      hidden: true
    },
    {
      header: 'No. Referensi',
      dataIndex: 'transfer_stock_no',
      minWidth: 150
    },
    {
      header: 'Tanggal Transfer',
      dataIndex: 'transfer_stock_date',
      minWidth: 150
    },
    {
      header: 'Jumlah Barang',
      dataIndex: 'transfer_qty',
      xtype: 'numbercolumn',
      align: 'right',
      minWidth: 250,
      
    },
    {
      header: 'Catatan',
      dataIndex: 'transfer_stock_notes',
      minWidth: 150,
      flex: 1
  }],
  dockedItems: [
  {
      xtype: 'toolbar',
      dock: 'top',
      items: [{
                xtype: 'datefield',
                id: 'startdate_GridTransferStockID',
                format: 'd/m/Y',
                fieldLabel: 'Periode',
        }, ' s/d ', {
                xtype: 'datefield',
                id: 'enddate_GridTransferStockID',
                format: 'd/m/Y',
                hideLabel: true
        },
        {
          text: 'Cari',
          handler: function() {
            storeGridTransferStock.load();
          }
        }, {
          text: 'Hapus Pencarian',
          handler: function() {
            Ext.getCmp('startdate_GridTransferStockID').setValue();
            Ext.getCmp('enddate_GridTransferStockID').setValue();
            
            storeGridTransferStock.load();
          }
        }]
    },
    {
      xtype: 'toolbar',
      dock: 'top',
      items: [
      {
          itemId: 'addGridTransferStockID',
          text: 'Transfer Unit',
          iconCls: 'add-icon',
          handler: function() {
            WindowEntryTransferStock.show();
            
            Ext.getCmp('addTransferStockItems').enable();
            Ext.getCmp('deleteTransferStockItems').enable();
            Ext.getCmp('btnRecordEntryTransferStock').enable();
            
            var form = Ext.getCmp('EntryTransferStock').getForm();
            form.reset();
            Ext.getCmp('GridTransferStockDetailID').getStore().removeAll();

            var date = new Date();
            Ext.getCmp('transfer_stock_date').setValue(date);
            var business_id_origin = Ext.getCmp('business_id_origin').getStore();
            
            // business_id_origin.on('beforeload', function(store, operation, eOpts) {
            //   operation.params = {
            //     'business_id':'10',
            //   };
            // });

            business_id_origin.load();
            
            Ext.getCmp('business_id_destination').getStore().load();
            setNoArticle(idunit, 'transfer_stock_id', 'transfer_stock_no', 'transfer_stock', 'transfer_stock_no','TS');
          }
      },
      {
          itemId: 'cetakGridTransferStockID',
          text: 'Cetak',
          hidden:true,
          iconCls: 'print-icon',
          handler: function() {
            var grid = Ext.ComponentQuery.query('GridTransferStock')[0];
            var selectedRecord = grid.getSelectionModel().getSelection()[0];
            var data = grid.getSelectionModel().getSelection();
            if (data.length == 0) {
              Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
            } else {
              
            }
          }
      },
      {
          id: 'btnDeleteGridTransferStockID',
          text: 'Hapus',
          iconCls: 'delete-icon',
          handler: function() {
              Ext.Msg.show({
                title: 'Confirm',
                msg: 'Delete Selected ?',
                buttons: Ext.Msg.YESNO,
                fn: function(btn) {
                  if (btn == 'yes') {
                    var grid = Ext.ComponentQuery.query('GridTransferStock')[0];
                    var sm = grid.getSelectionModel();
                    selected = [];
                    Ext.each(sm.getSelection(), function(item) {
                      selected.push(item.data[Object.keys(item.data)[0]]);
                    }); 

                    Ext.Ajax.request({
                        url: CLINIC_API  + 'inventory/transfer_stock',
                        method: 'POST',
                        params: {postdata: Ext.encode(selected),key:key,password:password,idunit:idunit},
                        success: function(form, action) {
                          var d = Ext.decode(form.responseText);
                          console.log(d)
                          if (!d.success) {
                            Ext.Msg.alert('Informasi', d.message);
                          } else {
                            Ext.Msg.alert('Informasi', d.message);

                            storeGridTransferStock.load();
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
            //                    enabled: true
        }, '->',
        'Pencarian: ', ' ',
        {
          xtype: 'searchGridTransferStock',
          text: 'Left Button'
        }

      ]
    }, {
      xtype: 'pagingtoolbar',
      store: storeGridTransferStock, // same store GridPanel is using
      dock: 'bottom',
      displayInfo: true
        // pageSize:20
    }
  ],
  listeners: {
    render: {
      scope: this,
      fn: function(grid) {
        storeGridTransferStock.load();
        // Ext.getCmp('idsupplierDaftarPersediaan').getStore().load();
      }
    },
    itemdblclick: function(dv, record, item, index, e) {
      // load_image_grid(record.data.product_id);
      showWindow(record.data.transfer_stock_id);
    }
  }
});

function showWindow(transfer_stock_id){

    WindowEntryTransferStock.show();
    
    Ext.getCmp('addTransferStockItems').disable();
    Ext.getCmp('deleteTransferStockItems').disable();
    Ext.getCmp('btnRecordEntryTransferStock').disable();
    
    Ext.Ajax.request({

        url:CLINIC_API  +'inventory/data_transfer',
        method:'GET',
        params:{
            key:key,
            transfer_stock_id:transfer_stock_id,
            idunit:idunit
        },
        success:function(form,action){
          var d = Ext.decode(form.responseText);
          var form =Ext.getCmp('EntryTransferStock').getForm();

          // console.log(d.rows[0])

          form.findField('transfer_stock_id').setValue(d.rows[0].transfer_stock_id);
          form.findField('transfer_stock_no').setValue(d.rows[0].transfer_stock_no);
          form.findField('transfer_stock_notes').setValue(d.rows[0].transfer_stock_notes);
          form.findField('transfer_stock_date').setValue(d.rows[0].transfer_stock_date);
          Ext.getCmp('business_id_origin').getStore().load();
          Ext.getCmp('business_id_origin').setValue(d.rows[0].bussiness_origin_id);
          Ext.getCmp('business_id_destination').getStore().load();
          Ext.getCmp('business_id_destination').setValue(d.rows[0].bussiness_destination_id);

        },
        failure:function(form,action){

        }
    })

    var storeGridTransferStockDetail = Ext.getCmp('GridTransferStockDetailID').getStore();

    storeGridTransferStockDetail.removeAll();

    storeGridTransferStockDetail.on('beforeload', function(store, operation, eOpts) {
      operation.params = {
        'idunit': idunit,
        'key': key,
        'transfer_stock_id':transfer_stock_id
      };
    });

    storeGridTransferStockDetail.load();
}