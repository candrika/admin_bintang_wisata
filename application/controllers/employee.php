<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class employee extends MY_Controller {

	public function index() {
        // echo date('m');
    }

    public function change_pass(){

    	$response = $this->rest_client->put('employee/change_pass',[
    		'auth'=>[$this->session->userdata('api_key'),''],
    		'form_params'=>array(
    			'employee_id'=>$this->input->post('employee_id'),
    			'new_password'=>$this->input->post('new_password'),
    			'repeat_new_password'=>$this->input->post('repeat_new_password'),
    			'idunit'=>$this->input->post('idunit'),
    		),
    		'http_errors'=>false
    	]);

    	$b = $response->getBody();

    	echo $b;
    }
}
?>