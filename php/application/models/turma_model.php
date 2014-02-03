<?php

/*
    turma_model.php
    Modelo para gerenciamento de turmas

    @category Model
    @author Vagner Santana
    @link http://
    @version:0.1
    @since:DD/MM/YYYY
 */

class Turma_model extends CI_Model
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

    public function setTurma($turma)
    {
        $data = array(
                'nomeTurma'       => $turma['nome'],
                );

        return $this->db->insert('turma', $data);
    }

    public function getTurma($turma = null)
    {
        $this->db->select('*');
        $this->db->from('turma');

        if(!$turma)
        {
            $query = $this->db->get();
            return $query->result();
        } else{
            $this->db->where("idturma = " . $turma['id']);
            $query = $this->db->get();
            return $query->result();
        }
    }

    public function updateTurma($turma)
    {
        $data = array(
                'nomeTurma'       => $turma['nome'],
                );

        $this->db->where("idturma = " . $turma['id']);

        return $this->db->update('turma', $data);
    }

    public function deleteTurma($turma)
    {

        $this->db->where("idturma = " . $turma['id']);
        return $this->db->delete('turma');
    }

    public function setTurmaDisciplina($turma_disciplina)
    {
        $data = array(
                'turma_idturma'       => $turma_disciplina['idturma'],
                'disciplina_iddisciplina'       => $turma_disciplina['iddisciplina'],
                );

        return $this->db->insert('turma_has_disciplina', $data);
    }

    public function setTurmaMaterial($turma_material)
    {
        $data = array(
                'turma_idturma'       => $turma_material['idturma'],
                'material_idmaterial'       => $turma_material['idmaterial'],
                );

        return $this->db->insert('turma_has_material', $data);
    }
}
