function str_replace(search, replace, subject, count) {
    //  discuss at: http://phpjs.org/functions/str_replace/
    // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Gabriel Paderni
    // improved by: Philip Peterson
    // improved by: Simon Willison (http://simonwillison.net)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Onno Marsman
    // improved by: Brett Zamir (http://brett-zamir.me)
    //  revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // bugfixed by: Anton Ongson
    // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // bugfixed by: Oleg Eremeev
    //    input by: Onno Marsman
    //    input by: Brett Zamir (http://brett-zamir.me)
    //    input by: Oleg Eremeev
    //        note: The count parameter must be passed as a string in order
    //        note: to find a global variable in which the result will be given
    //   example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
    //   returns 1: 'Kevin.van.Zonneveld'
    //   example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
    //   returns 2: 'hemmo, mars'

    var i = 0,
        j = 0,
        temp = '',
        repl = '',
        sl = 0,
        fl = 0,
        f = [].concat(search),
        r = [].concat(replace),
        s = subject,
        ra = Object.prototype.toString.call(r) === '[object Array]',
        sa = Object.prototype.toString.call(s) === '[object Array]';
    s = [].concat(s);
    if (count) {
        this.window[count] = 0;
    }

    for (i = 0, sl = s.length; i < sl; i++) {
        if (s[i] === '') {
            continue;
        }
        for (j = 0, fl = f.length; j < fl; j++) {
            temp = s[i] + '';
            repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
            s[i] = (temp)
                .split(f[j])
                .join(repl);
            if (count && s[i] !== temp) {
                this.window[count] += (temp.length - s[i].length) / f[j].length;
            }
        }
    }
    return sa ? s : s[0];
}

function explode(delimiter, string, limit) {
    //  discuss at: http://phpjs.org/functions/explode/
    // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //   example 1: explode(' ', 'Kevin van Zonneveld');
    //   returns 1: {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}

    if (arguments.length < 2 || typeof delimiter === 'undefined' || typeof string === 'undefined')
        return null;
    if (delimiter === '' || delimiter === false || delimiter === null)
        return false;
    if (typeof delimiter === 'function' || typeof delimiter === 'object' || typeof string === 'function' || typeof string ===
        'object') {
        return {
            0: ''
        };
    }
    if (delimiter === true)
        delimiter = '1';

    // Here we go...
    delimiter += '';
    string += '';

    var s = string.split(delimiter);

    if (typeof limit === 'undefined')
        return s;

    // Support for limit
    if (limit === 0)
        limit = 1;

    // Positive limit
    if (limit > 0) {
        if (limit >= s.length)
            return s;
        return s.slice(0, limit - 1)
            .concat([s.slice(limit - 1)
                .join(delimiter)
            ]);
    }

    // Negative limit
    if (-limit >= s.length)
        return [];

    s.splice(s.length + limit);
    return s;
}


function updateTime() {
    // var currentTime = new Date()
    // var hours = currentTime.getHours()
    // var minutes = currentTime.getMinutes()
    // var seconds = currentTime.getSeconds()
    // if (minutes < 10){
    //     minutes = "0" + minutes
    // }
    // if (seconds < 10){
    //     seconds = "0" + seconds
    // }
    var t_str = Ext.Date.format(new Date(), 'd-m-Y H:i:s');
    // if(hours > 11){
    //     t_str += "PM";
    // } else {
    //     t_str += "AM";
    // }
    // document.getElementById('time_span').innerHTML = t_str;
    // console.log(t_str)
    Ext.getCmp('timeBtn').setText(t_str);
}


Ext.util.Format.Currency = function(v) {
    // v = (Math.round((v-0)*100))/100;
    // v = (v == Math.floor(v)) ? v + ".00" : ((v*10 == Math.floor(v*10)) ? v + "0" : v);
    // return (v).replace(/\./, ',');
    return number_format(v);
};

