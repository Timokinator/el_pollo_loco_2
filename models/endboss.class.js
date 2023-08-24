class Endboss extends MovableObject {

    scale_size = 2.5
    width = this.width * this.scale_size;
    height = this.height * this.scale_size;

    y = 85

    IMAGES_WALKING = [
        'img/endboss/boss2/Walk1.png',
        'img/endboss/boss2/Walk2.png',
        'img/endboss/boss2/Walk3.png',
        'img/endboss/boss2/Walk4.png',
        'img/endboss/boss2/Walk5.png',
        'img/endboss/boss2/Walk6.png'
    ];


    IMAGES_IDLE = [
        'img/endboss/boss2/Idle1.png',
        'img/endboss/boss2/Idle2.png',
        'img/endboss/boss2/Idle3.png',
        'img/endboss/boss2/Idle2.png'
    ];

    otherDirection = true;



    constructor() {
        super().loadImage('img/endboss/boss2/Idle1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.x = 500;
        this.animate();

    }

    animate() {
        //this.moveLeft();
        setInterval(() => {
            this.playAnimation(this.IMAGES_IDLE);
        }, 235);
        
    };

}