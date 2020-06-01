var TabmedicalRecord  = Ext.create(dir_sys +'docter.TabmedicalRecord');
var wPatientPopup     = Ext.create(dir_sys + 'docter.wPatientPopup');
var wDocterpopup      = Ext.create(dir_sys + 'docter.wDocterpopup');

Ext.define(dir_sys + 'docter.Formdiagnosa', {
    extend: 'Ext.form.Panel',
    alias: 'widget.Formdiagnosa',
    id: 'Formdiagnosa',
    width:panelW,
    height:panelH,
    bodyStyle: 'padding:5px',
    forceFit: true,
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 150,
        width: 380
    },
    layout: 'hbox',
    defaults: {
        padding: '5 10 5 5',
    },
    items: [
         {
            xtype:'hiddenfield',
            name:'medical_record_id',
            id:'medical_record_id',
         },{
            xtype:'hiddenfield',
            name:'sales_id',
            id:'sales_id',
         },{
            xtype: 'container',
            flex: 1,
            layout: 'anchor',
            defaultType: 'textfield',
            defaults: {
                // padding: '5 10 5 5',
                labelWidth: 120,
                width: 450
            },
            items: [
            {
                fieldLabel: 'No Rekam Medis',
                allowBlank: false,
                id: 'medical_record_no',
                name: 'medical_record_no',
                // anchor: '100%',
                width: 300,
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            setNoArticle(idunit, 'medical_record_id', 'medical_record_no', 'medical_record', 'medical_record_no', 'RECMED');
                                   
                        });
                    }
                }
            },
            {
                xtype:'hiddenfield',
                name:'patient_id',
                id:'patient_id_diagnossis',
            },
            {
                xtype:'hiddenfield',
                name:'doctor_id',
                id:'staff_id_diagnossis',
            },
            {
                fieldLabel: 'Dokter',
                allowBlank: false,
                id: 'doctor_name_diagnosis',
                name: 'doctor_name',
                width: 450,
                listeners:{
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            wDocterpopup.show();
                            Ext.getCmp('GridDocterpopupID').getStore().extraParams = {};
                            Ext.getCmp('GridDocterpopupID').getStore().load();
                        });
                    }
                }
            },
            // {
            //     fieldLabel: 'Biaya Dokter',
            //     allowBlank: false,
            //     id: 'fee_per_patient',
            //     name: 'service_amount',
            //     fieldStyle:'text-align:right',
            //     width: 300,  
            // },
            {
                xtype:'hiddenfield',
                name:'member_id',
                id:'member_id_diagnossis',
            },
            {
                fieldLabel: 'Pasien',
                allowBlank: false,
                id: 'patient_diagnosis_name',
                name: 'patient_name',
                width: 450,
                listeners:{
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            wPatientPopup.show();
                            Ext.getCmp('GridPatientPopupID').getStore().extraParams = {};
                            Ext.getCmp('GridPatientPopupID').getStore().load();
                        });
                    }
                }
            },
            {
                xtype:'comboxbenefitType',
                id: 'benefit_id_type',
                name: 'benefit_id_type',
                width: 300,
            },
            {
                xtype:'comboxpasientype',
                fieldLabel: 'Jenis Pasien',
                allowBlank: false,
                id: 'patient_type',
                name: 'patient_type',
                allowBlank: false,
                width: 300,
                readOnly:true
            },
            {
                xtype:'datefield',
                name:'medical_record_date',
                fieldLabel: 'Tanggal',
                allowBlank: false,
                id:'medical_record_date',
                format:'d-m-Y',
                width: 300,
            },
            {
                xtype: 'textarea',
                fieldLabel: 'Diagnosa/Catatan',
                name: 'medical_record_desc',
                id: 'medical_record_desc',
                width: 750,
            },
            // {
            //     xtype:'Gridrecorddisease'
            // },{
            //     xtype:'Gridrecordaction'
            // },
            {
                xtype:'TabmedicalRecord',
                width: '100%',
            }
        ]
    }]
});