function randWordPos(){
    return Math.floor(Math.random() * (window.innerWidth-360 - 0)) + 0;
}

function randWordSpeed(){
    let tmp = Math.floor(Math.random() * (speedArr - 1)) + 1;
    tpp = speedArr.splice(tmp,1)
    return parseInt(tpp)

}

function wordInList(mas,val){
    return wordList.some(arrVal => val === arrVal.text)
}


function board(width, height) {
    this.width = width;
    this.height = height;
    this.draw = function() {
        context.fillStyle = "#000";
        context.fillRect(0, 0, this.width, this.height);
    };
}
function word(x, y, text,length) {
    this.color = "#fff";
    this.x = x;
    this.y = y;
    this.speed = randWordSpeed()
    this.text = text;
    this.uncolored = text
    this.colored = ""
    this.length = length;
    this.draw = function() {
        context.fillStyle = "blue";
        context.font = "italic 30pt Arial";
        context.fillText(this.colored, this.x, this.y+35, this.length);

        context.fillStyle = this.color;
        context.font = "italic 30pt Arial";
        context.fillText(this.uncolored, this.x, this.y, this.length);

    };
    this.update = function () {
    if (this.y>board.height) {
        clearInterval(game);
        gameover(0);
    }
    this.y += this.speed;

}
}

function draw() {
    board.draw();
    for (let i in wordList){
    wordList[i].draw()
    }

}

function coloringWord(wrd){
    if (keyLog[keyLog.length - 1] == wrd.uncolored[0]){
        wrd.colored += wrd.uncolored[0]
        wrd.uncolored = wrd.uncolored.slice(1)
    }

    else{

    keyLog = keyLog.slice(0,keyLog.length - 1)
    }

}


function play() {
    console.log(nW,keyLog)
    draw();
    for (let i in wordList){
    wordList[i].update()
    }

    if (wordList.length == 0){
        if (bank){
        speedArr = [1,2,3,4,5,6,7]
        for (let w = 0; w<6;w++){
            wordList.push(new word(randWordPos(), 20, bank[0]))
            bank.shift()
            }

        }
        if (!bank){
        gameover(1)
        }
    }

}

function typing(){
    document.onkeypress = (e)=>{
        const k = e.key
        if (k == "`"){
        clearInterval(game)
        paused()
        }
        if (k == "Backspace"){
        keyLog = keyLog.slice(0,keyLog.length-1)
        }

        if (k != " "){
        keyLog += k
        }

    }
    keyLog.trim()
    if (event.code == "Space"){
        if (keyLog == nW.text){
        wordList.splice(wordList.indexOf(nW),1)

        nW =""
        }
    nW.colored = ""
    nW.uncolored = nW.text
    keyLog = ""
    }

    if (keyLog){
        let w = []
        for (i in wordList){
            w.push(wordList[i].text)
        }
        for (i in w){
            if (w[i][0] == keyLog[0]){
                if (!nW){
                    nW = wordList[i]
                    break
                }
            }
        }

        coloringWord(nW)
    }


}

function init() {

stupidWordBank = "Smile for the camera "+
"Another politician bought "+
"I swear I heard another shot "+
"Cash another payment "+
"Red all on the canvas "+
"It's murder on the campus "+
"Another press conference "+
"Nothing gets accomplished "+
"The suit is an accomplice "+
"Money is the motive "+
"The war is in the street "+
"Watch history repeat";

    board = new board(window.innerWidth, window.innerHeight);

    bank = stupidWordBank.split(" ")
    speedArr = [1,2,3,4,5,6,7]

    nW = ""

    wordList = []
    for (let w = 0; w<6;w++){
        wordList.push(new word(randWordPos(), 20, bank[0]))
        bank.shift()

    }


    canvas = document.getElementById("drop");
    canvas.width = board.width;
    canvas.height = board.height;
    context = canvas.getContext("2d");

    keyLog = ""
    addEventListener("keydown", typing);


    game = setInterval(play, 100);


}

function gameover(n){
    if (n == 0){
    board.draw()
    ga = new word(board.width/2-100,board.height/2,"GAME OVER",250)
    ga.draw()
    }

    if (n == 1){
    board.draw()
    ga = new word(board.width/2-100,board.height/2,"YOU WIN",250)
    ga.draw()
    }

}

function paused(){

removeEventListener("keydown", typing);
addEventListener("keydown", paused);
p = new word(board.width/2-100,board.height/2,"PAUSED",250)
l = new word(board.width/2-100,board.height/2+50,"Press 1 - Main page",250)
p.draw()
l.draw()
document.onkeypress = (e)=>{
        const k = e.key
        if (k == "`"){
        removeEventListener("keydown", paused);
        addEventListener("keyup", typing);
        game = setInterval(play, 100);
        }
        if (k=="1"){
        history.back()
        }
    }


}
init()