
var wItemsCompositionfee = Ext.create(dir_sys + 'inventory.wItemsCompositionfee');
// var WindowComposition = Ext.create(dir_sys + 'inventory.WindowComposition');

Ext.define('GridProductCompositionfeeModel', {
    extend: 'Ext.data.Model',
    fields: ['product_id','product_composition_id','qty','product_unit_id','notes','no_sku','product_name','product_unit_code','composition_type','fee_amount'],
    idProperty: 'id'
});

var storeGridProductCompositionfee = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridProductCompositionfeeModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'inventory/compositions',
        actionMethods:{read:'GET'},
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

storeGridProductCompositionfee.on('beforeload', function(store, operation, eOpts) {
  operation.params = {
    'key':key,
    'product_id':'',
    'composition_type':2
  };
});

Ext.define('MY.searchGridProductCompositionfee', {
  extend: 'Ext.ux.form.SearchField',
  alias: 'widget.searchGridProductCompositionfee',
  store: storeGridProductCompositionfee,
  width: 180
});

var smGridProductCompositionfee = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
    deselect: function(model, record, index) {
      var selectedLen = smGridProductCompositionfee.getSelection().length;
      if (selectedLen == 0) {
        console.log(selectedLen);
        // Ext.getCmp('btnDeleteInventoryAllBySku').disable();
      }
    },
    select: function(model, record, index) {
      // Ext.getCmp('btnDeleteInventoryAllBySku').enable();
    }
  }
})

