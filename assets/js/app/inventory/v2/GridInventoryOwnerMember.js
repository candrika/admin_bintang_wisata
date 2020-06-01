Ext.define('GridInventoryOwnerMemberModel', {
    extend: 'Ext.data.Model',
    fields: ['id_member', 'idunit', 'no_member', 'namaunit', 'id_type', 'no_id', 'member_name', 'address', 'telephone', 'handphone', 'email', 'website', 'postcode', 'birth_location', 'birth_date', 'pin', 'photo_image', 'sign_image', 'notes', 'marital_status', 'nama_ibu_kandung', 'nama_ahli_waris', 'no_id_ahli_waris', 'lahir_ahli_waris', 'hubungan_ahli_waris', 'notlp_ahli_waris', 'no_rekening', 'nama_rekening', 'nama_bank', 'approved_by', 'activated_date', 'status', 'is_staff', 'datein'],
    idProperty: 'id'
});

var storeGridInventoryOwnerMember = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridInventoryOwnerMemberModel',
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
              
Ext.define('MY.searchGridInventoryOwnerMember', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridInventoryOwnerMember',
    store: storeGridInventoryOwnerMember,
    width: 180
});

var smGridInventoryOwnerMember = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridInventoryOwnerMember.getSelection().length;
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

Ext.define(dir_sys + 'inventory.v2.GridInventoryOwnerMember', {
    itemId: 'GridInventoryOwnerMember',
    id: 'GridInventoryOwnerMember',
    extend: 'Ext.grid.Panel',
    title: 'Anggota',
    alias: 'widget.GridInventoryOwnerMember',
    store: storeGridInventoryOwnerMember,
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
                form.findField("owner_name").setValue(selectedRecord.get('member_name'));
                form.findField("consignment_owner_id").setValue(selectedRecord.get('id_member'));
                form.findField("consignment_owner_type_id").setValue(1);
                Ext.getCmp('windowInventoryOwner').hide();
                
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
                    xtype: 'searchGridInventoryOwnerMember',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridInventoryOwnerMember, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridInventoryOwnerMember.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {
        }
    }
});