function detail_perawat(staff_id){

    // if(member_id==null){
    //     Ext.getCmp('BtnnurseGridSimpan').setDisabled(false);
    // }else{
    //     Ext.getCmp('BtnnurseGridSimpan').setDisabled(true);
    // }

    Windowperawat.show();

    Ext.getCmp('polytpe_id').getStore().load();
    Ext.getCmp('location_id').getStore().load();
    Ext.getCmp('status_nurse').getStore().load();

    Ext.getCmp("nurse_password").hide();    
    Ext.getCmp("nursechagepassword").show();
    
    Ext.Ajax.request({
        url:CLINIC_API+'nurse/data',
        method:'GET',
        params:{
            key:key,
            // idunit:idunit,
            staff_id:staff_id,
            query:null,
            group_id:4
        },
        success:function(form,action){
            var d = Ext.decode(form.responseText)
            
            Ext.getCmp("photonurseupload").enable();

            Ext.getCmp('staff_id').setValue(d.rows.staff_id);
            Ext.getCmp('staff_id_Pass').setValue(d.rows.staff_id);
            Ext.getCmp('staff_name').setValue(d.rows.staff_name);
            Ext.getCmp('status_nurse').setValue(d.rows.status);
            Ext.getCmp('staff_number').setValue(d.rows.staff_number);
            Ext.getCmp('no_identity').setValue(d.rows.no_identity);
            Ext.getCmp('staff_mobilephone').setValue(d.rows.staff_mobilephone);
            Ext.getCmp('staff_whatsapp').setValue(d.rows.staff_whatsapp);
            Ext.getCmp('staff_email').setValue(d.rows.staff_email); 
            Ext.getCmp('polytpe_id').setValue(d.rows.polytpe_id);
            
            if(d.rows.location_id*1!=null){
                console.log(d.rows.location_id)
                Ext.getCmp('location_id').setValue(d.rows.location_id);
            }else{
                Ext.getCmp('location_id').setValue();
            }
            
            Ext.getCmp('staff_address').setValue(d.rows.staff_address);
            Ext.getCmp('account_number').setValue(d.rows.account_number);
            Ext.getCmp('bank_name').setValue(d.rows.bank_name);
            Ext.getCmp('account_number').setValue(d.rows.account_number);
            Ext.getCmp('account_name').setValue(d.rows.account_name);
            Ext.getCmp("fotoperawatthumb").el.dom.src = SITE_URL+'/upload/'+d.rows.staff_photo;
        },
        failure:function(form,action){

        }
    })
}

function show_image_nurse(id){
    Ext.Ajax.request({
        url: CLINIC_API  + 'nurse/photo',
        method: 'GET',
        params: {
            id:id,
            group_id:4,
            key:key,
        },
        // headers : { Authorization : auth },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            if(d.success){
                Ext.getCmp("fotoperawatthumb").el.dom.src = SITE_URL+'/upload/'+d.rows.staff_photo;
            }
           
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });
}

function setNumberNurse(){

        Ext.Ajax.request({
        url: CLINIC_API + 'nurse/nurseID',
        method:'GET',
        params: {
            idunit:idunit,
            key:key
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            console.log(d);
            // var data = d.rows;   
            Ext.getCmp('staff_number').setValue(d.number);         
        },
        failure: function(form, action) {
            Ext.Msg.alert("Load failed", action.result.message);
        }
    })
   
}