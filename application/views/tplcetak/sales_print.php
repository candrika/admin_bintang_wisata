<!doctype html>
<html lang="en">
<head>
		<meta charset="UTF-8">
		<title><?=$title?></title>
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
				Tanggal Berobat: <?=backdate2($data['medical_rec']);?><br> 
				No SO: #<?=$data['no']?><br> 
			</td>
		</tr>
		<tr>
			<td class="cell-bordered">
				<h3><?=$data['namaunit']?></h3>
			</td>
			<td class="cell-bordered">
				<h3>Billed To</h3>
			</td>
		</tr>
		<tr>
			<td class="cell-bordered">
				<p><?=$data['alamat']?><br> 
				Phone: <?=$data['telp']?><br> 
				Fax: <?=$data['fax']?> </p>
			</td>
			<td class="cell-bordered">
				<p><?=$data['customer']['namecustomer']?><br> 
				Alamat: <?=$data['customer']['address']?><br> 
				Phone: <?=$data['customer']['telephone']?><br> 
				Mobile: <?=$data['customer']['handphone']?> </p>
			</td>
		</tr>
		<tr>
			<td colspan="3"></td>
		</tr>
	</table>

	<table class="table" border="1" cellpadding="4" cellspacing="0">
		<thead>	
			<tr>
				<th width="30">NO</th>  
				<th>SKU</th>                       
				<th>NAMA BARANG</th>
				<th>QTY</th>
				<th>SAT.</th>
				<th>UKURAN</th>
				<th>SAT.</th>
				<th>JML</th>
				<th>HARGA</th>
				<th>TOTAL</th>
			</tr>
		</thead>
		<tbody>
		<?php foreach ($data['medical_fee'] as $key => $value) : ?>
			<tr>
				<td width="30"><?=$key+1?></td>
				<td><?=$value['sku_no']?></td>
				<td><?=$value['nameinventory']?></td>  
				<td align="right"><?=$value['qty']?></td>
				<td align="center"><?=$value['short_desc']?></td>
				<td align="right"><?=$value['size']?></td>
				<td align="center"><?=$value['size_measurement']?></td>
				<td align="right"><?php echo $value['qty']*$value['size']; ?></td>
				<td align="right"><?=number_format($value['price'])?></td>
				<td align="right"><?=number_format(($value['qty']*$value['size'])*$value['price'])?></td>
			</tr>
		<?php endforeach; ?>
		</tbody>
	</table>	 
	<table class="table" border="0" cellpadding="0" cellspacing="0" style="page-break-inside:avoid">
		<tr>
			<td width="55%"></td>
			<td width="15%"></td>
			<td width="2%"></td>
			<td width="18%"></td>
			<td width="10%"></td>
		</tr>
		<tr>
			<td></td>
			<td align="left">Subtotal </td>
			<td>:</td>
			<td colspan="2" align="right">
					<?=$data['detailtotal']?>
			</td>
		</tr>
		<tr>
			<td></td>
			<td align="left">Biaya Kirim </td>
			<td>:</td>
			<td></td>
			<td align="right">
					<?=number_format($data['freigthcost'],2)?>
			</td>
		</tr>
		<tr>
			<td></td>
			<td align="left">DPP </td>
			<td>:</td>
			<td align="right">
					<?=number_format($data['total_dpp'],2)?>
			</td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td align="left">PPN </td>
			<td>:</td>
			<td align="right">
					<?=number_format($data['totaltax'],2)?>
			</td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td align="left">Grand Total </td>
			<td>:</td>
			<td colspan="2" align="right">
					<?=number_format($data['total'],2)?>
			</td>
		</tr>
		<?php if($data['totalowed']=='9x0'): ?>
		<tr>
			<td></td>
			<td align="left">Saldo Terhutang </td>
			<td>:</td>
			<td colspan="2" align="right">
					<?=number_format($data['totalowed'],2)?>
			</td>
		</tr>
		<?php endif; ?>
		<tr>
			<td></td>
			<td align="left">Terbilang </td>
			<td>:</td>
			<td colspan="2" align="left"></td>
		</tr>
		<tr>
			<td></td>
			<td colspan="4" align="left"><?=$data['terbilang']?></td>
		</tr>
		<tr><td colspan="7">&nbsp;</td></tr>
		<tr>
			<td class="cell-bordered"><h3>Ship Address</h3></td>
			<!-- <td rowspan="2"></td> -->
			<td colspan="4" style="text-decoration:underline;" align="right">Payment Term: <?=$data['payment_term']?></td>
		</tr>
		<tr>
			<td class="cell-bordered"><?=$data['shipaddress']?></td>
		</tr>
		<tr><td></td></tr>
		<tr>
	</table>
	<br>

	<table class="table" border="0" cellpadding="0" cellspacing="0" style="page-break-inside:avoid">
		<tr>
			<!-- notes -->
			<td width="45%">
				<p>Notes:</p>
				<ul>
				<?php 
				foreach($data['notes'] as $note){
					if($note != null)
						echo "<li>".$note."</li>";
				}
				?>
				</ul>
			</td>
			<!-- end of notes -->
			
			<td></td>

			<!-- ttd 1 -->
			<td width="25%" align="center">
				Disetujui oleh:<br><br><br><br><br><br><br>(<?=$data['customer']['namecustomer']?>)</td>
			<!-- end of ttd1 -->

			<!-- ttd 2 -->
			<td width="25%" align="center">
				<br><br><br><br><br><br><br>(Ivan Susanto)
			</td>
			<!-- end of ttd 2 -->
		</tr>
	</table>	
</body>
</html>
