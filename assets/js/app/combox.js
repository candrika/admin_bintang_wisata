var StatusColumnArr = [
    [2, 'Nonaktif'],
    [1, 'Aktif']
];
var supplierStore = Ext.create('Ext.data.Store', {
    fields: ['idsupplier', 'namesupplier'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/combox/supplier',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: false
});
Ext.define('comboxidsupplier', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxidsupplier',
    fieldLabel: 'Supplier',
    displayField: 'namesupplier',
    valueField: 'idsupplier',
    name: 'idsupplier',
    editable: false,
    triggerAction: 'all',
    store: supplierStore
});

Ext.define('comboxStatusTrx', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxStatusTrx',
    fieldLabel: 'Status Transaksi',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: StatusColumnArr,
    })
});


var brandStore = Ext.create('Ext.data.Store', {
    fields: ['brand_id', 'brand_name'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/combox/brand',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: false
});
Ext.define('comboxbrand', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxbrand',
    fieldLabel: 'Brand',
    displayField: 'brand_name',
    valueField: 'brand_id',
    name: 'brand_id',
    editable: false,
    triggerAction: 'all',
    store: brandStore
});
// Ext.define('comboxthickness', {
//     extend: 'Ext.form.ComboBox',
//     alias: 'widget.comboxthickness',
//     fieldLabel: 'Thickness',
//     displayField: 'item_thickness_tct',
//     valueField: 'thickness_id',
//     name: 'thickness_id',
//     editable: false,
//     triggerAction: 'all',
//     store: Ext.create('Ext.data.Store', {
//         fields: ['thickness_id', 'item_thickness_tct'],
//         proxy: {
//             type: 'ajax',
//             url: SITE_URL + 'backend/combox/thickness',
//             reader: {
//                 type: 'json',
//                 root: 'dat'
//             }
//         },
//         autoLoad: false
//     })
// });
// Ext.define('comboxproductgrade', {
//     extend: 'Ext.form.ComboBox',
//     alias: 'widget.comboxproductgrade',
//     fieldLabel: 'Grade',
//     displayField: 'name',
//     valueField: 'gradeid',
//     name: 'grade',
//     editable: false,
//     triggerAction: 'all',
//     // store: storeProductGrade
//     store: Ext.create('Ext.data.Store', {
//         fields: ['gradeid', 'name'],
//         proxy: {
//             type: 'ajax',
//             url: SITE_URL + 'backend/combox/productgrade',
//             reader: {
//                 type: 'json',
//                 root: 'dat'
//             }
//         },
//         autoLoad: false
//     })
// });
Ext.define('comboxthickness', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxthickness',
    fieldLabel: 'Thickness',
    displayField: 'item_thickness_tct',
    valueField: 'thickness_id',
    name: 'thickness_id',
    editable: false,
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['thickness_id', 'item_thickness_tct'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/thickness',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});

var ArrSalesStatus = [
    [1, 'Open'],
    [2, 'Canceled'],
    [3, 'Unpaid'],
    [4, 'Partially Paid'],
    [5, 'Paid']
];
Ext.define('comboxSalesStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxSalesStatus',
    fieldLabel: 'Pembayaran',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrSalesStatus,
    })
});

