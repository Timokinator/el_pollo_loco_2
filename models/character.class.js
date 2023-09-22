/**
 * Eine Klasse, die den Hauptcharakter des Spiels repräsentiert.
 * Erbt von der Klasse MovableObject und stellt ein bewegliches Objekt dar.
 */
class Character extends MovableObject {

    /**
     * Die vertikale Position des Hauptcharakters auf dem Bildschirm.
     * @type {number}
     */
    y = 220;

    /**
     * Die Höhe des Hauptcharakters.
     * @type {number}
     */
    height = 240;

    /**
     * Die Breite des Hauptcharakters.
     * @type {number}
     */
    width = 120;

    /**
     * Die Geschwindigkeit des Hauptcharakters.
     * @type {number}
     */
    speed = 25;

    /**
     * Eine Zählvariable, um die Zeit ohne Bewegung zu verfolgen.
     * @type {number}
     */
    timeNoMove = 0;

    /**
     * Ein Array mit Pfaden zu Bildern des Hauptcharakters während des Gehens.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    /**
     * Ein Array mit Pfaden zu Bildern des Hauptcharakters während des Springens.
     * @type {string[]}
     */
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    /**
     * Ein Array mit Pfaden zu Bildern des Hauptcharakters im Ruhezustand.
     * @type {string[]}
     */
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    /**
     * Ein Array mit Pfaden zu Bildern des Hauptcharakters im toten Zustand.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * Ein Array mit Pfaden zu Bildern des Hauptcharakters im verletzten Zustand.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    /**
     * Ein Objekt, das den Versatz (Abstand) des Hauptcharakters von den Kanten des Bildes definiert.
     * @type {object}
     */
    offset = {
        left: 10,
        right: 10,
        top: 90,
        bottom: 10
    };

    /**
     * Eine Referenz auf das Spielweltobjekt.
     * @type {World}
     */
    world;

    /**
     * Ein Flag, das angibt, ob der Todessound bereits abgespielt wurde.
     * @type {boolean}
     */
    soundDiePlayed = false;

    /**
     * Ein Flag, das angibt, ob der Hauptcharakter tot ist.
     * @type {boolean}
     */
    dead = false;

    /**
     * Ein Flag, das angibt, ob das Spiel läuft.
     * @type {boolean}
     */
    gameRunning = true;

    /**
     * Erstellt eine neue Instanz des Hauptcharakters und lädt die erforderlichen Bilder.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
        this.walking_sound = walking_sound;
        this.jumping_sound = jumping_sound;
        this.soundDiePepe = soundDiePepe;
    };


    /**
     * Startet die Animation des Hauptcharakters, einschließlich seiner Bewegung und Zustandsänderungen.
     */
    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.dead && this.gameRunning) {
                this.animateWalkRight();
            };

            if (this.world.keyboard.LEFT && this.x > 0 && !this.dead && this.gameRunning) {
                this.animateWalkLeft();
            };

            if (this.world.keyboard.SPACE && !this.isAboveGround() && !this.dead && this.gameRunning) {
                this.animateJump();
            };
            this.world.camera_x = -this.x + 100 //+100 von mir zugefügt
        }, 1000 / 25);

        this.animationDeadHurtIdleJump();
    };


    animateWalkRight() {
        this.timeNoMove = 0;
        this.moveRight();
        if (!this.isAboveGround()) {
            this.walking_sound.play();
        };
    };


    animateWalkLeft() {
        this.timeNoMove = 0;
        this.moveLeft();
        if (!this.isAboveGround()) {
            this.walking_sound.play();
        };
    };


    animateJump() {
        this.jumping_sound.pause();
        this.jumping_sound.currentTime = 0;
        this.timeNoMove = 0;
        this.jump();
        this.jumping_sound.play();
    };


    animationDeadHurtIdleJump() {
        setInterval(() => {
            if (this.isDead()) {
                this.animateDead();
            } else if (this.isHurt() && this.gameRunning) {
                this.playAnimation(this.IMAGES_HURT)
            } else if (!this.isAboveGround() && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && this.gameRunning) {
                this.timeNoMove += 1;
                if (this.timeNoMove > 1) {
                    this.playAnimation(this.IMAGES_IDLE);
                };
            } else if (this.isAboveGround() && this.gameRunning) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.gameRunning && this.world.keyboard.RIGHT || this.gameRunning && this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            };
        }, 1000 / 25);
    };


    animateDead() {
        this.playAnimation(this.IMAGES_DEAD);
        this.y += 10;
        if (!this.soundDiePlayed) {
            this.playSound(this.soundDiePepe);
            this.soundDiePlayed = true;
            gameOver(); //game over screen
            this.dead = true;
        };
    };




};