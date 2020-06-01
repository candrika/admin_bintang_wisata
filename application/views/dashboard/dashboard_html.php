<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <!-- <title>Flatkit - HTML Version | Bootstrap 4 Web App Kit with AngularJS</title>
  <meta name="description" content="Admin, Dashboard, Bootstrap, Bootstrap 4, Angular, AngularJS" /> -->
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimal-ui" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <!-- for ios 7 style, multi-resolution icon of 152x152 -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-barstyle" content="black-translucent">
  <link rel="apple-touch-icon" href="<?=base_url()?>/assets/tpl/assets/images/logo.png">
  <meta name="apple-mobile-web-app-title" content="Flatkit">
  <!-- for Chrome on Android, multi-resolution icon of 196x196 -->
  <meta name="mobile-web-app-capable" content="yes">
  <link rel="shortcut icon" sizes="196x196" href="<?=base_url()?>/assets/tpl/assets/images/logo.png">
  
  <!-- style -->
  <link rel="stylesheet" href="<?=base_url()?>/assets/tpl/assets/animate.css/animate.min.css" type="text/css" />
  <link rel="stylesheet" href="<?=base_url()?>/assets/tpl/assets/glyphicons/glyphicons.css" type="text/css" />
  <link rel="stylesheet" href="<?=base_url()?>/assets/tpl/assets/font-awesome/css/font-awesome.min.css" type="text/css" />
  <link rel="stylesheet" href="<?=base_url()?>/assets/tpl/assets/material-design-icons/material-design-icons.css" type="text/css" />

  <link rel="stylesheet" href="<?=base_url()?>/assets/tpl/assets/bootstrap/dist/css/bootstrap.min.css" type="text/css" />
  <!-- build:css <?=base_url()?>/assets/tpl/assets/styles/app.min.css -->
  <link rel="stylesheet" href="<?=base_url()?>/assets/tpl/assets/styles/app.css" type="text/css" />
  <!-- endbuild -->
  <link rel="stylesheet" href="<?=base_url()?>/assets/tpl/assets/styles/font.css" type="text/css" />

<style>
	body {
    color: rgba(0, 0, 0, 0.87);
    font-size: 0.875rem;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
}
	</style>
</head>
<body>
  <div class="app" id="app">

<!-- ############ LAYOUT START-->


  
  <!-- content -->
  <div id="content" class="app-content box-shadow-z3" role="main">
  
    <div class="app-footer">
    
    </div>
    <div class="app-body" id="view">

