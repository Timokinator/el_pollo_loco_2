class Coin extends DrawableObject {

    height = 180;
    width = 180;

    offset = {
        left: 55,
        right: 55,
        top: 55,
        bottom: 55
    };
    

    
    IMAGES_SPAWN_AIR = [
        'img/8_coin/coin_2.png'
    ];
    
    
    constructor() {
        super();
        this.loadImages(this.IMAGES_SPAWN_AIR);
        this.img = this.imageCache['img/8_coin/coin_2.png'];
        this.x = 200 + Math.random() * 3200;
        this.y = 50 + Math.random() * 150;

    }



}