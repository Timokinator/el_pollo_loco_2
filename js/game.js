let canvas;
let world;
let keyboard = new Keyboard();
let fullscreen = false;
let soundOn = true;




function start() {
    canvas = document.getElementById('canvas');
    document.getElementById('start_screen').classList.add('d-none');
    document.getElementById('btn_start').style.display = 'none';

    world = new World(canvas, keyboard);

}



function toggleFullscreen() {
    if (!fullscreen) {
        startFullscreen();
    } else {
        endFullscreen();
    };
}


function endFullscreen() {
    document.getElementById('canvas_container').style.width = 'unset';
    document.getElementById('start_screen').style.width = 'unset';
    document.getElementById('img_start_screen').style.width = '720px';
    document.getElementById('img_start_screen').style.height = '480px';
    document.getElementById('canvas').style.width = 'unset';
    document.getElementById('btn-fullscreen').src = 'icons/open_fullscreen.svg';
    fullscreen = false;

}


function startFullscreen() {
    document.getElementById('canvas_container').style.width = '100vw';
    document.getElementById('start_screen').style.width = '100vw';
    document.getElementById('img_start_screen').style.width = '100vw';
    document.getElementById('img_start_screen').style.height = 'calc(100vw/720 * 480)';
    document.getElementById('canvas').style.width = '100vw';
    document.getElementById('btn-fullscreen').src = 'icons/close_fullscreen.svg';
    fullscreen = true;
}


function toggleSound() {
    if (!soundOn) {
        volumeOn();
    } else {
        volumeOff();
    }
}


function volumeOn() {
    document.getElementById('img_btn_sound').src = 'icons/volume_on.svg';
    soundOn = true;
}


function volumeOff() {
    

    document.getElementById('img_btn_sound').src = 'icons/volume_off.svg';
    soundOn = false;
}



window.addEventListener('keydown', (e) => { // Junus hat "keypress" - falls später Probleme auftauchen
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }


});


window.addEventListener('keyup', (e) => { // Junus hat "keypress" - falls später Probleme auftauchen
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }


});



