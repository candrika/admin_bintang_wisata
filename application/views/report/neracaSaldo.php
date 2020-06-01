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
</style>
<center>
   
  <center>
                <h3><?= $unit ?></h3>
                <h1>NERACA SALDO</h1> 
                <h6><?= $periode ?></h6>   
            </center><br>
<table class='tablereport' style="line-height: <?=$lineheight?>px;" width='80%' border='0' padding="0">
<tr style="background-color: #EDF4F7; color: #000; font-size: ".$fontsize."px;">
    <td><b>Kode Rekening</b></td>
    <td><b>Nama Rekening</b></td>
    <td><center><b>Debit</b></center></td>
    <td><center><b>Kredit</b></center></td>
    <td><center><b>Saldo</b></center></td>
</tr>
<?php
$data = array('arrKas','arrUtang','arrEkuitas','arrPendapatan','arrBiaya');
$totaldebit=0;
$totalcredit=0;
foreach ($data as $v) {
   
    foreach ($$v as $value) {
            ?>
            <tr>
                <td><?=$value['accnumber']?></td>
                <td><?=$value['accname']?></td>
                <td><div align="right"><?=  number_field($value['debit'])?></div></td>
                <td><div align="right"><?=  number_field($value['credit'])?></div></td>
                <td><div align="right"><?=  $value['saldo']?></div></td>
            </tr>
        <?php
        $totaldebit+=$value['debit'];
        $totalcredit+=$value['credit'];
    }
}
?>
 <tr>
     <td class="trsummary" colspan="2"><center><b>TOTAL</b></center></td>
    <td class="trsummary"><div align="right"><?=  number_field($totaldebit)?></div></td>
    <td class="trsummary"><div align="right"><?=  number_field($totalcredit)?></div></td>
    <td class="trsummary"><div align="right"><?=  number_field($totalsaldo)?></div></td>
</tr>
<?php
if($option=='print')
{
    echo "<body onload=\"window.print()\">";
}
?>