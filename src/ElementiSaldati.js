import React, {useEffect, useState} from 'react'

import './ElementiSaldati.css'

function ElementiSaldati({appElementiSaldati}) {
  const [elementiSaldati, setElementiSaldati]=useState([])
  const [elementoScelto, setelementoScelto]= useState('')
  
  useEffect(() => {
    const copiaElementi = async () => {
      if (appElementiSaldati != null) {
        let data;

        if (Array.isArray(appElementiSaldati)) {
          // Se appElementiSaldati è già un array, lo usiamo direttamente
          data = appElementiSaldati;
        } else if (typeof appElementiSaldati === 'object') {
          // Se appElementiSaldati è un oggetto, otteniamo i valori
          data = Object.values(appElementiSaldati);
        } else {
          // Se appElementiSaldati non è né un array né un oggetto, gestisci come desideri
          data = [];
        }

        setElementiSaldati(data);
      } else {
        setElementiSaldati([]);
      }
    };
    copiaElementi();
  }, [appElementiSaldati]);


  const  handleSelectChange = (e)=>{
    const selectElement = e.target.value; //ho l'elemento selezionato cosa ne faccio?
    setelementoScelto(selectElement)
  }

  return (

    <div className='ElementiSaldati'>
        <h2>Elementi Saldati</h2>
        <select className='elementi_select' onChange={handleSelectChange}>
          {elementiSaldati.map((elem, index) => (
             <option key={index} value={elem}>
               {elem}
             </option>
          ))}
        </select>
       
        </div>
  )
}

export default ElementiSaldati;