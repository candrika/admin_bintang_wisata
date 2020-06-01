Ext.define('GriddiseasePopuopModel', {
    extend: 'Ext.data.Model',
     fields: ['disease_id','disease_code','disease_name','disease_desc'],
    idProperty: 'id'
});

var storeGriddiseasePopuop = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GriddiseasePopuopModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'get/datas?model=diseases',
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
storeGriddiseasePopuop.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        extraparams: 'a.deleted: 0',
        key:key
    };
});
Ext.define('MY.searchGriddiseasePopuop', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGriddiseasePopuop',
    store: storeGriddiseasePopuop,
    width: 180
});
var smGriddiseasePopuop = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGriddiseasePopuop.getSelection().length;
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
Ext.define(dir_sys + 'docter.GriddiseasePopuop', {
    itemId: 'GriddiseasePopuopID',
    id: 'GriddiseasePopuopID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GriddiseasePopuop',
    store: storeGriddiseasePopuop,
    loadMask: true,
    columns: [{
            text: 'Pilih',
            width: 55,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                
                var rec = new GridrecorddiseaseModel({
                    disease_id:selectedRecord.get('disease_id'),
                    disease_code:selectedRecord.get('disease_code'),
                    disease_name:selectedRecord.get('disease_name'),
                    disease_desc:selectedRecord.get('disease_desc'),
                });

                console.log(rec);
                var grid = Ext.getCmp('Gridrecorddisease');
                grid.getStore().insert(0,rec);
                Ext.getCmp('wDiseasePopuop').hide();
            }
        },  
        {
            header: 'disease_id',
            hidden: true,
            dataIndex: 'disease_id',
        },
        {
            header: 'Kode',
            dataIndex: 'disease_code',
            width: 100
        },
        {
            header: 'Diagnosa',
            dataIndex: 'disease_name',
            width: 150,
        },
        {
            header: 'Deskripsi',
            dataIndex: 'disease_desc',
            width: 150,  
            flex:1
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            // hidden: true,
            dock: 'top',
            items: [
                '->', 'Pencarian: ', ' ', {
                xtype: 'searchGriddiseasePopuop',
                text: 'Left Button'
            }]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGriddiseasePopuop, // same store GridPanel is using
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

Ext.define(dir_sys + 'docter.wDiseasePopuop', {
    extend: 'Ext.window.Window',
    alias: 'widget.wDiseasePopuop',
    id: 'wDiseasePopuop',
    title: 'Pilih Classification of Diseases (ICD-10)',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: panelW-400,
    modal: true,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GriddiseasePopuop'
    }]
});