Ext.define(dir_sys + 'report.ReportSummarypatient', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ReportSummarypatient',
    id: 'ReportSummarypatient',
    // title: 'Penjualan Tunai', 
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                   '->',
                {
                    xtype: 'button',
                    text: 'Print',
                    // text: 'Print',
                    iconCls: 'acrobat',
                    listeners: {
                        click: function(component) {
                            var startdate = Ext.getCmp('startdate_patient').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_patient').getSubmitValue();
                            // var status = Ext.getCmp('patient_status').getChecked()[0];

                            if(startdate=='' && enddate==''){
                                Ext.Msg.alert("Info", 'Periode belum ditentukan');
                            } else {
                                Ext.getCmp('ReportSummarypatient').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/patient_summary/print/" + startdate + "/" + enddate +"'>");
                            }
                        }
                    }
                },{
                    xtype: 'button',
                    text: 'Export Excel',
                    iconCls: 'page_excel',
                    listeners: {
                        click: function(component) {
                            var startdate = Ext.getCmp('startdate_patient').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_patient').getSubmitValue();
                            // var status = Ext.getCmp('patient_status').getChecked()[0];

                            if(startdate=='' && enddate==''){
                                Ext.Msg.alert("Info", 'Periode belum ditentukan');
                            } else {
                                Ext.getCmp('ReportSummarypatient').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/patient_summary/excel/" + startdate + "/" + enddate + "'>");
                            }
                        }
                    }
                } 
            ]
    },{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            xtype: 'fieldcontainer',
            fieldLabel: 'Periode',
            defaultType: 'checkboxfield',
            items: [{
                boxLabel  : 'Semua Periode',
                labelWidth: 25,
                id        : 'periode_patientDiagnosa',
                listeners:{
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {

                            if(Ext.getCmp('periode_patientDiagnosa').getValue()==true){
                                Ext.getCmp('toolbarpatient').disable()
                            }else{
                                Ext.getCmp('toolbarpatient').enable();
                            }

                            Ext.getCmp('startdate_patient').setValue(null);
                            Ext.getCmp('enddate_patient').setValue(null);
                            
                            var startdate = Ext.getCmp('startdate_patient').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_patient').getSubmitValue();

                            Ext.getCmp('ReportSummarypatient').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/patient_summary/view/" + startdate + "/" + enddate +"'>");
                        })
                    }
                }
             }]           
        }]
    },{
            xtype: 'toolbar',
            id: 'toolbarpatient',
            dock: 'top',
            items: [
                {
                    xtype: 'datefield',
                    id: 'startdate_patient',
                    format: 'd-m-Y',
                    value:new Date(),
                    labelWidth: 100,
                    fieldLabel: 'Tanggal Mulai'
                },'s/d',
                {
                    xtype: 'datefield',
                    id: 'enddate_patient',
                    format: 'd-m-Y',
                    value:new Date(),
                    labelWidth: 90,
                    hideLabel:true
                },
                // {
                //     xtype: 'radiogroup',
                //     id:'patient_status',
                //     labelWidth: 50,
                //     width:350,
                //     allowBlank: false,
                //     fieldLabel: 'Status',
                //     columns: 3,
                //     items: [
                //         { boxLabel: 'Semua', name: 'status', inputValue: 0, checked:true, width:70 },
                //         { boxLabel: 'Lunas', name: 'status', inputValue: 5, width:60},
                //         { boxLabel: 'Belum Lunas', name: 'status', inputValue: 4}
                //     ],
                //     listeners: {
                //         change: function (field, newValue, oldValue) {
                //             switch (parseInt(newValue['interest_type'])) {
                //                 case 1:
                //                     Ext.getCmp('container_interest').show();
                //                     break;
                //                 case 4:
                //                     Ext.getCmp('container_interest').hide();
                //                     break;
                //             }
                //         }
                //     }
                // },
                {
                    xtype: 'button',
                    text: 'Search',
                    // iconCls: 'report_key',
                    listeners: {
                        click: function(component) {
                            var startdate = Ext.getCmp('startdate_patient').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_patient').getSubmitValue();
                            // var status = Ext.getCmp('patient_status').getChecked()[0];
                            // console.log(status.inputValue)

                            if(startdate=='' && enddate==''){
                                Ext.Msg.alert("Info", 'Periode belum ditentukan');
                            } else {
                                Ext.getCmp('ReportSummarypatient').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/patient_summary/view/" + startdate + "/" + enddate +"'>");
                            }
                           
                        }
                    }
                },{
                    xtype: 'button',
                    text: 'Clear Filter',
                    listeners: {
                        click: function(component) {
                            
                            Ext.getCmp('startdate_patient').setValue(null);
                            Ext.getCmp('enddate_patient').setValue(null);
                        
                            var startdate = Ext.getCmp('startdate_patient').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_patient').getSubmitValue();

                            Ext.getCmp('ReportSummarypatient').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/patient_summary/view/" + startdate + "/" + enddate +"'>");

                        }
                    }
                }]
        }],
//    html: "<iframe id='iframeReportNeracaSaldo' src='"+SITE_URL+"aktiva'/>"
});
