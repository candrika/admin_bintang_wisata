var employeeAccessTab = Ext.create(dir_sys + 'employee.employeeAccessTab');
var wGridAsuransiPopup = Ext.create(dir_sys + 'employee.gridAsuransiPopup');
var ChooserListSalesman = Ext.create(dir_sys + 'employee.ChooserListSalesman');

// Ext.create(dir_sys + 'employee.PayrollHistoryGrid');
Ext.create(dir_sys + 'employee.AsuransiEmpGrid');
Ext.create(dir_sys + 'employee.GridPotonganGrid');
Ext.create(dir_sys + 'employee.GridTunjanganGrid');
Ext.create(dir_sys + 'employee.GridTambahanGajiGrid');

load_js_file('employee/importDataPegawai.js');
load_js_file('employee/importDataPotongan.js');
load_js_file('employee/importDataTunjangan.js');

var storeGridTambahanGajiGrid = Ext.getCmp('GridTambahanGajiGridID').getStore();
var storeGridTunjanganGrid = Ext.getCmp('GridTunjanganGridID').getStore();
var storeGridPotonganGrid = Ext.getCmp('GridPotonganGrid').getStore();
// var storePayrollHistoryGrid = Ext.getCmp('PayrollHistoryGridID').getStore();

if (!Ext.isDefined(Ext.getCmp('EmployeeConfigWindow'))) {
    var EmployeeConfigWindow = Ext.create(dir_sys + 'employee.EmployeeConfigWindow');
} else {
    var EmployeeConfigWindow = Ext.create(dir_sys + 'employee.EmployeeConfigWindow');
}

var keaktifan = Ext.create('Ext.data.Store', {
    fields: ['abbr', 'keaktifan'],
    data: [
        { "keaktifan": "Aktif" },
        { "keaktifan": "Non Aktif" },
        //...
    ]
});

