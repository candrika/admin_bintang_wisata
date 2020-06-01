var formMedicalAction = Ext.create('Ext.form.Panel', {
    id: 'formMedicalAction',
    autoWidth:true,
    autoHeight:true,
    // url: CLINIC_API + 'form/save/Location',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 130,
        width: 500
    },
    items: [{
            
            xtype: 'textarea',
            fieldLabel: 'Tindakan',
            allowBlank: false,
            name: 'medical_action_desc',
            id: 'medical_action_descPopup',
            width:800,
            height:250
    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('wMedicalActionPopuop');
            Ext.getCmp('formMedicalAction').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnMedicalActionSimpan',
        text: 'Simpan',
        handler: function() {
            var form = Ext.getCmp('formMedicalAction').getForm();
            if (form.isValid()) {

                var record = new GridrecordactionModel({
                    medical_action_desc:Ext.getCmp('medical_action_descPopup').getValue()
                });

                var grid =  Ext.getCmp('Gridrecordaction').getStore(); 
                grid.insert(0,record);
                
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }

            var win = Ext.getCmp('wMedicalActionPopuop');
            win.hide();
            Ext.getCmp('formMedicalAction').getForm().reset();
        }
    }]
});

Ext.define(dir_sys + 'docter.wMedicalActionPopuop', {
    extend: 'Ext.window.Window',
    alias: 'widget.wMedicalActionPopuop',
    id: 'wMedicalActionPopuop',
    title: 'Tambah Tindakan',
    header: {
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    width: panelW-400,
    modal: true,
    height: 350,
    layout: 'fit',
    border: false,
    items: [formMedicalAction]
});