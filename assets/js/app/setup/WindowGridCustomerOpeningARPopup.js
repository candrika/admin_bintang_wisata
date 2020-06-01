Ext.define('GridCustomerOpeningARPopupModel', {
    extend: 'Ext.data.Model',
    fields: ['idcustomer','idcustomertype','nocustomer','namecustomer','address','shipaddress','billaddress','telephone','handphone','fax','email','website','city','state','postcode','country','highestpayment' ,'avgdaypayment','lastpayment','lastsales','incomeaccount','notes','display','userin','usermod','datein','datemod','status','deleted','idunit','namecustype'],
    idProperty: 'id'
});

var storeGridCustomerOpeningARPopup = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridCustomerOpeningARPopupModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/customer/master/',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
            property: 'menu_name',
            direction: 'DESC'
        }]
});

// storeGridCustomerOpeningARPopup.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     // 'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
//                   };
//               });
              
Ext.define('MY.searchGridCustomerOpeningARPopup', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridCustomerOpeningARPopup',
    store: storeGridCustomerOpeningARPopup,
    width: 180
});

var smGridCustomerOpeningARPopup = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridCustomerOpeningARPopup.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteCustomerOpeningARPopup').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteCustomerOpeningARPopup').enable();
        }
    }
});

Ext.define('GridCustomerOpeningARPopup', {
    itemId: 'GridCustomerOpeningARPopupID',
    id: 'GridCustomerOpeningARPopupID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridCustomerOpeningARPopup',
    store: storeGridCustomerOpeningARPopup,
    loadMask: true,
    columns: [
        {
            text: 'Pilih',
            width: 45,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                
                Ext.getCmp('idcustomer_regap').setValue(selectedRecord.get('idcustomer'));
                Ext.getCmp('customer_name_regap').setValue(selectedRecord.get('namecustomer'));
                Ext.getCmp('WindowGridCustomerOpeningARPopup').hide();
                
            }
        },
         {header: 'idcustomer', dataIndex:'idcustomer', hidden:true},
        {header: 'No', xtype:'rownumberer', sortable:false, width: 50},
        {header: 'No Customer', minWidth: 100, dataIndex: 'nocustomer' },
        {header: 'Name', minWidth: 150, dataIndex: 'namecustomer' },
        {header: 'Type', minWidth: 100, dataIndex: 'namecustype' },
        {header: 'Address', minWidth: 200, dataIndex: 'address' },
        {header: 'Shipping Address', minWidth: 200, dataIndex: 'shipaddress' },
        {header: 'Bill Address', minWidth: 200, dataIndex: 'billaddress' },
        {header: 'No. Telp.', minWidth: 200, dataIndex: 'telephone' },
        {header: 'No. HP', minWidth: 100, dataIndex: 'handphone' },
        {header: 'Fax', minWidth: 100, dataIndex: 'fax' },
        {header: 'Email', minWidth: 100, dataIndex: 'email' },
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridCustomerOpeningARPopup',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridCustomerOpeningARPopup, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridCustomerOpeningARPopup.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {
        }
    }
});

Ext.define(dir_sys + 'setup.WindowGridCustomerOpeningARPopup', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowGridCustomerOpeningARPopup',
    id: 'WindowGridCustomerOpeningARPopup',
    title: 'Customer',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 870,
    modal:true,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridCustomerOpeningARPopup'
    }]
});