/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const ship = __webpack_require__(1);

const gameboard = () => {
  let spaces = [];
  let ships = [];
  for (i = 0; i < 100; i++) {
    spaces.push({ coordinate: i, hasShipPart: false, hit: false });
  }

  let placeShip = (length, startingCoord, direction) => {
    let shipPartChecker = checkPlacementValidity(length, startingCoord, direction);
    if (shipPartChecker === length) {
      ships.push(ship(length, startingCoord, direction));
      spaces.forEach((space, i) => {
        for (j = 0; j < length; j++) {
          if (spaces[i].coordinate === ships[ships.length - 1].coordinates[j].coordinate) {
            spaces[i].hasShipPart = true;
          }
        }
      });
    } else {
      console.log('space occupied');
    }
  };

  let receiveAttack = coord => {
    spaces.forEach(space => {
      if (space.coordinate === coord) {
        space.hit = true;
        if (space.hasShipPart) {
          ships.forEach(ship => {
            ship.hit(coord);
          });
        }
      }
    });
  };

  const checkIfAllSunk = () => ships.every(ship => ship.isSunk());

  const checkPlacementValidity = (length, startingCoord, direction) => {
    let shipPartChecker = 0;
    for (i = 0; i < length; i++) {
      if (direction === 'horizontal' && (startingCoord + (i * 10)) < 100) {
        if (spaces[startingCoord + (i * 10)].hasShipPart == false) {
          shipPartChecker += 1;
        }
      } else if (direction === 'vertical' && (startingCoord + i) < 100) {
        if (spaces[startingCoord + (i)].hasShipPart == false &&
            ((startingCoord < 10 && (startingCoord + length - 1) < 10) ||
            (startingCoord > 9 && startingCoord.toString()[0] ===
            (startingCoord + length - 1).toString()[0]))) {
          shipPartChecker += 1;
        }
      }
    }

    return shipPartChecker;
  };

  const triangulate = (coord, board) => {
    let shipMayBeHere = [];
    let hitParts = [];
    let howManyHitsThisShipHas = 0;

    board.ships.forEach((ship) => {
      for (let i = 0; i < ship.coordinates.length; i++) {
        if (ship.coordinates[i].coordinate === coord) {
          ship.coordinates.forEach((coordinate) => {
            if (coordinate.hit) {
              howManyHitsThisShipHas += 1;
              hitParts.push(coordinate.coordinate);
            }
          });
        }
      }
    });
    console.log('howManyHitsThisShipHas: ', howManyHitsThisShipHas);
    console.log('hitParts: ', hitParts);
    if (howManyHitsThisShipHas === 1) {
      if (coord - 1 >= 0 && !board.spaces[coord - 1].hit) {
        if (coord < 10 || coord.toString()[1] !== '0') {
          shipMayBeHere.push((coord - 1));
        }
      }

      if (coord + 1 <= 99 && !board.spaces[coord + 1].hit) {
        if (coord < 9 || (coord > 9 && coord.toString()[1] !== '9'))
        shipMayBeHere.push((coord + 1));
      }

      if (coord - 10 >= 0 && !board.spaces[coord - 10].hit) {
        shipMayBeHere.push((coord - 10));
      }

      if (coord + 10 <= 99 && !board.spaces[coord + 10].hit) {
        shipMayBeHere.push((coord + 10));
      }
    } else if (howManyHitsThisShipHas > 1) {
      console.log('closing in!');
      if (hitParts[0] === hitParts[1] + 10 || hitParts[0] === hitParts[1] - 10) {
        hitParts.forEach((hitPart) => {         //direction: horizontal
          if (hitPart - 10 >= 0 && !board.spaces[hitPart - 10].hit) {
            shipMayBeHere.push((hitPart - 10));
          }

          if (hitPart + 10 <= 99 && !board.spaces[hitPart + 10].hit) {
            shipMayBeHere.push((hitPart + 10));
          }
        });
      } else {
        hitParts.forEach((hitPart) => {           //direction: vertical
          if (hitPart - 1 >= 0 && !board.spaces[hitPart - 1].hit) {
            if (hitPart < 10 || hitPart.toString()[1] !== '0') {
              shipMayBeHere.push((hitPart - 1));
            }
          }

          if (hitPart + 1 <= 99 && !board.spaces[hitPart + 1].hit) {
            if (hitPart < 9 || (hitPart > 9 && hitPart.toString()[1] !== '9'))
            shipMayBeHere.push((hitPart + 1));
          }
        });

      }
    }

    console.log('ship may be here: ', shipMayBeHere);

    return shipMayBeHere;
  };

  return {
    spaces,
    placeShip,
    ships,
    receiveAttack,
    checkIfAllSunk,
    triangulate,
  };
};

