var express=require('express');
var socket_io=require('socket.io');
var http=require('http');


var app=express();
app.use(express.static('public'));

var server=http.Server(app);
var io=socket_io(server);
var v=[];//array do te ruaj te gjith username 
var t=[];//array do vendosim userat online  e perkohshme 
io.on('connection' ,function(socket){
	console.log('client connected');
	
	socket.on('message' ,function(message){
		console.log(message);
		   socket.broadcast.emit('message', message);
		
		
	});
	
	socket.emit('client-connected');
	
	socket.on('disconnect',function(){
		io.emit("disconnected");
	});
	socket.on('typing',function(user){
		console.log(user +  " is typing");
		io.emit("userid",user);
	});
	socket.on('notyping',function(){
		io.emit("perdoruesi");
		
	});
	socket.on('online',function(user){
		v.push(user);//ketu futet useri tek array
		io.emit("userat",v);
	});
	
	socket.on("disconnected_user",function(){
		io.emit("checking");
	});
	socket.on("user_online",function(user){
		t.push(user);
		console.log(t);
	});
});







server.listen(process.env.PORT || 8080);
