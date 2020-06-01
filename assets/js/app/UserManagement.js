
var formUserManagement = Ext.create('Ext.form.Panel', {
    id: 'formUserManagement',
    width: 450,
    height: 300,
    url: SITE_URL + 'backend/saveform/UserManagement',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 160,
        width: 400
    },
    items: [{
            xtype: 'hiddenfield',
            name: 'statusformUserManagement',
            id: 'statusformUserManagement'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'user_id',
            name: 'user_id'
        }, {
            xtype: 'textfield',
            fieldLabel: 'username',
            allowBlank: false,
            name: 'username'
        }, {
            xtype: 'textfield',
            fieldLabel: 'password',
            inputType: 'password',
            allowBlank: false,
            name: 'password'
        }, {
            xtype: 'textfield',
            fieldLabel: 'email',
            allowBlank: false,
            name: 'email'
        },{
            xtype: 'textfield',
            fieldLabel: 'realname',
            name: 'realname'
        },{
            xtype: 'comboxunit',
            multiSelect:true,
            id:'idUnitUser',
            allowBlank: false,
            name: 'namaunit[]'
        },{
            xtype:'comboxsys_group',
            allowBlank: false,
            name:'group_name'
            
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupUserManagement');
                Ext.getCmp('formUserManagement').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnUserManagementSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formUserManagement').getForm().reset();
                            Ext.getCmp('windowPopupUserManagement').hide();
                            storeGridUserManagement.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridUserManagement.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wUserManagement = Ext.create('widget.window', {
    id: 'windowPopupUserManagement',
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
    items: [formUserManagement]
});

Ext.define('GridUserManagementModel', {
    extend: 'Ext.data.Model',
    fields: ['user_id','username','email','laslogin','realname','group_name','namaunit'],
    idProperty: 'id'
});

var storeGridUserManagement = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridUserManagementModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/userManagement',
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
Ext.define('MY.searchGridUserManagement', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridUserManagement',
    store: storeGridUserManagement,
    width: 180
});
var smGridUserManagement = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridUserManagement.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteUserManagement').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteUserManagement').enable();
        }
    }
});
Ext.define('GridUserManagement', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridUserManagement,
    title: 'Daftar User',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridUserManagementID',
    id: 'GridUserManagementID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridUserManagement',
    store: storeGridUserManagement,
    loadMask: true,
    columns: [
        {header: 'user_id', dataIndex: 'user_id', hidden: true},
        {header: 'username', dataIndex: 'username', minWidth: 150},
        {header: 'email', dataIndex: 'email', minWidth: 150},
        {header: 'real name', dataIndex: 'realname', minWidth: 150},
        {header: 'unit', dataIndex: 'namaunit', minWidth: 150},
        {header: 'kelompok user', dataIndex: 'group_name', minWidth: 150},
        {header: 'laslogin', dataIndex: 'laslogin', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'addUserManagement',
                    text: 'Tambah',
                    iconCls: 'add-icon',
                    handler: function() {
                        wUserManagement.show();
                        Ext.getCmp('statusformUserManagement').setValue('input');
                    }
                },
                {
                    itemId: 'editUserManagement',
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridUserManagement')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data pajak terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formUserManagement = Ext.getCmp('formUserManagement');
                            formUserManagement.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/UserManagement',
                                params: {
                                    extraparams: 'a.user_id:' + selectedRecord.data.user_id
                                },
                                success: function(form, action) {
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wUserManagement.show();
                            Ext.getCmp('statusformUserManagement').setValue('edit');

                            Ext.Ajax.request({
                                url: SITE_URL+'setup/getUnitUser',
                                method: 'POST',
                                params: { user_id: selectedRecord.data.user_id },
                                success: function(form, action) {
                                    // console.log(form.responseText)
                                    var str = form.responseText;
                                    var valUnit = str.split(',');
                                    // console.log(Ext.getCmp('namaunitFormInvX'));

                                    // var valUnit = ['Unit 1','SMIP'];

                                    Ext.getCmp('idUnitUser').setValue(valUnit);
                                     // FormProfileID.getForm().findField('namaunitFormInvX').setValue(valUnit);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            });
                        }

                    }
                }, {
                    id: 'btnDeleteUserManagement',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridUserManagement')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/UserManagement',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)}
                                    });
                                    storeGridUserManagement.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridUserManagement',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridUserManagement, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridUserManagement.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formUserManagement = Ext.getCmp('formUserManagement');
            wUserManagement.show();
            formUserManagement.getForm().load({
                url: SITE_URL + 'backend/loadFormData/UserManagement/',
                params: {
                    extraparams: 'a.user_id:' + record.data.user_id
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

//            
//            Ext.getCmp('kddaerahS').setReadOnly(true);
            Ext.getCmp('statusformUserManagement').setValue('edit');

            Ext.Ajax.request({
            url: SITE_URL+'setup/getUnitUser',
            method: 'POST',
            params: { user_id: record.data.user_id },
            success: function(form, action) {
                // console.log(form.responseText)
                var str = form.responseText;
                var valUnit = str.split(',');
                // console.log(Ext.getCmp('namaunitFormInvX'));

                // var valUnit = ['Unit 1','SMIP'];

                Ext.getCmp('idUnitUser').setValue(valUnit);
                 // FormProfileID.getForm().findField('namaunitFormInvX').setValue(valUnit);
            },
            failure: function(form, action) {
                Ext.Msg.alert("Load failed", action.result.errorMessage);
            }
        });
        }
    }
});

