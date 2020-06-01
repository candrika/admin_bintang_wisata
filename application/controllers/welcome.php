<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		// $this->load->view('welcome_message');
		echo 'index';
	}

	function tesmssql($table=null)
	{
		// echo 'asd';
		// $dbmssql = $this->load->database('mssql', TRUE);
		// // $dbmssql->get('PegawaSi');
		// // echo ':'.$dbmssql->num_rows();
		// 	$q = $dbmssql->query("SELECT * 
		// 		  FROM syscolumns 
		// 		 WHERE id=OBJECT_ID('".$table."') ");
		// 		echo 'asd'.$q->last_query();
		// 		$field1 = array();
		// 		foreach ($q->result() as $r) {
		// 			$field = 'name';
		// 			// echo $r->$field.'<br/>';
		// 			array_push($field1, $r->$field);
		// 		}

		try
		{
		 $db = new PDO('odbc:Driver=FreeTDS; Server=192.168.56.101; Port=1433; Database=sipeg; UID=sa; PWD=sa123456;');
		}
		catch(PDOException $exception)
		{
		die("Unable to open database.Error message:$exception.");
		}
		echo 'Successfully connected!<hr/>';

		$query = "SELECT *
					  FROM syscolumns 
					 WHERE id=OBJECT_ID('".$table."') ";

		$field1 = array();
	    foreach ($db->query($query) as $row) {
	        // print $row['name'] . "\t";
	        array_push($field1, $row['name']);
	    }

		$q = $this->db->query("select column_name from information_schema.columns where
table_name='".$table."'");
		$field2 = array();
		foreach ($q->result() as $r) {
					$field = 'column_name';
					array_push($field2, $r->$field);
					// echo $r->$field.'<br/>';
		}

		$data = array();
		// $q = $dbmssql->query("SELECT * FROM ".$table."");
		$i=0;
		// foreach ($q->result() as $r) {
		// 	# code...
		// 	foreach ($field1 as $key => $value) {
		// 		# code...
		// 		$data[$i][strtolower($value)] = $r->$value;
		// 	}
		// 	// break;
		// 	$i++;
		// }

		$query = "SELECT *
					  FROM $table";
	    foreach ($db->query($query) as $row) {
	    	foreach ($field1 as $key => $value) {
		// 		# code...
	    		if($value=='nmuser')
	    		{
	    			$data[$i]['userin'] = $row[$value];
	    			$data[$i]['usermod'] = $row[$value];
	    		} else if($value=='startdate' || $value=='enddate')
	    		{
	    			// $data[$i]['datemod'] = $row[$value];
	    			// $data[$i]['datein'] = $row[$value];
	    			$data[$i]['userin'] = $row[$value];
	    			$data[$i]['usermod'] = $row[$value];
	    		} else if($value=='tglupdate')
	    		{
	    			$data[$i]['datemod'] = $row[$value];
	    			$data[$i]['datein'] = $row[$value];
	    		} else if($value=='NMUSER')
	    		{
	    			$data[$i]['userin'] = $row[$value];
	    			$data[$i]['usermod'] = $row[$value];
	    		} else if($value=='TGLUPDATE')
	    		{
	    			$data[$i]['datemod'] = $row[$value];
	    			$data[$i]['datein'] = $row[$value];
	    		} else if($value=='GolPegId')
	    		{
	    			$data[$i]['golpegid'] = $row[$value] == null ? 'U9999' : strtoupper($row[$value]);
	    		}
	    		 else {
//                             if(strtolower($value)!='nortugas')
//                             {
                                 $data[$i][strtolower($value)] = $row[$value];
//                             }
	    			
//                                echo utf8_encode($row[$value]);
	    		}
				
			}
			$i++;
			// break;
	    }
	    // print_r($data);
	    $dbsipeg = $this->load->database('sipeg', TRUE);

		$table = strtolower($table);
		$i-=1;
		for($j=0;$j<=$i;$j++)
		{
			echo $j;
			print_r($data[$j]);
                        
                        
                        
                            $dbsipeg->insert($table,$data[$j]);
			
			echo $j.$dbsipeg->last_query().'<br/>';
		}

	}

	function tescon()
	{
		$myServer = '192.168.56.101';
			$myUser = "sa";
			$myPass = "sa123456";

// 			$dbhandle = mssql_connect($myServer, $myUser, $myPass)
// 			or die("Couldn't connect to SQL Server on $myServer. Error: " . mssql_get_last_message());
// var_dump($dbhandle);
		$db = new PDO("dblib:host=$myServer;dbname=sipeg;charset=UTF-8", $myUser, $myPass);

	}

	function tesodbc()
	{
		try
		{
		 $db = new PDO('odbc:Driver=FreeTDS; Server=192.168.56.101; Port=1433; Database=sipeg; UID=sa; PWD=sa123456;');
		}
		catch(PDOException $exception)
		{
		die("Unable to open database.Error message:$exception.");
		}
		echo 'Successfully connected!<hr/>';

		$query = "SELECT *
					  FROM syscolumns 
					 WHERE id=OBJECT_ID('Bank') ";

	    foreach ($db->query($query) as $row) {
	        print $row['name'] . "\t";
	        // print_r($row);
	    }

		// $query = "SELECT *
		// 		  FROM syscolumns 
		// 		 WHERE id=OBJECT_ID('Bank') ";
		// $statement = $db->prepare($query);
		// $statement->bindValue(1, 'Value', PDO::PARAM_STR);
		// $statement->execute();
		// $result = $statement->fetchAll(PDO::FETCH_NUM);
		// var_dump($result);
	}

	function udpateggolongan()
	{
		 $dbsipeg = $this->load->database('sipeg', TRUE);
		 $q = $dbsipeg->get('golongan');
		 foreach ($q->result() as $r) {
		 	$dbsipeg->where('golpegid',$r->golpegid);
		 	$dbsipeg->update('golongan',array('golpegid'=>strtoupper($r->golpegid)));
		 }
	}

	function updatepegawai($table='PEGAWAI')
	{

		try
		{
		 $db = new PDO('odbc:Driver=FreeTDS; Server=192.168.56.101; Port=1433; Database=sipeg; UID=sa; PWD=sa123456;');
		}
		catch(PDOException $exception)
		{
		die("Unable to open database.Error message:$exception.");
		}
		echo 'Successfully connected!<hr/>';

		$query = "SELECT *
					  FROM syscolumns 
					 WHERE id=OBJECT_ID('".$table."') ";

		$field1 = array();
	    foreach ($db->query($query) as $row) {
	        array_push($field1, $row['name']);
	    }

		$q = $this->db->query("select column_name from information_schema.columns where
table_name='".$table."'");
		$field2 = array();
		foreach ($q->result() as $r) {
					$field = 'column_name';
					array_push($field2, $r->$field);
					// echo $r->$field.'<br/>';
		}

		$data = array();
		$i=0;
		$daftarfield = '';
		foreach ($field1 as $key => $value) {
			$daftarfield.=$value.',';
		}
		 // $query = "SELECT * FROM $table WHERE pegawainid='5582204J'";
		$query = "SELECT PegawaiNid,JobClass,KodeRumah,Kondite,KodeBayar,Keluarga,PRK_GAJI,KEDUDUKAN,LANTAI,
		TELEPON_EXT,GEDUNG,TGLCUTI,TGLWINDUAN,NOPAJAK,GAJICODE,kodejab,lastupdateby,
		lastupdatedate,nourutdir,mskrjbeli,indexgaji,bumrumah,statusbumrumah,Nourutgaji
		,KodeTunDaerah,KodeTunPensiun,skala,NourutProfesi,KodeKompetensi,skalaphdp,
		nourutprofesi2,kodeprofesi1,kodeprofesi2,tglnpwp,unit,grade,jab,prof1,prof2,
		perner,kodedplk,NomorRekdplk FROM $table";

		$dbsipeg = $this->load->database('sipeg', TRUE);
	    
	    foreach ($db->query($query) as $row) {
	    	// echo $row['Keluarga'].'<hr/>';
	    	print_r($row).'<hr/>';
	    	foreach ($field1 as $key => $value) {
		// 		# code...
	    		// print_r($row).'<hr/>';

	    		// if($value=='nmuser')
	    		// {
	    		// 	$data[$i]['userin'] = $row[$value];
	    		// 	$data[$i]['usermod'] = $row[$value];
	    		// } else if($value=='startdate' || $value=='enddate')
	    		// {
	    		// 	// $data[$i]['datemod'] = $row[$value];
	    		// 	// $data[$i]['datein'] = $row[$value];
	    		// 	$data[$i]['userin'] = $row[$value];
	    		// 	$data[$i]['usermod'] = $row[$value];
	    		// } else if($value=='tglupdate')
	    		// {
	    		// 	$data[$i]['datemod'] = $row[$value];
	    		// 	$data[$i]['datein'] = $row[$value];
	    		// } else if($value=='NMUSER')
	    		// {
	    		// 	$data[$i]['userin'] = $row[$value];
	    		// 	$data[$i]['usermod'] = $row[$value];
	    		// } else if($value=='TGLUPDATE')
	    		// {
	    		// 	$data[$i]['datemod'] = $row[$value];
	    		// 	$data[$i]['datein'] = $row[$value];
	    		// } else if($value=='GolPegId')
	    		// {
	    		// 	$data[$i]['golpegid'] = $row[$value] == null ? 'U9999' : strtoupper($row[$value]);
	    		// }
	    		//  else {
	    			if(isset($row[$value]))
	    			{
	    				// echo "xxxx".$value;
	    				if($value=='Kondite')
	    				{
	    					$kondite = strtolower(str_replace(" ", "", str_replace("'", "", $row[$value])));
	    					echo 'KONDITE:'.$kondite;
	    					$data[$i][strtolower($value)] = $kondite == '' ? NULL : $kondite; 
	    				} else {
	    					$data[$i][strtolower($value)] = $row[$value];
	    				}
	    				
	    			}
	    			
	    		// }
				
			}

			 $dbsipeg->where('pegawainid',$data[$i]['pegawainid']); 
			 $dbsipeg->update('ms_pegawai',$data[$i]);
			 echo $dbsipeg->last_query().'<hr/>';
			 $i++;
			// break;
			// print_r($data);
	    }
	    // print_r($data);
	    $dbsipeg = $this->load->database('sipeg', TRUE);

		$table = strtolower($table);
		$i-=1;
		for($j=0;$j<=$i;$j++)
		{
			// echo $j;
			// print_r($data[$j]);
			// echo '<hr/>';
			// $dbsipeg->insert($table,$data[$j]);
			// echo $j.$dbsipeg->last_query().'<br/>';
		}

	}

	function migrate_multi_do(){
		$this->load->model('m_data');

		//update status delivery order
		$q = $this->db->query('select a.delivery_order_id,a.status as status_do,b.idsales,b.no_sales_order, b.status as status_so
								from delivery_order a
								join sales b oN a.idsales = b.idsales
								where a.status is null
								order by status_so asc');
		foreach ($q->result() as $r) {
			if($r->status_so==3){
				//so confirm, do confirm
				$this->db->where('delivery_order_id',$r->delivery_order_id);
				$this->db->update('delivery_order',array('status'=>2));
			} else if($r->status_so==6){
				//so partial, do delivering
				$this->db->where('delivery_order_id',$r->delivery_order_id);
				$this->db->update('delivery_order',array('status'=>3));
			} else if($r->status_so==7){
				//so delivered, do delivered
				$this->db->where('delivery_order_id',$r->delivery_order_id);
				$this->db->update('delivery_order',array('status'=>4));
			} else if($r->status_so==8){
				//so invoiced, do delivered
				$this->db->where('delivery_order_id',$r->delivery_order_id);
				$this->db->update('delivery_order',array('status'=>4));
			}
		}

		$this->db->where('deleted',null);
		$this->db->update('delivery_order',array('deleted'=>0));

		//insert do item
		$q = $this->db->query("select distinct a.idsales,b.delivery_order_id
			from sales a
			join delivery_order b ON a.idsales = b.idsales");
		foreach ($q->result() as $r) {
			
			$q2 = $this->db->query("select qty_kirim,warehouse_id,total,idsalesitem
										from salesitem
										where idsales = ".$r->idsales." ");
			foreach ($q2->result() as $r2) {
				if($r2->qty_kirim!=null){
					echo $r->idsales.' ';
					$item = array(
							"do_item_id" => $this->m_data->getPrimaryID2($this->input->post('do_item_id'),'deliver_order_item','do_item_id'),
							"delivery_order_id" => $r->delivery_order_id,
							"qty_kirim" => $r2->qty_kirim,
							// "qty_terima" => ,
							// "qty_retur" => ,
							// "notes" => ,
							'userin'=> $this->session->userdata('userid'),
            				'datein'=> date('Y-m-d H:m:s'),
							"usermod" => $this->session->userdata('userid'),
							"datemod" => date('Y-m-d H:m:s'),
							// "is_tmp" => ,
							// "id_tmp" => ,
							// "measurement_id" => ,
							"warehouse_id" => $r2->warehouse_id,
							// "qty_sisa" => ,
							"idsalesitem" => $r2->idsalesitem,
							"total_amount"  => $r2->total,
							"qty_order" => $r2->qty_kirim
						);

					$qcek = $this->db->get_where('deliver_order_item',array(
							"delivery_order_id" => $r->delivery_order_id,
							"idsalesitem" => $r2->idsalesitem,
						));
					if($qcek->num_rows()<=0){
						$this->db->insert('deliver_order_item',$item);
					}


				} else {
					echo '('.$r->idsales.') ';
				}
			}
			// if($q2->num_rows()>0){
				// $r2 = $q2->row();
				
			// }
		}

		//copy sales invoice value from table sales into sales invoice
		$q = $this->db->query("select a.delivery_order_id,a.idsales
									from delivery_order a
									order by a.delivery_order_id");
		foreach ($q->result() as $r) {
			// $q2 = $this->db->get_where('sales',array('idsales'=>$r->idsales,''));
			$q2 = $this->db->query("select * from sales	where noinvoice is not null and idsales = ".$r->idsales." ");
			if($q2->num_rows()>0){
				$r2 = $q2->result_array()[0];

				// $qinv = $this->db->get_where('sales_invoice')

				 $data = array(
		                'noinvoice'=>$r2['noinvoice'],
		                'paidtoday'=> $r2['paidtoday'], //masih jadi piutang
		                'balance'=>$r2['balance'], //piutang masih full
		                'idpayment' => $r2['idpayment'],
		                'ddays' => $r2['ddays'],
		                'eomddays' => $r2['eomddays'],
		                'percentagedisc' => $r2['percentagedisc'],
		                'daydisc' => $r2['daydisc'],
		                'notes_si' => $r2['notes_si'],
		                'invoice_status'=>$r2['invoice_status'],
		                'disc'=>$r2['disc'],
		                'freight'=> $r2['freight'],
		                // 'noinvoice'=> $r2['noinvoice'],
		                'invoice_date' => $r2['invoice_date'],
		                'subtotal'=>$r2['subtotal'],
		                'total_dpp'=> $r2['total_dpp'],
		                'tax'=> $r2['tax'],
		                'discount'=>$r2['disc'],
		                'totalamount'=> $r2['totalamount'],
		                'comments'=> $r2['comments'],
		                'expireddate'=> $r2['expireddate'],
		                'include_tax'=> $r2['include_tax'],
		                // 'no_faktur'=> $r2['no_faktur'],
		                'dmax'=> $r2['dmax'],
		                'duedate'=> $r2['duedate'],
		                'notes_si'=> $r2['notes_si'],
		                'id_inv'=> $r2['id_inv'],
		                'sales_invoice_id'=> $this->m_data->getPrimaryID(null,'sales_invoice', 'sales_invoice_id', $this->session->userdata('idunit')),
		                'idunit'=> $this->session->userdata('idunit')
		                // 'status'=> 8 //invoiced
		            );

					$data['idsales'] = $r->idsales;
					
					$data['datein'] = date('Y-m-d H:m:s');
					$data['userin'] = $this->session->userdata('userid');
					$data['delivery_order_id'] = $r->delivery_order_id;
					$data['sales_invoice_id'] = $this->m_data->getPrimaryID(null,'sales_invoice', 'sales_invoice_id', $this->session->userdata('idunit'));

					$q = $this->db->get_where('sales_invoice',array(
							'delivery_order_id'=> $r->delivery_order_id,
							'idsales'=>$r->idsales
						));
					if($q->num_rows()>0){

						$r = $q->row();
						$data['idjournal'] = $r->idjournal;

						$this->db->where(array(
							'delivery_order_id'=> $r->delivery_order_id,
							'idsales'=>$r->idsales
						));
						$this->db->update('sales_invoice',$data);
					} else {
						$this->db->insert('sales_invoice',$data);
					}

					$this->db->where(array(
							'delivery_order_id'=> $r->delivery_order_id,
							'idsales'=>$r->idsales
						));
					$this->db->update('delivery_order',array('no_faktur'=>$r2['no_faktur']));
					
			}
		}
	}

	function search_do(){
		//search duplicate do
		$q = $this->db->get('delivery_order');
		foreach ($q->result() as $r) {
			$qn = $this->db->get_where('delivery_order',array('delivery_order_id'=>$r->delivery_order_id));
			if($qn->num_rows()>0){
				$rn = $qn->row();
				echo $rn->delivery_order_id.' '.$qn->num_rows().' . <br>'; 
			}
		}
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */