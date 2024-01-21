import React, { useState} from 'react'
import './Operatore.css'

const Operatore = ({setAppOperatore}) => {
 //const[operatore, setOperatore]=useState('')

 const handleInputChange =(e)=>{
   setAppOperatore(e.target.value)
 }
 //console.log('operatore:', operatore)
 //setAppOperatore(operatore)

  return (
    <div className='container'>
        <h2>Controllore:</h2>
        <input
        type='text'
        onChange={handleInputChange}
         />
    </div>
  )
}

export default Operatore