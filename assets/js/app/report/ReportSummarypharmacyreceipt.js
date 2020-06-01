Ext.define(dir_sys + 'report.ReportSummarypharmacyreceipt', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ReportSummarypharmacyreceipt',
    id: 'ReportSummarypharmacyreceipt',
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
                            var startdate = Ext.getCmp('startdate_pharmacyreceipt').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_pharmacyreceipt').getSubmitValue();
                            // var status = Ext.getCmp('pharmacyreceipt_status').getChecked()[0];

                            if(startdate=='' && enddate==''){
                                Ext.Msg.alert("Info", 'Periode belum ditentukan');
                            } else {
                                Ext.getCmp('ReportSummarypharmacyreceipt').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/pharmacy_receipt_summary/" + startdate + "/" + enddate +"/print'>");
                            }
                        }
                    }
                },{
                    xtype: 'button',
                    text: 'Export Excel',
                    iconCls: 'page_excel',
                    listeners: {
                        click: function(component) {
                            var startdate = Ext.getCmp('startdate_report_Sales').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_report_Sales').getSubmitValue();
                            // var status = Ext.getCmp('report_Sales_status').getChecked()[0];

                            if(startdate=='' && enddate==''){
                                Ext.Msg.alert("Info", 'Periode belum ditentukan');
                            } else {
                                Ext.getCmp('ReportSummarypharmacyreceipt').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/pharmacy_receipt_summary/" + startdate + "/" + enddate + "/excel'>");
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
                    id: 'startdate_pharmacyreceipt',
                    format: 'd-m-Y',
                    value:new Date(),
                    labelWidth: 50,
                    fieldLabel: 'Periode'
                },'s/d',
                {
                    xtype: 'datefield',
                    id: 'enddate_pharmacyreceipt',
                    format: 'd-m-Y',
                    value:new Date(),
                    labelWidth: 90,
                    hideLabel:true
                },
                // {
                //     xtype: 'radiogroup',
                //     id:'pharmacyreceipt_status',
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
                    text: 'Tampilkan Laporan',
                    iconCls: 'report_key',
                    listeners: {
                        click: function(component) {
                            var startdate = Ext.getCmp('startdate_pharmacyreceipt').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_pharmacyreceipt').getSubmitValue();
                            // var status = Ext.getCmp('pharmacyreceipt_status').getChecked()[0];
                            // console.log(status.inputValue)

                            if(startdate=='' && enddate==''){
                                Ext.Msg.alert("Info", 'Periode belum ditentukan');
                            } else {
                                Ext.getCmp('ReportSummarypharmacyreceipt').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/pharmacy_receipt_summary/" + startdate + "/" + enddate +"/view'>");
                            }
                           
                        }
                    }
                }]
        }],
//    html: "<iframe id='iframeReportNeracaSaldo' src='"+SITE_URL+"aktiva'/>"
});
