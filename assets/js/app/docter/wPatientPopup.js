Ext.define('GridPatientPopupModel', {
    extend: 'Ext.data.Model',
     fields: ['patient_id','member_id','patient_no','patient_name','birthday_date','id_type','country','datein','email','no_id','no_mobile','no_tlp','patient_photo','patient_type_id','remarks','status','patient_type','polis','np_number'],
    idProperty: 'id'
});
var storeGridPatientPopup = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPatientPopupModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'patient/datas',
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
storeGridPatientPopup.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        extraparams: 'a.deleted: 0, a.idunit:' + idunit,
        key:key
    };
});
Ext.define('MY.searchGridPatientPopup', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPatientPopup',
    store: storeGridPatientPopup,
    width: 180
});
var smGridPatientPopup = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPatientPopup.getSelection().length;
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
Ext.define(dir_sys + 'docter.GridPatientPopup', {
    itemId: 'GridPatientPopupID',
    id: 'GridPatientPopupID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPatientPopup',
    store: storeGridPatientPopup,
    loadMask: true,
    columns: [{
            text: 'Pilih',
            width: 55,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                Ext.getCmp('member_id_diagnossis').setValue(selectedRecord.data.member_id);
                Ext.getCmp('patient_id_diagnossis').setValue(selectedRecord.data.patient_id);
                Ext.getCmp('patient_diagnosis_name').setValue(selectedRecord.data.patient_name);
                Ext.getCmp('patient_type').setValue(selectedRecord.data.patient_type_id*1);
                // patient_type
                Ext.getCmp('wPatientPopup').hide();
            }
        },  
        { header: 'patient_type_id', dataIndex: 'patient_type_id', hidden: true },
        { header: 'patient_id', dataIndex: 'patient_id', hidden: true },
        { header: 'member_id', dataIndex: 'member_id', hidden: true },
        { header: 'Kode Pasien', dataIndex: 'patient_no', minWidth: 100 },
        { header: 'No NP', minWidth: 150, dataIndex: 'np_number'},
        { header: 'Nama Pasien', dataIndex: 'patient_name', minWidth: 200,flex:1 },
        { header: 'Jenis Pasien', dataIndex: 'patient_type', minWidth: 200,flex:1},
        { header: 'Nama Anggota', dataIndex: 'polis', minWidth: 200},
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->', 'Pencarian: ', ' ', {
                xtype: 'searchGridPatientPopup',
                text: 'Left Button'
            }]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridPatientPopup, // same store GridPanel is using
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
Ext.define(dir_sys + 'docter.wPatientPopup', {
    extend: 'Ext.window.Window',
    alias: 'widget.wPatientPopup',
    id: 'wPatientPopup',
    title: 'Choose Patient',
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
        xtype: 'GridPatientPopup'
    }]
});