var formemployeeGrid = Ext.create('Ext.form.Panel', {
    id: 'formemployeeGrid',
    title: 'Profil',
    // url: SITE_URL + 'backendx/saveform/employeeGrid',
    url: CLINIC_API + 'employee/save_profile',
    baseParams: { key: key },
    bodyStyle: 'padding:5px',
    // width:panelW-300,
    // height:panelH-300,
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        //        padding: '5 40 5 5',
        labelWidth: 200,
        width: 500
    },
    layout: 'hbox',
    defaults: {
        padding: '5 10 5 5'
    },
    items: [{
        items: [{
                xtype: 'hiddenfield',
                name: 'idemployee',
                id: 'idemployee'
            },
            {
                xtype: 'hiddenfield',
                name: 'password_existed'
            },
            {
                xtype: 'hiddenfield',
                name: 'password_existed'
            },
            {
                xtype: 'hiddenfield',
                name: 'idunit',
                value:idunit
            },
            {
                xtype: 'hiddenfield',
                name: 'user_id',
                // value: userid,

            },
            {
                xtype: 'hiddenfield',
                name: 'statusformemployeeGrid',
                id: 'statusformemployeeGrid'
            }, {
                xtype: 'textfield',
                fieldLabel: 'No Staff',
                allowBlank: false,
                name: 'code'
            },
            {
                xtype: 'comboxunit',
                name: 'idunit',
                hidden:true,
                id: 'unitformpegawai'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Nama Lengkap',
                allowBlank: false,
                name: 'firstname'
            },{
                xtype: 'textfield',
                fieldLabel: 'No Identitas',
                // allowBlank: false,
                name: 'no_id'
            },{
                xtype: 'comboxStatusKawin',
                name:'marital_status'
            }, 
             {
                xtype: 'datefield',
                fieldLabel: 'Tgl Lahir',
                format: 'd-m-Y',
                name: 'birth_date'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Tempat Lahir',
                // allowBlank: false,
                name: 'birth_location'
            },
            // {
            //     xtype: 'comboxsys_group',
            //     allowBlank: false,
            //     fieldLabel: 'Jabatan',
            //     name: 'group_id'
            // },
             {
                xtype: 'textarea',
                fieldLabel: 'Alamat',
                // allowBlank: false,
                name: 'address'
            },
            // {
            //     xtype: 'textfield',
            //     fieldLabel: 'Kode POS',
            //     name: 'postcode'
            // }, 
            // {
            //     xtype: 'textfield',
            //     fieldLabel: 'Negara',
            //     name: 'country'
            // }, 
            //  {
            //     xtype: 'textfield',
            //     fieldLabel: 'No Telpon',
            //     // allowBlank: false,
            //     name: 'telephone'
            // }, 
            {
                xtype: 'textfield',
                allowBlank: false,
                fieldLabel: 'No Handphone',
                name: 'handphone'
            },
            {
                xtype: 'textfield',
                 allowBlank: false,
                fieldLabel: 'Email',
                name: 'email'
            },{
                xtype:'comboxsys_group',
                 allowBlank: false,
                valueField:'group_id',
                name:'group_id',
                id: 'group_id_empAccess'
            },
            {
                xtype: 'radiogroup',
                width: 200,
                 allowBlank: false,
                fieldLabel: 'Akses Login?',
                id: 'is_login_empAccess',
                columns: 1,
                vertical: true,
                items: [
                    {boxLabel: 'Ya', name: 'is_login', inputValue: 1},
                    {boxLabel: 'Tidak', name: 'is_login', inputValue: 0, checked: true}
                ],
                listeners: {
                  change: function(radiogroup, radio) {

                    var form = Ext.getCmp('formemployeeGrid').getForm();

                    if(radio.is_login==1)
                    {
                        if (Ext.getCmp('idemployee').getValue()!=''){
                            //edit form state                       
                            if(form.findField('password_existed').getValue()=='0'){
                                form.findField('password').show();
                                form.findField('password').setDisabled(false);
                            } else {
                                form.findField('password').hide();
                                form.findField('password').setDisabled(true);
                            }
                            
                            // var fieldpassword = form.findField('password');
                            // fieldpassword.allowBlank = false; // data => allowBlank
                        } else {
                            Ext.getCmp('password_empAccess').show();
                        }
                       
                    } else {
                        Ext.getCmp('password_empAccess').hide();
                    }
                  }
                }
            },{
                xtype: 'textfield',
                id:'password_empAccess',
                inputType: 'password',
                fieldLabel: 'Kata Kunci',
                // allowBlank: false,
                name: 'password'
            }
        ]
    }, { 
        // style: {
        //         marginLeft: '100px'
        //     },
        items: [        
            {
                xtype: 'checkbox',
                name:'cb_all_bussiness',
                allowBlank: false,
                boxLabel:'Ya',
                fieldLabel: 'Semua Unit Usaha',
                listeners: {
                    change: function (field, newValue, oldValue) {
                      var form = Ext.getCmp('formemployeeGrid').getForm();
                      if(newValue){
                        form.findField('business_id').setValue(null);
                        form.findField('business_id').setReadOnly(true);
                        form.findField('business_id').hide();
                      } else {
                        form.findField('business_id').setReadOnly(false);
                        form.findField('business_id').show();
                      }
                    }
                }
            },
            {
                xtype:'comboxBusinessTransferUnit',
                name:'business_id',
                fieldLabel: 'Unit',
            },
             {
                xtype: 'textarea',
                fieldLabel: 'Catatan',
                name: 'notes'
            }, 
            // {
            //     xtype: 'comboxjenisptkp',
            //     name:'idjenisptkp',
            //     allowBlank: false
            // }, 
            Ext.create('Ext.form.field.ComboBox', {
                fieldLabel: 'Status Keaktifan',
                displayField: 'keaktifan',
                queryMode: 'local',
                id: 'keaktifan',
                name: 'keaktifan',
                editable: false,
                triggerAction: 'all',
                valueField: 'keaktifan',
                allowBlank: false,
                store: keaktifan
            })
            // {
            //     xtype: 'datefield',
            //     format: "Y-m-d",
            //     fieldLabel: 'Tanggal Masuk',
            //     allowBlank: false,
            //     name: 'pegawaitglmasuk'
            // },
            // {
            //     xtype: 'datefield',
            //     format: "Y-m-d",
            //     fieldLabel: 'Tanggal Resign',
            //     name: 'tglresign'
            // }
        ]
    }],
    buttons: [
    {
        text: 'Ubah Kata Kunci',
        id:'emp_change_pass_btn',
        handler: function() {
            if (!Ext.isDefined(Ext.getCmp('EmployeeChangePassWindow'))) {
                var EmployeeChangePassWindow = Ext.create(dir_sys + 'employee.EmployeeChangePassWindow');
            } else {
                var EmployeeChangePassWindow = Ext.getCmp('EmployeeChangePassWindow');
            }
            EmployeeChangePassWindow.show();

            var form_pass = Ext.getCmp('EmployeeChangePassForm').getForm();
            form_pass.findField('employee_id').setValue(Ext.getCmp('idemployee').getValue());
        }    
    },'->',{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupemployeeGrid');
            Ext.getCmp('formemployeeGrid').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnemployeeGridSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                // if (form.findField('is_login').getValue() == 1 && form.findField('password').getValue() == ''){
                    // var field = form.findField('password');
                    // field.allowBlank = false; // data => allowBlank
                    // form.isValid();

                    // Ext.Msg.alert("Error!", "Harap masukan kata kunci terlebih dahulu!");
                // } else {
                    form.submit({
                        success: function (form, action) {

                            Ext.Msg.alert('Success', action.result.message);

                            Ext.getCmp('formemployeeGrid').getForm().reset();
                            Ext.getCmp('windowPopupemployeeGrid').hide();

                            storeGridemployeeGrid.load();
                        },
                        failure: function (form, action) {
                            var d = Ext.decode(action.response.responseText);
                            Ext.Msg.alert('Failure', d.message);
                        }
                    });
                // }
                
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});


Ext.define('TabPegawai', {
    extend: 'Ext.tab.Panel',
    id: 'TabPegawai',
    alias: 'widget.TabPegawai',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    plain:true,
    defaults: {
        autoScroll: true
    },
    listeners: {
        render: function() {
            // alert('a');
            this.items.each(function(i) {
                i.tab.on('click', function() {
                    // alert('as');
                    var grid = Ext.ComponentQuery.query('GridemployeeGrid')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    if (i.title == 'Pendapatan') {
                        storeGridTambahanGajiGrid.on('beforeload', function(store, operation, eOpts) {
                            operation.params = {
                                'extraparams': 'a.idemployee:' + selectedRecord.data.idemployee
                            };
                        });
                        storeGridTambahanGajiGrid.load();
                    } else if (i.title == 'Tunjangan') {
                        storeGridTunjanganGrid.on('beforeload', function(store, operation, eOpts) {
                            operation.params = {
                                'extraparams': 'a.idemployee:' + selectedRecord.data.idemployee
                            };
                        });

                        storeGridTunjanganGrid.load();
                    } else if (i.title == 'Potongan') {
                        storeGridPotonganGrid.on('beforeload', function(store, operation, eOpts) {
                            operation.params = {
                                'extraparams': 'a.idemployee:' + selectedRecord.data.idemployee
                            };
                        });
                        storeGridPotonganGrid.load();
                    } else if (i.title == 'Asuransi') {
                        var storeAsuransiEmpGrid = Ext.getCmp('AsuransiEmpGridID').getStore();
                        storeAsuransiEmpGrid.on('beforeload', function(store, operation, eOpts) {
                            operation.params = {
                                'extraparams': 'a.idemployee:' + selectedRecord.data.idemployee
                            };
                        });
                        storeAsuransiEmpGrid.load();
                    } else if (i.title == 'Pengaturan Akun') {
                        Ext.getCmp('group_id_empAccess').getStore().load();
                        
                        Ext.Ajax.request({
                            url: SITE_URL + 'pegawai/get_user_akses',
                            method: 'GET',
                            params: {
                                idemployee: Ext.getCmp('idemployee').getValue()
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                Ext.getCmp('is_login_empAccess').setValue({ is_login: d.is_login });
                                Ext.getCmp('group_id_empAccess').setValue(d.group_id);
                                Ext.getCmp('user_id_empAccess').setValue(d.user_id);
                                Ext.getCmp('username_empAccess').setValue(d.username);
                                Ext.getCmp('password_empAccess').setValue(d.password);
                            },
                            failure: function(form, action) {
                                console.log(form.responseText);
                                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            }
                        });
                    }
                });
            });
        }
    },
    items: [
        formemployeeGrid,
        // employeeAccessTab,
        // {
        //     xtype: 'GridTambahanGajiGrid',
        //     id: 'GridTambahanGajiGrid'
        // },        
        // {
        //     xtype: 'GridTunjanganGrid',
        //     id: 'GridTunjanganGrid'
        // },
        // {
        //     xtype: 'GridPotonganGrid',
        //     id: 'GridPotonganGrid'
        // },
        // {
        //     xtype:'GridSutriGrid'
        // },
        // {
        //     xtype:'GridAnakGrid'
        // },
        // {
        //     xtype: 'AsuransiEmpGrid',
        //     id: 'AsuransiEmpGrid'
        // }
    ]
});

var wemployeeGrid = Ext.create('widget.window', {
    id: 'windowPopupemployeeGrid',
    title: 'Data Pengurus',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    bodyStyle: 'padding:5px',
    closeAction: 'hide',
    modal: true,
       autoWidth: true,
    // width: 870,
       autoHeight: true,
    // height: 490,
    layout: 'fit',
    border: false,
    //    items: [formemployeeGrid]
    items: [
        { xtype: 'TabPegawai' }
    ]
});

Ext.define('GridemployeeGridModel', {
    extend: 'Ext.data.Model',
    fields: ['idemployee', 'code', 'firstname', 'group_name', 'lastname', 'address', 'telephone', 'handphone', 'fax', 'email', 'website', 'city', 'state', 'postcode', 'country', 'notes', 'nametype','status','password_existed'],
    idProperty: 'id'
});

var storeGridemployeeGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridemployeeGridModel',
    remoteSort: true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'employee/datas?key='+key,
        actionMethods: {
            read: 'GET'
        },
        reader: {
          root: 'rows',
          totalProperty: 'results'
        }
    },
    sorters: [{
        property: 'menu_name',
        direction: 'DESC'
    }]
});

