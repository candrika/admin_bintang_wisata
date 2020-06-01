
Ext.define('sysMenuTreeModel4Akses', {
    extend: 'Ext.data.Model',
    fields: [
        'text', 'id', 'menu_link', 'parent','menuinduk','sys_menu_id_induk', 'sort', 'icon', 'description', 'status','leaf'
    ]
});


var storeSysMenu4Akses = new Ext.data.TreeStore({
    model: 'sysMenuTreeModel4Akses',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'sistem/sysmenudata/0'
        // url: SITE_URL + 'dashboard/getTreeMenu/0/'
    },
    root: {
        text: ' ',
        id: '0',
        expanded: false
    }, 
    autoload: false
});

Ext.define('GridTreeSysMenu4Akses', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeSysMenu4Akses',
    id: 'GridTreeSysMenu4Akses',
    xtype: 'tree-grid',
    title: 'Module',
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
        }
    },
    initComponent: function () {
        this.width = 300;

        Ext.apply(this, {
            store: storeSysMenu4Akses,
            columns: [
                { xtype: 'treecolumn', text: 'id', dataIndex: 'id', hidden: true }
                , { xtype: 'treecolumn', text: 'Name', dataIndex: 'text', minWidth: 150,flex:1 }
                // , { text: 'menu_link', dataIndex: 'menu_link', hidden: true }
                // , { text: 'parent', dataIndex: 'parent', hidden: true }
                // , { text: 'Order', dataIndex: 'sort', minWidth: 40,sortable: false }
            ]
            , dockedItems: [
            ]
        });
        this.callParent();
    }
});



Ext.define('GridRolesMenuModel', {
    extend: 'Ext.data.Model',
    fields: ['roleid','rolename','status','sys_menu_id'],
    idProperty: 'id'
});

var storeGridRolesMenu = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridRolesMenuModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/RolesMenu/pengaturanakses',
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

// Ext.define(dir_sys + 'quotation.GridQuotationAll', {
//     title: 'All Data',
//     itemId: 'GridQuotationAllID',
//     id: 'GridQuotationAllID',
//     extend: 'Ext.grid.Panel',
//     alias: 'widget.GridQuotationAll',

