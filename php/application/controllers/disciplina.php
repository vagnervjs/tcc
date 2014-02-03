<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
    disciplina.php
    Controlador de disciplina

    @category Model
    @author Vagner Santana
    @link http://
    @version:0.1
    @since:DD/MM/YYYY
 */

class Disciplina extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->helper(array('url'));
        $this->load->model('disciplina_model');
    }

	public function save()
	{
        $newDisciplina['nome'] = $this->input->post('nome');
		$this->disciplina_model->setDisciplina($newDisciplina);

        echo 'Ok';
	}

    public function get(){
        $disciplina['id'] = $this->input->post('id');

        if($disciplina['id']){
            $r = $this->disciplina_model->getDisciplina($disciplina);
        } else {
            $r = $this->disciplina_model->getDisciplina();
        }

        var_dump($r);
    }

    public function update()
    {
        $disciplina['id'] = $this->input->post('id');
        $disciplina['nome'] = $this->input->post('nome');
        $this->disciplina_model->updateDisciplina($disciplina);

        echo 'Ok';
    }

    public function delete()
    {
        $disciplina['id'] = $this->input->post('id');
        $this->disciplina_model->deleteDisciplina($disciplina);

        echo 'Ok';
    }

    public function professor()
    {
        // TODO - Verificar se existe curso e disciplina
        $disciplina_professor['iddisciplina'] = $this->input->post('iddisciplina');
        $disciplina_professor['idprofessor'] = $this->input->post('idprofessor');
        $this->disciplina_model->setDisciplinaProfessor($disciplina_professor);

        echo 'Ok';
    }
}
