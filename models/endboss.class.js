class Endboss extends MovableObject {

    scale_size = 2.5
    width = this.width * this.scale_size;
    height = this.height * this.scale_size;

    y = 85

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
 
    ];


    IMAGES_IDLE = [
    ];

    otherDirection = true;



    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
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