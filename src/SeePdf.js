import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import  './SeePdf.css'  /*importo file css*/ 

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const SeePdf = ({leggiFile,setNumeroPages, setAppLista, setAppCliente, setAppCantiere, setAppOpera, setAppPlan, setAppElementiSaldati, appRecuperaMiaLista }) => {
  const [pdfPath, setPdfPath] = useState('');
  const [totalPages, setTotalPages] = useState(null);
  const [linesArray, setLinesArray] = useState([]);
  const [linesArrayElementi, setLinesArrayElementi] = useState([]);
  const [lista, setLista] = useState('lista ??');
  const [nomeCliente, setNomeCliente]= useState('');
  const [cantiere, setCantiere]= useState('');
  const [opera, setOpera]= useState('');
  const [plan, setPlan]= useState('');
  const [elementi, setElementi]= useState([]);
  const [recuperaMiaLista , setRecuperaLista]= useState(appRecuperaMiaLista);
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('questo è il file scelto:', file)
      console.log('recupera lista da app.js.',recuperaMiaLista) //ho la lista che arriva da App.js
      setPdfPath(URL.createObjectURL(file));
      setLinesArray([]); // Resetta l'array quando il file cambia
      leggiFile()
     
      
    }
  };
  //processiamo il file
 

  const pdfStyles = {
    display: 'flex',
    flexDirection: 'column',
    marginTop:'100px',
    };
  //*********RECUPERO DATI CLIENTE**************************************** */
  const recuperaDatiCliente = async (npagine) => {
  try {
    const pdfDocument = await pdfjs.getDocument(pdfPath).promise;
    const pdfPage = await pdfDocument.getPage(1); 
    const textContent = await pdfPage.getTextContent();

    const elementiPdf = await pdfDocument.getPage(npagine); // recupera l'ultima pagina
    const textElementi = await elementiPdf.getTextContent();
    

    const lines = textContent.items.map(item => item.str); //array che contiene le righe della pagina 1
    const elementiLines = textElementi.items.map(item => item.str) // array che contiene righe ultima pagina

    setLinesArray(lines); // Aggiorna l'array con le nuove righe pagina 1
    //console.log('Hai premuto recuperaDati', linesArray)

    setLinesArrayElementi(elementiLines); // Aggiorna l'array con le nuove righe pagina ultima
    


    //recupera intestazione lista:
    recuperaLista(lines);
    //recupera elementi
    recuperaElementi(elementiLines);
    


    
  } catch (error) {
    console.error('Errore durante l\'estrazione dei dati:', error);
  }

  }
 

  //************RECUPERA intestazione LISTA ************************************/
   const recuperaLista = (lista)=>{
    const indexLista = lista.findIndex(line => line.includes('Tabella Ferri n.')) + 14;
    if (indexLista !== -1) {
      const posizioneLista = indexLista  // deve puntare sul valore cliente nell'array
      setLista(lista[posizioneLista])
      setAppLista(lista[posizioneLista]) //recupera la lista per mandarla tramite App.js a Compilatore.js
      //recupera cliente
      const indexCliente= lista.findIndex(line => line.includes('Tabella Ferri n.')) + 4;
      setNomeCliente(lista[indexCliente])
      setAppCliente(lista[indexCliente]) //recupero il cliente per mandarlo tramite App.js a Compilatore.js
      //recupera cantiere
      const indexCantiere = lista.findIndex(line => line.includes('Tabella Ferri n.')) + 8;
      setCantiere(lista[indexCantiere])
      setAppCantiere(lista[indexCantiere]) //recupero il cantiere per mandarlo tramite App.js a Compilatore.js
      //recupera opera
      const indexOpera = lista.findIndex(line => line.includes('Tabella Ferri n.')) + 10;
      setOpera(lista[indexOpera])
      setAppOpera(lista[indexOpera]) //recupero l'opera per mandarlo tramite App.js a Compilatore.js
      //recupera plan
      const indexPlan = lista.findIndex(line => line.includes('Tabella Ferri n.')) + 18;
      setPlan(lista[indexPlan])
      setAppPlan(lista[indexPlan]) //recupero il plan per mandarlo tramite App.js a Compilatore.js
     
    } else {
      // Se 'Lista' non è trovata, resetta l'indice
      
      setLista('non trovata')
    }
   }
   

  //****************RECUPERA ELEMENTI **************************** */ NON FUNZIONA 
  const recuperaElementi = (dati) =>{
      //RIMUOVO VALORI VUOTI
      const datiPuliti = Object.keys(dati).reduce((acc, key)=>{ //creiamo un iterazione con 'reduce'
         const valore = dati[key].trim(); //assegno a valore i dati tolti dello spazio iniziale e finale
         if(valore !== ''){ //se il valore è diverso da '' allora 
          acc[key]=valore  // assegna a acc (accumulatore) il valore
         }
         return acc;
      }, {})
      

      // RECUPERO GLI INDICI tolti quelli che avevano lo spazio
  const indexElementiDa = Object.keys(dati).findIndex(key => dati[key].includes("acierfrance@idrocentro.com - www.idrocentro.com"));
  const indexElementiA = Object.keys(dati).findIndex(key => dati[key].includes("Pagina"));

      console.log('dal numero elemento:', indexElementiDa);
      console.log('al numero elemento:', indexElementiA);
      console.log('valore di lista:', lista)
      let intervalloInferiore=indexElementiDa + 2;
      let intervalloSuperiore=indexElementiA -2;
     // Filtra le chiavi nell'intervallo specificato
     const elencoChiavi = Object.keys(datiPuliti).filter(key => key >= intervalloInferiore && key <= intervalloSuperiore);

  // Crea un nuovo oggetto con le chiavi filtrate e senza la scritta 'Element:'
  let elencoElementi = elencoChiavi.reduce((acc, key) => {
    acc[key] = dati[key].replace('Elément: ','');//rimuovo la scritta 'Elément:' per avere gli elementi puri:
    return acc;
  }, {});
  setElementi(elencoElementi) //ho gli elementi puliti
  const idScegli= 1
  const scegli = 'Scegli...'
  //voglio portare la scritta 'Scegli...' all'inizio della dropdown list dei elementi saldati, devo confertire l'oggetto
  //in un array, aggiungere 'scegli'  per poi riconvertirlo in un oggetto
    //converto l'oggetto in copie chiave-valore
    let arrayOggetto = Object.entries(elencoElementi)
    //aggiungo scegli all'Array
    arrayOggetto.unshift([idScegli,scegli])
    //converto array nell'oggetto
    elencoElementi = Object.fromEntries(arrayOggetto)
  console.log('Quali sono gli elementi finiti con Scegli',elencoElementi)
  setAppElementiSaldati(elencoElementi)//prendo gli elementi e tramite app.js li porto in ElementiSaldati.js

  
  
  }
  //************************************************************** */
  
  
  //tasto quando si è scelto il file pdf
  const handleLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages); //mi fa vedere tutte le pagine che se disattivato ne vedo solo 1
    setNumeroPages(numPages);
    
    //devo recuperare i dati chiamando e creando una funzione async
    recuperaDatiCliente(numPages);
    
   
  };

  

 



  return (
    <div className='pdf-container'>
      {/* {console.log('numero pagine:', totalPages)}
      {console.log('Elenco dati:', linesArray)}
      {console.log('lista n:', lista)}
      {console.log('cliente:',nomeCliente)}
      {console.log('cantiere:',cantiere)}
      {console.log('opera:',opera)}
      {console.log('plan:',plan)}
      {console.log('ULTIMA PAGINA:',linesArrayElementi )} */}
      <input type="file" accept=".pdf" onChange={handleFileChange} style={{marginTop:'50px', marginLeft:'50%'}} />
        {pdfPath && (
            <div  style={pdfStyles}>
              
                <Document file={pdfPath} onLoadSuccess={handleLoadSuccess}>
                {Array.from(new Array(totalPages), (el, index) => (
                    <Page key={`page_${index + 1}`} 
                    pageNumber={index + 1} 
                    renderTextLayer={false} 
                    //style={{width:0, height:0}}
                     />
                    ))}
                </Document>
            </div>
        )}
        {totalPages && (
        <p>
          Total Pages: {totalPages}
        </p>
      )}
    </div>
  );
};

export default SeePdf;
