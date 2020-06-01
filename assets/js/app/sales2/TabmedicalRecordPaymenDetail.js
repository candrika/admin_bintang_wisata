var GridrecordactionPaymenDetail  = Ext.create(dir_sys + 'sales2.GridrecordactionPaymenDetail');
var GridrecorddrugPaymenDetail      = Ext.create(dir_sys + 'sales2.GridrecorddrugPaymenDetail');
var GridrecorddrugAlkesPaymenDetail = Ext.create(dir_sys + 'sales2.GridrecorddrugAlkesPaymenDetail');

Ext.define(dir_sys +'sales2.TabmedicalRecordPaymenDetail', {
    extend: 'Ext.tab.Panel',
    plain: true,
    id: 'TabmedicalRecordPaymenDetail',
    alias: 'widget.TabmedicalRecordPaymenDetail',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: false,
    defaults: {
        
    },
    items: [
        {
            xtype:'GridrecordactionPaymenDetail',
            listeners:{
                activate:function(){
                    alert('halo')
                    var recordactionPayment = Ext.getCmp('GridrecordactionPaymenDetail').getStore();

                    recordactionPayment.on('beforeload', function(store, operation, eOpts) {
                        operation.params = {
                            key:key,
                            medical_record_id_payment:Ext.getCmp('medical_record_id_payment').getValue()
                        };
                    });

                    recordactionPayment.load();
                }
            }
        },{
            xtype: 'GridrecorddrugPaymenDetail',
            listeners: {
                activate: function() {

                    var GridrecorddrugPayment = Ext.getCmp('GridrecorddrugPaymenDetail').getStore();    

                    GridrecorddrugPayment.on('beforeload', function(store, operation, eOpts) {
                        operation.params = {
                            key:key,
                            medical_record_id_payment:Ext.getCmp('medical_record_id_payment').getValue()
                        };
                    });

                    GridrecorddrugPayment.load();             
                }
            },
            flex:1
        },{
            xtype:'GridrecorddrugAlkesPaymenDetail',
            listeners:{
                activate:function(){
                    var GridrecorddrugAlkesPaymen = Ext.getCmp('GridrecorddrugAlkesPaymenDetail').getStore();

                    GridrecorddrugAlkesPaymen.on('beforeload', function(store, operation, eOpts) {
                        operation.params = {
                            key:key,
                            medical_record_id_payment:Ext.getCmp('medical_record_id_payment').getValue()
                        };
                    });

                    GridrecorddrugAlkesPaymen.load();
                }
            },
            flex:1
        }
    ]
});