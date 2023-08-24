class Cloud extends MovableObject {
    y = 16;
    width = 480; //960
    height = 290; //540



    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png')

        this.x = Math.random() * 400;
        this.animate();

    }


    animate() {
        this.moveCloud();

    }





}