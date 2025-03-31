import {useState, useEffect, useRef} from 'react'

/*Importacao de componentes*/

import {ScrambledWordContainer} from './ScrambledWordContainer.jsx'
import {AttemptContainer} from './AttemptContainer.jsx'
import {MistakeContainer} from './MistakeContainer.jsx'
import {Input} from './Input.jsx'
import {Button} from './Button.jsx'

import data from './data.json'

export const GameCard = () => {
  
  const words = data.words
  const [currentWord, setCurrentWord] = useState('')
  const [userWord, setUserWord] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [mistakes, setMistakes] = useState('')
  const inputRefs = useRef([])
  
  let pickRandomWord = () => {
    let randomWord = words[Math.floor(Math.random() * words.length)]
    setCurrentWord(randomWord);
  }
  
  let resetInputs = () => {
    inputRefs.current.forEach((element) => {
      
      if (element) {
        element.classList.remove('correctInput', 'incorrectInput');
        element.value = '';
        element.readOnly = false;
      }
    })
    
    inputRefs.current[0]?.focus();
  }
  
  let resetGame = () => {
    setUserWord('');
    setAttempts(0);
    setMistakes('');
    resetInputs();
  }
  
  let restartGame = () => {
    resetGame();
    pickRandomWord();
  }
  
  let handleInput = (event, index) => {
    let letter = event.target.value.toLowerCase()
    
    if(!letter) {
      if (inputRefs.current[index]) {
        inputRefs.current[index].classList.remove('incorrectInput');
      }
      
      return
    }
    
    if (letter) {
      if (letter.localeCompare(currentWord[index], 'pt-BR', {sensitivity: 'base'}) === 0) {
        setUserWord((prev) => {
          const newUserWord = prev.split('');
          newUserWord[index] = letter;
          return newUserWord.join('');
        })
        
        if (inputRefs.current[index]) {
          inputRefs.current[index].readOnly = true;
          inputRefs.current[index]?.classList.add('correctInput');
        }
        
        inputRefs.current[index + 1]?.focus();
        
      } else {
        if (inputRefs.current[index]) {
          inputRefs.current[index]?.classList.add('incorrectInput');
        }
        
        setMistakes(prev => prev + letter)
        
        setAttempts(prev => prev + 1)
      }
    }
  }
  
  useEffect(() => {
    pickRandomWord();
  }, []);
  
  useEffect(() => {
    if (userWord && userWord.localeCompare(currentWord, 'pt-BR', {sensitivity: 'base'}) === 0) {
      alert('Você ganhou!! Sabia que conseguiria : )');
      
      restartGame();
    } else if (attempts >= 5) {
      alert(`Você foi burro(a) e perdeu! A palavra era ${currentWord.toUpperCase()}!`);
      
      restartGame();
    }
  }, [userWord, attempts]);
  
  return(
    <div className='gameCard'>
      <h1>Word Scramble</h1>
      
      <ScrambledWordContainer currentWord={currentWord}/>
      
      <section className="attemptAndMistakeContainer">
        <AttemptContainer attempts={attempts}/>
        <MistakeContainer mistakes={mistakes}/>
      </section>
      
      <section className="inputContainer">
        <Input currentWord={currentWord} handleInput={handleInput} inputRefs={inputRefs}/>
      </section>
      
      <section className="buttonContainer">
        <Button value={'Random'} onClick={restartGame}/>
        <Button value={'Reset'} onClick={resetGame}/>
      </section>
    </div>
  )
}