export const MistakeContainer = ({mistakes}) => {
  return(
    <section class="mistakesContainer">
      <p className="mistakes">Mistakes: {mistakes.split('').join(',')}</p>
    </section>
  )
}