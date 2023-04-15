var context;
var shape = new Object();
var monster1Cord = {};
var monster2Cord = {};
var monster3Cord = {};
var monster4Cord = {};
var board;
var score;
var pac_color;
var start_time;
var time_left;
var time_elapsed;
var interval1;
var interval;
var monster1Interval = undefined;
var monster2Interval = undefined;
var monster3Interval = undefined;
var monster4Interval = undefined;
/////////////////////////////////my vars
var thisCurGameData;
var MonstersNumber;
var BallsNumber;
var durationTime;
var lives;
var ballArray = [];
var temp;
////////////////////////////////// control keys
var rightBut;
var leftBut;
var downBut;
var upBut;
var curentKeyPress;
var curentdirection;
////////////////////////////music
var backgroundMusic = new Audio("music/pacmanSong.mp3");
var canvasWidth;
var canvasHeight;
var board_size = 20;
var candyX;
var candyY;
var canvasWidth;
var canvasHeight;
var startGameState;
/////////////////////////////////////////////////////////////////////////////////////////////

function startTheGame(gameStartInfo) {
    var canvas = document.getElementById("canvas");
    if(canvas.getContext){
        var contex1 = canvas.getContext("2d");
        context = contex1;
        Start(gameStartInfo);
    }

}
////////////////////////////////////////////////////////////////////////////////////////////

