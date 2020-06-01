var WindowPasien = Ext.create(dir_sys + 'patient.WindowPasien')

Ext.define('GridPatientModel', {
    extend: 'Ext.data.Model',
    fields: ['patient_id','member_id','patient_no','patient_name','birthday_date','id_type','country','datein','email','no_id','no_mobile','no_tlp','patient_photo','patient_type_id','remarks','status','gender_type','business_name','patient_type','polis'],
    idProperty: 'id'
});

var storeGridPatient = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPatientModel',
    // remoteSort: true,
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
        property: 'patient_id',
        direction: 'DESC'
    }]
});

storeGridPatient.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'key':key,
        'business_id':Ext.getCmp('unit_usaha').getValue()
    };
});

var smGridPatient = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'MULTI',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPatient.getSelection().length;
            if (selectedLen == 0) {
                // Ext.getCmp('GridPatientID').queryById('btnEdit').setDisabled(true);
                Ext.getCmp('GridPatientID').queryById('btnDelete').setDisabled(true);
            }
        },
        select: function(model, record, index) {
            console.log(record);
            if(record.data.member_id!=null){
                Ext.getCmp('GridPatientID').queryById('btnDelete') .setDisabled(true);

            }else{
                Ext.getCmp('GridPatientID').queryById('btnDelete') .setDisabled(false);

            }
        }
    }
});

Ext.define('MY.searchGridPatient', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPatient',
    store: storeGridPatient,
    width: 180
});

Ext.define(dir_sys + 'patient.GridPatient', {
    // title: 'Pasient',
    itemId: 'GridPatientID',
    id: 'GridPatientID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPatient',
    store: storeGridPatient,
    selModel: smGridPatient,
    loadMask: true,
    columns: [
        {header: 'No', xtype:'rownumberer', sortable:false, width: 50},
        {header: 'patient_id', dataIndex:'patient_id', hidden:true},
        {header: 'member_id', dataIndex:'member_id', hidden:true},
        {header: 'No Pasien', minWidth: 150, dataIndex: 'patient_no' },
        {header: 'Nama Pasien', minWidth: 150, dataIndex: 'patient_name'},
        {header: 'Nama Anggota', minWidth: 150, dataIndex: 'polis'},
        {header: 'Kategori', minWidth: 150, dataIndex: 'patient_type'},
        {header: 'Unit Usaha', minWidth: 150, dataIndex: 'business_name'},
        {header: 'Tanggal Terdaftar', minWidth: 150, dataIndex: 'datein'},
        {header: 'Lokasi', minWidth: 150, dataIndex: 'country' },
        {header: 'Status', dataIndex:'status', minWidth: 190,  
            renderer: function(value) {
               return customColumnStatus(ArrpatientStatus,value);
            },
            flex:1
        },{
            header: 'Jabatan', dataIndex:'remarks', minWidth: 100,flex:1
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                        xtype:'comboxBusinessUnitpatient',
                        name:'business_id',
                        id:'unit_usaha',
                        width:300,
                        listeners:{
                            render:function(){
                                Ext.getCmp('unit_usaha').getStore().load();
                            }
                        }
            },{
                text: 'Search',
                handler:function(){
                    // alert('xxx')
                    Ext.getCmp('GridPatientID').getStore().load()
                } 
            },{
                text: 'Clear Filter',
                handler:function(){
                    // alert('xxx')
                    Ext.getCmp('unit_usaha').setValue();
                    Ext.getCmp('GridPatientID').getStore().load();
                }   
            }]
        },{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                itemId: 'btnAdd',
                text: 'Pendaftaran Pasien',
                iconCls: 'add-icon',
                handler: function() {
                    WindowPasien.show();
                    var form = Ext.getCmp('patientFormProfil').getForm();
                    
                    form.reset();
                    Ext.getCmp('BtnPatientGridSimpan').enable();

                    Ext.getCmp('patient_no').setValue();
                    Ext.getCmp('patient_name').setValue(); 
                    Ext.getCmp('patient_type_id').setValue(); 
                    Ext.getCmp('member_id').setValue();
                    Ext.getCmp('np_number').setValue();
                    Ext.getCmp('status_patient').setValue();
                    Ext.getCmp("fotoPasienthumb").el.dom.src =null;
                    Ext.getCmp("photoPatientupload").disable();
                    
                    // Ext.getCmp('business_id_patient').getStore().load();
                     Ext.getCmp('business_id_patient').hide();

                    setNoArticle(idunit, 'patient_id', 'patient_no', 'patient', 'patient_no', 'PSN','and deleted=0');                    
                    Ext.getCmp('patient_type_id').setValue(2);
                    Ext.getCmp('status_patient').getStore().load();
                    Ext.getCmp('status_patient').setValue(2);
                }
            }, {
                itemId: 'btnEdit',
                text: 'Edit',
                iconCls: 'edit-icon',
                disabled: true,
                hidden:true,
                handler: function() {
                    var grid = Ext.ComponentQuery.query('GridPatient')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var rows = grid.getSelectionModel().getSelection();
                    if (rows.length == 0) {
                        Ext.Msg.alert('Failure', 'Brand is not set!');
                    } else {
                        FormPatient.statusform = 'edit';
                        var data = null;
                        storeGridPatient.getRange().every(function(rec){
                            if(rec.data['idPatient'] == selectedRecord.data['idPatient']){
                                data = rec;
                                return false; 
                            }
                            return true;
                        });
                        formPatient.loadRecord(data);
                        FormPatient.show();
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
                                var grid = Ext.ComponentQuery.query('GridPatient')[0];
                                var sm = grid.getSelectionModel();
                                var selectedRecord = sm.getSelection()[0];

                                // if(selectedRecord.data.member_id!=''){

                                // }

                                selected = [];
                                Ext.each(sm.getSelection(), function(item) {
                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                });
                                console.log(selected);
                                Ext.Ajax.request({
                                    url: CLINIC_API + 'patient/remove',
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
                                            storeGridPatient.load();       
                                        } else {
                                            storeGridPatient.load();
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
            },{
              text:'Sync Data Anggota',
              handler: function(){
                Ext.Ajax.request({
                    url:CLINIC_API + 'patient/sync_member',
                    method:'GET',
                    params:{
                        key:key
                    },
                    success:function(form,action){
                        var d =Ext.decode(form.responseText);
                        Ext.Msg.alert('Success', d.message);
                        Ext.getCmp('GridPatientID').getStore().load();

                    },
                    failure:function(form,action){
                        var d =Ext.decode(form.responseText);
                        Ext.Msg.alert('Failure', d.message);
                        Ext.getCmp('GridPatientID').getStore().load();
                    }
                })
              } 
            },
            '->', 
            'Pencarian: ', 
            ' ', 
            {
                xtype: 'searchGridPatient',
                text: 'Left Button',
            }
        ],
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridPatient, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true,
        // pageSize:100
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPatient.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            console.log(record.data.patient_no);
            detail_pasien(record.data.patient_id,record.data.member_id,record.data.patient_no);
        }
    }
});
