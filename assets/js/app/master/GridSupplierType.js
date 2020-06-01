var FormSupplierType = Ext.create(dir_sys + 'master.FormSupplierType');

var storeGridSupplierType = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'App.model.SupplierType',
    sorters: [{
        property: 'name',
        direction: 'ASC'
    }],
    listeners: {
        'beforeload': function(store, operation, eOpts){
            operation.params = {
                extraparams: 'a.deleted: 0, a.idunit:'+idunit,
            }
        }
    },
});

Ext.define('MY.searchGridSupplierType', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSupplierType',
    store: storeGridSupplierType,
    width: 180
});

var smGridSupplierType = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'MULTI',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridSupplierType.getSelection().length;
            if (selectedLen == 0) {
                Ext.getCmp('GridSupplierTypeID').queryById('btEdite').setDisabled(true);
                Ext.getCmp('GridSupplierTypeID').queryById('btnDelete').setDisabled(true);
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('GridSupplierTypeID').queryById('btnEdit').setDisabled(false);
            Ext.getCmp('GridSupplierTypeID').queryById('btnDelete').setDisabled(false);
        }
    }
});

Ext.define(dir_sys + 'master.supplier.type.GridSupplierType', {
    title: 'Jenis Pemasok',
    itemId: 'GridSupplierTypeID',
    id: 'GridSupplierTypeID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSupplierType',
    store: storeGridSupplierType,
    selModel: smGridSupplierType,
    loadMask: true,
    columns: [
        {header:'idsuppliertype', dataIndex:'idsuppliertype', hidden:true},
        {header:'No', xtype:'rownumberer', sortable:false, width: 50},
        {header:'Nama', dataIndex:'name', minWidth: 200},
        {header:'Deskripsi', dataIndex:'desc', minWidth: 300, flex:1},
        {header:'Status', dataIndex:'status', minWidth: 100, renderer: function(value){
            return togglearr.map(function(val){return val[1]})[value];
        }},
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'btnAdd',
            text: 'Add',
            iconCls: 'add-icon',
            handler: function() {
                FormSupplierType.statusform = 'input';
                FormSupplierType.show();
            }
        }, {
            itemId: 'btnEdit',
            text: 'Edit',
            iconCls: 'edit-icon',
            disabled: true,
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridSupplierType')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var row = grid.getSelectionModel().getSelection();
                if (row.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data brand terleFbih dahulu!');
                } else {
                    FormSupplierType.statusform = 'edit';
                    var data = null;
                    storeGridSupplierType.getRange().every(function(rec){
                        if(rec.data['idsuppliertype'] == selectedRecord.data['idsuppliertype']){
                            data = rec;
                            return false;
                        }
                        return true;
                    });
                    formSupplierType.getForm().loadRecord(data);
                    FormSupplierType.show();
                }
            }
        }, {
            itemId: 'btnDelete',
            text: 'Delete',
            iconCls: 'delete-icon',
            disabled: true,
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridSupplierType')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/SupplierType/master',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    idmenu:24
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (!d.success) {
                                        Ext.Msg.alert('Informasi', d.message);
                                    } else {
                                        Ext.getCmp('comboxsuppliertype').getStore().load(); //load the store of comboxsuppliertype
                                        storeGridSupplierType.load(); //load the store of grid supplier type
                                    }
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                }
                            });
                            
                        }
                    }
                });
            },
            //                    disabled: true
        }, '->', 'Pencarian: ', ' ', {
            xtype: 'searchGridSupplierType',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridSupplierType, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSupplierType.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            FormSupplierType.statusform = 'edit';
            var data = null;
            storeGridSupplierType.getRange().every(function(rec){
                if(rec.data['idsuppliertype'] == record.data.idsuppliertype){
                    data = rec;
                    return false; 
                }
                return true;
            });
            formSupplierType.loadRecord(data);
            FormSupplierType.show();
        }
    }
});