<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>{$companyname} - {$appname}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <script src='{$assets_url}/ext/ext-all.js'></script>
    <script src='{$assets_url}/ext/ext-theme-neptune.js'></script>
    <link href="{$assets_url}/ext/resources/css/ext-all-neptune.css" rel="stylesheet">
<!-- {*<link href="{$assets_url}ext/resources/css/ext-all-gray.css" rel="stylesheet">*} -->

    <style type="text/css">
    .logo_centered {
        position: fixed;
        top: 30%;
        left: 50%;
        /* bring your own prefixes */
        transform: translate(-50%, -50%);
    }

    .mainPageGroupPanel .x-panel-header {
        color:#15428b;
        border-color:#99bbe8;
        /*background-image: url(../images/default/panel/white-top-bottom.gif);*/
    }
    </style>
    
    <!-- <center><img src="{$assets_url}/images/Logo redsfin.png" width="200" class="logo_centered"/></center> -->

    <script type="text/javascript">
    var SITE_URL = '{$site_url}';
    var appname = '{$appname}';
    </script>
    <script src='{$assets_url}/js/login.js'></script>
    <style>
    body{
        position:relative;
        /*background: url(http://8pic.ir/images/cgnd518gxezm1m2blqo7.jpg) no-repeat center center fixed;*/
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        width:100%;
        height:100%;
        margin:0
    }
    body:after{
        opacity: 0.19;
        position:fixed;
        content:"";
        top:0;
        left:0;
        right:0;
        bottom:0;
        /*background:rgba(0,0,255,0.5);*/
        /*background: url({$assets_url}/images/FLAT8.png) no-repeat center center fixed;*/
        z-index:-1;
    }
    </style>
</head>
<body>
</body>
</html>
