var DocterChangePassForm = Ext.create('Ext.form.Panel', {
    id: 'DocterChangePassForm',
    url: CLINIC_API + 'docter/change_pass',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 160,
        width: 400
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'staff_id',
            id: 'staff_id_resetPass',
        },{
            xtype: 'textfield',
            fieldLabel: 'Kata Kunci',
            allowBlank: false,
            name: 'new_password',
            inputType: 'password'
        },{
            xtype: 'textfield',
            fieldLabel: 'Ulangi Kata Kunci',
            allowBlank: false,
            name: 'repeat_new_password',
            inputType: 'password'
        }
       ],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupAnakGrid');
                Ext.getCmp('DocterChangePassForm').getForm().reset();
                win.hide();
            }
        }, {
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        method:'POST',
                        params:{
                            key:key
                        },
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('DocterChangePassForm').getForm().reset();
                            Ext.getCmp('DocterChangePassWindow').hide();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridAnakGrid.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});

Ext.define(dir_sys + 'docter.DocterChangePassWindow', {
    extend: 'Ext.window.Window',
    id: 'DocterChangePassWindow',
    alias: 'widget.DocterChangePassWindow',
    title: 'Ganti Kata Kunci',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    modal:true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    // width: 660,
    // height: panelHeight,
    layout: 'fit',
    border: false,
    items: [DocterChangePassForm]
});