storeGridemployeeGrid.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        // 'key':key,
        'idunit':idunit
    };
});



Ext.define('MY.searchGridemployeeGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridemployeeGrid',
    store: storeGridemployeeGrid,
    width: 180
});

var smGridemployeeGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridemployeeGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteemployeeGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteemployeeGrid').enable();
        }
    }
});

Ext.define(dir_sys + 'employee.GridemployeeGrid', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smSalesGrid,
    // title: 'Penjualan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    // remoteSort:true,
    itemId: 'GridemployeeGrid',
    id: 'GridemployeeGrid',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridemployeeGrid',
//     store: storeSalesGrid,
//     loadMask: true,

// // Ext.define('GridemployeeGrid', {
//     // renderTo:'mytabpanel',
//     //    multiSelect: true,
//     //    selModel: smGridemployeeGrid,
//     //    title: 'Daftar Pegawai',
//     // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
//     itemId: 'GridemployeeGridID',
//     id: 'GridemployeeGridID',
//     extend: 'Ext.grid.Panel',
//     alias: 'widget.GridemployeeGrid',
    store: storeGridemployeeGrid,
    loadMask: true,
    columns: [
        { header: 'idemployee', dataIndex: 'idemployee', hidden: true },
        { header: 'No Staff', dataIndex: 'code', minWidth: 150 },
        { header: 'Nama Lengkap', dataIndex: 'firstname', minWidth: 150, flex:1 },
        { header: 'Kelompok User', dataIndex: 'group_name', minWidth: 150 },
        { header: 'address', dataIndex: 'address', minWidth: 150 },
        // { header: 'telephone', dataIndex: 'telephone', minWidth: 150 },
        { header: 'handphone', dataIndex: 'handphone', minWidth: 150,hidden:true },
        // { header: 'fax', dataIndex: 'fax', minWidth: 150 },
        { header: 'email', dataIndex: 'email', minWidth: 150 },
        // { header: 'website', dataIndex: 'website', minWidth: 150 },
        // { header: 'city', dataIndex: 'city', minWidth: 150 },
        // { header: 'state', dataIndex: 'state', minWidth: 150 },
        // { header: 'post code', dataIndex: 'postcode', minWidth: 150 },
        // { header: 'country', dataIndex: 'country', minWidth: 150 },
        // { header: 'Tgl Masuk', dataIndex: 'pegawaitglmasuk', minWidth: 150 },
        { header: 'Status', dataIndex: 'status', minWidth: 150,
            renderer: function(value) {
                return customColumnStatus2(StatusColumnArr, value);
        } }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
                itemId: 'addemployeeGrid',
                text: 'Tambah',
                iconCls: 'add-icon',
                handler: function() {
                    wemployeeGrid.show();
                    Ext.getCmp('formemployeeGrid').getForm().reset();
                    Ext.getCmp('statusformemployeeGrid').setValue('input');
                    disabledTabEmployee(true);
                    jenisptkpStore.load();
                    comboxemployeeStore.load();
                    // sys_groupStore.load();

                    var form = Ext.getCmp('formemployeeGrid').getForm();
                    form.findField('business_id').getStore().load();
                    form.findField('group_id').getStore().load()

                    Ext.getCmp('TabPegawai').setActiveTab(0);

                    Ext.getCmp('password_empAccess').hide();
                    Ext.getCmp('password_empAccess').setDisabled(false);
                    Ext.getCmp('emp_change_pass_btn').hide();
                }
            },
            {
                itemId: 'editemployeeGrid',
                text: 'Detail',
                iconCls: 'edit-icon',
                handler: function() {
                    var grid = Ext.ComponentQuery.query('GridemployeeGrid')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var data = grid.getSelectionModel().getSelection();
                    if (data.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                    } else {
                       load_data_employee(selectedRecord);
                    }

                }
            }, {
                id: 'btnDeleteemployeeGrid',
                text: 'Hapus',
                iconCls: 'delete-icon',
                handler: function() {
                    Ext.Msg.show({
                        title: 'Confirm',
                        msg: 'Delete Selected ?',
                        buttons: Ext.Msg.YESNO,
                        fn: function(btn) {
                            if (btn == 'yes') {
                                var grid = Ext.ComponentQuery.query('GridemployeeGrid')[0];
                                var sm = grid.getSelectionModel();
                                selected = [];
                                Ext.each(sm.getSelection(), function(item) {
                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                });
                                Ext.Ajax.request({
                                    url: CLINIC_API + 'employee/delete_employee',
                                    method: 'POST',
                                    params: {
                                        postdata: Ext.encode(selected),
                                        // idmenu: 25
                                        key:key
                                    },
                                    success: function(form, action) {
                                        var d = Ext.decode(form.responseText);
                                        if (!d.success) {
                                            Ext.Msg.alert('Informasi', d.message);
                                        } else {
                                            storeGridemployeeGrid.load();
                                        }
                                    },
                                    failure: function(form, action) {
                                        var d = Ext.decode(form.responseText);
                                        console.log(action.result)
                                        Ext.Msg.alert('Failed', d ? d.message : 'No response');
                                    }
                                });
                            }
                        }
                    });
                },
                //                    disabled: true
            }, '->',
            // {
            //     text: 'Import Pegawai',
            //     iconCls: 'page_excel',
            //     handler: function() {
            //         winImportPegawai.show();
            //     }
            // },
            // {
            //     text: 'Import Tunjangan',
            //     iconCls: 'page_excel',
            //     handler: function() {
            //         winImportTunjangan.show();
            //     }
            // },
            // {
            //     text: 'Import Potongan',
            //     iconCls: 'page_excel',
            //     handler: function() {
            //         winImportPotongan.show();
            //     }
            // },
            {
              text: 'Pengaturan',
              iconCls:'pengaturan-icon',
              handler: function() {
                

                EmployeeConfigWindow.show();

              }
            }, 
            'Pencarian: ', ' ',
            {
                xtype: 'searchGridemployeeGrid',
                text: 'Left Button'
            }

        ]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridemployeeGrid, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
            // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridemployeeGrid.load();

            }
        },
        itemclick: function(dv, record, item, index, e) {
            //            console.log(record.data.idsiswa)

            // storePayrollHistoryGrid.on('beforeload', function(store, operation, eOpts) {
            //     operation.params = {
            //         'bulantahunpenggajian': Ext.getCmp('PayrollHistoryPeriod').getValue(),
            //         'extraparams': 'a.idemployee:' + record.data.idemployee
            //     }
            // });
            // storePayrollHistoryGrid.load();
            //            storePayrollHistoryGrid.load({
            //                            params: {
            //                                'bulantahunpenggajian': Ext.getCmp('PayrollHistoryPeriod').getValue(),
            //                                'extraparams': 'a.idemployee:' + record.data.idemployee
            //                            }
            //                        });
        },
        itemdblclick: function(dv, selectedRecord, item, index, e) {
            load_data_employee(selectedRecord);
        }
    }
});

