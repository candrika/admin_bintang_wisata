Ext.define(dir_sys + 'report.AllReportingGrid', {
    // extend: 'Ext.panel.Panel',
    alias: 'widget.AllReportingGrid',
    extend: 'Ext.Container',
    xtype: 'basic-panels',
    // width: 660,
    anchor: '100%',
    requires: [
        'Ext.layout.container.Table'
    ],
    layout: {
        type: 'table',
        columns: 4,
        tdAttrs: { style: 'padding: 5px;' }
    },
    defaults: {
        xtype: 'panel',
        width: (panelW - 225) / 4,        
        height: 75,
        bodyPadding: 1
    },

    initComponent: function() {

            this.items = [
                {
                    //title: '<center>Laba dan Rugi</center>',
                    // id: 'total_loan_summary',
                    border: true,
                    html: "<center style='padding: 5px;'><span style=background-color: #add2ed;><a class='button_report' onClick='windowSummaryPatient();'>Rekapitulasi Pasien</a></span>  <br><br></center>"
                }, {
                    //title: '<center>Buku Besar</center>',
                    // id: 'total_loan_summary',
                    border: true,
                    html: "<center style='padding: 5px;'><span style=background-color: #add2ed;><a class='button_report' onClick='WindowSummarydiognosisperdisease();'>Rekapitulasi Diagnosa per Penyakit</a></span>  <br><br></center>"
                }, 
                 {
                    //title: '<center>Penerimaan Tahunan</center>',
                    // id: 'total_loan_summary',
                    border: true,
                    html: "<center style='padding: 5px;'><span style=background-color: #add2ed;><a class='button_report' onClick='WindowSummarydiognosisperaction();'>Rekapitulasi Diagnosa per Tindakan</a></span>  <br><br></center>"
                }, {
                    //title: '<center>Pengeluaran Tahunan</center>',
                    // id: 'total_loan_summary',
                    border: true,
                    html: "<center style='padding: 5px;'><span style=background-color: #add2ed;><a class='button_report' onClick='WindowsalesSummarydrug();'>Rekapitulasi Penjualan obat Tunai</a></span>  <br><br> </center>"
                },{
                    //title: '<center>Simpanan</center>',
                    // id: 'total_loan_summary',
                     border: true,
                    html: "<center style='padding: 5px;'><span style=background-color: #add2ed;><a class='button_report' onClick='WindowsalesinvSummarydrug();'>Rekapitulasi Penjualan Obat Belum Lunas</a></span>  <br><br> </center>"
                }, {
                    //title: '<center>Pinjaman</center>',
                    // id: 'total_loan_summary',
                    border: true,
                    html: "<center style='padding: 5px;'><span style=background-color: #add2ed;><a class='button_report' onClick='WindowSummarydrugusage();'>Rekapitulasi Pengunaan Obat</a></center>"
                }, 
                {
                    //title: '<center>Pinjaman</center>',
                    hidden:true,
                    // id: 'total_loan_summary',
                    border: true,
                    html: "<center style='padding: 5px;'><span style=background-color: #add2ed;><a class='button_report' onClick='WindowSummarypharmacyreceipt();'>Rekapitulasi Penerimaan Resep</a></span>  <br><br> </center>"
                },
                {
                    //title: '<center>Pinjaman</center>',
                    // hidden:true,
                    // id: 'total_loan_summary',
                    border: true,
                    html: "<center style='padding: 5px;'><span style=background-color: #add2ed;><a class='button_report' onClick='Windowpharmacyputtingreceipt();'>Laporan Pengambilan Obat</a></span>  <br><br> </center>"
                },
                {
                    //title: '<center>Pinjaman</center>',
                    // hidden:true,
                    // id: 'total_loan_summary',
                    border: true,
                    html: "<center style='padding: 5px;'><span style=background-color: #add2ed;><a class='button_report' onClick='WindowReportBill();'>Laporan Rekapitulasi Tagihan</a></span>  <br><br> </center>"
                }
            ];

            this.callParent();
        }
});

