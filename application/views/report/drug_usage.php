<link href="<?=base_url()?>/assets/css/reporting.css" rel="stylesheet">
<?php
if($option!='print')
{
    $borderstyle = "border-bottom: #E6E8E6; background-color: #B3E5FC;  border-bottom-width: thin; border-bottom-style: dotted; ";
} else {
    $borderstyle = null;
}
?>
<style>
    td {        
        font-size: <?=$fontsize?>px;
    }
    .blue_line {
        background-color: #EDF4F7; color: #333;
    }
</style>
<center>
<?php

    // $grand_total =$data->{'total_invoice_unpaid'}+$data->{'total_invoice_paid'};
      
  ?>
  <center>
                <h3><?= $unit ?></h3>
                <h1><?=$title?></h1> 
                <h5><?=$periode?></h5>   
                <!-- <h6><?=$subtitle?></h6>    -->
    </center>
    <br>
<?php
    if($drug_usage!=null){
?>    
<table class='tablereport' style="line-height: <?=$lineheight?>px;" width='100%' border='1' padding="0">
<tr style="background-color: #EDF4F7; color: #000; font-size: 12px;">
     <!-- <td><strong>No</strong></td> -->
     <td><strong>No Barang</strong></td>
     <td><strong>No Barcode</strong></td>
     <td><strong>Nama Barang/Obat</strong></td>
     <td><strong>Unit Usaha</strong></td>
     <td><strong>Tipe Transaksi</strong></td>
     <td><strong>Tanggal Transaksi</strong></td>
     <td><strong>Qty Awal</strong></td>
     <td><strong>Qty Transaksi</strong></td>
     <td><strong>Qty Akhir</strong></td>
     <td><strong>Catatan</strong></td>
</tr>    
<?php
    $i=0;
    foreach ($drug_usage as $key => $value) {
   
    if($value->{'type_adjustment'}==1){
        
        $type_adjustment = 'Order';

    }elseif ($value->{'type_adjustment'}==2) {
        
        $type_adjustment = 'Stock In By PO';
    
    }elseif ($value->{'type_adjustment'}==3) {

        $type_adjustment = 'Stock In By Cash';
    
    }elseif ($value->{'type_adjustment'}==4) {

        $type_adjustment = 'Stock Opname Plus';

    }elseif ($value->{'type_adjustment'}==5) {
        
        $type_adjustment = 'Stock Opname Minus';
    
    }elseif ($value->{'type_adjustment'}==6) {

        $type_adjustment = 'Sales Return';
    
    }elseif ($value->{'type_adjustment'}==7) {

        $type_adjustment = 'Purchase Return';

    }elseif ($value->{'type_adjustment'}==8) {
        
        $type_adjustment = 'Sales';
    
    }elseif ($value->{'type_adjustment'}==9) {

        $type_adjustment = 'Opening Balance ';
    
    }elseif ($value->{'type_adjustment'}==10) {

        $type_adjustment = 'Cancelation';

    }elseif ($value->{'type_adjustment'}==11) {
        
        $type_adjustment = 'Transfer Stock';
    
    }else{

        $type_adjustment =null;
    }   
?>
<tr>
     <!-- <td><?=$i++?></td>    -->
     <td><?=$value->{'no_sku'}?></td>
     <td><?=$value->{'no_barcode'}?></td>
     <td><?=$value->{'product_name'}?></td>
     <td><?=$value->{'business_name'}?></td>
     <td><?=$type_adjustment?></td> 
     <td><?=$value->{'datein'}?></td> 
     <td><?=$value->{'current_qty'}?></td>
     <td><?=$value->{'trx_qty'}?></td>
     <td><?=$value->{'new_qty'}?></td>
     <td></td>
</tr>
<?php
}    
?>
<?php
}
?>

<?php
if($option=='print')
{
    echo "<body onload=\"window.print()\">";
}
?>