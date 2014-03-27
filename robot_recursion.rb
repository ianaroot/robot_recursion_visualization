BOARD = [
          [1,1,1],
          [1,1,1],
          [1,1,1],
          [1,1,1],
          [1,1,1]
        ]


def find_paths(x, y, goal)
  moves = []
  return check(x, y, goal, 1, moves, "")
end

def check(x, y, goal, i, axis, cell_history)
  cell_history = cell_history
  puts
  puts "cell_history is #{cell_history}"
  puts "last move was on the #{axis} axis"
  puts "i is #{i}"
  i += 1
  puts "#{x}, #{y}"
  # if !cell_history.include?([#{y},#{x}])
  if cell_history.include?("#{y},#{x}") || x < 0 || y < 0
    return 0
  elsif [x, y] == goal
    cell_history += "[#{y},#{x}]"
    puts "goal"
    1
  elsif BOARD[x] && BOARD[x][y]
    cell_history += "[#{y},#{x}]"
    puts "still looking"
    return check(x+1, y, goal, i, "x", cell_history) + check(x, y + 1, goal, i, "y", cell_history) + check(x - 1, y, goal, i, "x", cell_history) + check(x, y - 1, goal, i, "y", cell_history)
  else
    cell_history += "[#{y},#{x}]"
    puts "wall"
    0
  end
  # else
  #   return 0
  # end
end

p find_paths(0,0, [(BOARD.length - 1),(BOARD[1].length - 1)])