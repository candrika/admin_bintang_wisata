Ext.define('GridDashPendingDataModel', {
    extend: 'Ext.data.Model',
    fields: ['nasabah_id','nama_nasabah','datein'],
    idProperty: 'id'
});

var storeGridDashPendingData = Ext.create('Ext.data.Store', {
    pageSize: 50,
    model: 'GridDashPendingDataModel',
    proxy: new Ext.data.HttpProxy({
         actionMethods: {
            read: 'GET',
        },
        url: SITE_URL + 'get/datas/dashboardPendingData/transaksi',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        }
    }),
    sorters: [{
            property: 'menu_name',
            direction: 'DESC'
        }]
});

storeGridDashPendingData.on('beforeload',function(store, operation,eOpts){
       operation.params={
					// 'tipe_DashPendingData':1
					// 'startdate':Ext.getCmp('periodeDeklarasi1').getSubmitValue(),
					// 'enddate':Ext.getCmp('periodeDeklarasi2').getSubmitValue(),
//                    "extraparams": "a.tipe_perusahaan:ASURANSI"
                 };
             });

Ext.define('GridDashPendingData', {
    title: '<font color=white>Profit and Lost</font>',
    itemId: 'GridDashPendingDataID',
    id: 'GridDashPendingDataID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridDashPendingData',
    store: storeGridDashPendingData,
    loadMask: true,
    columns: [
        {header: 'nasabah_id', dataIndex: 'nasabah_id', hidden: true},
        {header: 'Label Name', dataIndex: 'nama_nasabah', minWidth: 150,flex:1},
        {header: 'Date', dataIndex: 'datein', minWidth: 150}
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridDashPendingData.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            var grid = Ext.ComponentQuery.query('GridDashPendingData')[0];
            showDetailNasabah(grid);
        }
    }
});




////////////////////////////////////////////////////////////////////////////////////////////
Ext.define('GridDashPendingEmEpModel', {
    extend: 'Ext.data.Model',
    fields: ['em_id','nasabah_id','type','percent','premi','state','create_date','jenis','nama_nasabah'],
    idProperty: 'id'
});

var storeGridDashPendingEmEp = Ext.create('Ext.data.Store', {
    pageSize: 50,
    model: 'GridDashPendingEmEpModel',
    proxy: new Ext.data.HttpProxy({
         actionMethods: {
            read: 'GET',
        },
        url: SITE_URL + 'get/datas/dashboardemep/surat',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        }
    }),
    sorters: [{
            property: 'menu_name',
            direction: 'DESC'
        }]
});

storeGridDashPendingEmEp.on('beforeload',function(store, operation,eOpts){
       operation.params={
					// 'tipe_DashPendingEmEp':1
					// 'startdate':Ext.getCmp('periodeDeklarasi1').getSubmitValue(),
					// 'enddate':Ext.getCmp('periodeDeklarasi2').getSubmitValue(),
//                    "extraparams": "a.tipe_perusahaan:ASURANSI"
                 };
             });

Ext.define('GridDashPendingEmEp', {
    title: '<font color=white>Gross Profit</font>',
    itemId: 'GridDashPendingEmEpID',
    id: 'GridDashPendingEmEpID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridDashPendingEmEp',
    store: storeGridDashPendingEmEp,
    loadMask: true,
    columns: [
        {header: 'em_id', dataIndex: 'em_id', hidden: true},
        {header: 'nasabah_id', dataIndex: 'nasabah_id', hidden: true},
        {header: 'Label Name', dataIndex: 'nama_nasabah', minWidth: 150,flex:1},
        {header: 'Jenis', dataIndex: 'type', minWidth: 50},
        {header: 'Date', dataIndex: 'create_date', minWidth: 50}
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridDashPendingEmEp.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
             var grid = Ext.ComponentQuery.query('GridDashPendingEmEp')[0];
             var selectedRecord = grid.getSelectionModel().getSelection()[0];
            // showDetailNasabah(grid);
            cetakSuratEm(selectedRecord.data.nama_nasabah,selectedRecord.data.em_id,selectedRecord.data.nasabah_id,selectedRecord.data.type);
            storeGridDashPendingEmEp.load();
        }
    }
});

////////////////////////////////////////////////////////////////////////////////

Ext.define('PendingClaim', {
    extend: 'Ext.data.Model',
    fields: ['nasabah_id','klaim_id','nama_nasabah','datein'],
    idProperty: 'id'
});

var storeGridDashPendingClaim = Ext.create('Ext.data.Store', {
    pageSize: 50,
    model: 'PendingClaim',
    proxy: new Ext.data.HttpProxy({
         actionMethods: {
            read: 'GET',
        },
        url: SITE_URL + 'get/datas/dataklaimkonfirm/klaim',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        }
    }),
    sorters: [{
            property: 'menu_name',
            direction: 'DESC'
        }]
});