var ArrConfirmMoneyStatus = [
    [1, 'Open'],
    [2, 'Confirmed'],
    [3, 'Rejected']
];
Ext.define('comboxConfirmMoneyStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxConfirmMoneyStatus',
    fieldLabel: 'Status',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    // autoLoad:true,
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrConfirmMoneyStatus,
    })
});
// var ArrSalesQuotationStatus = [
//     [1, 'Open'],
//     [2, 'Ordered'],
//     [3, 'Picked'],
//     [4, 'Partially Delivered'],
//     [5, 'Delivered'],
//     [6, 'Finished'],
// ];
var ArrSalesQuotationStatus = [
    [1, 'Open'],
    [2, 'Confirmed'],
    [3, 'Ordered'],
    [4, 'Canceled']
];
Ext.define('comboxSalesQuotationStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxSalesQuotationStatus',
    fieldLabel: 'Status',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrSalesQuotationStatus,
    })
});
var ArrPurchaseRequestStatus = [
    [1, 'Open'],
    [2, 'Confirmed'],
    [3, 'Canceled']
];
Ext.define('comboxPurchaseReqStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxPurchaseReqStatus',
    fieldLabel: 'Status',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrPurchaseRequestStatus,
    })
});
var ArrReturnSalesStatus = [
    [1, 'Open'],
    [2, 'Canceled'],
    [3, 'Confirmed'],
    [4, 'Picking Up'],
    [5, 'Partial Delivering'],
    [6, 'Full Delivered'],
    [7, 'Closed']
];
Ext.define('comboxReturnSalesStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxReturnSalesStatus',
    fieldLabel: 'Status',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrReturnSalesStatus,
    })
});
var ArrPOReturnStatus = [
    [1, 'Open'],
    [2, 'Canceled'],
    [3, 'Confirmed'],
    [4, 'Partial Received'],
    [5, 'Full Received'],
    [6, 'Closed']
];
Ext.define('comboxPOReturnStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxPOReturnStatus',
    fieldLabel: 'Status',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrPOReturnStatus,
    })
});
var arrInventoryType = [
    ['1', 'Barang'],
    ['2', 'Jasa']
];
Ext.define('comboxInventoryType', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxInventoryType',
    fieldLabel: 'Inventory Type',
    displayField: 'inventory_type_name',
    valueField: 'inventory_type',
    name: 'inventory_type',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['inventory_type', 'inventory_type_name'],
        data: arrInventoryType
    })
});
var arrInventoryRealCount = [
    [1, 'Open'],
    [2, 'Confirmed'],
    [3, 'Closed'],
    [4, 'Canceled']
];
Ext.define('comboInventoryRealCountStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboInventoryRealCountStatus',
    fieldLabel: 'Status',
    displayField: 'name',
    valueField: 'value',
    name: 'status',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'name'],
        data: arrInventoryRealCount
    })
});
var arrInventoryRealCountType = [
    [1, 'Expense'],
    [2, 'Sales']
];
Ext.define('comboInventoryRealCountType', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboInventoryRealCountType',
    fieldLabel: 'Type',
    displayField: 'name',
    valueField: 'value',
    name: 'type_id',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'name'],
        data: arrInventoryRealCountType
    })
});
var arrBusinessStatus = [
    [1, 'Active'],
    [2, 'Inactive']
];
Ext.define('comboxBusinessStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxBusinessStatus',
    fieldLabel: 'Status',
    displayField: 'name',
    valueField: 'status',
    name: 'status',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['status', 'name'],
        data: arrBusinessStatus
    })
});
var ArrDeliveryOrder = [
    [1, 'Open'],
    [2, 'Confirmed'],
    [3, 'Delivering'],
    [4, 'Delivered'],
    [5, 'Canceled'],
    [6, 'Closed']
];
Ext.define('comboxDeliveryOrderStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxDeliveryOrderStatus',
    fieldLabel: 'Status',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrDeliveryOrder
    })
});
var ArrInvoiceStatus = [
    [1, 'Unpaid'],
    [2, 'Paid'],
    [3, 'Overdue'],
    [4, 'Partially Paid'],
    [5, 'Canceled']
];
Ext.define('comboxInvoiceStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxInvoiceStatus',
    fieldLabel: 'Status',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrInvoiceStatus
    })
});
Ext.define('comboxproductgrade', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxproductgrade',
    fieldLabel: 'Grade',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: [
            ['0', 'Good'],
            ['1', 'Intermediate'],
            ['2', 'Bad']
        ],
    })
});
Ext.define('comboxdatalocation', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxdatalocation',
    fieldLabel: 'Location',
    displayField: 'location_name',
    valueField: 'idlocation',
    name: 'location',
    editable: false,
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['idlocation', 'location_name'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/location',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});
var InventoryTransferStatusarr = [
    ['1', 'Pending'],
    ['2', 'Rejected'],
    ['3', 'Accepted'],
    ['4', 'On Progress'],
    ['5', 'Transferred']
];
var storeInventoryTransferStatus = new Ext.data.ArrayStore({
    fields: ['value', 'text'],
    data: InventoryTransferStatusarr
});
Ext.define('comboxInventoryTransferStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxInventoryTransferStatus',
    fieldLabel: 'Status',
    editable: false,
    displayField: 'text',
    valueField: 'value',
    store: storeInventoryTransferStatus,
    name: 'status'
});
var InventoryAdjustTypeArr = [
    ['1', 'Correction']
];
var storeInventoryAdjustType = new Ext.data.ArrayStore({
    fields: ['value', 'text'],
    data: InventoryAdjustTypeArr
});
Ext.define('comboxInventoryAdjustType', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxInventoryAdjustType',
    fieldLabel: 'Adjustment Type',
    editable: false,
    displayField: 'text',
    valueField: 'value',
    store: storeInventoryAdjustType,
    name: 'adjustment_type'
});
var requisitionstatusarr = [
    ['1', 'Draft'],
    ['2', 'Open'],
    ['3', 'Being Reviewed'],
    ['4', 'Rejected'],
    ['5', 'Approved'],
    ['6', 'Closed'],
    ['7', 'Returned']
];
var storeRequisitionStatus = new Ext.data.ArrayStore({
    fields: ['value', 'text'],
    data: requisitionstatusarr
});
Ext.define('comboxrequisitionstatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxrequisitionstatus',
    // fieldLabel: 'Status',
    displayField: 'text',
    valueField: 'value',
    store: storeRequisitionStatus,
    name: 'status'
});
var Adjustmentarr = [
    [1, 'Open'],
    [2, 'Confirm']
];
Ext.define('comboInventoryAdjustmentStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboInventoryAdjustmentStatus',
    fieldLabel: 'Status Adjustment',
    editable: false,
    displayField: 'text',
    valueField: 'value',
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: Adjustmentarr
    }),
});
// var paymenttermarr = [
//     ['1', 'Cash in Advance'],
//     ['2', 'Cash in Delivery'],
//     ['3', 'NET d days'],
//     ['4', 'NET EOM d days'],
//     ['5', 'Discount']
// ];
// var storePaymentTerm = new Ext.data.ArrayStore({
//     fields: ['value', 'text'],
//     data: paymenttermarr
// });
var storePaymentTerm = Ext.create('Ext.data.Store', {
    fields: ['id_payment_term', 'term_name'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/combox/payment_term',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: false
});
Ext.define('comboxpaymentterm', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxpaymentterm',
    fieldLabel: 'Syarat Pembayaran',
    width:250,
    editable: false,
    displayField: 'term_name',
    valueField: 'id_payment_term',
    store: storePaymentTerm,
});
var projectstatusarr = [
    ['1', 'Open'],
    ['2', 'Pending'],
    ['3', 'On Going'],
    ['4', 'Completed'],
    ['5', 'Rejected'],
    ['6', 'Overdue'],
    ['7', 'Cost Overrun']
];
var storeProjectStatus = new Ext.data.ArrayStore({
    fields: ['value', 'text'],
    data: projectstatusarr
});
Ext.define('comboxprojectstatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxprojectstatus',
    fieldLabel: 'Type',
    displayField: 'text',
    valueField: 'value',
    store: storeProjectStatus,
    name: 'status'
});
var companytypearr = [
    ['1', 'Head Office'],
    ['1', 'Branch']
];
var storeCompanyType = new Ext.data.ArrayStore({
    fields: ['value', 'text'],
    data: companytypearr
});
Ext.define('comboxcompanytype', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxcompanytype',
    fieldLabel: 'Type',
    displayField: 'text',
    valueField: 'value',
    store: storeCompanyType,
    name: 'type'
});
// var switcharr = [['0', 'False'], ['1', 'True']];
// var storeSwitch = new Ext.data.ArrayStore({
//     fields: ['value', 'text'],
//     data: switcharr
// });
var modelreportsalesorderdetailarr = [
    ['all', 'Tampilkan Semua Data'],
    ['delivered', 'Tampilkan Data Terkirim'],
    ['undelivered', 'Tampilkan Data Tidak Terkirim']
];
var storeModelReportSalesOrderDetail = new Ext.data.ArrayStore({
    fields: ['value', 'text'],
    data: modelreportsalesorderdetailarr
});
Ext.define('comboxmodelreportsalesorderdetail', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxmodelreportsalesorderdetail',
    fieldLabel: 'Model Report',
    displayField: 'text',
    valueField: 'value',
    name: 'modelreportsalesorderdetailarr',
    store: storeModelReportSalesOrderDetail
});
var modelreportsalesbycustomerarr = [
    ['all', 'Tampilkan Semua Data'],
    ['detail', 'Detail']
];
var storeModelReportSalesByCustomer = new Ext.data.ArrayStore({
    fields: ['value', 'text'],
    data: modelreportsalesbycustomerarr
});
Ext.define('comboxmodelreportsalesbycustomer', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxmodelreportsalesbycustomer',
    fieldLabel: 'Model Report',
    displayField: 'text',
    valueField: 'value',
    name: 'modelreportsalesbycustomerarr',
    store: storeModelReportSalesByCustomer
});
var modelreportsalesbysalesmanarr = [
    ['all', 'Tampilkan Semua Data'],
    ['detail', 'Detail']
];
var storeModelReportSalesBySalesman = new Ext.data.ArrayStore({
    fields: ['value', 'text'],
    data: modelreportsalesbysalesmanarr
});
Ext.define('comboxmodelreportsalesbysalesman', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxmodelreportsalesbysalesman',
    fieldLabel: 'Model Report',
    displayField: 'text',
    valueField: 'value',
    name: 'modelreportsalesbysalesmanarr',
    store: storeModelReportSalesBySalesman
});
var modelreportsalesreturndetailarr = [
    ['all', 'Tampilkan Semua Data'],
    ['detail', 'Detail']
];
var storeModelReportSalesReturnDetail = new Ext.data.ArrayStore({
    fields: ['value', 'text'],
    data: modelreportsalesreturndetailarr
});
Ext.define('comboxmodelreportsalesreturndetail', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxmodelreportsalesreturndetail',
    fieldLabel: 'Model Report',
    displayField: 'text',
    valueField: 'value',
    name: 'modelreportsalesreturndetailarr',
    store: storeModelReportSalesReturnDetail
});
var modelreportsalesbookarr = [
    ['all', 'Tampilkan Semua Data'],
    ['detail', 'Detail']
];
var storeModelReportSalesBook = new Ext.data.ArrayStore({
    fields: ['value', 'text'],
    data: modelreportsalesbookarr
});
Ext.define('comboxmodelreportsalesbook', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxmodelreportsalesbook',
    fieldLabel: 'Model Report',
    displayField: 'text',
    valueField: 'value',
    name: 'modelreportsalesbookarr',
    store: storeModelReportSalesBook
});
var modelreportpurchaseorderoutstandingdetailarr = [
    ['all', 'Tampilkan Semua Data'],
    ['detail', 'Detail']
];
var storeModelReportPurchaseOrderOutstandingDetail = new Ext.data.ArrayStore({
    fields: ['value', 'text'],
    data: modelreportpurchaseorderoutstandingdetailarr
});
Ext.define('comboxmodelreportpurchaseorderoutstandingdetail', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxmodelreportpurchaseorderoutstandingdetail',
    fieldLabel: 'Model Report',
    displayField: 'text',
    valueField: 'value',
    name: 'modelreportpurchaseorderoutstandingdetailarr',
    store: storeModelReportPurchaseOrderOutstandingDetail
});
var bulanarr = [
    ['01', 'Januari'],
    ['02', 'Februari'],
    ['03', 'Maret'],
    ['04', 'April'],
    ['05', 'Mei'],
    ['06', 'Juni'],
    ['07', 'Juli'],
    ['08', 'Agustus'],
    ['09', 'September'],
    ['10', 'Oktober'],
    ['11', 'November'],
    ['12', 'Desember']
];
var storeBulan = new Ext.data.ArrayStore({
    fields: ['nobulan', 'namabulan'],
    data: bulanarr
});
Ext.define('comboxbulan', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxbulan',
    fieldLabel: 'Bulan',
    displayField: 'namabulan',
    valueField: 'namabulan',
    name: 'namabulan',
    store: storeBulan
});
Ext.define('comboxbulan2', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxbulan2',
    // fieldLabel: 'Bulan',
    displayField: 'namabulan',
    valueField: 'namabulan',
    name: 'namabulan',
    store: storeBulan
});

