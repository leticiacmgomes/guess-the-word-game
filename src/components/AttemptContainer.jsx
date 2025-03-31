export const AttemptContainer = ({attempts}) => {
  return(
    <div class="attemptContainer">
      <p>Tries({attempts}/5): </p>
      <section class="attemptMarkersContainer">
        {
          Array.from({length: 5}, (_, index) => {
            return <div className={`attemptMarker ${index < attempts ? 'active' : ''}`} key={index}></div>
          })
        }
      </section>
    </div>
  )
}