storeGridDashPendingClaim.on('beforeload',function(store, operation,eOpts){
       operation.params={
					// 'tipe_DashPendingData':1
					// 'startdate':Ext.getCmp('periodeDeklarasi1').getSubmitValue(),
					// 'enddate':Ext.getCmp('periodeDeklarasi2').getSubmitValue(),
//                    "extraparams": "a.tipe_perusahaan:ASURANSI"
                 };
             });

Ext.define('GridDashPendingClaim', {
    title: '<font color=white>Expense</font>',
    itemId: 'GridDashPendingClaimID',
    id: 'GridDashPendingClaimID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridDashPendingClaim',
    store: storeGridDashPendingClaim,
    loadMask: true,
    columns: [
       {header: 'nasabah_id', dataIndex: 'nasabah_id', hidden: true},
       {header: 'klaim_id', dataIndex: 'klaim_id', hidden: true},
        {header: 'Label Name', dataIndex: 'nama_nasabah', minWidth: 150,flex:1},
        {header: 'Date', dataIndex: 'datein', minWidth: 150}
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridDashPendingData.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            var grid = Ext.ComponentQuery.query('GridDashPendingClaim')[0];
            showDataFormKlaim(grid)
            Ext.getCmp('btnSimpanBayarKlaim').hide();
            Ext.getCmp('btnSimpanKlaim').show();
        }
    }
});


/////////////////////////////////////////////////////////////////////////////////

Ext.define('GridDashPendingEndorsModel', {
    extend: 'Ext.data.Model',
   fields: ['nasabah_id', 'nasabah_id_old', 'perusahaan_id', 'nama_instansi', 'alamat_instansi', 'nama_nasabah', 'nama_produk', 'tgl_lahir', 'tempat_lahir', 'usia', 'alamat', 'kota', 'no_telp', 'email', 'no_hp', 'no_id', 'no_akad', 'mulai_asuransi', 'akhir_asuransi', 'periode', 'uang_pertanggungan', 'no_sertifikat', 'nama_kelamin', 'nama_perusahaan', 'namagolongan', 'namapekerjaan', 'nama_produk', 'tipe_underwriting', 'jenis_underwriting', 'nama_kelamin', 'rate', 'premi', 'statusname', 'usermod', 'datemod', 'statusid','confirm_bank_date','confirm_broker_date','totalpremi','totalpremiend'],
    idProperty: 'id'
});

var storeGridDashPendingEndors = Ext.create('Ext.data.Store', {
    pageSize: 50,
    model: 'GridDashPendingEndorsModel',
    proxy: new Ext.data.HttpProxy({
         actionMethods: {
            read: 'GET',
        },
       url: SITE_URL + 'get/datas/nasabahendor/transaksi',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        }
    }),
    sorters: [{
            property: 'menu_name',
            direction: 'DESC'
        }]
});

storeGridDashPendingEndors.on('beforeload', function (store, operation, eOpts) {
    operation.params = {
//        'startdate': Ext.getCmp('periodePendingEndors1').getSubmitValue(),
//        'enddate': Ext.getCmp('periodePendingEndors2').getSubmitValue(),
        'jenis':'pending',
        'extraparams': 'a.statusid:' + 8
    };
});


Ext.define('GridDashPendingEndors', {
    title: '<font color=white>Account Receivable</font>',
    itemId: 'GridDashPendingEndorsID',
    id: 'GridDashPendingEndorsID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridDashPendingEndors',
    store: storeGridDashPendingEndors,
    loadMask: true,
    columns: [
       {header: 'nasabah_id', dataIndex: 'nasabah_id', hidden: true},
        {header: 'Label Name', dataIndex: 'nama_nasabah', minWidth: 150,flex:1},
        {header: 'Date', dataIndex: 'datein', minWidth: 150}
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridDashPendingEndors.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            var grid = Ext.ComponentQuery.query('GridDashPendingEndors')[0];
                        showDetailNasabahEndors(grid);
                        Ext.getCmp('FormPengajuanEndors').show();
                        Ext.getCmp('TabItemDebitur').child('#FormPengajuanEndors').tab.show();
                        Ext.getCmp('btnUbahNS').hide();
                        Ext.getCmp('btnCancelEndors').hide();
                        Ext.getCmp('btnSimpanEndorsmentNS').hide();
                        btnProsesEndors(false);
        }
    }
});


///////////////////////////////////////////////////////////

Ext.define('GridDashPendingPengantarMedisModel', {
    extend: 'Ext.data.Model',
   fields: ['nasabah_id', 'nama_nasabah','filepengantarmedis','filepengantarmedisread'],
    idProperty: 'id'
});

var storeGridDashPendingPengantarMedis = Ext.create('Ext.data.Store', {
    pageSize: 50,
    model: 'GridDashPendingPengantarMedisModel',
    proxy: new Ext.data.HttpProxy({
         actionMethods: {
            read: 'GET',
        },
       url: SITE_URL + 'get/datas/suratmedisunread/transaksi',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        }
    }),
    sorters: [{
            property: 'menu_name',
            direction: 'DESC'
        }]
});

