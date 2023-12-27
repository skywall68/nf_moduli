import React, {useState} from 'react'

import './CheckList.css'

const CheckList = () => {
  
  const [controlli, setControlli] = useState([
    { id: 1, nome: 'Tipo ferro B500A o B500B', conforme: null, commenti:'', azioneCurativa:'' },
    { id: 2, nome: 'Diametro ferri', conforme: null, commenti:'', azioneCurativa:'' },
    { id: 3, nome: 'Qualità radriz. stato visivo, qualità', conforme: null, commenti:'', azioneCurativa:'' },
    { id: 4, nome: 'Diametro perni', conforme: null, commenti:'', azioneCurativa:'' },
    { id: 5, nome: 'Qualità ferri', conforme: null, commenti:'', azioneCurativa:'' },
    { id: 6, nome: 'Identificatore armatura/etichette', conforme: null, commenti:'', azioneCurativa:'' },
    { id: 7, nome: 'Rigidità insieme e qualità punti saldatura', conforme: null, commenti:'', azioneCurativa:'' },
  ]);
  const [mostraTabella, setMostraTabella] = useState(true); //mi permette di nascondere la tabella
 
  const handleToggleTabella = () => {
    setMostraTabella((prev) => !prev);
  };

 

  const handleOptionChange =(id, conformeValue)=>{
    setControlli((prevControlli)=>
      prevControlli.map((controllo)=>
        controllo.id === id ? {...controllo, conforme: conformeValue} : controllo
      )
    )
  }

  const handleInputChangeCommenti = (id,field,value) =>{
   
    setControlli((prevControlli)=>
      prevControlli.map((commento)=>
       commento.id === id ? {...commento,[field]:value}: commento
      )
    )
    console.log(`ID: ${id}, Campo: ${field}, Valore: ${value}`);
  }

  const handleInputChangeAzione = (id,field,value) =>{
   
    setControlli((prevControlli)=>
      prevControlli.map((azione)=>
       azione.id === id ? {...azione,[field]:value}: azione
      )
    )
    
  }

  return (
    
    <div className='checklist'>
       
    <div className='bottone'>
      
    <button onClick={handleToggleTabella}>
        {mostraTabella ? 'O' : 'V'}
      </button>
       <h2 style={{marginTop:'-20px'}}>Controlli</h2>
    </div>
        <div>
        {mostraTabella && ( 
        <table className='tabella'>
      <thead>
        <tr>
        <th>CONTROLLI</th>
  <th colSpan="2">RISULTATO CONTROLLO</th>
  <th >COMMENTI/PRECISAZIONI</th>
  <th>AZIONE CURATIVA</th>
</tr>
<tr>
  <th></th>
  <th>CONFORME</th>
  <th>NON CONFORME</th>
  <th></th>
  <th></th>
 
          
        </tr>
      </thead>
      <tbody>
        {
          controlli.map((controllo)=>(
            <tr key={controllo.id}>
              <td>{controllo.nome}</td>
               
                <td>
                  <label>
                    <input
                      type="radio"
                      name={`risultato-${controllo.id}`}
                      value="Conforme"
                      checked={controllo.conforme === true}
                      onChange={()=> handleOptionChange(controllo.id, true)}
                     />
                      
                  </label>
                </td>
                <td>
                  <label>
                    <input
                      type="radio"
                      name={`risultato-${controllo.id}`}
                      value="Non Conforme"
                      checked={controllo.conforme === false}
                      onChange={()=> handleOptionChange(controllo.id, false)}
                     />
                      
                  </label>
                
                </td>
                
             
              <td>
                <input
                  type='text'
                  value={controllo.commenti}
                  onChange={(e)=>handleInputChangeCommenti(controllo.id, 'commenti', e.target.value)}
                  placeholder='commenti'
               
               /></td>




          <td>
          <input
                  type='text'
                  value={controllo.azioneCurativa}
                  onChange={(e)=>handleInputChangeAzione(controllo.id, 'azioneCurativa', e.target.value)}
                  placeholder='azione curativa'
               
               />
          </td>

            </tr>
          ))
        }
       
        
      </tbody>
    </table>
        )}

        </div>
    </div>
  )
}

export default CheckList