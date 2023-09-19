/**
 * Eine abstrakte Klasse, die bewegliche Objekte im Spiel darstellt.
 * Erbt von DrawableObject.
 *
 * @abstract
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {

    /**
 * Die Geschwindigkeit, mit der sich das bewegliche Objekt horizontal bewegt.
 * @type {number}
 * @default 0.15
 */
    speed = 0.15;

    /**
     * Gibt an, ob das Objekt in die entgegengesetzte Richtung bewegt wird.
     * @type {boolean}
     * @default false
     */
    otherDirection = false;

    /**
     * Die vertikale Geschwindigkeit des beweglichen Objekts.
     * @type {number}
     * @default 0
     */
    speedY = 0;

    /**
     * Die Beschleunigung des beweglichen Objekts, die auf die vertikale Geschwindigkeit wirkt.
     * @type {number}
     * @default 3
     */
    acceleration = 3;

    /**
     * Die Energie oder Lebenspunkte des beweglichen Objekts.
     * @type {number}
     * @default 100
     */
    energy = 100;

    /**
     * Gibt an, ob das Spiel läuft und das bewegliche Objekt aktiv ist.
     * @type {boolean}
     * @default true
     */
    gameRunning = true;

    /**
     * Der Zeitpunkt, zu dem das bewegliche Objekt zuletzt getroffen wurde (in Millisekunden).
     * @type {number}
     * @default 0
     */
    lastHit = 0;

    /**
     * Ein Objekt, das die Verschiebung (Offset) des beweglichen Objekts von seinen Grenzen definiert.
     * @type {Object}
     * @property {number} right - Der Versatz von der rechten Seite.
     * @property {number} left - Der Versatz von der linken Seite.
     * @property {number} top - Der Versatz von der oberen Seite.
     * @property {number} bottom - Der Versatz von der unteren Seite.
     * @default { right: 0, left: 0, top: 0, bottom: 0 }
     */
    offset = {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
    };


    /**
 * Wendet die Schwerkraft auf das bewegliche Objekt an und aktualisiert seine vertikale Position basierend auf der aktuellen Geschwindigkeit und Beschleunigung.
 */
    applyGravity() {
        setInterval(() => {
            if (this instanceof Character && this.isAboveGround() || this.speedY > 0) {
                if (this.y - this.speedY > 220) {
                    this.y = 220;
                } else {
                    this.y -= this.speedY;
                };
                this.speedY -= this.acceleration;
            } else if (this instanceof ThrowableObject) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            };
        }, 1000 / 25);
    };


    /**
     * Überprüft, ob das bewegliche Objekt sich über dem Boden befindet.
     * @returns {boolean} True, wenn sich das Objekt über dem Boden befindet, andernfalls False.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 220;
        };
    };


    /**
 * Bewegt das bewegliche Objekt nach rechts mit seiner aktuellen Geschwindigkeit.
 */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    };


    /**
     * Bewegt das bewegliche Objekt nach links mit seiner aktuellen Geschwindigkeit und setzt die Richtung (bei einem Charakter) auf links.
     */
    moveLeft() {
        this.x -= this.speed;
        if (this instanceof Character) {
            this.otherDirection = true;
        };
    };


    /**
     * Lässt das bewegliche Objekt springen, indem es seine vertikale Geschwindigkeit erhöht.
     */
    jump() {
        this.speedY = 35;
    };


    /**
 * Bewegt das bewegliche Objekt (normalerweise eine Wolke) horizontal über den Bildschirm, indem es seine X-Koordinate ändert.
 * Wenn die Wolke den linken Bildschirmrand verlässt, wird sie auf die rechte Seite des Bildschirms zurückgesetzt.
 */
    moveCloud() {
        setInterval(() => {
            if (this.x >= -480) {
                this.x -= this.speed;
            } else {
                this.x = 720;
            };
        }, 1000 / 60);
    };

    /**
     * Spielt eine Animation für das bewegliche Objekt ab, indem es das aktuelle Bild aus einem Array von Bildern auswählt und setzt.
     * @param {string[]} images - Ein Array von Bildpfaden, die die Animation darstellen.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path]
        this.currentImage++;
    };


    /**
     * Überprüft, ob das bewegliche Objekt mit einem anderen Objekt kollidiert.
     * @param {DrawableObject} obj - Das andere Objekt, mit dem die Kollision überprüft werden soll.
     * @returns {boolean} - True, wenn eine Kollision vorliegt, andernfalls false.
     */
    isColliding(obj) {
        return (
            this.x + this.width - this.offset.right) >= obj.x + obj.offset.left &&
            this.x + this.offset.left <= (obj.x + obj.width - obj.offset.right) &&
            (this.y + this.height - this.offset.bottom) >= obj.y + obj.offset.top &&
            (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom)
    };


    /**
 * Verringert die Energie des beweglichen Objekts um den angegebenen Schadenwert.
 * Wenn die Energie unter 0 fällt, wird sie auf 0 gesetzt, andernfalls wird der Zeitpunkt des letzten Treffers aktualisiert.
 * @param {number} damage - Die Menge des Schadens, der dem Objekt zugefügt wird.
 */
    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        };
    };


    /**
     * Überprüft, ob das bewegliche Objekt tot ist (d.h. seine Energie auf 0 gesunken ist).
     * @returns {boolean} - True, wenn das Objekt tot ist, andernfalls false.
     */
    isDead() {
        return this.energy == 0;
    };


    /**
     * Überprüft, ob das bewegliche Objekt verletzt ist, basierend auf dem Zeitpunkt des letzten Treffers.
     * Ein Objekt gilt als verletzt, wenn weniger als 1,5 Sekunden seit dem letzten Treffer vergangen sind.
     * @returns {boolean} - True, wenn das Objekt verletzt ist, andernfalls false.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1.5;
    };


    /**
     * Spielt den angegebenen Sound ab, indem er den aktuellen Zeitpunkt des Sounds zurücksetzt und die Wiedergabe startet.
     * @param {HTMLAudioElement} sound - Der abzuspielende Sound.
     */
    playSound(sound) {
        sound.currentTime = 0;
        sound.play();
    };


    /**
     * Stoppt das laufende Spiel, indem die `gameRunning`-Eigenschaft auf `false` gesetzt wird.
     */
    stopRunningGame() {
        this.gameRunning = false;
    };
};