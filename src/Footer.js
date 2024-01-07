import React, { useState } from 'react'
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

import Tasto from './components/Tasto'
import Modal from './components/uielements/Modal'


import './Footer.css'

const Footer = ({
  dataConsegnaApp,
  appLista,
  listaPagina1, 
  listaPagina2,
  setPdfListaCreata,
  saldatoriApp,
  appTipologia,
  appCliente,
  appOpera,
  appPlan,
  appElementoScelto,
  appParametriStampa,
  appControllatoNdi,
  appCantiere,
  numeroPages,

 }) => {

 const [showModalPrint, setShowModalPrint] = useState(false)

 
 const openModalPrintHandler = ()=> setShowModalPrint(true)// mi apre una finestra modal
 const closeModalPrintHandler = ()=> setShowModalPrint(false) //chiude il modal

 //recupero su localStorage l'operatore
 const operatore = JSON.parse(localStorage.getItem('appOperatore')) || 'operatore'

 //elenco delle parti da stampare:
 const dataControllo=dataConsegnaApp
 const lista=appLista
 const cliente = appCliente
 const saldatori = saldatoriApp
 const tipologia = appTipologia
 const opera = appOpera
 const plan = appPlan
 const etichetta = appElementoScelto
 const parametri_stampa = [...appParametriStampa]
 const nElementi = appControllatoNdi
 const spuntaFabbrica='x'
 const spuntaSuPiano = 'x'
 const cantiere = appCantiere
 const paginaUnoAlto = [spuntaFabbrica,spuntaSuPiano,tipologia,cantiere,opera,cliente,plan,lista,etichetta,saldatori,]

 //creo un array riepilogativo:
 const arrayCombinato = paginaUnoAlto.map((valore,indice)=>({
  valoreSemplice:valore,
  oggetto1:listaPagina1[indice],
  oggetto2:listaPagina2[indice],
 }))
 //creo un array totale:
 const arraytotaleVoci =[
  ...paginaUnoAlto,
  listaPagina1,
  listaPagina2,

 ]

 //*******************************funzione di stampa ************************************************
     const stampaFilePdf = async ()=>{
      let testoDaStampare=''
       const filePath = process.env.PUBLIC_URL + '/pdfs/PJ 8 - rev 6 - IT.pdf'; // cerca pdf cartella publica
       const response = await fetch(filePath) //recupera il file
       const arrayBuffer = await response.arrayBuffer(); //converte formato binario
       const pdfDoc = await PDFDocument.load(arrayBuffer); //carica come oggetto da modificare
       const page1 = pdfDoc.getPages()[0]; // dichiara una variabile page che contiene l'oggetto rappresentante la prima pagina del documento PDF.
       const { width, height } = page1.getSize(); //utilizza la destructuring assignment di JavaScript per estrarre i valori delle proprietà width e 
       //height dall'oggetto restituito dal metodo getSize() chiamato su un oggetto di pagina (page). 
       const page2 = pdfDoc.getPages()[1];
      
       const font = await pdfDoc.embedFont(StandardFonts.Helvetica);//utilizzato per disegnare testo sulla pagina del PDF utilizzando quel font specifico
       //prima parte pagina 1 in alto
       let coordinate=0
       
       let valoreY=0
        paginaUnoAlto.forEach((testo, index)=>{
        coordinate = parametri_stampa[index]
        testoDaStampare=testo
        valoreY=coordinate.y 
        console.log('testo da stampare:', coordinate.x,valoreY)
        page1.drawText(testoDaStampare, {
          x: coordinate.x,
          y: height  - coordinate.y, 
          font,
          color: rgb(0,0,0),
        })
       })
        //partenza coordinate conforme pagina 1
      const testo_spuntato = 'x'
      //const partenzaY = 475 //partenza asse delle y
      //let k = -35 //asse delle y
       //definiamo un ciclo dei controlli che conforme sia 'Conforme' o 'Non Conforme'
       let mioIdPagina1 = 10
       let coordinate_pagina = []
       
       listaPagina1.forEach((controllo )=>{
          coordinate_pagina = parametri_stampa[mioIdPagina1]
          //k= +35
          if(controllo.conforme=== true) {
           page1.drawText(testo_spuntato, {
             x:coordinate_pagina.x,
             y: height -coordinate_pagina.y,
             font,
             color: rgb(0, 0, 0),
           })
          } else  {
           page1.drawText(testo_spuntato, {
             x:coordinate_pagina.x,
             y: height -coordinate_pagina.y,
             font,
             color: rgb(0, 0, 0),
           })
          }
          mioIdPagina1++
       })

      //se l'elemento controllato è maggiore di uno allora riportalo
      if(nElementi>1) {
        const testoCommento=`Controllato 1 elemento di ${nElementi}`
       page1.drawText(testoCommento, {
         x:parametri_stampa[29].x,
         y: height -parametri_stampa[29].y,
         font,
         color: rgb(0, 0, 0),
       })
      }
      //passiamo alla SECONDA PAGINA
      let mioIdPagina2 = 17
     
      listaPagina2.forEach((controllo)=>{
       coordinate_pagina = parametri_stampa[mioIdPagina2] //

       if(controllo.conforme === 'Conforme' ){
          page2.drawText(testo_spuntato, {
           x:coordinate_pagina.x,
           y: height -coordinate_pagina.y,
           font,
           color: rgb(0, 0, 0),
          })
       } else if (controllo.conforme === 'Non Conforme'){
           page2.drawText(testo_spuntato, {
           x:coordinate_pagina.x,
           y: height -coordinate_pagina.y,
           font,
           color: rgb(0, 0, 0),
          })
       }
       mioIdPagina2++

      })
      //data controllo:
      page2.drawText(dataControllo, {
        
        x:parametri_stampa[28].x,
        y: height -parametri_stampa[28].y,
        font,
        color: rgb(1, 0, 0),
       })
       

       const modifiedPdfBytes = await pdfDoc.save(); //consente di salvare le modifiche apportate al documento PDF e ottenere i byte rappresentanti il PDF modificato
       const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });// crea un oggetto Blob  rappresenta un blocco di dati, in questo caso, l'array di byte che costituisce il documento PDF modificato
       saveAs(blob, `${lista}_pj8.pdf`); /* utilizza FileSaver.js per avviare il processo di salvataggio del file nel browser. Il browser visualizzerà quindi una finestra di dialogo per il salvataggio, consentendo 
       all'utente di scaricare il file PDF modificato con il nome specificato ('output.pdf').*/ 
         
      

     }  
