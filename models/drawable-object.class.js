/**
 * Eine abstrakte Basisklasse für zeichenbare Objekte im Spiel.
 */
class DrawableObject {
    /**
     * Die x-Koordinate des zeichnbaren Objekts.
     * @type {number}
     */
    x = 120;

    /**
     * Die y-Koordinate des zeichnbaren Objekts.
     * @type {number}
     */
    y = 250;

    /**
     * Das Bild des zeichnbaren Objekts.
     * @type {Image}
     */
    img;

    /**
     * Ein Cache, der geladene Bilder speichert.
     * @type {object}
     */
    imageCache = {};

    /**
     * Der Index des aktuellen Bildes im Cache.
     * @type {number}
     */
    currentImage = 0;

    /**
     * Die Höhe des zeichnbaren Objekts.
     * @type {number}
     */
    height;

    /**
     * Die Breite des zeichnbaren Objekts.
     * @type {number}
     */
    width;

    /**
     * Lädt ein Bild aus dem angegebenen Pfad und weist es dem Objekt zu.
     * @param {string} path - Der Pfad zum Bild.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    };
    

    /**
     * Zeichnet das zeichnbare Objekt auf den angegebenen Kontext.
     * @param {CanvasRenderingContext2D} ctx - Der Zeichenkontext des Canvas-Elements.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };


    /**
     * Lädt eine Liste von Bildern in den Bildcache.
     * @param {string[]} arr - Eine Liste von Pfaden zu Bildern.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    };


    /**
     * Zeichnet einen Rahmen um das zeichnbare Objekt (nur für bestimmte Objekttypen).
     * @param {CanvasRenderingContext2D} ctx - Der Zeichenkontext des Canvas-Elements.
     */
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