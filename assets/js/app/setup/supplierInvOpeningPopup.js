
Ext.define('GridSupplierInvOpeningModel', {
    extend: 'Ext.data.Model',
    fields: ['idsupplier', 'code', 'namesupplier', 'companyaddress', 'companyaddress2', 'companyaddress3', 'shipaddress', 'billaddress', 'telephone', 'handphone', 'fax', 'email', 'website', 'city', 'state', 'postcode', 'country', 'highestpo', 'avgdaypay', 'lastpayment', 'lastpurchase', 'expenseaccount', 'notes'],
    idProperty: 'id'
});
var storeGridSupplierInvOpening = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSupplierInvOpeningModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/supplierGrid',
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
// storeGridSupplierInvOpening.on('beforeload', function(store, operation, eOpts) {
//     operation.params = {
//         'extraparams': 'b.namesupplier:' + Ext.getCmp('supplierPurchase').getValue()
//     };
// });
Ext.define('MY.searchGridSupplierInvOpening', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSupplierInvOpening',
    store: storeGridSupplierInvOpening,
    width: 180
});
var smGridSupplierInvOpening = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridSupplierInvOpening.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteSupplierInvOpening').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteSupplierInvOpening').enable();
        }
    }
});

var wsupplierInvOpening = Ext.create('widget.window', {
    id: 'wsupplierInvOpeningForm',
    title: 'Data Supplier',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: 670,
    // minHeight: 440,
    autoHeight: true,
    layout: 'fit',
    border: false,
    // items: [formsupplierGrid],
    buttons: [{
        text: 'Batal',
        handler: function() {
            Ext.getCmp('formsupplierGrid').getForm().reset();
             Ext.getCmp('wsupplierInvOpeningForm').hide();
        }
    }, {
        text: 'Simpan',
        handler: function() {
            var form = Ext.getCmp('formsupplierGrid').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        form.reset();
                        Ext.getCmp('wsupplierInvOpeningForm').hide();
                        storeGridSupplierInvOpening.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridsupplierGrid.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

Ext.define('GridSupplierInvOpening', {
    itemId: 'GridSupplierInvOpeningID',
    id: 'GridSupplierInvOpeningID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSupplierInvOpening',
    store: storeGridSupplierInvOpening,
    loadMask: true,
    columns: [
    {
            text: 'pilih',
            width: 45,
            xtype: 'actioncolumn',
            tooltip: 'Pilih Ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                Ext.getCmp('formInventoryOpening').getForm().findField('namesupplierInventoryOpening').setValue(selectedRecord.get('namesupplier'));
                Ext.getCmp('wSupplierInvOpeningPopup').hide();
            }
    },{
        header: 'idsupplier',
        dataIndex: 'idsupplier',
        hidden: true
    }, {
        header: 'Kode Supplier',
        dataIndex: 'code',
        minWidth: 150
    }, {
        header: 'Nama',
        dataIndex: 'namesupplier',
        minWidth: 150
    }, {
        header: 'Telpon',
        dataIndex: 'telephone',
        minWidth: 150
    }, {
        header: 'Kota',
        dataIndex: 'city',
        minWidth: 150
    }, {
        header: 'Kode POS',
        dataIndex: 'postcode',
        minWidth: 150
    }, {
        header: 'Negara',
        dataIndex: 'country',
        minWidth: 150
    }, {
        header: 'Catatan',
        dataIndex: 'notes',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Tambah Supplier',
            iconCls: 'add-icon',
            handler: function() {
                wsupplierInvOpening.show();
            }
        }, '->', 'Pencarian: ', ' ', {
            xtype: 'searchGridSupplierInvOpening',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridSupplierInvOpening, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                //                storeGridSupplierInvOpening.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {}
    }
});
var wSupplierInvOpeningPopup = Ext.create('widget.window', {
    id: 'wSupplierInvOpeningPopup',
    title: 'Pilih Supplier',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: 730,
    height: 400,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridSupplierInvOpening'
    }]
});