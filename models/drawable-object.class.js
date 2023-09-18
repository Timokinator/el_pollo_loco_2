class DrawableObject {
    x = 120;
    y = 250;
    img;
    imageCache = {};
    currentImage = 0;
    height;
    width;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    };


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    };


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Bottle || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
            ctx.stroke();
        };
    };
};