var wDiseasePopuop    = Ext.create(dir_sys + 'docter.wDiseasePopuop');

Ext.define('GridrecorddiseaseModel', {
    extend: 'Ext.data.Model',
    fields: ['medical_record_id', 'disease_id', 'disease_code', 'disease_name', 'disease_desc', 'notes'],
    idProperty: 'id'
});

var storeGridrecorddisease = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridrecorddiseaseModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'docter/medical_disease',
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


Ext.define(dir_sys + 'docter.Gridrecorddisease', {
    extend: 'Ext.grid.Panel',
    id: 'Gridrecorddisease',
    alias: 'widget.Gridrecorddisease',
    xtype: 'cell-editing',
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width:panelW,
            height:300,
            title:'Classification of Diseases (ICD-10)',
            forceFit: true,
            plugins: [this.cellEditing],
            store: storeGridrecorddisease,
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
                    header: 'disease_id',
                    hidden: true,
                    dataIndex: 'disease_id',
                },
                {
                    header: 'Kode',
                    dataIndex: 'disease_code',
                    width: 100
                },
                {
                    header: 'Diagnosa',
                    dataIndex: 'disease_name',
                    width: 150,
                },
                {
                    header: 'Deskripsi',
                    dataIndex: 'disease_desc',
                    width: 150,
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
                    items: [{
                        text: 'Tambah',
                        iconCls: 'add-icon',
                        id: 'btnAddItem',
                        scope: this,
                        handler:function(){
                            wDiseasePopuop.show();
                            Ext.getCmp('GriddiseasePopuopID').getStore().load();
                        }
                    },{
                        text: 'Hapus',
                        iconCls: 'add-icon',
                        id: 'btndeleteItem',
                        scope: this,
                        handler: function(){
                            var grid = Ext.ComponentQuery.query('Gridrecorddisease')[0];
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
                                                url: CLINIC_API + 'docter/delete_disease',
                                                method: 'POST',
                                                params: {
                                                    medical_record_id:selectedRecord.data.medical_record_id,
                                                    disease_id:selectedRecord.data.disease_id,
                                                    key:key,
                                                },
                                                success: function(form, action) {
                                                    var d = Ext.decode(form.responseText);
                                                    if (!d.success) {
                                                        Ext.Msg.alert('Informasi', d.message);
                                                        storeGridrecorddisease.load();       
                                                    } else {
                                                        storeGridrecorddisease.load();
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
                        // disableGridrecorddisease();
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
        var disease_id = this.getStore().getRange()[rowIndex].data['disease_id'];
        
        Ext.Ajax.request({
            url:CLINIC_API + 'docter/delete_disease',
            method:'POST',
            params:{
                key:key,
                medical_record_id:medical_record_id,
                disease_id:disease_id
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