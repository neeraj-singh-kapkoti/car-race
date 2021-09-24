const score = document.querySelector(".score");
const screen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

let player = {speed: 5, score:0};
let keys = {
    ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false, 
};

screen.addEventListener('click', start);
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

function moverLines(){
    let lines = document.querySelectorAll(".line");
    lines.forEach(function(item) {
        if(item.y>600){
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}

function isCollide(myCar, b){
    let myCarRect = myCar.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(myCarRect.bottom<bRect.top ||
             myCarRect.top>bRect.bottom ||
             myCarRect.left>bRect.right ||
             myCarRect.right<bRect.left
        )
}

function movesEnemy(car){
    let ele= document.querySelectorAll(".enemy");
    
    ele.forEach(function(item) {
        if(isCollide(car, item)){
            endGame();
        }
        if(item.y>1500){
            item.y = -600;
            item.style.left = Math.floor(Math.random()*350)+"px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}

function playGame(){
    let car = document.querySelector(".car");
    moverLines();
    movesEnemy(car);
    let road = gameArea.getBoundingClientRect();
    if(player.start){
       
        if(keys.ArrowUp && player.y>road.top){ player.y -= player.speed;}
        if(keys.ArrowDown && player.y<road.bottom){ player.y += player.speed;}
        if(keys.ArrowLeft && player.x>0){ player.x -= player.speed;}
        if(keys.ArrowRight && player.x<(road.width-50)){ player.x += player.speed;}
        car.style.left = player.x+'px';
        car.style.top = player.y+'px';
        window.requestAnimationFrame(playGame);
        player.score++;
        score.textContent = "SCORE : "+player.score;
    }
}
function pressOn(e){
    e.preventDefault();
    keys[e.key] = true;

}
function pressOff(e){
    e.preventDefault();
    keys[e.key] = false;

}

function endGame(){
    player.start = false;
    score.innerHTML = "Game Over <br> Score Was : "+ player.score; 
    screen.classList.remove("hide");
}

function start(){
    
    screen.classList.add("hide");
    gameArea.innerHTML = "";
    player.start = true;
    player.score = 0;
    for (let x = 0; x < 9; x++) {
        let div = document.createElement("div");
        div.setAttribute("class", "line");
        div.y = x*150;
        div.style.top = (x*150)+"px";
        gameArea.appendChild(div);
    }
    window.requestAnimationFrame(playGame);
    let car = document.createElement("div");
    car.setAttribute("class", "car");
    gameArea.appendChild(car);
    player.x = 100;
    player.y = 300;
    for (let x = 0; x < 4; x++) {
        let enemy = document.createElement("div");
        enemy.setAttribute("class", "enemy");
        enemy.innerHTML = "<br>"+(x+1);
        enemy.y = ((x+1)*600)*-1;
        enemy.style.top = enemy.y+"px";
        enemy.style.left = Math.floor(Math.random()*350)+"px";
        enemy.style.background = rndmColor();
        enemy.style.backgroundImage = "url('img/car-top.png')";
        enemy.style.backgroundSize = "cover";
        enemy.style.backgroundPositionX = "-26px";
        gameArea.appendChild(enemy);
    }
}
function rndmColor(){
    function c(){
        let hex = Math.floor(Math.random()*256).toString(16);
        return ("0"+String(hex)).substr(-2);
    }
    return "#"+c()+c()+c();
}