import React, { useState, useEffect } from 'react'

import './ElencoOperatori.css'

 const ElencoOperatori = ({ setAppOperatore}) => {
    const [operatori, setOperatori] = useState([]);
    const [operatoreSelezionato, setOperatoreSelezionato] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('operatori.txt');
            const data = await response.text();
            const operatoriArray = data.split("\n");
            setOperatori(operatoriArray);
          } catch (error) {
            console.error('Errore nella lettura del file:', error);
          }
        };
    
        fetchData();
      }, [operatori]);
    

      const handleSelectChange = (event) => {
        const selectedOperatore = event.target.value;
        // Memorizza il valore selezionato nello stato o fai ciò che serve
        setOperatoreSelezionato(selectedOperatore)
        setAppOperatore(selectedOperatore) //porto operatore a Compilatore tramite App.js
       

      };
     
    
      return (
        <div className='listaOperatori'> 
        <h2>Operatore</h2>
        <select className='select_operatori' onChange={handleSelectChange}>
          {operatori.map((operatore, index) => (
            <option key={index} value={operatore}>
              {operatore}
            </option>
          ))}
        </select>
       
        </div>
       
      );
    };

    export default ElencoOperatori;
    