function load_data_employee(selectedRecord){
    var forme = Ext.getCmp('formemployeeGrid').getForm();
    forme.findField('business_id').getStore().load();

    // forme.findField('idjenisptkp').getStore().load();
    forme.load({
        url: CLINIC_API + 'employee/data?key='+key,
        method: 'GET',
        params: {
            eid: selectedRecord.data.idemployee,
            idunit:idunit
        },
        success: function(form, action) {
            var d = Ext.decode(action.response.responseText);

            Ext.getCmp('password_empAccess').hide();
            forme.findField('marital_status').setValue(d.data.marital_status*1);


            if(d.data.business_id=='' || d.data.business_id==null){
                forme.findField('cb_all_bussiness').setValue(true);
                forme.findField('business_id').setValue(null);
                forme.findField('business_id').setReadOnly(true);
                forme.findField('business_id').hide();
            } else {
                forme.findField('cb_all_bussiness').setValue(false);
                forme.findField('business_id').setReadOnly(false);
                forme.findField('business_id').show();
            }

            if(d.data.password_existed=='1'){
                Ext.getCmp('emp_change_pass_btn').show();
            } else {
                Ext.getCmp('emp_change_pass_btn').hide();
            }
            forme.findField('password_existed').setValue(d.data.password_existed);

            // if (form.findField('is_login').getValue() == 1){
            //     //dapat akses login hide password dan tampilkan tombol ubah password
            //     form.findField('password').hide();
            // } else {
                
            // }

            // console.log(d)
            // Ext.Msg.alert("Load failed", action.result.errorMessage);
        },
        failure: function(form, action) {
            Ext.Msg.alert("Load failed", action.result.errorMessage);
        }
    })

    wemployeeGrid.show();
    Ext.getCmp('statusformemployeeGrid').setValue('edit');

    // dataGaji(selectedRecord.data.idemployee)

    disabledTabEmployee(false);

    Ext.getCmp('TabPegawai').setActiveTab(0);

    sys_groupStore.load();
}

