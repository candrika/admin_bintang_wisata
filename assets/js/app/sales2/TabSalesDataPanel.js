var SalesGrid = Ext.create(dir_sys + 'sales2.SalesGrid');
var SalesReturnGrid = Ext.create(dir_sys + 'sales2.SalesReturnGrid');

Ext.define(dir_sys + 'sales2.TabSalesData', {
    extend: 'Ext.tab.Panel',
    // id: 'TabSalesData',
    alias: 'widget.TabSalesData',
    activeTab: 0,
    // autoWidth: true,
    // autoHeight:true,
    autoScroll: true,
    plain: true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype:'SalesGrid',
            // listeners: {
            //     activate: function() {
            //         Ext.getCmp('SalesGridID').getStore().load();
            //         setHeaderSalesSummary();
            //     }
            // }
        },
        {
            xtype:'SalesReturnGrid',
            // listeners: {
            //     activate: function() {
            //         Ext.getCmp('SalesReturnGridID').getStore().load();
            //         setHeaderSalesSummary();
            //     }
            // }
        }
    ],
     listeners: {
        render: function() {
            setHeaderSalesSummary();

            this.items.each(function(i) {
                i.tab.on('click', function() {
                    // alert('s')
                });
            });
        }
    }
});

Ext.define(dir_sys + 'sales2.TabSalesDataPanel', {
    // extend: 'Ext.panel.Panel',
    alias: 'widget.TabSalesDataPanel',
    extend: 'Ext.Container',
    xtype: 'basic-panels',
    // width: 660,
    anchor: '100%',
    requires: [
        'Ext.layout.container.Table'
    ],
    layout: {
        type: 'table',
        // columns: 4,
        // tdAttrs: { style: 'padding: 5px;' }
    },
    defaults: {
        xtype: 'panel',
        width: (panelW - 215) / 4,
        height: 80,
        bodyPadding: 1
    },

    initComponent: function() {
            this.listeners = {
                render: function() {
                    setHeaderSalesSummary();

                   
                }
            };

            this.items = [
                //  {
                //     title: '<center>Penjualan Hari Ini</center>',
                //     id: 'total_salestoday_summary',
                //     border: true,
                //     // html: '<center><h2><span style=color:#0079d2>5</span></h2>'
                // },
                //  {
                //     title: '<center>Pesanan Belum Selesai</center>',
                //     id: 'total_request_order',
                //     border: true,
                //     // html: '<center><h2><span style=color:#0079d2>5</span></h2>'
                // },
                // {
                //     title: '<center>Total Penjualan</center>',
                //     id: 'total_sales_summary',
                //     border: true,
                //     // html: '<center><h2><span style=color:#0079d2>5</span></h2>'
                // },
                // {
                //     title: '<center>Total Barang Terjual</center>',
                //     border: true,
                //     id: 'total_itemsold_summary',
                //     // html: '<center><h2><span style=color:#64DD17>2.164.000</span></h2>'
                // },
                // {
                //     title: '<center>Total Invoice</center>',
                //     border: true,
                //     id: 'total_invoice',
                //     // html: '<center><h2><span style=color:#64DD17>2.164.000</span></h2>'
                // },
                // {
                //     title: '<center>Total Invoice Terbayar</center>',
                //     id: 'total_invoice_paid',
                //     border: true,
                //     // html: '<center><h2><span style=color:#0079d2>5</span></h2>'
                // },
                // {
                //     title: '<center>Total Invoice Belum Dibayar</center>',
                //     id: 'total_invoice_unpaid',
                //     border: true,
                //     // html: '<center><h2><span style=color:#0079d2>5</span></h2>'
                // },
                {
                    // title: 'Collapsed Panel',
                    // collapsed: true,
                    // collapsible: true,
                    width: panelW - 185,
                    height: panelH - 10,
                    // html: 'dasdas',
                    xtype: 'TabSalesData',
                    // colspan: 4
                }
            ];

            this.callParent();
        }
});

