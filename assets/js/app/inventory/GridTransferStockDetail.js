// dir_sys + 'member.windowPopupfromFamilly
var wItemProductPopup = Ext.create(dir_sys + 'inventory.wItemProductPopup');

// GridTransferStockDetailModel
Ext.define('GridTransferStockDetailModel', {
    extend: 'Ext.data.Model',
    fields: ['transfer_stock_id','product_id','current_qty', 'transfer_qty', 'notes', 'location_origin_id', 'current_destination_id','no_sku','no_barcode','product_name'],
    idProperty: 'id'
});

var storeGridTransferStockDetail = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridTransferStockDetailModel',
    remoteSort: true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API  + 'inventory/transfer_stock_detail?key='+key,
        actionMethods: {
                read: 'GET'
        },
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
    },
    sorters: [{
        property: 'menu_name',
        direction: 'DESC'
    }]
});

storeGridTransferStockDetail.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'idunit': idunit,
        'key': key,
        'password':password
//         'member_id':Ext.getCmp('id_member_frm_member').getValue()
    };
});

Ext.define('MY.searchGridTransferStockDetail', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridTransferStockDetail',
    store: storeGridTransferStockDetail,
    width: 180
});
Ext.define(dir_sys + 'inventory.GridTransferStockDetail', {
    id: 'GridTransferStockDetailID',
    extend: 'Ext.grid.Panel',
    xtype: 'cell-editing',   
    alias: 'widget.GridTransferStockDetail',
    loadMask: true,

    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit:1
        });

        Ext.apply(this, {
            width: panelW,
            title:'Daftar Barang',
            height: 450,
            forceFit: true,
            plugins: [this.cellEditing],
            store: storeGridTransferStockDetail,

            // border:true,
            columns: [{
                header: 'transfer_stock_id',
                dataIndex: 'transfer_stock_id',
                hidden: true
            },{
                header: 'product_id',
                dataIndex: 'product_id',
                hidden: true
            },{
                header: 'location_origin_id',
                dataIndex: 'location_origin_id',
                hidden: true
            },{
                header: 'current_destination_id',
                dataIndex: 'current_destination_id',
                hidden: true
            },{
                header: 'No Barang',
                dataIndex: 'no_sku',
                minWidth: 150
            },{
                header: 'No Barcode',
                dataIndex: 'no_barcode',
                minWidth: 150
            },{
                header: 'Nama Barang',
                dataIndex: 'product_name',
                minWidth: 150,
                // editor:{
                //     xtype:'textarea',
                //     readOnly: true,
                // }
            },{
                header: 'Stok Tersedia',
                dataIndex: 'current_qty',
                minWidth: 150,
                xtype: 'numbercolumn',
                align: 'right'
            },{
                header: 'Qty Transfer',
                dataIndex: 'transfer_qty',
                minWidth: 150,
                xtype: 'numbercolumn',
                align: 'right',
                editor:{
                    xtype:'textfield',
                    // readOnly: true,
                }
            },{
                header: 'Catatan',
                dataIndex: 'notes',
                minWidth: 150,
                editor:{
                    xtype:'textfield',
                    // readOnly: true,
                }
            }],
            selModel: {
                selType: 'cellmodel'
            },
            dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                            text:'Tambah Barang',
                            iconCls:'add-icon',
                            id:'addTransferStockItems',
                            handler:function(){
                                wItemProductPopup.show(); 

                                console.log(Ext.getCmp('business_id_origin').getValue());
                               
                                var store_popup = Ext.getCmp('ItemProductPopupGrid').getStore();
                                store_popup.on('beforeload', function(store, operation, eOpts) {
                                    operation.params = {
                                        'key': key,
                                        'password':password,
                                        'idunit':idunit,
                                        'business_id':Ext.getCmp('business_id_origin').getValue()
                                    };
                                });

                                store_popup.load();
                            }    
                },
                {
                    text:'Hapus',
                    iconCls:'delete-icon',
                    id:'deleteTransferStockItems',
                    handler:function(){
                            Ext.Msg.show({
                                title: 'Confirm',
                                msg: 'Delete Selected ?',
                                buttons: Ext.Msg.YESNO,
                                scope:this,
                                fn: function(btn) {
                                    if (btn == 'yes') {
                                        // var grid = Ext.ComponentQuery.query('GridOpeningAccountGrid')[0];
                                        var grid = Ext.getCmp('GridTransferStockDetailID');
                                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                        var data = grid.getSelectionModel().getSelection();
                                        
                                        Ext.Ajax.request({
                                            url: CLINIC_API  + 'inventory/transfer_stock_items',
                                            method: 'POST',
                                            params: {
                                                      id: selectedRecord.data.transfer_stock_id,
                                                      product_id:selectedRecord.data.product_id,
                                                      no_sku:selectedRecord.data.no_sku,
                                                      location_origin_id:selectedRecord.data.location_origin_id,
                                                      current_destination_id:selectedRecord.data.current_destination_id,
                                                      key:key
                                            },
                                            success: function(form, action) {
                                                var d = Ext.decode(form.responseText);
                                                console.log(d.success);
                                                if (d.success==false) {
                                                    
                                                    var grid = Ext.getCmp('GridTransferStockDetailID').getStore();
                                                    grid.removeAt(grid.indexOf(selectedRecord));
                                                    Ext.Msg.alert('Informasi', 'Data berhasil dihapus');

                                                } else {
                                                    Ext.Msg.alert('Informasi', d.message);
                                                    var grid = Ext.getCmp('GridTransferStockDetailID').getStore();
                                                    grid.removeAt(grid.indexOf(selectedRecord));
                                                    console.log(d);
                                                    // Ext.Msg.alert('Informasi', 'Data berhasil dihapus');
                                                    Ext.getCmp('GridTransferStockDetailID').getStore().load();
                                                }
                                            },
                                            failure: function(form, action) {
                                                var d = Ext.decode(form.responseText);

                                                Ext.Msg.alert('Failed', d ? d.message : 'No response');
                                            }
                                        });
                                        
                                    }
                                }       
                            });
                        }
                    }]
                },
                {
                    xtype: 'pagingtoolbar',
                    store: storeGridTransferStockDetail, // same store GridPanel is using
                    dock: 'bottom',
                    displayInfo: true
                    // pageSize:20
                }
            ],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {},
                render: {
                    scope: this,
                    fn: function(grid) {
                        storeGridTransferStockDetail.load()
                        // disableGridItemEntryPurchaseOrder();
                    }
                }
            }
        });

        this.callParent();

        this.on('afterlayout', this.loadStore, this, {
            delay: 1,
            single: true
        });

        this.on('afteredit', this.onAfterEdit, this);

        this.on({
            scope: this,
            edit: function(grid,rowIndex) {
                // console.log(rowIndex);
                // update_relation_familly(rowIndex.record.data.relationship_type,rowIndex.record.data.member_family_id);
            },
            change:function(){
                // alert('say hello')   
            }
        });

        // this.on('selectCustomer', this.onSelectCustomer, this);
    },
    onAfterEdit: function(o) {
        // handle after edit
       
    },
    loadStore: function() {},
    onStoreLoad: function() {
        //        Ext.Msg.show({
        //            title: 'Store Load Callback',
        //            msg: 'store was loaded, data available for processing',
        //            icon: Ext.Msg.INFO,
        //            buttons: Ext.Msg.OK
        //        });
    },
    onAddClick: function(grid, rowIndex) {
        console.log(grid)
    },
    onRemoveClick: function(grid, rowIndex) {
        console.log(grid.getStore().data.items[0].raw)
        this.getStore().removeAt(rowIndex);
    },
    onEdit: function(editor, e) {
        e.record.commit();
        console.log(grid)
    },onEditclick:function(grid,rowIndex){
        alert('hallo')
        // console.log(grid)
    }
})