module.exports = gameboard;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const ship = (length, startingCoord, direction) => {
  let coordinates = [{ coordinate: startingCoord, hit: false }];
  for (let i = 1; i < length; i++) {
    if (direction === 'horizontal') {
      coordinates.push({
        coordinate: coordinates[coordinates.length - 1].coordinate + 10,
        hit: false,
      });
    } else {
      coordinates.push({
        coordinate: coordinates[coordinates.length - 1].coordinate + 1,
        hit: false,
      });
    }
  }

  const isSunk = () => coordinates.every(coordinate => coordinate.hit);

  const hit = (coord) => {
    let shipWasHit = false;
    coordinates.forEach((coordinate, i) => {
      if (coord === coordinate.coordinate) {
        shipWasHit = true;
        coordinates[i].hit = true;
      }
    });
    return shipWasHit;
  };

  return {
    shipLength: length,
    isSunk,
    coordinates,
    hit,
  };
};

module.exports = ship;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const gameboard = __webpack_require__(0);

const player = () => {
  let randomCoord;

  let attack = (attackedBoard, coord) => {
    if (attackedBoard.spaces[coord].hit === false) {
      attackedBoard.receiveAttack(coord);
    }
  };

  let autoPlaceShips = (board) => {
    const directions = ['horizontal', 'vertical'];
    const lengths = [2, 3, 3, 4, 5];
    lengths.forEach((length, i) => {
      while (board.ships.length <= i) {
        board.placeShip(length, Math.floor(Math.random() * 100),
         directions[Math.round(Math.random())]);
      }
    });
  };

  return {
    attack,
    autoPlaceShips,
  };
};

module.exports = player;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "c227e3d130248bceffdc67ece1725486.png");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "27587854664d182b8567713e6b834251.png");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "2f3dfa564d6fda214d3c6212cfb98264.png");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "b01796ec6649891880f119c105beb1f2.png");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "f565c4b5f2c3ded13332ae4b8f7aa018.png");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "1be19b25ea4bc9bd255e6b5c64745ba7.png");

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "2df37ba6f40446f4c94568d2ef78cd82.png");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "b6c73f6206ade62eeb5d8be8a9d53290.png");

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "e4b65858e0e6ce35e89209634eb41765.png");

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "99d725889e6c4314ce9271bbb7a6f846.png");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

const player = __webpack_require__(2);
const gameboard = __webpack_require__(0);
const beginGame = __webpack_require__(22);

