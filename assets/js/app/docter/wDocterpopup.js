Ext.define('GridDocterpopupModel', {
    extend: 'Ext.data.Model',
    fields: ['staff_id','group_id','user_id','staff_name','staff_address','staff_address','staff_mobilephone','staff_email','staff_photo','no_identity','polytpe_id','account_number','account_name','bank_name','remarks','status','location_id','staff_number','location_name','polytpe_name','fee_per_patient'],
    idProperty: 'id'
});
var storeGridDocterpopup = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridDocterpopupModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'docter/datas',
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
storeGridDocterpopup.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        extraparams: 'a.deleted: 0, a.idunit:' + idunit,
        group_id:5,
        key:key
    };
});
Ext.define('MY.searchGridDocterpopup', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridDocterpopup',
    store: storeGridDocterpopup,
    width: 180
});
var smGridDocterpopup = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridDocterpopup.getSelection().length;
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
Ext.define(dir_sys + 'docter.GridDocterpopup', {
    itemId: 'GridDocterpopupID',
    id: 'GridDocterpopupID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridDocterpopup',
    store: storeGridDocterpopup,
    loadMask: true,
    columns: [{
            text: 'Pilih',
            width: 55,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                Ext.getCmp('staff_id_diagnossis').setValue(selectedRecord.data.staff_id);
                Ext.getCmp('doctor_name_diagnosis').setValue(selectedRecord.data.staff_name);
                // Ext.getCmp('fee_per_patient').setValue(renderNomor2(selectedRecord.data.fee_per_patient));
                Ext.getCmp('wDocterpopup').hide();
            }
        },  
        { header: 'staff_id', dataIndex: 'staff_id', hidden: true },
        { header: 'No Dokter', dataIndex: 'staff_number', minWidth: 100 },
        { header: 'Nama', dataIndex: 'staff_name', minWidth: 200,flex:1 },
        // { header: 'Biaya Konsultasi', dataIndex: 'fee_per_patient', minWidth: 200,flex:1 },
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->', 'Pencarian: ', ' ', {
                xtype: 'searchGridDocterpopup',
                text: 'Left Button'
            }]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridDocterpopup, // same store GridPanel is using
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
Ext.define(dir_sys + 'docter.wDocterpopup', {
    extend: 'Ext.window.Window',
    alias: 'widget.wDocterpopup',
    id: 'wDocterpopup',
    title: 'Choose Doctor',
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
        xtype: 'GridDocterpopup'
    }]
});