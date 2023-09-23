/**
 * Eine Klasse, die den Endgegner des Spiels darstellt.
 */
class Endboss extends MovableObject {

    /**
     * Die Breite des Endgegners.
     * @type {number}
     */
    width = 400;

    /**
     * Die Höhe des Endgegners.
     * @type {number}
     */
    height = 400;

    /**
     * Die y-Koordinate des Endgegners.
     * @type {number}
     */
    y = 85;

    /**
     * Eine Liste der Bildpfade für die Laufanimation des Endgegners.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /**
     * Eine Liste der Bildpfade für die Ruhezustandsanimation des Endgegners.
     * @type {string[]}
     */
    IMAGES_IDLE = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    /**
     * Eine Liste der Bildpfade für die Todesanimation des Endgegners.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Eine Liste der Bildpfade für die Verletzungsanimation des Endgegners.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /**
     * Die Offset-Werte für den Rahmen um den Endgegner.
     * @type {object}
     */
    offset = {
        left: 10,
        right: 10,
        top: 55,
        bottom: 15
    };

    /**
     * Ein Flag, das angibt, ob der Sterbesound des Endgegners bereits abgespielt wurde.
     * @type {boolean}
     */
    soundDiePlayed = false;

    /**
     * Eine Referenz auf die Spielwelt.
     * @type {World}
     */
    world;


    /**
     * Der Konstruktor der `Endboss`-Klasse.
     */
    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.x = 3500;
        this.animate();
        this.energy = 100;
        this.soundDieEndboss = soundDieEndboss;
        this.firstContact = false;
        this.gotHit = false;
        this.amountGotHit = 0;

    };

    /**
     * Startet die Animation des Endgegners.
     */
    animate() {
        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.energy > 0 && !this.gotHit) {
                this.playAnimation(this.IMAGES_IDLE);
            } else if (this.energy == 0) {
                this.playAnimation(this.IMAGES_DEAD);
                this.y += 45;
                if (!this.soundDiePlayed) {
                    this.playSoundDie();
                };
            } else if (this.firstContact) {
                this.playAnimation(this.IMAGES_WALKING)
                this.x -= (20 + 15*this.amountGotHit);
            };
        }, 150);
    };


    playSoundDie() {
        this.playSound(this.soundDieEndboss);
        winnerChickenDinner();
        this.stopRunningGame();
        this.soundDiePlayed = true;
    };

};