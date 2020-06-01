var pharmacyreceiptDetail = Ext.create(dir_sys + 'pharmacy.pharmacyreceiptDetail')


Ext.define(dir_sys + 'pharmacy.Windowpharmacyreceipt', {
    id: 'Windowpharmacyreceipt',
    extend: 'Ext.window.Window',
    title: 'Resep Obat',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    // maxiable
    closeAction: 'hide',
    width: 850,
    height: sizeH,
    modal: true,
    layout: 'fit',
    border: false,
    items: [{
       xtype:'pharmacyreceiptDetail'
    }],
    buttons: [{
        text: 'Tutup',
        handler: function() {
            var win = Ext.getCmp('Windowpharmacyreceipt');
            Ext.getCmp('DrugreceiptGrid').getStore().removeAll();
            win.hide();
        }
    }, {
        id: 'BtnpharmacyGridSimpan',
        text: 'Simpan',
        handler: function() {
            var drug_detail = Ext.getCmp('DrugreceiptGrid').getStore();

            var json_drug  = Ext.encode(Ext.pluck(drug_detail.data.items,'data'));

            var form = Ext.getCmp('pharmacyreceiptDetail').getForm();
            if(form.isValid()) {
                Ext.Ajax.request({
                    url: CLINIC_API + 'docter/update_penerimaan_resep',
                    method:'POST',
                    params:{
                        key:key,
                        medical_record_id:form.findField('medical_record_id').getValue(),
                        medical_record_no:form.findField('medical_record_no').getValue(),
                        receipt_number:form.findField('receipt_number').getValue(),
                        patient_id:form.findField('patient_id').getValue(),
                        doctor_id:form.findField('doctor_id').getValue(),
                        member_id:form.findField('member_id').getValue(),
                        medical_record_date:form.findField('medical_record_date').getValue(),
                        patient_type:form.findField('patient_type').getValue(),
                        patient_type_id:form.findField('patient_type_id').getValue(),
                        medicine_status:form.findField('medicine_status').getValue(),
                        payment_status:form.findField('payment_status').getValue(),
                        json_drug:json_drug
                    },
                    success: function(form, action) {
                        var d = Ext.decode(form.responseText)
                        Ext.Msg.alert('Success', d.message);

                        Ext.getCmp('pharmacyreceiptDetail').getForm().reset();   
                        Ext.getCmp('Windowpharmacyreceipt').hide();
                        Ext.getCmp('GridpharmacyreceiptID').getStore().load();
                        // setHeaderSalesSummary();
                        // Ext.getCmp('SalesGridID').getStore().load();
                    },
                    failure: function(form, action) {
                        var d = Ext.decode(form.responseText)
                        Ext.Msg.alert('Success', d.message);
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});