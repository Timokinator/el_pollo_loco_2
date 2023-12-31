/**
 * Die HTML-Canvas, auf der das Spiel gerendert wird.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * Die Spielwelt, in der das Spiel abläuft.
 * @type {World}
 */
let world;

/**
 * Das Tastatur-Objekt für die Steuerung des Spielcharakters.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Ein boolescher Wert, der den Vollbildmodus anzeigt (true, wenn im Vollbildmodus, sonst false).
 * @type {boolean}
 */
let fullscreen = false;


/**
 * Startet das Spiel.
 */
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
    if (backgroundMusic.currentTime == 0) {
        playBackgroundMusic();
    }
    backgroundMusic.volume = 0.5;
};


/**
 * Umschaltet zwischen Vollbild- und Nicht-Vollbildmodus.
 */
function toggleFullscreen() {
    if (!fullscreen) {
        // Den Vollbildmodus aktivieren
        startFullscreen();
    } else {
        // Den Vollbildmodus beenden
        endFullscreen();
    };
};


/**
 * Beendet den Vollbildmodus und stellt die Elemente auf ihre ursprünglichen Größen zurück.
 */
function endFullscreen() {
    // Die Größe des Container-Elements für das Canvas auf den ursprünglichen Wert zurücksetzen
    setParameterEndFullscreen();

    // Die Größe verschiedener Elemente auf 'unset' oder die ursprünglichen Werte zurücksetzen
    document.getElementById('start_screen').style.width = 'unset';
    document.getElementById('canvas').style.width = '720px'; //unset

    // Das Vollbildsymbol zurücksetzen
    document.getElementById('btn-fullscreen').src = 'img-icon/open_fullscreen.svg';

    // Die Überschrift für den Startbildschirm wieder anzeigen
    document.getElementById('heading_start').classList.remove('d-none');

    // Den Vollbildmodus deaktivieren
    fullscreen = false;
};


/**
 * Aktiviert den Vollbildmodus und passt die Größe der Elemente entsprechend an.
 */
function startFullscreen() {
    // Die Größe des Container-Elements für das Canvas auf 100% der Bildschirmbreite und automatische Höhe setzen
    setParameterStartFullscreen();

    // Die Größe verschiedener Elemente an die Bildschirmbreite anpassen
    document.getElementById('start_screen').style.width = '100vw';
    document.getElementById('canvas').style.width = '100vw';

    // Das Vollbildsymbol ändern
    document.getElementById('btn-fullscreen').src = 'img-icon/close_fullscreen.svg';

    // Die Überschrift für den Startbildschirm ausblenden
    document.getElementById('heading_start').classList.add('d-none');

    // Den Vollbildmodus aktivieren
    fullscreen = true;
};


/**
 * Stellt sicher, dass bestimmte HTML-Elemente zu Beginn im Vollbildmodus angezeigt werden.
 * Dies wird erreicht, indem die Breite und Höhe dieser Elemente auf die Bildschirmgröße
 * angepasst werden.
 */
function setParameterStartFullscreen() {
    // Das Canvas-Container-Element wird auf die volle Bildschirmbreite (100vw) gesetzt,
    // und die Höhe wird automatisch angepasst.
    setParameter('canvas_container', '100vw', 'auto');

    // Das Startbild wird auf die volle Bildschirmbreite (100vw) und eine Höhe, die
    // proportional zur Breite ist, gesetzt.
    setParameter('img_start_screen', '100vw', 'calc(100vw/720 * 480)');

    // Das Game Over-Element wird auf die volle Bildschirmbreite (100vw) und eine Höhe,
    // die proportional zur Breite ist, gesetzt.
    setParameter('game_over', '100vw', 'calc(100vw/720 * 480)');

    // Das Gewinner-Div-Element wird auf die volle Bildschirmbreite (100vw) und eine Höhe,
    // die proportional zur Breite ist, gesetzt.
    setParameter('div_winner', '100vw', 'calc(100vw/720 * 480)');
};


/**
 * Stellt sicher, dass bestimmte HTML-Elemente am Ende des Vollbildmodus auf ihre
 * ursprünglichen Größen zurückgesetzt werden.
 */
