var formSupplierType = Ext.create('Ext.form.Panel', {
    autoWidth:true,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/SupplierType/master',
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
        // {xtype: 'hiddenfield', name: 'model', allowBlank: false,value:'suppliertype'},
        {xtype: 'hiddenfield', name: 'idsuppliertype', allowBlank: false},
        {xtype: 'hiddenfield', name: 'statusformSupplierType', allowBlank: false},
        {xtype: 'textfield', name: 'name', fieldLabel:'Name', allowBlank: false},
        {xtype: 'textarea', name: 'desc', fieldLabel:'Description', allowBlank: false},
        {xtype: 'comboxswitch', name: 'status', fieldLabel:'Status', allowBlank: false},
    ],
    buttons: [{
        text: 'Cancel',
        handler: function() {
            FormSupplierType.hide();
        }
    }, {
        text: 'Save',
        handler: function() {
            if(formSupplierType.getForm().isValid())
            {
                formSupplierType.submit({
                    params:{
                        model:'suppliertype'
                    },
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        FormSupplierType.hide();
                        Ext.getCmp('comboxsuppliertype').getStore().load();  //reload the store of comboxsuppliertype
                        storeGridSupplierType.load(); //reload the store of grid suppliertype
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

Ext.define(dir_sys + 'master.FormSupplierType', {
    // var FormSupplier = Ext.create('widget.window', {
        extend: 'Ext.window.Window',
        alias: 'widget.FormSupplierType',
// var FormSupplierType = Ext.create('widget.window', {
    title: 'Form Supplier Type',
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
    items: [formSupplierType],
    listeners:{
        'show': function(FormSupplierType){
            formSupplierType.getForm().findField('statusformSupplierType').setValue(FormSupplierType.statusform);
        },
        'hide': function(){
            formSupplierType.getForm().reset();
        }

    }
});