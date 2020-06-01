<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends MY_Controller {

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
		$this->smarty->assign('msg','');
                $this->smarty->display('login.tpl');
	}

	function auth($absen=false)
	{
		$cek = $this->m_user->cekUser($this->input->post('userid'),$this->input->post('password'),$absen);
		// $msg = $cek['success']==false ? $cek['msg'] : null;
		// echo 'adsad';63
		echo json_encode($cek);
	}

	function user_auth(){
	
		$response = $this->rest_coop->request('POST', 'user/login',[
			'auth' => ['17091945',''],
			'form_params' => ['userid' => $this->input->post('userid'), 'password' => $this->input->post('password')],
			'http_errors' => true
		]);

		$code = $response->getStatusCode();
		$body = json_decode($response->getBody());

		$code = $response->getStatusCode();
		
		if($code==200){
		
			$body = json_decode($response->getBody());
			// print_r($body);
			if($body->success){
				$this->session->set_userdata((array) $body->data);	
				echo json_encode($body);

			} else {
				echo json_encode($body);
			}
		
		} else {
			echo json_encode(array('success'=>false,'message'=>'Failed while connecting server ('.$code.')'));
		}
			
		// echo json_encode($body);
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
