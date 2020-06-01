if(!Ext.isDefined(Ext.getCmp('PurchasingGridID'))){
    var PurchasingGrid = Ext.create(dir_sys + 'purchasing.PurchasingGrid');

}else{
    var PurchasingGrid = Ext.create(dir_sys + 'purchasing.PurchasingGrid');

}

if(!Ext.isDefined(Ext.getCmp('PurchaseReturnGridID'))){
    var PurchaseReturnGrid = Ext.create(dir_sys + 'purchasing.PurchaseReturnGrid');

}else{
    var PurchaseReturnGrid = Ext.create(dir_sys + 'purchasing.PurchaseReturnGrid');

}

if(!Ext.isDefined(Ext.getCmp('PurchaseReceiveGridID'))){
   var PurchaseReceiveGrid = Ext.create(dir_sys + 'purchasing.PurchaseReceiveGrid');
}else{
   var PurchaseReceiveGrid = Ext.create(dir_sys + 'purchasing.PurchaseReceiveGrid');
}

//purchasing.PurchaseReceiveGrid

Ext.define(dir_sys + 'purchasing.TabPurchasingData', {
    extend: 'Ext.tab.Panel',
    id: 'TabPurchasingData',
    alias: 'widget.TabPurchasingData',
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
            xtype:'PurchasingGrid',
            // listeners:{
            //     activate:function(){
            //       Ext.getCmp('PurchasingGridID').getStore().load();
            //       setHeaderPurchaseSummary();  
            //     }
            // }
        },
        {
            xtype:'PurchaseReturnGrid',
            // listeners:{
            //     activate:function(){
            //         Ext.getCmp('PurchaseReturnGridID').getStore().load();
            //         setHeaderPurchaseSummary();
            //     }
            // }
        }
        ,
        {
            xtype: 'PurchaseReceiveGrid',
            // listeners:{
            //     activate:function(){
            //        Ext.getCmp('PurchaseReceiveGridID').getStore().load();
            //        setHeaderPurchaseSummary(); 
            //     }
            // }
        }
    ],
     listeners: {
        render: function() {
            setHeaderPurchaseSummary();

            this.items.each(function(i) {
                i.tab.on('click', function() {
                    // alert('s')
                });
            });
        }
    }
});

Ext.define(dir_sys + 'purchasing.TabPurchasingDataPanel', {
    // extend: 'Ext.panel.Panel',
    alias: 'widget.TabPurchasingDataPanel',
    extend: 'Ext.Container',
    xtype: 'basic-panels',
    // width: 660,
    anchor: '100%',
    requires: [
        'Ext.layout.container.Table'
    ],
    layout: {
        type: 'table',
        columns: 3,
        tdAttrs: { style: 'padding: 5px;' }
    },
    defaults: {
        xtype: 'panel',
        width: (panelW - 225) / 3,
        height: 80,
        bodyPadding: 1
    },

    initComponent: function() {
            this.listeners = {
                render: function() {
                    setHeaderPurchaseSummary();

                   
                }
            };

            this.items = [
                 {
                    title: '<center>Total Pembelian</center>',
                    id: 'total_purchase_summary',
                    border: true,
                    // html: '<center><h2><span style=color:#0079d2>5</span></h2>'
                },
                {
                    title: '<center>Total Invoice Belum Terbayar</center>',
                    id: 'total_itempurcaheunsold_summary',
                    border: true,
                    // html: '<center><h2><span style=color:#0079d2>5</span></h2>'
                },
                {
                    title: '<center>Total Invoice Sudah Terbayar</center>',
                    border: true,
                    id: 'total_itempurcahesold_summary',
                    // html: '<center><h2><span style=color:#64DD17>2.164.000</span></h2>'
                },
                {
                    // title: 'Collapsed Panel',
                    // collapsed: true,
                    // collapsible: true,
                    width: panelW - 205,
                    height: panelH - 110,
                    // html: 'dasdas',
                    xtype: 'TabPurchasingData',
                    colspan: 3
                }
            ];

            this.callParent();
        }
});

function setHeaderPurchaseSummary(){
    Ext.Ajax.request({
        url: CLINIC_API  + 'purchase/summary',
        method: 'GET',
        params: {
            key: key,
            password:password,
            idunit:idunit
        },
        // headers : { Authorization : auth },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            console.log(d)
            Ext.getCmp('total_purchase_summary').update('<center><h2><span style=color:#00ce0a>' + d.total_invoice + '</span></h2>');
            Ext.getCmp('total_itempurcaheunsold_summary').update('<center><h2><span style=color:#d50000>Rp. ' + renderNomor2(d.total_invoice_unpaid) + '</span></h2>');
            Ext.getCmp('total_itempurcahesold_summary').update('<center><h2><span style=color:#7f73d8>Rp. ' +   renderNomor2(d.total_invoice_paid)  + '</span></h2>');
           
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });
}