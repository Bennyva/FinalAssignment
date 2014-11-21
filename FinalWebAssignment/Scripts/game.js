﻿/// <reference path="constants.ts" />
/// <reference path="managers/asset.ts" />
/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/Diver.ts" />
/// <reference path="objects/bubble.ts" />
/// <reference path="objects/shark.ts" />
/// <reference path="objects/ocean.ts" />
/// <reference path="objects/scoreboard.ts" />
/// <reference path="states/play.ts" />
/// <reference path="states/menu.ts" />
/// <reference path="states/gameover.ts" />
/*
*Source File Name: game.ts
*Author:Benjamin Vanarragon
*Last Modified: Nov 13th, 2014
*Last Author: Benjamin Vanarragon
*Decsription: This is the "main method" that runs the game and loops through the updates at 60 fps
*
*/
var canvas;
var game;
var context;
var width;
var height;
var player;
var MAP = { tw: 64, th: 48 }, TILE = 32, METER = TILE, GRAVITY = METER * 9.8 * 6, MAXDX = METER * 60, ACCEL = MAXDX * 2, FRICTION = MAXDX * 6, JUMP = METER * 1500;

// game objects
var Diver;
var bubble;
var clouds = [];
var ocean;
var scoreboard;

var currentState;
var currentStateFunction;

// Preload function
function preload() {
    managers.Asset.init();
    managers.Asset.loader.addEventListener("complete", init);
}

//initializes the game, called from index.html
function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');
    width = canvas.width = MAP.tw * TILE, height = canvas.height = MAP.th * TILE, player = { x: 320, y: 320, dx: 0, dy: 0 };

    canvas.enableMouseOver(20);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", gameLoop);

    currentState = constants.MENU_STATE;
    changeState(currentState);

    gameStart();
}

// Game Loop
function gameLoop(event) {
    //changeState(currentState);
    currentStateFunction();
    canvas.update();
}

//switches the states of the game
function changeState(state) {
    switch (state) {
        case constants.MENU_STATE:
            currentStateFunction = states.menuState;
            states.Menu();
            break;
        case constants.PLAY_STATE:
            currentStateFunction = states.playState;
            states.Play();
            break;
        case constants.GAME_OVER_STATE:
            currentStateFunction = states.gameOverState;
            states.GameOver();
            break;
        case constants.INSTRUCTIONS_STATE:
            currentStateFunction = states.instructionState;
            states.instruction();
            break;
    }
}

//used in collision detection
function distance(point1, point2) {
    var p1;
    var p2;
    var theXs;
    var theYs;
    var result;

    p1 = new createjs.Point();
    p2 = new createjs.Point();

    p1.x = point1.x;
    p1.y = point1.y;
    p2.x = point2.x;
    p2.y = point2.y;

    theXs = p2.x - p1.x;
    theYs = p2.y - p1.y;

    theXs = theXs * theXs;
    theYs = theYs * theYs;

    result = Math.sqrt(theXs + theYs);

    return result;
}

// Check Collision with Diver and Bubble
function diverAndBubble() {
    var p1 = new createjs.Point();
    var p2 = new createjs.Point();

    p1.x = Diver.x;
    p1.y = Diver.y;
    p2.x = bubble.x;
    p2.y = bubble.y;

    if (distance(p1, p2) <= ((Diver.height * 0.5) + (bubble.height * 0.5))) {
        createjs.Sound.play("pop");
        scoreboard.score += 100;
        bubble.reset();
    }
}

// Check Collision with Diver and Shark
function diverAndShark(theShark) {
    var p1 = new createjs.Point();
    var p2 = new createjs.Point();

    p1.x = Diver.x;
    p1.y = Diver.y;
    p2.x = theShark.x;
    p2.y = theShark.y;

    if (distance(p1, p2) <= ((Diver.height * 0.5) + (theShark.height * 0.5))) {
        createjs.Sound.play("bite");
        scoreboard.lives -= 1;
        theShark.reset();
    }
}

//this calls the above collision check functions and loops through checking for collisions
function collisionCheck() {
    diverAndBubble();

    for (var count = 0; count < constants.SHARK_NUM; count++) {
        diverAndShark(clouds[count]);
    }
}

function gameStart() {
}
//# sourceMappingURL=game.js.map
