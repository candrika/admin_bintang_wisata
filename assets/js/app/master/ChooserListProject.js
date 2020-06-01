var storeChooserListProject = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'App.model.Project',
    sorters: [{
        property: 'nameproject',
        direction: 'ASC'
    }],
});

var smChooserListProject = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smChooserListProject.getSelection().length;
            if (selectedLen == 0) {
                GridProjectList.queryById('btnOk').setDisabled(true);
            }
        },
        select: function(model, record, index) {
            GridProjectList.queryById('btnOk').setDisabled(false);
        }
    }
});

Ext.define('MY.searchChooserListProject', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchChooserListProject',
    store: storeChooserListProject,
    width: 180
});

var GridProjectList = Ext.create('Ext.grid.Panel', {
    itemId: 'GridProjectListID',
    id: 'GridProjectListID',
    store: storeChooserListProject,
    width: 850,
    height: 350,
    selModel: smChooserListProject,
    autoScroll:true,
    columns: [
        {header:'idproject', dataIndex:'idproject', hidden:true},
        {header:'No', xtype:'rownumberer', sortable:false, width: 30},
        {header:'Project Name', dataIndex:'projectname', minWidth: 150},
        {header:'Customer', dataIndex:'namecustomer', minWidth: 150},
        {header:'Description', dataIndex:'description', minWidth: 200, flex:1},
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            dock: 'top',
            items:[
                '->',
                'Pencarian',
                ' ',
                {
                    xtype: 'searchChooserListProject',
                    text: 'Left Button',
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'bottom',
            defaults: {
                width: 90,
            },
            items:[
                '->',
                {
                    text: 'OK',
                    itemId: 'btnOk',
                    disabled: true,
                    handler: function(){
                        GridProjectList.fireEvent('selectItem', ChooserListProject.target);
                    }
                },
                {
                    text: 'Cancel',
                    handler: function(){
                        ChooserListProject.hide();
                    }
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: storeChooserListProject, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
        },
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeChooserListProject.load();
            }
        },
        itemdblclick: function() {
        },
        selectItem: function(form){
            var selectedRecord = GridProjectList.getSelectionModel().getSelection()[0];
            form.fireEvent('selectProject', selectedRecord.data);
            ChooserListProject.hide();
        }

    }
});

var ChooserListProject = Ext.create('widget.window', {
    title: 'Project List',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    modal: true,
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    padding: '5',
    items: [GridProjectList],
});