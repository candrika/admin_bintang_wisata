
var formEditRules = Ext.create('Ext.form.Panel', {
    id: 'formEditRules',
    //    width: 450,
    //    height: 300,
    autoHeight: true,
    autoWidth: true,
    url: SITE_URL + 'backend/saveform/menurules/sistem',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 160,
        width: 400
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'statusformmenurules',
        id: 'statusformmenurules'
    },
    {
            xtype: 'hiddenfield',
            fieldLabel: 'rule_id',
            name: 'rule_id'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'sys_menu_id',
            id:'sys_menu_id_editFormRules',
            name: 'sys_menu_id'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Rule Name',
            allowBlank: false,
            name: 'rule_name'
        }],
    buttons: [{
        text: 'Batal',
        handler: function () {
            var win = Ext.getCmp('wFormEditRules');
            Ext.getCmp('formEditRules').getForm().reset();
            win.hide();
        }
    }, {
            id: 'BtnEditRulesSimpan',
            text: 'Simpan',
            handler: function () {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function (form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formEditRules').getForm().reset();
                            Ext.getCmp('wFormEditRules').hide();
                            storeGridEditRules.load({
                                            params: {
                                                'extraparams': 'a.sys_menu_id:' +Ext.getCmp('sys_menu_id_editRules').getValue()
                                            }
                                        });
                        },
                        failure: function (form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            //                            storeGridEditRules.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wFormEditRules = Ext.create('widget.window', {
    id: 'wFormEditRules',
    title: 'Edit Rule',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formEditRules]
});

Ext.define('GridEditRulesModel', {
    extend: 'Ext.data.Model',
    extend: 'Ext.data.Model',
    fields: ['rule_id', 'rule_name', 'button_action', 'sys_menu_id', 'menu_name', 'grantaccess', 'group_id'],
    idProperty: 'id'
});

var storeGridEditRules = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridEditRulesModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/menurules/sistem',
        actionMethods: 'POST',
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
Ext.define('MY.searchGridEditRules', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridEditRules',
    store: storeGridEditRules,
    width: 180
});
var smGridEditRules = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function (model, record, index) {
            var selectedLen = smGridEditRules.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteEditRules').disable();
            }
        },
        select: function (model, record, index) {
            Ext.getCmp('btnDeleteEditRules').enable();
        }
    }
});

Ext.define('GridEditRules', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridEditRules,
    //    title: 'Daftar Rules',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridEditRulesID',
    id: 'GridEditRulesID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridEditRules',
    store: storeGridEditRules,
    loadMask: true,
    columns: [
        { header: 'rule_id', dataIndex: 'rule_id', minWidth: 50 },
        { header: 'rule_name', dataIndex: 'rule_name', minWidth: 150, flex: 1 },
        //        {header: 'button_action', dataIndex: 'button_action', minWidth: 100},
        { header: 'sys_menu_id', dataIndex: 'sys_menu_id', hidden: true },
        { header: 'menu_name', dataIndex: 'menu_name', minWidth: 150, hidden: true }
        //        {header: 'grantaccess', dataIndex: 'grantaccess', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'hiddenfield',
                    fieldLabel: 'sys_menu_id',
                    id:'sys_menu_id_editRules',
                    name: 'sys_menu_id'
                },
                {
                    //                    itemId: 'addEditRules',
                    text: 'Tambah',
                    iconCls: 'add-icon',
                    handler: function () {
                        wFormEditRules.show();
                        Ext.getCmp('statusformmenurules').setValue('input');
                        Ext.getCmp('sys_menu_id_editFormRules').setValue(Ext.getCmp('sys_menu_id_editRules').getValue());
                    }
                },
                {
                    itemId: 'editEditRules',
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function () {
                        var grid = Ext.ComponentQuery.query('GridEditRules')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0) {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formEditRules = Ext.getCmp('formEditRules');
                            formEditRules.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/menurules/1/sistem',
                                params: {
                                    extraparams: 'a.rule_id:' + selectedRecord.data.rule_id
                                },
                                success: function (form, action) {
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function (form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wFormEditRules.show();
                            Ext.getCmp('statusformmenurules').setValue('edit');
                            

                        }

                    }
                }, {
                    id: 'btnDeleteEditRules',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function () {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function (btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridEditRules')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function (item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/menurules/sistem',
                                        method: 'POST',
                                        params: { postdata: Ext.encode(selected) }
                                    });
                                    storeGridEditRules.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
                    //                    disabled: true
                }
            ]
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function (grid) {
                //                storeGridEditRules.load();
            }
        },
        itemdblclick: function (dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
//            var formEditRules = Ext.getCmp('formEditRules');
//            wEditRules.show();
//            formEditRules.getForm().load({
//                url: SITE_URL + 'backend/loadFormData/EditRules/',
//                params: {
//                    extraparams: 'a.user_id:' + record.data.user_id
//                },
//                success: function (form, action) {
//                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
//                },
//                failure: function (form, action) {
//                    Ext.Msg.alert("Load failed", action.result.errorMessage);
//                }
//            })
        }
    }
});

//Ext.define('TabItemEditRules', {
//    extend: 'Ext.tab.Panel',
//    id: 'TabItemEditRules',
//    alias: 'widget.TabItemEditRules',
//    activeTab: 0,
//    items: [{
//            xtype: 'GridEditRules'
//        }
//    ]
//});

Ext.define('GridEditRulesPanel', {
    id: 'GridEditRulesPanel',
    extend: 'Ext.Panel',
    alias: 'widget.GridEditRulesPanel',
    //    title : 'MetaDati', 
    //    layout: 'fit',
    //    autoScroll:true, //TODO: autoscroll not working
    initComponent: function () {
        Ext.apply(this, {
            items: [{
                xtype: 'GridEditRules'
            }]
        });
        this.callParent(arguments);
    }
});

var wEditRules = Ext.create('widget.window', {
    id: 'wEditRules',
    title: 'Daftar Rules',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    height: 400,
    width: 600,
    //    autoWidth: true,
    //    autoHeight: true,
    //    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridEditRulesPanel'
    }]
});

