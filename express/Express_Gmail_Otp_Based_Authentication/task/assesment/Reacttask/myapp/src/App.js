import React , {useState} from 'react'

const App = () => {

  const[count,setCount]=useState(0)

  return (
    <div>

        
  <h1>Counter</h1>
  <button onClick={()=>setCount(count+1)}>Increament</button>
  <button onClick={()=>setCount(count-1)}>Decreament</button>
  <button onClick={()=>setCount(0)}>Decreament</button>


    </div>
  )
}

export default App
