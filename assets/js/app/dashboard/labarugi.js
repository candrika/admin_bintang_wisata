window.generateDataLabaRugi = function(idunit,month,year) {
    var data = [];
    if(month!=undefined)
    {
        Ext.Ajax.request({
            url: SITE_URL + 'dashboard/getDataLabaRugi/'+idunit+'/'+month+'/'+year,
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
                    name: 'Pengeluaran',
                    data1: d.totalpengeluaran
                });
                data.push({
                    name: 'Keuntungan',
                    data1: d.keuntungan
                });
            },
            failure: function(form, action) {
                // Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
            }
        });
    }
    return data;
};

window.generateDataNegativeLabaRugi = function(n, floor) {
    var data = [];
    Ext.Ajax.request({
        url: SITE_URL + 'dashboard/getDataLabaRugi/',
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

window.storeLabaRugi = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
    data: generateDataLabaRugi()
});

Ext.define('chartLabaRugi', {
    extend: 'Ext.chart.Chart',
    // title:'Laba Rugi',
    alias: 'widget.chartLabaRugi',
    animate: {
        easing: 'bounceOut',
        duration: 1750
    },
    id: 'chartLabaRugi',
    style: 'background:#fff',
    shadow: true,
    store: storeLabaRugi,
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
                if (record.get('name') == 'Keuntungan')
                {
                    var rand = 0;
                } else if (record.get('name') == 'Pengeluaran')
                {
                    var rand = 1;
                } else if (record.get('name') == 'Pendapatan')
                {
                    var rand = 2;
                } else {
                    var rand = Math.floor(Math.random() * 20) + 1;
                }


                var color = [
                    'rgb(100,149,237)',
                    'rgb(255,127,80)',
                    'rgb(50,205,50)'][rand];
                return Ext.apply(attr, {
                    fill: color
                });
            }
        }]
});