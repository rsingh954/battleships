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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "2f3dfa564d6fda214d3c6212cfb98264.png");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const ship = __webpack_require__(6);

const gameboard = () => {
  let spaces = [];
  let ships = [];
  for (i = 0; i < 100; i++) {
    spaces.push({ coordinate: i, hasShipPart: false, hit: false });
  }

  let placeShip = (length, startingCoord, direction) => {
    let shipPartChecker = checkPlacementValidity(length, startingCoord, direction);
    console.log(shipPartChecker, length);
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

      // add dom manipulation here that shows message
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
    console.log('length: ', length, startingCoord, direction);
    for (i = 0; i < length; i++) {
      if (direction === 'horizontal' && (startingCoord + (i * 10)) < 100) {    //check if outside board
        if (spaces[startingCoord + (i * 10)].hasShipPart == false) {         //checking for occupancy
          shipPartChecker += 1;
        }
      } else if (direction === 'vertical' && (startingCoord + i) < 100) {
        if (spaces[startingCoord + (i)].hasShipPart == false &&               //check board occupancy
            ((startingCoord < 10 && (startingCoord + length - 1) < 10) ||     //check 1st column if outside of board
            (startingCoord > 9 && startingCoord.toString()[0] ===             //check if other columns outside board
            (startingCoord + length - 1).toString()[0]))) {
          shipPartChecker += 1;
        }
      }
    }

    return shipPartChecker;
  };

  return {
    spaces,
    placeShip,
    ships,
    receiveAttack,
    checkIfAllSunk,
  };
};

module.exports = gameboard;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "c227e3d130248bceffdc67ece1725486.png");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "27587854664d182b8567713e6b834251.png");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "b01796ec6649891880f119c105beb1f2.png");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "f565c4b5f2c3ded13332ae4b8f7aa018.png");

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const gameboard = __webpack_require__(1);

const player = () => {
  let randomCoord;

  // let gotcha = false;
  let attack = (enemyBoard, coord) => {
    if (enemyBoard.spaces[coord].hit === false) {
      enemyBoard.receiveAttack(coord);

      // gotcha = true;
    }
  };

  let autoPlaceShips = (board) => {
    const directions = ['horizontal', 'vertical'];
    const lengths = [2, 3, 3, 4, 5];
    lengths.forEach((length, i) => {
      while (board.ships.length <= i) {
        board.placeShip(length, Math.floor(Math.random() * 100), directions[Math.round(Math.random())]);
      }
    });
  };

  // let triangulate = () => {
  //   let shipMayBeHere = false;
  //   if (gotcha === true) {
  //
  //   }
  //   return shipMayBeHere;
  // };

  return {
    attack,
    autoPlaceShips,
  };
};

module.exports = player;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const player = __webpack_require__(7);
const gameboard = __webpack_require__(1);
const beginGame = __webpack_require__(15);

const gameSetup = () => {
  const myBoard = document.getElementById('my-board');
  const mySpaces = Array.from(document.getElementsByClassName('my-space'));
  let computer = player();
  let human = player();
  let computerBoard = gameboard();
  let humanBoard = gameboard();
  let shipTypes = ['carrier', 'battleship', 'destroyer', 'submarine', 'patrolboat'];

  let suffix = '';
  let direction = 'horizontal';
  computer.autoPlaceShips(computerBoard);
  console.log(computerBoard.spaces);

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
      beginGame(computer, human, computerBoard, humanBoard);
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

  return {
    placeShips,
  };
};

module.exports = gameSetup;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_gameboard_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ship_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_player_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _game_setup_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _game_setup_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_game_setup_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assets_carrier_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2);
/* harmony import */ var _assets_battleship_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3);
/* harmony import */ var _assets_destroyer_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(0);
/* harmony import */ var _assets_submarine_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4);
/* harmony import */ var _assets_patrolboat_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5);
/* harmony import */ var _assets_fire_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(16);
/* harmony import */ var _assets_water_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(17);













let setup = _game_setup_js__WEBPACK_IMPORTED_MODULE_4___default()();
setup.placeShips();

// check why all computer ships are vertical


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(11);
            var content = __webpack_require__(12);

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
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(13);
var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(14);
var ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(2);
var ___CSS_LOADER_URL_IMPORT_1___ = __webpack_require__(3);
var ___CSS_LOADER_URL_IMPORT_2___ = __webpack_require__(0);
var ___CSS_LOADER_URL_IMPORT_3___ = __webpack_require__(4);
var ___CSS_LOADER_URL_IMPORT_4___ = __webpack_require__(5);
var ___CSS_LOADER_URL_IMPORT_5___ = __webpack_require__(16);
var ___CSS_LOADER_URL_IMPORT_6___ = __webpack_require__(17);
exports = ___CSS_LOADER_API_IMPORT___(false);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_6___);
// Module
exports.push([module.i, "body{box-sizing:border-box}img{border:1px solid white}.container{width:850px;margin:0 auto}.container #status{width:600px;font-family:sans-serif;text-align:center;font-size:36px;border:1px solid red;margin:10px auto 20px auto}.container .my-board,.container .enemy-board{display:flex;flex-direction:column-reverse;flex-wrap:wrap}.container .my-board{height:35.7vh;width:35.9vh;border:2px solid #318499;min-height:260px;min-width:260px;position:relative}.container .my-board .my-space{height:3.5vh;width:3.5vh;border-right:0.5px solid #318499;border-bottom:0.5px solid #318499;min-height:25.5px;min-width:25.5px;position:relative}.container .my-board .carrier,.container .my-board .battleship,.container .my-board .destroyer,.container .my-board .submarine,.container .my-board .patrolboat{min-height:25.5px;height:3.5vh;z-index:100 !important;overflow:visible;background-repeat:no-repeat;background-size:100% 100%}.container .my-board .carrier:active,.container .my-board .battleship:active,.container .my-board .destroyer:active,.container .my-board .submarine:active,.container .my-board .patrolboat:active{background:grey}.container .my-board .carrier{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");width:17.5vh;min-width:127.5px}.container .my-board .battleship{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");width:14vh;min-width:102px}.container .my-board .destroyer,.container .my-board .submarine{width:10.5vh;min-width:76.5px}.container .my-board .destroyer{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ")}.container .my-board .submarine{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ")}.container .my-board .patrolboat{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ");width:7vh;min-width:51px}.container .my-board .vert{z-index:100 !important;overflow:visible;background-repeat:no-repeat;background-size:100% 100%;transform:translate(10%, 35%) rotate(-90deg);transform-origin:left}.container .enemy-board-wrapper{display:flex;width:100%}.container .enemy-board-wrapper .shrinker{width:35.9vh;flex-shrink:2;min-width:260px}.container .enemy-board-wrapper .enemy-board{height:54.48vh;width:55vh;border:2px solid #743c3c;min-height:400px;min-width:400px}.container .enemy-board-wrapper .enemy-board .setup-instruction-container{background:white;height:54.48vh;width:55vh;position:absolute;z-index:100;min-height:400px;min-width:400px}.container .enemy-board-wrapper .enemy-board .setup-instruction{width:80%;margin:50px auto;text-align:center;font-family:sans-serif}.container .enemy-board-wrapper .enemy-board .enemy-space{height:5.38vh;width:5.38vh;border-right:0.5px solid #743c3c;border-bottom:0.5px solid #743c3c;min-height:39.5px;min-width:39.5px;position:relative}.container .enemy-board-wrapper .enemy-board .enemy-space:hover{background:rgba(116,60,60,0.2)}.my{height:3.5vh;width:3.5vh;min-height:25.5px;min-width:25.5px}.enemy{height:5.38vh;width:5.38vh;min-height:39.5px;min-width:39.5px}.fire,.water{background-size:100% 100%;background-repeat:no-repeat;position:absolute;top:0;left:0}.fire{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ")}.water{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ")}@media all and (max-width: 1024px){.container{width:80vw}.shrinker{flex-shrink:4;min-width:0 !important}.enemy-board{flex-shrink:0}}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 13 */
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
/* 14 */
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

const player = __webpack_require__(7);
const gameboard = __webpack_require__(1);

const beginGame = (computerPlayer, humanPlayer, computerBoard, humanBoard) => {
  const mySpaces = Array.from(document.getElementsByClassName('my-space'));
  const enemySpaces = Array.from(document.getElementsByClassName('enemy-space'));
  const setupInstruction = document.getElementById('setup-instruction');
  const status = document.getElementById('status');
  let coordsForRandom = [];
  for (i = 0; i < 100; i++) {
    coordsForRandom.push(i);
  }

  status.textContent = 'OK, let\'s start! It\'s your turn to attack';
  setupInstruction.style.display = 'none';
  console.log('my ships are: ', humanBoard.spaces);

  const humanPlay = () => {
    enemySpaces.forEach((enemySpace) => {
      enemySpace.addEventListener('click', placeAttack);
    });
    let endGame = computerBoard.checkIfAllSunk();
    if (endGame) {
      win('human', 'Congrats! ');
    }
  };

  const placeAttack = (e) => {
    let enemySpaceIndex = enemySpaces.indexOf(e.currentTarget);
    humanPlayer.attack(computerBoard, enemySpaceIndex);
    showAttack(computerBoard, 'enemy', enemySpaceIndex, e.currentTarget);
    console.log('you hit ', enemySpaceIndex);
    enemySpaces[enemySpaceIndex].removeEventListener('click', placeAttack);
    status.textContent = 'computer plays...';
    computerPlay();
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

  const computerPlay = () => {
    randomPick = Math.floor(Math.random() * 100);
    if (coordsForRandom[randomPick] === 'done') {
      computerPlay();
    } else {
      computerPlayer.attack(humanBoard, coordsForRandom[randomPick]);
      coordsForRandom.splice(randomPick, 1, 'done');
      mySpaces[randomPick].removeEventListener('click', placeAttack);
      showAttack(humanBoard, 'my', randomPick, mySpaces[randomPick]);
      let endGame = humanBoard.checkIfAllSunk();
      if (endGame) {
        win('computer', '');
      }

      status.textContent = 'computer played, your turn again';
      console.log('comp hit ', randomPick);
    }
  };

  const win = (player, wish) => {
    enemySpaces.forEach((enemySpace) => {
      enemySpace.removeEventListener('click', placeAttack);
    });
    status.textContent = `${player} wins! ${wish}Wanna play again?`;
  };

  humanPlay();
};

module.exports = beginGame;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "1be19b25ea4bc9bd255e6b5c64745ba7.png");

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "6c667d2c922ab392f8bf874db196dac1.png");

/***/ })
/******/ ]);