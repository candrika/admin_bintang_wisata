<?php        
class MY_Model extends CI_Model{
            
    function __construct() {
        parent::__construct();
    }

    function where_unit($colidunit)
    {
        if($this->session->userdata('group_id')!=99)
        {
            $idunit = $this->session->userdata('idunit');
            return " $colidunit=$idunit ";
        } else {
            return null;
        }
    }
}
?>