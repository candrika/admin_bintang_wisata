Ext.define('GridBuyerMemberSalesInvoiceModel', {
    extend: 'Ext.data.Model',
    fields: ['id_member', 'idunit', 'no_member', 'namaunit', 'id_type', 'no_id', 'member_name', 'address', 'telephone', 'handphone', 'email', 'website', 'postcode', 'birth_location', 'birth_date', 'pin', 'photo_image', 'sign_image', 'notes', 'marital_status', 'nama_ibu_kandung', 'nama_ahli_waris', 'no_id_ahli_waris', 'lahir_ahli_waris', 'hubungan_ahli_waris', 'notlp_ahli_waris', 'no_rekening', 'nama_rekening', 'nama_bank', 'approved_by', 'activated_date', 'status', 'is_staff', 'datein'],
    idProperty: 'id'
});

var storeGridBuyerMemberSalesInvoice = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridBuyerMemberSalesInvoiceModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: COOP_API + 'member/members?key='+coop_key,
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

// storeGridBuyerMemberSalesInvoice.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     // 'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
//                   };
//               });
              
Ext.define('MY.searchGridBuyerMemberSalesInvoice', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridBuyerMemberSalesInvoice',
    store: storeGridBuyerMemberSalesInvoice,
    width: 180
});

var smGridBuyerMemberSalesInvoice = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridBuyerMemberSalesInvoice.getSelection().length;
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

Ext.define(dir_sys + 'sales2.GridBuyerMemberSalesInvoice', {
    itemId: 'GridBuyerMemberSalesInvoice',
    id: 'GridBuyerMemberSalesInvoice',
    extend: 'Ext.grid.Panel',
    title: 'Anggota',
    alias: 'widget.GridBuyerMemberSalesInvoice',
    store: storeGridBuyerMemberSalesInvoice,
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
                var form = Ext.getCmp('EntrySalesOrder').getForm();
                form.findField("buyer_name").setValue(selectedRecord.get('member_name')+ ' #' +selectedRecord.get('no_member'));
                form.findField("idcustomer").setValue(selectedRecord.get('id_member'));
                form.findField("customer_type").setValue(1);
                Ext.getCmp('windowBuyerSalesInvoice').hide();
                
            }
        },
        {
            header: 'id_member',
            dataIndex: 'id_member',
            hidden: true
        }, {
            header: 'No Anggota',
            dataIndex: 'no_member',
            minWidth: 150
        }, {
            header: 'Nama',
            flex: 1,
            dataIndex: 'member_name',
            minWidth: 150
        }, {
            header: 'Status',
            dataIndex: 'status',
            minWidth: 150,
            renderer: function(value) {
              return customColumnStatus(StatusMemberArr, value);
            }
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
                    xtype: 'searchGridBuyerMemberSalesInvoice',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridBuyerMemberSalesInvoice, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridBuyerMemberSalesInvoice.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {
        }
    }
});