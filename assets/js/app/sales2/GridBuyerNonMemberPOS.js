Ext.define('GridBuyerNonMemberPOSModel', {
    extend: 'Ext.data.Model',
    fields: ['patient_id','member_id','patient_no','patient_name','birthday_date','id_type','country','datein','email','no_id','no_mobile','no_tlp','patient_photo','patient_type_id','remarks','status'],
    idProperty: 'id'
});

var storeGridBuyerNonMemberPOS = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridBuyerNonMemberPOSModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'patient/datas?key='+key+'&patient_type_id='+2,
        actionMethods: {
            read: 'GET',
        },
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
              
Ext.define('MY.searchGridBuyerNonMemberPOS', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridBuyerNonMemberPOS',
    store: storeGridBuyerNonMemberPOS,
    width: 180
});

var smGridBuyerNonMemberPOS = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridBuyerNonMemberPOS.getSelection().length;
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

Ext.define(dir_sys + 'sales2.GridBuyerNonMemberPOS', {
    itemId: 'GridBuyerNonMemberPOS',
    id: 'GridBuyerNonMemberPOS',
    extend: 'Ext.grid.Panel',
    title: 'Non Anggota',
    alias: 'widget.GridBuyerNonMemberPOS',
    store: storeGridBuyerNonMemberPOS,
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
                form.findField("no_member").setValue(selectedRecord.get('patient_name'));
                form.findField("customer_id").setValue(selectedRecord.get('patient_id'));
                form.findField("id_member").setValue(null);
                form.findField("customer_type").setValue('nonmember');
                // update_pos_footer();
                Ext.getCmp('windowBuyerPOS').hide();
                
            }
        },
        {header: 'patient_id', dataIndex:'patient_id', hidden:true},
        {header: 'member_id', dataIndex:'member_id', hidden:true},
        {header: 'No Pasien', minWidth: 150, dataIndex: 'patient_no' },
        {header: 'Nama Pasien', minWidth: 150, dataIndex: 'patient_name'},
        {header: 'Status', dataIndex:'status', minWidth: 100,  
            renderer: function(value) {
                return togglearr.map(function(val){return val[1]})[value];
            },
            
        },
        {header: 'Catatan', dataIndex:'remarks', minWidth: 100,flex:1}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                // '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridBuyerNonMemberPOS',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridBuyerNonMemberPOS, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridBuyerNonMemberPOS.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {
        }
    }
});