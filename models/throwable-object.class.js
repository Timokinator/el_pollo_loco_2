/**
 * Eine Klasse, die ein werfbares Objekt darstellt, das von beweglichen Objekten wie dem Charakter geworfen werden kann.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    /**
     * Ein Array von Bildpfaden, die für die Rotation des Objekts verwendet werden.
     * @type {string[]}
     */
    IMAGES_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * Ein Array von Bildpfaden, die für den Splash-Effekt des Objekts verwendet werden.
     * @type {string[]}
     */
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * Gibt an, ob das werfbare Objekt bereits getroffen wurde.
     * @type {boolean}
     */
    hitted = false;

    /**
     * Erstellt ein neues werfbares Objekt mit den angegebenen Koordinaten.
     * @param {number} x - Die x-Koordinate, an der das Objekt erstellt wird.
     * @param {number} y - Die y-Koordinate, an der das Objekt erstellt wird.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATE);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 400 / 4;
        this.width = 400 / 4;
        this.throw(x, y);
    };
    

    /**
     * Wirft das Objekt von den angegebenen Koordinaten aus und startet die Animation der Rotation.
     * @param {number} x - Die x-Koordinate, von der aus das Objekt geworfen wird.
     * @param {number} y - Die y-Koordinate, von der aus das Objekt geworfen wird.
     */
    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 25;
            if (!this.hitted) {
                this.playAnimation(this.IMAGES_ROTATE);
            } else {
                this.playAnimation(this.IMAGES_SPLASH);
            };
        }, 50);
    };
};