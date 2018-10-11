"use strict"

//cargamos la dependencia de express
var express = require("express");

//cargamos el modulo del controlador

var ControladorDeUsuarios = require("../controladores/controladorusuario.js");
var authentication = require("../tokens/aut.js");

//
var correoautenticacion = require("../tokens/autenticationemail.js")

//cargar el router de express js y con esto podemos crear rutas para nuestra API
var api = express.Router();


//creamos la ruta con el metodo get, para pasar el metodo que va a tener que cargar la pagina cuando hagamos la peticion http de esa ruta

api.get("/usuarios", authentication.autenticacion, ControladorDeUsuarios.controladorusuario)



api.get('/',(req,res)=>{
	res.status(404).send("no usado");
})

api.get("/test" , ControladorDeUsuarios.getusuario)

//api.put("/reset-contraseña", ControladorDeUsuarios.resetcontraseña)
//creamos la ruta para crear usuarios y usamos el metodo POST. el metodo post sirve para crear informacion

api.post("/crear-usuarios", ControladorDeUsuarios.crearUsuario)

//api.post("/crear-materias", ControladorDeMaterias.crearMateria)


api.post("/login", ControladorDeUsuarios.loginUsuario)


api.post("/recuperar-contrasena", ControladorDeUsuarios.cambiarcontrasena) //no se si aqui solo seria generar el token para recuperar contraseña y hacer un api.get que se encargue de solo enviar el correo


//creamos la ruta para actualizar usuario y usamos el metodo put

api.put("/actualizar-usuario/:id", authentication.autenticacion, ControladorDeUsuarios.actualizarusuario)

// creamos la ruta para eliminar un usuario de la base de datos

//api.delete("/eliminar-usuario/:id", authentication.autenticacion, ControladorDeUsuarios.Deleteusuario)
//exportamos api

module.exports= api;