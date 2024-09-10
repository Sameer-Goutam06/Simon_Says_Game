let gameseq=[];
let userseq=[];
let btns=["yellow","red","green","purple"];
let h2=document.querySelector("h2");
let btn=document.getElementsByClassName("btn");

//initialising the start of the game
let start=false;
let level=0;

//game starts
let started=function(){
document.addEventListener("keypress",function(){
    if(start==false){
    console.log("game start");
    start=true;
    levelUp();
    }
});
}
started();


//button flashing function
function gameFlash(btn){
    btn.classList.add("btnflash");
    setTimeout(function(){
        btn.classList.remove("btnflash");
    },200);

}
//user interaction 
function userFlash(btn){
    
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },200);

}

//levelUp starts
function levelUp(){
    userseq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randomIndex=Math.floor(Math.random()*3);
    let randomColor=btns[randomIndex];
    gameseq.push(randomColor);
    let randomButton=document.querySelector(`.${randomColor}`);
    // console.log(gameseq);
    gameFlash(randomButton);
}

//to check sequence
function checkSequence(index){
    console.log("level: " + level);
    if(userseq[index]==gameseq[index]){
        if(userseq.length==gameseq.length){
            setTimeout(levelUp(),1000);
        }
        console.log("sequence matched");
    }
    else{
        console.log("Game Over");
        h2.innerHTML=`Game Over! Your score is:<b>${level*10}</b><br>Press any key to restart`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
        document.querySelector("body").style.backgroundColor="white";   
        },100);
        reset();
    }
}

//function for capturing pressed buttons sequence   
function btnPress(){
    let btn=this;
    userFlash(btn);
    userColor=btn.getAttribute("id");
    userseq.push(userColor);
    //console.log(userseq);
    checkSequence(userseq.length-1);
}


//addEventListener for buttons
let allBtns=document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener("click",btnPress);
}

//reset function
function reset(){
    start=false;
    gameseq=[];
    userseq=[];
    level=0;
    started();
}

