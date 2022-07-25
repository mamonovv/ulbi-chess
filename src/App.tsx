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
    const [whitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
    const [gameWinner, setGameWinner] = useState('')

    useEffect(() => {
        restart()
        setCurrentPlayer(whitePlayer)
    }, [])

    function restart() {
        const newBoard = new Board()
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard)
        setGameWinner('')
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

    return (
        <div className={'app'}>
            {gameWinner &&
                <div className={'winner'}>
                    <div className={'winner-banner'}>
                        {gameWinner} wins!
                        <button onClick={restart}>Restart</button>
                    </div>
                </div>
            }
            <Timer currentPlayer={currentPlayer} restart={restart}/>
            <BoardComponent board={board} setBoard={setBoard} currentPlayer={currentPlayer} swapPlayer={swapPlayer}/>
            <div>
                <LostFigures title={'Black Figures'} figures={board.lostBlackFigures}/>
                <LostFigures title={'White Figures'} figures={board.lostWhiteFigures}/>
            </div>
        </div>
    );
};

export default App;
