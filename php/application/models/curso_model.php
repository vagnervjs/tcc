<?php

/*
    curso_model.php
    Modelo para gerenciamento de cursos

    @category Model
    @author Vagner Santana
    @link http://
    @version:0.1
    @since:DD/MM/YYYY
 */

class Curso_model extends CI_Model
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

    public function setCurso($curso)
    {
        $data = array(
                'nomeCurso'       => $curso['nome'],
                );

        return $this->db->insert('curso', $data);
    }

    public function getCurso($curso = null)
    {
        $this->db->select('*');
        $this->db->from('curso');

        if(!$curso)
        {
            $query = $this->db->get();
            return $query->result();
        } else{
            $this->db->where("idcurso = " . $curso['id']);
            $query = $this->db->get();
            return $query->result();
        }
    }

    public function updateCurso($curso)
    {
        $data = array(
                'nomeCurso'       => $curso['nome'],
                );

        $this->db->where("idcurso = " . $curso['id']);

        return $this->db->update('curso', $data);
    }

    public function deleteCurso($curso)
    {

        $this->db->where("idcurso = " . $curso['id']);
        return $this->db->delete('curso');
    }

    public function setCursoDisciplina($curso_disciplina)
    {
        $data = array(
                'curso_idcurso'       => $curso_disciplina['idcurso'],
                'disciplina_iddisciplina'       => $curso_disciplina['iddisciplina'],
                );

        return $this->db->insert('curso_has_disciplina', $data);
    }
}