storeGridDashPendingPengantarMedis.on('beforeload', function (store, operation, eOpts) {
    operation.params = {
        'perusahaan_id':perusahaan_id
    };
});


Ext.define('GridDashPendingPengantarMedis', {
    title: '<font color=white>Account Payable</font>',
    itemId: 'GridDashPendingPengantarMedis',
    id: 'GridDashPendingPengantarMedis',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridDashPendingPengantarMedis',
    store: storeGridDashPendingPengantarMedis,
    loadMask: true,
    columns: [
       {header: 'nasabah_id', dataIndex: 'nasabah_id', hidden: true},
        {header: 'Label Name', dataIndex: 'nama_nasabah', minWidth: 150,flex:1},
        {header: 'File', dataIndex: 'filepengantarmedis', minWidth: 250}
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridDashPendingEndors.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            console.log(record);
            Ext.create('Ext.window.Window', {
                title: 'Surat Pengantar Medis '+record.data.nama_nasabah,
                width: 800,
                height: 600,
                modal   : true,
                //closeAction: 'hide',
                items: [
                    {
                        xtype: 'component',
                        html: '<iframe src="'+BASE_URL+'/upload/dokumen/' + record.data.filepengantarmedis + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
                    }
                ]
            }).show();

            Ext.Ajax.request({
                url: SITE_URL + 'save/setreadpengantarmedis/',
                method: 'POST',
                params: {nasabah_id: record.data.nasabah_id},
                success: function (form, action) {
                    // var d = Ext.decode(form.responseText);
                    storeGridDashPendingPengantarMedis.load();
                },
                failure: function (form, action) {
                    storeGridDashPendingPengantarMedis.load();
                }
            });
        }
    }
});

///////////////////////////////////////////////////////////

Ext.define('GridDashSuratDeclineModel', {
    extend: 'Ext.data.Model',
   fields: ['nasabah_id', 'nasabah_id_old', 'perusahaan_id', 'nama_instansi', 'alamat_instansi', 'nama_nasabah', 'nama_produk', 'tgl_lahir', 'tempat_lahir', 'usia', 'alamat', 'kota', 'no_telp', 'email', 'no_hp', 'no_id', 'no_akad', 'mulai_asuransi', 'akhir_asuransi', 'periode', 'uang_pertanggungan', 'no_sertifikat', 'nama_kelamin', 'nama_perusahaan', 'namagolongan', 'namapekerjaan', 'nama_produk', 'tipe_underwriting', 'jenis_underwriting', 'nama_kelamin', 'rate', 'premi', 'statusname', 'usermod', 'datemod', 'statusid','confirm_bank_date','confirm_broker_date','totalpremi','totalpremiend'],
    idProperty: 'id'
});

var storeGridDashSuratDecline = Ext.create('Ext.data.Store', {
    pageSize: 50,
    model: 'GridDashSuratDeclineModel',
    proxy: new Ext.data.HttpProxy({
         actionMethods: {
            read: 'GET',
        },
       url: SITE_URL + 'get/datas/nasabahendor/transaksi',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        }
    }),
    sorters: [{
            property: 'menu_name',
            direction: 'DESC'
        }]
});

storeGridDashSuratDecline.on('beforeload', function (store, operation, eOpts) {
    operation.params = {
//        'startdate': Ext.getCmp('periodePendingEndors1').getSubmitValue(),
//        'enddate': Ext.getCmp('periodePendingEndors2').getSubmitValue(),
        'jenis':'pending',
        'extraparams': 'a.statusid:' + 8
    };
});


Ext.define('GridDashSuratDecline', {
    title: '<font color=white>Cash Flow</font>',
    itemId: 'GridDashSuratDecline',
    id: 'GridDashSuratDecline',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridDashSuratDecline',
    store: storeGridDashSuratDecline,
    loadMask: true,
    columns: [
       {header: 'nasabah_id', dataIndex: 'nasabah_id', hidden: true},
        {header: 'Label Name', dataIndex: 'nama_nasabah', minWidth: 150,flex:1},
        {header: 'Date', dataIndex: 'datein', minWidth: 150}
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridDashPendingEndors.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            var grid = Ext.ComponentQuery.query('GridDashSuratDecline')[0];
                        showDetailNasabahEndors(grid);
                        Ext.getCmp('FormPengajuanEndors').show();
                        Ext.getCmp('TabItemDebitur').child('#FormPengajuanEndors').tab.show();
                        Ext.getCmp('btnUbahNS').hide();
                        Ext.getCmp('btnCancelEndors').hide();
                        Ext.getCmp('btnSimpanEndorsmentNS').hide();
                        btnProsesEndors(false);
        }
    }
});


