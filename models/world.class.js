/**
 * Eine Klasse, die die Spielwelt darstellt und alle Spielobjekte enthält.
 */
class World {
    /**
 * Der Spielcharakter.
 * @type {Character}
 */
    character = new Character();

    /**
     * Das aktuelle Level.
     * @type {Level}
     */
    level = level1;

    /**
     * Die Canvas-Element für die Spielgrafiken.
     * @type {HTMLCanvasElement}
     */
    canvas;

    /**
     * Der 2D-Canvas-Kontext für das Zeichnen auf der Canvas.
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /**
     * Die Tastatursteuerung für den Charakter.
     * @type {Keyboard}
     */
    keyboard;

    /**
     * Die x-Koordinate der Kamera, um die Ansicht in der Welt zu verschieben.
     * @type {number}
     */
    camera_x = 0;

    /**
     * Die Statusleiste für die Gesundheit des Spielcharakters.
     * @type {HealthBar}
     */
    healthBar = new HealthBar();

    /**
     * Die Statusleiste für die Anzahl der gesammelten Flaschen.
     * @type {BottleBar}
     */
    bottleBar = new BottleBar();

    /**
     * Die Statusleiste für die Anzahl der gesammelten Münzen.
     * @type {CoinBar}
     */
    coinBar = new CoinBar();

    /**
     * Die Statusleiste für die Gesundheit des Endgegners.
     * @type {HealthBarEndboss}
     */
    healthBarEndboss = new HealthBarEndboss();

    /**
     * Das Icon für die Gesundheit des Endgegners.
     * @type {HealthBarEndbossIcon}
     */
    healthBarEndbossIcon = new HealthBarEndbossIcon();

    /**
     * Eine Sammlung von werfbaren Objekten im Spiel.
     * @type {Array<ThrowableObject>}
     */
    throwableObjects = [];

    /**
     * Die Anzahl der gesammelten Flaschen.
     * @type {number}
     */
    collectedBottles = 1;

    /**
     * Die Anzahl der gesammelten Münzen.
     * @type {number}
     */
    collectedCoins = 0;

    /**
     * Der Offset für Zeichenoperationen.
     * @type {Object}
     */
    offset;

    /**
     * Gibt an, ob der Spielcharakter erstmals mit einem anderen Objekt in Kontakt kommt.
     * @type {boolean}
     */
    firstContact = false;

    /**
     * Gibt an, ob das Spiel läuft.
     * @type {boolean}
     */
    gameRunning = true;



    /**
 * Erstellt eine neue Instanz der Spielwelt.
 * @param {HTMLCanvasElement} canvas - Das Canvas-Element für das Spiel.
 * @param {Keyboard} keyboard - Die Tastatursteuerung für den Charakter.
 */
    constructor(canvas, keyboard) {
        /**
         * Der 2D-Canvas-Kontext für das Zeichnen auf der Canvas.
         * @type {CanvasRenderingContext2D}
         */
        this.ctx = canvas.getContext('2d');

        /**
         * Das Canvas-Element für das Spiel.
         * @type {HTMLCanvasElement}
         */
        this.canvas = canvas;

        /**
         * Die Tastatursteuerung für den Charakter.
         * @type {Keyboard}
         */
        this.keyboard = keyboard;

        // Führt die Initialisierungsfunktionen aus
        this.draw();
        this.setWorld();

        // Startet das Spiel
        this.run();

        /**
         * Der Soundeffekt für das Sammeln von Münzen.
         * @type {HTMLAudioElement}
         */
        this.soundCoinCollect = soundCoinCollect;

        /**
         * Der Soundeffekt für das Sammeln von Flaschen.
         * @type {HTMLAudioElement}
         */
        this.soundBottleCollect = soundBottleCollect;

        /**
         * Der Soundeffekt für den Treffer eines Gegners mit einer Flasche.
         * @type {HTMLAudioElement}
         */
        this.soundBottleHitEnemy = soundBottleHitEnemy;

        /**
         * Der Soundeffekt für das Sterben eines Huhns.
         * @type {HTMLAudioElement}
         */
        this.soundChickenDie = soundChickenDie;

        /**
         * Der Wiedergabegeschwindigkeitsfaktor für den Soundeffekt des Flaschensammelns.
         * @type {number}
         */
        this.soundBottleCollect.playbackRate = 1.3;

        /**
         * Der Soundeffekt für das Verletzen des Spielcharakters (Pepe).
         * @type {HTMLAudioElement}
         */
        this.soundPepeHurt = soundPepeHurt;
    };


    /**
 * Setzt die Weltreferenz für den Spielcharakter.
 */
    setWorld() {
        this.character.world = this;
    };

