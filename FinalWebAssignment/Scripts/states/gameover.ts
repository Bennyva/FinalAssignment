﻿/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/shark.ts" />
/// <reference path="../objects/bubble.ts" />
/// <reference path="../objects/ocean.ts" />
/// <reference path="../objects/Diver.ts" />

/*
    *Source File Name: gameover.ts
    *Author:Benjamin Vanarragon
    *Last Modified: Nov 13th, 2014
    *Last Author: Benjamin Vanarragon
    *Decsription: this is the game over state, everything here is what happens when the player dies. It shows final score and a play again button
    *
*/

module states {

    export function gameOverState() {
        ocean.update();
    }

    export function GameOver() {
        var gameOverText: createjs.Text;
        var ScoreText: createjs.Text;

        var playAgain;

        var playAgainIMG = new Image;
        playAgainIMG.src = "/assets/images/playAgain.png";
        game = new createjs.Container();

        ocean = new objects.Ocean(game);

        

        ScoreText = new createjs.Text(scoreboard.score.toString(), constants.GAME_FONT, constants.FONT_COLOUR);
        ScoreText.regX = ScoreText.getBounds().width * 0.5;
        ScoreText.regY = ScoreText.getBounds().height * 0.5;
        ScoreText.x = stage.canvas.width * 0.5;
        ScoreText.y = 180;
        game.addChild(ScoreText);


        playAgain = new createjs.Bitmap(playAgainIMG);
        playAgain.x = stage.canvas.width * 0.27;
        playAgain.y = stage.canvas.height * 0.6;
        game.addChild(playAgain);


        gameOverText = new createjs.Text("Game Over", constants.GAME_FONT, constants.FONT_COLOUR);
        gameOverText.regX = gameOverText.getBounds().width * 0.5;
        gameOverText.regY = gameOverText.getBounds().height * 0.5;
        gameOverText.x = stage.canvas.width * 0.5;
        gameOverText.y = stage.canvas.height * 0.5;
        game.addChild(gameOverText);

        playAgain.addEventListener("click", function (e) {
            stage.removeChild(game);
            game.removeAllChildren();
            game.removeAllEventListeners();
            currentState = constants.MENU_STATE;
            changeState(currentState);
        });

        stage.addChild(game);
    }

}   