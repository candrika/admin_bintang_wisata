var Gridrecorddisease = Ext.create(dir_sys + 'docter.Gridrecorddisease');
var Gridrecordaction  = Ext.create(dir_sys + 'docter.Gridrecordaction');
var Gridrecorddrug      = Ext.create(dir_sys + 'docter.Gridrecorddrug');
var GridrecorddrugAlkes = Ext.create(dir_sys + 'docter.GridrecorddrugAlkes');

Ext.define(dir_sys +'docter.TabmedicalRecord', {
    extend: 'Ext.tab.Panel',
    plain: true,
    id: 'TabmedicalRecord',
    alias: 'widget.TabmedicalRecord',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: false,
    defaults: {
        
    },
    items: [
        {
            xtype:'Gridrecorddisease',
            listeners:{
                activate:function(){
                    var storeGridrecorddisease = Ext.getCmp('Gridrecorddisease').getStore();

                    storeGridrecorddisease.on('beforeload', function(store, operation, eOpts) {
                        operation.params = {
                            key:key,
                            medical_record_id:Ext.getCmp('medical_record_id').getValue()
                        };
                    });

                    storeGridrecorddisease.load();
                }
            }
        },{
            xtype:'Gridrecordaction',
            listeners:{
                activate:function(){
                    
                    var storeGridrecordaction = Ext.getCmp('Gridrecordaction').getStore();

                    storeGridrecordaction.on('beforeload', function(store, operation, eOpts) {
                        operation.params = {
                            key:key,
                            medical_record_id:Ext.getCmp('medical_record_id').getValue()
                        };
                    });

                    storeGridrecordaction.load();
                }
            }
        },{
            xtype: 'Gridrecorddrug',
            listeners: {
                activate: function() {

                    var Gridrecorddrug = Ext.getCmp('Gridrecorddrug').getStore();    

                    Gridrecorddrug.on('beforeload', function(store, operation, eOpts) {
                        operation.params = {
                            key:key,
                            medical_record_id:Ext.getCmp('medical_record_id').getValue()
                        };
                    });

                    Gridrecorddrug.load();             
                }
            },
            flex:1
        },{
            xtype:'GridrecorddrugAlkes',
            listeners:{
                activate:function(){
                    var GridrecorddrugAlkes = Ext.getCmp('GridrecorddrugAlkes').getStore();

                    GridrecorddrugAlkes.on('beforeload', function(store, operation, eOpts) {
                        operation.params = {
                            key:key,
                            medical_record_id:Ext.getCmp('medical_record_id').getValue()
                        };
                    });

                    GridrecorddrugAlkes.load();
                }
            },
            flex:1
        }
    ]
});