import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfArray = () => {
  const [pdfPath, setPdfPath] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [selectedLine, setSelectedLine] = useState('');
  const [selectedLineText, setSelectedLineText] = useState('');
  const [linesArray, setLinesArray] = useState([]);
  const [indexOfCliente, setIndexOfCliente] = useState(null);
  const [cliente, setCliente]= useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPdfPath(URL.createObjectURL(file));
      setPageNumber(1);
      setLinesArray([]); // Resetta l'array quando il file cambia
      setIndexOfCliente(null); // Resetta l'indice quando il file cambia
      setCliente('')
    }
  };

  const handleLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSelectedLine(value);
  };

  const handleExtractLine = async () => {
    try {
      const pdfDocument = await pdfjs.getDocument(pdfPath).promise;
      const pdfPage = await pdfDocument.getPage(pageNumber);
      const textContent = await pdfPage.getTextContent();

      const lines = textContent.items.map(item => item.str); //array che contiene le righe

      setLinesArray(lines); // Aggiorna l'array con le nuove righe

      const selectedLineNumber = parseInt(selectedLine, 10); //serve per convertire una stringa ("42") in 42 base 10

      if (!isNaN(selectedLineNumber) && selectedLineNumber > 0 && selectedLineNumber <= lines.length) { //verifica del numero
        const selectedLineText = lines[selectedLineNumber - 1];
        setSelectedLineText(selectedLineText);
      } else {
        // Se il numero di riga non è valido, resetta il testo selezionato
        setSelectedLineText('');
      }

      const indexCliente = lines.findIndex(line => line.includes('Tabella Ferri n.'));

      if (indexCliente !== -1) {
        const posizioneCliente = indexCliente + 4 // deve puntare sul valore cliente nell'array
        setIndexOfCliente(posizioneCliente);
        setCliente(linesArray[posizioneCliente])
       
      } else {
        // Se 'Cliente' non è trovato, resetta l'indice
        setIndexOfCliente(null);
        setCliente('non trovato')
      }
    } catch (error) {
      console.error('Errore durante l\'estrazione del testo:', error);
    }
  };
  
 
  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <div>
        <label>
          Inserisci il numero di riga:
          <input type="text" value={selectedLine} onChange={handleInputChange} />
          <button onClick={handleExtractLine}>Estrai Riga</button>
        </label>
      </div>
      <h1>{selectedLineText}</h1>
      
      <div>
        
        {indexOfCliente !== null && (
          <>
           <h1>Tabella ferri : {linesArray[indexOfCliente + 10]}</h1>
          <h1>{`Cliente : ${cliente}`}</h1>
          <h2>Cantiere:{linesArray[indexOfCliente +4]}</h2>
          <h2>Opera:{linesArray[indexOfCliente +6]}</h2>
          <h2>Plan:{linesArray[indexOfCliente +14]}</h2>
          
          </>
         
        )}
       


      </div>
    
        
    </div>
  );
};

export default PdfArray;
