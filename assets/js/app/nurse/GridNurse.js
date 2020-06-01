var Windowperawat = Ext.create(dir_sys + 'nurse.Windowperawat')

Ext.define('GridNurseModel', {
    extend: 'Ext.data.Model',
    fields: ['staff_id','group_id','user_id','staff_name','staff_address','staff_address','staff_mobilephone','staff_email','staff_photo','no_identity','polytpe_id','account_number','account_name','bank_name','remarks','status','location_id','staff_number','location_name','polytpe_name'],
    idProperty: 'id'
});

var storeGridNurse = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridNurseModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'nurse/datas',
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

storeGridNurse.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'key':key,
        'group_id':4
    };
});

var smGridNurse = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'MULTI',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridNurse.getSelection().length;
            if (selectedLen == 0) {
                // Ext.getCmp('GridNurseID').queryById('btnEdit').setDisabled(true);
                Ext.getCmp('GridNurseID').queryById('btnDelete').setDisabled(true);
            }
        },
        select: function(model, record, index) {
            // Ext.getCmp('GridNurseID').queryById('btnEdit') .setDisabled(false);
            Ext.getCmp('GridNurseID').queryById('btnDelete') .setDisabled(false);
        }
    }
});

Ext.define('MY.searchGridNurse', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridNurse',
    store: storeGridNurse,
    width: 180
});

Ext.define(dir_sys + 'nurse.GridNurse', {
    // title: 'Pasient',
    itemId: 'GridNurseID',
    id: 'GridNurseID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridNurse',
    store: storeGridNurse,
    selModel: smGridNurse,
    loadMask: true,
    columns: [
        {header: 'staff_id', dataIndex:'staff_id', hidden:true},
        {header: 'group_id', dataIndex:'group_id', hidden:true},
        {header: 'user_id', dataIndex:'user_id', hidden:true},
        // {header: 'No', xtype:'rownumberer', sortable:false, width: 50},
        {header: 'No Perawat', minWidth: 150, dataIndex: 'staff_number' },
        {header: 'Nama Perawat', minWidth: 150, dataIndex: 'staff_name'},
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
        {header: 'Lokasi', minWidth: 150, dataIndex: 'location_name'},
        // {header: 'Notes', minWidth: 250, dataIndex: 'remarks', flex:1 },
        // {header: 'Type Pasien', dataIndex:'Nurse_type_id', minWidth: 100, renderer: function(value){
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
                text: 'Tambah Perawat',
                iconCls: 'add-icon',
                handler: function() {
                    Windowperawat.show();
                    var form = Ext.getCmp('nurseFormProfil').getForm();

                    Ext.getCmp('staff_name').setValue(); 
                    Ext.getCmp('status_nurse').setValue();
                    Ext.getCmp("fotoperawatthumb").el.dom.src =null;
                    Ext.getCmp("photonurseupload").disable();
                    
                    Ext.getCmp("nursechagepassword").hide();
                    Ext.getCmp("nurse_password").show();
                   
                    form.reset();
                    setNumberNurse();                    
                    Ext.getCmp('location_id').getStore().load();
                    
                }
            }, {
                itemId: 'btnEdit',
                text: 'Edit',
                iconCls: 'edit-icon',
                disabled: true,
                hidden:true,
                handler: function() {
                    var grid = Ext.ComponentQuery.query('GridNurse')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var rows = grid.getSelectionModel().getSelection();
                    if (rows.length == 0) {
                        Ext.Msg.alert('Failure', 'Brand is not set!');
                    } else {
                        FormNurse.statusform = 'edit';
                        var data = null;
                        storeGridNurse.getRange().every(function(rec){
                            if(rec.data['idNurse'] == selectedRecord.data['idNurse']){
                                data = rec;
                                return false; 
                            }
                            return true;
                        });
                        formNurse.loadRecord(data);
                        FormNurse.show();
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
                                var grid = Ext.ComponentQuery.query('GridNurse')[0];
                                var sm = grid.getSelectionModel();
                                selected = [];
                                Ext.each(sm.getSelection(), function(item) {
                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                });
                                console.log(selected);
                                Ext.Ajax.request({
                                    url: CLINIC_API + 'Nurse/delete',
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
                                            storeGridNurse.load();       
                                        } else {
                                            storeGridNurse.load();
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
                xtype: 'searchGridNurse',
                text: 'Left Button',
            }
        ],
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridNurse, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridNurse.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            console.log(record.data.staff_id);
            detail_perawat(record.data.staff_id);
        }
    }
});
