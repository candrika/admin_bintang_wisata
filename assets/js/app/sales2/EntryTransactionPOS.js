Ext.create(dir_sys + 'sales2.GridTransactionPOS');



Ext.define(dir_sys + 'sales2.EntryTransactionPOS', {
    extend: 'Ext.form.Panel',
    alias: 'widget.EntryTransactionPOS',
    id: 'EntryTransactionPOS',
    // width: 760,
     title: 'Transaksi',
    // height: 410,
    // url: SITE_URL + 'production/savewo',
    bodyStyle: 'padding:5px',
    forceFit: true,
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 120,
        width: 340
    },
    bodyPadding: 5,
    // width: 600,
    defaults: {
        anchor: '100%'
    },

    items: [
        {
            xtype: 'GridTransactionPOS'
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [
                    
                    {
                        xtype:'hiddenfield',
                        name:'id_member'
                    },
                    {
                        xtype:'hiddenfield',
                        name:'total_amount'
                    },
                    {
                        xtype:'hiddenfield',
                        name:'customer_id'
                    },
                    {
                        xtype:'hiddenfield',
                        name:'customer_type'
                    }
                ]
            }]
        }
    ]
});
