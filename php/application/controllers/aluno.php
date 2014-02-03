<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
    aluno.php
    Controlador de alunos

    @category Model
    @author Vagner Santana
    @link http://
    @version:0.1
    @since:DD/MM/YYYY
 */

class Aluno extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->helper(array('url'));
        $this->load->model('aluno_model');
    }

    public function generateRandomString($length = 10)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }
        return $randomString;
    }
	public function save()
	{
        $newAluno['nome'] = $this->input->post('nome');
        // $newAluno['nome'] = $this->generateRandomString(8);
		$this->aluno_model->setAluno($newAluno);

        var_dump ($newAluno['nome']);
	}

    public function get(){
        $aluno['id'] = $this->input->post('id');
        // $aluno['id'] = 9999;

        if($aluno['id']){
            $r = $this->aluno_model->getAluno($aluno);
        } else {
            $r = $this->aluno_model->getAluno();
        }

        var_dump($r);
    }

    public function update()
    {
        $aluno['id'] = $this->input->post('id');
        $aluno['nome'] = $this->input->post('nome');
        // $aluno['id'] = rand(0, 380937);
        // $aluno['nome'] = $this->generateRandomString(8);
        $this->aluno_model->updateAluno($aluno);

        var_dump($aluno['nome']);
    }

    public function delete()
    {
        $aluno['id'] = $this->input->post('id');
        $this->aluno_model->deleteAluno($aluno);

        echo 'Ok';
    }

    public function curso()
    {
        // TODO - Verificar se existe aluno e curso
        $aluno_curso['idaluno'] = $this->input->post('idaluno');
        $aluno_curso['idcurso'] = $this->input->post('idcurso');
        $this->aluno_model->setAlunoCurso($aluno_curso);

        echo 'Ok';
    }

    public function turma()
    {
        // TODO - Verificar se existe aluno e turma
        $aluno_turma['idaluno'] = $this->input->post('idaluno');
        $aluno_turma['idturma'] = $this->input->post('idturma');
        $this->aluno_model->setAlunoTurma($aluno_turma);

        echo 'Ok';
    }
}
