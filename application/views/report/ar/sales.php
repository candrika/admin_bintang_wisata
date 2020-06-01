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
     <td><strong>No SO</strong></td>
     <td><strong>Tanggal</strong></td>
     <td><strong>No Invoice</strong></td>
     <td class="numberHeader"><strong>Subtotal</strong></td>
     <td class="numberHeader"><strong>DPP</strong></td>
     <td class="numberHeader"><strong>Pajak</strong></td>
     <td class="numberHeader"><strong>Total Ammount</strong></td>
     <td class="numberHeader"><strong>Total Paid</strong></td>
     <td class="numberHeader"><strong>OTSD Ammount</strong></td>
     <td><strong>Payment Term</strong></td>
     <td><strong>Remarks</strong></td>
</tr>
<?php $no = 1; ?>
<?php foreach($rows as $r): ?>
    <tr>
        <td><?=$no++?></td>
        <td><?=$r['no_sales_order']?></td>
        <td><?=$r['date_sales']?></td>
        <td><?=$r['noinvoice']?></td>
        <td class="number"><?=number_format($r['subtotal'],2)?></td>
        <td class="number"><?=number_format($r['total_dpp'],2)?></td>
        <td class="number"><?=number_format($r['tax'],2)?></td>
        <td class="number"><?=number_format($r['totalamount'],2)?></td>
        <td class="number"><?=number_format($r['paidtoday'],2)?></td>
        <td class="number"><?=number_format($r['balance'],2)?></td>
        <td><?=$r['payment_term']?></td>
        <td><?=$r['comments']?></td>
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