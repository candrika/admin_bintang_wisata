<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
	
	<title>Medical Pathway</title>
	
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
		<!-- <div id="terms"> -->
			<!-- <h5>Confidential Document</h5> -->
			<!-- <span>NET 30 Days. Finance Charge of 1.5% will be made on unpaid balances after 30 days.</span> -->
		<!-- </div> -->
		<div readonly id="header"><?=$company_name?></div>
		
		<div id="identity">
		
            <div readonly id="address"><?=$this->session->userdata('alamat')?></div>

            <div id="logo">
            	<img id="image" src="<?=base_url()?>/assets/images/<?=$this->session->userdata('logo')?>"  width="100" alt="logo" />
              
            </div>
		
		</div>
		
		<div style="clear:both"></div>
		
		<div id="customer">

			<table id="meta-left">
				<tr>
				
					<td class="meta-head">Nama Pasien</td>
					<td><?=$patient_name?></td>
				</tr>
				<tr>
				
					<td class="meta-head">Tgl Lahir</td>
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
				<tr>
				
					<td class="meta-head">Jenis Kelamin</td>
					<td>-</td>
				</tr>
				<tr>
					<td class="meta-head">Jenis Pasien</td>
					<td>
						<div class="due"><?=$patient_type?></div>
					</td>
				</tr>
            </table>

<!--             <span readonly id="customer-title">Widget Corp.
c/o Steve Widget</span> -->

            <table id="meta">
			<tr>
			
				<td class="meta-head">No. Diagnosa</td>
				<td><?=$medical_record_no?></td>
			</tr>
			<tr>
			
				<td class="meta-head">Tanggal Diagnosa</td>
				<td><?=$medical_record_date?></td>
			</tr>
			<tr>
				<td class="meta-head">Dokter</td>
				<td>
					<div class="due"><?=$doctor_name?></div>
				</td>
			</tr>


            </table>
		
		</div>
		
		<table id="items">
		
		  <tr>
			  <th colspan="2">Profil</th>
		  </tr>
		  
		  <tr class="item-row">
			  <td class="item-name">No. Diagnosa</td>
		      <td class="description"><?=$medical_record_no?></td>		      
		  </tr>

			<tr class="item-row">
				<td class="item-name">Tanggal dan Waktu</td>
				<td class="description"><?=$datein?></td>
			</tr>
			<tr class="item-row">
				<td class="item-name">Pemeriksaaan</td>
				<td class="description"><?=$medical_record_desc?></td>
			</tr>
		
		</table>


		<table id="items">
			<th colspan="3">Klasifikasi Penyakit</th>
			<tr>
				<th>Kode</th>
				<th>Nama</th>
				<th>Deskripsi</th>
			</tr>
			<?php
			if(count($penyakit)>0){
			foreach ($penyakit as  $medical_diseases) {
				# code...	
			?>
			<tr class="item-row">
				<td class="item-name"><?=$medical_diseases->{'disease_code'}?></td>
				<td><?=$medical_diseases->{'disease_name'}?></td>
				<td class="description"><?=$medical_diseases->{'disease_desc'}?></td>
			</tr>
			<?php
			}}
			?>
		</table>

		<table id="items">
			<th>Tindakan Medis</th>
		<?php
		if(count($tindakan)>0){
		foreach ($tindakan as $key => $medical_action) {
			# code...
		
		?>
			<tr class="item-row">
				<td class="description"><?=$medical_action->{'medical_action_desc'}?></td>
			</tr>
		<?php
		}}
		?>
		</table>

		<table id="items">
			<th colspan="5">Resep Obat</th>
			<tr>
				<th>No. Obat</th>
				<th>Nama</th>
				<!-- <th>Kategori</th> -->
				<!-- <th>Jenis</th> -->
				<th>Qty</th>
				<th>Satuan</th>
				<th>Catatan</th>
			</tr>
		<?php
		if(count($resep)>0){
		foreach ($resep as $key => $medical_drug) {
			# code...
		
		?>
			<tr class="item-row">
				<td><?=$medical_drug->{'no_sku'}?></td>
				<td class="item-name"><?=$medical_drug->{'product_name'}?></td>
				<!-- <td>xxx</td> -->
				<!-- <td>xxx</td> -->
				<?php
				if(isset($medical_drug->{'qty'})){
				?>
				<td><?=$medical_drug->{'qty'}?></td>
				<?php
				}else{
				?>
				<td></td>
				<?php
				}
				?>
				<td><?=$medical_drug->{'product_unit_code'}?></td>
				<td class="description"><?=$medical_drug->{'notes'}?></td>
			</tr>
		<?php
		}}
		?>
		</table>

		
		<div style="clear:both"></div>
		
		<div id="customer" style="margin-top:20px;">
		
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
						<div class="due">&nbsp;</div>
					</td>
				</tr>
		
			</table>
		
		</div>
		
	
	</div>
	
</body>

</html>