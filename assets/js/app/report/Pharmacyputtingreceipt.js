// var WindowProductinputPopup = Ext.create(dir_sys+'report.WindowProductinputPopup');

Ext.define(dir_sys + 'report.Pharmacyputtingreceipt', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.Pharmacyputtingreceipt',
    id: 'Pharmacyputtingreceipt',
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
                            var startdate = Ext.getCmp('startdate_Pharmacyput').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_Pharmacyput').getSubmitValue();
                            var business_id = Ext.getCmp('business_id_Pharmacyput').getSubmitValue();
                            var benefit_id = Ext.getCmp('benefit_id_type_Pharmacyput').getSubmitValue();

                            if(startdate=='' && enddate==''){
                                Ext.Msg.alert("Info", 'Periode belum ditentukan');
                            } else {
                                Ext.getCmp('Pharmacyputtingreceipt').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/pharmacy_put/print/" + startdate + "/" + enddate+ "/" +business_id+ "/" +benefit_id+"'>");
                            }
                        }
                    }
                },{
                    xtype: 'button',
                    text: 'Export Excel',
                    iconCls: 'page_excel',
                    listeners: {
                        click: function(component) {
                            var startdate = Ext.getCmp('startdate_Pharmacyput').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_Pharmacyput').getSubmitValue();
                            var business_id = Ext.getCmp('business_id_Pharmacyput').getSubmitValue();
                            var benefit_id = Ext.getCmp('benefit_id_type_Pharmacyput').getSubmitValue();

                            if(startdate=='' && enddate==''){
                                Ext.Msg.alert("Info", 'Periode belum ditentukan');
                            } else {
                                Ext.getCmp('Pharmacyputtingreceipt').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/pharmacy_put/excel/" + startdate + "/" + enddate+ "/" +business_id+ "/" +benefit_id+"'>");
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
                    id: 'startdate_Pharmacyput',
                    format: 'd-m-Y',
                    value:new Date(),
                    labelWidth: 50,
                    fieldLabel: 'Periode'
                },'s/d',
                {
                    xtype: 'datefield',
                    id: 'enddate_Pharmacyput',
                    format: 'd-m-Y',
                    value:new Date(),
                    labelWidth: 90,
                    hideLabel:true
                },
                {
                    xtype: 'comboxBusinessUnitpatient',
                    fieldLabel:'Unit',
                    id: 'business_id_Pharmacyput',
                    labelWidth: 50,
                    width:225,
                    listeners:{
                        render:function(){
                          Ext.getCmp('business_id_Pharmacyput').getStore().load();
                        }
                    }
                }]
            },{
                xtype:'toolbar',
                dock:'top',
                items:[
                {
                    xtype:'comboxbenefitType',
                    id: 'benefit_id_type_Pharmacyput',
                    name: 'benefit_id_type',
                    labelWidth: 50,
                    width: 200,
                    // listeners:{
                    //     render:function(){
                    //       Ext.getCmp('benefit_id_type_Pharmacyput').getStore().load();
                    //     }
                    // }
                },
                {
                    xtype: 'button',
                    text: 'Search',
                    // iconCls: 'report_key',
                    listeners: {
                        click: function(component) {
                            var startdate = Ext.getCmp('startdate_Pharmacyput').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_Pharmacyput').getSubmitValue();
                            var business_id = Ext.getCmp('business_id_Pharmacyput').getValue();
                            var benefit_id = Ext.getCmp('benefit_id_type_Pharmacyput').getValue();
                            console.log(benefit_id)

                            if(startdate=='' && enddate=='' && product_id==''){
                                Ext.Msg.alert("Info", 'Periode belum ditentukan');
                            } else {
                                
                                // Ext.getCmp('product_id_filter').setValue();
                                // var product_id = Ext.getCmp('product_id_filter').getValue();

                                Ext.getCmp('Pharmacyputtingreceipt').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/pharmacy_put/view/"+ startdate + "/" + enddate +"/"+business_id+"/"+benefit_id+"'>");
                            }
                           
                        }
                    }
                },
                {
                    xtype: 'button',
                    text: 'Clear Filter',
                    // iconCls: 'report_key',
                    listeners: {
                        click: function(component) {

                            Ext.getCmp('startdate_Pharmacyput').setValue();
                            Ext.getCmp('enddate_Pharmacyput').setValue();
                            Ext.getCmp('business_id_Pharmacyput').setValue();
                            Ext.getCmp('benefit_id_type_Pharmacyput').setValue();
                            
                            var startdate =Ext.getCmp('startdate_Pharmacyput').getSubmitValue();
                            var enddate = Ext.getCmp('enddate_Pharmacyput').getSubmitValue();
                            var business_id = Ext.getCmp('business_id_Pharmacyput').getSubmitValue();
                            var benefit_id = Ext.getCmp('benefit_id_type_Pharmacyput').getSubmitValue();
                            
                            console.log(startdate)
                            console.log(enddate)
                            console.log(business_id)
                            console.log(benefit_id)
                            
                            Ext.getCmp('Pharmacyputtingreceipt').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/pharmacy_put/view/" + startdate + "/" + enddate +"/"+business_id+"/"+benefit_id+"'>");
                        }
                    }
                }
                ]
        }],
//    html: "<iframe id='iframeReportNeracaSaldo' src='"+SITE_URL+"aktiva'/>"
});
