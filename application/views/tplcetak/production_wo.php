<!doctype html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title>
		<?=$title?>
	</title>
	<link href="<?=base_url()?>/assets/css/print2.css" rel="stylesheet">
</head>
<body>
	<table class="table" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td style="width:45%">
					<?=$this->logo?>
			</td>
			<td rowspan="3" style="width:10%">&nbsp;</td>
			<td style="width:45%" align="right">
				<h2><?=$title?></h2>
				<h3 style="font-size: 14pt;">No WO: #<?=$data['header']['job_no']?><br> 
				Harus Selesai Tanggal: <?=backdate2($data['header']['req_ship_date'])?></h3>
			</td>
		</tr>
	</table>
	<br>
	<table class="table" border="1" cellpadding="4" cellspacing="0">
		<thead>	
			<tr>
				<th width="40">NO</th>  
				<th>BARANG JADI</th>    
				<th>QTY</th>                 
				<th>SAT.</th>
				<th>UKRN</th>
				<th>SAT.</th>
				<th>KODE BRG</th>
				<th>BHN BAKU</th>
				<th>QTY</th>
				<th>SAT.</th>
				<th width="120">KET</th>
			</tr>
		</thead>
		<tbody>
		<?php foreach ($data['fg_list'] as $key => $value): ?>
			<tr>
				<td width="30"><?=$key+1?></td>
				<td><?=$value['nameinventory']?></td> 
				<td align="right"><?=number_format($value['qty'])?></td>   
				<td align="center"><?=$value['short_desc']?></td>  
				<td align="right"><?=$value['size']?></td>  
				<td align="center"><?=$value['size_measurement']?></td>  
				<td><?php if($value['rm_list'][0]['invno']) echo $value['rm_list'][0]['invno']; ?></td>  
				<td><?php if($value['rm_list'][0]['invno']) echo $value['rm_list'][0]['nameinventory'];?></td>
				<td align="right"><?php if($value['rm_list'][0]['invno']) echo $value['rm_list'][0]['qty'];?></td>  
				<td align="center"><?php if($value['rm_list'][0]['invno']) echo $value['rm_list'][0]['measurement_name'];?></td>
				<td>&nbsp;</td>
			</tr>
		<?php endforeach; ?>
		</tbody>
	</table>
	<br>
	<table class="table" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td class="cell-bordered" width="40%">
				<h4>SKP (SO)</h4>
			</td>
			<td>&nbsp;</td>
			<td class="cell-bordered" width="35%">
				<h4>Keterangan</h4>
			</td>
		</tr>
		<tr>
			<td class="cell-bordered">
				<table class="table-child" cellpadding="0" cellspacing="0">
					<tr >
						<td width="30%">No SKP (SO)</td>
						<td>:</td>
						<td style="font-size:13pt;" align="right"><?=$data['header']['no_sales_order']?></td>
					</tr>
					<tr>
						<td>Customer</td>
						<td>:</td>
						<td style="font-size:13pt;" align="right"><?=$data['header']['namecustomer']?></td>
					</tr>
					<tr>
						<td>Alamat</td>
						<td>:</td>
						<td style="font-size:13pt;" align="right"><?=$data['header']['address_customer']?></td>
					</tr>
				</table>
			</td>
			<td>&nbsp;</td>
			<td class="cell-bordered"  style="vertical-align: top;" >
				<table class="table-child" cellpadding="0" cellspacing="0">
					<tr style="font-size:13pt;">
						<td width="40%">Tanggal Cetak</td>
						<td>:</td>
						<td align="right"><?=date('d-m-Y')?></td>
					</tr>
					<tr>
						<td>Dicetak oleh</td>
						<td>:</td>
						<td align="right"><?=$this->session->userdata('realname')?></td>
					</tr>
				</table>
			</td>
		</tr>
		<tr><td colspan="3">&nbsp;</td></tr>
		<tr>
			<td class="cell-bordered" width="40%">
				<h4>Ship to</h4>
			</td>
			<td colspan="2">&nbsp;</td>
		</tr>
		<tr>
			<td class="cell-bordered">
				<?=$data['shipaddress_so']?:"- <br>"?>
			</td>
		</tr>
	</table>
</body>
</html>