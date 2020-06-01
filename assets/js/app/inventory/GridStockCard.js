// ',      
var TypestockTRXArr=[
    [1,'Order'],
    [2,'Stock In By PO'],
    [3,'Stock In By Cash'],
    [4,'Stock Opname (+)'],
    [5,'Stock Opname (-)'],
    [6,'Sales Return'],
    [7,'Purchase Return'],
    [8,'Sales'],
    [9,'Opening Balance'],
    [10,'Cancelation'],
    [11,'Transfer Stock'],

];

var WindowProductPopup = Ext.create(dir_sys + 'inventory.WindowProductPopup');
Ext.define('GridStockCardModel', {
    extend: 'Ext.data.Model',
    fields: ['stock_history_id','datein','product_id','product_name','type_adjustment', 'no_transaction','notes','idjournal', 'current_qty', 'trx_qty','new_qty','no_sku','no_barcode','business_name'],
    idProperty: 'id'
});
var storeGridStockCard = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridStockCardModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API  + 'inventory/data_stock?key='+key,
        actionMethods: {
            read:'GET',
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

storeGridStockCard.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'key':key,
        'password':password,
        'idunit':idunit,
        'product_id':Ext.getCmp('product_id').getValue(),
        'startdate': Ext.getCmp('startdate_GridStockCard').getValue(),
        'enddate': Ext.getCmp('enddate_GridStockCard').getValue()
    };
});