<!-- ############ PAGE START-->
<div class="padding">

	<div class="row">
	    <div class="col-md-6 col-xl-6">
	        <div class="box">
	          <div class="box-header">
	            <h3>Overall Bussiness Performance</h3>
	            <small>Calculated in last 7 days</small>
	          </div>
	          <div class="box-tool">
		        <ul class="nav">
		          <li class="nav-item inline">
		            <a class="nav-link">
		              <i class="material-icons md-18">&#xe863;</i>
		            </a>
		          </li>
		          <li class="nav-item inline dropdown">
		            <a class="nav-link" data-toggle="dropdown">
		              <i class="material-icons md-18">&#xe5d4;</i>
		            </a>
		            <div class="dropdown-menu dropdown-menu-scale pull-right">
		              <a class="dropdown-item" href>This week</a>
		              <a class="dropdown-item" href>This month</a>
		              <a class="dropdown-item" href>This week</a>
		              <div class="dropdown-divider"></div>
		              <a class="dropdown-item">Today</a>
		            </div>
		          </li>
		        </ul>
		      </div>
	          <div class="text-center b-t">
	            <div class="row-col">
	              <div class="row-cell p-a">
	                <div class="inline m-b">
	                  <div ui-jp="easyPieChart" class="easyPieChart" ui-refresh="app.setting.color" data-redraw='true' data-percent="55" ui-options="{
	                      lineWidth: 8,
	                      trackColor: 'rgba(0,0,0,0.05)',
	                      barColor: '#0cc2aa',
	                      scaleColor: 'transparent',
	                      size: 100,
	                      scaleLength: 0,
	                      animate:{
	                        duration: 3000,
	                        enabled:true
	                      }
	                    }">
	                    <div>
	                      <h5>55%</h5>
	                    </div>
	                  </div>
	                </div>
	                <div>
	                	Bussiness Health Score
	                	<small class="block m-b"><span style="color:green;">+20 Points</span></small>
	                	<a href class="btn btn-sm white rounded">Manage</a>
	                </div>
	              </div>
	              <div class="row-cell p-a">
	                <div class="inline m-b">
	                  <div ui-jp="easyPieChart" class="easyPieChart" ui-refresh="app.setting.color" data-redraw='true' data-percent="45" ui-options="{
	                      lineWidth: 8,
	                      trackColor: 'rgba(0,0,0,0.05)',
	                      barColor: '#fcc100',
	                      scaleColor: 'transparent',
	                      size: 100,
	                      scaleLength: 0,
	                      animate:{
	                        duration: 3000,
	                        enabled:true
	                      }
	                    }">
	                    <div>
	                      <h5>45%</h5>
	                    </div>
	                  </div>
	                </div>
	                <div>
	                	Invoice Quality Score
	                	<small class="block m-b"><span style="color:red;">-19 Points</span></small>
	                	<a href class="btn btn-sm white rounded">Manage</a>
	                </div>
	              </div>
	            </div>
	          </div>
	        </div>
	    </div>
	    <div class="col-md-6 col-xl-6">
        <div class="box">
          <div class="box-header">
           <h3>Bussiness Growth</h3>
	            <small>Calculated in last 30 days</small>
          </div>
         <div class="box-tool">
		        <ul class="nav">
		          <li class="nav-item inline">
		            <a class="nav-link">
		              <i class="material-icons md-18">&#xe863;</i>
		            </a>
		          </li>
		          <li class="nav-item inline dropdown">
		            <a class="nav-link" data-toggle="dropdown">
		              <i class="material-icons md-18">&#xe5d4;</i>
		            </a>
		            <div class="dropdown-menu dropdown-menu-scale pull-right">
		              <a class="dropdown-item" href>This week</a>
		              <a class="dropdown-item" href>This month</a>
		              <a class="dropdown-item" href>This week</a>
		              <div class="dropdown-divider"></div>
		              <a class="dropdown-item">Today</a>
		            </div>
		          </li>
		        </ul>
		      </div>
          <div class="box-body">
            <div ui-jp="plot" ui-refresh="app.setting.color" ui-options="
              [
                { 
                  data: [[1, 5.5], [2, 5.7], [3, 6.4], [4, 7.0], [5, 7.2], [6, 7.3], [7, 7.5]], 
                  points: { show: true, radius: 5}, 
                  splines: { show: true, tension: 0.45, lineWidth: 5} 
                }
              ], 
              {
                colors: ['#fcc100'],
                series: { shadowSize: 3 },
                xaxis: { show: true, font: { color: '#ccc' }, position: 'bottom' },
                yaxis:{ show: true, font: { color: '#ccc' }, min:3},
                grid: { hoverable: true, clickable: true, borderWidth: 0, color: 'rgba(120,120,120,0.5)' },
                tooltip: true,
                tooltipOpts: { content: '%x.0 is %y.4',  defaultTheme: false, shifts: { x: 0, y: -40 } }
              }
            " style="height:200px" >
            </div>
          </div>
        </div>
      </div>
