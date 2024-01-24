import React, { useState} from 'react'

import './RecuperaSaldatori.css'
//devo recuperare elenco saldatori da un file txt
const RecuperaSaldatori = ({setAppElencoSaldatori}) => {
    const[elencoTxt, setElencoTxt]=useState([])

    const handleFileChange = async (e)=>{
        const file = e.target.files[0]
        if(file){
            try {
                const fileContent= await readFile(file);
                const lines = fileContent.split('\n').filter(line => line.trim() !== '');//mi crea un array per riga
                setElencoTxt(lines)
                setAppElencoSaldatori(lines)
                console.log('sono in recuperaSaldatori', lines)
                
            } catch (error) {
                console.log('errore nella lettura del file', error)
            }
        }

    }
    const readFile=(file)=>{
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
      
            reader.onload = (e) => {
              resolve(e.target.result);
            };
      
            reader.onerror = (e) => {
              reject(new Error('Error al leer nel archivo.'));
            };
      
            reader.readAsText(file);
          });
        };
         return (
    <div className='container'>
      <h2>Caricare elenco saldatori</h2>
        <input
         type='file' accept=".txt" onChange={handleFileChange}/>
    </div>
  )
    }
 


export default RecuperaSaldatori;