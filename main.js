(() => {
    // region Getting Modules
    const modules = {};
    const imodules = {};
    const refs = [];
    function patch(module, callback) {
        refs.push([module, callback]);
    }
    const pfc = Function.prototype.call;
    Function.prototype.call = function(...e) {
        pfc.apply(this, e);
        let exports = e[2];
        if (exports !== undefined && exports.__esModule === true) {
            let emodules = Object.getOwnPropertyNames(exports);
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
                    }
                }
                modules[emodule] = exports[emodule];
            });
        }
    }
    // endregion
    class LayersDLC {
        constructor() {
            this.ACTIVE_LAYER_ALPHA = 1;
            this.INACTIVE_LAYER_ALPHA = 0.5;
            this.BLUEPRINT_LAYER_ALPHA = 0.7;
            this.current_layer = 0;

            this.modules = modules;
            this.imodules = imodules;
        }
    }
    ldlc = new LayersDLC();
    // region Modifying Modules

    patch('save', (_) => function(gameMap) {
        const data = [];
        data.push(0, 0); // ВЕРСИЯ ИГРЫ ( ПОКА ЧТО НЕ МЕНЯЕТСЯ )
        data.push(255 & gameMap.chunks.size, gameMap.chunks.size >> 8 & 255);
        gameMap.chunks.forEach((chunk) => {
            const types = chunk.getArrowTypes();
            const x = [255 & Math.abs(chunk.x), Math.abs(chunk.x) >> 8 & 255];
            const y = [255 & Math.abs(chunk.y), Math.abs(chunk.y) >> 8 & 255];
            chunk.x < 0 ? x[1] |= 128 : x[1] &= 127;
            chunk.y < 0 ? y[1] |= 128 : y[1] &= 127;
            data.push(...x);
            data.push(...y);
            data.push(types.length - 1);
            types.forEach((arrowType) => {
                data.push(arrowType);
                data.push(0);
                const n = data.length - 1;
                let o = 0;
                for (let x = 0; x < modules.CHUNK_SIZE; x++) {
                    for (let y = 0; y < modules.CHUNK_SIZE; y++) {
                        const arrow = chunk.getArrow(x, y);
                        if (arrow.type === arrowType) {
                            const e = x | y << 4;
                            const s = arrow.rotation | (arrow.flipped ? 1 : 0) << 2;
                            data.push(e);
                            data.push(s);
                            o++;
                        }
                    }
                }
                data[n] = o - 1;
            });
        });
        gameMap.chunks.forEach((chunk) => {
            const x = [255 & Math.abs(chunk.x), Math.abs(chunk.x) >> 8 & 255];
            const y = [255 & Math.abs(chunk.y), Math.abs(chunk.y) >> 8 & 255];
            chunk.x < 0 ? x[1] |= 128 : x[1] &= 127;
            chunk.y < 0 ? y[1] |= 128 : y[1] &= 127;
            data.push(...x);
            data.push(...y);
            for (let x = 0; x < modules.CHUNK_SIZE; x++) {
                for (let y = 0; y < modules.CHUNK_SIZE; y++) {
                    const arrow = chunk.getArrow(x, y);
                    if (arrow.type === 0) continue;
                    data.push(arrow.layer || 0);
                }
            }
        });
        return data;
    });
    patch('load', (_) => function(gameMap, data) {
        if (data.length < 4) return;

        let s = 0;
        let version = data[s++];
        version |= data[s++] << 8
        if (version !== 0) throw new Error("Unsupported save version");

        let chunks_count = data[s++] | data[s++] << 8;
        for (let _ = 0; _ < chunks_count; _++) {
            let x = data[s++];
            x |= (127 & data[s++]) << 8;
            if ((data[s - 1] & 128) !== 0) x = -x;

            let y = data[s++];
            y |= (127 & data[s++]) << 8;
            if ((data[s - 1] & 128) !== 0) y = -y;

            const arrows_count = data[s++] + 1;
            const chunk = gameMap.getOrCreateChunk(x, y)
            for (let _ = 0; _ < arrows_count; _++) {
                let type = data[s++];
                const count = data[s++] + 1;
                for (let adata = 0; adata < count; adata++) {
                    const i = data[s++];
                    const n = data[s++];
                    const x = 15 & i;
                    const y = i >> 4;
                    const arrow = chunk.getArrow(x, y);
                    arrow.type = type;
                    arrow.rotation = 3 & n;
                    arrow.flipped = 0 !== (4 & n);
                }
            }
        }
        if (data.length - 1 == s) return;
        for (let _ = 0; _ < chunks_count; _++) {
            let x = data[s++];
            x |= (127 & data[s++]) << 8;
            if ((data[s - 1] & 128) !== 0) x = -x;

            let y = data[s++];
            y |= (127 & data[s++]) << 8;
            if ((data[s - 1] & 128) !== 0) y = -y;

            const chunk = gameMap.getChunk(x, y)
            for (let x = 0; x < modules.CHUNK_SIZE; x++) {
                for (let y = 0; y < modules.CHUNK_SIZE; y++) {
                    const arrow = chunk.getArrow(x, y);
                    if (arrow.type === 0) continue;
                    arrow.layer = data[s++] || 0;
                }
            }
        }
    });
    patch('Game', (_Game) => class Game extends _Game {
        draw() {
        this.updateFocus();
        (this.drawPastedArrows || 0 !== this.selectedMap.getSelectedArrows().length) && (this.screenUpdated = !0);
        modules.PlayerSettings.framesToUpdate[this.updateSpeedLevel] > 1 && (this.screenUpdated = !0);
        this.screenUpdated && this.render.drawBackground(this.scale, [-this.offset[0] / modules.CELL_SIZE, -this.offset[1] / modules.CELL_SIZE]);
        const e = this.scale;
        this.render.prepareArrows(e);
        const t = ~~(-this.offset[0] / modules.CELL_SIZE / 16) - 1,
            s = ~~(-this.offset[1] / modules.CELL_SIZE / 16) - 1,
            o = ~~(-this.offset[0] / modules.CELL_SIZE / 16 + this.width / this.scale / 16),
            a = ~~(-this.offset[1] / modules.CELL_SIZE / 16 + this.height / this.scale / 16);
        if (this.gameMap.chunks.forEach((e => {
                if (!(e.x >= t && e.x <= o && e.y >= s && e.y <= a)) return;
                const r = this.offset[0] * this.scale / modules.CELL_SIZE + .025 * this.scale,
                    l = this.offset[1] * this.scale / modules.CELL_SIZE + .025 * this.scale;
                for (let t = 0; t < modules.CHUNK_SIZE; t++)
                    for (let s = 0; s < modules.CHUNK_SIZE; s++) {
                        const o = e.getArrow(t, s);
                        if ((o.layer || 0) == ldlc.current_layer) {
                            this.render.setArrowAlpha(ldlc.ACTIVE_LAYER_ALPHA);
                        } else {
                            this.render.setArrowAlpha(ldlc.INACTIVE_LAYER_ALPHA);
                        }
                        if (o.type > 0 && (this.screenUpdated || modules.ChunkUpdates.wasArrowChanged(o))) {
                            const i = (e.x * modules.CHUNK_SIZE + t) * this.scale + r,
                                a = (e.y * modules.CHUNK_SIZE + s) * this.scale + l;
                            this.render.drawArrow(i, a, o, o.type, o.signal, o.rotation, o.flipped)
                        }
                    }
            })), performance.now() - this.drawTime > 1e3 && (this.drawTime = performance.now(), this.drawsPerSecond = 0), this.drawsPerSecond++, this.drawPastedArrows) {
            this.render.setArrowAlpha(ldlc.BLUEPRINT_LAYER_ALPHA);
            const e = this.selectedMap.getCopiedArrows();
            0 !== e.size && (this.screenUpdated = !0), e.forEach(((e, t) => {
                const [s, i] = t.split(",").map((e => parseInt(e, 10)));
                let o = s,
                    a = i,
                    r = 0;
                1 === this.pasteDirection ? (o = -i, a = s, r = 1) : 2 === this.pasteDirection ? (o = -s, a = -i, r = 2) : 3 === this.pasteDirection && (o = i, a = -s, r = 3);
                const l = (o + this.mousePosition[0]) * this.scale + this.offset[0] * this.scale / modules.CELL_SIZE + .025 * this.scale,
                    h = (a + this.mousePosition[1]) * this.scale + this.offset[1] * this.scale / modules.CELL_SIZE + .025 * this.scale;
                this.render.drawArrow(l, h, o, e.type, e.signal, (e.rotation + r) % 4, e.flipped)
            }))
        }
        if (this.render.disableArrows(), this.render.prepareSolidColor(), this.render.setSolidColor(.25, .5, 1, .25), this.selectedMap.getSelectedArrows().forEach((e => {
                const t = e.split(",").map((e => parseInt(e, 10))),
                    s = t[0] * this.scale + this.offset[0] * this.scale / modules.CELL_SIZE,
                    i = t[1] * this.scale + this.offset[1] * this.scale / modules.CELL_SIZE,
                        o = this.scale + .05 * this.scale;
                    this.render.drawSolidColor(s, i, o, o)
                })), this.isSelecting) {
                this.render.prepareSolidColor(), this.render.setSolidColor(.5, .5, .75, .25);
                const e = this.selectedMap.getCurrentSelectedArea();
                if (void 0 !== e) {
                    const t = e[0] * this.scale + this.offset[0] * this.scale / modules.CELL_SIZE,
                        s = e[1] * this.scale + this.offset[1] * this.scale / modules.CELL_SIZE,
                        i = e[2] - e[0],
                        o = e[3] - e[1];
                    this.render.drawSolidColor(t, s, i * this.scale, o * this.scale)
                }
            }
            this.render.disableSolidColor(), this.screenUpdated = !1, this.frame++
        }
    });
    patch('Render', (_Render) => class Render extends _Render {
        drawArrow(e, t, arrow, s, i, n, o) {
            if ((s -= 1) !== this.lastArrowType) {
                const e = s / 8 % 1,
                    t = ~~(s / 8) / 8;
                this.gl.uniform2f(this.arrowShader.getSpritePositionUniform(), e, t), this.lastArrowType = s
            }
            if (this.lastArrowSignal !== i) {
                this.gl.uniform1i(this.arrowShader.getSignalUniform(), i);
                this.lastArrowSignal = i;
            }
            if (this.lastArrowRotation !== n || this.lastArrowFlipped !== o) {
                this.gl.uniform2f(this.arrowShader.getRotationUniform(), n / 2 * Math.PI, o ? 1 : 0);
                this.lastArrowRotation = n;
                this.lastArrowFlipped = o;
            }
            this.gl.uniform2f(this.arrowShader.getPositionUniform(), e, t);
            this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
        }
    });
    patch('GameMap', (_GameMap) => class GameMap extends _GameMap {
        setArrowType(x, y, type, hz=true) {
            const chunk = this.getOrCreateChunkByArrowCoordinates(x, y);
            const ax = x - chunk.x * modules.CHUNK_SIZE;
            const ay = y - chunk.y * modules.CHUNK_SIZE;
            const arrow = chunk.getArrow(ax, ay);
            if (!hz || arrow.type === type || !arrow.canBeEdited || modules.PlayerSettings.levelArrows.includes(arrow.type)) return;
            if (arrow && (arrow.layer || 0) !== ldlc.current_layer && arrow.type !== 0 && !imodules.KeyboardHandler.getShiftPressed()) return;
            arrow.layer = ldlc.current_layer;
            arrow.signal = 0;
            arrow.type = type;
        }
        setArrowRotation(e, t, s, n = !0) {
            const o = this.getArrowForEditing(e, t);
            if (o && (o.layer || 0) !== ldlc.current_layer && o.type !== 0 && !imodules.KeyboardHandler.getShiftPressed()) return;
            if (void 0 !== o && 0 !== o.type) {
                if (n && !o.canBeEdited) return;
                if (n && modules.PlayerSettings.levelArrows.includes(o.type)) return;
                o.rotation = s
            }
        }
        setArrowFlipped(e, t, s, n = !0) {
            const o = this.getArrowForEditing(e, t);
            if (o && (o.layer || 0) !== ldlc.current_layer && o.type !== 0 && !imodules.KeyboardHandler.getShiftPressed()) return;
            if (void 0 !== o && 0 !== o.type) {
                if (n && !o.canBeEdited) return;
                if (n && modules.PlayerSettings.levelArrows.includes(o.type)) return;
                o.flipped = s
            }
        }
    });
    patch('PlayerControls', (_PlayerControls) => class PlayerControls extends _PlayerControls {
        constructor(e, t, s, i) {
            super(e, t, s, i);
            const pKDC = this.keyDownCallback;
            this.keyDownCallback = (e, t) => {
                if (e === 'KeyG') {
                    ldlc.current_layer -= 1;
                    ShowCurrentLayer();
                    imodules.Game.screenUpdated = true;
                }
                else if (e === 'KeyT') {
                    ldlc.current_layer += 1;
                    ShowCurrentLayer();
                    imodules.Game.screenUpdated = true;
                }
                else if (e === 'KeyU') {
                    ldlc.current_layer = 0;
                    ShowCurrentLayer();
                    imodules.Game.screenUpdated = true;
                }
                pKDC(e, t);
            }
            this.keyboardHandler.keyDownCallback = this.keyDownCallback;
            ShowCurrentLayer();
        }
        deleteArrow(e, t) {
            if (!this.playerAccess.canDelete) return;
            const arrow = this.game.gameMap.getArrow(e, t);
            if (arrow && (arrow.layer || 0) !== ldlc.current_layer && arrow.type !== 0 && !imodules.KeyboardHandler.getShiftPressed()) return;
            const s = modules.ArrowData.fromArrow(arrow),
                i = modules.ArrowData.fromState(0, 0, !1);
            null !== this.history && this.history.addChange(e, t, s, i), this.game.gameMap.removeArrow(e, t), this.game.selectedMap.deselect(e, t), this.game.screenUpdated = !0
        }
    });
    function ShowCurrentLayer() {
        modules.ControlsHintsText.MOVE[modules.LangSettings.getLanguage()] = 'Текущий слой: ' + ldlc.current_layer;
        imodules.PlayerUI.updateControlsHintRights(imodules.PlayerAccess);
    }
    // endregion
})();