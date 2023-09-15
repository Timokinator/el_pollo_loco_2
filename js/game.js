let canvas;
let world;
let keyboard = new Keyboard();
let fullscreen = false;



function start() {
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
    setTimeout(() => {
        document.getElementById('start_screen').classList.add('d-none');
        document.getElementById('btn_start').style.display = 'none';
        document.getElementById('container_controls').classList.add('d-none');
        document.getElementById('container_info').classList.add('d-none');
        startTouchListener();
    }, 35);

}



function toggleFullscreen() {
    if (!fullscreen) {
        startFullscreen();
    } else {
        endFullscreen();
    };
}


function endFullscreen() {
    document.getElementById('canvas_container').style.width = '720px'; //unset
    document.getElementById('canvas_container').style.height = '480px'; //unset
    document.getElementById('start_screen').style.width = 'unset';
    document.getElementById('img_start_screen').style.width = '720px';
    document.getElementById('img_start_screen').style.height = '480px';
    document.getElementById('game_over').style.width = '720px';
    document.getElementById('game_over').style.height = '480px';
    document.getElementById('div_winner').style.width = '720px';
    document.getElementById('div_winner').style.height = '480px';
    document.getElementById('canvas').style.width = '720px'; //unset
    document.getElementById('btn-fullscreen').src = 'icons/open_fullscreen.svg';
    document.getElementById('heading_start').classList.remove('d-none');
    fullscreen = false;
}


function startFullscreen() {
    document.getElementById('canvas_container').style.width = '100vw';
    document.getElementById('canvas_container').style.height = 'auto';
    document.getElementById('start_screen').style.width = '100vw';
    document.getElementById('img_start_screen').style.width = '100vw';
    document.getElementById('img_start_screen').style.height = 'calc(100vw/720 * 480)';
    document.getElementById('game_over').style.width = '100vw';
    document.getElementById('game_over').style.height = 'calc(100vw/720 * 480)';
    document.getElementById('div_winner').style.width = '100vw';
    document.getElementById('div_winner').style.height = 'calc(100vw/720 * 480)';
    document.getElementById('canvas').style.width = '100vw';
    document.getElementById('btn-fullscreen').src = 'icons/close_fullscreen.svg';
    document.getElementById('heading_start').classList.add('d-none');
    fullscreen = true;
}


function gameOver() {
    document.getElementById('game_over').classList.remove('d-none');
    setTimeout(() => {
        soundGameOver.play()
    }, 1500);
}


function winnerChickenDinner() {
    setTimeout(() => {
        document.getElementById('div_winner').classList.remove('d-none');
        soundWin.play()
    }, 1500);
}



function restartGame() {
    //start();
    location.reload();
}


function toggleControls() {
    document.getElementById('container_info').classList.add('d-none');
    document.getElementById('container_controls').classList.toggle('d-none')
};


function toggleInfo() {
    document.getElementById('container_controls').classList.add('d-none')
    document.getElementById('container_info').classList.toggle('d-none');
};



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



function startTouchListener() {
    addListenerLeft();
    addListenerRight();
    addListenerJump();
    addListenerBottle();
};


function addListenerLeft() {
    document.getElementById('btn_mobile_left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('btn_mobile_left').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
};


function addListenerRight() {
    document.getElementById('btn_mobile_right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('btn_mobile_right').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
};


function addListenerJump() {
    document.getElementById('btn_mobile_jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('btn_mobile_jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
};


function addListenerBottle() {
    document.getElementById('btn_mobile_bottle').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('btn_mobile_bottle').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
};



