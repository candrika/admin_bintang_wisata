Ext.define('BankModel', {
    extend: 'Ext.data.Model',
    fields: ['bank_id', 'bank_name', 'branch_name', 'address', 'account_number', 'account_name', 'status'],
    idProperty: 'bank_id',
});

Ext.define('App.model.Account', {
    extend: 'Ext.data.Model',
    fields: ['idaccount', 'idunit', 'idaccounttype', 'accnumber', 'accname', 'balance', 'description', 'namaunit', 'acctypename'],
    idProperty: 'idaccount',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_account/gridaccount/account',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
    },
});

Ext.define('App.model.Project', {
    extend: 'Ext.data.Model',
    fields: ['idproject', 'projectname', 'description', 'startdate', 'enddate', 'idunit', 'idcustomer', 'idtax', 'idcurrency', 'status', 'nocustomer', 'namecustomer', 'namaunit', 'budget', 'expense', 'realization', 'profit', 'taxcode', 'namecurr'],
    idProperty: 'idproject',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/project/master',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
    },
});

Ext.define('App.model.CustomerType', {
    extend: 'Ext.data.Model',
    fields: ['idcustomertype', 'namecustype', 'description', 'idunit', 'status', 'deleted'],
    idProperty: 'idcustomertype',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/customertype/master',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
    },
});

Ext.define('App.model.Customer', {
    extend: 'Ext.data.Model',
    fields: ['idcustomer', 'idcustomertype', 'nocustomer', 'namecustomer', 'address', 'shipaddress', 'billaddress', 'telephone', 'handphone', 'fax', 'email', 'website', 'city', 'state', 'postcode', 'country', 'highestpayment', 'avgdaypayment', 'lastpayment', 'lastsales', 'incomeaccount', 'notes', 'display', 'userin', 'usermod', 'datein', 'datemod', 'status', 'deleted', 'idunit', 'namecustype'],
    idProperty: 'idcustomer',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/customer/master',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
    },
});

Ext.define('App.model.SupplierType', {
    extend: 'Ext.data.Model',
    fields: ['idsuppliertype', 'idunit', 'name', 'desc', 'deleted', 'userin', 'datein', 'usermod', 'datemod', 'status'],
    idProperty: 'bank_id',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/suppliertype/master',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
    },
});

Ext.define('App.model.Supplier', {
    extend: 'Ext.data.Model',
    fields: ['idsupplier', 'idpayment', 'idshipping', 'code', 'namesupplier', 'companyaddress', 'companyaddress2', 'companyaddress3', 'companyaddress4', 'shipaddress', 'billaddress', 'telephone', 'handphone', 'fax', 'email', 'website', 'city', 'state', 'postcode', 'country', 'highestpo', 'avgdaypay', 'lastpayment', 'lastpurchase', 'expenseaccount', 'notes', 'userin', 'usermod', 'datein', 'datemod', 'idunit', 'supplier_type_id', 'status', 'deleted', 'typename'],
    idProperty: 'idsupplier',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/supplier/master',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
    },
});

Ext.define('App.model.PurchaseItem', {
    extend: 'Ext.data.Model',
    fields: ['idpurchaseitem', 'idpurchase', 'idinventory', 'idtax', 'itemdesc', 'qty', 'received', 'backorder', 'price', 'disc', 'total', 'invno', 'ratetax', 'tax', 'beforetax', 'status', 'deleted', 'remarks', 'nameinventory', 'cost'],
    idProperty: 'idpurchaseitem',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/PurchaseItem/purchase',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
    },
});

Ext.define('App.model.Purchase', {
    extend: 'Ext.data.Model',
    fields: ['idpurchase', 'idcreditterm', 'idshipping', 'idpurchasetype', 'idpurchasestatus', 'idfrequency', 'idjournal', 'idtax', 'nopurchase', 'name', 'payee', 'shipaddress', 'date', 'includetax', 'requestdate', 'freigthcost', 'tax', 'amountdue', 'totalamount', 'paidtoday', 'totalowed', 'balance', 'memo', 'isrecuring', 'startdate', 'recuntildate', 'recnumtimes', 'alertto', 'notifto', 'display', 'year', 'month', 'userin', 'usermod', 'datein', 'datemod', 'idpayment', 'notes', 'duedate', 'paiddate', 'idunit', 'idcurrency', 'noinvoice', 'idsupplier', 'subtotal', 'totalpaid', 'status', 'deleted', 'netddays', 'neteomddays', 'discount', 'netdmax', 'delivereddate', 'approver', 'nameshipping', 'namepurchase', 'purchasestatus', 'nojournal', 'nametax', 'namaunit', 'namecurr', 'namesupplier', 'username', 'idproject', 'projectname'],
    idProperty: 'idpurchase',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/purchase/purchase',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
    },
});

Ext.define('App.model.GoodsReceived', {
    extend: 'Ext.data.Model',
    fields: ['idgoodsreceived', 'idgoodsreceipt', 'idinventory', 'qty', 'batchcode', 'label', 'remarks', 'idunit', 'userin', 'datein', 'usermod', 'datemod', 'status', 'deleted', 'invno'],
    idProperty: 'idgoodsreceived',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/GoodsReceived/purchase',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
    },
});

Ext.define('App.model.GoodsReceipt', {
    extend: 'Ext.data.Model',
    fields: ['idgoodsreceipt', 'idpurchase', 'date', 'remarks', 'idunit', 'userin', 'datein', 'usermod', 'datemod', 'status', 'deleted', 'receiver', 'nopurchase', 'requestdate', 'delivereddate', 'subtotal', 'tax', 'discount', 'totalpaid', 'receivername'],
    idProperty: 'idgoodsreceived',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/GoodsReceipt/purchase',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
    },
});

Ext.define('App.model.InventoryBuy', {
    extend: 'Ext.data.Model',
    fields: ['idinventory', 'invno', 'description', 'nameinventory', 'images', 'idinventorycat', 'qtystock', 'cosaccount', 'cost', 'unitmeasure', 'numperunit', 'namesupplier', 'yearbuy', 'monthbuy', 'datebuy', 'namecat', 'nametaxbuy', 'accname', 'accnumber', 'assetaccount', 'idsupplier', 'ratetax'],
    idProperty: 'idinventory',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/inventorybuy/inventory',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
    },
});

Ext.define('App.model.InventoryBySku', {
    extend: 'Ext.data.Model',
    fields: ['idinventory', 'invno', 'sku_no', 'nameinventory', 'totalstock'],
    idProperty: 'idinventory',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'inventory/get_by_sku',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
    },
});

Ext.define('App.model.Salesman', {
    extend: 'Ext.data.Model',
    fields: ['idemployee', 'firstname', 'lastname', 'code'],
    idProperty: 'idemployee',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/salesman/sales',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
    },
});