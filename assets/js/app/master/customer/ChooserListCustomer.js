var storeChooserListCustomer = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'App.model.Customer',
    sorters: [{
        property: 'namecustomer',
        direction: 'ASC'
    }],
    listeners: {
        'beforeload': function(store, operation, eOpts) {
            operation.params = {
                extraparams: 'a.deleted: 0, a.idunit:' + idunit,
            }
        }
    },
});

var smChooserListCustomer = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smChooserListCustomer.getSelection().length;
            if (selectedLen == 0) {
                GridCustomerList.queryById('btnOk').setDisabled(true);
            }
        },
        select: function(model, record, index) {
            GridCustomerList.queryById('btnOk').setDisabled(false);
        }
    }
});

Ext.define('MY.searchChooserListCustomer', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchChooserListCustomer',
    store: storeChooserListCustomer,
    width: 180
});

var GridCustomerList = Ext.create('Ext.grid.Panel', {
    itemId: 'GridCustomerListID',
    id: 'GridCustomerListID',
    store: storeChooserListCustomer,
    width: 800,
    height: 350,
    selModel: smChooserListCustomer,
    autoScroll: true,
    columns: [
        { header: 'idcustomer', dataIndex: 'idcustomer', hidden: true },
        { header: 'No', xtype: 'rownumberer', sortable: false, width: 30 },
        { header: 'No Customer', dataIndex: 'nocustomer', minWidth: 150 },
        { header: 'Name', dataIndex: 'namecustomer', minWidth: 150 },
        { header: 'Address', dataIndex: 'address', minWidth: 120 },
        { header: 'Type', dataIndex: 'namecustype', minWidth: 100 },
        { header: 'Notes', dataIndex: 'note', minWidth: 200 },
    ],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                'Category :',
                {
                    boxLabel: 'All',
                    xtype: 'checkboxfield',
                    handler: function(checkbox, checked) {
                        var cb1 = GridCustomerList.queryById('idcustomertype');
                        if (checked) {
                            cb1.setDisabled(true);
                            storeChooserListCustomer.clearFilter(true);
                            storeChooserListCustomer.load();
                        } else {
                            cb1.setDisabled(false);
                            if (cb1.getValue() !== false)
                                storeChooserListCustomer.filter(function(item) { return item.get('idcustomertype') == cb1.getValue() })
                        }
                    }
                },
                ' ',
                {
                    xtype: 'comboxcustomertype',
                    itemId: 'idcustomertype',
                    fieldLabel: null,
                    labelWidth: 10,
                    listeners: {
                        'select': function(combo, record, eOpts) {
                            storeChooserListCustomer.clearFilter(true);
                            storeChooserListCustomer.filter(function(item) { return item.get('idcustomertype') == record[0].data.idcustomertype })
                        }
                    },
                },
                '->',
                'Pencarian',
                ' ',
                {
                    xtype: 'searchChooserListCustomer',
                    text: 'Left Button',
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'bottom',
            defaults: {
                width: 90,
            },
            items: [
                '->',
                {
                    text: 'OK',
                    itemId: 'btnOk',
                    disabled: true,
                    handler: function() {
                        GridCustomerList.fireEvent('selectItem', ChooserListCustomer.target);
                    }
                },
                {
                    text: 'Cancel',
                    handler: function() {
                        ChooserListCustomer.hide();
                    }
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: storeChooserListCustomer, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
        },
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeChooserListCustomer.load();
            }
        },
        itemdblclick: function() {},
        selectItem: function(form) {
            var selectedRecord = GridCustomerList.getSelectionModel().getSelection()[0];
            form.fireEvent('selectCustomer', selectedRecord.data);
            ChooserListCustomer.hide();
        }

    }
});

var ChooserListCustomer = Ext.create('widget.window', {
    title: 'Customer List',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    modal: true,
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    padding: '5',
    items: [GridCustomerList],
});