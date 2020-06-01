Ext.define('GridDebtModel', {
    extend: 'Ext.data.Model',
    fields: ['namesupplier', 'idpurchase', 'idjournal', 'nopurchase', 'shipaddress', 'date', 'duedate', 'tax', 'totalamount', 'paidtoday', 'totalowed', 'memo', 'year', 'month', 'userin', 'datein', 'notes', 'paiddate', 'noinvoice', 'nameshipping', 'status', 'namepayment', 'namaunit', 'namecurr'],
    idProperty: 'id'
});

var storeGridHutang = Ext.create('Ext.data.Store', {
    pageSize: 15,
    model: 'GridDebtModel',
    autoload: true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Debt/purchase',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        }
    }
});

Ext.define('gridHutang', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridHutang',
    id: 'gridHutang',
    title: 'Daftar Hutang',
    store: storeGridHutang,
    columns: [
        {header: 'idpurchase', dataIndex: 'idpurchase', hidden: true},
        {header: 'No PO', dataIndex: 'nopurchase', minWidth: 100},
        {header: 'Supplier', dataIndex: 'namesupplier', minWidth: 100},
        {header: 'Jatuh Tempo', dataIndex: 'duedate', minWidth: 100},
        {header: 'Terhutang', dataIndex: 'totalowed', minWidth: 100, xtype: 'numbercolumn', align: 'right'},
        {header: 'No invoice', dataIndex: 'noinvoice', minWidth: 100},
    ],
    listeners: {
        itemdblclick: function(dv, record, item, index, e) {
            var FormCuti = Ext.getCmp('formCuti');
            wCuti.show();
            if (Ext.getCmp('approvalCutiBtn') == undefined)
            {
                FormCuti.down('toolbar').add({
                    id: 'approvalCutiBtn',
                    text: 'Approval',
                    handler: function() {

                        Ext.Ajax.request({
                            url: SITE_URL + 'personalia/approvalCuti',
                            method: 'POST',
                            params: {
                                norcuti: record.data.norcuti
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                Ext.Msg.alert('Success', d.message);
                                wCuti.close();
                                storeGridHutang.load();
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('Failed', d.message);
                            }
                        });
                    }
                });
            }
            FormCuti.getForm().load({
                url: SITE_URL + 'personalia/loadFormData/formCuti/' + record.data.norcuti,
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.message);
                }
            })
        }
    }
    , dockedItems: [
        {
            xtype: 'pagingtoolbar',
            store: storeGridHutang, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }]
});