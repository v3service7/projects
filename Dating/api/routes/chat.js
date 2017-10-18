module.exports = function(io) {

	var app = require('express');
	var router = app.Router(); 
	var Customer = require('../model/Customer.js');
    var Message = require('../model/Message.js');
	var Notification = require('../model/Notification.js');
    var clients = {};

    io.on("connection", function(socket){
        var existsocket = Object.keys(io.sockets.sockets);  
        console.log('user connected'); 
        console.log(existsocket);
        socket.on('iamonline', (data) => {
            var info = {};
            info.cid = data.fromId;
            info.socketId = data.fromSocketId;
            info.online = 'Y';
            if(info.cid in clients)
            {}else{
                clients[info.cid] = info.socketId;
                //console.log("clients");
                //console.log(data);
                //console.log(clients);
                Customer.findByIdAndUpdate({_id : info.cid}, info , function(err, data){
                    if (err) {
                        //console.log(err);
                    }else{
                        Customer.find({'online': 'Y' , socketId : { $ne : info.cid }}, function(err, onlinec){
                            io.sockets.to(clients[info.cid]).emit('chat-list-response',{
                              error : false ,
                              singleUser : false ,
                              chatList : onlinec
                            }); 
                            socket.broadcast.emit('chat-list-response',{
                              error : false ,
                              singleUser : true ,
                              chatList : onlinec
                            });
                            socket.broadcast.emit('chat-list-response2',{
                              error : false ,
                              singleUser : true ,
                              chatList : onlinec
                            });
                        });
                    }
                });
            }
        });

        socket.on('iamonline2', (data) => {
            var info = {};
            info.cid = data.fromId;
            info.socketId = data.fromSocketId;
            info.online = 'Y';
            if(info.cid in clients){
                clients[info.cid] = info.socketId;
                //console.log("clients2");
                //console.log(data);
                //console.log(clients);
                Customer.findByIdAndUpdate({_id : info.cid}, info , function(err, data){
                    if (err) {
                      //console.log(err);
                    }else{
                        Customer.find({'online': 'Y' , socketId : { $ne : info.cid }}, function(err, onlinec){
                            io.sockets.to(clients[info.cid]).emit('chat-list-response-online2',{
                              error : false ,
                              singleUser : false ,
                              chatList : onlinec
                            }); 
                            socket.broadcast.emit('chat-list-response-online2',{
                                error : false ,
                                singleUser : true ,
                                chatList : onlinec
                            });
                            //console.log("emitetted");
                        });
                    }
                });
            }else{
                clients[info.cid] = info.socketId;
                //console.log("clients2");
                //console.log(data);
                //console.log(clients);
                Customer.findByIdAndUpdate({_id : info.cid}, info , function(err, data){
                    if (err) {
                      //console.log(err);
                    }else{
                        Customer.find({'online': 'Y' , socketId : { $ne : info.cid }}, function(err, onlinec){
                            io.sockets.to(clients[info.cid]).emit('chat-list-response-online2',{
                              error : false ,
                              singleUser : false ,
                              chatList : onlinec
                            }); 
                            socket.broadcast.emit('chat-list-response-online2',{
                                error : false ,
                                singleUser : true ,
                                chatList : onlinec
                            });
                            //console.log("emitetted");
                        });
                    }
                });
            }
        });

        socket.on('iamoffline',(data)=>{
            //console.log("iamoffline");
            //console.log(data);
            delete clients[data.fromId];
            Customer.findByIdAndUpdate({_id: data.fromId}, {online : 'N', socketId : ''} , function(err, data){
                if (err) {
                // //console.log(err);
            }else{
                Customer.find({'online': 'Y' , socketId : { $ne : data.fromId }}, function(err, onlinec){ 
                    socket.broadcast.emit('chat-list-response',{
                        error : false ,
                        singleUser : true ,
                        chatList : onlinec
                    });
                    socket.broadcast.emit('chat-list-response2',{
                        error : false ,
                        singleUser : true ,
                        chatList : onlinec
                    });
                    socket.broadcast.emit('offline2',{
                        error : false ,
                        singleUser : true ,
                        chatList : onlinec
                    });
                });
            }
        });

        var existsocket = Object.keys(io.sockets.sockets);
            console.log("disconnect()");        
            console.log(existsocket);   
        });

        socket.on('chat-list', (data) => {
            //console.log("chat-list");      	
            Customer.find({'online': 'Y' , socketId : { $ne : data.cid }}, function(err, onlinec){
                io.sockets.to(clients[data.cid]).emit('chat-list-response',{
                    error : false ,
                    singleUser : false ,
                    chatList : onlinec
                });
            });
        });

        socket.on('getAllonline', (data) => { 	      	
            Customer.find({'online': 'Y' , socketId : { $ne : data.cid }}, function(err, onlinec){
                //console.log("getAllonline", data);
                io.sockets.to(clients[data.cid]).emit('chat-list-response2',{
                    error : false ,
                    singleUser : false ,
                    chatList : onlinec
                });
            });
        });

        socket.on('getAllonline3', (data) => {          
            Customer.find({'online': 'Y' , socketId : { $ne : data.cid }}, function(err, onlinec){
                //console.log("getAllonline", data);
                io.sockets.to(clients[data.cid]).emit('chat-list-response3',{
                    error : false ,
                    singleUser : false ,
                    chatList : onlinec
                });
            });
        });
        
        /*socket.on('chat-list-r', (data) => {
            //console.log("chat-list");      	
            Customer.find({'online': 'Y' , socketId : { $ne : data.cid }}, function(err, onlinec){
                io.sockets.to(clients[data.cid]).emit('chat-list-response-r',{
         			error : false ,
         			singleUser : false ,
         			chatList : onlinec
                });
            });
        });*/

        socket.on('select-for-chat', (data) => {           
            Customer.findById(data.cid, function(err, datai){  
                //console.log("emit to this");
                //console.log(clients[data.resid]);
                if(clients[data.resid] != ""){
                    io.sockets.connected[clients[data.resid]].emit('select-for-chat-response',{         
                        customerdetail : datai
                    });
                }
            });
        });

        socket.on('add-message', (data) => {
            var toSocketId = data.toSocketId;
            var fromSocketId = data.fromSocketId;           
            var socket = clients[data.fromSocketId];
            var existsocket = Object.keys(io.sockets.sockets);
            if(existsocket.indexOf(toSocketId) != -1){
                data.isread = true;
            }
            var smessage = new Message(data);
            smessage.save(function(err, data){
                if (err) {
     			    //console.log(err);
                }else{
     			    //console.log(data);          
     			    if((existsocket.indexOf(toSocketId) != -1) && (typeof clients[data.toCustId] != 'undefined')){
                        //console.log("msg emit");
                        //console.log();
                        io.sockets.connected[clients[data.toCustId]].emit(`add-message-response`,data);    
                    }          
                }
            });
        });

        
        socket.on('add-vedio', (datas) => {  
            var existsocket = Object.keys(io.sockets.sockets);
            Customer.findById({_id : datas.cid}, function(err, data){
                if(err){
                    //console.log(err);
                }else{
                    //console.log(data);
                    var sessioninfo = {tokenid : data.tokboxtoken, sessionid : data.tokboxsessionid, socketid : data.socketId, connectedTo: data._id};
                    io.sockets.connected[clients[datas._id]].emit(`vedio-response`,sessioninfo);
                }
            });
        });
        

        socket.on('speed-dating-video', (datas) => {  
            
            //console.log("datas");
            //console.log(datas);

            var existsocket = Object.keys(io.sockets.sockets);

            Customer.findById({_id : datas._id}, function(err, data){                
                if(err){
                    //console.log(err);
                }else{
                    //console.log("cdata");                         
                    //console.log(data);                         
                    var sessioninfo = {tokenid : data.tokboxtoken, sessionid : data.tokboxsessionid, socketid : data.socketId , fromid : datas.fromid};
                    
                    //console.log("sockey");
                    //console.log(datas.socketId);
                    
                    if((typeof datas.socketId != "") && (typeof datas.socketId != 'null') && (typeof datas.socketId != "undefined")){
                    io.sockets.connected[datas.socketId].emit(`speed-dating-video-response`,sessioninfo);    
                    }                    
                }
            });

        });



        socket.on('add-vedio-accept', (data) => {      
            io.sockets.connected[data.share.socketid].emit(`callrecivedresponse`,data); 
        });

        /*socket.on('disconnect-to-other', (data) => {  
            io.sockets.connected[clients[data._id]].emit(`disconnect-to-other-response`,data); 
        });*/

        socket.on('live-broadcast', (data) => { 
            Customer.findById(data._id, function(err, resp){ 
                if(data.status == true){
                    resp.status = true;
                }else{
                    resp.status = false;
                }
                socket.broadcast.emit(`live-broadcast-response`,resp);
            });    
        });

        socket.on('cancel-vedio-call', (data) => { 
            //console.log("cancelcall");
            //console.log(clients[data._id]);
            io.sockets.connected[clients[data._id]].emit(`cancel-vedio-call-response`,data); 
        });



        socket.on('viewby', (data) => {
            var notification = new Notification(data);
            notification.save(function(err, data){
                if (err) {
                    //console.log(err);
                }else{
                 Customer.findById({_id : data.ToId}, function(err, datas){


              /*   //console.log("undefinedloo"); 
                 //console.log(clients[data.ToId] , typeof clients[data.ToId] , datas); 
                 //console.log("undefinedlo2"); */


                 if((typeof datas.socketId !== 'undefined') && (datas.socketId != '') && (clients[data.ToId] == datas.socketId)){
                    Notification.find({ToId : data.ToId, isread: false}).populate("ToId").populate("FromId").sort({created_at: -1}).exec(function(err, notificatons){
                    io.sockets.connected[datas.socketId].emit(`viewby-response`,notificatons);
                    }); 
                  }
                });       
                }
             });
          });



        socket.on('disconnect',(data)=>{
            if(socket.id){}
            //console.log("socketcid  " + socket.id);
            delete clients[socket.cid];
            //console.log(clients);
            Customer.findOneAndUpdate({socketId: socket.id}, {online : 'N', socketId : ''} , function(err, data){
                if (err) {
                    // //console.log(err);
                }else{
                    Customer.find({'online': 'Y' , socketId : { $ne : socket.id}}, function(err, onlinec){ 
                        socket.broadcast.emit('chat-list-response',{
                            error : false ,
                            singleUser : true ,
                            chatList : onlinec
                        });
                        socket.broadcast.emit('chat-list-response2',{
                            error : false ,
                            singleUser : true ,
                            chatList : onlinec
                        });    
                        socket.broadcast.emit('offline2',{
                            error : false ,
                            singleUser : true ,
                            chatList : onlinec
                        });
                    });
                }
            });
        });
    });
    
    return router;
}
