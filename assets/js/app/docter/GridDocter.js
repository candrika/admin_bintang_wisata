var Windowdokter = Ext.create(dir_sys + 'docter.Windowdokter')

Ext.define('GridDocterModel', {
    extend: 'Ext.data.Model',
    fields: ['staff_id','group_id','user_id','staff_name','staff_address','staff_address','staff_mobilephone','staff_email','staff_photo','no_identity','polytpe_id','account_number','account_name','bank_name','remarks','status','location_id','fee_per_patient','staff_number','location_name','polytpe_name'],
    idProperty: 'id'
});

var storeGridDocter = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridDocterModel',
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

storeGridDocter.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'key':key,
        'group_id':5
    };
});

var smGridDocter = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'MULTI',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridDocter.getSelection().length;
            if (selectedLen == 0) {
                // Ext.getCmp('GridDocterID').queryById('btnEdit').setDisabled(true);
                Ext.getCmp('GridDocterID').queryById('btnDelete').setDisabled(true);
            }
        },
        select: function(model, record, index) {
            // Ext.getCmp('GridDocterID').queryById('btnEdit') .setDisabled(false);
            Ext.getCmp('GridDocterID').queryById('btnDelete') .setDisabled(false);
        }
    }
});

Ext.define('MY.searchGridDocter', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridDocter',
    store: storeGridDocter,
    width: 180
});

Ext.define(dir_sys + 'docter.GridDocter', {
    // title: 'Pasient',
    itemId: 'GridDocterID',
    id: 'GridDocterID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridDocter',
    store: storeGridDocter,
    selModel: smGridDocter,
    loadMask: true,
    columns: [
        {header: 'staff_id', dataIndex:'staff_id', hidden:true},
        {header: 'group_id', dataIndex:'group_id', hidden:true},
        {header: 'user_id', dataIndex:'user_id', hidden:true},
        // {header: 'No', xtype:'rownumberer', sortable:false, width: 50},
        {header: 'No Dokter', minWidth: 100, dataIndex: 'staff_number' },
        {header: 'Nama Dokter', minWidth: 150, dataIndex: 'staff_name'},
        // {header: 'Tanggal Terdaftar', minWidth: 150, dataIndex: 'datein'},
        // {header: 'Address', minWidth: 200, dataIndex: 'address' },
        // {header: 'Shipping Address', minWidth: 200, dataIndex: 'shipaddress' },
        // {header: 'Bill Address', minWidth: 200, dataIndex: 'billaddress' },
        // {header: 'No. Telp.', minWidth: 200, dataIndex: 'no_tlp' },
        // {header: 'No. HP', minWidth: 100, dataIndex: 'no_mobile' },
        // {header: 'Fax', minWidth: 100, dataIndex: 'fax' },
        // {header: 'Email', minWidth: 100, dataIndex: 'email' },
        // {header: 'Website', minWidth: 100, dataIndex: 'website' },
        // {header: 'City', minWidth: 150, dataIndex: 'city' },
        // {header: 'State', minWidth: 150, dataIndex: 'state' },
        {header: 'Poli', minWidth: 150, dataIndex: 'polytpe_name'},
        {header:'Biaya Konsultasi',minWidth: 150,xtype: 'numbercolumn',align: 'right',dataIndex:'fee_per_patient'},
        {header: 'Lokasi', minWidth: 150, dataIndex: 'location_name'},
        // {header: 'Notes', minWidth: 250, dataIndex: 'remarks', flex:1 },
        // {header: 'Type Pasien', dataIndex:'docter_type_id', minWidth: 100, renderer: function(value){
        //     return togglearr.map(function(val){return val[1]})[value];
        // }},
        {header: 'Status', dataIndex:'status', minWidth: 100,  
            renderer: function(value) {
               return togglearr.map(function(val){return val[1]})[value];
            },
            flex:1
        },
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                itemId: 'btnAdd',
                text: 'Tambah Dokter',
                iconCls: 'add-icon',
                handler: function() {
                    Windowdokter.show();

                    var form = Ext.getCmp('docterFormProfil').getForm();

                    Ext.getCmp("password_docter").show();
                    Ext.getCmp('docter_type_id').getStore().load(); 
                    Ext.getCmp('docter_staff_name').setValue(); 
                    Ext.getCmp('status_docter').setValue();
                    Ext.getCmp("fotodokterthumb").el.dom.src =null;
                    Ext.getCmp("photodocterupload").disable();
                    Ext.getCmp("docterchagepassword").hide();
                    
                    form.reset();
                    setNumberDoctor(); 
                    
                }
            }, {
                itemId: 'btnEdit',
                text: 'Edit',
                iconCls: 'edit-icon',
                disabled: true,
                hidden:true,
                handler: function() {
                    var grid = Ext.ComponentQuery.query('GridDocter')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var rows = grid.getSelectionModel().getSelection();
                    if (rows.length == 0) {
                        Ext.Msg.alert('Failure', 'Brand is not set!');
                    } else {
                        Formdocter.statusform = 'edit';
                        var data = null;
                        storeGridDocter.getRange().every(function(rec){
                            if(rec.data['iddocter'] == selectedRecord.data['iddocter']){
                                data = rec;
                                return false; 
                            }
                            return true;
                        });
                        formdocter.loadRecord(data);
                        Formdocter.show();
                    }
                }
            }, {
                itemId: 'btnDelete',
                text: 'Hapus',
                iconCls: 'delete-icon',
                disabled: true,
                handler: function() {
                    Ext.Msg.show({
                        title: 'Confirm',
                        msg: 'Data pasien akan dihapus ?',
                        buttons: Ext.Msg.YESNO,
                        fn: function(btn) {
                            if (btn == 'yes') {
                                var grid = Ext.ComponentQuery.query('GridDocter')[0];
                                var sm = grid.getSelectionModel();
                                selected = [];
                                Ext.each(sm.getSelection(), function(item) {
                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                });
                                console.log(selected);
                                Ext.Ajax.request({
                                    url: CLINIC_API + 'docter/delete',
                                    method: 'POST',
                                    params: {
                                        postdata: Ext.encode(selected),
                                        key:key,
                                        idmenu:24
                                    },
                                    success: function(form, action) {
                                        var d = Ext.decode(form.responseText);
                                        if (!d.success) {
                                            Ext.Msg.alert('Informasi', d.message);
                                            storeGridDocter.load();       
                                        } else {
                                            storeGridDocter.load();
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
                xtype: 'searchGridDocter',
                text: 'Left Button',
            }
        ],
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridDocter, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridDocter.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            console.log(record.data.staff_id);
            detail_dokter(record.data.staff_id);
        }
    }
});
