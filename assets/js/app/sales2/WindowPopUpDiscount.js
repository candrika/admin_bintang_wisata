var formDiscountPOS = Ext.create('Ext.form.Panel', {
    autoWidth: true,
    id:'formDiscountPOS',
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
            name: 'discount_amount', 
            fieldLabel: 'Jumlah Diskon', 
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

Ext.define(dir_sys + 'sales2.WindowPopUpDiscount', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowPopUpDiscount',
    id: 'WindowPopUpDiscount',
    title: 'Tambah Diskon',
    closable: true,
    modal: true,
    closeAction: 'hide',
    maximizable: true,
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [
        formDiscountPOS
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('WindowPopUpDiscount');
            win.hide();
        }
    }, {
        text: 'Tambahkan',
        handler: function() {
            var frm = Ext.getCmp('formDiscountPOS').getForm();
            Ext.getCmp('discount_amount_poswindow').setValue(frm.findField('discount_amount').getValue());
            update_pos_footer();
            Ext.getCmp('WindowPopUpDiscount').hide();
        }
    }]
});