Ext.define('GridItemsCompositionfeeModel', {
    extend: 'Ext.data.Model',
    fields: ['product_id','product_name','no_sku','product_description','stock_available','product_unit_code','product_unit_id','namecat'],
    idProperty: 'id'
});

var storeGridItemsCompositionfee = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemsCompositionfeeModel',
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

storeGridItemsCompositionfee.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'idunit': idunit,
        'key': key,
        'idinventorycat':Ext.getCmp('idinventorycat_composition').getValue()
    };
});

Ext.define('MY.searchGridItemsCompositionfee', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridItemsCompositionfee',
    store: storeGridItemsCompositionfee,
    width: 180
});

var smGridItemsCompositionfee = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemsCompositionfee.getSelection().length;
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

Ext.define(dir_sys + 'inventory.GridItemsCompositionfee', {
    itemId: 'GridItemsCompositionfeeID',
    id: 'GridItemsCompositionfeeID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridItemsCompositionfee',
    store: storeGridItemsCompositionfee,
    loadMask: true,
    columns: [{
            text: 'Pilih',
            width: 55,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {

                var reccompositionfee = new GridProductCompositionfeeModel({
                    product_composition_id: selectedRecord.get('product_id'),
                    product_unit_id: selectedRecord.get('product_unit_id'),
                    no_sku: selectedRecord.get('no_sku'),
                    namecat: selectedRecord.get('namecat'),
                    product_name: selectedRecord.get('product_name'),
                    qty: selectedRecord.get('stock_available'),
                    product_unit_code: selectedRecord.get('product_unit_code'),
                });

                var grid_compositionfee = Ext.getCmp('GridProductCompositionfee');
                grid_compositionfee.getStore().insert(0, reccompositionfee);
                Ext.getCmp('wItemsCompositionfee').hide();

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
      dataIndex: 'product_unit_code',
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
                    id: 'idinventorycat_composition', 
                    fieldLabel: 'Kategori',
                    listeners:{
                        'change': function(field, newValue, oldValue) {
                            storeGridItemsCompositionfee.load({
                                params: {
                                    'idinventorycat':Ext.getCmp('idinventorycat_composition').getValue()

                                }
                            });
                        }
                        
                    }
                },
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridItemsCompositionfee',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridItemsCompositionfee, // same store GridPanel is using
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

Ext.define(dir_sys + 'inventory.wItemsCompositionfee',{
    extend: 'Ext.window.Window',
    alias: 'widget.wItemsCompositionfee',
    id: 'wItemsCompositionfee',
    title: 'Pilh Obat',
    closable: true,
    closeAction: 'hide',
    width: panelW-100,
    modal: true,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridItemsCompositionfee'
    }]
});