		module.exports = function(io) {

					var app = require('express');
					var router = app.Router(); 
		            var Customer = require('../model/Customer.js');
		            var Restaurant = require('../model/Restaurant.js');
		            var Owner = require('../model/Owner.js');
		            var Driver = require('../model/Driver.js');
		   


					io.on("connection", function(socket){				
					console.log("connection created", socket.id);



		            socket.on("assignSocketIdToCustomer", (data)=>{
		            	//console.log(data);
		             if(data._id && data.socketId){
							Customer.update({_id: data._id}, {socketId : data.socketId}, null, function(err, data){
							if(err){
							console.log(err);
							}
							});
		     			}
		            });

					socket.on("assignSocketIdToOwner", (data)=>{
					//console.log(data);
					 if(data._id && data.socketId){
						Owner.update({_id: data._id}, {socketId : data.socketId}, null, function(err, data){
						if(err){
						console.log(err);
						}
						});
						}
					});


				  	socket.on("assignSocketIdToDriver", (data)=>{
					console.log("driver", data);
					 if(data._id && data.socketId){
						Driver.update({_id: data._id}, {socketId : data.socketId}, null, function(err, data){
						if(err){
						console.log(err);
						}
						});
						   }
				   	});
        

					socket.on("orderFromCustomer", (data)=>{
					console.log("order1",data);
					Restaurant.findOne({_id: data.restaurantId}).populate("ownerId").exec(function(err, owner){           
					if(err){ console.log(err); }else{
					console.log("order2", owner)
					io.sockets.to(owner.ownerId.socketId).emit('orderFromCustomerToOwner',{				              
					"customerdetail": data 
					}); 
					}
					});            
					});


					socket.on("orderActionbyOwnerForCustomer", (data)=>{
						console.log("OwnerForCustomer",data);
						Customer.findOne({_id: data.customerId._id}).exec(function(err, customer){           
						if(err){ console.log(err); }else{						
						io.sockets.to(customer.socketId).emit('orderResponseOwnerToCustomer',{				              
						      "status": data 
						    }); 
							}
						});            
					  });


					socket.on("orderActionbyOwnerForDriver", (data)=>{
						console.log("OwnerForDriver",data);
						Driver.findOne({_id: data.driverId}).exec(function(err, driver){           
						if(err){ console.log(err); }else{
						//console.log("order2", driver)
						io.sockets.to(driver.socketId).emit('orderFromOwnerToDriver',{				              
						      "driverdetail": data 
						    }); 
							}
						});            
					});



					socket.on("orderActionbyDriverToOwner", (data)=>{
						console.log("DriverToOwner",data);
						Restaurant.findOne({_id: data.restaurantId._id}).populate("ownerId").exec(function(err, owner){           
						if(err){ console.log(err); }else{
						console.log("order2", owner)
						io.sockets.to(owner.ownerId.socketId).emit('orderResponseDriverToOwner',{				              
						      "Driverstatus": data 
						    }); 
							}
						});            
					  });



					socket.on('disconnect',(data)=>{
					console.log("connection removed", socket.id);
			});



		    }); 

			return router;

		}