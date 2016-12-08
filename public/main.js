$(document).ready(function(){
	var input=$('input');
	 var socket = io();
	var messages=$('#messages');
	var username= "";
	var addMessage=function(message){
		messages.append('<div>' + message + '</div>');

};

	input.on('keydown' ,function(event){

		
		if(event.keyCode != 13){
		socket.emit("typing",username);
		
		if(event.keyCode ==8){
			socket.emit("notyping");
		}
		return;
		}
		
		var message=input.val();
		addMessage(message);
		socket.emit('message' ,message);
		input.val('');
		socket.emit("notyping");
	});

		socket.on('client-connected',function(){
		$('#info').append("<p style='color: green'>New client</p>");
		username="user "+Math.floor(Math.random()*1000) + " ";
		$("h2").html("hello " + username);
		
		socket.emit("online" ,username);
	});
	socket.on("userid",function(user){
		$("#typing").html(user + " is typing");
	});
	
	socket.on("checking",function(){//ktu marr id io.emit te gjith userat
		socket.emit("user_online",username);//kjo do merret ne backend
	});
	
	socket.on('disconnected',function(){
	$('#info').append("<p style='color:red'>disconnected</p>")
	socket.emit("disconnected_user");
	
	});
	socket.on("perdoruesi",function(){
		$("#typing").html("");
	});
	socket.on("userat",function(v){
		$("h3").html(v);
	});
});