<!-- 	    <div class="col-md-6 col-xl-4">
	    	<div class="box">
	          <div class="box-header">
	            <h3>Bussiness Growth</h3>
	            <small>Calculated in last 30 days</small>
	          </div>
	          <div class="box-tool">
		        <ul class="nav">
		          <li class="nav-item inline">
		            <a class="nav-link">
		              <i class="material-icons md-18">&#xe863;</i>
		            </a>
		          </li>
		          <li class="nav-item inline dropdown">
		            <a class="nav-link" data-toggle="dropdown">
		              <i class="material-icons md-18">&#xe5d4;</i>
		            </a>
		            <div class="dropdown-menu dropdown-menu-scale pull-right">
		              <a class="dropdown-item" href>This week</a>
		              <a class="dropdown-item" href>This month</a>
		              <a class="dropdown-item" href>This week</a>
		              <div class="dropdown-divider"></div>
		              <a class="dropdown-item">Today</a>
		            </div>
		          </li>
		        </ul>
		      </div>
	          <div class="box-body">
	            <div ui-jp="plot" ui-refresh="app.setting.color" ui-options="
	              [
	                { data: [[1, 3], [2, 2.6], [3, 3.2], [4, 3], [5, 3.5], [6, 3], [7, 3.5]], 
	                  points: { show: true, radius: 0}, 
                  	  splines: { show: true, tension: 0.45, lineWidth: 2, fill: 0.2 } 
	                },
	                { data: [[1, 3.6], [2, 3.5], [3, 6], [4, 4], [5, 4.3], [6, 3.5], [7, 3.6]], 
	                  points: { show: true, radius: 0}, 
                  	  splines: { show: true, tension: 0.45, lineWidth: 2, fill: 0.1 } 
	                }
	              ], 
	              {
	                colors: ['#fcc100','#0cc2aa'],
	                series: { shadowSize: 3 },
	                xaxis: { show: true, font: { color: '#ccc' }, position: 'bottom' },
	                yaxis:{ show: true, font: { color: '#ccc' },  min: 2},
	                grid: { hoverable: true, clickable: true, borderWidth: 0, color: 'rgba(120,120,120,0.5)' },
	                tooltip: true,
	                tooltipOpts: { content: '%x.0 is %y.4',  defaultTheme: false, shifts: { x: 0, y: -40 } }
	              }
	            " style="height:200px" >
	            </div>
	          </div>
	        </div>
	    </div> -->

	   <!--  <div class="col-md-12 col-xl-4">
	        <div class="box">
	          <div class="box-header">
	            <h3>Your Sales</h3>
	            <small>A general overview of your sales</small>
	          </div>
	          <div class="box-tool">
		        <ul class="nav">
		          <li class="nav-item inline">
		            <a class="nav-link">
		              <i class="material-icons md-18">&#xe863;</i>
		            </a>
		          </li>
		          <li class="nav-item inline dropdown">
		            <a class="nav-link" data-toggle="dropdown">
		              <i class="material-icons md-18">&#xe5d4;</i>
		            </a>
		            <div class="dropdown-menu dropdown-menu-scale pull-right">
		              <a class="dropdown-item" href>This week</a>
		              <a class="dropdown-item" href>This month</a>
		              <a class="dropdown-item" href>This week</a>
		              <div class="dropdown-divider"></div>
		              <a class="dropdown-item">Today</a>
		            </div>
		          </li>
		        </ul>
		      </div>
	          <div class="box-body">
	            <div ui-jp="plot" ui-refresh="app.setting.color" ui-options="
	              [
	                { data: [[1, 2], [2, 3], [3, 2], [4, 5], [5, 4], [6, 3], [7, 4], [8, 2], [9, 2], [10, 2], [11, 2]] }
	              ], 
	              {
	                bars: { show: true, fill: true,  barWidth: 0.3, lineWidth: 2, order: 1, fillColor: { colors: [{ opacity: 0.2 }, { opacity: 0.2}] }, align: 'center'},
	                colors: ['#0cc2aa','#fcc100'],
	                series: { shadowSize: 3 },
	                xaxis: { show: true, font: { color: '#ccc' }, position: 'bottom' },
	                yaxis:{ show: true, font: { color: '#ccc' }},
	                grid: { hoverable: true, clickable: true, borderWidth: 0, color: 'rgba(120,120,120,0.5)' },
	                tooltip: true,
	                tooltipOpts: { content: '%x.0 is %y.4',  defaultTheme: false, shifts: { x: 0, y: -40 } }
	              }
	            " style="height:200px" >
	            </div>
	          </div>
	        </div>
	    </div> -->
	    
	</div>


	<div class="row">
		<div class="col-sm-6 col-md-4 col-lg-3">
        <div class="box-color p-a primary">
          <div class="pull-left m-r">
             <span class="w-40 warn text-center rounded">
              <span class="w-40 r-2x _600 text-lg success">LR</span>
            </span>
          </div>
          <div class="clear">
            <h4 class="m-0 text-md">Last 12 Months Revenue</h4>
            <small class="text-muted">Rp 850.000.000</small>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="box p-a">
          <div class="pull-right m-l">
             <span class="w-40 warn text-center rounded">
              <span class="w-40 r-2x _600 text-lg success">NI</span>
            </span>
          </div>
          <div class="clear">
             <h4 class="m-0 text-md">Last Month Net Income</h4>
            <small class="text-muted">Rp 150.000.000</small>
          </div>
        </div>
      </div> 
		<div class="col-sm-6 col-md-4 col-lg-3">
        <div class="box-color p-a accent">
          <div class="pull-right m-l">
             <span class="w-40 warn text-center rounded">
             	<span class="w-40 r-2x _600 text-lg success">AP</span>
              <!-- <i class="material-icons">shopping_basket</i> -->
            </span>
          </div>
          <div class="clear">
            <h4 class="m-0 text-md">Account Payable</h4>
            <small class="text-muted">Rp 210.000.000</small>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="box p-a">
          <div class="pull-left m-r">
              <span class="w-40 warn text-center rounded">
              <span class="w-40 r-2x _600 text-lg accent">AR</span>
            </span>
          </div>
          <div class="clear">
            <h4 class="m-0 text-md">Account Receivable</h4>
            <small class="text-muted">Rp 450.000.000</small>
          </div>
        </div>
      </div>
      
	</div>



	
	
	<div class="row">
      <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="box p-a">
          <div class="pull-left m-r">
            <span class="w-40 warn text-center rounded">
              <i class="material-icons">shopping_basket</i>
            </span>
          </div>
          <div class="clear">
            <h4 class="m-0 text-md"><a href>75 <span class="text-sm">Sales</span></a></h4>
            <small class="text-muted">6 waiting payment.</small>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="box-color p-a blue">
          <div class="pull-right m-l">
            <span class="w-40 dker text-center rounded">
              <i class="material-icons">local_shipping</i>
            </span>
          </div>
          <div class="clear">
            <h4 class="m-0 text-md"><a href>40 <span class="text-sm">Purchase</span></a></h4>
            <small class="text-muted">26 waiting payments.</small>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="box p-a">
          <div class="pull-right m-l">
            <span class="w-40 accent text-center rounded">
              <i class="material-icons">people</i>
            </span>
          </div>
          <div class="clear">
            <h4 class="m-0 text-md"><a href>120 <span class="text-sm">Open Production</span></a></h4>
            <small class="text-muted">37 ready to shipping.</small>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="box-color p-a blue-800">
          <div class="pull-left m-r">
            <span class="w-40 dker text-center rounded">
              <i class="material-icons">comment</i>
            </span>
          </div>
          <div class="clear">
            <h4 class="m-0 text-md"><a href>269 <span class="text-sm">Inventory Ready Stock</span></a></h4>
            <small class="text-muted">25 at minimum stock.</small>
          </div>
        </div>
      </div>
