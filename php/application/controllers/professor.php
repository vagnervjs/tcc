<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
    professor.php
    Controlador de professores

    @category Model
    @author Vagner Santana
    @link http://
    @version:0.1
    @since:DD/MM/YYYY
 */

class Professor extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->helper(array('url'));
        $this->load->model('professor_model');
    }

	public function save()
	{
        $newProfessor['nome'] = $this->input->post('nome');
		$this->professor_model->setProfessor($newProfessor);

        echo 'Ok';
	}

    public function get(){
        $professor['id'] = $this->input->post('id');

        if($professor['id']){
            $r = $this->professor_model->getProfessor($professor);
        } else {
            $r = $this->professor_model->getProfessor();
        }

        var_dump($r);
    }

    public function update()
    {
        $professor['id'] = $this->input->post('id');
        $professor['nome'] = $this->input->post('nome');
        $this->professor_model->updateProfessor($professor);

        echo 'Ok';
    }

    public function delete()
    {
        $professor['id'] = $this->input->post('id');
        $this->professor_model->deleteProfessor($professor);

        echo 'Ok';
    }
}
