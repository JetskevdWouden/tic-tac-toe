import React from 'react';
import Board from './Board';

class GameContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            xIsNext: true,
            stepNumber: 0,
            history: [
                { squares: Array(9).fill(null) }
            ]
        }
    }

    handleClick = (index) => {
        //previsous state of history
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        squares[index] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat({
                squares: squares
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        onClick={(index) => this.handleClick(index)}
                        squares={current.squares}
                    />
                </div>
            </div>
        )
    }
}

//Helper functions
const calculateWinner = squares => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}

export default GameContainer;