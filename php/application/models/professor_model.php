<?php

/*
    professor_model.php
    Modelo para gerenciamento de professores

    @category Model
    @author Vagner Santana
    @link http://
    @version:0.1
    @since:DD/MM/YYYY
 */

class Professor_model extends CI_Model
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

    public function setProfessor($professor)
    {
        $data = array(
                'nomeProfessor'       => $professor['nome'],
                );

        return $this->db->insert('professor', $data);
    }

    public function getProfessor($professor = null)
    {
        $this->db->select('*');
        $this->db->from('professor');

        if(!$professor)
        {
            $query = $this->db->get();
            return $query->result();
        } else{
            $this->db->where("idprofessor = " . $professor['id']);
            $query = $this->db->get();
            return $query->result();
        }
    }

    public function updateProfessor($professor)
    {
        $data = array(
                'nomeProfessor'       => $professor['nome'],
                );

        $this->db->where("idprofessor = " . $professor['id']);

        return $this->db->update('professor', $data);
    }

    public function deleteProfessor($professor)
    {

        $this->db->where("idprofessor = " . $professor['id']);
        return $this->db->delete('professor');
    }
}
