/**
* Überprüft, ob der Spieler eine Flasche werfen kann und fügt sie gegebenenfalls der Liste der geworfenen Objekte hinzu.
* Reduziert auch die Anzahl der gesammelten Flaschen und aktualisiert die Flaschenleiste entsprechend.
*/
function checkThrowObjects(char) {
    if (char.keyboard.D && char.collectedBottles > 0 && char.character.gameRunning && !char.character.dead) {
        /**
         * Die geworfene Flasche.
         * @type {ThrowableObject}
         */
        let bottle = new ThrowableObject(char.character.x + 25, char.character.y + 25);
        char.throwableObjects.push(bottle);
        char.collectedBottles -= 1;

        /**
         * Die Flaschenleiste zur Anzeige der verbleibenden Flaschen.
         * @type {BottleBar}
         */
        char.bottleBar.setPercentage(char.bottleBar.percentage -= 10);
    };
};


/**
* Überprüft, ob der Charakter mit Feinden kollidiert und verarbeitet die Auswirkungen der Kollision.
* - Wenn der Charakter einen Feind von oben trifft, stirbt der Feind.
* - Wenn der Charakter mit einem Feind kollidiert und nicht verletzt ist, verliert er Energie und die Energiestange wird aktualisiert.
* @function
*/
function checkColllisionsCharacterEnemies(char) {
    char.level.enemies.forEach((enemy) => {
        if (char.character.isColliding(enemy) && !enemy.dead && char.character.isAboveGround() && char.character.speedY < 0) {
            /**
             * Der Soundeffekt, der abgespielt wird, wenn der Charakter einen Feind tötet.
             * @type {Audio}
             */
            char.playSound(char.soundChickenDie);
            enemy.dead = true;
        } else if (char.character.isColliding(enemy) && !enemy.dead && !char.character.isHurt()) {
            // Wenn der Charakter mit einem Feind kollidiert und nicht verletzt ist.
            /**
             * Der Schaden, den der Charakter erleidet, wenn er mit einem Feind kollidiert.
             * @type {number}
             */
            char.character.hit(10);

            /**
             * Die Energiestange des Charakters zur Anzeige seiner verbleibenden Energie.
             * @type {HealthBar}
             */
            char.healthBar.setPercentage(char.character.energy);

            /**
             * Der Soundeffekt, der abgespielt wird, wenn der Charakter verletzt wird.
             * @type {Audio}
             */
            char.playSound(char.soundPepeHurt);
        };
    });
};


/**
* Überprüft, ob der Charakter mit dem Endboss kollidiert und verarbeitet die Auswirkungen der Kollision.
* - Wenn der Charakter mit dem Endboss kollidiert und der Endboss noch Energie hat, verliert der Charakter Energie und die Energiestange wird aktualisiert.
* @function
*/
function checkColllisionsCharacterEndboss(char) {
    char.level.endboss.forEach((endboss) => {
        if (char.character.isColliding(endboss) && endboss.energy > 0 && !char.character.isHurt() && !char.character.dead) {
            /**
             * Der Schaden, den der Charakter erleidet, wenn er mit dem Endboss kollidiert.
             * @type {number}
             */
            char.character.hit(20);

            /**
             * Die Energiestange des Charakters zur Anzeige seiner verbleibenden Energie.
             * @type {HealthBar}
             */
            char.healthBar.setPercentage(char.character.energy);

            /**
             * Der Soundeffekt, der abgespielt wird, wenn der Charakter verletzt wird.
             * @type {Audio}
             */
            char.playSound(char.soundPepeHurt);
        };
    });
};


/**
* Überprüft, ob der Charakter mit Flaschen kollidiert, und verarbeitet die Auswirkungen der Kollision.
* - Wenn der Charakter mit einer Flasche kollidiert, wird der Sound für das Aufsammeln der Flasche abgespielt.
* - Die Anzahl der gesammelten Flaschen wird erhöht.
* - Die Flasche wird aus der Liste der Flaschen auf dieser Ebene entfernt.
* - Die Anzeige des Flaschenbalkens wird aktualisiert.
* @function
*/
function checkCollisionsCharacterBottles(char) {
    char.level.bottles.forEach((bottle) => {
        if (char.character.isColliding(bottle)) {
            /**
             * Der Soundeffekt, der abgespielt wird, wenn der Charakter eine Flasche aufsammelt.
             * @type {Audio}
             */
            char.playSound(char.soundBottleCollect);

            /**
             * Die Anzahl der vom Charakter gesammelten Flaschen.
             * @type {number}
             */
            char.collectedBottles += 1;

            // Entferne die Flasche aus der Liste der Flaschen auf dieser Ebene.
            char.level.bottles.splice(char.level.bottles.indexOf(bottle), 1);

            /**
             * Der Flaschenbalken zur Anzeige der gesammelten Flaschen.
             * @type {BottleBar}
             */
            char.bottleBar.setPercentage(char.bottleBar.percentage += 10);
        };
    });
};



