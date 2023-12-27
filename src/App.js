//import PuntoPreciso from './PuntoPreciso';
import React, { useState} from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';


import './App.css';
import Compilatore from './Compilatore';
import  ElencoOperatori  from './ElencoOperatori';
import ElencoSaldatori from './ElencoSaldatori';
import Calendario from './Calendario';
import PdfArray from './PdfArray';
import PdfReader from './PdfReader';
import PdfReaderRiga2 from './PdfReaderRiga2';
import SeePdf from './SeePdf'
import ElementiSaldati from './ElementiSaldati';
import Tipologia from './Tipologia';
import Commenti from './Commenti';
import CheckList from './CheckList';
import CheckListDimensioni from './CheckListDimensioni';
import Footer from './Footer';

function App() {
  
  const [numeroPages, setNumeroPages] = useState('0');
  const [appLista, setAppLista]= useState('');
  const [appCliente, setAppCliente] = useState('');
  const [appCantiere, setAppCantiere] = useState('');
  const [appOpera, setAppOpera] = useState('');
  const [appPlan, setAppPlan] = useState('');
  const [appOperatore, setAppOperatore] = useState ('');
  const [appElementiSaldati, setAppElementiSaldati]= useState([])
  const [appTipologia, setAppTipologia]= useState()

  return (
    <div style={{display:'flex'}}>
       
       {/* Colonna sinistra: PDF */}
      <div className='pdf' style={{flex:1 }}>
          <SeePdf 
          
          setNumeroPages={setNumeroPages} 
          setAppLista={setAppLista}
          setAppCliente={setAppCliente}
          setAppCantiere={setAppCantiere}
          setAppOpera= {setAppOpera}
          setAppPlan = {setAppPlan}
          setAppElementiSaldati= { setAppElementiSaldati}  /* mi legge gli elementi nel pdf*/ 
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
          <Compilatore
           
          numeroPages={numeroPages} 
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
            <ElencoSaldatori className='saldatori' />
            <ElementiSaldati
            className='elementiSaldati'
             appElementiSaldati={appElementiSaldati} />
            <Tipologia
            className='tipologia'
            setAppTipologia={setAppTipologia}
             />
             <Commenti
             className='commenti'

              />
          </div>
        {/*fine */}
         <CheckList />
         <CheckListDimensioni />
         <Footer />

        

          
        </div>
    </div>
  );
}

export default App;
