let enemySpeed = [150, 350, 500],
    posArray = [64, 147, 230],
    xPosArray = [1, 102, 203, 304, 405],
    score = 0,
    destination = 0;
let gemType = ['images/Gem Blue.png', 'images/Gem Green.png', 'images/Gem Orange.png'];

// the enemy class 
class Enemy {
    
    constructor(){
    this.y = posArray[Math.floor(Math.random() * posArray.length)];
    this.x = 1;
    this.sprite = 'images/enemy-bug.png';
    this.enemySpeed = enemySpeed[Math.floor(Math.random() * enemySpeed.length)];
    // adding a random speed and position to the coming bugs
    }

// to update the position of the bugs with random time differences 
    update(dt) {
    // multiplying the movements by the dt parameter will
    // ensure the game runs at the same speed for all computers.

        this.x += this.enemySpeed * dt ;
        if (this.x > 510 ){
            this.x = -102;
            this.y = posArray[Math.floor(Math.random() * posArray.length)];
            this.enemySpeed = enemySpeed[Math.floor(Math.random() * enemySpeed.length)];
            this.x += this.enemySpeed * dt ;  
        }
    }

// To draw the bugs on the screen.
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// The player class

class Player {
    constructor () {

        this.image = 'images/char-horn-girl.png';
        this.x = 203 ;
        this.y = 416 ;
        // initial position
    }
    render () {
        ctx.drawImage(Resources.get(this.image), this.x, this.y);
    }

    handleInput (pressedKey) {
        if(pressedKey === 'left')
            this.x > 1 ? this.x -= 101 : this.x = 1;
            
        if(pressedKey === 'right')
            this.x < 405 ? this.x += 101 : this.x = 405;
            
        if(pressedKey === 'up')
            this.y > 1 ? this.y -= 83 : this.y = 1;
            
        if(pressedKey === 'down')
            this.y < 416 ? this.y += 83 : this.y = 416;
    }

    update() {
        // To update after any collision 
        for (const enemy of allEnemies){
            if (this.x < enemy.x+45 && this.x > enemy.x-45 &&
                this.y == enemy.y+20 && this.y == enemy.y+20) {
                this.y = 416;
                this.x = 203;
                if (score > 0){
                    score -= 100;}
                else {score = 0;}
                gem_update();
                display();
            }
        }
        // TO update when the player reaches the destination
        if (this.y == 1) {
            this.y = 416;
            this.x = 203;
            score += 200;
            gem_update();
            destination += 1;
            display();
        }
    }
}

class Gem {
    constructor () {
        // using different  images of the gems, only one in every game.
        this.image = gemType[Math.floor(Math.random() * gemType.length)] ;        
        this.x =xPosArray[Math.floor(Math.random() * xPosArray.length)] ;
        this.y = posArray[Math.floor(Math.random() * posArray.length)];
    }

    update() {
        // To update when the player touches the gem.
        if (player.x < this.x+45 && player.x > this.x-45 &&
            player.y == this.y+20) {
            this.x = -600;
            score+= 100;
            display();
        }

    } 

    // To show the gem on the screen.
    render () {
        ctx.drawImage(Resources.get(this.image), this.x, this.y);
    }
}

class Winner {
    constructor () {
        this.modal = document.getElementById('modal');
        this.page = document.getElementById('container');
        this.results = document.getElementById('results');

    }
    popup () {

        if (score >= 200 && destination > 0) {
            display();
            modal_win();
            this.modal.classList.replace("hide", "show");
            this.results.classList.add('hide');
            this.page.classList.add('transparent');
            // TODO: new game
            document.getElementById('button').addEventListener("click", function() {
                document.getElementById('modal').classList.replace('show', 'hide');
                document.getElementById('results').classList.remove('hide');
                document.getElementById('container').classList.remove('transparent');
                score = 0;
                destination = 0;
                display();

            });
        }
    }

}


function display() {
    document.getElementById('points').textContent = "Your score is: "+ score +" points";
    document.getElementById('destination').textContent = "You reached the destination: "+ destination +" times";
}

display();



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

document.getElementById('modal').classList.replace('show', 'hide');
document.getElementById('results').classList.remove('hide');
document.getElementById('container').classList.remove('transparent');
let bugOne = new Enemy(),
    bugTwo = new Enemy(),
    bugThree = new Enemy();
let allEnemies = [bugOne, bugTwo, bugThree];
let player = new Player();
let gem = new Gem();
let winner = new Winner();


function gem_update () {
    gem.x =xPosArray[Math.floor(Math.random() * xPosArray.length)] ;
    gem.y = posArray[Math.floor(Math.random() * posArray.length)];
    gem.image = gemType[Math.floor(Math.random() * gemType.length)] ;
}

function modal_win() {
    document.getElementById('score_destination').textContent = destination;
    document.getElementById('score').textContent = score;
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    e.preventDefault();
    player.handleInput(allowedKeys[e.keyCode]);
});
