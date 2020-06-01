function detail_dokter(staff_id){

    Windowdokter.show();

    Ext.getCmp('docter_type_id').getStore().load();
    Ext.getCmp('docter_polytpe_id').getStore().load();
    Ext.getCmp('docter_location_id').getStore().load();
    Ext.getCmp('status_docter').getStore().load();
    Ext.getCmp("password_docter").hide();
    Ext.getCmp("docterchagepassword").show();

    Ext.Ajax.request({
        url:CLINIC_API+'docter/data',
        method:'GET',
        params:{
            key:key,
            // idunit:idunit,
            staff_id:staff_id,
            query:null,
            group_id:5
        },
        success:function(form,action){
            var d = Ext.decode(form.responseText)
            console.log(d.rows.patient_type_id*1);

            // staff_id_resetPass
            Ext.getCmp("photodocterupload").enable();
            Ext.getCmp("fee_per_patient").setValue(renderNomor(d.rows.fee_per_patient*1));
            Ext.getCmp('staff_id').setValue(d.rows.staff_id);
            Ext.getCmp('staff_id_resetPass').setValue(d.rows.staff_id);
            Ext.getCmp('docter_type_id').setValue(d.rows.staff_type_id);
            Ext.getCmp('docter_staff_name').setValue(d.rows.staff_name);
            Ext.getCmp('status_docter').setValue(d.rows.status);
            Ext.getCmp('docter_staff_number').setValue(d.rows.staff_number);
            Ext.getCmp('docter_no_identity').setValue(d.rows.no_identity);
            Ext.getCmp('docter_staff_mobilephone').setValue(d.rows.staff_mobilephone);
            Ext.getCmp('docter_staff_whatsapp').setValue(d.rows.staff_whatsapp);
            Ext.getCmp('docter_staff_email').setValue(d.rows.staff_email); 
            Ext.getCmp('docter_polytpe_id').setValue(d.rows.polytpe_id);
            Ext.getCmp('docter_location_id').setValue(d.rows.location_id);
            Ext.getCmp('docter_staff_address').setValue(d.rows.staff_address);
            Ext.getCmp('docter_account_number').setValue(d.rows.account_number);
            Ext.getCmp('docter_bank_name').setValue(d.rows.bank_name);
            Ext.getCmp('docter_account_number').setValue(d.rows.account_number);
            Ext.getCmp('docter_account_name').setValue(d.rows.account_name);
            Ext.getCmp("fotodokterthumb").el.dom.src = SITE_URL+'/upload/'+d.rows.staff_photo;
        },
        failure:function(form,action){

        }
    })
}

function show_image_doctor(id){
    Ext.Ajax.request({
        url: CLINIC_API  + 'docter/photo',
        method: 'GET',
        params: {
            id:id,
            group_id:5,
            key:key,
        },
        // headers : { Authorization : auth },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            if(d.success){
                Ext.getCmp("fotodokterthumb").el.dom.src = SITE_URL+'/upload/'+d.rows.staff_photo;
            }
           
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });
}

function show_form_schedule(doctor_id,schedule_id){

    var windowSchedule = Ext.getCmp('windowSchedule');
    
    Ext.getCmp('day_id').getStore().load();
    Ext.getCmp('status_Schedule').getStore().load();

    Ext.Ajax.request({
        url: CLINIC_API + 'docter/schedule_data',
        method:'GET',
        params: {
            schedule_id:schedule_id,
            doctor_id:doctor_id,
            key:key,
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            console.log(d);
            var data = d.rows;

            var f = Ext.getCmp('formSchedule').getForm();

            f.findField('schedule_id').setValue(data.schedule_id);
            f.findField('doctor_id').setValue(data.doctor_id);
            f.findField('day_id').setValue(data.day_id);
            f.findField('timesheet_1_start').setValue(data.timesheet_1_start);
            f.findField('timesheet_2_start').setValue(data.timesheet_2_start);
            f.findField('timesheet_3_start').setValue(data.timesheet_3_start);
            f.findField('timesheet_4_start').setValue(data.timesheet_4_start);
            f.findField('status_Schedule').setValue(data.status);
        },
        failure: function(form, action) {
            Ext.Msg.alert("Load failed", action.result.errorMessage);
        }
    })
    windowSchedule.show();
    Ext.getCmp('statusformSchedule').setValue('edit');
                
}

