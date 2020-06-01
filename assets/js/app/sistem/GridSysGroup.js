
var formSysGroup = Ext.create('Ext.form.Panel', {
    id: 'formSysGroup',
    width: 450,
//    height: 300,
    // url: SITE_URL + 'backend/saveform/SysGroup/sistem',
    url: CLINIC_API + 'user/group',
    baseParams: {
        idmenu:116,
        key:key
    },
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
            allowBlank: false,
            name: 'description'
        }, ],
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

                    // if(form.findField('group_id').getValue()==''){
                    //     var method_type = 'POST';
                    // } else {
                    //     var method_type = 'PUT';
                    // }
                    Ext.Ajax.request({
                        url:SITE_URL + 'setup/group',
                        method: 'POST',
                        params:{
                            group_id:form.findField('group_id').getValue(),
                            group_name:form.findField('group_name').getValue(),
                            description:form.findField('description').getValue(),
                            key:key
                        },
                        success: function(form, action) {
                            var d = Ext.decode(form.responseText);
                            console.log(d)
                            Ext.Msg.alert('Success', d.message);
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
        titlePosition: 2,
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
Ext.define(dir_sys + 'sistem.GridSysGroup', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridSysGroup,
    // title: 'Kelompok User',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridSysGroupID',
    id: 'GridSysGroupID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSysGroup',
    store: storeGridSysGroup,
    loadMask: true,
    columns: [
        {header: 'group_id', dataIndex: 'group_id', hidden: true},
        {header: 'Nama Kelompok', dataIndex: 'group_name', minWidth: 250},
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
                    iconCls: 'pengaturan-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridSysGroup')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            if (!Ext.isDefined(Ext.getCmp('WindowTreeSysGroupAksesMenu'))) {
                                var WindowTreeSysGroupAksesMenu = Ext.create(dir_sys + 'sistem.WindowTreeSysGroupAksesMenu');
                            } else {
                                var WindowTreeSysGroupAksesMenu = Ext.getCmp('WindowTreeSysGroupAksesMenu');
                            }
                            // var store_menu = Ext.getCmp('GridTreeSysMenu4Akses').getStore();
                            // store_menu.load();

                            WindowTreeSysGroupAksesMenu.show();
                            Ext.getCmp('WindowTreeSysGroupAksesMenu').setTitle('Pengaturan Hak Akses Untuk Kelompok User '+selectedRecord.data.group_name);

                            // store_menu.load();
                             // Ext.getCmp('group_id_hakakses').setValue(selectedRecord.data.group_id);     
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
                                url: CLINIC_API + 'user/load_sysgroup',
                                method:'GET',
                                params: {
                                    group_id:selectedRecord.data.group_id,
                                    key:key,
                                    idunit:idunit
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    console.log(d.rows);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
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
                        var grid = Ext.ComponentQuery.query('GridSysGroup')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            Ext.Msg.show({
                                title: 'Confirm',
                                msg: 'Delete Selected ?',
                                buttons: Ext.Msg.YESNO,
                                fn: function(btn) {
                                    if (btn == 'yes') {
                                        Ext.Ajax.request({
                                            url: API_URL + 'user/group_remove',
                                            method: 'POST',
                                            params: {
                                                id: selectedRecord.data.group_id,
                                                key:key,
                                                idmenu:116
                                            },
                                            success: function(form, action) {
                                                var d = Ext.decode(form.responseText);
                                                Ext.Msg.alert('Informasi', d.message);
                                                storeGridSysGroup.load();
                                            },
                                            failure: function(form, action) {
                                                var d = Ext.decode(form.responseText);
                                                Ext.Msg.alert('Failed', d.message);
                                                storeGridSysGroup.load();
                                            }
                                        });
                                        // storeGridSysGroup.remove(sm.getSelection());
                                        // sm.select(0);
                                    }
                                }
                            });
                        }

                        // Ext.Msg.show({
                        //     title: 'Confirm',
                        //     msg: 'Delete Selected ?',
                        //     buttons: Ext.Msg.YESNO,
                        //     fn: function(btn) {
                        //         if (btn == 'yes') {
                        //             var grid = Ext.ComponentQuery.query('GridSysGroup')[0];
                        //             var sm = grid.getSelectionModel();
                        //             selected = [];
                        //             Ext.each(sm.getSelection(), function(item) {
                        //                 selected.push(item.data[Object.keys(item.data)[0]]);
                        //             });
                        //             Ext.Ajax.request({
                        //                 url: API_URL + 'user/group_remove',
                        //                 method: 'POST',
                        //                 params: {
                        //                     id: Ext.encode(selected),
                        //                     key:key,
                        //                     idmenu:116
                        //                 },
                        //                 success: function(form, action) {
                        //                     var d = Ext.decode(form.responseText);
                        //                     Ext.Msg.alert('Informasi', d.message);
                        //                 },
                        //                 failure: function(form, action) {
                        //                     var d = Ext.decode(form.responseText);
                        //                     Ext.Msg.alert('Failed', d.message);
                        //                 }
                        //             });
                        //             storeGridSysGroup.remove(sm.getSelection());
                        //             sm.select(0);
                        //         }
                        //     }
                        // });
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
                url: CLINIC_API + 'user/load_sysgroup',
                method:'GET',
                params: {
                    group_id:record.data.group_id,
                    key:key,
                    idunit:idunit
                },
                success: function(form, action) {
                    var d = Ext.decode(form.responseText);
                    console.log(d.rows);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            Ext.getCmp('statusformSysGroup').setValue('edit');
        }
    }
});
