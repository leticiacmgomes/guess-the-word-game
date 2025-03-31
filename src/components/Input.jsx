export const Input = ({currentWord, handleInput, inputRefs}) => {
  return(
    <section class="inputsContainer">
      {
        currentWord.split('').map((_, index) => {
          return <input type="text" key={index} maxLength="1" autocapitalize="off" ref={(element) => inputRefs.current[index] = element} onChange={(event) =>{
            handleInput(event, index);
          }}/>
        })
      }
    </section>
  )
}