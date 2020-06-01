var wActionPopuop        = Ext.create(dir_sys + 'docter.wActionPopuop');

if(!Ext.isDefined(Ext.getCmp('wMedicalActionPopuop'))){
   var wMedicalActionPopuop = Ext.create(dir_sys + 'docter.wMedicalActionPopuop');

}else{
    var wMedicalActionPopuop    = Ext.getCmp('wMedicalActionPopuop');
}


Ext.define('GridrecordactionModel', {
    extend: 'Ext.data.Model',
    fields: ['medical_record_id', 'medical_action_id', 'medical_action_name', 'medical_action_desc', 'notes','deleted','service_fee'],
    idProperty: 'id'
});

var storeGridrecordaction = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridrecordactionModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'docter/medical_action',
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

Ext.define(dir_sys + 'docter.Gridrecordaction', {
    extend: 'Ext.grid.Panel',
    id: 'Gridrecordaction',
    alias: 'widget.Gridrecordaction',
    xtype: 'cell-editing',
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width:700,
            height:300,
            title:'Tindakan',
            forceFit: true,
            plugins: [this.cellEditing],
            store: storeGridrecordaction,
            columns: [{
                    text:'Delete',
                    xtype: 'actioncolumn',
                    width: 30,
                    align: 'center',
                    sortable: false,
                    menuDisabled: true,
                    items: [{
                        text:'Delete',
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
                    header: 'medical_action_id',
                    hidden: true,
                    dataIndex: 'medical_action_id',
                },
                {
                    header: 'deleted',
                    hidden: true,
                    dataIndex: 'deleted',
                },
                {
                    header: 'Deskripsi Tindakan',
                    dataIndex: 'medical_action_desc',
                    width: 70,  
                },
                {
                    header: 'Biaya Tindakan',
                    dataIndex: 'service_fee',
                    width: 50,
                    xtype: 'numbercolumn',
                    align: 'right',
                    editor:{
                        xtype:'numberfield',
                        // allowBlank: false,
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
                        text: 'Tambah Tindakan (Template)',
                        iconCls: 'add-icon',
                        id: 'btnAddActionTemplate',
                        scope: this,
                        handler: function(){
                            wActionPopuop.show();
                            Ext.getCmp('GridactionPopupID').getStore().load();
                        }
                    },{
                        text: 'Tambah Tindakan',
                        iconCls: 'add-icon',
                        id: 'btnAddAction',
                        scope: this,
                        handler: function(){
                            wMedicalActionPopuop.show();
                        }
                    }]
                },
            ],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {},
                render: {
                    scope: this,
                    fn: function(grid) {
                        // disableGridrecordaction();
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
        
        console.log(rowIndex.record)
        console.log(this.getStore().getRange())
        var medical_record_id = this.getStore().getRange()[rowIndex].data['medical_record_id'];
        var medical_action_id = this.getStore().getRange()[rowIndex].data['medical_action_id'];
        
        Ext.Ajax.request({
            url:CLINIC_API + 'docter/delete_action',
            method:'POST',
            params:{
                key:key,
                medical_record_id:medical_record_id,
                medical_action_id:medical_action_id
            },
            success:function(form,action){

            },
            failure:function(form,action){

            }
        })

        this.getStore().getRange()[rowIndex].data['deleted'] = 1;
        this.getStore().clearFilter();
        this.getStore().filter([function(item) { return item.get('deleted') != "1" }]);
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});