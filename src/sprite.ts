class Sprite 
{
    width = 0;
    height = 0;
    position: { x: number, y: number } = { x: 0, y: 0 };
    image: HTMLImageElement = new Image();
    scale = 1;
    maxFrames = 1;
    framesCurrent = 0;
    framesElapsed = 0;
    framesHold = 8;
    offset = {x: 0, y: 0};

    constructor(position: { x: number, y: number }, imageSrc: string, scale: number = 1, maxFrames: number = 1, offset: {x: number, y: number} = {x: 0, y: 0}) 
    {
        this.position = position;
        this.image.src = imageSrc;
        this.scale = scale;
        this.maxFrames = maxFrames;
        this.offset = offset;
    }


    update()
    {
        this.draw();
        this.animateFrames();
    }

    draw()
    {
        ctx.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.maxFrames),
            0, 
            this.image.width / this.maxFrames,
            this.image.height,            
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width / this.maxFrames) * this.scale, 
            this.image.height * this.scale
        );
    }

    animateFrames()
    {
        this.framesElapsed++;

        if(this.framesElapsed % this.framesHold === 0)
        {
            if(this.framesCurrent < this.maxFrames - 1)
            {
                this.framesCurrent++;
            }
            else
            {
                this.framesCurrent = 0;
            }
        }
    }
}