const gameSetup = () => {
  const myBoard = document.getElementById('my-board');
  const restart = document.getElementById('restart');
  const status = document.getElementById('status');
  const win = document.getElementById('win');
  const fail = document.getElementById('fail');
  const setupInstruction = document.getElementById('setup-instruction');
  const mySpaces = Array.from(document.getElementsByClassName('my-space'));
  const enemySpaces = Array.from(document.getElementsByClassName('enemy-space'));
  let computer = player();
  let human = player();
  let computerBoard = gameboard();
  let humanBoard = gameboard();
  let shipTypes = ['carrier', 'battleship', 'destroyer', 'submarine', 'patrolboat'];

  let suffix = '';
  let direction = 'horizontal';
  computer.autoPlaceShips(computerBoard);
  restart.style.display = 'none';
  win.style.display = 'none';

  const placeShips = () => {
    for (i = 0; i < mySpaces.length; i++) {
      mySpaces[i].addEventListener('mouseover', hover);
      mySpaces[i].addEventListener('click', placeShip);
    }

    myBoard.addEventListener('wheel', changeDirection);
  };

  const hover = (e) => {
    let oldImg = document.getElementsByClassName('ship')[0];
    if (oldImg) {
      if (oldImg.parentElement !== e.currentTarget) {
        removeOldShip(oldImg);
        addNewShip(e);
      }
    } else {
      addNewShip(e);
    }
  };

  const removeOldShip = (oldImg) => {
    oldImg.parentElement.removeChild(oldImg);
  };

  const addNewShip = (event) => {
    let img = document.createElement('div');
    img.setAttribute('class', `ship ${shipTypes[0]} ${suffix}`);
    event.currentTarget.appendChild(img);
  };

  const placeShip = (e) => {
    let spaceIndex = mySpaces.indexOf(e.currentTarget);
    let shipType = shipTypes[0];
    let placedShipsNum = humanBoard.ships.length;

    if (shipType === 'carrier') {
      humanBoard.placeShip(5, spaceIndex, direction);
    } else if (shipType === 'battleship') {
      humanBoard.placeShip(4, spaceIndex, direction);
    } else if (shipType === 'destroyer') {
      humanBoard.placeShip(3, spaceIndex, direction);
    } else if (shipType === 'submarine') {
      humanBoard.placeShip(3, spaceIndex, direction);
    } else if (shipType === 'patrolboat') {
      humanBoard.placeShip(2, spaceIndex, direction);
    }

    if (humanBoard.ships.length > placedShipsNum) {
      let shipImage = document.createElement('div');
      shipImage.setAttribute('class', `${shipType} ${suffix}`);
      e.currentTarget.appendChild(shipImage);
      shipTypes.splice(0, 1);
    }

    if (shipTypes.length === 0) {
      mySpaces.forEach((mySpace) => {
        mySpace.removeEventListener('click', placeShip);
      });
      let round = beginGame(computer, human, computerBoard, humanBoard);
      if (round.win) {
        restart.addEventListener('click', reset);
      }
    }
  };

  const changeDirection = (event) => {
    if (event.wheelDelta < 0) {
      suffix = '';
      direction = 'horizontal';
    } else if (event.wheelDelta > 0) {
      suffix = 'vert';
      direction = 'vertical';
    }

    let img = document.getElementsByClassName('ship')[0];
    img.setAttribute('class', `ship ${shipTypes[0]} ${suffix}`);
  };

  const reset = () => {
    status.textContent = 'Place your ships!';
    mySpaces.forEach((mySpace) => {
      mySpace.innerHTML = '';
    });
    enemySpaces.forEach((enemySpace) => {
      enemySpace.innerHTML = '';
    });
    fail.style.display = 'none';
    win.style.display = 'none';
    restart.style.display = 'none';
    setupInstruction.style.display = 'block';
    shipTypes = ['carrier', 'battleship', 'destroyer', 'submarine', 'patrolboat'];
    humanBoard = gameboard();
    computerBoard = gameboard();
    computer.autoPlaceShips(computerBoard);
    placeShips();
  };

  return {
    placeShips,
  };
};

module.exports = gameSetup;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_gameboard_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ship_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_player_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _game_setup_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _game_setup_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_game_setup_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assets_carrier_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3);
/* harmony import */ var _assets_battleship_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4);
/* harmony import */ var _assets_destroyer_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5);
/* harmony import */ var _assets_submarine_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6);
/* harmony import */ var _assets_patrolboat_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7);
/* harmony import */ var _assets_fire_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8);
/* harmony import */ var _assets_water_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(9);
/* harmony import */ var _assets_fail_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(11);
/* harmony import */ var _assets_smoke_png__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(10);
/* harmony import */ var _assets_win_png__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(12);
















let setup = _game_setup_js__WEBPACK_IMPORTED_MODULE_4___default()();
setup.placeShips();

// TODO: add triangulation so that computer is not as stupid


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(16);
            var content = __webpack_require__(17);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(18);
