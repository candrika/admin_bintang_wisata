//acc list
Ext.define('CoaProductPopupModel', {
    extend: 'Ext.data.Model',
    fields: ['idaccount','idunit','idaccounttype','accnumber','accname','balance','description','namaunit','acctypename'],
    idProperty: 'id'
});

var storeCoaProductPopup = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'CoaProductPopupModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_account/gridaccount/account',
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
})

Ext.define('MY.searchCoaProductPopup', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchCoaProductPopup',
    store: storeCoaProductPopup,
    width: 180
});

Ext.define('GridWindowCoaProductPopup', {
    itemId: 'GridWindowCoaProductPopup',
    id: 'GridWindowCoaProductPopup',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridWindowCoaProductPopup',
    store: storeCoaProductPopup,
    loadMask: true,
    columns: [{
            text: 'Pilih',
            width: 55,
            // menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: 'Pilih Akun Ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
               var form = Ext.getCmp('formInventory_v2').getForm();
               form.findField('coa_inventory_id').setValue(selectedRecord.data.idaccount);
               form.findField('coa_inventory_name').setValue(selectedRecord.data.accname);
               Ext.getCmp('WindowCoaProductPopup').hide();
            }
        },
        { header: 'idaccount', dataIndex: 'idaccount', hidden: true },
        { header: 'idunit', dataIndex: 'idunit', hidden: true },
        { header: 'No Akun', dataIndex: 'accnumber', },
        { header: 'Nama Akun', dataIndex: 'accname', minWidth: 150, flex: 1 },
        { header: 'Saldo', dataIndex: 'balance', minWidth: 150, xtype: 'numbercolumn', align: 'right', hidden: true },
        { header: 'Tipe Akun', dataIndex: 'acctypename', minWidth: 170 },
        // {header: 'Deskripsi', dataIndex: 'description', minWidth: 250},
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            '->',
            'Pencarian: ', ' ',
            {
                xtype: 'searchCoaProductPopup',
                text: 'Left Button'
            }

        ]
    }, {
        xtype: 'pagingtoolbar',
        store: storeCoaProductPopup, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
            // pageSize:20
    }]
});

Ext.define(dir_sys + 'inventory.WindowCoaProductPopup', {
    extend: 'Ext.window.Window',
    id: 'WindowCoaProductPopup',
    alias: 'widget.WindowCoaProductPopup',
    title: 'Pilih Akun Pencatatan Persedian',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    modal:true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: 660,
    height: panelHeight,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridWindowCoaProductPopup'
    }]
});