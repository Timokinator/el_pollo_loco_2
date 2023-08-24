class Ground extends MovableObject {

    height = 42;
    width = 42;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = 0 + x //720 - this.width;
        this.y = 480 - this.height;


    }



}