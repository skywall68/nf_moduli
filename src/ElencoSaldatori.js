import React, { useEffect, useState } from 'react';

import './ElencoSaldatori.css'

const ElencoSaldatori = ({setSaldatoriApp}) => {
    const [saldatori, setSaldatori] = useState([]);
    const [saldatoriSelezionati, setSaldatoriSelezionati] = useState('');

    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const risultato = await fetch('saldatori.txt');
                const data = risultato.text();
                const saldatoriArray = (await data).split("\n");
                setSaldatori(saldatoriArray)
               
            } catch (error) {
                console.error('Errore nella lettura del file:', error);
            }
        }
        fetchData();
    },[])

    const handleSelectChange = (event) =>{
        const selectedSaldatore = event.target.value;
        // Memorizza il valore selezionato nello stato
        setSaldatoriSelezionati(selectedSaldatore)
        setSaldatoriApp(selectedSaldatore)
    }

  return (
    <div className='ElencoSaldatori'> 
    <h2>Saldatori</h2>
    <select className='select_saldatori' onChange={handleSelectChange}>
        {saldatori.map((sald,index)=>(
            <option key={index} value={sald}>
                {sald}
            </option>
        ))}
    </select>
    
    </div>
   
  )
}

export default ElencoSaldatori