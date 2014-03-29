
function Robot(){

  this.x = 0,
  this.y = 0,
  this.delay = 0

  this.checkPosition = function(x, y, board, cellHistory, pic){
    var cellHistory
    var pic
    if (!cellHistory) {
      cellHistory = ''
    }
    x = x,
    y = y
    if (cellHistory.indexOf("[" + y + "," + x + "]") == -1) {
      cellHistory += "[" + y + "," + x + "]"
      if (x === board.goal[1] && y === board.goal[0]) {
        
        this.animate(x,y, "goal")
        this.animate(x,y, "white")
        return 1
      }
      else if (board[y] && board[y][x]) {
        
        this.animate(x,y, pic)
        var valueFromRecursions =  (this.checkPosition(x +1, y, board, cellHistory, "right") + this.checkPosition(x, y + 1, board, cellHistory, "down") + this.checkPosition(x - 1, y, board, cellHistory, "left") + this.checkPosition(x, y - 1, board, cellHistory, "up"))
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
  this.animate = function(x,y, pic){
    // if (board[y] && board[y][x]) {
      var cell = document.getElementById(y + ',' + x)

      // var cell = document.getElementById('2,2')
      
      // cell.style.backgroundColor="blue" 
      this.delay += 130
      setTimeout(setBackground, this.delay, cell, pic)
      if (pic == "goal") {
        this.delay +=300
      }
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
    this.matrix.goal = [height - 1, width - 1]
    return this
  },

  rowHtml: '<div class="row"></div>',

  cellBuilder: function(column, row){
    return  '<div class="cell" id="' + column + ',' + row +'"></div>'
  }
}

setBackground = function(element, pic){
  if (pic == "goal") {
    var results = document.getElementById('answer')
    var currentTotal = parseInt(results.innerHTML) + 1
    element.style.backgroundImage = 'url(goal_pic.jpg)'
    results.innerHTML = currentTotal
  }
  else if (pic == "white") {
    console.log("erasin' shit")
    element.style.backgroundImage = ""
    element.style.backgroundColor = "white"
  }
  else if (pic == "right") {
    console.log("walkin right")
    element.style.backgroundImage = 'url(walk_right_pic.jpg)'
  }
  else if (pic == "left") {
    console.log('walkin left')
    element.style.backgroundImage = 'url(walk_left_pic.jpg)'
  }
  else if (pic == "down") {
    element.style.backgroundImage = 'url(walk_down_pic.jpg)'
  }
  else if (pic == "up") {
    element.style.backgroundImage = 'url(walk_up_pic.jpg)'
  }
  else{ 
    element.style.backgroundImage = 'url(start_cell_pic.jpg)'
  }
}


var board = Board.initialize(5,5)
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
  var results = document.getElementById('answer')
  results.innerHTML = 0
  bot.delay = 0
  bot.numberOfPathsToGoal(board.matrix)

}
function switchCell(cell){
  if (!cell.className.indexOf("cell")){

    if (cell.id != "0,0" && cell.id != board.matrix.goal.toString()){

      var cellY = cell.id[0]
      var cellX = cell.id[2]
      console.log(cellY,cellX)
      if (cell.className.indexOf("off") != -1){
        cell.className = "cell"
        board.matrix[cellY][cellX] = 1
      }
      else
      {
        cell.className = "cell off"
        board.matrix[cellY][cellX] = 0
      }
    }
    else {
      alert("you can't turn off the that cell")
    }
  }
}

window.onload = function(){
  var gridSizeButton = document.getElementById('grid-size-submit')
  gridSizeButton.addEventListener("click", buildGrid, false)
  var startButton = document.getElementById('start')
  startButton.addEventListener("click", runRecursion, false)
  // bot.numberOfPathsToGoal(board.matrix)  
  var grid = document.getElementById('grid')
  grid.addEventListener('click', function(e){
    console.log(e.target.id[0])
    switchCell(e.target)
  })

}