Ext.define(dir_sys + 'sistem.GridTreeSysGroupAksesMenu', {
    alias: 'widget.GridTreeSysGroupAksesMenu',
    id: 'GridTreeSysGroupAksesMenu',
    extend: 'Ext.container.Container',
    xtype: 'dd-grid-to-grid',
    width: 650,
    height: 500,
    layout: {
        type: 'hbox',
        align: 'stretch',
        padding: 5
    },    
    initComponent: function(){
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

         this.items = [
         {
            xtype:'GridTreeSysMenu4Akses',
            margins: '0 5 0 0',
            listeners: {
                    itemclick: function(dv, record, item, index, e) {

                        get_group_access(record.data.id);                           
                    }
                },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        // {
                        //     xtype:'textfield',
                        //     name:'group_id_hakakses',
                        //     id:'group_id_hakakses'
                        // }
                    ]
                }
            ]
         }, 
         {
            itemId: 'grid2',
            plugins: [this.cellEditing],
            listeners : {
                edit : this.recordData
            },
            flex: 1,
            xtype: 'grid',
            viewConfig: {
                // plugins: {
                //     ptype: 'gridviewdragdrop',
                //     dragGroup: group2,
                //     dropGroup: group1
                // },
                // listeners: {
                //     drop: function(node, data, dropRec, dropPosition) {
                //         var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
                //         Ext.example.msg('Drag from left to right', 'Dropped ' + data.records[0].get('name') + dropOn);
                //     }
                // }
            },
            store: storeGridRolesMenu,
            columns: [
                {header: 'roleid', dataIndex: 'roleid', hidden: true},
                {header: 'sys_menu_id', dataIndex: 'sys_menu_id', hidden: true},
                {header: 'Role Name', dataIndex: 'rolename', minWidth: 200,flex:1,hidden:true},
                {
                    header: 'Access',
                    hidden:true,
                    dataIndex: 'status',
                    width: 130,
                    editor: new Ext.form.field.ComboBox({
                        typeAhead: true,
                        editable:false,
                        triggerAction: 'all',
                        store: [
                            ['YES','YES'],
                            ['NO','NO']
                        ]
                    })
                }
            ],dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype:'hiddenfield',
                            id:'sys_group_role'
                        },
                        {
                                xtype:'checkboxfield',
                                id:'visiblemenu',
                                labelWidth: 160,
                                name:'visiblemenu',
                                fieldLabel:'Berikan Hak Akses',
                                listeners: {
                                    change: function() {
                                            console.log(this.value)

                                            var GridSysGroup = Ext.ComponentQuery.query('GridSysGroup')[0];
                                            var GridSysGroupRecord = GridSysGroup.getSelectionModel().getSelection()[0];
                                            console.log(GridSysGroupRecord.data)

                                            var grid = Ext.ComponentQuery.query('GridTreeSysMenu4Akses')[0];
                                            var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                            // var data = grid.getSelectionModel().getSelection();
                                            console.log(selectedRecord.data)

                                            // if(this.value)
                                            // {

                                                Ext.Ajax.request({
                                                    url: CLINIC_API + 'system/group_access',
                                                    method: 'POST',
                                                    async:false,
                                                    params: {
                                                        key: key,
                                                        visible: this.value,
                                                        group_id:GridSysGroupRecord.data.group_id,
                                                        sys_menu_id:selectedRecord.data.id
                                                    },
                                                    success: function(form, action) {
                                                        var d = Ext.decode(form.responseText);
                                                        // get_group_access(selectedRecord.data.id);       
                                                        // Ext.getCmp('visiblemenu').setValue(d.value);
                                                    },
                                                    failure: function(form, action) {
                                                        Ext.Msg.alert("Load failed",Ext.decode(action.responseText));
                                                    }
                                                }); 
                                              
                                                // Ext.Ajax.request({
                                                //     url: SITE_URL + 'sistem/savevisible',
                                                //     method: 'POST',
                                                //     params: {
                                                //         visible: this.value,
                                                //         sys_group_role:Ext.getCmp('sys_group_role').getValue(),
                                                //         sys_menu_id:selectedRecord.data.id
                                                //     },
                                                //     success: function(form, action) {
                                                //         var d = Ext.decode(form.responseText);
                                                //     },
                                                //     failure: function(form, action) {
                                                //         Ext.Msg.alert("Load failed",Ext.decode(action.responseText));
                                                //     }
                                                // });
                                            // } 
                                            // else {
                                            //     Ext.Ajax.request({
                                            //         url: SITE_URL + 'sistem/deletevisible',
                                            //         method: 'POST',
                                            //         params: {
                                            //             visible: this.value,
                                            //             sys_group_role:Ext.getCmp('sys_group_role').getValue(),
                                            //             sys_menu_id:selectedRecord.data.id
                                            //         },
                                            //         success: function(form, action) {
                                            //             var d = Ext.decode(form.responseText);
                                            //         },
                                            //         failure: function(form, action) {
                                            //             Ext.Msg.alert("Load failed",Ext.decode(action.responseText));
                                            //         }
                                            //     });
                                            // }
                                }
                            }
                        }
                    ]
                }
            ],
            stripeRows: true,
            title: 'Access List'
        }];

        this.callParent();

        this.on('afterlayout', this.loadStore, this, {
            delay: 1,
            single: true
        }); 

        this.on('afteredit', this.onAfterEdit, this); 

        this.on({
            scope: this,
            edit: function() {
                alert('asdsad');
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
       alert('after edit');
    },
    recordDataPrint: function(button, event, mode) {
        console.log(mode)
    },
    recordData: function(button, event, mode) {
        // if (validasiReceive()) {
            var json = Ext.encode(Ext.pluck(storeGridRolesMenu.data.items, 'data'));
            //            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitEntryPerencanaanTK').getValue());
            Ext.Ajax.request({
                url: SITE_URL + 'sistem/saveRoleMenu',
                method: 'POST',
                params: {
                    dataGrid: json,
                    group_id:Ext.getCmp('sys_group_role').getValue()
                },
                success: function(form, action) {
                    // var d = Ext.decode(form.responseText);
                    // if (!d.success) {
                    //     Ext.Msg.alert('Peringatan', d.message);
                    // } else {
                        storeGridRolesMenu.load();
                    // }
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        // }
    }
});

function get_group_access(sys_menu_id){
    var grid = Ext.ComponentQuery.query('GridSysGroup')[0];
    var selectedRecord = grid.getSelectionModel().getSelection()[0];

    Ext.Ajax.request({
        url: CLINIC_API + 'system/get_group_access',
        method: 'POST',
        params: {
            key: key,
            visible: this.value,
            group_id:selectedRecord.data.group_id,
            sys_menu_id:sys_menu_id
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            Ext.getCmp('visiblemenu').setValue(d.value);
        },
        failure: function(form, action) {
            Ext.Msg.alert("Load failed",Ext.decode(action.responseText));
        }
    }); 
}