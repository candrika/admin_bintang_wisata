<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?=$title?></title>
    <link rel="stylesheet" href="<?=base_url()?>/assets/css/bootstrap.min.css">

    <style>
    /*  @import url(http://fonts.googleapis.com/css?family=Bree+Serif);
      body, h1, h2, h3, h4, h5, h6{
        font-family: 'Bree Serif', serif;
      }*/
    /*}*/

    .borderless tbody tr td, .borderless tbody tr th, .borderless thead tr th {
    border: none;
}
    </style>
</head>
  <!-- <body> -->
  <body onload="window.print()">


    <div class="container">

      <div class="panel panel-info">
      <div class="panel-body">
      

    
      <div class="row">
        <div class="col-xs-6">
          <h1>
           <?=$this->logo?>
          </h1>
        </div>
        <div class="col-xs-6 text-right">
          <h2>BUKTI PEMBAYARAN</h2>
          <h3><small>NO: #<?=$data['no']?></small></h3>
        </div>
      </div>
      
      <div class="row" style="margin-left:1px;">
        <address>
          <strong><?=$data['namaunit']?></strong><br>
          <?=$data['alamat']?>
        </address> 
      </div>
      
      <div class="row" style="margin-left:1px;">
        <table class="table borderless" >
         <tr>
           <td width="22%"><b> Diterima Dari:</b></td>
           <td width="50%"><?=$data['receivefrom']?></td>
         </tr>
         <tr>
           <td width="22%"><b> Jumlah Pembayaran:</b></td>
           <td width="50%"><?=$data['total']?></td>
         </tr>
         <tr>
           <td width="22%"><b> Pembayaran:</b></td>
           <td width="50%"><?=$data['memo']?></td>
         </tr>
        </table>
      </div>
      
      <div class="row">
        <div class="col-xs-6">
          <b>Terbilang: </b><?=$data['terbilang']?>
        </div>
        <div class="col-xs-6 text-right">
          <b><?=$data['datetrans']?><br><?=$data['receivedby']?></b>
        </div>
      </div>


<?php
if($data['detail']!=null)
{
?>
    <div class="row"  style="margin-left:1px;">
    <h5>Detail Pembayaran</h5>
    </div>

    <div class="row" style="width:70%; margin-left:1px; margin-right:2px;">
      <div class="table-responsive">
        <table class="table table-bordered">
          <tr>
            <th width="30">No</th>
            <th>Keterangan</th>
            <th>Jumlah</th>
          </tr>
          <tr>
            <td width="30">1</td>
            <td><?=$data['detail'][0]['accname']?></td>
            <td align="right"><?=$data['detail'][0]['jumlah']?></td>
          </tr>
           <tr>
            <td width="30">2</td>
            <td><?=$data['detail'][1]['accname']?></td>
            <td align="right"><?=$data['detail'][1]['jumlah']?></td>
          </tr>
           <tr>
            <td colspan="2">Total</td>
            <td align="right"><?=$data['detailtotal']?></td>
          </tr>
        </table>
      </div>
    </div>
<?php
}
?>

          </div>
  </div> <!-- panel -->
  

    </div><!-- container -->


      
  </body>
</html>
