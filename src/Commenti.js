import React, { useState} from 'react'

import './Commenti.css'

const Commenti = ({setAppControllatoNdi, appControllatoNdi}) => {
    const [inputValue1, setInputValue1]=useState('1')
    const [ inputValue2, setInputValue2]=useState('')

    const handleInputChange1 = (e)=>{
        setInputValue1(e.target.value)
    }
    //quantità elementi appartiene l'elemento:
    const handleInputChange2 = (e)=>{
        setInputValue2(e.target.value)
        setAppControllatoNdi(e.target.value) //quanti elementi sono
    }


  return (
    <div className='Commenti'>
        <h2>Commenti:</h2>
        <div className='commentibody'>
            controllato: 
            <input className='inputCommenti'
            type="number"
            value={inputValue1}
            onChange={handleInputChange1}
            placeholder="1"
          />
         <p style={{textAlign:'center'}}> di {`${appControllatoNdi}`} </p> 
          <input className='inputCommenti'
            type="number"
            value={inputValue2}
            onChange={handleInputChange2}
            placeholder="0"
          />
             
        </div>

    </div>
  )
}

export default Commenti