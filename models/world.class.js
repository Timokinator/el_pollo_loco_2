class World {
    character = new Character();
    level = level1;
    //enemies = level1.enemies;
    //clouds = level1.clouds;
    //backgroundObjects = level1.backgroundObjects;
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



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    };


    run() {
        setInterval(() => {
            this.checkColllisions();
            this.checkCollisionsCharacterBottles();
            this.checkCollisionsCharacterCoins();
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




    checkColllisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
            }
        })
    }

    checkCollisionsCharacterBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.collectedBottles += 1;
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                this.bottleBar.setPercentage(this.bottleBar.percentage += 10);

            }
        })
    }

    checkCollisionsCharacterCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.collectedCoins += 1;
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                this.coinBar.setPercentage(this.coinBar.percentage += 10);
            }
        })
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