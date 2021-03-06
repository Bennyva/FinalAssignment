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
var game: createjs.Container;
var context;
var width;
var height;
var player;
var MAP = { tw: 64, th: 48 }, TILE = 32, METER = TILE, GRAVITY = METER * 9.8 * 6, MAXDX = METER * 60, ACCEL = MAXDX * 2, FRICTION = MAXDX * 6, JUMP = METER * 1500;

// game objects
var Diver: objects.Diver;
var bubble: objects.Bubble;
var clouds = [];
var ocean: objects.Ocean;
var scoreboard: objects.Scoreboard;

var currentState: number;
var currentStateFunction;



// Preload function
function preload(): void {
    managers.Asset.init();
    managers.Asset.loader.addEventListener("complete", init);
    
}
//initializes the game, called from index.html
function init(): void {
    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');
    width = canvas.width = MAP.tw * TILE,
    height = canvas.height = MAP.th * TILE,
    player = { x: 320, y: 320, dx: 0, dy: 0 };

    canvas.enableMouseOver(20);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", gameLoop);

    currentState = constants.MENU_STATE;
    changeState(currentState);


    gameStart();


}

var t2p = function (t) { return t * TILE; },
    p2t = function (p) { return Math.floor(p / TILE); }

var COLOR = { BLACK: '#000000', YELLOW: '#ECD078', BRICK: '#D95B43', PINK: '#C02942', PURPLE: '#542437', GREY: '#333', SLATE: '#53777A' },
    COLORS = [COLOR.BLACK, COLOR.YELLOW, COLOR.BRICK, COLOR.PINK, COLOR.PURPLE, COLOR.GREY];

// Game Loop
function gameLoop(event): void {

    //changeState(currentState);
    currentStateFunction();
    canvas.update();



}
//switches the states of the game
function changeState(state: number) {

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
function distance(point1: createjs.Point, point2: createjs.Point):number {
    var p1: createjs.Point;
    var p2: createjs.Point;
    var theXs: number;
    var theYs: number;
    var result: number;

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
    var p1: createjs.Point = new createjs.Point();
    var p2: createjs.Point = new createjs.Point();

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
function diverAndShark(theShark: objects.Shark) {
    var p1: createjs.Point = new createjs.Point();
    var p2: createjs.Point = new createjs.Point();
    

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

function gameStart(): void {


    
}