var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(19);
var ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(20);
var ___CSS_LOADER_URL_IMPORT_1___ = __webpack_require__(21);
var ___CSS_LOADER_URL_IMPORT_2___ = __webpack_require__(3);
var ___CSS_LOADER_URL_IMPORT_3___ = __webpack_require__(4);
var ___CSS_LOADER_URL_IMPORT_4___ = __webpack_require__(5);
var ___CSS_LOADER_URL_IMPORT_5___ = __webpack_require__(6);
var ___CSS_LOADER_URL_IMPORT_6___ = __webpack_require__(7);
var ___CSS_LOADER_URL_IMPORT_7___ = __webpack_require__(8);
var ___CSS_LOADER_URL_IMPORT_8___ = __webpack_require__(9);
var ___CSS_LOADER_URL_IMPORT_9___ = __webpack_require__(10);
var ___CSS_LOADER_URL_IMPORT_10___ = __webpack_require__(11);
var ___CSS_LOADER_URL_IMPORT_11___ = __webpack_require__(12);
exports = ___CSS_LOADER_API_IMPORT___(false);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_6___);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_7___);
var ___CSS_LOADER_URL_REPLACEMENT_8___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_8___);
var ___CSS_LOADER_URL_REPLACEMENT_9___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_9___);
var ___CSS_LOADER_URL_REPLACEMENT_10___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_10___);
var ___CSS_LOADER_URL_REPLACEMENT_11___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_11___);
// Module
exports.push([module.i, "@font-face{font-family:'army';font-style:normal;src:url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ")}@font-face{font-family:'typewriter';font-style:normal;src:url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ")}body{background-image:url(\"https://i.pinimg.com/originals/51/30/1a/51301a71b27ae8176b58df9f296c50ac.jpg\");background-repeat:no-repeat;background-size:cover;box-sizing:border-box}img{border:1px solid white}.container{margin:0 auto;width:850px}#status{color:lightgrey;font-family:'army', sans-serif;font-size:36px;margin:10px auto 20px auto;text-align:center;width:600px}#restart{background:grey;border-radius:5px;font-family:'typewriter', sans-serif;font-size:28px;font-weight:bold;height:40px;margin:0 auto;width:150px}.top-wrapper{display:flex;flex-direction:column;margin:0 auto;width:600px}.my-board,.enemy-board{display:flex;flex-direction:column-reverse;flex-wrap:wrap}.my-board{background:#acceea;border:2px solid #286ba2;height:35.7vh;min-height:260px;min-width:260px;position:relative;width:35.9vh}.my-space{border-bottom:0.5px solid #286ba2;border-right:0.5px solid #286ba2;height:3.5vh;min-height:25.5px;min-width:25.5px;position:relative;width:3.5vh}.carrier,.battleship,.destroyer,.submarine,.patrolboat{background-repeat:no-repeat;background-size:100% 100%;height:3.5vh;min-height:25.5px;overflow:visible;z-index:100 !important}.carrier:active,.battleship:active,.destroyer:active,.submarine:active,.patrolboat:active{background:grey}.carrier{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");min-width:127.5px;width:17.5vh}.battleship{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");min-width:102px;width:14vh}.destroyer,.submarine{min-width:76.5px;width:10.5vh}.destroyer{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ")}.submarine{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ")}.patrolboat{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ");min-width:51px;width:7vh}.vert{background-repeat:no-repeat;background-size:100% 100%;overflow:visible;transform:translate(10%, 35%) rotate(-90deg);transform-origin:left;z-index:100 !important}.enemy-board-wrapper{display:flex;width:100%}.enemy-board-wrapper .shrinker{flex-shrink:2;min-width:260px;width:35.9vh}.enemy-board-wrapper .enemy-board{background:white;border:2px solid #743c3c;height:54.48vh;min-height:400px;min-width:400px;position:relative;width:55vh}.enemy-board-wrapper .enemy-board .setup-instruction-container{background:#595453;border:2px solid black;height:54.48vh;left:-2px;min-height:400px;min-width:400px;position:absolute;top:-2px;width:55vh;z-index:100}.enemy-board-wrapper .enemy-board .setup-instruction{margin:10px auto;text-align:left;width:80%}.enemy-board-wrapper .enemy-board h1{font-family:'army', sans-serif;font-size:3vh;text-align:center}.enemy-board-wrapper .enemy-board .info{margin:8px 0}.enemy-board-wrapper .enemy-board .info,.enemy-board-wrapper .enemy-board .ship-name{font-family:'typewriter';font-size:2.3vh;font-weight:bold}.enemy-board-wrapper .enemy-board .boats{background:grey;border:2px solid rgba(89,84,83,0.74);border-radius:5px;margin:0 auto;position:relative;width:300px}.enemy-board-wrapper .enemy-board .ship-name,.enemy-board-wrapper .enemy-board .type{display:inline-block;margin:0;position:relative}.enemy-board-wrapper .enemy-board .ship-name{bottom:10px;font-size:20px}.enemy-board-wrapper .enemy-board .enemy-space{border-bottom:0.5px solid #743c3c;border-right:0.5px solid #743c3c;height:5.38vh;min-height:39.5px;min-width:39.5px;position:relative;width:5.38vh}.enemy-board-wrapper .enemy-board .enemy-space:hover{background:rgba(116,60,60,0.2)}.my{height:3.5vh;min-height:25.5px;min-width:25.5px;width:3.5vh}.enemy{height:5.38vh;min-height:39.5px;min-width:39.5px;width:5.38vh}.fire,.water,.smoke{background-repeat:no-repeat;background-size:100% 100%;left:0;position:absolute;top:0}.fire{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + ")}.water{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ")}.smoke{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_9___ + ")}@media all and (max-width: 1024px){.container{width:80vw}.shrinker{flex-shrink:4;min-width:0 !important}.enemy-board{flex-shrink:0}}@media all and (max-width: 500px){h1{font-size:24px !important}.info{font-size:16px !important}}#fail{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_10___ + ");background-size:100% 100%;border:2px solid #286ba2;display:none;height:35.7vh;left:0;min-height:260px;min-width:260px;position:absolute;top:0;width:35.9vh;z-index:999999}#win{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_11___ + ");background-repeat:no-repeat;background-size:100% auto;height:100%;left:0;position:absolute;top:0;width:100%;z-index:999999}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, '\\n'), "\"");
  }

  return url;
};

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "05782b20052d5dccbad3bbda77571aa8.ttf");

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "1f8a446f5a562edf4ae817b9af0b7c03.ttf");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

