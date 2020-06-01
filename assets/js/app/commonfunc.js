function randomString(length) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}


function setSequenceID(fieldID, seqField, seqName) {
    Ext.Ajax.request({
        url: SITE_URL + 'backend/getSequence',
        method: 'POST',
        params: {
            seqName: seqName,
            seqField: seqField
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            Ext.getCmp(fieldID).setValue(d.message);
        },
        failure: function(form, action) {
            Ext.getCmp(fieldID).setValue('Get sequence failure!');
        }
    });
}



function disableUnitInventory() {
    //buat disable combo box unit untuk user selain superuser/administrator
    if (group_id != 99) {
        //grid all inventory
        //        Ext.getCmp('cbUnitInvAll').setDisabled(true);
        //        Ext.getCmp('cbUnitInv').setDisabled(true);
        //        Ext.getCmp('cbUnitInvBuy').setDisabled(true);
        //        Ext.getCmp('cbUnitInvSell').setDisabled(true);
        //        //form inventory
        //         var form = Ext.ComponentQuery.query('FormProfile')[0];
        //        form.getForm().findField("namaunitFormInv").setReadOnly(true);


    }
}

function disableUnitJournal() {
    if (group_id != 99) {
        //        Ext.getCmp('idunitJGeneral').setDisabled(true);
    }
}

function disableUnitTreeAcc() {
    if (group_id != 99) {
        //        Ext.getCmp('cbUnitTreeAccount').setDisabled(true);   
    }
}

function disableEntryJournal() {
    if (group_id != 99) {
        //        storeUnit.load();
        //       Ext.getCmp('cbUnitEntryJournal').setReadOnly(true);   
        //       Ext.getCmp('cbUnitEntryJournal').setValue(namaunit);      

    }
}

function disableEntryPurchase() {
    if (group_id != 99) {
        //        storeUnit.load();
        //       Ext.getCmp('cbUnitEntryPurchase').setReadOnly(true);   
        //       Ext.getCmp('cbUnitEntryPurchase').setValue(namaunit);      

    }
}

function datenow() {
    var today = new Date();
    settimezone(today);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    var today = dd + '/' + mm + '/' + yyyy;
    return today;
}

function setNoRecord(idunit, parent, model, dir, digit, params) {
    Ext.Ajax.request({
        url: SITE_URL + 'setup/getNoRecord/' + model + '/' + dir + '/' + digit,
        method: 'GET',
        params: params,
        // params:{
        //     idunit: idunit
        // },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            parent.fireEvent('setNoRecord', model, d.norec);
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });
}

function insertNoRef(type, idunit, el, prefix) {
    if (prefix == null) {
        prefix = 'NO';
    }

    if (idunit == null) {
        Ext.Msg.alert('Failed', 'UNit is not set');
    } else {
        Ext.Ajax.request({
            url: SITE_URL + 'setup/getseq',
            method: 'GET',
            params: {
                type: type,
                idunit: idunit
            },
            success: function(form, action) {
                var d = Ext.decode(form.responseText);
                Ext.getCmp(el).setValue(prefix + d.noref);
            },
            failure: function(form, action) {
                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
            }
        });
    }

}

