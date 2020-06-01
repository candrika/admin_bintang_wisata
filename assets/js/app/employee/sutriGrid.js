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

var formSutriGrid = Ext.create('Ext.form.Panel', {
    id: 'formSutriGrid',
    width: 450,
    height: 170,
    url: SITE_URL + 'backend/saveform/SutriGrid/employee',
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
            name: 'statusformSutriGrid',
            id: 'statusformSutriGrid'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'datasutri',
            name: 'datasutri'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idemployee',
            name: 'idemployee',
            id:'idemployeeSutriGrid'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Sutri',
            allowBlank: false,
            name: 'namasutri'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Pekerjaan',
            allowBlank: false,
            name: 'work'
        },
        new Ext.form.ComboBox({
            fieldLabel: 'Tempat Kerja',
            name:'samework',
            store: store,
            displayField:'state',
            valueField:'abbr',
            typeAhead: true,
            mode: 'local',
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus:true,
            applyTo: 'local-states'
          })
       ],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupSutriGrid');
                Ext.getCmp('formSutriGrid').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnSutriGridSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {

                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formSutriGrid').getForm().reset();
                            Ext.getCmp('windowPopupSutriGrid').hide();
                            storeGridSutriGrid.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridSutriGrid.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
var wSutriGrid = Ext.create('widget.window', {
    id: 'windowPopupSutriGrid',
    title: 'Data Sutri',
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
    items: [formSutriGrid]
});
Ext.define('GridSutriGridModel', {
    extend: 'Ext.data.Model',
    fields: ['datasutri', 'idemployee', 'namasutri', 'samework','work'],
    idProperty: 'id'
});
var storeGridSutriGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSutriGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/SutriGrid/employee',
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
Ext.define('MY.searchGridSutriGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSutriGrid',
    store: storeGridSutriGrid,
    width: 180
});
var smGridSutriGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridSutriGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteSutriGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteSutriGrid').enable();
        }
    }
});
Ext.define('GridSutriGrid', {
     autoWidth:true,
    autoHeight:true,
    title: 'Daftar Sutri',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridSutriGridID',
    id: 'GridSutriGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSutriGrid',
    store: storeGridSutriGrid,
    loadMask: true,
    columns: [
        {header: 'datasutri', dataIndex: 'datasutri', hidden: true},
        {header: 'idemployee', dataIndex: 'idemployee', minWidth: 150, hidden: true},
        {header: 'Nama Sutri', dataIndex: 'namasutri', minWidth: 150},
        {header: 'Pekerjaaan', dataIndex: 'work', minWidth: 150},
        {header: 'Tempat Kerja', dataIndex: 'samework', minWidth: 350}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'addSutriGrid',
                    text: 'Tambah',
                    iconCls: 'add-icon',
                    handler: function() {
                        wSutriGrid.show();
                        Ext.getCmp('statusformSutriGrid').setValue('input');
                        console.log(Ext.getCmp('idemployee').getValue());
                        Ext.getCmp('idemployeeSutriGrid').setValue(Ext.getCmp('idemployee').getValue());                        
                    }
                },
                {
                    itemId: 'editSutriGrid',
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridSutriGrid')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data pajak terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formSutriGrid = Ext.getCmp('formSutriGrid');
                            formSutriGrid.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/SutriGrid/1/employee',
                                params: {
                                    extraparams: 'a.datasutri:' + selectedRecord.data.datasutri
                                },
                                success: function(form, action) {
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wSutriGrid.show();
                            Ext.getCmp('statusformSutriGrid').setValue('edit');
                        }

                    }
                }, {
                    id: 'btnDeleteSutriGrid',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridSutriGrid')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/SutriGrid/employee',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)}
                                    });
                                    storeGridSutriGrid.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridSutriGrid',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridSutriGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSutriGrid.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formSutriGrid = Ext.getCmp('formSutriGrid');
            wSutriGrid.show();
            formSutriGrid.getForm().load({
                url: SITE_URL + 'backend/loadFormData/SutriGrid/1/employee',
                params: {
                    extraparams: 'a.datasutri:' + record.data.datasutri
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
            Ext.getCmp('statusformSutriGrid').setValue('edit');
        }
    }
});
//
//Ext.define('PortSutri', {
//    extend: 'Ext.Panel',
//    alias: 'widget.PortSutri',
//    layout: 'border',
//    bodyBorder: false,
//    defaults: {
//        collapsible: true,
//        split: true
//    },
//    items: [{
//            title: 'Footer',
//            region: 'south',
//            flex:2,
//            minHeight: 75,
////            maxHeight: 250,
//            html: 'Footer content'
//        }, {
//            flex:2,
////            minHeight: 270,
//            collapsible: false,
//            region: 'center',
////            margins: '5 0 0 0', 
//            items: [{
//              minHeight: 270,
//              xtype:'GridSutriGrid'      
//            }]
//        }]
//});
//
//var viewport = Ext.create('Ext.Viewport', {
//    id: 'border-example',
//    layout: 'border',
//    items: [
//        // create instance immediately
//        Ext.create('Ext.Component', {
//            region: 'north',
//            height: 62, // give north and south regions a height
//            autoEl: {
//                tag: 'div',
//                html: "&nbsp;&nbsp;<img src={$assets_url}images/logo_aktiva.png height=59> <div style='margin-right:15px; margin-top:15px; float:right;' id=bloggout> </div> "
//            }
//        }), {
//            // lazily created panel (xtype:'panel' is default)
//            hidden: true,
//            id: 'south-panel',
//            region: 'south',
//            contentEl: 'south',
//            split: true,
//            height: 100,
//            minSize: 100,
//            maxSize: 200,
//            collapsible: true,
//            collapsed: true,
//            title: 'South',
//            margins: '0 0 0 0'
//        }, rTabPanel, {
//            region: 'west',
//            stateId: 'navigation-panel',
//            id: 'west-panel', // see Ext.getCmp() below
//            title: 'Navigation',
//            split: true,
//            width: 300,
//            minWidth: 175,
//            maxWidth: 400,
//            collapsible: true,
//            animCollapse: true,
//            margins: '0 0 0 5',
//            layout: 'accordion',
//            defaults: {
//                // closeAction: 'hide',
//                autoScroll: true
//                        // bodyPadding: 3
//            }
//            , dockedItems: [
//                {
//                    xtype: 'toolbar',
//                    dock: 'bottom',
//                    items: [
//                        {
//                            xtype: 'button',
////                            width:100,
//                            handler: function(button, event) {
//                                expandnav();
//                            },
//                            flex: 1,
//                            text: 'Expand'
//                        }, {
//                            xtype: 'button',
//                            handler: function(button, event) {
//                                collapsenav();
//                            },
//                            flex: 1,
//                            text: 'Collapse'
//                        }, {
//                            xtype: 'button',
//                            handler: function(button, event) {
//                                closeAllTab();
//                            },
//                            flex: 1,
//                            text: 'Close Tab'
//                        }]
//                }],
//            items: [
//                {
//                    title: 'Welcome {$username}',
//                    items: [treeNavigation]
//                }]
//        },
//        tabPanel]
//});