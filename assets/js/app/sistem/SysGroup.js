Ext.create(dir_sys + 'sistem.GridTreeSysGroupAksesMenu');

var wSysGroupAksesMenu = Ext.create('widget.window', {
    id: 'wSysGroupAksesMenu',
    title: 'User Rights',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    //    autoWidth: true,
    // minWidth: 450,
    //    height: 350,
    autoHeight: true,
    layout: 'hbox',
    
    items: [
       {
            xtype: 'GridTreeSysGroupAksesMenu'
        }
    ]
});

var formSysGroup = Ext.create('Ext.form.Panel', {
    id: 'formSysGroup',
    width: 550,
//    height: 300,
    url: SITE_URL + 'backend/saveform/SysGroup/sistem',
    baseParams: {idmenu:116},
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 160,
        anchor:'100%'
//        width: 400
    },
    items: [{
            xtype: 'hiddenfield',
            name: 'statusformSysGroup',
            id: 'statusformSysGroup'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'group_id',
            name: 'group_id'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Kelompok',
            allowBlank: false,
            name: 'group_name'
        },{
            xtype: 'textarea',
            fieldLabel: 'Deskripsi',
            name: 'description'
        },{
        // Fieldset in Column 1 - collapsible via toggle button
        xtype:'fieldset',
        // columnWidth: 0.3,
        //columnHeigth:'auto', 
        autoHeight:true,
        // autoWidth:true,
        title: 'Persetujuan',
        //collapsible: true,
        layout:'hbox',
        defaults: {anchor: '100%'},
        // layout: 'anchor',
        //xtype:''
        items :[
        {
            
            layout:'vbox',
            defaultType: 'checkboxfield',
           
            items:[{
               
                name: 'quotation_approval_opt',
                inputValue:'1',
                // id:'checkboxid',
                boxLabel: 'Quotation Slip',

            },{
                boxLabel: 'Placing Slip',
                name: 'placing_approval_opt',
                inputValue:'1',
            },{
                boxLabel: 'Claim',
                name: 'claim_approval_opt',
                inputValue:'1',  
            }]
        },{
            layout:'vbox',
            defaultType: 'checkbox',
             style:{
                marginLeft:'10px'
            },
            items:[{
                boxLabel: 'Credit Note',
                name: 'cn_approval_opt',
                hidden:true,
                inputValue:'1',

            },{
                boxLabel: 'Credit Note Payment',
                hidden:true,
                name: 'cnpayment_approval_opt',
                inputValue:'1',
            },{
                boxLabel: 'Payment Claim',
                hidden:true,
                name: 'claimpayment_approval_opt',
                inputValue:'1',  
            }]
        },{
            layout:'vbox',
            style:{
                marginLeft:'10px',
                marginRigth:'10px'
            },
            defaultType:'checkbox',
            items:[{
                boxLabel: 'Debit Note',
                hidden:true,
                name: 'dn_approval_opt',
                inputValue:'1',
            },{
                 boxLabel: 'Debit Note Payment',
                 hidden:true,
                 name: 'dnpayment_approval_opt',
                 inputValue:'1',
            }]
        }]
    } ],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupSysGroup');
                Ext.getCmp('formSysGroup').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnSysGroupSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formSysGroup').getForm().reset();
                            Ext.getCmp('windowPopupSysGroup').hide();
                            storeGridSysGroup.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridSysGroup.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wSysGroup = Ext.create('widget.window', {
    id: 'windowPopupSysGroup',
    title: 'Manajemen User',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formSysGroup]
});

Ext.define('GridSysGroupModel', {
    extend: 'Ext.data.Model',
    fields: ['group_id','group_name','userin','datein','description'],
    idProperty: 'id'
});

var storeGridSysGroup = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSysGroupModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/SysGroup/sistem',
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
Ext.define('MY.searchGridSysGroup', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSysGroup',
    store: storeGridSysGroup,
    width: 180
});
var smGridSysGroup = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridSysGroup.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteSysGroup').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteSysGroup').enable();
        }
    }
});
Ext.define('GridSysGroup', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridSysGroup,
    title: 'Kelompok User',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridSysGroupID',
    id: 'GridSysGroupID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSysGroup',
    store: storeGridSysGroup,
    loadMask: true,
    columns: [
        {header: 'group_id', dataIndex: 'group_id', hidden: true},
        {header: 'Nama Kelompok', dataIndex: 'group_name', minWidth: 200},
        {header: 'Deskripsi', dataIndex: 'description', minWidth: 150,flex:1},
        {header: 'User Input', dataIndex: 'userin', minWidth: 100,hidden:true},
        {header: 'Tgl Input', dataIndex: 'datein', minWidth: 100,hidden:true}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'addSysGroup',
                    text: 'Tambah',
                    iconCls: 'add-icon',
                    handler: function() {
                        wSysGroup.show();
                        Ext.getCmp('statusformSysGroup').setValue('input');
                    }
                },
                {
                    text: 'Hak Akses',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridSysGroup')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                             wSysGroupAksesMenu.show();
                             Ext.getCmp('GridTreeSysMenu4Akses').getStore().load();
                             Ext.getCmp('wSysGroupAksesMenu').setTitle('Pengaturan Hak Akses Untuk Kelompok User '+selectedRecord.data.group_name);
                             Ext.getCmp('sys_group_role').setValue(selectedRecord.data.group_id);     
                             // storeSysMenuExpanded.load({
                             //    params:{
                             //        group_id:selectedRecord.data.group_id
                             //    }
                             // });                        
                        }
                       
                    }
                },
                {
                    itemId: 'editSysGroup',
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridSysGroup')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formSysGroup = Ext.getCmp('formSysGroup');
                            formSysGroup.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/SysGroup/1/sistem',
                                params: {
                                    extraparams: 'a.group_id:' + selectedRecord.data.group_id
                                },
                                success: function(form, action) {
                                    var data = (action.result.data);
                                    console.log(data);
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                     Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                }
                            })

                            wSysGroup.show();
                            Ext.getCmp('statusformSysGroup').setValue('edit');
                        }

                    }
                }, {
                    id: 'btnDeleteSysGroup',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridSysGroup')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/SysGroup/sistem',
                                        method: 'POST',
                                        params: {
                                                postdata: Ext.encode(selected),
                                                idmenu:116
                                            },
                                            success: function(form, action) {
                                                var d = Ext.decode(form.responseText);
                                                if (!d.success) {
                                                    Ext.Msg.alert('Informasi', d.message);
                                                }
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                            }
                                    });
                                    storeGridSysGroup.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridSysGroup',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridSysGroup, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSysGroup.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formSysGroup = Ext.getCmp('formSysGroup');
            wSysGroup.show();
            formSysGroup.getForm().load({
                url: SITE_URL + 'backend/loadFormData/SysGroup/1/sistem',
                params: {
                    extraparams: 'a.group_id:' + record.data.group_id
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformSysGroup').setValue('edit');
        }
    }
});