</div>

	<div class="row">
		
	</div>



	<div class="row no-gutter box">
        <div class="col-sm-12">
    		<div class="box-header">
	          <h3>Profit and Lost</h3>
	          <small>In this current year</small>
	        </div>
	        <div class="box-body">
	            <div ui-jp="plot" ui-refresh="app.setting.color" ui-options="
	              [
	                { 
	                  data: [[1, 2], [2, 4], [3, 5], [4, 7], [5, 6], [6, 4], [7, 5], [8, 4]], 
	                  bars: { show: true, barWidth: 0.25, lineWidth: 1, fillColor: { colors: [{ opacity: 0.8 }, { opacity: 1}] }, order:1 } 
	                },
	                { 
	                  data: [[1, 3], [2, 4], [3, 3], [4, 6], [5, 5], [6, 4], [7, 5], [8, 3]], 
	                  bars: { show: true, barWidth: 0.25, lineWidth: 1, fillColor: { colors: [{ opacity: 0.8 }, { opacity: 1}] }, order:2 } 
	                }
	              ], 
	              {
	                colors: ['#0cc2aa','#fcc100'],
	                series: { shadowSize: 3 },
	                xaxis: { show: true, font: { color: '#ccc' }, position: 'bottom' },
	                yaxis:{ show: true, font: { color: '#ccc' }},
	                grid: { hoverable: true, clickable: true, borderWidth: 0, color: 'rgba(120,120,120,0.5)' },
	                tooltip: true,
	                tooltipOpts: { content: '%x.0 is %y.4',  defaultTheme: false, shifts: { x: 0, y: -40 } }
	              }
	            " style="height:200px" >
	            </div>
          </div>
        </div>
    </div>

	

	<div class="row">
	    <div class="col-sm-12 col-md-6">
	    	<div class="box">
	    		<div class="box-header">
	    			<h3>Awaiting Your Approval <span class="label warning">79</span></h3>
	    			<small>Your data status</small>
	    		</div>
		    	<ul class="list inset">
			        <li class="list-item">
			          <a herf class="list-left">
			          	<span class="w-40 r-2x _600 text-lg accent">
			            	PS
			            </apan>
			          </a>
			          <div class="list-body">
			          	<!-- <div class="m-y-sm pull-right">
			            	<a href class="btn btn-xs white">Manage</a>
			            	<a href class="btn btn-xs white btn-icon"><i class="fa fa-pencil"></i></a>
		            	</div> -->
			            <div><a href>Purchase</a></div>
			            <div class="text-sm">
			            	<span class="text-muted"><strong>5</strong> requisition, <strong>3</strong> order</span> 
			            	<span class="label"></span>
			            </div>
			          </div>
			        </li>
			        <li class="list-item">
			          <a herf class="list-left">
			          	<span class="w-40 r-2x _600 text-lg success">
			            	SL
			            </apan>
			          </a>
			          <div class="list-body">
			          	<!-- <div class="m-y-sm pull-right">
			            	<a href class="btn btn-xs white">Manage</a>
			            	<a href class="btn btn-xs white btn-icon"><i class="fa fa-pencil"></i></a>
		            	</div> -->
			            <div><a href>Sales</a></div>
			            <div class="text-sm">
			            	<span class="text-muted"><strong>35</strong> quotation, <strong>6</strong> order</span> 
			            	<span class="label"></span>
			            </div>
			          </div>
			        </li>
			        <li class="list-item">
			          <a herf class="list-left">
			          	<span class="w-40 r-2x _600 text-lg purple">
			            	PD
			            </apan>
			          </a>
			          <div class="list-body">
			          <!-- 	<div class="m-y-sm pull-right">
			            	<a href class="btn btn-xs white">Manage</a>
			            	<a href class="btn btn-xs white btn-icon"><i class="fa fa-pencil"></i></a>
		            	</div> -->
			            <div><a href>Production</a></div>
			            <div class="text-sm">
			            	<span class="text-muted"><strong>52</strong> work order, <strong>13</strong> material usage</span> 
			            	<span class="label"></span>
			            </div>
			          </div>
			        </li>
			        <li class="list-item">
			          <a herf class="list-left">
			          	<span class="w-40 r-2x _600 text-lg blue">
			            	PR
			            </apan>
			          </a>
			          <div class="list-body">
			          	<!-- <div class="m-y-sm pull-right">
			            	<a href class="btn btn-xs white">Manage</a>
			            	<a href class="btn btn-xs white btn-icon"><i class="fa fa-pencil"></i></a>
		            	</div> -->
			            <div><a href>Payroll</a></div>
			            <div class="text-sm">
			            	<span class="text-muted"><strong>15</strong> period</span> 
			            	<span class="label"></span>
			            </div>
			          </div>
			        </li>
			        <li class="list-item">
			          <a herf class="list-left">
			          	<span class="w-40 r-2x _600 text-lg blue-800">
			            	FN
			            </apan>
			          </a>
			          <div class="list-body">
			          	<!-- <div class="m-y-sm pull-right">
			            	<a href class="btn btn-xs white">Manage</a>
			            	<a href class="btn btn-xs white btn-icon"><i class="fa fa-pencil"></i></a>
		            	</div> -->
			            <div><a href>Finance</a></div>
			            <div class="text-sm">
			            	<span class="text-muted"><strong>30</strong> cash in, <strong>5</strong> cash out</span> 
			            	<span class="label"></span>
			            </div>
			          </div>
			        </li>
			    </ul>
		    </div>
	    </div>
	    <div class="col-sm-12 col-md-6">
	    	<div class="box">
		      <div class="box-header">
		        <h3>Stats</h3>
		        <small>Your data status</small>
		      </div>
		      <div class="box-tool">
		        <ul class="nav">
		          <li class="nav-item inline">
		            <a class="nav-link">
		              <i class="material-icons md-18">&#xe863;</i>
		            </a>
		          </li>
		          <li class="nav-item inline dropdown">
		            <a class="nav-link" data-toggle="dropdown">
		              <i class="material-icons md-18">&#xe5d4;</i>
		            </a>
		            <div class="dropdown-menu dropdown-menu-scale pull-right">
		              <a class="dropdown-item" href>This week</a>
		              <a class="dropdown-item" href>This month</a>
		              <a class="dropdown-item" href>This week</a>
		              <div class="dropdown-divider"></div>
		              <a class="dropdown-item">Today</a>
		            </div>
		          </li>
		        </ul>
		      </div>
		      <table class="table">
		        <thead>
		          <tr>
		            <th style="width:60px;" class="text-center">Graph</th>
		            <th>Item</th>                    
		            <th style="width:70px;"></th>
		          </tr>
		        </thead>
		        <tbody>
		          <tr>
		            <td>
		              <div ui-jp="sparkline" ui-refresh="app.setting.color" ui-options="[ 16,15,15,14,17,18,16,15,16 ], {type:'bar', height:19, barWidth:4, barSpacing:2, barColor:'#0cc2aa'}" class="sparkline inline">loading...</div>
		            </td>
		            <td>App downloads</td>
		            <td class="text-success">
		              <i class="fa fa-level-up"></i> 40%
		            </td>
		          </tr>
		          <tr>
		            <td class="text-center">
		              <div ui-jp="sparkline" ui-refresh="app.setting.color" ui-options="[ 60,30,10 ], {type:'pie', height:19, sliceColors:['#fcc100','#fff','#0cc2aa']}" class="sparkline inline">loading...</div>
		            </td>
		            <td>Social connection</td>
		            <td class="text-success">
		              <i class="fa fa-level-up"></i> 20%
		            </td>
		          </tr>
		          <tr>                    
		            <td>
		              <div ui-jp="sparkline" ui-refresh="app.setting.color" ui-options="[ 16,15,15,14,17,18,16,15,16 ], {type:'line', height:19, width:60, lineColor:'#0cc2aa', fillColor:'transparent'}" class="sparkline inline">loading...</div>
		            </td>
		            <td>Revenue</td>
		            <td class="text-warning">
		              <i class="fa fa-level-down"></i> 5%
		            </td>
		          </tr>
		          <tr>                    
		            <td>
		              <div ui-jp="sparkline" ui-refresh="app.setting.color" ui-options="[ 16,15,15,14,17,18,16,15,16 ], {type:'discrete', height:19, width:60, lineColor:'#6cc788'}" class="sparkline inline">loading...</div>
		            </td>
		            <td>Customer increase</td>
		            <td class="text-danger">
		              <i class="fa fa-level-down"></i> 20%
		            </td>
		          </tr>
		          <tr>                    
		            <td>
		              <div ui-jp="sparkline" ui-refresh="app.setting.color" ui-options="[ 16,15,15,14,17,18,16,15,16 ], {type:'line', height:19, width:60, lineColor:'#fcc100', fillColor:'#fcc100'}" class="sparkline inline">loading...</div>
		            </td>
		            <td>Order placed</td>
		            <td class="text-warning">
		              <i class="fa fa-level-down"></i> 5%
		            </td>
		          </tr>
		          <tr>
		            <td>
		              <div ui-jp="sparkline" ui-refresh="app.setting.color" ui-options="[ 16,15,15,16,15,16,14,17,18 ], {type:'line', height:19, width:60, lineColor:'#fcc100', fillColor:'transparent'}" class="sparkline inline">loading...</div>
		            </td>
		            <td>Visitors</td>
		            <td class="text-warning">
		              <i class="fa fa-level-down"></i> 8%
		            </td>
		          </tr>
		        </tbody>
		      </table>
		    </div>
	    </div>
	</div>
