var Formdiagnosa = Ext.create(dir_sys + 'docter.Formdiagnosa')

Ext.define(dir_sys + 'docter.Windowdiagnosis', {
    id: 'Windowdiagnosis',
    extend: 'Ext.window.Window',
    title: 'Entri Diagnosa',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    // maxiable
    closeAction: 'hide',
    width:panelW,
    height:panelH,
    modal: true,
    layout: 'fit',
    border: false,
    items: [{
       xtype:'Formdiagnosa'
    }],
    buttons: [{
        text: 'Tutup',
        handler: function() {
            // patientFormProfil
            var win = Ext.getCmp('Windowdiagnosis');

            Ext.getCmp('Gridrecordaction').getStore().removeAll();
            Ext.getCmp('Gridrecorddisease').getStore().removeAll();
            Ext.getCmp('Gridrecorddrug').getStore().removeAll();
            Ext.getCmp('GridrecorddrugAlkes').getStore().removeAll();
            
            win.hide();
        }
    }, {
        id: 'BtndignosaGridSimpan',
        text: 'Simpan',
        handler: function() {
            var Gridrecorddisease = Ext.getCmp('Gridrecorddisease').getStore();
            var Gridrecorddrug = Ext.getCmp('Gridrecorddrug').getStore();
            var Gridrecordaction = Ext.getCmp('Gridrecordaction').getStore();
            var GridrecorddrugAlkes = Ext.getCmp('GridrecorddrugAlkes').getStore();

            //get count payment installment and validation
            var count_Gridrecorddisease = Gridrecorddisease.snapshot ? Gridrecorddisease.snapshot.length : Gridrecorddisease.getCount();
            if(count_Gridrecorddisease*1==0){
                // Ext.Msg.alert("Error!", "Grid Disease is undefined");
                // return false;
            }

            var count_Gridrecordaction = Gridrecordaction.snapshot ? Gridrecordaction.snapshot.length : Gridrecordaction.getCount();
            if(count_Gridrecordaction*1==0){
                // Ext.Msg.alert("Error!", "Grid Medical Action is undefined");
                // return false;
            }

            var count_Gridrecorddrug = Gridrecorddrug.snapshot ? Gridrecorddrug.snapshot.length : Gridrecorddrug.getCount();
            if(count_Gridrecorddrug*1==0){
                // Ext.Msg.alert("Error!", "Grid Drug is undefined");
                // return false;
            }

            var count_GridrecorddrugAlkes = GridrecorddrugAlkes.snapshot ? GridrecorddrugAlkes.snapshot.length : GridrecorddrugAlkes.getCount();
            if(count_GridrecorddrugAlkes*1==0){
                // Ext.Msg.alert("Error!", "Grid Drug Alkes is undefined");
                // return false;
            }

            var json_disease     = Ext.encode(Ext.pluck(Gridrecorddisease.data.items,'data'));
            var json_drug        = Ext.encode(Ext.pluck(Gridrecorddrug.data.items,'data'));
            var json_action      = Ext.encode(Ext.pluck(Gridrecordaction.data.items,'data'));
            var json_drug_alkes  = Ext.encode(Ext.pluck(GridrecorddrugAlkes.data.items,'data'));

            var form = Ext.getCmp('Formdiagnosa').getForm();
            if(form.isValid()) {
                Ext.Ajax.request({
                    url: CLINIC_API + 'docter/medical_record',
                    method:'POST',
                    params:{
                        key:key,
                        sales_id:form.findField('sales_id').getValue(),
                        medical_record_id:form.findField('medical_record_id').getValue(),
                        medical_record_no:form.findField('medical_record_no').getValue(),
                        patient_id:form.findField('patient_id').getValue(),
                        doctor_id:form.findField('doctor_id').getValue(),
                        member_id:form.findField('member_id').getValue(),
                        patient_type:form.findField('patient_type').getValue(),
                        medical_record_date:form.findField('medical_record_date').getValue(),
                        benefit_id_type:form.findField('benefit_id_type').getValue(),
                        patient_type:form.findField('patient_type').getValue(),
                        medical_record_desc:form.findField('medical_record_desc').getValue(),
                        // service_amount:form.findField('service_amount').getValue(),
                        json_disease:json_disease,
                        json_drug:json_drug,
                        json_action:json_action,
                        json_drug_alkes:json_drug_alkes
                    },
                    success: function(form, action) {
                        var d = Ext.decode(form.responseText)
                        Ext.Msg.alert('Success', d.message);

                        Ext.getCmp('Formdiagnosa').getForm().reset();   
                        Ext.getCmp('Windowdiagnosis').hide();
                        Ext.getCmp('GridDocterDiagnosisID').getStore().load();
                        setHeaderSalesSummary();
                        Ext.getCmp('SalesGridID').getStore().load();
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