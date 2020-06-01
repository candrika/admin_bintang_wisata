var formSupplier = Ext.create('Ext.form.Panel', {
    id:'formSupplierid',
    autoWidth: true,
    autoHeight: true,
    url: CLINIC_API + 'form/save',
    baseParams: { idmenu: 24 },
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    layout: 'hbox',
    defaults: {
        padding: '5 10 5 5',
    },
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'is required',
        labelWidth: 160,
        anchor: '100%',
        width: 380
    },
    items: [{
            items: [
                // { xtype: 'hiddenfield', name: 'model', allowBlank: false,value:'supplier' },
                { xtype: 'hiddenfield', name: 'key', allowBlank: false,value:key },
                { xtype: 'hiddenfield', name: 'idsupplier', allowBlank: false },
                { xtype: 'hiddenfield', name: 'idunit', allowBlank: false ,value:idunit},
                { xtype: 'hiddenfield', name: 'statusformSupplier', allowBlank: false },
                { xtype: 'textfield', name: 'code', fieldLabel: 'Supplier Code', allowBlank: false },
                { xtype: 'textfield', name: 'namesupplier', fieldLabel: 'Name', allowBlank: false },
                { xtype: 'comboxsuppliertype', name: 'supplier_type_id', fieldLabel: 'Type', emptyText: 'Choose Type...',allowBlank: false},
                { xtype: 'textarea', name: 'companyaddress', fieldLabel: 'Address', allowBlank: false },
                { xtype: 'textarea', name: 'shipadddress', fieldLabel: 'Shipping Address' },
                { xtype: 'textfield', name: 'telephone', fieldLabel: 'Telp', allowBlank: false },
                { xtype: 'textfield', name: 'handphone', fieldLabel: 'HP', allowBlank: false },
                { xtype: 'comboxswitch', name: 'status', fieldLabel: 'Status', allowBlank: false },
            ],
        },
        {
            items: [
                { xtype: 'textfield', name: 'fax', fieldLabel: 'Fax' },
                { xtype: 'textfield', name: 'email', fieldLabel: 'Email', allowBlank: false },
                { xtype: 'textfield', name: 'website', fieldLabel: 'Website' },
                { xtype: 'textfield', name: 'city', fieldLabel: 'City', allowBlank: false },
                { xtype: 'textfield', name: 'state', fieldLabel: 'State', allowBlank: false },
                { xtype: 'textfield', name: 'postcode', fieldLabel: 'Post Code', allowBlank: false },
                { xtype: 'textfield', name: 'country', fieldLabel: 'Country', allowBlank: false },
                { xtype: 'textarea', name: 'notes', fieldLabel: 'Notes' },
            ],
        }
    ],
    buttons: [{
        text: 'Cancel',
        handler: function() {
            Ext.getCmp('FormSupplier').hide();
            formSupplier.getForm().reset();
        }
    }, {
        text: 'Save',
        handler: function() {
            if (formSupplier.isValid()) {
                formSupplier.submit({
                    params:{
                        model:'supplier'
                    },
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('FormSupplier').hide();
                        formSupplier.getForm().reset();
                        Ext.getCmp('GridSupplierID').getStore().load();
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

Ext.define(dir_sys + 'master.FormSupplier', {
// var FormSupplier = Ext.create('widget.window', {
    extend: 'Ext.window.Window',
    id:'FormSupplier',
    alias: 'widget.FormSupplier',
    title: 'Form Supplier',
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
    items: [formSupplier],
    listeners: {
        'show': function(FormSupplier) {
            Ext.getCmp('comboxsuppliertype').store.load();
            formSupplier.getForm().findField('statusformSupplier').setValue(FormSupplier.statusform);
        },
        'hide': function() {
            formSupplier.getForm().reset();
        }

    }
});