function view_schedule(staff_id){

    if (!Ext.isDefined(Ext.getCmp('WindowEntryPurchasingOrder'))) {
        var windows = Ext.create(dir_sys + 'docter.Windowdoctorschedule');
    }else {
        var windows = Ext.getCmp('Windowdoctorschedule');
    }
    

    windows.show();
    
    Ext.getCmp('doctor_id').setValue(staff_id);

    var store_schedule = Ext.getCmp('Griddoctorschedule').getStore();

    store_schedule.on('beforeload', function(store, operation, eOpts) {
        operation.params = {
            key:key,
            docter_id:staff_id
        };
    });

    store_schedule.load();
}

function setNumberDoctor(){

        Ext.Ajax.request({
        url: CLINIC_API + 'docter/doctorID',
        method:'GET',
        params: {
            idunit:idunit,
            key:key
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            console.log(d);
            // var data = d.rows;   
            Ext.getCmp('docter_staff_number').setValue(d.number);         
        },
        failure: function(form, action) {
            Ext.Msg.alert("Load failed", action.result.message);
        }
    })
   
}

function load_diagnosis(medical_record_id){

    Windowdiagnosis.show();

    Ext.getCmp('patient_type').getStore().load();
    Ext.getCmp('benefit_id_type').getStore().load();

    Ext.Ajax.request({
        url:CLINIC_API + 'docter/medical_record',
        method:'GET',
        params:{
            medical_record_id:medical_record_id,
            key
        },
        success:function(form,action){
            var d =Ext.decode(form.responseText);
            console.log(d)
            var data = d.rows[0];
            var form = Ext.getCmp('Formdiagnosa').getForm();

            form.findField('sales_id').setValue(data.sales_id*1);
            form.findField('medical_record_id').setValue(data.medical_record_id*1);
            form.findField('medical_record_no').setValue(data.medical_record_no);
            form.findField('patient_id').setValue(data.patient_id);
            form.findField('benefit_id_type').setValue(data.benefit_id_type*1);
            form.findField('patient_type').setValue(data.patient_type_id*1);
            form.findField('patient_name').setValue(data.patient_name);
            form.findField('medical_record_date').setValue(data.medical_record_date);
            form.findField('medical_record_desc').setValue(data.medical_record_desc);
            form.findField('staff_id_diagnossis').setValue(data.doctor_id*1);
            form.findField('doctor_name_diagnosis').setValue(data.doctor_name);
            form.findField('service_amount').setValue(renderNomor2(data.service_amount));

            // medical_record_desc
        },
        failure:function(form,action){

        }
    });

    var disease = Ext.getCmp('Gridrecorddisease').getStore();
    
    disease.on('beforeload', function(store, operation, eOpts) {
        operation.params = {
            'key':key,
            'medical_record_id':medical_record_id
        };
    });
    
    disease.load();

    var action = Ext.getCmp('Gridrecordaction').getStore();

    action.on('beforeload', function(store, operation, eOpts) {
        operation.params = {
            'key':key,
            'medical_record_id':medical_record_id
        };
    });    

    action.load();

    var drug = Ext.getCmp('Gridrecorddrug').getStore();

    drug.on('beforeload', function(store, operation, eOpts) {
        operation.params = {
            'key':key,
            'medical_record_id':medical_record_id,
            'business_id':'10,12'
        };
    });

    drug.load();

    var drug_alkes = Ext.getCmp('GridrecorddrugAlkes').getStore();

    drug_alkes.on('beforeload', function(store, operation, eOpts) {
        operation.params = {
            'key':key,
            'medical_record_id':medical_record_id,
            'business_id':'13,15'
        };
    });

    drug_alkes.load();
}