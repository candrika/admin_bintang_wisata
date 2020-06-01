window.generateDataNeraca = function(idunit,month,year) {
    var data = [];
    if(month!=undefined)
    {
        Ext.Ajax.request({
            url: SITE_URL + 'dashboard/getDataNeraca/'+idunit+'/'+month+'/'+year,
            method: 'POST',
            async: false,
            success: function(form, action) {
                console.log('POST');
                var d = Ext.decode(form.responseText);

                data.push({
                    name: 'Aset',
                    data1: d.aset
                });
                data.push({
                    name: 'Kewajiban',
                    data1: d.kewajiban
                });
                data.push({
                    name: 'Modal',
                    data1: d.modal
                });
            },
            failure: function(form, action) {
                // Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
            }
        });
    }
    return data;
};

window.generateDataNegativeNeraca = function(n, floor) {
    var data = [];
    Ext.Ajax.request({
        url: SITE_URL + 'dashboard/getDataNeraca/',
        method: 'POST',
        async: false,
        success: function(form, action) {
            console.log('POST');
            var d = Ext.decode(form.responseText);

           data.push({
                name: 'Pendapatan',
                data1: d.totalpendapatan
            });
            data.push({
                name: 'Keuntungan',
                data1: d.keuntungan
            });
            data.push({
                name: 'Pengeluaran',
                data1: d.totalpengeluaran
            });
             
            

            
            

        },
        failure: function(form, action) {
            // Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });

    return data;
};

window.storeNeraca = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
    data: generateDataNeraca()
});

Ext.define('chartNeraca', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.chartNeraca',
    animate: {
        easing: 'bounceOut',
        duration: 1750
    },
    id: 'chartNeraca',
    style: 'background:#fff',
    shadow: true,
    store: storeNeraca,
    axes: [{
            type: 'Numeric',
            position: 'left',
            fields: ['data1'],
            label: {
                renderer: Ext.util.Format.numberRenderer('0,0')
            },
//                title: 'Number of Hits',
            grid: true,
            minimum: 0
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['name'],
//            title: 'Month of the Year'
        }],
    series: [{
            type: 'column',
            axis: 'left',
            highlight: true,
            tips: {
                trackMouse: true,
                width: 200,
                height: 28,
                renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get('name') + ': Rp ' + Ext.util.Format.number(storeItem.get('data1'), '0,000'));
                }
            },
            label: {
//                display: 'insideEnd',
                'text-anchor': 'middle',
                field: 'data1',
                renderer: Ext.util.Format.numberRenderer('0'),
                orientation: 'horizontal',
                color: '#333'
            },
            xField: 'name',
            yField: 'data1',
            renderer: function(sprite, record, attr, index, store) {
                if (record.get('name') == 'Aset')
                {
                    var rand = 0;
                } else if (record.get('name') == 'Kewajiban')
                {
                    var rand = 1;
                } else if (record.get('name') == 'Modal')
                {
                    var rand = 2;
                } else {
                    var rand = Math.floor(Math.random() * 20) + 1;
                }


                var color = [
                    'rgb(255,69,0)',
                    'rgb(0,191,255)',
                    'rgb(186,85,211)'][rand];
                return Ext.apply(attr, {
                    fill: color
                });
            }
        }]
});