Ext.define('GridInventoryOwnerNonMemberModel', {
    extend: 'Ext.data.Model',
    fields: ['idcustomer', 'idcustomertype', 'nocustomer', 'namecustomer', 'address', 'shipaddress', 'billaddress', 'telephone', 'handphone', 'fax', 'email', 'website', 'city', 'state', 'postcode', 'country', 'highestpayment', 'avgdaypayment', 'lastpayment', 'lastsales', 'incomeaccount', 'notes', 'display', 'userin', 'usermod', 'datein', 'datemod', 'status', 'deleted', 'idunit', 'namecustype'],
    idProperty: 'idcustomer'
});


var storeGridInventoryOwnerNonMember = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridInventoryOwnerNonMemberModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: COOP_API + 'contact/contacts?key='+coop_key,
        actionMethods:{read:'GET'},
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
              
Ext.define('MY.searchGridInventoryOwnerNonMember', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridInventoryOwnerNonMember',
    store: storeGridInventoryOwnerNonMember,
    width: 180
});

var smGridInventoryOwnerNonMember = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridInventoryOwnerNonMember.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteSalesmanSOPopup').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteSalesmanSOPopup').enable();
        }
    }
});

Ext.define(dir_sys + 'inventory.GridInventoryOwnerNonMember', {
    itemId: 'GridInventoryOwnerNonMember',
    id: 'GridInventoryOwnerNonMember',
    extend: 'Ext.grid.Panel',
    title: 'Non Anggota',
    alias: 'widget.GridInventoryOwnerNonMember',
    store: storeGridInventoryOwnerNonMember,
    loadMask: true,
    columns: [
        {
            text: 'Pilih',
            width: 65,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                  var form = Ext.getCmp('formInventory_v2').getForm();
                form.findField("owner_name").setValue(selectedRecord.get('namecustomer'));
                form.findField("consignment_owner_id").setValue(selectedRecord.get('idcustomer'));
                form.findField("consignment_owner_type_id").setValue(2);
                Ext.getCmp('windowInventoryOwner').hide();
                
            }
        },
        {
            header: 'idcustomer',
            dataIndex: 'idcustomer',
            hidden: true
        }, {
            header: 'Nama',
            flex: 1,
            dataIndex: 'namecustomer',
            minWidth: 150
        }, {
            header: 'Jenis',
            dataIndex: 'namecustype',
            minWidth: 200
        }
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                // '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridInventoryOwnerNonMember',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridInventoryOwnerNonMember, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridInventoryOwnerNonMember.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {
        }
    }
});