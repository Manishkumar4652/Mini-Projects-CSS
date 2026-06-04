let gameseq=[];
let userseq=[];

let btns=["green","red","yellow","blue"];

let started=false;
let level=0;
let highScore=0;

let h2 = document.querySelector("h2");
let highScoreText = document.querySelector("#highScore");

document.addEventListener("keypress",function(){
    if(started==false){
        started=true;

        levelUp();
    }
});

function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },100);
}
function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },100);
}

function levelUp(){
    userseq=[];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIndex = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIndex];
    let randomBtn = document.querySelector(`.${randomColor}`);
    gameseq.push(randomColor);
    console.log(gameseq);
    gameflash(randomBtn);
}

function checkAnswer(idx){
    console.log("Current level: ",level);
    if(userseq[idx]===gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        const score = level - 1;
        if (score > highScore) {
            highScore = score;
            highScoreText.innerText = `High Score: ${highScore}`;
        }
        h2.innerHTML = "Game Over: Your score was <b>" + score + "</b>. Press any key to start";
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },200);
        reset();
    }
}

function btnPress(){
    let btn = this;
    userflash(btn);

    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);

    checkAnswer(userseq.length-1);
}

let allbtn = document.querySelectorAll(".btn");

for(let btn of allbtn){
    btn.addEventListener("click", btnPress);
}
function reset(){
    gameseq=[];
    userseq=[];
    started=false;
    level=0;
}