Ext.define(dir_sys + 'inventory.GridProductCompositionfee', {
    extend: 'Ext.grid.Panel',
    id: 'GridProductCompositionfee',
    alias: 'widget.GridProductCompositionfee',
    xtype: 'cell-editing',
    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: 800,
            height:300,
            title:'Biaya atau Komponen lainnya',
            forceFit: true,
            plugins: [this.cellEditing],
            selModel:smGridProductCompositionfee,
            store: storeGridProductCompositionfee,
            columns: [
                {
                    header: 'product_id',
                    hidden: true,
                    dataIndex: 'product_id',
                },
                {
                    header: 'product_unit_id',
                    hidden: true,
                    dataIndex: 'product_unit_id',
                },
                {
                    header: 'product_composition_id',
                    hidden: true,
                    dataIndex: 'product_composition_id',
                },
                {
                    header: 'No Barang',
                    dataIndex: 'no_sku',
                    width: 100
                },
                {
                    header: 'Nama Barang',
                    dataIndex: 'product_name',
                    width: 150,
                },
                {
                   header:'Qty',
                   dataIndex:'qty',
                   width:100,
                   xtype: 'numbercolumn',
                   align: 'right',
                   editor:{
                      xtype:'numberfield'
                   } 
                },
                {
                    header: 'Satuan',
                    dataIndex: 'product_unit_id',
                    width: 100,
                    editor:{
                      xtype:'comboxProductUnit',
                      hideLabel: true,
                      displayField: 'product_unit_code',
                      valueField: 'product_unit_id',
                      id:'comboxGrid'
                      // store:ProductUnitStore
                    },
                    renderer: function(value) {
                      return load_comboxGrid(ProductUnitStore,value)
                    }
                },
                {
                    header: 'biaya',
                    dataIndex: 'fee_amount',
                    width: 150,
                    flex:1,
                    xtype: 'numbercolumn',
                    align: 'right',
                    editor:{
                      xtype:'numberfield'
                    } 
                },     
                {
                    header: 'Catatan',
                    dataIndex: 'notes',
                    width: 150,
                    flex:1,
                    editor:{
                      xtype:'textfield'
                    } 
                }
            ],
            selModel: {
                selType: 'cellmodel'
            },
            dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    text: 'Tambah',
                    iconCls: 'add-icon',
                    id: 'btnAddItemCompositionfee',
                    scope: this,
                    handler:function(){
                        wItemsCompositionfee.show();
                        Ext.getCmp('GridItemsCompositionfeeID').getStore().load();
                    }
                  },
                  {
                    text: 'Edit',
                    iconCls: 'add-icon',
                    id: 'btneditItemCompostionfee',
                    scope: this,
                    hidden:true,
                    handler: function(){
                      var grid = Ext.getCmp('GridProductCompositionfee');
                      var selectedRecord = grid.getSelectionModel().getSelection()[0];
                      var data = grid.getSelectionModel().getSelection();
                      if (data.length == 0) {
                         Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                      } else {
                        WindowComposition.show();
                        var formProductComponent =Ext.getCmp('formProductComponent').getForm();
                        
                        Ext.getCmp('product_unit_idcode').getStore().load()

                        formProductComponent.findField('product_unit_id').setValue(selectedRecord.data.product_unit_id);
                        formProductComponent.findField('product_id').setValue(selectedRecord.data.product_id);
                        formProductComponent.findField('product_composition_id').setValue(selectedRecord.data.product_composition_id);
                        formProductComponent.findField('product_name').setValue(selectedRecord.data.product_name);
                        formProductComponent.findField('no_sku').setValue(selectedRecord.data.no_sku);
                        formProductComponent.findField('qty').setValue(selectedRecord.data.qty);
                        Ext.getCmp('product_unit_idcode').setValue(selectedRecord.data.product_unit_id);
                        formProductComponent.findField('notes').setValue(selectedRecord.data.notes);
                        
                      }
                    }
                  },
                  {
                    text: 'Hapus',
                    iconCls: 'add-icon',
                    id: 'btndeleteItemCompositionfee',
                    scope: this,
                      handler: function(){
                        Ext.Msg.show({
                          title: 'Confirm',
                          msg: 'Delete Selected ?',
                          buttons: Ext.Msg.YESNO,
                          fn: function(btn) {
                             if (btn == 'yes') {
                                 var grid = Ext.getCmp('GridProductCompositionfee');
                                 var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                 // var data = grid.getSelectionModel().getSelection();
                                 
                                 console.log(selectedRecord.data) 

                                Ext.Ajax.request({
                                  url: CLINIC_API + 'inventory/hapus_composition',
                                  method: 'POST',
                                  params: {
                                            product_id: selectedRecord.data.product_id,
                                            product_composition_id: selectedRecord.data.product_composition_id,
                                            composition_type:2,
                                            key:key,
                                  },
                                  success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (!d.success) {
                                      Ext.Msg.alert('Informasi', d.message);
                                      Ext.getCmp('GridProductCompositionfee').getStore().remove(selectedRecord)
                                      
                                    } else {
                                      Ext.Msg.alert('Informasi', d.message);
                                      storeGridProductCompositionfee.load();

                                    }
                                    storeGridInventory.load();
                                  },
                                  failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                  }
                                }); 
                             } 
                          }
                        });
                      }
                  },'->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridProductCompositionfee',
                    text: 'Left Button'
                }]
            },{
                  xtype: 'pagingtoolbar',
                  store: storeGridProductCompositionfee, // same store GridPanel is using
                  dock: 'bottom',
                  // displayInfo: true
            }],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {},
                render: {
                    scope: this,
                    fn: function(grid) {
                        // disableGridProductCompositionfee();
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
                // updateGridSalesOrder('general');
            }
        });

        // this.on('selectCustomer', this.onSelectCustomer, this);
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    loadStore: function() {},
    onStoreLoad: function() {
        //        Ext.Msg.show({
        //            title: 'Store Load Callback',
        //            msg: 'store was loaded, data available for processing',
        //            icon: Ext.Msg.INFO,
        //            buttons: Ext.Msg.OK
        //        });
    },
    onAddClick: function() {

        wDiseasePopuop.show();
        Ext.getCmp('GriddiseasePopuopID').getStore().load();
    },
    onRemoveClick: function(grid, rowIndex) {
        this.getStore().getRange()[rowIndex].data['deleted'] = 1;
        this.getStore().clearFilter();
        this.getStore().filter([function(item) { return item.get('deleted') != "1" }]);
        // updateGridSalesOrder('general')
    },
    onEdit: function(editor, e) {
        // e.record.commit();
    }
});
