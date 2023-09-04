class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new HealthBar();
    bottleBar = new BottleBar();
    coinBar = new CoinBar();
    healthBarEndboss = new HealthBarEndboss();
    healthBarEndbossIcon = new HealthBarEndbossIcon();
    throwableObjects = [];
    collectedBottles = 1;
    collectedCoins = 0;
    offset;
    firstContact = false;

    soundCoinCollect = new Audio('audio/coin.mp3');
    soundBottleCollect = new Audio('audio/bottleCollect.mp3');
    soundBottleHitEnemy = new Audio('audio/bottleSplat1.mp3');
    soundChickenDie = new Audio('audio/chicken_die.mp3');



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.soundBottleCollect.playbackRate = 1.3;
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    };


    run() {
        setInterval(() => {
            this.checkColllisionsCharacterEnemies();
            this.checkColllisionsCharacterEndboss();
            this.checkCollisionsCharacterBottles();
            this.checkCollisionsCharacterCoins();
            this.checkCollisionsBottlesEnemies();
            this.checkCollisionsBottlesEndboss();
            this.checkThrowObjects();


        }, 100);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 25, this.character.y + 25);
            this.throwableObjects.push(bottle);
            this.collectedBottles -= 1;
        }
    }


    /* backup checkCollisionsCharacterEnemies:

    
    checkColllisionsCharacterEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.dead && !this.character.isHurt()) {
                this.character.hit(10);
                this.healthBar.setPercentage(this.character.energy);
            }
        })
    };

*/



checkColllisionsCharacterEnemies() {
    this.level.enemies.forEach((enemy) => {
    if (this.character.isColliding(enemy) && !enemy.dead && this.character.isAboveGround() && this.character.speedY < 0) {
        this.playSound(this.soundChickenDie);
        enemy.dead = true;
     } else if (this.character.isColliding(enemy) && !enemy.dead && !this.character.isHurt()) {
            this.character.hit(10);
            this.healthBar.setPercentage(this.character.energy);
        }
    })
};




    checkColllisionsCharacterEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss) && endboss.energy > 0 && !this.character.isHurt()) {
                this.character.hit(20);
                this.healthBar.setPercentage(this.character.energy);
            }
        })
    };


    checkCollisionsCharacterBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.playSound(this.soundBottleCollect);
                this.collectedBottles += 1;
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                this.bottleBar.setPercentage(this.bottleBar.percentage += 10);

            }
        })
    }

    checkCollisionsCharacterCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.playSound(this.soundCoinCollect)
                this.collectedCoins += 1;
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                this.coinBar.setPercentage(this.coinBar.percentage += 10);
            }
        })
    }


    // in progress:

    checkCollisionsBottlesEnemies() {
        this.throwableObjects.forEach((thrownObject) => {
            this.level.enemies.forEach((enemy) => {
                if (thrownObject.isColliding(enemy) && !thrownObject.hitted && !enemy.dead) {
                    thrownObject.hitted = true;
                    this.playSound(this.soundBottleHitEnemy);
                    this.throwableObjects[this.throwableObjects.indexOf(thrownObject)].hitted = true;
                    this.level.enemies[this.level.enemies.indexOf(enemy)].dead = true;
                }
            });
        })
    }


    checkCollisionsBottlesEndboss() {
        this.throwableObjects.forEach((thrownObject) => {
            this.level.endboss.forEach((endboss) => {
                if (thrownObject.isColliding(endboss) && !thrownObject.hitted) {
                    thrownObject.hitted = true;
                    this.playSound(this.soundBottleHitEnemy);
                    this.throwableObjects[this.throwableObjects.indexOf(thrownObject)].hitted = true;
                    this.level.endboss[this.level.endboss.indexOf(endboss)].hit(20);                
                    this.healthBarEndboss.setPercentage(endboss.energy);
                }
            });
        })
    };






    playSound(sound) {
        sound.currentTime = 0;
        sound.play();
    }




    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.endboss);





        this.ctx.translate(-this.camera_x, 0);
        // -----Space for fixed objects ------

        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        if (this.character.x >= 3000 || this.firstContact) {
            this.firstContact = true;
            this.addToMap(this.healthBarEndboss);
            this.addToMap(this.healthBarEndbossIcon);
        };

        this.ctx.translate(this.camera_x, 0);


        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });

    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width / 1, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    };


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }








}