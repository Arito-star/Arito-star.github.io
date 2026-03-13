const game=document.getElementById("game")
const info=document.getElementById("info")
const toss=document.getElementById("toss")
const message=document.getElementById("message")

let level=1
let stones=[]
let tossing=false
let vy=0
let y=0

const gravity=0.3
const startVy=-10

const levels=[1,2,3,4,5]

function startLevel(){

stones.forEach(s=>s.remove())
stones=[]

for(let i=0;i<5;i++){

let s=document.createElement("div")
s.className="stone"

s.style.left=Math.random()*(window.innerWidth-100)+"px"
s.style.top=Math.random()*(window.innerHeight-200)+100+"px"

s.onclick=()=>collectStone(s)

game.appendChild(s)
stones.push(s)

}

info.innerText="Нужно собрать: "+levels[level-1]

resetToss()

}

function resetToss(){

y=window.innerHeight-100
toss.style.bottom="100px"
tossing=false

}

function throwStone(){

if(tossing)return

tossing=true
vy=startVy

stones.forEach(s=>s.classList.remove("collected"))

animate()

}

function animate(){

if(!tossing)return

vy+=gravity
y+=vy

toss.style.bottom=(window.innerHeight-y)+"px"

if(y>=window.innerHeight-100){

tossing=false
check()

}else{

requestAnimationFrame(animate)

}

}

function collectStone(s){

if(!tossing)return

s.classList.add("collected")

}

function check(){

let c=document.querySelectorAll(".collected").length
let need=levels[level-1]

if(c==need){

if(level==5){

show("ФИНАЛ","Вы мастер Беш Таш!")
level=1

}else{

level++
show("УСПЕХ","Следующий уровень")

}

}else{

show("ПРОМАХ","Собрано "+c+" из "+need)

}

startLevel()

}

function show(t,b){

document.getElementById("msgTitle").innerText=t
document.getElementById("msgText").innerText=b
message.style.display="block"

}

function closeMessage(){

message.style.display="none"

}

window.addEventListener("keydown",e=>{
if(e.code=="Space")throwStone()
})

window.addEventListener("mousedown",throwStone)

startLevel()