Ext.define('comboxbussinestype', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxbussinestype',
    fieldLabel: 'Tipe',
    displayField: 'namebussines',
    valueField: 'namebussines',
    name: 'namebussines',
    store: Ext.create('Ext.data.Store', {
        fields: ['idbussinestype', 'namebussines'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/bussinestype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});

Ext.define('comboxproducttype', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxproducttype',
    fieldLabel: 'Tipe',
    editable: false,
    displayField: 'product_type_name',
    valueField: 'product_type_id',
    name: 'product_type_id',
    store: Ext.create('Ext.data.Store', {
        fields: ['product_type_id', 'product_type_name'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/product_type',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});
// Ext.define('comboxmeasurement', {
//     extend: 'Ext.form.ComboBox',
//     alias: 'widget.comboxmeasurement',
//     fieldLabel: 'Mata Uang',
//     displayField: 'short_desc',
//     valueField: 'measurement_id',
//     submitValue: 'measurement_id',
//     editable: false,
//     triggerAction: 'all',
//     listConfig: {
//         getInnerTpl: function() {
//             return '<div data-qtip="{short_desc}. {slogan}">{short_desc} ({long_desc})</div>';
//         }
//     },
//     store: Ext.create('Ext.data.Store', {
//         fields: ['measurement_id', 'short_desc','long_desc'],
//         proxy: {
//             type: 'ajax',
//             url: SITE_URL + 'backend/combox/productmeasurement',
//             reader: {
//                 type: 'json',
//                 root: 'dat'
//             }
//         },
//         autoLoad: false
//     })
// });
var productMeasurementStore = Ext.create('Ext.data.Store', {
    fields: ['measurement_id', 'short_desc', 'long_desc'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/combox/productmeasurement',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: false
});
Ext.define('comboxmeasurement', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxmeasurement',
    fieldLabel: 'Measurement',
    displayField: 'short_desc',
    valueField: 'measurement_id',
    submitValue: 'measurement_id',
    editable: false,
    triggerAction: 'all',
    store: productMeasurementStore
});



// Ext.define('comboxbussinestype', {
//     extend: 'Ext.form.ComboBox',
//     alias: 'widget.comboxbussinestype',
//     fieldLabel: 'Tipe',
//     displayField: 'namebussines',
//     valueField: 'namebussines',
//     name: 'namebussines',
//     editable: false,
//     triggerAction: 'all',
//     store: businessStore   
// });

Ext.define('comboxAccountType', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxAccountType',
    fieldLabel: 'Tipe Akun',
    displayField: 'acctypename',
    valueField: 'idaccounttype',
    editable: false,
    triggerAction: 'all',
    name: 'acctypename',
    store: Ext.create('Ext.data.Store', {
        fields: ['idaccounttype', 'acctypename'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/accounttype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: true
    })
})
var taxStore = Ext.create('Ext.data.Store', {
    fields: ['idtax', 'nametax', 'tax_rate'],
    proxy: {
        type: 'ajax',
        url: COOP_API + 'preferences/tax?key='+coop_key,
        reader: {
            type: 'json',
            root: 'rows'
        }
    },
    autoLoad: false
});
Ext.define('comboxtaxtype', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxtaxtype',
    fieldLabel: 'Pajak',
    displayField: 'nametax',
    valueField: 'idtax',
    name: 'idtax',
    editable: false,
    triggerAction: 'all',
    listConfig: {
        getInnerTpl: function() {
            return '{nametax}  ({tax_rate}%)';
        }
    },
    store: taxStore
});
var inventoryCategoryStore = Ext.create('Ext.data.Store', {
    fields: ['idinventorycat', 'namecat'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/combox/inventorycat',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: false
})
Ext.define('comboxinventorycat', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxinventorycat',
    fieldLabel: 'Category',
    displayField: 'namecat',
    valueField: 'idinventorycat',
    name: 'namecat',
    editable: false,
    triggerAction: 'all',
    store: inventoryCategoryStore
});
Ext.define('comboxtax', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxtax',
    fieldLabel: 'Pajak',
    displayField: 'nametax',
    valueField: 'idtax',
    name: 'idtax',
    editable: false,
    emptyText: 'Choose Tax...',
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['idtax', 'nametax', 'rate'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/tax',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});
Ext.define('comboxidtax', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxidtax',
    fieldLabel: 'Pajak',
    displayField: 'nametax',
    valueField: 'idtax',
    name: 'idtax',
    editable: false,
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['idtax', 'nametax', 'rate'],
        proxy: {
            type: 'ajax',
            url: COOP_API + 'setup/tax?key='+coop_key,
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});
Ext.define('comboxclassificationcf', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxclassificationcf',
    fieldLabel: 'Klasifikasi Akun',
    displayField: 'classname',
    valueField: 'classname',
    name: 'classname',
    editable: false,
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['idclassificationcf', 'classname'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/classificationcf',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});
// var storeUnit = Ext.create('Ext.data.Store', {
//         fields: ['idunit', 'namaunit'],
//         proxy: {
//             type: 'ajax',
//             url: SITE_URL + 'backend/combox/unit',
//             reader: {
//                 type: 'json',
//                 root: 'dat'
//             }
//         },
//         queryMode:'remote',
//         autoLoad: false
//     });
// Ext.define('comboxunit', {
//     extend: 'Ext.form.ComboBox',
//     alias: 'widget.comboxunit',
//     fieldLabel: 'Location',
//     displayField: 'namaunit',
//     valueField: 'namaunit',
//     name: 'namaunit',
//     editable: false,
//     triggerAction: 'all',
//     store: Ext.create('Ext.data.Store', {
//         fields: ['idunit', 'namaunit'],
//         proxy: {
//             type: 'ajax',
//             url: SITE_URL + 'backend/combox/unit',
//             reader: {
//                 type: 'json',
//                 root: 'dat'
//             }
//         },
//         queryMode:'remote',
//         autoLoad: false
// });
var storeCustomer = Ext.create('Ext.data.Store', {
    fields: ['idcustomer', 'namecustomer'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/combox/customer',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    queryMode: 'remote',
    autoLoad: false
});
Ext.define('comboxCustomer', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxCustomer',
    fieldLabel: 'Customer',
    displayField: 'namecustomer',
    valueField: 'idcustomer',
    name: 'idcustomer',
    // editable: false,
    triggerAction: 'all',
    queryMode: 'remote',
    queryParam: 'searchStr',
    store: storeCustomer
});
// var storeCustomer = Ext.create('Ext.data.Store', {
//         fields: ['idcustomer', 'namecustomer'],
//         proxy: {
//             type: 'ajax',
//             url: SITE_URL + 'backend/combox/customer',
//             reader: {
//                 type: 'json',
//                 root: 'dat'
//             }
//         },
//         queryMode:'remote',
//         autoLoad: false
//     });
// Ext.define('comboxcustomer', {
//     extend: 'Ext.form.ComboBox',
//     alias: 'widget.comboxcustomer',
//     fieldLabel: 'Customer',
//     displayField: 'namecustomer',
//     valueField: 'idcustomer',
//     name: 'namecustomer',
//     editable: false,
//     triggerAction: 'all',
//     store: storeCustomer
// });
var comboxemployeeStore = Ext.create('Ext.data.Store', {
    fields: ['idemployeetype', 'nametype'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/combox/employeetype',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: false
});
Ext.define('comboxemployee', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxemployee',
    fieldLabel: 'Tipe Pegawai',
    displayField: 'nametype',
    valueField: 'nametype',
    name: 'nametype',
    editable: false,
    triggerAction: 'all',
    store: comboxemployeeStore
});
var comboxWarehouseStore = Ext.create('Ext.data.Store', {
    fields: ['warehouse_id', 'warehouse_desc', 'warehouse_code'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/combox/warehouse',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: false
});
Ext.define('comboxWarehouse', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxWarehouse',
    fieldLabel: 'Warehouse',
    displayField: 'warehouse_desc',
    valueField: 'warehouse_id',
    name: 'warehouse_id',
    editable: false,
    triggerAction: 'all',
    store: comboxWarehouseStore
});
Ext.define('comboxscheduletype', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxscheduletype',
    fieldLabel: 'Jenis Jadwal',
    displayField: 'schname',
    valueField: 'schname',
    name: 'schname',
    editable: false,
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['idscheduletype', 'schname'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/scheduletype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});
Ext.define('comboxsys_user', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxsys_user',
    fieldLabel: 'Nama User',
    displayField: 'realname',
    valueField: 'realname',
    name: 'realname',
    editable: false,
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['user_id', 'realname'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/sys_user',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});
Ext.define('comboxfrequency', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxfrequency',
    fieldLabel: 'Frekuensi',
    displayField: 'namefreq',
    valueField: 'namefreq',
    name: 'namefreq',
    editable: false,
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['idfrequency', 'namefreq'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/frequency',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});
Ext.define('comboxshipping', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxshipping',
    fieldLabel: 'Shipping Type',
    displayField: 'nameshipping',
    valueField: 'idshipping',
    name: 'idshipping',
    editable: false,
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['idshipping', 'nameshipping'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/shipping',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});
var StorePayment = Ext.create('Ext.data.Store', {
    fields: ['idpayment', 'namepayment'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/combox/payment',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: false
});
Ext.define('comboxpayment', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxpayment',
    fieldLabel: 'Pembayaran',
    displayField: 'namepayment',
    valueField: 'namepayment',
    name: 'namepayment',
    editable: false,
    triggerAction: 'all',
    store: StorePayment
});
var journalSearchStore = Ext.create('Ext.data.Store', {
    fields: ['nosearchJ', 'nmsearchJ'],
    data: [{ "nosearchJ": 1, "nmsearchJ": "No Ref" }, { "nosearchJ": 2, "nmsearchJ": "Memo" }, { "nosearchJ": 3, "nmsearchJ": "Nama Akun" }]
});
Ext.define('comboxSearchJ', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxSearchJ',
    //    fieldLabel: 'Cari',
    displayField: 'nmsearchJ',
    queryMode: 'local',
    id: 'nosearchJ',
    name: 'nosearchJ',
    editable: false,
    triggerAction: 'all',
    valueField: 'nosearchJ',
    store: journalSearchStore,
    value: 1
});
Ext.define('comboxjournaltype', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxjournaltype',
    fieldLabel: 'Tipe Jurnal',
    displayField: 'namejournal',
    valueField: 'idjournaltype',
    name: 'namejournal',
    editable: false,
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['idjournaltype', 'namejournal'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/journaltype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});
var storeUnit = Ext.create('Ext.data.Store', {
    fields: ['idunit', 'namaunit'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/combounit',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: false
});
// Ext.define('comboxunit', {
//     extend: 'Ext.form.ComboBox',
//     alias: 'widget.comboxunit',
//     fieldLabel: 'Location',
//     displayField: 'namaunit',
//     valueField: 'namaunit',
//     name: 'namaunit',
//     value:idunit,
//     editable: false,
//     triggerAction: 'all',
//     store: storeUnit
// });
Ext.define('comboxcurrency', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxcurrency',
    fieldLabel: 'Mata Uang',
    displayField: 'namecurr',
    valueField: 'idcurrency',
    name: 'namecurr',
    submitValue: 'idcurrency',
    editable: false,
    triggerAction: 'all',
    listConfig: {
        getInnerTpl: function() {
            return '<div data-qtip="{namecurr}. {slogan}">{namecurr} ({symbol})</div>';
        }
    },
    store: Ext.create('Ext.data.Store', {
        fields: ['idcurrency', 'namecurr', 'symbol'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/currency',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});
// var headerAkunStore = Ext.create('Ext.data.Store', {
//     fields: ['idpos', 'namepos'],
//     proxy: {
//         type: 'ajax',
//         url: SITE_URL + 'backend/combox/accountpos',
//         reader: {
//             type: 'json',
//             root: 'dat'
//         }
//     },
//     autoLoad: true
// });
// Ext.define('comboxheaderAkun', {
//     extend: 'Ext.form.field.ComboBox',
//     alias: 'widget.comboxheaderAkun',
//     //    fieldLabel: 'Cari',
//     displayField: 'namepos',
//     queryMode: 'local',
//     name: 'idpos',
//     editable: false,
//     triggerAction: 'all',
//     valueField: 'idpos',
//     store: headerAkunStore
//         //    autoLoad: false
// });
var sys_groupStore = Ext.create('Ext.data.Store', {
    fields: ['group_id', 'group_name'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/combox/sys_group',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: false
});
Ext.define('comboxsys_group', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxsys_group',
    displayField: 'group_name',
    fieldLabel: 'Kelompok User',
    queryMode: 'local',
    name: 'group_id',
    editable: false,
    triggerAction: 'all',
    valueField: 'group_id',
    store: sys_groupStore
});

var storeTipeGaji = Ext.create('Ext.data.Store', {
    fields: ['idtambahangaji', 'namatambahan'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'pegawai/combox_emp_fee',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: false
});
Ext.define('comboxTipeGaji', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxTipeGaji',
    displayField: 'namatambahan',
    fieldLabel: 'Tipe Gaji',
    queryMode: 'local',
    name: 'idtambahangaji',
    editable: false,
    triggerAction: 'all',
    valueField: 'idtambahangaji',
    store: storeTipeGaji
});


var storetunjangan = Ext.create('Ext.data.Store', {
    fields: ['idtunjtype', 'nametunj'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/combox/tunjangantype',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: false
});
Ext.define('comboxtunjangantype', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxtunjangantype',
    displayField: 'nametunj',
    fieldLabel: 'Jenis Tunjangan',
    queryMode: 'local',
    name: 'nametunj',
    editable: false,
    triggerAction: 'all',
    valueField: 'nametunj',
    store: storetunjangan
});
var siklusStore = Ext.create('Ext.data.Store', {
    fields: ['idsiklus', 'namasiklus'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/combox/siklus',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: false
});
Ext.define('comboxsiklus', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxsiklus',
    displayField: 'namasiklus',
    fieldLabel: 'Siklus',
    queryMode: 'local',
    name: 'idsiklus',
    editable: false,
    triggerAction: 'all',
    valueField: 'idsiklus',
    store: siklusStore
});
var potongantypeStore = Ext.create('Ext.data.Store', {
    fields: ['idpotongantype', 'namepotongan'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/combox/potongantype',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: false
});
Ext.define('comboxpotongantype', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxpotongantype',
    displayField: 'namepotongan',
    fieldLabel: 'Jenis Potongan',
    queryMode: 'local',
    name: 'idpotongantype',
    editable: false,
    triggerAction: 'all',
    valueField: 'idpotongantype',
    store: potongantypeStore
});
Ext.define('comboxamounttype', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxamounttype',
    displayField: 'name',
    fieldLabel: 'Tipe Potongan',
    queryMode: 'local',
    name: 'name',
    editable: false,
    triggerAction: 'all',
    valueField: 'name',
    store: Ext.create('Ext.data.Store', {
        fields: ['idamounttype', 'name'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/potongantype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});
var payrolltypeStore = Ext.create('Ext.data.Store', {
    fields: ['payrolltypeid', 'payname'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/combox/payrolltype',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: false
});
Ext.define('comboxpayrolltype', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxpayrolltype',
    displayField: 'payname',
    fieldLabel: 'Jenis Pembayaran',
    queryMode: 'local',
    name: 'payname',
    editable: false,
    triggerAction: 'all',
    valueField: 'payname',
    store: payrolltypeStore
});
var tambahangajitypeStore = Ext.create('Ext.data.Store', {
    fields: ['idtambahangajitype', 'tambahantype'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/combox/tambahangajitype',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: false
});
Ext.define('comboxtambahangajitype', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxtambahangajitype',
    displayField: 'tambahantype',
    fieldLabel: 'Jenis Tambahan Gaji',
    queryMode: 'local',
    name: 'idtambahangajitype',
    editable: false,
    triggerAction: 'all',
    valueField: 'idtambahangajitype',
    store: tambahangajitypeStore
});
var jenisptkpStore = Ext.create('Ext.data.Store', {
    fields: ['idjenisptkp', 'namaptkp', 'deskripsi'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/combox/jenisptkp',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: false
});
Ext.define('comboxjenisptkp', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxjenisptkp',
    displayField: 'namaptkp',
    fieldLabel: 'Jenis PTKP',
    queryMode: 'local',
    name: 'idjenisptkp',
    editable: false,
    triggerAction: 'all',
    valueField: 'idjenisptkp',
    store: jenisptkpStore,
    listConfig: {
        getInnerTpl: function() {
            return '<div data-qtip="{deskripsi}.">{namaptkp}</div>';
        }
    }
});
//di remarks. karna address harus diload pada saat dibutuhkan saja
// var tmpStoreShippingAddress = Ext.create('Ext.data.Store', {
//     fields: ['alamat', 'alamat2', 'alamat3'],
//     proxy: {
//         type: 'ajax',
//         url: SITE_URL + 'backend/combox/shippingaddress',
//         reader: {
//             type: 'json',
//             root: 'dat'
//         }
//     },
//     autoLoad: true
// });
var storeShippingAddress = new Ext.data.ArrayStore({
    fields: ['address'],
    // data: requisitionstatusarr
});
Ext.onReady(function() {
    // var data = tmpStoreShippingAddress.data.items[0].data;
    // var addressarr = [[data.alamat], [data.alamat2], [data.alamat3]];
    // storeShippingAddress.loadData(addressarr);
});
Ext.define('comboxshippingaddress', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxshippingaddress',
    displayField: 'address',
    fieldLabel: 'Shipping Address',
    queryMode: 'local',
    name: 'shippingadrress',
    editable: false,
    triggerAction: 'all',
    valueField: 'address',
    store: storeShippingAddress,
    // listConfig: {
    //     getInnerTpl: function() {
    //         return '<div data-qtip="{value}.">{text}</div>';
    //     }
    // }
});
var pelangganTypeStore = Ext.create('Ext.data.Store', {
    fields: ['idpelanggantype', 'pelanggantype'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/combox/pelanggantype',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: false
});
Ext.define('comboxpelanggantype', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxpelanggantype',
    displayField: 'pelanggantype',
    fieldLabel: 'Jenis Pelanggan',
    queryMode: 'local',
    name: 'pelanggantype',
    editable: false,
    triggerAction: 'all',
    valueField: 'pelanggantype',
    store: pelangganTypeStore
});
var tahunPayrollStore = Ext.create('Ext.data.Store', {
    fields: ['year'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/comboxTahunPayroll',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: false
});
Ext.define('comboxtahunPayroll', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxtahunPayroll',
    displayField: 'year',
    fieldLabel: 'Tahun Penggajian',
    queryMode: 'local',
    name: 'tahunpayroll',
    editable: false,
    triggerAction: 'all',
    valueField: 'year',
    store: tahunPayrollStore
});
// var UnitItemStore = Ext.create('Ext.data.Store', {
//     fields: ['unit_item_id', 'unit_name'],
//     proxy: {
//         type: 'ajax',
//         url: SITE_URL + 'backend/combox/unit_item',
//         reader: {
//             type: 'json',
//             root: 'dat'
//         }
//     },
//     autoLoad: false
// });
// 
// Ext.define('comboxUnitItem', {
//     extend: 'Ext.form.field.ComboBox',
//     alias: 'widget.comboxUnitItem',
//     displayField: 'unit_name',
//     fieldLabel: 'Unit Name',
//     queryMode: 'local',
//     name: 'unit_item_id',
//     editable: false,
//     triggerAction: 'all',
//     valueField: 'unit_item_id',
//     store: UnitItemStore
// });
var MachineTypeStore = Ext.create('Ext.data.Store', {
    fields: ['machine_type_id', 'machine_type_name'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/combox/machine_type',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: false
});
Ext.define('comboxMachineType', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxMachineType',
    displayField: 'machine_type_name',
    fieldLabel: 'Machine Type',
    queryMode: 'local',
    name: 'machine_type_id',
    editable: false,
    triggerAction: 'all',
    valueField: 'machine_type_id',
    store: MachineTypeStore
});
//-----------------------------------------//
Ext.define('comboxswitch', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxswitch',
    displayField: 'value',
    valueField: 'id',
    editable: false,
    triggerAction: 'all',
    store: new Ext.data.ArrayStore({
        fields: ['id', 'value'],
        data: togglearr
    }),
});
Ext.define('comboxunit', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxunit',
    fieldLabel: 'Koperasi',
    displayField: 'namaunit',
    valueField: 'idunit',
    width:320,
    name: 'idunit',
    value: idunit,
    editable: false,
    emptyText: 'Pilih Koperasi...',
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['idunit', 'namaunit'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/unit',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        queryMode: 'remote',
        autoLoad: true
    }),
});
var ArrPurchaseOrderStatus = [
    [1, 'Open'],
    [2, 'Confirmed'],
    [3, 'Ordered'],
    [4, 'Received'],
    [5, 'Partial Received'],
    [6, 'Canceled'],
    [7, 'Closed'],
];
Ext.define('comboxpurchasestatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxpurchasestatus',
    fieldLabel: 'Status',
    displayField: 'value',
    valueField: 'id',
    name: 'idpurchasestatus',
    editable: false,
    emptyText: 'Choose Status...',
    triggerAction: 'all',
    store: new Ext.data.ArrayStore({
        fields: ['id', 'value'],
        data: ArrPurchaseOrderStatus
    })
});
var ArrGoodsReceiptStatus = [
    [1, 'Open'],
    [2, 'Canceled'],
    [3, 'Confirmed'],
    [4, 'Invoiced'],
];
Ext.define('comboxgoodsreceiptstatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxgoodsreceiptstatus',
    fieldLabel: 'Status',
    displayField: 'value',
    valueField: 'id',
    name: 'status_gr',
    editable: false,
    emptyText: 'Choose Status...',
    triggerAction: 'all',
    store: new Ext.data.ArrayStore({
        fields: ['id', 'value'],
        data: ArrGoodsReceiptStatus
    })
});
Ext.define('comboxpurchasetype', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxpurchasetype',
    fieldLabel: 'Purchase Type',
    displayField: 'namepurchase',
    valueField: 'idpurchasetype',
    name: 'purchasetype',
    editable: false,
    emptyText: 'Choose Type...',
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['idpurchasetype', 'namepurchase'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/purchasetype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        queryMode: 'remote',
        autoLoad: false
    }),
});
Ext.define('comboxcurrency', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxcurrency',
    fieldLabel: 'Currency',
    displayField: 'namecurr',
    valueField: 'idcurrency',
    name: 'idcurrency',
    submitValue: 'idcurrency',
    editable: false,
    triggerAction: 'all',
    emptyText: 'Choose Currency...',
    listConfig: {
        getInnerTpl: function() {
            return '<div data-qtip="{namecurr}. {slogan}">{namecurr} ({symbol})</div>';
        }
    },
    store: Ext.create('Ext.data.Store', {
        fields: ['idcurrency', 'namecurr', 'symbol'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/currency',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});
Ext.define('comboxshipping', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxshipping',
    fieldLabel: 'Pengiriman',
    displayField: 'nameshipping',
    valueField: 'idshipping',
    name: 'nameshipping',
    editable: false,
    triggerAction: 'all',
    emptyText: 'Choose Shipping Mode...',
    store: Ext.create('Ext.data.Store', {
        fields: ['idshipping', 'nameshipping'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/shipping',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});
//shipping address//
// var tmpStoreShipAddress = Ext.create('Ext.data.Store', {
//     fields: ['alamat', 'alamat2', 'alamat3'],
//     proxy: {
//         type: 'ajax',
//         url: SITE_URL + 'backend/combox/shipaddress',
//         reader: {
//             type: 'json',
//             root: 'dat'
//         }
//     },
//     autoLoad: true
// });
var storeShipAddress = new Ext.data.ArrayStore({
    fields: ['address'],
});
Ext.onReady(function() {
    // console.log(tmpStoreShipAddress)
    // var data = tmpStoreShipAddress.data.items[0].data;
    // var addressarr = [
    //     [data.alamat],
    //     [data.alamat2],
    //     [data.alamat3]
    // ];
    // storeShipAddress.loadData(addressarr);
});
Ext.define('comboxshipaddress', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxshipaddress',
    displayField: 'address',
    fieldLabel: 'Shipping Address',
    queryMode: 'local',
    name: 'shippingadrress',
    editable: true,
    triggerAction: 'all',
    emptyText: 'Choose Shipping Address...',
    valueField: 'address',
    store: storeShipAddress,
});
//shipping address//
//
Ext.define('comboxsuppliertype', {
    id: 'comboxsuppliertype',
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxsuppliertype',
    displayField: 'supplier_type_name',
    fieldLabel: 'Type',
    queryMode: 'local',
    name: 'supplier_type_id',
    editable: false,
    triggerAction: 'all',
    valueField: 'supplier_type_id',
    emptyText: 'Choose Type...',
    store: Ext.create('Ext.data.Store', {
        fields: ['supplier_type_id', 'supplier_type_name'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/supplier_type',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});
Ext.define('comboxsupplier', {
    // id: 'comboxsupplier',
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxsupplier',
    displayField: 'namesupplier',
    fieldLabel: 'Supplier',
    queryMode: 'local',
    name: 'idsupplier',
    editable: false,
    triggerAction: 'all',
    valueField: 'idsupplier',
    emptyText: 'Choose Suppler...',
    store: Ext.create('Ext.data.Store', {
        fields: ['idsupplier', 'namesupplier'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/supplier',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});
Ext.define('comboxprojectstatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxprojectstatus',
    fieldLabel: 'Type',
    displayField: 'status',
    valueField: 'id',
    store: new Ext.data.ArrayStore({
        fields: ['id', 'status'],
        data: projectstatusarr
    }),
    name: 'projectstatus'
});
Ext.define('comboxcustomertype', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxcustomertype',
    fieldLabel: 'Tipe Konsumen',
    displayField: 'namecustype',
    valueField: 'idcustomertype',
    name: 'namecustype',
    editable: false,
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['idcustomertype', 'namecustype'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/customertype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});
Ext.define('comboxproject', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxproject',
    fieldLabel: 'Project',
    displayField: 'projectname',
    valueField: 'idproject',
    name: 'idproject',
    editable: false,
    triggerAction: 'all',
    emptyText: 'Choose Project...',
    store: Ext.create('Ext.data.Store', {
        fields: ['idproject', 'projectname'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/project',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});
var ArrARAgingOptions = [
    [1, '0 - 30 hari'],
    [2, '30 - 60 hari'],
    [3, '60 - 90 hari'],
    [4, '> 90 hari'],
];
Ext.define('comboxARAgingOptions', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxARAgingOptions',
    fieldLabel: 'Aging',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrARAgingOptions,
    })
});
var anggotaTypeStore = Ext.create('Ext.data.Store', {
    fields: ['id_member_type', 'member_type_name'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/combox/member_type',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: false
});
Ext.define('comboxanggotatype', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxanggotatype',
    displayField: 'member_type_name',
    fieldLabel: 'Jenis Anggota',
    queryMode: 'local',
    name: 'id_member_type',
    editable: false,
    triggerAction: 'all',
    valueField: 'id_member_type',
    store: anggotaTypeStore
});
var StatusMemberArr = [
    [1, 'Dalam Persetujuan'],
    [2, 'Aktif'],
    [3, 'Non Aktif'],
    [4, 'Berhenti']
];
var storeStatusMember = new Ext.data.ArrayStore({
    fields: ['status', 'member_status_name'],
    data: StatusMemberArr
});
// var storeStatusMember = Ext.create('Ext.data.Store', {
//     fields: ['status', 'member_status_name'],
//     proxy: {
//         type: 'ajax',
//         url: SITE_URL + 'member/status_type',
//         reader: {
//             type: 'json',
//             root: 'dat'
//         }
//     },
//     autoLoad: false
// });
Ext.define('comboxStatusMember', {
    extend: 'Ext.form.ComboBox',
    editable: false,
    alias: 'widget.comboxStatusMember',
    fieldLabel: 'Status Anggota',
    displayField: 'member_status_name',
    valueField: 'status',
    name: 'status',
    store: storeStatusMember
});
var StatusKawinArr = [
    [1, 'Kawin'],
    [2, 'Belum Kawin'],
    [3, 'Janda/Duda']
];
var storeStatusKawin = new Ext.data.ArrayStore({
    fields: ['marital_status', 'marital_status_name'],
    data: StatusKawinArr
});
Ext.define('comboxStatusKawin', {
    extend: 'Ext.form.ComboBox',
    editable: false,
    alias: 'widget.comboxStatusKawin',
    fieldLabel: 'Status Perkawinan',
    displayField: 'marital_status_name',
    valueField: 'marital_status',
    name: 'marital_status',
    store: storeStatusKawin
});
var SavingCategoryArr = [
    [1, 'Simpanan Modal'],
    [2, 'Simpanan Berjangka'],
    [3, 'Simpanan Deposito']
];
var StoreSavingCategory = new Ext.data.ArrayStore({
    fields: ['value', 'name'],
    data: SavingCategoryArr
});
Ext.define('comboxSavingCategory', {
    extend: 'Ext.form.ComboBox',
    editable: false,
    alias: 'widget.comboxSavingCategory',
    fieldLabel: 'Kategori Simpanan',
    displayField: 'name',
    valueField: 'value',
    name: 'saving_category',
    store: StoreSavingCategory
});
var SavingTypeArr = [
    [1, 'Pokok'],
    [2, 'Wajib'],
    [3, 'Sukarela'],
    [4, 'Setara Modal']
];
var StoreSavingType = new Ext.data.ArrayStore({
    fields: ['value', 'name'],
    data: SavingTypeArr
});
Ext.define('comboxSavingType', {
    extend: 'Ext.form.ComboBox',
    editable: false,
    alias: 'widget.comboxSavingType',
    fieldLabel: 'Tipe Simpanan',
    displayField: 'name',
    valueField: 'value',
    name: 'saving_type',
    store: StoreSavingType
});
var SavingStatusArr = [
    [1, 'Aktif'],
    [2, 'Nonaktif'],
    [3, 'Pending'],
    [4, 'Canceled'],
    [5, 'Closed']
];
var StoreSavingStatus = new Ext.data.ArrayStore({
    fields: ['value', 'name'],
    data: SavingStatusArr
});
Ext.define('comboxSavingStatus', {
    extend: 'Ext.form.ComboBox',
    editable: false,
    alias: 'widget.comboxSavingStatus',
    fieldLabel: 'Status Simpanan',
    displayField: 'name',
    valueField: 'value',
    name: 'saving_status',
    store: StoreSavingStatus
});
var DepositStatusArr = [
    [1, 'Open'],
    [2, 'Pending'],
    [3, 'Completed'],
    [4, 'Canceled'],
    [5, 'Rejected']
];
var StoreDepositStatus = new Ext.data.ArrayStore({
    fields: ['value', 'name'],
    data: DepositStatusArr
});
Ext.define('comboxDepositStatus', {
    extend: 'Ext.form.ComboBox',
    editable: false,
    alias: 'widget.comboxDepositStatus',
    fieldLabel: 'Status',
    displayField: 'name',
    valueField: 'value',
    name: 'saving_status',
    store: StoreDepositStatus
});
var TrxTypeArr = [
    [1, 'Setor Dana'],
    [2, 'Tarik Dana'],
    [3, 'Interest'],
];
var StoreTrxType = new Ext.data.ArrayStore({
    fields: ['value', 'name'],
    data: TrxTypeArr
});
Ext.define('comboxTrxType', {
    extend: 'Ext.form.ComboBox',
    editable: false,
    alias: 'widget.comboxTrxType',
    fieldLabel: 'Tipe Transaksi',
    displayField: 'name',
    valueField: 'value',
    name: 'trx_type',
    store: StoreTrxType
});

var StatusSavingTransactionArr = [
    [1, 'Tertunda'],
    [2, 'Selesai'],
    [3, 'Ditolak'],
];
var StoreStatusSavingTransaction = new Ext.data.ArrayStore({
    fields: ['value', 'name'],
    data: StatusSavingTransactionArr
});

Ext.define('comboxStatusSavingTransaction', {
    extend: 'Ext.form.ComboBox',
    editable: false,
    alias: 'widget.comboxStatusSavingTransaction',
    fieldLabel: 'Status',
    displayField: 'name',
    valueField: 'value',
    name: 'status',
    store: StoreStatusSavingTransaction
});


var StatusSavingArr = [
    [1, 'Open'],
    [2, 'Completed'],
    [3, 'Rejected'],
    [4, 'Pending']
];
var StoreStatusSaving = new Ext.data.ArrayStore({
    fields: ['value', 'name'],
    data: StatusSavingArr
});
Ext.define('comboxStatusSaving', {
    extend: 'Ext.form.ComboBox',
    editable: false,
    alias: 'widget.comboxStatusSaving',
    fieldLabel: 'Status',
    displayField: 'name',
    valueField: 'value',
    name: 'status',
    store: StoreStatusSaving
});

var ChannelTransactionArr = [
    [1, 'Teller'],
    [2, 'Bank Transfer'],
    [3, 'TMoney'],
    [4, 'Finpay']
];

var InterestPeriodTypeArr = [
    [1, 'Bulanan'],
    [2, 'Tahunan']
];

var LoanStatusArr = [
    [1, 'Awaiting Approval'],
    [2, 'On Reviewed'],
    [3, 'Rejected'],
    [4, 'Approved'],
    [5, 'Closed'],
    [6, 'Bad Credit'],
    [7, 'Cancelled']
];

Ext.define('comboxLoanStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxLoanStatus',
    fieldLabel: 'Loan Status',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: LoanStatusArr,
    })
});

var ArrProductStatus = [
    [1, 'Active'],
    [2, 'Inactive'],
    [3, 'Draft']
];

Ext.define('comboxProductStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxProductStatus',
    fieldLabel: 'Status',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrProductStatus,
    })
});

var ArrLoanReasonStatus = [
    [1, 'Biaya Berobat'],
    [2, 'Biaya Pendidikan'],
    [3, 'Biaya Rumah Tangga'],
    [4, 'Biaya Konsumsi'],
    [5, 'Biaya Lainnya']
];

Ext.define('comboxLoanReasonType', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxLoanReasonType',
    fieldLabel: 'Loan Reason',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrLoanReasonStatus,
    })
});

var ArrLoanCategory = [
    [1, 'Anggota'],
    [2, 'Non Anggota']
];

Ext.define('comboxLoanCategory', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxLoanCategory',
    fieldLabel: 'Loan Category',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrLoanCategory,
    })
});

var ArrPeriodeSHU = [
    [1, '2016'],
    [2, '2017'],
    [3, '2018']
];

Ext.define('comboxPeriodeSHU', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxPeriodeSHU',
    fieldLabel: 'Periode SHU',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrPeriodeSHU,
    })
});

var ArrTrxType = [
    [1, 'Setor Iuran'],
    [2, 'Transfer Dana'],
    [3, 'Pembelian Ritel'],
    [4, 'Pembayaran Angsuran'],
    [5, 'Penarikan Dana'],
    [6, 'Penerimaan Tagihan'],
    [7, 'Pembayaran SHU']
];

Ext.define('comboxAllTrxType', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxAllTrxType',
    fieldLabel: 'Tipe Transaksi',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrTrxType,
    })
});

var ArrLoanPaymentStatus = [
    [1, 'Open'],
    [2, 'Completed'],
    [3, 'Canceled']
];

Ext.define('comboxLoanTrxType', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxLoanTrxType',
    fieldLabel: 'Status Pembayaran',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrLoanPaymentStatus,
    })
});


var ArrWithdrawStatus = [
    [1, 'Open'],
    [2, 'Completed'],
    [3, 'Rejected'],
    [3, 'Canceled']
];

Ext.define('comboxWithdrawStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxWithdrawStatus',
    fieldLabel: 'Status',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrWithdrawStatus,
    })
});



var ArrSHUStatus = [
    [1, 'Draft'],
    [2, 'Approved'],
    [3, 'Rejected'],
    [3, 'Canceled']
];

Ext.define('comboxSHUStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxSHUStatus',
    fieldLabel: 'Status',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrSHUStatus,
    })
});

var ArrDepreciationstatus = [
    [1, 'Open'],
    [2, 'Approved'],
    [3, 'Rejected'],
];

Ext.define('comboxDepreciationstatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxDepreciationstatus',
    fieldLabel: 'Status',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrDepreciationstatus,
    })
});

