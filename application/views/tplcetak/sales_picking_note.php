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
          <h4><small>Tanggal Order: <?=$data['datetrans']?> <br>NO: #<?=$data['no']?></small></h4>
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
        <div class="col-xs-5 col-xs-offset-2 text-right">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4>Customer</h4>
            </div>
            <div class="panel-body">
             <p>
                <?=$data['customer']['namecustomer'].'<br>'.
                $data['customer']['address']?> <br>
                Phone: <?=$data['customer']['telephone']?> <br>
                Mobile: <?=$data['customer']['handphone']?> <br>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="row" style="margin-left:1px;">
        <table class="table borderless" >
        
          <tr>
            <td colspan="2"><b>Item List:</b></td>
          </tr>
          <?php if($data['detail']!=null): ?>
            <table class="table table-bordered" style="width:99%; margin-left:1px; margin-right:2px;">
              <tr>
                <th width="30">No</th>  
                <th>Item Code</th>                       
                <th>Item Name</th>                     
                <th>Qty Order</th>
                <th>Measurement</th>
                <th>Size/Length</th>
                <th>Measurement</th>
                <th>Total</th>
                <th>Warehouse</th>
                <th>Qty Ambil</th>
              </tr>
              <?php foreach ($data['detail'] as $key => $value) : ?>
                <tr>
                  <td width="30"><?=$key+1?></td>
                  <td><?=$value['invno']?></td>
                  <td><?=$value['nameinventory']?></td>  
                  <td align="right"><?=$value['qty']?></td>
                  <td><?=$value['short_desc']?></td>
                  <td align="right"><?=$value['size']?></td>
                  <td><?=$value['size_measurement']?></td>
                  <td align="right"><?=number_format($value['qty']*$value['size'])?></td>
                  <td></td>
                  <td></td>
                </tr>
              <?php endforeach;?>
            </table>
          <?php endif; ?>
          <table class="table borderless" style="width:99%; margin-top:-20px; margin-left:1px; margin-right:2px;">
            <?php if($data['dp']!=0): ?>
              <tr>
                <td></td>
                  <td> </td>
                <td align="right"><b>Uang Muka/Terbayar (-)</b></td>
                <td align="right"><?=number_format($data['dp'])?></td>
              </tr>
            <?php endif; ?>          
            <?php if($data['totalowed']!=0) : ?>
              <tr>
                <td></td>
                  <td> </td>
                <td align="right"><b>Saldo Terhutang</b></td>
                <td align="right"><?=number_format($data['totalowed'])?></td>
              </tr>
            <?php endif; ?>          
          </table>
        </table>
      </div>
      
      <div class="row">
        <div class="col-xs-4">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4>Notes</h4>
            </div>
            <div class="panel-body">
              <p>&nbsp;</p><p>&nbsp;</p>
            </div>
          </div>
        </div>
        <div class="col-xs-4 ">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4>Prepared By</h4>
            </div>
            <div class="panel-body">
              <p>&nbsp;</p><p>&nbsp;</p>
            </div>
          </div>
        </div>
        <div class="col-xs-4 ">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4>Approved By</h4>
            </div>
            <div class="panel-body">
             <p>&nbsp;</p><p>&nbsp;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div> <!-- panel -->
    </div><!-- container -->  
  </body>
</html>
