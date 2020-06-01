if(!Ext.isDefined(Ext.getCmp('wItemsdrugPopupwItemsdrugPopup'))){
    var wItemsdrugPopup    = Ext.create(dir_sys + 'docter.wItemsdrugPopup');
}else{
    var wItemsdrugPopup    = Ext.getCmp('wItemsdrugPopup');
}

Ext.define('GridrecorddrugModel', {
    extend: 'Ext.data.Model',
    fields: ['medical_record_id','product_id','product_name','no_sku','product_description','stock_available','product_unit_code','product_unit_id','namecat','qty','notes','subtotal'],
    idProperty: 'id'
});

var storeGridrecorddrug = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridrecorddrugModel',
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


Ext.define(dir_sys + 'docter.Gridrecorddrug', {
    extend: 'Ext.grid.Panel',
    id: 'Gridrecorddrug',
    alias: 'widget.Gridrecorddrug',
    xtype: 'cell-editing',
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width:panelW,
            height:300,
            title:'Obat dan Resep Apotik',
            forceFit: true,
            plugins: [this.cellEditing],
            store: storeGridrecorddrug,
            columns: [{
                    text:'Delete',
                    xtype: 'actioncolumn',
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
                },{
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
                    width: 100
                },
                // {
                //     header: 'Kategori',
                //     dataIndex: 'namecat',
                //     width: 150,
                // },
                // {
                //     header: 'Jenis',
                //     dataIndex: '',
                //     width: 150,	
                // },
                {
                    header: 'Qty',
                    dataIndex: 'qty',
                    width: 50,
                    xtype: 'numbercolumn',
                    align: 'right',
                    editor:{
                        xtype:'numberfield',
                        // allowBlank:false,
                        minValue: 1
                    }
                },
                {
                    header: 'Satuan',
                    dataIndex: 'product_unit_code',
                    width: 50,  
                },
                {
                  header: 'Biaya Obat',
                  dataIndex: 'subtotal',
                  minWidth: 150,
                  xtype: 'numbercolumn',
                  align: 'right',
                  editor:{
                        xtype:'textfield'
                  }
                },
                {
                    header:'Catatan',
                    dataIndex:'notes',
                    width: 250,
                    editor:{
                        xtype:'textfield'
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
                        text: 'Tambah Obat',
                        iconCls: 'add-icon',
                        id: 'btnAddItemdrug',
                        scope: this,
                        handler: function(){
                            wItemsdrugPopup.show();
                            Ext.getCmp('idinventorycat_drug').getStore().load()
                            Ext.getCmp('idinventorycat_drug').setValue();
                            Ext.getCmp('GridItemsdrugID').getStore().load();
                        }
                    },{
                        text: 'Hapus',
                        iconCls: 'add-icon',
                        id: 'btndeleteItemdrug',
                        scope: this,
                        handler: function(){
                            var grid = Ext.ComponentQuery.query('Gridrecorddrug')[0];
                            var selectedRecord = grid.getSelectionModel().getSelection()[0];
                            var data = grid.getSelectionModel().getSelection();
                            if (data.length == 0) {
                                Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                            } else {
                                Ext.Msg.show({
                                    title: 'Confirm',
                                    msg: 'Data pasien akan dihapus ?',
                                    buttons: Ext.Msg.YESNO,
                                    fn: function(btn) {
                                        if (btn == 'yes') {
                                            Ext.Ajax.request({
                                                url: CLINIC_API + 'docter/delete_drug',
                                                method: 'POST',
                                                params: {
                                                    medical_record_id:selectedRecord.data.medical_record_id,
                                                    product_id:selectedRecord.data.product_id,
                                                    key:key,
                                                },
                                                success: function(form, action) {
                                                    var d = Ext.decode(form.responseText);
                                                    if (!d.success) {
                                                        Ext.Msg.alert('Informasi', d.message);
                                                        storeGridrecorddrug.load();       
                                                    } else {
                                                        storeGridrecorddrug.load();
                                                    }
                                                },
                                                failure: function(form, action) {
                                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                                }
                                            });                                    
                                        }
                                    }
                                })
                            }    
                        }
                    }]
                },
            ],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {},
                render: {
                    scope: this,
                    fn: function(grid) {
                        // disableGridrecorddrug();
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
        var medical_record_id = this.getStore().getRange()[rowIndex].data['medical_record_id'];
        var product_id = this.getStore().getRange()[rowIndex].data['product_id'];
        
        Ext.Ajax.request({
            url:CLINIC_API + 'docter/delete_drug',
            method:'POST',
            params:{
                key:key,
                medical_record_id:medical_record_id,
                product_id:product_id
            },
            success:function(form,action){

            },
            failure:function(form,action){

            }
        })
        
        this.getStore().getRange()[rowIndex].data['deleted'] = 1;
        this.getStore().clearFilter();
        this.getStore().filter([function(item) { return item.get('deleted') != "1" }]);
        // updateGridSalesOrder('general')
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});