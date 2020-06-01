function timeLogin(){
    var t_str = Ext.Date.format(new Date(), 'H:i:s');
//    Ext.getCmp('timelogin').setValue('<font color=gray>'+t_str+'</font>');
}

  Ext.require(['*']);

       Ext.onReady(function() {

        Ext.QuickTips.init();

             /*
             * ================  Simple form  =======================
             */
            var loadingtxt = "Loading...";
           var loginform = Ext.create('Ext.form.Panel', {
                    title: appname,
                    bodyPadding: 5,
                    width: 350,
                    id:'loginid',
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%'
                    },
                    defaultType: 'textfield',
                    items: [{
                        fieldLabel: 'ID',
                        name: 'userid',
                        allowBlank: false
                        ,listeners: {
                        specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    submitForm();
                                }
                            }
                        }
                    },{
                        fieldLabel: 'Password',
                        name: 'password',
                        allowBlank: false,
                        inputType: 'password'
                        ,listeners: {
                        specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    submitForm();
                                }
                            }
                        } 
                    }]
                    
                    // Reset and Submit buttons
                    ,buttons: [{
                        text: 'Login',
                        formBind: true, //only enabled once the form is valid
                        disabled: true,
                        handler: function() {
                            submitForm();
                        }
                    }]

                    // ,
                    // renderTo: Ext.getBody()
                });
    
            Ext.create('Ext.Window', {
                // title: 'Login Admin Panel',
                width: 400,
                height: 200,
                plain: true,
                closable:false,
                headerPosition: 'left',
                layout: 'fit',
                items:[loginform]
            }).show();

            function submitAbsen()
            {
                var msg = Ext.MessageBox.wait(loadingtxt);
                    Ext.Ajax.request({
                            url: SITE_URL+'login/auth/true',
                            method: 'POST',
                            params: {
                                userid: Ext.getCmp("loginid").getForm().findField("userid").getValue(),
                                password:Ext.getCmp("loginid").getForm().findField("password").getValue()
                            },
                            success: function (response, opts) {
                                var obj = Ext.JSON.decode(response.responseText);
                                if(obj.success)
                                {
                                    Ext.Msg.alert('Absen', obj.msg);
                                    loginform.getForm().reset();
                                } else {
                                    Ext.Msg.alert('Absen Gagal', obj.msg);
                                    // this.up('form').getForm().reset();
                                }
                                // msg.hide();
                            },
                            failure: function (response, opts) {
                                var text = response.responseText;
                                Ext.Msg.alert('Absen Gagal', text);
                                // msg.hide();
                            }
                        });
            }

            function submitForm()
            {
                var msg = Ext.MessageBox.wait(loadingtxt);
                // var form = this.up('form');
                // if (form.isValid()) {
                    Ext.Ajax.request({
                            url: SITE_URL+'login/auth',
                            // url: SITE_URL+'login/user_auth',
                            method: 'POST',
                            params: {
                                userid: Ext.getCmp("loginid").getForm().findField("userid").getValue(),
                                password:Ext.getCmp("loginid").getForm().findField("password").getValue()
                            },
                            success: function (response, opts) {
                                var obj = Ext.JSON.decode(response.responseText);
                                console.log(obj);
                                if(obj.success)
                                {
                                    window.location.href = SITE_URL+'dashboard';
                                } else {
                                    Ext.Msg.alert('Failure', obj.msg);
                                    // this.up('form').getForm().reset();
                                }
                                 // msg.hide();
                            },
                            failure: function (response, opts) {
                                var text = response.responseText;
                                Ext.Msg.alert('Failure', text);
                                 // msg.hide();
                            }
                        });
               
            }
            setInterval(timeLogin, 1000);
        });    