const player = __webpack_require__(2);
const gameboard = __webpack_require__(0);
const ship = __webpack_require__(1);

const beginGame = (computerPlayer, humanPlayer, computerBoard, humanBoard) => {
  const mySpaces = Array.from(document.getElementsByClassName('my-space'));
  const enemySpaces = Array.from(document.getElementsByClassName('enemy-space'));
  const setupInstruction = document.getElementById('setup-instruction');
  const status = document.getElementById('status');
  const enemyBoard = document.getElementById('enemy-board');
  const restart = document.getElementById('restart');

  let endGame;
  let oldAttackIndex;
  let currentAttackIndex;
  let randomPick;
  let coordsForRandom = [];
  for (i = 0; i < 100; i++) {
    coordsForRandom.push(i);
  }

  let shipMayBeHere = coordsForRandom;
  let activePursuit = false;

  status.textContent = 'OK, you start. Attack!';
  setupInstruction.style.display = 'none';

  const humanPlay = () => {
    enemySpaces.forEach((enemySpace) => {
      enemySpace.addEventListener('click', placeAttack);
    });
  };

  const placeAttack = (e) => {
    let enemySpaceIndex = enemySpaces.indexOf(e.currentTarget);
    humanPlayer.attack(computerBoard, enemySpaceIndex);
    showAttack(computerBoard, 'enemy', enemySpaceIndex, e.currentTarget);
    enemySpaces[enemySpaceIndex].removeEventListener('click', placeAttack);
    markSunkShip(enemySpaceIndex);
    endGame = computerBoard.checkIfAllSunk();
    if (endGame) {
      win('You win! Congrats!');
    } else {
      computerPlay();
    }
  };

  const showAttack = (attackedBoard, attackedClassName, coord, attackedDiv) => {
    let resultOfAttack = document.createElement('div');
    if (attackedBoard.spaces[coord].hasShipPart) {
      resultOfAttack.setAttribute('class', `${attackedClassName} fire`);
    } else {
      resultOfAttack.setAttribute('class', `${attackedClassName} water`);
    }

    attackedDiv.appendChild(resultOfAttack);
  };

  const markSunkShip = (index) => {
    computerBoard.ships.forEach((ship) => {
      for (let i = 0; i < ship.coordinates.length; i++) {
        if (ship.coordinates[i].coordinate === index) {
          if (ship.isSunk()) {
            ship.coordinates.forEach((coordinate) => {
              let hitIndex = coordinate.coordinate;
              enemySpaces[hitIndex].childNodes[0].setAttribute('class', 'enemy smoke');
            });
          }
        }
      }
    });
  };

  const computerPlay = () => {
    if (!activePursuit) {    //no active hit
      randomCompPlay();
    } else {             //if SMBH is taken from triangulate, i.e. activepursuit
      activePursuitPlay();
    }

    console.log('active pursuit is active: ', activePursuit +
    ', and these are possible places where the ship is: ', shipMayBeHere);
    endGame = humanBoard.checkIfAllSunk();
    if (endGame) {
      win('computer wins!');
    } else {
      status.textContent = 'enemy\'s quick, your turn again';
    }
  };

  const randomCompPlay = () => {
    randomPick = Math.floor(Math.random() * 100);
    if (coordsForRandom[randomPick] === 'done') {
      computerPlay();
    } else {
      computerPlayer.attack(humanBoard, shipMayBeHere[randomPick]);
      coordsForRandom.splice(randomPick, 1, 'done');
      if (humanBoard.spaces[randomPick].hasShipPart) { //virgin hit!
        shipMayBeHere = humanBoard.triangulate(randomPick, humanBoard);
        oldAttackIndex = randomPick;
        activePursuit = true;  //don't have to check if sunk, it's the 1st hit
      } else {
        shipMayBeHere = coordsForRandom;   //continue state of inactivepursuit
      }

      mySpaces[randomPick].removeEventListener('click', placeAttack);
      showAttack(humanBoard, 'my', randomPick, mySpaces[randomPick]);
    }
  };

  const activePursuitPlay = () => {
    smartAttack();
    if (shipWasHit()) {
      if (checkIfSunk(currentAttackIndex)) {
        activePursuit = false;
        shipMayBeHere = coordsForRandom;
        checkIfAdjacentShipHitDuringTriangulation();
      } else {
        shipMayBeHere = humanBoard.triangulate(currentAttackIndex, humanBoard);
      }
    } else {
      shipMayBeHere = humanBoard.triangulate(oldAttackIndex, humanBoard);
    }

    showAttack(humanBoard, 'my', currentAttackIndex, mySpaces[currentAttackIndex]);
  };

  const smartAttack = () => {
    randomPick = Math.floor(Math.random() * shipMayBeHere.length);
    currentAttackIndex = shipMayBeHere[randomPick];
    computerPlayer.attack(humanBoard, currentAttackIndex);
    coordsForRandom.splice(shipMayBeHere[randomPick], 1, 'done');
  };

  const shipWasHit = () => humanBoard.spaces[currentAttackIndex].hasShipPart;

  const checkIfSunk = (index) => {
    let hitShip = findHitShip(index);
    return hitShip.isSunk();
  };

  const findHitShip = (index) => {
    let hitShip = humanBoard.ships.find(ship => {
      let hasMatchingCoordinate = false;
      ship.coordinates.forEach((coord) => {
        if (coord.coordinate === index) {
          hasMatchingCoordinate = true;
        }
      });
      return hasMatchingCoordinate;
    });
    return hitShip;
  };

  const checkIfAdjacentShipHitDuringTriangulation = () => {
    let adjacentShipIndices = [];
    humanBoard.spaces.forEach((space) => {
      if (space.hit && space.hasShipPart) {
        adjacentShipIndices.push(space.coordinate);
      }
    });
    let adjacentShipIndex = adjacentShipIndices.find(index => !checkIfSunk(index));
    console.log('index of the stray ship: ', adjacentShipIndex);
    if (adjacentShipIndex !== undefined) {
      activePursuit = true;
      shipMayBeHere = humanBoard.triangulate(adjacentShipIndex, humanBoard);
    }
  };

  const win = (player) => {
    restart.style.display = 'block';
    if (player === 'computer wins!') {
      let fail = document.getElementById('fail');
      fail.style.display = 'block';
    } else {
      let win = document.getElementById('win');
      win.style.display = 'block';
    }

    status.textContent = `${player} Play again?`;
    enemySpaces.forEach((enemySpace) => {
      enemySpace.removeEventListener('click', placeAttack);
    });

    return true;
  };

  humanPlay();
  return {
    win,
  };
};

module.exports = beginGame;


/***/ })
/******/ ]);