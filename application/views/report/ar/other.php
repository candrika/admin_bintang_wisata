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
     <td><strong>Akun Piutang</strong></td>
     <td><strong>Akun Terima Piutang</strong></td>
     <td><strong>Tanggal</strong></td>
     <td><strong>Customer</strong></td>
     <td><strong>Jumlah</strong></td>
     <td><strong>Sisa</strong></td>
     <td><strong>Deskripsi</strong></td>
</tr>
<?php $no = 1; ?>
<?php foreach($rows as $r): ?>
    <tr>
        <td><?=$no++?></td>
        <td><?=$r['accnamepiutang']?></td>
        <td><?=$r['accname_terimapiutang']?></td>
        <td><?=$r['tglpiutang']?></td>
        <td><?=$r['namecustomer']?></td>
        <td class="number"><?=number_format($r['jumlah'],2)?></td>
        <td class="number"><?=number_format($r['sisapiutang'],2)?></td>
        <td><?=$r['description']?></td>
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