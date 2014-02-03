<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
    Material.php
    Controlador de material

    @category Model
    @author Vagner Santana
    @link http://
    @version:0.1
    @since:DD/MM/YYYY
 */

class Material extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->helper(array('url'));
        $this->load->model('material_model');
    }

	public function save()
	{
        $newMaterial = array(
                'nome'      => $this->input->post('nome'),
                'desc'      => $this->input->post('desc'),
                'data'      => $this->input->post('data'),
                'tipo'      => $this->input->post('tipo'),
        );

		$result = $this->material_model->setMaterial($newMaterial);

        if($result){
            header("HTTP/1.0 200 Success");
        } else{
            echo "Error";
        }
	}

    public function get(){
        $material['id'] = $this->input->post('id');

        if($material['id']){
            $r = $this->material_model->getMaterial($material);
        } else {
            $r = $this->material_model->getMaterial();
        }

        var_dump($r);
    }

    public function update()
    {
        $material['id'] = $this->input->post('id');
        $material['nome'] = $this->input->post('nome');
        $this->material_model->updateMaterial($material);

        echo 'Ok';
    }

    public function delete()
    {
        $material['id'] = $this->input->post('id');
        $this->material_model->deleteMaterial($material);

        echo 'Ok';
    }
}
