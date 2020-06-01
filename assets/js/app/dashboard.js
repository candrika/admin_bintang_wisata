var widthDashboard = panelW - 220;

window.generateData = function (n, floor) {
    var data = [],
            p = (Math.random() * 11) + 1,
            i;

    floor = (!floor && floor !== 0) ? 20 : floor;

    for (i = 0; i < (n || 12); i++) {
        data.push({
            name: Ext.Date.monthNames[i % 12],
            premi: Math.floor(Math.max((Math.random() * 100), floor)),
            earn: Math.floor(Math.max((Math.random() * 100), floor)),
            claim: Math.floor(Math.max((Math.random() * 100), floor)),
            data4: Math.floor(Math.max((Math.random() * 100), floor)),
            data5: Math.floor(Math.max((Math.random() * 100), floor)),
            data6: Math.floor(Math.max((Math.random() * 100), floor)),
            data7: Math.floor(Math.max((Math.random() * 100), floor)),
            data8: Math.floor(Math.max((Math.random() * 100), floor)),
            data9: Math.floor(Math.max((Math.random() * 100), floor))
        });
    }
    return data;
};

window.generateDataNegative = function (n, floor) {
    var data = [],
            p = (Math.random() * 11) + 1,
            i;

    floor = (!floor && floor !== 0) ? 20 : floor;

    for (i = 0; i < (n || 12); i++) {
        data.push({
            name: Ext.Date.monthNames[i % 12],
            premi: Math.floor(((Math.random() - 0.5) * 100), floor),
            earn: Math.floor(((Math.random() - 0.5) * 100), floor),
            claim: Math.floor(((Math.random() - 0.5) * 100), floor),
            data4: Math.floor(((Math.random() - 0.5) * 100), floor),
            data5: Math.floor(((Math.random() - 0.5) * 100), floor),
            data6: Math.floor(((Math.random() - 0.5) * 100), floor),
            data7: Math.floor(((Math.random() - 0.5) * 100), floor),
            data8: Math.floor(((Math.random() - 0.5) * 100), floor),
            data9: Math.floor(((Math.random() - 0.5) * 100), floor)
        });
    }
    return data;
};

window.store1 = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'premi', 'earn', 'claim', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
    data: generateData()
});

var chart = Ext.create('Ext.chart.Chart', {
    style: 'background:#fff',
    animate: true,
    title: 'Bussines Performance',
    store: store1,
    shadow: true,
    theme: 'Category1',
    legend: {
        position: 'right'
    },
    axes: [{
            type: 'Numeric',
            minimum: 0,
            position: 'left',
            fields: ['premi', 'earn', 'claim'],
            title: 'Number of Hits',
            minorTickSteps: 1,
            grid: {
                odd: {
                    opacity: 1,
                    fill: '#ddd',
                    stroke: '#bbb',
                    'stroke-width': 0.5
                }
            }
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['name'],
            title: 'Month of the Year'
        }],
    series: [{
            type: 'line',
            highlight: {
                size: 7,
                radius: 7
            },
            axis: 'left',
            xField: 'name',
            yField: 'premi',
            markerConfig: {
                type: 'cross',
                size: 4,
                radius: 4,
                'stroke-width': 0
            }
        }, {
            type: 'line',
            highlight: {
                size: 7,
                radius: 7
            },
            axis: 'left',
            smooth: true,
            xField: 'name',
            yField: 'earn',
            markerConfig: {
                type: 'circle',
                size: 4,
                radius: 4,
                'stroke-width': 0
            }
        }, {
            type: 'line',
            highlight: {
                size: 7,
                radius: 7
            },
            axis: 'left',
            smooth: true,
//                fill: true, 
            xField: 'name',
            yField: 'claim',
            markerConfig: {
                type: 'circle',
                size: 4,
                radius: 4,
                'stroke-width': 0
            }
        }]
});


//////////////////////
store1.loadData(generateData(8));

   var chart2 = Ext.create('Ext.chart.Chart', {
            style: 'background:#fff',
            animate: true,
            theme: 'Category1',
            store: store1,
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['claim', 'earn', 'premi'],
                title: 'Number of Hits',
                grid: true
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['name'],
                title: 'Month of the Year'
            }],
            series: [{
                type: 'column',
                axis: 'left',
                xField: 'name',
                yField: 'claim',
                markerConfig: {
                    type: 'cross',
                    size: 3
                }
            }, {
                type: 'scatter',
                axis: 'left',
                xField: 'name',
                yField: 'earn',
                markerConfig: {
                    type: 'circle',
                    size: 5
                }
            }, {
                type: 'line',
                axis: 'left',
                smooth: true,
                fill: true,
                fillOpacity: 0.5,
                xField: 'name',
                yField: 'premi'
            }]
        });
        
