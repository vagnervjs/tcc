<?php

/*
    disciplina_model.php
    Modelo para gerenciamento de disciplinas

    @category Model
    @author Vagner Santana
    @link http://
    @version:0.1
    @since:DD/MM/YYYY
 */

class Disciplina_model extends CI_Model
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

    public function setDisciplina($disciplina)
    {
        $data = array(
                'nomeDisciplina'       => $disciplina['nome'],
                );

        return $this->db->insert('disciplina', $data);
    }

    public function getDisciplina($disciplina = null)
    {
        $this->db->select('*');
        $this->db->from('disciplina');

        if(!$disciplina)
        {
            $query = $this->db->get();
            return $query->result();
        } else{
            $this->db->where("iddisciplina = " . $disciplina['id']);
            $query = $this->db->get();
            return $query->result();
        }
    }

    public function updateDisciplina($disciplina)
    {
        $data = array(
                'nomeDisciplina'       => $disciplina['nome'],
                );

        $this->db->where("iddisciplina = " . $disciplina['id']);

        return $this->db->update('disciplina', $data);
    }

    public function deleteDisciplina($disciplina)
    {

        $this->db->where("iddisciplina = " . $disciplina['id']);
        return $this->db->delete('disciplina');
    }

    public function setDisciplinaProfessor($disciplina_professor)
    {
        $data = array(
                'disciplina_iddisciplina'       => $disciplina_professor['iddisciplina'],
                'professor_idprofessor'       => $disciplina_professor['idprofessor'],
                );

        return $this->db->insert('disciplina_has_professor', $data);
    }
}
