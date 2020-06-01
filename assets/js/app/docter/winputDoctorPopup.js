Ext.define('GridinputDoctorModel', {
    extend: 'Ext.data.Model',
    fields: ['idemployee', 'code', 'firstname', 'group_name', 'lastname', 'address', 'telephone', 'handphone', 'fax', 'email', 'website', 'city', 'state', 'postcode', 'country', 'notes', 'nametype','status','password_existed'],
  	idProperty: 'id'
});

var storeGridinputDoctor = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridinputDoctorModel',
    remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: CLINIC_API + 'employee/datas',
         actionMethods: {
                read: 'GET'
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

storeGridinputDoctor.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
    	'idunit': idunit,
        'key': key,
        // 'idinventorycat':Ext.getCmp('idinventorycat_drug').getValue()
    };
});

Ext.define('MY.searchGridinputDoctor', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridinputDoctor',
    store: storeGridinputDoctor,
    width: 180
});

var smGridinputDoctor = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridinputDoctor.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                // Ext.getCmp('btnDeleteItemSalesPopupOrder').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteItemSalesPopupOrder').enable();
        }
    }
});

Ext.define(dir_sys + 'docter.GridinputDoctor', {
    itemId: 'GridinputDoctorID',
    id: 'GridinputDoctorID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridinputDoctor',
    store: storeGridinputDoctor,
    loadMask: true,
    columns: [{
                        text: 'Pilih',
            width: 55,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                Ext.getCmp('staff_user_id').setValue(selectedRecord.data.user_id);
                Ext.getCmp('docter_staff_name').setValue(selectedRecord.data.firstname);
                Ext.getCmp('docter_staff_address').setValue(selectedRecord.data.address);
                Ext.getCmp('docter_staff_mobilephone').setValue(selectedRecord.data.handphone);
                Ext.getCmp('docter_staff_email').setValue(selectedRecord.data.email);
                
                Ext.getCmp('winputDoctorPopup').hide();
            }
        },
        { header: 'idemployee', dataIndex: 'idemployee', hidden: true },
        { header: 'user_id', dataIndex: 'user_id', hidden: true },
        { header: 'Nama Lengkap', dataIndex: 'firstname', minWidth: 150, flex:1 },
        { header: 'Kelompok User', dataIndex: 'group_name', minWidth: 150 },
        { header: 'address', dataIndex: 'address', minWidth: 150 },
        { header: 'handphone', dataIndex: 'handphone', minWidth: 150},
        { header: 'email', dataIndex: 'email', minWidth: 150 },
        { header: 'Status', dataIndex: 'status', minWidth: 150,
            renderer: function(value) {
                return customColumnStatus2(StatusColumnArr, value);
        } }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            // hidden: true,
            dock: 'top',
            items: [
                {
                    xtype: 'comboxinventorycat', 
                    name: 'idinventorycat', 
                    id: 'idinventorycat_drug', 
                    fieldLabel: 'Kategori',
                    listeners:{
                        'change': function(field, newValue, oldValue) {
                            storeGridinputDoctor.load({
                                params: {
                                    'idinventorycat':Ext.getCmp('idinventorycat_drug').getValue()

                                }
                            });
                        }
                        
                    }
                },
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridinputDoctor',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridinputDoctor, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        refresh : function (dataview) {
          
        },
        render: {
            scope: this,
            fn: function(grid) {
              
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

           
        }
    }
});

Ext.define(dir_sys + 'docter.winputDoctorPopup',{
    extend: 'Ext.window.Window',
    alias: 'widget.winputDoctorPopup',
    id: 'winputDoctorPopup',
    title: 'Daftar Staff',
    closable: true,
    closeAction: 'hide',
    width: panelW-100,
    modal: true,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridinputDoctor'
    }]
});