/**
 * Eine Klasse, die eine Flasche im Spiel repräsentiert.
 * Erbt von der Klasse DrawableObject und stellt ein zeichnbares Objekt dar.
 */
class Bottle extends DrawableObject {

    /**
     * Die Höhe der Flasche.
     * @type {number}
     */
    height = 90;

    /**
     * Die Breite der Flasche.
     * @type {number}
     */
    width = 90;

    /**
     * Die vertikale Position der Flasche auf dem Bildschirm.
     * @type {number}
     */
    y = 350;

    /**
     * Ein Objekt, das den Versatz (Abstand) der Flasche von den Kanten des Bildes definiert.
     * @type {object}
     */
    offset = {
        left: 25,
        right: 10,
        top: 10,
        bottom: 5
     };

     
    /**
     * Ein Array mit Pfaden zu Bildern der Flasche im schwebenden Zustand (in der Luft).
     * @type {string[]}
     */
    IMAGES_SPAWN_AIR = [
        'img/6_salsa_bottle/salsa_bottle.png'
    ];


    /**
     * Ein Array mit Pfaden zu Bildern der Flasche im Zustand auf dem Boden.
     * @type {string[]}
     */
    IMAGES_SPAWN_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];


    /**
     * Erstellt eine neue Flasche und lädt die erforderlichen Bilder.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_SPAWN_AIR);
        this.loadImages(this.IMAGES_SPAWN_GROUND);
        this.img = this.imageCache['img/6_salsa_bottle/1_salsa_bottle_on_ground.png'];
        this.x = 200 + Math.random() * 3200;
    };
};