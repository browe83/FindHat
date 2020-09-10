const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this.field = field;
    this.x_axis = 0;
    this.y_axis = 0;
    this.currentlyPlaying = true;
  }
  print() {
    console.clear();
    this.field.forEach((r) => {
      console.log(r.join(""));
    });
  }
  promptUser() {
    const userMove = prompt("Which way?").toLowerCase().charCodeAt(0);
    this.evaluateUserMove(userMove);
  }
  // evaluates user input to determine which move method to call.
  evaluateUserMove(userMove) {
    switch (userMove) {
      case 114:
        this.moveRight();
        break;
      case 108:
        this.moveLeft();
        break;
      case 117:
        this.moveUp();
        break;
      case 100:
        this.moveDown();
        break;
      default:
        this.currentlyPlaying = false;
        console.log("Invalid move.");
    }
  }
  //Evaluates userMove to determine if move is valid.
  //Valid moves are those to indexes with pathCharacters.
  //Invalid moves are to holes or out-of-bounds.
  isValidMove() {
    if (
      this.x_axis > this.field[0].length ||
      this.x_axis < 0 ||
      this.y_axis > this.field.length ||
      this.y_axis < 0
    ) {
      this.gameOver("out-of-bounds");
    } else if (this.field[this.y_axis][this.x_axis] === hole) {
      this.gameOver("hole");
    } else {
      return true;
    }
  }
  //Updates currentPlayerPosition by adding one to second bracket index.
  moveRight() {
    this.x_axis++;
    if (this.isValidMove()) {
      if (this.checkForWin()) {
        this.gameOver("win");
      } else {
        this.field[this.y_axis][this.x_axis] = pathCharacter;
        this.playField();
      }
    }
  }
  moveLeft() {
    this.x_axis--;
    if (this.isValidMove()) {
      if (this.checkForWin()) {
        this.gameOver("win");
      } else {
        this.field[this.y_axis][this.x_axis] = pathCharacter;
        this.playField();
      }
    }
  }
  moveUp() {
    this.y_axis--;
    if (this.isValidMove()) {
      if (this.checkForWin()) {
        this.gameOver("win");
      } else {
        this.field[this.y_axis][this.x_axis] = pathCharacter;
        this.playField();
      }
    }
  }
  moveDown() {
    this.y_axis++;
    if (this.isValidMove()) {
      if (this.checkForWin()) {
        this.gameOver("win");
      } else {
        this.field[this.y_axis][this.x_axis] = pathCharacter;
        this.playField();
      }
    }
  }
  playField() {
    while (this.currentlyPlaying) {
      this.print();
      this.promptUser();
      this.playField();
    }
  }

  checkForWin() {
    if (this.field[this.y_axis][this.x_axis] === hat) {
      return true;
    } else {
      return false;
    }
  }

  gameOver(status) {
    this.currentlyPlaying = false;
    if (status === "win") {
      console.log("Congrats! You found your hat!");
    } else if (status === "out-of-bounds") {
      console.log("Out of bounds!");
    } else if (status === "hole") {
      console.log("You fell in a hole!");
    }
  }
  static generateField(height, width, percent) {
    const fieldArr = [];
    let hatX = Math.floor(Math.random() * height);
    let hatY = Math.floor(Math.random() * width);
    for (let i = 0; i < height; i++) {
      fieldArr.push([]);
      for (let j = 0; j < width; j++) {
        const randNum = Math.floor(Math.random() * 101);
        if (randNum > percent) {
          fieldArr[i].push(fieldCharacter);
        } else {
          fieldArr[i].push(hole);
        }
      }
    }
    fieldArr[0][0] = pathCharacter;
    while (hatY === 0 && hatX === 0) {
      hatX = Math.floor(Math.random() * height);
      hatY = Math.floor(Math.random() * width);
    }
    fieldArr[hatY][hatX] = hat;
    return fieldArr;
  }
}

// const myField = new Field([
//   ["*", "░", "O"],
//   ["░", "O", "░"],
//   ["░", "^", "░"],
//   ["░", "O", "░"],
// ]);

const myField = new Field(Field.generateField(8, 6, 25));
myField.playField();