var businessStore = Ext.create('Ext.data.Store', {
    fields: ['business_id', 'business_name'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/business',

            reader: {
                type: 'json',
                root: 'rows'
            }
        },
    autoLoad: false
});

Ext.define('comboxBusinessUnit', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxBusinessUnit',
    displayField: 'business_name',
    queryMode: 'local',
    fieldLabel: 'Unit Usaha',
    name: 'business_id',
    editable: false,
    triggerAction: 'all',
    valueField: 'business_id',
    store:businessStore
});

Ext.define('comboxBusinessUnitpatient', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxBusinessUnitpatient',
    displayField: 'business_name',
    queryMode: 'local',
    fieldLabel: 'Unit Usaha',
    name: 'business_id',
    editable: false,
    triggerAction: 'all',
    valueField: 'business_id',
    store:Ext.create('Ext.data.Store', {
        fields: ['business_id', 'business_name'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/business',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});

var businessTransferStore = Ext.create('Ext.data.Store', {
    fields: ['business_id', 'business_name'],
        proxy: {
            type: 'ajax',
            url: COOP_API + '/business/datas?key='+coop_key,
            extraParams:{
                'business_id':'10,12,13'
            },
            reader: {
                type: 'json',
                root: 'rows'
            }
        },
    autoLoad: false
});

Ext.define('comboxBusinessTransferUnit', {
    // id: 'comboxsupplier',
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxBusinessTransferUnit',
    displayField: 'business_name',
    fieldLabel: 'Unit Asal',
    queryMode: 'local',
    name: 'business_id',
    editable: false,
    triggerAction: 'all',
    valueField: 'business_id',
    // emptyText: 'Pilih Unit Usaha...',
    store:businessTransferStore
});

var ArrDepreciationStatus = [
    [1, 'Draft'],
    [2, 'Approved'],
    [3, 'Canceled']
];

Ext.define('comboxArrDepreciationStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxArrDepreciationStatus',
    fieldLabel: 'Status',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrPurchaseInvStatus,
    })
});



var StatusLoanPaymentArr = [
    [1, 'Unpaid'],
    [2, 'Paid'],
    [3, 'Canceled'],
    [4, 'Partially Paid'],
    [5, 'Paid (Surplus)']
];

var ArrPurchaseInvStatus = [
    [1, 'Open'],
    [2, 'Canceled'],
    [3, 'Unpaid'],
    [4, 'Partially Paid'],
    [5,'Paid']
];

Ext.define('comboxPurchaseInvStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxPurchaseInvStatus',
    fieldLabel: 'Status',
    displayField: 'text',
    valueField: 'value',
    name: 'status',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrPurchaseInvStatus,
    })
});

