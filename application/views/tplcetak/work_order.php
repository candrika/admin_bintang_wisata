<!doctype html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title>
		<?=$title?>
	</title>
	<!-- <link href="<?=base_url()?>/assets/css/print2.css" rel="stylesheet"> -->
</head>

<body>

<table border="1" cellpadding="4" cellspacing="0" style="width:2000px;">		
					<!-- <thead>	 -->
		<tr>
			<th width="30">NO</th>  
			<th>No WO</th>      
			<th>Status</th>                 			
			<th width="300">Konsumen</th>
			<th>No SKP</th>
			<th width="100">Harus Sls Tgl</th>		
			<th width="200">Tgl Mulai</th>
			<th width="200">Tgl Akhir</th>	
			<th>Alamat</th>
			<th>Alamat Kirim</th>			
			<th>Catatan</th>
		</tr>
		<!-- 			</thead>
		<tbody> -->
			<?php
			// print_r($data);
			$no=1;
			foreach ($data as $key => $value) {

				if($value['status']==1){
					$status = 'Open';
				} else if($value['status']==2){
					$status = 'Confirmed';
				} else if($value['status']==3){
					$status = 'On Progress';
				} else if($value['status']==4){
					$status = 'Received';
				} else if($value['status']==5){
					$status = 'Ready To Deliver';
				} else if($value['status']==6){
					$status = 'Canceled';
				}
				?>
					<tr>
						<td><?=$no?></td>
						<td><?=$value['job_no']?></td>
						<td width="140"><?=$status?></td>
						<td><?=$value['req_ship_date']?></td>  
						<td><?=$value['namecustomer']?></td>  
						<td><?=$value['no_sales_order']?></td>	
						<td><?=$value['startdate_job']?></td>  
						<td><?=$value['enddate_job']?></td>					
						<td><?=$value['address_customer']?></td>  
						<td><?=$value['shipaddress_so']?></td>  						
						<td><?=$value['remarks']?></td>
						
					</tr>
				<?php
				$no++;
			}
			?>
		<!-- </tbody> -->

				</table>
	<!-- <br> -->

	
</body>
</html>