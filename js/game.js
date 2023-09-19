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
    document.getElementById('canvas_container').style.width = '720px'; //unset
    document.getElementById('canvas_container').style.height = '480px'; //unset
    
    // Die Größe verschiedener Elemente auf 'unset' oder die ursprünglichen Werte zurücksetzen
    document.getElementById('start_screen').style.width = 'unset';
    document.getElementById('img_start_screen').style.width = '720px';
    document.getElementById('img_start_screen').style.height = '480px';
    document.getElementById('game_over').style.width = '720px';
    document.getElementById('game_over').style.height = '480px';
    document.getElementById('div_winner').style.width = '720px';
    document.getElementById('div_winner').style.height = '480px';
    document.getElementById('canvas').style.width = '720px'; //unset
    
    // Das Vollbildsymbol zurücksetzen
    document.getElementById('btn-fullscreen').src = 'icons/open_fullscreen.svg';
    
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
    document.getElementById('canvas_container').style.width = '100vw';
    document.getElementById('canvas_container').style.height = 'auto';
    
    // Die Größe verschiedener Elemente an die Bildschirmbreite anpassen
    document.getElementById('start_screen').style.width = '100vw';
    document.getElementById('img_start_screen').style.width = '100vw';
    document.getElementById('img_start_screen').style.height = 'calc(100vw/720 * 480)';
    document.getElementById('game_over').style.width = '100vw';
    document.getElementById('game_over').style.height = 'calc(100vw/720 * 480)';
    document.getElementById('div_winner').style.width = '100vw';
    document.getElementById('div_winner').style.height = 'calc(100vw/720 * 480)';
    
    // Die Größe des Canvas-Elements auf 100% der Bildschirmbreite setzen
    document.getElementById('canvas').style.width = '100vw';
    
    // Das Vollbildsymbol ändern
    document.getElementById('btn-fullscreen').src = 'icons/close_fullscreen.svg';
    
    // Die Überschrift für den Startbildschirm ausblenden
    document.getElementById('heading_start').classList.add('d-none');
    
    // Den Vollbildmodus aktivieren
    fullscreen = true;
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