Ext.define('MY.searchGridStockCard', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridStockCard',
    store: storeGridStockCard,
    width: 180
});
var smGridStockCard = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridStockCard.getSelection().length;
            if (selectedLen == 0) {
                // Ext.getCmp('btnDelete.GridStockCard').disable();
            }
        },
        select: function(model, record, index) {
            // if (record.data.status == '2') {
            //     //sudah completed tidakbisa ubah status                
            //     Ext.getCmp('btnCompletedSavingTrx').disable();
            //     Ext.getCmp('btnPendingSavingTrx').disable();
            //     Ext.getCmp('btnRejectSavingTrx').disable();
                
            // } else {
            //    Ext.getCmp('btnCompletedSavingTrx').enable();
            //    Ext.getCmp('btnPendingSavingTrx').enable();
            //    Ext.getCmp('btnRejectSavingTrx').enable();
               
            // }
        }
    }
});
Ext.define(dir_sys + 'inventory.GridStockCard', {
    // title: 'Kartu Stok',
    itemId: 'GridStockCard',
    id: 'GridStockCard',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridStockCard',
    store: storeGridStockCard,
    // selModel: smGridStockCard,
    loadMask: true,
    columns: [{
            header: 'stock_history_id',
            dataIndex: 'stock_history_id',
            hidden: true
        }, {
            header: 'product_id',
            dataIndex: 'product_id',
            hidden: true
        }
        , 
        {
            header: 'No Barang',
            flex: 1,
            dataIndex: 'no_sku',
            minWidth: 150
        },
        {
            header: 'No Barcode',
            flex: 1,
            dataIndex: 'no_barcode',
            minWidth: 150
        },
        {
            header: 'Nama Produk',
            flex: 1,
            dataIndex: 'product_name',
            minWidth: 150
        },
        {
            header: 'Unit Usaha',
            // flex: 1,
            dataIndex: 'business_name',
            minWidth: 150
        },

        {
            header: 'Tanggal Transaksi',
            dataIndex: 'datein',
            minWidth: 170
        },
        {
            header: 'Tipe Transaksi',
            dataIndex: 'type_adjustment',
            minWidth: 150,
            renderer: function(value) {
              return customColumnStatus(TypestockTRXArr, value);
            }
        }, 
       {
            header: 'Qty Awal',
            dataIndex: 'current_qty',
            align: 'right',
            xtype: 'numbercolumn',
            minWidth: 150
        },{
            header: 'Qty Transaksi',
            dataIndex: 'trx_qty',
            align: 'right',
            xtype: 'numbercolumn',
            minWidth: 150
        },{
            header: 'Qty Akhir',
            dataIndex: 'new_qty',
            align: 'right',
            xtype: 'numbercolumn',
            minWidth: 150
        }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
                xtype: 'datefield',
                id: 'startdate_GridStockCard',
                format: 'd/m/Y',
                // value: datenow(),
                fieldLabel: 'Periode',
            }, ' to ', {
                xtype: 'datefield',
                id: 'enddate_GridStockCard',
                format: 'd/m/Y',
                // value: datenow(),
                hideLabel: true
                // fieldLabel: 'Date Order',
            },
            {
                xtype: 'hiddenfield',
                id: 'product_id',
                // name:'Produk'
            },
            {
                xtype: 'textfield',
                id: 'product_name_input',
                fieldLabel:'Produk',
                listeners:{
                    render:function(component){
                    component.getEl().on('click', function(event, el) {
                            WindowProductPopup.show();
                            var gridProductPopup = Ext.getCmp('ProductPopup').getStore();
                            gridProductPopup.getProxy.extraparams={};
                            gridProductPopup.on('beforeload', function(store, operation, eOpts) {
                                            operation.params = {
                                                'idunit': idunit,
                                                // 'idaccounttype': '5,17,19' //piutang
                                                                // 'idaccounttype': '1,19'
                                            };
                            });
                            gridProductPopup.load();
                    }); 
                }
                },
            },  
            // {
            //     xtype:'comboxStatusSavingTransaction',
            //     value:2,
            //     fieldLabel:'Status Bayar',
            //     id:'CBcomboxStatusSavingTransaction',
            //     labelWidth:90,
            //     width:250,
            //     listeners: {
            //         select: function(combo, record, index) {
            //           storeGridStockCard.load();
            //         }
            //     }
            // },
            {
                text: 'Search',
                handler: function() {
                    storeGridStockCard.load();
                }
            },
            {
                text: 'Clear Filter',
                handler: function() {
                    Ext.getCmp('startdate_GridStockCard').setValue();
                    Ext.getCmp('enddate_GridStockCard').setValue();
                    Ext.getCmp('product_name_input').setValue();
                    Ext.getCmp('product_id').setValue();
                    storeGridStockCard.load();
                }
            }
        ]
    }, {
        xtype: 'toolbar',
        dock: 'top',
        hidden:true,
        items: [
        // {
        //         id: 'depositTransactionGridBtnid',
        //         text: 'Setor',
        //         iconCls: 'arrow-down-icon',
        //         handler: function() {
        //             WindowFormDeposit.show();
        //             var formWindowFormDeposit = Ext.getCmp('formWindowFormDeposit').getForm();
        //             formWindowFormDeposit.reset();
        //             Ext.getCmp('statusformSavingTransaction').setValue('input');
        //             Ext.getCmp('statusWindowFormDeposit').setValue(3);
        //             Ext.getCmp('statusWindowFormDeposit').setReadOnly(true);
        //             Ext.getCmp('statusWindowFormDeposit').hide();

        //             formWindowFormDeposit.findField('trx_date').setValue(new Date());
        //             formWindowFormDeposit.findField('amount').setValue(0);
        //             formWindowFormDeposit.findField('fee_adm').setValue(0);

        //             Ext.getCmp('rg_saving_dest').setValue({ trx_destination: 1 });

        //              ctrl_self_account();
        //         }
        //     },{
        //         id:'importSavingDataxlxsid',
        //         text:'Import Setoran',
        //         iconCls:'page_excel',
        //         handler:function(){
        //            Ext.getCmp('windowPopupImportRowDataSaving').show()
        //         }

        //     }, 
        //     {
        //         id: 'withdrawTransactionGridBtnid',
        //         text: 'Penarikan',
        //         iconCls: 'arrow-up-icon',
        //         handler: function() {
        //             WindowFormWithdraw.show();
        //             ctrl_nonkuasa();

        //             var form = Ext.getCmp('formWindowFormWithdraw').getForm();
        //             form.reset();
        //             form.findField("status").setValue(1);
        //             form.findField("status").setReadOnly(true);

        //              Ext.getCmp("memberPhotoTrx").el.dom.src = FILE_URL+null;
        //              Ext.getCmp("memberTTDTrx").el.dom.src = FILE_URL+null;
        //         }
        //     },
        //     {
        //         text: 'Transfer',
        //         hidden:true,
        //         iconCls: 'arrow-switch-icon',
        //         handler: function() {
        //             // WindowFormWithdraw.show();
        //             // ctrl_nonkuasa();

        //             //  var form = Ext.getCmp('formWindowFormWithdraw').getForm();
        //             // form.findField("status").setValue(1);
        //             // form.findField("status").setReadOnly(true);
        //         }
        //     },
        //     {
        //         text: 'Set Status',
        //         iconCls: 'edit-icon',
        //         menu: [{
        //             text: 'Completed',
        //             id:'btnCompletedSavingTrxid',
        //             handler: function() {
        //                 // var grid = Ext.ComponentQuery.query('GriddeliveryOrderGridID')[0];
        //                 var grid = Ext.getCmp('TransactionGrid');
        //                 var selectedRecord = grid.getSelectionModel().getSelection()[0];
        //                 var data = grid.getSelectionModel().getSelection();
        //                 if (data.length == 0) {
        //                     Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
        //                 } else {
        //                     if (selectedRecord.data.status * 1 == 2) {
        //                         Ext.Msg.alert('Failure', 'The transaction already completed');
        //                     } else {
        //                         submit_status(2,selectedRecord.data.id_saving_trx); 
                                
        //                     }

        //                 }
        //             }
        //         },
        //         {
        //             text: 'Pending',
        //             id:'btnPendingSavingTrxid',
        //             handler: function() {
        //                 // var grid = Ext.ComponentQuery.query('GriddeliveryOrderGridID')[0];
        //                 var grid = Ext.getCmp('TransactionGrid');
        //                 var selectedRecord = grid.getSelectionModel().getSelection()[0];
        //                 var data = grid.getSelectionModel().getSelection();
        //                 if (data.length == 0) {
        //                     Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
        //                 } else {
        //                     if (selectedRecord.data.status * 1 == 4) {
        //                         Ext.Msg.alert('Failure', 'The transaction already pending');
        //                     } else {
        //                         submit_status(4,selectedRecord.data.id_saving_trx);                                
        //                     }

        //                 }
        //             }
        //         },
        //         {
        //             text: 'Rejected',
        //             id:'btnRejectSavingTrxid',
        //             handler: function() {
        //                 // var grid = Ext.ComponentQuery.query('GriddeliveryOrderGridID')[0];
        //                 var grid = Ext.getCmp('TransactionGrid');
        //                 var selectedRecord = grid.getSelectionModel().getSelection()[0];
        //                 var data = grid.getSelectionModel().getSelection();
        //                 if (data.length == 0) {
        //                     Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
        //                 } else {
        //                     if (selectedRecord.data.status * 1 == 3) {
        //                         Ext.Msg.alert('Failure', 'The transaction already Rejected');
        //                     } else {
        //                             submit_status(3,selectedRecord.data.id_saving_trx); 
        //                     }

        //                 }
        //             }
        //         }]
        //     },
        //      {
        //         text: 'Persetujuan',
        //         hidden: true,
        //         iconCls: 'add-icon',
        //         handler: function() {
        //             var grid = Ext.ComponentQuery.query('TransactionGrid')[0];
        //             var selectedRecord = grid.getSelectionModel().getSelection()[0];
        //             var data = grid.getSelectionModel().getSelection();
        //             if (data.length == 0) {
        //                 Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
        //             } else {
        //                 WindowFormDeposit.show();
        //                 var formWindowFormDeposit = Ext.getCmp('formWindowFormDeposit').getForm();
        //                 formWindowFormDeposit.reset();
        //                 Ext.getCmp('statusformsavingopen').setValue('edit');
        //                 formWindowFormDeposit.load({
        //                     url: SITE_URL + 'backend/loadFormData/member_saving/1/saving',
        //                     params: {
        //                         extraparams: 'a.id_saving_type:' + selectedRecord.data.id_saving_type + ',' + 'a.id_member:' + selectedRecord.data.id_member
        //                     },
        //                     success: function(form, action) {
        //                         var obj = Ext.decode(action.response.responseText);
        //                         // console.log(obj);
        //                         formWindowFormDeposit.findField("status").setValue(obj.data.status * 1);
        //                         // formTransactionGrid.getForm().findField("status_name").setValue(obj.data.status_name * 1);
        //                         // Ext.Msg.alert("Load failed", action.result.errorMessage);
        //                         formWindowFormDeposit.findField("approval_openingAccount").setValue('approval');
        //                     },
        //                     failure: function(form, action) {
        //                         Ext.Msg.alert("Load failed", action.result.errorMessage);
        //                     }
        //                 });
        //                 Ext.getCmp('BtnWindowFormDepositSimpan').enable();
        //             }
        //         }
        //     }, {
        //         id: 'editTransactionGridid',
        //         hidden: true,
        //         text: 'Lihat',
        //         iconCls: 'edit-icon',
        //         handler: function() {
        //             var grid = Ext.getCmp('TransactionGrid');
        //             var selectedRecord = grid.getSelectionModel().getSelection()[0];
        //             var data = grid.getSelectionModel().getSelection();
        //             if (data.length == 0) {
        //                 Ext.Msg.alert('Failure', 'Pilih data supplier terlebih dahulu!');
        //             } else {
        //                 // loadSavingTypeForm(selectedRecord.data.id_saving_type)
        //             }
        //         }
        //     }, {
        //         text: 'Batalkan Transaksi',
        //         iconCls: 'delete-icon',
        //         handler: function() {
        //             Ext.Msg.show({
        //                 title: 'Batalkan Transaksi',
        //                 msg: 'Apakah anda yakin untuk menghapus data transaksi ?',
        //                 buttons: Ext.Msg.YESNO,
        //                 fn: function(btn) {
        //                     if (btn == 'yes') {
        //                         var grid = Ext.ComponentQuery.query('TransactionGrid')[0];
        //                         var selectedRecord = grid.getSelectionModel().getSelection()[0];

        //                         Ext.Ajax.request({
        //                             url: SITE_URL + 'saving/remove_trx/'+selectedRecord.data.id_saving_trx,
        //                             method: 'POST',
        //                             // headers : { Authorization : auth },
        //                             // params:{
        //                             //     id:
        //                             // }
        //                             success: function(form, action) {
        //                                 var d = Ext.decode(form.responseText);
        //                                 Ext.Msg.alert('Informasi', d.message);
        //                                 Ext.getCmp('TransactionGrid').getStore().load();
        //                             },
        //                             failure: function(form, action) {
        //                                 Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        //                             }
        //                         });
        //                     }
        //                 }
        //             });
        //         },
                //                    disabled: true
            // },
             '->', 'Pencarian: ', ' ', {
                xtype: 'searchGridStockCard',
                text: 'Left Button'
            }
        ]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridStockCard, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridStockCard.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // loadTransactionGrid(record.data.id_saving_trx)
        }
    }
});
