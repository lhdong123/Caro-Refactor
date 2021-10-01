function calculateWinner (current) {
  let sizeLineToWin = 5
  const squares = current.squares.slice()
  const boardSize = current.boardSize

  //console.log(current.boardSize)
  // if (boardSize < 6) {
  //   sizeLineToWin = 3
  // }

  const newSquares = []
  while (squares.length) newSquares.push(squares.splice(0, boardSize))

  let line = []
  //Kiem tra hang ngang
  for (let i = 0; i < boardSize; i++) {
    let count = 0
    for (let j = 0; j < boardSize - 1; j++) {
      //console.log(newSquares[i][j]);
      if (
        newSquares[i][j] !== null &&
        newSquares[i][j] === newSquares[i][j + 1]
      ) {
        count = count + 1
      }

      if (
        newSquares[i][j] !== newSquares[i][j + 1] &&
        boardSize - (j + 1) < sizeLineToWin
      ) {
        break
      }

      //console.log("hallo")
      if (count === sizeLineToWin - 1) {
        for (let x = j + 1; x > j + 1 - sizeLineToWin; x--) {
          line.push(i * boardSize + x)
        }
        line.reverse()
        console.log(line)
        console.log(newSquares[i][j])
        return {
          line: line,
          winner: newSquares[i][j],
          isDraw: false
        }
      }
    }
  }

  line = []
  //Kiem tra hang doc
  for (let i = 0; i < boardSize; i++) {
    let count = 0
    for (let j = 0; j < boardSize - 1; j++) {
      if (
        newSquares[j][i] !== null &&
        newSquares[j][i] === newSquares[j + 1][i]
      ) {
        count = count + 1
      }

      if (
        newSquares[j][i] !== newSquares[j + 1][i] &&
        boardSize - (j + 1) < sizeLineToWin
      ) {
        break
      }
      if (count === sizeLineToWin - 1) {
        for (let x = j + 1; x > j + 1 - sizeLineToWin; x--) {
          line.push(x * boardSize + i)
        }
        line.reverse()
        return {
          line: line,
          winner: newSquares[j][i],
          isDraw: false
        }
      }
    }
  }

  line = []
  //Kiem tra hang cheo tu trai sang phai (tren xuong)
  for (let t = 1; t < boardSize; t++) {
    let i = 0
    //console.log('a');
    let j = t
    let count = 0
    while (i < boardSize - 1 && j >= 0) {
      if (
        newSquares[i][j] !== null &&
        newSquares[i][j] === newSquares[i + 1][j - 1]
      ) {
        count++
      }
      i++
      j--
      //console.log('a');
      if (count === sizeLineToWin - 1) {
        while (count >= 0) {
          line.push(i * boardSize + j)
          count--
          i--
          j++
        }

        line.reverse()
        return {
          line: line,
          winner: current.squares[line[0]],
          isDraw: false
        }
      }
    }
  }

  for (let t = 1; t < boardSize; t++) {
    let i = t
    //console.log('a');
    let j = boardSize - 1
    let count = 0
    while (i < boardSize - 1 && j >= 0) {
      //console.log("(%d,%d)",i,j)
      if (
        newSquares[i][j] !== null &&
        newSquares[i][j] === newSquares[i + 1][j - 1]
      ) {
        count++
      }
      i++
      j--
      if (count === sizeLineToWin - 1) {
        while (count >= 0) {
          line.push(i * boardSize + j)
          count--
          i--
          j++
        }

        line.reverse()
        return {
          line: line,
          winner: current.squares[line[0]],
          isDraw: false
        }
      }
    }
  }

  //Kiem tra hang cheo tu phai sang trai (tren xuong)
  for (let t = boardSize - 1; t >= 0; t--) {
    let i = 0
    //console.log('a');
    let j = t
    let count = 0
    while (j < boardSize - 1) {
      //console.log("(%d,%d)",i,j)
      if (
        newSquares[i][j] !== null &&
        newSquares[i][j] === newSquares[i + 1][j + 1]
      ) {
        count++
        console.log(count)
      }
      //console.log(count);
      //console.log("(%d,%d)",i,j);
      i++
      j++
      //console.log('a');
      if (count === sizeLineToWin - 1) {
        while (count >= 0) {
          line.push(i * boardSize + j)
          count--
          i--
          j--
        }

        line.reverse()
        return {
          line: line,
          winner: current.squares[line[0]],
          isDraw: false
        }
      }
    }
  }

  for (let t = 1; t < boardSize; t++) {
    let i = t
    //console.log('a');
    let j = 0
    let count = 0
    while (i < boardSize - 1) {
      //console.log("(%d,%d)",i,j)
      if (
        newSquares[i][j] !== null &&
        newSquares[i][j] === newSquares[i + 1][j + 1]
      ) {
        count++
        //console.log(count);
      }
      //console.log(count);
      //console.log("(%d,%d)",i,j);
      i++
      j++
      //console.log('a');
      if (count === sizeLineToWin - 1) {
        while (count >= 0) {
          line.push(i * boardSize + j)
          count--
          i--
          j--
        }

        line.reverse()
        return {
          line: line,
          winner: current.squares[line[0]],
          isDraw: false
        }
      }
    }
  }

  let isDraw = true

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (newSquares[i][j] === null) {
        isDraw = false
      }
    }
  }

  //console.log("abc");
  return {
    line: null,
    winner: null,
    isDraw: isDraw
  }
}

export default calculateWinner