function setParameterEndFullscreen() {
    // Das Canvas-Container-Element wird auf seine ursprüngliche Breite (720px) und
    // Höhe (480px) zurückgesetzt.
    setParameter('canvas_container', '720px', '480px');

    // Das Startbild wird auf seine ursprüngliche Breite (720px) und Höhe (480px)
    // zurückgesetzt.
    setParameter('img_start_screen', '720px', '480px');

    // Das Game Over-Element wird auf seine ursprüngliche Breite (720px) und Höhe (480px)
    // zurückgesetzt.
    setParameter('game_over', '720px', '480px');

    // Das Gewinner-Div-Element wird auf seine ursprüngliche Breite (720px) und Höhe (480px)
    // zurückgesetzt.
    setParameter('div_winner', '720px', '480px');
};


/**
 * Ändert die Breite und Höhe eines HTML-Elements mit der angegebenen ID.
 * @param {string} id - Die ID des HTML-Elements, dessen Größe geändert werden soll.
 * @param {string} width_value - Der neue Wert für die Breite des Elements (z.B. '100px' oder '50%').
 * @param {string} height_value - Der neue Wert für die Höhe des Elements (z.B. '100px' oder '50%').
 */
function setParameter(id, width_value, height_value) {
    document.getElementById(id).style.width = width_value;
    document.getElementById(id).style.height = height_value;
};


/**
 * Zeigt das Game Over-Element an und spielt den Game Over-Sound nach einer Verzögerung ab.
 */
function gameOver() {
    document.getElementById('game_over').classList.remove('d-none');
    setTimeout(() => {
        soundGameOver.play()
    }, 1500);
};


/**
 * Zeigt das Gewinner-Element an, spielt den Sieg-Sound nach einer Verzögerung ab.
 */
function winnerChickenDinner() {
    setTimeout(() => {
        document.getElementById('div_winner').classList.remove('d-none');
        soundWin.play()
    }, 1500);
};


/**
 * Startet das Spiel neu, indem die Seite neu geladen wird.
 */
function restartGame() {
    location.reload();
};


/**
 * Umschaltet die Sichtbarkeit der Steuerungselemente.
 * Verbirgt das Container-Element für die Spielinformationen und zeigt/verbirgt das Container-Element für die Steuerungen.
 */
function toggleControls() {
    document.getElementById('container_info').classList.add('d-none');
    document.getElementById('container_controls').classList.toggle('d-none');
};

/**
 * Umschaltet die Sichtbarkeit der Spielinformationen.
 * Verbirgt das Container-Element für die Steuerungen und zeigt/verbirgt das Container-Element für die Spielinformationen.
 */
function toggleInfo() {
    document.getElementById('container_controls').classList.add('d-none');
    document.getElementById('container_info').classList.toggle('d-none');
};


/**
 * Event-Listener für Tastaturereignisse (keydown).
 * Aktualisiert den Zustand des Tastatur-Objekts basierend auf den gedrückten Tasten.
 * @param {KeyboardEvent} e - Das Tastaturereignisobjekt.
 */
window.addEventListener('keydown', (e) => {
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



/**
 * Event-Listener für Tastaturereignisse (keyup).
 * Aktualisiert den Zustand des Tastatur-Objekts, um die Freigabe der gedrückten Tasten anzuzeigen.
 * @param {KeyboardEvent} e - Das Tastaturereignisobjekt.
 */
window.addEventListener('keyup', (e) => {
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


/**
 * Startet den Touch-Listener für mobile Steuerelemente.
 * Fügt Listener für Links, Rechts, Springen und Flasche hinzu.
 */
function startTouchListener() {
    addListenerLeft();
    addListenerRight();
    addListenerJump();
    addListenerBottle();
};


/**
 * Fügt einen Touch-Listener für die linke Steuerungstaste hinzu.
 * Aktualisiert den Zustand des Tastatur-Objekts basierend auf Berührungen.
 */
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


/**
 * Fügt einen Touch-Listener für die rechte Steuerungstaste hinzu.
 * Aktualisiert den Zustand des Tastatur-Objekts basierend auf Berührungen.
 */
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


/**
 * Fügt einen Touch-Listener für die Sprungtaste hinzu.
 * Aktualisiert den Zustand des Tastatur-Objekts basierend auf Berührungen.
 */
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


/**
 * Fügt einen Touch-Listener für die Flaschen-Taste hinzu.
 * Aktualisiert den Zustand des Tastatur-Objekts basierend auf Berührungen.
 */
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