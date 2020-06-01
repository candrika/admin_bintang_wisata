<?php

class m_masterproductdata extends CI_Model {

    function tableName() {
        return 'product';
    }

    function pkField() {
        return 'product_id';
    }

    function searchField() {
        $field = "product_name";
        return explode(",", $field);
    }

    function selectField() {
        $basic_uom_name = "(select short_desc ||' ('|| long_desc||')' from productmeasurement where measurement_id = basic_uom) as basic_uom_name ";
        $second_uom_name = "(select short_desc ||' ('|| long_desc||')' from productmeasurement where measurement_id = second_uom) as second_uom_name ";
        return "a.product_id,a.product_code,a.product_name,a.product_desc,a.basic_uom,second_uom,a.minimum_stock,a.supplier_id,a.grade,a.product_type_id,a.brand_id,a.thickness_id,b.namesupplier,c.product_type_name,d.name as gradename,e.brand_name,f.item_thickness_tct,a.status,".$basic_uom_name.",".$second_uom_name." ";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'product_name'=>'Product Name'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    left join supplier b on a.supplier_id = b.idsupplier 
                    left join product_type c on a.product_type_id = c.product_type_id
                    left join productgrade d on a.grade = d.gradeid
                    left join brand e on e.brand_id = a.brand_id
                    left join thickness f on f.thickness_id = a.thickness_id";
        return $query;
    }

    function whereQuery() {
        return null;
    }

    function orderBy() {
        return "";
    }

    function updateField() { 

        // print_r( $this->session->userdata('user_id')); die;
        $data = array(
            'product_id' => $this->m_data->getPrimaryID($this->input->post('product_id'),'product', 'product_id', $this->session->userdata('idunit')),
            'product_name' => $this->input->post('product_name'),
            'product_desc' => $this->input->post('product_desc'),
            'basic_uom' => $this->input->post('basic_uom'),
            'second_uom' => $this->input->post('second_uom'),
            'supplier_id' => $this->input->post('supplier_id'),
            'grade' => $this->input->post('grade'),
            'idunit' => $this->session->userdata('idunit'),
            'product_type_id' => $this->input->post('product_type_id'),
            'brand_id' => $this->input->post('brand_id'),
            'status'=>$this->input->post('status'),
            'thickness_id' => $this->input->post('thickness_id')
        );
        return $data;
    }

}

?>