// load_js_file('master/FormCustomer.js');

var WindowPasien = Ext.create(dir_sys + 'patient.WindowPasien');

Ext.define('GridCustomerModel', {
    extend: 'Ext.data.Model',
    fields: ['patient_id','birthday_date','no_tlp','no_mobile','address','email','country','datein','id_type','patient_name','remarks','member_id','patient_photo','no_id','country','id_type'],
    idProperty: 'id'
});
var storeGridCustomer = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridInventoryCatModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'patient/datas',
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

var smGridCustomer = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'MULTI',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridCustomer.getSelection().length;
            if (selectedLen == 0) {
                // Ext.getCmp('GridCustomerID').queryById('btnEdit').setDisabled(true);
                Ext.getCmp('GridCustomerID').queryById('btnDelete').setDisabled(true);
            }
        },
        select: function(model, record, index) {
            // Ext.getCmp('GridCustomerID').queryById('btnEdit') .setDisabled(false);
            Ext.getCmp('GridCustomerID').queryById('btnDelete') .setDisabled(false);
        }
    }
});

Ext.define('MY.searchGridCustomer', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridCustomer',
    store: storeGridCustomer,
    width: 180
});

Ext.define(dir_sys + 'master.GridCustomer', {
    // title: 'Pasient',
    itemId: 'GridCustomerID',
    id: 'GridCustomerID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridCustomer',
    store: storeGridCustomer,
    selModel: smGridCustomer,
    loadMask: true,
    columns: [
        {header: 'patient_id', dataIndex:'patient_id', hidden:true},
        {header: 'member_id', dataIndex:'member_id', hidden:true},
        {header: 'No', xtype:'rownumberer', sortable:false, width: 50},
        {header: 'No Pasien', minWidth: 100, dataIndex: 'no_id' },
        {header: 'Nama Pasien', minWidth: 150, dataIndex: 'patient_name' },
        {header: 'Tanggal Lahir', minWidth: 150, dataIndex: 'birthday_date' },
        {header: 'Lokasi', minWidth: 150, dataIndex: 'country' },
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
                text: 'Pendaftaran Pasien',
                iconCls: 'add-icon',
                handler: function() {
                    FormCustomer.statusform = 'input';
                    FormCustomer.show();
                }
            }, {
                itemId: 'btnEdit',
                text: 'Edit',
                iconCls: 'edit-icon',
                disabled: true,
                hidden:true,
                handler: function() {
                    var grid = Ext.ComponentQuery.query('GridCustomer')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var rows = grid.getSelectionModel().getSelection();
                    if (rows.length == 0) {
                        Ext.Msg.alert('Failure', 'Brand is not set!');
                    } else {
                        FormCustomer.statusform = 'edit';
                        var data = null;
                        storeGridCustomer.getRange().every(function(rec){
                            if(rec.data['idcustomer'] == selectedRecord.data['idcustomer']){
                                data = rec;
                                return false; 
                            }
                            return true;
                        });
                        formCustomer.loadRecord(data);
                        FormCustomer.show();
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
                                var grid = Ext.ComponentQuery.query('GridCustomer')[0];
                                var sm = grid.getSelectionModel();
                                selected = [];
                                Ext.each(sm.getSelection(), function(item) {
                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                });
                                console.log(selected);
                                Ext.Ajax.request({
                                    url: SITE_URL + 'backend/ext_delete/Customer/master',
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
                                            storeGridCustomer.load();
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
                xtype: 'searchGridCustomer',
                text: 'Left Button',
            }
        ],
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridCustomer, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridCustomer.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            FormCustomer.statusform = 'edit';
            var data = null;
            storeGridCustomer.getRange().every(function(rec){
                if(rec.data['idcustomer'] == record.data.idcustomer){
                    data = rec;
                    return false; 
                }
                return true;
            });
            formCustomer.loadRecord(data);
            FormCustomer.show();
        }
    }
});