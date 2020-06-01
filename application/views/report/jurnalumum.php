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

    * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


</style>
<body>
<center>
            <center>
            <br><br> 
                <h1>JURNAL</h1>        
                <h3><?= $unit ?></h3><br>
                <h5><?= $periode ?></h5>
            </center>
    
   
    
    
    <?php
    foreach ($journal as $value) {
        ?>
        <table class='tablereport' style="line-height: <?=$lineheight?>px;" width='80%' border='0' padding="0">
        <?php
            ?>
            <tr>
                 <td width="132" colspan="2"><?=$value['nojournal'].' '.$value['datejournal']?></td>
                 <td></td>
                 <td></td>
                 <td></td>
            </tr>
            <tr style="font-size: 12px;">
                 <td colspan="5"><b><?=$value['memo']?></td>
            </tr>
           <tr style="background-color: #EDF4F7; color: #000; font-size: 12px;">
                 <td width="132"><b>Akun</td>
                 <td colspan="2"><b></td>
                 <td align="center"><b>Debit</td>
                 <td align="center"><b>Kredit</td>
            </tr>
            <?php
            foreach ($value['item'] as $item) {
                ?>
                <tr style="font-size: 12px;">
                     <td><?=$item['accnumber']?></td>
                     <td colspan="2"><?=$item['accname']?></td>
                     <td><div  style="float: right;"><?=number_field($item['debit'])?></div></td>
                     <td><div  style="float: right;"><?=number_field($item['credit'])?></div></td>
                </tr>
                <?php
            }
            
            ?>
                <tr class="trsummary">
                     <!-- <td width="132"><b>Akun</td> -->
                     <td colspan="3"><b>TOTAL</td>
                     <td align="right"><b><?=number_field($value['totaldebit'])?></td>
                     <td align="right"><b><?=number_field($value['totalcredit'])?></td>
                </tr>
                </table>
            <?php
           // echo "<tr><td colspan=5><hr style=border: none; height: 0;  border-top: 0px solid rgba(0, 0, 0, 0.1); border-bottom: 1px solid rgba(255, 255, 255, 0.3);> </td></tr>";
    }
    ?>
    


    
</body>

<?php
if($option=='print')
{
    echo "<body onload=\"window.print()\">";
}
?>