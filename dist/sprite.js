"use strict";
var Sprite = /** @class */ (function () {
    function Sprite(position, imageSrc, scale, maxFrames, offset) {
        if (scale === void 0) { scale = 1; }
        if (maxFrames === void 0) { maxFrames = 1; }
        if (offset === void 0) { offset = { x: 0, y: 0 }; }
        this.width = 0;
        this.height = 0;
        this.position = { x: 0, y: 0 };
        this.image = new Image();
        this.scale = 1;
        this.maxFrames = 1;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 8;
        this.offset = { x: 0, y: 0 };
        this.position = position;
        this.image.src = imageSrc;
        this.scale = scale;
        this.maxFrames = maxFrames;
        this.offset = offset;
    }
    Sprite.prototype.update = function () {
        this.draw();
        this.animateFrames();
    };
    Sprite.prototype.draw = function () {
        ctx.drawImage(this.image, this.framesCurrent * (this.image.width / this.maxFrames), 0, this.image.width / this.maxFrames, this.image.height, this.position.x - this.offset.x, this.position.y - this.offset.y, (this.image.width / this.maxFrames) * this.scale, this.image.height * this.scale);
    };
    Sprite.prototype.animateFrames = function () {
        this.framesElapsed++;
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.maxFrames - 1) {
                this.framesCurrent++;
            }
            else {
                this.framesCurrent = 0;
            }
        }
    };
    return Sprite;
}());
//# sourceMappingURL=sprite.js.map