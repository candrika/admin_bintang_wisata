Ext.define('LinkedAcc2', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.LinkedAcc2',
//    height: 509,
//    width: 604,
//    title: 'My Panel',
    items: [
        {
            xtype: 'Gridlinkedacc',
            height:350
        },
        {
            xtype: 'gridpanel',
            title: 'My Grid Panel',
            height:150,
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'string',
                    text: 'String'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'number',
                    text: 'Number'
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'date',
                    text: 'Date'
                },
                {
                    xtype: 'booleancolumn',
                    dataIndex: 'bool',
                    text: 'Boolean'
                }
            ]
        }
    ]

});