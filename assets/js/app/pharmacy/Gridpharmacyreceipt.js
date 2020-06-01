// var Windowpharmacyreceipt = Ext.create(dir_sys + 'pharmacy.Windowpharmacyreceipt')
if(!Ext.isDefined(Ext.getCmp('Windowpharmacyreceipt'))){
    var Windowpharmacyreceipt = Ext.create(dir_sys + 'pharmacy.Windowpharmacyreceipt')
}else{
    var Windowpharmacyreceipt    = Ext.getCmp('Windowpharmacyreceipt');
}

Ext.define('GridpharmacyreceiptModel', {
    extend: 'Ext.data.Model',
    fields: ['medical_record_id','patient_id','medical_record_desc','medical_action_name','medical_record_no','medical_record_date','doctor_id',
            'nurse_id','medical_status','payment_status','receipt_number','medicine_status','patient_name','doctor_name','datein','medicine_status','patient_type','member_name'],
    idProperty: 'id'
});

var storeGridpharmacyreceipt = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridpharmacyreceiptModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'docter/medical_record',
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

storeGridpharmacyreceipt.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'key':key,
         startdate:Ext.getCmp('receipt_recipes_startdate').getValue(),
         enddate:Ext.getCmp('receipt_recipes_enddate').getValue(),
         medicine_status:Ext.getCmp('medical_status').getValue().status,
         // business_id:'10,12,13,15'
    };
});

var smGridpharmacyreceipt = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'MULTI',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridpharmacyreceipt.getSelection().length;
            if (selectedLen == 0) {
                Ext.getCmp('GridpharmacyreceiptID').queryById('btnreceiptrecipesprint').setDisabled(true);
                Ext.getCmp('GridpharmacyreceiptID').queryById('btnDelete').setDisabled(true);
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('GridpharmacyreceiptID').queryById('btnreceiptrecipesprint') .setDisabled(false);
            Ext.getCmp('GridpharmacyreceiptID').queryById('btnDelete') .setDisabled(false);
        }
    }
});

Ext.define('MY.searchGridpharmacyreceiptDiagnosis', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridpharmacyreceipt',
    store: storeGridpharmacyreceipt,
    width: 180
});

