<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>{$companyname} - {$appname}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <link href="{$assets_url}/css/icons.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="{$assets_url}/ext/resources/css/TabScrollerMenu.css" />
    <link rel="stylesheet" type="text/css" href="{$assets_url}/css/offline-theme-slide.css" /> 
     <link rel="stylesheet" type="text/css" href="{$assets_url}/css/offline-language-english-indicator.css" /> 


   
    <style type="text/css">
        /*  .loader {
              position: fixed;
              background-color: #FFF;
              opacity: 1;
              height: 100%;
              width: 100%;
              top: 0;
              left: 0;
              z-index: 10;
            }*/
        
        p {
            margin: 5px;
        }
        
        a {
            text-decoration: none;
        }
        
        body {
            background-color: #b0c4de;
        }
        
        .child-row .x-grid-cell {
            background-color: #ffe2e2;
            color: #900;
        }
        
        .adult-row .x-grid-cell {
            background-color: #e2ffe2;
            color: #090;
        }
        
        .journal-row .x-grid-cell {
            background-color: #f6f7ff;
        }
        
        .my-mandatory-field {
            background-color: #FFD9DF;
        }
        .my-green-field {
            background-color: #e8f5e9;
        }
        .custom .x-grid-cell {
            background-color: yellow;
            color: red;
        }
         .biggertext_wbg
        {
            text-align: center;
            font-size: 24px;
        } 
        .biggertext
        {
            font-size: 24px;
            background-color: #287fcc;
            color: #ffffff;
        } 
        #alert {
            position: relative;
        }
        #alert:hover:after {
            top: 50px;
            width: 120px;
        }
        #alert:hover:before {
            height: 0;
            left: 50%;
            margin-left: -10px;
            position: absolute;
            top: 40px;
            width: 0;
        }
        .alert {
            color: #fff;
            background-color: #c31609;
        }
        .x-border-layout-ct {
            /*background-color:#caffde; */
            background-color: #fff;
        }

        .x-panel-default-outer-border-trbl {
            border-color: #157fcc3b!important;
            border-width: 1px!important;
        }
    </style>
    <style>
    .button_report {
         background-color: #15c377;
        border: none;
        color: white;
        padding: 5px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        /* font-size: 16px; */
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 12px;
        width: 200px;
         -webkit-transition-duration: 0.4s; /* Safari */
        transition-duration: 0.4s;
    }
    .button_report:hover {
      background-color: #157fcc; /* Green */
      color: white;
    }

    </style>
    <script type="text/javascript">
        var SITE_URL = '{$site_url}';
        var BASE_URL = '{$base_url}';
        var CLINIC_API = '{$clinic_api}';
        var COOP_API = '{$coop_api}';
        var coop_key = '{$coop_key}';
        var pegawainid;
        var curnipeg = '';
        var userid = '{$userid}';
        var namaunit = '{$unit}';
        var idunit = '{$idunit}';
        var idcompany = '{$idcompany}';
        var group_id = '{$group_id}';
        var logoheader = '{$logoheader}';
        var companyname = '{$companyname}';
        var dir_sys = '.{$dir_app}assets.js.app.';
        var key = '{$key}';
        var password = '';
        var auth = '{$auth_basic}';

    </script>

    <script src='{$assets_url}/ext/ext-all.js'></script>
    <!-- {*        <link rel="stylesheet" type="text/css" href="{$assets_url}ext/resources/css/ext-all-gray.css">*} -->
    <script src='{$assets_url}/ext/ext-theme-neptune.js'></script>
    <script src='{$assets_url}/js/SearchField4.js'></script>
    <script src='{$assets_url}/ext/src/ux/TabScrollerMenu.js'></script>
    <script src='{$assets_url}/ext/src/ux/form/ItemSelector.js'></script>
    <script src='{$assets_url}/ext/src/ux/form/MultiSelect.js'></script>
    <script src='{$assets_url}/ext/src/ux/layout/component/form/ItemSelector.js'></script>
    <script src='{$assets_url}/ext/src/ux/layout/component/form/MultiSelect.js'></script>
    <script src='{$assets_url}/js/app/data/arrays.js'></script>
    <script src='{$assets_url}/js/app/data/models.js'></script>
    <script src='{$assets_url}/js/app/combox.js'></script>
    <script src='{$assets_url}/js/util.js'></script>
    <script src='{$assets_url}/js/offline.min.js'></script>        
    <script src='{$assets_url}/ext/NumericField.js'></script>

    <script src='{$assets_url}/js/app/buttonaccess.js'></script>
    <script src='{$assets_url}/js/app/pengaturan.js'></script>
    <script src='{$assets_url}/js/app/sistem/UserManagement.js'></script>
    <!-- // <script src='{$assets_url}/js/app/accountList.js'></script> -->





    <link href="{$assets_url}/ext/resources/css/ext-all-neptune.css" rel="stylesheet">
    <link href="{$assets_url}/ext/src/ux/css/ItemSelector.css" rel="stylesheet">


