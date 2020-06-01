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
     <td><strong>Akun</strong></td>
     <td><strong>No Akun</strong></td>
     <td><strong>Akun Kena Hutang</strong></td>
     <td><strong>No Akun Kena Hutang</strong></td>
     <td><strong>Supplier</strong></td>
     <td><strong>Tanggal</strong></td>
     <td><strong>Jatuh Tempo</strong></td>
     <td><strong>Jumlah</strong></td>
     <td><strong>Sisa</strong></td>
     <td><strong>Memo</strong></td>
     
</tr>
<?php $no = 1; ?>
<?php foreach($rows as $r): ?>
    <tr>
        <td><?=$no++?></td>
        <td><?=$r['accnamehutang']?></td>
        <td><?=$r['accnumberhutang']?></td>
        <td><?=$r['accnamekenahutang']?></td>
        <td><?=$r['accnumberkenahutang']?></td>
        <td><?=$r['namesupplier']?></td>
        <td><?=$r['mulaihutang']?></td>
        <td><?=$r['jatuhtempo']?></td>
        <td class="number"><?=number_format($r['jumlah'],2)?></td>
        <td class="number"><?=number_format($r['sisahutang'],2)?></td>
        <td><?=$r['memo']?></td>
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