"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Fighter = /** @class */ (function (_super) {
    __extends(Fighter, _super);
    function Fighter(position, velocity, color, hitboxOffset, imageSrc, scale, maxFrames, offset, sprites) {
        if (scale === void 0) { scale = 1; }
        if (maxFrames === void 0) { maxFrames = 1; }
        if (offset === void 0) { offset = { x: 0, y: 0 }; }
        var _this = _super.call(this, position, imageSrc, scale, maxFrames, offset) || this;
        _this.width = 0;
        _this.height = 0;
        _this.gravity = 0.7;
        _this.lastKey = '';
        _this.color = '';
        _this.health = 100;
        _this.isAttacking = false;
        _this.isDead = false;
        _this.position = { x: 0, y: 0 };
        _this.velocity = { x: 0, y: 0 };
        _this.AttackHitbox = {
            position: _this.position, offset: { x: 0, y: 0 }, width: 200, height: 150
        };
        _this.Sprites = {
            idle: { image: new Image(), maxFrames: 1 },
            run: { image: new Image(), maxFrames: 1 },
            jump: { image: new Image(), maxFrames: 1 },
            fall: { image: new Image(), maxFrames: 1 },
            attack1: { image: new Image(), maxFrames: 1 },
            takeHit: { image: new Image(), maxFrames: 1 },
            death: { image: new Image(), maxFrames: 1 }
        };
        _this.position = position;
        _this.velocity = velocity;
        _this.width = 50;
        _this.height = 150;
        _this.color = color;
        _this.AttackHitbox.position = { x: _this.position.x, y: _this.position.y };
        _this.AttackHitbox.offset = hitboxOffset;
        _this.framesCurrent = 0;
        _this.framesElapsed = 0;
        _this.framesHold = 8;
        _this.Sprites;
        _this.Sprites.idle.image.src = sprites.idle.imgSrc;
        _this.Sprites.idle.maxFrames = sprites.idle.maxFrames;
        _this.Sprites.run.image.src = sprites.run.imgSrc;
        _this.Sprites.run.maxFrames = sprites.run.maxFrames;
        _this.Sprites.jump.image.src = sprites.jump.imgSrc;
        _this.Sprites.jump.maxFrames = sprites.jump.maxFrames;
        _this.Sprites.fall.image.src = sprites.fall.imgSrc;
        _this.Sprites.fall.maxFrames = sprites.fall.maxFrames;
        _this.Sprites.attack1.image.src = sprites.attack1.imgSrc;
        _this.Sprites.attack1.maxFrames = sprites.attack1.maxFrames;
        _this.Sprites.takeHit.image.src = sprites.takeHit.imgSrc;
        _this.Sprites.takeHit.maxFrames = sprites.takeHit.maxFrames;
        _this.Sprites.death.image.src = sprites.death.imgSrc;
        _this.Sprites.death.maxFrames = sprites.death.maxFrames;
        return _this;
    }
    Fighter.prototype.changeAnimation = function (animation) {
        //if player is attacking, do not change animation
        if (this.image === this.Sprites.attack1.image && this.framesCurrent < this.Sprites.attack1.maxFrames - 1)
            return;
        //if player is taking hit, do not change animation
        if (this.image === this.Sprites.takeHit.image && this.framesCurrent < this.Sprites.takeHit.maxFrames - 1)
            return;
        if (this.image === this.Sprites.death.image) {
            if (this.framesCurrent === this.Sprites.death.maxFrames - 1) {
                this.isDead = true;
            }
            return;
        }
        switch (animation) {
            case 'idle':
                if (this.image !== this.Sprites.idle.image) {
                    this.image = this.Sprites.idle.image;
                    this.maxFrames = this.Sprites.idle.maxFrames;
                    this.framesCurrent = 0;
                }
                break;
            case 'run':
                if (this.image !== this.Sprites.run.image) {
                    this.image = this.Sprites.run.image;
                    this.maxFrames = this.Sprites.run.maxFrames;
                    this.framesCurrent = 0;
                }
                break;
            case 'jump':
                if (this.image !== this.Sprites.jump.image) {
                    this.image = this.Sprites.jump.image;
                    this.maxFrames = this.Sprites.jump.maxFrames;
                    this.framesCurrent = 0;
                }
                break;
            case 'fall':
                if (this.image !== this.Sprites.fall.image) {
                    this.image = this.Sprites.fall.image;
                    this.maxFrames = this.Sprites.fall.maxFrames;
                    this.framesCurrent = 0;
                }
                break;
            case 'attack1':
                if (this.image !== this.Sprites.attack1.image) {
                    this.image = this.Sprites.attack1.image;
                    this.maxFrames = this.Sprites.attack1.maxFrames;
                    this.framesCurrent = 0;
                }
                break;
            case 'takeHit':
                if (this.image !== this.Sprites.takeHit.image) {
                    this.image = this.Sprites.takeHit.image;
                    this.maxFrames = this.Sprites.takeHit.maxFrames;
                    this.framesCurrent = 0;
                }
                break;
            case 'death':
                if (this.image !== this.Sprites.death.image) {
                    this.image = this.Sprites.death.image;
                    this.maxFrames = this.Sprites.death.maxFrames;
                    this.framesCurrent = 0;
                }
                break;
        }
    };
    Fighter.prototype.update = function () {
        this.draw();
        if (!this.isDead) {
            this.animateFrames();
        }
        //this.animateFrames();
        this.AttackHitbox.position.x = this.position.x + this.AttackHitbox.offset.x;
        this.AttackHitbox.position.y = this.position.y + this.AttackHitbox.offset.y;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 95) {
            this.velocity.y = 0;
            //this.position.y = 330;
        }
        else {
            this.velocity.y += this.gravity;
        }
    };
    Fighter.prototype.attack = function () {
        var _this = this;
        this.changeAnimation('attack1');
        this.isAttacking = true;
        setTimeout(function () {
            _this.isAttacking = false;
        }, 100);
    };
    Fighter.prototype.takeHit = function () {
        this.health -= 20;
        if (this.health <= 0) {
            this.changeAnimation('death');
        }
        else {
            this.changeAnimation('takeHit');
        }
    };
    return Fighter;
}(Sprite));
//# sourceMappingURL=fighter.js.map