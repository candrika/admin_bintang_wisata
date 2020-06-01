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
     <td><strong>Kode Barang</strong></td>
     <td><strong>No SKU</strong></td>
     <td><strong>Nama Barang</strong></td>
     <td><strong>Harga Beli</strong></td>
     <td><strong>Stock</strong></td>
     <td><strong>Satuan</strong></td>
     <td><strong>Stock #2</strong></td>
     <td><strong>Satuan #2</strong></td>
</tr>
<?php $no = 1; ?>
<?php foreach($rows as $r): ?>
    <tr>
        <td><?=$no++?></td>
        <td><?=$r['invno']==null ? $r['invno_parent'] : $r['invno']?></td>
        <td><?=$r['sku_no']==null ? $r['sku_no_parent'] : $r['sku_no']?></td>
        <td><?=$r['nameinventory']==null ? $r['nameinventory_parent'] : $r['nameinventory']?></td>
        <td class="number"><?=number_format($r['cost'],2)?></td>
        <td class="number"><?=number_format($r['stock'],2)?></td>
        <td><?=$r['satuan']?></td>
        <td class="number"><?=$r['stock_kedua'] != null ? number_format($r['stock_kedua'],2) : '-'?></td>
        <td><?=$r['satuan_kedua']?:'-'?></td>
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