// function dataGaji(idemployee) {
//     //tab gaji
//     Ext.getCmp('formGridSalary').getForm().load({
//         url: SITE_URL + 'backend/loadFormData/gridsalary/1/employee',
//         params: {
//             extraparams: 'a.idemployee:' + idemployee
//         },
//         success: function(form, action) {
//             // Ext.Msg.alert("Load failed", action.result.errorMessage);
//         },
//         failure: function(form, action) {
//             //            Ext.Msg.alert("Load failed", action.result.errorMessage);
//         }
//     })
// }


// Ext.define('TabPortDetailPegawai', {
//     extend: 'Ext.tab.Panel',
//     id: 'TabPortDetailPegawai',
//     alias: 'widget.TabPortDetailPegawai',
//     activeTab: 0,
//     autoWidth: '100%',
//     items: [{
//         xtype: 'PayrollHistoryGrid'
//     }],
//     listeners: {
//         render: {
//             scope: this,
//             fn: function(grid) {

//             }
//         }
//     }
// });


// Ext.define(dir_sys + 'employee.EmployeeGrid', {
//     extend: 'Ext.Panel',
//     alias: 'widget.EmployeeGrid',
//     layout: 'border',
//     bodyBorder: false,
//     items: [
//         {
//             xtype: 'GridemployeeGrid'
//         }
//     ]
// });

function disabledTabEmployee(mode) {
    // if(mode)
    // {
    // Ext.getCmp('GridTambahanGajiGrid').setDisabled(mode);
    // Ext.getCmp('GridTunjanganGrid').setDisabled(mode);
    // Ext.getCmp('GridPotonganGrid').setDisabled(mode);
    // Ext.getCmp('AsuransiEmpGrid').setDisabled(mode);
    // Ext.getCmp('employeeAccessTab').setDisabled(mode);
    // } else {

    // }
}