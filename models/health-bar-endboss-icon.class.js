class HealthBarEndbossIcon extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/3_icons/icon_health_endboss.png'
    ];

    otherDirection = true;


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 650;
        this.y = 5;
        this.height = 60;
        this.width = 60;
        this.img = this.imageCache['img/7_statusbars/3_icons/icon_health_endboss.png'];

    }


}