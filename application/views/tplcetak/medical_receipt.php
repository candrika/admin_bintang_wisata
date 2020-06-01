<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
	
	<title>Bukti Berobat Pasien</title>
	
	<link rel='stylesheet' type='text/css' href='<?=base_url()?>/assets/css/css_print/style.css' />
	<link rel='stylesheet' type='text/css' href='<?=base_url()?>/assets/css/css_print/print.css' media="print" />
	<!-- // <script type='text/javascript' src='js/jquery-1.3.2.min.js'></script> -->
	<!-- // <script type='text/javascript' src='js/example.js'></script> -->

</head>

<?php
if($this->uri->segment(4)=='print'){
  echo "<body onload=\"window.print()\">";
} else {
  echo "<body>";
}
?>

	<div id="page-wrap">
		<div id="terms">
			<div id="identity">
				<div id="logo_left">
            		<img id="image_left" src="<?=base_url()?>/assets/images/<?=$this->session->userdata('logo')?>" width="26%" alt="logo"/>
            		<!-- <hr> -->
            	</div>
            	<div readonly id="address_right"><?=$this->session->userdata('alamat')?></div>
            	<!-- <div readonly id="address_right">No Telp:<?=$no_tlp?>&nbsp;No HP:<?=$no_mobile?></div> -->
			</div>
			<br>
			<div id="bold-line"></div>
		</div>
		<br>
		<br>
		<br>
		<!-- <div id="terms"> -->
			<div id="p"><h5>Bukti Berobat Pasien&nbsp;<?=$business_name?>&nbsp;<?=$member_name?></h5></div>			 
		<!-- </div> -->
		<br>
		<div style="clear:both"></div>
		
		<div id="customer">

			<table id="meta-left">
				<tr>
				
					<td class="meta-head">Nama Pasien</td>
					<td><?=$patient_name?></td>
				</tr>
				<tr>
				
					<td class="meta-head">Umur Pasien</td>
					<?php
					if(isset($birthday_date)){
					?>
					<td><?=$birthday_date?> - <?=$usia?> Tahun</td>
					<?php
					}else{
					?>
					<td>-</td>					
					<?php
					}
					?>
				</tr>
				<!-- <tr>
				
					<td class="meta-head">Jenis Kelamin</td>
					<td>-</td>
				</tr> -->
				<tr>
					<td class="meta-head">Kategori</td>
					<td>
						<div class="due"><?=$patient_type?></div>
					</td>
				</tr>
				<?php
				if(isset($np_number)){
				?>
				<tr>
					<td class="meta-head">NP/No Anggota</td>
					<td>
						<div class="due"><?=$np_number?></div>
					</td>
				</tr>
				<?php
				}
				?>
				<?php
				if(isset($member_name)){
				?>
				<tr>
					<td class="meta-head">Nama Anggota</td>
					<td>
						<div class="due"><?=$member_name?></div>
					</td>
				</tr>
				<?php
				}
				?>
				<?php
					if($divisi!=''){
				?>
				<tr>
					<td class="meta-head">Bagian/Divisi</td>
					<td>
						<div class="due"><?=$divisi?></div>
					</td>
				</tr>
				<?php
					}
				?>
				<?php
					if($relationship_type!=''){
				?>
				<tr>
					<td class="meta-head">Hubungan Keluarga</td>
					<td>
						<div class="due"><?=$relationship_type?></div>
					</td>
				</tr>
				<?php
				}
				?>
            </table>

<!--             <span readonly id="customer-title">Widget Corp.
c/o Steve Widget</span> -->

            <table id="meta">
			<tr>
			
				<td class="meta-head">Tanggal Diagnosa</td>
				<td><?=$medical_record_date?></td>
			</tr>

			<tr>
			
				<td class="meta-head">No. Diagnosa</td>
				<td><?=$medical_record_no?></td>
			</tr>

			<tr>
				<td class="meta-head">Dokter</td>
				<td>
					<div class="due"><?=$doctor_name?></div>
				</td>
			</tr>

			<tr>
				<td class="meta-head">Provider</td>
				<td>
					<div class="due"><?=$provider?></div>
				</td>
			</tr>

            </table>
		
		</div>
		<br>
		<h3>Detail Pengobatan</h3>
		<table id="items" style="margin: 10px 0 0 0;">
		
		  <tr>
			  <th>No</th>
			  <th colspan="3">Keterangan</th>
			  <th colspan="1" align="right">Biaya</th>
		  </tr>
		  <?php
		  	$i=1;
		  	$total_amount =0;
		  	foreach ($medical_fee as $key => $value) {
		  		# code...
		  		// print_r($value);
		  		$total_amount +=$value['fee'];
		  ?>
		  <tr>
			  <td width="10"><?=$i?></td>
		      <td class="description" colspan="3"><?=$value['keterangan']?></td>
		      <td class="description" align="right" colspan="1">Rp&nbsp;<?=number_format($value['fee'])?></td>
		      <!-- <td class="description"><?=$value->{'medical_action_name'}?></td> -->
		  </tr>
		  <?php
		  	$i++;
			}
		  ?>
		  <tr>
			  <td align="center"  colspan="4">Total</td>
			  <!-- <td class="description"></td> -->
			  <td class="description" align="right">Rp&nbsp;<?=number_format($total_amount)?></td>
		  </tr>
		
		</table>
		<div class="due">&nbsp;</div>
		<!-- <br> -->
		<div style="clear:both"></div>
		<div id="customer">
			<p>Catatan</p>
			<div class="due">&nbsp;</div>
		</div>
		<div id="customer" style="margin-top:10px;">
		
			<table id="meta">
				<tr>
					<td>
						<div class="due" align="left"><?=ucfirst($this->session->userdata('kota')).','?>&nbsp;<?=date("d F Y")?></div>
					</td>
				</tr>
				<tr>
					<td>
						<div class="due"><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p></div>
					</td>
				</tr>
				<tr>
					<td>
						<div class="due" align="center"><?=ucfirst($this->session->userdata('realname'))?>&nbsp;</div>
					</td>
				</tr>
		
			</table>
		
		</div>
		
	
	</div>
	
</body>

</html>