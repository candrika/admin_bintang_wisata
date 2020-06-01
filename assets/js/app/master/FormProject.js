var formProject = Ext.create('Ext.form.Panel', {
    autoWidth:true,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/Project/master',
    baseParams: {idmenu:24},
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    layout: 'vbox',
    defaults: {
        padding: '5 10 5 5',
    },
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'is required',
        labelWidth: 160,
        anchor:'100%',
        width: 380,
    },
    items: [
        {xtype: 'hiddenfield', name: 'idproject', allowBlank: false},
        {xtype: 'hiddenfield', name: 'statusformProject', allowBlank: false},
        {xtype: 'hiddenfield', name: 'idcustomer', allowBlank: false},
        {xtype: 'textfield', name: 'projectname', fieldLabel:'Project Name', allowBlank: false},
        {xtype: 'textarea', name: 'description', fieldLabel:'Description', allowBlank: false},
        {xtype: 'datefield', name: 'startdate', fieldLabel: 'Start Date', allowBlank: false, format: 'd/m/Y'},
        {xtype: 'datefield', name: 'enddate', fieldLabel:'End Date', allowBlank: false, format: 'd/m/Y'},
        {xtype: 'textfield', itemId: 'customer', fieldLabel:'Customer', allowBlank: false, emptyText:'Choose Customer...', listeners:{
            render: function(component) {
                component.getEl().on('click', function(event, el) {
                    storeChooserListCustomer.on('beforeload',function(store,operation,eOpts){
                        operation.params={extraparams: 'a.status: 1, a.deleted: 0, a.idunit:'+  idunit};
                    });
                    ChooserListCustomer.target = formProject;
                    ChooserListCustomer.show();
                });
            }
        }},
        {xtype: 'comboxunit', name: 'idunit', fieldLabel:'Unit', allowBlank: false},
        {xtype: 'numberfield', name: 'budget', fieldLabel:'Budget', allowBlank: false},
        {xtype: 'comboxtax', name: 'idtax', fieldLabel:'Tax', allowBlank: false},
        {xtype: 'comboxcurrency', name: 'idcurrency', fieldLabel:'Currency', allowBlank: false},
        {xtype: 'comboxswitch', name: 'status', fieldLabel: 'Active', allowBlank: false},
        {xtype: 'comboxprojectstatus', name: 'projectstatus', fieldLabel: 'Status', allowBlank: false},
    ],
    buttons: [{
        text: 'Cancel',
        handler: function() {
            FormProject.hide();
        }
    }, {
        text: 'Save',
        handler: function() {
            if (formProject.isValid()) {
                formProject.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        FormProject.hide();
                        storeGridProject.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }],
    listeners:{
        'selectCustomer': function(data){
            formProject.getForm().findField('idcustomer').setValue(data.idcustomer);
            formProject.queryById('customer').setValue(data.namecustomer);
        }
    }
});

var FormProject = Ext.create('widget.window', {
    title: 'Form Project',
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
    items: [formProject],
    listeners:{
        'show': function(FormProject){
            var cb1 = formProject.query('combobox[name=projectstatus]')[0];
            if(FormProject.statusform == 'input'){
                cb1.setValue('1');
                cb1.setDisabled(true);
            }else{
                cb1.setDisabled(false);
            }
            formProject.getForm().findField('statusformProject').setValue(FormProject.statusform);
        },
        'hide': function(){
            formProject.getForm().reset();
        }

    }
});