//************************************fine ********************************************************* */



//***********************COMANDO DI STAMPA*********************************
 const handlePrintClick = ()=> {
    if(operatore !=='operatore' && saldatoriApp!=='Scegli' && appTipologia !=='Scegli'){
      setPdfListaCreata(appLista) //mi porta su App.js il numero della lista creata
    
    //richiamare funzione di stampa...
    //parametri stampa
     let coordinate_pagina = parametri_stampa[20]
    //console.log('parametri per stampare=',coordinate_pagina.y)
   // console.log('PAGINAUNOALTO:',paginaUnoAlto)
   // console.log('elementi combinati:',arrayCombinato)
   // console.log('Somma totale ARRAY:', arraytotaleVoci)
    stampaFilePdf()
    //chiudi modal
    closeModalPrintHandler();

    } else if (operatore ==='operatore') {
      alert('Operatore mancante')
      closeModalPrintHandler();

    } else if(saldatoriApp==='Scegli'){
      alert('Scegliere i saldatori')
      closeModalPrintHandler();
    } else if(appTipologia ==='Scegli') {
      alert('Scegliere la tipologia')
      closeModalPrintHandler();
    }
    
    else {
      alert('errore generico')
      closeModalPrintHandler();
    }
    
    
   
 }

//azzera tutti i valori  !!!da fare!!!
 const handleCancelClick = () =>{
    console.log('Cancel button clicked!');
 }

  return (
    <React.Fragment>
      <Modal 
      show={showModalPrint} 
      onCancel={closeModalPrintHandler} 
      contentClass ="place-item__modal-content"
      footerClass = "place-item__modal-actions"
      footer={<Tasto onClick={closeModalPrintHandler} label={"cancel"} />}
      >
         
        <h2>mi visualizza il tasto STAMPA</h2>
        <div>
          
          <Tasto onClick={handlePrintClick} label={"stampa"}/>
        </div>
       
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