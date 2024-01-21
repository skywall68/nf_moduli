import React, {useState} from 'react'


import "react-datepicker/dist/react-datepicker.css";
import Calendario from './Calendario';
import './Compilatore.css'

const Compilatore = ({numeroPages, appLista, appCliente, appCantiere,appOpera, appPlan, setDataConsegnaApp }) => {
 
  
  //const [dataCompilatore, setDataCompilatore]=useState('')
  //setDataConsegnaApp(dataCompilatore)
  
  
  return (
    
    <div className='bodyCompilatore'>
      
      <div className='header'>
       {/*<p>Numero di pagine Lista:n°{numeroPages}</p>*/}
       
       {/* <div className='controllo'>Controllo a cura di:<h3>{appOperatore}</h3></div>  */}
              
       
       
      </div>
    
   
    <table className='tabella'>
      <thead>
        <tr>
          <th>LISTA</th>
          <th>CLIENTE</th>
          <th>CANTIERE</th>
          <th>OPERA</th>
          <th>PLAN</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{appLista}</td>
          <td>{appCliente}</td>
          <td>{appCantiere}</td>
          <td>{appOpera}</td>
          <td>{appPlan}</td>
        </tr>
        
      </tbody>
    </table>
    
    
    </div>
    
  )
}

export default Compilatore