</head>

<body>
    <div class="loader">
        <!-- <center><img src="{$assets_url}/icons/loadingIcon.gif"></center> -->
    </div>
    <script type="text/javascript">
        Ext.Ajax.on('beforerequest', function(connection, options) {
            Ext.getBody().mask('Loading...');
        });

        Ext.Ajax.on('requestcomplete', function(connection, options) {
            Ext.getBody().unmask();
        });

        Ext.Ajax.on('requestexception', function(connection, options) {
            Ext.getBody().unmask();
        });

        // Offline.options({
        //   checkOnLoad: false,
        //   interceptRequests: true,
        //   reconnect: {
        //     initialDelay: 1
        //   },
        //   requests: true,
        //   game: (false)
        // });



        // var windowH = Ext.getBody().getViewSize().height;
        var windowW = Ext.getBody().getViewSize().width;
        var panelW = windowW - 100;

        var windowH = Ext.getBody().getViewSize().height;
        var panelH = windowH - 100;
        if (windowH <= 682) {
            //laptop 14'
            var sizeH = windowH - 100;
        } else if (windowH > 682) {
            //desktop
            var sizeH = windowH - 200;
        }

        var heightPort = (windowH * 1) / (2 * 1) - 90 * 1;
        // console.log(heightPort)

        var panelHeight = Ext.getBody().getViewSize().height * 0.7;


        //////////////////////////////////////////////////////////
        //penyesuaian ukuran layar untuk menu dengan horizontal row (data siswa,pegawai)
        if (heightPort >= 200 && heightPort <= 220) {
            var tinggiPort = 425;
        } else
        if (heightPort >= 240 && heightPort <= 359) {
            var tinggiPort = 425;
        } else if (heightPort >= 360 && heightPort <= 410) {
            var tinggiPort = 525;
        } else {
            var tinggiPort = heightPort + 50;
        }
        //////////////////////////////////////////////////////////////


        // alert(panelHeight);
        Ext.onReady(function() {

            Ext.Ajax.cors = true;
            Ext.Ajax.useDefaultXhrHeader = false;
            Ext.Ajax.useDefaultPostHeader = 'application/json';
            
            Ext.Ajax.timeout = 60000;
            Ext.override(Ext.form.Basic, {
                timeout: Ext.Ajax.timeout / 1000
            });
            Ext.override(Ext.data.proxy.Server, {
                timeout: Ext.Ajax.timeout
            });
            Ext.override(Ext.data.Connection, {
                timeout: Ext.Ajax.timeout
            });

            Ext.QuickTips.init();
            var rTabPanel = Ext.create('Ext.tab.Panel', {
                hidden: true,
                id: 'rTabPanel',
                xtype: 'tabpanel',
                region: 'east',
                title: 'East Side',
                dockedItems: [{
                    dock: 'top',
                    xtype: 'toolbar',
                    items: ['->', {
                        xtype: 'button',
                        text: 'test',
                        tooltip: 'Test Button'
                    }]
                }],
                animCollapse: true,
                collapsible: true,
                split: true,
                width: 225, // give east and west regions a width
                minSize: 175,
                maxSize: 400,
                margins: '0 5 0 0',
                activeTab: 1,
                tabPosition: 'bottom',
                items: [{
                    html: '<p>A TabPanel component can be a region.</p>',
                    title: 'A Tab',
                    autoScroll: true
                }, Ext.create('Ext.grid.PropertyGrid', {
                    title: 'Property Grid',
                    closable: true,
                    source: {
                        "(name)": "Properties Grid",
                        "grouping": false,
                        "autoFitColumns": true,
                        "productionQuality": false,
                        "created": Ext.Date.parse('10/15/2006', 'm/d/Y'),
                        "tested": false,
                        "version": 0.01,
                        "borderWidth": 1
                    }
                })]
            });

            if (logoheader == '') {
                var htmlHeader = "&nbsp;&nbsp;<font style='font-size:22px;color:#fff;'>" + companyname + "</font><div style='margin-right:15px; margin-top:15px; float:right;' id=bloggout> </div> ";
            } else {
                var htmlHeader = "&nbsp;&nbsp;<img src={$base_url}/assets/images/{$logoheader} height=59> <div style='margin-right:15px; margin-top:15px; float:right;' id=bloggout> </div> ";
            }

            var viewport = Ext.create('Ext.Viewport', {
                id: 'border-example',
                layout: 'border',
                items: [
                    // create instance immediately
                    Ext.create('Ext.Component', {
                        region: 'north',
                        // tbar:menu,
                        height: 62, // give north and south regions a height
                        autoEl: {
                            tag: 'div',
                            html: htmlHeader
                        }
                    }), {
                        // lazily created panel (xtype:'panel' is default)
                        hidden: true,
                        id: 'south-panel',
                        region: 'south',
                        contentEl: 'south',
                        split: true,
                        height: 100,
                        minSize: 100,
                        maxSize: 200,
                        collapsible: true,
                        collapsed: true,
                        title: 'South',
                        margins: '0 0 0 0'
                    },
                    rTabPanel, {
                        region: 'west',
                        stateId: 'navigation-panel',
                        id: 'west-panel', // see Ext.getCmp() below
                        title: 'Navigation',
                        split: true,
                        width: 250,
                        minWidth: 172,
                        maxWidth: 400,
                        // collapsible: true,
                        animCollapse: true,
                        margins: '0 0 0 5',
                        // layout: 'accordion',
                        defaults: {
                            // closeAction: 'hide',
                            autoScroll: true
                                // bodyPadding: 3
                        },
                        dockedItems: [{
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                //                                         {
                                //                                             xtype: 'button',
                                // //                            width:100,
                                //                                             handler: function(button, event) {
                                //                                                 expandnav();
                                //                                             },
                                //                                             flex: 1,
                                //                                             text: 'Expand'
                                //                                         }, 
                                {
                                    xtype: 'button',
                                    handler: function(button, event) {
                                        collapsenav();
                                    },
                                    flex: 1,
                                    text: 'Collapse'
                                }, {
                                    xtype: 'button',
                                    handler: function(button, event) {
                                        closeAllTab();
                                    },
                                    flex: 1,
                                    text: 'Close Tab'
                                }
                            ]
                        }],
                        items: [treeNavigation]
                    },
                    tabPanel
                ]
            });

            // get a reference to the HTML element with id "hideit" and add a click listener to it
            Ext.get("hideit").on('click', function() {

                // get a reference to the Panel that was created with id = 'west-panel'
                var w = Ext.getCmp('rTabPanel');
                // expand or collapse that Panel based on its collapsed property state
                w.collapsed ? w.expand() : w.collapse();
            });


            //setInterval(updateTime, 1000);

            var usergroup = '{$usergroup}';

            Ext.create('Ext.Button', {
                disabled:true,
                text: 'Logged as {$username}',
                margin: '0 2 0 0',
                renderTo: 'bloggout'
            });



            Ext.create('Ext.Button', {
                id: 'timeBtn',
                disabled:true,
                margin: '0 2 0 0',
                text: usergroup,
                renderTo: 'bloggout'
            });

            var unit = '{$unit}';
            if (unit != '') {
                Ext.create('Ext.Button', {
                    text: '{$unit}',
                    disabled:true,
                    margin: '0 2 0 0',
                    renderTo: 'bloggout'
                });
            }

            Ext.create('Ext.Button', {
                text: 'Logout',
                renderTo: 'bloggout',
                handler: function() {
                    window.location.href = SITE_URL + 'dashboard/logout';
                }
            }); { *
                Ext.create('Ext.Button', {
                    text: 'Close All Tab',
                    renderTo: 'closetab',
                    handler: function() {
                        closeAllTab();
                    }
                }); *
            }

            Ext.override(Ext.grid.RowNumberer, {
                renderer: function(v, p, record, rowIndex) {
                    if (this.rowspan) {
                        p.cellAttr = 'rowspan="' + this.rowspan + '"';
                    }
                    var st = record.store;
                    if (st.lastOptions.page != undefined && st.lastOptions.start != undefined && st.lastOptions.limit != undefined) {
                        var page = st.lastOptions.page - 1;
                        var limit = st.lastOptions.limit;
                        return limit * page + rowIndex + 1;
                    } else {
                        return rowIndex + 1;
                    }
                }
            });
           /* 
           disable animasi
           Ext.window.Window.override({
                animateTarget: Ext.getDoc(), //animate on show/close from top left of document

                maximize: function() {
                    this.callParent([true]); //animate
                },
                restore: function() {
                    this.callParent([true]); //animate
                }
            });*/
        });
    </script>



    <style type="text/css">
        /* {*html { overflow: auto; } 
            html, body, div, iframe { margin: 0px; padding: 0px; height: 100%; border: none; } 
            iframe { display: block; width: 100%; border: none; overflow-y: auto; overflow-x: hidden; } *}*/
    </style>



    <!-- use class="x-hide-display" to prevent a brief flicker of the content -->
    <div id="west" class="x-hide-display">
        <p>Hi. I'm the west panel.</p>
    </div>
    <div id="center2" class="x-hide-display">
        <a id="hideit" href="#">
            <!-- Toggle the west region -->
        </a>

        <!--  {*            <iframe id="tree" name="tree" src="{$site_url}/dashboard/page"  frameborder="0" marginheight="0" marginwidth="0" width="100%" height=600" scrolling="auto"></iframe> *} -->
        <!--  <p>My closable attribute is set to false so you can't close me. The other center panels can be closed.</p>
             <p>The center panel automatically grows to fit the remaining space in the container that isn't taken up by the border regions.</p> -->

    </div>

    <div id="center1" class="x-hide-display">
        <div id="center1content"> </div>
    </div>

    <div id="props-panel" class="x-hide-display" style="width:200px;height:200px;overflow:hidden;">
    </div>
    <div id="south" class="x-hide-display">
        <!-- <p>south - generally for informational stuff, also could be for status bar</p> -->
    </div>
    <script src='{$assets_url}/js/app/master/supplier/ChooserListSupplier.js'></script>
    <script src='{$assets_url}/js/app/master/customer/ChooserListCustomer.js'></script>

    <script src='{$assets_url}/js/app/sistem/editRules.js'></script>
    <script src='{$assets_url}/js/app/sistem/sysMenuTree.js'></script>
    <!-- // <script src='{$assets_url}/js/app/sistem/sysGroupMenuAkses.js'></script> -->
    <!-- // <script src='{$assets_url}/js/app/sistem/gridRules.js'></script> -->

    <script src='{$assets_url}/js/app/sistem/SysGroup.js'></script>

    <!-- // <script src='{$assets_url}/js/app/dashboard/pendingdata.js'></script> -->
    <!-- // <script src='{$assets_url}/js/app/dashboard.js'></script> -->

    <script src='{$assets_url}/js/app/commonfunc.js'></script>
    <script src='{$assets_url}/js/app/sales2/sales_function.js'></script>
    <script src='{$assets_url}/js/app/patient/patient_function.js'></script>
    <script src='{$assets_url}/js/app/nurse/nurse_function.js'></script>
    <script src='{$assets_url}/js/app/docter/docter_function.js'></script>
    <script src='{$assets_url}/js/app/purchasing/purchase_function.js'></script>
    <script src='{$assets_url}/js/app/inventory/product_function.js'></script>
    <script src='{$assets_url}/js/navtree.js'></script>

    <script type="text/javascript">
    var ArrReturnSalesStatus = [
            [1, 'Open'],
            [3, 'Confirmed']
        ];

   
        // treeNavigation.collapsenav();
    // console.log('result'+tes(ArrReturnSalesStatus,3))
    </script>
</body>

</html>