load_js_file('master/FormProject.js');
load_js_file('master/ChooserListProject.js');

var storeGridProject = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'App.model.Project',
    sorters: [{
        property: 'namesupplier',
        direction: 'ASC'
    }],
    listeners: {
        'beforeload': function(store, operation, eOpts){
            operation.params = {
                extraparams: 'a.deleted: 0, a.idunit:'+idunit,
            }
        }
    },
});

var smGridProject = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'MULTI',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridProject.getSelection().length;
            if (selectedLen == 0) {
                Ext.getCmp('GridProjectID').queryById('btnEdit').setDisabled(true);
                Ext.getCmp('GridProjectID').queryById('btnDelete').setDisabled(true);
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('GridProjectID').queryById('btnEdit') .setDisabled(false);
            Ext.getCmp('GridProjectID').queryById('btnDelete') .setDisabled(false);
        }
    }
});

Ext.define('MY.searchGridProject', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridProject',
    store: storeGridProject,
    width: 180
});

Ext.define(dir_sys + 'master.GridProject', {
    itemId: 'GridProjectID',
    id: 'GridProjectID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridProject',
    store: storeGridProject,
    selModel: smGridProject,
    loadMask: true,
    columns: [
        {header:'project_id', dataIndex:'project_id', hidden:true},
        {header:'No', xtype:'rownumberer', sortable:false, width: 50},
        {header:'Project Name', dataIndex:'projectname', minWidth: 150},
        {header:'Budget', dataIndex:'budget', minWidth: 150},
        {header:'Expense', dataIndex:'expense', minWidth: 150},
        {header:'Realization', dataIndex:'realization', minWidth: 150},
        {header:'Profit', dataIndex:'profit', minWidth: 150},
        {header:'Tax', dataIndex:'taxcode', minWidth: 150},
        {header:'Curr', dataIndex:'namecurr', minWidth: 200},
        {header:'Start Date', dataIndex:'startdate', minWidth: 150},
        {header:'End Date', dataIndex:'enddate', minWidth: 150},
        {header:'Status', dataIndex:'status', minWidth: 100, renderer: function(value){
            return projectstatusarr.map(function(val){return val[1]})[value-1];
        }},
        {header:'Active', dataIndex:'status', minWidth: 100, renderer: function(value){
            return togglearr.map(function(val){return val[1]})[value];
        }},
        {header:'Description', dataIndex:'description', minWidth: 200, flex:1},
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                itemId: 'btnAdd',
                text: 'Add',
                iconCls: 'add-icon',
                handler: function() {
                    FormProject.statusform = 'input';
                    FormProject.show();
                }
            }, {
                itemId: 'btnEdit',
                text: 'Edit',
                iconCls: 'edit-icon',
                disabled: true,
                handler: function() {
                    var grid = Ext.ComponentQuery.query('GridProject')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var rows = grid.getSelectionModel().getSelection();
                    if (rows.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih data brand terlebih dahulu!');
                    } else {
                        FormProject.statusform = 'edit';
                        var data = null;
                        storeGridProject.getRange().every(function(rec){
                            if(rec.data['idsupplier'] == selectedRecord.data['idsupplier']){
                                data = rec;
                                return false; 
                            }
                            return true;
                        });
                        formProject.loadRecord(data);
                        FormProject.show();
                    }
                }
            }, {
                itemId: 'btnDelete',
                text: 'Delete',
                iconCls: 'delete-icon',
                disabled: true,
                handler: function() {
                    Ext.Msg.show({
                        title: 'Confirm',
                        msg: 'Delete Selected ?',
                        buttons: Ext.Msg.YESNO,
                        fn: function(btn) {
                            if (btn == 'yes') {
                                var grid = Ext.ComponentQuery.query('GridProject')[0];
                                var sm = grid.getSelectionModel();
                                selected = [];
                                Ext.each(sm.getSelection(), function(item) {
                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                });
                                console.log(selected);
                                Ext.Ajax.request({
                                    url: SITE_URL + 'backend/ext_delete/Project/master',
                                    method: 'POST',
                                    params: {
                                        postdata: Ext.encode(selected),
                                        idmenu:24
                                    },
                                    success: function(form, action) {
                                        var d = Ext.decode(form.responseText);
                                        if (!d.success) {
                                            Ext.Msg.alert('Informasi', d.message);
                                        } else {
                                            storeGridProject.load();
                                        }
                                    },
                                    failure: function(form, action) {
                                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                    }
                                });
                                
                            }
                        }
                    });
                },
            }, 
            '->', 
            'Pencarian: ', 
            ' ', 
            {
                xtype: 'searchGridProject',
                text: 'Left Button',
            }
        ],
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridProject, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridProject.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            FormProject.statusform = 'edit';
            var data = null;
            storeGridProject.getRange().every(function(rec){
                if(rec.data['idsupplier'] == record.data.idsupplier){
                    data = rec;
                    return false; 
                }
                return true;
            });
            formProject.loadRecord(data);
            FormProject.show();
        }
    }
});