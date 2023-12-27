import React, {useState} from 'react'

import './CheckListDimensioni.css'

const CheckListProva = () => {

    const [controlli, setControlli]= useState([
        { id:8 , nomePrimario:'Posizione relativa', nome: 'Staffe e ganci (c)', meno:'-10',piu:'+10',conforme:null, commenti:'', azioneCurativa:''},
        { id:9 , nomePrimario:'Posizione relativa', nome: 'Altri elementi oltre staffe e ganci (A)', meno:'-30',piu:'+30',conforme:null, commenti:'', azioneCurativa:''},
        { id:10 , nomePrimario:'Posizione relativa cumulata', nome: 'Staffe e ganci (C)', meno:'-10',piu:'+10',conforme:null, commenti:'', azioneCurativa:''},
        { id:11, nomePrimario:'Larghezza/Altezza', nome: 'Dimensione nominale < 150 mm', meno:'-10',piu:'+5',conforme:null, commenti:'', azioneCurativa:''},
       
    ])

    const [mostraTabella, setMostraTabella] = useState(true); //mi permette di nascondere la tabella
    const [timer, setTimer] = useState(null);

    const handleToggleTabella =()=>{
        setMostraTabella((prev)=> !prev)
    }

  


    const handleCheckboxChange = (event,id)=>{
      const newControlli = [...controlli];
      if (event.target.checked) {
        newControlli[id].conforme = event.target.name;
      } else {
        newControlli[id].conforme = null;
      }
      setControlli(newControlli);
      console.log('valori input radio:', id, controlli[id].conforme, 'id:', controlli[id].id) 
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
    <div className='checklist_dimensioni'>
         <div className='bottone_check_list'></div>
         <button onClick={handleToggleTabella}>
        {mostraTabella ? 'O' : 'V'}
      </button>
        <div>
            { mostraTabella && (
                <table className='tabella'>
            <thead>
                <tr>
                    <th colSpan="2"> CONTROLLI DIMENSIONI</th>
                    
                    <th colSpan="2">SCARTO PERMESSO</th>
                    <th colSpan="2">RISULTATO CONTROLLO</th>
                    <th >COMMENTI/PRECISAZIONI</th>
                    <th>AZIONE CURATIVA</th>
                </tr>
                <tr>
                    <th></th>
                    <th></th>
                    <th>MENO(mm)</th>
                    <th>PIU(mm)</th>
                    <th>CONFORME</th>
                    <th>NON CONFORME</th>
                    <th></th>
                    <th></th>
                </tr>

            </thead>
            <tbody>
                {
                    controlli.map((controllo, index)=>(
                        <tr key={controllo.id}>
                            <td>{controllo.nomePrimario}</td>
                            <td>{controllo.nome}</td>
                            <td>{controllo.meno}</td>
                            <td>{controllo.piu}</td>
                            <td>
                                
                                    <input
                                      type="checkbox"
                                      name="Conforme"
                                      value="Conforme"
                                      checked={controllo.conforme === 'Conforme'}
                                      onChange={(event)=> handleCheckboxChange(event,index )}
                                      
                                     />
                                     
                               
                            </td>
                            <td>
                            
                                    <input
                                        type="checkbox"
                                        name="Non Conforme"
                                        value="Non Conforme"
                                        checked={controllo.conforme === 'Non Conforme'}
                                        onChange={(event)=> handleCheckboxChange(event,index )}
                                        
                                        
                                        />
                                        
                                       
                            </td>
                            <td>
                           
                            </td>
                            <td>
                                    <input
                                    type='text'
                                    value={controllo.commenti}
                                    onChange={(e)=>handleInputChangeCommenti(controllo.id, 'commenti', e.target.value)}
                                    placeholder='commenti'
                                     />
                            </td>
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

export default CheckListProva