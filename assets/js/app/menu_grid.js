    var nameMod = 'System Module';
    var tableName = 'sys_menu';

    Ext.define(nameMod, {        
            extend: 'Ext.data.Model',
            fields: ['sys_menu_id','parent','menu_name','menu_link','group_name','icon','group_name'],
            idProperty: 'id'
        });    
    // create the Data Store
    var store = Ext.create('Ext.data.Store', {
        pageSize: 10,
        model: nameMod,
        //remoteSort: true,
        //autoload:true,
        proxy: {            
            type: 'ajax',
            url: SITE_URL+'backend/ext_get_all/'+tableName,
            actionMethods   : 'POST',
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
 
    var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    });
    var sm=Ext.create('Ext.selection.CheckboxModel', {
        checkOnly: true,
        mode:'MULTI',
        listeners: {
            deselect: function(model, record, index) {
                var selectedLen = sm.getSelection().length;                
                if(selectedLen==0){
                    Ext.getCmp('btnSave').disable();
                    Ext.getCmp('btnDelete').disable();
                }                
            },
            select: function(model, record, index) {
                Ext.getCmp('btnSave').enable();
                Ext.getCmp('btnDelete').enable();
            }
        }      
    });
    var grid = Ext.create('Ext.grid.Panel', {
         // closeAction: 'hide',
        id:'LocationPanel',
        autoWidth: true,
        autoHeight:true,      
        title: nameMod,
        selModel : sm,                
        store: store,        
        loadMask: true,
        // columnLines: true,
        // frame: true, 
        columns:[{            
            header: "Menu ID",
            id: 'sys_menu_id',
            dataIndex: 'sys_menu_id',
            width: 80,            
            sortable: true
            // editor: {                
            //     allowBlank: false
            // }
        },{     
            header : 'Parent ID',
            id: 'parent',
            width : 80,
            dataIndex: 'parent',
            editor: {
                xtype:'combo',
                queryMode:'local',                             
                displayField: 'parent',
                valueField: 'parent',
                triggerAction: 'all',
                typeAhead: true,
                store: Ext.create('Ext.data.Store',{
                    autoLoad: true,
                    fields: ['parent','menu_name'],
                    proxy: {
                        type: 'ajax',
                        url: SITE_URL + 'dashboard/get_parent',
                        reader: {                            
                            root: 'rows'
                        }
                    }
                }),
            }            
        },{            
            header: "Name",
            id: 'menu_name',
            dataIndex: 'menu_name',
            width: 200,            
            sortable: true,
            editor: {                
                allowBlank: false
            }
        },{            
            header: "Link",
            id: 'menu_link',
            dataIndex: 'menu_link',
            width: 200,            
            sortable: true,
            editor: {                
                allowBlank: false
            }
        },{     
            header : 'Category',
            id: 'sys_menu_group_id',
            width : 200,
            dataIndex: 'group_name',
            editor: {
                xtype:'combo',
                queryMode:'local',                             
                displayField: 'group_name',
                valueField: 'group_name',
                triggerAction: 'all',
                typeAhead: true,
                store: Ext.create('Ext.data.Store',{
                    autoLoad: true,
                    fields: ['sys_menu_group_id','group_name'],
                    proxy: {
                        type: 'ajax',
                        url: SITE_URL + 'dashboard/get_category',
                        reader: {                            
                            root: 'rows'
                        }
                    }
                }),
            }            
        },{            
            header: "Icon",
            id: 'icon',
            dataIndex: 'icon',
            width: 100,            
            sortable: true,
            editor: {                
                allowBlank: false
            }
        }],
        tbar:[
        {
            itemId: 'addLocation',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler : function() {                                
                var r = Ext.ModelManager.create({
                    id:0,
                    name: '',
                    title: '',
                    content: '',
                }, nameMod);
 
                store.insert(0, r);
                cellEditing.startEdit(0, 0);
            }
       }, {      
            id: 'btnSave',
            text: 'Simpan',
            iconCls: 'save-icon',
            handler: function() {
                var sm = grid.getSelectionModel();
                selected = [];
                Ext.each(sm.getSelection(), function (item) {
                    selected.push(item.data);
                });                
                Ext.Ajax.request({
                    url: SITE_URL+'dashboard/ext_update/'+tableName,
                    method: 'POST',
                    params: { postdata: Ext.encode(selected) }
                });                
                store.reload();
            },
            disabled: true
        }, {
            id  : 'btnDelete',
            text: 'Delete',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function (item) {
                                // console.log(item.data);
                                // selected.push(item.data.sys_menu_id);
                                // selected.push(item.data.Object.keys(item.data)[0]);
                                // Object.keys(item.data)[0];
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL+'dashboard/ext_delete/'+tableName,
                                method: 'POST',
                                params: { postdata: Ext.encode(selected) }
                            });
                            //Ext.Msg.alert('data',Ext.encode(selected));
                            store.remove(sm.getSelection());
                            sm.select(0);
                        }
                    }
                });
            },
            disabled:true
        },'->','Search: ', ' ',
            new Ext.ux.form.SearchField({
                store: store,
                width:180
            }),
        ],
        // paging bar on the bottom
        bbar: Ext.create('Ext.PagingToolbar', {
            store: store,
            displayInfo: true,
            //displayMsg: 'Displaying topics {0} - {1} of {2}',
            emptyMsg: "No Record"            
        }),
        plugins: [cellEditing]            
        // renderTo: 'divgrid'
    });
 
    // trigger the data store load
    store.loadPage(1);

