/**
 * Eine Klasse, die die Gesundheitsleiste des Spielers darstellt.
 */
class HealthBar extends DrawableObject {

    /**
     * Eine Liste der Bildpfade für die Gesundheitsleiste.
     * @type {string[]}
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    /**
     * Der Prozentsatz der Gesundheit.
     * @type {number}
     */
    percentage = 100;

    /**
     * Der Konstruktor der `HealthBar`-Klasse.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 0;
        this.height = 158 / 3;
        this.width = 595 / 3;
        this.setPercentage(this.percentage);
    };

    /**
     * Setzt den Prozentsatz der Gesundheit und aktualisiert das Bild entsprechend.
     * @param {number} percentage - Der Prozentsatz der Gesundheit (0 bis 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    };

    /**
     * Ermittelt den Index des Bildes basierend auf dem Prozentsatz der Gesundheit.
     * @returns {number} - Der Index des Bildes.
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
        };
    };
};