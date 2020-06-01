if(!Ext.isDefined(Ext.getCmp('WindowProductStockOpnamePopup'))){
    var WindowProductStockOpnamePopup = Ext.create(dir_sys + 'inventory.WindowProductStockOpnamePopup');
}
// WindowimportStockOpname
if(!Ext.isDefined(Ext.getCmp('WindowimportStockOpname'))){
    var WindowimportStockOpname = Ext.create(dir_sys + 'inventory.WindowimportStockOpname');

}

// if(!Ext.isDefined(Ext.getCmp('WindowCoaCostSalesAccount'))){
//     var WindowGridCoaCostSalesAccount = Ext.create(dir_sys + 'inventory.WindowCoaCostSalesAccount');

// }
// WindowGridCoaCostSalesAccount

Ext.define('StockOpnameItemPopupModel', {
    extend: 'Ext.data.Model',
    fields: ['product_id','stock_opname_id','product_name','location_name','no_barcode','retail_price','stock_available','adjustment_stock','variance','notes','product_id','no_sku','retail_price','current_stock','rowIndex'],
    idProperty: 'id'
});
var storeStockOpnameItemPopup= Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'StockOpnameItemPopupModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API  + 'inventory/stock_opnameItems',
        actionMethods:{
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

storeStockOpnameItemPopup.on('beforeload', function(store, operation, eOpts) {
  operation.params = {
    'idunit':idunit,
    'key':key,
    'password':password,
    // 'deleted':0,
    'stock_opname_id':Ext.getCmp('stock_opname_id').getValue()
  };
});

Ext.define('MY.searchStockOpnameItemPopup', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchStockOpnameItemPopup',
    store: storeStockOpnameItemPopup,
    width: 180
});

