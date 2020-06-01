var storeChooserListSupplier = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'App.model.Supplier',
    sorters: [{
        property: 'namesupplier',
        direction: 'ASC'
    }],
    listeners: {
        'beforeload': function(store, operation, eOpts) {
            operation.params = {
                extraparams: 'a.deleted: 0, a.idunit:' + idunit,
            }
        }
    }
});

var smChooserListSupplier = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smChooserListSupplier.getSelection().length;
            if (selectedLen == 0) {
                GridSupplierList.queryById('btnOk').setDisabled(true);
            }
        },
        select: function(model, record, index) {
            GridSupplierList.queryById('btnOk').setDisabled(false);
        }
    }
});

Ext.define('MY.searchChooserListSupplier', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchChooserListSupplier',
    store: storeChooserListSupplier,
    width: 180
});

var GridSupplierList = Ext.create('Ext.grid.Panel', {
    itemId: 'GridSupplierListID',
    id: 'GridSupplierListID',
    store: storeChooserListSupplier,
    width: 800,
    height: 350,
    selModel: smChooserListSupplier,
    autoScroll: true,
    columns: [
        { header: 'idsupplier', dataIndex: 'idsupplier', hidden: true },
        { header: 'No', xtype: 'rownumberer', sortable: false, width: 30 },
        { header: 'Supp. Code', dataIndex: 'code', minWidth: 150 },
        { header: 'Name', dataIndex: 'namesupplier', minWidth: 150 },
        { header: 'Type', dataIndex: 'typename', minWidth: 150 },
        { header: 'City', dataIndex: 'city', minWidth: 150 },
        { header: 'State', dataIndex: 'state', minWidth: 150 },
        { header: 'Post Code', dataIndex: 'postcode', minWidth: 90 },
        { header: 'Country', dataIndex: 'country', minWidth: 150 }
    ],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                /*'Type :',
                {
                    boxLabel: 'All',
                    xtype: 'checkboxfield',
                    handler: function(checkbox, checked){
                        var cb1 = GridSupplierList.queryById('idsuppliertype');
                        if(checked){
                            cb1.setDisabled(true);
                            storeChooserListSupplier.clearFilter(true);
                            storeChooserListSupplier.load();
                        }else{
                            cb1.setDisabled(false);
                            if(cb1.getValue() !== false)
                                storeChooserListSupplier.filter(function(item){return item.get('idsuppliertype') == cb1.getValue()})
                        }
                    }
                },
                ' ',
                {
                    xtype: 'comboxsuppliertype',
                    itemId: 'idsuppliertype',
                    fieldLabel: null,
                    labelWidth: 10,
                    listeners: {
                        'select': function(combo,record,eOpts){
                            storeChooserListSupplier.clearFilter(true);
                            storeChooserListSupplier.filter(function(item){return item.get('idsuppliertype') == record[0].data.idsuppliertype})
                        }
                    },
                },*/
                '->',
                'Pencarian',
                ' ',
                {
                    xtype: 'searchChooserListSupplier',
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
                        GridSupplierList.fireEvent('selectItem', ChooserListSupplier.target);
                    }
                },
                {
                    text: 'Cancel',
                    handler: function() {
                        ChooserListSupplier.hide();
                    }
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: storeChooserListSupplier, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
        },
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeChooserListSupplier.load();
            }
        },
        itemdblclick: function() {},
        selectItem: function(form) {
            var selectedRecord = GridSupplierList.getSelectionModel().getSelection()[0];
            form.fireEvent('selectSupplier', selectedRecord.data);
            ChooserListSupplier.hide();
        }

    }
});

var ChooserListSupplier = Ext.create('widget.window', {
    title: 'Supplier List',
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
    items: [GridSupplierList],
});