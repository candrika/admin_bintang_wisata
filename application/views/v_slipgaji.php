<html>
    <head>
        <meta content="text/html; charset=iso-8859-1" http-equiv="Content-Type" />
        <title>Slip Gaji <?= $pegawainama ?> - <?= $bulan . ' - ' . $tahun ?></title>
        <style type="text/css">
            body {
                font-size: 8px;
            }
            td {        
               font-size: 8px;
            }
        </style>
        <!-- <link href="<?=base_url()?>/assets/css/reporting.css" rel="stylesheet"> -->
    </head>
    <body <?php if ($debug==4) {
    echo "onload=\"window.print()\"";
} ?> >
<!-- <center> -->
        <table style="line-height: 12px;" border="0" cellpadding="1" cellspacing="1" width="60%">
           
            <tr>
                <td colspan="2">
                    <p align="center">
                        <strong>Perincian Gaji Pegawai Yang Dibayarkan</strong>
                    </p>
                    <p align="center">
                        <strong>
                            Bulan : <?=ambilBulan($bulan)?> <?=$tahun?>
                        </strong>
                    </p>
                </td>
                <td colspan="4"><center><?=$this->logo?></center></td>
                <!-- <td></td>
                <td></td>
                <td></td> -->
            </tr>
            <tr>
                <td colspan="2">&nbsp;</td>
                <td width="12">&nbsp;</td>
                <td colspan="2">
                    <div align="center"></div>
                </td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td colspan="2" style="width:5px;">Nama</td>
                <td>:</td>
                <td colspan="2"><?= $pegawainama ?></td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td colspan="2" style="width:5px;">Jabatan</td>
                <td>:</td>
                <td colspan="2"><?= $nametype ?></td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td colspan="2" style="width:5px;"><b>Gaji Pokok</td>
                <td>:</td>
                <td colspan="2" align='right'><?= number_format($gajipokok) ?></b></td>
                <td>&nbsp;</td>
            </tr>
            <?php
            foreach ($tambahangaji as $value) {
                    if ($value['jumlah'] != 0) {
                        ?>
                      <tr>
                        <td colspan="2" style="width:5px;"><b><?=$value['nama']?></td>
                        <td>:</td>
                        <td colspan="2" align='right'><?= number_format($value['jumlah']) ?></b></td>
                        <td>&nbsp;</td>
                    </tr>
                    <?php
                }
            }
            ?>

            <tr>
                <td colspan="2">&nbsp;</td>
                <td>&nbsp;</td>
                <td colspan="2">&nbsp;</td>
                <td>&nbsp;</td>
            </tr>

            <tr>
                <td colspan="2">
                    <strong>Tunjangan </strong>
                </td>
                <td>&nbsp;</td>
                <td colspan="2">&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <?php
            $i = 0;

            foreach ($tunjangan as $value) {
                if ($value['jumlah'] != 0) {
                    ?>
                    <tr>
                        <td colspan="2"><?= $value['nama'] ?></td>
                        <td>:</td>
                        <td colspan="2" align='right'><?= number_format($value['jumlah']) ?></td>
                        <td>&nbsp;</td>
                    </tr>
                    <?php
                    $i++;
                }
            }
            ?>
            <tr>
                <td colspan="2">
                    <strong>TOTAL TUNJANGAN</strong>
                </td>
                <td>&nbsp;</td>
                <td colspan="2"></td>
                <td>
                    <div align="right" align='right'><?= number_format($totaltunjangan) ?></div>
                </td>
            </tr>
            <tr>
                <td colspan="2">&nbsp;</td>
                <td>&nbsp;</td>
                <td colspan="2">&nbsp;</td>
                <td>&nbsp;</td>
            </tr>

            <tr>
                <td colspan="2">
                    <strong>Potongan </strong>
                </td>
                <td>&nbsp;</td>
                <td colspan="2" align="right"><b>Jumlah Potongan/Angsuran</b></td>
                <td>&nbsp;</td>
            </tr>
            <?php
            $i = 0;
            foreach ($potongan as $value) {
                    if ($value['jumlah'] != 0) {
                        ?>
                        <tr>
                            <td colspan="2"><?= $value['nama'] ?></td>
                            <td>:</td>
                            <td colspan="2" align='right'><?= number_format($value['jumlah']) ?></td>
                            <td>&nbsp;</td>
                        </tr>
                    <?php
                    $i++;
                }
            }
            foreach ($potonganangsuran as $value) {
                    if ($value['jumlah'] != 0) {
                        ?>
                        <tr>
                            <td colspan="2"><?= $value['nama'] ?></td>
                            <td>:</td>
                            <td colspan="2" align='right'><?= number_format($value['jumlah']) ?></td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td colspan="2">&nbsp;&nbsp;&nbsp;&nbsp;Saldo Terhutang : <?= number_format($value['sisapotongan']) ?></td>
                            <td></td>
                            <td colspan="2" align='right'></td>
                            <td>&nbsp;</td>
                        </tr>
                    <?php
                    $i++;
                }
            }
            foreach ($premi as $value) {
                    if ($value['amounte'] != 0) {
                        ?>
                        <tr>
                            <td colspan="2"><?= $value['nama'].' '.$value['percente'] ?>% </td>
                            <td>:</td>
                            <td colspan="2" align='right'><?= number_format($value['amounte']) ?></td>
                            <td>&nbsp;</td>
                        </tr>
                    <?php
                    $i++;
                }
            }
        ?>
             <tr>
                <td colspan="2">PPH 21 (<?=$jenispph21?>)</td>
                <td>:</td>
                <td colspan="2" align='right'><?php echo number_format($pph21); ?></td>
                <td>&nbsp;</td>
            </tr>
         
            <tr>
                <td colspan="2">
                    <strong>TOTAL POTONGAN</strong>
                </td>
                <td>&nbsp;</td>
                <td colspan="2"></td>
                <td>
                    <div align="right"><?= number_format($potonganTotal) ?></div>
                </td>
            </tr>
            <tr>
                <td colspan="2">&nbsp;</td>
                <td>&nbsp;</td>
                <td colspan="2">&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td colspan="2">
                    <strong>TOTAL PENGHASILAN BERSIH</strong>
                </td>
                <td>&nbsp;</td>
                <td colspan="2">&nbsp;</td>
                <td>
                    <div align="right"><?= number_format($penghasilanbersih) ?></div>
                </td>
            </tr>
            <tr>
                <td colspan="2">&nbsp;</td>
                <td>&nbsp;</td>
                <td colspan="2">&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td colspan="2">Dibayarkan di</td>
                <td>&nbsp;</td>
                <td colspan="2"><?= $namabank ?>: <?= $norek ?></td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td colspan="2">&nbsp;</td>
                <td>&nbsp;</td>
                <td colspan="2">&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
        </table>
        <!-- </center> -->
    </body>
</html>

<style type="text/css">
    @media print
    {
        .noprint {display:none;}
    }

</style>

<?php
if ($debug!=4) {
    ?>
    <div class="noprint">
        <center><A HREF="javascript:window.print()"><img width="100" src="<?= base_url() ?>/assets/images/print.jpg"></A></center>
    </div>
    <?php
}
?>
