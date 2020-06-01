Ext.define('GridpopupSupplierOpeningHutangModel', {
    extend: 'Ext.data.Model',
    fields: ['idsupplier', 'code', 'namesupplier', 'companyaddress', 'companyaddress2', 'companyaddress3', 'shipaddress', 'billaddress', 'telephone', 'handphone', 'fax', 'email', 'website', 'city', 'state', 'postcode', 'country', 'highestpo', 'avgdaypay', 'lastpayment', 'lastpurchase', 'expenseaccount', 'notes'],
    idProperty: 'id'
});
var storeGridpopupSupplierOpeningHutang = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridpopupSupplierOpeningHutangModel',
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
Ext.define('MY.searchGridpopupSupplierOpeningHutang', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridpopupSupplierOpeningHutang',
    store: storeGridpopupSupplierOpeningHutang,
    width: 180
});
var smGridpopupSupplierOpeningHutang = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridpopupSupplierOpeningHutang.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletepopupSupplierOpeningHutang').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletepopupSupplierOpeningHutang').enable();
        }
    }
});

Ext.define('GridpopupSupplierOpeningHutang', {
    itemId: 'GridpopupSupplierOpeningHutangID',
    id: 'GridpopupSupplierOpeningHutangID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridpopupSupplierOpeningHutang',
    store: storeGridpopupSupplierOpeningHutang,
    loadMask: true,
    columns: [{
        header: 'idsupplier',
        dataIndex: 'idsupplier',
        hidden: true
    }, {
        header: 'code',
        dataIndex: 'code',
        minWidth: 150
    }, {
        header: 'namesupplier',
        dataIndex: 'namesupplier',
        minWidth: 150
    }, {
        header: 'telephone',
        dataIndex: 'namaayah',
        minWidth: 150
    }, {
        header: 'handphone',
        dataIndex: 'handphone',
        minWidth: 150
    }, {
        header: 'fax',
        dataIndex: 'fax',
        minWidth: 150
    }, {
        header: 'email',
        dataIndex: 'email',
        minWidth: 150
    }, {
        header: 'website',
        dataIndex: 'website',
        minWidth: 150
    }, {
        header: 'city',
        dataIndex: 'city',
        minWidth: 150
    }, {
        header: 'state',
        dataIndex: 'state',
        minWidth: 150
    }, {
        header: 'postcode',
        dataIndex: 'postcode',
        minWidth: 150
    }, {
        header: 'country',
        dataIndex: 'country',
        minWidth: 150
    }, {
        header: 'notes',
        dataIndex: 'notes',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
        {
            itemId: 'pilihpopupSupplierOpeningHutang',
            text: 'Pilih Supplier',
            iconCls: 'tick-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridpopupSupplierOpeningHutang')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data supplier terlebih dahulu!');
                } else {
                    Ext.getCmp('idsupplierRegHutangOpening').setValue(selectedRecord.data.idsupplier);
                    Ext.getCmp('namesupplierRegHutangOpening').setValue(selectedRecord.data.namesupplier);
                    Ext.getCmp('wpopupSupplierOpeningHutang').hide();
                }
            }
        }, '->', 'Pencarian: ', ' ', {
            xtype: 'searchGridpopupSupplierOpeningHutang',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridpopupSupplierOpeningHutang, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridpopupSupplierOpeningHutang.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formpopupSupplierOpeningHutang = Ext.getCmp('formpopupSupplierOpeningHutang');
            wpopupSupplierOpeningHutang.show();
            formpopupSupplierOpeningHutang.getForm().load({
                url: SITE_URL + 'backend/loadFormData/popupSupplierOpeningHutang/1',
                params: {
                    extraparams: 'a.idsupplier:' + record.data.idsupplier
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })
            //            
            //            Ext.getCmp('kddaerahS').setReadOnly(true);
            Ext.getCmp('statusformpopupSupplierOpeningHutang').setValue('edit');

            Ext.getCmp('TabSupplier').setActiveTab(0);
        }
    }
});

var wpopupSupplierOpeningHutang = Ext.create('widget.window', {
    id: 'wpopupSupplierOpeningHutang',
    title: 'Pilih Supplier',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: 670,
    minHeight:440,
    // autoHeight: true,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridpopupSupplierOpeningHutang'
    }]
});