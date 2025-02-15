var diceRollGameMode = "diceRollGameMode";
var chooseDiceOrderGameMode = "chooseDiceOrderGameMode";
var compareDiceRollsGameMode = "compareDiceRollsGameMode";
var gameMode = diceRollGameMode;
var validInput = "validInput";
var invalidInput = "invalidInput";
var inputValidation = validInput;

var randomNumberOnDice = [1, 2, 3, 4, 5, 6];

var currentPlayerDiceRolls = [];

var currentPlayer = 1;
var allPlayersScore = [];

//To generate a number from 1 to 6 for dice
var rollDice = function () {
  var randomNumberGenerated =
    randomNumberOnDice[Math.floor(Math.random() * randomNumberOnDice.length)];
  console.log("random number generated", randomNumberGenerated);
  return randomNumberGenerated;
};

// Roll for 2 numbers of dices and request for order of dices
var rollDiceForPlayer = function () {
  var numberOfDice = 0;
  while (numberOfDice < 2) {
    currentPlayerDiceRolls.push(rollDice());
    numberOfDice = numberOfDice + 1;
  }
  return (
    "Hello Player " +
    currentPlayer +
    "!<br><br>Your dice rolls are:<br>Dice 1: " +
    currentPlayerDiceRolls[0] +
    " and Dice 2: " +
    currentPlayerDiceRolls[1] +
    ".<br><br>Please proceed to input either '1' or '2' to choose the respective dice to be used as the first digit of your final value.<br><br>Choose wisely!"
  );
};

//Input validation
var getPlayerScore = function (playerInput) {
  var playerScore;
  if (playerInput != 1 && playerInput != 2) {
    inputValidation = invalidInput;
    return (
      "Invalid input! Please only input either '1' or '2' to choose the respective dice to be used as the first digit of your final value. Your dice rolls are:<br>Dice 1: " +
      currentPlayerDiceRolls[0] +
      " and Dice 2: " +
      currentPlayerDiceRolls[1] +
      " "
    );
  } else if (playerInput == 1) {
    inputValidation = validInput;
    playerScore = Number(
      String(currentPlayerDiceRolls[0]) + String(currentPlayerDiceRolls[1])
    );
  } else if (playerInput == 2) {
    inputValidation = validInput;
    playerScore = Number(
      String(currentPlayerDiceRolls[1]) + String(currentPlayerDiceRolls[0])
    );
  }
  allPlayersScore.push(playerScore);
  currentPlayerDiceRolls = [];
  return (
    "Player " +
    currentPlayer +
    " , you have chosen " +
    playerScore +
    " as your final value"
  );
};

var main = function (input) {
  console.log("Game mode when clicking submit button", gameMode);
  console.log(
    "Which current player when clicking submit button",
    currentPlayer
  );
  var myOutputMessage = "";
  if (gameMode == diceRollGameMode) {
    myOutputMessage = rollDiceForPlayer();
    gameMode = chooseDiceOrderGameMode;
    return myOutputMessage;
  }
  if (gameMode == chooseDiceOrderGameMode) {
    myOutputMessage = getPlayerScore(input);
    if (currentPlayer == 1 && inputValidation == validInput) {
      currentPlayer = 2;
      gameMode = diceRollGameMode;
      return myOutputMessage + "<br><br>Time for player 2 to play!";
    }

    if (currentPlayer == 2 && inputValidation == validInput) {
      gameMode = compareDiceRollsGameMode;
      return (
        myOutputMessage +
        "<br><br>Go ahead and click submit to calculate the scores!"
      );
    }
  }
  if (gameMode == compareDiceRollsGameMode) {
    myOutputMessage =
      "Player 1 score: " +
      allPlayersScore[0] +
      "<br>Player 2 score: " +
      allPlayersScore[1] +
      "";
    if (allPlayersScore[0] > allPlayersScore[1]) {
      myOutputMessage =
        myOutputMessage +
        "<br><br>Congratulations to Player 1! Better luck next round Player 2!";
    }
    if (allPlayersScore[1] > allPlayersScore[0]) {
      myOutputMessage =
        myOutputMessage +
        "<br><br>Congratulations to Player 2! Better luck next round Player 1!";
    }
    if (allPlayersScore[1] == allPlayersScore[0]) {
      myOutputMessage = myOutputMessage + "<br><br>Oops, it's a tie!";
    }
    return myOutputMessage;
  }
  return myOutputMessage;
};