//Ext.define('PortSiswa', {
//    extend: 'Ext.Panel',
//    alias: 'widget.PortSiswa',
//    layout: 'border',
//    bodyBorder: false,
//    defaults: {
//        collapsible: true,
//        split: true
//    },
//    items: [{
//            title: 'Footer',
//            region: 'south',
//            flex:2,
//            minHeight: 75,
////            maxHeight: 250,
//            html: 'Footer content'
//        }, {
//            flex:2,
////            minHeight: 270,
//            collapsible: false,
//            region: 'center',
////            margins: '5 0 0 0', 
//            items: [{
//              minHeight: 270,
//              xtype:'GridUserManagement'      
//            }]
//        }]
//});
//
//var viewport = Ext.create('Ext.Viewport', {
//    id: 'border-example',
//    layout: 'border',
//    items: [
//        // create instance immediately
//        Ext.create('Ext.Component', {
//            region: 'north',
//            height: 62, // give north and south regions a height
//            autoEl: {
//                tag: 'div',
//                html: "&nbsp;&nbsp;<img src={$assets_url}images/logo_aktiva.png height=59> <div style='margin-right:15px; margin-top:15px; float:right;' id=bloggout> </div> "
//            }
//        }), {
//            // lazily created panel (xtype:'panel' is default)
//            hidden: true,
//            id: 'south-panel',
//            region: 'south',
//            contentEl: 'south',
//            split: true,
//            height: 100,
//            minSize: 100,
//            maxSize: 200,
//            collapsible: true,
//            collapsed: true,
//            title: 'South',
//            margins: '0 0 0 0'
//        }, rTabPanel, {
//            region: 'west',
//            stateId: 'navigation-panel',
//            id: 'west-panel', // see Ext.getCmp() below
//            title: 'Navigation',
//            split: true,
//            width: 300,
//            minWidth: 175,
//            maxWidth: 400,
//            collapsible: true,
//            animCollapse: true,
//            margins: '0 0 0 5',
//            layout: 'accordion',
//            defaults: {
//                // closeAction: 'hide',
//                autoScroll: true
//                        // bodyPadding: 3
//            }
//            , dockedItems: [
//                {
//                    xtype: 'toolbar',
//                    dock: 'bottom',
//                    items: [
//                        {
//                            xtype: 'button',
////                            width:100,
//                            handler: function(button, event) {
//                                expandnav();
//                            },
//                            flex: 1,
//                            text: 'Expand'
//                        }, {
//                            xtype: 'button',
//                            handler: function(button, event) {
//                                collapsenav();
//                            },
//                            flex: 1,
//                            text: 'Collapse'
//                        }, {
//                            xtype: 'button',
//                            handler: function(button, event) {
//                                closeAllTab();
//                            },
//                            flex: 1,
//                            text: 'Close Tab'
//                        }]
//                }],
//            items: [
//                {
//                    title: 'Welcome {$username}',
//                    items: [treeNavigation]
//                }]
//        },
//        tabPanel]
//});