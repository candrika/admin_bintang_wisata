<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?=$title?></title>
    <link rel="stylesheet" href="<?=base_url()?>/assets/css/bootstrap.min.css">
    <link href="<?=base_url()?>/assets/css/print.css" rel="stylesheet">

    <style>
   
    </style>
</head>

<?php
if($print) { echo "<body onload=\"window.print()\">"; } else { echo "<body>"; }
?>

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
          <h3><small>Requested Date: <?=$data['datetrans']?> <br>NO: #<?=$data['no']?></small></h3>
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
              <h4>Ordered To: <?//=$data['namesupplier']?></h4>
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
           <td width="22%"><b>Item List:</b></td>
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
                          <th>No SKU</th>                       
                          <th>Item Name</th>                     
                          <!-- <th>Price</th> -->
                          <th>Qty</th>
                          <th>Measurement</th>
                          <!-- <th>Discount(%)</th> -->
                          <!-- <th>Tax %</th> -->
                           <!-- <th>Total</th> -->
                        </tr>
                        <?php
                        // print_r($data['detail']);
                        $i=1;
                        foreach ($data['detail'] as $key => $value) {
                           ?>
                             <tr>
                              <td width="30"><?=$i?></td>
                              <td><?=$value['sku_no']?></td>
                              <td><?=$value['nameinventory']?></td>  
                              <td align="right"><?=$value['qty']?></td>
                              <td><?=$value['short_desc']?></td>
                              <?php //if($data['totaltax']!=0) { echo "<td>".$value['ratetax']."</td>"; } ?>
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
                 
              </table>
          <table>
               <tr>
                 <td width="22%"><b> Notes:</b></td>
                 <td width="50%"><?=$data['memo']?></td>
               </tr>
               <tr>
                 <td width="22%"><b> Request By:</b></td>
                 <td width="50%"><?=$data['requestby']?></td>
               </tr>
        </table>
      </div>


      
      <div class="row">
        <div class="col-xs-6">
         
        </div>
        <div class="col-xs-6 text-right">
          <!-- <b>Operator<br><?=$data['receivedby']?></b> -->
        </div>
      </div>




          </div>
  </div> <!-- panel -->
  

    </div><!-- container -->


      
  </body>
</html>
