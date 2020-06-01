Ext.define('GridAsuransiPopupModel', {
    extend: 'Ext.data.Model',
    fields: ['idasuransi','namapremi','deskripsi','percentemployee','percentcompany'],
    idProperty: 'id'
});

var storeGridAsuransiPopup = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridAsuransiPopupModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/asuransigrid/master',
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

Ext.define('MY.searchGridAsuransiPopup', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridAsuransiPopup',
    store: storeGridAsuransiPopup,
    width: 180
});

Ext.define('GridAsuransiPopup', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridSetupTax,
//    title: 'Pilih kesertaan Asuransi',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridAsuransiPopup',
    id: 'GridAsuransiPopup',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAsuransiPopup',
    store: storeGridAsuransiPopup,
    loadMask: true,
    columns: [
        {header: 'idasuransi', dataIndex: 'idasuransi', hidden: true},
        {header: 'Nama Premi', dataIndex: 'namapremi', minWidth:100},
        {header: 'Deskripsi', dataIndex: 'deskripsi', minWidth: 300,},
        {header: 'Persentase Pegawai', dataIndex: 'percentemployee', minWidth: 150},
        {header: 'Persentase Perusahaan', dataIndex: 'percentcompany', minWidth: 160}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'chooseAsuransiPopup',
                    text: 'Pilih asuransi ini',
                    iconCls: 'add-icon',
                    handler: function() {
                        // alert(Ext.getCmp('unitformpegawai').getValue)
                        // 
                        var grid = Ext.ComponentQuery.query('GridAsuransiPopup')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih asuransi terlebih dahulu!');
                        } else {
                                 Ext.getCmp('idasuransiEmp').setValue(selectedRecord.get('idasuransi'));
                                    Ext.getCmp('deskripsiEmp').setValue(selectedRecord.get('deskripsi'));
                                    //

                                    Ext.getCmp('windowPopupGridAsuransiPopup').hide();
                                                
//                            Ext.getCmp('accnameSetup').setValue(selectedRecord.get('idjournalrec'));
//                            Ext.getCmp('linkedidaccount').setValue(selectedRecord.get('id'));
//                            Ext.getCmp('linkedidaccountdisplay').setValue(selectedRecord.get('accnumber'));
                                 // Ext.Ajax.request({
                                 //        url: SITE_URL + 'account/cekAccAsuransi',
                                 //        method: 'POST',
                                 //        params: {
                                 //            namaunit: Ext.getCmp('unitformpegawai').getValue(),
                                 //            idasuransi:selectedRecord.get('idasuransi')
                                 //        },
                                 //        success: function(form, action) {

                                 //            var d = Ext.decode(form.responseText);
                                 //            if (!d.success)
                                 //            {
                                 //                Ext.Msg.alert('Peringatan', d.message);
                                 //            } else {
                                 //                // selectedRecord.get('idjournalrec');
                                 //                Ext.getCmp('idasuransiEmp').setValue(selectedRecord.get('idasuransi'));
                                 //                Ext.getCmp('deskripsiEmp').setValue(selectedRecord.get('deskripsi'));
                                 //                //

                                 //                Ext.getCmp('windowPopupGridAsuransiPopup').hide();
                                 //            }

                                 //        },
                                 //        failure: function(form, action) {
                                 //            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                 //        }
                                 // });

//                         
                        }
                        
                        
                    
                    }
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridAsuransiPopup',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridAsuransiPopup, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridAsuransiPopup.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
//            var gridAsuransiPopup = Ext.getCmp('gridAsuransiPopup');
//            wGridAsuransiPopup.show();
//
//            gridAsuransiPopup.getForm().load({
//                url: SITE_URL + 'backend/loadFormData/gridAsuransiPopup/1/journal',
//                params: {
//                    extraparams: 'a.idjournalrec:' + record.data.idjournalrec
//                },
//                success: function(form, action) {
//                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
//                },
//                failure: function(form, action) {
//                    Ext.Msg.alert("Load failed", action.result.errorMessage);
//                }
//            })

//            
//            Ext.getCmp('kddaerahS').setReadOnly(true);
//            Ext.getCmp('statusformSetupTax').setValue('edit');
        }
    }
});

Ext.define(dir_sys + 'employee.gridAsuransiPopup',{
    extend: 'Ext.window.Window',
    alias: 'widget.gridAsuransiPopup',
// var wGridAsuransiPopup = Ext.create('widget.window', {
    id: 'windowPopupGridAsuransiPopup',
    title: 'Pilih kesertaan Asuransi',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 730,
    height: 400,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridAsuransiPopup'
    }]
});