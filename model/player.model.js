
function playerModel(){
	this.player = {
		"name":"",
		"score":0
	}

	this.getName = function(){
		return this.player.name;
	}

	this.setName = function(name){
		this.player.name = name
	}
}

