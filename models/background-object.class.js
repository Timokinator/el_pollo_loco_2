/**
 * Eine Klasse, die ein Hintergrundobjekt im Spiel repräsentiert.
 * Erbt von der Klasse MovableObject und stellt ein bewegliches Objekt dar.
 */
class BackgroundObject extends MovableObject {

    /**
     * Die Breite des Hintergrundobjekts.
     * @type {number}
     */
    width = 720;

    /**
     * Die Höhe des Hintergrundobjekts.
     * @type {number}
     */
    height = 480;

    /**
     * Erstellt ein neues Hintergrundobjekt mit einem Bild und einer horizontalen Position.
     * @param {string} imagePath - Der Pfad zum Bild des Hintergrundobjekts.
     * @param {number} x - Die horizontale Position des Hintergrundobjekts.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
};