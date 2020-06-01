load_js_file('setup/MenuIndukListPopup.js');

Ext.define('sysMenuTreeModel', {
    extend: 'Ext.data.Model',
    fields: [
        'text', 'id', 'menu_link', 'parent','menuinduk','sys_menu_id_induk', 'sort', 'icon', 'description', 'leaf','add','edit','delete','view'
    ]
});


var storeSysMenu = new Ext.data.TreeStore({
    model: 'sysMenuTreeModel',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'sistem/sysmenudata/0'
    },
    root: {
        text: ' ',
        id: '0',
        expanded: false
    }
    , autoload: false
});

//var storeMS = Ext.create('Ext.data.Store', {
//                    fields: ['group_id', 'group_name'],
//                    proxy: {
//                        type: 'ajax',
//                        url: SITE_URL + 'backend/combox/sys_group',
//                        reader: {
//                            type: 'json',
//                            root: 'dat'
//                        }
//                    },
//                    autoLoad: false
//                });
                
var formSysMenu = Ext.create('Ext.form.Panel', {
    id: 'formSysMenu',
    width: 550,
//        height: 430,
    autoHeight: true,
    autoScroll: true,
    // frame: true,
    url: SITE_URL + 'backend/saveform/SysMenu/sistem',
    baseParams: {idmenu:102},
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 200,
        anchor:'100%'
//        width: 400
    },
    items: [
                {
                    xtype: 'hiddenfield',
                    fieldLabel: 'statusformSysMenu',
                    id:'statusformSysMenu',
                    name: 'statusformSysMenu'
                },
                {
                    xtype: 'hiddenfield',
                    fieldLabel: 'sys_menu_id',
                    name: 'sys_menu_id'
                },
                {
                    xtype: 'hiddenfield',
                    fieldLabel: 'parent',
                    id:'parentmenu',
                    name: 'parent'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Menu Induk',
//                    allowBlank: false,
                    id: 'menuinduk',
                    name: 'menuinduk',
                    listeners: {
                        render: function (component) {
                            component.getEl().on('click', function (event, el) {
                                windowPopupMenuInduk.show();
                                storeSysMenuPopup.load();

                            });
                        }
                    }
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Nama Menu',
                    allowBlank: false,
                    id: 'menu_name',
                    name: 'menu_name'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'No Urut',
                    allowBlank: false,
                    name: 'sort'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Link Modul',
                    // allowBlank: false,
                    name: 'menu_link'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Icon CSS',
                    name: 'icon'
                },{
                    xtype: 'textarea',
                    fieldLabel: 'Deskripsi',
                    name: 'description',
                },
                 {
                    xtype: 'comboxsys_group',
                    fieldLabel: 'Hak Akses Kelompok User',
                    allowBlank: false,
                    // labelWidth:230,
                    // width:500,
                    multiSelect:true,
                    id:'group_nameMenuAkses',
                    name: 'group_name[]'
                    // ,value: 'Unit 1, SMIP'
                    // ,value: ["Unit 1","SMIP"]
                    // value: 'Unit 1,SMIP'
                },
//                {
//                    xtype: 'multiselect',
//                    displayField:'group_name',
//                    valueField:'group_id',
//                    fieldLabel: 'Akses Kelompok User',
//                    name: 'group_id',
//                    id:'multiselectSysGroup',
//                    allowBlank: false,
//                    store: storeMS
//                }
    ],
    // listeners : {
    //    afterrender: {
    //        fn : function(){
    //           agama.load();
    //        }
    //    }
    // },
    buttons: [{
        text: 'Batal',
        handler: function () {
            var winSysMenu = Ext.getCmp('windowPopupSysMenu');
            winSysMenu.hide();
        }
    }, {
            text: 'Simpan',
            handler: function () {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function (form, action) {
                            if (!action.result.success) {
                                Ext.Msg.alert('Failed', action.result.message);
                            } else {
                                Ext.Msg.alert('Success', action.result.message);                                
                                Ext.getCmp('windowPopupSysMenu').hide();
                                storeSysMenu.load();
                             }
                        },
                        failure: function (form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            storeSysMenu.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});

var wSysMenu = Ext.create('widget.window', {
    id: 'windowPopupSysMenu',
    title: 'Menu Aplikasi',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    // minWidth: 450,
    //    height: 350,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formSysMenu]
});




Ext.define('GridTreeSysMenu', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeSysMenu',
    id: 'GridTreeSysMenu',
    xtype: 'tree-grid',
    // title: 'Menu Aplikasi',
    height: 300,
//    useArrows: true,
    rootVisible: false,
    multiSelect: true,
    singleExpand: true,
    loadMask: true,
    enableColumnResize: true,
    rowLines: true,
    listeners: {
        render: {
            scope: this,
            fn: function (grid) {

            }
        }
    },
    viewConfig: {
        //        stripeRows: false, 
        getRowClass: function (record) {

            //            if (record.get('active') == 't')
            //            {
            //                return 'null';
            //            } else if (record.get('active') == 'f')
            //            {
            //                return 'child-row';
            //            } else if (record.get('id') == 0)
            //            {
            //                return 'adult-row';
            //            }
        }
    },
    initComponent: function () {
        this.width = 600;

        Ext.apply(this, {
            store: storeSysMenu,
            columns: [
                {
                    xtype: 'actioncolumn',
                    width: 50,
                    renderer: function(value, metadata, record) {
                        this.items[0].icon = BASE_URL + 'assets/icons/fam/pencil.png';
                        this.items[0].tooltip = 'Ubah Data';
                    },
                    items: [{
                            text: 'Edit',
                                width: 55,
                                // menuDisabled: true,
                                id: 'actioncolumnAccount',
                                xtype: 'actioncolumn',
                                tooltip: 'Edit task',
                                align: 'center',
                                icon: BASE_URL + 'assets/icons/fam/pencil.png',
                                handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {

                                    
                                    wSysMenu.show();
                                    sys_groupStore.load();
                                    
                                   var formSysMenu = Ext.getCmp('formSysMenu');
                                    
                                   formSysMenu.getForm().load({
                                        url: SITE_URL + 'backend/loadFormData/SysMenu/1/sistem',
                                        params: {
                                            extraparams: 'a.sys_menu_id:' + record.data.id
                                        },
                                        success: function(form, action) {
                                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                        },
                                        failure: function(form, action) {
                                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                                        }
                                    })
                                    Ext.getCmp('statusformSysMenu').setValue('edit');
                                    
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'sistem/getaksesmenu',
                                        params: {
                                            id: 	record.data.id,
                                    },
                                    success: function(response){
//                                        var formSysMenuVal = formSysMenu.getForm();
//                                        formSysMenuVal.findField('group_nameMenuAkses');
//                                        group_nameMenuAkses
//                                            var multiselectField = formSysMenu.findField('multiselectSysGroup');
                                            var multiselectField = Ext.getCmp('group_nameMenuAkses');
//                                            var result = Ext.decode(response.responseText);
                                            var arr = response.responseText.split(',');
                                            console.log(arr);
                                            multiselectField.setValue(arr);
                                        }
                                    });

                                    Ext.getCmp('statusformSysMenu').setValue('edit');

                                }
                        }]
                },
                { xtype: 'treecolumn', text: 'id', dataIndex: 'id', hidden: true }
                , { xtype: 'treecolumn', text: 'Nama', dataIndex: 'text', minWidth: 200 }
                , { text: 'menu_link', dataIndex: 'menu_link', hidden: true }
                , { text: 'parent', dataIndex: 'parent', hidden: true }
                , { text: 'Urutan', dataIndex: 'sort', minWidth: 40 }
                , { text: 'Deskripsi', dataIndex: 'description', minWidth: 550 },
//                  {
//                     xtype: 'actioncolumn',
//                     width: 50,
//                     items: [
//                         {
//                             text: 'Rules',
//                                 width: 55,
//                                 // menuDisabled: true,
// //                                id: 'actioncolumnAccount',
//                                 xtype: 'actioncolumn',
//                                 tooltip: 'Edit Rules',
//                                 align: 'center',
//                                 icon: BASE_URL + 'assets/icons/fam/cog_edit.png',
//                                 handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {

                                    
//                                     wEditRules.show();
//                                     storeGridEditRules.load({
//                                             params: {
//                                                 'extraparams': 'a.sys_menu_id:' + record.data.id
//                                             }
//                                         });
//                                         Ext.getCmp('sys_menu_id_editRules').setValue(record.data.id);
// //                                    sys_groupStore.load();
// //                                    
// //                                   var formSysMenu = Ext.getCmp('formSysMenu');
// //                                    
// //                                   formSysMenu.getForm().load({
// //                                        url: SITE_URL + 'backend/loadFormData/SysMenu/1/sistem',
// //                                        params: {
// //                                            extraparams: 'a.sys_menu_id:' + record.data.id
// //                                        },
// //                                        success: function(form, action) {
// //                                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
// //                                        },
// //                                        failure: function(form, action) {
// //                                            Ext.Msg.alert("Load failed", action.result.errorMessage);
// //                                        }
// //                                    })
// //                                    Ext.getCmp('statusformSysMenu').setValue('edit');
// //                                    
// //                                    Ext.Ajax.request({
// //                                        url: SITE_URL + 'sistem/getaksesmenu',
// //                                        params: {
// //                                            id: 	record.data.id,
// //                                    },
// //                                    success: function(response){
// ////                                        var formSysMenuVal = formSysMenu.getForm();
// ////                                        formSysMenuVal.findField('group_nameMenuAkses');
// ////                                        group_nameMenuAkses
// ////                                            var multiselectField = formSysMenu.findField('multiselectSysGroup');
// //                                            var multiselectField = Ext.getCmp('group_nameMenuAkses');
// ////                                            var result = Ext.decode(response.responseText);
// //                                            var arr = response.responseText.split(',');
// //                                            console.log(arr);
// //                                            multiselectField.setValue(arr);
// //                                        }
// //                                    });

//                                 }
//                         }]
//                 }
            ]
            , dockedItems: [
//                {
//                    xtype: 'toolbar',
//                    items: {
//                        text: 'Get checked nodes',
//                        handler: function(){
//                            var records = Ext.getCmp('GridTreeSysMenu').getView().getChecked(),
//                                names = [];
//                            
//                            Ext.Array.each(records, function(rec){
//                                names.push(rec.get('id'));
//                            });
//                            
//                            Ext.MessageBox.show({
//                                title: 'Selected Nodes',
//                                msg: names.join('<br />'),
//                                icon: Ext.MessageBox.INFO
//                            });
//                        }
//                    }
//                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'searchMenu',
                            fieldLabel: 'Pencarian',
                            listeners: {
                                specialkey: function (f, e) {
                                    if (e.getKey() == e.ENTER) {
                                        storeSysMenu.load({
                                            params: {
                                                'Menuname': Ext.getCmp('searchMenu').getValue(),
                                                'extraparams': 'idunit:' + Ext.getCmp('cbUnitTreeSysMenu').getValue()
                                            }
                                        });
                                    }
                                }
                            }
                        }, {
                            //                        itemId: 'reloadDataMenu',
                            text: 'Cari',
                            iconCls: 'search'
                            , handler: function () {
                                storeSysMenu.load({
                                    params: {
                                        'Menuname': Ext.getCmp('searchMenu').getValue(),
                                    }
                                });
                            }
                        }, {
                            // itemId: 'reloadDataMenu',
                            text: 'Refresh',
                            iconCls: 'refresh',
                            handler: function () {
                                // var grid = Ext.getCmp('GridTreeSysMenu');
                                // grid.getView().refresh();
                                // storeSysMenu.load({
                                //             params: {
                                //                 'extraparams': 'idunit:' + Ext.getCmp('cbUnitTreeSysMenu').getValue()
                                //             }
                                //         });
                                // Ext.getCmp('searchMenu').setValue(null)
                                // Ext.getCmp('GridTreeSysMenu').expandAll();
                                storeSysMenu.load();
                            }
                        }, '-',
                        {
                            // itemId: 'addMenu',
                            text: 'Tambah Menu',
                            iconCls: 'add-icon',
                            handler: function () {
                                var formMenu = Ext.getCmp('formSysMenu');
                                formMenu.getForm().reset();
                                wSysMenu.show();
                                    
                                var grid = Ext.ComponentQuery.query('GridTreeSysMenu')[0];
                                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                var data = grid.getSelectionModel().getSelection();
                                if (data.length === 0) {
                                    Ext.getCmp('parentmenu').setValue(0);     
                                } else {
                                    Ext.getCmp('parentmenu').setValue(selectedRecord.data.id);     
                                    Ext.getCmp('menuinduk').setValue(selectedRecord.data.text);                                 
                                }
                                 sys_groupStore.load();
                                 Ext.getCmp('statusformSysMenu').setValue('input');
                            }
                        },
                        {
                            // itemId: 'addMenu',
                            text: 'Hapus Menu',
                            // hidden:true,
                            iconCls: 'delete-icon',
                            handler: function () {
                                var grid = Ext.ComponentQuery.query('GridTreeSysMenu')[0];
                                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                var data = grid.getSelectionModel().getSelection();
                                if (data.length === 0) {
                                    Ext.Msg.alert('Failure', 'Pilih menu terlebih dahulu!');
                                } else {
                                    Ext.MessageBox.confirm('Menghapus Menu', 'Apakah anda yakin untuk menghapus menu berikut dengan menu dibawahnya?</b>', confirmHapusMenu);
                                }
                            }
                        }

                    ]
                }
            ]
        });
        this.callParent();
    }
});

function confirmHapusMenu(btn) {
    if (btn == 'yes') {
        var grid = Ext.ComponentQuery.query('GridTreeSysMenu')[0];
        var selectedRecord = grid.getSelectionModel().getSelection()[0];
        var data = grid.getSelectionModel().getSelection();

        Ext.Ajax.request({
            url: SITE_URL + 'sistem/hapusmenu',
            params: {
                'id': selectedRecord.data.id
            },
            success: function (response) {
                var result = Ext.decode(response.responseText);
                Ext.Msg.alert("Hapus Menu", result.message);
                storeSysMenu.load();
            }
            // callback: function(opt, succes, response) {
            //     Ext.Msg.alert("Kesalahan", 'Coba lagi nanti');
            //     // Ext.MessageBox.hide()
            // }
        });
    }
}


//function renderTip(val, meta, rec, rowIndex, colIndex, store) {
//    console.log('s'+rec)
//        // meta.tdCls = 'cell-icon'; // icon
//        meta.tdAttr = 'data-qtip="'+val+'"';
//        return val;
//    };