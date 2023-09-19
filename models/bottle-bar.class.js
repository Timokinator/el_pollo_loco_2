/**
 * Eine Klasse, die eine Flaschenanzeige in der Benutzeroberfläche des Spiels repräsentiert.
 * Erbt von der Klasse DrawableObject und stellt ein zeichnbares Objekt dar.
 */
class BottleBar extends DrawableObject {

    /**
     * Ein Array mit Pfaden zu den Bildern für die Flaschenanzeige bei verschiedenen Prozentsätzen.
     * @type {string[]}
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];


    /**
     * Der aktuelle Prozentsatz der Flaschenanzeige.
     * @type {number}
     */
    percentage = 10;

    
    /**
     * Erstellt eine neue Flaschenanzeige.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 45;
        this.height = 158/3;
        this.width = 595/3;
        this.setPercentage(this.percentage);
    };


    /**
     * Setzt den aktuellen Prozentsatz der Flaschenanzeige und aktualisiert das angezeigte Bild.
     * @param {number} percentage - Der Prozentsatz der Flaschenanzeige (0 bis 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    };


    /**
     * Ermittelt den Index des Bilds für die Flaschenanzeige basierend auf dem Prozentsatz.
     * @returns {number} - Der Index des Bilds im IMAGES-Array.
     */
    resolveImageIndex() {
        if (this.percentage > 80) {
            return 5;
        } else if (this.percentage > 60) {
            return 4;
        } else if (this.percentage > 40) {
            return 3;
        } else if (this.percentage > 20) {
            return 2;
        } else if (this.percentage > 0) {
            return 1;
        } else {
            return 0;
        }
    };
};