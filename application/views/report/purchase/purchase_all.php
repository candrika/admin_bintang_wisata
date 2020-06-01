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
     <td><strong>Nama Supplier</strong></td>   
     <td><strong>Memo</strong></td>
     <td><strong>Tanggal PO</strong></td>
     <td><strong>Tanggal Terima</strong></td>
     <td><strong>Total Qty Order</strong></td>
     <td><strong>Total Qty Terima</strong></td>
     <td><strong>Subtotal</strong></td>     
     <td><strong>Total Pajak</strong></td>
     <td><strong>Total Biaya Angkut</strong></td>
     <td><strong>Grand Total</strong></td>
     <td><strong>Saldo Terhutang</strong></td>
     <td><strong>Status Pembelian</strong></td>
</tr>
<?php 
    $no = 1; 
    $total_qty_order = 0;
    $total_qty_received = 0;
    $total_dpp = 0;
    $total_tax = 0;
    $total_freightcost = 0;
    $total_totalamount = 0;
    $total_balance = 0;
?>
<?php foreach($rows as $r): ?>
    <tr>
        <td><?=$no++?></td>
        <td><?=$r['nopurchase']?></td>
        <td><?=$r['namesupplier']?></td>
        <td><?=$r['memo']?></td>
        <td><?=$r['po_date']?></td>
        <td><?=$r['delivereddate']?></td>
        <td class="number"><?=number_format($r['total_qty_order'],2)?></td>
        <td class="number"><?=number_format($r['total_qty_received'],2)?></td>
        <td class="number"><?=number_format($r['dpp'],2)?></td>
        <td class="number"><?=number_format($r['tax'],2)?></td>
        <td class="number"><?=number_format($r['freightcost'],2)?></td>
        <td class="number"><?=number_format($r['totalamount'],2)?></td>
        <td class="number"><?=number_format($r['balance'],2)?></td>
        <td><?=$r['po_status']?></td>
    </tr>
    <?php
        $total_qty_order += $r['total_qty_order'];
        $total_qty_received += $r['total_qty_received'];
        $total_dpp += $r['dpp'];
        $total_tax += $r['tax'];
        $total_freightcost += $r['freightcost'];
        $total_totalamount += $r['totalamount'];
        $total_balance += $r['balance'];
    ?>
<?php endforeach ?>
    <tr>
        <td colspan="6"><strong>Grand Total: </strong></td>
        <td class="number"><strong><?= number_format($total_qty_order,2)?></strong></td>
        <td class="number"><strong><?= number_format($total_qty_received,2)?></strong></td>
        <td class="number"><strong><?= number_format($total_dpp,2)?></strong></td>
        <td class="number"><strong><?= number_format($total_tax,2)?></strong></td>
        <td class="number"><strong><?= number_format($total_freightcost,2)?></strong></td>
        <td class="number"><strong><?= number_format($total_totalamount,2)?></strong></td>
        <td class="number"><strong><?= number_format($total_balance,2)?></strong></td>
        <td>&nbsp;</td>
    </tr>
</table>
    
</body>

<?php
if($option=='print')
{
    echo "<body onload=\"window.print()\">";
}
?>