var FormSupplier = Ext.create(dir_sys + 'master.FormSupplier');

var storeGridSupplier = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'App.model.Supplier',
    sorters: [{
        property: 'namesupplier',
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

var smGridSupplier = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'MULTI',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridSupplier.getSelection().length;
            if (selectedLen == 0) {
                Ext.getCmp('GridSupplierID').queryById('btnEdit').setDisabled(true);
                Ext.getCmp('GridSupplierID').queryById('btnDelete').setDisabled(true);
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('GridSupplierID').queryById('btnEdit') .setDisabled(false);
            Ext.getCmp('GridSupplierID').queryById('btnDelete') .setDisabled(false);
        }
    }
});

Ext.define('MY.searchGridSupplier', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSupplier',
    store: storeGridSupplier,
    width: 180
});

Ext.define(dir_sys + 'master.GridSupplier', {
    title: 'Pemasok',
    itemId: 'GridSupplierID',
    id: 'GridSupplierID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSupplier',
    store: storeGridSupplier,
    selModel: smGridSupplier,
    loadMask: true,
    columns: [
        {header:'idsupplier', dataIndex:'idsupplier', hidden:true},
        {header:'No', xtype:'rownumberer', sortable:false, width: 50},
        {header:'Supp. Code', dataIndex:'code', minWidth: 150},
        {header:'Name', dataIndex:'namesupplier', minWidth: 150},
        {header:'Type', dataIndex:'typename', minWidth: 150},
        {header:'Telp', dataIndex:'telephone', minWidth: 150},
        {header:'HP', dataIndex:'handphone', minWidth: 150},
        {header:'Fax', dataIndex:'fax', minWidth: 150},
        {header:'Email', dataIndex:'email', minWidth: 150},
        {header:'Website', dataIndex:'website', minWidth: 150},
        {header:'Address', dataIndex:'companyaddress', minWidth: 200},
        {header:'Shippinig Address', dataIndex:'shipaddress', minWidth: 200},
        {header:'City', dataIndex:'city', minWidth: 150},
        {header:'State', dataIndex:'state', minWidth: 150},
        {header:'Post Code', dataIndex:'postcode', minWidth: 90},
        {header:'Country', dataIndex:'country', minWidth: 150},
        {header:'Notes', dataIndex:'notes', minWidth: 200},
        {header:'Status', dataIndex:'status', minWidth: 100, renderer: function(value){
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
                    FormSupplier.statusform = 'input';
                    FormSupplier.show();
                }
            }, {
                itemId: 'btnEdit',
                text: 'Edit',
                iconCls: 'edit-icon',
                disabled: true,
                handler: function() {
                    var grid = Ext.ComponentQuery.query('GridSupplier')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var rows = grid.getSelectionModel().getSelection();
                    if (rows.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih data brand terlebih dahulu!');
                    } else {
                        FormSupplier.statusform = 'edit';

                        var formSupplier = Ext.getCmp('formSupplierid');
                        formSupplier.getForm().load({
                            url: CLINIC_API + 'master/form_loader',
                            method:'GET',
                            params: {
                                extraparams: 'a.idsupplier=' + selectedRecord.data.idsupplier,
                                model:'supplier',
                                key:key,
                                idunit:idunit
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                console.log(d);
                                formSupplier.getForm().findField('supplier_type_id').getStore().load();
                                // formSupplier.findField('supplier_type_id').setValue(d);

                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                            }
                        })
                        // FormSupplier.loadRecord(data);
                        FormSupplier.show();
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
                                var grid = Ext.ComponentQuery.query('GridSupplier')[0];
                                var sm = grid.getSelectionModel();
                                selected = [];
                                Ext.each(sm.getSelection(), function(item) {
                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                });
                                console.log(selected);
                                Ext.Ajax.request({
                                    url: SITE_URL + 'backend/ext_delete/Supplier/master',
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
                                            storeGridSupplier.load();
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
                xtype: 'searchGridSupplier',
                text: 'Left Button',
            }
        ],
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridSupplier, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSupplier.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            FormSupplier.statusform = 'edit';
            var data = null;
            var formSupplier = Ext.getCmp('formSupplierid');
            formSupplier.getForm().load({
                url: CLINIC_API + 'master/form_loader',
                method:'GET',
                params: {
                    extraparams: 'a.idsupplier=' + record.data.idsupplier,
                    model:'supplier',
                    key:key,
                    idunit:idunit
                },
                success: function(form, action) {
                    var d = Ext.decode(form.responseText);
                    console.log(d);
                    formSupplier.getForm().findField('supplier_type_id').getStore().load();
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })
            
            FormSupplier.show();
        }
    }
});