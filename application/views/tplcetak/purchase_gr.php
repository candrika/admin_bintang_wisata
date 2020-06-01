<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?=$title?></title>
    <link rel="stylesheet" href="<?=base_url()?>/assets/css/bootstrap.min.css">
    <link href="<?=base_url()?>/assets/css/print.css" rel="stylesheet">
</head>

<?php
//if($print) { echo "<body onload=\"window.print()\">"; } else { echo "<body>"; }
?>
<body>
    <div class="container">

      <div class="panel panel-info">
      <div class="panel-body">
      <div class="row">
        <div class="col-xs-5">
          <h1>
            <?=$this->logo?>
          </h1>
        </div>
        <div class="col-xs-5 col-xs-offset-2 text-right">
          <h3><?=$title?></h3>
          <h4>Tanggal Terima: <?=backdate2($data['datetrans'])?> <br>NO: #<?=$data['no']?></h4>
        </div>
      </div>
      
      <div class="row">
        <div class="col-xs-5">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4><?=$data['namaunit']?></h4>
            </div>
            <div class="panel-body">
              <p>
              <?=$data['alamat']?> <br>
                Phone: <?=$data['telp']?> <br>
                Fax: <?=$data['fax']?> <br>
              </p>
            </div>
          </div>
        </div>
        <div class="col-xs-5 col-xs-offset-2">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4>Supplier: </h4>
            </div>
            <div class="panel-body">
             <p>
                <?=$data['supplier']['namesupplier'].'<br>'.
                $data['supplier']['companyaddress']?> <br>
                Phone: <?=$data['supplier']['telephone']?> <br>
                Fax: <?=$data['supplier']['fax']?> <br>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="row" style="margin-left:1px;">
        <table class="table borderless" >
          <tr>
            <td colspan="2"></td>
          </tr>
          <?php if($data['detail']!=null) : ?>
            <table class="table table-bordered" style="width:99%; margin-left:1px; margin-right:2px;">
              <thead>
                <tr>
                  <th width="30">NO</th>  
                  <th>NO SKU</th>   
                  <th>KD BRG</th>                       
                  <th>NAMA BRG</th>    
                  <th width="80">KD COIL SUPP</th>
                  <th width="80">QTY TERIMA</th>
                  <th>SATUAN</th>
                  <th width="30">KD GDG</th>
                  <th>NOTES</th>
                </tr>
              </thead>
              <tbody>
              <?php foreach ($data['detail'] as $key => $value) : ?>
                <tr>
                  <td width="30"><?=$key+1?></td>
                  <td><?=$value['sku_no']?></td>
                  <td><?=$value['invno']?></td>
                  <td><?=$value['nameinventory']?></td>  
                  <td><?=$value['notes']?></td>
                  <td align="right"><?=number_format($value['qty'],2)?></td>
                  <td><?=$value['short_desc']?></td>
                  <td><?=$value['whcode']?></td>
                  <td><?=$value['notes']?></td>
                </tr>
              <?php endforeach;?> 
              </thead>        
            </table>
          <?php endif; ?>
          
        </table>
      </div>

      <p>&nbsp;</p>
      <div class="row">
        <div class="col-xs-4 ">
          <div class="panel panel-default">
            <div class="panel-heading">
              <p style="text-align: center;">Diterima oleh</p>
            </div>
            <div class="panel-body">
              <br><br><br><br>
              <p>
                By: <?=$data['header']->receiver?><br>
                At: <?=backdate2($data['header']->received_date)?><br>
              </p>
            </div>
          </div>
        </div>
        <div class="col-xs-4 ">
          <div class="panel panel-default">
            <div class="panel-heading">
              <p style="text-align: center;">Dikonfirmasi oleh</p>
            </div>
            <div class="panel-body">
              <br><br><br><br>
              <p>
                By: <?=$data['header']->confirmed_by?><br>
                At: <?=date('d-m-Y', strtotime($data['header']->confirmed_date))?><br>
              </p>
            </div>
          </div>
        </div>
        <div class="col-xs-4 ">
          <div class="panel panel-default">
            <div class="panel-heading">
              <p style="text-align: center">Catatan</p>
            </div>
            <div class="panel-body">
            <p>
              <?=$data['header']->notes?>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> <!-- panel -->
  </div><!-- container -->
  </body>
</html>