function Start(gameStartInfo) {
    alert("New game has started. Good luck!");
    clearAllTheFilleds();
    thisCurGameData = gameStartInfo;
    startGameState =thisCurGameData.gameState;

    if( startGameState=="cus"){
        BallsNumber = thisCurGameData.numberOfBallsInput;
        MonstersNumber = thisCurGameData.numberOfMonstersInput;
        durationTime = thisCurGameData.DurationOfGameInput;
        rightBut = thisCurGameData.rightBo ;
        leftBut = thisCurGameData.leftBo ;
        downBut = thisCurGameData.downBo ;
        upBut = thisCurGameData.upBo;
        //alert("keys are:  "+ " "+rightBut  + " "+leftBut+ " "+downBut+ " "+upBut);
        upBut=converKeyTonum(upBut);
        rightBut=converKeyTonum(rightBut);
        leftBut=converKeyTonum(leftBut);
        downBut=converKeyTonum(downBut);
        //alert("keys after convert are:  "+ " "+rightBut  + " "+leftBut+ " "+downBut+ " "+upBut);
    }
    else{
        let randDefaultOption = Math.floor(Math.random()*100);
        let DurationOfGameInput ;
        let numberOfMonstersInput ;
        let numberOfBallsInput ;
        if(randDefaultOption>60){
            DurationOfGameInput = "60";
            numberOfMonstersInput = "1";
            numberOfBallsInput = "60";
        }
        else if(randDefaultOption>30 && randDefaultOption<60) {
            DurationOfGameInput = "70";
            numberOfMonstersInput ="2";
            numberOfBallsInput = "70";
        }
        else{
            DurationOfGameInput = "80";
            numberOfMonstersInput = "3";
            numberOfBallsInput = "80";
        }
        durationTime = DurationOfGameInput;
        MonstersNumber = numberOfMonstersInput;
        BallsNumber = numberOfBallsInput;
        rightBut = 39;
        leftBut = 37;
        upBut = 38;
        downBut = 40;
        numberOfMonsters = MonstersNumber;
        thisCurGameData.numberOfBallsInput = durationTime;
        thisCurGameData.numberOfMonstersInput = MonstersNumber;
        thisCurGameData.DurationOfGameInput = durationTime ;
        thisCurGameData.rightBo = rightBut;
        thisCurGameData.leftBo = leftBut;
        thisCurGameData.downBo = downBut;
        thisCurGameData.upBo = upBut;

    }
    time_left = ( Math.floor( durationTime ) )*2;/////////////time move too fast so I *2

    // alert("keys: "+ rightBut +" "+leftBut  +" " +downBut +" " +upBut);
    // alert("settings : "+ durationTime +" "+MonstersNumber  +" " +BallsNumber+"  startGameState= "+startGameState);
    // alert("types:  durationTime="+typeof(durationTime)+"  rightBut= "+typeof(rightBut) +"  startGameState="+ typeof(startGameState))

    //alert("contol keys check:  right: "+rightBut+"  typOf: " +typeof(rightBut) );
    //alert("chet info- balls num:" + BallsNumber);
    //alert("chet info- monster num:" + MonstersNumber);
    //alert("chet info- duration time:" + durationTime);
    canvasWidth = document.getElementById("canvas").width;//////////////////
    canvasHeight =  document.getElementById("canvas").height;//////////////

    monster1Cord = undefined;
    monster2Cord = undefined;
    monster3Cord = undefined;
    monster4Cord = undefined;
    lives =5;
    board = new Array();
    score = 0;
    pac_color = "yellow";
    var cnt = 100;
    var food_remain = BallsNumber; //var food_remain = 50;
    var monsters_remain = MonstersNumber;
    ballCreation(food_remain);
    var blueBall = BallsNumber*0.1 ;
    var greenBall = BallsNumber*0.3 ;
    var redBall = BallsNumber*0.6 ;
    shuffle(ballArray);
    var pacman_remain = 1;
    start_time = new Date();
    var wallRandom = Math.floor(Math.random()*100);
    //alert("food_remain= "+food_remain+"  monsters_remain= "+monsters_remain+"  durationTime= "+durationTime);
    //alert("types:  food_remain="+typeof(food_remain)+"  monsters_remain= "+typeof(monsters_remain) +"  durationTime="+ typeof(durationTime))
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////create the walls
    //alert("enter zone 1");
    for( var i = 0; i < 10; i++ ){
        board[i] = new Array();
        for(var j = 0; j < 10; j++){
            if (wallRandom % 2 == 0) { ///////wall option 1
                if ( (i == 3 && j == 3) || (i == 3 && j == 4) || (i == 3 && j == 5) || (i == 3 && j == 6)||
                    (i == 6 && j == 1) || (i == 6 && j == 2) || (i == 6 && j == 3)|| (i == 6 && j == 4) ||
                    (i == 2 && j == 8) || (i == 3 && j == 8) || (i == 4 && j == 8)|| (i == 5 && j == 8) ){
                    board[i][j] = 4;
                }
            }
            else {///////////////////////walls option 2
                if (  (i == 2 && j == 3) || (i == 2 && j == 4) || (i == 2 && j == 5) || (i == 2 && j == 6)||
                    (i == 4 && j == 2) || (i == 5 && j == 2) || (i == 6 && j == 2)|| (i == 7 && j == 2) ||
                    (i == 4 && j == 8) || (i == 5 && j == 8) || (i == 6 && j == 8)|| (i == 7 && j == 8) ){
                    board[i][j] = 4;
                }
            }
        }
    }
    ///////////////////////////////////////////////////////////////////////////fill board with monsters
    //alert("enter zone 2");
    let randomNumForMonsterKind =0;
    let Iindex =0;
    let Jindex =0;
    let monsterNum=0;
    while (monsters_remain > 0) {
        randomNumForMonsterKind = Math.floor( Math.random()*100 ) ;
        Iindex = Math.floor( Math.random()*10 ) ;
        Jindex = Math.floor( Math.random()*10 ) ;
        if( board[ Iindex ][ Jindex ]!=4 && board[ Iindex ][ Jindex ]!=8 && board[ Iindex ][ Jindex ]!=9){
            monsterNum++;

            if(randomNumForMonsterKind > 50){////monster type
                board[ Iindex ][ Jindex ] = 10;
                if( monsterNum==1 ){  monster1Cord = {x: Iindex, y: Jindex, z:8}; }////////////////position the monsters in the board
                else if( monsterNum==2 ){ monster2Cord = {x: Iindex, y: Jindex, z:8 }; }
                else if( monsterNum==3 ){ monster3Cord = {x: Iindex, y: Jindex, z:8 }; }
                else if( monsterNum==4 ){ monster4Cord = {x: Iindex, y: Jindex, z:8 }; }
            }
            else{
                board[ Iindex ][ Jindex ] = 11;
                if( monsterNum==1 ){  monster1Cord = {x: Iindex, y: Jindex, z:9}; }////////////////position the monsters in the board
                else if( monsterNum==2 ){ monster2Cord = {x: Iindex, y: Jindex, z:9 }; }
                else if( monsterNum==3 ){ monster3Cord = {x: Iindex, y: Jindex, z:9 }; }
                else if( monsterNum==4 ){ monster4Cord = {x: Iindex, y: Jindex, z:9 }; }
            }

            monsters_remain--;
        }
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////alert to delete
    // if( monsterNum ==1){
    // 	alert("mon 1: "+monster1Cord.x+" "+monster1Cord.y );
    // }
    // else if( monsterNum ==2 ){
    // 	alert("mon 1: "+monster1Cord.x+" "+monster1Cord.y + "  mon 2: "+monster2Cord.x+" "+monster2Cord.y );
    // }
    // else if( monsterNum ==3 ){
    // 	alert("mon 1: "+monster1Cord.x+" "+monster1Cord.y + "  mon 2: "+monster2Cord.x+" "+monster2Cord.y +
    // 		"  mon 3: "+monster3Cord.x+" "+monster3Cord.y  );
    // }
    // else if( monsterNum ==4 ){
    // 	alert("mon 1: "+monster1Cord.x+" "+monster1Cord.y + "  mon 2: "+monster2Cord.x+" "+monster2Cord.y +
    // 		"  mon 3: "+monster3Cord.x+" "+monster3Cord.y + "  mon 4: "+monster4Cord.x+" "+monster4Cord.y);
    // }
    // else{
    // 	alert(" 0 mon!!! monsterNum=" +monsterNum+ "  monsters_remain= "+monsters_remain+ "  MonstersNumber= "+MonstersNumber);
    // }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //alert("enter zone 3");
    for( var i = 0; i < 10; i++ ){
        for(var j = 0; j < 10; j++){
            if( board[i][j]==4 || board[i][j]==10 || board[i][j]==11){
                //do nothing there is a wall or monster
            }
            else{
                var randomNum = Math.random();
                if (randomNum <= (1.0 * food_remain) / cnt) {
                    food_remain--;
                    board[i][j] = ballArray.pop();;
                } else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
                    shape.i = i;
                    shape.j = j;
                    pacman_remain--;
                    board[i][j] = 2;
                } else {
                    board[i][j] = 0;
                }
                cnt--;
            }
        }
    }

    for( var i = 0; i < 10; i++ ){
        for( var j = 0; j < 10; j++ ){
            if( board[i][j]==10 || board[i][j]==11 ){
                board[i][j]==0;
            }
        }
    }
    while (food_remain > 0) {////////////////////////////////////////////////////// fill board with food
        var emptyCell = findRandomEmptyCell(board);
        //board[emptyCell[0]][emptyCell[1]] = 1;
        board[emptyCell[0]][emptyCell[1]] = ballArray.pop();
        food_remain--;
    }
    var emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = 8; // Cherry Bonus of 35 points
    emptyCell = findCellForCandy(board);
    board[emptyCell[0]][emptyCell[1]] = 9; // Candy Bonus of 50 points
    candyX = emptyCell[0];
    candyY = emptyCell[1];
    temp = 0;

    keysDown = {};
    addEventListener(
        "keydown",
        function(e) {
            keysDown[e.keyCode] = true;

        },
        false
    );
    addEventListener(
        "keyup",
        function(e) {
            keysDown[e.keyCode] = false;

        },
        false
    );
    //alert("enter zone 4");
    curentdirection=1;
    playAudio();
    interval = setInterval(UpdatePosition, 250);///////////////////change time by user choice
    interval1 = setInterval(updateCandyPosition, 2000);
    monster1Interval = setInterval(moveMonster1, 750);
    if (numberOfMonsters >= 2) {
        monster2Interval = setInterval(moveMonster2, 750);
    }
    if (numberOfMonsters >= 3) {
        monster3Interval = setInterval(moveMonster3, 750);
    }
    if (numberOfMonsters >= 4) {
        monster3Interval = setInterval(moveMonster4, 750);
    }
}