var date = new Date(), y = date.getFullYear(), m = date.getMonth();
var firstDay = new Date(y, m, 1);
var lastDay = new Date(y, m + 1, 0);

function windowSummaryPatient(){
    if (!Ext.isDefined(Ext.getCmp('WindowReportPatient'))) {
        var WindowReportPatient = Ext.create(dir_sys + 'report.WindowReportPatient');
    } else {
        var WindowReportPatient = Ext.getCmp('WindowReportPatient');
    }

    WindowReportPatient.show();
}

function WindowSummarydiognosisperdisease(){
    if (!Ext.isDefined(Ext.getCmp('WindowReportdiagnosisperDisease'))) {
        var WindowReportdiagnosisperDisease = Ext.create(dir_sys + 'report.WindowReportdiagnosisperDisease');
    } else {
        var WindowReportdiagnosisperDisease = Ext.getCmp('WindowReportdiagnosisperDisease');
    }

    WindowReportdiagnosisperDisease.show();
}

function WindowSummarydiognosisperaction(){
    if (!Ext.isDefined(Ext.getCmp('WindowReportdiagnosisperAction'))) {
        var WindowReportdiagnosisperAction = Ext.create(dir_sys + 'report.WindowReportdiagnosisperAction');
    } else {
        var WindowReportdiagnosisperAction = Ext.getCmp('WindowReportdiagnosisperAction');
    }

    WindowReportdiagnosisperAction.show();
}

function WindowsalesSummarydrug(){
    if (!Ext.isDefined(Ext.getCmp('WindowReportsalescash'))) {
        var WindowReportsalescash = Ext.create(dir_sys + 'report.WindowReportsalescash');
    } else {
        var WindowReportsalescash = Ext.getCmp('WindowReportsalescash');
    }

    WindowReportsalescash.show();
}

function WindowsalesinvSummarydrug(){
    if (!Ext.isDefined(Ext.getCmp('WindowReportsalesunpaid'))) {
        var WindowReportsalesunpaid = Ext.create(dir_sys + 'report.WindowReportsalesunpaid');
    } else {
        var WindowReportsalesunpaid = Ext.getCmp('WindowReportsalesunpaid');
    }

    WindowReportsalesunpaid.show();
}

function WindowSummarydrugusage(){
    if (!Ext.isDefined(Ext.getCmp('WindowReportdrugUsage'))) {
        var WindowReportdrugUsage = Ext.create(dir_sys + 'report.WindowReportdrugUsage');
    } else {
        var WindowReportdrugUsage = Ext.getCmp('WindowReportdrugUsage');
    }

    WindowReportdrugUsage.show();    
}

function WindowSummarypharmacyreceipt(){
    if (!Ext.isDefined(Ext.getCmp('WindowReportpharmacyreceipt'))) {
        var WindowReportpharmacyreceipt = Ext.create(dir_sys + 'report.WindowReportpharmacyreceipt');
    } else {
        var WindowReportpharmacyreceipt = Ext.getCmp('WindowReportpharmacyreceipt');
    }

    WindowReportpharmacyreceipt.show();  
}

function Windowpharmacyputtingreceipt(){
    if (!Ext.isDefined(Ext.getCmp('Windowpharmacyputtingreceipt'))) {
        var pharmacyputtingreceipt = Ext.create(dir_sys + 'report.Windowpharmacyputtingreceipt');
    } else {
        var pharmacyputtingreceipt = Ext.getCmp('Windowpharmacyputtingreceipt');
    }

    pharmacyputtingreceipt.show();
}

function WindowReportBill(){
    if (!Ext.isDefined(Ext.getCmp('WindowReportBill'))) {
        var WindowReportBill = Ext.create(dir_sys + 'report.WindowReportBill');
    } else {
        var WindowReportBill = Ext.getCmp('WindowReportBill');
    }

    WindowReportBill.show();

    // Ext.getCmp('tanggalReportKasMasuk1').setValue(firstDay);
    // Ext.getCmp('tanggalReportKasMasuk2').setValue(lastDay);
}

