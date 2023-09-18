class Cloud extends MovableObject {
    y = 16;
    width = 480;
    height = 290;



    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        this.x = Math.random() * 400;
        this.animate();
    };


    animate() {
        this.moveCloud();
    };
};