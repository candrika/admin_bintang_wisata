var loadingtxt = "Loading...";

Ext.define('imagethumbnail', {
    extend: 'Ext.Component',
    alias: 'widget.imagethumbnail',
    style: {
        left:105
    },
    // initComponent: function(config) {
    //     this.callParent(config);
    //     this.style['left'] = '105px';
    // },
    autoEl: {
        tag: 'img',
        width: 300,
        height: 300,
        
    }
    // this.el
});

var formWindowProductimage = Ext.create('Ext.form.Panel', {
    id: 'formWindowProductimage',
    // width: panelW,
    autoHeight: true,
    autoWidth:true,
    // height: sizeH,
    // url: CLINIC_API  + 'inventory/save_productimage',
    baseParams: {
        key: key
    },
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    layout: 'hbox',
    defaults: {
        padding: '5 10 5 5',
    },
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 150,
        // anchor:'100%'
        width: 400
    },
    items: [{
        xtype:'container',
        layout:'vbox',
        items:[{
            xtype:'hiddenfield',
            name:'status_form',
            id:'status_form',
        },{
            xtype:'hiddenfield',
            name:'product_image_id',
            id:'product_image_id',
        },{
            xtype:'hiddenfield',
            name:'product_id',
            id:'product_id',
        },{
            xtype:'filefield',
            name:'image_fullsize',
            id:'image_fullsize',
            fieldLabel:'File Foto',
            labelWidth:100,
        },
        {
            xtype: 'imagethumbnail',
            id: 'imagethumbnail',
            fieldLabel: 'foto',
            labelWidth:100,
            width: 250,
            height: 250,
            // anchor: '70%',
            hidden:true,
            style:{
                marginBottom:'3px',
            },
            
        },
        Ext.panel.Panel({
            // title:'Informasi',
            html: 'Max Size : 1000 Kb with allowed dimension 1500 x 900 pixel'
        }),
        {
            xtype:'textfield',
            name:'image_caption',
            id:'image_caption', 
            labelWidth:100,
            fieldLabel:'Judul Foto',
            // width:30
            style:{
                marginTop:'5px',
            }
        },
        {
            xtype:'numberfield',
            name:'order_by',
            id:'order_by',
            fieldLabel:'Urutan', 
            labelWidth:100,
            width:150
        }]
    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('WindowProductimage');
            Ext.getCmp('formWindowProductimage').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnWindowProductimageSimpan',
        text: 'Simpan',
        handler: function() {
            var msg = Ext.MessageBox.wait(loadingtxt);
            var form_image = this.up('form').getForm();
            if (form_image.isValid()) {
                console.log(Ext.getCmp('product_id_formInventory_v2').getValue())
                 form_image.submit({
                    url: SITE_URL + 'inventory/save_productimage',
                    params: {
                       products_id: Ext.getCmp('product_id_formInventory_v2').getValue(),
                       key:key
                    },
                    success: function(form, action) {
                        // var d = Ext.decode(action.response.responseText)
                        var d =Ext.decode(action.response.responseText)
                        console.log(d)
                        Ext.Msg.alert('Informasi', 'Unggah berkas berhasil');

                        
                        var win = Ext.getCmp('WindowProductimage');
                        Ext.getCmp('formWindowProductimage').getForm().reset();
                        win.hide();
                    
                        Ext.getCmp('ProductView').getStore().load();
                        
                    },
                    failure: function(form, action) {
                        var d = Ext.decode(action.response.responseText);
                        console.log(d)
                        Ext.Msg.alert('Informasi', d.message);
                        var win = Ext.getCmp('WindowProductimage');
                        Ext.getCmp('formWindowProductimage').getForm().reset();
                        win.hide();
                    
                        Ext.getCmp('ProductView').getStore().load();
                        
                    }
                })      
            // msg.hide()
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

Ext.define(dir_sys + 'inventory.WindowProductimage', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowProductimage',
    id: 'WindowProductimage',
    title: 'Tambah Foto',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    modal: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formWindowProductimage]
});