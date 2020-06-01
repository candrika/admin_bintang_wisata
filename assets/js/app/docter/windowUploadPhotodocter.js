var formUploadPhotodocterDocter = Ext.create('Ext.form.Panel', {
        id: 'formUploadPhotodocterDocter',
        // width: 740,
        // height: 240,
        url: SITE_URL + 'docter/update_photo_docter',
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
            name: 'staff_photo',
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
                var win = Ext.getCmp('windowUploadPhotodocter');
                Ext.getCmp('formUploadPhotodocterDocter').getForm().reset();
                win.hide();
            }
        }, {
            text: 'Unggah',
            handler: function() {
                var msg = Ext.MessageBox.wait('Sedang memproses...');
                var form = this.up('form').getForm();
                if (form.isValid()) {
                        form.submit({
                            params: {
                                    id:Ext.getCmp('staff_id').getValue(),
                                    key:key
                            },
                            success: function(form, action) {
                                var obj = JSON.parse(action.response.responseText);
                                var win = Ext.getCmp('windowUploadPhotodocter');
                                
                                // console.log(obj.data)

                                var id = obj.staff_id*1;
                               
                                
                                if(obj.success){
                                    console.log(id)
                                    if(Ext.getCmp('staff_id').getValue()==null){
                                        alert('xxx');
                                        Ext.getCmp('staff_id').setValue(id)
                                    }
                                    win.hide();
                                    Ext.Msg.alert('Informasi','Unggah data diri berhasil');

                                    show_image_doctor(id);
                                } else {
                                    if(Ext.getCmp('staff_id').getValue() == " "){
                                        alert('xxx');
                                        Ext.getCmp('staff_id').setValue(id)
                                    }
                                    Ext.Msg.alert('Informasi',obj.message);
                                    show_image_doctor(id);
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

Ext.define(dir_sys + 'docter.windowUploadPhotodocter', {
    // width: 850,
    extend: 'Ext.window.Window',
// var winUploadPhotoMember = Ext.create('widget.window', {
    id: 'windowUploadPhotodocter',
    title: 'Unggah Foto Perawat',
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
    items: [formUploadPhotodocterDocter]
})