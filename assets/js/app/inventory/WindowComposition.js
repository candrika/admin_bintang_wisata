var formProductComponent = Ext.create('Ext.form.Panel', {
    id: 'formProductComponent',
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
    items: [
    {
            xtype: 'hiddenfield',
            name: 'key',
            fieldLabel:'key',
            id: 'key',
            value:key
        },
        {
            xtype: 'hiddenfield',
            name: 'statusformLocation',
            fieldLabel:'statusformLocation',
            id: 'statusformLocation',
            // value:password 
        },
        {
            xtype: 'hiddenfield',
            name: 'model',
            // fieldLabel:'key',
            id: 'model',
            value:'location'
        }, 
        {
            xtype: 'hiddenfield',
            name: 'product_unit_id',
            
        }, 
         {
            xtype: 'hiddenfield',
            name: 'product_composition_id',
            
        }, 
        {
            xtype: 'hiddenfield',
            name: 'product_id',
            // fieldLabel:'product_id',
            id: 'product_id'
        }, 
        {
            xtype: 'textfield',
            fieldLabel: 'Nama Obat',
            allowBlank: false,
            name: 'product_name',
            id: 'product_name_composition'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'No Obat',
            allowBlank: false,
            name: 'no_sku',
            id: 'no_sku_composition'
        }, 
        {
            xtype: 'textfield',
            fieldLabel: 'Qty',
            allowBlank: false,
            name: 'qty',
            id: 'qty_composition'
        }, 
        {
            xtype: 'comboxProductUnit',
            id: 'product_unit_idcode',
            fieldLabel: 'Satuan',
        },{
            xtype: 'textarea',
            fieldLabel: 'Catatan',
            allowBlank: false,
            id: 'notes_composition',
            name: 'notes'
        }]
});

Ext.define(dir_sys + 'inventory.WindowComposition', {
    id:'WindowComposition',
    extend: 'Ext.window.Window',
    alias: 'widget.WindowComposition',
    title: 'Edit Komposisi Obat',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formProductComponent],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('WindowComposition');
            Ext.getCmp('formProductComponent').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnLocationSimpan',
        text: 'Simpan',
        handler: function() {
            var form = Ext.getCmp('formProductComponent').getForm();
            if (form.isValid()) {
            
                var grid = Ext.getCmp('GridProductComposition');
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                selectedRecord.set('product_unit_id',Ext.getCmp('product_unit_idcode').getValue());
                selectedRecord.set('product_id',form.findField('product_id').getValue());
                selectedRecord.set('product_composition_id',form.findField('product_composition_id').getValue());
                selectedRecord.set('product_name',form.findField('product_name').getValue());
                selectedRecord.set('qty',form.findField('qty').getValue());
                selectedRecord.set('product_unit_code',Ext.getCmp('product_unit_idcode').getRawValue());
                selectedRecord.set('notes',form.findField('notes').getValue());

                var win = Ext.getCmp('WindowComposition');
                Ext.getCmp('formProductComponent').getForm().reset();
                win.hide();
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});