    /**
     * Startet das Spiel und initialisiert die Kollisionserkennungsschleifen.
     */
    run() {
        /**
         * Die Zeitschleife für die allgemeine Kollisionserkennung.
         * @type {number}
         */
        const generalCollisionLoop = setInterval(() => {
            checkColllisionsCharacterEnemies(this);
            checkColllisionsCharacterEndboss(this);
            checkCollisionsCharacterBottles(this);
            checkCollisionsCharacterCoins(this);
            checkCollisionsBottlesEnemies(this);
            checkCollisionsBottlesEndboss(this);
            this.checkEndbossAlive();
        }, 10);

        /**
         * Die Zeitschleife für die Überprüfung von geworfenen Objekten.
         * @type {number}
         */
        const thrownObjectLoop = setInterval(() => {
            checkThrowObjects(this);
        }, 100);
    };


    /**
 * Überprüft, ob der Endboss noch lebendig ist, und beendet das Spiel, wenn seine Energie auf oder unter null fällt.
 * - Für jeden Endboss in der Liste der Endbosse:
 *   - Wenn die Energie des Endbosses kleiner oder gleich null ist:
 *     - Beendet das Spiel, indem `character.gameRunning` auf `false` gesetzt wird.
 *     - Markiert alle Feinde in der Liste der Feinde als tot.
 * @function
 */
    checkEndbossAlive() {
        this.level.endboss.forEach((endboss) => {
            if (endboss.energy <= 0) {
                /**
                 * Gibt an, ob das Spiel läuft oder beendet wurde.
                 * @type {boolean}
                 */
                this.character.gameRunning = false;

                // Markiere alle Feinde in der Liste der Feinde als tot.
                this.level.enemies.forEach((enemy) => {
                    enemy.dead = true;
                });
            };
        });
    };

    /**
     * Spielt einen Soundeffekt ab.
     * - Setzt die Wiedergabezeit des Sounds auf Null.
     * - Startet die Wiedergabe des Sounds.
     * @function
     * @param {Audio} sound - Der Soundeffekt, der abgespielt werden soll.
     */
    playSound(sound) {
        sound.currentTime = 0;
        sound.play();
    };


    /**
 * Zeichnet das gesamte Spiel auf den Canvas.
 * - Löscht zuerst den gesamten Canvas-Inhalt.
 * - Setzt die Kamera auf die aktuelle X-Position.
 * - Fügt verschiedene Spielobjekte zur Zeichenfläche hinzu, darunter Hintergrundobjekte, Charaktere, Feinde, Gegenstände und Statusleisten.
 * - Überprüft, ob der Charakter bestimmte Positionen erreicht hat, um zusätzliche Statusleisten anzuzeigen.
 * - Ruft sich selbst wiederholt mit `requestAnimationFrame` auf, um die Animation fortzusetzen.
 * @function
 */
    draw() {
        // Löscht den gesamten Canvas-Inhalt.
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Setzt die Kamera auf die aktuelle X-Position.
        this.ctx.translate(this.camera_x, 0);

        // Fügt verschiedene Spielobjekte zur Zeichenfläche hinzu.
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.endboss);

        // Setzt die Kamera zurück.
        this.ctx.translate(-this.camera_x, 0);

        // Fügt feste Objekte wie Statusleisten hinzu.
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);

        // Überprüft, ob der Charakter bestimmte Positionen erreicht hat, um zusätzliche Statusleisten anzuzeigen.
        if (this.character.x >= 3000 || this.firstContact) {
            this.firstContact = true;
            this.addToMap(this.healthBarEndboss);
            this.addToMap(this.healthBarEndbossIcon);
        }

        // Setzt die Kamera zurück, um den gesamten Canvas neu zu zeichnen.
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;

        // Ruft sich selbst wiederholt mit requestAnimationFrame auf, um die Animation fortzusetzen.
        requestAnimationFrame(function () {
            self.draw();
        });
    };


    /**
 * Fügt eine Liste von beweglichen Objekten zur Zeichenfläche hinzu.
 * @param {MovableObject[]} objects - Eine Liste von beweglichen Objekten.
 */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    };

    /**
     * Fügt ein bewegliches Objekt zur Zeichenfläche hinzu und berücksichtigt die Richtung des Objekts.
     * Wenn das Objekt in die andere Richtung schaut, wird es vorübergehend gespiegelt, bevor es gezeichnet wird.
     * @param {MovableObject} mo - Das bewegliche Objekt, das zur Zeichenfläche hinzugefügt werden soll.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    };


    /**
 * Spiegelt das Bild des beweglichen Objekts horizontal, um die andere Richtung darzustellen.
 * @param {MovableObject} mo - Das bewegliche Objekt, dessen Bild gespiegelt werden soll.
 */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width / 1, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    };

    /**
     * Stellt das ursprüngliche Bild des beweglichen Objekts nach dem Spiegeln wieder her.
     * @param {MovableObject} mo - Das bewegliche Objekt, dessen Bild wiederhergestellt werden soll.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    };
};