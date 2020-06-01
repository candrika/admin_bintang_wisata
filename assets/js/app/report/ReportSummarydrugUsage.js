var WindowProductinputPopup = Ext.create(dir_sys+'report.WindowProductinputPopup');

Ext.define(dir_sys + 'report.ReportSummarydrugUsage', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ReportSummarydrugUsage',
    id: 'ReportSummarydrugUsage',
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
                            var startdate = Ext.getCmp('startdate_drugUsage').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_drugUsage').getSubmitValue();
                            // var status = Ext.getCmp('drugUsage_status').getChecked()[0];

                            if(startdate=='' && enddate==''){
                                Ext.Msg.alert("Info", 'Periode belum ditentukan');
                            } else {
                                Ext.getCmp('ReportSummarydrugUsage').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/drug_usage_summary/print/" + startdate + "/" + enddate +"'>");
                            }
                        }
                    }
                },{
                    xtype: 'button',
                    text: 'Export Excel',
                    iconCls: 'page_excel',
                    listeners: {
                        click: function(component) {
                            var startdate = Ext.getCmp('startdate_drugUsage').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_drugUsage').getSubmitValue();
                            // var status = Ext.getCmp('report_Sales_status').getChecked()[0];

                            if(startdate=='' && enddate==''){
                                Ext.Msg.alert("Info", 'Periode belum ditentukan');
                            } else {
                                Ext.getCmp('ReportSummarydrugUsage').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/drug_usage_summary/excel/" + startdate + "/" + enddate + "'>");
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
                    id: 'startdate_drugUsage',
                    format: 'd-m-Y',
                    value:new Date(),
                    labelWidth: 50,
                    fieldLabel: 'Periode'
                },'s/d',
                {
                    xtype: 'datefield',
                    id: 'enddate_drugUsage',
                    format: 'd-m-Y',
                    value:new Date(),
                    labelWidth: 90,
                    hideLabel:true
                },
                // {
                //     xtype: 'radiogroup',
                //     id:'drugUsage_status',
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
                    xtype:'textfield',
                    fieldLabel: 'Pilih Produk',
                    id:'product_name_filter',
                    widthLabel:50,
                    listeners:{
                        render: function(component) {
                            component.getEl().on('click', function(event, el) {
                                WindowProductinputPopup.show();
                                Ext.getCmp('ProductinputPopup').getStore().load()
                            });
                        }
                    }
                },
                {
                    xtype:'hiddenfield',
                    id:'product_id_filter',
                },
                {
                    xtype: 'button',
                    text: 'Search',
                    // iconCls: 'report_key',
                    listeners: {
                        click: function(component) {
                            var startdate = Ext.getCmp('startdate_drugUsage').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_drugUsage').getSubmitValue();
                            var product_id = Ext.getCmp('product_id_filter').getValue();
                            console.log(product_id)

                            if(startdate=='' && enddate=='' && product_id==''){
                                Ext.Msg.alert("Info", 'Periode belum ditentukan');
                            } else {
                                
                                // Ext.getCmp('product_id_filter').setValue();
                                // var product_id = Ext.getCmp('product_id_filter').getValue();

                                Ext.getCmp('ReportSummarydrugUsage').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/drug_usage_summary/view/"+ startdate + "/" + enddate +"/"+product_id+"'>");
                            }
                           
                        }
                    }
                },{
                    xtype: 'button',
                    text: 'Clear Filter',
                    // iconCls: 'report_key',
                    listeners: {
                        click: function(component) {

                            Ext.getCmp('startdate_drugUsage').setValue();
                            Ext.getCmp('enddate_drugUsage').setValue();
                            Ext.getCmp('product_id_filter').setValue();

                            Ext.getCmp('product_name_filter').setValue();

                            var startdate = Ext.getCmp('startdate_drugUsage').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_drugUsage').getSubmitValue();
                            var product_id = Ext.getCmp('product_id_filter').getValue();

                            console.log(product_id)
                            console.log(startdate)
                            console.log(enddate)
                            
                            Ext.getCmp('ReportSummarydrugUsage').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/drug_usage_summary/view/" + startdate + "/" + enddate +"/"+product_id+"'>");
                        }
                    }
                }]
        }],
//    html: "<iframe id='iframeReportNeracaSaldo' src='"+SITE_URL+"aktiva'/>"
});
