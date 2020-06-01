Ext.define('GroupRulesStoreModel', {
    extend: 'Ext.data.Model',
    fields: ['rule_id','rule_name','button_action','sys_menu_id','menu_name','grantaccess','group_id'],
    idProperty: 'id'
});

var GroupRulesStore = Ext.create('Ext.data.Store', {
    model: 'GroupRulesStoreModel',
    //remoteSort: true,
    autoload: false,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/grouprules/sistem',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        }
    }
});

var stateStore = Ext.create('Ext.data.Store', {
    fields: ['grantaccess'],
    data : [
        {"grantaccess":"YA"},
        {"grantaccess":"TIDAK"}
    ]
});

Ext.define('gridRules', {
    extend: 'Ext.grid.Panel',
    id: 'gridRules',
    alias: 'widget.gridRules',
//    xtype: 'cell-editing',
    title: 'Daftar Hak Akses',
//    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: 440,
            height: 500,
            forceFit: true,
            plugins: [this.cellEditing],
            store: GroupRulesStore,
            columns: [
                 {
                    dataIndex: 'rule_id',
                    hidden:true
                },
                 {
                     dataIndex: 'group_id',
                    hidden:true
                },
                {
                    header: 'Rule',
					flex:1,
                    dataIndex: 'rule_name',
                    width: 100
                },
                {
                    header: 'Beri Akses',
//                    align: 'right',
                    dataIndex: 'grantaccess',
                    width:90,
                    editor: {
			            xtype: 'combobox', 
                        store: stateStore, 
						queryMode: 'local', 
                        displayField: 'grantaccess', 
						valueField: 'grantaccess',
                        listeners : {
                            select : function() {
                                var grid = Ext.ComponentQuery.query('gridRules')[0];
                                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                var data = grid.getSelectionModel().getSelection();
                                if (data.length == 0)
                                {
                                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                                } else {                     
                                }
                        
//                                console.log(Ext.getCmp('group_id_val').getValue()+' '+Ext.getCmp('sys_menu_id_val').getValue());
                                 var sys_menu_id = Ext.getCmp('sys_menu_id_val').getValue();
                                 Ext.Ajax.request({
                                    url: SITE_URL + 'sistem/saveRuleChange',
                                    method: 'POST',
                                    params: {
                                        group_id: Ext.getCmp('group_id_val').getValue(),
                                        rule_id: selectedRecord.data.rule_id,
                                        grantaccess:this.value
                                    },
                                    success: function(form, action) {
                                        var d = Ext.decode(form.responseText);
                                        if (!d.success) {
                                            Ext.Msg.alert('Peringatan', d.message);
                                        } else {
//                                            Ext.Msg.alert('Success', d.message);
                                            GroupRulesStore.load({
                                                params: {
                                                    'extraparams': 'a.sys_menu_id:' + sys_menu_id
                                                }
                                            });
                                        }
                                    },
                                    failure: function(form, action) {
                                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                    }
                                });
                    
                               
                                    
                            }
                        }
			        }
                }
//                ,
//                {
//                    xtype: 'actioncolumn',
//                    width: 30,
//                    align: 'center',
//                    sortable: false,
//                    menuDisabled: true,
//                    items: [{
//                            icon: BASE_URL + 'assets/icons/fam/cross.gif',
//                            tooltip: 'Hapus',
//                            scope: this,
//                            handler: this.onRemoveClick
//                        }]
//                }
            ],
            selModel: {
                selType: 'cellmodel'
            },
            dockedItems: [
				{
		            xtype: 'toolbar',
		            dock: 'top',
		            items: [
                        {
                            xtype:'hiddenfield',
                            id:'group_id_val'
                        },
                        {
                            xtype:'hiddenfield',
                            id:'sys_menu_id_val'
                        },
		                {
		                    text: '-',
//		                    iconCls: 'add-icon',
		                    handler: function() {
//		                        wSysGroup.show();
//		                        Ext.getCmp('statusformSysGroup').setValue('input');
		                    }
		                }]
				}
			],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {
                },
                render: {
                    scope: this,
                    fn: function(grid) {
//                        disableEntryReconcile();
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
                
//                updateSelisih();
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordReconcile: function()
    {
    },
    saveRecurr: function() {
//        if (validasiPayment())
//        {
//            Ext.getCmp('formformRecc').getForm().reset();
//            wformRecc.show();
//        }
    },
    loadStore: function() {


//        this.getStore().load({
//            // store loading is asynchronous, use a load listener or callback to handle results
//            callback: this.onStoreLoad
//        });
    },
    onStoreLoad: function() {
//        Ext.Msg.show({
//            title: 'Store Load Callback',
//            msg: 'store was loaded, data available for processing',
//            icon: Ext.Msg.INFO,
//            buttons: Ext.Msg.OK
//        });
    },
    onRemoveClick: function(grid, rowIndex) {
        this.getStore().removeAt(rowIndex);
        updateSelisih();
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});