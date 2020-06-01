Ext.define('sysMenuPopupTreeModel', {
    extend: 'Ext.data.Model',
   fields: [
        'text', 'id', 'menu_link', 'parent','menuinduk','sys_menu_id_induk', 'sort', 'icon', 'description', 'leaf'
    ]
});


var storeSysMenuPopup = new Ext.data.TreeStore({
    model: 'sysMenuPopupTreeModel',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'sistem/sysmenudata/0'
    },
    root: {
        text: ' ',
        id: '0',
        expanded: false
    }
    , autoload: false
});

Ext.define('GridTreeSysMenuPopup', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeSysMenuPopup',
    id: 'GridTreeSysMenuPopup',
    xtype: 'tree-grid',
//    title: 'Pilih Menu Induk',
    height: 300,
    useArrows: true,
    rootVisible: false,
    // multiSelect: true,
    // singleExpand: false,
    loadMask: true,
    enableColumnResize: true,
    rowLines: true,
    listeners: {
        render: {
            scope: this,
            fn: function (grid) {

            }
        }
    },
    viewConfig: {
        //        stripeRows: false, 
        getRowClass: function (record) {
        }
    },
    initComponent: function () {
        this.width = 700;

        Ext.apply(this, {
            store: storeSysMenuPopup,
            columns: [
                { xtype: 'treecolumn', text: 'id', dataIndex: 'id', hidden: true }
                , { xtype: 'treecolumn', text: 'Nama', dataIndex: 'text', minWidth: 200 }
                , { text: 'MenuPopup_link', dataIndex: 'MenuPopup_link', hidden: true }
                , { text: 'parent', dataIndex: 'parent', hidden: true }
                , { text: 'Urutan', dataIndex: 'sort', minWidth: 20 }
                , { text: 'Deskripsi', dataIndex: 'description', minWidth: 550 }
            ]
            , dockedItems: [
               {
		             xtype: 'toolbar',
		             dock: 'top',
		             items: [
		                 {
		                     text: 'Pilih Menu',
		                     iconCls: 'add-icon',
		                     handler: function() {
		                         var grid = Ext.ComponentQuery.query('GridTreeSysMenuPopup')[0];
		                         var selectedRecord = grid.getSelectionModel().getSelection()[0];
		                         var data = grid.getSelectionModel().getSelection();
		                         if (data.length == 0)
		                         {
		                             Ext.Msg.alert('Failure', 'Pilih menu induk terlebih dahulu!');
		                         } else {
		
		                             Ext.getCmp('menuinduk').setValue(selectedRecord.get('text'));
		                             Ext.getCmp('parentmenu').setValue(selectedRecord.get('id'));
		                             // Ext.getCmp('accnumberPayroll').setValue(selectedRecord.get('accnumber'));
		
		                             Ext.getCmp('windowPopupMenuInduk').hide();
		                         }
		                     }
		                 }
					 ]
			   }
            ]
        });
        this.callParent();
    }
});

 var windowPopupMenuInduk = Ext.create('widget.window', {
     id: 'windowPopupMenuInduk',
     header: {
         titlePosition: 2,
         titleAlign: 'center'
     },
     closable: true,
     closeAction: 'hide',
     autoWidth: true,
     minWidth:850,
     height: 550,
     x: 300,
     y: 50,
     layout: 'fit',
     border: false,
     title: 'Pilih Menu Induk',
     items: [
         Ext.create('Ext.panel.Panel', {
             bodyPadding: 5, // Don't want content to crunch against the borders
             width: 500,
             height: 300,
             layout: 'fit',
 //            id: 'tabAccTreeLinked',
             items: [{
                     xtype: 'GridTreeSysMenuPopup'
                 }]
         })
     ],
     buttons: [{
             text: 'Tutup',
             handler: function() {
                 var windowPopupMenuInduk = Ext.getCmp('windowPopupMenuInduk');
                 windowPopupMenuInduk.hide();
             }
         }]
 });