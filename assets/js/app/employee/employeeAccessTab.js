Ext.define(dir_sys+'employee.employeeAccessTab', {
    title: 'Pengaturan Akun',
    itemId: 'employeeAccessTab',
    id: 'employeeAccessTab',
    url: SITE_URL + 'pegawai/update_user_login',
    extend: 'Ext.form.Panel',
    autoHeight:true,
    alias: 'widget.employeeAccessTab',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    width:panelW-300,
    // height:panelH-300,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 130,
        width: 400
    },
    items: [
    	{
            xtype: 'radiogroup',
            width: 200,
            labelWidth:180,
            fieldLabel: 'Mendapatkan Akses Login?',
            id: 'is_login_empAccess',
            columns: 1,
            vertical: true,
            items: [
                {boxLabel: 'Ya', name: 'is_login', inputValue: 1},
                {boxLabel: 'Tidak', name: 'is_login', inputValue: 0, checked: true}
            ],
            listeners: {
              change: function(radiogroup, radio) {
                // if(radio.is_from_sq==2)
                // {
                //     Ext.getCmp('no_sales_quote').hide();
                //     Ext.getCmp('sales_quotation_date').hide();
                // } else {
                //     Ext.getCmp('no_sales_quote').show();
                //     Ext.getCmp('sales_quotation_date').show();
                // }
              }
            }
        },
        {
        	xtype:'comboxsys_group',
        	valueField:'group_id',
        	name:'group_id',
        	id: 'group_id_empAccess',
        	allowBlank:'false'
        }, {
            xtype: 'hiddenfield',
            name: 'user_id',
            id: 'user_id_empAccess'
        },
        {
            xtype:'displayfield',
            fieldLabel: 'User Name',
            value:'Gunakan alamat Email sebagai User Name'
        },
         {
            xtype: 'textfield',
            hidden:true,
            fieldLabel: 'User Name',
            // allowBlank: false,
            id:'username_empAccess',
            name: 'username'
        },{
            xtype: 'textfield',
            id:'password_empAccess',
            inputType: 'password',
            fieldLabel: 'Password',
            allowBlank: false,
            name: 'password'
        }
    ],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupemployeeGrid');
                Ext.getCmp('employeeAccessTab').getForm().reset();
                win.hide();
            }
        }, {
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
					    params: {
					    	idemployee: Ext.getCmp('idemployee').getValue(),
					    	idunit: Ext.getCmp('unitformpegawai').getValue()
					    },
                        success: function(form, action) {
                            
                            Ext.Msg.alert('Success', action.result.message);

                            // storeGridemployeeGrid.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridemployeeGrid.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});