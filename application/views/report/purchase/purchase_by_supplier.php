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
     <td><strong>No Purchase</strong></td>
     <!-- <td><strong>Nama Supplier</strong></td>    -->
     <td><strong>Memo</strong></td>
     <td><strong>Tanggal Request</strong></td>  
     <td><strong>Tanggal PO</strong></td>
     <td><strong>Tanggal Terima</strong></td>
     <td><strong>Total Qty Order</strong></td>
     <td><strong>Total Qty Terima</strong></td>
     <td><strong>Total Diskon</strong></td>
     <td><strong>Total Pajak</strong></td>
     <td><strong>Subtotal</strong></td>     
     <td><strong>Grand Total</strong></td>
     <td><strong>Uang Muka</strong></td>
     <td><strong>Saldo Terhutang</strong></td>
     <td><strong>Status Pembelian</strong></td>
     <td><strong>Status Invoice</strong></td>
</tr>
<?php $no = 1; ?>
<?php foreach($rows as $r): ?>
    <tr>
        <td><?=$no++?></td>
        <td><?=$r['nopurchase']?></td>
        <td><?=$r['memo']?></td>
        <td><?=$r['date_req']?></td>
        <td><?=$r['date']?></td>
        <td><?=$r['delivereddate']?></td>
        <td class="number"><?=number_format($r['totalorder'],2)?></td>
        <td class="number"><?=number_format($r['totalreceived'],2)?></td>
        <td class="number"><?=number_format($r['total_diskon'],2)?></td>
        <td class="number"><?=number_format($r['tax'],2)?></td>
        <td class="number"><?=number_format($r['subtotal'],2)?></td>
        <td class="number"><?=number_format($r['totalamount'],2)?></td>
        <td class="number"><?=number_format($r['paidtoday'],2)?></td>
        <td class="number"><?=number_format($r['balance'],2)?></td>
        <td><?=$r['idpurchasestatusname']?></td>
        <td><?=$r['status_invoice']?></td>
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