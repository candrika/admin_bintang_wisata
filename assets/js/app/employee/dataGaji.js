var formGridSalary = Ext.create('Ext.form.Panel', {
    id: 'formGridSalary',
     autoWidth:true,
    autoHeight:true,
    title:'Pengaturan Gaji',
    url: SITE_URL + 'backend/saveform/GridSalary/employee',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 160,
        width: 400
    },
    items: [{
            xtype: 'textfield',
            fieldLabel: 'Gaji Pokok',
            allowBlank: false,
            name: 'basicsallary'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupGridSalary');
                Ext.getCmp('formGridSalary').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnGridSalarySimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        params:{ 
                            idemployee:Ext.getCmp('idemployee').getValue() 
                        },
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
//                            Ext.getCmp('formGridSalary').getForm().reset();
//                            Ext.getCmp('windowPopupGridSalary').hide();
//                            storeGridSalary.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridSalary.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});