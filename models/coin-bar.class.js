/**
 * Eine Klasse, die eine Münzleiste im Spiel repräsentiert.
 * Erbt von der Klasse DrawableObject und stellt ein zeichenbares Objekt dar.
 */
class CoinBar extends DrawableObject {

    /**
     * Ein Array mit Pfaden zu Bildern der Münzleiste in verschiedenen Füllungsstufen.
     * @type {string[]}
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    /**
     * Der prozentuale Füllstand der Münzleiste.
     * @type {number}
     */
    percentage = 10;

    /**
     * Erstellt eine neue Instanz der Münzleiste und lädt die erforderlichen Bilder.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 90;
        this.height = 158/3;
        this.width = 595/3;
        this.setPercentage(this.percentage);
    };

    /**
     * Setzt den prozentualen Füllstand der Münzleiste und aktualisiert das angezeigte Bild.
     * @param {number} percentage - Der prozentuale Füllstand (0 bis 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage; // => 0....100
        let path = this.IMAGES[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    };

    /**
     * Ermittelt den Index des Bildes in Abhängigkeit vom prozentualen Füllstand.
     * @returns {number} - Der Index des Bildes im IMAGES-Array.
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