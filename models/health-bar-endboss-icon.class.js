/**
 * Eine Klasse, die das Icon für die Gesundheitsleiste des Endgegners darstellt.
 */
class HealthBarEndbossIcon extends DrawableObject {

    /**
     * Eine Liste der Bildpfade für das Icon.
     * @type {string[]}
     */
    IMAGES = [
        'img/7_statusbars/3_icons/icon_health_endboss.png'
    ];

    /**
     * Ein Flag, das angibt, ob das Icon in die andere Richtung zeigt.
     * @type {boolean}
     */
    otherDirection = true;

    /**
     * Der Konstruktor der `HealthBarEndbossIcon`-Klasse.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 650;
        this.y = 5;
        this.height = 60;
        this.width = 60;
        this.img = this.imageCache['img/7_statusbars/3_icons/icon_health_endboss.png'];
    };
};