function findRandomEmptyCell(board) {///////////////////////////////// find empty cell...to put food in
    var i = Math.floor(Math.random() * 9 + 1);
    var j = Math.floor(Math.random() * 9 + 1);
    while (board[i][j] != 0) {
        i = Math.floor(Math.random() * 9 + 1);
        j = Math.floor(Math.random() * 9 + 1);
    }
    return [i, j];
}

function GetKeyPressed() {////////////////////////find out where the player want to move, witch bottom pushed

    if( startGameState=="cus"){
        if (keysDown[upBut]) {//up
            curentdirection=1;//
            return 1;
        }
        if (keysDown[downBut]) {//down
            curentdirection=2;//
            return 2;
        }
        if (keysDown[leftBut]) {//left
            curentdirection=3;//
            return 3;
        }
        if (keysDown[rightBut]) {//right
            curentdirection=4;//
            return 4;
        }
    }
    else{
        if (keysDown[38]) {//up
            curentdirection=1;//
            return 1;
        }
        if (keysDown[40]) {//down
            curentdirection=2;//
            return 2;
        }
        if (keysDown[37]) {//left
            curentdirection=3;//
            return 3;
        }
        if (keysDown[39]) {//right
            curentdirection=4;//
            return 4;
        }
    }

}



function UpdatePosition() {
    if( time_left<= 0){
        endGame();
    }
    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
    if (x == 1) {
        if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
            shape.j--;
        }
    }
    if (x == 2) {
        if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
            shape.j++;
        }
    }
    if (x == 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
            shape.i--;
        }
    }
    if (x == 4) {
        if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
            shape.i++;
        }
    }
    /*if (board[shape.i][shape.j] == 1) {
        score++;
    }*/
    if (board[shape.i][shape.j] == 5){
        score += 5;
        BallsNumber--;
    }
    if (board[shape.i][shape.j] == 6) {
        score += 15;
        BallsNumber--;
    }
    if (board[shape.i][shape.j] == 7) {
        score += 25;
        BallsNumber--;
    }
    if (board[shape.i][shape.j] == 8) {
        score += 35;
    }
    if (board[shape.i][shape.j] == 9) {
        score += 50;
        candyX = 26;
        candyY = 26;
    }
    board[shape.i][shape.j] = 2;

    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    time_left--;
    if (score >= 300 && time_elapsed <= 25) {////////////////////////////////////////////pacman green transformation settings
        pac_color = "green";
    }
    if ( BallsNumber <= 0) {
        window.alert("Game completed");
        endGame();
    }
    else if( time_left<=0){
        if (lives <= 0){
            alert(" Loser!"); }
        else if( score < 100 ){
            alert("You are better than "+ score+ " points!");
        }
        else{
            alert("Winner!!!");
        }
        //alert("time is up !!")
        endGame();
    }
    else {
        Draw();
    }
}

