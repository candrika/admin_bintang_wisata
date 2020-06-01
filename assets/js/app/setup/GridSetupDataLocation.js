var formSetupDataLocation = Ext.create('Ext.form.Panel', {
    id: 'formSetupDataLocation',
    // width: 450,
    // height: 330,
    url: SITE_URL + 'backend/saveform/datalocation/setup',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 160,
        width: 400
    },
    items: [
        {
            xtype: 'hiddenfield',
            anchor: '100%',
            fieldLabel: 'statusformdatalocation',
            name: 'statusformdatalocation',
            id: 'statusformdatalocation'
        },
        {
            xtype: 'hiddenfield',
            anchor: '100%',
            fieldLabel: 'idlocation',
            name: 'idlocation'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Location Code',
            name: 'location_code',
            allowBlank: false
        }, {
            xtype: 'textfield',
            fieldLabel: 'Location Name',
            allowBlank: false,
            name: 'location_name'
        },
        {
            xtype: 'comboxswitch',
            fieldLabel: 'Status',
            allowBlank: false,
            name: 'status'
        },
    ],  
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupSetupDataLocation');
                Ext.getCmp('formSetupDataLocation').getForm().reset();
                win.hide();
            }
        }, {
            // id: 'BtnSetupTaxSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);

                            Ext.getCmp('formSetupDataLocation').getForm().reset();
                            Ext.getCmp('windowPopupSetupDataLocation').hide();

                            storeGridSetupDataLocation.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridSetupTax.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]

});

var wSetupDataLocation = Ext.create('widget.window', {
    id: 'windowPopupSetupDataLocation',
    title: 'Data Unit Perusahaan',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
   autoWidth: true,
   autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formSetupDataLocation]
});

Ext.define('GridSetupDataLocationModel', {
    extend: 'Ext.data.Model',
    fields: ['idlocation','location_code','location_name','status'],
    idProperty: 'id'
});

var storeGridSetupDataLocation = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSetupDataLocationModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/datalocation/setup',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
            property: 'location_name',
            direction: 'ASC'
        }]
});

// storeGridSetupDataLocation.on('beforeload',function() { alert('as'); });
                                        
Ext.define('MY.searchGridSetupDataLocation', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSetupDataLocation',
    store: storeGridSetupDataLocation,
    width: 180
});

var smGridSetupDataLocation = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridSetupDataLocation.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteSetupDataLocation').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteSetupDataLocation').enable();
        }
    }
});

Ext.define(dir_sys + 'setup.GridSetupDataLocation', {
    title: 'Data Location',
    itemId: 'GridSetupDataLocationID',
    id: 'GridSetupDataLocationID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSetupDataLocation',
    store: storeGridSetupDataLocation,
    loadMask: true,
    columns: [
        {
            header: 'No',
            xtype: 'rownumberer',
            width: 30,
            sortable: false
        },
        {header: 'idlocation', dataIndex: 'idlocation', hidden:true},
        {header: 'Location Code', dataIndex: 'location_code', minWidth: 150},
        {header: 'Location Name', dataIndex: 'location_name', minWidth: 150},
        {header: 'Status', dataIndex: 'status', flex:1},
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'addSetupDataLocation',
                    text: 'Tambah',
                    iconCls: 'add-icon',
                    handler: function() {
                        wSetupDataLocation.show();
                        Ext.getCmp('statusformdatalocation').setValue('input');
                        Ext.getCmp('formSetupDataLocation').getForm().reset();
                    }
                },
                {
                    itemId: 'editSetupDataLocation',
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridSetupDataLocation')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formSetupDataLocation = Ext.getCmp('formSetupDataLocation');

                            formSetupDataLocation.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/datalocation/1/setup',
                                params: {
                                    extraparams: 'a.idlocation:' + selectedRecord.data.idlocation
                                },
                                success: function(form, action) {
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wSetupDataLocation.show();
                            Ext.getCmp('statusformdatalocation').setValue('edit');
                        }

                    }
                }, {
                    id: 'btnDeleteSetupDataLocation',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                                title: 'Confirm',
                                msg: 'Delete Selected ?',
                                buttons: Ext.Msg.YESNO,
                                fn: function(btn) {
                                    if (btn == 'yes') {
                                        var grid = Ext.ComponentQuery.query('GridSetupDataLocation')[0];
                                        var sm = grid.getSelectionModel();
                                        selected = [];
                                        Ext.each(sm.getSelection(), function(item) {
                                            selected.push(item.data[Object.keys(item.data)[0]]);
                                        });
                                        Ext.Ajax.request({
                                            url: SITE_URL + 'backend/ext_delete/datalocation/setup',
                                            method: 'POST',
                                            params: {
                                                postdata: Ext.encode(selected)
                                            },
                                            success: function(form, action) {
                                                var d = Ext.decode(form.responseText);
                                                if (!d.success) {
                                                    Ext.Msg.alert('Informasi', d.message);
                                                } else {
                                                    storeGridSetupDataLocation.load();
                                                }
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                            }
                                        });
                                    }
                                }
                            });
                    },
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridSetupDataLocation',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridSetupDataLocation, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSetupDataLocation.load({
                    callback: function(records, operation, success) {
                        // alert(success)
                        // if (success) {
                        //     alert(success)
                        // } else {
                        //    alert(success)
                        // }
                    }
                });

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formSetupDataLocation = Ext.getCmp('formSetupDataLocation');
            wSetupDataLocation.show();

            formSetupDataLocation.getForm().load({
                url: SITE_URL + 'backend/loadFormData/datalocation/1/setup',
                params: {
                    extraparams: 'a.idlocation:' + record.data.idlocation
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

//            
//            Ext.getCmp('kddaerahS').setReadOnly(true);
            Ext.getCmp('statusformdatalocation').setValue('edit');
        }
    }
});