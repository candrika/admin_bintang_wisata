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
    </center>
    <table class='tablereport' style="line-height: <?=$lineheight?>px;" width='70%' border='0' padding="0">
    <tr>
        <td><b>Nama Barang</b></td>
        <td>:</td>   
        <td><?php echo $inv_data['nameinventory']==null ? $inv_data['nameinventory_parent'] : $inv_data['nameinventory'] ; ?></td>
        <td>&nbsp;</td>
        <td><b>Periode Awal</b></td>     
        <td>:</td>
        <td><?=$startdate?></td>
    </tr>
    <tr>
        <td><b>No SKU</b></td>
        <td>:</td>   
        <td><?php echo $inv_data['sku_no']==null ? $inv_data['sku_no_parent'] : $inv_data['sku_no'] ; ?></td>
        <td>&nbsp;</td>
        <td><b>Periode Akhir</b></td>     
        <td>:</td>
        <td><?=$enddate?></td>
    </tr>
    <tr>
        <td><b>Kode Barang</b></td>
        <td>:</td>   
        <td><?php echo $inv_data['invno']==null ? $inv_data['invno_parent'] : $inv_data['invno'] ; ?></td>
        <td>&nbsp;</td>
        <td> </td>     
        <td> </td>
        <td> </td>
    </tr>
    </table>

<table class='tablereport' style="line-height: <?=$lineheight?>px;" width='<?=$tablewidth?>' border='0' padding="0">
<tr style="background-color: #EDF4F7; color: #000; font-size: 12px;">
     <td><strong>No</strong></td>
     <td><strong>Tanggal Transaksi</strong></td>   
     <td><strong>Tipe Transaksi</strong></td>
     <td><strong>Deskripsi</strong></td>
     <td><strong>Gudang</strong></td>     
     <td align="right"><strong>Qty Transaksi</strong></td>
     <td align="right"><strong>Saldo</strong></td>
</tr>
<?php $no = 1; ?>
<?php foreach($rows as $r): ?>
    <tr>
        <td><?=$no++?></td>
        <td><?=$r['tanggal']?></td>  
        <td><?=$r['type_adjustment']?></td>
        <td><?=$r['notes']?></td>
        <td><?=$r['warehouse_code']?></td>
        <td class="number"><?=number_format($r['qty_transaction'],2)?></td>
        <td class="number"><?=number_format($r['balance'],2)?></td>
        
    </tr>
<?php endforeach ?>
</table>
    
<table class='tablereport' style="line-height: <?=$lineheight?>px;" width='30%' border='0' padding="0">
<tr>
    <td>Saldo Awal</td>     
    <td>:</td>
    <td><?=$saldo_awal?></td>
</tr>
<tr>
    <td>Saldo Akhir</td>     
    <td>:</td>
    <td><?=$saldo_akhir?></td>
</tr>
</table>

</body>

<?php
if($option=='print')
{
    echo "<body onload=\"window.print()\">";
}
?>