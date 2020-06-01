Ext.define(dir_sys + 'report.ReportSummarySalesunpaid', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ReportSummarySalesunpaid',
    id: 'ReportSummarySalesunpaid',
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
                            var startdate = Ext.getCmp('startdate_Salesunpaid').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_Salesunpaid').getSubmitValue();
                            // var status = Ext.getCmp('Salesunpaid_status').getChecked()[0];

                            if(startdate=='' && enddate==''){
                                Ext.Msg.alert("Info", 'Periode belum ditentukan');
                            } else {
                                Ext.getCmp('ReportSummarySalesunpaid').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/sales_unpaid_summary/print/" + startdate + "/" + enddate +"'>");
                            }
                        }
                    }
                },{
                    xtype: 'button',
                    text: 'Export Excel',
                    iconCls: 'page_excel',
                    listeners: {
                        click: function(component) {
                            var startdate = Ext.getCmp('startdate_Salesunpaid').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_Salesunpaid').getSubmitValue();
                            // var status = Ext.getCmp('Salesunpaid_status').getChecked()[0];

                            if(startdate=='' && enddate==''){
                                Ext.Msg.alert("Info", 'Periode belum ditentukan');
                            } else {
                                Ext.getCmp('ReportSummarySalesunpaid').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/sales_unpaid_summary/excel/" + startdate + "/" + enddate + "'>");
                            }
                        }
                    }
                } 
            ]
    }, {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'datefield',
                    id: 'startdate_Salesunpaid',
                    format: 'd-m-Y',
                    value:new Date(),
                    labelWidth: 50,
                    fieldLabel: 'Periode'
                },'s/d',
                {
                    xtype: 'datefield',
                    id: 'enddate_Salesunpaid',
                    format: 'd-m-Y',
                    value:new Date(),
                    labelWidth: 90,
                    hideLabel:true
                },
                // {
                //     xtype: 'radiogroup',
                //     id:'Salesunpaid_status',
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
                            var startdate = Ext.getCmp('startdate_Salesunpaid').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_Salesunpaid').getSubmitValue();
                            // var status = Ext.getCmp('Salesunpaid_status').getChecked()[0];
                            // console.log(status.inputValue)

                            if(startdate=='' && enddate==''){
                                Ext.Msg.alert("Info", 'Periode belum ditentukan');
                            } else {
                                Ext.getCmp('ReportSummarySalesunpaid').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/sales_unpaid_summary/view/" + startdate + "/" + enddate+"'>");
                            }
                           
                        }
                    }
                },{
                    xtype: 'button',
                    text: 'Clear Filter',
                    listeners: {
                        click: function(component) {
                            Ext.getCmp('startdate_Salesunpaid').setValue();
                            Ext.getCmp('enddate_Salesunpaid').setValue();
                            
                            var startdate = Ext.getCmp('startdate_Salesunpaid').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_Salesunpaid').getSubmitValue();

                            Ext.getCmp('ReportSummarySalesunpaid').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/sales_unpaid_summary/view/" + startdate + "/" + enddate +"'>");
                        }
                    } 
                }]
        }],
//    html: "<iframe id='iframeReportNeracaSaldo' src='"+SITE_URL+"aktiva'/>"
});
