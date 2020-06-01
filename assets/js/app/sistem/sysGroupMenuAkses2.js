Ext.define('sysMenuTreeExpandedModel', {
    extend: 'Ext.data.Model',
    fields: [
        'text', 'sys_menu_id', 'menu_link', 'parent','menuinduk','sys_menu_id_induk', 'sort', 'icon', 'description', 'leaf','add','edit','delete','view'
    ]
});


// var storeSysMenuExpanded = new Ext.data.TreeStore({
//     model: 'sysMenuTreeExpandedModel',
//     proxy: {
//         type: 'ajax',
//         url: SITE_URL + 'sistem/sysmenudata/0/true'
//     },
//     root: {
//         text: ' ',
//         id: '0',
//         expanded: false
//     }
//     ,autoload: false
//     ,preloadChildren: true,
//     sorters: [{
//         property: 'text',
//         direction: 'ASC'
//     }]
// });
var storeSysMenuExpanded = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'sysMenuTreeExpandedModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/sysmenuakses/sistem',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'text',
        direction: 'ASC'
    }]
});

Ext.define('GridTreeSysGroupAksesMenu', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridTreeSysGroupAksesMenu',
    id: 'GridTreeSysGroupAksesMenu',
    storeId: 'GridTreeSysGroupAksesMenu',
    // xtype: 'tree-grid',
    //    title: 'Hak Akses Menu',
    height: 500,
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
            fn: function(grid) {
                // grid.expandAll();
            }
        }
    },
    viewConfig: {
        //        stripeRows: false, 
        getRowClass: function(record) {
                       // if (record.get('leaf') == 'false')
                       // {
                       //     return 'null';
                       // } 
                       // {
                       //     return 'adult-row';
                       // }
        }
    },
    initComponent: function() {
        this.width = 755;
        // this.autoWidth = true;
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
        Ext.apply(this, {
            plugins: [this.cellEditing],
            store: storeSysMenuExpanded,
            columns: [
            new Ext.grid.RowNumberer(),{
                // xtype: 'treecolumn',
                text: 'sys_menu_id',
                dataIndex: 'sys_menu_id',
                hidden:true
            }, {
                // xtype: 'treecolumn',
                text: 'Menu',
                dataIndex: 'text',
                minWidth: 350
            },
            {
                text: 'Hak Akses',
                columns: [ 
                    {
                        header: 'Lihat/Akses',
                        xtype: 'checkcolumn',
                        dataIndex: 'view',
                        width: 90,
                        editor: {
                            xtype: 'checkboxfield',
                            name: 'view'
                        },
                        listeners: {
                            // checkchange: function(grid, rowIndex, colIndex) {
                            checkchange: function(column, recordIndex, checked) {
                                // console.log(storeSysMenuExpanded.getRootNode().getChildAt(recordIndex).get('id'));
                                // console.log(Ext.StoreMgr.lookup("storeSysMenuExpanded").getAt(recordIndex));
                                var grid = Ext.ComponentQuery.query('GridTreeSysGroupAksesMenu')[0];
                                // console.log(storeSysMenu.getRootNode().getChildAt(recordIndex).get('id'))
                                updateHakAkses('view',checked,recordIndex,grid.store.data.items[recordIndex].data.sys_menu_id);
                                // updateHakAkses('view',checked,recordIndex,storeSysMenuExpanded.getRootNode().getChildAt(recordIndex).get('id'));

                            }
                        }
                    },
                    {
                        header: 'Tambah',
                        xtype: 'checkcolumn',
                        dataIndex: 'add',
                        width: 90,
                        editor: {
                            xtype: 'checkboxfield',
                            name: 'add'
                        },
                        listeners: {
                            checkchange: function(column, recordIndex, checked) {
                                var grid = Ext.ComponentQuery.query('GridTreeSysGroupAksesMenu')[0];
                                updateHakAkses('add',checked,recordIndex,grid.store.data.items[recordIndex].data.sys_menu_id);
                            }
                        }
                    },
                    {
                        header: 'Ubah',
                        xtype: 'checkcolumn',
                        dataIndex: 'edit',
                        width: 90,
                        editor: {
                            xtype: 'checkboxfield',
                            name: 'edit'
                        },
                        listeners: {
                            checkchange: function(column, recordIndex, checked) {
                                var grid = Ext.ComponentQuery.query('GridTreeSysGroupAksesMenu')[0];
                               updateHakAkses('edit',checked,recordIndex,grid.store.data.items[recordIndex].data.sys_menu_id);
                            }
                        }
                    },
                    {
                        header: 'Hapus',
                        xtype: 'checkcolumn',
                        dataIndex: 'delete',
                        width: 90,
                        editor: {
                            xtype: 'checkboxfield',
                            name: 'delete'
                        },
                        listeners: {
                            checkchange: function(column, recordIndex, checked) {
                                var grid = Ext.ComponentQuery.query('GridTreeSysGroupAksesMenu')[0];
                               updateHakAkses('delete',checked,recordIndex,grid.store.data.items[recordIndex].data.sys_menu_id);
                            }
                        }
                    }
                ]
            }],
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                    // GroupRulesStore.load({
                    //     params: {
                    //         'extraparams': 'a.sys_menu_id:' + record.data.id
                    //     }
                    // });
                    // Ext.getCmp('sys_menu_id_val').setValue(record.data.id);
                }
            },
            dockedItems: [
                //                {
                //                    xtype: 'toolbar',
                //                    items: {
                //                        text: 'Get checked nodes',
                //                        handler: function(){
                //                            var records = Ext.getCmp('GridTreeSysGroupAksesMenu').getView().getChecked(),
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
                            xtype:'hiddenfield',
                            id:'group_id_hakakses'
                        },{
                        // itemId: 'reloadDataMenu',
                        text: 'Refresh',
                        iconCls: 'refresh',
                        handler: function() {
                            // var grid = Ext.getCmp('GridTreeSysGroupAksesMenu');
                            // grid.getView().refresh();
                            // storeSysGroupAksesMenu.load({
                            //             params: {
                            //                 'extraparams': 'idunit:' + Ext.getCmp('cbUnitTreeSysGroupAksesMenu').getValue()
                            //             }
                            //         });
                            // Ext.getCmp('searchMenu').setValue(null)
                            // Ext.getCmp('GridTreeSysGroupAksesMenu').expandAll();
                            storeSysMenuExpanded.load();
                        }
                    }]
                }
            ]
        });
        this.callParent();
    }
});

var wSysGroupAksesMenu = Ext.create('widget.window', {
    id: 'wSysGroupAksesMenu',
    title: 'Access Rights',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
       autoWidth: true,
    // minWidth: 450,
    //    height: 350,
    autoHeight: true,
    layout: 'hbox',
    
    items: [
       {
                    //            height:sizeH-50*1,
                    xtype: 'GridTreeSysGroupAksesMenu'
                }
    ]
});

function updateHakAkses(option,checked,recordIndex,id)
{
    Ext.Ajax.request({
        url: SITE_URL + 'sistem/updateHakAkses',
        method: 'POST',
        params: {
            option:option,
            checked:checked,
            index:recordIndex,
            id:id,
            group_id:Ext.getCmp('group_id_hakakses').getValue()
        },
        success: function(form, action) {
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });
}