Ext.define('comboxContactType', {
    // id: 'comboxsupplier',
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxContactType',
    displayField: 'contact_name',
    fieldLabel: 'Jenis Kontak',
    queryMode: 'local',
    name: 'contact_id',
    editable: false,
    triggerAction: 'all',
    valueField: 'contact_id',
    emptyText: 'Pilih...',
    store: Ext.create('Ext.data.Store', {
        fields: ['contact_id', 'contact_name'],
        proxy: {
            type: 'ajax',
            url: CLINIC_API + 'contact/type?key='+key,
            actionMethods: {
               read: 'GET'   
            },
            reader: {
                type: 'json',
                root: 'data'
            }
        },
        autoLoad: false
    })
});

var ArrsalesRequisitionStatus=[
    
    [1,'Menunggu Konfirmasi'],
    [2,'Pesanan Diproses'],
    [3,'Pesanan Dikirim'],
    [4,'Pesanan Tiba'],
    [5,'Pesanan Dikomplain'],
    [6,'Pesanan Selesai'],
    [7,'Pesanan Dibatalkan'],
];

Ext.define('comboxsalesRequisitionStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxsalesRequisitionStatus',
    fieldLabel:'Status Pesanan',
    displayField: 'text',
    valueField: 'value',
    name: 'order_status',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrsalesRequisitionStatus,
    })
});

