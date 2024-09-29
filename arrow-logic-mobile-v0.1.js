// ==UserScript==
// @name         Logic-Arrows mobile ui
// @namespace    https://viayoo.com/
// @version      0.1
// @description  skill issue
// @author       Xeony
// @run-at       document-start
// @match        https://logic-arrows.io/*
// @grant        none
// ==/UserScript==

const modConfig = {
  styles: {
    allArrowsClickableButton: {
      position: "absolute",
      color: "#ffffff",
      borderRadius: "15px",
      height: "40px",
      width: "100%",
      top: "50%",
      left: "0"
    },
    pauseButton: {
      position: "absolute",
      color: "#ffffff",
      borderRadius: "15px",
      height: "40px",
      width: "100%",
      top: "calc(50% + 45px)",
      left: "0"
    },
    copyButton: {
      position: "absolute",
      height: "30px",
      width: "calc(50% - 7.5px)",
      top: "calc(100% - 35px)",
      left: "5px"
    },
    deleteButton: {
      position: "absolute",
      height: "30px",
      width: "calc(50% - 10px)",
      top: "calc(100% - 35px)",
      left: "calc(5px + 50%)"
    },
    rImage: {
      width: '18%',
      height: 'auto',
      transform: 'scale(3)'
    },
    rButton: {
      margin: '0',
      padding: '0',
      width: '50px',
      height: '50px'
    },
    rtButton: {
      fontSize: '12px',
      width: '50px',
      height: '50px'
    },
    escButton: {
      width: '50px',
      height: '50px'
    },
    button: {
      width: '40px',
      height: '40px'
    },
    bottomContainer: {
      position: 'fixed',
      left: '0',
      zIndex: '999999'
    },
    leftUpContainer: {
      position: 'fixed',
      left: '0',
      top: '0px',
      zIndex: '999999'
    },
    uiToolbar: {
      transform: 'scale(2) translateX(-50%) translateY(-25%)'
    }
  }
};

