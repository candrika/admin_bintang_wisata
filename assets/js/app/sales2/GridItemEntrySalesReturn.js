var WindowSalesItem4ReturnList = Ext.create(dir_sys + 'sales2.WindowSalesItem4ReturnList');

Ext.define('GridItemSalesReturnModel', {
    extend: 'Ext.data.Model',
    fields: ['sales_return_item_id','idsalesitem', 'product_id','desc', 'qty','product_name', 'price', 'no_barcode', 'idunit', 'no_sku', 'qty_sale', 'disc', 'total', 'rate','qty_retur','total_return','notes'],
    idProperty: 'id'
});

var storeGridItemSalesOrder = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemSalesReturnModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ItemSalesOrder/sales',
        actionMethods: 'POST',
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

storeGridItemSalesOrder.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        // 'option': 'unpaid',
        'key':key,
        'password':password,
        'idunit':idunit
    };
});


//end store head

Ext.define(dir_sys + 'sales2.GridItemEntrySalesReturn', {
    extend: 'Ext.grid.Panel',
    id: 'GridItemEntrySalesReturn',
    alias: 'widget.GridItemEntrySalesReturn',
    xtype: 'cell-editing',
    // title: 'Input Sales Order',
    //    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: panelW,
            height: sizeH-100,
            forceFit: true,
            plugins: [this.cellEditing],
            store: storeGridItemSalesOrder,
            columns: [
            	{
                    text: 'Hapus',
                    width: 65,
                    xtype: 'actioncolumn',
                    tooltip: 'Hapus',
                    align: 'center',
                    icon: BASE_URL + 'assets/icons/fam/cancel.png',
                    handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                        storeGridItemSalesOrder.removeAt(rowIndex);
                        update_summary_salesreturn();
                    }
                },
            	{
                    header: 'sales_return_item_id',
                    hidden: true,
                    dataIndex: 'sales_return_item_id',
                    //                    id: 'idinventory'
                },{
                    header: 'idsalesitem',
                    hidden: true,
                    dataIndex: 'idsalesitem',
                    //                    id: 'idinventory'
                },{
                    header: 'product_id',
                    hidden: true,
                    dataIndex: 'product_id',
                    //                    id: 'idinventory'
                },
                {
                    header: 'idunit',
                    hidden: true,
                    dataIndex: 'idunit'
                },{
                    header: 'price',
                    hidden: true,
                    dataIndex: 'price'
                },
                {
                    header: 'Kode Barang',
                    dataIndex: 'no_sku',
                    minWidth: 150
                },
                {
                    header: 'Barang',
                    flex:1,
                    dataIndex: 'product_name',
                    minWidth: 250,
                    //                    id: 'nameinventory'
                },
                {
                    header: 'Deskripsi',
                    // hidden:true,
                    dataIndex: 'desc',
                    minWidth: 250
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Qty Jual',
                    minWidth: 100,
                    dataIndex: 'qty_sale',
                    align: 'right'
                },
                {
                	 xtype: 'numbercolumn',
                    header: 'Total Jual (Rp)',
                    dataIndex: 'total',
                    align: 'right',
                    minWidth: 150
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Qty Retur',
                    minWidth: 100,
                    dataIndex: 'qty_retur',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 1
                    }
                },   
                {
                	 xtype: 'numbercolumn',
                    header: 'Total Retur (Rp)',
                    dataIndex: 'total_return',
                    align: 'right',
                    minWidth: 150
                },             
                {
                    header: 'Catatan',
                    dataIndex: 'notes',
                    minWidth: 250,
                    align: 'right',
                    editor: {
                        xtype: 'textfield'
                    }
                }
            ],
            selModel: {
                selType: 'cellmodel'
            },
            dockedItems: [
            	{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        text: 'Tambah Barang',
                        iconCls: 'add-icon',
                        scope: this,
                        handler: this.onAddClick
                    }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    store: storeGridItemSalesOrder, // same store GridPanel is using
                    dock: 'bottom',
                    displayInfo: true
                        // pageSize:20
                }
            ],            
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {},
                render: {
                    scope: this,
                    fn: function(grid) {
                        // disableGridItemEntrySalesReturn();
                    }
                }
            }
        });

        this.callParent();

        this.on('afterlayout', this.loadStore, this, {
            delay: 1,
            single: true
        });

        this.on('afteredit', this.onAfterEdit, this);

        this.on({
            scope: this,
            edit: function() {
                update_summary_salesreturn();
            }
        });

        this.on('selectCustomer', this.onSelectCustomer, this);
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    onSelectCustomer: function(data) {
        Ext.getCmp('namecustomerSalesOrder').setValue(data.namecustomer);
        Ext.getCmp('customerSalesOrder').setValue(data.idcustomer);
    },
    recordSalesOrder: function(button, event, mode) {
    },
    saveRecurr: function() {
        if (validasiSalesOrder()) {
            Ext.getCmp('formformRecc').getForm().reset();
            wformRecc.show();
        }
    },
    loadStore: function() {},
    onStoreLoad: function() {
    },
    onAddClick: function(grid, rowIndex) {
    	WindowSalesItem4ReturnList.show();

    	//reset data grid first
    	var current_data_store = Ext.getCmp('GridSalesItemReturnList').getStore();
        Ext.each(current_data_store.data.items, function(obj, i) {
                current_data_store.removeAt(i);
        });

    	var form = Ext.getCmp('EntrySalesReturn').getForm();

	  	var selected_data_store = Ext.getCmp('GridItemEntrySalesReturn').getStore();
	  	var arr = Ext.pluck(selected_data_store.data.items, 'data');
	  	var selected = [];
        Ext.each(arr, function(item) {
        	console.log(item)
        	selected.push(item.idsalesitem);
        });
        // console.log(selected);


        var store_return_item_list = Ext.getCmp('GridSalesItemReturnList').getStore();
		store_return_item_list.on('beforeload', function(store, operation, eOpts) {
		    operation.params = {
		        'id': form.findField('sales_id').getValue()*1,
		        'key':key,
                'except_id': Ext.encode(selected)
		    };
		});
		store_return_item_list.load();


        //get data and set to grid
		// var grid = Ext.getCmp('GridSalesItemReturnList');
  //       Ext.Ajax.request({
  //           url: API_URL + 'sales/item_datas',
  //           method: 'GET',
  //           params: {
  //               id: form.findField('sales_id').getValue()*1,
  //               key: key,
  //               except_id: Ext.encode(selected)
  //           },
  //           success: function(form, action) {
  //               var d = Ext.decode(form.responseText);
  //               console.log(d)

  //               Ext.each(d.rows, function(obj, i) {
  //               	alert(obj.qty)
  //                   var rec = new GridItemSalesReturnModel({
  //                           sales_return_item_id: null,
  //                           no_sku: obj.no_sku,
  //                           idsalesitem: obj.idsalesitem*1,
  //                           product_id: obj.product_id*1,
  //                           product_name: obj.product_name,
  //                           // price:obj.price*1,
  //                           desc: obj.description,
  //                           // total: obj.total*1,
  //                           // qty: obj.qty*1
  //                   });

  //                   grid.getStore().insert(i, rec);
  //               });

  //               update_summary_return();
  //           },
  //           failure: function(form, action) {
  //               Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
  //           }
  //       });
    },
    onRemoveClick: function(grid, rowIndex) {
        this.getStore().getRange()[rowIndex].data['deleted'] = 1;
        this.getStore().clearFilter();
        this.getStore().filter([function(item) { return item.get('deleted') != "1" }]);
        // this.getStore().removeAt(rowIndex);
        updateGridSalesOrderv3()
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});