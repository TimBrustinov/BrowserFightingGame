class Fighter extends Sprite
{
    width = 0;
    height = 0;
    gravity = 0.7;
    lastKey = '';
    color = '';
    health = 100;
    isAttacking = false;
    isDead = false;
    position: { x: number, y: number } = { x: 0, y: 0 };
    velocity: { x: number, y: number } = { x: 0, y: 0 };
    
    AttackHitbox: {
        position: { x: number, y: number }, 
        offset: {x: number, y: number}, 
        width: number, 
        height: number
    } = {
        position: this.position, offset: {x: 0, y: 0}, width: 200, height: 150
    };
    
    Sprites: {
        idle: {image: HTMLImageElement, maxFrames: number}, 
        run: {image: HTMLImageElement, maxFrames: number}, 
        jump: {image: HTMLImageElement, maxFrames: number},
        fall: {image: HTMLImageElement, maxFrames: number},
        attack1: {image: HTMLImageElement, maxFrames: number},
        takeHit: {image: HTMLImageElement, maxFrames: number},
        death: {image: HTMLImageElement, maxFrames: number}
    } = {
        idle: {image: new Image(), maxFrames: 1},
        run: {image: new Image(), maxFrames: 1},
        jump: {image: new Image(), maxFrames: 1},
        fall: {image: new Image(), maxFrames: 1},
        attack1: {image: new Image(), maxFrames: 1},
        takeHit: {image: new Image(), maxFrames: 1},
        death: {image: new Image(), maxFrames: 1}
    };

    constructor(
        position: { x: number, y: number }, 
        velocity: { x: number, y: number }, 
        color: string, 
        hitboxOffset: { x: number, y: number }, 
        imageSrc: string, 
        scale: number = 1, 
        maxFrames: number = 1, 
        offset: {x: number, y: number} = {x: 0, y: 0},
        sprites: {
            idle: {imgSrc: string, maxFrames: number}, 
            run: {imgSrc: string, maxFrames: number}, 
            jump: {imgSrc: string, maxFrames: number}, 
            attack1: {imgSrc: string, maxFrames: number}, 
            fall: {imgSrc: string, maxFrames: number},
            takeHit: {imgSrc: string, maxFrames: number},
            death: {imgSrc: string, maxFrames: number}  
        }
    )
    {
        super(position, imageSrc, scale, maxFrames, offset);

        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.color = color;
        this.AttackHitbox.position = { x: this.position.x, y: this.position.y};
        this.AttackHitbox.offset = hitboxOffset;

        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 8;

        this.Sprites 
        
        this.Sprites.idle.image.src = sprites.idle.imgSrc;
        this.Sprites.idle.maxFrames = sprites.idle.maxFrames;

        this.Sprites.run.image.src = sprites.run.imgSrc;
        this.Sprites.run.maxFrames = sprites.run.maxFrames;

        this.Sprites.jump.image.src = sprites.jump.imgSrc;
        this.Sprites.jump.maxFrames = sprites.jump.maxFrames;

        this.Sprites.fall.image.src = sprites.fall.imgSrc;
        this.Sprites.fall.maxFrames = sprites.fall.maxFrames;

        this.Sprites.attack1.image.src = sprites.attack1.imgSrc;
        this.Sprites.attack1.maxFrames = sprites.attack1.maxFrames;

        this.Sprites.takeHit.image.src = sprites.takeHit.imgSrc;
        this.Sprites.takeHit.maxFrames = sprites.takeHit.maxFrames;

        this.Sprites.death.image.src = sprites.death.imgSrc;
        this.Sprites.death.maxFrames = sprites.death.maxFrames;
    }

    changeAnimation(animation: string)
    {
        //if player is attacking, do not change animation
        if(this.image === this.Sprites.attack1.image && this.framesCurrent < this.Sprites.attack1.maxFrames - 1) return;

        //if player is taking hit, do not change animation
        if(this.image === this.Sprites.takeHit.image && this.framesCurrent < this.Sprites.takeHit.maxFrames - 1) return;

        if(this.image === this.Sprites.death.image)
        {
            if(this.framesCurrent === this.Sprites.death.maxFrames - 1)
            {
                this.isDead = true;
            } 
            return;
        } 

        switch(animation)
        {
            case 'idle':
                if(this.image !== this.Sprites.idle.image)
                {
                    this.image = this.Sprites.idle.image;
                    this.maxFrames = this.Sprites.idle.maxFrames;
                    this.framesCurrent = 0;
                }
                break;
            case 'run':
                if(this.image !== this.Sprites.run.image)
                {
                    this.image = this.Sprites.run.image;
                    this.maxFrames = this.Sprites.run.maxFrames;
                    this.framesCurrent = 0;
                }
                break;
            case 'jump':
                if(this.image !== this.Sprites.jump.image)
                {
                    this.image = this.Sprites.jump.image;
                    this.maxFrames = this.Sprites.jump.maxFrames;
                    this.framesCurrent = 0;
                }
                break;
            case 'fall':
                if(this.image !== this.Sprites.fall.image)
                {
                    this.image = this.Sprites.fall.image;
                    this.maxFrames = this.Sprites.fall.maxFrames;
                    this.framesCurrent = 0;
                }
                break;
            case 'attack1':
                if(this.image !== this.Sprites.attack1.image)
                {
                    this.image = this.Sprites.attack1.image;
                    this.maxFrames = this.Sprites.attack1.maxFrames;
                    this.framesCurrent = 0;
                }
                break;
            case 'takeHit':
                if(this.image !== this.Sprites.takeHit.image)
                {
                    this.image = this.Sprites.takeHit.image;
                    this.maxFrames = this.Sprites.takeHit.maxFrames;
                    this.framesCurrent = 0;
                }
                break;
            case 'death':
                if(this.image !== this.Sprites.death.image)
                {
                    this.image = this.Sprites.death.image;
                    this.maxFrames = this.Sprites.death.maxFrames;
                    this.framesCurrent = 0;
                }
                break;
        }
    }

    update()
    {
        this.draw();
        if(!this.isDead)
        {
            this.animateFrames();
        }
        //this.animateFrames();
        this.AttackHitbox.position.x = this.position.x + this.AttackHitbox.offset.x;
        this.AttackHitbox.position.y = this.position.y + this.AttackHitbox.offset.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if(this.position.y + this.height + this.velocity.y >= canvas.height - 95)
        {
            this.velocity.y = 0;
            //this.position.y = 330;
        }
        else
        {
            this.velocity.y += this.gravity;
        }
    }

    attack()
    {
        this.changeAnimation('attack1');
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false;
          }, 100);
    }

    takeHit()
    {
        this.health -= 20;
        if(this.health <= 0)
        {
            this.changeAnimation('death');
        }
        else
        {
            this.changeAnimation('takeHit');
        }
    }
}