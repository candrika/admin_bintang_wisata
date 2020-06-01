<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Aktiva - Accounting Done Right!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <link href="{$assets_url}/css/icons.css" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="{$assets_url}/ext/resources/css/TabScrollerMenu.css" />
        <link rel="stylesheet" type="text/css" href="{$assets_url}/css/offline-theme-slide.css" />
        <link rel="stylesheet" type="text/css" href="{$assets_url}/css/offline-language-english-indicator.css" />
        <style type="text/css">
            p {
                margin:5px;
            }
            a {
                text-decoration: none;
            }
            body {
                background-color:#b0c4de;
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
        </style>

        <script type="text/javascript">
            var SITE_URL = '{$site_url}/';
            var BASE_URL = '{$base_url}';
            var pegawainid;
            var curnipeg = '';
            var namaunit = '{$unit}';
            var idunit = '{$idunit}';
            var idcompany = '{$idcompany}';
            var group_id = '{$group_id}';
        </script>

        <script src='{$assets_url}/ext/ext-all.js'></script>
        <!-- {*        <link rel="stylesheet" type="text/css" href="{$assets_url}ext/resources/css/ext-all-gray.css">*} -->
        <script src='{$assets_url}/ext/ext-theme-neptune.js'></script>

        <script src='{$assets_url}/js/SearchField4.js'></script>
        <script src='{$assets_url}/ext/src/ux/TabScrollerMenu.js'></script>
        <script src='{$assets_url}/js/app/combox.js'></script>
        <script src='{$assets_url}/js/util.js'></script>
        <script src='{$assets_url}/js/offline.min.js'></script>        
        <script src='{$assets_url}/ext/NumericField.js'></script>


        <script src='{$assets_url}/js/app/pengaturan.js'></script>
        <script src='{$assets_url}/js/app/UserManagement.js'></script>
        <script src='{$assets_url}/js/app/accountList.js'></script>

        
        

        <script src='{$assets_url}/js/navtree.js'></script>
        <link href="{$assets_url}/ext/resources/css/ext-all-neptune-debug.css" rel="stylesheet">
    </head>
    <body>
        <div id="top_area">xxxxxxxxxxx</div> 

        <script type="text/javascript">

            // Offline.options({
            //   checkOnLoad: false,
            //   interceptRequests: true,
            //   reconnect: {
            //     initialDelay: 1
            //   },
            //   requests: true,
            //   game: (false)
            // });
            

            Ext.require(['*']);
            var windowH = Ext.getBody().getViewSize().height;
            if (windowH <= 682)
            {
                //laptop 14'
                var sizeH = windowH - 100;
            } else if (windowH > 682) {
                //desktop
                var sizeH = windowH - 200;
            }

            var heightPort = (windowH*1)/(2*1)-90*1;
            console.log(heightPort)
            Ext.onReady(function() {


                

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
                
  var mod_help = new Ext.Action({
            text: 'Help',
            overlay: false,
            tooltip:'View Help', 
            handler: function(){
                //addTab(tabs);
            },
            iconCls: 'ico-help'
        });

                var viewport = Ext.create('Ext.Viewport', {
                    id: 'border-example',
                    layout: 'border',
                    items: [
                         new Ext.Panel({   
                            region:'north',
                            id:'bagianNorth',
                             // overlay: true,
                            // style: 'opacity: .90;',
                            // bodyStyle: 'background-color:#EEEEEE;',
                            // autoEl: {
                            //         tag: 'div',
                            //         html: "&nbsp;&nbsp;<img src={$assets_url}images/logo_aktiva.png height=59> <div style='margin-right:15px; margin-top:15px; float:right;' id=bloggout> </div> "
                            // },
                            // contentEl:'top_area',
                            bbar: [mod_help],
                            // margins:'5 5 5 5',  
                            height:62 
                            
                        }),
                        // create instance immediately
                        // Ext.create('Ext.Component', {
                        //     region: 'north',
                        //     // tbar:menu,
                        //     tbar: ['->',mod_help],
                        //     height: 62, // give north and south regions a height
                        //     autoEl: {
                        //         tag: 'div',
                        //         html: "&nbsp;&nbsp;<img src={$assets_url}images/logo_aktiva.png height=59> <div style='margin-right:15px; margin-top:15px; float:right;' id=bloggout> </div> "
                        //     }
                        // }),
                         {
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
                        }, rTabPanel, {
                            region: 'west',
                            stateId: 'navigation-panel',
                            id: 'west-panel', // see Ext.getCmp() below
                            title: 'Navigation',
                            split: true,
                            width: 270,
                            minWidth: 172,
                            maxWidth: 400,
                            collapsible: true,
                            animCollapse: true,
                            margins: '0 0 0 5',
                            layout: 'accordion',
                            defaults: {
                                // closeAction: 'hide',
                                autoScroll: true
                                        // bodyPadding: 3
                            }
                            , dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'bottom',
                                    items: [
                                        {
                                            xtype: 'button',
//                            width:100,
                                            handler: function(button, event) {
                                                expandnav();
                                            },
                                            flex: 1,
                                            text: 'Expand'
                                        }, {
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
                                        }]
                                }],
                            items: [
                                {
                                    title: 'Welcome {$username}',
                                    items: [treeNavigation]
                                }]
                        },
                        tabPanel]
                });

                // get a reference to the HTML element with id "hideit" and add a click listener to it
                Ext.get("hideit").on('click', function() {

                    // get a reference to the Panel that was created with id = 'west-panel'
                    var w = Ext.getCmp('rTabPanel');
                    // expand or collapse that Panel based on its collapsed property state
                    w.collapsed ? w.expand() : w.collapse();
                });

var tbarEl = Ext.get('bagianNorth');
var childEl = tbarEl.child ('.x-toolbar' );
Ext.DomHelper.applyStyles( childEl, 'background:black;' );

// Ext.getCmp('bagianNorth').getTopToolbar().getEl().dom.style.background = 'black';

//setInterval(updateTime, 1000);

                var periode = '{$periode}';
                var usergroup = '{$usergroup}';
                console.log('periode'+periode);
                if(periode!='' && usergroup!='Administrator')
                {
                    Ext.create('Ext.Button', {
                        text: 'Periode: {$periode}',
                        renderTo: 'bloggout'
                    });
                }
                
                Ext.create('Ext.Button', {
                    text: 'Logged as {$username}',
                    renderTo: 'bloggout'
                });

             

                Ext.create('Ext.Button', {
                    id: 'timeBtn',
                    text: usergroup,
                    renderTo: 'bloggout'
                });

                var unit = '{$unit}';
                if (unit != '')
                {
                    Ext.create('Ext.Button', {
                        text: '{$unit}',
                        renderTo: 'bloggout'
                    });
                }

                Ext.create('Ext.Button', {
                    text: 'Logout',
                    renderTo: 'bloggout',
                    handler: function() {
                        window.location.href = 'dashboard/logout';
                    }
                });
            {*  
            Ext.create('Ext.Button', {
            text: 'Close All Tab',
            renderTo: 'closetab',
            handler: function() {
            closeAllTab();
            }
            });
            *}

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
                Ext.window.Window.override({
                    animateTarget: Ext.getDoc(), //animate on show/close from top left of document

                    maximize: function() {
                        this.callParent([true]); //animate
                    },
                    restore: function() {
                        this.callParent([true]); //animate
                    }
                });
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

        <!-- // <script src='{$assets_url}js/app/account/treeAccount.js'></script> -->
        <script src='{$assets_url}js/app/account/treeAccount2.js'></script>
        <script src='{$assets_url}js/app/account/accListAkunInduk.js'></script>
        <script src='{$assets_url}js/app/hutangpiutang/regPiutang.js'></script>
        
        <script src='{$assets_url}/js/app/setup/company.js'></script>
        <script src='{$assets_url}/js/app/setup/companyUnit.js'></script>
        <script src='{$assets_url}/js/app/setup/setupCompanyTab.js'></script>

        <script src='{$assets_url}/js/app/setup/AccKasListPayroll.js'></script>
        <script src='{$assets_url}/js/app/setup/AccListPayroll.js'></script>
        <script src='{$assets_url}/js/app/setup/AccListThr.js'></script>
        <script src='{$assets_url}/js/app/setup/employeetype.js'></script>  
        <script src='{$assets_url}/js/app/setup/GridTreeAccUnitSetup.js'></script> 
        <script src='{$assets_url}/js/app/setup/linkedacc.js'></script>     
        <script src='{$assets_url}/js/app/setup/linkedacc2.js'></script>  
        <script src='{$assets_url}/js/app/setup/accountListCollected.js'></script>
        <script src='{$assets_url}/js/app/setup/accountListPaid.js'></script>
        <script src='{$assets_url}/js/app/setup/taxcode.js'></script>
        <script src='{$assets_url}/js/app/setup/entryOpeningBalance.js'></script>
        <script src='{$assets_url}/js/app/setup/linkpiutang.js'></script>
        <script src='{$assets_url}/js/app/setup/AccListInsuranceEmpSetup.js'></script>
        <script src='{$assets_url}/js/app/setup/AccListInsuranceCmpSetup.js'></script>
        <script src='{$assets_url}/js/app/setup/SetupUnitInsurance.js'></script>

        <script src='{$assets_url}/js/app/inventory/accListInventory.js'></script>
        <script src='{$assets_url}/js/app/inventory/inventoryProfileForm.js'></script>
        <script src='{$assets_url}/js/app/inventory/inventoryBuyForm.js'></script>
        <script src='{$assets_url}/js/app/inventory/inventorySellForm.js'></script>
        <script src='{$assets_url}/js/app/inventory/inventoryInvForm.js'></script>
        <script src='{$assets_url}/js/app/inventory/inventoryHistory.js'></script>
        <script src='{$assets_url}/js/app/inventory/formInventoryV2.js'></script>
        <script src='{$assets_url}/js/app/inventory/inventoryWindow.js'></script>
        <script src='{$assets_url}/js/app/inventory/func.js'></script>
        <script src='{$assets_url}/js/app/inventory/inventoryAllGrid.js'></script>
        <script src='{$assets_url}/js/app/inventory/inventoryInvGrid.js'></script>
        <script src='{$assets_url}/js/app/inventory/inventoryBuyGrid.js'></script>
        <script src='{$assets_url}/js/app/inventory/inventorySellGrid.js'></script>
        <script src='{$assets_url}/js/app/inventory/inventoryTab.js'></script>        
        <script src='{$assets_url}/js/app/inventory/treeAddRowAdj.js'></script>
        <script src='{$assets_url}/js/app/inventory/gridAddRowAdj.js'></script>
        <script src='{$assets_url}/js/app/inventory/formaddrowAdj.js'></script>
        <script src='{$assets_url}/js/app/inventory/gridHistoryAdj.js'></script>
        <script src='{$assets_url}/js/app/inventory/inventoryTabAdj.js'></script>
        <script src='{$assets_url}/js/app/inventory/entryAdj.js'></script>

        <script src='{$assets_url}/js/app/supplier/formInventorySupplier.js'></script>
        <script src='{$assets_url}/js/app/supplier/GridInventorySupplier.js'></script>

        <script src='{$assets_url}/js/app/jurnal/AccList.js'></script>
        <script src='{$assets_url}/js/app/jurnal/formaddrow.js'></script>
        <script src='{$assets_url}/js/app/jurnal/formRecurring.js'></script>
        <script src='{$assets_url}/js/app/jurnal/gridRecurringPopup.js'></script>
        <script src='{$assets_url}/js/app/jurnal/gridRecurringDetail.js'></script>
        <script src='{$assets_url}/js/app/jurnal/formRecurringDetail.js'></script>        
        <script src='{$assets_url}/js/app/jurnal/gridRecurring.js'></script>
        <script src='{$assets_url}/js/app/jurnal/gridJournalTransDisburs.js'></script>
        <script src='{$assets_url}/js/app/jurnal/gridJournalTransGeneral.js'></script>
        <script src='{$assets_url}/js/app/jurnal/tabJournalTransaction.js'></script>
        <script src='{$assets_url}/js/app/jurnal/entry.js'></script>

        <script src='{$assets_url}/js/app/hutangpiutang/formPembayaranHutang.js'></script>
        <script src='{$assets_url}/js/app/hutangpiutang/gridHutangPurchase.js'></script>

        <script src='{$assets_url}/js/app/purchase/model.js'></script>
        <script src='{$assets_url}/js/app/purchase/addressPopUp.js'></script>
        <script src='{$assets_url}/js/app/purchase/gridItemPopUp.js'></script>
        <script src='{$assets_url}/js/app/purchase/accListPurchase.js'></script>
        <script src='{$assets_url}/js/app/purchase/accListPayment.js'></script>
        <script src='{$assets_url}/js/app/purchase/entry.js'></script>
        <script src='{$assets_url}/js/app/purchase/entryPayment.js'></script>
        <script src='{$assets_url}/js/app/purchase/gridPurchaseAll.js'></script>
        <script src='{$assets_url}/js/app/purchase/gridReturn.js'></script>
        <script src='{$assets_url}/js/app/purchase/gridPaymentHistory.js'></script>
        <script src='{$assets_url}/js/app/purchase/gridDebt.js'></script>
        <script src='{$assets_url}/js/app/purchase/TabTransPurchase.js'></script>
        <script src='{$assets_url}/js/app/purchase/acclistReturn.js'></script>
        <script src='{$assets_url}/js/app/purchase/formaddrowReturn.js'></script>
        <script src='{$assets_url}/js/app/purchase/entryReturn.js'></script>

        <script src='{$assets_url}/js/app/hutangpiutang/RegHutang.js'></script>
        <script src='{$assets_url}/js/app/money/gridReceiveMoney.js'></script>
        <script src='{$assets_url}/js/app/money/AccListAddRowReceive.js'></script>
        <script src='{$assets_url}/js/app/money/formaddrowReceive.js'></script>        
        <script src='{$assets_url}/js/app/money/accListReceive.js'></script>        
        <script src='{$assets_url}/js/app/money/entryReceiveMoney.js'></script>
        <script src='{$assets_url}/js/app/money/TabReceiveMoney.js'></script>
        <script src='{$assets_url}/js/app/money/transferKasForm.js'></script>
        <script src='{$assets_url}/js/app/money/SiswaListAddRowReceiveSiswa.js'></script>
        <script src='{$assets_url}/js/app/money/AccListAddRowReceiveSiswa.js'></script>
        <script src='{$assets_url}/js/app/money/formaddrowReceiveSiswa.js'></script> 
        <script src='{$assets_url}/js/app/money/accListReceiveSiswa.js'></script>  
        <script src='{$assets_url}/js/app/money/gridReceiveMoneySiswa.js'></script>
        <script src='{$assets_url}/js/app/money/entryReceiveMoneySiswa.js'></script>
        <script src='{$assets_url}/js/app/money/TabReceiveMoneySiswa.js'></script>

        <script src='{$assets_url}/js/app/money/AccListAddRowImportReceive.js'></script>
        <script src='{$assets_url}/js/app/money/importReceiveMoney.js'></script>
        <script src='{$assets_url}/js/app/money/gridImportReceiveMoney.js'></script>
        <script src='{$assets_url}/js/app/money/TabImportReceiveMoney.js'></script>

        <script src='{$assets_url}/js/app/money/AccListAddRowImportSpend.js'></script>
        <script src='{$assets_url}/js/app/money/importSpendMoney.js'></script>
        <script src='{$assets_url}/js/app/money/gridImportSpendMoney.js'></script>
        <script src='{$assets_url}/js/app/money/TabImportSpendMoney.js'></script>

        <script src='{$assets_url}/js/app/money/gridSpendMoney.js'></script>
        <script src='{$assets_url}/js/app/money/AccListAddRowSpend.js'></script>
        <script src='{$assets_url}/js/app/money/formaddrowSpend.js'></script>        
        <script src='{$assets_url}/js/app/money/accListSpend.js'></script>
        <script src='{$assets_url}/js/app/money/entrySpendMoney.js'></script>
        <script src='{$assets_url}/js/app/money/TabSpendMoney.js'></script>        
        <script src='{$assets_url}/js/app/money/accListReconcile.js'></script>
        <script src='{$assets_url}/js/app/money/accListReconcileEntryBank.js'></script>   
        <script src='{$assets_url}/js/app/money/accListReconcileOther.js'></script> 
        <script src='{$assets_url}/js/app/money/formaddrowReconcile.js'></script>
        <script src='{$assets_url}/js/app/money/formaddrowReconcileOther.js'></script>
        <script src='{$assets_url}/js/app/money/gridReconcile.js'></script>
        <script src='{$assets_url}/js/app/money/entryReconcile.js'></script>
        <script src='{$assets_url}/js/app/money/TabReconcile.js'></script>
        
        <script src='{$assets_url}/js/app/employee/gridAsuransiPopup.js'></script>
        <script src='{$assets_url}/js/app/employee/sutriGrid.js'></script>
        <script src='{$assets_url}/js/app/employee/anakGrid.js'></script>
        <script src='{$assets_url}/js/app/employee/dataGaji.js'></script>
        <script src='{$assets_url}/js/app/employee/tunjanganGrid.js'></script>
        <script src='{$assets_url}/js/app/employee/potonganGrid.js'></script>
        <script src='{$assets_url}/js/app/employee/asuransiEmpGrid.js'></script>
        <script src='{$assets_url}/js/app/employee/payrollHistoryGrid.js'></script>
        <script src='{$assets_url}/js/app/employee/TambahanGaji.js'></script>
        <script src='{$assets_url}/js/app/employee/employeeGrid.js'></script>        
        <script src='{$assets_url}/js/app/employee/dataTHRGrid.js'></script>  
        
        <script src='{$assets_url}/js/app/penggajian/PilihPegawaiThr.js'></script>
        <script src='{$assets_url}/js/app/penggajian/ProsesThr.js'></script>
        <script src='{$assets_url}/js/app/penggajian/TunjanganPayroll.js'></script>
        <script src='{$assets_url}/js/app/penggajian/PotonganPayroll.js'></script>
        <script src='{$assets_url}/js/app/penggajian/PilihPegawaiPayroll.js'></script>
        <script src='{$assets_url}/js/app/penggajian/prosesGaji2.js'></script>
        <script src='{$assets_url}/js/app/penggajian/prosesGaji.js'></script>
        <script src='{$assets_url}/js/app/penggajian/dataGajiGrid.js'></script>
        
        <script src='{$assets_url}/js/app/clossing/clossingFormMonth.js'></script>
        <script src='{$assets_url}/js/app/clossing/clossingFormYear.js'></script>
        
        <script src='{$assets_url}/js/app/report/neraca.js'></script>
        <script src='{$assets_url}/js/app/report/labarugi.js'></script>
        <script src='{$assets_url}/js/app/report/generalledger.js'></script>
        <script src='{$assets_url}/js/app/report/jurnalumum.js'></script>
        <script src='{$assets_url}/js/app/report/kaskeluar.js'></script>
        <script src='{$assets_url}/js/app/report/kasmasuk.js'></script>
        <script src='{$assets_url}/js/app/report/neracasaldo.js'></script>
        <script src='{$assets_url}/js/app/report/daftarbarang.js'></script>
        <script src='{$assets_url}/js/app/report/barangdibeli.js'></script>
        <script src='{$assets_url}/js/app/report/daftarakun.js'></script>
        <script src='{$assets_url}/js/app/report/penggajian.js'></script>
        <script src='{$assets_url}/js/app/report/aruskas.js'></script>
        <script src='{$assets_url}/js/app/report/penggajian/rekapgaji.js'></script>
        <script src='{$assets_url}/js/app/report/penggajian/rekappremikaryawan.js'></script>
        <script src='{$assets_url}/js/app/report/penggajian/rekappremiperusahaan.js'></script>
        <script src='{$assets_url}/js/app/report/penggajian/rekapph21.js'></script>
        <script src='{$assets_url}/js/app/report/penggajian/rekapthr.js'></script>
        <script src='{$assets_url}/js/app/report/penggajian/rekaptunjangankaryawan.js'></script>
        <script src='{$assets_url}/js/app/report/penggajian/rekappotongankaryawan.js'></script>

        <script src='{$assets_url}/js/app/siswa/pembayaranGrid.js'></script>
        <script src='{$assets_url}/js/app/siswaGrid.js'></script>
        <script src='{$assets_url}/js/app/supplierGrid.js'></script>
        <script src='{$assets_url}/js/app/customerGrid.js'></script>

        <script src='{$assets_url}/js/app/commonfunc.js'></script>


    </body>
</html>
