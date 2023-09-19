/**
 * Eine Klasse, die eine Münze im Spiel repräsentiert.
 * Erbt von der Klasse DrawableObject und stellt ein zeichenbares Objekt dar.
 */
class Coin extends DrawableObject {

    /**
     * Die Höhe der Münze.
     * @type {number}
     */
    height = 180;

    /**
     * Die Breite der Münze.
     * @type {number}
     */
    width = 180;

    /**
     * Ein Offset-Wert, der den Abstand der Kollisionserkennungsbereiche um die Münze definiert.
     * @type {object}
     */
    offset = {
        left: 55,
        right: 55,
        top: 55,
        bottom: 55
    };

    /**
     * Ein Array mit Pfaden zu Bildern der Münze im Flug.
     * @type {string[]}
     */
    IMAGES_SPAWN_AIR = [
        'img/8_coin/coin_2.png'
    ];

    /**
     * Erstellt eine neue Instanz der Münze und lädt das erforderliche Bild.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_SPAWN_AIR);
        this.img = this.imageCache['img/8_coin/coin_2.png'];
        this.x = 200 + Math.random() * 3200;
        this.y = 50 + Math.random() * 150;
    };
};