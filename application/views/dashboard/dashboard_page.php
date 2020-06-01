<?php $this->load->view('dashboard/v_header') ?>
<script src='<?= base_url() ?>/assets/js/app/dashboard/accListChartLine.js'></script>
<script src='<?= base_url() ?>/assets/js/app/dashboard/chartline_account.js'></script>

<script src='<?= base_url() ?>/assets/js/app/dashboard/labarugi.js'></script>
<script src='<?= base_url() ?>/assets/js/app/dashboard/hutangGrid.js'></script>
<script src='<?= base_url() ?>/assets/js/app/dashboard/neraca.js'></script>
<script src='<?= base_url() ?>/assets/js/app/dashboard/pendapatanPie.js'></script>
<style>
    .propPane .x-panel-header {
        background: #fff;
        color: #000;
    }
</style>
<script>



    var year = new Date().getFullYear();

    var idunit = null;
    var namaunit = null;
    Ext.Ajax.request({
        url: SITE_URL + 'dashboard/randomUnit',
        async: false,
        method: 'GET',
        success: function(form, action) {
            var d = Ext.decode(form.responseText);

            insertVar(d.idunit, d.namaunit);
        }
    });

    function insertVar(parameter, parameter2) {
        idunit = parameter;
        namaunit = parameter2;
    }

    var idaccount = null;
    var accname = null;
    var accnumber = null;
    Ext.Ajax.request({
        url: SITE_URL + 'dashboard/getrandomAcc/' + idunit,
        async: false,
        method: 'GET',
        success: function(form, action) {
            var d = Ext.decode(form.responseText);

            insertVarAcc(d.idaccount, d.accname, d.accnumber);
        }
    });
    function insertVarAcc(parameter, parameter2, parameter3) {
        idaccount = parameter;
        accname = parameter2;
        accnumber = parameter3;
    }

    var judul = 'Pergerakan Saldo Akun ';
//    console.log(idaccount);
</script>
<!--<script src='<?= base_url() ?>/assets/js/app/personalia/gridcuti.js'></script>-->

<!--<script src='<?= base_url() ?>/assets/js/app/dashboard/chartline_account.js'></script>-->

