import React, { useState } from 'react'
import './index.css'
import Board from './Board.js'
import calculateWinner from './Calculate.js'


function Game() {
    const defaultBoardSize = 5;
    const [history, setHistory] = useState([
        {
            squares: Array(defaultBoardSize * defaultBoardSize).fill(null),
            boardSize: defaultBoardSize
        }
    ]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [isAscending, setIsAscending] = useState(true);
    const [selectValue, setSelectValue] = useState(defaultBoardSize);

    function handleClick(i) {
        const curHistory = history.slice(0, stepNumber + 1)
        const current = curHistory[curHistory.length - 1]
        const curSquares = current.squares.slice()
        //console.log("hello")
        const lineWin = calculateWinner(current).line
        console.log(lineWin)
        if (lineWin != null || curSquares[i] != null) {
            return
        }
        curSquares[i] = xIsNext ? 'X' : 'O'

        setHistory(curHistory.concat([
            {
                squares: curSquares,
                boardSize: selectValue,
                lastMove: i
            }
        ]));

        setStepNumber(curHistory.length);
        setXIsNext(!xIsNext);
    }

    function handleSort() {
        setIsAscending(!isAscending);
    }

    function handleChange(e) {
        //const boardSize = e.target.value;
        //console.log(e.target.value);
        const curBoardSize = parseInt(e.target.value)

        setSelectValue(curBoardSize);
        setHistory([
            {
                squares: Array(curBoardSize * curBoardSize).fill(null),
                boardSize: curBoardSize
            }
        ]);
        setStepNumber(0);
        setXIsNext(true);
        setIsAscending(true);

    }

    function jumpTo(step) {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    }

    const curHistory = history
    const current = curHistory[stepNumber]
    const winInfo = calculateWinner(current)
    const curBoardSize = current.boardSize;
    let winner = null
    if (winInfo.line != null) {
        winner = winInfo.winner
    }

    const moves = curHistory.map((step, move) => {
        const position = step.lastMove;
        const curStepNumber = stepNumber;
        //console.log(step);
        const col = 1 + (position % curBoardSize)
        const row = 1 + Math.floor(position / curBoardSize)
        const desc = move
            ? 'Go to move #' + move + ' (' + col + ',' + row + ')'
            : 'Go to game start'
        return (
            <li key={move}>
                <button
                    className={
                        move === curStepNumber ? 'bold-currently-selected-item' : ''
                    }
                    onClick={() => jumpTo(move)}
                >
                    {desc}
                </button>
            </li>
        )
    })

    let status
    if (winner) {
        status = 'Winner: ' + winner
    } else {
        if (winInfo.isDraw) {
            status = 'Draw'
        } else {
            status = 'Next player: ' + (xIsNext ? 'X' : 'O')
        }
    }

    if (!isAscending) {
        moves.reverse()
    }

    return (
        <div className='game'>
            <div className='game-board'>
                <Board
                    squares={current.squares}
                    onClick={i => handleClick(i)}
                    winLine={winInfo.line}
                    boardSize={selectValue}
                />
            </div>
            <div className='game-info'>
                <div>{status}</div>
                <button onClick={() => handleSort()}>
                    {isAscending ? 'Descending' : 'Ascending'}
                </button>
                <form>
                    <label htmlFor='new-todo'>BoardSize</label>
                    &nbsp;
                    <select
                        id='Board'
                        value={selectValue}
                        onChange={e => handleChange(e)}
                    >
                        <optgroup label='BoardSize'>
                            <option value='5'>5</option>
                            <option value='10'>10</option>
                            <option value='15'>15</option>
                            <option value='20'>20</option>
                        </optgroup>
                    </select>
                </form>
                <ol>{moves}</ol>
            </div>
        </div>
    )

}


export default Game