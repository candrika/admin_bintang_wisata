var WindowPurchaseItem4ReturnList = Ext.create(dir_sys + 'purchasing.WindowPurchaseItem4ReturnList');

Ext.define('GridItemPurchaseReturnModel', {
    extend: 'Ext.data.Model',
    fields: ['purchase_return_item_id','purchase_return_id','purchase_item_id','purchase_id', 'product_id','desc', 'qty','product_name', 'price', 'no_barcode', 'idunit', 'no_sku', 'qty_purchase', 'disc', 'total', 'rate','qty_retur','total_return','notes'],
    idProperty: 'id'
});

var storeGridItemPurchaseReturn = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemPurchaseReturnModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API  + 'purchase/purchase_return_items',
        actionMethods: {
            read:'GET'
        },
        // params:{
        //     key:key,
        // },
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

// storeGridItemPurchaseReturn.on('beforeload', function(store, operation) {
//     operation.params = {
//         'key':key,
//         // 'idunit':Ext.getCmp('idunit_grdso').getValue(),
//         // 'startdate': Ext.getCmp('startdate_grdpo').getValue(),
//         // 'enddate': Ext.getCmp('enddate_grdpo').getValue(),
    // }    
// });

//end store head

Ext.define(dir_sys + 'purchasing.GridItemEntryPurchaseReturn', {
    extend: 'Ext.grid.Panel',
    id: 'GridItemEntryPurchaseReturn',
    alias: 'widget.GridItemEntryPurchaseReturn',
    xtype: 'cell-editing',
    // title: 'Input Purchase Order',
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
            store: storeGridItemPurchaseReturn,
            columns: [
            	{
                    text: 'Hapus',
                    width: 65,
                    xtype: 'actioncolumn',
                    tooltip: 'Hapus',
                    align: 'center',
                    icon: BASE_URL + 'assets/icons/fam/cancel.png',
                    handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                        storeGridItemPurchaseReturn.removeAt(rowIndex);
                        update_summary_purchace_return();
                    }
                },
            	{
                    header: 'purchase_return_item_id',
                    hidden: true,
                    dataIndex: 'purchase_return_item_id',
                    //                    id: 'idinventory'
                },{
                    header: 'purchase_return_id',
                    hidden: true,
                    dataIndex: 'purchase_return_id',
                    //                    id: 'idinventory'
                },{
                    header: 'purchase_id',
                    hidden: true,
                    dataIndex: 'purchase_id',
                    //                    id: 'idinventory'
                },{
                    header: 'purchase_item_id',
                    hidden: true,
                    dataIndex: 'purchase_item_id',
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
                    header: 'Qty Beli',
                    minWidth: 100,
                    dataIndex: 'qty_purchase',
                    align: 'right'
                },
                {
                	 xtype: 'numbercolumn',
                    header: 'Total Jual',
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
                    header: 'Total Retur',
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
                    store: storeGridItemPurchaseReturn, // same store GridPanel is using
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
                        // disableGridItemEntryPurchaseReturn();
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
                update_summary_purchace_return();
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
    	WindowPurchaseItem4ReturnList.show();

    	//reset data grid first
    	var current_data_store = Ext.getCmp('GridPurchaseItemReturnList').getStore();
        Ext.each(current_data_store.data.items, function(obj, i) {
                current_data_store.removeAt(i);
        });

    	var form = Ext.getCmp('EntryPurchaseReturn').getForm();

	  	var selected_data_store = Ext.getCmp('GridItemEntryPurchaseReturn').getStore();
	  	var arr = Ext.pluck(selected_data_store.data.items, 'data');
	  	var selected = [];
        Ext.each(arr, function(item) {
        	console.log(item)
        	selected.push(item.purchase_item_id);
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
  //                   var rec = new GridItemPurchaseReturnModel({
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

function update_summary_purchace_return(){
    var form = Ext.getCmp('EntryPurchaseReturn').getForm();
    var store = Ext.getCmp('GridItemEntryPurchaseReturn').getStore();
    var total_qty = 0;
    var total_return = 0;
    Ext.each(store.data.items, function(obj, i) {
        console.log(obj)

        var total_per_row = obj.data.price*obj.data.qty_retur;
        total_qty+=obj.data.qty_retur;
        total_return+=total_per_row;

        obj.set('total_return', total_per_row);
    });

    form.findField('total_qty_return').setValue(number_format(total_qty));
    form.findField('total_amount_return').setValue(number_format(total_return));
}