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
          <h2><?=$title?></h2>
          <h3><small>Tanggal: <?=$data['datetrans']?> <br>NO: #<?=$data['no']?></small></h3>
        </div>
      </div>
      
      <div class="row">
        <div class="col-xs-5">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4>Unit: <?=$data['namaunit']?></h4>
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
              <h4>Supplier/Vendor: <?=$data['namesupplier']?></h4>
            </div>
            <div class="panel-body">
              <p>
                <?=$data['companyaddress']?> <br>
                Phone: <?=$data['telephone']?> <br>
                Fax: <?=$data['fax']?> <br>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="row" style="margin-left:1px;">
        <table class="table borderless" >
        
         <tr>
           <td width="22%"><b>Daftar Retur:</b></td>
           <td width="50%"></td>
         </tr>
         <?php
         // echo $data['totaltax'];

              if($data['detail']!=null)
              {
              ?>
                      <table class="table table-bordered" style="width:99%; margin-left:1px; margin-right:2px;">
                        <tr>
                          <th width="30">No</th>                         
                          <th>No Barang</th>
                          <th>Nama Barang</th>
                          <th>Qty Retur</th>
                          <th>Jumlah Retur</th>
                        </tr>
                        <?php
                        // print_r($data['detail']);
                        $i=1;
                        foreach ($data['detail'] as $key => $value) {
                           ?>
                             <tr>
                              <td width="30"><?=$i?></td>
                              <td><?=$value['invno']?></td>
                              <td><?=$value['nameinventory']?></td>
                              <td align="right"><?=$value['qtyretur']?></td>
                              <td align="right"><?=$value['returnamount']?></td>
                            </tr>
                           <?php
                         
                           $i++;
                          }
                        ?>
                       
                      </table>
              <?php
              }
              ?>

              <table class="table borderless" style="width:99%; margin-top:-20px; margin-left:1px; margin-right:2px;">
                  <tr>
                      <td></td>
                       <td> </td>
                      <td align="right"><b>Total</b></td>
                      <td align="right" width="200"><?=$data['detailtotal']?></td>
                    </tr>
              </table>
         <tr>
           <td width="22%"><b> Memo:</b></td>
           <td width="50%"><?=$data['memo']?></td>
         </tr>
        </table>
      </div>
      
      <div class="row">
        <div class="col-xs-6">
          <b>Terbilang: </b><?=$data['terbilang']?>
        </div>
        <div class="col-xs-6 text-right">
          <b>Operator<br><?=$data['receivedby']?></b>
        </div>
      </div>




          </div>
  </div> <!-- panel -->
  

    </div><!-- container -->


      
  </body>
</html>
