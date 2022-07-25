import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface TimerProps {
    currentPlayer: Player | null
    restart: () => void
    setWinner: (winner: string) => void
}

const Timer: FC<TimerProps> = ({currentPlayer, restart, setWinner}) => {

    const [blackTime, setBlackTime] = useState(300)
    const [whiteTime, setWhiteTime] = useState(300)

    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        resetTime()
        startTimer()
    }, [currentPlayer])

    useEffect(() => {
        if (whiteTime === 0) {
            setWinner('Black')
            if (timer.current) {
                clearInterval(timer.current)
            }
        } else if (blackTime === 0) {
            setWinner('White')
            if (timer.current) {
                clearInterval(timer.current)
            }
        }
    }, [whiteTime, blackTime])

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }

    function decrementBlackTimer() {
        setBlackTime(prev => prev - 1)
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1)
    }

    function resetTime(time = 300) {
        setWhiteTime(time)
        setBlackTime(time)
    }

    const handleRestart = () => {
        resetTime()
        restart()
    }

    return (
        <div>
            <div>
                <button onClick={handleRestart}>Restart game</button>
            </div>
            <h2>Черные - {blackTime}</h2>
            <h2>Черные - {whiteTime}</h2>
        </div>
    );
};

export default Timer;