function insertNoID(type, idunit, fieldpk, table, el, prefix) {
    if (prefix == null) {
        prefix = 'NO';
    }

    if (idunit == null) {
        Ext.Msg.alert('Failed', 'UNit is not set');
    } else {
        if (Ext.getCmp(el).getValue() === '') {
            Ext.Ajax.request({
                url: SITE_URL + 'setup/getseqpk',
                method: 'GET',
                params: {
                    type: type,
                    idunit: idunit,
                    fieldpk: fieldpk,
                    table: table
                },
                success: function(form, action) {
                    var d = Ext.decode(form.responseText);
                    Ext.getCmp(el).setValue(prefix + d.noref);
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }

    }

}

function cekAkses(btn) {
    Ext.Ajax.request({
        url: SITE_URL + 'sistem/cekAkses',
        params: {
            id: btn,
        },
        success: function(response) {
            if (response.responseText == 'TIDAK') {
                Ext.Msg.alert('Hak Akses', 'Maaf, anda tidak mempunyai hak akses untuk melanjutkan proses ini.');
            } else {

            }
        },
        failure: function(form, action) {
            Ext.Msg.alert('Hak Akses', 'Cek Hak Akses Gagal, Silahkan coba lagi.');
        }
    });
}

function romanize(num) {
    if (!+num)
        return false;
    var digits = String(+num).split(""),
        key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
            "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
            "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"
        ],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

function customColumnStatus(arrStatus, value) {
    var idx = (value * 1) - 1;
    var str = String(arrStatus[idx]);
    var status = str.split(',');
    console.info(str + ' ' +value+ ' ' + idx + ' ' +status);
    return status[1]; //status name
}

function customColumnStatus2(arrStatus, value) {
        for(var i=0; i<arrStatus.length; i++) {
            if (arrStatus[i][0] == value) return arrStatus[i][1];
        }
}

function getTaxRate(idtax) {
    //mengambil rate pajak berdasarkan idtax
    // Ext.Ajax.request({
    //     url: SITE_URL + 'backend/getSequence',
    //     method: 'POST',
    //     params: {
    //         seqName: seqName,
    //         seqField: seqField
    //     },
    //     success: function(form, action) {
    //         var d = Ext.decode(form.responseText);
    //         Ext.getCmp(fieldID).setValue(d.message);
    //     },
    //     failure: function(form, action) {
    //         Ext.getCmp(fieldID).setValue('Get sequence failure!');
    //     }
    // });
}

function setNoArticle(idunit, fieldpk, fieldname, table, el, prefix, extraparams) {
    if (prefix == null) {
        prefix = 'NO';
    }

    if (idunit == null) {
        Ext.Msg.alert('Failed', 'UNit is not set');
    } else {
        if (Ext.getCmp(el).getValue() === '') {
            Ext.Ajax.request({
                url: SITE_URL + 'setup/getNextNoArticle',
                method: 'GET',
                params: {
                    idunit: idunit,
                    fieldpk: fieldpk,
                    fieldname: fieldname,
                    table: table,
                    prefix: prefix,
                    extraparams: extraparams,
                },
                success: function(form, action) {
                    var d = Ext.decode(form.responseText);
                    Ext.getCmp(el).setValue(d.nextval);
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }

    }

}

function update_pos_footer(){
    console.log('update_pos_footer');

    var no_member = Ext.getCmp('no_member').getValue();
    var search_pos_field = Ext.getCmp('search_pos');
    search_pos_field.setValue(null);
    search_pos_field.focus();

    var grid_trx = Ext.getCmp('GridTransactionPOSID').getStore();
    var form = Ext.getCmp('EntryTransactionPOS').getForm();
    var subtotal = 0;
    var tax = 0;
    var total_disc = 0;
    var grandtotal = 0;
    var discount = str_replace(".", "",form.findField("total_disc").getValue())*1;
    var other_fee =  str_replace(".", "",form.findField("other_fee").getValue())*1;
    Ext.each(grid_trx.data.items, function(obj, i) {
        var price = str_replace(".00", "",obj.data.price)*1;
        var retail_price_member = str_replace(".00", "",obj.data.retail_price_member)*1;
        var disc = 0;
        var get_record = grid_trx.getAt(i);
        var new_qty = obj.data.qty;

        if(no_member!=null && no_member!=''){
            console.log(price+' '+retail_price_member)
            disc = price-retail_price_member;
        } else {
            disc = 0;
        }
        console.log('('+price+'-'+disc+')*'+new_qty+')');

        var total = (price-disc)*new_qty;
        var st = price*new_qty;

        get_record.set("qty",new_qty);
        get_record.set("disc",disc*new_qty);
        get_record.set("total",total);
        subtotal+=st;
        total_disc+=(disc*new_qty);
    });

    console.log('('+subtotal+'+'+other_fee+'-'+total_disc+')+'+tax);
    var total = (subtotal+other_fee-total_disc)+tax;
    // Ext.getCmp("df_subtotal").setValue(tes);
    Ext.getCmp('footer_subtotal_pos').setValue(renderNomor(subtotal));
    Ext.getCmp('footer_discount_pos').setValue(renderNomor(total_disc));
    // form.findField("df_tax").setValue(renderNomor(tax));
    form.findField("total_amount").setValue(total);
    form.findField("grandtotal").setValue(renderNomor(total));
}

function clear_form_pos(){
    Ext.getCmp('EntryTransactionPOS').getForm().reset();
    Ext.getCmp('GridTransactionPOSID').getStore().removeAll();
}

function setValueAcc(selectedRecord,winCmp,prefixCmp)
{
    // console.log(prefixCmp);
    Ext.getCmp('accname'+prefixCmp).setValue(selectedRecord.get('accname'));
    Ext.getCmp('idaccount'+prefixCmp).setValue(selectedRecord.get('idaccount'));
    var accnumberCmp = Ext.getCmp('accnumber'+prefixCmp);
    if(accnumberCmp!=undefined)
    {
        Ext.getCmp('accnumber'+prefixCmp).setValue(selectedRecord.get('accnumber'));
    }

    Ext.getCmp(winCmp).hide();
}