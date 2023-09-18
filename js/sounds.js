let walking_sound = new Audio('audio/running2.mp3');
let jumping_sound = new Audio('audio/jump3.mp3');
let soundDiePepe = new Audio('audio/pepe_die.mp3');
let soundCollect = new Audio('audio/coin.mp3');
let soundDieEndboss = new Audio('audio/endboss_die.mp3');
let soundCoinCollect = new Audio('audio/coin.mp3');
let soundBottleCollect = new Audio('audio/bottleCollect.mp3');
let soundBottleHitEnemy = new Audio('audio/bottleSplat1.mp3');
let soundChickenDie = new Audio('audio/chicken_die.mp3');
let soundGameOver = new Audio('audio/game_over.mp3');
let soundWin = new Audio('audio/Game_win.mp3');
let soundPepeHurt = new Audio('audio/pepe_hurt.mp3');

let soundOn = true;

let allSounds = [walking_sound, jumping_sound, soundDiePepe, soundCollect, soundDieEndboss, soundCoinCollect, soundBottleCollect, soundBottleHitEnemy, soundChickenDie, soundGameOver, soundWin, soundPepeHurt];


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


function toggleSound() {
    if (!soundOn) {
        volumeOn();
    } else {
        volumeOff();
    }
    toggleMuteAllSounds();
};


function volumeOn() {
    document.getElementById('img_btn_sound').src = 'icons/volume_on.svg';
    soundOn = true;
};


function volumeOff() {
    document.getElementById('img_btn_sound').src = 'icons/volume_off.svg';
    soundOn = false;
};