function Draw() {
    canvas.width = canvas.width; //clean board
    lblScore.value = score;      // the score display
    lblTimePaste.value = time_elapsed;// the time display
    lblTimeLeft.value = Math.floor( time_left/2) ; ////////after *2, /2 for the display
    lbllives.value = lives;

    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var center = new Object();

            center.x = i * 60 + 30;
            center.y = j * 60 + 30;
            if (numberOfMonsters >=1 && monster1Cord.x == j && monster1Cord.y == i) {
                context.beginPath();
                context.arc(center.x, center.y, 20, 0 * Math.PI, 2 * Math.PI); // body circle
                context.lineTo(center.x, center.y);
                if(monster1Cord.z==8){ context.fillStyle = "green";  }
                else{ context.fillStyle = "#ff3399"; }
                context.fill();
                //////////////////////////monster eye
                context.beginPath();
                context.arc(center.x + 7, center.y - 7, 7, 0, 2 * Math.PI); // circle
                context.fillStyle = "white"; //color
                context.fill();
                ///////
                context.beginPath();
                context.arc(center.x + 7, center.y - 8, 3, 0, 2 * Math.PI); // circle
                if(monster1Cord.z==8){ context.fillStyle = "red";  }
                else{ context.fillStyle = "black"; }
                context.fill();
                //////////////////////////monster eye
                context.beginPath();
                context.arc(center.x - 7, center.y - 7, 7, 0, 2 * Math.PI); // circle
                context.fillStyle = "white"; //color
                context.fill();
                ///////
                context.beginPath();
                context.arc(center.x - 7, center.y - 8, 3, 0, 2 * Math.PI); // circle
                if(monster1Cord.z==8){ context.fillStyle = "red";  }
                else{ context.fillStyle = "black"; }
                context.fill();
                /////////////////////////////////////////////////////legs
                context.beginPath();
                context.moveTo(center.x -16, center.y);
                context.lineTo(center.x -20, center.y +19);
                context.lineTo(center.x -16, center.y +15);
                context.lineTo(center.x -12, center.y +19);
                context.lineTo(center.x -8, center.y +15);
                context.moveTo(center.x +4, center.y +15);
                context.lineTo(center.x +8, center.y +15);
                context.lineTo(center.x +12, center.y +19);
                context.lineTo(center.x +16, center.y +15);
                context.lineTo(center.x +20, center.y +19);
                context.lineTo(center.x +16, center.y );
                context.lineWidth = 8;
                if(monster1Cord.z==8){
                    context.strokeStyle = "green";
                    context.stroke();
                }
                else{
                    context.strokeStyle = "#ff3399";
                    context.stroke();
                }
            }
            else if ( numberOfMonsters >=2 && monster2Cord.x == j && monster2Cord.y == i ) {
                context.beginPath();
                context.arc(center.x, center.y, 20, 0 * Math.PI, 2 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                if(monster2Cord.z==8){ context.fillStyle = "green";  }
                else{ context.fillStyle = "#ff3399"; }
                context.fill();
                //////////////////////////monster eye
                context.beginPath();
                context.arc(center.x + 7, center.y - 7, 7, 0, 2 * Math.PI); // circle
                context.fillStyle = "white"; //color
                context.fill();
                ///////
                context.beginPath();
                context.arc(center.x + 7, center.y - 8, 3, 0, 2 * Math.PI); // circle
                if(monster2Cord.z==8){ context.fillStyle = "red";  }
                else{ context.fillStyle = "black"; }
                context.fill();
                //////////////////////////monster eye
                context.beginPath();
                context.arc(center.x - 7, center.y - 7, 7, 0, 2 * Math.PI); // circle
                context.fillStyle = "white"; //color
                context.fill();
                ///////
                context.beginPath();
                context.arc(center.x - 7, center.y - 8, 3, 0, 2 * Math.PI); // circle
                if(monster2Cord.z==8){ context.fillStyle = "red";  }
                else{ context.fillStyle = "black"; }
                context.fill();
                /////////////////////////////////////////////////////legs
                context.beginPath();
                context.moveTo(center.x -16, center.y);
                context.lineTo(center.x -20, center.y +19);
                context.lineTo(center.x -16, center.y +15);
                context.lineTo(center.x -12, center.y +19);
                context.lineTo(center.x -8, center.y +15);
                context.moveTo(center.x +4, center.y +15);
                context.lineTo(center.x +8, center.y +15);
                context.lineTo(center.x +12, center.y +19);
                context.lineTo(center.x +16, center.y +15);
                context.lineTo(center.x +20, center.y +19);
                context.lineTo(center.x +16, center.y );
                context.lineWidth = 8;
                if(monster2Cord.z==8){
                    context.strokeStyle = "green";
                    context.stroke();
                }
                else{
                    context.strokeStyle = "#ff3399";
                    context.stroke();
                }
            }
            else if ( numberOfMonsters >=3 && monster3Cord.x == j && monster3Cord.y == i ) {
                context.beginPath();
                context.arc(center.x, center.y, 20, 0 * Math.PI, 2 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                if(monster3Cord.z==8){ context.fillStyle = "green";  }
                else{ context.fillStyle = "#ff3399"; }
                context.fill();
                //////////////////////////monster eye
                context.beginPath();
                context.arc(center.x + 7, center.y - 7, 7, 0, 2 * Math.PI); // circle
                context.fillStyle = "white"; //color
                context.fill();
                ///////
                context.beginPath();
                context.arc(center.x + 7, center.y - 8, 3, 0, 2 * Math.PI); // circle
                if(monster3Cord.z==8){ context.fillStyle = "red";  }
                else{ context.fillStyle = "black"; }
                context.fill();
                //////////////////////////monster eye
                context.beginPath();
                context.arc(center.x - 7, center.y - 7, 7, 0, 2 * Math.PI); // circle
                context.fillStyle = "white"; //color
                context.fill();
                ///////
                context.beginPath();
                context.arc(center.x - 7, center.y - 8, 3, 0, 2 * Math.PI); // circle
                if(monster3Cord.z==8){ context.fillStyle = "red";  }
                else{ context.fillStyle = "black"; }
                context.fill();
                /////////////////////////////////////////////////////legs
                context.beginPath();
                context.moveTo(center.x -16, center.y);
                context.lineTo(center.x -20, center.y +19);
                context.lineTo(center.x -16, center.y +15);
                context.lineTo(center.x -12, center.y +19);
                context.lineTo(center.x -8, center.y +15);
                context.moveTo(center.x +4, center.y +15);
                context.lineTo(center.x +8, center.y +15);
                context.lineTo(center.x +12, center.y +19);
                context.lineTo(center.x +16, center.y +15);
                context.lineTo(center.x +20, center.y +19);
                context.lineTo(center.x +16, center.y );
                context.lineWidth = 8;
                if(monster3Cord.z==8){
                    context.strokeStyle = "green";
                    context.stroke();
                }
                else{
                    context.strokeStyle = "#ff3399";
                    context.stroke();
                }
            }
            else if ( numberOfMonsters >=4 && monster4Cord.x == j && monster4Cord.y == i ) {
                context.beginPath();
                context.arc(center.x, center.y, 20, 0 * Math.PI, 2 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                if(monster4Cord.z==8){ context.fillStyle = "green";  }
                else{ context.fillStyle = "#ff3399"; }
                context.fill();
                //////////////////////////monster eye
                context.beginPath();
                context.arc(center.x + 7, center.y - 7, 7, 0, 2 * Math.PI); // circle
                context.fillStyle = "white"; //color
                context.fill();
                ///////
                context.beginPath();
                context.arc(center.x + 7, center.y - 8, 3, 0, 2 * Math.PI); // circle
                if(monster4Cord.z==8){ context.fillStyle = "red";  }
                else{ context.fillStyle = "black"; }
                context.fill();
                //////////////////////////monster eye
                context.beginPath();
                context.arc(center.x - 7, center.y - 7, 7, 0, 2 * Math.PI); // circle
                context.fillStyle = "white"; //color
                context.fill();
                ///////
                context.beginPath();
                context.arc(center.x - 7, center.y - 8, 3, 0, 2 * Math.PI); // circle
                if(monster4Cord.z==8){ context.fillStyle = "red";  }
                else{ context.fillStyle = "black"; }
                context.fill();
                /////////////////////////////////////////////////////legs
                context.beginPath();
                context.moveTo(center.x -16, center.y);
                context.lineTo(center.x -20, center.y +19);
                context.lineTo(center.x -16, center.y +15);
                context.lineTo(center.x -12, center.y +19);
                context.lineTo(center.x -8, center.y +15);
                context.moveTo(center.x +4, center.y +15);
                context.lineTo(center.x +8, center.y +15);
                context.lineTo(center.x +12, center.y +19);
                context.lineTo(center.x +16, center.y +15);
                context.lineTo(center.x +20, center.y +19);
                context.lineTo(center.x +16, center.y );
                context.lineWidth = 8;
                if(monster4Cord.z==8){
                    context.strokeStyle = "green";
                    context.stroke();
                }
                else{
                    context.strokeStyle = "#ff3399";
                    context.stroke();
                }
            }
            /////////////////////////////////////////////////////////////////////////////////////
            else if (board[i][j] == 2) {
                if(curentdirection==4){//right
                    ///////////////////////////pacman body
                    context.beginPath();
                    context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color
                    context.fill();
                    //////////////////////////pacman eye
                    context.beginPath();
                    context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color
                    context.fill();
                }
                else if(curentdirection==3){//left
                    ///////////////////////////pacman body
                    context.beginPath();
                    context.arc(center.x, center.y, 30, 1.15 * Math.PI, 2.85 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color
                    context.fill();
                    //////////////////////////pacman eye
                    context.beginPath();
                    context.arc(center.x - 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color
                    context.fill();
                }
                else if(curentdirection==1){//up
                    ///////////////////////////pacman body
                    context.beginPath();
                    context.arc(center.x, center.y, 30, 1.6 * Math.PI, 3.3 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color
                    context.fill();
                    //////////////////////////pacman eye
                    context.beginPath();
                    context.arc(center.x - 15, center.y -7, 5, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color
                    context.fill();
                }
                else if(curentdirection==2){//down
                    ///////////////////////////pacman body
                    context.beginPath();
                    context.arc(center.x, center.y, 30, 0.60 * Math.PI, 2.35 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color
                    context.fill();
                    //////////////////////////pacman eye
                    context.beginPath();
                    context.arc(center.x - 15, center.y + 7, 5, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color
                    context.fill();
                }

            }
            else if (board[i][j] == 1) {//food
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            }
            else if (board[i][j] == 4) {//walls
                ///////////////////////////////option 1 - standart wals
                // context.beginPath();
                // context.rect(center.x - 30, center.y - 30, 60, 60);
                // context.fillStyle = "grey"; //color
                // context.fill();

                //////////////////////////////option 2 - wall picture
                //drawWall(center.x, center.y);

                ////////////////////////////////////////option 3 - my walls draw
                /////////////////////////wall section 1
                context.beginPath();
                context.rect(center.x - 30, center.y - 30, 28, 16);
                context.fillStyle = "blue"; //color
                context.fill();
                context.beginPath();
                context.rect(center.x - 2, center.y - 30, 4, 16);
                context.fillStyle = "black"; //color
                context.fill();
                context.beginPath();
                context.rect(center.x +2, center.y -30, 28, 16);
                context.fillStyle = "blue"; //color
                context.fill();
                context.beginPath();
                context.rect(center.x - 30, center.y -14, 60, 4);
                context.fillStyle = "black"; //color
                context.fill();
                /////////////////////////wall section 2
                context.beginPath();
                context.rect(center.x - 30, center.y -10, 60, 16);
                context.fillStyle = "blue"; //color
                context.fill();
                context.beginPath();
                context.rect(center.x - 30, center.y +6, 60, 4);
                context.fillStyle = "black"; //color
                context.fill();
                /////////////////////////wall section 3
                context.beginPath();
                context.rect(center.x - 30, center.y +10, 28, 16);
                context.fillStyle = "blue"; //color
                context.fill();
                context.beginPath();
                context.rect(center.x - 2, center.y +10, 4, 16);
                context.fillStyle = "black"; //color
                context.fill();
                context.beginPath();
                context.rect(center.x +2, center.y +10, 28, 16);
                context.fillStyle = "blue"; //color
                context.fill();
                context.beginPath();
                context.rect(center.x - 30, center.y +26, 60, 4);
                context.fillStyle = "black"; //color
                context.fill();
            }
            else if (board[i][j] == 5 ) {// 5 = 5 points
                context.beginPath();
                context.arc(center.x, center.y, 13, 0, 2 * Math.PI); // circle
                context.fillStyle = "red"; //color
                context.fill();
                context.font = "15px Arial";
                context.fillStyle = "white"; //color of text
                context.fillText("5", center.x - 4.5, center.y + 5);
            }
            else if (board[i][j] == 6) {//6 = 15 points
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = "green"; //color
                context.fill();
                context.font = "18px Arial";
                context.fillStyle = "white"; //color of text
                context.fillText("15", center.x - 11, center.y + 7);
            }
            else if (board[i][j] == 7) {// 7 = 25 points
                context.beginPath();
                context.arc(center.x, center.y, 18, 0, 2 * Math.PI); // circle
                context.fillStyle = "blue"; //color
                context.fill();
                context.font = "20px Arial";
                context.fillStyle = "white"; //color of text
                context.fillText("25", center.x - 11, center.y + 8);
            }
            else if (board[i][j] == 8) {//drug
                insertPill(center.x, center.y);
            }
            else if (board[i][j] === 9) { // Candy
                context.beginPath();
                context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
                let my_gradient = context.createLinearGradient(center.x - 7, center.y - 7, center.x + 7, center.y + 7);
                my_gradient.addColorStop(0, "red");
                my_gradient.addColorStop(0.5, "white");
                my_gradient.addColorStop(1, "red");
                context.fillStyle = my_gradient;
                context.fill();
                context.closePath();
                context.beginPath();
                context.lineTo(center.x, center.y);
                context.lineTo(center.x - 15, center.y - 7);
                context.lineTo(center.x - 7, center.y - 15);
                context.fill();
                context.closePath();
                context.beginPath();
                context.lineTo(center.x, center.y);
                context.lineTo(center.x + 15, center.y + 7);
                context.lineTo(center.x + 7, center.y + 15);
                context.fill();
                context.closePath();
            }
        }//for
    }//for
}//func

function reduceLivesAfterHitMonster1() {
    alert("You have lost a live!");

    monster1Cord.x = 0;
    monster1Cord.y = 0;

    if (numberOfMonsters >= 2) {
        monster2Cord.x = 9;
        monster2Cord.y = 0;
    }

    if (numberOfMonsters >= 3) {
        monster3Cord.x = 0;
        monster3Cord.y = 9;
    }
    if (numberOfMonsters >= 4) {
        monster4Cord.x = 9;
        monster4Cord.y = 9;
    }
    board[shape.i][shape.j] = 0;
    var emptyCell = findRandomEmptyCell(board);
    shape.i = emptyCell[0];
    shape.j = emptyCell[1];

    board[shape.i][shape.j] = 2;
    lives -= 1;
    if (lives <= 0){ endGame(); }
    Draw();
}

function reduceLivesAfterHitMonster2() {
    alert("You have lost 2 lives!");

    monster1Cord.x = 0;
    monster1Cord.y = 0;

    if (numberOfMonsters >= 2) {
        monster2Cord.x = 9;
        monster2Cord.y = 0;
    }

    if (numberOfMonsters >= 3) {
        monster3Cord.x = 0;
        monster3Cord.y = 9;
    }
    if (numberOfMonsters >= 4) {
        monster4Cord.x = 9;
        monster4Cord.y = 9;
    }
    board[shape.i][shape.j] = 0;
    var emptyCell = findRandomEmptyCell(board);
    shape.i = emptyCell[0];
    shape.j = emptyCell[1];


    board[shape.i][shape.j] = 2;
    lives -= 2;
    if (lives <= 0){ endGame();}
    Draw();
}

function moveMonster1() {
    var move = chooseMovement(monster1Cord, true, false);
    monster1Cord.x = move.x;
    monster1Cord.y = move.y;

    if (monster1Cord.x === shape.j && monster1Cord.y === shape.i){
        if(monster1Cord.z == 8){
            reduceLivesAfterHitMonster1();
        }
        else{
            reduceLivesAfterHitMonster2();
        }
    }
}
function moveMonster2() {
    var move = chooseMovement(monster2Cord, true, false);
    monster2Cord.x = move.x;
    monster2Cord.y = move.y;

    if (monster2Cord.x === shape.j && monster2Cord.y === shape.i){
        if(monster2Cord.z == 8){
            reduceLivesAfterHitMonster1();
        }
        else{
            reduceLivesAfterHitMonster2();
        }
    }
}

function moveMonster3() {
    var move = chooseMovement(monster3Cord, true, false);
    monster3Cord.x = move.x;
    monster3Cord.y = move.y;

    if (monster3Cord.x === shape.j && monster3Cord.y === shape.i){
        if(monster3Cord.z == 8){
            reduceLivesAfterHitMonster1();
        }
        else{
            reduceLivesAfterHitMonster2();
        }
    }
}
function moveMonster4() {
    var move = chooseMovement(monster4Cord, true, false);
    monster4Cord.x = move.x;
    monster4Cord.y = move.y;

    if (monster4Cord.x === shape.j && monster4Cord.y === shape.i){
        if(monster4Cord.z == 8){
            reduceLivesAfterHitMonster1();
        }
        else{
            reduceLivesAfterHitMonster2();
        }
    }
}

function chooseMovement(obj, needSort, needRandom) {
    var movementsSet = [];

    if (obj.x + 1 >= 0 && obj.x + 1 < 10 && board[obj.y][obj.x + 1] !== 4) movementsSet.push({x: obj.x + 1, y: obj.y});
    if (obj.x - 1 >= 0 && obj.x - 1 < 10 && board[obj.y][obj.x - 1] !== 4) movementsSet.push({x: obj.x - 1, y: obj.y});
    if (obj.y + 1 >= 0 && obj.y + 1 < 10 && board[obj.y + 1][obj.x] !== 4) movementsSet.push({x: obj.x, y: obj.y + 1});
    if (obj.y - 1 >= 0 && obj.y - 1 < 10 && board[obj.y - 1][obj.x] !== 4) movementsSet.push({x: obj.x, y: obj.y - 1});

    if (needSort) {
        movementsSet.sort(function (a, b) {
            var moveA = Math.pow(Math.pow(a.x - shape.j, 2) + Math.pow(a.y - shape.i, 2), 0.5);
            var moveB = Math.pow(Math.pow(b.x - shape.j, 2) + Math.pow(b.y - shape.i, 2), 0.5);
            return moveA - moveB;
        });
    }

    if (needRandom) {
        return movementsSet[Math.floor(Math.random() * movementsSet.length)];
    }

    return movementsSet[0];
}
/////////////////////////////////////////////////////////////////////////////////////////////////game restart and new game control
function endGame() {
    //alert("enter end Game Area");
    //alert("time_left= "+time_left + "  BallsNumber= "+ BallsNumber);
    if (lives <= 0){ alert(" Loser!"); }
    else if( time_left <= 0){
        if( score < 100 ){
            alert("You are better than "+ score+ " points!");
        }
    }
    else{
        alert("Winner!!!");
    }
    newGameFromTheGame();
}
function restartGame() {
    alert("game restarted, New game has started. Good luck!");
    let gameStartInfo=thisCurGameData;
    newGameFromControl(gameStartInfo);
}

function newGameFromControl(gameStartInfo) {
    //alert(" enter newGameFromControl function");
    context= undefined;
    shape = new Object();
    monster1Cord = undefined;
    monster2Cord = undefined;
    monster3Cord = undefined;
    monster4Cord = undefined;
    board= undefined;
    score= undefined;
    pac_color= undefined;
    start_time= undefined;
    time_left= undefined;
    time_elapsed= undefined;
    interval= undefined;
    monster1Interval = undefined;
    monster2Interval = undefined;
    monster3Interval = undefined;
    monster4Interval = undefined;
    thisCurGameData= undefined;
    MonstersNumber= undefined;
    BallsNumber= undefined;
    durationTime= undefined;
    lives= undefined;
    ballArray = [];
    keyPress = 4;
    rightBut= undefined;
    leftBut= undefined;
    downBut= undefined;
    upBut= undefined;
    curentKeyPress= undefined;
    curentdirection= undefined;

    startTheGame(gameStartInfo);
}

function newGameFromTheGame() {
    //alert(" enter newGameFromTheGame function");
    stopGame();
    context= undefined;
    shape = new Object();
    monster1Cord = undefined;
    monster2Cord = undefined;
    monster3Cord = undefined;
    monster4Cord = undefined;
    board= undefined;
    score= undefined;
    pac_color= undefined;
    start_time= undefined;
    time_left= undefined;
    time_elapsed= undefined;
    interval= undefined;
    monster1Interval = undefined;
    monster2Interval = undefined;
    monster3Interval = undefined;
    monster4Interval = undefined;
    thisCurGameData= undefined;
    MonstersNumber= undefined;
    BallsNumber= undefined;
    durationTime= undefined;
    lives= undefined;
    ballArray = [];
    keyPress = 4;
    rightBut= undefined;
    leftBut= undefined;
    downBut= undefined;
    upBut= undefined;
    curentKeyPress= undefined;
    curentdirection= undefined;
    showPreGameArea();
}

function playAudio() {
    backgroundMusic.play();
}

function pauseAudio() {
    backgroundMusic.pause();
}

function stopGame() {
    clearInterval(interval);
    clearInterval(interval1);

    clearInterval(monster1Interval);
    if (numberOfMonsters >= 2) {
        clearInterval(monster2Interval);
    }
    if (numberOfMonsters >= 3) {
        clearInterval(monster3Interval);
    }
    if (numberOfMonsters >= 4) {
        clearInterval(monster4Interval);
    }
    pauseAudio();
}

function showPreGameArea() {
    $(".startClass").hide();
    $(".preGameClass1").show();
    $(".preGameClass2").hide();
    $(".registerClass").hide();
    $(".loginClass").hide();
    $(".aboutClass").hide();
    $(".gameClass").hide();
    $(".keyControlClass").hide();
}

/////////////////:

function ballCreation(remainingBalls) {
    if (remainingBalls > 0) {
        for (let i = 0; i < remainingBalls * 0.6; i++) {
            ballArray.push(5);
        }

        for (let i = 0; i < remainingBalls * 0.3; i++) {
            ballArray.push(6);
        }

        for (let i = 0; i < remainingBalls * 0.1; i++) {
            ballArray.push(7);
        }
    }

}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function clearAllTheFilleds(){
    //alert(" enter clean all area");
    thisCurGameData = undefined;
    BallsNumber = undefined;
    MonstersNumber = undefined;
    durationTime = undefined;
    time_left = undefined;
    rightBut =undefined ;
    leftBut = undefined ;
    downBut = undefined ;
    upBut = undefined;
    rightBut = undefined;
    leftBut = undefined;
    downBut = undefined;
    upBut = undefined;
    monster1Cord = undefined;
    monster2Cord = undefined;
    monster3Cord = undefined;
    monster4Cord = undefined;
    lives = undefined;
    board = undefined;
    score = undefined;
    pac_color = undefined;
    start_time = undefined;

}

function drawWall(x_center, y_center) {
    const c = document.getElementById("canvas");
    const ctx = c.getContext("2d");
    const img = new Image();
    img.src = "img/wall.svg";
    ctx.drawImage(img, x_center , y_center , 2 * (canvasWidth / board_size), 1.5 * (canvasHeight / board_size));
}

function insertPill(x_center, y_center) {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var img = new Image();
    img.src = "img/cherry.svg";
    ctx.drawImage(img, x_center, y_center, 0.9*(canvasWidth/board_size), 0.9*(canvasHeight/board_size));
    ctx.fillStyle = "red";
    ctx.fillText("Bonus",x_center,y_center);

}

function findCellForCandy(board) {///////////////////////////////// find empty cell...to put food in
    for( var i = 0; i < 10; i++ ) {
        for (var j = 0; j < 10; j++) {
            if (board[i][j] == 0) {
                return [i, j];
            }
        }
    }
}

function moveCandy(board,x,y){
    var i = Math.floor(Math.random() * 4 + 1);
    flag = false;
    while(flag == false){
        if ((x+1) < 10 && board[x+1][y] != 4 && i == 1){
            flag == true;
            return [x+1,y];
        }
        if ((x-1) > 0 && board[x-1][y] != 4 && i == 2){
            flag == true;
            return [x-1,y];
        }
        if ((y+1) < 10 && board[x][y+1] != 4 && i == 3){
            flag == true;
            return [x,y+1];
        }
        if ((y-1) > 0 && board[x][y-1] != 4 && i == 4){
            flag == true;
            return [x,y-1];
        }
        i = Math.floor(Math.random() * 4 + 1);
    }
}

function updateCandyPosition(){
    if(board[candyX][candyY] == 2 ){

    }else{
        var nextCandyCell = moveCandy(board,candyX,candyY);
        board[candyX][candyY] = temp;
        temp = board[nextCandyCell[0]][nextCandyCell[1]];
        board[nextCandyCell[0]][nextCandyCell[1]] = 9;
        candyX = nextCandyCell[0];
        candyY = nextCandyCell[1];
    }

}

function converKeyTonum( key) {
    var conN;
    var keys ;

    if( typeof(key) === "string"){
        keys = key.toLowerCase();
        //alert("key is string");
        //alert("key is: "+keys);

        if(keys == "w"){ conN= 87;}
        else if( keys == "q"){ conN= 81;}
        else if( keys == "e"){ conN= 69;}
        else if( keys == "r"){ conN= 82;}
        else if( keys == "t"){ conN= 84;}
        else if( keys == "y"){ conN= 89;}
        else if( keys == "u"){ conN= 85;}
        else if( keys == "i"){ conN= 73;}
        else if( keys == "o"){ conN= 79;}
        else if( keys == "p"){ conN= 80;}

        else if( keys == "a"){ conN= 65;}
        else if( keys == "s"){ conN= 83;}
        else if( keys == "d"){ conN= 68;}
        else if( keys == "f"){ conN= 70;}
        else if( keys == "g"){ conN= 71;}
        else if( keys == "h"){ conN= 72;}
        else if( keys == "j"){ conN= 73;}
        else if( keys == "k"){ conN= 75;}
        else if( keys == "l"){ conN= 76;}
        else if( keys == "z"){ conN= 90;}
        else if( keys == "x"){ conN= 88;}
        else if( keys == "c"){ conN= 67;}
        else if( keys == "v"){ conN= 86;}
        else if( keys == "b"){ conN= 66;}
        else if( keys == "n"){ conN= 78;}
        else if( keys == "m"){ conN= 77;}
        else if( keys == ","){ conN= 188;}

        else if( keys == "0"){ conN= 96;}
        else if( keys == "1"){ conN= 97;}
        else if( keys == "2"){ conN= 98;}
        else if( keys == "3"){ conN= 99;}
        else if( keys == "4"){ conN= 100;}
        else if( keys == "5"){ conN= 101;}
        else if( keys == "6"){ conN= 102;}
        else if( keys == "7"){ conN= 103;}
        else if( keys == "8"){ conN= 104;}
        else if( keys == "9"){ conN= 105;}

        else if( keys == "arrowright"){ conN= 39;}
        else if( keys == "arrowleft"){ conN= 37;}
        else if( keys == "arrowdown"){ conN= 40;}
        else if( keys == "arrowup"){ conN= 38;}
        else{
            conN= 10000000000000;
        }
    }
    else{
        //dont convert
    }

    return conN;
}