class Bottle extends DrawableObject {

    height = 90;
    width = 90;
    y = 350;

    offset = {
        left: 25,
        right: 10,
        top: 10,
        bottom: 5
     };
     
    IMAGES_SPAWN_AIR = [
        'img/6_salsa_bottle/salsa_bottle.png'
    ];

    IMAGES_SPAWN_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES_SPAWN_AIR);
        this.loadImages(this.IMAGES_SPAWN_GROUND);
        this.img = this.imageCache['img/6_salsa_bottle/1_salsa_bottle_on_ground.png'];
        this.x = 200 + Math.random() * 3200;
    };
};