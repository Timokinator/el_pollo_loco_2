const level1 = new Level(
    [
        new Orc(),
        new Orc(),
        new Orc(),
        new Endboss()
    ],
    [
        new Cloud()
    ],
    [
        new BackgroundObject('img/background/sky.png', -720),
        new BackgroundObject('img/background/clouds_back_layer2.png', -720),
        new BackgroundObject('img/background/clouds_back_layer1.png', -720),
        new BackgroundObject('img/background/mountains.png', -720),
        new BackgroundObject('img/background/trees.png', -720),

        new BackgroundObject('img/background/sky.png', 0),
        new BackgroundObject('img/background/clouds_back_layer2.png', 0),
        new BackgroundObject('img/background/clouds_back_layer1.png', 0),
        new BackgroundObject('img/background/mountains.png', 0),
        new BackgroundObject('img/background/trees.png', 0),

        new BackgroundObject('img/background/sky.png', 720),
        new BackgroundObject('img/background/clouds_back_layer2.png', 720),
        new BackgroundObject('img/background/clouds_back_layer1.png', 720),
        new BackgroundObject('img/background/mountains.png', 720),
        new BackgroundObject('img/background/trees.png', 720),


        new BackgroundObject('img/background/sky.png', 1440),
        new BackgroundObject('img/background/clouds_back_layer2.png', 1440),
        new BackgroundObject('img/background/clouds_back_layer1.png', 1440),
        new BackgroundObject('img/background/mountains.png', 1440),
        new BackgroundObject('img/background/trees.png', 1440),
    ],
    [
        /* new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 0),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 1),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 2),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 3),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 4),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 5),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 6),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 7),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 8),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 9),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 10),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 11),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 12),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 13), */
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 14),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 15),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 16),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 17),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 18),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 19),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 20),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 21),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 22),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 23),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 24),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 25),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 26),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 27),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 28),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 29),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 30),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 31),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 32),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 33),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 34),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 35),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 36),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 37),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 38),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 39),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 40),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 41),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 42),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 43),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 44),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 45),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 46),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 47),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 48),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 49),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 50),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 51),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 52),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 53),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 54),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 55),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 56),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 57),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 58),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 59),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 60),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 61),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 62),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 63),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 64),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 65),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 66),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 67),
        new Ground('img/background/Ground_grass_0001_tile.png', -720 + 42 * 68)

    ]
);



/* function createGround() {
    for (let i = -720; i < 720 * 3; i += 42) {
        level1[3].push(new Ground('img/background/Ground_grass_0001_tile.png', i))
    }
}; */


