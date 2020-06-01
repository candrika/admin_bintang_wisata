Ext.define('GridactionPopupModel', {
    extend: 'Ext.data.Model',
     fields: ['medical_action_id','medical_action_name','medical_action_desc','service_fee'],
    idProperty: 'id'
});

var storeGridactionPopup = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridactionPopupModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'get/datas?model=medical_action',
        actionMethods: {
            read: 'GET',
        },
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
storeGridactionPopup.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        extraparams: 'a.deleted: 0',
        key:key
    };
});
Ext.define('MY.searchGridactionPopup', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridactionPopup',
    store: storeGridactionPopup,
    width: 180
});
var smGridactionPopup = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridactionPopup.getSelection().length;
            if(selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteCustomerSalesPopupOrder').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteCustomerSalesPopupOrder').enable();
        }
    }
});

Ext.define(dir_sys + 'docter.GridactionPopup', {
    itemId: 'GridactionPopupID',
    id: 'GridactionPopupID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridactionPopup',
    store: storeGridactionPopup,
    loadMask: true,
    columns: [{
            text: 'Pilih',
            width: 55,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                var rec = new GridrecordactionModel({
                    medical_action_id:selectedRecord.get('medical_action_id'),
                    medical_action_name:selectedRecord.get('medical_action_name'),
                    medical_action_desc:selectedRecord.get('medical_action_desc'),
                    service_fee:selectedRecord.get('service_fee'),
                });

                console.log(rec);
                var grid = Ext.getCmp('Gridrecordaction');
                grid.getStore().insert(0,rec);
                Ext.getCmp('wActionPopuop').hide();
            }
        },  
        {
            header: 'medical_action_id',
            hidden: true,
            dataIndex: 'medical_action_id',
        },
        {
            header: 'Kode Tindakan',
            dataIndex: 'medical_action_name',
            width: 150
        },
        {
            header: 'Deskripsi',
            dataIndex: 'medical_action_desc',
            width: 150,
            flex:1  
        },{
            header: 'Biaya Tindakan',
            dataIndex: 'service_fee',
            width: 150
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->', 'Pencarian: ', ' ', {
                xtype: 'searchGridactionPopup',
                text: 'Left Button'
            }]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridactionPopup, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        refresh: function(dataview) {
        },
        render: {
            scope: this,
            fn: function(grid) {
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
        }
    }
});

Ext.define(dir_sys + 'docter.wActionPopuop', {
    extend: 'Ext.window.Window',
    alias: 'widget.wActionPopuop',
    id: 'wActionPopuop',
    title: 'Tambah Tindakan (Template)',
    header: {
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    width: panelW-400,
    modal: true,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridactionPopup'
    }]
});