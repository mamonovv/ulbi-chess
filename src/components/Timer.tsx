import React, {FC, useEffect, useRef} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface TimerProps {
    currentPlayer: Player | null
    restart: () => void
    setWinner: (winner: string) => void
    blackTime: number
    whiteTime: number
    setBlackTime: React.Dispatch<React.SetStateAction<number>>
    setWhiteTime: React.Dispatch<React.SetStateAction<number>>
}

export const DEFAULT_TIMER = 5

const Timer: FC<TimerProps> = ({
                                   currentPlayer,
                                   restart,
                                   setWinner,
                                   setBlackTime,
                                   setWhiteTime,
                                   whiteTime,
                                   blackTime
                               }) => {

    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
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

    function resetTime(time = DEFAULT_TIMER) {
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
            <h2>Black - {blackTime}</h2>
            <h2>White - {whiteTime}</h2>
        </div>
    );
};

export default Timer;
