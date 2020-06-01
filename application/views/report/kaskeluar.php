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
                <h1>JURNAL KAS KELUAR</h1>        
                <h3><?= $unit ?></h3><br>
                <h5><?= $periode ?></h5>
    </center>
    
  

    <?php
    foreach ($journal as $value) {
        
            ?>
             <table class='tablereport' style="line-height: <?=$lineheight?>px;" width='800' border='0' padding="0">
              <tr>
                     <td width="132" colspan="2"><?=$value['nojournal']?> - <?=$value['datejournal']?></td>
                     <td></td>
                     <td></td>
                </tr>
                <tr style="font-size: 12px;">
                     <td colspan="5"><b><?=$value['memo']?></td>
                </tr>
                <tr style="background-color: #EDF4F7; color: #000; font-size: 12px;">
                     <td width="132"><b>Akun</td>
                     <td ><b></td>
                     <td align="center"><b>Debit</td>
                     <td align="center"><b>Kredit</td>
                </tr>
           <!--  <tr style="font-size: 12px;">
                 <td><b><?=$value['datejournal']?></td>
                 <td colspan="4"><b><?=$value['memo']?></td>
            </tr> -->
            <?php
            foreach ($value['item'] as $item) {
                ?>
                <tr style="font-size: 12px;">
                     <td><?=$item['accnumber']?></td>
                     <td><?=$item['accname']?></td>
                     <!-- <td> </td> -->
                     <td><div  style="float: right;"><?=number_format($item['debit'])?></div></td>
                     <td><div  style="float: right;"><?=number_format($item['credit'])?></div></td>
                </tr>
                <?php
            }
            
            ?>
                <tr class="trsummary">
                     <!-- <td width="132"><b>Akun</td> -->
                     <td colspan="2"><b>TOTAL</td>
                     <td align="right"><b><?=number_format($value['totaldebit'])?></td>
                     <td align="right"><b><?=number_format($value['totalcredit'])?></td>
                </tr>
            <?php
           // echo "<tr><td colspan=5><hr style=border: none; height: 0;  border-top: 0px solid rgba(0, 0, 0, 0.1); border-bottom: 1px solid rgba(255, 255, 255, 0.3);> </td></tr>";
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