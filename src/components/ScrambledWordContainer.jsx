import {useState, useEffect} from 'react'

export const ScrambledWordContainer = ({currentWord}) => {
  
  const [scrambledWord, setScrambledWord] = useState('')
  
  let scrambleWord = (src) => {
    
    let array = src.split('');
    
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    
    return array.join('')
  }
  
  useEffect(() => {
    setScrambledWord(scrambleWord(currentWord))
  }, [currentWord])
  
  return(
    <div className="scrambledWordContainer">
      <p className="scrambledWord">{scrambledWord}</p>
    </div>
  )
}