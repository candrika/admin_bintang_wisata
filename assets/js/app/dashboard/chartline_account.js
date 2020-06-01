
function getdataChart(i, year, idaccount, data,idunit)
{
    i = i * 1 + 1 * 1;
    // console.log('year'+year);
    if(year!=undefined)
    {
        Ext.Ajax.request({
            url: SITE_URL + 'dashboard/getDataAkun/' + i + '/' + year+'/'+idaccount+'/'+idunit,
            method: 'POST',
            async: false,
            success: function(form, action) {
                i = i * 1 - 1 * 1;
                var d = Ext.decode(form.responseText);
                data.push({
                    name: Ext.Date.monthNames[i % 12],
                    data1: d.totalbalance * 1
                });
            },
            failure: function(form, action) {
                // Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
            }
        });
    }
}

generateData = function(n, idaccount,year,idunit) {
    // alert(year)
    var data = [];
        for (i = 0; i < (n || 12); i++) {
            getdataChart(i, year, idaccount,data,idunit)
        }
        return data;
};

var store1 = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'data1'],
    data: generateData(),
    autoLoad:false
});

Ext.define('chartLineAccount', {
    extend: 'Ext.chart.Chart',
    id: 'chartLineAccount',
    alias: 'widget.chartLineAccount',
     animate: {
                easing: 'bounceOut',
                duration: 1750
            },
    store: store1,
    insetPadding: 30,
    axes: [{
            type: 'Numeric',
            minimum: 0,
            position: 'left',
            fields: ['data1'],
            title: false,
            grid: true,
            label: {
                renderer: Ext.util.Format.numberRenderer('0,0'),
                font: '10px Arial'
            }
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['name'],
            title: false,
            label: {
                font: '11px Arial',
                renderer: function(name) {
//                            return name.substr(0, 3) + ' 07';
                    return name.substr(0, 3);
                }
            }
        }],
    series: [{
            type: 'line',
            axis: 'left',
            xField: 'name',
            yField: 'data1',
            listeners: {
                itemmouseup: function(item) {
                    Ext.example.msg('Item Selected', item.value[1] + ' visits on ' + Ext.Date.monthNames[item.value[0]]);
                }
            },
            tips: {
                trackMouse: true,
                autoWidth: true,
                height: 40,
                width:100,
                renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get('name'));
                    var num = Ext.util.Format.number(storeItem.get('data1'), '0,000');
                    this.update(num);
                }
            },
            style: {
                fill: '#38B8BF',
                stroke: '#38B8BF',
                'stroke-width': 3
            },
            markerConfig: {
                type: 'circle',
                size: 4,
                radius: 4,
                'stroke-width': 0,
                fill: '#38B8BF',
                stroke: '#38B8BF'
            }
        }]
});