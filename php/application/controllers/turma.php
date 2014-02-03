<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
    Turma.php
    Controlador de turmas

    @category Model
    @author Vagner Santana
    @link http://
    @version:0.1
    @since:DD/MM/YYYY
 */

class Turma extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->helper(array('url'));
        $this->load->model('turma_model');
    }

	public function save()
	{
        $newTurma['nome'] = $this->input->post('nome');
		$this->turma_model->setTurma($newTurma);

        echo 'Ok';
	}

    public function get(){
        $turma['id'] = $this->input->post('id');

        if($turma['id']){
            $r = $this->turma_model->getTurma($turma);
        } else {
            $r = $this->turma_model->getTurma();
        }

        var_dump($r);
    }

    public function update()
    {
        $turma['id'] = $this->input->post('id');
        $turma['nome'] = $this->input->post('nome');
        $this->turma_model->updateTurma($turma);

        echo 'Ok';
    }

    public function delete()
    {
        $turma['id'] = $this->input->post('id');
        $this->turma_model->deleteTurma($turma);

        echo 'Ok';
    }

    public function disciplina()
    {
        // TODO - Verificar se existe turma e disciplina
        $turma_disciplina['idturma'] = $this->input->post('idturma');
        $turma_disciplina['iddisciplina'] = $this->input->post('iddisciplina');
        $this->turma_model->setTurmaDisciplina($turma_disciplina);

        echo 'Ok';
    }

    public function material()
    {
        // TODO - Verificar se existe turma e material
        $turma_material['idturma'] = $this->input->post('idturma');
        $turma_material['idmaterial'] = $this->input->post('idmaterial');
        $this->turma_model->setTurmaMaterial($turma_material);

        echo 'Ok';
    }
}
