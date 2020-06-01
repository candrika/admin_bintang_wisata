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
                <h5><?= $periode ?></h5>   
    </center><br>
<?php
    if($pharmacy_receipt!=null){
?>    
<table class='tablereport' style="line-height: <?=$lineheight?>px;" width='50%' border='0' padding="0">
<?php
    foreach ($pharmacy_receipt as $key => $value) {
    // print_r($value);
?>
<tr class="blue_line">
    <td style="width: 50%;"><?=$value->{'medical_status'}?></td>
    <td style="width: 5%;">:</td>
    <td style="width: 55%; text-align:right;"><b><?=$value->{'count'}?></b></td>
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