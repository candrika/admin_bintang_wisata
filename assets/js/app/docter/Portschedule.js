var Griddoctorschedule = Ext.create(dir_sys + 'docter.Griddoctorschedule');
var Gridschedule = Ext.create(dir_sys + 'docter.Gridschedule');

Ext.define(dir_sys + 'docter.Portschedule', {
    extend: 'Ext.Panel',
    alias: 'widget.Portschedule',
    layout: 'border',
    defaults: {
    },
    items: [{
            region: 'east',
            flex: 3,
            split: true,
            xtype: 'Griddoctorschedule'
        },
        {
            region: 'center',
            xtype: 'Gridschedule',
            width:50,
        }
    ]
});