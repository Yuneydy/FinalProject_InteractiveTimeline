import './App.css'
import DtEvent from './DtEvent'
/*import EventList from './EventList' */
import Testing from './Testing'
function App() {


  return (
    <>
    <header>
    <div class="overlay">
  <h1>Timeline for Women in Computing</h1>
  <h3>A lengthy list of chronological events for women in computing</h3>
  <p>
      Women have set the foundation for what computer science has become
      today. Their contributions to mathematics and engineering have allowed
      for incredible breakthroughs and advancement in the field. This website
      is able to be updated with other historical events and is moderated by me,
      Yuneydy :)
  
  </p>
      </div>
  </header>
    <Testing />
    <DtEvent />
    
    </>
  )
}

export default App
