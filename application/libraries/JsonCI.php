<?php
 
if (!defined('BASEPATH'))
    exit('No direct script access allowed');
class JsonCI {
 
    /**
     *
     * @param <type> $json_array
     */
    function sendJSONNormal($json_array) {
        $json_str = json_encode($json_array);
        header("Content-length: " . strlen($json_str));
        echo $json_str;
    }
 
    /**
     *
     * @param <type> $responseText
     * @param <type> $data_a
     */
    function sendJSONsuccess($responseText = "", $data_a = "") {
        $ajax_res = array(
            "responseText" => $responseText,
            "success" => true,
        );
 
        if (is_array($data_a))
            $ajax_res = array_merge($ajax_res, $data_a);
        $this->sendJSON($ajax_res);
    }
 
    /**
     *
     * @param <type> $responseText
     * @param <type> $data_a
     */
    function sendJSONfailure($responseText = "", $data_a = "") {
        $ajax_res = array(
            "responseText" => $responseText,
            "success" => false,
        );
 
        if (is_array($data_a))
            $ajax_res = array_merge($ajax_res, $data_a);
 
        $this->sendJSON($ajax_res);
    }
 
    /**
     *
     * @param <type> $json_array
     */
    function sendJSON($json_array) {
        $json_str = json_encode($json_array);
        header("Content-length: " . strlen($json_str));
        echo $json_str;
        exit;
    }    
 
}
?>