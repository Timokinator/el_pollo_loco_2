class Cloud extends MovableObject {
    y = 16;
    width = 480; //960
    height = 290; //540



    constructor() {
        super().loadImage('img/background/clouds_small.png')

        this.x = Math.random() * 400;
        this.animate();

    }


    animate() {
        this.moveCloud();

    }





}