import React from 'react'
import './index.css'
import Square from './Squares'

function Board({ squares, onClick, winLine, boardSize }) {
    const curBoardSize = boardSize;
    const listRows = [];
    for (let i = 0; i < curBoardSize; i++) {
        let row = [];
        for (let j = 0; j < curBoardSize; j++) {
            row.push(renderSquare(i * curBoardSize + j, winLine, squares, onClick));
        }
        listRows.push(<div className='board-row'>{row}</div>);
    }
    return <div>{listRows}</div>
}

function renderSquare(i, winLine, squares, onClick) {
    const curWinLine = winLine;
    return (
        <Square
            highlight={curWinLine && curWinLine.includes(i)}
            onClick={() => onClick(i)}
            value={squares[i]}
        />
    )
}

export default Board