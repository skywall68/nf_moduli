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
import Footer2 from './Footer2';
import Impostazioni from './Impostazioni';
import Operatore from './Operatore';
import RecuperaSaldatori from './RecuperaSaldatori';

function App() {
  const [pj8, setpj8]=useState();
  const [visualizzaSceltaListe, setVisualizzaSceltaliste]=useState(false);
  const [numeroPages, setNumeroPages] = useState('0');
  const [dataConsegnaApp, setDataConsegnaApp]=useState('');
  const [appLista, setAppLista]= useState('');
  const [pdfListaCreata, setPdfListaCreata]=useState('') //serve per segnarmi se il pdf è stato creato
  const [appCliente, setAppCliente] = useState('');
  const [appCantiere, setAppCantiere] = useState('');
  const [appOpera, setAppOpera] = useState('');
  const [appPlan, setAppPlan] = useState('');
  const [appOperatore, setAppOperatore] = useState ('');
  const [appElencoSaldatori, setAppElencoSaldatori]=useState([]) 
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
  // useEffect(()=>{
  //   //salva su localStorage
  //   localStorage.setItem('appOperatore',JSON.stringify(appOperatore))
  // },[appOperatore])
  

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
   //creiamo la condizione di vedere o non vedere gli elementi :
   let planning;
   let calendario;
   let dataConsegna;
   let compilatore;
   let operatore;
   let sceltaElencoSaldatori;
   let saldatori;
   let elencoElementi;
   let tipo;
   let comments;
   let checkList1;
   let checkList2;
   let fooder;
   let ultimaLista;
   let sceltaPj;
   
   if(visualizzaSceltaListe){
    planning=<Planning />
    ultimaLista=  <h3>{`Ultima lista creata: n. ${pdfListaCreata}`}</h3>
    calendario= <Calendario className='calendario' setDataConsegnaApp={setDataConsegnaApp}  />
    dataConsegna=<h2>Data consegna:{` ${dataConsegnaApp}`}</h2>
    compilatore= <Compilatore
                  numeroPages={numeroPages} 
                  //setDataConsegnaApp={setDataConsegnaApp}
                  appLista={appLista}
                  appCliente={appCliente}
                  appCantiere={appCantiere}
                  appOpera={appOpera}
                  appPlan={appPlan}
                 />
    operatore=<Operatore setAppOperatore={setAppOperatore} />
    saldatori= <ElencoSaldatori className='saldatori' setSaldatoriApp={setSaldatoriApp} appElencoSaldatori={appElencoSaldatori} />
    elencoElementi=  <ElementiSaldati 
                     className='elementiSaldati'
                     appElementiSaldati={appElementiSaldati} 
                     setAppElementoScelto={setAppElementoScelto} />
    tipo= <Tipologia
           className='tipologia'
           setAppTipologia={setAppTipologia}
          />
    comments=  <Commenti
                className='commenti'
                setAppControllatoNdi={setAppControllatoNdi} 
                appControllatoNdi={appControllatoNdi}
                /> 
    checkList1=  <CheckList setListaPagina1={setListaPagina1} />
    checkList2=   <CheckListDimensioni 
                   setListaPagina2={setListaPagina2} 
                   listaPagina2Originali={listaPagina2Originali}
                   />
    fooder= <Footer2
            pj8={pj8}
            appOperatore={appOperatore} 
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
    } else {

      
      sceltaPj=<Impostazioni setpj8={setpj8} setVisualizzaSceltaliste={setVisualizzaSceltaliste} appElencoSaldatori={appElencoSaldatori} />
      sceltaElencoSaldatori= <RecuperaSaldatori setAppElencoSaldatori={setAppElencoSaldatori} />
    }

    console.log('elenco saldatori dentro app.js:',appElencoSaldatori)


  return (
    <div>
        <div style={{display:'-ms-flexbox',position:'relative', alignItems: 'center', textAlign:'center'}}>
           {/* <h2>Scegli il file pj</h2> */}
           {sceltaElencoSaldatori}
           
          {/* {!visualizzaSceltaListe ?  <Impostazioni setpj8={setpj8} setVisualizzaSceltaliste={setVisualizzaSceltaliste} /> : <p></p>} */}
          {sceltaPj}
          
        </div>
        <div style={{display:'flex'}}>
         
          {/* Colonna sinistra: PDF */}
          <div className='pdf' style={{flex:1 }}>
          {/* SEGNAPOSTO PER IL PLANNING, RECUPERIAMO LA LISTA E LA DATA PER DARLA IN MANO A SEEPDF*/ }
             {planning}
            {
              visualizzaSceltaListe ?
              
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

              /> : <p></p>
            
           }
          </div>

        {/* Colonna destra: Compilatore */}
        <div style={{
          width:'60%',
          position:'sticky', 
          top:'0', 
          height: '100vh', 
          overflow:'auto'
          }}>
            {/* <h2>Data consegna:{` ${dataConsegnaApp}`}</h2> */}
            {dataConsegna}
            {/* <h3>{`Ultima lista creata: n. ${pdfListaCreata}`}</h3> */}
            {ultimaLista}
      {/* <Calendario className='calendario' setDataConsegnaApp={setDataConsegnaApp}  /> */}
          {calendario}
          {compilatore}
          {/* <Compilatore

          numeroPages={numeroPages} 
          //setDataConsegnaApp={setDataConsegnaApp}
          appLista={appLista}
          appCliente={appCliente}
          appCantiere={appCantiere}
          appOpera={appOpera}
          appPlan={appPlan}
          appOperatore={appOperatore}
          /> */}
            {/*SONO IN LINEA a  seguire */}
          <div className='contenitore'>
            {/* <ElencoOperatori
            className='operatori' 
            setAppOperatore={setAppOperatore} /> */}
            {/* <Operatore setAppOperatore={setAppOperatore} /> */}
            {operatore}
            {/* <ElencoSaldatori className='saldatori' setSaldatoriApp={setSaldatoriApp} /> */}
            {saldatori}
            {/* <ElementiSaldati
            className='elementiSaldati'
             appElementiSaldati={appElementiSaldati} setAppElementoScelto={setAppElementoScelto} /> */}
             {elencoElementi}
            {/* <Tipologia
            className='tipologia'
            setAppTipologia={setAppTipologia}
             /> */}
             {tipo}
             {/* <Commenti
             className='commenti'
             setAppControllatoNdi={setAppControllatoNdi} appControllatoNdi={appControllatoNdi}
              /> */}
              {comments}
          </div>
        {/*fine */}
        
         {/* <CheckList setListaPagina1={setListaPagina1} /> */}
         {checkList1}
         {/* <CheckListDimensioni setListaPagina2={setListaPagina2} listaPagina2Originali={listaPagina2Originali}/> */}
         {checkList2}
         {/* <Footer2
         pj8={pj8}
         appOperatore={appOperatore} 
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
         /> */}
         {fooder}

        

          
        </div>
    </div>
    </div>

  );
}

export default App;
