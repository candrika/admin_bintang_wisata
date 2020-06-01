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
        <td colspan="9"> 
            <center>
                <br><br> 
                <h1>ARUS KAS</h1>        
                <h3><?= $unit ?></h3><br>
                <h5><?= $periode ?></h5>
            </center>
        </td>
    </tr>
    
    <tr>
        <td colspan="9"> 
        <strong>I. Arus Kas Dari Kegiatan Operasi </strong></td>
    </tr>
    <tr>
      <td width="18">&nbsp;</td>
      <td width="174"><strong>Arus Kas Masuk</strong></td>
      <td width="332">&nbsp;</td>
      <td width="117">&nbsp;</td>
      <td width="137">&nbsp;</td>
    </tr>
    <?php
    foreach ($aruskasmasuk as $key => $value) {        
        ?>
        <tr>
          <td>&nbsp;</td>
          <td colspan="2">&nbsp;&nbsp;&nbsp;&nbsp;<?=$value['accname']?></td>
          <td align="right"><?=  number_format($value['selisih'])?></td>
          <td>&nbsp;</td>
        </tr>
        <?php
    }
    ?>
    <tr>
      <td>&nbsp;</td>
      <td colspan="2"><strong>Total Penerimaan</strong></td>
      <td>&nbsp;</td>
      <td align="right"><strong><?=number_format($totalkasmasuk)?></strong></td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td><strong>Arus Kas Keluar</strong></td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <?php
    foreach ($aruskaskeluar as $key => $value) {        
        ?>
        <tr>
          <td>&nbsp;</td>
          <td colspan="2">&nbsp;&nbsp;&nbsp;&nbsp;<?=$value['accname']?></td>
          <td align="right"><?=  number_format($value['selisih'])?></td>
          <td>&nbsp;</td>
        </tr>
        <?php
    }
    ?>
    <tr>
      <td>&nbsp;</td>
      <td colspan="2"><strong>Total Beban</strong></td>
      <td>&nbsp;</td>
      <td align="right" ><strong><?=number_format($totalkaskeluar)?></strong></td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td colspan="2"><strong>Arus Kas Dari Kegiatan Operasi</strong></td>
      <td>&nbsp;</td>
      <td align="right"><strong><?=number_format($totalkasoperasi)?></strong></td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td colspan="2">&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td colspan="5"><strong>II. Arus Kas Dari Kegiatan Investasi</strong></td>
      </tr>
    <?php
    foreach ($dataInves as $key => $value) {        
        ?>
        <tr>
          <td>&nbsp;</td>
          <td colspan="2">&nbsp;&nbsp;&nbsp;&nbsp;<?=$value['accname']?></td>
          <td align="right"><?=  number_format($value['selisih'])?></td>
          <td>&nbsp;</td>
        </tr>
        <?php
    }
    ?>
    <tr>
      <td>&nbsp;</td>
      <td colspan="2"><strong>Arus Kas Keluar dari Kegiatan Investasi</strong></td>
      <td>&nbsp;</td>
      <td align="right" ><strong><?=number_format($totalInves)?></strong></td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td colspan="5"><strong>II. Arus Kas Dari Kegiatan Pendanaan</strong></td>
      </tr>
    <?php
    foreach ($dataDana as $key => $value) {        
        ?>
        <tr>
          <td>&nbsp;</td>
          <td colspan="2">&nbsp;&nbsp;&nbsp;&nbsp;<?=$value['accname']?></td>
          <td align="right"><?=  number_format($value['selisih'])?></td>
          <td>&nbsp;</td>
        </tr>
        <?php
    }
    ?>
    <tr>
      <td>&nbsp;</td>
      <td colspan="2"><strong>Arus Kas Masuk dari Kegiatan Pendanaan</strong></td>
      <td>&nbsp;</td>
      <td align="right" ><strong><?=number_format($totalDana)?></strong></td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td colspan="3"><strong>Arus Kas Masuk Bersih</strong></td>
      <td>&nbsp;</td>
      <td align="right" ><strong><?=number_format($kasMasukBersih)?></strong></td>
    </tr>
    <tr>
      <td colspan="3"><strong>Saldo Kas Akhir Periode <?=$periodeawal?></strong></td>
      <td>&nbsp;</td>
      <td align="right" ><strong><?=number_format($totalkasawal)?></strong></td>
    </tr>
    <tr>
      <td colspan="3"><strong>Saldo Kas Periode <?=$periodeakhir?></strong></td>
      <td>&nbsp;</td>
      <td align="right" ><strong><?=number_format($totalkasakhir)?></strong></td>
    </tr>
    
    
    
    </table>
    
</body>

<?php
if($option=='print')
{
    echo "<body onload=\"window.print()\">";
}
?>