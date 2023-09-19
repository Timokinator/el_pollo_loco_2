/**
 * Eine Klasse, die eine bewegliche Wolke im Spiel repräsentiert.
 * Erbt von der Klasse MovableObject und stellt ein bewegliches Objekt dar.
 */
class Cloud extends MovableObject {

    /**
     * Die vertikale Position der Wolke auf dem Bildschirm.
     * @type {number}
     */
    y = 16;

    /**
     * Die Breite der Wolke.
     * @type {number}
     */
    width = 480;

    /**
     * Die Höhe der Wolke.
     * @type {number}
     */
    height = 290;

    /**
     * Erstellt eine neue Instanz der Wolke und lädt das erforderliche Bild.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        this.x = Math.random() * 400;
        this.animate();
    };

    /**
     * Startet die Animation der Wolke, die sich fortlaufend bewegt.
     */
    animate() {
        this.moveCloud();
    };
};