<script>

    var downloadChart = function(chart) {
        Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function(choice) {
            if (choice == 'yes') {
                chart.save({
                    type: 'image/png'
                });
            }
        });
    };

    Ext.onReady(function() {
        

        

        var windowH = Ext.getBody().getViewSize().height;
        var windowW = Ext.getBody().getViewSize().width;
        var h = windowH / 2;
        var dibagi3 = windowW / 3 - 10;
        var w1 = dibagi3;
        var w2 = dibagi3;
        var w3 = dibagi3;

        var hBagi2 = windowH / 2 * 1 - 35;
        var wKiri = windowW * 1 * 0.35;

        if (windowH <= 682)
        {
            //laptop 14'
            var sizeH = windowH - 100;
        } else if (windowH > 682) {
            //desktop
            var sizeH = windowH - 200;
        }

        

        var distribusiStore = Ext.create('Ext.data.Store', {
            fields: ['value', 'field'],
            data: [
                {"field": "Penerimaan","value": 1},
                {"field": "Pengeluaran","value": 2}
                //...
            ]
//            fields: ['value', 'field'],
//            data: [
//                {"1": "Penerimaan"},
//                {"2": "Pengeluaran"}
//            ]
        });
        // distribusiStore.load();

        var panel4 = Ext.create('widget.panel', {
            id: 'panel4',
            padding: '0 45 0 5',
            bodyPadding: '0 0 0 0',
            width: wKiri,
            height: hBagi2,
            rowspan: 1,
            title: 'Distribusi Penerimaan',
            layout: 'fit',
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        Ext.create('Ext.form.field.ComboBox', {
                            displayField: 'field',
                            queryMode: 'local',
                            id: 'iddistribusi',
                            name: 'field',
                            editable: false,
                            triggerAction: 'all',
                            valueField: 'value',
                            value:1,
                            allowBlank: false,
                            store: distribusiStore,
                            listeners: {
                                'change': function() {
                                    if(Ext.getCmp('iddistribusi').getValue()==1)
                                    {
                                        var dis = 'Penerimaan';
                                    } else {
                                        var dis = 'Pengeluaran';
                                    }
                                     Ext.getCmp('panel4').setTitle('Distribusi '+dis);
                                     storePiePendapatan.loadData(generateDataPiePendapatan(Ext.getCmp('idunitOption').getValue(),Ext.getCmp('iddistribusi').getValue(),Ext.getCmp('monthOption').getValue(),Ext.getCmp('tahunOption').getSubmitValue()));
                                    // storePiePendapatan.loadData(generateDataPiePendapatan(Ext.getCmp('idunitOption').getValue(),Ext.getCmp('iddistribusi').getValue()));
                                }
                            }
                        })
                    // , {
                    //         xtype: 'comboxunit',
                    //         id: 'idunitDistribusi',
                    //         valueField: 'idunit',
                    //         labelWidth: 50,
                    //         name: 'idunit',
                    //         value: idunit,
                    //         anchor: '80%',
                    //         listeners: {
                    //             'change': function() {
                    //                 storePiePendapatan.loadData(generateDataPiePendapatan(Ext.getCmp('idunitDistribusi').getValue(),Ext.getCmp('iddistribusi').getValue()));
                    //             }
                    //         }
                    //     }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'piePendapatan'
                }
            ]
        });

        var panel3 = Ext.create('widget.panel', {
            id: 'panel3',
            padding: '0 5 0 5',
            bodyPadding: '0 0 0 0',
            width: wKiri,
            height: hBagi2,
            rowspan: 1,
            title: 'Neraca',
            layout: 'fit',
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                    // {
                    //         xtype: 'comboxunit',
                    //         id: 'idunitNeraca',
                    //         valueField: 'idunit',
                    //         labelWidth: 50,
                    //         name: 'idunit',
                    //         value: idunit,
                    //         anchor: '80%',
                    //         listeners: {
                    //             'change': function() {
                    //                 storeNeraca.loadData(generateDataNeraca(Ext.getCmp('idunitNeraca').getValue()));
                    //             }
                    //         }
                    //     }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'chartNeraca',
                    margin: '0 0 0 0'
                }
            ]
        });

        var panel2 = Ext.create('widget.panel', {
            id: 'panel2',
//            width: dibagi3 + dibagi3 + 10,
//            height: h - 20,
            padding: '5px',
            bodyPadding: '0 0 0 0',
//            colspan: 3,
            width: wKiri,
            height: hBagi2,
            rowspan: 1,
            title: 'Laba Rugi',
            layout: 'fit',
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                    // {
                    //         xtype: 'comboxunit',
                    //         id: 'idunitLR',
                    //         valueField: 'idunit',
                    //         labelWidth: 50,
                    //         name: 'idunit',
                    //         value: idunit,
                    //         anchor: '80%',
                    //         listeners: {
                    //             'change': function() {
                    //                 storeLabaRugi.loadData(generateDataLabaRugi(Ext.getCmp('idunitLR').getValue()));
                    //             }
                    //         }
                    //     }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'chartLabaRugi',
                    margin: '0 0 0 0'
                }
            ]
        });

        var panel1 = Ext.create('widget.panel', {
            id: 'akunChartTitle',
//            width: dibagi3 + dibagi3 + 10,
//            width:'100%',
//            height: h,
//            padding: '5px',
            padding: '5 20 5 1',
            bodyPadding: '0 0 0 0',
//            colspan: 3,
            width: windowW * 1 * 0.65,
            height: hBagi2,
            colspan: 2,
            title: judul + year,
            layout: 'fit',
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
//                         {
//                             xtype: 'datefield',
//                             name: 'tahun',
//                             labelWidth: 50,
//                             width: 90,
//                             value: year,
//                             id: 'tahunDashboard',
//                             format: 'Y',
// //                            fieldLabel: 'tahun',
//                             listeners: {
//                                 'change': function() {
//                                     Ext.getCmp('akunChartTitle').setTitle(judul + ' ' + Ext.getCmp('tahunDashboard').getSubmitValue());
//                                 }
//                             }
//                         },
//                         {
//                             xtype: 'comboxunit',
//                             id: 'idunitDashboard',
//                             valueField: 'idunit',
//                             labelWidth: 30,
//                             width: 150,
//                             name: 'idunit',
//                             value: idunit,
//                             anchor: '80%'
//                         }, 
                        {
                            xtype: 'textfield',
                            labelWidth: 50,
                            fieldLabel: 'Akun',
                            name: 'accname',
                            value: accname,
                            allowBlank: false,
                            id: 'accnameDashboard',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        if (Ext.getCmp('idunitOption').getValue() == null)
                                        {
                                            Ext.Msg.alert('Peringatan', 'Unit belum dipilih');
                                        } else {
                                            windowPopupAccListDashboard.show();
                                            storeAccountAktive.load({
                                                params: {
                                                    'namaunit': Ext.getCmp('idunitOption').getValue()
                                                }
                                            });
                                        }

                                    });
                                }
                            }
                        },
                        {
                            xtype: 'displayfield',
                            labelWidth: 50,
                            padding: '0 0 0 5',
                            //                                            fieldLabel: ' ',
                            id: 'accnumberDashboard',
                            name: 'accnumber',
                            readOnly: true
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'idaccountDashboard',
                            name: 'idaccount',
                            value: idaccount,
                            readOnly: true
                        }, '->', {
                            text: 'Reload',
                            handler: function() {
                               // alert(generateData(12, Ext.getCmp('idaccountDashboard').getValue(),Ext.getCmp('tahunDashboard').getSubmitValue()));

                                // store1.loadData(generateData(12, Ext.getCmp('idaccountDashboard').getValue(),Ext.getCmp('tahunOption').getSubmitValue(),Ext.getCmp('idunitOption').getValue()));
                            }
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'chartLineAccount',
                    margin: 0
                }
            ]
        });


        var dashboardHutang = Ext.create('Ext.form.Panel', {
            id: 'dashboardSummary',
            width: w3,
            height: h - 20,
            colspan: 2,
            title: 'Daftar Hutang',
            padding: '5px',
            autoScroll: true,
            labelAlign: 'top',
            fieldDefaults: {
                labelWidth: 200,
                width: 480
            },
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Struktural',
                    name: 'jumstruktural'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Fungsional Ahli',
                    name: 'jumfahli'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Fungsional Lain',
                    name: 'jumflain'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Dewan Komisaris',
                    name: 'jumdekom'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Manajerial dan Supervisori',
                    name: 'jummanajerial'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Kepakaran',
                    name: 'jumkepakaran'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Keteknisan dan Operatif',
                    name: 'jumketeknisan'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Konstruksi',
                    name: 'jumkonstruksi'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Pembebasan Jabatan',
                    name: 'jumpembebasan'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Direksi',
                    name: 'jumdireksi'
                }]
        });
        //endsummary

        //last login
        Ext.define('LastLogin', {
            extend: 'Ext.data.Model',
            fields: ['pegawainid', 'jammasuk', 'tanggal', 'bulan', 'tahun', 'is_referral', 'browser', 'version', 'mobile', 'robot', 'referrer', 'agent_string', 'userin', 'usermod', 'datein', 'datemod', 'ipaddress', 'loginlogid', 'username'],
            idProperty: 'id'
        });