</div>

<!-- ############ PAGE END-->

    </div>
  </div>
  <!-- / -->



<!-- ############ LAYOUT END-->

  </div>
<!-- build:js scripts/app.html.js -->
<!-- jQuery -->
  <script src="<?=base_url()?>/assets/tpl/libs/jquery/jquery/dist/jquery.js"></script>
<!-- Bootstrap -->
  <script src="<?=base_url()?>/assets/tpl/libs/jquery/tether/dist/js/tether.min.js"></script>
  <script src="<?=base_url()?>/assets/tpl/libs/jquery/bootstrap/dist/js/bootstrap.js"></script>
<!-- core -->
  <script src="<?=base_url()?>/assets/tpl/libs/jquery/underscore/underscore-min.js"></script>
  <script src="<?=base_url()?>/assets/tpl/libs/jquery/jQuery-Storage-API/jquery.storageapi.min.js"></script>
  <script src="<?=base_url()?>/assets/tpl/libs/jquery/PACE/pace.min.js"></script>

  <script src="<?=base_url()?>/assets/tpl/html/scripts/config.lazyload.js"></script>

  <script src="<?=base_url()?>/assets/tpl/html/scripts/palette.js"></script>
  <script src="<?=base_url()?>/assets/tpl/html/scripts/ui-load.js"></script>
  <script src="<?=base_url()?>/assets/tpl/html/scripts/ui-jp.js"></script>
  <script src="<?=base_url()?>/assets/tpl/html/scripts/ui-include.js"></script>
  <script src="<?=base_url()?>/assets/tpl/html/scripts/ui-device.js"></script>
  <script src="<?=base_url()?>/assets/tpl/html/scripts/ui-form.js"></script>
  <script src="<?=base_url()?>/assets/tpl/html/scripts/ui-nav.js"></script>
  <script src="<?=base_url()?>/assets/tpl/html/scripts/ui-screenfull.js"></script>
  <script src="<?=base_url()?>/assets/tpl/html/scripts/ui-scroll-to.js"></script>
  <script src="<?=base_url()?>/assets/tpl/html/scripts/ui-toggle-class.js"></script>

  <script src="<?=base_url()?>/assets/tpl/html/scripts/app.js"></script>

  <!-- ajax -->
  <script src="<?=base_url()?>/assets/tpl/libs/jquery/jquery-pjax/jquery.pjax.js"></script>
  <script src="<?=base_url()?>/assets/tpl/html/scripts/ajax.js"></script>
<!-- endbuild -->
</body>
</html>
