import React, {useEffect, useState} from 'react';
import './App.css'
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Colors} from "./models/Colors";
import {Player} from "./models/Player";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";

const App = () => {

    const [board, setBoard] = useState(new Board())
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
    const [winner, setWinner] = useState('')

    useEffect(() => {
        restart()
        setCurrentPlayer(whitePlayer)
    }, [])

    function restart() {
        const newBoard = new Board()
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard)

        const whitePlayer = new Player(Colors.WHITE)
        setWhitePlayer(whitePlayer)
        setCurrentPlayer(whitePlayer)

        setWinner('')
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

    return (
        <div className={'app'}>
            {winner &&
                <div className={'winner'}>
                    <div className={'winner-banner'}>
                        {winner} wins!
                        <button onClick={restart}>Restart</button>
                    </div>
                </div>
            }
            <Timer currentPlayer={currentPlayer} restart={restart} setWinner={setWinner}/>
            <BoardComponent board={board} setBoard={setBoard} currentPlayer={currentPlayer} swapPlayer={swapPlayer}/>
            <div>
                <LostFigures title={'Black Figures'} figures={board.lostBlackFigures}/>
                <LostFigures title={'White Figures'} figures={board.lostWhiteFigures}/>
            </div>
        </div>
    );
};

export default App;
