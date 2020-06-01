Ext.create(dir_sys + 'inventory.v2.formInventory_v2')
Ext.create(dir_sys + 'inventory.ProductView')
// Ext.create(dir_sys + 'inventory.ProductimageList')

// dir_sys + 'inventory.ProductView
Ext.define('Tabformdataproduck', {
    extend: 'Ext.tab.Panel',
    plain: true,
    id: 'Tabformdataproduck',
    alias: 'widget.Tabformdataproduck',
    activeTab: 0,
    autoWidth: '100%',
    bodyPadding: 5,
    autoScroll: false,
    defaults: {
        // autoScroll: true,
        // bodyPadding: '1 0 15 0'
    },
    items: [{
            xtype: 'formInventory_v2',
            listeners: {
                // activate: function() {
                    // var status = Ext.getCmp('comboxStatusMember_frm_member').getValue();
                    // console.log(status)
                    // if(status==4){
                    //     Ext.getCmp('BtnAnggotaGridSimpan').setDisabled(true);
                    // } else {
                    //     Ext.getCmp('BtnAnggotaGridSimpan').setDisabled(false);
                    // }
                    // // storeGridMemberSavingGrid.load();
                    // // Ext.getCmp('GridMemberLoanGridID').getStore().load();
                // }
            }
        },{
            xtype:'ProductView',           
        }]
});


Ext.define(dir_sys + 'inventory.v2.formInventory', {
// var formInventory = Ext.create('widget.window', {
    id:'WindowInventory',
    extend: 'Ext.window.Window',
    alias: 'widget.WindowInventory',
    title: 'Data Obat',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    modal: true,
    closable: true,
    closeAction: 'hide',
    width: 850,
    height: 600,
    layout: 'fit',
    border: false,
    items: [{
        xtype:'Tabformdataproduck'
    }],
    listeners: {
        'show': function(formInventory) {
            // Ext.getCmp('ProductView').getStore().removeAt();
            // formInventory.getForm().findField('statusformInventory').setValue(formInventory.statusform);
        },
        'hide': function() {
            // Ext.getCmp('ProductView').getStore().removeAt();
            
            // formInventory.getForm().reset();
        }

    }
});



function ctrl_product(){
    var form = Ext.getCmp('formInventory_v2').getForm();
    form.findField('no_sku').show();
    // form.findField('no_barcode').show();
    form.findField('product_unit_id').setDisabled(false);
    form.findField('product_unit_id').show();
    form.findField('no_barcode').show();
    form.findField('idinventorycat').show();
    form.findField('idbrand').show();
    form.findField('buy_price').show();
    form.findField('stock_available').show();

    form.findField('is_purchasable').setDisabled(false);
    form.findField('is_purchasable').setValue(false);
    // form.findField('wholesale_price').show();
    // form.findField('wholesale_price_member').show();

    form.findField('coa_inventory_name').show();
    Ext.getCmp('fieldsetakunpersediaan').show();
    Ext.getCmp('coa_inventory_name').allowBlank = false;
    console.log(Ext.getCmp('coa_inventory_name').allowBlank);
    form.findField('product_location_id').show();

}

function ctrl_service(){
    var form = Ext.getCmp('formInventory_v2').getForm();
    form.findField('no_sku').hide();
    // form.findField('no_barcode').hide();
    form.findField('product_unit_id').setDisabled(true);
    form.findField('product_unit_id').hide();
    form.findField('no_barcode').hide();
    form.findField('idinventorycat').hide();
    form.findField('idbrand').hide();
    form.findField('buy_price').hide();
    form.findField('stock_available').hide();
    
    Ext.getCmp('coa_inventory_name').allowBlank = true;
    console.log(Ext.getCmp('coa_inventory_name').allowBlank);
    Ext.getCmp('coa_inventory_name').validate();
    Ext.getCmp('coa_inventory_name').hide();
    Ext.getCmp('fieldsetakunpersediaan').hide();

    form.findField('is_purchasable').setDisabled(true);
    form.findField('is_purchasable').setValue(false);
    form.findField('product_location_id').hide();
    // form.findField('wholesale_price_member').hide();
}