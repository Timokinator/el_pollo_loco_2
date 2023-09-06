class Character extends MovableObject {
    y = 220;
    height = 240;
    width = 120;

    speed = 50;
    timeNoMove = 0;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ]

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ]

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]

    offset = {
        left: 10,
        right: 10,
        top: 90,
        bottom: 10
    };


    world;
    walking_sound = new Audio('audio/running2.mp3');
    jumping_sound = new Audio('audio/jump3.mp3');
    soundDie = new Audio('audio/pepe_die.mp3');
    soundDiePlayed = false;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
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
                this.jumping_sound.pause();
                this.jumping_sound.currentTime = 0;
                this.timeNoMove = 0;
                this.jump();
                this.jumping_sound.play();
            }

            this.world.camera_x = -this.x + 100 //+100 von mir zugefügt

        }, 1000 / 25);


        setInterval(() => {

            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.y +=10;
                if (!this.soundDiePlayed) {
                    this.playSound(this.soundDie);
                    this.soundDiePlayed = true;
                }

            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT)
            } else if (!this.isAboveGround() && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
                this.timeNoMove += 1;
                if (this.timeNoMove > 1) {
                    this.playAnimation(this.IMAGES_IDLE);
                };

            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }

        }, 1000/25);

    };








}