//
        var storeGridLastLogin = Ext.create('Ext.data.Store', {
            pageSize: 15,
            model: 'LastLogin',
            autoload: true,
            proxy: {
                type: 'ajax',
                url: SITE_URL + 'backend/ext_get_all/LastLogin',
                actionMethods: 'POST',
                reader: {
                    root: 'rows',
                    totalProperty: 'results'
                },
            },
            sorters: [{
                    property: 'datein',
                    direction: 'DESC'
                }]
        });

        var gridLastLogin = Ext.create('Ext.grid.Panel',
                {
                    title: 'Last Login',
                    width: w1,
                    padding: '5px',
                    store: storeGridLastLogin,
                    columns: [
                        {text: "NIP", dataIndex: 'pegawainid'},
                        {text: "Waktu", width: 150, dataIndex: 'datein'},
                        {text: "Username", width: 380, dataIndex: 'username'}],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            store: storeGridLastLogin, // same store GridPanel is using
                            dock: 'bottom',
                            displayInfo: true
                                    // pageSize:20
                        }]
                });
        //end last login



//        var panel = Ext.create('Ext.Panel', {
//            id: 'main-panel',
//            renderTo: Ext.getBody(),
//            layout: {
//                type: 'table',
//                columns: 4
//            },
//            // applied to child components
//            defaults: {height: h},
//            items: [
//                panel1,
//                panelHutang,
//                panel2,
//                dashboardHutang
//            ]
//        });
//
//var windowH = Ext.getBody().getViewSize().height;
//var windowW = Ext.getBody().getViewSize().width;
//
//var hBagi2 = windowH/2*1-5;
//var wKiri = windowW*1*0.35;

        Ext.create('Ext.panel.Panel', {
//          title: 'Table Layout',
            width: '100%',
            height: windowH,
            // height:windowH,
            layout: {
                type: 'table',
                columns: 3
            },
            defaults: {
                // applied to each contained panel
                bodyStyle: 'padding:20px',
                border: true
            },
            items: [
                Ext.create('widget.panel', {
                   padding: '5 5 5 5',
                   width: wKiri,
                   height: 50,
                   rowspan: 1,
                   dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [{
                                    xtype: 'comboxunit',
                                    id: 'idunitOption',
                                    fieldLabel:'',
                                    valueField: 'namaunit',
                                    labelWidth: 20,
                                    name: 'idunit',
                                    flex:1,
                                    value: namaunit,
                                    anchor: '80%',
                                    listeners: {
                                        'change': function() {
                                            loadDataDashboard();
                                        }
                                    }
                                },
                                {
                                    xtype: 'comboxbulan2',
                                    width:90,                                    
                                    // anchor: '100%',
                                    // fieldLabel: 'Bulan Tutup Buku',
                                    name: 'monthOption',
                                    id:'monthOption',
                                    listeners: {
                                        'change': function() {
                                            loadDataDashboard();
                                        }
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'tahun',
                                    labelWidth: 50,
                                    width: 90,
                                    value: year,
                                    id: 'tahunOption',
                                    format: 'Y',
        //                            fieldLabel: 'tahun',
                                    listeners: {
                                        'change': function() {
                                            loadDataDashboard();
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }),
                Ext.create('widget.panel', {
                     padding: '5 20 5 1',
                    bodyPadding: '0 0 0 0',
        //            colspan: 3,
                    width: windowW * 1 * 0.65,
                    height: 50,
                    colspan: 2,
                    dockedItems: [
                        {
                                xtype: 'toolbar',
                                dock: 'top',
                                items: [
                                            {
                                                text: 'Entry Pemasukan',
                                                iconCls: 'add-icon',
                                                flex:1,
                                                handler: function() {
                                                    wEntryReceiveMoney.show(); 
                                                }
                                            },
                                             {
                                                text: 'Entry Pengeluaran',
                                                iconCls: 'add-icon',
                                                flex:1,
                                                handler: function() {
                                                    wEntrySpendMoney.show(); 
                                                }
                                            },
                                             {
                                                text: 'Inbox',
                                                iconCls: 'add-icon',
                                                flex:1,
                                                handler: function() {
                                                   
                                                    wEntryReceiveSiswaMoneySiswa.show();
                                                }
                                            }
                            ]
                        }
                    ]                        
                }),
        //        {
        //            html: 'Cell A content',
        //            padding: '5 20 5 1',
        //             bodyPadding: '0 0 0 0',
        // //            colspan: 3,
        //             width: windowW * 1 * 0.65,
        //             height: 50,
        //             colspan: 2,
        //        },
                panel2,
//                {
//                    html: 'Cell B content',
//                    width: windowW * 1 * 0.65,
//                    height: hBagi2,
//                    colspan: 2
//                },
                panel1,
//                {
//                    html: 'Cell A2 content',
//                    width: wKiri,
//                    height: hBagi2,
//                    rowspan: 1
//                },
                panel3,
//                {
//                    html: 'Cell C content',
//                    width: windowW * 1 * 0.325,
//                    height: hBagi2,
//                    cellCls: 'highlight'
//                },
                {
                    xtype: 'gridHutang',
                    bodyPadding: '0 0 0 0',
//                    padding:'5px',
                    width: windowW * 1 * 0.325,
                    border: false,
                    height: hBagi2
                },
                panel4
//                {
//                    html: 'Cell D content',
//                    width: windowW * 1 * 0.325,
//                    height: hBagi2
//                }
            ],
            renderTo: Ext.getBody()
        });

//          var dashboardSummary = Ext.create('dashboardSummary');
//        var dashboardSummary = Ext.getCmp('dashboardSummary');
//
//        dashboardSummary.getForm().load({
//            url: SITE_URL + 'dashboard/loadSummaryKeljab',
//            // params: {
//            //     consignmentRef: myConsignmentRef
//            // },
//            success: function(form, action) {
//                // Ext.Msg.alert("Load failed", action.result.errorMessage);
//            },
//            failure: function(form, action) {
//                Ext.Msg.alert("Load failed", action.result.errorMessage);
//            }
//        });
//
//        storeGridHutang.load();
//        storeGridLastLogin.load();
      
         Ext.Ajax.request({
            url: SITE_URL + 'dashboard/getLastClosing/'+idunit,
            success: function(form, action) {
                // console.log('POST');
                var d = Ext.decode(form.responseText);

                if(d.success)
                {
                    Ext.getCmp('panel2').setTitle('Laba Rugi per ' + d.m + ' ' + d.y);
                    Ext.getCmp('panel3').setTitle('Neraca    per ' + d.m + ' ' + d.y);
                    Ext.getCmp('akunChartTitle').setTitle(judul + ' ' + accname + ' ' + d.y);

                    Ext.getCmp('tahunOption').setValue(d.y);
                    Ext.getCmp('monthOption').setValue(d.m);

                    loadDataDashboard();
                } else {

                }
                // store1.loadData(generateData(12, 681,Ext.getCmp('tahunOption').getSubmitValue(),Ext.getCmp('idunitOption').getValue()));
                // storeGridHutang.load();
                // console.log(Ext.getCmp('idaccountDashboard').getValue(),d.y.getSubmitValue()+","+Ext.getCmp('idunitOption').getValue());
                // storeLabaRugi.loadData(generateDataLabaRugi(Ext.getCmp('idunitOption').getValue()));
                // store1.loadData(generateData(12, Ext.getCmp('idaccountDashboard').getValue(),d.y,Ext.getCmp('idunitOption').getValue()));
                // storePiePendapatan.loadData(generateDataPiePendapatan(Ext.getCmp('idunitOption').getValue(),Ext.getCmp('iddistribusi').getValue()));
                // storeNeraca.loadData(generateDataNeraca(Ext.getCmp('idunitOption').getValue()));

                
            }
        });
        
    });

function loadDataDashboard()
{
     storeLabaRugi.loadData(generateDataLabaRugi(Ext.getCmp('idunitOption').getValue(),Ext.getCmp('monthOption').getValue(),Ext.getCmp('tahunOption').getSubmitValue()));
     store1.loadData(generateData(12, Ext.getCmp('idaccountDashboard').getValue(),Ext.getCmp('tahunOption').getSubmitValue(),Ext.getCmp('idunitOption').getValue()));
     storePiePendapatan.loadData(generateDataPiePendapatan(Ext.getCmp('idunitOption').getValue(),Ext.getCmp('iddistribusi').getValue(),Ext.getCmp('monthOption').getValue(),Ext.getCmp('tahunOption').getSubmitValue()));
     storeNeraca.loadData(generateDataNeraca(Ext.getCmp('idunitOption').getValue(),Ext.getCmp('monthOption').getValue(),Ext.getCmp('tahunOption').getSubmitValue()));
}
</script>




<style type="text/css">
    #main-panel td {
        /*        padding:5px;*/
    }
</style>

<body>


</body>