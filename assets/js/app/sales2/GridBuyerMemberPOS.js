Ext.define('GridBuyerMemberPOSModel', {
    extend: 'Ext.data.Model',
    fields: ['id_member', 'idunit', 'no_member', 'namaunit', 'id_type', 'no_id', 'member_name', 'address', 'telephone', 'handphone', 'email', 'website', 'postcode', 'birth_location', 'birth_date', 'pin', 'photo_image', 'sign_image', 'notes', 'marital_status', 'nama_ibu_kandung', 'nama_ahli_waris', 'no_id_ahli_waris', 'lahir_ahli_waris', 'hubungan_ahli_waris', 'notlp_ahli_waris', 'no_rekening', 'nama_rekening', 'nama_bank', 'approved_by', 'activated_date', 'status', 'is_staff', 'datein'],
    idProperty: 'id'
});

var storeGridBuyerMemberPOS = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridBuyerMemberPOSModel',
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

// storeGridBuyerMemberPOS.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     'key':coop_key
//                     // 'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
//                   };
//               });
              
Ext.define('MY.searchGridBuyerMemberPOS', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridBuyerMemberPOS',
    store: storeGridBuyerMemberPOS,
    width: 180
});

var smGridBuyerMemberPOS = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridBuyerMemberPOS.getSelection().length;
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

Ext.define(dir_sys + 'sales2.GridBuyerMemberPOS', {
    itemId: 'GridBuyerMemberPOS',
    id: 'GridBuyerMemberPOS',
    extend: 'Ext.grid.Panel',
    title: 'Anggota',
    alias: 'widget.GridBuyerMemberPOS',
    store: storeGridBuyerMemberPOS,
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
                var form = Ext.getCmp('EntryTransactionPOS').getForm();
                form.findField("no_member").setValue(selectedRecord.get('member_name')+ ' #' +selectedRecord.get('no_member'));
                form.findField("id_member").setValue(selectedRecord.get('id_member'));
                form.findField("customer_type").setValue('member');
                update_pos_footer();
                Ext.getCmp('windowBuyerPOS').hide();
                
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
                    xtype: 'searchGridBuyerMemberPOS',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridBuyerMemberPOS, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridBuyerMemberPOS.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {
        }
    }
});