var WindowCoaProductPopup = Ext.create(dir_sys + 'inventory.WindowCoaProductPopup');
var WindowCoaProductPurchasePopup = Ext.create(dir_sys + 'inventory.WindowCoaProductPurchasePopup');
var WindowCoaProductSalesPopup = Ext.create(dir_sys + 'inventory.WindowCoaProductSalesPopup');
var windowInventoryOwner   = Ext.create(dir_sys + 'inventory.v2.windowInventoryOwner');
var GridProductComposition = Ext.create(dir_sys + 'inventory.GridProductComposition');
var GridProductCompositionfee = Ext.create(dir_sys + 'inventory.GridProductCompositionfee');

Ext.define('fotoProductThumb', {
    extend: 'Ext.Component',
    // id:'formpegdata',
    alias: 'widget.fotoProductThumb',
    fieldLabel: 'Foto',
    autoEl: {
        tag: 'img',
        width: 80,
        height: 50
    }
});

Ext.define(dir_sys + 'inventory.v2.formInventory_v2',{
    extend:'Ext.form.Panel',
    alias: 'widget.formInventory_v2',
    title:'Profile',
    autoWidth: true,
    id:'formInventory_v2',
    autoHeight: true,
    url: CLINIC_API + 'inventory/product',
    baseParams: { idmenu: 24,key:key },
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    layout: 'vbox',
    defaults: {
        padding: '5 10 5 5',
    },
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'is required',
        labelWidth: 160,
        anchor: '100%',
        width: 375
    },
    items: [{
            xtype: 'container',
            layout: 'hbox',
             defaults: {
                padding: '5 10 5 5',
            },
            items: [{
                    xtype: 'fieldcontainer',
                    flex: 1,
                    items: [{
                            xtype: 'fieldset',
                            title: 'Info Barang',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                            { xtype: 'hiddenfield', id: 'product_id_formInventory_v2', name: 'product_id', allowBlank: false },
                            { xtype: 'textfield', name: 'product_name', fieldLabel: 'Nama Barang', allowBlank: false },
                            {
                                xtype:'comboxBusinessTransferUnit',
                                allowBlank:false,
                                name:'business_id',
                                id:'inventory_business_id',

                            }, 
                            { xtype: 'comboxInventoryType', fieldLabel:'Jenis', name:'inventory_class_id', allowBlank: false,
                                listeners: {
                                    change: function (field, newValue, oldValue) {
                                        console.log(newValue)
                                        switch (parseInt(newValue)) {
                                            case 1:
                                                ctrl_product();
                                            break;
                                            case 2:
                                                ctrl_service();
                                            break;
                                        }
                                    }
                                }
                            },
                            { xtype: 'hiddenfield', value: userid, name: 'userid', allowBlank: false },
                            { xtype: 'hiddenfield', value: idunit, name: 'idunit', allowBlank: false },
                            { xtype: 'textfield', name: 'no_sku', fieldLabel: 'Kode Barang', allowBlank: true  },
                            { xtype: 'textfield', name: 'no_barcode', fieldLabel: 'No. Barcode'},
                            { xtype: 'comboxidsupplier', name: 'idsupplier',hidden:true },
                            { xtype: 'comboxProductUnit', name: 'product_unit_id'},
                            { xtype: 'datefield', name: 'expired_date',fieldLabel:'Tanggal Kadarluarsa',format:'d-m-Y'},
                            { xtype: 'comboxinventorycat', name: 'idinventorycat', fieldLabel: 'Kategori'},
                            { xtype: 'comboxproductlocation', name: 'product_location_id', fieldLabel: 'Lokasi'},
                            { xtype: 'comboxbrand', name: 'idbrand', fieldLabel: 'Merek' },
                            { xtype: 'textarea', name: 'product_description', fieldLabel: 'Deskripsi' },
                            { xtype: 'textfield', name: 'stock_available', fieldLabel: 'Stok',readOnly:true,fieldStyle: 'text-align: right;',
                                listeners: {
                                    'render': function(c) {
                                        c.getEl().on('keyup', function() {
                                            this.setRawValue(renderNomor(this.getValue()));
                                            // updateSelisihSalesPayment();
                                        }, c);
                                    }
                                } 
                            },
                            {
                                xtype:'comboxProductStatus',
                                name:'status',
                                id:'comboxProductStatus', 
                                allowBlank: false
                            }]
                    }]
            },{
                xtype: 'fieldcontainer',
                flex: 1,
                items: [{
                    xtype: 'fieldset',
                    title: 'Pembelian',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [{
                                xtype: 'checkboxfield',
                                fieldLabel:'Dibeli?',
                                name: 'is_purchasable',
                                boxLabel: 'Ya', 
                                listeners: {
                                    change: function() {
                                        if (this.getValue()) {
                                            ctrl_is_purchase(false)
                                        } else {
                                           ctrl_is_purchase(true)
                                        }
                                    }
                                }
                            },
                            { xtype: 'textfield', name: 'cost_price', fieldLabel: 'Harga Pokok', hidden:true,
                                fieldStyle: 'text-align: right;',
                                listeners: {
                                    'render': function(c) {
                                        c.getEl().on('keyup', function() {
                                            this.setRawValue(renderNomor(this.getValue()));
                                            // updateSelisihSalesPayment();
                                        }, c);
                                    }
                                } 
                            },
                            { xtype: 'textfield', name: 'buy_price', fieldLabel: 'Harga Beli', allowBlank:false,
                                fieldStyle: 'text-align: right;',
                                listeners: {
                                    'render': function(c) {
                                        c.getEl().on('keyup', function() {
                                            this.setRawValue(renderNomor(this.getValue()));
                                            // updateSelisihSalesPayment();
                                        }, c);
                                    }
                                } 
                            },
                            {
                                xtype:'comboxtaxtype',
                                hidden:true,
                                name:'coa_tax_purchase_id',
                                // allowBlank:false,
                                fieldLabel:'Pajak Pembelian'
                            }]
                },
                // {
                //     xtype: 'fieldset',
                //     title: 'Konsinyasi',
                //     defaults: {
                //         anchor: '100%'
                //     },
                //     items: [
                //             { xtype: 'checkboxfield',
                //                 fieldLabel:'Konsinyasi?',
                //                 name: 'is_consignment',
                //                 boxLabel: 'Ya', 
                //                 listeners: {
                //                     change: function() {
                //                         if (this.getValue()) {
                //                             ctrl_is_consign(false)
                //                         } else {
                //                             ctrl_is_consign(true)
                //                         }
                //                     }
                //                 }
                //             },
                //             { xtype: 'hiddenfield', name: 'consignment_owner_id' },
                //             { xtype: 'hiddenfield', name: 'consignment_owner_type_id' },
                //             {
                //                 xtype:'textfield',
                //                 name:'owner_name',
                //                 allowBlank:false,
                //                 fieldLabel:'Konsinyor',
                //                 listeners: {
                //                     render: function(component) {
                //                         component.getEl().on('click', function(event, el) {
                //                             // ChooserListCustomer.target = Ext.getCmp('EntrySalesOrder');
                //                             windowInventoryOwner.show();
                //                             var store = Ext.getCmp('GridInventoryOwnerMember').getStore();
                //                             store.getProxy().extraParams={};
                //                             // store.on('beforeload', function(store, operation, eOpts) {
                //                             //     operation.params = {
                //                             //         'idunit': idunit,
                //                             //         'idaccounttype': '14,15' //beban
                //                             //     };
                //                             // });
                //                             store.load();    
                //                         });
                //                     }
                //                 }
                //             },                            
                //             { xtype: 'textfield', name: 'consignment_base_price', fieldLabel: 'Harga Pokok',
                //                 fieldStyle: 'text-align: right;',
                //                 allowBlank:false,
                //                 listeners: {
                //                     'render': function(c) {
                //                         c.getEl().on('keyup', function() {
                //                             this.setRawValue(renderNomor(this.getValue()));
                //                             // updateSelisihSalesPayment();
                //                         }, c);
                //                     }
                //             } }
                //     ]
                // },
                {
                    xtype: 'fieldset',
                    title: 'Penjualan',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                            {
                                xtype: 'checkboxfield',
                                fieldLabel:'Dijual?',
                                name: 'is_sellable',
                                boxLabel: 'Ya', 
                                listeners: {
                                    change: function() {
                                        if (this.getValue()) {
                                            ctrl_is_sell(false)
                                        } else {
                                           ctrl_is_sell(true)
                                        }
                                    }
                                }
                            },
                           { xtype: 'textfield', name: 'wholesale_price', fieldLabel: 'Harga Grosir', hidden:true,
                                    fieldStyle: 'text-align: right;',
                                    listeners: {
                                        'render': function(c) {
                                            c.getEl().on('keyup', function() {
                                                this.setRawValue(renderNomor(this.getValue()));
                                                // updateSelisihSalesPayment();
                                            }, c);
                                        }
                                    } },
                            { xtype: 'textfield', name: 'wholesale_price_member', fieldLabel: 'Harga Grosir Anggota', hidden:true,
                                    fieldStyle: 'text-align: right;',
                                    listeners: {
                                        'render': function(c) {
                                            c.getEl().on('keyup', function() {
                                                this.setRawValue(renderNomor(this.getValue()));
                                                // updateSelisihSalesPayment();
                                            }, c);
                                        }
                                    } },
                            // { xtype: 'textfield', name: 'retail_price', fieldLabel: 'Harga Non Anggota', allowBlank: false,
                            //     fieldStyle: 'text-align: right;',
                            //     listeners: {
                            //         'render': function(c) {
                            //             c.getEl().on('keyup', function() {
                            //                 this.setRawValue(renderNomor(this.getValue()));
                            //                 // updateSelisihSalesPayment();
                            //             }, c);
                            //         }
                            //     } 
                            // },
                            { xtype: 'textfield', name: 'retail_price_member', fieldLabel: 'Harga Jual', allowBlank: false,
                                fieldStyle: 'text-align: right;',
                                listeners: {
                                    'render': function(c) {
                                        c.getEl().on('keyup', function() {
                                            this.setRawValue(renderNomor(this.getValue()));
                                            // updateSelisihSalesPayment();
                                        }, c);
                                    }
                                } 
                            },
                            {
                                xtype:'comboxtaxtype',
                                hidden:true,
                                name:'coa_tax_sales_id',
                                // allowBlank:false,
                                fieldLabel:'Pajak Jual'
                            }       
                    ]
                }]
            }]
    },{
        xtype:'GridProductComposition'
    },{
        xtype:'GridProductCompositionfee'
    }],
    buttons: [{
        text: 'Cancel',
        handler: function() {
            Ext.getCmp('WindowInventory').hide();
        }
    }, {
        text: 'Save',
        handler: function() {
            // var formDetail = Ext.getCmp('memberFormDetailID').getValues();
            var form = Ext.getCmp('formInventory_v2').getForm();

            var grid = Ext.getCmp('GridProductComposition').getStore(); 
            var json = Ext.encode(Ext.pluck(grid.data.items,'data'));
            
            var grid_compositionfee = Ext.getCmp('GridProductCompositionfee').getStore(); 
            var json_compositionfee = Ext.encode(Ext.pluck(grid_compositionfee.data.items,'data'));

            if (form.isValid()) {
                
                Ext.Ajax.cors = true;
                Ext.Ajax.useDefaultXhrHeader = false;

                form.submit({
                    method: 'POST',                    
                    actionMethods: {
                        read: 'POST'
                    },
                    params:{
                        idunit:idunit,
                        user_id:userid,
                        key:key,
                        json:json,
                        json_compositionfee:json_compositionfee
                    },
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('WindowInventory').hide();
                        Ext.getCmp('GridInventoryID').getStore().load();
                    },
                    failure: function(form, action) {
                        console.log(action)
                        var obj = Ext.decode(action.response.responseText);
                        console.log(obj)
                        Ext.Msg.alert('Info', obj.message);
                        // Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});


function ctrl_product(){
    var form = Ext.getCmp('formInventory_v2').getForm();
    form.findField('no_sku').show();
    // form.findField('no_barcode').show();
    // form.findField('product_unit_id').setDisabled(false);
    // form.findField('product_unit_id').show();
    form.findField('no_barcode').show();
    form.findField('idinventorycat').show();
    form.findField('idbrand').show();
    form.findField('buy_price').show();
    form.findField('stock_available').show();

    // form.findField('is_purchasable').setDisabled(false);
    // form.findField('is_purchasable').setValue(false);
    // form.findField('wholesale_price').show();
    // form.findField('wholesale_price_member').show();

    // form.findField('coa_inventory_name').show();
    // Ext.getCmp('fieldsetakunpersediaan').show();
    // Ext.getCmp('coa_inventory_name').allowBlank = false;
    // console.log(Ext.getCmp('coa_inventory_name').allowBlank);
    form.findField('product_location_id').show();

}

function ctrl_service(){
    var form = Ext.getCmp('formInventory_v2').getForm();
    form.findField('no_sku').hide();
    // form.findField('no_barcode').hide();
    // form.findField('product_unit_id').setDisabled(true);
    // form.findField('product_unit_id').hide();
    form.findField('no_barcode').hide();
    form.findField('idinventorycat').hide();
    form.findField('idbrand').hide();
    form.findField('buy_price').hide();
    form.findField('stock_available').hide();
    
    // Ext.getCmp('coa_inventory_name').allowBlank = true;
    // console.log(Ext.getCmp('coa_inventory_name').allowBlank);
    // Ext.getCmp('coa_inventory_name').validate();
    // Ext.getCmp('coa_inventory_name').hide();
    Ext.getCmp('fieldsetakunpersediaan').hide();

    // form.findField('is_purchasable').setDisabled(true);
    // form.findField('is_purchasable').setValue(false);
    form.findField('product_location_id').hide();
    // form.findField('wholesale_price_member').hide();
}