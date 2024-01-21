//questoa funzione mi serve per catturare tutti i file che mi servono per lavorare
// a partire dal file pdf
import React, { useRef } from 'react'
import { PDFDocument } from 'pdf-lib';

const Impostazioni = ({setpj8, setVisualizzaSceltaliste}) => {
    const fileInputRef = useRef();
    //viene attivato dal tasto importa PDF

    const importPDF = async () => {

        const fileInput = fileInputRef.current;
        if (fileInput.files.length === 0) {
          alert('Seleziona un file PDF prima di procedere.');
          return;
        }
        const pdfFile = fileInput.files[0];
        try {
            
            setpj8(pdfFile) //cattura il file
            //qui dovrei far vedere il tasto 'scegli il file'
            setVisualizzaSceltaliste(true)
            
        } catch (error) {
            console.error("Errore durante l'analisi del documento PDF:", error.message);  
        }
        
    } //fine di imporPDF

    const handleFileChange = () => {
        // Puoi eseguire azioni aggiuntive quando il file viene selezionato
        console.log("File selezionato:", fileInputRef.current.files[0].name);
      };
    
  return (
    <div>
      <input
        type="file"
        accept=".pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button onClick={importPDF}>Importa PDF</button>
    </div>
  )
}

export default Impostazioni