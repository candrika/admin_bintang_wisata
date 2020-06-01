var formWindowtopupexport = Ext.create('Ext.form.Panel', {
    id: 'formWindowtopupexport',
    // width: panelW,
    autoHeight: true,
    autoWidth:true,
    // height: sizeH,
    // url: CLINIC_API + 'member/update_plafon',
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
        xtype:'comboxBusinessTransferUnit',
        id:'bussiness_id_stockOpname',
        fieldLabel:'Pilih Unit Usaha',
        labelWidth:200,
        // labelAlign:'right',
        // fieldStyle:'text-align:right',
        // listeners: {
        //     'render': function(c) {
        //         c.getEl().on('keyup', function() {
        //             this.setRawValue(renderNomor(this.getValue()));
        //             // updateSelisih();
        //         }, c);
        //     }
        // }
    },
    // {
    //     xtype:'hiddenfield',
    //     name:'current_installment_quota',
    //     id:'current_installment_quota', 
    // }
    ],
    buttons: [{
        id: 'BtnWindowtopupPlafonSimpan',
        iconCls:'page_excel',
        text: 'Download',
        handler: function() {
            var form = this.up('form').getForm();
            if (Ext.getCmp('bussiness_id_stockOpname').getValue()!=null) {
                Ext.Ajax.request({
                    method:'GET',
                    url: CLINIC_API + 'inventory/export_productList',
                    params:{
                        idunit:idunit,
                        inventory_class_id:1,
                        business_id:Ext.getCmp('bussiness_id_stockOpname').getValue(),
                        key:key 
                    },
                    success:function(form,action){

                        var d = Ext.decode(form.responseText);
                        var win = window.open(d.excel_url, '_blank');
                        // win.focus();
                        console.log(d)
                    },
                    failure:function(form,action){
                        var d = Ext.decode(form.responseText); 
                        Ext.Msg.alert("Warning!", d.message);
                    }
               });
            } else {
                Ext.Msg.alert("Warning!", "Pilih Unit Usaha Terlebih Dahulu!");
            }
        }
    }]
});

Ext.define(dir_sys + 'inventory.WindowtopupExport', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowtopupExport',
    id: 'WindowtopupExport',
    title: 'Export Produk',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    modal: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formWindowtopupexport]
});