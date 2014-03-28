
function Robot(){

  this.x = 0,
  this.y = 0,
  this.delay = 0

  this.checkPosition = function(x, y, board, cellHistory){
    var cellHistory
    if (!cellHistory) {
      cellHistory = ''
    }
    x = x,
    y = y
    if (cellHistory.indexOf("[" + y + "," + x + "]") == -1) {
      cellHistory += "[" + y + "," + x + "]"
      if (x === board.goal[0] && y === board.goal[1]) {
        
        this.animate(x,y, "blue")
        this.animate(x,y, "white")
        return 1
      }
      else if (board[y] && board[y][x]) {
        
        this.animate(x,y, "lightBlue")
        var valueFromRecursions =  (this.checkPosition(x +1, y, board, cellHistory) + this.checkPosition(x, y + 1, board, cellHistory) + this.checkPosition(x - 1, y, board, cellHistory) + this.checkPosition(x, y - 1, board, cellHistory))
        this.animate(x,y,"white")
        return valueFromRecursions
        }
      else {
        
        return 0
      }
    }
    else {
      return 0
    }

  },
  this.numberOfPathsToGoal = function(board){
    var pathNum = this.checkPosition(0, 0, board)
  },
  this.animate = function(x,y, color){
    // if (board[y] && board[y][x]) {
      var cell = document.getElementById(y + ',' + x)

      // var cell = document.getElementById('2,2')
      
      // cell.style.backgroundColor="blue" 
      this.delay += 130
      setTimeout(setBackground, this.delay, cell, color)
    // }
  }
}


Board = {
  initialize: function(width, height){
    this.matrix = new Array();
    for (i = 0; i < height; i ++) {
      this.matrix[i] = new Array();
      for (j = 0; j < width; j ++) {
        this.matrix[i][j] = 1
      }
    }
    this.matrix.goal = [width - 1, height - 1]
    return this
  },

  rowHtml: '<div class="row"></div>',

  cellBuilder: function(column, row){
    return  '<div class="cell" id="' + column + ',' + row +'"></div>'
  }
}

setBackground = function(element, color){
  if (color == "blue") {
    var results = document.getElementById('answer')
    var currentTotal = parseInt(results.innerHTML) + 1
    element.style.backgroundColor = "red"
    results.innerHTML = currentTotal
  }
  else if (color == "white") {
    element.style.backgroundColor = "white"
    element.style.backgroundImage = ""
  }
  else if (color == "lightBlue") {
    element.style.backgroundImage= 'url(7_Bradshaw1.jpg)'
  }
}



var board = Board.initialize(5,3)
var bot = new Robot

function buildGrid() {
  var gridWidth = parseInt(document.getElementById('grid-width-input').value)
  var gridHeight = parseInt(document.getElementById('grid-height-input').value)
  var board = Board.initialize(gridWidth, gridHeight)
  var grid = document.getElementById('grid')
  console.log(gridHeight)
  grid.innerHTML = ""
  for (var i = 0; i < gridHeight; i ++) {
    grid.innerHTML += board.rowHtml
  }
  rows = document.getElementsByClassName('row')
  for (var i = 0; i < gridHeight; i ++)
    for ( var j = 0; j < gridWidth; j ++) {
      rows[i].innerHTML += (board.cellBuilder(i,j))
    }
}

function runRecursion(){
  bot.numberOfPathsToGoal(board.matrix)
}

window.onload = function(){
  var gridSizeButton = document.getElementById('grid-size-submit')
  gridSizeButton.addEventListener("click", buildGrid, false)
  var startButton = document.getElementById('start')
  startButton.addEventListener("click", runRecursion, false)
  // bot.numberOfPathsToGoal(board.matrix)  

}