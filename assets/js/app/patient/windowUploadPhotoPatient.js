var formUploadPhotoImage = Ext.create('Ext.form.Panel', {
        id: 'formUploadPhotoImage',
        // width: 740,
        // height: 240,
        url: SITE_URL + 'patient/update_photo_patient',
        bodyStyle: 'padding:5px',
        labelAlign: 'top',
        autoScroll: true,
        fieldDefaults: {
            msgTarget: 'side',
            blankText: 'Tidak Boleh Kosong',
            labelWidth: 150
            // width: 400
        },
        items: [
        {
            xtype:'hiddenfield',
            name:'key',
            value:key
        },
        {
            xtype: 'filefield',
            fieldLabel: 'Pilih Berkas',
            name: 'photo_image',
            // id: 'filexlsxUploadPerencanaanXlsx',
            anchor: '50%'
        },
         Ext.panel.Panel({
            // title:'Informasi',
            html: 'Max Size : 800 Kb with allowed dimension 900 x 1500 pixel'
        })],
        buttons: [
       '->',
        {
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowUploadPhotoImage');
                Ext.getCmp('formUploadPhotoImage').getForm().reset();
                win.hide();
            }
        }, {
            text: 'Unggah',
            handler: function() {
                var msg = Ext.MessageBox.wait('Sedang memproses...');
                var form = this.up('form').getForm();
                if (form.isValid()) {
                        form.submit({
                            params: {id:Ext.getCmp('patient_id').getValue(),key:key,id_member:Ext.getCmp('member_id').getValue()},
                            success: function(form, action) {
                                var obj = JSON.parse(action.response.responseText);
                                var win = Ext.getCmp('windowUploadPhotoImage');
                                
                                // console.log(obj.data)

                                var id = obj.patient_id*1;
                                var member_id = Ext.getCmp('member_id').getValue();
                                
                                if(obj.success){
                                    console.log(id)
                                    if(Ext.getCmp('patient_id').getValue()==null){
                                        alert('xxx');
                                        Ext.getCmp('patient_id').setValue(id)
                                    }
                                    win.hide();
                                    Ext.Msg.alert('Informasi','Unggah data diri berhasil');

                                    show_image(id,member_id);
                                } else {
                                    if(Ext.getCmp('patient_id').getValue() == " "){
                                        alert('xxx');
                                        Ext.getCmp('patient_id').setValue(id)
                                    }
                                    Ext.Msg.alert('Informasi',obj.message);
                                    show_image(id,member_id);
                                }
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('Upload Data Gagal', action.result ? action.result.message : 'No response');
                                // msg.hide();
                //                            storeGridSetupTax.load();
                            }

                        });
                    } else {
                        Ext.Msg.alert("Error!", "Your form is invalid!");
                    }
            }
        }]
});

Ext.define(dir_sys + 'patient.windowUploadPhotoPatient', {
    // width: 850,
    extend: 'Ext.window.Window',
// var winUploadPhotoMember = Ext.create('widget.window', {
    id: 'windowUploadPhotoImage',
    title: 'Unggah Foto Pasien',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formUploadPhotoImage]
})