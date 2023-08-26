class MovableObject {
    x = 120;
    y = 250;
    img;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    energy = 100;

    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {

                if (this.y - this.speedY > 220) {
                    this.y = 220;
                    //this.land();
                } else {
                    this.y -= this.speedY;
                };
                this.speedY -= this.acceleration
            }

        }, 1000 / 25);

    }

    isAboveGround() {
        return this.y < 220;
    }


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {

        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }


    moveLeft() {
        this.x -= this.speed;
        if (this instanceof Character) {
            this.otherDirection = true;
        }

    };


    jump() {
        this.speedY = 35;
    }


    moveCloud() {
        setInterval(() => {
            if (this.x >= -480) {
                this.x -= this.speed;
            } else {
                this.x = 720;
            }

        }, 1000 / 60);
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path]
        this.currentImage++;
    }




    isColliding(obj) {
        return (
            this.x + this.width) >= obj.x &&
            this.x <= (obj.x + obj.width) &&
            (this.y + /*this.offsetY */ + this.height) >= obj.y &&
            (this.y/* + this.offsetY*/) <= (obj.y + obj.height) /*&&
                obj.onCollisionCourse; */
    }


    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1.5;
    }




}