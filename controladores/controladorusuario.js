"use strict"

function controladorusuario(req,res){

	res.status(200).send({mensaje: "probando controlador de usuarios"})
}

var Usuario= require("../modelos/modelousuarios.js");

//para poder encriptar 
var bcrypt = require("bcrypt-nodejs")

function controladorusuario(req,res){
	res.status(200).send({mensaje: "probando controlador de usuarios"})
}

function crearUsuario(req,res){

	var usuario = new Usuario();

	var parametros = req.body;
	//console.log(parametros)
	usuario.nombre = parametros.nombre;
	usuario.apellido= parametros.apellido;
	usuario.documento= parametros.documento;
	usuario.tipodedocumento= parametros.tipodedocumento;
	console.log(parametros.navidad);
	

	if(parametros.password){

		bcrypt.hash(parametros.password, null, null, function(error, hash){

			usuario.password=hash;
			if (parametros.nombre != null){
				usuario.save((error, usuarioguardado)=>{
					if (error){
						res.status(500).send({mensaje: "hubo un error en el guardado de usuario"})
					}
					else{
						res.status(200).send({usuarioguardado})

					}
				})
			}
		})
	}
	}

function loginUsuario(req,res){
	var parametros = req.body;
	var nombre=parametros.nombre;
	var apellido=parametros.apellido;
	var password= parametros.password;

	//metodo FindOne me permite seleccionar un dato que este en la base de datos, recibe como primer parametro los valores que queremos que busque coincidencia y una funcion flecha
	Usuario.findOne({nombre:nombre}, (error, usuarioencontrado)=>{
		if(error){
			res.status(500).send({mensaje: "error al encontrar al usuario"})
		}

		else{
			if(!nombre){
				res.status(404).send({mensaje: " el usuario no existe o no ha sido creado"})
			}
			else{
				//res.status(200).send({usuarioencontrado})
				bcrypt.compare(password, usuarioencontrado.password, function(error, ok){

					if (ok){
						res.status(200).send({usuarioencontrado})
					}
					else{
						res.status(404).send({mensaje: "El usuario no ha podido ingresar"})
					}
				})
			}
		}
	})


}

function getusuario(req,res){
	Usuario.find({nombre:"Jhoan Sebastian"},(error, resp) =>{
		if (error){
			res.status(500).send({mensaje: "error"})
		}

		else{
			console.log(resp)
			res.status(200).json(resp)
		}
	})
}





//exportamos los metodos

module.exports = {
	controladorusuario,
	crearUsuario,
	loginUsuario,
	getusuario
}