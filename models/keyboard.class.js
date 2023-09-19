/**
 * Die `Keyboard`-Klasse dient zur Verfolgung des Tastaturzustands im Spiel.
 * Jede Eigenschaft dieser Klasse repräsentiert den Status einer bestimmten Taste.
 * Wenn eine Taste gedrückt wird, wird die entsprechende Eigenschaft auf `true` gesetzt.
 * Wenn eine Taste losgelassen wird, wird die entsprechende Eigenschaft auf `false` gesetzt.
 *
 * @class
 */
class Keyboard {
    /**
     * Der Status der linken Pfeiltaste (LEFT).
     * @type {boolean}
     */
    LEFT = false;

    /**
     * Der Status der rechten Pfeiltaste (RIGHT).
     * @type {boolean}
     */
    RIGHT = false;

    /**
     * Der Status der oberen Pfeiltaste (UP).
     * @type {boolean}
     */
    UP = false;

    /**
     * Der Status der unteren Pfeiltaste (DOWN).
     * @type {boolean}
     */
    DOWN = false;

    /**
     * Der Status der Leertaste (SPACE).
     * @type {boolean}
     */
    SPACE = false;

    /**
     * Der Status der "D"-Taste (D).
     * @type {boolean}
     */
    D = false;
};