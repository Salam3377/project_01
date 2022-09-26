console.log("im here")

//getting canvas and toggle menu in variables-----------------
const canvas = document.getElementById('canvas')
const startWindow = document.getElementById('start-window')
//context of canvas--------------------------------------------
const ctx = canvas.getContext('2d')
//creating score variables for players-------------------------
let p1ScoreId = document.getElementById('p1-score')
let p2ScoreId = document.getElementById('p2-score')
let score1 = 0
let score2 = 0
// ball variables------------------------------------------------
let ballSpeed = 5
let ballX = canvas.width/2
let ballY = canvas.height/2
let ballXD = 1
let ballYD = 1
let ballRadius = 12

//-----------------getting some ID's---------------------

let rules = document.getElementById('rules')
rules.addEventListener('click', () => {
    startWindow.style.display = 'none'
    insideRules.style.display = 'block'
})

let insideRules = document.getElementById('inside-rules')

let goBack = document.getElementById('go-back')
goBack.addEventListener('click', () => {
    startWindow.style.display = 'block'
    insideRules.style.display = 'none'
})

let timeWindow = document.getElementById('time-left')

let winnerBoard = document.getElementById('winner-board')

const endingMenu = document.getElementById('ending-menu')

//-------------create-reset-window-------------------------------------
let restart = document.getElementById("Restart")
restart.addEventListener('click', () => { 
    score1 = 0
    p1ScoreId.style.color = 'orange'
    p1ScoreId.textContent = `${score1}`
    timeWindow.style.color = 'white'
    score2 = 0
    p2ScoreId.style.color = 'orange'
    p2ScoreId.textContent = `${score2}`
    ballSpeed = 5
    endingMenu.style.display = 'none'
    start()
})
//---------------------------------------------------start variable-------------
let firstStart = document.getElementById('button') 
firstStart.addEventListener('click', () => {
    start()
})


//-------------------canvas-attributes-------------------------------------------
canvas.setAttribute('width', getComputedStyle(canvas)['width'])
canvas.setAttribute('height', getComputedStyle(canvas)['height'])
console.log('this is the canvas element', canvas)

//----------------------------------------------------------------START------------------------------------------------------------------------------

const start = () => {

    let newNames = document.getElementById('New-Players')
newNames.addEventListener('click', () => {
    startWindow.style.display = 'block'
    canvas.style.display = 'none'
    endingMenu.style.display = 'none'
    board.style.display = 'none'
    winnerBoard.style.display = 'none'

})

    let time = 60
    winnerBoard.innerText = ''
    // getting canvas block-----------------------------------------
   canvas.style.display = 'block'
   // toggle menu
   startWindow.style.display = 'none'
   let board = document.getElementById('names-board')
   board.style.display = 'block'
   winnerBoard.style.display = 'block'
 
   //create display name1------------------------------------

    let text1 = document.getElementById('text-1').value;
    let displayName1 = document.getElementById('display-name1')
    displayName1.innerText = text1
    console.log(displayName1)

   //create display name2-------------------------------------------

    let text2 = document.getElementById('text-2').value;
    let displayName2 = document.getElementById('display-name2')
    displayName2.innerText = text2
    console.log(displayName2)

//----------------------------------------------------------------CREATING PADDLES CLASS------------------------

class Paddle {
    constructor(x,y,color,width,height) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        this.speed = 15

        //set directions to false to make them true when we press on keys
        this.direction = {
            up: false,
            down: false
        },

        // setDirectionLEft will be tied to a keyDown event for left paddle
        this.setDirectionLeft = function (key) {
            console.log('this is the key that was pressed', key)
            if (key.toLowerCase() == 'w') { this.direction.up = true }
            
            if (key.toLowerCase() == 's') { this.direction.down = true }
            
        },
        // unsetDirectionLeft will be tied to a keyUp event for left paddle
        this.unsetDirectionLeft = function (key) {
            console.log('this is the key that was released', key)
            if (key.toLowerCase() == 'w') { this.direction.up = false }
            
            if (key.toLowerCase() == 's') { this.direction.down = false }
            
        },

        // setDirectionRight will be tied to a keyDown event for right paddle
        this.setDirectionRight = function (key) {
            console.log('this is the key that was pressed', key)
            if (key == 'ArrowUp') { this.direction.up = true }
            
            if (key == 'ArrowDown') { this.direction.down = true }
            
        },

        // unsetDirectionRight will be tied to a keyDown event for right paddle
        this.unsetDirectionRight = function (key) {
            console.log('this is the key that was released', key)
            if (key == 'ArrowUp') { this.direction.up = false }
            
            if (key == 'ArrowDown') { this.direction.down = false }
            
        },

        // we're also adding a movePaddle function that is tied to our directions
        this.movePaddle = function () {
            // movePaddle, sends our elements flying in whatever direction is true
            if (this.direction.up) {
                this.y -= this.speed
                // while we're tracking movement, let's stop our elements from exiting the top of the screen
                if (this.y <= 0) {
                    this.y = 0
                }
            }
            if (this.direction.down) {
                this.y += this.speed
                // while we're tracking movement, let's stop our hero from exiting the top of the screen
                // for down, and right, we need the entire character for our detection of the wall, as well as the canvas width and height
                if (this.y + this.height >= canvas.height) {
                    this.y = canvas.height - this.height
                }
            }
        },
         this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}
//-------------------------------------------------------------------------------------------------------------
// LEFT PADDLE------------------------------------------------

// function that changes the player's direction
document.addEventListener('keydown', (e) => {
    // when a key is pressed, call the setDirectionLEft method
    leftPaddle.setDirectionLeft(e.key)
})
// function that stops player from going in specific direction
document.addEventListener('keyup', (e) => {
    // when a key is pressed, call the setDirectionLEft method
    if (['w', 's'].includes(e.key)) {
        leftPaddle.unsetDirectionLeft(e.key)
    }
})

// RIGHT PADDLE----------------------------------------------

// function that changes the player's direction
document.addEventListener('keydown', (e) => {
    // when a key is pressed, call the setDirectionLEft method
    RightPaddle.setDirectionRight(e.key)
})
// function that stops player from going in specific direction
document.addEventListener('keyup', (e) => {
    // when a key is pressed, call the setDirectionLEft method
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        RightPaddle.unsetDirectionRight(e.key)
    }
})

