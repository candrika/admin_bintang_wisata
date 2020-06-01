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
     <td><strong>Tgl SO</strong></td>
     <td><strong>No SO</strong></td>
     <td><strong>Tgl Inv.</strong></td>
     <td><strong>No Inv.</strong></td>
     <td><strong>Customer</strong></td>
     <td><strong>Total</strong></td>
     <td><strong>Terbayar</strong></td>
     <td><strong>Sisa</strong></td>
</tr>
<?php $no = 1; ?>
<?php foreach($rows as $r): ?>
    <tr>
        <td><?=$no++?></td>
        <td><?=$r['date_sales']?></td>
        <td><?=$r['no_sales_order']?></td>
        <td><?=$r['invoice_date']?></td>
        <td><?=$r['noinvoice']?></td>
        <td><?=$r['namecustomer']?></td>
        <td class="number"><?=number_format($r['totalamount'],2)?></td>
        <td class="number"><?=number_format($r['paidtoday'],2)?></td>
        <td class="number"><?=number_format($r['balance'],2)?></td>
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