/////////////////////

if (group_id == 1)
{
    //administrator
    var panelClaimPending = true;
    var panelDataPending = true;
    var panelEmEpPending = true;
    var panelEndorPending = true;
    var panelPengantarMedis = true;
    var panelNewDecline = true;
} else {
    var panelClaimPending = false;
    var panelDataPending = false;
    var panelEmEpPending = false;
    var panelEndorPending = false;
}

if(group_id==2 || group_id==3)
{
    //maker
    var panelPengantarMedis = false;
    var panelNewDecline = false;
} else  if(group_id==3)
{
    //checker
    var panelPengantarMedis = false;
    var panelNewDecline = false;
}  else  if(group_id==6)
{
    //broker
    var panelPengantarMedis = true;
    var panelNewDecline = true;
} else  if(group_id==4)
{
    //asuransi
    var panelPengantarMedis = true;
    var panelNewDecline = true;
}

Ext.define('mydashboard', {
    extend: 'Ext.Container',
    xtype: 'basic-panels',
    alias: 'widget.mydashboard',
    id: 'mydashboard',
    title: 'Dashboard',
    autoWidth: true,
    autoScroll: true,
    //width: 660,
    requires: [
        'Ext.layout.container.Table'
    ],
    layout: {
        type: 'table',
        columns: 2,
        tdAttrs: {style: 'padding: 5px;'}
    },
    defaults: {
        //ui: 'blue-panel',
        //frame:true,
        xtype: 'panel',
        width: widthDashboard / 2,
        //width: 200,
        height: 200,
        bodyPadding: 0
    },
    initComponent: function () {
        this.items = [
            {
                xtype: 'GridDashPendingData',
                collapsible: true,
                border:true,
                hidden: panelDataPending,
                tools: [
//                    { 
//                        type:'search',
//                        tooltip: 'Enlarge Grid',
//                        handler:function()
//                        {
//                            storeGridDashPendingData.load();
//                        }
//                        
//                    },
                    {
                        type: 'refresh',
                        tooltip: 'Refresh Grid',
                        handler: function ()
                        {
                            storeGridDashPendingData.load();
                        }
                    }
                ],
            },
//            {
//                title: 'Pending Data',
//                html: 'asdsad'
//            },
            {
                xtype: 'GridDashPendingClaim',
                 collapsible: true,
                 border:true,
                hidden: panelClaimPending,
                tools: [
//                    { type:'pin' },
                    {
                        type: 'refresh',
                        handler: function ()
                        {
                            storeGridDashPendingClaim.load();
//                            var mydashboard = Ext.ComponentQuery.query('mydashboard')[0];
//                            mydashboard.setHeight(800);
//                            mydashboard.doLayout();  
//                            console.log(mydashboard);

                        }
                    },
//                    { type:'search' },
//                    { type:'save' }
                ],
//                html: 'asdsad'
            },
            {
                xtype: 'GridDashPendingEmEp',
                 collapsible: true,
                 border:true,
                hidden: panelEmEpPending,
                tools: [
                    {
                        type: 'refresh',
                        handler: function ()
                        {
                            storeGridDashPendingEmEp.load();

                        }
                    }
                ]
            },
            {
                xtype: 'GridDashPendingEndors',
                 collapsible: true,
                 border:true,
                hidden: panelEndorPending,
                tools: [
                    {
                        type: 'refresh',
                        handler: function ()
                        {
                            storeGridDashPendingEndors.load();

                        }
                    }
                ]
            },
            {
                xtype:'GridDashPendingPengantarMedis',
                 collapsible: true,
                 border:true,
                hidden: panelPengantarMedis,
                tools: [
                    {
                        type: 'refresh',
                        handler: function ()
                        {
                            storeGridDashPendingPengantarMedis.load();

                        }
                    }
                ]

            },
            {
                xtype:'GridDashSuratDecline',
                 collapsible: true,
                 border:true,
                hidden: panelNewDecline,
                tools: [
                    {
                        type: 'refresh',
                        handler: function ()
                        {
                            storeGridDashPendingEndors.load();

                        }
                    }
                ]

            },
            Ext.create('widget.panel', {
                title: '<font color=white>Bussines Performance</font>',
                //ui: 'blue-panel',
                collapsible: true,
                // hidden:true,
                bodyStyle: 'padding: 5px;',
                width: widthDashboard + 10,
               height: 300,
                layout: 'fit',
                colspan: 2,
                items: [chart]
            }),
//            {
//                title: 'Claim Ratio',
//                //collapsed: true,
//                collapsible: true,
//                height: 300,
//                width: widthDashboard + 10,
//                //autoWidth:true,
////                html: 'asdsad',
//                colspan: 2
//            },
            Ext.create('widget.panel', {
                title: '<font color=white> Ratio</font>',
                //ui: 'blue-panel',
                collapsible: true,
                // hidden:true,
                bodyStyle: 'padding: 5px;',
                width: widthDashboard + 10,
                height: 300,
                layout: 'fit',
                colspan: 2,
                items: [chart2]
            }),
            {
                title: '<font color=white>Summary of Bussiness</font>',
                //collapsed: true,
                collapsible: true,
                // hidden:true,
                height: 230,
                width: widthDashboard + 10,
                //autoWidth:true,
//                html: 'asdsad',
                colspan: 2,
                items: [
                    {
                        layout: 'table',
                        columns: 3,
                        tdAttrs: {style: 'padding: 5px;'},
                        defaults: {
                            padding: '5 40 5 5',
//                            width: '50%',
                        },
                        items: [
                            {
                                items: [
                                     {
                                                xtype: 'displayfield',
                                                labelWidth:180,
                                                fieldLabel: 'Bank Name',
                                                value:'Bank Riau Kepri'
                                     },
                                     {
                                                xtype: 'displayfield',
                                                labelWidth:180,
                                                fieldLabel: 'Insurance Name',
                                                value:'WarnaArtha Life'
                                     },
                                     {
                                                xtype: 'displayfield',
                                                labelWidth:180,
                                                fieldLabel: 'Branch Name',
                                                value:'Global Risk Management (GRM)'
                                     },
                                     {
                                                xtype: 'displayfield',
                                                labelWidth:180,
                                                fieldLabel: 'Year',
                                                value:'2015'
                                     },
                                     {
                                                xtype: 'displayfield',
                                                labelWidth:180,
                                                fieldLabel: 'Inception Date',
                                                value:'26 May 2015'
                                     },
                                     {
                                         xtype:'displayfield'
                                     },
                                     {
                                         xtype:'displayfield'
                                     },
                                     {
                                         xtype:'displayfield'
                                     },
                                     {
                                         xtype:'displayfield'
                                     }
                                ]
                            },
                            {
                                items: [
                                     {
                                                xtype: 'displayfield',
                                                labelWidth:180,
                                                fieldLabel: 'Acc Premium Income',
                                                value:'Rp. 22.629.284,-'
                                     },
                                     {
                                                xtype: 'displayfield',
                                                labelWidth:180,
                                                fieldLabel: 'Acc Earn Income',
                                                value:'Rp. 23.818,-'
                                     },
                                     {
                                                xtype: 'displayfield',
                                                labelWidth:180,
                                                fieldLabel: 'Acc x',
                                                value:'Rp. 0,-'
                                     },
                                     {
                                                xtype: 'displayfield',
                                                labelWidth:180,
                                                fieldLabel: 'x Ratio',
                                                value:'Rp. 0,-'
                                     },
                                     {
                                         xtype:'displayfield'
                                     },
                                     {
                                         xtype:'displayfield'
                                     },
                                     {
                                         xtype:'displayfield'
                                     },
                                     {
                                         xtype:'displayfield'
                                     },
                                     {
                                         xtype:'displayfield'
                                     },
                                     {
                                         xtype:'displayfield'
                                     },
                                     {
                                         xtype:'displayfield'
                                     }
                                ]
                            },
                            {
                                items: [
                                     {
                                                xtype: 'displayfield',
                                                labelWidth:180,
                                                fieldLabel: 'x',
                                                value:'Rp. 13.299.908.000,-'
                                     },
                                     {
                                                xtype: 'displayfield',
                                                labelWidth:180,
                                                fieldLabel: 'Total Number of x',
                                                value:'197'
                                     },
                                     {
                                                xtype: 'displayfield',
                                                labelWidth:180,
                                                fieldLabel: 'Total x',
                                                value:'Rp. 0,-'
                                     },
                                     {
                                                xtype: 'displayfield',
                                                labelWidth:180,
                                                fieldLabel: 'Average Age of x',
                                                value:'39.53'
                                     },
                                     {
                                                xtype: 'displayfield',
                                                labelWidth:180,
                                                fieldLabel: 'Average Periode of x',
                                                value:'25.04'
                                     },
                                     {
                                                xtype: 'displayfield',
                                                labelWidth:180,
                                                fieldLabel: 'Average of x',
                                                value:'Rp. 25.141.603,-'
                                     }
                                ]
                            }
                        ]
                    }
                ]
          }
        ];

        this.callParent();
    }
});
