Ext.define('storeOpeningBalModel', {
    extend: 'Ext.data.Model',
    fields: ['idaccount', 'accnumber', 'accname', 'balance', 'credit','debit','idunit','idaccounttype'],
    idProperty: 'id'
});

var storeOpeningBal = Ext.create('Ext.data.Store', {
    model: 'storeOpeningBalModel',
    //remoteSort: true,
    // autoload:true,
    pageSize: 2000,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/openingBalance/setup',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        }
        //simpleSortMode: true
    },
    sorters: [{
            property: 'menu_name',
            direction: 'DESC'
        }]
});

Ext.define('EntryOpeningBalance', {
    extend: 'Ext.grid.Panel',
    id: 'EntryOpeningBalance',
    alias: 'widget.EntryOpeningBalance',
    xtype: 'cell-editing',
    title: 'Input Saldo Awal Akun',
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: 280,
            height: 100,
            forceFit: true,
            plugins: [this.cellEditing],
            store: storeOpeningBal,
            columns: [
                {
                    header: 'idunit',
                    hidden: true,
                    dataIndex: 'idunit'
                },{
                    header: 'idaccounttype',
                    hidden: true,
                    dataIndex: 'idaccounttype'
                }, {
                    header: 'idaccount',
                    hidden: true,
                    dataIndex: 'idaccount'
                },
                {
                    header: 'No Akun',
                    dataIndex: 'accnumber',
                    width: 50
                },
                {
                    header: 'Nama Akun',
                    dataIndex: 'accname',
                    width: 150
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Saldo',
                    width: 100,
                    dataIndex: 'balance',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0
                    }
                }
                // {
                //     xtype: 'numbercolumn',
                //     header: 'Debit',
                //     width: 100,
                //     dataIndex: 'debit',
                //     align: 'right',
                //     editor: {
                //         xtype: 'numberfield',
                //         allowBlank: false,
                //         minValue: 0
                //     }
                // },
                // {
                //     xtype: 'numbercolumn',
                //     header: 'Kredit',
                //     width: 100,
                //     dataIndex: 'credit',
                //     align: 'right',
                //     editor: {
                //         xtype: 'numberfield',
                //         allowBlank: false,
                //         minValue: 0
                //     }
                // }
            ],
            selModel: {
                selType: 'cellmodel'
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'comboxunit',
                            valueField: 'idunit',
                            id: 'cbUnitEntryOpeningBalance',
                            listeners: {
                                'change': function(field, newValue, oldValue) {
                                    loadCoa()
                                }
                            }
                        },
                        {
                            text: 'Refresh Akun',
                            handler: function(v){
                                loadCoa()
                            }
                        }
                    ]
                }, Ext.panel.Panel({
                    html: '<p><i>PETUNJUK:</i></p><p><i>- Tentukan Unit terlebih dahulu</i></p>\n\
<p><i>- Gunakan tanda minus (-) jika akun bernilai negatif</i></p><p><i>- Sisa saldo harus bernilai nol (balance).</i></p>'
                }),
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                            xtype: 'displayfield',
                            labelWidth: 200,
                            fieldLabel: '- Isi saldo awal akun pertanggal',
                            readOnly: true,
                            name: 'openingdate',
                            id: 'openingdate'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'prevmonth',
                            id: 'prevmonth'
                        }]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        
                        '->',
                        {
                            itemId: 'recordOpeningBalance',
                            id:'recordOpeningBalance',
                            text: 'Rekam Saldo Awal',
                            iconCls: 'disk',
                            handler: this.recordOpeningBal
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'displayfield',
                            labelWidth: 500,
                            fieldLabel: 'Sisa Saldo:0',
                            readOnly: true,
                            name: 'tampungsaldo',
                            id: 'tampungsaldo'
                        }
                    ]
                }
            ],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {
                },
                render: {
                    scope: this,
                    fn: function(grid) {
                        loadCoa();
//                        disableEntryJournal();
                    }
                }
            }
        });

        this.callParent();

        this.on('afterlayout', this.loadStore, this, {
            delay: 1,
            single: true
        });

        // this.on('afteredit', this.onAfterEdit, this);

        this.on({
            scope: this,
            edit: function() {
//                updateGridOpeningBalance();
            }
        });

        this.on('afteredit', this.onAfterEdit, this); this.on({
                    scope: this,
                    edit: function() {
                       calculateLeftAmount();
                    }
                });
    },
    onAfterEdit: function(o) {
        // handle after edit
//        console.log('after edit');
    },
    recordOpeningBal: function()
    {
        if (validasiOpeningBalance())
        {
            var json = Ext.encode(Ext.pluck(storeOpeningBal.data.items, 'data'));
//            var cbUnit = Ext.encode(Ext.getCmp('cbUnitEntryJournal').getValue());
//            var outofbalance = Ext.getCmp('outofbalance').getValue();
            Ext.Ajax.request({
                url: SITE_URL + 'setup/recordOpeningBalance',
                method: 'POST',
                params: {
                    datagrid: json,
                    idunit:Ext.getCmp('cbUnitEntryOpeningBalance').getValue(),
                    prevmonth: Ext.getCmp('prevmonth').getValue()
                },
                success: function(form, action) {

                    var d = Ext.decode(form.responseText);
                    Ext.Msg.alert('Success', d.message);

                    // Ext.getCmp('cbUnitEntryOpeningBalance').setValue(null);
                    var EntryOpeningBalance = Ext.getCmp('EntryOpeningBalance').getStore();
                    EntryOpeningBalance.removeAll();
                    EntryOpeningBalance.sync();
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }


    },
    saveRecurr: function() {
        if (validasiJurnal())
        {
            Ext.getCmp('formformRecc').getForm().reset();
            wformRecc.show();
        }
    },
    loadStore: function() {


//        this.getStore().load({
//            // store loading is asynchronous, use a load listener or callback to handle results
//            callback: this.onStoreLoad
//        });
    },
    onStoreLoad: function() {
//        Ext.Msg.show({
//            title: 'Store Load Callback',
//            msg: 'store was loaded, data available for processing',
//            icon: Ext.Msg.INFO,
//            buttons: Ext.Msg.OK
//        });
    },
    onAddClick: function() {
//        console.log(Ext.getCmp('cbUnitEntryOpeningBalance').setValue())
        if (Ext.getCmp('cbUnitEntryOpeningBalance').getValue() == null)
        {
            Ext.Msg.alert('Penyesuaian', 'Unit belum dipilih!');
        } else {
            Ext.getCmp('formAddRowOpeningBalance').getForm().reset();
            wAddRowOpeningBalance.show();
        }

    },
    onRemoveClick: function(grid, rowIndex) {
        this.getStore().removeAt(rowIndex);
        updateGridOpeningBalance()
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
})

function updateGridOpeningBalance()
{
//    console.log(tipe);
//    if (tipe == 'general')
//    {
//        //jurnal umu store storeJ        
////        var storeJ = storeJ;    
//        var addprefix = '';
//    } else if (tipe == 'recurring')
//    {
//        storeJ = storeJrec;
//        var addprefix = 'RecDetail';
//    }
////    console.log('outofbalance'+addprefix);
//    var totalcredit = 0 * 1;
//    var totaldebit = 0 * 1;
////    var totalpajak = 0*1;
//    var total = 0 * 1;
    console.log('update')
    Ext.each(storeInventoryOpeningBalance.data.items, function(obj, i) {
        total = obj.data.qty * 1 * obj.data.unitcost * 1;
        obj.set('amount', total);
    });
//
//    var selisih = totaldebit - totalcredit;
//    var d = totaldebit;
//    var c = totalcredit;
//    Ext.getCmp('outofbalance' + addprefix).setValue(selisih.toLocaleString('null', {minimumFractionDigits: 2}));
//    Ext.getCmp('totaldebit' + addprefix).setValue(d.toLocaleString('null', {minimumFractionDigits: 2}));
//    Ext.getCmp('totalcredit' + addprefix).setValue(c.toLocaleString('null', {minimumFractionDigits: 2}));
//                Ext.getCmp('totalpajak').setValue(totalpajak.toLocaleString('null',{minimumFractionDigits: 2}));

}

function validasiOpeningBalance()
{
    if (Ext.getCmp('cbUnitEntryOpeningBalance').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Unit belum dipilih');
    } else {
        return true;
    }
}


function calculateLeftAmount() {
    // console.log(storeOpeningBal.data.items)
    // var records = storeOpeningBal.getModifiedRecords(), fields = storeOpeningBal.fields;
    var params = {};
    // for(var i = 0; i < records.length; i++) {
    //     for(var j = 0; j < fields.length; j++){
    //         params['data[' + i + '].' + fields[j].name] = Ext.encode(records[i].get(fields[j].name));
    //     }
    // }
    var i=0;
    // Ext.each(storeOpeningBal.data.items, function(obj, i) {
    //     // console.log(obj.data)
    //     params[i] = Ext.encode(obj.data);
    //     // params[i]['idaccount'] = obj.data.idaccount;
    //     // params[i]['idaccounttype'] = obj.data.idaccounttype;
    //     // params[i]['balance'] = obj.data.balance;
    //     // params['data[' + i + '].' + obj.data.idaccount = Ext.encode(obj.data.accname);
    //     i++;
    // });
    // console.log(params)

    // Ext.each(storeOpeningBal.data.items, function(obj, i) {
        // console.log(obj.data)
    // var datanya = Ext.encode(storeOpeningBal.data.items);
        // params[i]['idaccount'] = obj.data.idaccount;
        // params[i]['idaccounttype'] = obj.data.idaccounttype;
        // params[i]['balance'] = obj.data.balance;
        // params['data[' + i + '].' + obj.data.idaccount = Ext.encode(obj.data.accname);
        // i++;
    // });

    var store_data = new Array();
    storeOpeningBal.each(function(node){
            store_data.push(JSON.stringify({idaccount: node.data.idaccount, accname: node.data.accname, balance:node.data.balance, idaccounttype:node.data.idaccounttype}))
    })

    // Ext.each(storeOpeningBal.data.items, function(obj, i) {
        Ext.Ajax.request({
            url: SITE_URL + 'setup/calculateLeftAmount',
            method: 'POST',
            params: {
                data: JSON.stringify(store_data)
            },
            success: function(form, action) {

                var d = Ext.decode(form.responseText);
                // Ext.Msg.alert('Success', d.message);

                Ext.getCmp('tampungsaldo').setFieldLabel(d.message);
                if(d.balance===true)
                {
                    Ext.getCmp('recordOpeningBalance').setDisabled(false);
                } else {
                    Ext.getCmp('recordOpeningBalance').setDisabled(true);
                }
            },
            failure: function(form, action) {
                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
            }
        });
    // });
}

function loadCoa(){
    storeOpeningBal.load({
                                        params: {
                                            'idunit': Ext.getCmp('cbUnitEntryOpeningBalance').getValue()
                                        }
                                    });

                                    Ext.Ajax.request({
                                        url: SITE_URL + 'setup/getLastPeriode',
                                        method: 'POST',
                                        params: {
                                            idunit: Ext.getCmp('cbUnitEntryOpeningBalance').getValue()
                                        },
                                        success: function(form, action) {

                                            var d = Ext.decode(form.responseText);
                                            if(d.udahinput)
                                            {
                                                Ext.Msg.alert('Perhatian', d.msg);
                                            }
                                            
                                            Ext.getCmp('openingdate').setValue('<b>' + d.date + '</b>');
                                            Ext.getCmp('prevmonth').setValue(d.date2);

                                        }
                                    });
}
