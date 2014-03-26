BOARD = [
          [1,1,1],
          [1,1,1],
          [1,1,1],
          [1,1,1],
          [1,1,1]
        ]


def find_paths(x, y, goal)
  moves = []
  return check(x, y, goal, 1, moves)
end

def check(x, y, goal, i, axis)
  puts
  puts "last move was on the #{axis} axis"
  puts "i is #{i}"
  i += 1
  puts "#{x}, #{y}"
  if [x, y] == goal
    puts "goal"
    1
  elsif BOARD[x] && BOARD[x][y]
    puts "still looking"
    return check(x+1, y, goal, i, "x") + check(x, y + 1, goal, i, "y")
  else
    puts "wall"
    0
  end
end

p find_paths(0,0, [(BOARD.length - 1),(BOARD[1].length - 1)])