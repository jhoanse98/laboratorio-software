"use strict"

var express = require("express");

var ControladorDeMaterias = require("../controladores/controladormaterias.js");

var authentication = require("../tokens/aut.js");


var api = express.Router();

api.get("/materias", ControladorDeMaterias.controlmaterias);
api.post("/crear-materias", authentication.autenticacion, ControladorDeMaterias.crearMaterias);

module.exports=api;