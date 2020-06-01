<link href="<?=base_url()?>/assets/css/reporting.css" rel="stylesheet">
<?php
if($option!='print')
{
    $borderstyle = "border-bottom: #E6E8E6; background-color: #EDF4F7;  border-bottom-width: thin; border-bottom-style: dotted; ";
} else {
    $borderstyle = null;
}
?>
<style>
    td {        
        font-size: <?=$fontsize?>px;
    }
</style>
<body>
<center>
    
    <center>
        <br><br> 
                <h1><?=$title?></h1>        
                <h3><?=$unit?></h3><br>
                <h5><?=$periode?></h5>
    </center>
    

<table class='tablereport' style="line-height: <?=$lineheight?>px;" width='<?=$tablewidth?>' border='0' padding="0">

<tr style="background-color: #EDF4F7; color: #000; font-size: 12px;">
     <td><strong>No</strong></td>
     <td><strong>NO SKU</strong></td>
     <td><strong>Nama Barang</strong></td>
     <td><strong>Qty</strong></td>
     <td><strong>Satuan</strong></td>
     <td><strong>Sales</strong></td>
</tr>
<?php $no = 1; ?>
<?php foreach($rows as $r): ?>
    <tr>
        <td><?=$no++?></td>
        <td><?=$r['sku_no']?></td>
        <td><?=$r['nameinventory']?></td>
        <td class="number"><?=number_format($r['qty'])?></td>
        <td><?=$r['measurement']?></td>
        <td class="number"><?=number_format($r['sales'],2)?></td>
    </tr>
<?php endforeach ?>


</table>
    
</body>

<?php
if($option=='print')
{
    echo "<body onload=\"window.print()\">";
}
?>