//creating paddles left and right------------------------------
//--------L--------
const leftPaddle = new Paddle(10,200,'orange',10,100)
//--------R--------
const RightPaddle = new Paddle( 780, 200,'orange',10,100)


//drawing a circle shape for our ball--------------------------
const drawBall = function(ballX,ballY) {
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'aqua'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(ballX,ballY,ballRadius,0,2 * Math.PI)
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
}

//------------------creating ball--------------------------------

const createBall = function() {
    ballSpeed = 5
    if(Math.round(Math.random()) == 1) {
        ballXD = 1
    }
    else {
        ballXD = -1
    }
    if(Math.round(Math.random()) == 1) {
        ballYD = 1
    }
    else {
        ballYD = -1
    }
    ballX = canvas.width /2
    ballY = canvas.height/2
    drawBall(ballX,ballY)
}


//    ------------------------BALL MOVEMENT FUNCTION----------------------

const moveBall = function() {
    ballX += (ballSpeed * ballXD)
    ballY += (ballSpeed * ballYD)
}
//    ------------------------COLLISION FUNCTION----------------------------
const collision = function() {
    if (ballY + ballRadius >= 500 || ballY - ballRadius < 0 ) {
        ballYD *= -1
    }
    if (ballX + ballRadius >= 800 ) {
        score1++
        p1ScoreId.textContent = `${score1}`
        createBall()
        return
    }
    if (ballX + ballRadius <= 0 ) {
        score2++
        p2ScoreId.textContent = `${score2}`
        createBall()
        return
    }


    if (ballX <= (leftPaddle.x + leftPaddle.width + ballRadius)) {
        if (ballY > leftPaddle.y && ballY < leftPaddle.y + leftPaddle.height) {
            ballX = (leftPaddle.x + leftPaddle.width) + ballRadius // not to stuck
            ballXD *= -1
            ballSpeed += 1
        }
    }
    if (ballX >= (RightPaddle.x - ballRadius)) {
        if (ballY > RightPaddle.y && ballY < RightPaddle.y + RightPaddle.height) {
            ballX = RightPaddle.x - ballRadius// not to stuck
            ballXD *= -1
            ballSpeed += 1
        }
    }
}
//----------------------------------------Winner--------------------------------
const winner = function() {
    if (score1 == 6) {
        p1ScoreId.style.color = 'green'
        stopGameLoop()
        winnerBoard.innerText = `Congrats ${text1} you WON!!!!!`
        endingMenu.style.display = 'block'
        clearInterval(counter)
    }
    else if (score2 == 6) {
        p2ScoreId.style.color = 'green'
        stopGameLoop()
        winnerBoard.innerText = `Congrats ${text2} you WON!!!!!`
        endingMenu.style.display = 'block'
        clearInterval(counter)
    }
}
//---------------------------TIMER-----------------------------------------------

const timing = function() {
    time = time - 1
    if(time < 10) {
        timeWindow.style.color = 'red'
    }
    timeWindow.innerText = `${time}`
    if (time<=0) {
        clearInterval(counter)
        stopGameLoop()
        endingMenu.style.display = 'block'
        if (score1 > score2) {
            winnerBoard.innerText = `Time's out, ${text1} WON!!!!!`
        }
        else if (score1 < score2) {
            winnerBoard.innerText = `Time's out, ${text2} WON!!!!!`
        }
        else if (score1 == score2) {
            winnerBoard.innerText = `Time's out, It's a Draw!!!!!`
        }
    }
    
}
let counter = setInterval(timing,1000)
//-------------------------------------GAME LOOP---------------------------------
const gameLoop = () => {
    
    // make sure you don't have any console.logs in here
    // console.log('frame running')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    leftPaddle.render()
    leftPaddle.movePaddle()
    RightPaddle.render()
    RightPaddle.movePaddle()
    drawBall(ballX,ballY)
    moveBall()
    collision()
    winner()

}

//-----------------------------------------------------DOM start stop-------------------------------- 
const gameInterval = setInterval(gameLoop, 20)
// used to stop the game when the condition to do so is met
const stopGameLoop = function() {clearInterval(gameInterval)}
document.addEventListener('DOMContentLoaded', function () {
    // calls the game loop and runs the interval 
    gameInterval
})
}
