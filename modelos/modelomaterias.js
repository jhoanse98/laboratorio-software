"use strict"

var mongoose = require("mongoose");

var Schema = mongoose.Schema;


//creamos el respectivo esquema

var materiaschema = Schema ({

	codigodemateria: String,
	nombredemateria: String,
	year: String,
	fechadeinicio: Date,
	tipo: String,
	creditos: String,
	dias: String,
	institucion: String,
	Fechadefinalizacion: Date,
	horario: String //por ahora
})

module.exports = mongoose.model("materias", materiaschema);



//github de germangrandas/laboratoriodesoftware