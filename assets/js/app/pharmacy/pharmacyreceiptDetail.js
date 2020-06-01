if(!Ext.isDefined(Ext.getCmp('DrugreceiptGrid'))){
    var DrugreceiptGrid    = Ext.create(dir_sys + 'pharmacy.DrugreceiptGrid');
}else{
    var DrugreceiptGrid    = Ext.getCmp('DrugreceiptGrid');
}

Ext.define(dir_sys + 'pharmacy.pharmacyreceiptDetail', {
    extend: 'Ext.form.Panel',
    alias: 'widget.pharmacyreceiptDetail',
    id: 'pharmacyreceiptDetail',
    bodyStyle: 'padding:5px',
    forceFit: true,
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        //        padding: '5 40 5 5',
        labelWidth: 150,
        // anchor:'100%'
        width: 380
    },
    layout: 'vbox',
    defaults: {
        padding: '5 10 5 5',
    },
    items: [{
        xtype:'container',
        layout:'hbox',
        items:[{
            xtype:'fieldcontainer',
            items: [{
                    xtype: 'hiddenfield',
                    name:'key',
                    value:key
                    // id:'user_id_frm_member'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'medical_record_id',
                    id: 'medical_record_id_pharmacy'
                }, 
                {
                    xtype: 'hiddenfield',
                    name: 'doctor_id',
                    // id: 'medical_record_id_pharmacy'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'patient_type_id',
                    // id: 'medical_record_id_pharmacy'
                },  
                {
                    xtype: 'hiddenfield',
                    name: 'patient_id',
                    // id: 'medical_record_id_pharmacy'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'member_id',
                    // id: 'medical_record_id_pharmacy'
                }, 
                {
                    xtype: 'hiddenfield',
                    name: 'statuspharmacyreceiptDetail',
                    id: 'statuspharmacyreceiptDetail'
                }, 
                {
                    xtype: 'displayfield',
                    fieldLabel: 'No Resep',
                    allowBlank: false,
                    name: 'receipt_number',
                    // id: 'receipt_number'
                }, 
                {
                    xtype: 'displayfield',
                    allowBlank: false,
                    fieldLabel: 'No Rekam Medis',
                    name: 'medical_record_no',
                    // id: 'docter_staff_mobilephone'
                },
                {
                    xtype: 'displayfield',
                    allowBlank: false,
                    fieldLabel: 'Tanggal Diagnosa',
                    name: 'medical_record_date',
                    // id: 'docter_staff_whatsapp'
                },
                {
                    xtype: 'displayfield',
                    allowBlank: false,
                    fieldLabel: 'Nama Patient',
                    name: 'patient_name',
                    // id: ''
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Jenis Pasien',
                    allowBlank: false,
                    name: 'patient_type',
            }]
        },{
             xtype:'fieldcontainer',
             items: [
            
            {
                xtype: 'displayfield',
                allowBlank: false,
                fieldLabel: 'Nama Dokter',
                labelWidth: 150,
                name: 'doctor_name',
                // id: 'docter_account_number'
            },
            {
                xtype: 'hiddenfield',
                name: 'payment_status',
            },
            {
                xtype: 'displayfield',
                allowBlank: false,
                fieldLabel: 'Status Pembayaran',
                labelWidth: 150,
                name: 'payment',
                // id: 'docter_account_name'
            },{
                xtype: 'displayfield',
                // allowBlank: false,
                fieldLabel: 'Waktu Bayar',
                labelWidth: 150,
                name: 'payment_date',
                // id: 'docter_bank_name'  
            },{
                xtype:'comboxmedicineStatus',
                fieldLabel: 'Status Resep',
                labelWidth: 150,
                width:335,
                name:'medicine_status'
            }]
        }]
    },{
        xtype:'container',
        items:[{
            xtype:'DrugreceiptGrid'
        }]
    }]
});