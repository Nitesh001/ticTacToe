
function gameView($,boardData){
	var _index = 0;
	this.loadBoard = function(){
		$("#mainBoard").html($("#boardTmpl").html());
	}

	this.disableBoard = function(){
		$(".board-block","#mainBoard").addClass("disabled-block");
	}

	this.displayResult = function(index,finalIndex){
		$("#winMsg").html($("#winMsgTmpl").html());
		$(".win-name","#winMsg").html("Player " + boardData.activePlayers[index].getName());
		this.disableBoard();
		for(i in finalIndex){
			$("[data-index ="+finalIndex[i]+"]","#mainBoard").addClass("winner-bg");	
		}
		$("#turnMessage").addClass("hideMe");				
	}

	this.displayTurnMessage = function(index){
		$("#turnMessage").html($("#turnMsgTmpl").html());
		$(".player-name","#turnMessage").html(boardData.activePlayers[index].getName()+"'s");		
	}

	this.displayDrawMessage = function(){
		$("#turnMessage").addClass("hideMe");	
		$("#winMsg").html('<div class="alert alert-info"> Congrats You both, It&apos;s a lucky DRAW!! </div>');
	}

	this.playerDetails = function(){		
		this.displayPlayerSection();
		$(".player-index","#playerDetailSection").html("player "+ (_index++ + 1));	
	}

	this.displayPlayerSection = function(){
		$("#playerDetailSection").html($("#playerDetailTmpl").html());
	}

	this.removePlayerSection = function(){
		$("#playerDetailSection").remove();
	}

}