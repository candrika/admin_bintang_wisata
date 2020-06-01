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
                <h3><?= $unit ?></h3><br>
                <h5><?= $periode ?></h5>
    </center>
    

<table class='tablereport' style="line-height: <?=$lineheight?>px;" width='<?=$tablewidth?>' border='0' padding="0">

<tr style="background-color: #EDF4F7; color: #000; font-size: 12px;">
     <td><b>No</td>
     <td><b>Jenis Penerimaan</td>
     <td><b>No Akun</td>
     <?php
         foreach($daftarbulan as $value)
         {
             echo "<td><center><b>$value</td>";
         }
      ?>
</tr>

<?php
    $no=1;
    foreach($report as $val)
    {
        $jnis = explode(".",$val['accname']);
        ?>
        <tr>
             <td><?=$no?></td>
             <td><?=$jnis[0]?></td>
             <td><?=$jnis[1]?></td>
             <?php
               for($bulan=1;$bulan<=12;$bulan++)
                {
                    echo "<td width=100 align=right>".number_format($val['pendapatan'][$bulan])."</td>";
                }
              ?>
        </tr>
        <?php
            $no++;
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