Ext.define('StockOpnameItemPopup', {
    extend: 'Ext.grid.Panel',
    id:'StockOpnameItemPopup',
    alias: 'widget.StockOpnameItemPopup',
    xtype:'cell-editing',
    
       initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit:1
        });

        Ext.apply(this, {
            width: 1200,
            height:350,
            // title:'Persyaratan Simpanan Anggota',
            autoHeight: true,
            forceFit: true,
            plugins: [this.cellEditing],
            store: storeStockOpnameItemPopup,
            columns: [
            {
                xtype: 'actioncolumn',
                text:'Hapus',
                width: 70,
                align: 'center',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: BASE_URL + 'assets/icons/fam/cross.gif',
                    tooltip: 'Hapus',
                    scope: this,
                    handler: this.onRemoveClick
                }]
            },
            {
              hidden: true,
              header: 'product_id',
              dataIndex: 'product_id',
            },
            {
              // hidden: true,
              header: 'stock_opname_id',
              dataIndex: 'stock_opname_id',
              hidden: true
            },
            // {
            //   header: 'Harga',
            //   dataIndex: 'retail_price',
            //   minWidth: 200
            // },
            {
              header: 'No Barang',
              // hidden:true,
              dataIndex: 'no_sku',
              minWidth: 125
            },
            {
              header: 'No Barcode',
              // hidden:true,
              dataIndex: 'no_barcode',
              minWidth: 125
            },
            // {header: 'Unit', dataIndex: 'namaunit', minWidth: 100},
            {
              header: 'Nama Barang',
              dataIndex: 'product_name',
              minWidth: 150,
              flex: 1
            },
            {
              header: 'Lokasi',
              dataIndex: 'location_name',
              minWidth: 150,
              // flex: 1
            },
            {
              header: 'Stok Tercatat',
              dataIndex: 'current_stock',
              minWidth: 125,
              xtype: 'numbercolumn',
              align: 'right'
            },
            {
                header: 'Stok Terhitung',
                dataIndex: 'adjustment_stock',
                minWidth: 125,
                xtype: 'numbercolumn',
                align: 'right',
                editor:{            
                    xtype: 'textfield',
                    // allowBlank: false,
                    // value:'0',
                    // listeners:{
                    //     'change': function(grid, rowIndex,selectedRecord, row) {
                    //         var stock_available = rowIndex.record;
                    //         console.log(stock_available)
                    //     }   
                    // }    
                }
            },
            {
              header: 'Selisih Stok',
              dataIndex: 'variance',
              minWidth: 150,
              xtype: 'numbercolumn',
              align: 'right',
              // value:'0',  
            },
            {
              header: 'Catatan',
              dataIndex: 'notes',
              minWidth: 150,
              editor:{
                
              }
            },{
                hidden:true,
                dataIndex:'rowIndex'
            }],
            selModel: {
                selType: 'cellmodel'
            },
            dockedItems: [  
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                            text:'Tambah',
                            iconCls: 'add-icon',
                            handler:function(){
                                WindowProductStockOpnamePopup.show();
                                var data = Ext.pluck(Ext.getCmp('StockOpnameItemPopup').getStore().data.items,'data');
                                // console.log(data.length)
                                if(data.length>0){
                                    if(Ext.getCmp('stock_opname_id').getValue()){
                                        Ext.Ajax.request({
                                            method:'GET',
                                            url:CLINIC_API  + 'inventory/product_list',
                                            params:{
                                               key:key,
                                               password:password,
                                               idunit:idunit,
                                               stock_opname_id:Ext.getCmp('stock_opname_id').getValue()
                                            },
                                            success:function(form,action){
                                                Ext.getCmp('ProductStockOpnamePopup').getStore().load();  
                                            },
                                            failure:function(form,action){

                                            }
                                        });    
                                    }
                                    console.log(Ext.getCmp('ProductStockOpnamePopup').getStore())
                                }else{
                                    Ext.getCmp('ProductStockOpnamePopup').getStore().load();
                                }
                                
                            }    
                    },{
                        text:'Import',
                        iconCls:'page_excel',
                        handler:function(){
                            WindowimportStockOpname.show();
                            // var form_import = Ext.getCmp('formImportProduct').getForm();
                            // console.log(form_import);
                            var stock_opname_id=Ext.getCmp('stock_opname_id').getValue();
                            console.log(stock_opname_id);
                            Ext.getCmp('stock_opnameImport_id').setValue(stock_opname_id);
                        }
                    },'->',
                    'Pencarian',{
                        xtype:'searchStockOpnameItemPopup',
                        text:'Left Button'
                    }]
                },
                {
                    xtype: 'pagingtoolbar',
                    store: storeStockOpnameItemPopup, // same store GridPanel is using
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
                        // disableGridItemEntryPurchaseOrder();
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
            edit: function(grid,rowIndex,selectedRecord) {
                console.log(rowIndex);
                var new_variance =rowIndex.record.data.adjustment_stock-rowIndex.record.data.current_stock;
                console.log(new_variance)
                var myGrid =rowIndex.grid;
                console.log(myGrid.getStore().getAt(rowIndex.rowIdx))
                myGrid.getStore().getAt(rowIndex.rowIdx).set('variance',new_variance);
                // selectedRecord.set('variance','10')
            },
            change:function(){
                // alert('say hello')   
            }
        });

        // this.on('selectCustomer', this.onSelectCustomer, this);
    },
    onAfterEdit: function(o) {
        // handle after edit
       
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
    onAddClick: function(grid, rowIndex) {
        console.log(grid)
    },
    onRemoveClick: function(grid, rowIndex, record) {
        // console.log(this.getStore());
        console.log(grid.getStore().data.items[0].raw)
        if(grid.getStore().data.items[0].raw){
            Ext.Ajax.request({
                url:CLINIC_API  +'inventory/delete_stock_opnameItem',
                method:'POST',
                params:{
                    id:grid.getStore().data.items[0].raw.stock_opname_id,
                    product_id:grid.getStore().data.items[0].raw.product_id,
                    key:key
                },
                success:function(form,action){

                },
                failure:function(form,action){

                }
            })    
        }
        //insert data to grid product list when local store of stock opname item deleted        
        var rec = new ProductStockOpnamePopupModel({
            product_id:grid.getStore().data.items[0].raw.product_id,
            retail_price:grid.getStore().data.items[0].raw.retail_price,
            no_sku:grid.getStore().data.items[0].raw.no_sku,
            no_barcode:grid.getStore().data.items[0].raw.no_barcode,
            product_name:grid.getStore().data.items[0].raw.product_name,
            stock_available:grid.getStore().data.items[0].raw.current_stock,    
        })
        var grid_product = Ext.getCmp('ProductStockOpnamePopup');
        grid_product.getStore().insert(0,rec);
        
        this.getStore().removeAt(rowIndex);
        
    },
    onEdit: function(editor, e) {
        e.record.commit();
        console.log(grid)
    },onEditclick:function(grid,rowIndex){
        alert('hallo')
        // console.log(grid)
    }
});