var ArrPurchaseReceiptStatus = [
    [1, 'Open'],
    [2, 'Partially Received'],
    [3, 'Fully Received'],
    [4, 'Canceled'],
];

Ext.define('comboxPurchaseReceiptStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxPurchaseReceiptStatus',
    fieldLabel: 'Status',
    displayField: 'text',
    valueField: 'value',
    name: 'status',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrPurchaseReceiptStatus,
    })
});

var ProductUnitStore = Ext.create('Ext.data.Store', {
        fields: ['product_unit_id', 'product_unit_code'],
        proxy: {
            type: 'ajax',
            url: CLINIC_API + 'inventory/unit_code?key='+key+'&idunit='+idunit,
            actionMethods: {
               read: 'GET'   
            },
            // params:{
            //     idunit:idunit
            // },
            reader: {
                type: 'json',
                root: 'data'
            }
        },
        autoLoad: false
    })

Ext.define('comboxProductUnit', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxProductUnit',
    displayField: 'product_unit_code',
    fieldLabel: 'Satuan',
    queryMode: 'local',
    name: 'product_unit_id',
    editable: false,
    triggerAction: 'all',
    valueField: 'product_unit_id',
    store:ProductUnitStore
    
});

var DepositPayStatusArr = [
    [1, 'Belum Dibayar'],
    [2, 'Sudah Dibayar'],
];

