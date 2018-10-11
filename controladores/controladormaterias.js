"use strict"

function controlmaterias(req,res){

	res.status(200).send({mensaje: "probando controlador de materias y no el de usuarios"})
}

var Materias = require("../modelos/modelomaterias.js");

function crearMaterias(req,res){

	var materia = new Materias();
	var parametros = req.body;

	materia.codigodematerias = parametros.codigodematerias;
	materia.nombredemateria = parametros.nombredemateria;
	materia.year = parametros.year;
	materia.fechadeinicio = parametros.fechainicio;
	materia.tipo = parametros.tipo;
	materia.creditos = parametros.creditos;
	materia.dias = parametros.dias;
	materia.Fechadefinalizacion = parametros.fecha_final;
	materia.horario = parametros.horario;
	materia.institucion = parametros.institucion;

	console.log(req.body);

	materia.save((error, materiacreada)=>{
		if (error){
			res.status(500).send({mensaje: "hubo un error en el guardado de usuario"})
			}
		else{
			res.status(200).send({materiacreada})
			}
	})
	

	

	
}

module.exports = {
	controlmaterias,
	crearMaterias
}

