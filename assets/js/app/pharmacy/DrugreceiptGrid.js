Ext.define('DrugreceiptGridModel', {
    extend: 'Ext.data.Model',
    fields: ['medical_record_id','product_id','product_name','no_sku','product_description','stock_available','product_unit_code','product_unit_id','namecat','qty','notes','subtotal'],
    idProperty: 'id'
});

var storeDrugreceiptGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'DrugreceiptGridModel',
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'docter/medical_drug',
        actionMethods:{read:'GET'},
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
    },
    sorters: [{
        property: 'menu_name',
        direction: 'DESC'
    }]
});

Ext.define('MY.searchDrugreceiptGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchDrugreceiptGrid',
    store: storeDrugreceiptGrid,
    width: 180
});


Ext.define(dir_sys + 'pharmacy.DrugreceiptGrid', {
    extend: 'Ext.grid.Panel',
    id: 'DrugreceiptGrid',
    alias: 'widget.DrugreceiptGrid',
    xtype: 'cell-editing',
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: 800,
            height:300,
            // title:'Resep',
            forceFit: true,
            plugins: [this.cellEditing],
            store: storeDrugreceiptGrid,
            columns:[{
                    header: 'medical_record_id',
                    hidden: true,
                    dataIndex: 'medical_record_id',
                },
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
                    header: 'No Obat',
                    dataIndex: 'no_sku',
                    width: 100
                },
                {
                    header: 'Nama Obat',
                    dataIndex: 'product_name',
                    width: 200
                },
                {
                    header: 'Qty',
                    dataIndex: 'qty',
                    width: 100,
                    xtype: 'numbercolumn',
                    align: 'right',
                    // editor:{
                    //     xtype:'numberfield'
                    // }
                },
                {
                    header: 'Satuan',
                    dataIndex: 'product_unit_code',
                    width: 100,  
                },
                // {
                //     header: 'Biaya Obat',
                //     dataIndex: 'subtotal',
                //     minWidth: 150,
                //     xtype: 'numbercolumn',
                //     align: 'right',
                //     // editor:{
                //     //         xtype:'textfield'
                //     // }
                // },
                {
                    header:'Catatan',
                    dataIndex:'notes',
                    width: 350,
                    editor:{
                        xtype:'textfield'
                    },
                    flex:1
                }
            ],
            selModel: {
                selType: 'cellmodel'
            },
            dockedItems: [

                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                    '->',
                    // {
                    //     xtype: 'searchDrugreceiptGrid',
                    //     text: 'Left Button',
                    // }
                    ]
                },
            ],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {},
                render: {
                    scope: this,
                    fn: function(grid) {
                        // disableDrugreceiptGrid();
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

        // wDiseasePopuop.show();
        // Ext.getCmp('GriddiseasePopuopID').getStore().load();
    },
    onRemoveClick: function(grid, rowIndex) {
        // var medical_record_id = this.getStore().getRange()[rowIndex].data['medical_record_id'];
        // var product_id = this.getStore().getRange()[rowIndex].data['product_id'];
        
        // Ext.Ajax.request({
        //     url:CLINIC_API + 'docter/delete_drug',
        //     method:'POST',
        //     params:{
        //         key:key,
        //         medical_record_id:medical_record_id,
        //         product_id:product_id
        //     },
        //     success:function(form,action){

        //     },
        //     failure:function(form,action){

        //     }
        // })
        
        // this.getStore().getRange()[rowIndex].data['deleted'] = 1;
        // this.getStore().clearFilter();
        // this.getStore().filter([function(item) { return item.get('deleted') != "1" }]);
        // // updateGridSalesOrder('general')
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});