Ext.define('GridProjectListModel', {
    extend: 'Ext.data.Model',
    fields: ['project_id','project_name','description','budget','expense','realization','profit','status','idunit','idcustomer','nocustomer','namecustomer','namaunit','taxcode','namecurr','startdate','enddate'],
    idProperty: 'id'
});
var storeGridProjectList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridProjectListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/MasterProject/master',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'project_name',
        direction: 'ASC'
    }]
});

Ext.define('MY.searchGridProjectList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridProjectList',
    store: storeGridProjectList,
    width: 180
});
// var smGridProjectList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridProjectList.getSelection().length;
//             if (selectedLen == 0) {
//                 console.log(selectedLen);
//                 Ext.getCmp('btnDeleteMasterProjectData').disable();
//             }
//         },
//         select: function(model, record, index) {
//             Ext.getCmp('btnDeleteMasterProjectData').enable();
//         }
//     }
// });

Ext.define('GridProjectList', {
    itemId: 'GridProjectListID',
    id: 'GridProjectListID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridProjectList',
    store: storeGridProjectList,    
    loadMask: true,
    columns:[{
        text: 'Pilih',
        width: 45,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
            var prefix = Ext.getCmp('prefixWinProjectList').getValue();
            setValueProject(selectedRecord, 'wGridProjectListPopup', prefix);
        }
    }, {
        header: 'project_id',
        dataIndex: 'project_id',
        hiddenfield: true,
    }, {
        header: 'Project Name',
        dataIndex: 'project_name',
    }, {
        header: 'Customer Name',
        dataIndex: 'namecustomer',
    }, {
        header: 'Description',
        flex:1,
        dataIndex: 'description'
    }, {
        header: 'Start Date',
        dataIndex: 'startdate'
    }, {
        header: 'End Date',
        dataIndex: 'enddate'
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            '->',
            'Pencarian: ', ' ',
            {
                xtype: 'searchGridProjectList',
                text: 'Left Button'
            }
        ]
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid){
                storeGridProjectList.load();
            }
        }
    }
});

var wGridProjectListPopup = Ext.create('widget.window', {
    id: 'wGridProjectListPopup',
    title: 'Pilih Project',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    // autoWidth: true,
    width: 450,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
        xtype:'GridProjectList'
    }, {
        xtype: 'hiddenfield',
        id: 'prefixWinProjectList',
    }]
});