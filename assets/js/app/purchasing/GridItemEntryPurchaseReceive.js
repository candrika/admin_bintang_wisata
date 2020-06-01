var WindowPurchaseItem4ReceiveList = Ext.create(dir_sys + 'purchasing.WindowPurchaseItem4ReceiveList');

Ext.define('GridItemPurchaseReceiveModel', {
    extend: 'Ext.data.Model',
    fields: ['purchase_receipt_item_id','purchase_receipt_id','product_id','purchase_id','purchase_item_id','description','qty','product_name','price','qty_received','total_received','notes','receipt_status'],
    idProperty: 'id'
});

var storeGridItemPurchaseReceive = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemPurchaseReceiveModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API  + 'purchase/data_purchase_receipt_items',
        actionMethods: {
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

storeGridItemPurchaseReceive.on('beforeload', function(store, operation) {
    operation.params = {
        'key':key,
        'idunit':idunit
        // 'id':Ext.getCmp('purchase_id_grdreceipt').getValue(),
    }    
});

//end store head

Ext.define(dir_sys + 'purchasing.GridItemEntryPurchaseReceive', {
    extend: 'Ext.grid.Panel',
    id: 'GridItemEntryPurchaseReceive',
    alias: 'widget.GridItemEntryPurchaseReceive',
    xtype: 'cell-editing',
    title: 'Daftar Barang',
    //    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: panelW,
            height: sizeH-200,
            forceFit: true,
            plugins: [this.cellEditing],
            store: storeGridItemPurchaseReceive,
            columns: [
            	{
                    text: 'Hapus',
                    width: 65,
                    hidden:true,
                    xtype: 'actioncolumn',
                    tooltip: 'Hapus',
                    align: 'center',
                    icon: BASE_URL + 'assets/icons/fam/cancel.png',
                    handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                        storeGridItemPurchaseReceive.removeAt(rowIndex);
                        update_summary_purchace_receipt();
                    }
                },
                {
                    header: 'purchase_receipt_item_id',
                    hidden: true,
                    dataIndex: 'purchase_receipt_item_id',
                    //                    id: 'idinventory'
                },
                {
                    header: 'purchase_receipt_id',
                    hidden: true,
                    dataIndex: 'purchase_receipt_id',
                    //                    id: 'idinventory'
                },
            	{
                    header: 'purchase_item_id',
                    hidden: true,
                    dataIndex: 'purchase_item_id',
                    //                    id: 'idinventory'
                },{
                    header: 'purchase_id',
                    hidden: true,
                    dataIndex: 'purchase_id',
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
                },
                {
                    header: 'Nama Barang',
                    flex:1,
                    dataIndex: 'product_name',
                    minWidth: 250,
                    //                    id: 'nameinventory'
                },
                {
                    header: 'Deskripsi',
                    // hidden:true,
                    dataIndex: 'description',
                    minWidth: 250
                },
                // {
                //     header: 'Status Penerimaan',
                //     // hidden:true,
                //     dataIndex: 'receipt_status',
                //     minWidth: 150,
                //     xtype: 'numbercolumn',
                //     align: 'center',
                //     renderer: function(value) {
                //         return customColumnStatus(ArrPurchaseReceiptStatus, value);
                //     }
                // },
                {
                    header: 'Harga',
                    // hidden: true,
                    dataIndex: 'price',
                    minWidth: 100,
                    xtype: 'numbercolumn',
                    align: 'right'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Qty Beli',
                    minWidth: 100,
                    dataIndex: 'qty',
                    align: 'right'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Qty Terima',
                    minWidth: 100,
                    dataIndex: 'qty_received',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 1
                    }
                },   
                {
                	xtype: 'numbercolumn',
                    header: 'Total Terima',
                    dataIndex: 'total_received',
                    align: 'right',
                    minWidth: 150,
                    minValue: '0'
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
                        text: 'Daftar Barang',
                        iconCls: 'add-icon',
                        scope: this,
                        hidden:true,
                        handler: this.onAddClick
                    }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    store: storeGridItemPurchaseReceive, // same store GridPanel is using
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
                        // disableGridItemEntryPurchaseReceive();
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
                update_summary_purchace_receipt();
            }
        });

        this.on('selectCustomer', this.onSelectCustomer, this);
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    onSelectCustomer: function(data) {
        Ext.getCmp('namecustomerPurchaseOrder').setValue(data.namecustomer);
        Ext.getCmp('customerPurchaseOrder').setValue(data.idcustomer);
    },
    recordPurchaseOrder: function(button, event, mode) {
    },
    saveRecurr: function() {
        if (validasiPurchaseOrder()) {
            Ext.getCmp('formformRecc').getForm().reset();
            wformRecc.show();
        }
    },
    loadStore: function() {},
    onStoreLoad: function() {
    },
    onAddClick: function(grid, rowIndex) {
    	WindowPurchaseItem4ReceiveList.show();

    	//reset data grid first
    	var current_data_store = Ext.getCmp('GridPurchaseItemReturnList').getStore();
        Ext.each(current_data_store.data.items, function(obj, i) {
                current_data_store.removeAt(i);
        });

    	var form = Ext.getCmp('EntryPurchaseReceive').getForm();

	  	var selected_data_store = Ext.getCmp('GridItemEntryPurchaseReceive').getStore();
	  	var arr = Ext.pluck(selected_data_store.data.items, 'data');
	  	var selected = [];
        Ext.each(arr, function(item) {
        	console.log(item)
        	selected.push(item.idPurchaseitem);
        });
        // console.log(selected);


        var store_return_item_list = Ext.getCmp('GridPurchaseItemReturnList').getStore();
		store_return_item_list.on('beforeload', function(store, operation, eOpts) {
		    operation.params = {
		        'id': form.findField('Purchase_id').getValue()*1,
		        'key':key,
                'except_id': Ext.encode(selected)
		    };
		});
		store_return_item_list.load();


        //get data and set to grid
		// var grid = Ext.getCmp('GridPurchaseItemReturnList');
  //       Ext.Ajax.request({
  //           url: CLINIC_API  + 'Purchase/item_datas',
  //           method: 'GET',
  //           params: {
  //               id: form.findField('Purchase_id').getValue()*1,
  //               key: key,
  //               except_id: Ext.encode(selected)
  //           },
  //           success: function(form, action) {
  //               var d = Ext.decode(form.responseText);
  //               console.log(d)

  //               Ext.each(d.rows, function(obj, i) {
  //               	alert(obj.qty)
  //                   var rec = new GridItemPurchaseReceiveModel({
  //                           Purchase_return_item_id: null,
  //                           no_sku: obj.no_sku,
  //                           idPurchaseitem: obj.idPurchaseitem*1,
  //                           product_id: obj.product_id*1,
  //                           product_name: obj.product_name,
  //                           // price:obj.price*1,
  //                           desc: obj.description,
  //                           // total: obj.total*1,
  //                           // qty: obj.qty*1
  //                   });

  //                   grid.getStore().insert(i, rec);
  //               });

  //               update_summary_purchace_return();
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
        updateGridPurchaseOrderv3()
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});

function update_summary_purchace_receipt(){
    var form = Ext.getCmp('EntryPurchaseReceive').getForm();
    var store = Ext.getCmp('GridItemEntryPurchaseReceive').getStore();
    var qty_recepit = 0;
    var total_received = 0;
    var total_rest_qty = 0;
    
    Ext.each(store.data.items, function(obj, i) {
        console.log(obj.data)

        var total_per_row = obj.data.price*obj.data.qty_received;
        
        if(obj.data.receipt_status==2){
            // alert('alert')
            var rest_qty=obj.data.qty-obj.data.qty_received;
        }else{
            var rest_qty=obj.data.qty-obj.data.qty_received;
        }
        
        qty_recepit+=obj.data.qty_received*1;
        total_received+=total_per_row;
        
        total_rest_qty+=rest_qty;

        obj.set('total_received', total_per_row);
    });

    form.findField('total_qty_receive').setValue(number_format(qty_recepit));
    form.findField('total_rest_qty').setValue(number_format(total_rest_qty));
}