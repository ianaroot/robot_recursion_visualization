var Robot = {
  initialize: function(){
    this.x = 0,
    this.y = 0
    this.delay = 0
    return this
  },
  checkPosition: function(x, y, board, callback){
    if (callback){
      callback()
    }
    x = x,
    y = y
    // console.log(board)
    console.log(x)
    console.log(y)
    console.log()
    if (x === board.goal[0] && y === board.goal[1]) {
      console.log("found the goal!")
      this.animate(x,y, "blue")
      return 1
    }
    else if (board[y] && board[y][x]) {
      console.log("still lookin")
      this.animate(x,y, "lightBlue")
      this.animate(x,y,"white")
      var thiz = this
      var callback = function(){
        thiz.animate(x,y,"white")
      }
      return (this.checkPosition(x +1, y, board, callback) + this.checkPosition(x, y + 1, board))
    }
    else {
      console.log("hit the wall")  
      return 0
    }
  },
  numberOfPathsToGoal: function(board){
    return this.checkPosition(0, 0, board)
  },
  animate: function(x,y, color){
    // if (board[y] && board[y][x]) {
      var cell = document.getElementById(y + ',' + x)

      // var cell = document.getElementById('2,2')
      console.log(cell)
      // cell.style.backgroundColor="blue" 
      this.delay += 400
      setTimeout(setColor, this.delay, cell, color)
    // }
  }
}

var Board = {
  initialize: function(width, height){
    var board = new Array();
    for (i = 0; i < height; i ++) {
      board[i] = new Array();
      for (j = 0; j < width; j ++) {
        board[i][j] = 1
      }
    }
    board.goal = [width - 1, height - 1]
    return board
  }
}

function setColor(element, color){
  element.style.backgroundColor=color
}

var board = Board.initialize(5,3)

var bot = Robot.initialize()