Ext.define('comboxDepositPayStatus', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxDepositPayStatus',
    displayField: 'text',
    valueField: 'value',
    name: 'status',
    editable: false,
    triggerAction: 'all',
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: DepositPayStatusArr,
    })
});

var openingsavingStatus=[
    [1,'Ya'],
    [2,'Tidak']
]


Ext.define('comboxopeningsavingStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxopeningsavingStatus',
    fieldLabel: 'Status',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: openingsavingStatus,
    })
});

// COMMENT ON COLUMN "public"."stock_opname"."status" IS '1. Draft 2. Approved 3. Rejected';
var ArrStockOpnameStatus=[
    [1,'Dalam Persejutuan'],
    [2,'Disetujui'],
    [3,'DItolak']
]


Ext.define('comboxStockOpnameStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxStockOpnameStatus',
    fieldLabel: 'Status',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    id:'StockOpnameStatus',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrStockOpnameStatus,
    })
});

var productlocationStore = Ext.create('Ext.data.Store', {
    fields: ['product_location_id', 'location_name'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/combox/product_location',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: false
});

Ext.define('comboxproductlocation', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxproductlocation',
    fieldLabel: 'Lokasi',
    displayField: 'location_name',
    valueField: 'product_location_id',
    name: 'product_location_id',
    editable: false,
    triggerAction: 'all',
    store: productlocationStore
});