Ext.define('EntryStockOpnameItemPopup', {
    extend: 'Ext.form.Panel',
    alias: 'widget.EntryStockOpnameItemPopup',
    id: 'EntryStockOpnameItemPopup',
    url: CLINIC_API  + 'sales/create',
    bodyStyle: 'padding:5px',
    forceFit: true,
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 120,
        width: 340
    },
    bodyPadding: 5,
    autoWidth: true,
    defaults: {
        anchor: '100%'
    },
    items: [{
       xtype:'container',
       layout:'vbox',
       items:[{
            xtype:'hiddenfield',
            name:'stock_opname_id',
            id:'stock_opname_id'
       },{
            xtype:'container',
            layout:'hbox',
            items:[{
                xtype: 'datefield',
                labelWidth: 120,
                id: 'date_stockopname',
                format: 'd/m/Y',
                fieldLabel: 'Tanggal Hitung'
            },{
                xtype:'comboxStockOpnameStatus',
                id:'StockOpnameStatus',
                name:'status',
                readOnly:true,
                value:1
            }]
       },{
            xtype:'container',
            layout:'vbox',
            items:[{
                xtype:'StockOpnameItemPopup'
            }]
       },
       // {
       //      xtype:'container',
       //      layout:'hbox',
       //      items:[{
       //          xtype:'hiddenfield',
       //          id:'coa_costsales_id',
       //          // fieldLabel:'Akun Beban',
       //          name:'coa_costsales_id',
       //      },
       //      {
       //          xtype:'textfield',
       //          id:'coa_costsales_name',
       //          fieldLabel:'Akun Beban',
       //          name:'coa_costsales_name',
       //          listeners:{
       //              render:function(component){
       //                      component.getEl().on('click', function(event, el) {
       //                          WindowGridCoaCostSalesAccount.show();
       //                          var CostSalesAccount=Ext.getCmp('CoaCostSalesAccountid').getStore();
       //                                  CostSalesAccount.getProxy().extraParams={};
       //                                  CostSalesAccount.on('beforeload', function(store, operation, eOpts) {
       //                                      operation.params = {
       //                                          'idunit': idunit,
       //                                          'idaccounttype': '13,14' //piutang
       //                                                          // 'idaccounttype': '1,19'
       //                                      };
       //                                  });
       //                                  CostSalesAccount.load();    
       //                      }); 
       //              }
       //          }
       //      }
       //      ]
       // }
       ]
    }]
});


Ext.define(dir_sys+'inventory.WindowStockOpnameItemPopup', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowStockOpnameItemPopup',
    id:'WindowStockOpnameItemPopup',
    title: 'Stok Opname Baru',
    autoScroll: true,
    header: {
        titleAlign: 'left'
    },
    maximizable: true,
    closable: true,
    autoDestroy: false,
    modal: true,
    closeAction: 'hide',
    autoWidth: true,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'EntryStockOpnameItemPopup'
    }],
     listeners: {
        'show': function() {
            // storeStockOpnameItemPopup.load();
        }
    },
    buttons:[{
         text: 'Batal',
         handler: function() {
            var win = Ext.getCmp('WindowStockOpnameItemPopup');
            Ext.getCmp('StockOpnameItemPopup').getStore().removeAll();
            Ext.getCmp('EntryStockOpnameItemPopup').getForm().reset();
            win.hide();
        }
    },{
       text: 'Simpan',
        id: 'btnRecordOpnameItem',
        handler: function(button, event, options) {
            // var form = Ext.getCmp('EntryStockOpnameItemPopup').getForm(); 
            console.log(Ext.pluck(Ext.getCmp('StockOpnameItemPopup').getStore().data.items,'data'))
            Ext.Ajax.request({
                url:CLINIC_API  +'inventory/save_opname',
                method:'POST',
                params:{
                    key:key,
                    password:password,
                    idunit:idunit,
                    datein:Ext.getCmp('date_stockopname').getValue(),
                    status:Ext.getCmp('StockOpnameStatus').getValue(),
                    data_grid:Ext.encode(Ext.pluck(Ext.getCmp('StockOpnameItemPopup').getStore().data.items,'data')),
                    stock_opname_id:Ext.getCmp('stock_opname_id').getValue(),
                    // coa_costsales_id:Ext.getCmp('coa_costsales_id').getValue(),
                    
                },
                success:function(form,action){
                    var d = Ext.decode(form.responseText);
                    
                    Ext.Msg.alert('Info',d.message);
                    var win = Ext.getCmp('WindowStockOpnameItemPopup');
                    Ext.getCmp('EntryStockOpnameItemPopup').getForm().reset();
                    win.hide();
                    Ext.getCmp('GridStockOpname').getStore().load();

                },
                failure:function(form,action){
                  var d = Ext.decode(form.responseText);
                  Ext.Msg.alert('Info',d.message);
                }
            })
        }  
    }]
});

function set_stock(){
 console.log(set_stock)   
}