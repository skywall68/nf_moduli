import React, {useEffect, useState} from 'react'

import './CheckListDimensioni.css'

const CheckListDimensioni = ({setListaPagina2, listaPagina2Originali}) => {

   const [listaIniziale, setListaIniziale]=useState([])
   const [controlli, setControlli]= useState([]) 
   
  //mi serve per aggiornare la schermata con tutte le voci ogni volta che cambia
   useEffect(() => {
    setControlli(listaPagina2Originali)
    
   }, [listaPagina2Originali])

  
   
    const [mostraTabella, setMostraTabella] = useState(true); //mi permette di nascondere la tabella
    //mostra tabella:
    const handleToggleTabella =()=>{
        setMostraTabella((prev)=> !prev)
    }

    const handleOptionChange = (id, conformeValue)=>{
         setControlli((prevControlli)=>
           prevControlli.map((controllo)=>
              controllo.id === id ? {...controllo, conforme: conformeValue}: controllo

           )
         )  
    }
    //resetta checkbox:
    /*const resetta = () => {
      setControlli(statoIniziale);
    };*/
  

    const handleCheckboxChange = (event,id)=>{
      const newControlli = [...controlli];
      if (event.target.checked) {
        newControlli[id].conforme = event.target.name;
      } else {
        newControlli[id].conforme = null;
      }
      setControlli(newControlli);
      console.log('valori input radio:', id, controlli[id].conforme, 'id:', controlli[id].id) 
      setListaPagina2(controlli)
 }


    const handleInputChangeCommenti = (id,field,value) =>{
          setControlli((prevControlli)=>
            prevControlli.map((commento)=>
             commento.id === id ? {...commento,[field]:value}: commento
          )
        )
        console.log(`ID: ${id}, Campo: ${field}, Valore: ${value}`);
        setListaPagina2(controlli)
      }
      const handleInputChangeAzione = (id,field,value) =>{
          setControlli((prevControlli)=>
            prevControlli.map((azione)=>
             azione.id === id ? {...azione,[field]:value}: azione
          )
        )
        setListaPagina2(controlli)
        
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
                                <label>
                                    <input
                                      id="myCheckbox"
                                      type="checkbox"
                                      name="Conforme"
                                      value="Conforme"
                                      checked={controllo.conforme === 'Conforme'}
                                      onChange={(event)=> handleCheckboxChange(event,index )}
                                      style={{ width: "20px", height:"20px", color: "green" }}
                                     />
                                      {controllo.conforme === 'Conforme' && (
                                        <span style={{ 
                                          fontSize: "30px", 
                                          color: "green",
                                         
                                          padding: "5px",
                                          zIndex:1,
                                          
                                          transform: "translate(-50%, -50%)"
                                         }}>✓</span>
                                        )}
                                     
                                </label>
                            </td>
                            <td>
                             <label>
                                    <input
                                        type="checkbox"
                                        name="Non Conforme"
                                        value="Non Conforme"
                                        checked={controllo.conforme === 'Non Conforme'}
                                        onChange={(event)=> handleCheckboxChange(event,index )}
                                        style={{ width: "20px", height:"20px", color: "green" }}
                                        />
                                       
                                        
                              </label>         
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

export default CheckListDimensioni