// COMMENT ON COLUMN "public"."saving_interest"."status" IS '1. Draft 2. Approved 3. Canceled'
var ArrSavingSummaryStatus=[
    [1,'Draft'],
    [2,'Disetujui'],
    [3,'DItolak']
]


Ext.define('comboxSavingSummaryStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxSavingSummaryStatus',
    fieldLabel: 'Status',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    Width:250,
    id:'SavingSummaryStatus',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrSavingSummaryStatus,
    })
});

// IS '1. Suami/Istri 2. Anak 3. Lainnya'
var ArrRelationshipType=[
    [1,'Suami/Istri'],
    [2,'Anak'],
    [3,'Lainnya']
]


Ext.define('comboxArrRelationshipType', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxArrRelationshipType',
    fieldLabel: 'Status',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    Width:250,
    id:'ArrRelationshipType',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrRelationshipType,
    })
});

var loanproductStore = Ext.create('Ext.data.Store', {
    fields: ['id_loan_type', 'loan_name'],
    proxy: {
        type: 'ajax',
        url: COOP_API + 'loan/product?key='+coop_key,
        reader: {
            type: 'json',
            root: 'rows'
        }
    },
    autoLoad: false
});

Ext.define('comboxloanproduct', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxloanproduct',
    fieldLabel: 'Produk Pinjaman',
    displayField: 'loan_name',
    valueField: 'id_loan_type',
    name: 'id_loan_type',
    id:'loan_product',
    editable: false,
    triggerAction: 'all',
    store: loanproductStore
});

var ArrpasienType=[
    [1,'Anggota'],
    [2,'Non Anggota'],
    [3,'Keluarga Anggota']
]

Ext.define('comboxpasientype', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxpasientype',
    displayField: 'text',
    valueField: 'value',
    fieldLabel: 'Jenis Pasien',
    name: 'value',
    id: 'patient_type_id',
    editable: false,
    triggerAction: 'all',
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrpasienType,
    })
});

var ArrstatusPatient=[
    [1,'Inactive'],
    [2,'Active'],
]

Ext.define('comboxstatuspasien', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxstatuspasien',
    displayField: 'text',
    valueField: 'value',
    fieldLabel: 'Status',
    name: 'value',
    id: 'status_patient',
    editable: false,
    triggerAction: 'all',
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrstatusPatient,
    })
});

var ArrpoliType=[
    [1,'Poli Umum'],
    [2,'Poli KIA'],
    [3,'Poli Gigi']
]

Ext.define('comboxpolitype', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxpolitype',
    displayField: 'text',
    valueField: 'value',
    fieldLabel: 'Poli',
    name: 'value',
    // id: 'polytpe_id',
    editable: false,
    triggerAction: 'all',
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrpoliType,
    })
});


var locationStore = Ext.create('Ext.data.Store', {
    fields: ['location_id', 'location_name'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/combox/location',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: false
});
Ext.define('comboxlocation', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxlocation',
    fieldLabel: 'Lokasi',
    displayField: 'location_name',
    valueField: 'location_id',
    name: 'location_id',
    editable: false,
    triggerAction: 'all',
    store: locationStore
});

var politypeStore = Ext.create('Ext.data.Store', {
    fields: ['polytpe_id', 'polytpe_name'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/combox/poly_type',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: false
});

Ext.define('comboxpolytype', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxpolytype',
    fieldLabel: 'Lokasi',
    displayField: 'polytpe_name',
    valueField: 'polytpe_id',
    name: 'polytpe_id',
    editable: false,
    triggerAction: 'all',
    store: politypeStore
});

var stafftypeStore = Ext.create('Ext.data.Store', {
    fields: ['staff_type_id', 'staff_type_name'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/combox/staff_type',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: false
});

Ext.define('comboxstafftype', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxstafftype',
    fieldLabel: 'Jenis Dokter',
    displayField: 'staff_type_name',
    valueField: 'staff_type_id',
    name: 'staff_type_id',
    editable: false,
    triggerAction: 'all',
    store: stafftypeStore
});

var daynameStore = Ext.create('Ext.data.Store', {
    fields: ['day_id', 'day_name'],
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'docter/day_name?key='+key,
        reader: {
            type: 'json',
            root: 'rows'
        }
    },
    autoLoad: false
});

Ext.define('comboxdayname', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxdayname',
    fieldLabel: 'Hari',
    displayField: 'day_name',
    valueField: 'day_id',
    name: 'day_id',
    editable: false,
    triggerAction: 'all',
    store: daynameStore
});

// 
// COMMENT ON COLUMN "public"."medical_record"."medical_status" IS 1. Valid 2 Invalid 3. Canceled';
var ArrmedicalStatus=[
    [1,'Valid'],
    [2,'Invalid'],
    [3,'Canceled']
]

Ext.define('comboxmedicalStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxmedicalStatus',
    displayField: 'text',
    valueField: 'value',
    // fieldLabel: 'Poli',
    name: 'value',
    // id: 'polytpe_id',
    editable: false,
    triggerAction: 'all',
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrmedicalStatus,
    })
});

var ArrmedicineStatus=[
    [1,'Menunggu Pembayaran'],
    [2,'Dalam Diproses'],
    [3,'Sudah Tersedia'],
    [4,'Sudah Diterima'],
    [5,'Dibatalkan'],
    [6,'Retur']
]

Ext.define('comboxmedicineStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxmedicineStatus',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrmedicineStatus,
    })
});


var ArrpatientStatus=[
    [1,'Non Aktif'],
    [2,'Aktif'],
]

Ext.define('comboxpatientStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxpatientStatus',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    fieldLabel:'Status',
    editable: false,
    triggerAction: 'all',
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrpatientStatus,
    })
});

var ArrGenderType=[
    [1,'Laki-laki'],
    [2,'Perempuan'],
]

Ext.define('comboxGenderType', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxGenderType',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    fieldLabel:'Jenis Kelamin',
    editable: false,
    triggerAction: 'all',
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrGenderType,
    })
});

var ArrbenefitType=[
    [1,'Asuransi Umum'],
    [2,'Admedika'],
    [3,'BPJS'],
    [4,'Kopetri'],
]

Ext.define('comboxbenefitType', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxbenefitType',
    displayField: 'text',
    valueField: 'value',
    name: 'benefit_id_type',
    fieldLabel:'Vendor',
    editable: false,
    triggerAction: 'all',
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrbenefitType,
    })
});

// '1. Unpaid 2. Paid 3. Canceled 4. Refunded'
var ArrmedicalPayment = [
    [1, 'Unpaid'],
    [2, 'Paid'],
    [3, 'Canceled'],
    // [4, 'Refunded']
];

Ext.define('comboxmedicalPayment', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxmedicalPayment',
    fieldLabel: 'Pembayaran',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrmedicalPayment,
    })
});
