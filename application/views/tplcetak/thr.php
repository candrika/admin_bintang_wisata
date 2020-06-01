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
            <!-- <img src="<?=base_url()?>/assets/images/<?=$logo?>" width="100"/> -->
            <?=$this->logo?>
          </h1>
        </div>
        <div class="col-xs-6 text-right">
          <h2><?=$title?></h2>
          <h3><small>NO: #<?=$no?></small></h3>
        </div>
      </div>
      
     <div class="row" style="margin-left:1px;">
        <address>
          <strong><?=$namaunit?></strong><br>
          <?=$alamat?>
        </address> 
      </div>
      
      
      <div class="row" style="margin-left:1px;">
        <table class="table borderless" >
         <tr>
           <td width="22%"><b> Nama Pegawai:</b></td>
           <td width="50%"><?=$data->lastname?></td>
         </tr>
         <tr>
           <td width="22%"><b> Jabatan/Posisi:</b></td>
           <td width="50%"><?=$data->nametype?></td>
         </tr>
         <tr>
           <td width="22%"><b> Jumlah THR:</b></td>
           <td width="50%"><?=number_format($data->jumlahthr)?></td>
         </tr>
         <tr>
           <td width="22%"><b> THR Tambahan:</b></td>
           <td width="50%"><?=number_format($data->thrtambahan)?></td>
         </tr>
         <tr>
           <td width="22%"><b> Total Pembayaran THR:</b></td>
           <td width="50%"><?=number_format($data->totalthr)?></td>
         </tr>
        </table>
      </div>
      
      <div class="row">
        <div class="col-xs-6">
          <b>Terbilang: <?=terbilang($data->totalthr)?></b>
        </div>
        <div class="col-xs-6 text-right">
          <b><?=backdate2($data->tglthr)?></b>
        </div>
      </div>




          </div>
  </div> <!-- panel -->
  

    </div><!-- container -->


      
  </body>
</html>
