Ext.define('GridMasterProjectModel', {
    extend: 'Ext.data.Model',
    fields: ['project_id','project_name','description','budget','expense','realization','profit','status','idunit','idcustomer','nocustomer','namecustomer','namaunit','taxcode','namecurr','startdate','enddate'],
    idProperty: 'id'
});
var storeGridMasterProject = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridMasterProjectModel',
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
        property: 'project_id',
        direction: 'DESC'
    }]
});

var formMasterProject = Ext.create('Ext.form.Panel', {
    id: 'formMasterProject',
    autoWidth:true,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/MasterProject/master',
     bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 130,
        width: 400
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'project_id',
            id: 'project_id'
        }, {
            xtype: 'hiddenfield',
            name: 'statusformMasterProject',
            id: 'statusformMasterProject'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Project Name',
            allowBlank: false,
            name: 'project_name'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Description',
            name: 'description',
        }, {
            xtype: 'datefield',
            format: 'd-M-Y',
            fieldLabel: 'Start Date',
            name: 'startdate' 
        }, {
            xtype: 'datefield',
            format: 'd-M-Y',
            fieldLabel: 'End Date',
            name: 'enddate' 
        }, {
            xtype: 'hiddenfield',
            name: 'idcustomer',
            id: 'target_idcustomer_formproject', 
        }, {
            xtype: 'hiddenfield',
            name: 'namecustomer',
            id: 'namecustomer_formproject', 
        }, {
            xtype: 'hiddenfield',
            name: 'idunit',
            id: 'target_idunit_formproject', 
        },
        Ext.define('Ext.ux.customercode_filter_salesorderdetail', {
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.customercode_filter_salesorderdetail',
            editable: false,
            id: 'combox_namecustomer_formproject',
            fieldLabel: 'Customer',
            emptyText: 'Pilih Customer...',
            onTriggerClick: function() {
                wGridCustomerListPopup.show();
                Ext.getCmp('idCustomerFieldId').setValue('target_idcustomer_formproject');
                Ext.getCmp('nameCustomerFieldId').setValue('combox_namecustomer_formproject');
                // storeGridSalesOrderDetail.load();
            }
        }),
        {
            xtype: 'numberfield',
            name: 'budget',
            fieldLabel: 'Budget Ammount',
        },
        {
            xtype: 'comboxidtax',
            name: 'idtax',
            fieldLabel: 'Tax',
        },
        {
            xtype: 'comboxidcurrency',
            name: 'idcurrency',
            fieldLabel: 'Currency',
        },
        {
            xtype: 'comboxprojectstatus',
            name: 'status',
            fieldLabel: 'Status',
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupMasterProject');
            Ext.getCmp('formMasterProject').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnMasterProjectSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formMasterProject').getForm().reset();
                        Ext.getCmp('windowPopupMasterProject').hide();
                        storeGridMasterProject.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        // storeGridMasterProject.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wMasterProject = Ext.create('widget.window', {
    id: 'windowPopupMasterProject',
    title: 'Project Form',
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
    items: [formMasterProject],
    listeners: {
        'Show': function(){
            Ext.getCmp('combox_namecustomer_formproject').setValue(formMasterProject.getForm().getValues().namecustomer);
        },
        'Hide': function(){
            formMasterProject.getForm().reset();
        }
    }
});


Ext.define('MY.searchGridMasterProject', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridMasterProject',
    store: storeGridMasterProject,
    width: 180
});
var smGridMasterProject = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridMasterProject.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteMasterProject').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteMasterProject').enable();
        }
    }
});
Ext.define('GridMasterProject', {
    title: 'Project',
    itemId: 'GridMasterProjectID',
    id: 'GridMasterProjectID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridMasterProject',
    store: storeGridMasterProject,
    loadMask: true,
    columns: [{
        header: 'project_id',
        dataIndex: 'project_id',
        hidden: true
    }, {
        header: 'Project Name',
        dataIndex: 'project_name',
        minWidth: 150
    }, {
        header: 'Budget',
        dataIndex: 'budget',
        minWidth: 150
    }, {
        header: 'Expense',
        dataIndex: 'expense',
        minWidth: 150
    }, {
        header: 'Realization',
        dataIndex: 'realization',
        minWidth: 150
    }, {
        header: 'Profit',
        dataIndex: 'profit',
        minWidth: 150
    }, {
        header: 'Tax',
        dataIndex: 'taxcode',
        minWidth: 150
    }, {
        header: 'Currency',
        dataIndex: 'namecurr',
        minWidth: 150
    }, {
        header: 'Start Date',
        dataIndex: 'startdate',
        minWidth: 150
    }, {
        header: 'End Date',
        dataIndex: 'enddate',
        minWidth: 150
    }, {
        header: 'Status',
        dataIndex: 'status',
    }, {
        header: 'Description',
        flex:1,
        dataIndex: 'description',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addMasterProject',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wMasterProject.show();
                Ext.getCmp('statusformMasterProject').setValue('input');
            }
        }, {
            itemId: 'editMasterProject',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridMasterProject')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formMasterProject = Ext.getCmp('formMasterProject');
                    formMasterProject.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/MasterProject/1/master',
                        params: {
                            extraparams: 'a.project_id:' + selectedRecord.data.project_id
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wMasterProject.show();
                    Ext.getCmp('statusformMasterProject').setValue('edit');
                    // Ext.getCmp('TabSupplier').setActiveTab(0);
                }
            }
        }, {
            id: 'btnDeleteMasterProject',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridMasterProject')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/MasterProject/master',
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
                                        storeGridMasterProject.load();
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
            //                    disabled: true
        }, '->', 'Pencarian: ', ' ', {
            xtype: 'searchGridMasterProject',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridMasterProject, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridMasterProject.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formMasterProject = Ext.getCmp('formMasterProject');
            wMasterProject.show();
            formMasterProject.getForm().load({
                url: SITE_URL + 'backend/loadFormData/MasterProject/1/master',
                params: {
                    extraparams: 'a.supplier_type_id:' + record.data.supplier_type_id
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
            Ext.getCmp('statusformMasterProject').setValue('edit');
        }
    }
});

function setValueProject(selectedRecord,winCmp,prefixCmp)
{
    // console.log(prefixCmp);
    Ext.getCmp('projectid'+prefixCmp).setValue(selectedRecord.get('project_id'));
    Ext.getCmp('projectname'+prefixCmp).setValue(selectedRecord.get('project_name'));
    
    Ext.getCmp(winCmp).hide();
}