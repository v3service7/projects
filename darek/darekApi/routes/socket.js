module.exports = function(io) {

	var app = require('express');
	var router = app.Router(); 
	var Customer = require('../model/Customer.js');
	var Restaurant = require('../model/Restaurant.js');
	var Owner = require('../model/Owner.js');
	var Driver = require('../model/Driver.js');

	io.on("connection", function(socket){
		console.log("connection created", socket.id);

		socket.on("orderFromCustomer", (data)=>{
			socket.broadcast.emit('orderFromCustomerToOwner',{
				"customerdetail": data
			}); 
		});

		socket.on("orderActionbyOwnerForCustomer", (data)=>{
			socket.broadcast.emit('orderResponseOwnerToCustomer',{				              
				"status": data 
			}); 
		});

		socket.on("orderActionbyOwnerForDriver", (data)=>{
			socket.broadcast.emit('orderFromOwnerToDriver',{
				"driverdetail": data
			});
		});

		socket.on("orderActionbyDriverToOwner", (data)=>{
			socket.broadcast.emit('orderResponseDriverToOwner',{
				"Driverstatus": data 
			}); 
		});

		socket.on('disconnect',(data)=>{
			console.log("connection removed", socket.id);
		});
	}); 

	return router;
}