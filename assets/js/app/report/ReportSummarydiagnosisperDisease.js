Ext.define(dir_sys + 'report.ReportSummarydiagnosisperDisease', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ReportSummarydiagnosisperDisease',
    id: 'ReportSummarydiagnosisperDisease',
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
                            var startdate = Ext.getCmp('startdate_perDisease').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_perDisease').getSubmitValue();
                            // var status = Ext.getCmp('perDisease_status').getChecked()[0];

                            if(startdate=='' && enddate==''){
                                Ext.Msg.alert("Info", 'Periode belum ditentukan');
                            } else {
                                Ext.getCmp('ReportSummarydiagnosisperDisease').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/disease_summary/" + startdate + "/" + enddate +"/print'>");
                            }
                        }
                    }
                },{
                    xtype: 'button',
                    text: 'Export Excel',
                    iconCls: 'page_excel',
                    listeners: {
                        click: function(component) {
                            var startdate = Ext.getCmp('startdate_perDisease').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_perDisease').getSubmitValue();
                            // var status = Ext.getCmp('perDisease_status').getChecked()[0];

                            if(startdate=='' && enddate==''){
                                Ext.Msg.alert("Info", 'Periode belum ditentukan');
                            } else {
                                Ext.getCmp('ReportSummarydiagnosisperDisease').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/disease_summary/" + startdate + "/" + enddate + "/excel'>");
                            }
                        }
                    }
                } 
            ]
    },{
        xtype:'toolbar',
        dock:'top',
        items:[{
            xtype: 'fieldcontainer',
            fieldLabel: 'Periode',
            defaultType: 'checkboxfield',
            items: [{

                    boxLabel  : 'Semua Periode',
                    labelWidth: 25,
                    id        : 'periode_actionDisease',
                    listeners:{
                        render: function(component) {
                            component.getEl().on('click', function(event, el) {
                               
                                if(Ext.getCmp('periode_actionDisease').getValue()==true){
                                    Ext.getCmp('toolbarDisease1').disable();

                                }else{
                                    Ext.getCmp('toolbarDisease1').enable();

                                } 

                                Ext.getCmp('startdate_perDisease').setValue(null);
                                Ext.getCmp('enddate_perDisease').setValue(null)

                                var startdate = Ext.getCmp('startdate_perDisease').getValue();
                                var enddate   = Ext.getCmp('enddate_perDisease').getValue();

                                Ext.getCmp('ReportSummarydiagnosisperDisease').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/disease_summary/" + startdate + "/" + enddate +"/view'>");      
                            });
                        }
                    }
            }]
        }]
    },{
            xtype: 'toolbar',
            id:'toolbarDisease1',
            dock: 'top',
            items: [
                {
                    xtype: 'datefield',
                    id: 'startdate_perDisease',
                    format: 'd-m-Y',
                    value:new Date(),
                    labelWidth: 100,
                    fieldLabel: 'Tanggal Mulai'
                },'s/d',
                {
                    xtype: 'datefield',
                    id: 'enddate_perDisease',
                    format: 'd-m-Y',
                    value:new Date(),
                    labelWidth: 90,
                    hideLabel:true
                },
                // {
                //     xtype: 'radiogroup',
                //     id:'perDisease_status',
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
                            var startdate = Ext.getCmp('startdate_perDisease').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_perDisease').getSubmitValue();
                            // var status = Ext.getCmp('perDisease_status').getChecked()[0];
                            // console.log(status.inputValue)

                            if(startdate=='' && enddate==''){
                                Ext.Msg.alert("Info", 'Periode belum ditentukan');
                            } else {

                                if(Ext.getCmp('periode_actionDisease').getValue()==true){
                                  Ext.getCmp('periode_actionDisease').setValue(false)
                                }
                                Ext.getCmp('ReportSummarydiagnosisperDisease').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/disease_summary/" + startdate + "/" + enddate +"/view'>");
                            }
                           
                        }
                    }
                },{
                    xtype: 'button',
                    text: 'Clear Filter',
                    // iconCls: 'report_key',
                    listeners: {
                        click: function(component) {

                            Ext.getCmp('startdate_perDisease').setValue();
                            Ext.getCmp('enddate_perDisease').setValue();

                            var startdate = Ext.getCmp('startdate_perDisease').getValue();
                            var enddate   = Ext.getCmp('enddate_perDisease').getValue();

                            if(Ext.getCmp('periode_actionDisease').getValue()==true){
                              Ext.getCmp('periode_actionDisease').setValue(false)
                            }
                            
                            Ext.getCmp('ReportSummarydiagnosisperDisease').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/disease_summary/" + startdate + "/" + enddate +"/view'>");
                        }
                    }
                }]
        }],
//    html: "<iframe id='iframeReportNeracaSaldo' src='"+SITE_URL+"aktiva'/>"
});
