import React, {useState} from 'react'

import './CheckListDimensioni.css'

const CheckListDimensioni = () => {

    const [controlli, setControlli]= useState([
        { id:1 , nomePrimario:'Posizione relativa', nome: 'Staffe e ganci (c)', meno:'-10',piu:'+10',conforme:null, commenti:'', azioneCurativa:''},
        { id:2 , nomePrimario:'Posizione relativa', nome: 'Altri elementi oltre staffe e ganci (A)', meno:'-30',piu:'+30',conforme:null, commenti:'', azioneCurativa:''},
        { id:3 , nomePrimario:'Posizione relativa cumulata', nome: 'Staffe e ganci (C)', meno:'-10',piu:'+10',conforme:null, commenti:'', azioneCurativa:''},
        { id:4, nomePrimario:'Larghezza/Altezza', nome: 'Dimensione nominale < 150 mm', meno:'-10',piu:'+5',conforme:null, commenti:'', azioneCurativa:''},
        { id:5 , nomePrimario:'Larghezza/Altezza', nome: 'Dimensione nominale >= 150 mm', meno:'-20',piu:'+5',conforme:null, commenti:'', azioneCurativa:''},
        { id:6 , nomePrimario:'Armature la cui lunghezza è determinata da barre tagliate(senza pieghi)', nome: 'L <= 2 m', meno:'-20',piu:'+10',conforme:null, commenti:'', azioneCurativa:''},
        { id:7 , nomePrimario:'Armature la cui lunghezza è determinata da barre tagliate(senza pieghi)', nome: '2 m < L <= 4 m', meno:'-40',piu:'+10',conforme:null, commenti:'', azioneCurativa:''},
        { id:8 , nomePrimario:'Armature la cui lunghezza è determinata da barre tagliate(senza pieghi)', nome: 'L > 4 m', meno:'-50',piu:'+10',conforme:null, commenti:'', azioneCurativa:''},
        { id:9 , nomePrimario:'Lunghezza', nome: 'Armature la cui lunghezza è determinata da barre tagliate e sagomate (L)', meno:'-30',piu:'+10',conforme:null, commenti:'', azioneCurativa:''},
        { id:10 , nomePrimario:'Lunghezza', nome: 'Armature utilizzate per sormonto o tagliate su misura (per esempio chainages, semelles filantes, ch, rv,sf', meno:'-50',piu:'+50',conforme:null, commenti:'', azioneCurativa:''},
        { id:11 , nomePrimario:'Angoli', nome: 'Angoli pieghi -caso angolo = 90°', meno:'0',piu:'+10',conforme:null, commenti:'', azioneCurativa:''},
        { id:12 , nomePrimario:'Angoli', nome: 'Angoli pieghi - caso altri angoli', meno:'-10',piu:'+10',conforme:null, commenti:'', azioneCurativa:''},
        { id:13 , nomePrimario:'', nome: 'lunghezza parti dritte dopo curvatura (ganci e pieghi)', meno:'-5',piu:'+30',conforme:null, commenti:'', azioneCurativa:''},
    ])

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