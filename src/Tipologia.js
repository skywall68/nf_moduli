import React, { useEffect, useState} from 'react'

import './Tipologia.css'

const Tipologia = ({setAppTipologia}) => {
    const [tipologia, setTipologia]=useState([])
    const [tipologiaSelezionata, setTipologiaSelezionata]=useState()

    useEffect(()=>{
        const recuperaDati = async()=>{
            try {
                const risultato = await fetch('tipologia.txt')
                const data = await risultato.text()
                const tipologiaArray = data.split('\n')
                setTipologia(tipologiaArray)

                
            } catch (error) {
                console.log('Errore nella lettura del file:', error)
            }
        }
        recuperaDati()
    },[])
    
    const handleChange = (e) => {
        const tipologiaScelta = e.target.value
        setTipologiaSelezionata(tipologiaScelta)
        setAppTipologia(tipologiaScelta) //prende il valore e lo porta in App.js
    }

  return (
    <div className='tipologiaBody'>
        <h2>Tipologia</h2>
        <select className='select_tipologia' onChange={handleChange}>
            {tipologia.map((tipologia, index)=>(
               <option key={index} value={tipologia}>
                 {tipologia}
               </option>
            ))}
            
        </select>
        <h3>Tipologia scelta:{tipologiaSelezionata}</h3>

        </div>
  )
}

export default Tipologia