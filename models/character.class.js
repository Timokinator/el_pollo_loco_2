class Character extends MovableObject {
    y = 288;
    speed = 10;
    timeNoMove = 0;
    IMAGES_WALKING = [
        'img/character/walk/walk1.png',
        'img/character/walk/walk2.png',
        'img/character/walk/walk3.png',
        'img/character/walk/walk4.png',
        'img/character/walk/walk5.png',
        'img/character/walk/walk6.png'
    ];

    IMAGES_JUMPING = [
        /*'img/character/jump/jump1.png',
        'img/character/jump/jump2.png',*/
        'img/character/jump/jump3.png',
        /* 'img/character/jump/jump4.png',
        'img/character/jump/jump5.png',
        'img/character/jump/jump6.png',
        'img/character/jump/jump7.png' */
    ];

    IMAGES_IDLE = [
        'img/character/idle/idle1.png',
        'img/character/idle/idle2.png',
        'img/character/idle/idle3.png',
        'img/character/idle/idle4.png',
        'img/character/idle/idle5.png',
        'img/character/idle/idle6.png',
        'img/character/idle/idle7.png',
        'img/character/idle/idle8.png',
        'img/character/idle/idle9.png',
        'img/character/idle/idle10.png',
        'img/character/idle/idle11.png',
        'img/character/idle/idle12.png',
        'img/character/idle/idle13.png',
        'img/character/idle/idle14.png'
    ]


    world;
    walking_sound = new Audio('audio/running2.mp3');
    jumping_sound = new Audio('audio/jump3.mp3');

    constructor() {
        super().loadImage('img/character/walk/walk1.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_IDLE);
        this.applyGravity();
        this.animate();


    }


    animate() {

        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.timeNoMove = 0;
                this.moveRight();
                if (!this.isAboveGround()) {
                    this.walking_sound.play();
                }
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.timeNoMove = 0;
                this.moveLeft();
                if (!this.isAboveGround()) {
                    this.walking_sound.play();
                }
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.timeNoMove = 0;
                this.jump();
                this.jumping_sound.play();
            }


            /*if (!this.isAboveGround() && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
                this.timeNoMove += 1;
                if (this.timeNoMove > 100) {
                    this.playAnimation(this.IMAGES_IDLE);
                };
            } */

            this.world.camera_x = -this.x + 100 //+100 von mir zugefügt

        }, 1000 / 25);


        setInterval(() => {

            if (!this.isAboveGround() && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
                this.timeNoMove += 1;
                if (this.timeNoMove > 30) {
                    this.playAnimation(this.IMAGES_IDLE);
                };

                if (this.timeNoMove > 43) {
                    this.timeNoMove = 0;
                    this.currentImage = 0;
                }

            }

        }, 100);




        setInterval(() => {

            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);

            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }

        }, 1000 / 25);
    };





    land() {
        this.jumping_sound.pause();
        this.jumping_sound.currentTime = 0;

        setTimeout(() => {
            this.loadImage('img/character/jump/jump7.png')
        }, 10);

        setTimeout(() => {
            this.loadImage('img/character/walk/walk1.png')
        }, 100);
    }





}