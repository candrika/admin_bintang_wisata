var samework = Ext.create('Ext.data.Store', {
    fields: ['val', 'desc'],
    data: [
        {1: "Bekerja ditempat yang sama dengan suami/istri"},
        {0: "Bekerja ditempa yang berbeda dengan suami/istri"}
        //...
    ]
});

var exampleData2 = [[1, 'Bekerja ditempat yang sama dengan suami/istri'],[0, 'Bekerja ditempa yang berbeda dengan suami/istri']];
var store = new Ext.data.ArrayStore({
     fields: ['abbr', 'state'],
     data : exampleData2    
  });

var formAnakGrid = Ext.create('Ext.form.Panel', {
    id: 'formAnakGrid',
    width: 450,
    height: 170,
    url: SITE_URL + 'backend/saveform/AnakGrid/employee',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 160,
        width: 400
    },
    items: [{
            xtype: 'hiddenfield',
            name: 'statusformAnakGrid',
            id: 'statusformAnakGrid'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'datanakid',
            name: 'datanakid'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idemployee',
            name: 'idemployee',
            id:'idemployeeAnakGrid'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Anak',
            allowBlank: false,
            name: 'namaanak'
        }
       ],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupAnakGrid');
                Ext.getCmp('formAnakGrid').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnAnakGridSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formAnakGrid').getForm().reset();
                            Ext.getCmp('windowPopupAnakGrid').hide();
                            storeGridAnakGrid.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridAnakGrid.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wAnakGrid = Ext.create('widget.window', {
    id: 'windowPopupAnakGrid',
    title: 'Data Anak',
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
    items: [formAnakGrid]
});
Ext.define('GridAnakGridModel', {
    extend: 'Ext.data.Model',
    fields: ['datanakid', 'idemployee', 'namaanak'],
    idProperty: 'id'
});
var storeGridAnakGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridAnakGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/AnakGrid/employee',
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
Ext.define('MY.searchGridAnakGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridAnakGrid',
    store: storeGridAnakGrid,
    width: 180
});
var smGridAnakGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridAnakGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteAnakGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteAnakGrid').enable();
        }
    }
});
Ext.define('GridAnakGrid', {
    autoWidth:true,
    autoHeight:true,
    title: 'Daftar Anak',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridAnakGridID',
    id: 'GridAnakGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAnakGrid',
    store: storeGridAnakGrid,
    loadMask: true,
    columns: [
        {header: 'datanakid', dataIndex: 'datanakid', hidden: true},
        {header: 'idemployee', dataIndex: 'idemployee', minWidth: 150, hidden: true},
        {header: 'Nama Anak', dataIndex: 'namaanak', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'addAnakGrid',
                    text: 'Tambah',
                    iconCls: 'add-icon',
                    handler: function() {
                        wAnakGrid.show();
                        Ext.getCmp('statusformAnakGrid').setValue('input');
                        console.log(Ext.getCmp('idemployee').getValue());
                        Ext.getCmp('idemployeeAnakGrid').setValue(Ext.getCmp('idemployee').getValue());                        
                    }
                },
                {
                    itemId: 'editAnakGrid',
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridAnakGrid')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data pajak terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formAnakGrid = Ext.getCmp('formAnakGrid');
                            formAnakGrid.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/AnakGrid/1/employee',
                                params: {
                                    extraparams: 'a.datanakid:' + selectedRecord.data.datanakid
                                },
                                success: function(form, action) {
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wAnakGrid.show();
                            Ext.getCmp('statusformAnakGrid').setValue('edit');
                        }

                    }
                }, {
                    id: 'btnDeleteAnakGrid',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridAnakGrid')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/AnakGrid/employee',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)}
                                    });
                                    storeGridAnakGrid.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridAnakGrid',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridAnakGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridAnakGrid.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formAnakGrid = Ext.getCmp('formAnakGrid');
            wAnakGrid.show();
            formAnakGrid.getForm().load({
                url: SITE_URL + 'backend/loadFormData/AnakGrid/1/employee',
                params: {
                    extraparams: 'a.datanakid:' + record.data.datanakid
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
            Ext.getCmp('statusformAnakGrid').setValue('edit');
        }
    }
});