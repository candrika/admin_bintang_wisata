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
<body>
    
<center>
    <table class='tablereport' style="line-height: <?=$lineheight?>px;" width='80%' border='0' padding="0">
    <tr>
        <td colspan="5"> 
            <center>
            <br><br> 
                <h1>GENERAL LEDGER</h1>        
                <h3><?= $unit ?></h3><br>
                <h5><?= $periode ?></h5>
            </center>
        </td>
    </tr>

    <?php
    foreach ($acclist as $value) {
        ?>
        <tr style="background-color: #EDF4F7; color: #000; font-size: 12px;">
            <td><b><?=$value['accnumber']?></td>
            <td colspan="5"><b><?=$value['accname']?></b></td>
        </tr>

        <tr>
            <td><b>Tanggal</td>
            <td><b>No Ref</td>
            <td><b>Keterangan</td>
            <td><div  style="float: right;"><b>Debit</div></td>
            <td><div  style="float: right;"><b>Kredit</div></td>
        </tr>

        <?php
        $totaldebit=0;
        $totalcredit=0;
            foreach ($value['transaction'] as $vtr) { 
        ?>
            <tr>
                <td><?=$vtr['datejournal']?></td>
                <td><?=$vtr['nojournal']?></td>
                <td><?=$vtr['memo']?></td>
                <td><div  style="float: right;"><?=number_field($vtr['debit'])?></div></td>
                <td><div  style="float: right;"><?=number_field($vtr['credit'])?></div></td>
            </tr>
        <?php
                $totaldebit+=$vtr['debit'];
                $totalcredit+=$vtr['credit'];
            }
            
           if($vtr['idaccounttype']==12 || $vtr['idaccounttype']==16 || $vtr['idaccounttype']==11)
           {
            //pendapatan
            $mutasi = $totalcredit-$totaldebit;
           } else {
            $mutasi = $totaldebit-$totalcredit;
           }
           
           $newbalance = $mutasi+$value['balance'];
           
        ?>
            <tr>
                <td><b>Saldo Awal:<div  style="float: right;"><b><?=number_field($value['balance'])?></div></td>
                <td></td>
                <td><div  style="float: right;"><b>Total:</div></td>
                <td><div  style="float: right;"><b><?=number_field($totaldebit)?></div></td>
                <td><div  style="float: right;"><b><?=number_field($totalcredit)?></div></td>
            </tr>
            <tr>
                <td><b>Saldo Akhir: <div  style="float: right;"><b><?=number_field($newbalance)?></div></td>
                <td></td>
                <td><div  style="float: right;"><b>Mutasi:</div></td>
                <td><div  style="float: right;"><b><?=number_field($mutasi)?></div></td>
                <td></td>
            </tr>
        
        <tr><td colspan="5">&nbsp;</td></tr>
    <?php
    }
    ?>
    
    
</table>
    
</body>

<?php
if($option=='print')
{
    echo "<body onload=\"window.print()\">";
}
?>