Ext.define(dir_sys + 'pharmacy.Gridpharmacyreceipt', {
    // title: 'Pasient',
    itemId: 'GridpharmacyreceiptID',
    id: 'GridpharmacyreceiptID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.Gridpharmacyreceipt',
    store: storeGridpharmacyreceipt,
    selModel: smGridpharmacyreceipt,
    loadMask: true,
    columns: [
        {header: 'medical_record_id', dataIndex:'medical_record_id', hidden:true},
        {header: 'patient_id', dataIndex:'patient_id', hidden:true},
        {header: 'doctor_id', dataIndex:'doctor_id', hidden:true},
        {header: 'nurse_id', dataIndex:'nurse_id', hidden:true},
        {header: 'No Resep', minWidth: 150, dataIndex: 'receipt_number' },
        // {header: 'No Diagnosa', minWidth: 150, dataIndex: 'receipt_number' },
        {header: 'No Diagnosa', minWidth: 150, dataIndex: 'medical_record_no'},
        {header: 'Nama Pasient', minWidth: 150, dataIndex: 'patient_name'},
        {header: 'Nama Anggota', minWidth: 150, dataIndex: 'member_name'},
        {header: 'Jenis', dataIndex:'patient_type', minWidth: 150},
        {header: 'Dokter', minWidth: 150, dataIndex: 'doctor_name'},
        {header: 'Tanggal Masuk', minWidth: 200, dataIndex: 'datein' },
        {header: 'Tanggal Diagnosa', minWidth: 175, dataIndex: 'medical_record_date' },
        {header: 'Status', dataIndex:'medicine_status', minWidth: 190,  
            renderer: function(value) {
               return customColumnStatus(ArrmedicineStatus,value);
            },
            flex:1
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype:'datefield',
                fieldLabel: 'Tanggal',
                format:'d/m/Y',
                id:'receipt_recipes_startdate',
                labelWidth: 50,
                width:160
            },
            's/d'
            ,{
                xtype:'datefield',
                name:'record_enddate',
                format:'d/m/Y',
                id:'receipt_recipes_enddate',
                width:100
            },
                        ,
            {
                text:'Cari',
                handler:function(){
                    storeGridpharmacyreceipt.load();
                }
            },
            {
                text:'Hapus',
                handler:function(){
                    Ext.getCmp('receipt_recipes_startdate').setValue();
                    Ext.getCmp('receipt_recipes_enddate').setValue();
                    storeGridpharmacyreceipt.load();
                }
            }]
        },{
             xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'radiogroup',
                fieldLabel: 'Status',
                labelWidth: 50,
                id:'medical_status',
                columns: 7,
                items: [
                    { boxLabel: 'Semua', name: 'status', inputValue: '0',checked: true,id:'semua',width:70},
                    { boxLabel: 'Menunggu Pembayaran', name: 'status', inputValue: '1',width:175},
                    { boxLabel: 'Sedang Diproses', name: 'status', inputValue: '2',width:135},
                    { boxLabel: 'Sudah Tersedia', name: 'status', inputValue: '3',width:120},
                    { boxLabel: 'Sudah Diterima', name: 'status', inputValue: '4',width:120},
                    { boxLabel: 'Dibatalkan', name: 'status', inputValue: '5',width:100 },
                    { boxLabel: 'Retur', name: 'status', inputValue: '6',width:70 }],
                listeners:{
                    change: function (field, newValue, oldValue) {
                       Ext.getCmp('GridpharmacyreceiptID').getStore().load()
                    }
                }
            }]
        },{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                itemId: 'btnreceiptrecipesprint',
                text: 'Cetak',
                iconCls: 'print-icon',
                disabled: true,
                // hidden:true,
                handler: function() {
                    var grid = Ext.ComponentQuery.query('Gridpharmacyreceipt')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var rows = grid.getSelectionModel().getSelection();
                    if (rows.length == 0) {
                        Ext.Msg.alert('Failure', 'Brand is not set!');
                    } else {
                        Ext.create('Ext.window.Window', {
                            title: 'Cetak Penerimaan Resep',
                            modal: true,
                            width: 950,
                            height:500,
                            items: [{
                                xtype: 'component',
                                html: '<iframe src="' + SITE_URL + 'docter/pharmacy_receipt/' + selectedRecord.data.medical_record_id + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
                            }],
                            buttons: [{
                                text: 'Print',
                                iconCls: 'print-icon',
                                handler: function() {
                                    window.open(SITE_URL + 'docter/pharmacy_receipt/' + selectedRecord.data.medical_record_id + '/print', '_blank');
                                }
                            }]
                        }).show();
                    }
                }
            },
            {
                itemId: 'btnDelete',
                text: 'Hapus',
                iconCls: 'delete-icon',
                disabled: true,
                id:'btnDeletereceiptrecipes',
                handler: function() {
                    Ext.Msg.show({
                        title: 'Confirm',
                        msg: 'Data pasien akan dihapus ?',
                        buttons: Ext.Msg.YESNO,
                        fn: function(btn) {
                            if (btn == 'yes') {
                                var grid = Ext.ComponentQuery.query('Gridpharmacyreceipt')[0];
                                var sm = grid.getSelectionModel();
                                selected = [];
                                Ext.each(sm.getSelection(), function(item) {
                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                });
                                console.log(selected);
                                Ext.Ajax.request({
                                    url: CLINIC_API + 'docter/delete_medical',
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
                                            storeGridpharmacyreceipt.load();       
                                        } else {
                                            storeGridpharmacyreceipt.load();
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
                xtype: 'searchGridpharmacyreceipt',
                text: 'Left Button',
            }
        ],
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridpharmacyreceipt, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridpharmacyreceipt.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            console.log(record.data.medical_record_id);
           
            pharmacy_detail(record.data.medical_record_id);
        }
    }
});


function pharmacy_detail(medical_record_id){

    Windowpharmacyreceipt.show();

    var pharmacy_form = Ext.getCmp('pharmacyreceiptDetail').getForm();
    
    pharmacy_form.findField('medicine_status').getStore().load();
    
    Ext.Ajax.request({
        url:CLINIC_API + 'docter/medical_record',
        method:'GET',
        params:{
            medical_record_id:medical_record_id,
            key
        },
        success:function(form,action){
             var d =Ext.decode(form.responseText);
            console.log(d)
            var data = d.rows[0];
            // var form = Ext.getCmp('Formdiagnosa').getForm();
            //date_payment
            pharmacy_form.findField('medical_record_id').setValue(data.medical_record_id*1);
            pharmacy_form.findField('medical_record_no').setValue(data.medical_record_no);
            pharmacy_form.findField('receipt_number').setValue(data.receipt_number);
            pharmacy_form.findField('patient_id').setValue(data.patient_id);
            pharmacy_form.findField('patient_type').setValue(data.patient_type);
            pharmacy_form.findField('patient_type_id').setValue(data.patient_type_id);
            pharmacy_form.findField('patient_name').setValue(data.patient_name);
            pharmacy_form.findField('medical_record_date').setValue(data.medical_record_date);
            pharmacy_form.findField('payment_status').setValue(data.payment_status);
            pharmacy_form.findField('payment').setValue(data.payment);
            pharmacy_form.findField('doctor_id').setValue(data.doctor_id*1);
            pharmacy_form.findField('doctor_name').setValue(data.doctor_name);
            pharmacy_form.findField('medicine_status').setValue(data.medicine_status*1);
            pharmacy_form.findField('payment_date').setValue(data.due_date);
            pharmacy_form.findField('doctor_name').setValue(data.doctor_name);
        },
        failure:function(form,action){

        }
    })

    var drug = Ext.getCmp('DrugreceiptGrid').getStore();

    drug.on('beforeload', function(store, operation, eOpts) {
        operation.params = {
            'key':key,
            'medical_record_id':medical_record_id
        };
    });

    drug.load();
}
