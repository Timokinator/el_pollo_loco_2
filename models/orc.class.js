class Orc extends MovableObject {
    y = 310;
    IMAGES_WALKING = [
        'img/enemies/orc/Walk1.png',
        'img/enemies/orc/Walk2.png',
        'img/enemies/orc/Walk3.png',
        'img/enemies/orc/Walk4.png',
        'img/enemies/orc/Walk5.png',
        'img/enemies/orc/Walk6.png'
    ];
    otherDirection = true;

    constructor() {
        super().loadImage('img/enemies/orc/Walk1.png')
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 480;
        this.speed = 0.15 + Math.random() * 0.5;
 

        this.animate();
    }




    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 150);

    };





}