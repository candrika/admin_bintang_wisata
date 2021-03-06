Ext.define('GridItemsdrugModel', {
    extend: 'Ext.data.Model',
    fields: ['product_id','product_name','no_sku','product_description','stock_available','product_unit_name','product_unit_code','product_unit_id','namecat','stock_available','retail_price_member'],
  	idProperty: 'id'
});

var storeGridItemsdrug = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemsdrugModel',
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

storeGridItemsdrug.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
    	'idunit': idunit,
        'key': key,
        'idinventorycat':Ext.getCmp('idinventorycat_drug').getValue(),
        'business_id':'10,12',
    };
});

Ext.define('MY.searchGridItemsdrug', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridItemsdrug',
    store: storeGridItemsdrug,
    width: 180
});

var smGridItemsdrug = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemsdrug.getSelection().length;
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

Ext.define(dir_sys + 'docter.GridItemsdrug', {
    itemId: 'GridItemsdrugID',
    id: 'GridItemsdrugID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridItemsdrug',
    store: storeGridItemsdrug,
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
                    product_unit_code: selectedRecord.get('product_unit_code'),
                    product_unit_id: selectedRecord.get('product_unit_id'),
                    qty: selectedRecord.get('stock_available'),
                    subtotal: selectedRecord.get('retail_price_member'),
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
      header: 'Stok Tersedia',
      dataIndex: 'stock_available',
      minWidth: 150,
      xtype: 'numbercolumn',
      align: 'right'
    },
    {
      header: 'Satuan',
      dataIndex: 'product_unit_name',
      minWidth: 150,
    },
    {
      header: 'Biaya Obat',
      dataIndex: 'retail_price_member',
      xtype: 'numbercolumn',
      align: 'right',
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
                            var store_drug =Ext.getCmp('GridItemsdrugID').getStore();
                            store_drug.extraParams = {};
                            store_drug.load();
                        }
                        
                    }
                },
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridItemsdrug',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridItemsdrug, // same store GridPanel is using
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
        xtype: 'GridItemsdrug'
    }]
});