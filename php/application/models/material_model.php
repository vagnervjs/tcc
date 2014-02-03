<?php

/*
    material_model.php
    Modelo para gerenciamento de material

    @category Model
    @author Vagner Santana
    @link http://
    @version:0.1
    @since:DD/MM/YYYY
 */

class Material_model extends CI_Model
{
    /**
     * __construct
     *
     * @access public
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    public function setMaterial($material)
    {
        $data = array(
                'nomeMaterial'  => $material['nome'],
                'desc'          => $material['desc'],
                'data'          => $material['data'],
                'tipo'          => $material['tipo'],
                );

        return $this->db->insert('material', $data);
    }

    public function getMaterial($material = null)
    {
        $this->db->select('*');
        $this->db->from('material');

        if(!$material)
        {
            $query = $this->db->get();
            return $query->result();
        } else{
            $this->db->where("idmaterial = " . $material['id']);
            $query = $this->db->get();
            return $query->result();
        }
    }

    public function updateMaterial($material)
    {
        $data = array(
                'nomeMaterial'       => $material['nome'],
                );

        $this->db->where("idmaterial = " . $material['id']);

        return $this->db->update('material', $data);
    }

    public function deleteMaterial($material)
    {

        $this->db->where("idmaterial = " . $material['id']);
        return $this->db->delete('material');
    }
}
