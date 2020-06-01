<link href="<?=base_url()?>/assets/css/reporting.css" rel="stylesheet">
<?php
$borderstyle = "border-bottom: #E6E8E6;  border-bottom-width: thin; border-bottom-style: dotted; ";
?>
<style>
    td {        
        font-size: <?=$fontsize?>px;
    }
</style>
<body>
<center>
    <table width='100%' border='0' padding="0">
    <tr>
        <td colspan="13"> 
            <center>
                <h3><?= $unit ?></h3>
                <h1>REKAP PENGGAJIAN</h1>        
                <h5><?= $periode ?></h5>
            </center>
        </td>
    </tr>
    
   
    <tr style="background-color: #dceef7; color: #000; font-size: 12px;">
        <td><b>No</td>
         <td><b>Nama</td>
         <td><b>Kelompok</td>
         <td><b>Unit</td>
         <td><b>Gaji Pokok</td>
         <td><b>Total Tunjangan</td>
         <td><b>Total Potongan</td>
         <td><b>Jenis Pph</td>
         <td><b>Pph21</td>
         <td><b>Biaya Kabatan</td>
         <td><b>Total Pembayaran</td>
         <td><b>No rek</td>
         <td><b>Nama Bank</td>
    </tr>

    <?php
    $i=1;
    foreach ($data->result_array() as $value) {
            ?>
            <tr style="font-size: 12px;">
                <td><?=$i?></td>
                <td><?=$value['firstname'].' '.$value['lastname']?></td>
                <td><?=$value['emptype']?></td>
                <td><?=$value['namaunit']?></td>
                <td align="right"><?=number_format($value['gajipokok'])?></td>
                <td align="right"><?=number_format($value['totaltunjangan'])?></td>
                <td align="right"><?=number_format($value['totalpotongan'])?></td>
                <td><?=$value['jenpph']?></td>
                <td align="right"><?=number_format($value['pph21'])?></td>
                <td align="right"><?=number_format($value['biayajabatan'])?></td>
                <td align="right"><?=number_format($value['totalpembayaran'])?></td>
                <td><?=$value['norek']?></td>
                <td><?=$value['namabank']?></td>
            </tr>
            <?php
            $i++;
//           echo "<tr><td colspan=5><hr style=border: none; height: 0;  border-top: 0px solid rgba(0, 0, 0, 0.1); border-bottom: 1px solid rgba(255, 255, 255, 0.3);> </td></tr>";
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