load_js_file('master/FormCustomerType.js');

var storeGridCustomerType = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'App.model.CustomerType',
    sorters: [{
        property: 'namecustype',
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

var smGridCustomerType = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'MULTI',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridCustomerType.getSelection().length;
            if (selectedLen == 0) {
                Ext.getCmp('GridCustomerTypeID').queryById('btnEdit').setDisabled(true);
                Ext.getCmp('GridCustomerTypeID').queryById('btnDelete').setDisabled(true);
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('GridCustomerTypeID').queryById('btnEdit') .setDisabled(false);
            Ext.getCmp('GridCustomerTypeID').queryById('btnDelete') .setDisabled(false);
        }
    }
});

Ext.define('MY.searchGridCustomerType', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridCustomerType',
    store: storeGridCustomerType,
    width: 180
});

Ext.define(dir_sys + 'master.GridCustomerType', {
    title: 'CustomerType',
    itemId: 'GridCustomerTypeID',
    id: 'GridCustomerTypeID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridCustomerType',
    store: storeGridCustomerType,
    selModel: smGridCustomerType,
    loadMask: true,
    columns: [
        {header: 'idcustomertype', dataIndex:'idcustomertype', hidden:true},
        {header: 'No', xtype:'rownumberer', sortable:false, width: 50},
        {header: 'Name', minWidth: 150, dataIndex: 'namecustype' },
        {header: 'Description', minWidth: 200, dataIndex: 'description', flex:1 },
        {header: 'Status', dataIndex:'status', minWidth: 100, renderer: function(value){
            return togglearr.map(function(val){return val[1]})[value];
        }},
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                itemId: 'btnAdd',
                text: 'Add',
                iconCls: 'add-icon',
                handler: function() {
                    FormCustomerType.statusform = 'input';
                    FormCustomerType.show();
                }
            }, {
                itemId: 'btnEdit',
                text: 'Edit',
                iconCls: 'edit-icon',
                disabled: true,
                handler: function() {
                    var grid = Ext.ComponentQuery.query('GridCustomerType')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var rows = grid.getSelectionModel().getSelection();
                    if (rows.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih data brand terlebih dahulu!');
                    } else {
                        FormCustomerType.statusform = 'edit';
                        var data = null;
                        storeGridCustomerType.getRange().every(function(rec){
                            if(rec.data['idcustomertype'] == selectedRecord.data['idcustomertype']){
                                data = rec;
                                return false; 
                            }
                            return true;
                        });
                        formCustomerType.loadRecord(data);
                        FormCustomerType.show();
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
                                var grid = Ext.ComponentQuery.query('GridCustomerType')[0];
                                var sm = grid.getSelectionModel();
                                selected = [];
                                Ext.each(sm.getSelection(), function(item) {
                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                });
                                console.log(selected);
                                Ext.Ajax.request({
                                    url: SITE_URL + 'backend/ext_delete/CustomerType/master',
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
                                            storeGridCustomerType.load();
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
            }, 
            '->', 
            'Pencarian: ', 
            ' ', 
            {
                xtype: 'searchGridCustomerType',
                text: 'Left Button',
            }
        ],
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridCustomerType, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridCustomerType.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            FormCustomerType.statusform = 'edit';
            var data = null;
            storeGridCustomerType.getRange().every(function(rec){
                if(rec.data['idcustomertype'] == record.data.idcustomertype){
                    data = rec;
                    return false; 
                }
                return true;
            });
            formCustomerType.loadRecord(data);
            FormCustomerType.show();
        }
    }
});