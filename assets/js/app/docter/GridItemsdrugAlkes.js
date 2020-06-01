Ext.define('GridItemsdrugAlkesModel', {
    extend: 'Ext.data.Model',
    fields: ['product_id','product_name','no_sku','product_description','stock_available','product_unit_name','product_unit_id','namecat','stock_available'],
  	idProperty: 'id'
});

var storeGridItemsdrugAlkes = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemsdrugAlkesModel',
    remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'inventory/products',
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

storeGridItemsdrugAlkes.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
    	'idunit': idunit,
        'key': key,
        'idinventorycat':Ext.getCmp('idinventorycat_drug').getValue(),
        'business_id':'12,13',
    };
});

Ext.define('MY.searchGridItemsdrugAlkes', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridItemsdrugAlkes',
    store: storeGridItemsdrugAlkes,
    width: 180
});

var smGridItemsdrugAlkes = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemsdrugAlkes.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                // Ext.getCmp('btnDeleteItemSalesPopupOrder').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteItemSalesPopupOrder').enable();
        }
    }
});

Ext.define(dir_sys + 'docter.GridItemsdrugAlkes', {
    itemId: 'GridItemsdrugAlkesID',
    id: 'GridItemsdrugAlkesID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridItemsdrugAlkes',
    store: storeGridItemsdrugAlkes,
    loadMask: true,
    columns: [{
            text: 'Pilih',
            width: 55,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {

                var recDrug = new GridrecorddrugModel({
                    product_id: selectedRecord.get('product_id'),
                    no_sku: selectedRecord.get('no_sku'),
                    namecat: selectedRecord.get('namecat'),
                    product_name: selectedRecord.get('product_name'),
                    product_unit_name: selectedRecord.get('product_unit_name'),
                    product_unit_id: selectedRecord.get('product_unit_id'),
                    qty: selectedRecord.get('stock_available'),
                });
                console.log(recDrug);
                var grid_drug = Ext.getCmp('Gridrecorddrug');
                grid_drug.getStore().insert(0, recDrug);
                Ext.getCmp('wItemsdrugPopup').hide();

            }
        },
    {
      header: 'product_id',
      dataIndex: 'product_id',
      hidden: true
    },
    {
      header: 'product_unit_id',
      dataIndex: 'product_unit_id',
      hidden: true
    },
    {
      header: 'Kode Obat',
      dataIndex: 'no_sku',
      minWidth: 220
    },
    {
      header: 'Kategori',
      dataIndex: 'namecat',
      minWidth: 220    
    },
    {
      header: 'Nama Obat',
      dataIndex: 'product_name',
      minWidth: 150,
      // flex: 1
    },
    {
      header: 'Satuan',
      dataIndex: 'product_unit_name',
      minWidth: 150,
    },
    {
      header: 'Deskrisi',
      dataIndex: 'product_description',
      minWidth: 150,
      flex:1
    }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            // hidden: true,
            dock: 'top',
            items: [
                {
                    xtype: 'comboxinventorycat', 
                    name: 'idinventorycat', 
                    id: 'idinventorycat_drug', 
                    fieldLabel: 'Kategori',
                    listeners:{
                        'change': function(field, newValue, oldValue) {
                            storeGridItemsdrugAlkes.load({
                                params: {
                                    'idinventorycat':Ext.getCmp('idinventorycat_drug').getValue()

                                }
                            });
                        }
                        
                    }
                },
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridItemsdrugAlkes',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridItemsdrugAlkes, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        refresh : function (dataview) {
          
        },
        render: {
            scope: this,
            fn: function(grid) {
              
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

           
        }
    }
});

Ext.define(dir_sys + 'docter.wItemsdrugPopup',{
    extend: 'Ext.window.Window',
    alias: 'widget.wItemsdrugPopup',
    id: 'wItemsdrugPopup',
    title: 'Pilh Obat',
    closable: true,
    closeAction: 'hide',
    width: panelW-100,
    modal: true,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridItemsdrugAlkes'
    }]
});