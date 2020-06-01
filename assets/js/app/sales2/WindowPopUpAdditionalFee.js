var formAddFeePOS = Ext.create('Ext.form.Panel', {
    autoWidth: true,
    id:'formAddFeePOS',
    autoHeight: true,
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
    items: [
        { 
            xtype: 'textfield', 
            name: 'add_fee_amount', 
            fieldLabel: 'Jumlah Biaya', 
            allowBlank: false, 
            maxLength: 50,
            listeners: {
                    'render': function(c) {
                        c.getEl().on('keyup', function() {
                             this.setRawValue(renderNomor(this.getValue()));
                               
                        }, c)

                    }
            }
        },
    ]
});

Ext.define(dir_sys + 'sales2.WindowPopUpAdditionalFee', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowPopUpAdditionalFee',
    id: 'WindowPopUpAdditionalFee',
    title: 'Tambah Biaya lain',
    closable: true,
    modal: true,
    closeAction: 'hide',
    maximizable: true,
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [
        formAddFeePOS
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('WindowPopUpAdditionalFee');
            win.hide();
        }
    }, {
        text: 'Tambahkan',
        handler: function() {
            var frm = Ext.getCmp('formAddFeePOS').getForm();
            Ext.getCmp('other_fee_amount_poswindow').setValue(frm.findField('add_fee_amount').getValue());
            update_pos_footer();
            Ext.getCmp('WindowPopUpAdditionalFee').hide();
        }
    }]
});