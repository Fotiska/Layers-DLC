// ==UserScript==
// @name         Layers-DLC
// @namespace    https://logic-arrows.com/
// @version      2.5.0rc1
// @description  Layers DLC Для стрелочек...
// @author       Fotis
// @run-at       document-idle
// @match        https://logic-arrows.io/*
// @grant        none
// ==/UserScript==

setTimeout((() => {
    'use strict';

    if (!(/(^https:\/\/logic-arrows\.io\/map-.+)/).test(window.location.href)) return;

    function getFileContent(url) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send();
        if (xhr.status !== 200) {
            return undefined;
        }
        return xhr.responseText;
    }

    const logicArrowsHtml = getFileContent(document.location.href);
    const ldlcJS = getFileContent("https://raw.githubusercontent.com/Fotiska/Layers-DLC/refs/heads/main/main.js");
    const ldlcStyle = getFileContent("https://raw.githubusercontent.com/Fotiska/Layers-DLC/refs/heads/main/style.css");

    if (logicArrowsHtml === undefined) return;

    window.document.close();
    window.document.open();

    let modules = {};
    let imodules = {};
    let patch = undefined;

    if (ldlcJS !== undefined) {
        const ev = eval(ldlcJS);
        modules = ev[0];
        imodules = ev[1];
        patch = ev[2];
    }
    else {
        const refs = [];
        // region Getting Modules
        patch = function (module, callback) {
            refs.push([module, callback]);
        };
        const pfc = Function.prototype.call;
        Function.prototype.call = function (...e) {
            const result = pfc.apply(this, e);
            const exports = e[2];
            if (exports !== undefined && exports.__esModule === true) {
                const emodules = Object.getOwnPropertyNames(exports);
                emodules.splice(emodules.indexOf('__esModule'), 1);
                emodules.forEach((emodule) => {
                    refs.forEach(([module, callback]) => {
                        if (module === emodule) exports[emodule] = callback(exports[emodule]);
                    });
                    if (typeof exports[emodule] === 'function' && /^\s*class\s+/.test(exports[emodule].toString())) {
                        exports[emodule] = class IModuleProxy extends exports[emodule] {
                            constructor(...args) {
                                super(...args);
                                imodules[emodule] = this;
                            }
                        };
                    }
                    modules[emodule] = exports[emodule];
                });
            }
            return result;
        };
        // endregion
    }

    const appendHeadChilds = [];
    const appendBodyChilds = [];

    if (ldlcStyle !== undefined) {
        const style = document.createElement('style');
        style.textContent = ldlcStyle;
        appendHeadChilds.push(style);
    }

    // region Mobile Interface
    const mobileInterfaceStyle = `
    .ui-range {
        left: 15vw !important;
        bottom: 6vw !important;
        scale: 1.5 !important;
    }
    
    .ui-toolbar {
        scale: 1.5 !important;
        bottom: 1vw !important;
        height: 6vw !important;
    }
    
    .mi-button {
        position: absolute;
        z-index: 1000;
        border: none;
        background-color: color-mix(in srgb, var(--accent-color), white 10%);
        border-radius: 3vmin;
        width: 16vmin;
        height: 16vmin;
        font-family: 'Nunito';
        font-size: 3vmin;
    }
    
    .mi-button:active {
        background-color: color-mix(in srgb, var(--accent-color), white 25%);
    }
    
    .mi-button:focus-visible {
        border: none;
    }
    
    .mi-escape {
        top: 5vmin !important;
        right: 5vmin !important;
    }
    
    .mi-tab {
        top: 5vmin !important;
        right: 26vmin !important;
    }
    
    .mi-direction {
        top: 5vmin !important;
        left: 5vmin !important;
    }
    
    .mi-flip {
        top: 5vmin !important;
        left: 26vmin !important;
    }
    
    .mi-delete {
        top: 5vmin !important;
        left: 47vmin !important;
    }
    
    .mi-copy {
        top: 26vmin !important;
        left: 5vmin !important;
    }
    
    .mi-paste {
        top: 26vmin !important;
        left: 26vmin !important;
    }
    
    .mi-jmode {
        top: 26vmin !important;
        right: 5vmin !important;
    }
    
    .mi-prevlayer {
        top: 47vmin !important;
        right: 5vmin !important;
    }
    
    .mi-nextlayer {
        top: 47vmin !important;
        right: 26vmin !important;
    }
    
    .mi-resetlayer {
        top: 26vmin !important;
        right: 26vmin !important;
    }
    `;

    const style = document.createElement('style');
    style.textContent = mobileInterfaceStyle;
    appendHeadChilds.push(style);

    function createButton(title, className) {
        const button = document.createElement('button');
        button.textContent = title;
        button.className = className;
        appendBodyChilds.push(button);
        return button;
    }

    function getKeyEvent(code, key) {
        return {code: code, key: key, preventDefault: () => {}};
    }

    function sendKeyDown(code, key) {
        if (imodules.KeyboardHandler) imodules.KeyboardHandler.keyDown(getKeyEvent(code, key));
    }

    function sendKeyUp(code, key) {
        if (imodules.KeyboardHandler) imodules.KeyboardHandler.keyUp(getKeyEvent(code, key));
    }

    function addKeyCodeEvents(button, getKeyCodes) {
        let keyDown = false;

        button.addEventListener('touchstart', (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (keyDown) return;
          if (imodules.KeyboardHandler === undefined) return;
          let keyCode = getKeyCodes(false);
          if (!keyCode) return;
          if (!Array.isArray(keyCode[0])) keyCode = [keyCode];
          keyCode.forEach((e) => sendKeyDown(e[0], e[1]));
          keyDown = true;
        });

        button.addEventListener('touchend', (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!keyDown) return;
          if (imodules.KeyboardHandler === undefined) return;
          let keyCode = getKeyCodes(true);
          if (!keyCode) return;
          if (!Array.isArray(keyCode[0])) keyCode = [keyCode];
          keyCode.forEach((e) => sendKeyUp(e[0], e[1]));
          keyDown = false;
        });


        button.addEventListener('touchmove', (e) => {
          e.preventDefault();
          e.stopPropagation();
        });
    }

    let timer = undefined;
    let selection = false;
    let selected = false;
    let oldDistance = null;

    function handleTouchMove(event) {
        const touches = event.touches;
        if (touches.length >= 2) {
            const distance = Math.hypot(
                touches[1].clientX - touches[0].clientX,
                touches[1].clientY - touches[0].clientY
            );
            if (oldDistance === null) oldDistance = distance
            if (imodules.PlayerControls) imodules.PlayerControls.keyboardZoomVelocity = (oldDistance - distance)*7
            oldDistance = distance
        }
    }

    let currentMode = null;

    function disableMode() {
        if (!imodules.KeyboardHandler) return;
        if (currentMode === 'j') sendKeyUp("KeyJ", "J");
        if (currentMode === 'shift') sendKeyUp("ShiftLeft", "Shift");
        if (currentMode === 'ctrl') sendKeyUp("ControlLeft", "Control");
        if (currentMode === 'delete') if (imodules.PlayerControls) imodules.PlayerControls.takeCursor();
        if (imodules.PlayerControls) imodules.PlayerControls.freeCursor = true,
        currentMode = null;
    }

    document.addEventListener('touchstart', (e) => {
        const touches = e.touches
        if (touches.length >= 2) {
            if (imodules.PlayerControls) imodules.PlayerControls.takeCursor()
        }
        oldDistance = null

        timer = setTimeout(() => {
            if (imodules.KeyboardHandler) {
                if (!selection) {
                    sendKeyDown("KeyE", "E");
                    selection = true;
                    selected = false;
                }
                else {
                    sendKeyUp("KeyE", "E");
                    selection = false;
                    selected = true;
                }
            }
        }, 100);
    });

    document.addEventListener('touchend', () => {
        clearTimeout(timer);
    });

    document.addEventListener('touchcancel', () => {
        clearTimeout(timer);
    });

    document.addEventListener('touchmove', (e) => {
        clearTimeout(timer);
        handleTouchMove(e);
    });

    const escButton = createButton('Escape', 'mi-button mi-escape');
    addKeyCodeEvents(escButton, () => ['Escape', 'Escape']);

    const tabButton = createButton('Tab', 'mi-button mi-tab');
    addKeyCodeEvents(tabButton, () => ['Tab', 'Tab']);

    let currentDir = 0
    const dirCodes = [['KeyW', 'W'], ['KeyD', 'D'], ['KeyS', 'S'], ['KeyA', 'A']]
    const dirNames = ['↑', '→', '↓', '←']
    const dirButton = createButton("↑", 'mi-button mi-direction');
    addKeyCodeEvents(dirButton, (isEnd) => {
        if (isEnd) return dirCodes[(currentDir + 3) % 4];

        currentDir = (currentDir + 1) % 4
        dirButton.textContent = dirNames[currentDir];
        return dirCodes[currentDir];
    });

    const flipButton = createButton('F', 'mi-button mi-flip');
    addKeyCodeEvents(flipButton, () => ['KeyF', 'F']);

    const deleteButton = createButton('Delete/R', 'mi-button mi-delete');
    addKeyCodeEvents(deleteButton, (isEnd) => {
        if (selected) return ['Delete', 'Delete'];
        if (isEnd) return;

        const mode = currentMode;
        disableMode()
        if (mode !== 'delete') {
            imodules.PlayerControls.takeArrow(0);
            if (imodules.PlayerControls) imodules.PlayerControls.freeCursor = false;
            currentMode = 'delete';
        }
    });

    const copyButton = createButton('Copy', 'mi-button mi-copy');
    addKeyCodeEvents(copyButton, () => ['KeyC', 'C']);

    const pasteButton = createButton('Paste', 'mi-button mi-paste');
    addKeyCodeEvents(pasteButton, () => ['KeyV', 'V']);

    patch('PlayerControls', (_PlayerControls) => class PlayerControls extends _PlayerControls {
        constructor(e, t, s, i) {
            super(e, t, s, i);
            imodules.MouseHandler = this.mouseHandler;
            imodules.KeyboardHandler = this.keyboardHandler;
        }

        takeArrow(...args) {
            disableMode();
            super.takeArrow(...args);
            selected = false;
        }

        setArrows(...args) {
            super.setArrows(...args);
            if (selected) {
                this.takeCursor();
                selected = false;
            }
        }
    });

    if (ldlcJS) {
        const jButton = createButton('J', 'mi-button mi-jmode');
        addKeyCodeEvents(jButton, (isEnd) => {
            if (isEnd) return;

            const mode = currentMode;
            disableMode();
            if (mode !== 'j') {
                sendKeyDown("KeyJ", "J");
                if (imodules.PlayerControls) {
                    imodules.PlayerControls.freeCursor = false;
                    imodules.PlayerControls.game.selectedMap.arrowsToPut.clear();
                    imodules.PlayerControls.game.selectedMap.arrowsToPutOriginal.clear();
                }
                currentMode = 'j';
            }
        });

        const nextLayerButton = createButton('NextL', 'mi-button mi-nextlayer');
        addKeyCodeEvents(nextLayerButton, () => ['KeyT', 'T']);

        const prevLayerButton = createButton('PrevL', 'mi-button mi-prevlayer');
        addKeyCodeEvents(prevLayerButton, () => ['KeyG', 'G']);

        const resetLayerButton = createButton('ResetL', 'mi-button mi-resetlayer');
        addKeyCodeEvents(resetLayerButton, () => ['KeyU', 'U']);
    }

    // TODO: Реализовать режим SHIFT - Принудительно изменить стрелочку, но слой не изменится.
    // TODO: Реализовать режим CTRL - Принудительно изменить стрелочку и переместить на текущий слой.

    // endregion

    window.document.write(logicArrowsHtml);
    appendHeadChilds.forEach((child) => window.document.head.appendChild(child));
    appendBodyChilds.forEach((child) => window.document.body.appendChild(child));
}), 2000);