/**
 * Überprüft, ob der Charakter mit Münzen kollidiert, und verarbeitet die Auswirkungen der Kollision.
 * - Wenn der Charakter mit einer Münze kollidiert, wird der Sound für das Aufsammeln der Münze abgespielt.
 * - Die Anzahl der gesammelten Münzen wird erhöht.
 * - Die Münze wird aus der Liste der Münzen auf dieser Ebene entfernt.
 * - Die Anzeige des Münzenbalkens wird aktualisiert.
 * @function
 */
function checkCollisionsCharacterCoins(char) {
    char.level.coins.forEach((coin) => {
        if (char.character.isColliding(coin)) {
            /**
             * Der Soundeffekt, der abgespielt wird, wenn der Charakter eine Münze aufsammelt.
             * @type {Audio}
             */
            char.playSound(char.soundCoinCollect);

            /**
             * Die Anzahl der vom Charakter gesammelten Münzen.
             * @type {number}
             */
            char.collectedCoins += 1;

            // Entferne die Münze aus der Liste der Münzen auf dieser Ebene.
            char.level.coins.splice(char.level.coins.indexOf(coin), 1);

            /**
             * Der Münzenbalken zur Anzeige der gesammelten Münzen.
             * @type {CoinBar}
             */
            char.coinBar.setPercentage(char.coinBar.percentage += 10);
        };
    });
};


/**
* Überprüft, ob geworfene Objekte mit Feinden kollidieren, und verarbeitet die Auswirkungen der Kollision.
* - Wenn ein geworfenes Objekt mit einem Feind kollidiert und weder das Objekt noch der Feind zuvor getroffen wurden und der Feind nicht tot ist:
*   - Markiert das geworfene Objekt als getroffen.
*   - Spielt den Ton für den Treffer eines Feindes mit einer Flasche ab.
*   - Markiert das geworfene Objekt in der Liste der geworfenen Objekte als getroffen.
*   - Markiert den Feind in der Liste der Feinde als tot.
* @function
*/
function checkCollisionsBottlesEnemies(char) {
    char.throwableObjects.forEach((thrownObject) => {
        char.level.enemies.forEach((enemy) => {
            if (thrownObject.isColliding(enemy) && !thrownObject.hitted && !enemy.dead) {
                /**
                 * Gibt an, ob das geworfene Objekt bereits einen Feind getroffen hat.
                 * @type {boolean}
                 */
                thrownObject.hitted = true;

                /**
                 * Der Soundeffekt, der abgespielt wird, wenn ein Feind von einer Flasche getroffen wird.
                 * @type {Audio}
                 */
                char.playSound(char.soundBottleHitEnemy);

                // Markiere das geworfene Objekt in der Liste der geworfenen Objekte als getroffen.
                char.throwableObjects[char.throwableObjects.indexOf(thrownObject)].hitted = true;

                // Markiere den Feind in der Liste der Feinde als tot.
                char.level.enemies[char.level.enemies.indexOf(enemy)].dead = true;
            };
        });
    });
};


/**
 * Überprüft, ob geworfene Objekte mit dem Endboss kollidieren, und verarbeitet die Auswirkungen der Kollision.
 * - Wenn ein geworfenes Objekt mit dem Endboss kollidiert und das Objekt zuvor nicht getroffen wurde:
 *   - Markiert das geworfene Objekt als getroffen.
 *   - Spielt den Ton für den Treffer des Endbosses mit einer Flasche ab.
 *   - Markiert das geworfene Objekt in der Liste der geworfenen Objekte als getroffen.
 *   - Verringert die Energie des Endbosses um 20.
 *   - Aktualisiert die Anzeige der Energieleiste des Endbosses.
 * @function
 */
function checkCollisionsBottlesEndboss(char) {
    char.throwableObjects.forEach((thrownObject) => {
        char.level.endboss.forEach((endboss) => {
            if (thrownObject.isColliding(endboss) && !thrownObject.hitted) {
                /**
                 * Gibt an, ob das geworfene Objekt bereits den Endboss getroffen hat.
                 * @type {boolean}
                 */
                thrownObject.hitted = true;

                /**
                 * Der Soundeffekt, der abgespielt wird, wenn der Endboss von einer Flasche getroffen wird.
                 * @type {Audio}
                 */
                char.playSound(char.soundBottleHitEnemy);

                // Markiere das geworfene Objekt in der Liste der geworfenen Objekte als getroffen.
                char.throwableObjects[char.throwableObjects.indexOf(thrownObject)].hitted = true;

                // Verringere die Energie des Endbosses um 20.
                char.level.endboss[char.level.endboss.indexOf(endboss)].hit(20);

                /**
                 * Die Anzeige der Energieleiste des Endbosses.
                 * @type {HealthBarEndboss}
                 */
                char.healthBarEndboss.setPercentage(endboss.energy);
            };
        });
    });
};