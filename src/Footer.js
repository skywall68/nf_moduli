import React, { useState } from 'react'
import Tasto from './components/Tasto'
import Modal from './components/uielements/Modal'

import './Footer.css'

const Footer = () => {
 const [showModalPrint, setShowModalPrint] = useState(false)
 const openModalPrintHandler = ()=> setShowModalPrint(true)
 const closeModalPrintHandler = ()=> setShowModalPrint(false)

// mi apre una finestra modal
 const handlePrintClick = ()=> {
    console.log('Print button clicked!');
 }
//azzera tutti i valori
 const handleCancelClick = () =>{
    console.log('Cancel button clicked!');
 }

  return (
    <React.Fragment>
      <Modal 
      show={showModalPrint} 
      onCancel={closeModalPrintHandler} 
      contentClass ="place-item__modal-content"
      footerClass = "place-item__modal-actons"
      footer={<Tasto onClick={closeModalPrintHandler} label={"cancel"} />}
      >
        <h2>mi visualizza il tasto STAMPA</h2>
      </Modal >
      

    
      <div className='footer'>

          <div className="button-container">
              <Tasto onClick={handleCancelClick} label="CANCEL"/>
              <Tasto onClick={openModalPrintHandler} label="STAMPA"/>
          </div>
      </div>
    </React.Fragment>
  )
}

export default Footer