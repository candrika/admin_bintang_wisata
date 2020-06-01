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
            <!-- <img src="<?=base_url()?>/assets/images/<?=$data['logo']?>" width="200"/> -->
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
              <h4>Supplier: <?=$data['namesupplier']?></h4>
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
           <td width="22%"><b>Pembelian:</b></td>
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
                          <th>Keterangan</th>
                           <?php
                          if($data['totaltax']!=0)
                          {
                            $colspan=3;
                            echo "<th>Pajak %</th>";
                          } else {
                             $colspan=3;
                          }
                          ?>
                          <th>Qty</th>
                          <th>Harga</th>
                          <th>Subtotal</th>
                        </tr>
                        <?php
                        // print_r($data['detail']);
                        $i=1;
                        foreach ($data['detail'] as $key => $value) {
                           ?>
                             <tr>
                              <td width="30"><?=$i?></td>
                              <td><?=$value['accname']?></td>
                              <?php
                              if($data['totaltax']!=0)
                              {
                                echo "<td>".$value['tax']."</td>";
                              }
                              ?>
                              <td align="right"><?=$value['qty']?></td>
                              <td align="right"><?=$value['price']?></td>
                              <td align="right"><?=$value['jumlah']?></td>
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
                      <td align="right"><b>Subtotal</b></td>
                      <td align="right" width="200"><?=$data['detailtotal']?></td>
                    </tr>
                 <?php
                   if($data['totaltax']!=0)
                    {
                      ?>
                      <tr>
                        <td></td>
                         <td> </td>
                        <td align="right"><b>Biaya Angkut (+)</b></td>
                        <td align="right"><?=number_format($data['freigthcost'])?></td>
                      </tr>
                    <?php
                    }
                    if($data['totaltax']!=0)
                    {
                      ?>
                      <tr>
                        <td></td>
                         <td> </td>
                        <td align="right"><b>Pajak (+)</b></td>
                        <td align="right"><?=number_format($data['totaltax'])?></td>
                      </tr>
                    <?php
                    }                    
                    ?>
                     <tr>
                      <td></td>
                       <td> </td>
                      <td align="right"><b>Total Dibayar</b></td>
                      <td align="right" width="200"><?=$data['total']?></td>
                    </tr>
                    <?php if($data['dp']!=0)
                    {
                      ?>
                      <tr>
                        <td></td>
                         <td> </td>
                        <td align="right"><b>Uang Muka (-)</b></td>
                        <td align="right"><?=number_format($data['dp'])?></td>
                      </tr>
                    <?php
                    }
                    if($data['totalowed']!=0)
                    {
                      ?>
                      <tr>
                        <td></td>
                         <td> </td>
                        <td align="right"><b>Saldo Terhutang</b></td>
                        <td align="right"><?=number_format($data['totalowed'])?></td>
                      </tr>
                    <?php
                    }
                    ?>
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
