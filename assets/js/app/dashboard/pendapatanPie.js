window.generateDataPiePendapatan = function(idunit,iddistribusi,month,year) {
    var data = [];
    if(month!=undefined)
    {
        Ext.Ajax.request({
            url: SITE_URL + 'dashboard/getDataPendapatan/' + idunit+'/'+iddistribusi+'/'+month+'/'+year,
            method: 'POST',
            async: false,
            success: function(form, action) {
                var d = Ext.decode(form.responseText);
                
                if(d.success)
                {
                    Ext.each(d.data, function(obj, i) {
                        data.push({
                            name: obj.field,
                            data1: obj.value
                        });
                   });
                } else {
                     data.push({
                            name: 0,
                            data1: 0
                        });
                }
            },
            failure: function(form, action) {
                // Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
            }
        });
    }
    return data;
};


window.storePiePendapatan = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
    data: generateDataPiePendapatan()
});

// storePiePendapatan.loadData(generateDataPiePendapatan());
// storePiePendapatan.loadData(generateDataPiePendapatan(Ext.getCmp('idunitOption').getValue(),Ext.getCmp('iddistribusi').getValue(),Ext.getCmp('monthOption').getValue(),Ext.getCmp('tahunOption').getSubmitValue()));

Ext.define('piePendapatan', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.piePendapatan',
    animate: {
        easing: 'bounceOut',
        duration: 5000
    },
    shadow: true,
    store: storePiePendapatan,
    legend: {
        position: 'left'
    },
//            insetPadding: 60,
    theme: 'Base:gradients',
    series: [{
            type: 'pie',
            field: 'data1',
                showInLegend: true,
            tips: {
                trackMouse: true,
                width: 160,
                height: 28,
                renderer: function(storeItem, item) {
                    //calculate percentage.
                    var total = 0;
                    storePiePendapatan.each(function(rec) {
                        console.log(rec.get('data1'))
                        total += rec.get('data1')*1;
                    });
                    this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data1') / total * 100) + '%');
                    
                }
            },
            highlight: {
                segment: {
                    margin: 20
                }
            }
//            label: {
//                field: 'name',
//                display: 'rotate',
//                contrast: true,
//                font: '18px Arial'
//            }
        }]
});