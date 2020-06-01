<?php
// print_r($data);
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?=$title?></title>
    <link rel="stylesheet" href="<?=base_url()?>/assets/css/bootstrap.min.css">
    <link href="<?=base_url()?>/assets/css/print.css" rel="stylesheet">
</head>

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
          <h4>Tanggal Selesai: <?=$data['finished_date']?> <br>NO: #<?=$data['job_no']?></h4>
        </div>
      </div>
      
      <div class="row">
        <div class="col-xs-5">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4>Work Order</h4>
            </div>
            <div class="panel-body">
              <p>
              <div style="float:left;">Mulai:</div> <div style="float:right;"><?=$data['startdate_job']?></div> <br>
              <div style="float:left;">Selesai: </div> <div style="float:right;"><?=$data['finished_date']?> </div><br>
              <div style="float:left;">Penanggung Jawab: </div> <div style="float:right;"><?=$data['pic_name']?> </div><br>
              <div style="float:left;">Disetuji Oleh: </div> <div style="float:right;"><?=$data['approveby_name']?> </div><br>
              <div style="float:left;">Tanggal Permintaan: </div> <div style="float:right;"><?=$data['req_ship_date']?> </div><br>
              </p>
            </div>
          </div>
        </div>
        <div class="col-xs-5 col-xs-offset-2 text-right">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4>Konsumen</h4>
            </div>
            <div class="panel-body">
             <p>
              No Konsumen: <?=$data['nocustomer']?> <br>
              Nama Konsumen: <?=$data['namecustomer']?> <br>
              Alamat: <?=$data['address_customer']?> <br>
              Telepon: <?=$data['telephone_customer']?> <br>
              Handphone: <?=$data['handphone_customer']?> <br>
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
          <?php if(count($data['fg_list'])>0): ?>
            <table class="table table-bordered" style="width:99%; margin-left:1px; margin-right:2px;">
              <tr>
                <th width="30">No</th>  
                <th>Kode Barang</th>                       
                <th>Nama Barang</th>    
                <th>Qty</th>                 
                <th>Satuan Qty</th>
                <th>Ukuran</th>
                <th>Satuan Ukuran</th>
                <th>Qty Terima</th>
                <th>Gudang Terima</th>
                <th>Qty Reject</th>
                <th>Gudang Reject</th>
                <th>Qty Sisa</th>
              </tr>
              <?php foreach ($data['fg_list'] as $key => $value) : ?>
                <tr>
                  <td width="30"><?=$key+1?></td>
                  <td><?=$value['invno']?></td>
                  <td><?=$value['nameinventory']?></td> 
                  <td><?=$value['qty']?></td>   
                  <td><?=$value['short_desc']?></td>  
                  <td><?=$value['size']?></td>  
                  <td><?=$value['size_measurement']?></td>  
                  <td><?=$value['qty_accept']?></td>  
                  <td><?=$value['warehouse_code_accept']?></td>  
                  <td><?=$value['qty_reject']?></td>  
                  <td><?=$value['warehouse_code_reject']?></td>  
                  <td><?=$value['qty_sisa']?></td>  
                </tr>
              <?php endforeach; ?>
                       
            </table>
          <?php endif; ?>
        </table>
      </div>

    </div>
    </div> <!-- panel -->
  </div><!-- container -->
</body>
</html>
