//import PuntoPreciso from './PuntoPreciso';
import React, { useEffect, useState} from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';


import './App.css';
import Compilatore from './Compilatore';
import  ElencoOperatori  from './ElencoOperatori';
import ElencoSaldatori from './ElencoSaldatori';
import Calendario from './Calendario';
import PdfArray from './PdfArray';
import PdfReader from './PdfReader';
import PdfReaderRiga2 from './PdfReaderRiga2';
import Planning from './Planning';
import SeePdf from './SeePdf'
import ElementiSaldati from './ElementiSaldati';
import Tipologia from './Tipologia';
import Commenti from './Commenti';
import CheckList from './CheckList';
import CheckListDimensioni from './CheckListDimensioni';
import Footer from './Footer';

function App() {
  
  const [numeroPages, setNumeroPages] = useState('0');
  const [dataConsegnaApp, setDataConsegnaApp]=useState('');
  const [appLista, setAppLista]= useState('');
  const [pdfListaCreata, setPdfListaCreata]=useState('') //serve per segnarmi se il pdf è stato creato
  const [appCliente, setAppCliente] = useState('');
  const [appCantiere, setAppCantiere] = useState('');
  const [appOpera, setAppOpera] = useState('');
  const [appPlan, setAppPlan] = useState('');
  const [appOperatore, setAppOperatore] = useState (''); //legge su localstorage se non trova nulla è ''
  const [saldatoriApp, setSaldatoriApp] =useState('Scegli') //legge i saldatori
  const [appElementiSaldati, setAppElementiSaldati]= useState([])
  const [appElementoScelto,setAppElementoScelto]=useState('')
  const [appTipologia, setAppTipologia]= useState('Scegli')
  const [listaPagina1, setListaPagina1]=useState([])
  const [listaPagina2, setListaPagina2]=useState([])
  const [oncheckAll, setUncheckAll] = useState(false); //per deselezionare le checkbox
  const [listaPagina2Originali, setListaPagina2Originali]= useState([])
  const [appParametriStampa, setAppParametriStampa]= useState([])
  const [appControllatoNdi, setAppControllatoNdi]= useState('') // al numero di elementi appartiene l'elemento controllato
  const [appRecuperaMiaLista, setAppRecuperaLista]= useState('List 23997 - Items list.pdf') //recupero la lista da eventuale click

  //PROVA PER RECUPERARE LISTA DA PLANNING//////
  //setAppRecuperaLista('')
  

  // Funzione per deselezionare tutte le checkbox
  const handleUncheckAll = () => {
    setUncheckAll((prev) => !prev);
  };

  //recupero il numero dopo N. di elementi dalla stringa ricevuta da appControllatoNdi che arriva da ElementiSaldati.js
  useEffect(()=>{
    const trovaNElementoDi = (testo)=>{
     const posizioneN = testo.indexOf('N.')
      if(posizioneN !== -1){
        // Trova la posizione dello spazio successivo dopo 'N.'
        const posizioneSpazio = testo.indexOf(' ', posizioneN);
        // Estrai i caratteri dopo 'N.' fino allo spazio successivo
        const caratteriDopoN = testo.substring(posizioneN + 2, posizioneSpazio);
        setAppControllatoNdi(caratteriDopoN)
      } else {
        setAppControllatoNdi('1')
      }
  }
  trovaNElementoDi(appElementoScelto)
  },[appTipologia,appElementoScelto])
  

  //memorizza operatore ogni volta che c'è un cambiamento
  useEffect(()=>{
    //salva su localStorage
    localStorage.setItem('appOperatore',JSON.stringify(appOperatore))
  },[appOperatore])
  

  //recupero i dati originali dal file checklist.json per mandarli poi in CheckDimensioni
 
    const leggiFile = async () => {
     try {
      const response = await fetch('checklist.json')
      const data = await response.text()
      const parsedData = await JSON.parse(data)
       setListaPagina2Originali(parsedData)
     
      } catch (error) {
      console.log('errore da App.js non legge file checklist.json_', error)
     }

     console.log('Su App la funzione leggiFile è stata chiamata:',listaPagina2Originali)
    }
    useEffect(() => {
      console.log('Su App useEffect la funzione leggiFile è stata chiamata:',listaPagina2Originali)
     }, [listaPagina2Originali])
     
    
 

  //*******************fine************************************************************* */

  //**************************recupero parametri stampa **********************************
  useEffect(()=>{
    const parametriStampa = async ()=>{
      try {
        const response = await fetch('parametriStampa.json')
        const data = await response.text()
        const parsedData = await JSON.parse(data)
        setAppParametriStampa(parsedData)
        
      } catch (error) {
        console.log('Parametri stampa non caricati:', error)
      }
    }
    parametriStampa()
  },[])

  //******************************fine*************************************************** */ */



  return (
    <div style={{display:'flex'}}>
       
       {/* Colonna sinistra: PDF */}
      <div className='pdf' style={{flex:1 }}>
        {/* SEGNAPOSTO PER IL PLANNING, RECUPERIAMO LA LISTA E LA DATA PER DARLA IN MANO A SEEPDF*/ }
          <Planning />
          <SeePdf 
          leggiFile={leggiFile}
          setNumeroPages={setNumeroPages} 
          setAppLista={setAppLista}
          setAppCliente={setAppCliente}
          setAppCantiere={setAppCantiere}
          setAppOpera= {setAppOpera}
          setAppPlan = {setAppPlan}
          setAppElementiSaldati= { setAppElementiSaldati}  /* mi legge gli elementi nel pdf*/ 
          appRecuperaMiaLista = {appRecuperaMiaLista}

           />
      </div>

        {/* Colonna destra: Compilatore */}
        <div style={{
          width:'60%',
          position:'sticky', 
          top:'0', 
          height: '100vh', 
          overflow:'auto'
          }}>
            <h2>Data consegna:{` ${dataConsegnaApp}`}</h2>
            <h3>{`Ultima lista creata: n. ${pdfListaCreata}`}</h3>
      <Calendario className='calendario' setDataConsegnaApp={setDataConsegnaApp}  />

          <Compilatore

          numeroPages={numeroPages} 
          //setDataConsegnaApp={setDataConsegnaApp}
          appLista={appLista}
          appCliente={appCliente}
          appCantiere={appCantiere}
          appOpera={appOpera}
          appPlan={appPlan}
          appOperatore={appOperatore}
          />
            {/*SONO IN LINEA a  seguire */}
          <div className='contenitore'>
            <ElencoOperatori
            className='operatori' 
            setAppOperatore={setAppOperatore} />
            <ElencoSaldatori className='saldatori' setSaldatoriApp={setSaldatoriApp} />
            <ElementiSaldati
            className='elementiSaldati'
             appElementiSaldati={appElementiSaldati} setAppElementoScelto={setAppElementoScelto} />
            <Tipologia
            className='tipologia'
            setAppTipologia={setAppTipologia}
             />
             <Commenti
             className='commenti'
             setAppControllatoNdi={setAppControllatoNdi} appControllatoNdi={appControllatoNdi}
              />
          </div>
        {/*fine */}
        
         <CheckList setListaPagina1={setListaPagina1} />
         <CheckListDimensioni setListaPagina2={setListaPagina2} listaPagina2Originali={listaPagina2Originali}/>
         <Footer 
         dataConsegnaApp={dataConsegnaApp} 
         appLista={appLista} 
         appCliente={appCliente}
         appCantiere={appCantiere}
         appOpera={appOpera}
         appPlan={appPlan}
         appElementoScelto={appElementoScelto}
         saldatoriApp={saldatoriApp}
         appTipologia={appTipologia}
         listaPagina1={listaPagina1} 
         listaPagina2={listaPagina2} 
         setPdfListaCreata={setPdfListaCreata}
         appParametriStampa={appParametriStampa}
         appControllatoNdi={appControllatoNdi}
         numeroPages={numeroPages}
         />

        

          
        </div>
    </div>
  );
}

export default App;
