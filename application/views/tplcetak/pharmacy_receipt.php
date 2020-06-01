<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
	
	<title>Medical Prescription</title>
	
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

		<!-- <div readonly id="header"><?=$company_name?></div> -->
		
		<div id="identity">
			<br>
            <div readonly id="address"><?=$this->session->userdata('alamat')?></div>

            <div id="logo">
            	<img id="image" src="<?=base_url()?>/assets/images/<?=$this->session->userdata('logo')?>" width="100" alt="logo" />
              
            </div>
		
		</div>
		
		<div style="clear:both"></div>
		
		<div id="customer">

			<table id="meta-left">
                <tr>
                    <td class="meta-head">No. Resep</td>
                    <td><?=$receipt_number?></td>
                </tr>
                <tr>

                    <td class="meta-head">No. Diagnosa</td>
                    <td><?=$medical_record_no?></td>
                </tr>
                <tr>
                    <td class="meta-head">Dokter</td>
                    <td><div class="due"> <?=$doctor_name?></div></td>
                </tr>

            </table>

<!--             <span readonly id="customer-title">Widget Corp.
c/o Steve Widget</span> -->

            <table id="meta">
                <tr>
                    <td class="meta-head">Tanggal Resep</td>
                    <td><?=$medical_record_date?></td>
                </tr>
                <tr>

                    <td class="meta-head">Nama Pasien</td>
                    <td><?=$patient_name?></td>
                </tr>
                <tr>
                    <td class="meta-head">Jenis Pasien</td>
                    <td><div class="due"><?=$patient_type?></div></td>
                </tr>

            </table>
		
		</div>
		
		<table id="items">
		
		  <!-- <tr>
			  <th>Item</th>
				<th>Quantity</th>
		      <th>Description</th>		      
		  </tr> -->
		  <?php
		  if(count($resep)>0){
		  	foreach  ($resep as $key => $drug) {
		  		# code...
		  	
		  ?>
		  <tr class="item-row">
			  <td class="item-name"><?=$drug->{'product_name'}?></td>
			  <td><?=$drug->{'qty'}?>&nbsp;<?=$drug->{'product_unit_code'}?></td>
		      <td class="description"><?=$drug->{'notes'}?></td>		      
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
						<div class="due" align="center"><?=ucfirst($this->session->userdata('realname'))?>&nbsp;</div>
					</td>
				</tr>
		
			</table>
		
		</div>
		<!-- <div id="terms">
		  <h5>Terms</h5>
		  <span>NET 30 Days. Finance Charge of 1.5% will be made on unpaid balances after 30 days.</span>
		</div>
	 -->
	</div>
	
</body>

</html>