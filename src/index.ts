const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);
const background = new Sprite({ x: 0, y: 0 }, 'assets/background.png');
const shop = new Sprite({ x: 650, y: 160 }, 'assets/shop.png', 2.5, 6);

const player = new Fighter(
    { x: 180, y: 200 }, 
    { x: 0, y: 10 }, 
    'red', 
    {x: 50, y: 0}, 
    'assets/samuraiMack/idle.png', 
    2.5, 
    8, 
    {x: 215, y: 157}, 
    {
        idle: {imgSrc: 'assets/samuraiMack/idle.png', maxFrames: 8}, 
        run: {imgSrc: 'assets/samuraiMack/run.png', maxFrames: 8}, 
        jump: {imgSrc: 'assets/samuraiMack/jump.png', maxFrames: 2},
        attack1: {imgSrc: 'assets/samuraiMack/attack1.png', maxFrames: 6},
        fall: {imgSrc: 'assets/samuraiMack/fall.png', maxFrames: 2},
        takeHit: {imgSrc: 'assets/samuraiMack/Take hit.png', maxFrames: 4},
        death: {imgSrc: 'assets/samuraiMack/death.png', maxFrames: 6}
    });

const enemy = new Fighter(
    { x: 750, y: 200 },
    { x: 0, y: 0 }, 
    'blue', 
    {x: -150, y: 0},
    '../assets/kenji/idle.png', 
    2.5, 
    4, 
    {x: 215, y: 170}, 
    {
        idle: {imgSrc: 'assets/kenji/idle.png', maxFrames: 4}, 
        run: {imgSrc: 'assets/kenji/run.png', maxFrames: 8}, 
        jump: {imgSrc: 'assets/kenji/jump.png', maxFrames: 2},
        attack1: {imgSrc: 'assets/kenji/attack1.png', maxFrames: 4},
        fall: {imgSrc: 'assets/kenji/fall.png', maxFrames: 2},
        takeHit: {imgSrc: 'assets/kenji/Take Hit.png', maxFrames: 3},
        death: {imgSrc: 'assets/kenji/death.png', maxFrames: 7}
    });

const playerHealth = document.getElementById('player-health') as HTMLDivElement;
const enemeyHealth = document.getElementById('enemy-health') as HTMLDivElement;

const timerElement = document.getElementById('timer') as HTMLDivElement;
const gameOverState = document.getElementById('game-state') as HTMLDivElement;
var timer = 50;

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    arrowLeft: {
        pressed: false
    },
    arrowRight: {
        pressed: false
    },
    arrowUp: {
        pressed: false
    }
}

function Update() 
{
    window.requestAnimationFrame(Update);
    
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    background.update();
    shop.update();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    //player movement
    player.velocity.x = 0;
    if(keys.a.pressed && player.lastKey === 'a')
    {
        player.changeAnimation('run');
        player.velocity.x = -5;
    }
    else if(keys.d.pressed && player.lastKey === 'd')
    {
        player.changeAnimation('run');
        player.velocity.x = 5;
    }
    else
    {
        player.changeAnimation('idle');
    }

    //player jump
    if(player.velocity.y < 0)
    {
        player.changeAnimation('jump');
    }
    else if(player.velocity.y > 0)
    {
        player.changeAnimation('fall');
    }
    

    enemy.velocity.x = 0;
    if(keys.arrowLeft.pressed && enemy.lastKey === 'ArrowLeft')
    {
        enemy.velocity.x = -5;
        enemy.changeAnimation('run');
    }
    else if(keys.arrowRight.pressed && enemy.lastKey === 'ArrowRight')
    {
        enemy.velocity.x = 5;
        enemy.changeAnimation('run');
    }
    else
    {
        enemy.changeAnimation('idle');
    }

    if(enemy.velocity.y < 0)
    {
        enemy.changeAnimation('jump');
    }
    else if(enemy.velocity.y > 0)
    {
        enemy.changeAnimation('fall');
    }


    //detect for collision

    if(player.isAttacking && HitboxIntersect(player, enemy))
    {
        console.log('Player hit');
        enemy.takeHit();
        player.isAttacking = false;
        enemeyHealth.style.width = enemy.health + '%';
    }
    else if(enemy.isAttacking && HitboxIntersect(enemy, player))
    {
        console.log('Enemy hit');
        player.takeHit();
        enemy.isAttacking = false;
        playerHealth.style.width = player.health + '%';
    }

    // end game based on health
    if(player.health <= 0 || enemy.health <= 0)
    {
        gameOverState.style.display = 'flex';
        determineWinner();
    }
}

function HitboxIntersect(a: Fighter, b: Fighter): boolean
{
    if(a.AttackHitbox.position.x + a.AttackHitbox.width >= b.position.x && a.AttackHitbox.position.x <= b.position.x + b.width
        && a.AttackHitbox.position.y + a.AttackHitbox.height >= b.position.y && a.AttackHitbox.position.y <= b.position.y + b.height)
    {
        return true;
    }
    return false;
}

function decreaseTimer()
{
    if(timer > 0)
    {
        setTimeout(decreaseTimer, 1000)
        timer--;
        timerElement.innerHTML = timer.toString();
    }
    else
    {
        determineWinner();
    }
}

function determineWinner()
{
    gameOverState.style.display = 'flex';
    if(player.health === enemy.health)
    {
        gameOverState.innerHTML = 'Draw';
    }
    else if(player.health > enemy.health)
    {
        gameOverState.innerHTML = 'Player 1 Wins';
    }
    else
    {
        gameOverState.innerHTML = 'Player 2 Wins';
    }
}

Update();
decreaseTimer();

window.addEventListener('keydown', (e) => 
{
    //player movement
    if(!player.isDead)
    {
        switch(e.key){
            case 'd':
                keys.d.pressed = true;
                player.lastKey = 'd';
                break;
            case 'a':
                keys.a.pressed = true;
                player.lastKey = 'a';
                break;
            case 'w':
                keys.w.pressed = true;
                player.velocity.y = -20;
                break;
            case ' ':
                player.attack();
                break;
        }
    }
    

    //enemey movement
    if(!enemy.isDead)
    {
        switch(e.key){
            case 'ArrowLeft':
                keys.arrowLeft.pressed = true;
                enemy.lastKey = 'ArrowLeft';
                break;
            case 'ArrowRight':
                keys.arrowRight.pressed = true;
                enemy.lastKey = 'ArrowRight';
                break;
            case 'ArrowUp':
                keys.arrowUp.pressed = true;
                enemy.velocity.y = -20;
                break;
            case 'ArrowDown':
                enemy.attack();
                break;  
        }
    }
    
});

window.addEventListener('keyup', (e) => 
{
    //player movement
    switch(e.key){
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;

    }

    //enemey movement
    switch(e.key){
        case 'ArrowLeft':
            keys.arrowLeft.pressed = false;
            break;
        case 'ArrowRight':
            keys.arrowRight.pressed = false;
            break;
    }
});