(function gameController($){

	var playerValue=["0","X"],
		_index=0,
		_pindex=0,
		_counter=0,
		boardData="",
		finalIndex = [],
		gameViewObj={};

	this.init = function(){
		boardData = new boardModel();
		gameViewObj = new gameView($,boardData);
		createPlayers();
		gameViewObj.playerDetails(); 
		bindPlayerEvent();
		//gameViewObj.loadBoard();
	}

	this.checkWinner = function(){
		var boardList = boardData.board,
			winnerFlag = false;
		/*if(boardList.length > 4){*/
			console.log("checking...");
			if(boardList[0]===boardList[1] && boardList[1]===boardList[2] && boardList[2]!==undefined){
				winnerFlag = true;
				finalIndex = [0,1,2];
			}else if(boardList[3]===boardList[4] && boardList[4]===boardList[5] && boardList[5]!==undefined){
				winnerFlag = true;
				finalIndex = [3,4,5];
			}else if(boardList[6]===boardList[7] && boardList[7]===boardList[8] && boardList[8]!==undefined){
				winnerFlag = true;
				finalIndex = [6,7,8];
			}else if(boardList[0]===boardList[3] && boardList[3]===boardList[6] && boardList[6]!==undefined){
				winnerFlag = true;
				finalIndex = [0,3,6];
			}else if(boardList[1]===boardList[4] && boardList[4]===boardList[7] && boardList[7]!==undefined){
				winnerFlag = true;
				finalIndex = [1,4,7];
			}else if(boardList[2]===boardList[5] && boardList[5]===boardList[8] && boardList[8]!==undefined){
				winnerFlag = true;
				finalIndex = [2,5,8];
			}else if(boardList[0]===boardList[4] && boardList[4]===boardList[8] && boardList[8]!==undefined){
				winnerFlag = true;
				finalIndex = [0,4,8];
			}else if(boardList[2]===boardList[4] && boardList[4]===boardList[6] && boardList[6]!==undefined){
				winnerFlag = true;
				finalIndex = [2,4,6];
			}else{
				winnerFlag = false;
				_counter++;
			}

			if(winnerFlag){
				gameViewObj.displayResult(_index,finalIndex);
			}else{
				if(_counter===9){
					gameViewObj.displayDrawMessage();	
				}
			}

		/*}*/
	}

	this.createPlayers = function(){
		for(var i=0; i< boardData.noOfPlayers; i++){
			var player = new playerModel();
			boardData.activePlayers.push(player);	
		}
		

	}

	this.bindPlayerEvent = function(){
		$(".player-detail-btn","#playerDetailSection").off("click").on("click",function(){
			var playerName = $(".player-name","#playerDetailSection").val();
			if(playerName.length > 0){
				boardData.activePlayers[_pindex].setName(playerName);	
				if(++_pindex < boardData.activePlayers.length){
					gameViewObj.playerDetails();
					bindPlayerEvent();
				}else{
					gameViewObj.removePlayerSection();
					gameViewObj.loadBoard();
					bindBoardEvent();
					gameViewObj.displayTurnMessage(0);
				}
			}
			else{
				return;
			}
		})
	}

	this.bindBoardEvent = function(){
		var that = this;
		$(".board-block").off("click").on("click",function(){
			if($(this).hasClass("disabled-block")){
				return;
			}
			var dataIndex = parseInt($(this).attr("data-index"));
			boardData.board[dataIndex] = playerValue[_index];
			$(this).html(playerValue[_index]);
			$(this).addClass("disabled-block");
			that.checkWinner();
			if(_index==0){
				_index=1;
			}
			else{
				_index=0;
			}
			gameViewObj.displayTurnMessage(_index);
		})
	}

	this.init();

})($);