(function() {
    'use strict';
    if (
      !(/(^https:\/\/logic-arrows\.io\/map-.+)|(^https:\/\/logic-arrows\.io\/level-.+)/
    ).test(window.location.href)) return;
    setTimeout(()=>
{
  
  function createButton(text, callback){
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', callback);
    return button
  }
 
  const data = window.game
  const ArrowsDB = data.ArrowsDB
  const navigation = data.navigation
  const gamePage = navigation.gamePage
  const game = gamePage.game
  const playerUI = gamePage.playerUI
  const playerControls = gamePage.playerControls
  const CELL_SIZE = 256

  let selecting, selected = false
  
  let oldDistance = null
  function handleTouchMove(event) {
    const touches = event.touches;
    if (touches.length >= 2) {
      const distance = Math.hypot(
        touches[1].clientX - touches[0].clientX,
        touches[1].clientY - touches[0].clientY
      );
      if (oldDistance === null) oldDistance = distance
      playerControls.keyboardZoomVelocity = (oldDistance - distance)*7
      oldDistance = distance
    }
  }
  document.addEventListener("touchmove", handleTouchMove);
  document.addEventListener("touchstart", (e)=>{
    const touches = e.touches
    if (touches.length >= 2) {
     playerControls.takeCursor()
    }
    oldDistance = null
  })
  document.addEventListener("gesturestart", function(event) {
    event.preventDefault();
  });
  document.addEventListener("gesturechange", function(event) {
    event.preventDefault();
  });



  const UIRange = playerUI.speedController.constructor
  
  const framesToSkip = window.game.PlayerSettings
  const framesToUpdate = window.game.PlayerSettings
  
  const speedContainer = document.createElement("div")

  speedContainer.style.left = "0"
  speedContainer.style.top = "40px"
  document.body.appendChild(speedContainer)
  
  function addSpeedController() {
   this.speedController = new UIRange(
    speedContainer, 
    5,
    (e => 
    (e => `${framesToUpdate[e]/framesToSkip[e]*60} ` + `${window.game.GameText.PER_SECOND.get()}`
    )(e)
    )
    )
    this.speedController.element.style.position = "absolute"
    this.speedController.element.style.bottom = (this.toolbarController.element.clientHeight + 40) + "px"
    this.speedController.element.style.left = "70px"
    this.speedController.element.style.transform = "scale(2)"
  }

  playerUI.addSpeedController = addSpeedController.bind(playerUI)
  playerUI.removeSpeedController()
  playerUI.addSpeedController()
  
  console.log(playerUI)





  function createSwitch(text, id, callback) {
    const switchInput = document.createElement('input');
    const switchLabel = document.createElement('label');
    switchInput.type = 'checkbox';
    switchInput.id = id;
    switchLabel.htmlFor = id;
    switchLabel.textContent = text;
    switchInput.addEventListener('change', callback.bind(switchInput))
    
    return [switchInput, switchLabel]
  }

  const self = gamePage.playerControls
  
  let signalMapping = {
    24: 5,
    21: 5
  }

  const leftClickCallback = () => {
    const selectedArrow = self.getArrowByMousePosition();
    const isShiftPressed = self.keyboardHandler.getShiftPressed();
    
    if (selectedArrow !== undefined && self.freeCursor && !isShiftPressed) {
        const desiredSignal = signalMapping[selectedArrow.type];
        
        if (desiredSignal !== undefined) {
         if (selectedArrow.signal === 0 || game.playing) {
          selectedArrow.signal = desiredSignal
          game.screenUpdated = true
         } else {
          selectedArrow.signal = 0
          game.screenUpdated = true
         }
        }
    }
  }

  const rightClickCallback = () => {
   if (!selecting) {
      const keyDownEvent = new KeyboardEvent('keydown', { code: "KeyE" });
      document.dispatchEvent(keyDownEvent);
      selecting = true
      selected = false
   } else {
      const keyUpEvent = new KeyboardEvent('keyup', { code: "KeyE" });
      document.dispatchEvent(keyUpEvent);
      selecting = false
      selected = true
   }
  }

  self.mouseHandler.leftClickCallback = leftClickCallback
  
  self.mouseHandler.rightClickCallback = rightClickCallback







  playerUI.toggleMenu()
  const UIMenu = playerUI.menu.constructor
  playerUI.toggleMenu()
  function toggleMenu(e){
   void 0 !== this.mapInfo && (null === this.menu || this.menu.getIsRemoved() ? this.menu = new UIMenu(document.body, this.mapInfo, e) : (this.menu.remove(), this.menu = null))
   const settingsDiv = document.createElement("div")
   const redColor = "#ff4343"
   const greenColor = "#00cc6a"
 
  let isPause, isAllArrowsClickable
  
  let pauseButtonColor, allArrowsClickableButtonColor
  
  const calculateColors = ()=>{
   isPause = !game.playing
   isAllArrowsClickable = !!signalMapping[1]
   pauseButtonColor = isPause ? greenColor : redColor
   allArrowsClickableButtonColor = isAllArrowsClickable ? greenColor : redColor
  }
  calculateColors()

  let allArrowsClickableButton
  allArrowsClickableButton = createButton("AllArrowsClickable", (function cb(e){
  e.stopPropagation()
   if (!isAllArrowsClickable) {
    signalMapping = {
      24: 5,
      21: 5,
      1: 1,
      2: 1,
      3: 1,
      4: 1,
      5: 1,
      6: 1,
      7: 1,
      8: 1,
      10: 2,
      11: 2,
      12: 2, 
      13: 2,
      14: 2,
      15: 3,
      16: 3,
      17: 3,
      18: 3,
      19: 3,
      20: 5
    }
    calculateColors()
    
    allArrowsClickableButton.style.backgroundColor = allArrowsClickableButtonColor
   } else {
    signalMapping = {
        24: 5,
        21: 5
    }
    calculateColors()
    
    allArrowsClickableButton.style.backgroundColor = allArrowsClickableButtonColor
   }
  }))
 
 let pauseButton
 pauseButton = createButton("Pause", (function cb(){
   if (isPause) {
    game.playing = true
    calculateColors()
    pauseButton.style.backgroundColor = pauseButtonColor
   } else {
    game.playing = false
    calculateColors()
    pauseButton.style.backgroundColor = pauseButtonColor
   }
  }))
  
  let copyButton
  copyButton = createButton("copy", function(){
   playerControls.copyArrows()
  })
  
  let deleteButton
  deleteButton = createButton("delete", function(){
   playerControls.deleteSelectedArrows()
  })
 
  Object.assign(allArrowsClickableButton.style, modConfig.styles.allArrowsClickableButton)
  allArrowsClickableButton.style.backgroundColor= allArrowsClickableButtonColor,
  
  Object.assign(pauseButton.style, modConfig.styles.pauseButton)
  pauseButton.style.backgroundColor = pauseButtonColor
  
  Object.assign(copyButton.style, modConfig.styles.copyButton)
  
  Object.assign(deleteButton.style, modConfig.styles.deleteButton)

 
 settingsDiv.appendChild(allArrowsClickableButton)
 settingsDiv.appendChild(pauseButton)
 settingsDiv.appendChild(document.createElement('br'));
 settingsDiv.appendChild(copyButton)
 settingsDiv.appendChild(deleteButton)
 this.menu.messagePanelDiv.appendChild(settingsDiv);
}
playerUI.toggleMenu = toggleMenu.bind(playerUI)

  function addTouchEvents(button, getKeyCode) {
    let keyDown = false;
    
    button.addEventListener('touchstart', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (keyDown) return;
      const keyDownEvent = new KeyboardEvent('keydown', { code: getKeyCode() });
      document.dispatchEvent(keyDownEvent);
      keyDown = true;
    });
    
    button.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!keyDown) return;
      const keyUpEvent = new KeyboardEvent('keyup', { code: getKeyCode(true) });
      document.dispatchEvent(keyUpEvent);
      keyDown = false;
    });
    
    
    button.addEventListener('touchmove', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
    
  }
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.right = '0';
  container.style.zIndex = "999999"

  const rButton = document.createElement('button');
  addTouchEvents(rButton, ()=>{
    return "KeyR"
  });
  

  const rImage = document.createElement('img');
  rImage.src = 'https://static-00.iconduck.com/assets.00/times-icon-512x512-df869h3d.png';
  Object.assign(rImage.style, modConfig.styles.rImage);
  
  Object.assign(rButton.style, modConfig.styles.rButton);
  rButton.appendChild(rImage);
  
  const rtButton = document.createElement('button');
  rtButton.innerText = '↑';
  Object.assign(rtButton.style, modConfig.styles.rtButton);
  
  let keyQueue = ['KeyW', 'KeyD', 'KeyS', 'KeyA'];
  let textQueue = ['↑', '→', '↓', '←'];
  let keyIndex = 1;
  let prevKey = "KeyD";
  let rotation = 0;
  
  addTouchEvents(rtButton, (dontChange) => {
    if (dontChange == true) { return prevKey; }
    rotation += 90;
    if (rotation == 360) rotation = 0;
  
    const toolbarItems = document.querySelectorAll('.ui-toolbar-item');
    toolbarItems.forEach(function(item, index) {
      item.style.transform = "rotate(" + rotation + "deg)";
      const image = item.querySelector("img")
      image.style.transform = "translateY(-25%)"
    });
    rtButton.innerText = textQueue[keyIndex];
    var key = keyQueue[keyIndex];
    keyIndex = (keyIndex + 1) % keyQueue.length;
  
    prevKey = key;
    return key;
  });
  
  document.querySelector(".ui-toolbar-arrow-right").addEventListener("click", () => {
    const toolbarItems = document.querySelectorAll('.ui-toolbar-item');
    toolbarItems.forEach(function(item, index) {
      item.style.transform = "rotate(" + rotation + "deg)";
      const image = item.querySelector("img")
      image.style.transform = "translateY(-25%)"
    });
  });
  
  document.querySelector(".ui-toolbar-arrow-left").addEventListener("click", () => {
    const toolbarItems = document.querySelectorAll('.ui-toolbar-item');
    toolbarItems.forEach(function(item, index) {
      item.style.transform = "rotate(" + rotation + "deg)";
      const image = item.querySelector("img")
      image.style.transform = "translateY(-25%)"
    });
  });
  
  const buttonLine2 = document.createElement('div');
  const buttonLine3 = document.createElement('div');
  const escButton = document.createElement('button');
  escButton.innerText = 'ESC';
  Object.assign(escButton.style, modConfig.styles.escButton);
  addTouchEvents(escButton, () => { return "Escape"; });
  
  buttonLine2.appendChild(rButton);
  buttonLine2.appendChild(rtButton);
  buttonLine3.appendChild(escButton);
  container.appendChild(buttonLine2);
  container.appendChild(buttonLine3);
  
  document.body.appendChild(container);
  
  const uiToolbar = document.querySelector(".ui-toolbar");
  Object.assign(uiToolbar.style, modConfig.styles.uiToolbar);
  
  const bottomContainer = document.createElement('div');
  Object.assign(bottomContainer.style, modConfig.styles.bottomContainer);
  bottomContainer.style.bottom = (uiToolbar.getBoundingClientRect().height + 40) + 'px';
  
  const tabButton = document.createElement('button');
  tabButton.innerText = 'Tab';
  Object.assign(tabButton.style, modConfig.styles.button);
  addTouchEvents(tabButton, () => { return "Tab"; });
  
  bottomContainer.appendChild(tabButton);
  document.body.appendChild(bottomContainer);
  
  const leftUpContainer = document.createElement('div');
  Object.assign(leftUpContainer.style, modConfig.styles.leftUpContainer);
  
  const pasteButton = document.createElement('button');
  pasteButton.innerText = 'PS';
  Object.assign(pasteButton.style, modConfig.styles.button);
  addTouchEvents(pasteButton, () => { return "KeyV"; });
  
  const copyButton = document.createElement('button');
  copyButton.innerText = 'CP';
  Object.assign(copyButton.style, modConfig.styles.button);
  addTouchEvents(copyButton, () => { return "KeyC"; });
  
  const fButton = document.createElement('button');
  fButton.innerText = 'F';
  Object.assign(fButton.style, modConfig.styles.button);
  addTouchEvents(fButton, () => { return "KeyF"; });
  
  // Appending buttons to leftUpContainer
  leftUpContainer.appendChild(pasteButton);
  leftUpContainer.appendChild(copyButton);
  leftUpContainer.appendChild(fButton);
  
  document.body.appendChild(leftUpContainer);
 
 
  leftUpContainer.appendChild(pasteButton)
  leftUpContainer.appendChild(copyButton)
  leftUpContainer.appendChild(fButton)
  document.body.appendChild(leftUpContainer);
  
  document.querySelector(".ui-inventory").style.transform = "scale(2)"
 

}, 2000)
})();