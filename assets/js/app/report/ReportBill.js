// var WindowProductinputPopup = Ext.create(dir_sys+'report.WindowProductinputPopup');

Ext.define(dir_sys + 'report.ReportBill', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ReportBill',
    id: 'ReportBill',
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
                            var startdate = Ext.getCmp('startdate_bill').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_bill').getSubmitValue();
                            var business_id = Ext.getCmp('business_id_bill').getSubmitValue();
                            var benefit_id = Ext.getCmp('benefit_id_type_bill').getSubmitValue();

                            if(startdate=='' && enddate==''){
                                Ext.Msg.alert("Info", 'Periode belum ditentukan');
                            } else {
                                Ext.getCmp('ReportBill').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/medical_billing_report/print/" + startdate + "/" + enddate+ "/" +business_id+ "/" +benefit_id+"'>");
                            }
                        }
                    }
                },{
                    xtype: 'button',
                    text: 'Export Excel',
                    iconCls: 'page_excel',
                    listeners: {
                        click: function(component) {
                            var startdate = Ext.getCmp('startdate_bill').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_bill').getSubmitValue();
                            var business_id = Ext.getCmp('business_id_bill').getSubmitValue();
                            var benefit_id = Ext.getCmp('benefit_id_type_bill').getSubmitValue();

                            if(startdate=='' && enddate==''){
                                Ext.Msg.alert("Info", 'Periode belum ditentukan');
                            } else {
                                Ext.getCmp('ReportBill').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/medical_billing_report/excel/" + startdate + "/" + enddate+ "/" +business_id+ "/" +benefit_id+"'>");
                            }
                        }
                    }
                } 
            ]
    },{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'datefield',
                    id: 'startdate_bill',
                    format: 'd-m-Y',
                    value:new Date(),
                    labelWidth: 50,
                    fieldLabel: 'Periode'
                },'s/d',
                {
                    xtype: 'datefield',
                    id: 'enddate_bill',
                    format: 'd-m-Y',
                    value:new Date(),
                    labelWidth: 90,
                    hideLabel:true
                },
                {
                    xtype: 'comboxBusinessUnitpatient',
                    fieldLabel:'Unit',
                    id: 'business_id_bill',
                    labelWidth: 50,
                    width:225,
                    listeners:{
                        render:function(){
                          Ext.getCmp('business_id_bill').getStore().load();
                        }
                    }
                }]
            },{
                xtype:'toolbar',
                dock:'top',
                items:[
                {
                    xtype:'comboxbenefitType',
                    id: 'benefit_id_type_bill',
                    name: 'benefit_id_type',
                    labelWidth: 50,
                    width: 200,
                    // listeners:{
                    //     render:function(){
                    //       Ext.getCmp('benefit_id_type_bill').getStore().load();
                    //     }
                    // }
                },
                {
                    xtype: 'button',
                    text: 'Search',
                    // iconCls: 'report_key',
                    listeners: {
                        click: function(component) {
                            var startdate = Ext.getCmp('startdate_bill').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_bill').getSubmitValue();
                            var business_id = Ext.getCmp('business_id_bill').getSubmitValue();
                            var benefit_id = Ext.getCmp('benefit_id_type_bill').getSubmitValue();
                            console.log(benefit_id)

                            if(startdate=='' && enddate==''){
                                Ext.Msg.alert("Info", 'Periode belum ditentukan');
                            } else {
        
                                Ext.getCmp('ReportBill').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportBill' src='"+SITE_URL+"laporan/medical_billing_report/view/"+ startdate + "/" + enddate +"/"+business_id+"/"+benefit_id+"'>");
                            }
                           
                        }
                    }
                }
                ,{
                    xtype: 'button',
                    text: 'Clear Filter',
                    // iconCls: 'report_key',
                    listeners: {
                        click: function(component) {

                            Ext.getCmp('startdate_bill').setValue();
                            Ext.getCmp('enddate_bill').setValue();
                            Ext.getCmp('business_id_bill').setValue();
                            Ext.getCmp('benefit_id_type_bill').setValue();

                            var startdate = Ext.getCmp('startdate_bill').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_bill').getSubmitValue();
                            var business_id = Ext.getCmp('business_id_bill').getSubmitValue();
                            var benefit_id = Ext.getCmp('benefit_id_type_bill').getSubmitValue();
                            
                            Ext.getCmp('ReportBill').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/medical_billing_report/view/"+ startdate + "/" + enddate +"/"+business_id+"/"+benefit_id+"'>");
                        }
                    }
                }
                ]
        }],
//    html: "<iframe id='iframeReportNeracaSaldo' src='"+SITE_URL+"aktiva'/>"
});
