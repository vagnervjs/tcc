<?php

/*
    aluno_model.php
    Modelo para gerenciamento de alunos

    @category Model
    @author Vagner Santana
    @link http://
    @version:0.1
    @since:DD/MM/YYYY
 */

class Aluno_model extends CI_Model
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

    public function setAluno($aluno)
    {
        $data = array(
                'nomeAluno'       => $aluno['nome'],
                );

        return $this->db->insert('aluno', $data);
    }

    public function getAluno($aluno = null)
    {
        $this->db->select('*');
        $this->db->from('aluno');

        if(!$aluno)
        {
            $query = $this->db->get();
            return $query->result();
        } else{
            $this->db->where("idaluno = " . $aluno['id']);
            $query = $this->db->get();
            return $query->result();
        }
    }

    public function updateAluno($aluno)
    {
        $data = array(
                'nomeAluno'       => $aluno['nome'],
                );

        $this->db->where("idaluno = " . $aluno['id']);

        return $this->db->update('aluno', $data);
    }

    public function deleteAluno($aluno)
    {

        $this->db->where("idaluno = " . $aluno['id']);
        return $this->db->delete('aluno');
    }

    public function setAlunoCurso($aluno_curso)
    {
        $data = array(
                'aluno_idaluno'       => $aluno_curso['idaluno'],
                'curso_idcurso'       => $aluno_curso['idcurso'],
                );

        return $this->db->insert('aluno_has_curso', $data);
    }

    public function setAlunoTurma($aluno_turma)
    {
        $data = array(
                'aluno_idaluno'       => $aluno_turma['idaluno'],
                'turma_idturma'       => $aluno_turma['idturma'],
                );

        return $this->db->insert('aluno_has_turma', $data);
    }
}
