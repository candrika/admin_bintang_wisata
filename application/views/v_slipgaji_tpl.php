<html>
  <head>
    <meta content="text/html; charset=iso-8859-1" http-equiv="Content-Type" />
    <title>Slip Gaji <?=$pegawainama?> - <?=$bulan.' - '.$tahun?></title>
    <style type="text/css">
      body {
          font-size: 12px;
      }
    </style>
  </head>
  <body <?php if($this->uri->segment(6)==3) { echo "onload=\"window.print()\""; }?> >
    <table border="0" cellpadding="1" cellspacing="1" width="100%">
      <tr>
        <td colspan="3" rowspan="2">
          <?php
          if($print)
          {
            echo "<img src=\"/var/www/hrdpay/upload/".$img->logoheaderslip."\" width=\"200\" />";
          } else {
            echo "<img src=\"".base_url('/upload/').'/'.$img->logoheaderslip."\" width=\"200\" /> ";
        }
        ?>
          
          
        </td>
        <td colspan="2">&nbsp;</td>
        <td rowspan="2" width="237">&nbsp;</td>
      </tr>
      <tr>
        <td colspan="2">
          <p align="center">
            <strong>Perincian Gaji Pegawai Yang Dibayarkan</strong>
          </p>
          <p align="center">
            <strong>
              Bulan :
              <?=ambilBulan($bulan)?>
              <?=$tahun?>
            </strong>
          </p>
        </td>
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
        <td colspan="2"><?=$pegawainama?></td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td colspan="2" style="width:5px;">Jabatan</td>
        <td>:</td>
        <td colspan="2"><?=$ketkeljab?></td>
        <td>&nbsp;</td>
      </tr>

      <?php
      if($kodekeljab!=4 && $kodekeljab!=13 && $kekaryaankode!=9)
      {
          //4:direksi 13:operasional
      ?>
          <tr>
            <td colspan="2">Grade</td>
            <td>:</td>
            <td colspan="2"><?=$namagrade?> <?=$skalagrade?></td>
            <td>&nbsp;</td>
          </tr>
          <?php
//          echo $kekaryaankode;
          if($tarifphdp!=0)
          {
            ?>
            <tr>
              <td colspan="2">Skala PHDP</td>
              <td>:</td>
              <td width="210"><?=$namatphdp?> <?=$skalatphdp?></td>
              <td width="143"><?=  number_format($tarifphdp)?></td>
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
          <strong>Pembayaran (A)</strong>
        </td>
        <td>&nbsp;</td>
        <td colspan="2">&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <?php

      if($honorarium!=0)
      { 
        ?>
        <tr>
        <td colspan="2">1. <?php if($kodekeljab==13 || $kekaryaankode==9) { echo "Gaji Pokok"; } else { echo "Honorarium"; }?></td>
        <td>:</td>
        <td colspan="2">
          <div align="right"><?=number_format($honorarium)?></div>
        </td>
        <td>&nbsp;</td>
      </tr>
      <?php
      } else {
          ?>
          <tr>
            <td colspan="2">1. P1</td>
            <td>:</td>
            <td colspan="2">
              <div align="right"><?=number_format($p1)?></div>
            </td>
            <td>&nbsp;</td>
          </tr>
          <?php
          if($tarifgrade!=0)
          {
            ?>
             <tr>
              <td width="25">&nbsp;</td>
              <td width="233">- Tarif Grade: <?=number_format($tarifgrade)?></td>
              <td colspan="2"></td>
              <td></td>
            </tr>
            <?php
          }
          ?>
          <?php
          if($tariftransisi!=0)
          {
            ?>
             <tr>
              <td width="25">&nbsp;</td>
              <td width="233">- Tarif Grade Transisi: <?=number_format($tariftransisi)?></td>
              <td colspan="2"></td>
              <td></td>
            </tr>
            <?php
          }
          ?>
          <tr>
            <td colspan="2">2. P2</td>
            <td>:</td>
            <td colspan="2">
              <div align="right"><?=number_format($p2)?></div>
            </td>
            <td>&nbsp;</td>
          </tr>
          <?php
        }?>
      <tr>
        <td colspan="2">
          <strong>TOTAL PEMBAYARAN</strong>
        </td>
        <td>&nbsp;</td>
        <td colspan="2"></td>
        <td>
          <div align="right"><?=number_format($penghasilanp1p2)?></div>
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
          <strong>Pembayaran</strong>
          <strong>Lain-lain</strong>
          <strong>(B)</strong>
        </td>
        <td>&nbsp;</td>
        <td colspan="2">&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <?php $i=1;
//      print_r($pembayaran);
      if(isset($pembayaran))
      {
        foreach ($pembayaran as $key => $value) {
//            print_r($value);
//            echo $value['total'];
            if(is_array($value))
            {
//                echo $value['total'];
                if($key!='total' && $value['total']!=0)
                        {
                          ?>
                          <tr>
                            <td colspan="2"><?=$i.'. '.$key?></td>
                            <td>:</td>
                            <td colspan="2">
                              <div align="right"><?=number_format($value)?></div>
                            </td>
                            <td>&nbsp;</td>
                          </tr>
                          <?php $i++;
                        }
            } else {
                        if($key!='total')
                        {
                          ?>
                          <tr>
                            <td colspan="2"><?=$i.'. '.$key?></td>
                            <td>:</td>
                            <td colspan="2">
                              <div align="right"><?=number_format($value)?></div>
                            </td>
                            <td>&nbsp;</td>
                          </tr>
                          <?php $i++;
                        } else {

                              }
            }
        }
      }
      ?>

              
       <?php
       //cuti
        if($cuti!=false)
        {
          ?>
           <tr>
            <td colspan="2"><?=$i.'. '.$cuti['namacuti'].' '.$cuti['tahun']?> (Jml Cuti: <?=$cuti['jmlcuti']?> - <?=$cuti['keterangan']?>)</td>
            <td>:</td>
            <td colspan="2">
              <div align="right"><?=number_format($cuti['rupuangcuti'])?></div>
            </td>
            <td>&nbsp;</td>
          </tr>
          <?php
        } 
          ?>

      <?php    
      if($lembur!==false)
      {
        foreach ($lembur as $key => $value) {
              $nmlembur = $key=='kerja' ? 'Lembur Hari Kerja' : 'Lembur Hari Libur';
              $tarif = $value['tariflemburkerja'] !=null ? " @ ".number_format($value['tariflemburkerja']) : null;
              if($value['jumlahlembur']!=0)
              {
                  if($value['jumlahjam']==0)
                  {
                      //fix ammount
                  ?>
                          
                          <tr>
                                <td colspan="2"><?=$i?>. Lembur : </td>
                                <td>:</td>
                                <td colspan="2">
                                  <div align="right"><?=number_format($value['jumlahlembur'])?></div>
                                </td>
                                <td>&nbsp;</td>
                       </tr>
                  <?php
                  } else {
                        ?>
                       <tr>
                                <td colspan="2"><?=$i.'. '.$nmlembur?> : <?=$value['jumlahjam']?> Jam <?=$tarif?></td>
                                <td>:</td>
                                <td colspan="2">
                                  <div align="right"><?=number_format($value['jumlahlembur'])?></div>
                                </td>
                                <td>&nbsp;</td>
                       </tr>
                       <?php
                  }
                 $i++;
               }
             
        }
      }
      ?>

    


      <td colspan="2">
        <strong>TOTAL PEMBAYARAN LAIN</strong>
        </td>
        <td>&nbsp;</td>
        <td colspan="2"></td>
        <td>
        <div align="right"><?=number_format($pembayaranlaintotal)?></div>
      </td>
      <tr>
        <td colspan="2">&nbsp;</td>
        <td>&nbsp;</td>
        <td colspan="2">&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td colspan="2">
          <strong>TOTAL PENGHASILAN (A+B)</strong>
        </td>
        <td>&nbsp;</td>
        <td colspan="2">
          <div align="right"><?=number_format($totalpenghasilan)?></div>
        </td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td colspan="2">&nbsp;</td>
        <td>&nbsp;</td>
        <td colspan="2">&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td colspan="2">
          <strong>Potongan</strong>
        </td>
        <td>&nbsp;</td>
        <td colspan="2">
          <strong />
          <center>Angsuran Bulanan</center>
        </td>
        <td>
          <strong />
          <center>Jumlah</center>
        </td>
      </tr>

      <?php
      $no=1;
      ?>

      <?php
      $tampil=false;
      if($kodekeljab!=4 && $kodekeljab!=1)
      {
        ?>
          <tr>
            <td colspan="2"><?=$no?>. PPH ps 21 (<?=$pph['jenispph21']?>)</td>
            <td>:</td>
            <td colspan="2">
              <div align="right"><?=number_format($pph['pphterhutang'])?></div>
            </td>
            <td>
              <div align="right"><?=number_format($pph['pphterhutang'])?></div>
            </td>
          </tr>      
      <tr>
        <td width="25">&nbsp;</td>
        <td width="233">- Tarif Pajak: <?=$pph['tarifpajak']?>%</td>
        <td colspan="2"></td>
        <td></td>
      </tr>
        <?php
        $no++;
      }
    ?>

    <?php
      if($kodekeljab!=4 && $tampil)
      {
                  ?>
                <tr>
                  <td colspan="2"><?=$no?>. Jamsostek</td>
                  <td>:</td>
                  <td colspan="2">&nbsp;</td>
                  <td>
                    <div align="right"><?=number_format($jamsostekjumlah)?></div>
                  </td>
                </tr>
                <?php if($jamsostek['jhtPeg']!=0)
                {
                ?>
                <tr>
                  <td width="25">&nbsp;</td>
                  <td width="233">- JHT (<?=$jamsostek['jhtPersen']?>%)</td>
                  <td>&nbsp;</td>
                  <td colspan="2">
                    <div align="right"><?=number_format($jamsostek['jhtPeg'])?></div>
                  </td>
                  <td>&nbsp;</td>
                </tr>
                <?php }
                ?>
                <?php if($jamsostek['jpkPeg']!=0)
                {
                ?>
                <tr>
                  <td>&nbsp;</td>
                  <td>- JPK (<?=$jamsostek['jpkPersen']?>%)</td>
                  <td>&nbsp;</td>
                  <td colspan="2">
                    <div align="right"><?=number_format($jamsostek['jpkPeg'])?></div>
                  </td>
                  <td>&nbsp;</td>
                </tr>
                <?php }
                ?>
                <?php if($jamsostek['jkkPeg']!=0)
                {
                ?>
                <tr>
                  <td>&nbsp;</td>
                  <td>- JKK (<?=$jamsostek['jkkPersen']?>%)</td>
                  <td>&nbsp;</td>
                  <td colspan="2">
                    <div align="right"><?=number_format($jamsostek['jkkPeg'])?></div>
                  </td>
                  <td>&nbsp;</td>
                </tr>
                <?php }
                ?>
                <?php if($jamsostek['jkPeg']!=0)
                {
                ?>
                <tr>
                  <td>&nbsp;</td>
                  <td>- JK (<?=$jamsostek['jkPersen']?>%)</td>
                  <td>&nbsp;</td>
                  <td colspan="2">
                    <div align="right"><?=number_format($jamsostek['jkPeg'])?></div>
                  </td>
                  <td>&nbsp;</td>
                </tr>
                <?php }
                ?>

                <?php if($jamsostek['bpjskPeg']!=0)
                {
                ?>
                <tr>
                  <td>&nbsp;</td>
                  <td>- BPJS K (<?=$jamsostek['bpjskPersen']?>%)</td>
                  <td>&nbsp;</td>
                  <td colspan="2">
                    <div align="right"><?=number_format($jamsostek['bpjskPeg'])?></div>
                  </td>
                  <td>&nbsp;</td>
                </tr>
                <?php }
                ?>
                
                  <?php

                  $no++;
      } else {
        // $no++;
      }
    ?>

    <!-- iuran pensiun tidak ada didekom && operasional-->
    <?php
      if($kodekeljab!=4)
      {
        ?>
        <tr>
          <td colspan="2"><?=$no?>. Iuran Pensiun</td>
          <td>&nbsp;</td>
          <td colspan="2">&nbsp;</td>
          <td>
            <div align="right"><?=number_format($ippeserta)?></div>
          </td>
        </tr>
      

      <?php
      if($iuranpensiun!=false)
      {
          ?>
        <!--   <tr>
            <td>&nbsp;</td>
            <td>- IPK (<?=$persenipk?>%)</td>
            <td>&nbsp;</td>
            <td colspan="2">
              <div align="right"><?=number_format($ipk)?></div>
            </td>
            <td>&nbsp;</td>
          </tr> -->
          <tr>
            <td>&nbsp;</td>
            <td>- IP (<?=$persenip?>%)</td>
            <td>&nbsp;</td>
            <td colspan="2">
              <div align="right"><?=number_format($ip)?></div>
            </td>
            <td>&nbsp;</td>
          </tr>
          <?php
        }
      ?>
       <?php
       $no++;
      } 
    ?>

    <?php
      if($kodekeljab!=4 && $tampil)
      {
          ?>
            <tr>
              <td colspan="2"><?=$no?>. Biaya Jabatan</td>
              <td>:</td>
              <td colspan="2">
                <div align="right"></div>
              </td>
              <td>
                <div align="right"><?=number_format($biayajabatan)?></div>
              </td>
            </tr>
            <?php
        }
    ?>

      <?php
      if($potongan['jumlah']!=0)
      {
        ?>
          <tr>
          <td colspan="2"><?=$no?>. BBRP (angsuran #<?=$potongan['angsuranke']?>)</td>
          <td>:</td>
          <td colspan="2">
            <div align="right"><?=number_format($potongan['jumlah'])?></div>
          </td>
          <td>
            <div align="right"><?=number_format($potongan['jumlah'])?></div>
          </td>
        </tr>

        <?php
        $no++;
      }
      ?>
        
      <?php
      if($potonganLain!=0)
      {
          foreach ($potonganLain as $v)
          {
                ?>
                  <tr>
                  <td colspan="2"><?=$no?>. <?=$v['ketpot']?></td>
                  <td>:</td>
                  <td colspan="2">
                  </td>
                  <td>
                    <div align="right"><?=number_format($v['jumlahpotongan'])?></div>
                  </td>
                </tr>

                <?php
                $no++;
          }
      }
      ?>


      <tr>
        <td colspan="2">
          <strong>TOTAL POTONGAN</strong>
        </td>
        <td>&nbsp;</td>
        <td colspan="2">
          <div align="right"></div>
        </td>
        <td>
          <div align="right"><?=number_format($potonganTotal)?></div>
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
          <div align="right"><?=number_format($penghasilanbersih)?></div>
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
        <td colspan="2"><?=$namabank?>: <?=$nomorrek?></td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td colspan="2">&nbsp;</td>
        <td>&nbsp;</td>
        <td colspan="2">&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    </table>
  </body>
</html>

<style type="text/css">
@media print
{
.noprint {display:none;}
}

</style>

<?php
if($this->uri->segment(6)!=3)
{
?>
    <div class="noprint">
    <center><A HREF="javascript:window.print()"><img width="100" src="<?=base_url()?>/assets/images/print.jpg"></A></center>
    </div>
<?php
}
?>
