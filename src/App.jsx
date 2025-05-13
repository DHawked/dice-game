import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  // USESTATES
  const [dice1, setDice1] = useState(1)
  const [dice2, setDice2] = useState(1)
  const [isRolling, setIsRolling] = useState(false)
  const [result, setResult] = useState(null)
  const audioRef = useRef(new Audio('/dice-roll.mp3'))

  // SOUND EFFECT 1
  useEffect(() => {
    audioRef.current.volume = 0.1
    audioRef.current.load()
  }, [])

  const rollDice = () => {
    // SOUND EFFECT 2
    audioRef.current.currentTime = 0 
    audioRef.current.play()
    
    setIsRolling(true)
    setResult(null)
    
    // COUNTDOWN - RANDOM
    let rollCount = 0
    let finalDice1 = 1
    let finalDice2 = 1
    
    const rollInterval = setInterval(() => {
      const newDice1 = Math.floor(Math.random() * 6) + 1
      const newDice2 = Math.floor(Math.random() * 6) + 1
      
      setDice1(newDice1)
      setDice2(newDice2)
      
      finalDice1 = newDice1
      finalDice2 = newDice2
      
      rollCount++
      
      if (rollCount >= 30) { 
        clearInterval(rollInterval)
        setIsRolling(false)
        
        // FINAL RESULTS
        if (finalDice1 > finalDice2) {
          setResult('win')
        } else if (finalDice1 < finalDice2) {
          setResult('lose')
        } else {
          setResult('draw')
        }
      }
    }, 100)
  }

  // RESULT TEXT
  const getResultText = () => {
    if (isRolling) return 'The Dice Are Rolling!'
    if (!result) return 'Dice Game'
    if (result === 'win') return 'You Won!'
    if (result === 'lose') return 'You Lost!'
    return 'Draw!'
  }
  
  // RESULT ICON
  const getResultIcon = () => {
    if (!result) return ''
    if (result === 'win') return 'fa-crown'
    if (result === 'lose') return 'fa-skull'
    return 'fa-handshake'
  }

  return (
    <>
      <h1>
        {getResultText()}
        {result && <i className={`fa-solid ${getResultIcon()}`}></i>}
      </h1>
      <div className="players">
        {/* PLAYER 1 */}
        <div className="player">
          <h3>You</h3>
          <img src={`/images/dice${dice1}.png`} alt="Dice 1" />
        </div>

        {/* PLAYER 2 */}
        <div className="player">
          <h3>Player 2</h3>
          <img src={`/images/dice${dice2}.png`} alt="Dice 2" />
        </div>
      </div>
      <button onClick={rollDice} disabled={isRolling}>
        <i className="fa-solid fa-dice"></i> ROLL THE DICE
      </button>
    </>
  )
}

export default App
