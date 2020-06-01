
var wItemsComposition = Ext.create(dir_sys + 'inventory.wItemsComposition');
var WindowComposition = Ext.create(dir_sys + 'inventory.WindowComposition');

Ext.define('GridProductCompositionModel', {
    extend: 'Ext.data.Model',
    fields: ['product_id','product_composition_id','qty','product_unit_id','notes','no_sku','product_name','product_unit_code','composition_type'],
    idProperty: 'id'
});

var storeGridProductComposition = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridProductCompositionModel',
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

storeGridProductComposition.on('beforeload', function(store, operation, eOpts) {
  operation.params = {
    'key':key,
    'product_id':'',
    'composition_type':1
  };
});

Ext.define('MY.searchGridProductComposition', {
  extend: 'Ext.ux.form.SearchField',
  alias: 'widget.searchGridProductComposition',
  store: storeGridProductComposition,
  width: 180
});

var smGridProductComposition = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
    deselect: function(model, record, index) {
      var selectedLen = smGridProductComposition.getSelection().length;
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

Ext.define(dir_sys + 'inventory.GridProductComposition', {
    extend: 'Ext.grid.Panel',
    id: 'GridProductComposition',
    alias: 'widget.GridProductComposition',
    xtype: 'cell-editing',
    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: 800,
            height:300,
            title:'Daftar Komposisi',
            forceFit: true,
            plugins: [this.cellEditing],
            selModel:smGridProductComposition,
            store: storeGridProductComposition,
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
                    id: 'btnAddItemComposition',
                    scope: this,
                    handler:function(){
                        wItemsComposition.show();
                        Ext.getCmp('GridItemsCompositionID').getStore().load();
                    }
                  },
                  {
                    text: 'Edit',
                    iconCls: 'add-icon',
                    id: 'btneditItemCompostion',
                    scope: this,
                    hidden:true,
                    handler: function(){
                      var grid = Ext.getCmp('GridProductComposition');
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
                    id: 'btndeleteItemComposition',
                    scope: this,
                      handler: function(){
                        Ext.Msg.show({
                          title: 'Confirm',
                          msg: 'Delete Selected ?',
                          buttons: Ext.Msg.YESNO,
                          fn: function(btn) {
                             if (btn == 'yes') {
                                 var grid = Ext.getCmp('GridProductComposition');
                                 var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                 // var data = grid.getSelectionModel().getSelection();
                                 
                                 console.log(selectedRecord.data) 

                                Ext.Ajax.request({
                                  url: CLINIC_API + 'inventory/hapus_composition',
                                  method: 'POST',
                                  params: {
                                            product_id: selectedRecord.data.product_id,
                                            product_composition_id: selectedRecord.data.product_composition_id,
                                            composition_type: 1,
                                            key:key,
                                  },
                                  success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (!d.success) {
                                      Ext.Msg.alert('Informasi', d.message);
                                      Ext.getCmp('GridProductComposition').getStore().remove(selectedRecord)
                                      
                                    } else {
                                      Ext.Msg.alert('Informasi', d.message);
                                      storeGridProductComposition.load();

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
                    xtype: 'searchGridProductComposition',
                    text: 'Left Button'
                }]
            },{
                  xtype: 'pagingtoolbar',
                  store: storeGridProductComposition, // same store GridPanel is using
                  dock: 'bottom',
                  // displayInfo: true
            }],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {},
                render: {
                    scope: this,
                    fn: function(grid) {
                        // disableGridProductComposition();
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

// function load_comboxGrid(storeStatus,value){
    
//   // return console.log(storeStatus.data.items[0].raw)
//   var store = storeStatus.data.items;
//   var arr = [];
//   Ext.each(store,function(obj){
//       // return console.log(obj.raw)
//       if(obj.raw.product_unit_id==value){
//         arr.push(obj.raw.product_unit_id,obj.raw.product_unit_code) 
//       }
//   });

//   return arr[1]

// }