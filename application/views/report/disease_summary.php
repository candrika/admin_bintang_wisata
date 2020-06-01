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
    if($disease_summary!=null){
?>    
<table class='tablereport' style="line-height: <?=$lineheight?>px;" width='50%' border='1' padding="0">
<tr class="blue_line">    
    <td  style="width: 50%;" align="center">Jenis Penyakit</td>
    <td  style="width: 50%;" align="center">Jumlah Pasien</td>   
</tr>    
<?php
    foreach ($disease_summary as $key => $value) {
    // print_r($value);
?>
<tr >
    <td style="width: 50%;"><?=$value->{'disease_name'}?></td>
    <td style="width: 50%; text-align:right;"><b><?=$value->{'count_disease'}?></b></td>
</tr>
<?php
}    
?>
</table>
<?php
}
?>

<?php
if($option=='print')
{
    echo "<body onload=\"window.print()\">";
}
?>