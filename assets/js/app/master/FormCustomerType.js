var formCustomerType = Ext.create('Ext.form.Panel', {
    autoWidth:true,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/CustomerType/master',
    baseParams: {idmenu:24},
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    defaults: {
        padding: '5 10 5 5',
    },
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'is required',
        labelWidth: 160,
        anchor:'100%',
        width: 380
    },
    items: [
        {xtype: 'hiddenfield', name: 'idcustomertype', allowBlank: false},
        {xtype: 'hiddenfield', name: 'statusformCustomerType', allowBlank: false},
        {xtype: 'textfield', name: 'namecustype', fieldLabel:'Name', allowBlank: false},
        {xtype: 'textarea', name: 'description', fieldLabel:'Description', allowBlank: false},
        {xtype: 'comboxswitch', name: 'status', fieldLabel:'Status', allowBlank: false},
    ],
    buttons: [{
        text: 'Cancel',
        handler: function() {
            FormCustomerType.hide();
        }
    }, {
        text: 'Save',
        handler: function() {
            if (formCustomerType.isValid()) {
                formCustomerType.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        FormCustomerType.hide();
                        storeGridCustomerType.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var FormCustomerType = Ext.create('widget.window', {
    title: 'Form CustomerType',
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
    items: [formCustomerType],
    listeners:{
        'show': function(FormCustomerType){
            formCustomerType.getForm().findField('statusformCustomerType').setValue(FormCustomerType.statusform);
        },
        'hide': function(){
            formCustomerType.getForm().reset();
        }

    }
});