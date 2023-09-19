/**
 * Das Soundobjekt für das Laufgeräusch.
 * @type {HTMLAudioElement}
 */
let walking_sound = new Audio('audio/running2.mp3');

/**
 * Das Soundobjekt für das Sprunggeräusch.
 * @type {HTMLAudioElement}
 */
let jumping_sound = new Audio('audio/jump3.mp3');

/**
 * Das Soundobjekt für das Sterbegeräusch von Pepe.
 * @type {HTMLAudioElement}
 */
let soundDiePepe = new Audio('audio/pepe_die.mp3');

/**
 * Das Soundobjekt für das Sammelgeräusch.
 * @type {HTMLAudioElement}
 */
let soundCollect = new Audio('audio/coin.mp3');

/**
 * Das Soundobjekt für das Sterbegeräusch des Endbosses.
 * @type {HTMLAudioElement}
 */
let soundDieEndboss = new Audio('audio/endboss_die.mp3');

/**
 * Das Soundobjekt für das Sammelgeräusch von Münzen.
 * @type {HTMLAudioElement}
 */
let soundCoinCollect = new Audio('audio/coin.mp3');

/**
 * Das Soundobjekt für das Sammelgeräusch von Flaschen.
 * @type {HTMLAudioElement}
 */
let soundBottleCollect = new Audio('audio/bottleCollect.mp3');

/**
 * Das Soundobjekt für das Geräusch, wenn eine Flasche einen Gegner trifft.
 * @type {HTMLAudioElement}
 */
let soundBottleHitEnemy = new Audio('audio/bottleSplat1.mp3');

/**
 * Das Soundobjekt für das Sterbegeräusch eines Huhns.
 * @type {HTMLAudioElement}
 */
let soundChickenDie = new Audio('audio/chicken_die.mp3');

/**
 * Das Soundobjekt für das Spielende-Geräusch.
 * @type {HTMLAudioElement}
 */
let soundGameOver = new Audio('audio/game_over.mp3');

/**
 * Das Soundobjekt für das Sieg-Geräusch.
 * @type {HTMLAudioElement}
 */
let soundWin = new Audio('audio/Game_win.mp3');

/**
 * Das Soundobjekt für das Verletzungsgeräusch von Pepe.
 * @type {HTMLAudioElement}
 */
let soundPepeHurt = new Audio('audio/pepe_hurt.mp3');

/**
 * Ein boolescher Wert, der angibt, ob die Töne aktiviert sind (true) oder nicht (false).
 * @type {boolean}
 */
let soundOn = true;

/**
 * Ein Array, das alle Soundobjekte enthält.
 * @type {HTMLAudioElement[]}
 */
let allSounds = [walking_sound, jumping_sound, soundDiePepe, soundCollect, soundDieEndboss, soundCoinCollect, soundBottleCollect, soundBottleHitEnemy, soundChickenDie, soundGameOver, soundWin, soundPepeHurt];


/**
 * Schaltet den Ton für alle Soundobjekte ein oder aus.
 */
function toggleMuteAllSounds() {
    for (let i = 0; i < allSounds.length; i++) {
        const sound = allSounds[i];
        if (sound.muted === false) {
            sound.muted = true;
        } else {
            sound.muted = false;
        }
    }
};


/**
 * Schaltet den gesamten Spielsound ein oder aus und aktualisiert die Anzeige des Lautsprechersymbols.
 */
function toggleSound() {
    if (!soundOn) {
        volumeOn();
    } else {
        volumeOff();
    }
    toggleMuteAllSounds();
};


/**
 * Schaltet den Spielsound ein und aktualisiert die Anzeige des Lautsprechersymbols.
 */
function volumeOn() {
    document.getElementById('img_btn_sound').src = 'icons/volume_on.svg';
    soundOn = true;
};


/**
 * Schaltet den Spielsound aus und aktualisiert die Anzeige des Lautsprechersymbols.
 */
function volumeOff() {
    document.getElementById('img_btn_sound').src = 'icons/volume_off.svg';
    soundOn = false;
};