function number_format(number, decimals, dec_point, thousands_sep) {
    // Formats a number with grouped thousands
    //
    // version: 906.1806
    // discuss at: http://phpjs.org/functions/number_format
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     bugfix by: Michael White (http://getsprink.com)
    // +     bugfix by: Benjamin Lupton
    // +     bugfix by: Allan Jensen (http://www.winternet.no)
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +     bugfix by: Howard Yeend
    // +    revised by: Luke Smith (http://lucassmith.name)
    // +     bugfix by: Diogo Resende
    // +     bugfix by: Rival
    // +     input by: Kheang Hok Chin (http://www.distantia.ca/)
    // +     improved by: davook
    // +     improved by: Brett Zamir (http://brett-zamir.me)
    // +     input by: Jay Klehr
    // +     improved by: Brett Zamir (http://brett-zamir.me)
    // +     input by: Amir Habibi (http://www.residence-mixte.com/)
    // +     bugfix by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: number_format(1234.56);
    // *     returns 1: '1,235'
    // *     example 2: number_format(1234.56, 2, ',', ' ');
    // *     returns 2: '1 234,56'
    // *     example 3: number_format(1234.5678, 2, '.', '');
    // *     returns 3: '1234.57'
    // *     example 4: number_format(67, 2, ',', '.');
    // *     returns 4: '67,00'
    // *     example 5: number_format(1000);
    // *     returns 5: '1,000'
    // *     example 6: number_format(67.311, 2);
    // *     returns 6: '67.31'
    // *     example 7: number_format(1000.55, 1);
    // *     returns 7: '1,000.6'
    // *     example 8: number_format(67000, 5, ',', '.');
    // *     returns 8: '67.000,00000'
    // *     example 9: number_format(0.9, 0);
    // *     returns 9: '1'
    // *     example 10: number_format('1.20', 2);
    // *     returns 10: '1.20'
    // *     example 11: number_format('1.20', 4);
    // *     returns 11: '1.2000'
    // *     example 12: number_format('1.2000', 3);
    // *     returns 12: '1.200'
    var n = number,
        prec = decimals;

    var toFixedFix = function(n, prec) {
        var k = Math.pow(10, prec);
        return (Math.round(n * k) / k).toString();
    };

    n = !isFinite(+n) ? 0 : +n;
    prec = !isFinite(+prec) ? 0 : Math.abs(prec);
    var sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep;
    var dec = (typeof dec_point === 'undefined') ? '.' : dec_point;

    var s = (prec > 0) ? toFixedFix(n, prec) : toFixedFix(Math.round(n), prec); //fix for IE parseFloat(0.55).toFixed(0) = 0;

    var abs = toFixedFix(Math.abs(n), prec);
    var _, i;

    if (abs >= 1000) {
        _ = abs.split(/\D/);
        i = _[0].length % 3 || 3;

        _[0] = s.slice(0, i + (n < 0)) +
            _[0].slice(i).replace(/(\d{3})/g, sep + '$1');
        s = _.join(dec);
    } else {
        s = s.replace('.', dec);
    }

    var decPos = s.indexOf(dec);
    if (prec >= 1 && decPos !== -1 && (s.length - decPos - 1) < prec) {
        s += new Array(prec - (s.length - decPos - 1)).join(0) + '0';
    } else if (prec >= 1 && decPos === -1) {
        s += dec + new Array(prec).join(0) + '0';
    }
    return s;
}

function renderNomor(value, id, r) {
    var value = str_replace(".", "", value);
    // console.log(value);
    Ext.util.Format.thousandSeparator = ".";
    Ext.util.Format.decimalSeparator = ".";
    var formatNomor = "0,000";
    // console.log(value)
    return Ext.util.Format.number(value, formatNomor);
}

function renderNomor2(value, id, r) {
    var value = str_replace(",", "", value);
    // console.log(value);
    Ext.util.Format.thousandSeparator = ",";
    Ext.util.Format.decimalSeparator = ".";

    var formatNomor = "0,000.00";

    // console.log(value)
    return Ext.util.Format.number(value, formatNomor);
}

function renderNomor3(value, id, r) {
    var value = str_replace(".00", "", value);
    // console.log(value);
    Ext.util.Format.thousandSeparator = ".";
    Ext.util.Format.decimalSeparator = ".";
    var formatNomor = "0,000";
    // console.log(value)
    return Ext.util.Format.number(value, formatNomor);
}

function renderNomor4(value, id, r) {
    var value = str_replace(".00", "", value);
    // console.log(value);
    Ext.util.Format.thousandSeparator = ",";
    Ext.util.Format.decimalSeparator = ".";
    var formatNomor = "0,000";
    // console.log(value)
    return Ext.util.Format.number(value, formatNomor);
}

function renderNomorNegative(number) {
    number = parseFloat(number.toString().match(/^-?\d+\.?\d{0,2}/));
    //Seperates the components of the number
    var components = (Math.floor(number * 100) / 100).toString().split(".");
    //Comma-fies the first part
    components[0] = components[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    //Combines the two sections
    return components.join(".");
}

function cetak(title, mode, id) {
    var src = SITE_URL + "backend/cetak/" + mode + "/" + id;

    var myWin = Ext.create("Ext.window.Window", {
        title: title,
        modal: true,
        html: '<iframe src="' + src + '" width="100%" height="100%" ></iframe>',
        width: 700,
        height: 500
    });
    myWin.show();
}

function convertDate(tgl) {
    //convert ddmmyyy -> yymmdd
    var tanggal = explode('-', tgl);
    return tanggal[2] + '-' + tanggal[1] + '-' + tanggal[0];
}

function convertDate2(tgl) {
    console.log(tgl)
        //convert yymmdd -> dd/mm/yy
    if (tgl !== '') {

        var tanggal = explode('-', tgl);
        return tanggal[2] + '/' + tanggal[1] + '/' + tanggal[0];

    } else {
        return null;
    }

}

function convertDate3(tgl) {
    //convert ddmmyyy -> yymmdd
    if (tgl !== null && tgl !== '') {
        var tanggal = explode('/', tgl);
        return tanggal[2] + '-' + tanggal[1] + '-' + tanggal[0];
    } else {
        return null;
    }
}

function load_js_file(file){
    Ext.Loader.loadScript({
        url: 'assets/js/app/'+file,
        onLoad: function() {
            console.log(file+' loaded');
        },
        onError: function() {
            Ext.Msg.alert('Failed', 'Failed while loading file '+file);
        }
    });    
}




function updateGridReceive() {
    //penerimaan kas
    var subtotalReceive = 0 * 1;
    var totalPajak = 0 * 1;
    var totalReceive = 0 * 1;

    var ReceiveGridStore = Ext.getCmp('EntryReceiveMoney').getStore();
    Ext.each(ReceiveGridStore.data.items, function(obj, i) {
        var pajak = (obj.data.amount * 1 / 100) * obj.data.ratetax;
        totalPajak += pajak;
        subtotalReceive += obj.data.amount * 1;
    });
    totalReceive = subtotalReceive * 1 + totalPajak * 1;
    Ext.getCmp('subtotalReceive').setValue(subtotalReceive.toLocaleString('null', {
        minimumFractionDigits: 2
    }));
    Ext.getCmp('taxReceive').setValue(totalPajak.toLocaleString('null', {
        minimumFractionDigits: 2
    }));
    Ext.getCmp('totalReceive').setValue(totalReceive.toLocaleString('null', {
        minimumFractionDigits: 2
    }));
}


function updateGridSpend()
{    
    var subtotalSpend = 0 * 1;
    var totalPajak = 0 * 1;
    var totalSpend = 0 * 1;

    var SpendGridStore = Ext.getCmp('EntrySpendMoney').getStore();
    Ext.each(SpendGridStore.data.items, function(obj, i) {
        var pajak = (obj.data.amount*1 / 100) * obj.data.ratetax;
        totalPajak += pajak;
        subtotalSpend += obj.data.amount*1;
    });

    totalSpend = subtotalSpend*1+totalPajak*1;

    Ext.getCmp('subtotalSpend').setValue(subtotalSpend.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('taxSpend').setValue(totalPajak.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('totalSpend').setValue(totalSpend.toLocaleString('null', {minimumFractionDigits: 2}));

}

function randomString(length) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

Date.isLeapYear = function (year) { 
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)); 
};

Date.getDaysInMonth = function (year, month) {
    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

Date.prototype.isLeapYear = function () { 
    return Date.isLeapYear(this.getFullYear()); 
};

Date.prototype.getDaysInMonth = function () { 
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};

Date.prototype.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
};

//end add month to date

//add days to date
Date.prototype.addDays = function(days) {
   this.setDate(this.getDate() + parseInt(days));
   return this;
 };