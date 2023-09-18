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
    gameRunning = true;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.soundCoinCollect = soundCoinCollect;
        this.soundBottleCollect = soundBottleCollect;
        this.soundBottleHitEnemy = soundBottleHitEnemy;
        this.soundChickenDie = soundChickenDie;
        this.soundBottleCollect.playbackRate = 1.3;
        this.soundPepeHurt = soundPepeHurt;
    };


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
            this.checkEndbossAlive();
        }, 10);

        setInterval(() => {
            this.checkThrowObjects();
        }, 100);
    };


    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles > 0 && this.character.gameRunning && !this.character.dead) {
            let bottle = new ThrowableObject(this.character.x + 25, this.character.y + 25);
            this.throwableObjects.push(bottle);
            this.collectedBottles -= 1;
            this.bottleBar.setPercentage(this.bottleBar.percentage -= 10);
        };
    };


    checkColllisionsCharacterEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.dead && this.character.isAboveGround() && this.character.speedY < 0) {
                this.playSound(this.soundChickenDie);
                enemy.dead = true;
            } else if (this.character.isColliding(enemy) && !enemy.dead && !this.character.isHurt()) {
                this.character.hit(10);
                this.healthBar.setPercentage(this.character.energy);
                this.playSound(this.soundPepeHurt);
            };
        });
    };


    checkColllisionsCharacterEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss) && endboss.energy > 0 && !this.character.isHurt() && !this.character.dead) {
                this.character.hit(20);
                this.healthBar.setPercentage(this.character.energy);
                this.playSound(this.soundPepeHurt);
            };
        });
    };


    checkCollisionsCharacterBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.playSound(this.soundBottleCollect);
                this.collectedBottles += 1;
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                this.bottleBar.setPercentage(this.bottleBar.percentage += 10);
            };
        });
    };


    checkCollisionsCharacterCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.playSound(this.soundCoinCollect)
                this.collectedCoins += 1;
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                this.coinBar.setPercentage(this.coinBar.percentage += 10);
            };
        });
    };


    checkCollisionsBottlesEnemies() {
        this.throwableObjects.forEach((thrownObject) => {
            this.level.enemies.forEach((enemy) => {
                if (thrownObject.isColliding(enemy) && !thrownObject.hitted && !enemy.dead) {
                    thrownObject.hitted = true;
                    this.playSound(this.soundBottleHitEnemy);
                    this.throwableObjects[this.throwableObjects.indexOf(thrownObject)].hitted = true;
                    this.level.enemies[this.level.enemies.indexOf(enemy)].dead = true;
                };
            });
        });
    };


    checkCollisionsBottlesEndboss() {
        this.throwableObjects.forEach((thrownObject) => {
            this.level.endboss.forEach((endboss) => {
                if (thrownObject.isColliding(endboss) && !thrownObject.hitted) {
                    thrownObject.hitted = true;
                    this.playSound(this.soundBottleHitEnemy);
                    this.throwableObjects[this.throwableObjects.indexOf(thrownObject)].hitted = true;
                    this.level.endboss[this.level.endboss.indexOf(endboss)].hit(20);
                    this.healthBarEndboss.setPercentage(endboss.energy);
                };
            });
        });
    };


    checkEndbossAlive() {
        this.level.endboss.forEach((endboss) => {
            if (endboss.energy <= 0) {
                this.character.gameRunning = false;
                this.level.enemies.forEach((enemy) => {
                    enemy.dead = true;
                });
            };
        });
    };


    playSound(sound) {
        sound.currentTime = 0;
        sound.play();
    };


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
    };


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    };


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        };
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        };
    };


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width / 1, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    };


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    };
};