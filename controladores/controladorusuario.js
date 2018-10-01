"use strict"

function controladorusuario(req,res){

	res.status(200).send({mensaje: "probando controlador de usuarios"})
}

//nodemailer sirve para enviar correos electronicos

var nodemailer = require("nodemailer");


var Usuario= require("../modelos/modelousuarios.js");

//para poder encriptar 
var bcrypt = require("bcrypt-nodejs");

//importamos token

var token = require("../tokens/token.js");

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
	usuario.email= parametros.email;
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
						//res.status(200).send({usuarioencontrado})

						if(parametros.token){
							res.status(200).send({token: token.crearToken(usuarioencontrado)})
						}
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
	console.log("hola munod")
	Usuario.find({nombre:"jhoan"},(error, resp) =>{
		if (error){
			res.status(500).send({mensaje: "error"})
		}

		else{
			console.log(resp)
			res.status(200).json(resp)
		}
	})
}


function actualizarusuario(req,res){
	//llamamos por parametro el atributo que queremos modificar
	console.log("hola mundo")

	var id = req.params.id;

	//tomamos los datos del formulario
	var actualizar = req.body;

	if(id != req.usuariotoken.sub){

		console.log(id)
		console.log(req.usuariotoken.sub)

		return res.status(500).send({mensaje: "no tienes permisos para actualizar este usuario"})
	}

	//recorremos la base de datos con el metodo findByIdAndUpdate

	Usuario.findByIdAndUpdate(id, actualizar, (error, usuarioactualizado)=>{

		if(error){
			res.status(500).send({mensaje: "error al actualizar"})
		}
		else{
			if(!usuarioactualizado){
				res.status(404).send({mensaje:" no se ha podido generar los cambios"})
			}

			else{
				res.status(200).send(usuarioactualizado)
			}
		}
	})
}


function cambiarcontrasena(req,res){
	var parametros = req.body;
	var correo = parametros.email;
	


	Usuario.find({email:correo}, (error,correoencontrado)=>{
		if(error){
			console.log("hola mundo")
			res.status(404).send({mensaje: "no se puede acceder a la peticion"})
		}
		else{
			if(!correoencontrado){
				console.log("hooooooooolaaaaaaaa")
				res.status(500).send({mensaje:"el correo no existe en la base de datos"})
			}
			else{
				//definimos el transporte
				var transporter = nodemailer.createTransport({
					service: 'Gmail',
					auth:{
						user: 'nodejs1234npmstart@gmail.com',
						pass: '1234jhoan'
					},
					tls: {
						rejectUnauthorized : false
					}
				}
			);
				//definimos el destino
				var mailOption = {
					from: 'nodejs',
					to: 'mansleobenitez@gmail.com',
					subjet: 'test',
					text: "omita este mensaje"
				};

				//enviamos el email

				transporter.sendMail(mailOption, function(error, info){
					if(error){
						console.log(error)
						res.status(500).send({correoencontrado})
					}
					else{
						console.log("mensaje enviado")
						res.status(200).json(parametros)
					}
				})

			}

		}
	})


}





//exportamos los metodos

module.exports = {
	controladorusuario,
	crearUsuario,
	loginUsuario,
	getusuario,
	actualizarusuario,
	cambiarcontrasena
}