// function WindowReportCashOut(){
//     if (!Ext.isDefined(Ext.getCmp('WindowReportCashOut'))) {
//         var WindowReportCashOut = Ext.create(dir_sys + 'report.WindowReportCashOut');
//     } else {
//         var WindowReportCashOut = Ext.getCmp('WindowReportCashOut');
//     }

//     WindowReportCashOut.show();

//     Ext.getCmp('tanggalReportKasKeluar1').setValue(firstDay);
//     Ext.getCmp('tanggalReportKasKeluar2').setValue(lastDay);
// }

// function WindowReportLoan(){
//     if (!Ext.isDefined(Ext.getCmp('WindowReportLoan'))) {
//         var WindowReportLoan = Ext.create(dir_sys + 'report.WindowReportLoan');
//     } else {
//         var WindowReportLoan = Ext.getCmp('WindowReportLoan');
//     }

//     WindowReportLoan.show();
// }

// function WindowReportPurchase(){
//     if (!Ext.isDefined(Ext.getCmp('WindowReportPurchase'))) {
//         var WindowReportPurchase = Ext.create(dir_sys + 'report.WindowReportPurchase');
//     } else {
//         var WindowReportPurchase = Ext.getCmp('WindowReportPurchase');
//     }

//     WindowReportPurchase.show();
// }

// function WindowReportSales(){
//     if (!Ext.isDefined(Ext.getCmp('WindowReportSales'))) {
//         var WindowReportSales = Ext.create(dir_sys + 'report.WindowReportSales');
//     } else {
//         var WindowReportSales = Ext.getCmp('WindowReportSales');
//     }

//     WindowReportSales.show();
// }

// function WindowReportSaving(){
//     if (!Ext.isDefined(Ext.getCmp('WindowReportSaving'))) {
//         var WindowReportSaving = Ext.create(dir_sys + 'report.WindowReportSaving');
//     } else {
//         var WindowReportSaving = Ext.getCmp('WindowReportSaving');
//     }

//     WindowReportSaving.show();

//     Ext.getCmp('tanggalreportSaving1').setValue(firstDay);
//     Ext.getCmp('tanggalreportSaving2').setValue(lastDay);
// }

// function WindowReportYearlyExpense(){
//     if (!Ext.isDefined(Ext.getCmp('WindowReportYearlyExpense'))) {
//         var WindowReportYearlyExpense = Ext.create(dir_sys + 'report.WindowReportYearlyExpense');
//     } else {
//         var WindowReportYearlyExpense = Ext.getCmp('WindowReportYearlyExpense');
//     }

//     WindowReportYearlyExpense.show();
// }

// function WindowReportYearlyIncome(){
//     if (!Ext.isDefined(Ext.getCmp('WindowReportYearlyIncome'))) {
//         var WindowReportYearlyIncome = Ext.create(dir_sys + 'report.WindowReportYearlyIncome');
//     } else {
//         var WindowReportYearlyIncome = Ext.getCmp('WindowReportYearlyIncome');
//     }

//     WindowReportYearlyIncome.show();
// }

// function show_pnl(){
//      if (!Ext.isDefined(Ext.getCmp('WindowReportProfitLoss'))) {
//         var WindowReportProfitLoss = Ext.create(dir_sys + 'report.WindowReportProfitLoss');
//     } else {
//         var WindowReportProfitLoss = Ext.getCmp('WindowReportProfitLoss');
//     }

//     WindowReportProfitLoss.show();

//     Ext.getCmp('tanggalReportLabaRugi1').setValue(firstDay);
//     Ext.getCmp('tanggalReportLabaRugi2').setValue(lastDay);

// }

// function WindowReportAsset(){

//     if (!Ext.isDefined(Ext.getCmp('WindowReportAsset'))) {
//         var WindowReportAsset = Ext.create(dir_sys + 'report.WindowReportAsset');
//     } else {
//         var WindowReportAsset = Ext.getCmp('WindowReportAsset');
//     }

//     WindowReportAsset.show();
// }