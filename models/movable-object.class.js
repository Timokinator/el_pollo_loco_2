class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    energy = 100;

    lastHit = 0;


    /* 
    if (this.isAboveGround() || this.speedY > 0 || this instanceof Character) {
                if (this.y - this.speedY > 220) {
                    this.y = 220;
                } else {
                    this.y -= this.speedY;
                };
                this.speedY -= this.acceleration
    
    */






    applyGravity() {
        setInterval(() => {
            if (this instanceof Character && this.isAboveGround() || this.speedY > 0 ) {
                if (this.y - this.speedY > 220) {
                    this.y = 220;
                } else {
                    this.y -= this.speedY;
                };
                this.speedY -= this.acceleration

            } else if (this instanceof ThrowableObject)  {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;

            }


        }, 1000 / 25);

    };

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 220;
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
        this.energy -= 2;
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