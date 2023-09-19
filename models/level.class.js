/**
 * Die `Level`-Klasse repräsentiert ein Level im Spiel.
 *
 * @class
 */
class Level {
    /**
     * Eine Array von Gegnern im Level.
     * @type {Enemy[]}
     */
    enemies;

    /**
     * Eine Array von Wolken im Hintergrund des Levels.
     * @type {Cloud[]}
     */
    clouds;

    /**
     * Eine Array von Hintergrundobjekten im Level.
     * @type {BackgroundObject[]}
     */
    backgroundObjects;

    /**
     * Eine Array von Flaschen (Bottles) im Level.
     * @type {Bottle[]}
     */
    bottles;

    /**
     * Eine Array von Münzen (Coins) im Level.
     * @type {Coin[]}
     */
    coins;

    /**
     * Der Endboss des Levels.
     * @type {Endboss}
     */
    endboss;

    /**
     * Die x-Position, an der das Level endet.
     * @type {number}
     */
    level_end_x = 720 * 5;

    /**
     * Erstellt ein neues Level.
     *
     * @param {Enemy[]} enemies - Eine Array von Gegnern im Level.
     * @param {Cloud[]} clouds - Eine Array von Wolken im Hintergrund des Levels.
     * @param {BackgroundObject[]} backgroundObjects - Eine Array von Hintergrundobjekten im Level.
     * @param {Bottle[]} bottles - Eine Array von Flaschen (Bottles) im Level.
     * @param {Coin[]} coins - Eine Array von Münzen (Coins) im Level.
     * @param {Endboss} endboss - Der Endboss des Levels.
     */
    constructor(enemies, clouds, backgroundObjects, bottles, coins, endboss) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
        this.endboss = endboss;
    };
};