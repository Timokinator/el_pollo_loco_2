/**
 * Eine Klasse, die ein bewegliches Huhn im Spiel repräsentiert.
 * Erbt von der Klasse MovableObject und stellt ein bewegliches Objekt dar.
 */
class Chicken extends MovableObject {

    /**
     * Die vertikale Position des Huhns auf dem Bildschirm.
     * @type {number}
     */
    y = 380;

    /**
     * Die Höhe des Huhns.
     * @type {number}
     */
    height = 80;

    /**
     * Die Breite des Huhns.
     * @type {number}
     */
    width = 80;

    /**
     * Ein Array mit Pfaden zu Bildern des Huhns während des Gehens.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
     * Ein Array mit Pfaden zu Bildern des toten Huhns.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Ein Flag, das angibt, ob das Huhn tot ist.
     * @type {boolean}
     */
    dead = false;

    /**
     * Erstellt eine neue Instanz des Huhns und lädt die erforderlichen Bilder.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 400 + Math.random() * 3000;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    };


    /**
     * Startet die Animation des Huhns, einschließlich seiner Bewegung und Zustandsänderungen.
     */
    animate() {
        setInterval(() => {
            if (!this.dead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.dead) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 150);
    };
};