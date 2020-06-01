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
    if($rekap_pasien!=null){
?>    
<table class='tablereport' style="line-height: <?=$lineheight?>px;" width='50%' border='1' padding="0">
<tr class="blue_line">
    <td align="center">Jenis Pasien</td>
    <td align="center">Jumlah</td>
</tr>

<?php
    $jumlah = 0;
    foreach ($rekap_pasien as $value) {
    $jumlah += $value->{'patient_count'}; 
?>
<tr>

    <td>Pasien&nbsp;<?=$value->{'unit'}?></td>
    <td align="right"><?=$value->{'patient_count'}?></td>
</tr>

<?php
}
?>
<tr>

    <td>Total Pasien</td>
    <td align="right"><?=$jumlah?></td>
</tr>
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