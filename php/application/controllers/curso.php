<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
    curso.php
    Controlador de cursos

    @category Model
    @author Vagner Santana
    @link http://
    @version:0.1
    @since:DD/MM/YYYY
 */

class Curso extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->helper(array('url'));
        $this->load->model('curso_model');
    }

	public function save()
	{
        $newCurso['nome'] = $this->input->post('nome');
		$this->curso_model->setCurso($newCurso);

        echo 'Ok';
	}

    public function get(){
        $curso['id'] = $this->input->post('id');

        if($curso['id']){
            $r = $this->curso_model->getCurso($curso);
        } else {
            $r = $this->curso_model->getCurso();
        }

        var_dump($r);
    }

    public function update()
    {
        $curso['id'] = $this->input->post('id');
        $curso['nome'] = $this->input->post('nome');
        $this->curso_model->updateCurso($curso);

        echo 'Ok';
    }

    public function delete()
    {
        $curso['id'] = $this->input->post('id');
        $this->curso_model->deleteCurso($curso);

        echo 'Ok';
    }

    public function disciplina()
    {
        // TODO - Verificar se existe curso e disciplina
        $curso_disciplina['idcurso'] = $this->input->post('idcurso');
        $curso_disciplina['iddisciplina'] = $this->input->post('iddisciplina');
        $this->curso_model->setCursoDisciplina($curso_disciplina);

        echo 'Ok';
    }
}
